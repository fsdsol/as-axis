import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `<ngx-spinner bdColor = "rgba(0, 0, 0, 0.8)" size = "large" color = "#fff" type = "ball-scale-multiple"></ngx-spinner>`,
})
export class LoadingComponent {

  constructor() { }

}
