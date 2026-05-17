import type {
  Collection,
  GalleryItem,
  Service,
  ShowcasedGarment,
  StatItem,
  Testimonial,
} from "@/types/site";

export const brandStory = {
  eyebrow: "Couture signature",
  title: "Une maison de mode pensee comme une experience de collection privee.",
  description:
    "INTEMPOREL compose des silhouettes sculpturales, des lignes precises et des matieres nobles pour une clientele qui attend autant d'exigence que d'emotion.",
};

export const services: Service[] = [
  {
    title: "Couture sur mesure",
    description:
      "Une creation developpee autour de votre allure, de votre rythme de vie et de votre narration personnelle.",
    details: [
      "Direction artistique privee",
      "Essayages successifs et patronage exclusif",
      "Selection de soies, laines, tulles et broderies d'exception",
    ],
  },
  {
    title: "Bridal couture",
    description:
      "Des pieces ceremoniales qui privilegient la grace du mouvement et la perfection des finitions.",
    details: [
      "Voiles, capes et silhouettes architecturales",
      "Accompagnement pour essayages a distance",
      "Coordination des delais evenementiels",
    ],
  },
  {
    title: "Garde-robe capsule",
    description:
      "Un vestiaire edit de pieces fortes et intemporelles, concu pour durer et se transmettre.",
    details: [
      "Audit de style et palette personelle",
      "Coordination tenue, accessoires et souliers",
      "Plan de collection saisonniere",
    ],
  },
  {
    title: "Consulting image & direction mode",
    description:
      "Un accompagnement premium pour dirigeantes, artistes et maisons en recherche d'une signature visuelle nette.",
    details: [
      "Curation d'image et prises de parole publiques",
      "Direction de shootings et presentations presse",
      "Styling editorial et runway consultatif",
    ],
  },
];

export const collections: Collection[] = [
  {
    slug: "atelier-sable",
    title: "Atelier Sable",
    season: "Collection 01",
    description:
      "Une ligne de silhouettes calmes et architecturales qui travaille les volumes nets, les beiges profonds et les matieres a tombant long.",
    direction:
      "Pensee pour les rendez-vous prives, les presentations confidentielles et les garde-robes qui cherchent une elegance silencieuse.",
    looks: [
      {
        name: "Cape solaire",
        piece: "Look runway",
        caption: "Un volume imprime fort pour une entree de collection immediate.",
        image: "/images/_MG_6146_2.jpg",
        alt: "Modele sur podium portant un manteau long imprime aux tons bleus, ocres et bruns.",
      },
      {
        name: "Robe wax cobalt",
        piece: "Robe fluide",
        caption: "Une lecture souple et graphique pour une allure rare sur podium.",
        image: "/images/_MG_5867.jpg",
        alt: "Modele marchant sur un runway de nuit avec une robe imprimee bleue et brune.",
      },
      {
        name: "Top plume bleu",
        piece: "Silhouette evenement",
        caption: "Une composition vive qui capte l'attention des le premier regard.",
        image: "/images/S8A0316-scaled.jpg",
        alt: "Modele portant un haut bleu en plumes et une jupe asymetrique lors d'un defile en exterieur.",
      },
    ],
    pillars: [
      "Crepe lourd, organza et laine seche",
      "Volumes colonne et tailles structurees",
      "Capsule privee ou selection de vitrine",
    ],
    image: "/images/_MG_6146_2.jpg",
    alt: "Silhouette de collection sur podium avec manteau imprime et collier statement.",
  },
  {
    slug: "noir-signature",
    title: "Noir Signature",
    season: "Collection 02",
    description:
      "Un vocabulaire plus editorial, taille dans le noir profond, les reflets satin et les coupes nettes pour une presence immediate.",
    direction:
      "Concue pour l'image, la prise de parole publique, les shootings et les silhouettes fortes a impact presse.",
    looks: [
      {
        name: "Robe graphique bleue",
        piece: "Robe couture",
        caption: "Une coupe longue et nette qui affirme la silhouette en image editoriale.",
        image: "/images/eaa7687c724ec4216fa5c4b5bae1c7ad.jpg",
        alt: "Modele portant une robe longue bleue et beige a motif graphique sur podium.",
      },
      {
        name: "Robe fendue brique",
        piece: "Look hero",
        caption: "Une silhouette de caractere, directe et facile a memoriser.",
        image: "/images/OIP (20).webp",
        alt: "Modele portant une robe rouge brique structuree avec fente haute et sac noir.",
      },
      {
        name: "Ligne crocodile bleu",
        piece: "Silhouette podium",
        caption: "Une allure plus tendue, pensee pour un impact immediat en defile.",
        image: "/images/94bde51ce6c1d07908987b79804409cf.jpg",
        alt: "Modele sur podium en robe longue bleue a motif graphique avec ouverture frontale.",
      },
    ],
    pillars: [
      "Laine froide, satin mat et contrastes sombres",
      "Tailoring precis et construction graphique",
      "Looks hero pour image et evenement",
    ],
    image: "/images/eaa7687c724ec4216fa5c4b5bae1c7ad.jpg",
    alt: "Silhouette editoriale en robe longue bleue et beige sur podium blanc et noir.",
  },
  {
    slug: "lumiere-ivoire",
    title: "Lumiere Ivoire",
    season: "Collection 03",
    description:
      "Une direction ceremonielle qui ouvre la silhouette, cherche la lumiere et compose un vestiaire de moments rares.",
    direction:
      "Developpee pour bridal couture, ceremonies civiles et apparitions ou le mouvement doit rester memorisable.",
    looks: [
      {
        name: "Robe blanche ample",
        piece: "Piece ceremonielle",
        caption: "Une presence claire, elegante et accessoirisee pour une entree memorisable.",
        image: "/images/94bde51ce6c1d07908987b79804409cf.jpg",
        alt: "Modele en robe blanche fluide avec grand chapeau imprime et sac assorti.",
      },
      {
        name: "Robe ceremonie bordeaux",
        piece: "Robe du soir",
        caption: "Une ligne longue et lumineuse pour les apparitions du soir.",
        image: "/images/OPEC.jpeg",
        alt: "Modele portant une robe bordeaux longue a fines bretelles avec fente frontale.",
      },
      {
        name: "Ligne verte couture",
        piece: "Silhouette invitee",
        caption: "Une proposition plus mode, calme et nette pour les moments d'image.",
        image: "/images/th.jpeg",
        alt: "Modele portant une robe verte asymetrique sur fond beige lumineux.",
      },
    ],
    pillars: [
      "Organza double, soie et transparences maitrisees",
      "Capes, volumes amples et tombants lumineux",
      "Edition ceremonielle et commandes sur rendez-vous",
    ],
    image: "/images/OPEC.jpeg",
    alt: "Silhouette ceremonielle bordeaux photographiee en studio sur fond beige.",
  },
];

