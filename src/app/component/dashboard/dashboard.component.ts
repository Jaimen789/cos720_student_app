import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { LoggingService } from 'src/app/logging.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private loggerService: LoggingService) { }

  currentUser: any;
  isAdmin = false;
  isStudent = false;
  isLecturer = false;
  username: string = '';
  surname: string = '';
  userEmail: string | null = null; // Store the user email

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(user => {
      const userId = user.uid;
      this.userEmail = user.email ?? null; // Store the user's email
      this.auth.getUserData(userId).subscribe(userData => {
        this.username = userData.name;
        this.surname = userData.surname;
        this.loggerService.info("User data fetched", userData, this.userEmail);
      });
    });

    this.auth.getCurrentUserRoles().subscribe(roles => {
      console.log('Current user roles:', roles);
      this.loggerService.info("Fetched user roles", roles, this.userEmail);
    });

    this.auth.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
      console.log('Is admin:', isAdmin);
      this.loggerService.info("Admin status fetched", { isAdmin }, this.userEmail);
    });

    this.auth.isStudent().subscribe(isStudent => {
      this.isStudent = isStudent;
      console.log('Is student:', isStudent);
      this.loggerService.info("Student status fetched", { isStudent }, this.userEmail);
    });

    this.auth.isLecturer().subscribe(isLecturer => {
      this.isLecturer = isLecturer;
      console.log('Is lecturer:', isLecturer);
      this.loggerService.info("Lecturer status fetched", { isLecturer }, this.userEmail);
    });
  }

  create_module() {
    this.router.navigate(['/create-module']);
    this.loggerService.info("Navigating to create module page", null, this.userEmail);
  }

  register_module() {
    this.router.navigate(['/module-registration']);
    this.loggerService.info("Navigating to module registration page", null, this.userEmail);
  }

  view_module() {
    this.router.navigate(['/view-module']);
    this.loggerService.info("Navigating to view modules page", null, this.userEmail);
  }

  register() {
    this.auth.logout();
    this.loggerService.info("Logging out", null, this.userEmail);
  }

  create_lecturer() {
    this.router.navigate(['/register']);
    this.loggerService.info("Navigating to register page for new accounts", null, this.userEmail);
  }

  view_logs(){
    this.router.navigate(['/view-logs']);
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
