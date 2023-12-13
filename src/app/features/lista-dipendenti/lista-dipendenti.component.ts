import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef } from '@angular/core';
import { CardDipendenteComponent } from './features/card-dipendente/card-dipendente.component';
import { RouterLink } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { Dipendente } from './models/Dipendente.class';
import { DipendenteService } from './services/dipendente-service/dipendente.service';

@Component({
  selector: 'app-lista-dipendenti',
  standalone: true,
  imports: [CommonModule,
    CardDipendenteComponent,
    RouterLink,
    MatGridListModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule],
  templateUrl: './lista-dipendenti.component.html',
  styleUrl: './lista-dipendenti.component.scss',
  providers: [DipendenteService]
})
export class ListaDipendentiComponent {


  dipendenti: Array<Dipendente> = new Array<Dipendente>();
  dipendenteCorrente: Dipendente | undefined;

  constructor(private dipendenteService: DipendenteService,
              private readonly destroyRef: DestroyRef) { }


  ngOnInit(): void {
    this.dipendenteService.getDipendenti()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: arr => this.dipendenti = arr,
        error: err => console.log(err)
      });
  }

  aggiornaDipendenteCorrente(d: Dipendente): void {
    this.dipendenteCorrente = d;
  }

  elimina(id: number) {
    this.dipendenteService.deleteDipendente(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.dipendenteCorrente = undefined;
          this.dipendenti = this.dipendenti.filter(d => d.id_dipendente !== id);
        }
      });
  }

}

