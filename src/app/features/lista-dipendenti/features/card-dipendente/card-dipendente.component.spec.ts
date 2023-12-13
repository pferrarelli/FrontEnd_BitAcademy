import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDipendenteComponent } from './card-dipendente.component';

describe('CardDipendenteComponent', () => {
  let component: CardDipendenteComponent;
  let fixture: ComponentFixture<CardDipendenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDipendenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDipendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
