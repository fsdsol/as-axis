import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {throwError as observableThrowError} from 'rxjs';
import {catchError} from "rxjs/operators";
import { AppConstants } from "../../app-constants";
import { NotifyService, SpinnerService } from "../../services";

@Injectable()
export class HttpService {

  public constructor(protected http: HttpClient, 
    protected notify: NotifyService, 
    protected loading: SpinnerService) {}  
  
  public AprUrl() {
    return AppConstants.remoteServiceBaseUrl;
  }  
  
  public post<T>(url: string, data: any = null, callback: (res: any) => any) {    
    let headers = new HttpHeaders();
    if(!AppConstants.isformData) {
      headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    }
    return this.http.post<T>(AppConstants.remoteServiceBaseUrl + url, data, {
      headers: headers
    }).pipe(catchError(this.errorHandler)).subscribe((response: any) => {
        if (!AppConstants.isMultiRequest)
          this.loading.hide();
        if(AppConstants.isResjson == true) {
          if (response.Status == 1) {
            callback(response);
          } else {
            this.notify.error(response.Message);
          }
        } else {
          callback(response);
        }        
      },
      (error: any) => {
        this.loading.hide();
        this.notify.error(error);
      });
  }

  public get<T>(url: string, callback: (res: any) => any) {    
    return this.http.get<T>(AppConstants.remoteServiceBaseUrl + url)
      .pipe(catchError(this.errorHandler)).subscribe((response: any) => {
        if (!AppConstants.isMultiRequest)
          this.loading.hide();
        if (response.Status == 1) {
          callback(response);
        } else {
          this.notify.error(response.Message);
        }
      },
      (error: any) => {
        this.loading.hide();
        this.notify.error(error);
      });
  }

  public downloadFile(url: string, callback: (res: any) => any) {
    return this.http.get(AppConstants.remoteServiceBaseUrl + url, {observe: 'response', responseType: 'blob'})
    .pipe(catchError(this.errorHandler)).subscribe((response: any) => {
      if (!AppConstants.isMultiRequest)
        this.loading.hide();
      callback(response);
    },
    (error: any) => {
      this.loading.hide();
      this.notify.error(error);
    });
  }

  // public get<T>(url: string) {
  //   return this.http.get<T>(AppConstants.remoteServiceBaseUrl + url)
  //     .pipe(catchError(this.errorHandler));
  // }


  public errorHandler(error: HttpErrorResponse): any {
    if(error.status === 401) {
      window.location.reload();
    }
    else if(error.error.error == "invalid_grant")
      return observableThrowError(error.error.error_description || 'Server Error');
    else
      return observableThrowError(error.message || 'Server Error');
  }
}
