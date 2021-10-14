import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarvehiculoComponent } from './editarvehiculo.component';

describe('EditarvehiculoComponent', () => {
  let component: EditarvehiculoComponent;
  let fixture: ComponentFixture<EditarvehiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarvehiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarvehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
