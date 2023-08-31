import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BuilderModule } from '@builder.io/angular';
import { ZephyrComponent } from './zephyr.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { AppRoutingModule } from './app-routing.module'; // <-- import here

@NgModule({
  declarations: [AppComponent, ZephyrComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    RouterModule,
    BuilderModule.forRoot('ea8c8e416fd64171bc2ef9ac5ac226e6'), // <-- import here
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
