import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Help5Component } from './help5.component';

describe('Help5Component', () => {
  let component: Help5Component;
  let fixture: ComponentFixture<Help5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Help5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Help5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
