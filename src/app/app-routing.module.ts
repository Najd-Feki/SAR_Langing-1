import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';  // Adjust the import path
import { DetailsComponent } from './details/details.component';  // Adjust the import path
import { NotFoundComponent } from './notfound/not-found.component';  // Optional 404 page

const routes: Routes = [
  { path: '', component: HomeComponent },  // Home route (default)
  { path: 'details', component: DetailsComponent },        
  { path: '**', component: NotFoundComponent },  // Wildcard route for 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Configuring routes for the root module
  exports: [RouterModule]  // Make RouterModule available to the entire app
})
export class AppRoutingModule { }