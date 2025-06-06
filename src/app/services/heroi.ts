import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// ajuste o caminho conforme necessário

@Injectable({
  providedIn: 'root',
})
export class Heroi {
  private apiUrl = 'https://localhost:5001/api/herois'; // ajuste porta se necessário

  constructor(private http: HttpClient) {}

  listar(): Observable<Heroi[]> {
    return this.http.get<Heroi[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Heroi> {
    return this.http.get<Heroi>(`${this.apiUrl}/${id}`);
  }

  salvar(heroi: Heroi): Observable<Heroi> {
    return this.http.post<Heroi>(this.apiUrl, heroi);
  }

  atualizar(id: number, heroi: Heroi): Observable<Heroi> {
    return this.http.put<Heroi>(`${this.apiUrl}/${id}`, heroi);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
