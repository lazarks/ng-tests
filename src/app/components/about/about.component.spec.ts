import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { delay, interval, of, take, throwError } from 'rxjs';
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
  }));

  it('should run timeout callback with delay after call tick with millis', fakeAsync(() => {
    let called = false;
    setTimeout(() => {
      called = true
    }, 100);
    tick(100);
    expect(called).toBe(true);
  }));

  it('should run new macro task callback with delay after call tick with millis', fakeAsync(() => {
    function nestedTimer(cb: () => any): void {
      setTimeout(() => setTimeout(() => cb()));
    }
    const callback = jasmine.createSpy('callback');
    nestedTimer(callback);
    expect(callback).not.toHaveBeenCalled();
    tick(0);
    expect(callback).toHaveBeenCalled();
  }));

  it('should not run new macro task callback with delay after call tick with millis', fakeAsync(() => {
    function nestedTimer(cb: () => any): void {
      setTimeout(() => setTimeout(() => cb()));
    }
    
    const callback = jasmine.createSpy('callback');
    nestedTimer(callback);
    expect(callback).not.toHaveBeenCalled();
    tick(0, {processNewMacroTasksSynchronously: false});
    expect(callback).not.toHaveBeenCalled();
    tick(0);
    expect(callback).toHaveBeenCalled();
  }));

  it('should get Date diff correctly in fakeAsync', fakeAsync(() => {
    const start = Date.now();
    tick(100);
    const end = Date.now();
    expect(end - start).toBe(100);
  }));

  it('should get Date diff correctly in fakeAsync with rxjs scheduler', fakeAsync(() => {
    let result = '';
    of('hello').pipe(delay(1000)).subscribe(v => result = v);
    expect(result).toBe('');
    tick(1000);
    expect(result).toBe('hello');

    const start = new Date().getTime();
    let dateDiff = 0;
    interval(1000).pipe(take(2)).subscribe(() => dateDiff = (new Date().getTime() - start));

    tick(1000);
    expect(dateDiff).toBe(1000);
    tick(1000);
    expect(dateDiff).toBe(2000);
  }));

  it('should show quote after getQuote (fakeAsync)', fakeAsync(() => {
    fixture.detectChanges();  // ngOnInit()
    // expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
    tick();                   // flush the observable to get the quote
    fixture.detectChanges();  // update view

    expect(quoteEl.textContent).withContext('should show quote').toBe(testQuote);
    expect(errorMessage()).withContext('should not show error').toBeNull();
  }))

});

describe('use jasmine.clock()', () => {
  // config __zone_symbol__fakeAsyncPatchLock flag
  // before loading zone.js/testing in src/test.ts
  beforeEach(() => jasmine.clock().install());
  afterEach(() => jasmine.clock().uninstall());

  it('should auto enter fakeAsync', () => {
    let called = false;
    setTimeout(() => called = true, 100);
    jasmine.clock().tick(100);

    expect(called).toBe(true);
  })
});
