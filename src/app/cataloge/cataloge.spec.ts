import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cataloge } from './cataloge';

describe('Cataloge', () => {
  let component: Cataloge;
  let fixture: ComponentFixture<Cataloge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cataloge],
    }).compileComponents();

    fixture = TestBed.createComponent(Cataloge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
