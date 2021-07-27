import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IpoDto } from 'src/app/dto/IpoDto';
import { CreateIpoService } from './create-ipo.service';

@Component({
  selector: 'app-create-ipo',
  templateUrl: './create-ipo.component.html',
  styleUrls: ['./create-ipo.component.css']
})
export class CreateIpoComponent implements OnInit {

  sub!: Subscription;
  errorMessage: String= "";
  errorOccured: Boolean = false;
  isSuccess: Boolean = false;
  sucessMessage: String = "";

  constructor(private createIpoService: CreateIpoService, private router: Router) {}

  ngOnInit(): void {
    if(localStorage.getItem('TOKEN')==null) this.router.navigate(['unauthanticated']);
  }

  onClickSubmit(createIpoForm: NgForm) {
    this.errorOccured = false;
    this.errorMessage = "";
    var ipo = this.buildObject(createIpoForm);
    this.sub = this.createIpoService.createIpo(ipo).subscribe({
      next: response => {
        console.log(response);
        this.errorOccured = false;
        this.errorMessage = "";
        this.isSuccess = true;
        this.sucessMessage = response;
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
