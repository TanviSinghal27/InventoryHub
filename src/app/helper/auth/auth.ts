import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';
import { RouterOutlet } from '@angular/router';
@Component({
  imports: [RouterOutlet],
  selector: 'app-auth',
  styleUrl: './auth.css',
  templateUrl: './auth.html',
})
export class AuthComponent {
  auth = inject(Auth);
}
