type TestimonialPayload = {
  name: string;
  email: string;
  role: string;
  quote: string;
};

export function buildTestimonialEmail(payload: TestimonialPayload) {
  return {
    subject: `Nouveau temoignage client - ${payload.name}`,
    text: [
      "Nouveau temoignage envoye depuis la page d'accueil INTEMPOREL",
      "",
      `Nom: ${payload.name}`,
      `Email: ${payload.email}`,
      `Role: ${payload.role}`,
      "",
      "Temoignage:",
      payload.quote,
    ].join("\n"),
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.65;color:#101010;background:#f8f4ed;padding:32px;">
        <div style="max-width:720px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px;border:1px solid rgba(16,16,16,0.08);">
          <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.28em;text-transform:uppercase;color:#c4a362;font-weight:700;">INTEMPOREL</p>
          <h1 style="margin:0 0 20px;font-size:32px;line-height:1.1;font-weight:700;">Nouveau temoignage client</h1>
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
                <td style="padding:10px 0;font-weight:700;width:160px;vertical-align:top;">Role</td>
                <td style="padding:10px 0;">${escapeHtml(payload.role)}</td>
              </tr>
            </tbody>
          </table>
          <div style="border-top:1px solid rgba(16,16,16,0.08);padding-top:20px;">
            <p style="margin:0 0 10px;font-weight:700;">Temoignage</p>
            <p style="margin:0;white-space:pre-wrap;">${escapeHtml(payload.quote)}</p>
          </div>
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
