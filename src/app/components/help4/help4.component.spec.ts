import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Help4Component } from './help4.component';

describe('Help4Component', () => {
  let component: Help4Component;
  let fixture: ComponentFixture<Help4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Help4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Help4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
