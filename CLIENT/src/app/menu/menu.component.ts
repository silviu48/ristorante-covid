import { Component, OnInit } from '@angular/core';
import { AjaxRequestsService } from "../ajax-requests.service";
import { SseService } from "../sse.service";
import { HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuEntries: Array<Object>;
  tipologie: Array<Object>;

  constructor(private ajax: AjaxRequestsService, private sse: SseService) { 
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
    this.sse
      .getServerSentEvent("http://localhost/ristorante-covid/SERVER/serveSSE.php")
      .subscribe(data => {
        data = JSON.parse(data);
        data.map(element =>
          this.menuEntries.reduce((accumulator, orig) => (
            (orig['id']  === element.id) ? (
              orig['ordiniAttivi'] = element.ordiniAttivi,
              orig['disponibile'] = element.disponibile
            ) : accumulator
          ), element)
        );
      });
  }

  placeOrder(id: string){

    this.ajax.request("http://localhost/ristorante-covid/SERVER/newOrder.php",new HttpParams().set("id", id)).subscribe(response =>{
      if(response == "true"){
        this.menuEntries.forEach(element => {
          if(element['id'] == id) element['ordiniAttivi']++;
        });
      } else console.log(response);
      
    }, error => console.log(error));

  }

  helpRequest(){

    console.log("ほう…向かってくるのか");
    
  }

  showOrders(){

    console.log("Hello there General Kenobi!");

  }

  getImage(img: String){
    return "http://localhost:80/ristorante-covid/SERVER/"+img;
  }

}
