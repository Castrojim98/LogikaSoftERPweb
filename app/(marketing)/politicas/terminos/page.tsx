import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/utils/seo";

export const metadata: Metadata = buildMetadata({
  title: "Términos y Condiciones",
  description: "Términos y condiciones de uso del sitio web de LOGIKA SOFT.",
  path: "/politicas/terminos",
});

const lastUpdated = "4 de agosto de 2026";

export default function TerminosYCondicionesPage() {
  return (
    <>
      <Section tone="dark" className="pt-16">
        <SectionHeading
          eyebrow="Legal"
          title="Términos y Condiciones"
          description={`Última actualización: ${lastUpdated}`}
          invert
        />
      </Section>

      <Section containerClassName="max-w-3xl">
        <article className="prose prose-slate dark:prose-invert prose-headings:font-bold prose-a:text-brand-600">
          <p>
            Los presentes términos y condiciones (en adelante, los &ldquo;Términos&rdquo;) regulan el acceso y uso
            del sitio web {siteConfig.url} (en adelante, el &ldquo;Sitio&rdquo;), operado por{" "}
            {siteConfig.legalName} (en adelante, &ldquo;{siteConfig.name}&rdquo; o &ldquo;nosotros&rdquo;), con
            domicilio en {siteConfig.contact.address}. Al acceder o usar el Sitio, usted acepta quedar vinculado
            por estos Términos. Si no está de acuerdo con ellos, le solicitamos no utilizar el Sitio.
          </p>

          <h2>1. Objeto del Sitio</h2>
          <p>
            El Sitio tiene como finalidad presentar la empresa {siteConfig.name}, sus servicios de desarrollo de
            software, sus productos propios (incluyendo LogikaSoft ERP), casos de éxito, contenido informativo
            (blog) y permitir que los visitantes soliciten cotizaciones o información a través del formulario de
            contacto. El Sitio es informativo/comercial y no constituye, por sí mismo, una plataforma
            transaccional de venta directa ni un portal de clientes autenticado.
          </p>

          <h2>2. Naturaleza de la información publicada</h2>
          <p>
            La información sobre servicios, productos, planes, precios y plazos publicada en el Sitio tiene
            carácter meramente informativo y comercial. Los precios de los planes se indican como &ldquo;a la
            medida&rdquo; y están sujetos a una cotización personalizada; ninguna cifra, plazo o característica
            publicada en el Sitio constituye una oferta comercial vinculante hasta que se formalice mediante una
            propuesta o contrato específico firmado entre las partes.
          </p>

          <h2>3. Uso del formulario de contacto</h2>
          <p>
            Al enviar el formulario de contacto, usted declara que la información proporcionada es veraz y que
            cuenta con la facultad para proporcionarla, incluyendo, si actúa en representación de una empresa, que
            está autorizado para solicitar información en su nombre. El envío del formulario no genera ninguna
            obligación contractual entre usted y {siteConfig.name}; únicamente da inicio a un proceso de
            comunicación comercial.
          </p>
          <p>
            Nos reservamos el derecho de no responder solicitudes que consideremos spam, fraudulentas, ofensivas o
            ajenas al propósito del formulario. El uso del formulario para fines distintos a solicitar información
            legítima sobre nuestros servicios y productos está prohibido.
          </p>

          <h2>4. Propiedad intelectual</h2>
          <p>
            Todo el contenido del Sitio —incluyendo textos, gráficos, logotipos, íconos, imágenes, código fuente,
            estructura y diseño— es propiedad de {siteConfig.name} o de sus licenciantes, y está protegido por las
            leyes de propiedad intelectual e industrial de Colombia y los tratados internacionales aplicables.
          </p>
          <p>
            Se prohíbe la reproducción, distribución, comunicación pública, transformación o cualquier otra forma
            de explotación, total o parcial, de los contenidos del Sitio sin la autorización previa y expresa de{" "}
            {siteConfig.name}, salvo en los casos permitidos por la ley (por ejemplo, cita con fines académicos con
            la debida atribución).
          </p>
          <p>
            Los nombres &ldquo;LOGIKA SOFT&rdquo;, &ldquo;LogikaSoft ERP&rdquo; y demás marcas, nombres comerciales
            y logotipos mostrados en el Sitio son propiedad de {siteConfig.legalName}. Ninguna disposición de estos
            Términos otorga licencia o derecho alguno sobre dichos signos distintivos.
          </p>

          <h2>5. Uso permitido del Sitio</h2>
          <p>Al usar el Sitio, usted se compromete a no:</p>
          <ul>
            <li>Utilizarlo con fines ilícitos, fraudulentos o contrarios a la buena fe.</li>
            <li>Intentar acceder sin autorización a áreas restringidas, sistemas o redes conectados al Sitio.</li>
            <li>Introducir virus, malware o cualquier código dañino a través del Sitio.</li>
            <li>
              Realizar solicitudes automatizadas o masivas al formulario de contacto (ver también las medidas de
              limitación de frecuencia descritas en nuestra documentación técnica).
            </li>
            <li>Extraer, mediante técnicas automatizadas (scraping) u otras, contenido del Sitio para su reutilización sin autorización.</li>
          </ul>

          <h2>6. Enlaces a sitios de terceros</h2>
          <p>
            El Sitio puede contener enlaces a sitios de terceros (por ejemplo, redes sociales, WhatsApp, o el mapa
            de ubicación de OpenStreetMap). {siteConfig.name} no controla ni se hace responsable del contenido,
            políticas de privacidad o prácticas de dichos sitios de terceros. El acceso a esos enlaces es bajo su
            propia responsabilidad.
          </p>

          <h2>7. Disponibilidad del Sitio</h2>
          <p>
            {siteConfig.name} procura mantener el Sitio disponible de forma continua, pero no garantiza que el
            acceso sea ininterrumpido o libre de errores. Nos reservamos el derecho de suspender, modificar o
            discontinuar el Sitio, total o parcialmente, en cualquier momento y sin previo aviso, por motivos de
            mantenimiento, seguridad o cualquier otra causa justificada.
          </p>

          <h2>8. Limitación de responsabilidad</h2>
          <p>
            En la máxima medida permitida por la ley, {siteConfig.name} no será responsable por daños directos,
            indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso del Sitio,
            incluyendo, sin limitarse a, pérdida de datos, pérdida de negocio o interrupción de actividad, salvo en
            los casos en que dicha limitación no sea admisible conforme a la legislación colombiana aplicable.
          </p>

          <h2>9. Protección de datos personales</h2>
          <p>
            El tratamiento de los datos personales que usted nos proporciona a través del Sitio se rige por
            nuestra <a href="/politicas/privacidad">Política de Privacidad</a>, la cual forma parte integral de
            estos Términos.
          </p>

          <h2>10. Modificaciones a estos Términos</h2>
          <p>
            Podemos modificar estos Términos en cualquier momento. Las modificaciones entrarán en vigor desde su
            publicación en esta misma página, indicando la fecha de la última actualización. El uso continuado del
            Sitio tras la publicación de cambios constituye la aceptación de los Términos modificados.
          </p>

          <h2>11. Ley aplicable y jurisdicción</h2>
          <p>
            Estos Términos se rigen por las leyes de la República de Colombia. Cualquier controversia derivada de
            su interpretación o cumplimiento se someterá a los jueces y tribunales competentes de Colombia, sin
            perjuicio de que las partes puedan acordar un mecanismo alternativo de solución de conflictos (por
            ejemplo, conciliación o arbitraje) en un contrato específico posterior.
          </p>

          <h2>12. Contacto</h2>
          <p>Para preguntas sobre estos Términos, puede contactarnos en:</p>
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
