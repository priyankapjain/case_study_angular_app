import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, DialogOverviewExampleDialog } from './app.component';
import {getTokenService} from "./app.service";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpModule} from "@angular/http";


import {MatInputModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog'
@NgModule({
  declarations: [
    AppComponent , DialogOverviewExampleDialog
  ],
  entryComponents: [DialogOverviewExampleDialog],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [getTokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
