import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  errorOccured: Boolean = false;

  constructor(private getAllStockExchangesService: GetAllExchangesService, private router: Router) {}

  ngOnInit(): void {
    if(localStorage.getItem('TOKEN')==null) this.router.navigate(['unauthanticated']);
    this.sub = this.getAllStockExchangesService.getAllStockExchanges().subscribe({
      next: stockExchanges => {
        this.stockExchanges = stockExchanges;
        this.errorOccured = false;
        this.errorMessage = "";
      },
      error: err => {
        this.errorOccured = true;
        this.errorMessage = err
      }
    });
  }
}
