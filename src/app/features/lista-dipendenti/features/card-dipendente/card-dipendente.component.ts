import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Dipendente } from '../../models/Dipendente.class';

@Component({
  selector: 'app-card-dipendente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-dipendente.component.html',
  styleUrl: './card-dipendente.component.scss'
})
export class CardDipendenteComponent {
  @Input() dipendente: Dipendente | undefined;
}
