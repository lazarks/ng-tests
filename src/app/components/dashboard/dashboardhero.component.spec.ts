import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DashboardheroComponent } from './dashboardhero.component';
import { Hero } from 'src/app/services/hero';
import { first } from 'rxjs';

describe('DashboardheroComponent', () => {
  let component: DashboardheroComponent;
  let fixture: ComponentFixture<DashboardheroComponent>;
  let heroDe: DebugElement; 
  let heroEl: HTMLElement;
  let expectedHero: Hero | undefined;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardheroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardheroComponent);
    component = fixture.componentInstance;

    expectedHero = { id: 42, name: 'Test Name'};
    component.hero = expectedHero;

    fixture.detectChanges();

    heroDe = fixture.debugElement.query(By.css('.hero'));
    heroEl = heroDe.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display hero name in uppercase', () => {
    const expectedPipedName = expectedHero?.name.toUpperCase();
    expect(heroEl.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked (triggerEventHandler)', () => {
    let selectedHero: Hero | undefined;
    component.selected.pipe(first()).subscribe((hero: Hero) => selectedHero = hero);

    heroDe.triggerEventHandler('click', 'hero');
    expect(selectedHero).toBe(expectedHero);
  });

  it('should raise selected event when clicked (element.click)', () => {
    let selectedHero: Hero | undefined;
    component.selected.pipe(first()).subscribe((hero: Hero) => selectedHero = hero);
  
    heroEl.click();
    expect(selectedHero).toBe(expectedHero);
  });
});
