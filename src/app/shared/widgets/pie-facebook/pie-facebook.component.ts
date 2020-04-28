import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { ProxyService } from '../../../proxy.service';

@Component({
  selector: 'app-pie-facebook',
  templateUrl: './pie-facebook.component.html',
  styleUrls: ['./pie-facebook.component.scss']
})
export class PieFacebookComponent implements OnInit {

  Highcharts = Highcharts;
  chartOptions = {};
  updateFlag: boolean;
  oneToOneFlag : boolean;
  pieChartData =[];
  api_key = "IIZ9PO7RRW6IXUAQ";

  @Input() data = [];

  constructor(private proxyService: ProxyService) { }

  ngOnInit() {
    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Ratio'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      exporting: {
        enabled: true
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: this.pieChartData
      }]
    };
    this.updateFlag = true;
    this.oneToOneFlag = true;
    new Promise(resolve => {
      setTimeout(() => {
      resolve("I promise to return after 1 minute!");
      }, 60000);
      }).then((data) => {
      console.log("Printing PIE data");
      const promise = this.proxyService.getStocksList(this.api_key, 'yahoo').toPromise();
    promise.then((data) => {
      var i=0;
      for (const d of (data as any)) {
        i++;
        if(i==1){
          this.pieChartData.push({
            name: d.symbol,
            y: Number(d.C5),
            sliced: true,
            selected: true
          });
        }
        else{
          this.pieChartData.push({
            name: d.symbol,
            y: Number(d.C5)
          });
        }
      }
      console.log(this.pieChartData);
      this.chartOptions = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Close Value Ratio'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        exporting: {
          enabled: true
        },
        credits: {
          enabled: false
        },
        series: [{
          name: 'Brands',
          colorByPoint: true,
          data: this.pieChartData
        }]
      };
    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  })
    });
    
}

}
