import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RegisterService } from '../services/register.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private registerService: RegisterService, private router: Router) {}

  canActivate = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
    if (!this.registerService.IsRegister) {
      this.router.navigateByUrl('/');
    }
    return of(this.registerService.IsRegister);
  }
}
