import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CryptoService } from './crypto-list/services/crypto.service';
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  cryptos: any[] = [];
  isLoading = true;

  chart = {
    type: 'line',
    height: 350
  };

  series: any[] = [];
  xaxis = { categories: [] as string[] };
  private refreshsubscription?: Subscription;

  chartOptions: any = {
    chart: {
      type: 'line',
      height: 350
    },
    series: this.series,
    xaxis: this.xaxis,
    title: {
      text: 'Top Cryptos (Prix USD)',
      align: 'center'
    }
  };

  constructor(private cryptoService: CryptoService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cryptoService.getTopCryptos(1, 10).subscribe(data => {
      this.cryptos = data;
      this.series = [{
        name: "Prix USD",
        data: data.map(crypto => crypto.price_change_24h)
      }];

      this.xaxis = {
        categories: data.map(crypto => crypto.name)
      };

      this.chartOptions = {
        chart: {
          type: 'line',
          height: 350
        },
        series: this.series,
        xaxis: this.xaxis,
        title: {
          text: 'Top Cryptos (Prix USD)',
          align: 'center'
        }
      };

      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }
}
