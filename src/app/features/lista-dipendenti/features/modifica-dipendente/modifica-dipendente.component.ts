import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DipendenteService } from '../../services/dipendente-service/dipendente.service';
import { Dipendente } from '../../models/Dipendente.class';
import { DipendenteForm } from '../../models/forms/Dipendente.form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modifica-dipendente',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule],
  templateUrl: './modifica-dipendente.component.html',
  styleUrl: './modifica-dipendente.component.scss',
  providers: [DipendenteService]
})
export class ModificaDipendenteComponent implements OnInit {

  @Input({ required: true, transform: (value: string) => Number.parseInt(value) }) id!: number;
  dipendente: Dipendente | undefined;

  form: FormGroup<DipendenteForm> = new FormGroup<DipendenteForm>({
    nome: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    cognome: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });

  constructor(private readonly dipendenteService: DipendenteService,
    private readonly router: Router,
    private readonly destroyRef: DestroyRef) { }

  ngOnInit(): void {
    this.dipendenteService.getDipendenti()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: arr => {
          if (this.id) {
            this.dipendente = arr.filter(d => d.id_dipendente === this.id).at(0);
            this.form.controls.nome.setValue(this.dipendente?.nome ?? '');
            this.form.controls.cognome.setValue(this.dipendente?.cognome ?? '');
          }
        }
      });
  }

  back() {
    this.router.navigateByUrl('dipendenti');
  }

  modifica(): void {
    this.dipendenteService.updateDipendenteParams(
      this.form.controls.nome.value,
      this.form.controls.cognome.value,
      this.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        complete: () => this.back()
      });
  }

}
