export interface AuthResponse {
    refresh: string;
    access: string;
  }
  
  export interface SignupResponse {
    username: string;
    email: string;
    name: string;
    genres: string[];
  }
  