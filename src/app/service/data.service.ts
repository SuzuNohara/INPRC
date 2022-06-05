import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public biblia: any;
  public himnario: any;

  constructor(private http: HttpClient) {
    this.biblia = {};
    this.himnario = {};
    this.getBible();
    this.getHimnario();
  }

  getBible(){
    return this.http.get<any>('assets/bible.json');
  }

  getHimnario(){
    return this.http.get<any>('assets/himnario.json');
  }
}
