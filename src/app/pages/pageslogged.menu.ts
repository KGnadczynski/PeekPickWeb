export const PAGES_MENU_LOGGED = [
  {
    path: 'pages',
    children: [
      {
        path: 'komunikat',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: 'Strona Główna', // menu title
            icon: 'strona_glowna', // menu icon
            icon_selected: 'strona_glowna_selected',
            icon_unselected: 'strona_glowna',
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
            icon_selected: 'kultura_i_rozrywka_selected',
            icon_unselected: 'kultura_i_rozrywka',
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
            icon_selected: 'gastronomia_i_nocne_zycie_selected',
            icon_unselected: 'gastronomia_i_nocne_zycie',
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
            icon_selected: 'zakupy_male_selected',
            icon_unselected: 'zakupy_male',
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
            icon_selected: 'zakupy_duze_selected',
            icon_unselected: 'zakupy_duze',
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
            icon_selected: 'uslugi_dla_ciala_selected',
            icon_unselected: 'uslugi_dla_ciala',
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
            icon_selected: 'uslugi_inne_selected',
            icon_unselected: 'uslugi_inne',
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
            icon_selected: 'sport_i_turystyka_selected',
            icon_unselected: 'sport_i_turystyka',
            pathMatch: 'prefix',
            selected: false,
            expanded: false,
            order: 0,
            id: 7
          }
        }
      },
       {
        path: 'favourites',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: 'Obserwowane', // menu title
            icon: 'star', // menu icon
            icon_selected: 'star_selected',
            icon_unselected: 'star',
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'regulaminy',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: 'Regulaminy', // menu title
            icon: 'approval', // menu icon
            icon_selected: 'approval_selected',
            icon_unselected: 'approval',
            pathMatch: 'prefix', // use it if item children not displayed in menu
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
            icon: 'account-circle', // menu icon
            icon_selected: 'account-circle_selected', // menu ico,
            icon_unselected: 'account-circle',
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
            icon: 'bell', // menu icon
            icon_selected: 'bell_selected', // menu ico,
            icon_unselected: 'bell',
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
