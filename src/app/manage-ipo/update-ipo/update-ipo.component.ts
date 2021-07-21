import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IpoDto } from 'src/app/dto/IpoDto';
import { UpdateIpoService } from './update-ipo.service';

@Component({
  selector: 'app-update-ipo',
  templateUrl: './update-ipo.component.html',
  styleUrls: ['./update-ipo.component.css']
})
export class UpdateIpoComponent {

  sub!: Subscription;
  errorMessage: String= "";
  _ipoId: String = "";
  public ipoExists: Boolean = false;

  constructor(private updateIpoService: UpdateIpoService) {}

  checkExists(checkIpoIdForm: NgForm) {
    var ipoId: String = checkIpoIdForm.value.ipoId;
    this.sub = this.updateIpoService.checkExists(ipoId).subscribe({
      next: response => {
        this.ipoExists = response;
        this._ipoId = ipoId;
      },
      error: err => {
        this.ipoExists = false;
        this.errorMessage = err
      }
    });
  }

  updateIpo(updateCompanyForm: NgForm) {
    var company = this.buildObject(updateCompanyForm);
    this.sub = this.updateIpoService.updateIpo(this._ipoId, company).subscribe({
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
