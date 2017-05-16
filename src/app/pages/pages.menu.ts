export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'komunikat',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: 'Komunikaty', // menu title
            icon: 'ion-android-home', // menu icon
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'kulturairozrywka',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: 'Kultura i rozrywka', // menu title
            icon: 'ion-android-home', // menu icon
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
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
      }
    ]
  }
];
