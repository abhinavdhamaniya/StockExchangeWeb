import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IpoDto } from "src/app/dto/IpoDto";

@Injectable({
    providedIn: 'root'
})
export class SingleCompanyService {

    private url = 'http://localhost:8090/admin/ipos/';

    constructor(private http: HttpClient) { }

    getIpoByCompanyId(companyId: String): Observable<IpoDto[]>{
        return this.http.get<IpoDto[]>(this.url+companyId)
    }
    
}