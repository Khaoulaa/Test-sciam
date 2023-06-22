import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInformationComponent } from './item-information.component';

describe('ItemInformationComponent', () => {
  let component: ItemInformationComponent;
  let fixture: ComponentFixture<ItemInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
