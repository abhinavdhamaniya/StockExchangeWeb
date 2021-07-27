import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyDto } from 'src/app/dto/CompanyDto';
import { SectorDto } from 'src/app/dto/SectorDto';
import { FormValidationService } from 'src/app/shared/form-validation.service';
import { CreateCompanyService } from './create-company.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent {

  sub!: Subscription;
  errorMessage: String= "";
  errorOccured: Boolean = false;
  isSuccess: Boolean = false;
  sucessMessage: String = "";

  constructor(private createCompanyService: CreateCompanyService, private formValidationService: FormValidationService, private router: Router) {}

  onClickSubmit(createCompany: NgForm) {
    if(localStorage.getItem('TOKEN')==null) this.router.navigate(['unauthanticated']);
    this.errorMessage = "";
    var company = this.buildObject(createCompany);
    if(company==false) return;
    this.sub = this.createCompanyService.createCompany(company).subscribe({
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

  private buildObject(createCompany: NgForm): CompanyDto | false {
    try {
      var company: CompanyDto = new CompanyDto();
      var companyDetails = createCompany.value;
      company.companyName = companyDetails.companyName;
      company.turnover = companyDetails.turnover;
      company.ceo = companyDetails.ceo;
      company.boardOfDirectors = companyDetails.boardOfDirectors;
      if(this.formValidationService.validateBoolean(companyDetails.listedInStockExchanges)!=true) {
        throw new Error("listedInStockExchanges");
      }
      company.listedInStockExchanges = companyDetails.listedInStockExchanges;
      company.sector = new SectorDto(companyDetails.sectorId);
      company.brief = companyDetails.brief;
      company.deactivated = companyDetails.deactivated;
      if(this.formValidationService.validateCommaSeparatedIntegers(companyDetails.stockExchangeIds)!=true) {
        throw new Error("stockExchangeIds");
      }
      company.stockExchangeIds = companyDetails.stockExchangeIds.split(',').map(Number);
      this.errorOccured=false;
      return company;
    }
    catch(e)
    {
      this.errorOccured = true;
      if((<Error>e).message=='listedInStockExchanges') this.errorMessage += "Listed In StockExchanges should be either true or false"+ " | ";
      if((<Error>e).message=='stockExchangeIds') this.errorMessage += "StockExchange Ids should be comma separated integers (No Spaces)"+ " | ";
      return false
    }
  }
}
