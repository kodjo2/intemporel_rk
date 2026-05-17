import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import {
  buildContactAutoReplyEmail,
  buildContactEmail,
} from "@/lib/contact-email";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  service: z.string().min(1),
  occasion: z.string().min(2),
  message: z.string().min(20),
  website: z.string().optional(),
});

function getContactConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY,
    fromEmail:
      process.env.CONTACT_FROM_EMAIL ?? "INTEMPOREL <onboarding@resend.dev>",
    toEmail: process.env.CONTACT_TO_EMAIL,
  };
}

export async function POST(request: Request) {
  const body = (await request.json()) as unknown;
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { message: "Merci de verifier les informations saisies avant l'envoi." },
      { status: 400 },
    );
  }

  if (result.data.website) {
    return NextResponse.json({ message: "Demande recue." }, { status: 200 });
  }

  const config = getContactConfig();

  if (!config.apiKey || !config.toEmail) {
    return NextResponse.json(
      {
        message:
          "Le formulaire est configure, mais l'envoi email n'est pas encore active. Ajoutez RESEND_API_KEY et CONTACT_TO_EMAIL dans l'environnement.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(config.apiKey);
  const email = buildContactEmail(result.data);
  const autoReply = buildContactAutoReplyEmail(result.data);

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
            "L'envoi de votre demande a echoue pour le moment. Merci de reessayer dans quelques instants.",
        },
        { status: 502 },
      );
    }

    const autoReplyResult = await resend.emails.send({
      from: config.fromEmail,
      to: [result.data.email],
      replyTo: config.toEmail,
      subject: autoReply.subject,
      text: autoReply.text,
      html: autoReply.html,
    });

    if (autoReplyResult.error) {
      console.error("Contact auto-reply failed", autoReplyResult.error);
    }
  } catch {
    return NextResponse.json(
      {
        message:
          "L'envoi de votre demande a echoue pour le moment. Merci de reessayer dans quelques instants.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message:
      "Votre demande a bien ete envoyee. L'atelier vous recontacte sous 24 heures ouvrables.",
  });
}
