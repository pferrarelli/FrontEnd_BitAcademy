import { Component, DestroyRef, OnInit } from '@angular/core';
import { TaskService } from '../../services/task-service/task.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { TaskForm } from '../../models/forms/Task.form';
import { DipendenteService } from '../../../lista-dipendenti/services/dipendente-service/dipendente.service';
import { Dipendente } from '../../../lista-dipendenti/models/Dipendente.class';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss',
  providers: [TaskService, DipendenteService]
})
export class NewTaskComponent implements OnInit{

  dipendenti: Array<Dipendente> = new Array<Dipendente>();

  form: FormGroup<TaskForm> = new FormGroup<TaskForm>({
    titolo: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    descrizione: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    dataFine: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    id_dipendente: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });

  constructor(private readonly taskService: TaskService,
    private readonly dipendenteService: DipendenteService,
    private router: Router,
    private readonly destroyRef: DestroyRef) { }


  ngOnInit(): void {
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

  aggiungiTask(): void {
    this.taskService.insertTaskParams(
      this.form.controls.titolo.value,
      this.form.controls.descrizione.value,
      this.form.controls.dataFine.value,
      Number.parseInt(this.form.controls.id_dipendente.value))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        complete: () => this.back()
      });
  }
}
