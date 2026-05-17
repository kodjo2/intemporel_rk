type ContactEmailPayload = {
  name: string;
  email: string;
  service: string;
  occasion: string;
  message: string;
};

const serviceLabels: Record<string, string> = {
  couture: "Couture sur mesure",
  bridal: "Bridal couture",
  capsule: "Garde-robe capsule",
  consulting: "Consulting image",
};

export function getContactServiceLabel(service: string) {
  return serviceLabels[service] ?? service;
}

export function buildContactEmail(payload: ContactEmailPayload) {
  const serviceLabel = getContactServiceLabel(payload.service);

  return {
    subject: `Nouvelle demande atelier - ${payload.name}`,
    text: [
      "Nouvelle demande via le formulaire INTEMPOREL",
      "",
      `Nom: ${payload.name}`,
      `Email: ${payload.email}`,
      `Service: ${serviceLabel}`,
      `Occasion: ${payload.occasion}`,
      "",
      "Message:",
      payload.message,
    ].join("\n"),
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.65;color:#101010;background:#f8f4ed;padding:32px;">
        <div style="max-width:720px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px;border:1px solid rgba(16,16,16,0.08);">
          <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.28em;text-transform:uppercase;color:#c4a362;font-weight:700;">INTEMPOREL</p>
          <h1 style="margin:0 0 20px;font-size:32px;line-height:1.1;font-weight:700;">Nouvelle demande via le formulaire de contact</h1>
          <table style="width:100%;border-collapse:collapse;margin:0 0 24px;">
            <tbody>
              <tr>
                <td style="padding:10px 0;font-weight:700;width:160px;vertical-align:top;">Nom</td>
                <td style="padding:10px 0;">${escapeHtml(payload.name)}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-weight:700;width:160px;vertical-align:top;">Email</td>
                <td style="padding:10px 0;">${escapeHtml(payload.email)}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-weight:700;width:160px;vertical-align:top;">Service</td>
                <td style="padding:10px 0;">${escapeHtml(serviceLabel)}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-weight:700;width:160px;vertical-align:top;">Occasion</td>
                <td style="padding:10px 0;">${escapeHtml(payload.occasion)}</td>
              </tr>
            </tbody>
          </table>
          <div style="border-top:1px solid rgba(16,16,16,0.08);padding-top:20px;">
            <p style="margin:0 0 10px;font-weight:700;">Message</p>
            <p style="margin:0;white-space:pre-wrap;">${escapeHtml(payload.message)}</p>
          </div>
        </div>
      </div>
    `,
  };
}

export function buildContactAutoReplyEmail(payload: ContactEmailPayload) {
  const serviceLabel = getContactServiceLabel(payload.service);

  return {
    subject: "INTEMPOREL - demande bien recue",
    text: [
      `Bonjour ${payload.name},`,
      "",
      "Votre demande a bien ete recue par INTEMPOREL.",
      "Nous revenons vers vous sous 24 heures ouvrables avec une premiere orientation sur le service, le calendrier et le format de rendez-vous le plus adapte.",
      "",
      "Recapitulatif de votre demande:",
      `- Service: ${serviceLabel}`,
      `- Occasion: ${payload.occasion}`,
      `- Email: ${payload.email}`,
      "",
      "Message transmis:",
      payload.message,
      "",
      "INTEMPOREL",
      "12 avenue Montaigne, Paris",
    ].join("\n"),
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.65;color:#101010;background:#f8f4ed;padding:32px;">
        <div style="max-width:720px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px;border:1px solid rgba(16,16,16,0.08);">
          <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.28em;text-transform:uppercase;color:#c4a362;font-weight:700;">INTEMPOREL</p>
          <h1 style="margin:0 0 20px;font-size:32px;line-height:1.1;font-weight:700;">Bonjour ${escapeHtml(payload.name)}, votre demande a bien ete recue.</h1>
          <p style="margin:0 0 14px;">Nous revenons vers vous sous <strong>24 heures ouvrables</strong> avec une premiere orientation sur le service, le calendrier et le format de rendez-vous le plus adapte.</p>
          <div style="margin:24px 0;padding:20px;border-radius:18px;background:#f8f4ed;border:1px solid rgba(16,16,16,0.08);">
            <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#c4a362;font-weight:700;">Recapitulatif</p>
            <p style="margin:0 0 6px;"><strong>Service:</strong> ${escapeHtml(serviceLabel)}</p>
            <p style="margin:0 0 6px;"><strong>Occasion:</strong> ${escapeHtml(payload.occasion)}</p>
            <p style="margin:0;"><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
          </div>
          <div style="border-top:1px solid rgba(16,16,16,0.08);padding-top:20px;">
            <p style="margin:0 0 10px;font-weight:700;">Message transmis</p>
            <p style="margin:0;white-space:pre-wrap;">${escapeHtml(payload.message)}</p>
          </div>
          <p style="margin:24px 0 0;color:#635b4d;">Cet email confirme uniquement la bonne reception de votre demande. Vous pouvez simplement repondre a ce message si vous souhaitez ajouter une precision.</p>
        </div>
      </div>
    `,
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
