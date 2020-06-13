import { Component } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { SharedDataService } from "./shared-data.service";
import { isUndefined } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title: string;

  constructor(private cookieService: CookieService, private router: Router, private sdata:SharedDataService) { }

  public ngOnInit(): void{
    if (!this.cookieService.check('client-type')) {
      this.cookieService.set('client-type', 'menu');
    }
    this.title = this.cookieService.get('client-type');
    console.log(localStorage);
    if(this.sdata.getOrdine() === null && this.sdata.getTavolo() === null) this.sdata.setData("0", this.cookieService.get("table"));
    this.router.navigate(["/"+this.title]);
  }
}
