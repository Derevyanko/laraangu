import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService) {}

  ngOnInit() {
  }

  onSignup(form: NgForm) {
  	this.authService.signup(form.value.username, form.value.email, form.value.password)
  		.subscribe(
  			response => {
          this.alertService.success("Registration successful!", true);
          this.router.navigate(["/signin"]);
        },
  			error => {
          this.alertService.error(error);
        }
  		);
  }

}
