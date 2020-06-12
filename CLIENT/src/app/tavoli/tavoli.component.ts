import { Component, OnInit } from '@angular/core';
import { AjaxRequestsService } from "../ajax-requests.service";
import { SseService } from "../sse.service";
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from "../dialog/dialog.component";
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-tavoli',
  templateUrl: './tavoli.component.html',
  styleUrls: ['./tavoli.component.scss']
})
export class TavoliComponent implements OnInit {
  tavoli: Array<Object>;

  constructor(private ajax: AjaxRequestsService, public dialog: MatDialog, private sse: SseService) { 
    this.tavoli = new Array<Object>();
  }

  ngOnInit(): void {
    this.sse.getServerSentEvent("http://localhost/ristorante-covid/SERVER/tavoliSSE.php").subscribe(response =>{
      let data = JSON.parse(response);
      if(this.tavoli.length == 0){
        Object.values(data).forEach(element => this.tavoli.push(element));
      } else {
        data.map(element =>
          this.tavoli.reduce((accumulator, orig) => (
            (orig == null || orig['id']  === element.id) ? (
              orig['libero'] = element.libero,
              orig['capacita'] = element.capacita
            ) : accumulator
          ), element)
        );
      }
      console.log(this.tavoli);
    });
    // this.ajax.request("http://localhost/ristorante-covid/SERVER/tavoli.php").subscribe(response =>{
    //   Object.values(response).forEach(element => this.tavoli.push(element));  
    //   console.log(this.tavoli);
    // });
  }

  assignTable(id: number){

    const dialogRef = this.dialog.open(DialogComponent, {
      data: { 
        stringa: "Assegnare tavolo: "+id+"?",
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.ajax.request("http://localhost/ristorante-covid/SERVER/aggiornaTavoli.php", 
        new HttpParams().set('tavolo', ""+id).set("mode", ""+0)).subscribe(response => {
          console.log(response);
      })
      
    });
  }

  showOrder(id: number){
    this.ajax.request("http://localhost/ristorante-covid/SERVER/myOrders.php", new HttpParams().set("tavolo", ""+id)).subscribe(response => {
      console.log(response);
      let orders: Array<string> = new Array<string>();
      let tot: number=0;
      Object.values(response).forEach(element => {
        orders.push("Piatto: "+element['nome']+ " Costo: "+element['costo']+ "€ Quantità: "+element['quantita']);
        tot += element['costo']*element['quantita'];
      })
      orders.push("Totale: "+ tot + "€");
      const dialogRef = this.dialog.open(DialogComponent, {
        data: { 
          stringa: "Ordine tavolo "+id,
          content: orders,
          footer: "Evadere l'Ordine ?"
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result) this.ajax.request("http://localhost/ristorante-covid/SERVER/aggiornaTavoli.php", 
          new HttpParams().set('tavolo', ""+id).set("mode", ""+2)).subscribe(response => {
            console.log(response);
        })
        
      });
    });
  }

}
