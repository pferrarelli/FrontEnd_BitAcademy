import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDipendenteComponent } from './new-dipendente.component';

describe('NewDipendenteComponent', () => {
  let component: NewDipendenteComponent;
  let fixture: ComponentFixture<NewDipendenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDipendenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewDipendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
