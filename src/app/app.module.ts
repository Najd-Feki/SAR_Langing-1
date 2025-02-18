import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
 
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    
  ]
})
export class AppModule { }
