import { CommonModule } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DipendenteService } from '../../services/dipendente-service/dipendente.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DipendenteForm } from '../../models/forms/Dipendente.form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-dipendente',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule],
  templateUrl: './new-dipendente.component.html',
  styleUrl: './new-dipendente.component.scss',
  providers: [DipendenteService]
})
export class NewDipendenteComponent {

  form: FormGroup<DipendenteForm> = new FormGroup<DipendenteForm>({
    nome: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    cognome: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });

  constructor(private readonly dipendenteService: DipendenteService,
    private router: Router,
    private readonly destroyRef: DestroyRef) { }

  back() {
    this.router.navigateByUrl('dipendenti');
  }

  aggiungiDipendente(): void {
    this.dipendenteService.insertDipendenteParams(
      this.form.controls.nome.value,
      this.form.controls.cognome.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        complete: () => this.back()
      });
  }

}
