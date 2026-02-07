export interface User {
  id: string;
  username: string;
  passwordHash: string;
}

export interface UserPayload {
  id: string;
  username: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  user?: UserPayload;
}
