import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDto } from '../dto/UserDto';
import { FormValidationService } from '../shared/form-validation.service';
import { UpdateUserProfileService } from './update-user-profile.service';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.css']
})
export class UpdateUserProfileComponent implements OnInit{

  sub!: Subscription;
  errorMessage: String= "";
  errorOccured: Boolean = false;
  isSuccess: Boolean = false;
  sucessMessage: String = "";

  constructor(private createCompanyService: UpdateUserProfileService, private formValidationService: FormValidationService, private router: Router) {}

  ngOnInit(): void {
    if(localStorage.getItem('TOKEN')==null) this.router.navigate(['unauthanticated']);
  }

  onClickSubmit(updateUserForm: NgForm) {
    this.errorOccured = false;
    this.errorMessage = "";
    var user = this.buildObject(updateUserForm);
    if(user == false) return;
    var userId: number = parseInt(localStorage.getItem('LOGGED_IN_USER_ID')!);
    this.sub = this.createCompanyService.updateUser(userId, user).subscribe({
      next: response => {
        this.errorOccured = false;
        this.errorMessage = "";
        this.isSuccess = true;
        this.sucessMessage = response;
        console.log(response);
      },
      error: err => {
        if(err.status==404){
          this.isSuccess = false;
          this.sucessMessage = "";
          this.errorOccured = true;
          this.errorMessage += "404 Not Found Error"+ " | ";
        }
        else if(err.status==500){
          this.isSuccess = false;
          this.sucessMessage = "";
          this.errorOccured = true;
          this.errorMessage += "Username already taken"+ " | ";
        }
        else if(err.status!=200){
          this.isSuccess = false;
          this.sucessMessage = "";
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

 private buildObject(createUserForm: NgForm): UserDto | false {
  try{
    var user: UserDto = new UserDto();
    var userDetails = createUserForm.value;
    user.username = userDetails.username;
    user.password = userDetails.password;
    if(this.formValidationService.validateEmail(userDetails.email)!=true) {
      throw new Error("email");
    }
    user.email = userDetails.email;
    user.phoneNumber = userDetails.phoneNumber;
    return user;
  }
  catch(e)
  {
    this.errorOccured = true;
    if((<Error>e).message=='email') this.errorMessage += "Invalid Email ID"+ " | ";
    return false
  }
}
}
