import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  email: string = '';
  password : string = '';

  constructor(private auth: AuthService){}

  ngOnInit(): void {
    
  }

  login(){

    if(this.email == ''){
      alert("Please Enter A Email Address");
      return;
    }

    if(this.password == ''){
      alert("Please Enter A Password");
      return;
    }

    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';

  }
}
