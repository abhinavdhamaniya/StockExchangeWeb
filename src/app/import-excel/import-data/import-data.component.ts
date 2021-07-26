import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImportDataService } from './import-data.service';
import * as XLSX from 'xlsx';
import { IpoDto } from "src/app/dto/IpoDto";

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})
export class ImportDataComponent {

  sub!: Subscription;
  errorMessage: String= "";

  constructor(private importDataService: ImportDataService) { }

  onFileChange(ev: any) {
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

  saveIpoList(ipoList: Array<IpoDto>) {
    this.sub = this.importDataService.saveIpoList(ipoList).subscribe({
      next: response => {
        console.log(response);
      },
      error: err => this.errorMessage = err
    });
  }

  buildObject(jsonData: any): Array<IpoDto>
  {
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

  excelDateToJSDate(xlSerial: any){
    return new Date(-2209075200000 + (xlSerial - (xlSerial < 61 ? 0 : 1)) * 86400000);
  }
}
