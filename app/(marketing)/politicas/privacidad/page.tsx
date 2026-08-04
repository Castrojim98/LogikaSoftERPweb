import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/utils/seo";

export const metadata: Metadata = buildMetadata({
  title: "Política de Privacidad",
  description:
    "Política de tratamiento de datos personales de LOGIKA SOFT, conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia.",
  path: "/politicas/privacidad",
});

const lastUpdated = "4 de agosto de 2026";

export default function PoliticaDePrivacidadPage() {
  return (
    <>
      <Section tone="dark" className="pt-16">
        <SectionHeading
          eyebrow="Legal"
          title="Política de Privacidad"
          description={`Última actualización: ${lastUpdated}`}
          invert
        />
      </Section>

      <Section containerClassName="max-w-3xl">
        <article className="prose prose-slate dark:prose-invert prose-headings:font-bold prose-a:text-brand-600">
          <p>
            {siteConfig.legalName} (en adelante, &ldquo;{siteConfig.name}&rdquo; o &ldquo;nosotros&rdquo;), con domicilio en{" "}
            {siteConfig.contact.address}, es responsable del tratamiento de los datos personales que los usuarios
            del sitio web {siteConfig.url} (en adelante, el &ldquo;Sitio&rdquo;) nos proporcionan voluntariamente.
            Esta política describe qué datos recopilamos, con qué finalidad, y cuáles son sus derechos como titular
            de la información, en cumplimiento de la Ley 1581 de 2012, el Decreto 1377 de 2013 y demás normas
            colombianas que regulan la protección de datos personales (régimen de Habeas Data).
          </p>

          <h2>1. Datos que recopilamos</h2>
          <p>
            Recopilamos únicamente los datos personales que usted nos entrega directamente al completar el
            formulario de contacto disponible en <a href="/contacto">/contacto</a>:
          </p>
          <ul>
            <li>Nombre completo</li>
            <li>Correo electrónico</li>
            <li>Empresa (opcional)</li>
            <li>Teléfono (opcional)</li>
            <li>Servicio de su interés</li>
            <li>El mensaje que usted escriba</li>
          </ul>
          <p>
            El Sitio no utiliza cookies de rastreo ni de publicidad. La única información que se almacena en su
            navegador es su preferencia de tema visual (claro/oscuro), guardada localmente mediante{" "}
            <code>localStorage</code> y que nunca se transmite a nuestros servidores.
          </p>

          <h2>2. Finalidad del tratamiento</h2>
          <p>Los datos que usted nos proporciona a través del formulario de contacto se utilizan exclusivamente para:</p>
          <ul>
            <li>Responder su solicitud de cotización o información.</li>
            <li>Contactarlo por correo electrónico, teléfono o WhatsApp respecto a su solicitud.</li>
            <li>Fines estadísticos internos sobre la demanda de nuestros servicios y productos.</li>
          </ul>
          <p>
            No usamos sus datos para enviarle comunicaciones comerciales no solicitadas (spam), ni los vendemos,
            arrendamos o compartimos con terceros con fines comerciales ajenos a la atención de su solicitud.
          </p>

          <h2>3. A quién se transmiten sus datos</h2>
          <p>
            Para operar el formulario de contacto, utilizamos el servicio de envío de correo transaccional{" "}
            <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              Resend
            </a>
            , que actúa como nuestro encargado del tratamiento únicamente para la entrega del correo electrónico
            que contiene su solicitud. No compartimos sus datos con ningún otro tercero, salvo que la ley nos
            obligue a hacerlo ante una autoridad competente.
          </p>

          <h2>4. Tiempo de conservación</h2>
          <p>
            Conservamos los datos de su solicitud de contacto durante el tiempo necesario para atenderla y, en la
            medida en que exista una relación comercial posterior, durante la vigencia de dicha relación y los
            plazos legales aplicables en materia comercial y tributaria.
          </p>

          <h2>5. Sus derechos como titular de los datos (Habeas Data)</h2>
          <p>Conforme a la Ley 1581 de 2012, usted tiene derecho a:</p>
          <ul>
            <li>Conocer, actualizar y rectificar sus datos personales.</li>
            <li>Solicitar prueba de la autorización otorgada para el tratamiento de sus datos.</li>
            <li>Ser informado sobre el uso que se ha dado a sus datos personales.</li>
            <li>
              Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la
              normativa de protección de datos.
            </li>
            <li>Revocar la autorización y/o solicitar la supresión de sus datos, cuando no exista un deber legal o contractual que impida su eliminación.</li>
            <li>Acceder de forma gratuita a sus datos personales que hayan sido objeto de tratamiento.</li>
          </ul>
          <p>
            Para ejercer cualquiera de estos derechos, puede escribirnos a{" "}
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>, indicando su nombre
            completo, el derecho que desea ejercer y los datos que motivan su solicitud. Responderemos su solicitud
            dentro de los plazos establecidos por la ley (15 días hábiles para consultas, 10 días hábiles para
            reclamos, con posibilidad de un requerimiento adicional).
          </p>

          <h2>6. Seguridad de la información</h2>
          <p>
            Implementamos medidas técnicas y organizativas razonables para proteger sus datos personales contra
            acceso no autorizado, pérdida o alteración, incluyendo cifrado en tránsito (HTTPS) y validación de la
            información recibida antes de su procesamiento.
          </p>

          <h2>7. Menores de edad</h2>
          <p>
            El Sitio está dirigido a empresas y profesionales. No recopilamos intencionalmente datos personales de
            menores de edad. Si usted es el padre, madre o tutor de un menor y considera que nos ha proporcionado
            datos personales sin su consentimiento, contáctenos para eliminarlos.
          </p>

          <h2>8. Cambios a esta política</h2>
          <p>
            Podemos actualizar esta política de privacidad periódicamente para reflejar cambios en nuestras
            prácticas o en la normativa aplicable. La fecha de la última actualización se indica al inicio de este
            documento. Le recomendamos revisar esta página periódicamente.
          </p>

          <h2>9. Contacto</h2>
          <p>
            Si tiene preguntas sobre esta política de privacidad o sobre el tratamiento de sus datos personales,
            puede contactarnos en:
          </p>
          <ul>
            <li>Correo: <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></li>
            <li>Teléfono: {siteConfig.contact.phone}</li>
            <li>Dirección: {siteConfig.contact.address}</li>
          </ul>
        </article>
      </Section>
    </>
  );
}
