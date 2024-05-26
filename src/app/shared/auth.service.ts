import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { LoggingService } from 'src/app/logging.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser$!: Observable<any>;

  constructor(
    private fireauth: AngularFireAuth, 
    private router: Router, 
    private firestore: AngularFirestore, 
    private loggerService: LoggingService
  ) {
    this.currentUser$ = this.fireauth.authState;
  }

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password)
      .then(res => {
        localStorage.setItem('token', 'true');
        if (res.user?.emailVerified == true) {
          this.router.navigate(['dashboard']);
          this.loggerService.info("Login attempt successful", null, res.user?.email);
        } else {
          alert("Verification email has been sent to you. Please verify email.");
          this.sendEmailForVerification(res.user);
        }
      })
      .catch(err => {
        alert(err.message);
        this.loggerService.error("Login attempt failed", err);
        this.router.navigate(['/login']);
      });
  }

  register(name: string, surname: string, ref_number: string, email: string, password: string, roles: string[], modules: string[]) {
    this.fireauth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const userData = {
          name,
          surname,
          email,
          ref_number,
          roles,
          modules
        };

        this.firestore.collection('users').doc(res.user?.uid).set(userData);
        // this.sendEmailForVerification(res.user);

        const userEmail = res.user?.email;
        if (userEmail) {
          this.sendResetPasswordEmail(userEmail);
        } else {
          console.error("User email is undefined");
        }

        alert("Registration is Successful");
        this.loggerService.info("Registration successful", userData, userEmail);
      })
      .catch((err) => {
        alert(err.message);
        this.loggerService.error("Registration failed", err);
        this.router.navigate(['/register']);
      });
  }

  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      this.loggerService.info("User logged out");
    }, err => {
      alert(err.message);
      this.loggerService.error("Logout failed", err);
    });
  }

  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.loggerService.info("Password reset email sent", null, email);
    }, err => {
      alert('Something went wrong.');
      this.loggerService.error("Password reset failed", err);
    });
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser$;
  }

  getCurrentUserRoles(): Observable<string[]> {
    return this.currentUser$.pipe(
      switchMap(user => {
        if (user) {
          return this.getUserData(user.uid).pipe(
            map(userData => userData && userData.roles ? userData.roles : [])
          );
        } else {
          return of([]);
        }
      })
    );
  }

  getUserData(uid: string): Observable<any> {
    return this.firestore.collection('users').doc(uid).valueChanges();
  }

  updateUserModules(uid: string, newModules: string[]): Promise<void> {
    return this.firestore.collection('users').doc(uid).update({
      modules: firebase.firestore.FieldValue.arrayUnion(...newModules)
    });
  }
  
  getUserModules(uid: string): Observable<string[]> {
    return this.getUserData(uid).pipe(
      map(userData => userData && userData.modules ? userData.modules : [])
    );
  }

  isAdmin(): Observable<boolean> {
    return this.getCurrentUserRoles().pipe(
      map(roles => roles.includes('Admin'))
    );
  }

  isStudent(): Observable<boolean> {
    return this.getCurrentUserRoles().pipe(
      map(roles => roles.includes('Student'))
    );
  }

  isLecturer(): Observable<boolean> {
    return this.getCurrentUserRoles().pipe(
      map(roles => roles.includes('Lecturer'))
    );
  }

  sendResetPasswordEmail(email: string) {
    this.fireauth.sendPasswordResetEmail(email)
      .then(() => {
        console.log("Reset password email sent successfully");
        // You can handle success or redirect to another page
      })
      .catch((error) => {
        console.error("Error sending reset password email:", error);
        // Handle error here
      });
  }

  sendEmailForVerification(user: any){
    console.log("Sending verification email to:", user.email);

    user.sendEmailVerification().then( (res : any) => {
      alert("An email has been sent to you. Please verify email and reset password.")
    }, (err : any ) => {
      alert('Not able to send mail to your email.');
    })
  }
}

