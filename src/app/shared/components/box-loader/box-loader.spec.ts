import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxLoader } from './box-loader';

describe('BoxLoader', () => {
  let component: BoxLoader;
  let fixture: ComponentFixture<BoxLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
