import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserDto } from "../dto/UserDto";

@Injectable({
    providedIn: 'root'
})
export class UpdateUserProfileService {

    private url = 'https://stock-exchange-app-abhinav.herokuapp.com/users/updateUser/';

    constructor(private http: HttpClient) { }

    updateUser(userId: number, user: UserDto): Observable<any>{
        var httpOptions = {
            headers: new HttpHeaders({ 'Authorization': localStorage.getItem('TOKEN')! })
        };
        return this.http.put<UserDto>(this.url+userId, user, httpOptions);
    }
    
}