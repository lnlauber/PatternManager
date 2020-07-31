/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { contributorsComponent } from './contributors.component';

describe('contributorsComponent', () => {
  let component: contributorsComponent;
  let fixture: ComponentFixture<contributorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ contributorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(contributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
