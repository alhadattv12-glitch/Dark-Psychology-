export enum ImageStyle {
  REALISTIC = 'Hyperrealistic',
  CINEMATIC = 'Cinematic',
  FILM_NOIR = 'Film Noir',
  GOTHIC = 'Gothic Art',
  SURREALIST = 'Surrealist',
  BAROQUE = 'Baroque',
  CHIAROSCURO = 'Chiaroscuro',
  FANTASY = 'Fantasy Art',
  ABSTRACT = 'Abstract',
  NEON_PUNK = 'Neon Punk',
  VINTAGE = 'Vintage Photo',
}

export type GeneratedPrompts = {
  long: string;
  medium: string;
  short: string;
};