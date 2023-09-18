import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss'],
})
export class CryptoComponent implements OnInit, OnChanges {
  @Input() quantityMap: Map<string, number>;
  data: any;
  options: any;
  names: any[] = [];
  pricePercent: any[] = [];
  tp:any;

  ngOnInit() {
    this.updateData();
  }

  constructor(){
    this.tp = this.quantityMap;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.tp = this.quantityMap
    if (changes["quantityMap"] && !changes["quantityMap"].firstChange) {
      this.tp = this.quantityMap;
      this.updateData();
    }
  }

  updateData() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    // this.names = [];
    // this.pricePercent = [];
    console.log(this.tp.entries()[0])

    for (let [key, value] of this.tp.entries()) {
      this.names.push(key);
      this.pricePercent.push(value);
      console.log(key);
    }

    console.log(...this.names);
    console.log(this.tp)

    this.data = {
      labels: [3,5,6,7,...this.names],
      datasets: [
        {
          data: [30 , 4 , 45,...this.pricePercent],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--red-500'),
            documentStyle.getPropertyValue('--pink-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
            documentStyle.getPropertyValue('--red-400'),
            documentStyle.getPropertyValue('--pink-500'),
          ],
        },
      ],
    };

    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
    };
  }
}
