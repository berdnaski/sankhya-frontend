export interface RegisterUser {
    name: string;
    phone: string;
    password: string;
  }
  
  export interface LoginUser {
    phone: string;
    password: string;
  }
  
  export interface AuthResponse {
    name: string;
    phone: string;
    token: string;
  }
  