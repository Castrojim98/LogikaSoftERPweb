"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { FieldError, FieldGroup, FieldLabel, Input, Select, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { submitContactForm } from "@/app/actions/contact";
import { contactFormSchema, type ContactFormValues } from "@/features/contact/schema";
import { services } from "@/config/services";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", company: "", phone: "", serviceInterest: "", message: "" },
  });

  const onSubmit = (values: ContactFormValues) => {
    setResult(null);
    startTransition(async () => {
      const response = await submitContactForm(values);
      setResult(response);
      if (response.success) reset();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <FieldGroup>
          <FieldLabel htmlFor="name" required>
            Nombre completo
          </FieldLabel>
          <Input id="name" autoComplete="name" {...register("name")} />
          <FieldError>{errors.name?.message}</FieldError>
        </FieldGroup>

        <FieldGroup>
          <FieldLabel htmlFor="email" required>
            Correo electrónico
          </FieldLabel>
          <Input id="email" type="email" autoComplete="email" {...register("email")} />
          <FieldError>{errors.email?.message}</FieldError>
        </FieldGroup>

        <FieldGroup>
          <FieldLabel htmlFor="company">Empresa</FieldLabel>
          <Input id="company" autoComplete="organization" {...register("company")} />
          <FieldError>{errors.company?.message}</FieldError>
        </FieldGroup>

        <FieldGroup>
          <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
          <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
          <FieldError>{errors.phone?.message}</FieldError>
        </FieldGroup>
      </div>

      <FieldGroup>
        <FieldLabel htmlFor="serviceInterest" required>
          Servicio de interés
        </FieldLabel>
        <Select id="serviceInterest" defaultValue="" {...register("serviceInterest")}>
          <option value="" disabled>
            Selecciona una opción
          </option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value="Otro">Otro</option>
        </Select>
        <FieldError>{errors.serviceInterest?.message}</FieldError>
      </FieldGroup>

      <FieldGroup>
        <FieldLabel htmlFor="message" required>
          Cuéntanos sobre tu proyecto
        </FieldLabel>
        <Textarea id="message" {...register("message")} />
        <FieldError>{errors.message?.message}</FieldError>
      </FieldGroup>

      {result ? (
        <div
          role="status"
          className={`flex items-start gap-3 rounded-xl p-4 text-sm ${
            result.success
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
              : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
          }`}
        >
          {result.success ? (
            <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0" />
          ) : (
            <XCircle aria-hidden className="mt-0.5 size-5 shrink-0" />
          )}
          <span>{result.message}</span>
        </div>
      ) : null}

      <Button type="submit" size="lg" disabled={isPending} className="w-full justify-center sm:w-auto">
        {isPending ? <Loader2 aria-hidden className="size-4 animate-spin" /> : null}
        {isPending ? "Enviando..." : "Solicitar Cotización"}
      </Button>
    </form>
  );
}
