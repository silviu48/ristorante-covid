import { Component, OnInit, ViewChild } from '@angular/core';

import { AjaxRequestsService } from "../ajax-requests.service";

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTable} from '@angular/material/table';

export class Ordine{
  id: number;
  nome: string;
  quantita: number;

  constructor(obj: Object){
    this.id = obj['id'];
    this.nome = obj['nome'];
    this.quantita = obj['quantita'];
  }
}

@Component({
  selector: 'app-ordini',
  templateUrl: './ordini.component.html',
  styleUrls: ['./ordini.component.scss']
})

export class OrdiniComponent implements OnInit {
  tableHeader: string[] = ["id", "nome", "quantita", "action"];
  ordini: MatTableDataSource<Ordine>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private ajax: AjaxRequestsService) { 
    this.ordini = new MatTableDataSource<Ordine>();
  }

  ngOnInit(): void {
    this.ajax.request("http://localhost/ristorante-covid/SERVER/orders.php").subscribe(response => {
      this.ordini.data = Object.values(response);
      this.ordini.sort = this.sort;
    }); 
  }

  evadiOrdine(id: string): void{
    this.ajax.request("http://localhost/ristorante-covid/SERVER/evadiOrdine.php?id="+id).subscribe(response => {
      console.log("ok ");
      if(response == true) {
        this.ordini.data.forEach(element => {
          if(""+element.id == id) { element.quantita --;}
        });
    }}); 
  }

  getClass(quantita: number): string{
    if(quantita >= 10) return "high";
    else if(quantita >= 5) return "normal";
    else return "low";
  }

}
