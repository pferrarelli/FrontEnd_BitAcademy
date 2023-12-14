import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment'; 
import { Observable } from 'rxjs';
import { Task } from '../../models/Task.class';
import { Stato } from '../../../../enums/Stato.enum';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskURI = environment.apiUrl + 'task/';

  constructor(private http: HttpClient) { }

  //GET
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskURI + 'selecttasks');
  }

  //POST
  insertTaskObj(t: Task): Observable<void> {
    return this.http.post<void>(this.taskURI + 'insertobj', t, httpOptions);
  }

  insertTaskParams(titolo: string, descrizione: string, dataFine: string, id_dipendente: number): Observable<void> {
    const params = new HttpParams().appendAll({ titolo, descrizione, dataFine, id_dipendente });
    return this.http.post<void>(
      this.taskURI + 'insertparams', {}, { ...httpOptions, params });
  }

  //PUT
  updateTaskObj(t: Task): Observable<void> {
    return this.http.put<void>(this.taskURI + 'updateobj', t, httpOptions);
  }

  updateTaskParams(titolo: string,
      descrizione: string,
      stato: Stato,
      dataInizio: string,
      dataFine: string,
      id_dipendente: number,
      id_task: number): Observable<void> {

    const params = new HttpParams().appendAll({ titolo, descrizione, stato, dataInizio, dataFine, id_dipendente, id_task });
    return this.http.put<void>(this.taskURI + 'updateparams', {}, {...httpOptions, params});
  }

  //DELETE
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(this.taskURI + 'delete?id=' + id, httpOptions);
  }
}
