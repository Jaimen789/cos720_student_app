import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLogsComponent } from './view-logs.component';

describe('ViewLogsComponent', () => {
  let component: ViewLogsComponent;
  let fixture: ComponentFixture<ViewLogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewLogsComponent]
    });
    fixture = TestBed.createComponent(ViewLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
