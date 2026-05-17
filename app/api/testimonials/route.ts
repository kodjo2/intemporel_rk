import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { buildTestimonialEmail } from "@/lib/testimonial-email";

export const runtime = "nodejs";

const testimonialSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.string().min(2),
  quote: z.string().min(20),
  website: z.string().optional(),
});

function getTestimonialConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY,
    fromEmail:
      process.env.TESTIMONIAL_FROM_EMAIL ??
      process.env.CONTACT_FROM_EMAIL ??
      "INTEMPOREL <onboarding@resend.dev>",
    toEmail: process.env.TESTIMONIAL_TO_EMAIL ?? process.env.CONTACT_TO_EMAIL,
  };
}

export async function POST(request: Request) {
  const body = (await request.json()) as unknown;
  const result = testimonialSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        message:
          "Merci de verifier votre nom, votre email et votre temoignage avant l'envoi.",
      },
      { status: 400 },
    );
  }

  if (result.data.website) {
    return NextResponse.json({ message: "Temoignage recue." }, { status: 200 });
  }

  const config = getTestimonialConfig();

  if (!config.apiKey || !config.toEmail) {
    return NextResponse.json(
      {
        message:
          "Le formulaire est pret, mais l'envoi n'est pas encore active. Ajoutez RESEND_API_KEY et CONTACT_TO_EMAIL ou TESTIMONIAL_TO_EMAIL.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(config.apiKey);
  const email = buildTestimonialEmail(result.data);

  try {
    const sendResult = await resend.emails.send({
      from: config.fromEmail,
      to: [config.toEmail],
      replyTo: result.data.email,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });

    if (sendResult.error) {
      return NextResponse.json(
        {
          message:
            "L'envoi du temoignage a echoue pour le moment. Merci de reessayer dans quelques instants.",
        },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      {
        message:
          "L'envoi du temoignage a echoue pour le moment. Merci de reessayer dans quelques instants.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message:
      "Merci. Votre temoignage a bien ete envoye et sera relu avant publication.",
  });
}
