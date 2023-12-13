import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task } from '../../models/Task.class';

@Component({
  selector: 'app-card-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-task.component.html',
  styleUrl: './card-task.component.scss'
})
export class CardTaskComponent {
  @Input() task: Task | undefined;
}
