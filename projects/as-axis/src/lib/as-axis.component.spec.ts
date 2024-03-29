import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsAxisComponent } from './as-axis.component';

describe('AsAxisComponent', () => {
  let component: AsAxisComponent;
  let fixture: ComponentFixture<AsAxisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsAxisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
