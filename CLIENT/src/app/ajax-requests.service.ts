import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AjaxRequestsService {

  constructor(private http: HttpClient) { }

  request(endpoint: string, params: HttpParams = new HttpParams(), header: HttpHeaders = new HttpHeaders()){
    return this.http.get(endpoint, {headers: header, params: params});
  }

  requestImage(endpoint: string){
    return this.http.get(endpoint, {responseType: 'blob'});
  }
}
