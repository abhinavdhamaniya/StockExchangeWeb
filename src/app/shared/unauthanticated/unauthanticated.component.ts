import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthanticated',
  templateUrl: './unauthanticated.component.html',
  styleUrls: ['./unauthanticated.component.css']
})
export class UnauthanticatedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  gotoWelcome(){
    this.router.navigate(['welcome'])
  }
}
