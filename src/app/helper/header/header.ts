import { Component, inject } from '@angular/core';
import { Loading } from '../../services/loading';
import { ToastService } from '../../services/toast';
import { Auth } from '../../services/auth';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  imports: [RouterOutlet, Sidebar],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  loading = inject(Loading);
  toast = inject(ToastService);
  auth = inject(Auth);
}
