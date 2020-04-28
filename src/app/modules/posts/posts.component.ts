import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../post.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ProxyService } from '../../proxy.service'

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
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  stocks : Array<elementData> = [];
  
  bigChart = [];
  cards = [];
  pieChart = [];
  stocksSymbols = ["MSFT", "GOOG", "TM", "BAC", "VOD"];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.stocks);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private postService: PostService, private proxyService: ProxyService) {
  }

  ngOnInit() {
    this.dataIninitializa();
  }

  dataIninitializa()
  {
      
      this.bigChart = this.postService.bigChart()
      this.cards = this.postService.cards();
      this.pieChart = this.postService.pieChart();
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

}
