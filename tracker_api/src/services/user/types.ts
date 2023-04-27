export interface ILoginResponse {
  token: string;
}

export interface IUserDetail {
  email: string;
  firstName: string;
  lastName: string;
  dateJoined: Date;
}
