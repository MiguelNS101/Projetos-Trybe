export interface UserInterface {
  username: string;
  email: string;
  role: string;
  password: string;
}

export type LoginInterface = Omit<UserInterface, 'role' | 'username'>;
export type JWTInterface = Omit<UserInterface, 'password'>;

export type Token = {
  role: string,
};

export type TokenData = {
  data: Token
};
