import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserDto } from '../dto/UserDto';
import { UpdateUserProfileService } from './update-user-profile.service';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.css']
})
export class UpdateUserProfileComponent {

  sub!: Subscription;
  errorMessage: String= "";

  constructor(private createCompanyService: UpdateUserProfileService) {}

  onClickSubmit(updateUserForm: NgForm) {
    var user = this.buildObject(updateUserForm);
    var userId: number = parseInt(localStorage.getItem('LOGGED_IN_USER_ID')!);
    this.sub = this.createCompanyService.updateUser(userId, user).subscribe({
      next: response => {
        console.log(response);
      },
      error: err => this.errorMessage = err
    });
 }

  private buildObject(updateUserForm: NgForm): UserDto {
    var user: UserDto = new UserDto();
    var userDetails = updateUserForm.value;
    user.username = userDetails.username;
    user.password = userDetails.password;
    user.email = userDetails.email;
    user.phoneNumber = userDetails.phoneNumber;
    return user;
  }
}
