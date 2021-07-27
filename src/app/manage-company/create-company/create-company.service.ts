import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { CompanyDto } from "src/app/dto/CompanyDto";

@Injectable({
    providedIn: 'root'
})
export class CreateCompanyService implements OnInit{

    private url = 'https://stock-exchange-app-abhinav.herokuapp.com/admin/companies';

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit(): void {
        if(localStorage.getItem('TOKEN')==null) this.router.navigate(['unauthanticated']);
    }

    createCompany(company: CompanyDto): Observable<any>{
        var httpOptions = {
            headers: new HttpHeaders({ 'Authorization': localStorage.getItem('TOKEN')! })
        };
        return this.http.post<CompanyDto>(this.url, company, httpOptions);
    }
    
}