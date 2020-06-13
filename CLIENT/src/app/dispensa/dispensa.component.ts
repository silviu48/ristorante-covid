import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AjaxRequestsService } from "../ajax-requests.service";
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

export class Ingrediente{
  id: number;
  nome: string;
  note: string;
  quantita: string;
  quantitaMinima: string;
  allergenico: boolean;

  constructor(obj: Object){
    this.id = obj['id'];
    this.nome = obj['nome'];
    this.note = obj['note'];
    this.quantita = obj['quantita'];
    this.quantitaMinima = obj['quantitaMinima'];
    this.allergenico = obj['allergenico'];
  }
}
@Component({
  selector: 'app-dispensa',
  templateUrl: './dispensa.component.html',
  styleUrls: ['./dispensa.component.scss']
})
export class DispensaComponent implements OnInit {

  tableHeader: string[] = ["id", "nome", "note", "quantita", "quantitaMinima", "allergenico", "action"];
  ingredienti: MatTableDataSource<Ingrediente>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private ajax: AjaxRequestsService, public dialog: MatDialog, private router: Router) {
    this.ingredienti = new MatTableDataSource<Ingrediente>();
  }

  ngOnInit(): void {
    this.ajax.request('http://localhost/ristorante-covid/SERVER/getIngredienti.php').subscribe(response =>{
      this.ingredienti.data = Object.values(response);
      
      console.log(this.ingredienti);
    })
    this.ingredienti.sort = this.sort;
  }

  add(){
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { 
        caller: 1,
        values: this.tableHeader.slice(1, this.tableHeader.length-1)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.ajax.request("http://localhost/ristorante-covid/SERVER/aggiornaTavoli.php")
    });
  }

  modifica(id: string){
    let arr: Object;
    this.ingredienti.data.forEach(element =>{
      if(""+element.id === id) arr = element;
    })
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { 
        caller: 1,
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
