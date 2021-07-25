import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDto } from '../dto/UserDto';
import { UserLoginRequest } from '../dto/UserLoginRequest';
import { UserLoginService } from './user-login.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  sub!: Subscription;
  errorMessage: String= "";
  constructor(private router: Router, private userLoginService: UserLoginService) {}

  onClickSubmit(userLoginForm: NgForm) {
    var userLoginDetails = userLoginForm.value;
    var userLoginRequest: UserLoginRequest = new UserLoginRequest();
    userLoginRequest.username = userLoginDetails.username;
    userLoginRequest.password = userLoginDetails.userPassword;
    this.sub = this.userLoginService.validateLoginAndGetConfirmedUser(userLoginRequest).subscribe({
      next: response => {
        if(response!=false)
        {
          var user: UserDto = response;
          console.log(user);
          localStorage.setItem('LOGGED_IN_USER', "NORMAL_USER");
          localStorage.setItem('LOGGED_IN_USER_ID', JSON.stringify(user.id));
          this.router.navigate(['user/update-user-profile'])
        }
      },
      error: err => this.errorMessage = err
    });
  }
}