export const showcasedGarments: ShowcasedGarment[] = [
  {
    title: "Robe colonne Atelier Sable",
    category: "Piece d'exposition",
    description:
      "Une robe longue a tombant net, pensee pour capter la lumiere en vitrine et donner une impression de calme couture immediat.",
    material: "Crepe lourd et organza",
    availability: "Disponible pour exposition capsule",
    image: "/images/th.jpeg",
    alt: "Robe longue verte asymetrique presentee sur fond beige pour une vitrine de couture premium.",
  },
  {
    title: "Tailleur Noir Signature",
    category: "Look editorial",
    description:
      "Un ensemble noir profond aux lignes structurees, ideal pour presenter une silhouette forte et contemporaine en espace premium.",
    material: "Laine froide et satin mat",
    availability: "Disponible sur demande",
    image: "/images/OIP (20).webp",
    alt: "Silhouette feminine portant une robe rouge structuree avec fente et sac noir, pour une presentation editoriale.",
  },
  {
    title: "Cape Lumiere Ivoire",
    category: "Piece ceremonielle",
    description:
      "Une piece ample et architecturale qui fonctionne comme point focal dans une vitrine, une galerie ou une presentation capsule.",
    material: "Organza double et soie",
    availability: "Edition limitee pour exposition privee",
    image: "/images/OPEC.jpeg",
    alt: "Robe de ceremonie bordeaux a fines bretelles et fente haute presentee sur fond studio beige.",
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Hero couture",
    category: "Editorial",
    description:
      "Une silhouette couture structuree, pensee comme manifeste visuel de la maison.",
    alt: "Silhouette couture portant un chapeau oversize turquoise et une robe graphique orange, bleue et noire sur fond orange.",
    image: "/images/hero-couture.jpeg",
  },
  {
    id: "g2",
    title: "Atelier en cours",
    category: "Atelier",
    description:
      "Prise de mesures et ajustement precis au mannequin dans un environnement de travail reel.",
    alt: "Styliste en train de mesurer un mannequin noir dans un atelier de couture lumineux.",
    image: "/images/istockphoto-530420392-612x612.jpg",
  },
  {
    id: "g3",
    title: "Robe terre cuite",
    category: "Collections",
    description:
      "Une silhouette allongee au ton chaud, concue pour un impact immediat en presentation.",
    alt: "Modele portant une robe rouge terre cuite avec boutons dores et fente frontale.",
    image: "/images/OIP (20).webp",
  },
  {
    id: "g4",
    title: "Evening emerald",
    category: "Collections",
    description:
      "Une robe fluide et structuree qui pose une presence sobre et couture.",
    alt: "Robe longue verte asymetrique sur fond beige dans un studio de mode.",
    image: "/images/th.jpeg",
  },
  {
    id: "g5",
    title: "Bordeaux de soiree",
    category: "Ceremonie",
    description:
      "Une ligne nette, une coupe ajustee et une ouverture de jambe qui signe la silhouette.",
    alt: "Robe bordeaux longue a fines bretelles et fente haute presentee en studio.",
    image: "/images/OPEC.jpeg",
  },
  {
    id: "g6",
    title: "Runway wax bleu",
    category: "Runway",
    description:
      "Une robe imprimee au tombant souple qui avance avec assurance sur le podium.",
    alt: "Modele sur runway nocturne portant une robe sans bretelles a motif bleu et brun.",
    image: "/images/_MG_5867.jpg",
  },
  {
    id: "g7",
    title: "Manteau graphique",
    category: "Runway",
    description:
      "Une silhouette forte, coloree et verticale pour rythmer la collection sur podium.",
    alt: "Modele portant un manteau imprime aux tons bleus et jaunes sur un podium de nuit.",
    image: "/images/_MG_6146_2.jpg",
  },
  {
    id: "g8",
    title: "Robe blanche ample",
    category: "Ceremonie",
    description:
      "Une allure claire et accessoirisee, entre elegance ceremonielle et mode image.",
    alt: "Modele en robe blanche fluide avec chapeau imprime, lunettes et sac assorti.",
    image: "/images/94bde51ce6c1d07908987b79804409cf.jpg",
  },
  {
    id: "g9",
    title: "Robe graphique bleue",
    category: "Editorial",
    description:
      "Une ligne longue et ajustee, pensee pour un impact editorial immediat.",
    alt: "Modele sur podium portant une robe longue bleue et beige avec ouverture frontale.",
    image: "/images/eaa7687c724ec4216fa5c4b5bae1c7ad.jpg",
  },
  {
    id: "g10",
    title: "Top plume cobalt",
    category: "Runway",
    description:
      "Une silhouette vibrante qui donne du souffle et du contraste a la galerie.",
    alt: "Modele portant un haut en plumes bleues et une jupe asymetrique lors d'un defile en exterieur.",
    image: "/images/S8A0316-scaled.jpg",
  },
  {
    id: "g11",
    title: "Salon prive",
    category: "Atelier",
    description:
      "Essayage prive sous lumiere naturelle avec selection de tissus et carnet de coupe.",
    alt: "Styliste en atelier en train de mesurer et ajuster une piece sur mannequin.",
    image: "/images/istockphoto-530420392-612x612.jpg",
  },
];

