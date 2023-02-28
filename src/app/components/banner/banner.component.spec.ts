import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';

import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let h1: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerComponent ],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;    
    h1 = fixture.nativeElement.querySelector('h1');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display original title', () => {
    expect(h1.textContent).toContain(component.bannerTitle)
  });

  it('should still see original title after comp.bannerTitle change', () => {
    const oldTitle = component.bannerTitle;
    component.bannerTitle = "Test Title";
    expect(h1.textContent).toContain(oldTitle);
  });

  it('should display updated title after detectChanges', () => {
    component.bannerTitle = "Test Title";
    fixture.detectChanges();
    expect(h1.textContent).toContain(component.bannerTitle);
  })

});
