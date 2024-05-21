import { Component } from '@angular/core';
import { ModuleService } from '../../shared/module.service';
import { Router } from '@angular/router';

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


  constructor(private moduleService: ModuleService, private router: Router) {}


  createModule() {
    const newModule = {
      name: this.moduleName,
      lecturer: this.lecturer,
      credits: this.credits,
      semester: this.semester,
      students: []
    };
  
    this.moduleService.createModule(newModule).then(() => {
      alert('Module created successfully!');
      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      alert(`Failed to create module: ${error.message}`);
    });
  }
  

}
