import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePromotion } from './create-promotion';

describe('CreatePromotion', () => {
  let component: CreatePromotion;
  let fixture: ComponentFixture<CreatePromotion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePromotion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePromotion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
