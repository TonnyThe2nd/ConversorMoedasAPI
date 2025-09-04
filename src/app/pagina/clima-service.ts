import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  private url: string = 'https://localhost:7039/api/conversao/converter';

  constructor(private http : HttpClient){}

  public converter(de : string, para : string , valor : number) : Observable<any>{
    return this.http.get(`${this.url}?de=${de}&para=${para}&valor=${valor}`)
  }

}
