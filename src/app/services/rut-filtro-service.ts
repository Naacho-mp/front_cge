import {computed, Injectable, signal} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RutFiltroService {
  private readonly STORAGE_KEY = 'filtro-rut-v1';

  private _rut = signal<string>(this.load() ?? '');

  readonly rut = computed(() => this._rut());

  setRut(value: string) {
    this._rut.set(value);
    localStorage.setItem(this.STORAGE_KEY, value);
  }

  reset() {
    this._rut.set('');
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
