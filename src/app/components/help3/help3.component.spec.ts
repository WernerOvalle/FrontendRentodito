import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Help3Component } from './help3.component';

describe('Help3Component', () => {
  let component: Help3Component;
  let fixture: ComponentFixture<Help3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Help3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Help3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
