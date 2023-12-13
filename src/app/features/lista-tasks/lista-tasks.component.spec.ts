import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTasksComponent } from './lista-tasks.component';

describe('ListaTasksComponent', () => {
  let component: ListaTasksComponent;
  let fixture: ComponentFixture<ListaTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
