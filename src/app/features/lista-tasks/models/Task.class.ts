import { Stato } from "../../../enums/Stato.enum";
import { Dipendente } from "../../lista-dipendenti/models/Dipendente.class";

export class Task {
    id_task: number;
    titolo: string;
    descrizione: string;
    stato: Stato;
    dataFine: string;
    dipendente: Dipendente
    dataInizio?: string;

    constructor(id_task: number,
        titolo: string,
        descrizione: string,
        stato: Stato,
        dataFine: string,
        dipendente: Dipendente,
        dataInizio?: string){

            this.id_task = id_task;
            this.titolo = titolo;
            this.descrizione = descrizione;
            this.stato = stato;
            this.dataFine = dataFine;
            this.dipendente = dipendente;
            if(dataInizio){
                this.dataInizio = dataInizio;
            }else{
                this.dataInizio = '';
            }
    }
}