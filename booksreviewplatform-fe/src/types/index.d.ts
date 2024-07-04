export interface Genre {
  id: number;
  name: string;
  description: string;
  slug: string;
}

export interface Review {
  id: number;
  book: number;
  rating: number;
  text: string;
  created_at: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  publication_date: string;
  genres: Genre[];
  cover_image: string;
  reviews: Review[];
}

export interface AuthResponse {
  refresh: string;
  access: string;
  id: number;
}

export interface SignupResponse {
  username: string;
  email: string;
  name: string;
  genres: string[];
}
