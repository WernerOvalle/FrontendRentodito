import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Help6Component } from './help6.component';

describe('Help6Component', () => {
  let component: Help6Component;
  let fixture: ComponentFixture<Help6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Help6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Help6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
