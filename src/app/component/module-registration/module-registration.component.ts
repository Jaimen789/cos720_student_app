import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../../shared/module.service';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-module-registration',
  templateUrl: './module-registration.component.html',
  styleUrls: ['./module-registration.component.scss']
})
export class ModuleRegistrationComponent {
  modules!: any[];
  selectedModuleIds: string[] = [];
  totalCredits: number = 0;
  selectedModuleCount: number = 0;
  selectedModules: any[] = [];
  
  constructor(private moduleService: ModuleService, private authService: AuthService, private router: Router) {}
  
  ngOnInit() {
    this.moduleService.getModules().subscribe(modules => {
      this.modules = modules.map(module => {
        return {
          id: module.payload.doc.id,
          ...module.payload.doc.data()
        };
      });
    });
  }

  toggleModuleSelection(moduleId: string) {
    if (this.isSelected(moduleId)) {
      this.selectedModuleIds = this.selectedModuleIds.filter(id => id !== moduleId);
      this.totalCredits -= this.modules.find(module => module.id === moduleId).credits;
    } else {
      this.selectedModuleIds.push(moduleId);
      this.totalCredits += this.modules.find(module => module.id === moduleId).credits;
    }
    this.selectedModuleCount = this.selectedModuleIds.length;
    this.selectedModules = this.modules.filter(module => this.isSelected(module.id));
  }

  isSelected(moduleId: string): boolean {
    return this.selectedModuleIds.includes(moduleId);
  }

  registerForModule() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.moduleService.registerStudentToModules(user.uid, this.selectedModuleIds)
          .then(() => {
            // Update user's modules array in Firestore
            this.authService.updateUserModules(user.uid, this.selectedModuleIds)
              .then(() => {
                // Registration and update successful
                alert('Module registration successful.');
                // Optionally, you can clear the selectedModuleIds array and update other necessary UI states
                this.selectedModuleIds = [];
                this.totalCredits = 0;
                this.selectedModuleCount = 0;
                this.selectedModules = [];
  
                this.router.navigateByUrl('/dashboard');
              })
              .catch(error => {
                // Updating user modules failed
                console.error('Error updating user modules:', error);
                alert('Module registration successful, but failed to update user data. Please try again later.');
              });
          })
          .catch(error => {
            // Registration failed
            console.error('Error registering for modules:', error);
            alert('Module registration failed. Please try again later.');
          });
      }
    });
  }
  
  
  // registerForModule() {
  //   this.authService.getCurrentUser().subscribe(user => {
  //     if (user) {
  //       this.moduleService.registerStudentToModules(user.uid, this.selectedModuleIds)
  //         .then(() => {
  //           // Registration successful
  //           alert('Module registration successful.');
  //           // Optionally, you can clear the selectedModuleIds array and update other necessary UI states
  //           this.selectedModuleIds = [];
  //           this.totalCredits = 0;
  //           this.selectedModuleCount = 0;
  //           this.selectedModules = [];

  //           this.router.navigateByUrl('/dashboard');

  //         })
  //         .catch(error => {
  //           // Registration failed
  //           console.error('Error registering for modules:', error);
  //           alert('Module registration failed. Please try again later.');
  //         });
  //     }
  //   });
  // }
  

}
