import { Component, OnInit } from '@angular/core';
import { SharedDataService } from "../shared-data.service";
import { AjaxRequestsService } from "../ajax-requests.service";
import { HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SseService } from '../sse.service';

export class OrdineCliente{
  nome: string;
  costo: number;
  quantita: number;

  constructor(obj: Object){
    this.nome = obj['nome'];
    this.costo = obj['costo'];
    this.quantita = obj['quantita'];
  }

}

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.scss']
})

export class CarrelloComponent implements OnInit {
  ordineAttuale: string;
  tavolo: string;
  myOrders: MatTableDataSource<Object>;
  backDisabled: boolean = false;
  tableHeader:string[] = ["nome", "costo", "quantita", "totale"];

  constructor(private sdata: SharedDataService, private ajax: AjaxRequestsService, private _snackBar: MatSnackBar, private sse: SseService) {
    this.myOrders = new MatTableDataSource<OrdineCliente>(); 
  }

  ngOnInit(): void {
    this.ordineAttuale = this.sdata.getOrdine();
    this.tavolo = this.sdata.getTavolo();
    this.ajax.request("http://localhost/ristorante-covid/SERVER/myOrders.php", new HttpParams().set("ordineAttuale", this.ordineAttuale)).subscribe(response =>{
      this.myOrders.data = Object.values(response);
    });
  }

  getTotal() {
    return this.myOrders.data.reduce((acc:number, element:OrdineCliente) => acc + element.costo*element.quantita, 0);
  }

  changeState(){
    this.ajax.request("http://localhost/ristorante-covid/SERVER/aggiornaTavoli.php", new HttpParams().set("tavolo", this.sdata.getTavolo()).set("mode", "1")).subscribe(response =>{
      if (response == true) {
        this.sdata.setData(this.sdata.getOrdine(), this.sdata.getTavolo());
        this._snackBar.open('Ordine Completato!', "Annulla", {
          duration: 3000
        }).afterDismissed().subscribe(action => {
          if(!action.dismissedByAction){
            this.backDisabled = true;
            this.sse.getServerSentEvent("http://localhost/ristorante-covid/SERVER/tavoliSSE.php").subscribe(data => {
              data = JSON.parse(data);
              data.forEach(element => {
                if(element.id == this.tavolo && element.libero == "0") {
                  this.ajax.request("http://localhost/ristorante-covid/SERVER/getOrder.php", new HttpParams().set("tavolo", this.tavolo)).subscribe(response =>{
                    Object.values(response).forEach(element =>{
                      console.log(element)
                      if(element.length != 0)
                        if(element['ordine'] != "0") {
                          this.sdata.setData(response[0]['ordine'], this.tavolo);
                          window.location.reload();
                        }
                    })   
                  })
                }
              });
            });
          }
        });
      }
    });
  }

}
