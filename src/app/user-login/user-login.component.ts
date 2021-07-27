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
  errorOccured: Boolean = false;

  constructor(private router: Router, private userLoginService: UserLoginService) {}

  onClickSubmit(userLoginForm: NgForm) {
    this.errorOccured = false;
    this.errorMessage = "";
    var userLoginDetails = userLoginForm.value;
    var userLoginRequest: UserLoginRequest = new UserLoginRequest();
    userLoginRequest.username = userLoginDetails.username;
    userLoginRequest.password = userLoginDetails.userPassword;
    this.sub = this.userLoginService.validateLoginAndGetConfirmedUser(userLoginRequest).subscribe({
      next: response => {
        if(response!=false)
        {
          console.log(response);
          this.errorOccured = false;
          this.errorMessage = "";
          var user: UserDto = response.userDto;
          var token: string = response.token;
          console.log(user);
          localStorage.setItem('LOGGED_IN_USER', "NORMAL_USER");
          localStorage.setItem('LOGGED_IN_USER_ID', JSON.stringify(user.id));
          localStorage.setItem('TOKEN', 'Bearer '+token);
          this.router.navigate(['user/update-user-profile'])
        }
      },
      error: err => {
        if(err.status==404){
          this.errorOccured = true;
          this.errorMessage += "Invalid Credentials or User Account Not Confirmed. Create a new user or use default credentials username = 'app_user' and password = 'user_123'"+ " | ";
        }
        else if(err.status==500){
          this.errorOccured = true;
          this.errorMessage += "Internal Server Error"+ " | ";
        }
        else if(err.status!=200){
          this.errorOccured = true;
          this.errorMessage += "Some Error occured"+ " | ";
        }
        else {
          this.errorOccured = false;
          this.errorMessage = "";
        }
      }
    });
  }
}
