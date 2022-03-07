import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddNewEntryComponent } from './dialog-add-new-entry.component';

describe('DialogAddNewEntryComponent', () => {
  let component: DialogAddNewEntryComponent;
  let fixture: ComponentFixture<DialogAddNewEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddNewEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddNewEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
