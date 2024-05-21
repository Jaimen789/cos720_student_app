import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../../shared/module.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit {
  modules: any[] = [];
  selectedModuleId: string | null = null;
  students: any[] | null = null;
  noStudents: boolean = false;
  studentsDisplayData: any[] = [];

  constructor(private moduleService: ModuleService) {}

  ngOnInit() {
    this.moduleService.getModules().subscribe(modules => {
      this.modules = modules.map(e => ({
        id: e.payload.doc.id,
        ...e.payload.doc.data()
      }));
    });
  }

  onModuleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const moduleId = target.value;
    this.selectedModuleId = moduleId;
  
    this.moduleService.getStudentsByModuleId(moduleId).subscribe(studentIds => {
      if (studentIds.length === 0) {
        this.noStudents = true;
        this.students = [];
        this.studentsDisplayData = [];
      } else {
        this.noStudents = false;
        this.moduleService.getUsersData(studentIds).subscribe(
          studentsData => {
            console.log("Students Data:", studentsData); // Ensure studentsData is correct
            this.students = studentsData;
            this.studentsDisplayData = studentsData.map(student => ({
              name: student.name,
              surname: student.surname,
              ref_number: student.ref_number
            }));
            console.log("Students Display Data:", this.studentsDisplayData); // Verify studentsDisplayData
          },
          error => {
            console.error("Error fetching students data:", error);
            // Handle error here (e.g., set students to null, show error message)
            this.students = [];
            this.studentsDisplayData = [];
          }
        );
      }
    }, error => {
      console.error("Error fetching student IDs:", error);
      // Handle error here (e.g., set students to null, show error message)
      this.students = [];
      this.studentsDisplayData = [];
    });
  }
  
  
  
}
