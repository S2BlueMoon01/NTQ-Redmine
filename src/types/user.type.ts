export interface User {
  // TODO: Define User
}

export interface UserLoginInput {
  username: string;
  password: string;
}

export interface UserAccount {
  id: number;
  login: string;
  admin: boolean;
  firstname: string;
  lastname: string;
  mail: string;
  created_on: string;
  last_login_on: string;
  api_key: string;
  custom_fields: {
    id: number;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
  }[];
}
