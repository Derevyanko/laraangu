import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {LikeDirective, QuoteComponent} from './quote/quote.component';
import { QuotesComponent } from './quotes/quotes.component';
import { NewQuoteComponent } from './new-quote/new-quote.component';
import { routing } from './app.routing';
import { QuoteService } from './quote.service';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthService } from './auth.service';
import { GetUserComponent } from './get-user/get-user.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert.service';
import { AuthGuard } from './auth.guard';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationsService } from './notifications/notifications.service';

@NgModule({
  declarations: [
    AppComponent,
    QuoteComponent,
    QuotesComponent,
    NewQuoteComponent,
    SignupComponent,
    SigninComponent,
    GetUserComponent,
    AlertComponent,
    LikeDirective,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    BrowserAnimationsModule
  ],
  providers: [
    QuoteService,
    AuthService,
    AlertService,
    AuthGuard,
    NotificationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
