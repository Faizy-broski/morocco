import "server-only";
import nodemailer from "nodemailer";
import type { Enquiry, Traveller } from "@prisma/client";
import { PROCESSING_OPTIONS } from "@/app/lib/constants";
import { SITE_URL } from "@/app/lib/site";

const BUSINESS_EMAIL = process.env.SMTP_USER || "services@moroccovisaservice.com";
const FROM = `Morocco Visa Service <${BUSINESS_EMAIL}>`;
const ADMIN_TO = () => process.env.ADMIN_NOTIFICATION_EMAIL || BUSINESS_EMAIL;
const PHONE = "020 3633 9033";

const BRAND = "#A33132";
const BRAND_DARK = "#5E1A1A";
const INK = "#1f2937";
const MUTED = "#6b7280";
const PAPER = "#F7F6F3";

/* ---------------- helpers ---------------- */

function esc(value: string | number | null | undefined) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const gbp = (pence: number) => `£${(pence / 100).toFixed(2)}`;
const fmtDate = (d: Date) => d.toLocaleDateString("en-GB", { dateStyle: "long", timeZone: "UTC" });
const fmtDateTime = (d: Date) => d.toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/London" });

function processingText(value: string) {
  const o = PROCESSING_OPTIONS.find((p) => p.value === value);
  return o ? `${o.name} · ${o.time}` : value;
}

function getTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("SMTP_HOST / SMTP_USER / SMTP_PASS not set — skipping emails");
    return null;
  }
  const port = Number(process.env.SMTP_PORT || 465);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

/* ---------------- shared layout (table based, inline styles for email clients) ---------------- */

function button(url: string, label: string, secondary = false) {
  const bg = secondary ? "#ffffff" : BRAND;
  const color = secondary ? BRAND : "#ffffff";
  return `<a href="${esc(url)}" style="display:inline-block;background:${bg};color:${color};border:2px solid ${BRAND};text-decoration:none;padding:13px 28px;border-radius:999px;font-weight:bold;font-size:14px;letter-spacing:.5px">${esc(label)}</a>`;
}

function pill(text: string, bg: string, color: string) {
  return `<span style="display:inline-block;background:${bg};color:${color};padding:5px 14px;border-radius:999px;font-size:12px;font-weight:bold;letter-spacing:.6px;text-transform:uppercase">${esc(text)}</span>`;
}

function rows(items: [string, string][]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${items
    .map(
      ([k, v], i) => `<tr>
        <td style="padding:11px 0;${i ? "border-top:1px solid #ece9e3;" : ""}color:${MUTED};font-size:13px;width:42%;vertical-align:top">${esc(k)}</td>
        <td style="padding:11px 0;${i ? "border-top:1px solid #ece9e3;" : ""}color:${INK};font-size:14px;font-weight:600;text-align:right;vertical-align:top">${v}</td>
      </tr>`
    )
    .join("")}</table>`;
}

function codeBox(code: string) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:22px 0"><tr><td align="center" style="background:${PAPER};border:1px dashed #d9d3c7;border-radius:14px;padding:18px">
    <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${MUTED}">Tracking code</div>
    <div style="font-family:'Courier New',monospace;font-size:28px;font-weight:bold;letter-spacing:4px;color:${BRAND};margin-top:6px">${esc(code)}</div>
  </td></tr></table>`;
}

