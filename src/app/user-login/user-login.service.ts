import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserLoginRequest } from "../dto/UserLoginRequest";

@Injectable({
    providedIn: 'root'
})
export class UserLoginService {

    private url = 'https://stock-exchange-app-abhinav.herokuapp.com/users/validateLoginAndGetConfirmedUser';

    constructor(private http: HttpClient) { }

    validateLoginAndGetConfirmedUser(userLoginRequest: UserLoginRequest): Observable<any>{
        return this.http.post<any>(this.url, userLoginRequest);
    }
    
}