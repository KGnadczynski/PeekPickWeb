export const PAGES_MENU_LOGGED = [
  {
    path: 'pages',
    children: [
      {
        path: 'komunikat',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: 'Strona Główna', // menu title
            icon: 'ion-android-home', // menu icon
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'kulturairozrywka',
        data: {
          menu: {
            title: 'Kultura i rozrywka',
            icon: 'ion-android-home',
            pathMatch: 'prefix',
            selected: false,
            expanded: false,
            order: 0,
            id: 1
          }
        }
      },
      {
        path: 'gastronomiaizycienocne',
        data: {
          menu: {
            title: 'Gastronomia i życie nocne',
            icon: 'ion-android-home',
            pathMatch: 'prefix',
            selected: false,
            expanded: false,
            order: 0,
            id: 2
          }
        }
      },
      {
        path: 'zakupymale',
        data: {
          menu: {
            title: 'Zakupy małe',
            icon: 'ion-android-home',
            pathMatch: 'prefix',
            selected: false,
            expanded: false,
            order: 0,
            id: 3
          }
        }
      },
      {
        path: 'zakupyduze',
        data: {
          menu: {
            title: 'Zakupy duże',
            icon: 'ion-android-home',
            pathMatch: 'prefix',
            selected: false,
            expanded: false,
            order: 0,
            id: 4
          }
        }
      },
      {
        path: 'uslugidlaciala',
        data: {
          menu: {
            title: 'Usługi dla ciała',
            icon: 'ion-android-home',
            pathMatch: 'prefix',
            selected: false,
            expanded: false,
            order: 0,
            id: 5
          }
        }
      },
      {
        path: 'uslugiinne',
        data: {
          menu: {
            title: 'Usługi inne',
            icon: 'ion-android-home',
            pathMatch: 'prefix',
            selected: false,
            expanded: false,
            order: 0,
            id: 6
          }
        }
      },
      {
        path: 'sportiturystyka',
        data: {
          menu: {
            title: 'Sport i turystyka',
            icon: 'ion-android-home',
            pathMatch: 'prefix',
            selected: false,
            expanded: false,
            order: 0,
            id: 7
          }
        }
      },
       {
        path: 'profile',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: 'Moje Konto', // menu title
            icon: 'ion-android-home', // menu icon
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'powiadomienia',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: 'Powiadomienia', // menu title
            icon: 'ion-android-home', // menu icon
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'favourites',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: 'Obserwowane', // menu title
            icon: 'ion-android-home', // menu icon
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 0
          }
        }
      }
    ]
  }
];
