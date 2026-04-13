export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginRespose {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
