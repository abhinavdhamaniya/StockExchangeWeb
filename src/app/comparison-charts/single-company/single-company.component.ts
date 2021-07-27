import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { SingleCompanyService } from './single-company.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { IpoDto } from 'src/app/dto/IpoDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-company',
  templateUrl: './single-company.component.html',
  styleUrls: ['./single-company.component.css']
})
export class SingleCompanyComponent implements OnInit {

  constructor(private singleCompanyService: SingleCompanyService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('TOKEN')==null) this.router.navigate(['unauthanticated']);
  }

  sub!: Subscription;
  errorMessage: String= "";

  chartOptions = {
    responsive: true
  }
  
  labels: string[] =  [];
  labelsWithFullFormat: string[] =  [];
  data: number[] =  [];
  ipoList: Array<IpoDto> = [];
  avgData: number =0;
  minData: number =0;
  maxData: number =0;

  chartData = [
    {
      label: 'Price Per Share(in Rs)',
      data: this.data
    }
  ];

  // CHART COLOR.
  colors = [
    {
      backgroundColor: 'rgba(30, 169, 224, 0.8)'
    }
  ]

  monthsRange(startDate: string, endDate: string) {
    var _startDate = moment(startDate);
    var _endDate = moment(endDate);
    var dates= [];
    _endDate.subtract(1, "month");
    var month = moment(_startDate);
    while( month < _endDate ) {
        month.add(1, "month");
        dates.push(month.format("MMM YYYY"));
    }
    return dates;
  }

  monthsRangeWithFullFormat(startDate: string, endDate: string) {
    var _startDate = moment(startDate);
    var _endDate = moment(endDate);
    var dates= [];
    _endDate.subtract(1, "month");
    var month = moment(_startDate);
    while( month < _endDate ) {
        month.add(1, "month");
        dates.push(month.format("YYYY-MM"));
    }
    return dates;
  }

  onClickSubmit(comparisonChartForm: NgForm) {
    // clearing old data
    this.labels = [];
    this.labelsWithFullFormat = [];
    this.data = [];

    var formData = comparisonChartForm.value;
    var companyId = formData.companyId;
    var startDate = formData.startDate;
    var endDate = formData.endDate;
    this.labels = this.monthsRange(startDate, endDate);
    this.labelsWithFullFormat = this.monthsRangeWithFullFormat(startDate, endDate)
    var datePriceMap= new Map();

    this.sub = this.singleCompanyService.getIpoByCompanyId(companyId).subscribe({
      next: ipos => {
        this.ipoList = ipos;
        for(var i=0; i<ipos.length; i++)
        {
          var dateStringVal = JSON.stringify(ipos[i].openDateTime).substr(1,7);
          datePriceMap.set(dateStringVal, ipos[i].pricePerShare);
        }

        for(var i=0; i<this.labelsWithFullFormat.length; i++)
        {
          var dateVal = this.labelsWithFullFormat[i];
          this.data.push(datePriceMap.get(dateVal));
        }
        this.chartData[0].data= this.data;
        this.avgData = this.findAvgData(this.data);
        this.minData = this.findMinData(this.data);
        this.maxData = this.findMaxData(this.data);
      },
      error: err => this.errorMessage = err
    });
  }

  findAvgData(data: number[])
  {
    var sum: number = 0;
    var count: number = 0;
    for(var i=0; i<data.length; i++) {
      if(data[i]!=undefined) {
        sum+= data[i];
        count++;
      }
    } 
    return sum/count;
  }

  findMaxData(data: number[])
  {
    var max: number = -1;
    for(var i=0; i<data.length; i++) {
      if(data[i]!=undefined && data[i]>max) max = data[i];
    } 
    return max;
  }

  findMinData(data: number[])
  {
    var min: number = Number.MAX_SAFE_INTEGER;
    for(var i=0; i<data.length; i++) {
      if(data[i]!=undefined && data[i]<min) min = data[i];
    } 
    return min;
  }

  exportToExcel() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Sheet1');
    worksheet.columns = [
      { header: 'Company Code', key: 'companyCode', width: 17 },
      { header: 'Stock Exchange', key: 'stockExchange', width: 17 },
      { header: 'Price Per Share(in Rs)', key: 'pricePerShare', width: 20 },
      { header: 'Total Shares', key: 'totalShares', width: 15 },
      { header: 'Date', key: 'date', width: 20},
      { header: 'Time', key: 'time', width: 10},
      { header: 'Remarks', key: 'remarks', width: 17},
    ];
    var filteredList = this.filterIpoListByMonths(this.ipoList);
    filteredList.forEach(ipo => {
      worksheet.addRow({companyCode: ipo.company.id, stockExchange: ipo.stockExchangeName, pricePerShare: ipo.pricePerShare, totalShares:ipo.totalShares, date: ipo.openDateTime, time: "", remarks: ipo.remarks},"n");
    });
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'IpoData.xlsx');
    })
  }

  filterIpoListByMonths(ipoList: Array<IpoDto>): Array<IpoDto> {
    var filteredList: Array<IpoDto> = [];
    for(var i=0; i<ipoList.length; i++) {
      if(this.labelsWithFullFormat.includes(JSON.stringify(ipoList[i].openDateTime).substr(1,7))) filteredList.push(ipoList[i]);
    }
    return filteredList;
  }
}
