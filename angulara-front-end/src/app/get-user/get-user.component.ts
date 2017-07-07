import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css']
})
export class GetUserComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onGetUser() {
  	this.authService.getUser()
  		.subscribe(
  			userInfo => console.log(userInfo),
  			error => console.log(error)
  		);
  }

}
