"use server";

import { headers } from "next/headers";
import { contactFormSchema, type ContactFormResult, type ContactFormValues } from "@/features/contact/schema";
import { getResendClient } from "@/services/resend";
import { siteConfig } from "@/config/site";
import { checkRateLimit } from "@/utils/rate-limit";

async function getClientIp(): Promise<string> {
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return headerList.get("x-real-ip") ?? "unknown";
}

export async function submitContactForm(values: ContactFormValues): Promise<ContactFormResult> {
  const ip = await getClientIp();
  const { allowed, retryAfterSeconds } = checkRateLimit(ip);

  if (!allowed) {
    const minutes = Math.max(1, Math.ceil(retryAfterSeconds / 60));
    return {
      success: false,
      message: `Has enviado demasiadas solicitudes. Intenta de nuevo en ${minutes} minuto(s).`,
    };
  }

  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Revisa los campos del formulario e intenta de nuevo." };
  }

  const { name, email, company, phone, serviceInterest, message } = parsed.data;
  const resend = getResendClient();

  if (!resend) {
    console.error("RESEND_API_KEY no está configurada. No se pudo enviar el correo de contacto.");
    return {
      success: false,
      message: "No pudimos enviar tu mensaje en este momento. Intenta de nuevo más tarde o escríbenos directamente.",
    };
  }

  try {
    await resend.emails.send({
      from: `${siteConfig.name} <notificaciones@logikasoft.com>`,
      to: siteConfig.contact.email,
      replyTo: email,
      subject: `Nueva solicitud de cotización — ${name}`,
      text: [
        `Nombre: ${name}`,
        `Correo: ${email}`,
        `Empresa: ${company || "No especificada"}`,
        `Teléfono: ${phone || "No especificado"}`,
        `Servicio de interés: ${serviceInterest}`,
        "",
        "Mensaje:",
        message,
      ].join("\n"),
    });

    return { success: true, message: "¡Gracias! Recibimos tu solicitud y te contactaremos en menos de 24 horas." };
  } catch (error) {
    console.error("Error enviando correo de contacto:", error);
    return {
      success: false,
      message: "Ocurrió un error al enviar tu mensaje. Intenta de nuevo o escríbenos directamente por correo.",
    };
  }
}
