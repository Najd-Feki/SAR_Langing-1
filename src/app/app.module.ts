import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NotFoundComponent } from './notfound/not-found.component';
import { DetailsComponent } from './details/details.component';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HomeModule,
    CommonModule,
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    DetailsComponent,
    AppRoutingModule  
  ]
})
export class AppModule { }
