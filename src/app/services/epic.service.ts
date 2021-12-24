import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EpicService {

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get(environment.epicCodesUrl)
  }

  getDetails(gameID: any){
    return this.http.get(`${environment.epicDetailsUrl}/${gameID}.json`)
  }

  getPrices(currency: string, gameID: string){
    return this.http.get(`${environment.epicHistoryUrl}/${currency.toUpperCase()}/${gameID}.json`)
  }
}
