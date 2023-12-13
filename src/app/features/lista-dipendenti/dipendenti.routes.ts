import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const dipendentiRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./lista-dipendenti.component').then(d => d.ListaDipendentiComponent),
        pathMatch: 'full',
    },
    { path: 'modifica/:id', loadComponent: () => import('./features/modifica-dipendente/modifica-dipendente.component').then(d => d.ModificaDipendenteComponent) },
    { path: 'new', loadComponent: () => import('./features/new-dipendente/new-dipendente.component').then(d => d.NewDipendenteComponent) }
];

@NgModule({
    imports: [RouterModule.forChild(dipendentiRoutes)],
    exports: [RouterModule]
})
export default class DipendentiRoutingModule {

}