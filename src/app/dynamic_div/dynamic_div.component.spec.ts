import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasedynamicComponent } from './basedynamic.component';

describe('BasedynamicComponent', () => {
  let component: BasedynamicComponent;
  let fixture: ComponentFixture<BasedynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
