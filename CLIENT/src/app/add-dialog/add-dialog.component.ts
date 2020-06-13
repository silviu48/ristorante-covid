import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { AjaxRequestsService } from '../ajax-requests.service';
import { HttpParams } from '@angular/common/http';

interface Ingr {
  id: string;
  nome: string;
}

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  counter:number = 0;
  form: FormGroup;
  attr: Array<string>;
  ingredienti: Array<Ingr>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private dialogRef: MatDialogRef<AddDialogComponent>, private ajax: AjaxRequestsService) {
    this.ingredienti = new Array<Ingr>();
    this.form = new FormGroup({});
    if(this.data.id != undefined){  //Se sto facendo modifica
      this.form.addControl("id", new FormControl({value: this.data.id, disabled: true}, Validators.required));
      this.attr = Object.keys(this.data.values); 
      
      for(let [key, value] of Object.entries(this.data.values)) {
        console.log(key)
        if(key === 'img') this.form.addControl(key, new FormControl({value: value, disabled: false}));
        else if(key !== 'id') this.form.addControl(key, new FormControl({value: value, disabled: false}, Validators.required));
        
      }
    } else {  // Aggiungi
      this.attr = this.data.values;

      this.attr.forEach(key => {
        if(key === 'img') this.form.addControl(key, new FormControl(''));
        this.form.addControl(key, new FormControl('', Validators.required));
        
      })
    }

    console.log(this.form);
  }

  ngOnInit(): void {
    console.log(this.data.values);
  }

  getErrorMessage(entry: FormControl): string {
    let string: string;
    entry.hasError('required') ? string = 'Devi Inserire un valore' : string = '';
    return string;
  }

  addPiatto(){
    let params = new HttpParams();
    params = params.set("id", this.data.id);
    Object.keys(this.form.value).forEach(key => {
      console.log(this.form, this.form.value[key])
      params = params.set(key, this.form.value[key]);
    });
    
    this.ajax.request("http://localhost/ristorante-covid/SERVER/aggiungiPiatto.php", params).subscribe(response =>{
      if(response) this.dialogRef.close();
    })
  }

  addIngrediente(){
    if(this.ingredienti.length == 0)
    this.ajax.request("http://localhost/ristorante-covid/SERVER/getIngredienti.php").subscribe(response => {
      Object.values(response).forEach(element =>{
        this.ingredienti.push({id: element['id'], nome: element['nome']});
      })
    })

    this.form.addControl("ingrediente"+this.counter, new FormControl('', Validators.required));
    this.attr.push("ingrediente"+this.counter);
    this.form.addControl("quantita"+this.counter, new FormControl('', Validators.required));
    this.attr.push("quantita"+this.counter);
    this.counter++;

    console.log(this.form, this.ingredienti, this.attr);

  }

  applyIngrediente(){
    let params = new HttpParams();
    params = params.set("id", this.data.id!=undefined?this.data.id:0);
    Object.keys(this.form.value).forEach(key => {
      params = params.set(key, this.form.value[key]);
    });
    this.ajax.request("http://localhost/ristorante-covid/SERVER/aggiungiIngredienti.php", params).subscribe(response =>{
      if(response) this.dialogRef.close();
    })
  }

}
