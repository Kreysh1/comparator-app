import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EpicService } from 'src/app/services/epic.service';
import { SteamService } from 'src/app/services/steam.service';
import { Details } from 'src/app/interfaces/details';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {

  constructor(private EpicService: EpicService, private SteamService: SteamService , private route: ActivatedRoute) { }

  details: Array<Details>;

  // COUNTRY & LANGUAGE
  currency : string = "mx";
  language : string = "es"

  //EPIC
  epicID : string;
  epicTitle: string
  epicImage: any
  epicDesc: any
  epicSlug : any
  epicPrice : any

  //STEAM
  steamID: string;
  steamTitle: string
  steamImage: any
  steamDesc: any
  steamPrice : string

  // ARRAYS
  epicHistoryDates: Array<string> = []
  epicHistoryPrices: Array<number> = []
  steamHistoryDates: Array<string> = []
  steamHistoryPrices: Array<number> = []
  background: Array<string> = []
  bordercolor: Array<string> = []

  loadDetails(){
    this.EpicService.getDetails(this.epicID).subscribe((data:any) => {
      console.log(data)
      this.epicTitle = data.title
      this.epicImage = data.keyImages[0].url
      this.epicDesc = data.description
      this.epicSlug = data.urlSlug
    });

    this.SteamService.getDetails(this.steamID, this.currency, this.language).subscribe((steamData:any) => {
      console.log(steamData)
      const ID = this.steamID
      this.steamTitle = steamData[ID].data.name
      this.steamImage = steamData[ID].data.header_image
      this.steamDesc = steamData[ID].data.short_description 
      this.steamPrice = "$0"
      this.steamPrice = steamData[ID].data.price_overview.final_formatted
    });
  }

  loadPrices(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          this.EpicService.getPrices(this.epicID, this.currency).subscribe((data:any) => {

            for (const KEY in data){
              const DATE = (data[KEY][0]).substring(0,10);
              this.epicHistoryDates.push(DATE)

              const PRICE = this.priceFormat(data[KEY][1])

              this.epicHistoryPrices.push(PRICE)

              this.background.push('rgba(255, 99, 132, 1)')
              this.bordercolor.push('rgba(103, 58, 183, 1)')
              this.steamHistoryPrices.push(0);
              
            }

            this.steamHistoryPrices.pop();
            this.steamHistoryPrices.push(145.23);
            this.epicPrice = this.epicHistoryPrices[0]

            this.epicHistoryDates.reverse()
            this.epicHistoryPrices.reverse()

            //console.log(this.epicHistoryDates)
            //console.log(this.epicHistoryPrices)


            this.details = [
              {image: this.epicImage, title: this.epicTitle, price: this.epicPrice, platform: 'EPIC', link: this.epicSlug},
            ];

          })
        );
      }, 0);
      }); 
  }


  chart(){
    this.data = {
      labels: this.epicHistoryDates,
      datasets: [{
        label: 'Epic',
        data: this.epicHistoryPrices,
        backgroundColor: this.background,
        borderColor: this.bordercolor,
        fill: false,
        lineTension: 0.2,
        borderWidth: 2,
        weight: 1,
        pointRadius: 10,
        pointHitRadius: 10
      },
      {
        label: 'Steam',
        data: this.steamHistoryPrices,
        backgroundColor: [],
        borderColor: [],
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
            beginAtZero: false
          }
        }]
      }
    }
  }

  data: any;
  options: any;
  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      console.log(params)
      this.epicID = params['epic'];
      this.steamID = params['steam'];
    });

    this.loadDetails()
    const pricePromise = this.loadPrices();

    // pricePromise.then(() =>{
      
    // })
    
    setTimeout(() => {
      this.chart()
    }, 500);

  }

  priceFormat(str : any){
    str = str.toString()

    var cents = str.substring(str.length-2, str.length)
    var value = str.substring(0, str.length-2)
    let new_value : number = parseFloat(`${value}.${cents}a`)

    return new_value;
  }
}