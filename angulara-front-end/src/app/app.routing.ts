import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { QuotesComponent } from './quotes/quotes.component';
import { NewQuoteComponent } from './new-quote/new-quote.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { GetUserComponent } from './get-user/get-user.component';
import { AuthGuard } from './auth.guard';

const APP_ROUTES: Routes = [
	{ path: '', component: QuotesComponent },
	{ path: 'new-quote', component: NewQuoteComponent, canActivate: [AuthGuard] },
	{ path: 'signup', component: SignupComponent },
	{ path: 'signin', component: SigninComponent },
	{ path: 'get-user', component: GetUserComponent, canActivate: [AuthGuard] },
	{ path: '**', redirectTo: "" }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);