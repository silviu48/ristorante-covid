import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  tavolo: string;
  ordineAttuale: string;

  constructor() { }

  getTavolo(){
    return this.tavolo;
  }

  getOrdine(){
    return this.ordineAttuale;
  }

  setData(ordine: string, tavolo: string){
    this.tavolo = tavolo;
    this.ordineAttuale = ordine;
  }
}
