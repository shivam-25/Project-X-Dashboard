import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class BigStockStorage {
  name: string;
  data: any[];
}

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  constructor(private http: HttpClient) { 
  }

  stocks = [];

  bigChart() {
    
    return [];
    
  }

  cards() {
    return [71, 78, 39, 66];
  }

  pieChart() {
    return [{
      name: 'MSFT',
      y: 154.6680,
      sliced: true,
      selected: true
    }, {
      name: 'AAPL',
      y: 1147.0350
    }, {
      name: 'AMZN',
      y: 128.2200
    }, {
      name: 'GOOG',
      y: 22.1162
    }, {
      name: 'FB',
      y: 14.5601
    }];
  }
}
