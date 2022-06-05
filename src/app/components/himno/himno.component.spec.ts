import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HimnoComponent } from './himno.component';

describe('HimnoComponent', () => {
  let component: HimnoComponent;
  let fixture: ComponentFixture<HimnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HimnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HimnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
