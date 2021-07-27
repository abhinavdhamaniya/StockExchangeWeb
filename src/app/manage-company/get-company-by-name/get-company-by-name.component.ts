import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyDto } from 'src/app/dto/CompanyDto';
import { GetCompanyByNameService } from './get-company-by-name.service';

@Component({
  selector: 'app-get-company-by-name',
  templateUrl: './get-company-by-name.component.html',
  styleUrls: ['./get-company-by-name.component.css']
})
export class GetCompanyByNameComponent implements OnInit {

  sub!: Subscription;
  companies: CompanyDto[] = [];
  filteredCompanies: CompanyDto[] = [];
  errorMessage: String= "";
  company: CompanyDto = new CompanyDto;
  companyFound: Boolean = false;

  constructor(private getCompanyByNameService: GetCompanyByNameService, private router: Router) {}

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredCompanies = this.performFilter(value);
  }

  ngOnInit(): void {
    if(localStorage.getItem('TOKEN')==null) this.router.navigate(['unauthanticated']);
    this.sub = this.getCompanyByNameService.getAllCompanies().subscribe({
      next: companies => {
        console.log(companies);
        this.companies = companies;
      },
      error: err => this.errorMessage = err
    });
  }

  performFilter(filterBy: string): CompanyDto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.companies.filter((company: CompanyDto) =>
      company.companyName.toLocaleLowerCase().includes(filterBy));
  }

}
