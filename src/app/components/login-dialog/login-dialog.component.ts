import { Component, OnInit , Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FooterComponent } from '../footer/footer.component';
import { AbstractControl, FormGroup ,FormControl, FormGroupDirective, NgForm, Validators, PatternValidator, FormBuilder, Form} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CustomValidation } from 'src/app/utils/custom.validators';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { favGame } from 'src/app/models/favGame';

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

  constructor(
    public dialogRef: MatDialogRef<FooterComponent>, 
    public formBuilder: FormBuilder, 
    private authService: AuthService, 
    private userService: UserService
  ) { }

  //Password Eye
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
      email: new FormControl('',[
        Validators.required,
        Validators.email
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
        Validators.email,
      ]),
      match: CustomValidation.passwordMatchValidator
    });
  }

  //Database stuff===============================================================================
  user: User = new User();
  UID: string;

  guardarUsuario(): void{
    this.userService.create(this.user,this.UID).then(() =>{
      console.log('Usuario creado y guardado.');
    })
  }

  nuevoGoogle(uid: string, email: any): void{
    this.user = new User();
    this.user.uid = uid;
    this.user.email = email;
    //this.user.favorites = this.game
    console.log(this.user);
  }

  nuevoUsuario(uid: string): void{
    this.user = new User();
    this.user.uid = uid;
    this.user.email = this.signinForm.get('email')?.value
    //this.user.favorites = this.game
    console.log(this.user);
  }

  //==============================================================================================

  onRegister(): void {

    const email = this.signinForm.get('email')?.value
    const password = this.signinForm.get('password')?.value

    this.authService.register(email, password).then(res => {
      if (res?.user?.uid != undefined){
        this.UID = res?.user?.uid;
        this.nuevoUsuario(res?.user?.uid);
        this.guardarUsuario();
      }
      
      console.log(`Se registró: ${res}`);
    })
  }

  onLogin(): void {
    const email = this.loginForm.get('email')?.value
    const password = this.loginForm.get('password')?.value
    console.log(`${email} | ${password}`)
    this.authService.login(email, password).then(res => {
      console.log(`Sesión Iniciada: ${res}`);
    })
  }

  googleLogin(): void {
    this.authService.loginWithGoogle().then(res => {
      console.log(`Sesión Iniciada con Google: ${res}`);
      this.authService.getUserLogged().subscribe(res =>{
        if (res?.uid != undefined){
          this.UID = res?.uid;
          this.nuevoGoogle(res?.uid, res?.email);
          this.guardarUsuario();
          
        }
      })
      this.onClose();
    });
  }

  onReset(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }


  ngOnInit(): void {
    this.buildForms();
  }
}
