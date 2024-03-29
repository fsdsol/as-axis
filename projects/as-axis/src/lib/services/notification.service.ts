import {ToastrService} from "ngx-toastr";
import {Injectable} from "@angular/core";

@Injectable()
export class NotifyService {

  constructor(private toaster: ToastrService) {
  }

  public info(message: string, title?: string, options?: any): void {
    this.toaster.info(message, title, options);
  }

  public success(message: string, title?: string, options?: any): void {
    this.toaster.success(message, title, options);
  }

  public warn(message: string, title?: string, options?: any): void {
    this.toaster.warning(message, title, options);
  }

  public error(message: string, title?: string, options?: any): void {
    this.toaster.error(message, title, options);
  }
}
