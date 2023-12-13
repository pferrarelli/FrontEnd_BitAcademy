import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const tasksRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./lista-tasks.component').then(t => t.ListaTasksComponent),
        pathMatch: 'full',
    },
    { path: 'modifica/:id', loadComponent: () => import('./features/modifica-task/modifica-task.component').then(t => t.ModificaTaskComponent) },
    { path: 'new', loadComponent: () => import('./features/new-task/new-task.component').then(t => t.NewTaskComponent) }
];

@NgModule({
    imports: [RouterModule.forChild(tasksRoutes)],
    exports: [RouterModule]
})
export default class TasksRoutingModule {

}