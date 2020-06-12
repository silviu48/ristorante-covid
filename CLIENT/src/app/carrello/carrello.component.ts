import { Component, OnInit } from '@angular/core';
import { SharedDataService } from "../shared-data.service";
import { AjaxRequestsService } from "../ajax-requests.service";
import { HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { element } from 'protractor';

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
  tableHeader:string[] = ["nome", "costo", "quantita", "totale"];

  constructor(private sdata: SharedDataService, private ajax: AjaxRequestsService) {
    this.myOrders = new MatTableDataSource<OrdineCliente>(); 
  }

  ngOnInit(): void {
    this.ordineAttuale = this.sdata.getOrdine();
    this.tavolo = this.sdata.getTavolo();
    this.ajax.request("http://localhost/ristorante-covid/SERVER/myOrders.php", new HttpParams().set("ordineAttuale", this.ordineAttuale)).subscribe(response =>{
      this.myOrders.data = Object.values(response);
      console.log(this.myOrders);
    });
  }

  getTotal() {
    return this.myOrders.data.reduce((acc:number, element:OrdineCliente) => acc + element.costo*element.quantita, 0);
  }

}
