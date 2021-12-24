import { Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EpicService } from '../services/epic.service';
import { SteamService } from '../services/steam.service';
import { Game } from '../game';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit{

  constructor(private EpicService: EpicService, private SteamService: SteamService, private httpClient: HttpClient) { }

  //epicList: Game[] = [];
  //steamList: Game[] = [];
  gamesList: Game[] = [];

  displayedColumns = ['title', 'epic_id', 'steam_id'];
  public dataSource: MatTableDataSource<any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  loadGames(){
    // JSON REQUEST (local data) =============================================*
    this.httpClient.get<any>("assets/games.json").subscribe((data)=>{
      this.gamesList = data
      this.dataSource = new MatTableDataSource(this.gamesList);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
      console.log(this.gamesList)
    });

    
    // // EPIC REQUEST (for Name and ID) =============================================*
    // this.EpicService.getProducts().subscribe((data:any)=>{
    //   for (const KEY in data){
    //     const value = data[KEY];

    //     var test: Game = {title: data[KEY], epic_id: KEY, steam_id: 0}

    //     this.epicList.push(test);
    //   }
    //   // STEAM REQUEST (for Name and ID)  =============================================*
    //   this.SteamService.getProducts().subscribe((data:any) => {
    //     for (const KEY in data.applist.apps)
    //     {
    //       var test: Game = {title: data.applist.apps[KEY].name, epic_id: '0', steam_id: data.applist.apps[KEY].appid}

    //       this.steamList.push(test);
    //     }       
    //     // MERGE (for Name and ID)  =====================================================*
    //     for (const KEY in this.epicList){
    //       //console.log(this.epicList.some(item => item.title === 'Among Us'))
          
    //       if(this.steamList.some(item => item.title === this.epicList[KEY].title)){

    //         const item = this.steamList.find(item => item.title === this.epicList[KEY].title)

    //         var test: Game = {title: this.epicList[KEY].title, epic_id: this.epicList[KEY].epic_id, steam_id: item?.steam_id}

    //         this.gamesList.push(test);
    //       }
    //     }

    //     // var displayedColumns = ['position', 'name', 'symbol'];
    //     //this.createJSON()
    //     this.dataSource = new MatTableDataSource(this.gamesList);
    //     this.dataSource.paginator = this.paginator
    //     this.dataSource.sort = this.sort

    //     console.log(this.epicList)
    //     console.log(this.steamList)
    //     console.log(this.gamesList)
    //   });
    // });
  }

  // createJSON(){
  //   var theData = this.gamesList
  //   for (const KEY in this.gamesList){
  //     let title = this.gamesList[KEY].title;
  //     let epic = this.gamesList[KEY].epic_id;
  //     let steam = this.gamesList[KEY].steam_id;
  //     this.gameToJSON[KEY] = "1";
  //   }
  //   var theJSON = JSON.stringify(theData);
  //   var uri = "data:application/json;charset=UTF-8," + encodeURIComponent(theJSON);
    
  //   var a = document.createElement('a');
  //   a.href = uri;
  //   a.innerHTML = "Right-click and choose 'save as...'";
  //   document.body.appendChild(a);
  // }

  ngOnInit() {
    // In case of CORS or 404 Error start server with 'npm start' (or 'ng server --proxy-config proxy.conf.json')
    this.loadGames()
  }

}