import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CompanyDto } from "src/app/dto/CompanyDto";
import { UserDto } from "../dto/UserDto";

@Injectable({
    providedIn: 'root'
})
export class UserSignUpService {

    private url = 'https://stock-exchange-app-abhinav.herokuapp.com/users/signup';

    constructor(private http: HttpClient) { }

    createUser(company: UserDto): Observable<any>{
        return this.http.post<UserDto>(this.url, company);
    }
    
}