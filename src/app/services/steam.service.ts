import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EpicGame } from '../epic-game';

@Injectable({
  providedIn: 'root'
})
export class SteamService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<EpicGame>{
    return this.http.get<EpicGame>(environment.steamCodesUrl)
  }

  getDetails(gameID: string, currency: string, language: string){
    return this.http.get(`${environment.steamDetailsUrl}?appids=${gameID}&cc=${currency}&l=${language}`)
  }

  getPrices(currency: string, gameID: string){

  }
}
