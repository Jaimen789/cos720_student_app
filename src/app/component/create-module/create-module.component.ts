import { Component } from '@angular/core';
import { ModuleService } from '../../shared/module.service';
import { Router } from '@angular/router';
import { LoggingService } from '../../logging.service'; // Import LoggingService
import { AuthService } from '../../shared/auth.service'; // Import AuthService

@Component({
  selector: 'app-create-module',
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.scss']
})
export class CreateModuleComponent {
  moduleName: string = '';
  lecturer: string = '';
  credits: number = 0;
  semester: string = '';
  userEmail: string | null = null; // Store the user email

  constructor(
    private moduleService: ModuleService,
    private router: Router,
    private loggerService: LoggingService, // Inject LoggingService
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    // Retrieve the user's email when the component initializes
    this.authService.getCurrentUser().subscribe(user => {
      this.userEmail = user.email ?? null; // Store the user's email
    });
  }

  createModule() {
    const newModule = {
      name: this.moduleName,
      lecturer: this.lecturer,
      credits: this.credits,
      semester: this.semester,
      students: [],
    };
  
    this.moduleService.createModule(newModule).then(() => {
      this.loggerService.info('Module created successfully', null, this.userEmail); // Log successful module creation
      alert('Module created successfully!');
      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      this.loggerService.error('Failed to create module', error, this.userEmail); // Log error while creating module
      alert(`Failed to create module: ${error.message}`);
    });
  }
}


// import { Component } from '@angular/core';
// import { ModuleService } from '../../shared/module.service';
// import { Router } from '@angular/router';
// import { LoggingService } from '../../logging.service'; // Import LoggingService

// @Component({
//   selector: 'app-create-module',
//   templateUrl: './create-module.component.html',
//   styleUrls: ['./create-module.component.scss']
// })
// export class CreateModuleComponent {
//   moduleName: string = '';
//   lecturer: string = '';
//   credits: number = 0;
//   semester: string = '';

//   constructor(
//     private moduleService: ModuleService,
//     private router: Router,
//     private loggerService: LoggingService // Inject LoggingService
//   ) {}

//   createModule() {
//     const newModule = {
//       name: this.moduleName,
//       lecturer: this.lecturer,
//       credits: this.credits,
//       semester: this.semester,
//       students: [],
//     };
  
//     this.moduleService.createModule(newModule).then(() => {
//       this.loggerService.info('Module created successfully', null); // Pass null as rawdata for successful creation
//       alert('Module created successfully!');
//       this.router.navigate(['/dashboard']);
//     }).catch((error) => {
//       this.loggerService.error('Failed to create module', error, null); // Pass null as rawdata for failure
//       alert(`Failed to create module: ${error.message}`);
//     });
//   }
  
// }


// import { Component } from '@angular/core';
// import { ModuleService } from '../../shared/module.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-create-module',
//   templateUrl: './create-module.component.html',
//   styleUrls: ['./create-module.component.scss']
// })
// export class CreateModuleComponent {
//   moduleName: string = '';
//   lecturer: string = '';
//   credits: number = 0;
//   semester: string = '';


//   constructor(private moduleService: ModuleService, private router: Router) {}


//   createModule() {
//     const newModule = {
//       name: this.moduleName,
//       lecturer: this.lecturer,
//       credits: this.credits,
//       semester: this.semester,
//       students: []
//     };
  
//     this.moduleService.createModule(newModule).then(() => {
//       alert('Module created successfully!');
//       this.router.navigate(['/dashboard']);
//     }).catch((error) => {
//       alert(`Failed to create module: ${error.message}`);
//     });
//   }
  

// }
