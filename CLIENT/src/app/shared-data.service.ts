import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  constructor() { }

  getTavolo(){
    return localStorage.getItem("tavolo");
  }

  getOrdine(){
    return localStorage.getItem("ordine");
  }

  setData(ordine: string, tavolo: string, search: boolean = false){
    localStorage.setItem("ordine", ordine);
    localStorage.setItem("tavolo", tavolo);
    localStorage.setItem("search", ""+search);
  }
}
