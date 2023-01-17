export interface Estudiante {
    uid: string;
    id: string;
    nombre: string;
    apellido: string;
    email: string;
}

export class Registro {

    public format: string;
    public text: string;
    public id: string;
    public estudiante: Estudiante;
    public fecha: Date;
    public valorNota: number;


    constructor( format: string, text: string  ) {

        this.format = format;
        this.text = text.substring(9);
        this.id = text.substring(0,8);
        this.estudiante = this.getValues();
        this.fecha = new Date();
        this.valorNota = 1;
    }

    getValues() {
        const estud: Estudiante = {
            uid: '00123',
            id: '00206037',
            nombre: 'Diego',
            apellido: 'Veintimilla',
            email: 'dveintimillap@estud.usfq.edu.ec',
        }
        return estud;
    }



}
