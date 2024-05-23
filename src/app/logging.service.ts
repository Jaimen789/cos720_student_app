import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  level: LogLevel = LogLevel.All;

  constructor(private firestore: AngularFirestore) { }

  debug(msg: string, rawdata?: any, userEmail: string | null = null, ...optionalParams: any[]) {
    this.writeToLog(msg, rawdata, LogLevel.Debug, userEmail, optionalParams);
  }

  info(msg: string, rawdata?: any, userEmail: string | null = null, ...optionalParams: any[]) {
    this.writeToLog(msg, rawdata, LogLevel.Info, userEmail, optionalParams);
  }

  warn(msg: string, rawdata?: any, userEmail: string | null = null, ...optionalParams: any[]) {
    this.writeToLog(msg, rawdata, LogLevel.Warn, userEmail, optionalParams);
  }

  error(msg: string, rawdata?: any, userEmail: string | null = null, ...optionalParams: any[]) {
    this.writeToLog(msg, rawdata, LogLevel.Error, userEmail, optionalParams);
  }

  fatal(msg: string, rawdata?: any, userEmail: string | null = null, ...optionalParams: any[]) {
    this.writeToLog(msg, rawdata, LogLevel.Fatal, userEmail, optionalParams);
  }

  log(msg: string, rawdata?: any, userEmail: string | null = null, ...optionalParams: any[]) {
    this.writeToLog(msg, rawdata, LogLevel.All, userEmail, optionalParams);
  }

  setLogLevel(level: LogLevel) {
    this.level = level;
  }

  

  private writeToLog(
    msg: string,
    rawdata: Error | null,
    level: LogLevel,
    userEmail: string | null, // Pass user email separately
    params: any[]
  ) {
    if (this.shouldLog(level)) {
      let value: Ilogger = {} as Ilogger;

      value.LogDate = new Date().toISOString();
      value.LogLevel = LogLevel[level];
      value.Message = msg;
      value.UserEmail = userEmail; // Assign user email to log entry

      if (rawdata) {
        value.RawData = rawdata.stack;
      }

      if (params.length) {
        value.OptionalParams = JSON.stringify(params);
      }

      if (environment.Logging.isFirebase) {
        this.LogToFireBase(value);
      }

      console.log(value);
    }
  }

  private shouldLog(level: LogLevel): boolean {
    let ret: boolean = false;

    if (
      (level >= this.level && level !== LogLevel.Off) ||
      this.level === LogLevel.All
    ) {
      ret = true;
    }

    return ret;
  }

  private LogToFireBase(val: Ilogger) {
    this.firestore.collection('logging').add({ ...val });
  }

  getAllLog() {
    return this.firestore.collection("logging").snapshotChanges();
  }

}

export interface Ilogger {
  loggerId?: string;
  LogDate: string;
  LogLevel: string;
  Message: string;
  OptionalParams?: string;
  RawData?: string;
  UserEmail?: string | null; // Modified to accept user email
}

export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6,
}
