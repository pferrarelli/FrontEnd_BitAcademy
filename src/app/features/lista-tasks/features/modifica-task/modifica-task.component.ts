import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskService } from '../../services/task-service/task.service';
import { Task } from '../../models/Task.class';
import { TaskForm } from '../../models/forms/Task.form';
import { Stato } from '../../../../enums/Stato.enum';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DipendenteService } from '../../../lista-dipendenti/services/dipendente-service/dipendente.service';
import { Dipendente } from '../../../lista-dipendenti/models/Dipendente.class';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-modifica-task',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule],
  templateUrl: './modifica-task.component.html',
  styleUrl: './modifica-task.component.scss',
  providers: [TaskService, DipendenteService]
})
export class ModificaTaskComponent {
  @Input({ required: true, transform: (value: string) => Number.parseInt(value) }) id!: number;
  task: Task | undefined;
  dipendenti: Array<Dipendente> = new Array<Dipendente>();

  stato: typeof Stato = Stato;

  form: FormGroup<TaskForm> = new FormGroup<TaskForm>({
    titolo: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    descrizione: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    dataFine: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    id_dipendente: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    dataInizio: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    stato: new FormControl<Stato>(Stato.CREATO, { nonNullable: true, validators: [Validators.required] })
  });

  constructor(private readonly taskService: TaskService,
    private readonly dipendenteService: DipendenteService,
    private readonly router: Router,
    private readonly destroyRef: DestroyRef) { }

  ngOnInit(): void {
    this.taskService.getTasks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: arr => {
          if (this.id) {
            this.task = arr.filter(t => t.id_task === this.id).at(0);
            this.form.controls.titolo.setValue(this.task?.titolo ?? '');
            this.form.controls.descrizione.setValue(this.task?.descrizione ?? '');
            this.form.controls.dataFine.setValue(this.task?.dataFine ?? '');
            this.form.controls.dataInizio?.setValue(this.task?.dataInizio ?? '');
            this.form.controls.stato?.setValue(this.task?.stato ?? Stato.CREATO);
            this.form.controls.id_dipendente.setValue(this.task?.dipendente.nome + " " + this.task?.dipendente.cognome ?? '');
          }
        }
    });

    this.dipendenteService.getDipendenti()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: arr => this.dipendenti = arr,
        error: err => console.log(err)
      });
  }

  back() {
    this.router.navigateByUrl('tasks');
  }

  modifica(): void {
    this.taskService.updateTaskParams(
      this.form.controls.titolo.value ?? '',
      this.form.controls.descrizione.value,
      this.form.controls.stato?.value ?? Stato.CREATO,
      this.form.controls.dataInizio?.value ?? '',
      this.form.controls.dataFine.value,
      Number.parseInt(this.form.controls.id_dipendente.value),
      this.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        complete: () => this.back()
      });
  }
}
