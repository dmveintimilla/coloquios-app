import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication-service';
import { FirestoreService } from './firestore.service';
import { Estudiante } from '../models/estudiante';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { timeStamp } from 'console';
import { Coloquio } from '../models/coloquio';
// import { Asistencia } from '../models/asistencia';
// import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
// import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

import { EmailComposer } from 'capacitor-email-composer';
import { Buffer } from 'buffer';

import { take, lastValueFrom } from 'rxjs'
 

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  public asistencias: Asistencia[] = [];
  asistenciaSuscriber: Subscription;
  path = '/asistencia/';
  uid = '';
  estudiante: Estudiante;
  str: string;
  data: string;

  suscriberUserInfo: Subscription;

  datosAsistEst : string;

  stringEstud: string;

  csvContent:string = "data:text/csv;charset=utf-8,";

  asistencia: Asistencia = {
    text: '',
    id: '',
    estudiante : {
      uid: "",
      id: "",
      nombre: '',
      apellido: '',
      email: '',
    },
    fecha: new Date,
    valorNota: null,
  }
  functionUtil: any;

  

  constructor(
    public authService: AuthenticationService,
    public firestoreService: FirestoreService,
    public router: Router,
  ) {
    // this.initAsistencia(); public emailComposer: EmailComposer,
    this.authService.stateAuth().subscribe(res => {
      console.log(res);
      if (res !== null) {
        this.uid = res.uid;
        this.loadEstudiante();
        console.log('info estud')
      }
    });
  }

  ngOnInit() {
    // this.initAsistencia();

  }


  loadEstudiante() {
    console.log('getEstudianteInformacion');
    const path = 'Estudiante';
    this.firestoreService.getDoc<Estudiante>(path, this.uid).subscribe(res => {
      console.log('res de loadEstudiante', res);
      if (res !== undefined) {
        this.estudiante = res;
        console.log(res);
        // this.loadColoquio();
      }
    });
  }
  async getValue() {
    const items = await this
      .functionUtil
      .getItems('someValye');
  
    if (items && items.length != 0) {
      return 'items[0]';
    } 
  }

  

   async addAsistenciaEstudiante(texto: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const idEstudiante = texto.substring(0, texto.indexOf("|"));
      const idColoquio = texto.substring(texto.indexOf("|")+1);
      console.log('idEstudiante ->', idEstudiante);
      const pathColoquio = 'Coloquios/' + idColoquio;
      const pathEst = 'Estudiantes';

      this.asistenciaSuscriber = this.firestoreService.getDoc<Estudiante>(pathEst, idEstudiante)
        .pipe(take(1))
        .subscribe(async (res) => {
          if (!res) {
            return reject(new Error('No response.'));
          }

          console.log(res);
          this.estudiante = res;
          console.log('estudClick', this.estudiante);

          const asist = this.asistencia = {
            text: idColoquio,id: idEstudiante,
            estudiante: this.estudiante, fecha: new Date(),valorNota: 1,
          }

          if (asist.text !== idColoquio) {
            console.log('No coincide el nombre del coloquio con el ID');
            return reject(new Error('No coincide el nombre del coloquio con el ID'));
          }
          await this.firestoreService.createDoc(asist, `${pathColoquio}/asistencia`, idEstudiante);
          return resolve(this.estudiante.id+', '+this.estudiante.nombre+', '+this.estudiante.apellido);
        }); 
    });
  }

  verAsistencia(coloquio: Coloquio) {
    const pathColoquio = 'Coloquios/' + coloquio.id + '/asistencia';
    
    this.firestoreService.getCollection<Asistencia>(pathColoquio).subscribe(res => {
       console.log('res de verAsistencia',res);
      this.asistencias = res;
      console.log('this.asistencias ->',this.asistencias);

    });
  }
  

   async enviarCorreo( nombreColoquio: string) {
    const titulos = ` Username, ${ nombreColoquio } Points Grade <NumÃ©rico Puntos mÃ¡x.:1>, End-of-Line Indicator\n`;
    const lineas = this.asistencias.map((registro) => `#${ registro.estudiante.id },${ registro.valorNota }, #\n`);
    const csvArray = [titulos, ...lineas];
    const csvContent = csvArray.join('');
    
    console.log('arreglo temporal tiene: ', csvContent );

    const csvAsBase64 = Buffer.from(csvContent).toString('base64');

    await this.enviarMail(nombreColoquio, csvAsBase64);

  }

  

  async enviarMail( nombreColoquio: string, base64Content: any ) {
    EmailComposer.open({
      to: ['diegol_sheva7@hotmail.com'],
      // cc: 'erika@mustermann.de',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        {
          type: 'base64',
          path: base64Content,
          name: `${nombreColoquio}-asistencia.csv`
        }
      ],
      subject: `Notas de D2l coloquio ${ nombreColoquio } `,
      body: `Registro de notas - <strong>ColoquiosApp</strong>`,
      isHtml: true
    })
  }
}

export interface Asistencia {
  text: string;
  id: string;
  estudiante: Estudiante;
  fecha: Date;
  valorNota: number;
}




