import { Component, OnInit } from '@angular/core';
import { AjaxRequestsService } from "../ajax-requests.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private ajax: AjaxRequestsService) { }

  ngOnInit(): void {
    this.ajax.request("http://localhost:80/ristorante-covid/SERVER/menuEntries.php").subscribe(response => console.log(response));
  }

}
