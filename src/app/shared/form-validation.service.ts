import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class FormValidationService {

    public validateBoolean(value: string): boolean {
        if(value == 'true' || value == 'false') return true;
        return false;
    }

    public validateCommaSeparatedIntegers(value: string): boolean {
        var regex = /^(?!,)(,?[0-9]+)+$/;
        if(regex.test(value)) return true;
        return false;
    }

    public validateEmail(value: string): boolean {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(regex.test(value)) return true;
        return false;
    }
    
}