export class Account {
  constructor(
    public userID: string,
    public accessKey: string,
    public grantType: 'password' | 'refresh_token'
  ) {}
}
