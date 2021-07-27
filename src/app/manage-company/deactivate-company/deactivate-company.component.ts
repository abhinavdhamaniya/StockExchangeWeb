import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeactivateCompanyService } from './deactivate-company.service';

@Component({
  selector: 'app-deactivate-company',
  templateUrl: './deactivate-company.component.html',
  styleUrls: ['./deactivate-company.component.css']
})
export class DeactivateCompanyComponent implements OnInit{

  sub!: Subscription;
  errorMessage: String= "";
  errorOccured: Boolean = false;
  isSuccess: Boolean = false;
  sucessMessage: String = "";

  constructor(private deactivateCompanyService: DeactivateCompanyService, private router: Router) {}

  ngOnInit(): void {
    if(localStorage.getItem('TOKEN')==null) this.router.navigate(['unauthanticated']);
  }

  onClickSubmit(deactivateCompany: NgForm) {
    this.errorOccured = false;
    this.errorMessage = "";
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
