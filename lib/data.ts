import type {
  Collection,
  GalleryItem,
  Service,
  ShowcasedGarment,
  StatItem,
  Testimonial,
} from "@/types/site";

export const brandStory = {
  eyebrow: "Production & vente",
  title:
    "Une marque de production sur mesure et de vente, pensee pour des pieces nettes et desirables.",
  description:
    "INTEMPOREL developpe des pieces feminines en production maitrisee, en petites series ou a la commande, avec une lecture claire entre selection, commande et livraison.",
};

export const services: Service[] = [
  {
    title: "Production sur mesure",
    description:
      "Des pieces produites a la commande avec adaptation de taille, choix de tissu ou ajustements selon le modele disponible.",
    details: [
      "Commande sur contact apres validation du modele",
      "Ajustements de taille selon disponibilite",
      "Production controlee en quantites limitees",
    ],
  },
  {
    title: "Vente de pieces disponibles",
    description:
      "Une selection de pieces deja developpees, proposees a la vente avec informations claires sur matiere, taille et disponibilite.",
    details: [
      "Modeles visibles sur le site",
      "Disponibilite annoncee avant commande",
      "Expedition ou remise selon organisation",
    ],
  },
  {
    title: "Series limitees",
    description:
      "Des capsules produites en petite quantite pour garder une offre forte, coherente et facile a commander.",
    details: [
      "Petites quantites par ligne",
      "Renouvellement selon la demande",
      "Selection de pieces fortes a la vente",
    ],
  },
  {
    title: "Commande a distance",
    description:
      "Un parcours simple pour commander sans deplacement en atelier, avec echanges directs sur le modele et la taille.",
    details: [
      "Validation par message ou formulaire",
      "Informations claires avant production",
      "Suivi jusqu'a livraison ou retrait",
    ],
  },
];

export const collections: Collection[] = [
  {
    slug: "atelier-sable",
    title: "Ligne Sable",
    season: "Collection 01",
    description:
      "Une ligne de pieces aux tons sable et aux coupes nettes, pensee pour la vente en petite serie et la commande sur mesure.",
    direction:
      "Une selection facile a proposer en ligne, avec modeles visibles, matieres identifiables et commande directe par contact.",
    looks: [
      {
        name: "Cape solaire",
        piece: "Look runway",
        caption:
          "Un volume imprime fort pour une entree de collection immediate.",
        image: "/images/_MG_6146_2.jpg",
        alt: "Modele sur podium portant un manteau long imprime aux tons bleus, ocres et bruns.",
      },
      {
        name: "Robe wax cobalt",
        piece: "Robe fluide",
        caption:
          "Une lecture souple et graphique pour une allure rare sur podium.",
        image: "/images/_MG_5867.jpg",
        alt: "Modele marchant sur un runway de nuit avec une robe imprimee bleue et brune.",
      },
      {
        name: "Top plume bleu",
        piece: "Modele fort",
        caption:
          "Un modele colore qui attire vite l'attention dans le catalogue.",
        image: "/images/S8A0316-scaled.jpg",
        alt: "Modele portant un haut bleu en plumes et une jupe asymetrique lors d'un defile en exterieur.",
      },
    ],
    pillars: [
      "Crepe lourd, organza et laine seche",
      "Volumes colonne et tailles structurees",
      "Serie limitee ou commande directe",
    ],
    image: "/images/_MG_6146_2.jpg",
    alt: "Silhouette de collection sur podium avec manteau imprime et collier statement.",
  },
  {
    slug: "noir-signature",
    title: "Noir Signature",
    season: "Collection 02",
    description:
      "Une ligne noire plus directe, avec pieces fortes faciles a mettre en avant sur une page de vente.",
    direction:
      "Une selection pour clientes qui cherchent des modeles visibles, sobres et faciles a commander.",
    looks: [
      {
        name: "Robe graphique bleue",
        piece: "Robe phare",
        caption:
          "Une coupe longue et nette qui fonctionne bien comme produit vedette.",
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
        caption:
          "Une allure plus tendue, pensee pour un impact immediat en defile.",
        image: "/images/94bde51ce6c1d07908987b79804409cf.jpg",
        alt: "Modele sur podium en robe longue bleue a motif graphique avec ouverture frontale.",
      },
    ],
    pillars: [
      "Laine froide, satin mat et contrastes sombres",
      "Tailoring precis et construction graphique",
      "Pieces fortes pour vente et commande",
    ],
    image: "/images/eaa7687c724ec4216fa5c4b5bae1c7ad.jpg",
    alt: "Silhouette editoriale en robe longue bleue et beige sur podium blanc et noir.",
  },
  {
    slug: "lumiere-ivoire",
    title: "Lumiere Ivoire",
    season: "Collection 03",
    description:
      "Une ligne claire et lumineuse avec modeles fluides, pensee pour la vente et les commandes selectionnees.",
    direction:
      "Une collection facile a lire en ligne, avec pieces fortes, tailles a confirmer et delais annonces avant production.",
    looks: [
      {
        name: "Robe blanche ample",
        piece: "Modele clair",
        caption:
          "Une piece lumineuse et facile a proposer dans une selection de vente.",
        image: "/images/94bde51ce6c1d07908987b79804409cf.jpg",
        alt: "Modele en robe blanche fluide avec grand chapeau imprime et sac assorti.",
      },
      {
        name: "Robe bordeaux",
        piece: "Modele long",
        caption:
          "Une ligne longue et fluide pour une selection premium simple a commander.",
        image: "/images/OPEC.jpeg",
        alt: "Modele portant une robe bordeaux longue a fines bretelles avec fente frontale.",
      },
      {
        name: "Ligne verte",
        piece: "Modele vert",
        caption:
          "Une proposition calme et lisible pour enrichir la collection en ligne.",
        image: "/images/th.jpeg",
        alt: "Modele portant une robe verte asymetrique sur fond beige lumineux.",
      },
    ],
    pillars: [
      "Organza double, soie et transparences maitrisees",
      "Capes, volumes amples et tombants lumineux",
      "Serie limitee et commandes confirmees par contact",
    ],
    image: "/images/OPEC.jpeg",
    alt: "Silhouette ceremonielle bordeaux photographiee en studio sur fond beige.",
  },
];

