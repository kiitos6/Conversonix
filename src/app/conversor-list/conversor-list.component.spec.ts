import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConversorListComponent } from './conversor-list.component';

describe('ConversorListComponent', () => {
  let component: ConversorListComponent;
  let fixture: ComponentFixture<ConversorListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