export const stats: StatItem[] = [
  {
    label: "Pieces realisees",
    value: "180+",
    description: "Silhouettes concues en edition unique ou micro-serie.",
  },
  {
    label: "Rendez-vous prives",
    value: "96%",
    description: "Taux de recommandation apres experience atelier.",
  },
  {
    label: "Delai moyen",
    value: "5 sem.",
    description: "De la direction artistique au fitting final selon projet.",
  },
  {
    label: "Villes desservies",
    value: "14",
    description: "Essayages prives organises en France et en Europe.",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Claire Duval",
    role: "Fondatrice de studio creatif",
    quote:
      "Chaque detail respire la maitrise. La coupe, le dialogue, l'experience en salon prive: tout est d'une rare precision.",
  },
  {
    name: "Mariam El Hadi",
    role: "Cliente bridal couture",
    quote:
      "Je voulais une allure nette, presque editoriale, sans perdre l'emotion. Romarice a trouve ce point d'equilibre exact.",
  },
  {
    name: "Sophie Lambert",
    role: "Collectionneuse de pieces couture",
    quote:
      "On sent la discipline d'une maison moderne, pas un simple atelier. Les finitions sont absolument irreprochables.",
  },
  {
    name: "Anais Morel",
    role: "Directrice communication luxe",
    quote:
      "Le vestiaire capsule livre une coherence visuelle immediate. C'est subtil, fort et extremement portable.",
  },
];
