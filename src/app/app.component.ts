import { Component, OnInit } from '@angular/core';
import { LogLevel, LoggingService } from './logging.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'cos720_student_app';

  constructor(private loggerService: LoggingService){}

  ngOnInit() {
    const logLevel = LogLevel[environment.Logging.LogLevel as keyof typeof LogLevel];
  }
}
