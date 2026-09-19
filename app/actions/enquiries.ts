"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/app/lib/dal";
import { prisma } from "@/app/lib/prisma";

export async function updateEnquiryStatus(id: string, status: "new" | "contacted" | "closed") {
  await verifySession();
  await prisma.enquiry.update({ where: { id }, data: { status } });
  revalidatePath("/admin");
}

export async function deleteEnquiry(id: string) {
  await verifySession();
  await prisma.enquiry.delete({ where: { id } });
  revalidatePath("/admin");
}
