# INTEMPOREL

Site vitrine premium pour une maison de mode et couture haut de gamme basee au Togo, construit avec Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion, Shadcn/ui, React Hook Form, Zod et une strategie SEO technique complete.

## Points forts

- UX/UI luxe et responsive sur mobile, tablette, desktop et grands ecrans
- Hero immersif avec l'image fournie, overlay premium et leger effet parallax
- Contraste eleve, augmentation de la taille du texte et reduction des animations
- Navigation clavier complete, skip link, zones tactiles larges et focus visibles
- Galerie filtrable avec lightbox accessible
- Formulaire de contact valide cote client et cote serveur via Zod, avec envoi email reel via Resend et accuse de reception automatique
- Metadata API Next.js, Open Graph, Twitter Cards, sitemap XML et robots.txt
- Build optimise pour Vercel avec images Next.js, compression et pages statiques

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Shadcn/ui
- Lucide React
- React Hook Form
- Zod
- next-themes
- next-sitemap
- Resend

## Demarrage

```bash
npm install
cp .env.example .env.local
npm run dev
```

Application locale: `http://localhost:3000`

Sous Windows PowerShell, utilisez par exemple:

```powershell
Copy-Item .env.example .env.local
```

## Scripts utiles

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
```

Le script `build` genere aussi les artefacts SEO statiques via `next-sitemap`:

- `public/robots.txt`
- `public/sitemap.xml`
- `public/sitemap-0.xml`

## Variables d'environnement

Definissez les variables suivantes dans `.env.local` ou dans les variables d'environnement Vercel:

```bash
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=intemporel.rk@gmail.com
CONTACT_FROM_EMAIL="INTEMPOREL <onboarding@resend.dev>"
TESTIMONIAL_TO_EMAIL=intemporel.rk@gmail.com
TESTIMONIAL_FROM_EMAIL="INTEMPOREL <onboarding@resend.dev>"
SEMOA_API_URL=https://api.semoa.tld/payments
SEMOA_API_KEY=xxxxxxxxxxxxxxxxxxxx
SEMOA_MERCHANT_CODE=intemporel
SEMOA_RETURN_URL=https://votre-domaine.com/payment
SEMOA_WEBHOOK_URL=https://votre-domaine.com/api/payment/webhook
SEMOA_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxx
SEMOA_WEBHOOK_SIGNATURE_HEADER=x-semoa-signature
SEMOA_API_HEADERS_JSON={"X-Client-Id":"merchant-id"}
SEMOA_REQUEST_TEMPLATE={"reference":"{{reference}}","amount":"{{amount}}","currency":"{{currency}}","customer":{"name":"{{name}}","email":"{{email}}","phone":"{{phone}}"},"return_url":"{{returnUrl}}","callback_url":"{{webhookUrl}}"}
SEMOA_CHECKOUT_URL_PATH=data.checkout_url
SEMOA_MESSAGE_PATH=message
SEMOA_STATUS_PATH=data.status
SEMOA_WEBHOOK_REFERENCE_PATH=data.reference
SEMOA_WEBHOOK_STATUS_PATH=data.status
SEMOA_WEBHOOK_AMOUNT_PATH=data.amount
SEMOA_WEBHOOK_PROVIDER_PATH=data.provider
PAYMENT_STORE_FILE=.data/payment-records.json
```

Notes:

- `NEXT_PUBLIC_SITE_URL` sert aux URLs canoniques, Open Graph et sitemap.
- `RESEND_API_KEY` active l'envoi reel des demandes de contact.
- `CONTACT_TO_EMAIL` est l'adresse de reception des demandes.
- `CONTACT_FROM_EMAIL` peut rester sur `onboarding@resend.dev` pour les premiers tests, puis etre remplacee par un domaine verifie dans Resend.
- `TESTIMONIAL_TO_EMAIL` permet de recevoir les temoignages envoyes depuis la home.
- `TESTIMONIAL_FROM_EMAIL` definit l'expediteur par defaut de ces temoignages.
- `SEMOA_API_URL` est l'endpoint de creation de paiement fourni par SEMOA.
- `SEMOA_API_KEY` active l'appel serveur vers la passerelle de paiement.
- `SEMOA_MERCHANT_CODE` identifie le compte marchand si SEMOA l'exige.
- `SEMOA_RETURN_URL` sert de page de retour apres paiement.
- `SEMOA_WEBHOOK_URL` permet de recevoir les confirmations asynchrones si vous activez le webhook cote SEMOA.
- `SEMOA_WEBHOOK_SECRET` protege la route webhook par bearer token ou header dedie.
- `SEMOA_WEBHOOK_SIGNATURE_HEADER` permet d'utiliser le nom exact du header envoye par SEMOA.
- `SEMOA_API_HEADERS_JSON` ajoute des headers specifiques au contrat marchand sans retoucher le code.
- `SEMOA_REQUEST_TEMPLATE` permet de mapper le JSON exact attendu par l'endpoint SEMOA via des placeholders `{{reference}}`, `{{amount}}`, `{{name}}`, `{{email}}`, `{{phone}}`, `{{collection}}`, `{{returnUrl}}`, `{{webhookUrl}}`.
- `SEMOA_CHECKOUT_URL_PATH`, `SEMOA_MESSAGE_PATH` et `SEMOA_STATUS_PATH` permettent d'extraire les bons champs de reponse si le format SEMOA differe.
- `SEMOA_WEBHOOK_REFERENCE_PATH`, `SEMOA_WEBHOOK_STATUS_PATH`, `SEMOA_WEBHOOK_AMOUNT_PATH` et `SEMOA_WEBHOOK_PROVIDER_PATH` permettent d'adapter le parsing du webhook au payload reel.
- `PAYMENT_STORE_FILE` permet de definir le fichier local de persistance des transactions si vous ne voulez pas utiliser le chemin par defaut.

Si `RESEND_API_KEY` ou `CONTACT_TO_EMAIL` sont absents, la route contact repond avec un statut `503` indiquant que la livraison email n'est pas encore configuree.
Si `SEMOA_API_URL` ou `SEMOA_API_KEY` sont absents, la route paiement repond avec un statut `503` et laisse le tunnel pret a etre active.

## Integration SEMOA

- Creation du paiement: [app/api/payment/route.ts](app/api/payment/route.ts)
- Webhook de confirmation: [app/api/payment/webhook/route.ts](app/api/payment/webhook/route.ts)
- Lecture d'un paiement par reference: [app/api/payment/[reference]/route.ts](app/api/payment/[reference]/route.ts)
- Helpers et mapping: [lib/payment.ts](lib/payment.ts)
- Persistance locale des paiements: [lib/payment-store.ts](lib/payment-store.ts)

## Suivi des paiements

- Lorsqu'un paiement est cree, une fiche locale est enregistree avec la reference et un statut initial.
- Lorsqu'un webhook SEMOA arrive, la fiche est mise a jour vers `paid`, `failed`, `cancelled`, `pending` ou `unknown`.
- Le front peut ensuite verifier le statut via la reference du paiement.

Important: cette persistance est basee sur un fichier local. Elle est pratique pour un serveur Node classique ou le developpement local. Sur une plateforme serverless/ephemere, il faudra remplacer cette couche par une base durable.

Pour finaliser le point 1 avec le vrai contrat SEMOA, il faut recuperer au minimum:

- l'URL exacte de creation de paiement
- la methode d'authentification attendue
- les headers obligatoires
- le JSON exact de requete
- le chemin exact du lien de checkout dans la reponse
- le format du webhook et son mecanisme de signature

Ces informations se trouvent generalement dans la documentation marchande ou developpeur fournie apres ouverture de compte, dans un dashboard partenaire, ou directement aupres de SEMOA via `sales@semoa-togo.com` et `+228 93 15 15 17`.

## Architecture

```text
app/
	about/
	api/contact/
	contact/
	gallery/
	services/
	testimonials/
