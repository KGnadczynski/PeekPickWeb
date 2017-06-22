export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'komunikat',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: 'Strona Główna', // menu title
            icon: 'strona_glowna', // menu icon
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
            icon: 'kultura_i_rozrywka',
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
            icon: 'gastronomia_i_nocne_zycie',
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
            icon: 'zakupy_male',
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
            icon: 'zakupy_duze',
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
            icon: 'uslugi_dla_ciala',
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
            icon: 'uslugi_inne',
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
            icon: 'sport_i_turystyka',
            pathMatch: 'prefix',
            selected: false,
            expanded: false,
            order: 0,
            id: 7
          }
        }
      },
      /*{
        path: 'login',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: 'Zaloguj', // menu title
            icon: 'ion-android-home', // menu icon
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },

      {
        path: 'register',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: 'Zarejestruj', // menu title
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
      }*/
    ]
  }
];
