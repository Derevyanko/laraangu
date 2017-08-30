import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService) {}

  ngOnInit() {
    this.authService.logout();
  }

  onSignin(form: NgForm) {
  	this.authService.signin(form.value.email, form.value.password)
  		.subscribe(
  			tokenData => {
          this.router.navigate([""]);
        },
  			error => {
          this.alertService.error(error);
        }
  		);
  }

}
