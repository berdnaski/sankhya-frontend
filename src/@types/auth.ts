export interface RegisterCustomer {
    name: string;
    phone: string;
    password: string;
  }
  
  export interface LoginCustomer {
    phone: string;
    password: string;
  }
  
  export interface AuthResponse {
    name: string;
    phone: string;
    token: string;
    id: string;
  }

  export interface CustomerProps {
    uid: string;
    name: string;
    phone: string;
  }
  