import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionInfo } from './promotion-info';

describe('PromotionInfo', () => {
  let component: PromotionInfo;
  let fixture: ComponentFixture<PromotionInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
