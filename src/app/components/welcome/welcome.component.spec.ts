import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from 'src/app/services/user.service';

import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let el: HTMLElement;
  let userService: UserService;
  let userServiceStub: Partial<UserService>;
  
  beforeEach(async () => {
    userServiceStub = {
      isLoggedIn: true,
      user: { name: "Test User1"},
    }
    await TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      providers: [ { provide: UserService, useValue: userServiceStub } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    el = fixture.nativeElement.querySelector('.welcome');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should welcome the user', () => {
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).withContext('"Welcome ..."').toContain("Welcome");
    expect(content).withContext("expected name").toContain("Test User");
  });

  it("should welcome 'Lazar'", () => {
    userService.user.name = 'Lazar';
    fixture.detectChanges();
    expect(el.textContent).toContain('Lazar');
  });

  it('should request login if not logged in', () => {
    userService.isLoggedIn = false;
    fixture.detectChanges();
    
    const content = el.textContent;
    expect(content).withContext('not welcomed').not.toContain('Welcome');
    expect(content).withContext("'log in'").toMatch(/log in/i);
  });
});
