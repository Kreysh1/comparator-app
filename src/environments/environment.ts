// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCtattASA-2mdBlsZyiA1_lKqnEDFgc7Xo",
    authDomain: "comparator-app-fb0d3.firebaseapp.com",
    databaseURL: "https://comparator-app-fb0d3-default-rtdb.firebaseio.com",
    projectId: "comparator-app-fb0d3",
    storageBucket: "comparator-app-fb0d3.appspot.com",
    messagingSenderId: "46462338015",
    appId: "1:46462338015:web:78522b6000a71e4c533a6a"
  },
  //EPIC GAMES API's
  epicCodesUrl:'https://raw.githubusercontent.com/srdrabx/offers-tracker/master/database/titles.json',
  epicDetailsUrl: 'https://raw.githubusercontent.com/srdrabx/offers-tracker/master/database/offers',
  epicHistoryUrl: 'https://raw.githubusercontent.com/srdrabx/prices-tracker-egs/master/database/prices-history',
  epicPriceUrl: 'https://raw.githubusercontent.com/srdrabx/prices-tracker-egs/master/database/prices',
  //STEAM API's
  steamCodesUrl:'/ISteamApps/GetAppList/v0002',
  steamDetailsUrl: '/api/appdetails',
  steamHistoryUrl: '',

  // COUNTRIES AND FLAGS API's
  countryAPI: 'https://flagcdn.com/'
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
