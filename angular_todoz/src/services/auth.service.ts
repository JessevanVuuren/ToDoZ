import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpService } from "./http.service";
import { Response } from "src/models/response";
import { AuthResponse } from "src/models/AuthResponse";
import { FormControl } from "@angular/forms";


@Injectable({ providedIn: 'root' })
export class AuthService {

  is_logged_in = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpService) { }

  get_key(): string | undefined {
    return localStorage.getItem("todo_key") || undefined
  }

  validate_key(): Promise<boolean> {
    return new Promise(resolve => {
      if (!this.get_key()) resolve(false)
      this.http.getSingleData<Response>("/api/validate_token").subscribe(response => {
        if (response.message === "valid token") {
          this.is_logged_in.next(true)
          resolve(true)
        }
        resolve(false)
      })
    })
  }

  login(username: string | null, password: string | null): Observable<AuthResponse> {
    if (!username) username = ""
    if (!password) password = ""

    const log = [{ "key": "email", "value": username }, { "key": "password", "value": password }]
    return this.http.sendFormData<AuthResponse>("/api/login", log)
  }

  log_user_in(token: string) {
    this.saveKey(token)
    this.is_logged_in.next(true)
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    const log = [
      { "key": "name", "value": name },
      { "key": "email", "value": email },
      { "key": "password", "value": password },
      { "key": "password_confirmation", "value": password }
    ]
    return this.http.sendFormData<AuthResponse>("/api/register", log)
  }

  saveKey(token: string) {

    localStorage.setItem("todo_key", token)
  }
}


export const canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.is_logged_in.value) {
    router.navigate(["/"])
    return false
  }
  return true
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);