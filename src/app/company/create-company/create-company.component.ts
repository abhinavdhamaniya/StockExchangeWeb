import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CompanyDto } from 'src/app/dto/CompanyDto';
import { SectorDto } from 'src/app/dto/SectorDto';
import { CreateCompanyService } from './create-company.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent {

  sub!: Subscription;
  errorMessage: String= "";

  constructor(private createCompanyService: CreateCompanyService) {}

  onClickSubmit(createCompany: NgForm) {
    var company = this.buildObject(createCompany);
    this.sub = this.createCompanyService.createCompany(company).subscribe({
      next: response => {
        console.log(response);
      },
      error: err => this.errorMessage = err
    });
 }

  buildObject(createCompany: NgForm): CompanyDto {
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
