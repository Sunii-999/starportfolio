"use server";

import { log } from "console";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "lindazaeske@berlin-international.de",
      subject: `New Message from ${name}`,
      replyTo: email as string,
      text: message as string,
    });
    return { success: true };
  } catch (error) {
    return { success: false };
    log("Error sending email:", error);
  }
}