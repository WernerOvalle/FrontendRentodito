import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoBusquedaComponent } from './listado-busqueda.component';

describe('ListadoBusquedaComponent', () => {
  let component: ListadoBusquedaComponent;
  let fixture: ComponentFixture<ListadoBusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoBusquedaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
