import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StockExchangeDto } from 'src/app/dto/StockExchangeDto';
import { CreateExchangeService } from './create-exchange.service';

@Component({
  selector: 'app-create-exchange',
  templateUrl: './create-exchange.component.html',
  styleUrls: ['./create-exchange.component.css']
})
export class CreateExchangeComponent {

  sub!: Subscription;
  errorMessage: String= "";

  constructor(private createExchangeService: CreateExchangeService) {}

  onClickSubmit(createStockExchangeForm: NgForm) {
    var stockExchange = this.buildObject(createStockExchangeForm);
    this.sub = this.createExchangeService.createExchange(stockExchange).subscribe({
      next: response => {
        console.log(response);
      },
      error: err => this.errorMessage = err
    });
 }

  private buildObject(createStockExchangeForm: NgForm): StockExchangeDto {
    var stockExchange: StockExchangeDto = new StockExchangeDto();
    var stockExchangeDetails = createStockExchangeForm.value;
    stockExchange.stockExchangeName = stockExchangeDetails.stockExchangeName;
    stockExchange.brief = stockExchangeDetails.brief;
    stockExchange.contactAddress = stockExchangeDetails.contactAddress;
    stockExchange.remarks = stockExchangeDetails.remarks;
    stockExchange.companyIds = stockExchangeDetails.companyIds.split(',').map(Number);
    return stockExchange;
  }
}
