import { FormControl } from "@angular/forms";
import { Stato } from "../../../../enums/Stato.enum";

export interface TaskForm {
    titolo: FormControl<string>;
    descrizione: FormControl<string>;
    dataFine: FormControl<string>;
    id_dipendente: FormControl<string>;
    dataInizio?: FormControl<string>;
    stato?: FormControl<Stato>;
}