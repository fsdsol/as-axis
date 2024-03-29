import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';

@Injectable()
export class MessageService {

    public success(message: string, title?: string, options?: any): void {
        Swal.fire(title, message, 'success');
    }

    public error(message: string, title?: string, options?: any): void {
        Swal.fire(title, message, 'error');
    }

    public info(message: string, title?: string, options?: any): void {
        Swal.fire(title, message, 'info');
    }

    public warn(message: string, title?: string, options?: any): void {
        Swal.fire(title, message, 'warning');
    }

    public confirm(title: string, confirmText: string, denyText: string) {
        Swal.fire({
            title: title,
            showDenyButton: true,
            confirmButtonText: confirmText,
            denyButtonText: denyText,            
        }).then((result: any) => {
            if (result.isConfirmed) {
                return true;
            } {
                return false;
            }
        });
        return false;
    }
}