function layout(opts: { preheader: string; heading: string; intro?: string; body: string; admin?: boolean }) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(opts.heading)}</title></head>
<body style="margin:0;padding:0;background:${PAPER};font-family:Arial,Helvetica,sans-serif;color:${INK}">
  <span style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(opts.preheader)}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER}"><tr><td align="center" style="padding:28px 12px">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px">
      <tr><td align="center" style="padding:0 0 18px">
        <a href="${SITE_URL}" style="text-decoration:none"><img src="${SITE_URL}/images/header-logo-transparent.png" alt="Morocco Visa Service" width="190" style="display:block;border:0;height:auto"></a>
      </td></tr>
      <tr><td style="background:#ffffff;border-radius:22px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,.06)">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="background:${opts.admin ? "#1f2937" : BRAND_DARK};height:6px;font-size:0;line-height:0">&nbsp;</td></tr>
          <tr><td style="padding:34px 34px 8px">
            <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:28px;line-height:1.25;color:${INK}">${opts.heading}</h1>
            ${opts.intro ? `<p style="margin:12px 0 0;font-size:15px;line-height:1.65;color:#4b5563">${opts.intro}</p>` : ""}
          </td></tr>
          <tr><td style="padding:14px 34px 34px;font-size:15px;line-height:1.65">${opts.body}</td></tr>
        </table>
      </td></tr>
      <tr><td align="center" style="padding:22px 12px 0;font-size:12px;line-height:1.7;color:${MUTED}">
        ${
          opts.admin
            ? "Internal notification — Morocco Visa Service admin"
            : `Questions? Reply to this email, write to <a href="mailto:${BUSINESS_EMAIL}" style="color:${BRAND}">${BUSINESS_EMAIL}</a> or call ${PHONE}.<br>London, United Kingdom · Open 24/7`
        }
        <br><span style="color:#9ca3af">© Morocco Visa Service</span>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

function travellerList(travellers: Traveller[], admin = false) {
  if (!travellers.length) return "—";
  return travellers
    .map((t) =>
      admin
        ? `${esc(t.firstName)} ${esc(t.familyName)}<br><span style="font-weight:normal;color:${MUTED};font-size:12px">${esc(t.nationality)} · passport ${esc(t.passportNumber)}</span>`
        : `${esc(t.firstName)} ${esc(t.familyName)}`
    )
    .join("<br>");
}

function logFailures(results: PromiseSettledResult<unknown>[]) {
  for (const result of results) {
    if (result.status === "rejected") console.error("Failed to send email", result.reason);
  }
}

/* ---------------- emails ---------------- */

/** Customer, right after the application is started: a private link to resume it. */
export async function sendApplicationLink(enquiry: Enquiry) {
  const transporter = getTransporter();
  if (!transporter) return;
  const url = `${SITE_URL}/apply/${enquiry.accessToken}`;
  await transporter.sendMail({
    from: FROM,
    to: enquiry.email,
    replyTo: BUSINESS_EMAIL,
    subject: `Your Morocco visa application — ${enquiry.trackingCode}`,
    html: layout({
      preheader: "Your private link to finish your application. Your progress is saved.",
      heading: "Your application is started",
      intro: "Thanks for choosing Morocco Visa Service. Use the button below whenever you want to finish your application — your progress is saved.",
      body: `
        ${codeBox(enquiry.trackingCode)}
        <p style="margin:0 0 22px;text-align:center">${button(url, "Continue my application")}</p>
        ${rows([
          ["Processing", esc(processingText(enquiry.processing))],
          ["Travellers", String(enquiry.travellers)],
          ["Total to pay", gbp(enquiry.amountPence)],
        ])}
        <p style="margin:22px 0 0;font-size:13px;color:${MUTED}">This link is private to you — please don't share it. Your application is only processed once payment is complete.</p>`,
    }),
  });
}

