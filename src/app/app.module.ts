import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {getTokenService} from "./app.service";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpModule} from "@angular/http";
import {NgxPaginationModule} from "ngx-pagination";
import {MatPaginatorModule} from '@angular/material/paginator';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    NgxPaginationModule,
    MatPaginatorModule
  ],
  providers: [getTokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
