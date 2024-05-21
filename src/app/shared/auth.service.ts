import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/compat/auth"
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map, of, switchMap } from 'rxjs';
import firebase from 'firebase/compat/app';  


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  currentUser$!: Observable<any>;

  constructor(private fireauth: AngularFireAuth, private router: Router, private firestore: AngularFirestore) { 

    // Subscribe to the authentication state changes
    this.currentUser$ = this.fireauth.authState;

  }


  
  
  login(email:string, password:string){

    this.fireauth.signInWithEmailAndPassword(email, password).then( res => {
      localStorage.setItem('token', 'true');

      if(res.user?.emailVerified == true){
        this.router.navigate(['dashboard']);
      }else{
        alert("Verification email has been sent to you. Please verify email.")
        this.sendEmailForVerification(res.user);
      }

    }, err => {
        alert(err.message);
        this.router.navigate(['/login']);
    })
  }

  register(name: string, surname: string, ref_number: string, email: string, password: string, roles: string[], modules: string[]) {
    
    //let emailWithDomain: string = ref_number + '@tuks.co.za';
  
    this.fireauth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const userData = {
          name,
          surname,
          email: email,
          ref_number,
          roles,
          modules
        };
        
        // Store additional user data in Firestore if needed
        // For example, if you want to store the user data in Firestore
        // this.firestore.collection('users').doc(res.user?.uid).set(userData);

        console.log("User Data:", userData);

        // Store additional user data in Firestore
        this.firestore.collection('users').doc(res.user?.uid).set(userData);
        
        this.sendEmailForVerification(res.user);
        

        const userEmail = res.user?.email;
        if (userEmail) {
          this.sendResetPasswordEmail(userEmail);
        } else {
          console.error("User email is undefined");
          // Handle this case as per your application's logic
        }

        // this.forgotPassword(emailWithDomain);

        alert("Registration is Successful");
      })
      .catch((err) => {
        alert(err.message);
        this.router.navigate(['/register']);
      });
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

  // register(email: string, password: string) {
  //   console.log('email in service: ' , email)
  //   console.log('password in service: ' , password)

  //   this.fireauth.createUserWithEmailAndPassword(email, password)
  //       .then(res => {
  //           alert("Registration successful.");
  //           this.router.navigate(['/login']);
  //       })
  //       .catch(err => {
  //           // Handle specific errors
  //           if (err.code === 'auth/missing-email') {
  //               alert("Please provide an email address.");
  //           } else {
  //               alert("Registration failed: " + err.message);
  //           }
  //           this.router.navigate(['/register']);
  //       });
  // }

  logout(){
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  forgotPassword(email: string){
    this.fireauth.sendPasswordResetEmail(email).then( () => {
    }, err => {
      alert('Something went wrong.');
    })
  }


  ////////////////////////////data methods/////////////////////
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
  

}