/** Admin, when the customer has entered every traveller and is heading to payment. */
export async function sendApplicationSubmitted(enquiry: Enquiry, travellers: Traveller[]) {
  const transporter = getTransporter();
  if (!transporter) return;
  const results = await Promise.allSettled([
    transporter.sendMail({
      from: FROM,
      to: ADMIN_TO(),
      replyTo: enquiry.email,
      subject: `New application, awaiting payment: ${enquiry.fullName} (${enquiry.trackingCode})`,
      html: layout({
        admin: true,
        preheader: `${enquiry.fullName} completed their details and is heading to payment.`,
        heading: "New application — awaiting payment",
        intro: `${esc(enquiry.fullName)} has entered all traveller details and documents and has been sent to payment. You'll get another email when it's paid.`,
        body: `
          <p style="margin:0 0 18px">${pill("Awaiting payment", "#fef3c7", "#92400e")}</p>
          ${rows([
            ["Tracking code", esc(enquiry.trackingCode)],
            ["Contact email", esc(enquiry.email)],
            ["Visa type", esc(enquiry.visaType)],
            ["Travel date", esc(fmtDate(enquiry.travelDate))],
            ["Processing", esc(processingText(enquiry.processing))],
            ["Travellers", travellerList(travellers, true)],
            ["Amount", gbp(enquiry.amountPence)],
            ["Source", esc(enquiry.source)],
          ])}
          <p style="margin:26px 0 0;text-align:center">${button(`${SITE_URL}/admin/enquiries/${enquiry.id}`, "Open in admin")}</p>`,
      }),
    }),
  ]);
  logFailures(results);
}

/** Customer, instantly when they submit all details: confirms receipt and gives the link to pay. */
export async function sendApplicationReceived(enquiry: Enquiry, travellers: Traveller[]) {
  const transporter = getTransporter();
  if (!transporter) return;
  const name = travellers[0]?.firstName;
  await transporter.sendMail({
    from: FROM,
    to: enquiry.email,
    replyTo: BUSINESS_EMAIL,
    subject: `We've received your application — ${enquiry.trackingCode}`,
    html: layout({
      preheader: "Your details are saved. Complete payment to start processing.",
      heading: name ? `Thank you, ${esc(name)}` : "Thank you",
      intro: "We've received your Morocco visa application details. Your application starts processing as soon as payment is complete.",
      body: `
        <p style="margin:0 0 18px">${pill("Awaiting payment", "#fef3c7", "#92400e")}</p>
        ${codeBox(enquiry.trackingCode)}
        ${rows([
          ["Travellers", travellerList(travellers)],
          ["Processing", esc(processingText(enquiry.processing))],
          ["Total to pay", gbp(enquiry.amountPence)],
        ])}
        <p style="margin:24px 0 0;text-align:center">${button(`${SITE_URL}/apply/${enquiry.accessToken}`, "Complete payment")}</p>
        <p style="margin:22px 0 0;font-size:13px;color:${MUTED};text-align:center">Already paid? You'll get a separate confirmation email. Need help? Reply here or call ${PHONE}.</p>`,
    }),
  });
}

