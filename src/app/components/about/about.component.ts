import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of, startWith } from 'rxjs';
import { TwainService } from 'src/app/services/twain.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  errorMessage!: string;
  quote!: Observable<string>;

  constructor(private twainService: TwainService) { }

  ngOnInit(): void {
    this.getQuote();
  }

  getQuote() {
    this.errorMessage = '';
    this.quote = this.twainService.getQuote().pipe(
      startWith('...'),
      catchError((err: any) => {
        setTimeout(() => this.errorMessage = err.message || err.toString());
        return of('...');
      })
    )
  }

}
