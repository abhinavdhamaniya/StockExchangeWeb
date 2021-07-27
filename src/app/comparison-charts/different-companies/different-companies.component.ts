import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Workbook } from 'exceljs';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { IpoDto } from 'src/app/dto/IpoDto';
import { DifferentCompaniesService } from './different-companies.service';
import * as fs from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-different-companies',
  templateUrl: './different-companies.component.html',
  styleUrls: ['./different-companies.component.css']
})
export class DifferentCompaniesComponent implements OnInit{

  constructor(private singleCompanyService: DifferentCompaniesService, private router: Router) { }

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
  data1: number[] =  [];
  data2: number[] =  [];

  avgData1: number =0;
  minData1: number =0;
  maxData1: number =0;
  ipoList1: Array<IpoDto> = [];

  avgData2: number =0;
  minData2: number =0;
  maxData2: number =0;
  ipoList2: Array<IpoDto> = [];

  chartData = [
    {
      label: 'Price Per Share(in Rs) - Company 1',
      data: this.data1
    },
    {
      label: 'Price Per Share(in Rs) - Company 2',
      data: this.data2
    }
  ];

  // CHART COLOR.
  colors = [
    {
      backgroundColor: 'rgba(30, 169, 224, 0.8)'
    },
    { 
      backgroundColor: 'rgba(77, 83, 96, 0.2)'
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
    this.data1 = [];
    this.data2 = [];

    var formData = comparisonChartForm.value;
    var company1Id = formData.company1Id;
    var company2Id = formData.company2Id;
    var startDate = formData.startDate;
    var endDate = formData.endDate;
    this.labels = this.monthsRange(startDate, endDate);
    this.labelsWithFullFormat = this.monthsRangeWithFullFormat(startDate, endDate)
    var datePriceMap1= new Map();
    var datePriceMap2= new Map();

    //Getting Company 1 Data
    this.sub = this.singleCompanyService.getIpoByCompanyId(company1Id).subscribe({
      next: ipos => {
        this.ipoList1 = ipos;
        for(var i=0; i<ipos.length; i++)
        {
          var dateStringVal = JSON.stringify(ipos[i].openDateTime).substr(1,7);
          datePriceMap1.set(dateStringVal, ipos[i].pricePerShare);
        }

        for(var i=0; i<this.labelsWithFullFormat.length; i++)
        {
          var dateVal = this.labelsWithFullFormat[i];
          this.data1.push(datePriceMap1.get(dateVal));
        }
        this.chartData[0].data= this.data1;
        this.avgData1 = this.findAvgData(this.data1);
        this.minData1 = this.findMinData(this.data1);
        this.maxData1 = this.findMaxData(this.data1);
      },
      error: err => this.errorMessage = err
    });

    //Getting Company 2 Data
    this.sub = this.singleCompanyService.getIpoByCompanyId(company2Id).subscribe({
      next: ipos => {
        this.ipoList2 = ipos;
        for(var i=0; i<ipos.length; i++)
        {
          var dateStringVal = JSON.stringify(ipos[i].openDateTime).substr(1,7);
          datePriceMap2.set(dateStringVal, ipos[i].pricePerShare);
        }

        for(var i=0; i<this.labelsWithFullFormat.length; i++)
        {
          var dateVal = this.labelsWithFullFormat[i];
          this.data2.push(datePriceMap2.get(dateVal));
        }
        this.chartData[1].data= this.data2;
        this.avgData2 = this.findAvgData(this.data2);
        this.minData2 = this.findMinData(this.data2);
        this.maxData2 = this.findMaxData(this.data2);
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

  exportToExcel(company: string) {
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

    if(company == 'COMPANY_1')
    {
      var filteredList = this.filterIpoListByMonths(this.ipoList1);
      filteredList.forEach(ipo => {
        worksheet.addRow({companyCode: ipo.company.id, stockExchange: ipo.stockExchangeName, pricePerShare: ipo.pricePerShare, totalShares:ipo.totalShares, date: ipo.openDateTime, time: "", remarks: ipo.remarks},"n");
      });
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, 'IpoData.xlsx');
      })
    }
    else {
      var filteredList = this.filterIpoListByMonths(this.ipoList2);
      filteredList.forEach(ipo => {
        worksheet.addRow({companyCode: ipo.company.id, stockExchange: ipo.stockExchangeName, pricePerShare: ipo.pricePerShare, totalShares:ipo.totalShares, date: ipo.openDateTime, time: "", remarks: ipo.remarks},"n");
      });
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, 'IpoData.xlsx');
      })
    }

  }

  filterIpoListByMonths(ipoList: Array<IpoDto>): Array<IpoDto> {
    var filteredList: Array<IpoDto> = [];
    for(var i=0; i<ipoList.length; i++) {
      if(this.labelsWithFullFormat.includes(JSON.stringify(ipoList[i].openDateTime).substr(1,7))) filteredList.push(ipoList[i]);
    }
    return filteredList;
  }
}
