import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AwsService } from './services/aws.service';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { FormBuilder, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
  ],
  providers: [AwsService, FormBuilder],
  bootstrap: [AppComponent],
})
export class AppModule {}
