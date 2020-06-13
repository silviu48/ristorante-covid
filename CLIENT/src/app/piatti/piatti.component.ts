import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AjaxRequestsService } from "../ajax-requests.service";
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

export class Piatto{
  id: number;
  nome: string;
  costo: number;
  tempoPreparazione: number;
  tipologia: number;

  constructor(obj: Object){
    this.id = obj['id'];
    this.nome = obj['nome'];
    this.tempoPreparazione = obj['tempoPreparazione'];
    this.costo = obj['costo'];
    this.tipologia = obj['tipologia'];
  }
}
@Component({
  selector: 'app-piatti',
  templateUrl: './piatti.component.html',
  styleUrls: ['./piatti.component.scss']
})
export class PiattiComponent implements OnInit {
  tableHeader: string[] = ["id", "nome", "tempoPreparazione","costo","tipologia", "action"];
  piatti: MatTableDataSource<Piatto>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private ajax: AjaxRequestsService, public dialog: MatDialog, private router: Router) {
    this.piatti = new MatTableDataSource<Piatto>();
  }

  ngOnInit(): void {
    this.ajax.request('http://localhost/ristorante-covid/SERVER/menuEntries.php').subscribe(response =>{
      this.piatti.data = Object.values(response);
      
      console.log(this.piatti);
    })
    this.piatti.sort = this.sort;
  }

  add(){
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { 
        caller: 0,
        values: this.tableHeader.slice(1, this.tableHeader.length-1)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.ajax.request("http://localhost/ristorante-covid/SERVER/aggiornaTavoli.php")
    });
  }

  modifica(id: string){
    let arr: Object;
    this.piatti.data.forEach(element =>{
      if(""+element.id === id) arr = element;
    })
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { 
        caller: 0,
        id: id,
        values: arr
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.ajax.request("http://localhost/ristorante-covid/SERVER/aggiornaTavoli.php", 
        new HttpParams().set('tavolo', ""+id).set("mode", ""+0)).subscribe(response => {
          this.router.navigateByUrl('/dispensa', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/dispensa']);
        });
      })
      
    });
  }

}
