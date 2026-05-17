export type NavItem = {
  href: string;
  label: string;
  sectionId?: string;
};

export type Service = {
  title: string;
  description: string;
  details: string[];
};

export type CollectionLook = {
  name: string;
  piece: string;
  caption: string;
  image: string;
  alt: string;
};

export type Collection = {
  slug: string;
  title: string;
  season: string;
  description: string;
  direction: string;
  looks: CollectionLook[];
  pillars: string[];
  image: string;
  alt: string;
};

export type ShowcasedGarment = {
  title: string;
  category: string;
  description: string;
  material: string;
  availability: string;
  image: string;
  alt: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  alt: string;
  image: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export type StatItem = {
  label: string;
  value: string;
  description: string;
};
