import { FormControl } from "@angular/forms";

export interface DipendenteForm {
    nome: FormControl<string>;
    cognome: FormControl<string>;
}