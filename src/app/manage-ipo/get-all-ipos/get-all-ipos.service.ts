import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IpoDto } from "src/app/dto/IpoDto";

@Injectable({
    providedIn: 'root'
})
export class GetAllIposService {

    private url = 'http://localhost:8090/admin/ipos';

    constructor(private http: HttpClient) { }

    getAllIpos(): Observable<IpoDto[]>{
        var httpOptions = {
            headers: new HttpHeaders({ 'Authorization': localStorage.getItem('TOKEN')! })
        };
        return this.http.get<IpoDto[]>(this.url, httpOptions)
    }
    
}