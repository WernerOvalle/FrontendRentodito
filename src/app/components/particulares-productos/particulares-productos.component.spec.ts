import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticularesProductosComponent } from './particulares-productos.component';

describe('ParticularesProductosComponent', () => {
  let component: ParticularesProductosComponent;
  let fixture: ComponentFixture<ParticularesProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticularesProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticularesProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
