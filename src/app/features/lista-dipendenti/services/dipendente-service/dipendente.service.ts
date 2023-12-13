import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment'; 
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Dipendente } from '../../models/Dipendente.class';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DipendenteService {

  private dipendenteURI = environment.apiUrl + 'dipendente/'

  constructor(private http: HttpClient) { }

  //GET
  getDipendenti(): Observable<Dipendente[]> {
    return this.http.get<Dipendente[]>(this.dipendenteURI + 'selectdipendenti');
  }

  //POST
  insertDipendenteObj(d: Dipendente): Observable<void> {
    return this.http.post<void>(this.dipendenteURI + 'insertobj', d, httpOptions);
  }

  insertDipendenteParams(nome: string, cognome: string): Observable<void> {
    const params = new HttpParams().appendAll({nome, cognome});
    return this.http.post<void>(
      this.dipendenteURI + 'insertparams', {}, {...httpOptions, params});
  }

  //PUT
  updateDipendenteObj(d: Dipendente): Observable<void> {
    return this.http.put<void>(this.dipendenteURI + 'updateobj', d,  httpOptions);
  }

  updateDipendenteParams(nome: string, cognome: string, id_dipendente: number): Observable<void> {
    const params = new HttpParams().appendAll({nome, cognome, id_dipendente});
    return this.http.put<void>(this.dipendenteURI + 'updateparams', {}, {...httpOptions, params});
  }
  
  //DELETE
  deleteDipendente(id: number): Observable<void> {
    return this.http.delete<void>(this.dipendenteURI + 'delete?id=' + id);
  }
}