/** Customer booking confirmation + admin "paid" alert, sent once when Stripe confirms payment. */
export async function sendPaymentConfirmation(enquiry: Enquiry, travellers: Traveller[]) {
  const transporter = getTransporter();
  if (!transporter) return;

  const lead = travellers[0];
  const greetName = lead ? lead.firstName : "there";
  const trackUrl = `${SITE_URL}/track?code=${encodeURIComponent(enquiry.trackingCode)}`;
  const paidAt = enquiry.paidAt ?? new Date();
  const option = PROCESSING_OPTIONS.find((p) => p.value === enquiry.processing);

  const customerHtml = layout({
    preheader: `Payment of ${gbp(enquiry.amountPence)} received — your booking ${enquiry.trackingCode} is confirmed.`,
    heading: `Thank you, ${esc(greetName)} — you're booked`,
    intro: "We've received your payment and your Morocco visa application is now with our team.",
    body: `
      <p style="margin:6px 0 0;text-align:center">${pill("Payment received", "#dcfce7", "#166534")}</p>
      ${codeBox(enquiry.trackingCode)}
      ${rows([
        ["Visa type", esc(enquiry.visaType)],
        ["Processing", esc(processingText(enquiry.processing))],
        ["Travel date", esc(fmtDate(enquiry.travelDate))],
        ["Travellers", travellerList(travellers)],
        ["Amount paid", `<span style="color:${BRAND};font-size:18px">${gbp(enquiry.amountPence)}</span>`],
        ["Paid on", esc(fmtDateTime(paidAt))],
      ])}
      <h2 style="margin:30px 0 12px;font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:20px">What happens next</h2>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${[
          ["1", "We check your details and documents", "Our team reviews every traveller's information and uploads."],
          ["2", "We submit your application", "If anything is missing we'll email you straight away."],
          ["3", "You receive your e-visa by email", `Expected within ${option ? option.time.toLowerCase() : "the processing time you selected"}.`],
        ]
          .map(
            ([n, t, d]) => `<tr>
            <td width="40" valign="top" style="padding:6px 0"><div style="width:30px;height:30px;border-radius:50%;background:${BRAND};color:#fff;text-align:center;line-height:30px;font-weight:bold;font-size:14px">${n}</div></td>
            <td style="padding:6px 0 10px"><strong style="font-size:14px">${t}</strong><br><span style="font-size:13px;color:${MUTED}">${d}</span></td>
          </tr>`
          )
          .join("")}
      </table>
      <p style="margin:26px 0 0;text-align:center">${button(trackUrl, "Track my application")}</p>
      <p style="margin:22px 0 0;font-size:13px;color:${MUTED};text-align:center">Keep this email — it's your receipt. Refused applications are non-refundable.</p>`,
  });

  const adminHtml = layout({
    admin: true,
    preheader: `${gbp(enquiry.amountPence)} paid by ${enquiry.fullName}.`,
    heading: `Booking paid — ${gbp(enquiry.amountPence)}`,
    intro: `${esc(enquiry.fullName)} has paid. Their full application and documents are ready to process.`,
    body: `
      <p style="margin:0 0 18px">${pill("Paid", "#dcfce7", "#166534")}</p>
      ${rows([
        ["Tracking code", esc(enquiry.trackingCode)],
        ["Contact email", esc(enquiry.email)],
        ["Visa type", esc(enquiry.visaType)],
        ["Travel date", esc(fmtDate(enquiry.travelDate))],
        ["Processing", esc(processingText(enquiry.processing))],
        ["Travellers", travellerList(travellers, true)],
        ["Amount paid", gbp(enquiry.amountPence)],
        ["Paid on", esc(fmtDateTime(paidAt))],
      ])}
      <p style="margin:26px 0 0;text-align:center">${button(`${SITE_URL}/admin/enquiries/${enquiry.id}`, "View application & documents")}</p>`,
  });

  const results = await Promise.allSettled([
    transporter.sendMail({
      from: FROM,
      to: ADMIN_TO(),
      replyTo: enquiry.email,
      subject: `PAID ${gbp(enquiry.amountPence)}: ${enquiry.fullName} (${enquiry.trackingCode})`,
      html: adminHtml,
    }),
    transporter.sendMail({
      from: FROM,
      to: enquiry.email,
      replyTo: BUSINESS_EMAIL,
      subject: `Booking confirmed — payment received (${enquiry.trackingCode})`,
      html: customerHtml,
    }),
  ]);
  logFailures(results);
}

/* ---------------- abandoned leads ---------------- */

const progressText = (e: Enquiry, travellers: Traveller[]) => `${travellers.length} of ${e.travellers} traveller${e.travellers === 1 ? "" : "s"} saved`;

/** Admin: a technical problem stopped an application (immediate alert). */
export async function sendFailureAlert(enquiry: Enquiry, travellers: Traveller[], error: string) {
  const transporter = getTransporter();
  if (!transporter) return;
  const lead = travellers[0];
  const results = await Promise.allSettled([
    transporter.sendMail({
      from: FROM,
      to: ADMIN_TO(),
      replyTo: enquiry.email,
      subject: `Application problem — potential lead: ${enquiry.email} (${enquiry.trackingCode})`,
      html: layout({
        admin: true,
        preheader: `A customer hit a problem: ${error}`,
        heading: "A customer hit a problem",
        intro: "This application didn't go through. It's been added to the Abandoned tab as a potential lead.",
        body: `
          <p style="margin:0 0 18px">${pill("Needs follow-up", "#fee2e2", "#991b1b")}</p>
          ${rows([
            ["Problem", esc(error)],
            ["Contact email", esc(enquiry.email)],
            ["Phone", esc(lead?.phone ?? "—")],
            ["Name", esc(lead ? `${lead.firstName} ${lead.familyName}` : "Not entered yet")],
            ["Progress", esc(progressText(enquiry, travellers))],
            ["Amount", gbp(enquiry.amountPence)],
            ["Tracking code", esc(enquiry.trackingCode)],
          ])}
          <p style="margin:26px 0 0;text-align:center">${button(`${SITE_URL}/admin/enquiries/${enquiry.id}`, "Open in admin")}</p>`,
      }),
    }),
  ]);
  logFailures(results);
}

