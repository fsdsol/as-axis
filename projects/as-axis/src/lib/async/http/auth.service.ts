export class AuthService {
  public static getToken(): string {
    if(localStorage.getItem('token')) {
      let user = JSON.parse(localStorage.getItem('token')!);
      return user.token_type + " " + user.access_token;
    } else {
      return '';
    }
  }
}
