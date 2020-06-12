import { Component, OnInit } from '@angular/core';
import { AjaxRequestsService } from "../ajax-requests.service";
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: 'app-tavoli',
  templateUrl: './tavoli.component.html',
  styleUrls: ['./tavoli.component.scss']
})
export class TavoliComponent implements OnInit {
  tavoli: Array<Object>;

  constructor(private ajax: AjaxRequestsService, public dialog: MatDialog) { 
    this.tavoli = new Array<Object>();
  }

  ngOnInit(): void {
    this.ajax.request("http://localhost/ristorante-covid/SERVER/tavoli.php").subscribe(response =>{
      Object.values(response).forEach(element => this.tavoli.push(element));  
      console.log(this.tavoli);
    });
  }

  showPopup(id: number){
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { 
        stringa: "Assegnare tavolo: "+id+"?",
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) console.log(); // aggiorna tavolo dove id = id
      
    });
  }

}