components/
	home/
	layout/
	shared/
	theme/
	ui/
features/
	contact/
	gallery/
hooks/
lib/
	contact-email.ts
	data.ts
	metadata.ts
	site.ts
styles/
types/
public/
	icons/
	images/
```

## Accessibilite

Le projet vise WCAG 2.2 AA avec:

- navigation clavier complete
- lien d'evitement vers le contenu principal
- contraste eleve
- augmentation de la taille du texte
- prise en compte de `prefers-reduced-motion`
- alt texts detailles sur les images principales
- composants et boutons avec focus states visibles

## SEO technique

- metadata centralisee via `lib/metadata.ts`
- URLs canoniques via `NEXT_PUBLIC_SITE_URL`
- JSON-LD organisationnel
- Open Graph et Twitter Cards
- sitemap et robots.txt automatiques
- structure semantique avec un H1 unique par page

## Formulaire contact

Le formulaire `features/contact/contact-form.tsx` utilise:

- React Hook Form pour l'etat du formulaire
- Zod pour la validation
- route `app/api/contact/route.ts` pour la validation serveur
- honeypot `website` pour limiter les soumissions automatisees
- Resend pour transmettre les demandes a une vraie boite email
- accuse de reception automatique envoye au client apres bonne reception de la demande

Le rendu email HTML et texte est centralise dans `lib/contact-email.ts`.

## Deploiement Vercel

1. Creer un repository vide sur GitHub.
2. Depuis ce dossier, publier le code:

```bash
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/VOTRE-UTILISATEUR/VOTRE-REPO.git
git push -u origin main
```

3. Importer ensuite ce repository GitHub dans Vercel.
4. Definir `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `TESTIMONIAL_TO_EMAIL` et `TESTIMONIAL_FROM_EMAIL`.
5. Verifier le domaine expediteur dans Resend avant le passage en production definitive.
6. Lancer le build standard `npm run build`.

Important: GitHub Pages n'est pas adapte a ce projet, car le site utilise Next.js App Router avec routes API. Pour que les clients voient un site fonctionnel, il faut publier le code sur GitHub puis deployer le site depuis GitHub vers Vercel.

Le projet est prepare pour une sortie production Vercel sans ajustement supplementaire cote code.

## Validation effectuee

- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Personnalisation rapide

- Contenu central: `lib/data.ts`
- Config SEO et contact: `lib/site.ts`
- Metadonnees partagees: `lib/metadata.ts`
- Hero image: `public/images/hero-couture.jpeg`
- Email HTML et texte: `lib/contact-email.ts`
- Tokens visuels globaux: `app/globals.css`

## Notes

L'image hero fournie dans le dossier initial a ete integree dans `public/images/hero-couture.jpeg` et sert de visuel principal du site.
