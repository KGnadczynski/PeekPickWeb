export const PAGES_MENU_LOGGED = [
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
        path: 'kulturairozrywka',
        data: {
          menu: {
            title: 'Kultura i rozrywka',
            icon: 'ion-android-home',
            pathMatch: 'prefix',
            selected: false,
            expanded: false,
            order: 0
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
