import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule,MatInputModule  } from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchResultComponent } from './search-result/search-result.component';
import { HomeComponent } from './home/home.component'; 
import {  APP_ROUTES } from './app.route';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperProfileComponent } from './developer-profile/developer-profile.component';
import { HttpCallsService } from './http-calls.service'
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { errorInterceptor }from './errorInterceptor'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SearchResultComponent,
    HomeComponent,
    DeveloperProfileComponent
  ],
  imports: [RouterModule.forRoot(
      APP_ROUTES
      ,{ useHash: true }
     ),
    BrowserModule,MatAutocompleteModule,FormsModule, ReactiveFormsModule,MatFormFieldModule,
    HttpClientModule,
    MatInputModule,BrowserAnimationsModule,MatExpansionModule,MatCardModule,HttpModule,NgxPaginationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: errorInterceptor, multi: true },
    HttpCallsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
