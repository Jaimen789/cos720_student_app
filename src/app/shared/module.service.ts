import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private firestore: AngularFirestore) {}

  createModule(module: { name: string; lecturer: string; credits: number; semester: string }): Promise<any> {
    return this.firestore.collection('modules').add(module);
  }

  getModules(): Observable<any[]> {
    return this.firestore.collection('modules').snapshotChanges();
  }

  registerStudentToModules(studentId: string, moduleIds: string[]): Promise<void> {
    const batch = this.firestore.firestore.batch();
    moduleIds.forEach(moduleId => {
      const moduleRef = this.firestore.collection('modules').doc(moduleId).ref;
      batch.update(moduleRef, {
        students: firebase.firestore.FieldValue.arrayUnion(studentId)
      });
    });
    return batch.commit();
  }

  getModuleById(moduleId: string): Observable<any> {
    return this.firestore.collection('modules').doc(moduleId).valueChanges();
  }

  getStudentsByModuleId(moduleId: string): Observable<string[]> {
    return this.firestore.collection('modules').doc(moduleId).valueChanges().pipe(
      map((module: any) => module.students || [])
    );
  }

  getUserData(uid: string): Observable<any> {
    return this.firestore.collection('users').doc(uid).valueChanges();
  }

  getUserData2(uid: string): Observable<any> {
    return this.firestore.collection('users').doc(uid).valueChanges().pipe(
      tap(userData => console.log("User Data for UID", uid, ":", userData)),
      catchError((error: any) => {
        console.error("Error fetching user data for UID", uid, ":", error);
        return of(null); // Return null in case of an error
      })
    );
  }
  

  getUsersData(uids: string[]): Observable<any[]> {
    if (uids.length === 0) {
      console.log("No user IDs provided. Returning an empty array.");
      return new Observable<any[]>(observer => observer.next([]));
    }
    const userObservables = uids.map(uid => this.getUserData2(uid));
    console.log("User Observables:", userObservables);
    return forkJoin(userObservables);
  }
  

  // registerStudentToModule(moduleId: string, studentId: string): Promise<void> {
  //   return this.firestore.collection('modules').doc(moduleId).update({
  //     students: firebase.firestore.FieldValue.arrayUnion(studentId)
  //   });
  // }
  

}
