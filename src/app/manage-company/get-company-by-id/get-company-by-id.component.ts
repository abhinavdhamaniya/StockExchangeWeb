import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CompanyDto } from 'src/app/dto/CompanyDto';
import { GetCompanyByIdService } from './get-company-by-id.service';

@Component({
  selector: 'app-get-company-by-id',
  templateUrl: './get-company-by-id.component.html',
  styleUrls: ['./get-company-by-id.component.css']
})
export class GetCompanyByIdComponent {

  sub!: Subscription;
  errorMessage: String= "";
  errorOccured: Boolean = false;
  company: CompanyDto = new CompanyDto;
  companyFound: Boolean = false;

  constructor(private getCompanyByIdService: GetCompanyByIdService) {}

  onClickSubmit(searchCompanyByIdForm: NgForm) {
    this.errorOccured = false;
    this.errorMessage = "";
    var companyId: String = searchCompanyByIdForm.value.companyId;
    this.sub = this.getCompanyByIdService.getCompanyById(companyId).subscribe({
      next: response => {
        this.company = response;
        this.companyFound = true;
        this.errorOccured = false;
        this.errorMessage = "";
        console.log(response);
      },
      error: err => {
        this.companyFound = false;
        if(err.status==404){
          this.errorOccured = true;
          this.errorMessage += "Company Not Found"+ " | ";
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
