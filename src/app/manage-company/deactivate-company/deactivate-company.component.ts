import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DeactivateCompanyService } from './deactivate-company.service';

@Component({
  selector: 'app-deactivate-company',
  templateUrl: './deactivate-company.component.html',
  styleUrls: ['./deactivate-company.component.css']
})
export class DeactivateCompanyComponent {

  sub!: Subscription;
  errorMessage: String= "";
  errorOccured: Boolean = false;
  isSuccess: Boolean = false;
  sucessMessage: String = "";

  constructor(private deactivateCompanyService: DeactivateCompanyService) {}

  onClickSubmit(deactivateCompany: NgForm) {
    var companyId: String = deactivateCompany.value.companyId;
    this.sub = this.deactivateCompanyService.deactivateCompany(companyId).subscribe({
      next: response => {
        this.errorOccured = false;
        this.errorMessage = "";
        this.isSuccess = true;
        this.sucessMessage = response;
        console.log(response);
      },
      error: err => {
        if(err.status!=200){
          this.errorOccured = true;
          this.errorMessage += err.error.message+ " | ";
        }
        else {
          this.errorOccured = false;
          this.errorMessage = "";
        }
      }
    });
 }
}
