import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRequest } from 'src/app/model/login.request';
import { HttpUtil } from 'src/app/util/http.util';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoginResponse } from 'src/app/model/login.response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  loginForm: FormGroup;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.maxLength(20)])
    });
  }

  ngOnDestroy(): void {
   
  }

  get username() { return this.loginForm.get('username'); }

  get password() { return this.loginForm.get('password'); }

  login() {
    console.log('loginForm', this.loginForm);
    
    console.log('username', this.username);
    console.log('password', this.password);
    
    let login = {} as LoginRequest;
    login.username = this.username.value;
    login.password = this.password.value;

    const url = `${HttpUtil.baseUrl}api/authentication/signin`;

    this.http.post(url, login).subscribe(
      (LoginResponse: LoginResponse) => {
        console.log('data', LoginResponse);
        this.authenticationService.saveToken(LoginResponse.accessToken);
        console.log('saved coockie', this.authenticationService.getToken());
      },
      error => {
        console.log('error', error);
      }
    );
  }

}
