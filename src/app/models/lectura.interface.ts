//para definir estructura del objeto
export interface RegistroLectura {
  id_lectura: string,
  id_medidor: string,
  anio: number,
  mes: number,
  lectura_kwh: number,
  observacion: string,
}
