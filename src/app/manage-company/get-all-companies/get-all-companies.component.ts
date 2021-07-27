import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyDto } from 'src/app/dto/CompanyDto';
import { GetAllCompaniesService } from './get-all-companies.service';

@Component({
  selector: 'app-get-all-companies',
  templateUrl: './get-all-companies.component.html',
  styleUrls: ['./get-all-companies.component.css']
})
export class GetAllCompaniesComponent implements OnInit {

  sub!: Subscription;
  companies: CompanyDto[] = [];
  errorMessage: String= "";
  errorOccured: Boolean = false;

  constructor(private getAllCompaniesService: GetAllCompaniesService, private router: Router) {}

  ngOnInit(): void {
    if(localStorage.getItem('TOKEN')==null) this.router.navigate(['unauthanticated']);
    this.sub = this.getAllCompaniesService.getAllCompanies().subscribe({
      next: companies => {
        console.log(companies);
        this.companies = companies;
      },
      error: err => {
        this.errorOccured = true;
        this.errorMessage = err
      }
    });
  }

}
