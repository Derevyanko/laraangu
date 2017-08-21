import {Component, DoCheck} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {

  constructor(private router: Router, private authService: AuthService) {
  }

  logged: boolean = false;

  ngDoCheck() {
    this.logged = this.authService.isLogin();
  }
}
