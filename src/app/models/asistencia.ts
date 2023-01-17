import { Subscription } from "rxjs";
import { FirestoreService } from "../services/firestore.service";
import { Coloquio } from "./coloquio";
import { Estudiante } from "./estudiante";
import { Injectable } from "@angular/core";

// export interface Asistencia {
//     id: string;
//     estudiante: Estudiante;
//     fecha: Date;
//     valorNota: number;
// }


@Injectable()
export class Asistencia {

    public text: string;
    public id: string;
    public estudiante: Estudiante;
    public fecha: Date;
    public valorNota: number;

    public estudianteSuscriber: Subscription;


    constructor( text: string, estudiante: Estudiante,
        public firestoreService: FirestoreService,  
         ) {

        this.text = text;
        this.id = text.substring(1,7);
        this.estudiante = estudiante;
        this.fecha = new Date();
        this.valorNota = 1;
    }


    getUserInfo() {
        console.log('getUserInfo');
        const path = 'Clientes';
        const suscriberUserInfo = this.firestoreService.getDoc<Estudiante>(path, this.estudiante.id).subscribe( res => {
               if (res !== undefined) {
                 this.estudiante  = res;
               }
        });
    }

    // getValues( idBanner: string) {

    //     const estud: Estudiante = {
    //         uid: this.estudiante.uid,
    //         id: this.estudiante.id,
    //         nombre: this.estudiante.nombre,
    //         apellido: this.estudiante.apellido,
    //         email: this.estudiante.email,
    //     }
    //     return estud;
    // }



}