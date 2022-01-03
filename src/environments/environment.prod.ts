export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCtattASA-2mdBlsZyiA1_lKqnEDFgc7Xo",
    authDomain: "comparator-app-fb0d3.firebaseapp.com",
    projectId: "comparator-app-fb0d3",
    storageBucket: "comparator-app-fb0d3.appspot.com",
    messagingSenderId: "46462338015",
    appId: "1:46462338015:web:8d3152cd648881d1533a6a"
  },
  //EPIC GAMES API's
  epicCodesUrl:'https://raw.githubusercontent.com/srdrabx/offers-tracker/master/database/titles.json',
  epicDetailsUrl: 'https://raw.githubusercontent.com/srdrabx/offers-tracker/master/database/offers',
  epicHistoryUrl: 'http://raw.githubusercontent.com/srdrabx/prices-tracker-egs/master/database/prices-history',
  epicPriceUrl: 'https://raw.githubusercontent.com/srdrabx/prices-tracker-egs/master/database/prices',
  //STEAM API's
  steamCodesUrl:'/ISteamApps/GetAppList/v0002',
  steamDetailsUrl: '/api/appdetails',
  steamHistoryUrl: '',

  // COUNTRIES AND FLAGS API's
  countryAPI: 'https://flagcdn.com/'
};
