import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModuleComponent } from './view-module.component';

describe('ViewModuleComponent', () => {
  let component: ViewModuleComponent;
  let fixture: ComponentFixture<ViewModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewModuleComponent]
    });
    fixture = TestBed.createComponent(ViewModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
