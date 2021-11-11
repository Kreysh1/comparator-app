import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
  data: any;
  options: any;
  ngOnInit() {
    this.data = {
      labels: ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
      datasets: [{
        label: 'Precio',
        data: [5,2,3,7,3,8,9,3,15,17,12,6],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderColor: [
          'rgba(103, 58, 183, 1)',
          'rgba(103, 58, 183, 1)',
          'rgba(103, 58, 183, 1)',
          'rgba(103, 58, 183, 1)',
          'rgba(103, 58, 183, 1)',
          'rgba(103, 58, 183, 1)',
          'rgba(103, 58, 183, 1)',
          'rgba(103, 58, 183, 1)',
          'rgba(103, 58, 183, 1)',
          'rgba(103, 58, 183, 1)',
          'rgba(103, 58, 183, 1)',
          'rgba(103, 58, 183, 1)'
        ],
        fill: false,
        lineTension: 0.2,
        borderWidth: 2,
        weight: 1,
        pointRadius: 10,
        pointHitRadius: 10
      }]
    }
    this.options = {
      title: {
        text: "Line Chart",
        display: true
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  }
}
