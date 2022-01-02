import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavSheetComponent } from './fav-sheet.component';

describe('FavSheetComponent', () => {
  let component: FavSheetComponent;
  let fixture: ComponentFixture<FavSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
