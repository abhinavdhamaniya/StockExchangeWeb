import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { DifferentCompaniesService } from './different-companies.service';

@Component({
  selector: 'app-different-companies',
  templateUrl: './different-companies.component.html',
  styleUrls: ['./different-companies.component.css']
})
export class DifferentCompaniesComponent {

  constructor(private singleCompanyService: DifferentCompaniesService) { }

  sub!: Subscription;
  errorMessage: String= "";

  chartOptions = {
    responsive: true
  }
  
  labels: string[] =  [];
  labelsWithFullFormat: string[] =  [];
  data1: number[] =  [];
  data2: number[] =  [];

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
      },
      error: err => this.errorMessage = err
    });

    //Getting Company 2 Data
    this.sub = this.singleCompanyService.getIpoByCompanyId(company2Id).subscribe({
      next: ipos => {
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
        console.log(this.data2);
      },
      error: err => this.errorMessage = err
    });
  }

}
