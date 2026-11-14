import "server-only";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

// Stored OUTSIDE public/ so files are only reachable through the admin-authenticated file route.
export const UPLOAD_ROOT = path.resolve(process.env.UPLOAD_DIR || path.join(process.cwd(), "private-uploads"));
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export class UploadError extends Error {}

function detectExtension(buf: Buffer): string | null {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf.length >= 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (buf.length >= 12 && buf.subarray(0, 4).toString() === "RIFF" && buf.subarray(8, 12).toString() === "WEBP") return "webp";
  if (buf.length >= 4 && buf.subarray(0, 4).toString() === "%PDF") return "pdf";
  return null;
}

/** Validates by file contents (not the client-supplied name/type) and stores under a random name. */
export async function saveUpload(
  enquiryId: string,
  position: number,
  kind: string,
  file: File,
  opts: { imagesOnly?: boolean } = {}
): Promise<string> {
  if (file.size === 0) throw new UploadError("The uploaded file is empty.");
  if (file.size > MAX_UPLOAD_BYTES) throw new UploadError("Each file must be 5MB or smaller.");
  const buf = Buffer.from(await file.arrayBuffer());
  const ext = detectExtension(buf);
  if (!ext) throw new UploadError("Files must be JPG, PNG, WebP or PDF.");
  if (opts.imagesOnly && ext === "pdf") throw new UploadError("The photo must be a JPG, PNG or WebP image.");

  const rel = path.join(enquiryId, `${position}-${kind}-${crypto.randomBytes(8).toString("hex")}.${ext}`);
  const full = path.join(UPLOAD_ROOT, rel);
  await fs.mkdir(path.dirname(full), { recursive: true });
  await fs.writeFile(full, buf, { mode: 0o600 });
  return rel;
}

function resolveSafe(rel: string) {
  const full = path.resolve(UPLOAD_ROOT, rel);
  if (!full.startsWith(UPLOAD_ROOT + path.sep)) throw new Error("Invalid upload path");
  return full;
}

export async function readUpload(rel: string): Promise<{ data: Buffer; ext: string }> {
  const full = resolveSafe(rel);
  return { data: await fs.readFile(full), ext: path.extname(full).slice(1).toLowerCase() };
}

export async function deleteUpload(rel: string | null | undefined) {
  if (!rel) return;
  try {
    await fs.unlink(resolveSafe(rel));
  } catch {
    // already gone
  }
}

export async function deleteEnquiryUploads(enquiryId: string) {
  try {
    await fs.rm(resolveSafe(enquiryId), { recursive: true, force: true });
  } catch {
    // ignore
  }
}
