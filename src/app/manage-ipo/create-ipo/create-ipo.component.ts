import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IpoDto } from 'src/app/dto/IpoDto';
import { CreateIpoService } from './create-ipo.service';

@Component({
  selector: 'app-create-ipo',
  templateUrl: './create-ipo.component.html',
  styleUrls: ['./create-ipo.component.css']
})
export class CreateIpoComponent {

  sub!: Subscription;
  errorMessage: String= "";

  constructor(private createIpoService: CreateIpoService) {}

  onClickSubmit(createIpoForm: NgForm) {
    var ipo = this.buildObject(createIpoForm);
    this.sub = this.createIpoService.createIpo(ipo).subscribe({
      next: response => {
        console.log(response);
      },
      error: err => this.errorMessage = err
    });
 }

  private buildObject(createIpoForm: NgForm): IpoDto {
    var ipo: IpoDto = new IpoDto();
    var ipoDetails = createIpoForm.value;
    ipo.company.id = ipoDetails.companyId;
    ipo.stockExchangeName = ipoDetails.stockExchangeName;
    ipo.pricePerShare = ipoDetails.pricePerShare;
    ipo.totalShares = ipoDetails.totalShares;
    // TODO ipo.openDateTime = get current date in current time zone;
    ipo.remarks = ipoDetails.remarks;
    return ipo;
  }
}
