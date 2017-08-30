import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '../auth.service';
import {AlertService} from '../alert.service';
import {NotificationsService} from '../notifications/notifications.service';
import {Notification} from '../notifications/notifications.model'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private alertService: AlertService,
              private notificationsService: NotificationsService) {
  }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    this.authService.signup(form.value.username, form.value.email, form.value.password)
      .subscribe(
        response => {
          // this.alertService.success("Registration successful!", true);
          this.notificationsService.add(new Notification('success', 'User successfully registered!'));
          this.router.navigate(['/signin']);
        },
        error => {
          this.alertService.error(error);
        }
      );
  }

}
