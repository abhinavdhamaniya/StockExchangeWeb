import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private router: Router) {}

  pageTitle = 'Stock Exchange Application';
  loggedInUser: string = localStorage.getItem('LOGGED_IN_USER')!;
  userIsLoggedIn: Boolean = false;

  ngOnInit(): void {
    setInterval(() => {
      this.loggedInUser = localStorage.getItem('LOGGED_IN_USER')!;
    }, 1);
  }

  logout(){
    localStorage.removeItem('LOGGED_IN_USER');
    localStorage.removeItem('TOKEN');
    this.router.navigate(['welcome'])
  }
}
