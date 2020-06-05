import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AjaxRequestsService {

  constructor(private http: HttpClient) { }

  request(endpoint: string){
    return this.http.get(endpoint, {responseType: 'json'});
  }
}
