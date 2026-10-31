import { Component, inject } from '@angular/core';
import { Loading } from '../../services/loading';

@Component({
  imports: [],
  selector: 'app-spinner',
  styleUrl: './spinner.css',
  templateUrl: './spinner.html',
})
export class Spinner {
  loading = inject(Loading);
}
