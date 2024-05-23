import { Component, OnInit } from '@angular/core';
import { LoggingService, Ilogger } from 'src/app/logging.service';

@Component({
  selector: 'app-view-logs',
  templateUrl: './view-logs.component.html',
  styleUrls: ['./view-logs.component.scss']
})
export class ViewLogsComponent implements OnInit {
  logs: Ilogger[] = [];

  constructor(private loggingService: LoggingService) { }

  ngOnInit(): void {
    this.loggingService.getAllLog().subscribe(snapshot => {
      this.logs = snapshot.map(log => {
        const data = log.payload.doc.data() as Ilogger;
        data.loggerId = log.payload.doc.id;
        return data;
      });
    });
  }

  navigateToDashboard(){}
}
