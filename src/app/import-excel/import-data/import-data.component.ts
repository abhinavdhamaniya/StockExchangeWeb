import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImportDataService } from './import-data.service';
import * as XLSX from 'xlsx';
import { IpoDto } from "src/app/dto/IpoDto";
import { Router } from '@angular/router';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})
export class ImportDataComponent implements OnInit {

  sub!: Subscription;
  errorMessage: String = "";
  errorOccured: Boolean = false;
  isSuccess: Boolean = false;
  sucessMessage: String = "";

  constructor(private importDataService: ImportDataService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('TOKEN')==null) this.router.navigate(['unauthanticated']);
  }

  onFileChange(ev: any) {
    try {
      let workBook: any = null;
      let jsonData = null;
      const reader = new FileReader();
      const file = ev.target.files[0];
      reader.onload = (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        this.saveIpoList(this.buildObject(jsonData));
      }
      reader.readAsBinaryString(file);
    }
    catch(Error) {
      this.errorOccured = true;
    }
  }

  saveIpoList(ipoList: Array<IpoDto>) {
    this.sub = this.importDataService.saveIpoList(ipoList).subscribe({
      next: response => {
        this.isSuccess = true;
        this.sucessMessage = response;
        console.log(response);
      },
      error: err => {
        this.errorOccured = true;
        this.errorMessage = err
      }
    });
  }

  buildObject(jsonData: any): Array<IpoDto>
  {
    try {
        var ipoList: Array<IpoDto> = [];
        var dataArray = jsonData.Sheet1;
        for(var i=0; i<dataArray.length; i++)
        {
          var ipo = new IpoDto();
          ipo.company.id = dataArray[i]["Company Code"];
          ipo.stockExchangeName = dataArray[i]["Stock Exchange"];
          ipo.pricePerShare = dataArray[i]["Price Per Share(in Rs)"];
          ipo.totalShares = dataArray[i]["Total Shares"];
          ipo.openDateTime = this.excelDateToJSDate(dataArray[i]["Date"]);
          ipo.remarks = dataArray[i]["Remarks"];
          ipoList.push(ipo);
        }
        return ipoList;
    }
    catch(Error)
    {
      this.errorOccured = true;
      return [];
    }
  }

  excelDateToJSDate(xlSerial: any){
    return new Date(-2209075200000 + (xlSerial - (xlSerial < 61 ? 0 : 1)) * 86400000);
  }
}
