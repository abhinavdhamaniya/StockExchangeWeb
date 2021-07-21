import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IpoDto } from "src/app/dto/IpoDto";

@Injectable({
    providedIn: 'root'
})
export class UpdateIpoService {

    private checkExistsUrl = 'http://localhost:8090/admin/ipos/checkExists/';
    private updateIPoUrl = 'http://localhost:8090/admin/ipos/';

    constructor(private http: HttpClient) { }

    checkExists(ipoId: String): Observable<Boolean>{
        return this.http.get<Boolean>(this.checkExistsUrl+ipoId)
    }

    updateIpo(ipoId: String, ipo: IpoDto): Observable<any>{
        return this.http.put<IpoDto>(this.updateIPoUrl+ipoId, ipo);
    }
    
}