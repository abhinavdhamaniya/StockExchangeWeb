import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ImportDataService } from './import-data.service';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})
export class ImportDataComponent {

  sub!: Subscription;
  errorMessage: String= "";

  constructor(private importDataService: ImportDataService) {}

  onClickSubmit(importDataForm: NgForm) {
    var file: File = importDataForm.value;
    // console.log(JSON.stringify(file));
    this.sub = this.importDataService.importData(file).subscribe({
      next: response => {
        console.log(response);
      },
      error: err => this.errorMessage = err
    });
 }
}
