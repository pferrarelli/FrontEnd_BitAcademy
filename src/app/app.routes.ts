import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: 'dipendenti',
        loadChildren: async () => import('./features/lista-dipendenti/dipendenti.routes')
    },
    {path: 'tasks',
        loadChildren: async () => import ('./features/lista-tasks/task.routes')
    },
    {path: '**', redirectTo:''}
]