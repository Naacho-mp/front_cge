import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface Boleta {
  id_boleta: string;
  id_cliente: string;
  anio: number;
  mes: number;
  kwh_total: number;
  tarifa_base: number;
  cargos: number;
  iva: number;
  total_pagar: number;
  estado: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiServiceBoleta {

  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  // Listar las boletas
  listarBoletas(id_cliente?: string, anio?: number, mes?: number) {
    const params: any = {};
    if (id_cliente) params.id_cliente = id_cliente;
    if (anio) params.anio = anio;
    if (mes) params.mes = mes;

    return this.http.get<Boleta[]>(`${this.apiUrl}/boletas`, { params });
  }

  // Generar boleta con estado
  generarBoleta(id_cliente: string, anio: number, mes: number, estado: string): Observable<Boleta> {
    const params = new HttpParams()
      .set('id_cliente', id_cliente)
      .set('anio', anio.toString())
      .set('mes', mes.toString())
      .set('estado', estado);

    return this.http.post<Boleta>(`${this.apiUrl}/boletas`, null, { params });
  }

  // Descargar boleta en PDF
  descargarBoletaPDF(id_cliente: string, anio: number, mes: number): Observable<Blob> {
    return this.http.get(
      `${this.apiUrl}/boletas/boleta/${id_cliente}/${anio}/${mes}/pdf`,
      { responseType: 'blob' }
    );
  }
}
