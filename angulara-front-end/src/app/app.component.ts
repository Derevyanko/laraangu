import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {

  constructor(private router: Router) {}

  logged: boolean = true;

  changeMenuLink() {
  	if (localStorage.getItem("token") && localStorage.getItem("user")) {
  		this.logged = false;
  	}
  }

  ngDoCheck() {
  	this.changeMenuLink();
  }
}
