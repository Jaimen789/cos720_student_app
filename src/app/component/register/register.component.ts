import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  name: string = '';
  surname: string = '';
  student_number: string = '';
  email: string = '';
  password: string = '';
  selectedRole: string = '';
  roles: string[] = ['Lecturer', 'Student'];
  modules: any[] = [];
  selected_role_array: string [] = [];


  constructor(private auth: AuthService ){}

  ngOnInit(): void {

    this.auth.getCurrentUserRoles().subscribe(roles => {
      console.log("Current user roles:", roles);
    });
    

  }
  
  

  register(){

    if(this.name == ''){
      alert("Please Enter A Name");
      return;
    }

    if(this.surname == ''){
      alert("Please Enter A Surname");
      return;
    }

    if(this.email == ''){
      alert("Please Enter A Email Address");
      return;
    }

    if(this.password == ''){
      alert("Please Enter A Password");
      return;
    }


    if(this.student_number == ''){
      alert("Please Enter Lecturer Number");
      return;
    }

    if(this.selectedRole == ''){
      alert("Please Select A Role");
      return;
    }

    this.selected_role_array[0] = this.selectedRole;
    


    this.auth.register(this.name, this.surname, this.student_number, this.email , this.password, this.selected_role_array, this.modules);
    this.email = '';
    this.password = '';

  }

  is_admin() : Observable<boolean>{
    return this.auth.isAdmin();
  }
}
