import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IpoDto } from 'src/app/dto/IpoDto';
import { GetAllIposService } from './get-all-ipos.service';

@Component({
  selector: 'app-get-all-ipos',
  templateUrl: './get-all-ipos.component.html',
  styleUrls: ['./get-all-ipos.component.css']
})
export class GetAllIposComponent implements OnInit {

  sub!: Subscription;
  ipos: IpoDto[] = [];
  errorMessage: String= "";
  errorOccured: Boolean = false;

  constructor(private getAllIposService: GetAllIposService) {}

  ngOnInit(): void {
    this.sub = this.getAllIposService.getAllIpos().subscribe({
      next: ipos => {
        this.ipos = ipos;
        this.errorOccured = false;
        this.errorMessage = "";
      },
      error: err => { 
        this.errorOccured = true;
        this.errorMessage = err;
      }
    });
  }

}
