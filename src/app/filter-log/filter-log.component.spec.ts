import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterLogComponent } from './filter-log.component';

describe('FilterLogComponent', () => {
  let component: FilterLogComponent;
  let fixture: ComponentFixture<FilterLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