export const showcasedGarments: ShowcasedGarment[] = [
  {
    title: "Robe colonne Sable",
    category: "Modele disponible",
    description:
      "Une robe longue a tombant net, facile a mettre en avant comme piece disponible ou modele a commander.",
    material: "Crepe lourd et organza",
    availability: "Disponible sur commande",
    image: "/images/th.jpeg",
    alt: "Robe longue verte asymetrique presentee sur fond beige pour une vitrine de couture premium.",
  },
  {
    title: "Tailleur Noir Signature",
    category: "Piece forte",
    description:
      "Un ensemble noir aux lignes structurees, ideal pour une vente directe ou une commande sur mesure.",
    material: "Laine froide et satin mat",
    availability: "Disponible sur demande",
    image: "/images/OIP (20).webp",
    alt: "Silhouette feminine portant une robe rouge structuree avec fente et sac noir, pour une presentation editoriale.",
  },
  {
    title: "Cape Lumiere Ivoire",
    category: "Serie limitee",
    description:
      "Une piece ample et marquee qui donne du relief a la collection et peut etre produite a la commande.",
    material: "Organza double et soie",
    availability: "Edition limitee sur commande",
    image: "/images/OPEC.jpeg",
    alt: "Robe de ceremonie bordeaux a fines bretelles et fente haute presentee sur fond studio beige.",
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Modele signature",
    category: "Nouveaute",
    description:
      "Une piece forte utilisee pour ouvrir la collection et donner le ton du catalogue.",
    alt: "Silhouette couture portant un chapeau oversize turquoise et une robe graphique orange, bleue et noire sur fond orange.",
    image: "/images/hero-couture.jpeg",
  },
  {
    id: "g2",
    title: "Preparation modele",
    category: "Production",
    description:
      "Verification du modele et des ajustements avant lancement en production.",
    alt: "Styliste en train de mesurer un mannequin noir dans un atelier de couture lumineux.",
    image: "/images/istockphoto-530420392-612x612.jpg",
  },
  {
    id: "g3",
    title: "Robe terre cuite",
    category: "Disponibles",
    description:
      "Une silhouette allongee au ton chaud, deja prete a etre proposee dans la selection disponible.",
    alt: "Modele portant une robe rouge terre cuite avec boutons dores et fente frontale.",
    image: "/images/OIP (20).webp",
  },
  {
    id: "g4",
    title: "Robe vert atelier",
    category: "Disponibles",
    description:
      "Une robe fluide et structuree qui trouve facilement sa place dans la selection immediate.",
    alt: "Robe longue verte asymetrique sur fond beige dans un studio de mode.",
    image: "/images/th.jpeg",
  },
  {
    id: "g5",
    title: "Bordeaux de soiree",
    category: "Series limitees",
    description:
      "Une ligne nette produite en quantite limitee pour garder une offre forte et controlee.",
    alt: "Robe bordeaux longue a fines bretelles et fente haute presentee en studio.",
    image: "/images/OPEC.jpeg",
  },
  {
    id: "g6",
    title: "Runway wax bleu",
    category: "Nouveaute",
    description:
      "Une robe imprimee au tombant souple, mise en avant comme nouveaute de la collection.",
    alt: "Modele sur runway nocturne portant une robe sans bretelles a motif bleu et brun.",
    image: "/images/_MG_5867.jpg",
  },
  {
    id: "g7",
    title: "Manteau graphique",
    category: "Nouveaute",
    description:
      "Une silhouette forte et coloree qui ouvre la collection avec un impact immediat.",
    alt: "Modele portant un manteau imprime aux tons bleus et jaunes sur un podium de nuit.",
    image: "/images/_MG_6146_2.jpg",
  },
  {
    id: "g8",
    title: "Robe blanche ample",
    category: "Sur commande",
    description:
      "Une piece claire et fluide qui peut etre relancee en production apres validation.",
    alt: "Modele en robe blanche fluide avec chapeau imprime, lunettes et sac assorti.",
    image: "/images/94bde51ce6c1d07908987b79804409cf.jpg",
  },
  {
    id: "g9",
    title: "Robe graphique bleue",
    category: "Sur commande",
    description:
      "Une ligne longue et ajustee proposee comme modele vedette a relancer sur commande.",
    alt: "Modele sur podium portant une robe longue bleue et beige avec ouverture frontale.",
    image: "/images/eaa7687c724ec4216fa5c4b5bae1c7ad.jpg",
  },
  {
    id: "g10",
    title: "Top plume cobalt",
    category: "Series limitees",
    description:
      "Une silhouette vibrante reservee aux capsules en quantite courte.",
    alt: "Modele portant un haut en plumes bleues et une jupe asymetrique lors d'un defile en exterieur.",
    image: "/images/S8A0316-scaled.jpg",
  },
  {
    id: "g11",
    title: "Controle qualite",
    category: "Production",
    description:
      "Controle du tombant et des finitions avant confirmation de commande ou retrait.",
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
    label: "Commandes confirmees",
    value: "96%",
    description: "Taux de satisfaction apres commande et livraison.",
  },
  {
    label: "Delai moyen",
    value: "5 sem.",
    description: "Du lancement en production a la livraison selon modele.",
  },
  {
    label: "Villes desservies",
    value: "14",
    description: "Livraisons et retraits organises selon la destination.",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Claire Duval",
    role: "Cliente",
    quote:
      "La commande a ete simple, le modele etait conforme et la finition tres propre a la reception.",
  },
  {
    name: "Mariam El Hadi",
    role: "Acheteuse reguliere",
    quote:
      "J'ai pu confirmer le modele, la taille et le delai rapidement. Le rendu final etait exactement celui attendu.",
  },
  {
    name: "Sophie Lambert",
    role: "Cliente commande sur mesure",
    quote:
      "Le suivi a ete clair du debut a la fin. La piece est bien coupee et la livraison a ete bien organisee.",
  },
  {
    name: "Anais Morel",
    role: "Cliente collection",
    quote:
      "La collection est lisible, les modeles sont bien presentes et la commande se fait sans complication.",
  },
];
