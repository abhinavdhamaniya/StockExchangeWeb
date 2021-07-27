import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IpoDto } from "src/app/dto/IpoDto";

@Injectable({
    providedIn: 'root'
})
export class ImportDataService {

    private url = 'http://localhost:8090/admin/ipos/saveIpoList';

    constructor(private http: HttpClient) { }

    saveIpoList(ipoList: Array<IpoDto>): Observable<any>{
        var httpOptions = {
            headers: new HttpHeaders({ 'Authorization': localStorage.getItem('TOKEN')! })
        };
        return this.http.post<Array<IpoDto>>(this.url, ipoList, httpOptions);
    }
    
}