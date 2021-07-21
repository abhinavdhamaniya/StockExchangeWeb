import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CompanyDto } from "src/app/dto/CompanyDto";

@Injectable({
    providedIn: 'root'
})
export class ImportDataService {

    private url = 'http://localhost:8090/admin/excel/upload';

    constructor(private http: HttpClient) { }

    importData(file: File): Observable<any>{
        let formData: FormData = new FormData();
        formData.append('excelFile', file);
        console.log(JSON.stringify(formData));
        return this.http.post<FormData>(this.url, formData);
    }
    
}