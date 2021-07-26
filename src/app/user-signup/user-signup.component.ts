import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserDto } from '../dto/UserDto';
import { FormValidationService } from '../shared/form-validation.service';
import { UserSignUpService } from './user-signup.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent {

  sub!: Subscription;
  errorMessage: String= "";
  errorOccured: Boolean = false;
  isSuccess: Boolean = false;
  sucessMessage: String = "";

  constructor(private createCompanyService: UserSignUpService, private formValidationService: FormValidationService) {}

  onClickSubmit(createUserForm: NgForm) {
    this.errorOccured = false;
    this.errorMessage = "";
    var user = this.buildObject(createUserForm);
    if(user==false) return;
    this.sub = this.createCompanyService.createUser(user).subscribe({
      next: response => {
        this.errorOccured = false;
        this.errorMessage = "";
        this.isSuccess = true;
        this.sucessMessage = response;
        console.log(response);
      },
      error: err =>  {
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
