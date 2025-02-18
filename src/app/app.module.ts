import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NotFoundComponent } from './notfound/not-found.component';
import { DetailsComponent } from './details/details.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    CommonModule,
    
  ]
})
export class AppModule { }
