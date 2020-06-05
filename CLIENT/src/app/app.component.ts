import { Component } from '@angular/core';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title: string;

  constructor(private cookieService: CookieService) { }

  public ngOnInit(): void{
    if (!this.cookieService.check('client-type')) {
      this.cookieService.set('client-type', 'menu');
    }
    this.title = this.cookieService.get('client-type');
  }
}
