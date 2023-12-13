import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaDipendenteComponent } from './modifica-dipendente.component';

describe('ModificaDipendenteComponent', () => {
  let component: ModificaDipendenteComponent;
  let fixture: ComponentFixture<ModificaDipendenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaDipendenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificaDipendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
