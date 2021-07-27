import { Component, OnInit, Output, EventEmitter, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDto } from '../dto/UserDto';
import { UserLoginRequest } from '../dto/UserLoginRequest';
import { UserLoginService } from '../user-login/user-login.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  sub!: Subscription;
  errorMessage: String= "";
  errorOccured: Boolean = false;

  constructor(private router: Router, private userLoginService: UserLoginService) {}

  onClickSubmit(adminLoginForm: NgForm) {
    this.errorOccured = false;
    this.errorMessage = "";
    var adminLoginDetails = adminLoginForm.value;
    var userLoginRequest: UserLoginRequest = new UserLoginRequest();
    userLoginRequest.username = adminLoginDetails.adminId;
    userLoginRequest.password = adminLoginDetails.adminPassword;
    console.log(userLoginRequest);
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
          localStorage.setItem('LOGGED_IN_USER', "ADMIN");
          localStorage.setItem('LOGGED_IN_USER_ID', JSON.stringify(user.id));
          localStorage.setItem('TOKEN', 'Bearer '+token);
          this.router.navigate(['/admin/import-data'])
        }
      },
      error: err => {
        if(err.status==404){
          this.errorOccured = true;
          this.errorMessage += "Invalid Credentials. Please use Admin Id = 'app_admin' and Admin Password = 'admin_123'"+ " | ";
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
