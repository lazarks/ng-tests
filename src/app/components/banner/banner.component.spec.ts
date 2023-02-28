import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let h1: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    h1 = fixture.nativeElement.querySelector('h1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display original title', () => {
    expect(h1.textContent).toContain(component.bannerTitle)
  });
});
