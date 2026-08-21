import { z } from "zod";

// Los campos que terminan interpolados en encabezados de correo (asunto, from,
// reply-to) o cerca de ellos no deben aceptar saltos de línea ni caracteres de
// control: son la defensa propia contra inyección de encabezados de correo,
// sin depender de que Resend los sanitice por su lado. Ver SECURITY.md.
const noControlChars = /^[^\x00-\x1F\x7F]*$/;
const noControlCharsMessage = "No se permiten saltos de línea ni caracteres especiales.";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Ingresa tu nombre completo")
    .max(100)
    .regex(noControlChars, noControlCharsMessage),
  email: z.email("Ingresa un correo válido"),
  company: z
    .string()
    .max(100)
    .regex(noControlChars, noControlCharsMessage)
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .max(30)
    .regex(noControlChars, noControlCharsMessage)
    .optional()
    .or(z.literal("")),
  serviceInterest: z
    .string()
    .min(1, "Selecciona un servicio")
    .regex(noControlChars, noControlCharsMessage),
  message: z.string().min(10, "Cuéntanos un poco más (mínimo 10 caracteres)").max(2000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export type ContactFormResult = {
  success: boolean;
  message: string;
};
