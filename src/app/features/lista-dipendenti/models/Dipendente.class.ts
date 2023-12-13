import { Task } from "../../lista-tasks/models/Task.class";

export class Dipendente {
    id_dipendente: number;
    nome: string;
    cognome: string;
    tasks: Array<Task>;

    constructor(id_dipendente: number,
                nome: string,
                cognome: string,
                tasks?: Array<Task>){
                    this.id_dipendente = id_dipendente;
                    this.nome = nome;
                    this.cognome = cognome;
                    if(tasks){
                        this.tasks = tasks;
                    }else{
                        this.tasks = new Array<Task>();
                    }
    }
}