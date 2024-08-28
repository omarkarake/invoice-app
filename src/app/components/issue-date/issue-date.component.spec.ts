import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueDateComponent } from './issue-date.component';

describe('IssueDateComponent', () => {
  let component: IssueDateComponent;
  let fixture: ComponentFixture<IssueDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssueDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
