import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendasNewComponent } from './tiendas-new.component';

describe('TiendasNewComponent', () => {
  let component: TiendasNewComponent;
  let fixture: ComponentFixture<TiendasNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiendasNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiendasNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
