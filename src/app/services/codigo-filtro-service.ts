import {computed, Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CodigoFiltroService {

  private readonly STORAGE_KEY = 'filtro-codigo-v1';

  private _codigo = signal<string>(this.load() ?? '');

  readonly codigo = computed(() => this._codigo());

  setCodigo(value: string) {
    this._codigo.set(value);
    localStorage.setItem(this.STORAGE_KEY, value);
  }

  reset() {
    this._codigo.set('');
    localStorage.removeItem(this.STORAGE_KEY);
  }

  private load(): string | null {
    try {
      return localStorage.getItem(this.STORAGE_KEY);
    } catch {
      return null;
    }
  }
}
