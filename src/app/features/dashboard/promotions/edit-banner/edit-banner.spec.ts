import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBanner } from './edit-banner';

describe('EditBanner', () => {
  let component: EditBanner;
  let fixture: ComponentFixture<EditBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
