import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from 'src/app/services/hero';

@Component({
  selector: 'app-dashboardhero',
  templateUrl: './dashboardhero.component.html',
  styleUrls: ['./dashboardhero.component.scss']
})
export class DashboardheroComponent {
  @Input() hero!: Hero;
  @Output() selected = new EventEmitter<Hero>();
  click() { this.selected.emit(this.hero); }
}
