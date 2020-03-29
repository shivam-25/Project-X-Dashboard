import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { ProxyService } from '../../../proxy.service';


@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  chartOptions: {};
  updateFlag: boolean;
  oneToOneFlag : boolean;
  @Input() data: any = [];
  bigChartData =[];
  Highcharts = Highcharts;
  api_key = "XNMS8GH3E7M4PRWD";

  constructor(private proxyService: ProxyService) { }

  ngOnInit() {
    console.log("In Area Component");
    console.log(this.data);
    this.chartOptions = {
      chart: {
        type: 'area'
      },
      title: {
        text: 'Performance'
      },
      subtitle: {
        text: 'Growth Rate'
      },
      tooltip: {
        split: true,
        valueSuffix: ' millions'
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: true,
      },
      series: this.bigChartData
    };
    this.updateFlag = true;
    this.oneToOneFlag = true;
    
    const promise = this.proxyService.getStocksList(this.api_key).toPromise();
    promise.then((data) => {
      for (const d of (data as any)) {
        
        this.bigChartData.push({
          name: d.symbol,
          data: [Number(d.V1), Number(d.V2), Number(d.V3), Number(d.V4), Number(d.V5)]
       });
      }
      console.log(this.bigChartData);
      this.chartOptions = {
        chart: {
          type: 'area'
        },
        title: {
          text: 'Performance'
        },
        subtitle: {
          text: 'Volume Growth Rate'
        },
        tooltip: {
          split: true,
          valueSuffix: ' millions'
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: true,
        },
        series: this.bigChartData
      };
      HC_exporting(Highcharts);
  
      
    })
    
  }

}
