import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoBoletas } from './listado-boletas';

describe('ListadoBoletas', () => {
  let component: ListadoBoletas;
  let fixture: ComponentFixture<ListadoBoletas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoBoletas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoBoletas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
