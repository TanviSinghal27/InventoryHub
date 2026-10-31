import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  email = '';
  password = '';
  private auth = inject(Auth);
  private router = inject(Router);
  private toast = inject(ToastService);

  handleLogin() {
    if (this.email && this.password) {
      this.auth.login();
      this.toast.show('Logged in successfully!');
      this.router.navigate(['/dashboard']);
    } else {
      this.toast.show('Please fill out all ceredentials.', 'error');
    }
  }
}
