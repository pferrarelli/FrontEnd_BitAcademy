import { CommonModule } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';
import { TaskService } from './services/task-service/task.service';
import { Task } from './models/Task.class';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardTaskComponent } from './features/card-task/card-task.component';

@Component({
  selector: 'app-lista-tasks',
  standalone: true,
  imports: [CommonModule,
    CardTaskComponent,
    RouterLink,
    MatGridListModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule],
  templateUrl: './lista-tasks.component.html',
  styleUrl: './lista-tasks.component.scss',
  providers: [TaskService]
})
export class ListaTasksComponent {

  tasks: Array<Task> = new Array<Task>();
  taskCorrente: Task | undefined;

  constructor(private taskService: TaskService,
              private readonly destroyRef: DestroyRef) { }


  ngOnInit(): void {
    this.taskService.getTasks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: arr => this.tasks = arr,
        error: err => console.log(err)
      });
  }

  aggiornaTaskCorrente(t: Task): void {
    this.taskCorrente = t;
  }

  elimina(id: number) {
    this.taskService.deleteTask(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.taskCorrente = undefined;
          this.tasks = this.tasks.filter(t => t.id_task !== id);
        }
      });
  }
}
