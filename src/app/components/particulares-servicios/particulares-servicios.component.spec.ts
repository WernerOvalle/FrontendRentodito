import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticularesServiciosComponent } from './particulares-servicios.component';

describe('ParticularesServiciosComponent', () => {
  let component: ParticularesServiciosComponent;
  let fixture: ComponentFixture<ParticularesServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticularesServiciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticularesServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
