import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {
  dataTemp: Observable<any>
  private baseUrl = 'http://localhost:8083/getStocks';
  stocks = [];
  element_data = [];
  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'})

  getStocksList(api_key: string){
    // console.log("in method freeAPIService");
    // const promise = this.http.get(`${this.baseUrl}`).toPromise();
    // console.log(promise);
    // promise.then((data)=>{
    //   for (const d of (data as any)) {
    //     this.stocks.push({
    //       symbol: d.symbol,
    //       C1: Number(d.C1),
    //       C2: Number(d.C2),
    //       C3: Number(d.C3),
    //       C4: Number(d.C4),
    //       C5: Number(d.C5),
    //       V1: Number(d.V1),
    //       V2: Number(d.V2),
    //       V3: Number(d.V3),
    //       V4: Number(d.V4),
    //       V5: Number(d.V5)
    //     });
    //     this.element_data.push({
    //       position: 1,
    //       name: d.symbol,
    //       weight: Number(d.V1),
    //       symbol: d.C1
    //     })
    //   }
    //   console.log(this.stocks);
    //   return this.stocks;
    // }).catch((error)=>{
    //   console.log("Promise rejected with " + JSON.stringify(error));
    // });
    return this.http.get(`${this.baseUrl}/${api_key}`);
  }
}
