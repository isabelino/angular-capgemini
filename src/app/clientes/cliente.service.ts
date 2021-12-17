import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of,Observable} from 'rxjs';
import { Cliente } from './cliente';
import {map} from 'rxjs/operators';
import { AuthService } from '../usuarios/auth.service';
import { Region } from './region';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  urlEndPoint:string = 'http://localhost:8087/api/clientes';

  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor( private http:HttpClient,private authService:AuthService) { }


   agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }


  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES);
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => response as Cliente[] )
    );
  }

  create(cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, { headers: this.agregarAuthorizationHeader() })
  }


  getCliente(id:number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() })
  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.agregarAuthorizationHeader() })
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() })
  }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones', { headers: this.agregarAuthorizationHeader() }).pipe(
      map( (response) => response as Region[] )
    );
  }
}
