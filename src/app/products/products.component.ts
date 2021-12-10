import { Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { EpicService } from '../services/epic.service';
import { SteamService } from '../services/steam.service';
import { Game } from '../game';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit{

  sendedID : string = "63e07f28b89445ba80f06657ef0b68a7";

  epicList: Game[] = [];
  steamList: Game[] = [];
  gamesList: Game[] = [];

  displayedColumns = ['title', 'epic_id', 'steam_id'];
  public dataSource: MatTableDataSource<any>;
  //dataSource = new MatTableDataSource(this.epicList);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  setData(data:any){
    this.sendedID = data;
    console.log(this.sendedID)
  }

  constructor(private EpicService: EpicService, private SteamService: SteamService) { }

  loadGames(){
    // EPIC REQUEST =============================================*
    this.EpicService.getProducts().subscribe((data:any)=>{
      for (const KEY in data){
        const value = data[KEY];

        var test: Game = {title: data[KEY], epic_id: KEY, steam_id: 0}

        this.epicList.push(test);
      }
      // STEAM REQUEST =============================================*
      this.SteamService.getProducts().subscribe((data:any) => {
        for (const KEY in data.applist.apps)
        {
          var test: Game = {title: data.applist.apps[KEY].name, epic_id: '0', steam_id: data.applist.apps[KEY].appid}

          this.steamList.push(test);
        }       
        // MERGE =====================================================*
        for (const KEY in this.epicList){
          //console.log(this.epicList.some(item => item.title === 'Among Us'))
          if(this.steamList.some(item => item.title === this.epicList[KEY].title)){

            const item = this.steamList.find(item => item.title === this.epicList[KEY].title)

            var test: Game = {title: this.epicList[KEY].title, epic_id: this.epicList[KEY].epic_id, steam_id: item?.steam_id}

            this.gamesList.push(test);
          }
        }

        // var displayedColumns = ['position', 'name', 'symbol'];
        this.dataSource = new MatTableDataSource(this.gamesList);
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort

        console.log(this.epicList)
        console.log(this.steamList)
        console.log(this.gamesList)
      });
    });
  }


  ngOnInit() {
    // In case of CORS or 404 Error start server with 'npm start' (or 'ng server --proxy-config proxy.conf.json')
    this.loadGames()
  }

}