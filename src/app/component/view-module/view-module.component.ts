import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../../shared/module.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-view-module',
  templateUrl: './view-module.component.html',
  styleUrls: ['./view-module.component.scss']
})
export class ViewModuleComponent implements OnInit{

  enrolledModules: any[] = []; // Array to hold enrolled module details

  constructor(private authService: AuthService, private moduleService: ModuleService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (user && user.uid) {
        this.authService.getUserModules(user.uid).subscribe(moduleIds => {
          this.fetchModuleDetails(moduleIds);
        });
      }
    });
  }

  fetchModuleDetails(moduleIds: string[]): void {
    this.enrolledModules = [];
    moduleIds.forEach(moduleId => {
      this.moduleService.getModuleById(moduleId).subscribe(moduleDetails => {
        this.enrolledModules.push(moduleDetails);
      });
    });
  }

}