/** Admin: hourly digest of applications that never reached payment. */
export async function sendAbandonedDigest(items: { enquiry: Enquiry; travellers: Traveller[] }[]) {
  const transporter = getTransporter();
  if (!transporter || !items.length) return;
  const list = items
    .map(({ enquiry: e, travellers }) => {
      const lead = travellers[0];
      return `<tr><td style="padding:12px 0;border-top:1px solid #ece9e3">
        <strong>${esc(lead ? `${lead.firstName} ${lead.familyName}` : "Name not entered")}</strong> · ${gbp(e.amountPence)}<br>
        <span style="font-size:13px;color:${MUTED}">${esc(e.email)}${lead?.phone ? ` · ${esc(lead.phone)}` : ""}</span><br>
        <span style="font-size:13px;color:${MUTED}">${esc(progressText(e, travellers))}${e.lastError ? ` · ${esc(e.lastError)}` : ""}</span><br>
        <a href="${SITE_URL}/admin/enquiries/${e.id}" style="font-size:13px;color:${BRAND}">Open →</a>
      </td></tr>`;
    })
    .join("");
  const results = await Promise.allSettled([
    transporter.sendMail({
      from: FROM,
      to: ADMIN_TO(),
      subject: `${items.length} abandoned application${items.length === 1 ? "" : "s"} — potential leads`,
      html: layout({
        admin: true,
        preheader: `${items.length} customers started an application but haven't paid.`,
        heading: `${items.length} potential lead${items.length === 1 ? "" : "s"} to follow up`,
        intro: "These customers started an application but haven't paid. Open any of them to see what they entered and send them their link.",
        body: `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${list}</table>
          <p style="margin:26px 0 0;text-align:center">${button(`${SITE_URL}/admin?tab=abandoned`, "Open Abandoned tab")}</p>`,
      }),
    }),
  ]);
  logFailures(results);
}

/** Customer: a reminder with their private link to finish and pay. Sent only when an admin presses the button. */
export async function sendPaymentReminder(enquiry: Enquiry, travellers: Traveller[]) {
  const transporter = getTransporter();
  if (!transporter) throw new Error("SMTP is not configured");
  const name = travellers[0]?.firstName;
  await transporter.sendMail({
    from: FROM,
    to: enquiry.email,
    replyTo: BUSINESS_EMAIL,
    subject: `Finish your Morocco visa application — ${enquiry.trackingCode}`,
    html: layout({
      preheader: "Your application is saved — pick up where you left off.",
      heading: name ? `${esc(name)}, your application is waiting` : "Your application is waiting",
      intro: "You started a Morocco visa application but haven't completed payment. Everything you entered is saved.",
      body: `
        ${codeBox(enquiry.trackingCode)}
        ${rows([
          ["Progress", esc(progressText(enquiry, travellers))],
          ["Total", gbp(enquiry.amountPence)],
        ])}
        <p style="margin:24px 0 0;text-align:center">${button(`${SITE_URL}/apply/${enquiry.accessToken}`, "Continue my application")}</p>
        <p style="margin:22px 0 0;font-size:13px;color:${MUTED};text-align:center">Need a hand? Just reply to this email or call ${PHONE}.</p>`,
    }),
  });
}
