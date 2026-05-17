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
```

Notes:

- `NEXT_PUBLIC_SITE_URL` sert aux URLs canoniques, Open Graph et sitemap.
- `RESEND_API_KEY` active l'envoi reel des demandes de contact.
- `CONTACT_TO_EMAIL` est l'adresse de reception des demandes.
- `CONTACT_FROM_EMAIL` peut rester sur `onboarding@resend.dev` pour les premiers tests, puis etre remplacee par un domaine verifie dans Resend.
- `TESTIMONIAL_TO_EMAIL` permet de recevoir les temoignages envoyes depuis la home.
- `TESTIMONIAL_FROM_EMAIL` definit l'expediteur par defaut de ces temoignages.

Si `RESEND_API_KEY` ou `CONTACT_TO_EMAIL` sont absents, la route contact repond avec un statut `503` indiquant que la livraison email n'est pas encore configuree.

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
