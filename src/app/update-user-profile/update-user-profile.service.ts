import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserDto } from "../dto/UserDto";

@Injectable({
    providedIn: 'root'
})
export class UpdateUserProfileService {

    private url = 'http://localhost:8090/users/updateUser/';

    constructor(private http: HttpClient) { }

    updateUser(userId: number, user: UserDto): Observable<any>{
        return this.http.put<UserDto>(this.url+userId, user);
    }
    
}