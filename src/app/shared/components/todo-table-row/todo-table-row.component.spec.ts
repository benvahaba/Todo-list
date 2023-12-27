import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoTableRowComponent } from './todo-table-row.component';

describe('TodoTableRowComponent', () => {
  let component: TodoTableRowComponent;
  let fixture: ComponentFixture<TodoTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoTableRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
