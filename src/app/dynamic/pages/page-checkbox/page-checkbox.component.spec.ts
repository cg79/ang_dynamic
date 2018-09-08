import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCheckboxComponent } from './page-checkbox.component';

describe('PageCheckboxComponent', () => {
  let component: PageCheckboxComponent;
  let fixture: ComponentFixture<PageCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
