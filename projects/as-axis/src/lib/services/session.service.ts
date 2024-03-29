import {Injectable} from "@angular/core";
import {ResponseModel} from "../models";
import {HttpService} from "../async/http";

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private _user: ResponseModel | undefined;

  constructor(
    private _httpClient: HttpService
  ) {
    this.init();
  }

  init(): Promise<any> {
    return new Promise<any>((resolve, reject) => {     
      this._httpClient.get('token/verify', (res: any) => {
        if (res.Status == 1) {
          this._user = new ResponseModel(res);
          resolve(this._user);
        } else {
          reject(res.Message);
        }
      });         
    });
  }

  get user(): ResponseModel {
    return this._user!;
  }
}
