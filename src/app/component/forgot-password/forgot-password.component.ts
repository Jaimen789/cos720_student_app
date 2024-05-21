import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{

  email: string = '';

  constructor(private auth: AuthService){}

  ngOnInit(): void {
    
  }

  forgotPassword(){
    alert("Link has been sent to your registered email. Please verify it.")
    this.auth.forgotPassword(this.email);
    this.email = '';
  }

}
