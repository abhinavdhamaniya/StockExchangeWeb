import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CompanyDto } from 'src/app/dto/CompanyDto';
import { SectorDto } from 'src/app/dto/SectorDto';
import { CreateCompanyComponent } from '../create-company/create-company.component';
import { CreateCompanyService } from '../create-company/create-company.service';
import { UpdateCompanyService } from './update-company.service';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent {

  sub!: Subscription;
  errorMessage: String= "";
  _companyId: String = "";
  public companyExists: Boolean = false;
  public company: CompanyDto = new CompanyDto();

  constructor(private updateCompanyService: UpdateCompanyService) {}

  checkExists(checkCompanyIdForm: NgForm) {
    var companyId: String = checkCompanyIdForm.value.companyId;
    this.sub = this.updateCompanyService.checkExists(companyId).subscribe({
      next: response => {
        this.companyExists = response;
        this._companyId = companyId;
        this.patchValues(companyId)
      },
      error: err => {
        this.companyExists = false;
        this.errorMessage = err
      }
    });
  }

  updateCompany(updateCompanyForm: NgForm) {
    var company = this.buildObject(updateCompanyForm);
    this.sub = this.updateCompanyService.updateCompany(this._companyId, company).subscribe({
      next: response => {
        console.log(response);
      },
      error: err => this.errorMessage = err
    });
  }

  patchValues(companyId: String){
    this.sub = this.updateCompanyService.getCompanyDetails(companyId).subscribe({
      next: response => {
        this.company = response;
        console.log(this.company);
      },
      error: err => {
        this.errorMessage = err
      }
    });
  }

  private buildObject(createCompany: NgForm): CompanyDto {
    var company: CompanyDto = new CompanyDto();
    var companyDetails = createCompany.value;
    company.companyName = companyDetails.companyName;
    company.turnover = companyDetails.turnover;
    company.ceo = companyDetails.ceo;
    company.boardOfDirectors = companyDetails.boardOfDirectors;
    company.listedInStockExchanges = companyDetails.listedInStockExchanges;
    company.sector = new SectorDto(companyDetails.sectorId);
    company.brief = companyDetails.brief;
    company.deactivated = companyDetails.deactivated;
    company.stockExchangeIds = companyDetails.stockExchangeIds.split(',').map(Number);
    return company;
  }
}
