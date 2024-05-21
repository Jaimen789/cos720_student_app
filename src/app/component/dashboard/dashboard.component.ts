import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  currentUser: any;
  isAdmin = false;
  isStudent = false;
  isLecturer = false;
  username: string = '';
  surname: string = '';

  ngOnInit(): void {
    // Get the current user's ID
    this.auth.getCurrentUser().subscribe(user => {
      const userId = user.uid;

      // Call getUserData function with the current user's ID
      this.auth.getUserData(userId).subscribe(userData => {
        // Retrieve username and surname from userData
        this.username = userData.name;
        this.surname = userData.surname;
      });
    });

    this.auth.getCurrentUserRoles().subscribe(roles => {
      console.log('Current user roles:', roles);
    });

    this.auth.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
      console.log('Is admin:', isAdmin);
    });

    // Check if the current user is a student
    this.auth.isStudent().subscribe(isStudent => {
      this.isStudent = isStudent;
      console.log('Is student:', isStudent);
    });

    // Check if the current user is a lecturer
    this.auth.isLecturer().subscribe(isLecturer => {
      this.isLecturer = isLecturer;
      console.log('Is lecturer:', isLecturer);
    });
  }

  create_module() {
    this.router.navigate(['/create-module']);
  }

  register_module() {
    this.router.navigate(['/module-registration']);
  }

  view_module() {
    this.router.navigate(['/view-module']);
  }

  view_student() {
    this.router.navigate(['/view-student']);
  }

  register() {
    this.auth.logout();
  }

  create_lecturer() {
    this.router.navigate(['/register']);
  }

  create_student() {
    this.router.navigate(['/register']);
  }
}




// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from 'src/app/shared/auth.service';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss']
// })
// export class DashboardComponent implements OnInit{

//   constructor(private auth: AuthService,  private router: Router){}

//   currentUser: any;

//   isAdmin = false;
//   isStudent = false;
//   isLecturer = false;
  
//   currentUser$: Observable<any> | undefined;

//   ngOnInit(): void {
//     this.auth.getCurrentUserRoles().subscribe(roles => {
//       console.log('Current user roles:', roles);
//     });

//     this.auth.isAdmin().subscribe(isAdmin => {
//       this.isAdmin = isAdmin;
//       console.log('Is admin:', isAdmin);
//     });

//     // Check if the current user is a student
//     this.auth.isStudent().subscribe(isStudent => {
//       this.isStudent = isStudent;
//       console.log('Is student:', isStudent);
//     });

//     // Check if the current user is a lecturer
//     this.auth.isLecturer().subscribe(isLecturer => {
//       this.isLecturer = isLecturer;
//       console.log('Is lecturer:', isLecturer);
//     });
//   }

//   create_module(){
//     this.router.navigate(['/create-module']);
//   }

//   register_module(){
//     this.router.navigate(['/module-registration']);
//   }

//   view_module(){
//     this.router.navigate(['/view-module']);
//   }

//   view_student(){
//     this.router.navigate(['/view-student']);
//   }

//   // ngOnInit(): void {
//   //   // Get the currently logged-in user
//   //   const currentUser = this.auth.getCurrentUser();

//   //   // Check if the user is logged in
//   //   if (currentUser) {
//   //     // Print user information in the console
//   //     console.log('User information:');
//   //     console.log('Name:', currentUser.name);
//   //     console.log('Surname:', currentUser.surname);
//   //     console.log('Email:', currentUser.email);
//   //     console.log('Roles:', currentUser.roles);
//   //     console.log('Modules:', currentUser.modules);
//   //   } else {
//   //     console.log('No user logged in.');
//   //   }
//   // }



//   register(){
//     this.auth.logout();
//   }

//   create_lecturer(){
//     this.router.navigate(['/register']);
//   }

//   create_student(){
//     this.router.navigate(['/register']);
//   }

// }
