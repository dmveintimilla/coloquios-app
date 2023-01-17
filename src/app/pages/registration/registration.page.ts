import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { Estudiante } from '../../models/estudiante';
import { User } from '../../models/user';
import { FirestoreService } from '../../services/firestore.service';
import { AuthenticationService } from '../../services/authentication-service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  validations_form: FormGroup;

  estudiante: Estudiante = {
    uid: "",
    id: "",
    nombre: '',
    apellido: '',
    email: '',
  }

  user: User = {
    uid: '',
    email: '',
    emailVerified: null ,
  }
  
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public firestoreService: FirestoreService,
    public formBuilder: FormBuilder,
    public reactiveFormsModule: ReactiveFormsModule,
  ) {}

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      nombre: new FormControl('',  Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])),
      apellido: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.pattern('^[a-zA-Z0-9._%+-]+\.@estud.usfq.edu.ec$')
        Validators.minLength(3),
      ])),
      id: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('(00[0-9]{6})$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
    });

  }

  validation_messages = {
    'nombre': [
      { type: 'required', message: 'Ingrese su nombre.' },
      { type: 'minlength', message: 'Su nombre debe tener al menos 3 caracteres.' },
    ],
    'apellido': [
      { type: 'required', message: 'Ingrese su apellido.' }
    ],
    'email': [
      { type: 'required', message: 'Ingrese su email.' },
      { type: 'pattern', message: 'Por favor, ingrese un email valido.' }
    ],
    'id': [
      { type: 'required', message: 'Ingrese su código banner.' },
      { type: 'pattern', message: 'Su código banner debe empezar con 00 y debe tener solo números.' }
    ],
    'password': [
      { type: 'required', message: 'Ingrese su contraseña.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 5 caracteres.' },
    ]
  };

  onSubmit(values){
    console.log('valor mail ' + this.validations_form.get("email").value);
    this.user.email = this.validations_form.get("email").value;
    
    this.estudiante.id = this.validations_form.get("id").value;
    this.estudiante.nombre = this.validations_form.get("nombre").value;
    this.estudiante.apellido = this.validations_form.get("apellido").value;
    this.estudiante.email = this.validations_form.get("email").value;

    
    console.log(values);
    this.router.navigate(["/login"]);
  }

  async signUp(email, password) {

    
    this.authService
      .RegisterUser(email.value, password.value)
      .then(async (res) => {
        const uid = await this.authService.getUid();
        this.user.uid = uid;
        this.guardarUser();
        this.estudiante.uid = uid;
        this.guardarEstudiante();
        console.log(uid);
        this.authService.SendVerificationMail();
      })
      .catch((error) => {
        window.alert(error.message);
      });
     
  }

  async guardarUser() {
    const path = 'Users';
    this.firestoreService.createDoc(this.user, path, this.user.uid).then( res => {
        console.log('guardado con exito');
    }).catch( error => {
      console.log(error);
    });
  }

  async guardarEstudiante() {
    const path = 'Estudiantes';
    this.firestoreService.createDoc(this.estudiante, path, this.user.uid).then( res => {
        console.log('guardado con exito');
    }).catch( error => {
      console.log(error);
    });
  }
}
