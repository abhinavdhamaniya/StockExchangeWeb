import { Component, OnInit, Output, EventEmitter, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  constructor(private router: Router) {}

  onClickSubmit(adminLoginForm: NgForm) {
    var adminLoginDetails = adminLoginForm.value;
    var adminId = adminLoginDetails.adminId;
    var adminPassword = adminLoginDetails.adminPassword;
    if(adminId == 'admin123' && adminPassword == '123')
    {
      localStorage.setItem('LOGGED_IN_USER', "ADMIN");
      this.router.navigate(['admin/get-all-companies'])
    }
  }
}
