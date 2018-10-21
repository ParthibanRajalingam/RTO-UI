import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { SearchResultComponent } from "./search-result/search-result.component";
import { DeveloperProfileComponent } from "./developer-profile/developer-profile.component";

export const APP_ROUTES : Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'developerProfile', component: DeveloperProfileComponent  },
  //{ path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: 'searchResults',
    component: SearchResultComponent
    //,    data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: '**', component: HomeComponent }
];