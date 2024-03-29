import { NgModule } from '@angular/core';
import {ToastrModule} from "ngx-toastr";
import { MessageService, NotifyService, SessionService, SpinnerService } from './services';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpServiceModule } from './async/http';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './components/loading/loading.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    ToastrModule.forRoot({
      closeButton: true,
      preventDuplicates: true,
    }),
    HttpServiceModule.forRoot(),
    HttpClientModule,
    NgxSpinnerModule,
    MatDialogModule,
  ],
  exports: [LoadingComponent],
  providers: [
    SessionService,
    NotifyService,
    SpinnerService,    
    MessageService
  ]
})
export class AsAxisModule { }
