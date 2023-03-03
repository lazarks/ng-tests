import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { TwainService } from 'src/app/services/twain.service';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let testQuote: string;
  let getQuoteSpy: any;
  let quoteEl: HTMLElement;

  const errorMessage = () => {
    const el = fixture.nativeElement.querySelector('.error');
    return el ? el.textContent : null;
  }

  beforeEach(async () => {
    testQuote = 'Test Quote';
    const twainService = jasmine.createSpyObj('TwainService', ['getQuote']);
    getQuoteSpy = twainService.getQuote.and.returnValue(of(testQuote));

    await TestBed.configureTestingModule({
      declarations: [ AboutComponent ],
      providers: [{provide: TwainService, useValue: twainService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    quoteEl = fixture.nativeElement.querySelector('.twain');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show quote after component initialized', () => {
    fixture.detectChanges();
    expect(quoteEl.textContent).toBe(testQuote);
    expect(getQuoteSpy.calls.any()).withContext('getQuote called').toBe(true);
  });

  it('should display error when TwainService fails', fakeAsync(() => {
    getQuoteSpy.and.returnValue(throwError(() => new Error('TwainService test failure')));
    
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(errorMessage()).withContext('should display error').toMatch(/test failure/, );
    expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
  }))


});
