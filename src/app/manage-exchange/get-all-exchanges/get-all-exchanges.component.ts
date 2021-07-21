import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StockExchangeDto } from 'src/app/dto/StockExchangeDto';
import { GetAllExchangesService } from './get-all-exchanges.service';

@Component({
  selector: 'app-get-all-exchanges',
  templateUrl: './get-all-exchanges.component.html',
  styleUrls: ['./get-all-exchanges.component.css']
})
export class GetAllExchangesComponent implements OnInit {

  sub!: Subscription;
  stockExchanges: StockExchangeDto[] = [];
  errorMessage: String= "";

  constructor(private getAllStockExchangesService: GetAllExchangesService) {}

  ngOnInit(): void {
    this.sub = this.getAllStockExchangesService.getAllStockExchanges().subscribe({
      next: stockExchanges => {
        this.stockExchanges = stockExchanges;
      },
      error: err => this.errorMessage = err
    });
  }
}
