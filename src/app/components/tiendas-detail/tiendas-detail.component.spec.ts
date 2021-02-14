import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendasDetailComponent } from './tiendas-detail.component';

describe('TiendasDetailComponent', () => {
  let component: TiendasDetailComponent;
  let fixture: ComponentFixture<TiendasDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiendasDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiendasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
