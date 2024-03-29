import {Injectable} from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class SpinnerService {

    constructor(private spinner: NgxSpinnerService) {
    }

    public show(): void {
        this.spinner.show();
    }
    
    public hide(): void {        
        this.spinner.hide();
    }
}