import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { SingleCompanyService } from './single-company.service';

@Component({
  selector: 'app-single-company',
  templateUrl: './single-company.component.html',
  styleUrls: ['./single-company.component.css']
})
export class SingleCompanyComponent {

  constructor(private singleCompanyService: SingleCompanyService) { }

  sub!: Subscription;
  errorMessage: String= "";

  chartOptions = {
    responsive: true
  }
  
  labels: string[] =  [];
  labelsWithFullFormat: string[] =  [];
  data: number[] =  [];

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
      },
      error: err => this.errorMessage = err
    });
  }

}
