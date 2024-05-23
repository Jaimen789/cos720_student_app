import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModuleService } from '../../shared/module.service';
import { AuthService } from '../../shared/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-module',
  templateUrl: './view-module.component.html',
  styleUrls: ['./view-module.component.scss']
})
export class ViewModuleComponent implements OnInit, OnDestroy {

  enrolledModules: any[] = []; // Array to hold enrolled module details
  private subscriptions: Subscription = new Subscription();

  constructor(private authService: AuthService, private moduleService: ModuleService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.getCurrentUser().subscribe(user => {
        if (user && user.uid) {
          this.subscriptions.add(
            this.authService.getUserModules(user.uid).subscribe(moduleIds => {
              this.fetchModuleDetails(moduleIds);
            })
          );
        }
      })
    );
  }

  fetchModuleDetails(moduleIds: string[]): void {
    this.enrolledModules = [];
    moduleIds.forEach(moduleId => {
      this.subscriptions.add(
        this.moduleService.getModuleById(moduleId).subscribe(moduleDetails => {
          this.enrolledModules.push(moduleDetails);
        })
      );
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
