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
  company: CompanyDto = new CompanyDto;
  companyFound: Boolean = false;

  constructor(private getCompanyByIdService: GetCompanyByIdService) {}

  onClickSubmit(searchCompanyByIdForm: NgForm) {
    var companyId: String = searchCompanyByIdForm.value.companyId;
    this.sub = this.getCompanyByIdService.getCompanyById(companyId).subscribe({
      next: response => {
        this.company = response;
        this.companyFound = true;
        console.log(response);
      },
      error: err => {
        this.companyFound = false;
        this.errorMessage = err
      }
    });
 }
}
