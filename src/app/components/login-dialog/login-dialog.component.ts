import { Component, OnInit , Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FooterComponent } from '../footer/footer.component';
import { AbstractControl, FormGroup ,FormControl, FormGroupDirective, NgForm, Validators, PatternValidator, FormBuilder, Form} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CustomValidation } from 'src/app/utils/custom.validators';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit{

  constructor(public dialogRef: MatDialogRef<FooterComponent>, public formBuilder: FormBuilder) { }

  matcher = new MyErrorStateMatcher();
  pass1Visibility = true;
  pass2Visibility = true;
  passConfVisibility = true;


  //Custom-Validator ========================================================================
  loginForm: FormGroup;
  signinForm: FormGroup;

  private buildForms(){
   //Login Form
    this.loginForm = this.formBuilder.group({
      username: new FormControl('',[
        Validators.required
      ]),
      password: new FormControl('',[
        Validators.required
      ])
    });

    this.signinForm = this.formBuilder.group({
      username: new FormControl('',[
        Validators.required
      ]),
      password: new FormControl('',[
        Validators.required, 
        CustomValidation.patternValidator(/[0-9]/, {hasNumber: true}),
        CustomValidation.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
        CustomValidation.patternValidator(/[a-z]/, {hasSmallCase: true}),
        CustomValidation.patternValidator(/[!@#$%^&*()_+-=;':|,.<>/?]/, {hasSpecialCharacter: true}),
        Validators.minLength(8)
      ]),
      confirm: new FormControl('',[
        Validators.required
      ]),
      email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      match: CustomValidation.passwordMatchValidator
    });
  }
  //==============================================================================================

  ngOnInit(): void {
    this.buildForms();
  }

  onSubmit(): void {

  }

  onReset(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
