import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Ingresa tu nombre completo").max(100),
  email: z.email("Ingresa un correo válido"),
  company: z.string().max(100).optional().or(z.literal("")),
  phone: z.string().max(30).optional().or(z.literal("")),
  serviceInterest: z.string().min(1, "Selecciona un servicio"),
  message: z.string().min(10, "Cuéntanos un poco más (mínimo 10 caracteres)").max(2000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export type ContactFormResult = {
  success: boolean;
  message: string;
};
