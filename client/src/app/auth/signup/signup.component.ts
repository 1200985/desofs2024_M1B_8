import { AuthState } from './../../store/auth/auth.reducer';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as AuthActions from '../../store/auth/auth.actions';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import { Observable } from 'rxjs';
import * as PasswordValidators from '../../../utils//validators/password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  emailPattern = '^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$';
  showPassword = false;
  showPasswordConfirm = false;
  
  authState: Observable<AuthState>;


  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(this.emailPattern)]),
      passwordGroup: new FormGroup({
        newPassword: new FormControl(null, [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(128),
          PasswordValidators.passwordStrengthCheckValidator
        ]),
        newPasswordConfirm: new FormControl(null, [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(128)
        ]),
      }, PasswordValidators.passwordMatchCheckValidator.bind(this))
    });

    this.authState = this.store.select('auth');
  }

  togglePasswordVisibility(show: boolean): void {
    const passwordInput = document.getElementById('newPassword') as HTMLInputElement;
    passwordInput.type = show ? 'text' : 'password';
    this.showPassword = show;
  }

  togglePasswordConfirmVisibility(show: boolean): void {
    const passwordInput = document.getElementById('newPasswordConfirm') as HTMLInputElement;
    passwordInput.type = show ? 'text' : 'password';
    this.showPasswordConfirm = show;
  }

  onSubmitted() {
    this.store.dispatch(new AuthActions.SignUp(
      {
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.passwordGroup.newPassword,
        passwordRepeat: this.signUpForm.value.passwordGroup.newPasswordConfirm
      }));
  }
}
