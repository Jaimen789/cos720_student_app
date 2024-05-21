import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.getCurrentUserRoles().pipe(
      map(roles => {
        if (roles) {
          // Check if the route has data specifying required roles
          const requiredRoles = route.data['roles'] as string[];
          if (requiredRoles && requiredRoles.length > 0) {
            // Check if the user has any of the required roles
            const hasRequiredRole = roles.some(role => requiredRoles.includes(role));
            if (!hasRequiredRole) {
              // User doesn't have required role, redirect to unauthorized page or handle accordingly
              this.router.navigate(['/login']);
              return false;
            }
          }
          // User is authenticated and has necessary role, allow access
          return true;
        } else {
          // User is not authenticated, redirect to login page
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
