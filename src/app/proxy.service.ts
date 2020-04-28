import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {
  dataTemp: Observable<any>
  private baseUrl = 'http://$INGRESS_HOST:$INGRESS_PORT/getAllStocks';
  // private baseUrl = 'http://localhost:8083/getStocks'
  apiUrlFi = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="
  apiUrlSe = "&apikey=3DB68JJAT6E6BGWO"
  
  element_data = [];
  url_called="";
  count=0;

  constructor(private http: HttpClient) { }

  

  getStocksList(api_key: string, headerVal: string){
    let headers = new HttpHeaders()
    headers = headers.set('Content-Type', 'application/json').set('api-type',headerVal);
    return this.http.get(`${this.baseUrl}/${api_key}`,{headers});
  }

  getListOfStocks(symbol: string) {
    
      this.count = this.count + 1;
      this.url_called = this.apiUrlFi+symbol+this.apiUrlSe;
      return this.http.get(`${this.url_called}`);
      // value.then((data) => 
      // {
      //   for (const d of (data as any)) {
      //     var glq = d.$["Global Quote"];
      //   }
      //   this.element_data.push({
      //     position: this.count, 
      //     name: glq.$['01. symbol'], 
      //     weight: Number(glq.$['05. price']), 
      //     symbol: glq.$['10. change percent']
      //   })
      //   console.log("In getListStocks");
      //   console.log(this.element_data);
      // })
    
    
  }
}
