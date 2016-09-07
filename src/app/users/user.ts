export class User {
  public id: number;
  public uid: string;
  public email: string;
  public password: string;
  public password_confirmation: string;
  public confirm_success_url: string;
  public licenser_id: string;
  public redirect_url: string;

  constructor(
    {email = '', password = '', password_confirmation = ''}: 
    {email?: string, password?: string, password_confirmation?: string} = {}) {
      this.email = email;
      this.password = password;
      this.password_confirmation = password_confirmation;
  }
}
