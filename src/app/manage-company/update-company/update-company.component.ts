import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CompanyDto } from 'src/app/dto/CompanyDto';
import { SectorDto } from 'src/app/dto/SectorDto';
import { FormValidationService } from 'src/app/shared/form-validation.service';
import { UpdateCompanyService } from './update-company.service';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent {

  sub!: Subscription;
  errorMessage: String= "";
  errorOccured: Boolean = false;
  isSuccess: Boolean = false;
  sucessMessage: String = "";
  _companyId: String = "";
  public companyExists: Boolean = false;

  constructor(private updateCompanyService: UpdateCompanyService, private formValidationService: FormValidationService) {}

  checkExists(checkCompanyIdForm: NgForm) {
    this.errorOccured = false;
    this.errorMessage = "";
    var companyId: String = checkCompanyIdForm.value.companyId;
    this.sub = this.updateCompanyService.checkExists(companyId).subscribe({
      next: response => {
        this.companyExists = response;
        this._companyId = companyId;
        this.errorOccured = false;
        this.errorMessage = "";
      },
      error: err => {
        this.companyExists = false;
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

  updateCompany(updateCompanyForm: NgForm) {
    this.errorOccured = false;
    this.errorMessage = "";
    var company = this.buildObject(updateCompanyForm);
    if(company==false) return;
    this.sub = this.updateCompanyService.updateCompany(this._companyId, company).subscribe({
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
          this.errorMessage += "Either Sector or StockExchange Not Found"+ " | ";
        }
        else if(err.status==500){
          this.errorOccured = true;
          this.errorMessage += "Either Sector or StockExchange Not Found"+ " | ";
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

  private buildObject(createCompany: NgForm): CompanyDto | false {
    this.errorOccured = false;
    this.errorMessage = "";
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
      return company;
    }
    catch(e)
    {
      this.errorOccured = true;
      if((<Error>e).message=='listedInStockExchanges') this.errorMessage += "Listed In StockExchanges should be either true or false"+ " | ";
      if((<Error>e).message=='stockExchangeIds') this.errorMessage += "StockExchange Ids should be comma separated integers (No Spaces)"+ " | ";
      return false;
    }
  }
}
