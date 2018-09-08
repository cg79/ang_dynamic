import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRadioComponent } from './list-radio.component';

describe('ListRadioComponent', () => {
  let component: ListRadioComponent;
  let fixture: ComponentFixture<ListRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
