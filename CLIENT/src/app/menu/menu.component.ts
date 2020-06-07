import { Component, OnInit } from '@angular/core';
import { AjaxRequestsService } from "../ajax-requests.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuEntries: Array<Object>;
  tipologie: Array<Object>;

  constructor(private ajax: AjaxRequestsService) { 
    this.tipologie = new Array<Object>();
    this.menuEntries = Array<Object>();
  }

  ngOnInit(): void {
    this.ajax.request("http://localhost:80/ristorante-covid/SERVER/tipologie.php").subscribe(response => {
      Object.values(response).forEach(element => {
        this.tipologie.push(element['tipologia']);
      });

      this.tipologie.forEach(i => {
        this.ajax.request("http://localhost:80/ristorante-covid/SERVER/menuEntries.php?tipologia="+i).subscribe(response => {
          Object.values(response).forEach(element => {
            if(element['img'].length != 0) element['img'] = this.getImage(element['img']);
            this.menuEntries.push(element);
          })
        });
      });
    });
  }

  placeOrder(id: String){
    console.log("Help Me");
  }

  helpRequest(){

    console.log("Help Me");
    
  }

  getImage(img: String){
    return "http://localhost:80/ristorante-covid/SERVER/"+img;
  }

}
