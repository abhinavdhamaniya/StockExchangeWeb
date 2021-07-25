import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserDto } from '../dto/UserDto';
import { UserSignUpService } from './user-signup.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent {

  sub!: Subscription;
  errorMessage: String= "";

  constructor(private createCompanyService: UserSignUpService) {}

  onClickSubmit(createUserForm: NgForm) {
    var user = this.buildObject(createUserForm);
    this.sub = this.createCompanyService.createUser(user).subscribe({
      next: response => {
        console.log(response);
      },
      error: err => this.errorMessage = err
    });
 }

  private buildObject(createUserForm: NgForm): UserDto {
    var user: UserDto = new UserDto();
    var userDetails = createUserForm.value;
    user.username = userDetails.username;
    user.password = userDetails.password;
    user.email = userDetails.email;
    user.phoneNumber = userDetails.phoneNumber;
    return user;
  }
}
