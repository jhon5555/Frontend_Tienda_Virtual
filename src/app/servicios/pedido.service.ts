import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloPedido } from '../modelos/pedido.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  url=  'http://localhost:3000';
  token: String = '';
  constructor(private http: HttpClient,private seguridadServicio: SeguridadService) {
     this.token = this.seguridadServicio.ObtenerToken();
  }

  ObtenerPedidos(): Observable<ModeloPedido[]>{
    return this.http.get<ModeloPedido[]>(`${this.url}/pedidos`);
  }
  ObtenerPedidosPorId(id: string): Observable<ModeloPedido>{
    return this.http.get<ModeloPedido>(`${this.url}/pedidos/${id}`);

  }
  CrearPedido(pedido: ModeloPedido): Observable<ModeloPedido>{
    return this.http.post<ModeloPedido>(`${this.url}/pedidos`, pedido,{
      headers: new HttpHeaders({
       'Authorization': `Bearer ${this.token}`
      })
    })
  }
  ActualizarPedido(pedido: ModeloPedido): Observable<ModeloPedido> {
    return this.http.put<ModeloPedido>(`${this.url}/pedidos/${pedido.id}`, pedido,{
      headers: new HttpHeaders({
       'Authorization': ` Bearer ${this.token}`
      })
    })
  }
  EliminarPedido(id: string): Observable<any> {
    return this.http.delete(`${this.url}/pedidos/${id}`,{
      headers: new HttpHeaders({
       'Authorizacion': ` Bearer ${this.token}`
      })
    })
  }
}
