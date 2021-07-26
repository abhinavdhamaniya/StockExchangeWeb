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
  errorOccured: Boolean = false;
  isSuccess: Boolean = false;
  sucessMessage: String = "";
  _ipoId: String = "";
  public ipoExists: Boolean = false;

  constructor(private updateIpoService: UpdateIpoService) {}

  checkExists(checkIpoIdForm: NgForm) {
    this.errorOccured = false;
    this.errorMessage = "";
    var ipoId: String = checkIpoIdForm.value.ipoId;
    this.sub = this.updateIpoService.checkExists(ipoId).subscribe({
      next: response => {
        this.ipoExists = response;
        this._ipoId = ipoId;
        this.errorOccured = false;
        this.errorMessage = "";
      },
      error: err => {
        this.ipoExists = false;
        if(err.status==404){
          this.errorOccured = true;
          this.errorMessage += "IPO Not Found"+ " | ";
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

  updateIpo(updateCompanyForm: NgForm) {
    this.errorOccured = false;
    this.errorMessage = "";
    var company = this.buildObject(updateCompanyForm);
    this.sub = this.updateIpoService.updateIpo(this._ipoId, company).subscribe({
      next: response => {
        this.isSuccess = true;
        this.sucessMessage = response;
        console.log(response);
      },
      error: err => {
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

  private buildObject(createIpoForm: NgForm): IpoDto {
    this.errorOccured = false;
    this.errorMessage = "";
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
