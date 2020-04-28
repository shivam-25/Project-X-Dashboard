import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ProxyService } from '../../proxy.service'
import { Observable } from "rxjs";

export interface PeriodicElement {
  name: String;
  position: number;
  weight: number;
  symbol: String;
}

export class elementData {
  name: String;
  position: number;
  weight: number;
  symbol: String;
  constructor(name: String, position: number, weight: number, symbol: String){
    this.name = name;
    this.position = position;
    this.weight = weight;
    this.symbol = symbol;
  }
}


const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stocks : Array<elementData> = [];
  
  bigChart = [];
  cards = [];
  pieChart = [];
  stocksSymbols = ["MSFT", "GOOG", "TM", "BAC", "VOD"];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.stocks);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private dashboardService: DashboardService, private proxyService: ProxyService) { 
    
    // new Promise(resolve => {
    //       setTimeout(() => {
    //         resolve("I promise to return after one second!");
    //         console.log("In Constructor");
    //       }, 20000);
    //     }).then((data) => {
    //       console.log("Printing Element data");
    //       console.log(this.element_data);
    //       this.ngOnInit();
    //     });
        
  }

  ngOnInit() {
    console.log("In ngOnInit");
    // 
    this.dataIninitializa();
  }

  dataIninitializa()
  {
      
      this.bigChart = this.dashboardService.bigChart()
      this.cards = this.dashboardService.cards();
      this.pieChart = this.dashboardService.pieChart();
      let element_data : any[] = [];
      new Promise(resolve => {
          
            resolve("I promise to return after one second!");
            for(let i=0;i<5;i++)
            {
              var name1="";
              var weight1=0;
              var symbol1="";
              this.proxyService.getListOfStocks(this.stocksSymbols[i]).subscribe((data) => {
                JSON.parse(JSON.stringify(data), (key, value) => {
                  if (key == '01. symbol') {
                    name1=String(value);
                  }
                  if(key == '05. price'){
                    weight1 = Number(value);
                  }
                  if(key == '10. change percent'){
                    symbol1 = String(value);
                  }
                });
                element_data[i] = { position: Number(i+1), name: name1, weight: weight1, symbol: symbol1 };
                console.log(element_data[i]);
                this.stocks[i] = new elementData(name1,i+1,weight1,symbol1);
              });
            }
            console.log(element_data);
         
        }).then((data) => {
          //console.log("Printing Element data");
          setTimeout(() => {
            var ELEMENT_DATA: elementData[] = [
              { position: Number(1), name: 'MSFT', weight: 1085.459, symbol: '1.65%' },
              { position: Number(2), name: 'AAPL', weight: 1071.03, symbol: '-0.77%' },
              { position: Number(3), name: 'AMZN', weight: 936.346, symbol: '2.78%' },
              { position: Number(4), name: 'GOOG', weight: 766.523, symbol: '1.69%' },
              { position: Number(5), name: 'BABA', weight: 764.035, symbol: '1.88%' },
            ];
            // console.log(element_data[0]);
            // console.log(ELEMENT_DATA);
            this.dataSource = new MatTableDataSource<elementData>(this.stocks);
            this.dataSource.paginator = this.paginator;
            this.changePaginatorData();
          },20000);
          
        });
    
  }

  async changePaginatorData() {
    console.log("Inside ChangePaginator");
    console.log(this.stocks);
    var ELEMENT_DATA: elementData[] = [
      { position: Number(1), name: 'MSFT', weight: 1085.459, symbol: '1.65%' },
      { position: Number(2), name: 'AAPL', weight: 1071.03, symbol: '-0.77%' },
      { position: Number(3), name: 'AMZN', weight: 936.346, symbol: '2.78%' },
      { position: Number(4), name: 'GOOG', weight: 766.523, symbol: '1.69%' },
      { position: Number(5), name: 'BABA', weight: 764.035, symbol: '1.88%' },
      this.stocks[0]
    ];
    console.log(ELEMENT_DATA);
  }

  // reloadData(){
    // this.stocks = this.proxyService.getStocksList();
    // console.log("Data Loaded");
    // new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve("I promise to return after one second!");
    //     console.log("In reload data");
    //   }, 20000);
    // }).then((data) => {
    //   console.log(this.stocks);
    //   return this.stocks;
    // });
    
    // const promise = this.proxyService.getStocksList().toPromise()
    // promise.then(data => {
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
      // return new Promise(resolve => {
      //   setTimeout(() => {
      //     resolve("I promise to return after one second!");
      //     this.bigChart = this.dashboardService.bigChart();
      //     this.cards = this.dashboardService.cards();
      //     this.pieChart = this.dashboardService.pieChart();

      //     this.dataSource.paginator = this.paginator;
      //     console.log("In reload data");
      //   }, 20000);
      // });
      
      
  //   });
  //   console.log("In reload data");
  // }

}
