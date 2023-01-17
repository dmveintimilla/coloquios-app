import { Asistencia } from "./asistencia";

export interface Coloquio {
    nombre: string;
    nameD2L: string;
    lugar: string;
    cantidad: number|null;
    fecha: Date;
    id: string;
    // asistencia: Asistencia[];
    estado: EstadoColoquio;
}

export type  EstadoColoquio ='proximo' | 'progreso' | 'finalizado' ;



