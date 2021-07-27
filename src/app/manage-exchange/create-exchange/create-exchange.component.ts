import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StockExchangeDto } from 'src/app/dto/StockExchangeDto';
import { FormValidationService } from 'src/app/shared/form-validation.service';
import { CreateExchangeService } from './create-exchange.service';

@Component({
  selector: 'app-create-exchange',
  templateUrl: './create-exchange.component.html',
  styleUrls: ['./create-exchange.component.css']
})
export class CreateExchangeComponent implements OnInit{

  sub!: Subscription;
  errorMessage: String= "";
  errorOccured: Boolean = false;
  isSuccess: Boolean = false;
  sucessMessage: String = "";

  constructor(private createExchangeService: CreateExchangeService, private formValidationService: FormValidationService, private router: Router) {}

  ngOnInit(): void {
    if(localStorage.getItem('TOKEN')==null) this.router.navigate(['unauthanticated']);
  }

  onClickSubmit(createStockExchangeForm: NgForm) {
    this.errorOccured = false;
    this.errorMessage = "";
    var stockExchange = this.buildObject(createStockExchangeForm);
    if(stockExchange == false) return;
    this.sub = this.createExchangeService.createExchange(stockExchange).subscribe({
      next: response => {
        this.errorOccured = false;
        this.errorMessage = "";
        this.isSuccess = true;
        this.sucessMessage = response;
        console.log(response);
      },
      error: err => {
        this.isSuccess = false;
        this.sucessMessage = "";
        if(err.status==404){
          this.errorOccured = true;
          this.errorMessage += "Company Not Found"+ " | ";
        }
        else if(err.status==500){
          this.errorOccured = true;
          this.errorMessage += "Internal Server Error"+ " | ";
        }
        else if(err.status!=200){
          this.errorOccured = true;
          this.errorMessage += "Some Error occured"+ " | ";
        }
        else {
          this.errorOccured = false;
          this.errorMessage = "";
        }
      }
    });
 }

  private buildObject(createStockExchangeForm: NgForm): StockExchangeDto | false {
    this.errorOccured = false;
    this.errorMessage = "";
    try {
      var stockExchange: StockExchangeDto = new StockExchangeDto();
      var stockExchangeDetails = createStockExchangeForm.value;
      stockExchange.stockExchangeName = stockExchangeDetails.stockExchangeName;
      stockExchange.brief = stockExchangeDetails.brief;
      stockExchange.contactAddress = stockExchangeDetails.contactAddress;
      stockExchange.remarks = stockExchangeDetails.remarks;
      if(this.formValidationService.validateCommaSeparatedIntegers(stockExchangeDetails.companyIds)!=true) {
        throw new Error("companyIds");
      }
      stockExchange.companyIds = stockExchangeDetails.companyIds.split(',').map(Number);
      return stockExchange;
    }
    catch(e)
    {
      this.errorOccured = true;
      if((<Error>e).message=='companyIds') this.errorMessage += "Company Ids should be comma separated integers (No Spaces)"+ " | ";
      return false
    }
  }
}
