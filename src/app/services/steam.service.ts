import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SteamService {

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get(environment.steamCodesUrl)
  }

  getDetails(gameID: any, currency: string, language: string){
    return this.http.get(`${environment.steamDetailsUrl}?appids=${gameID}&cc=${currency}&l=${language}`)
  }

  getPrices(currency: string, gameID: string){

  }
}
