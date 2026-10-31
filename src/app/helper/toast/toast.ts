import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast';

@Component({
  imports: [],
  selector: 'app-toast',
  styleUrl: './toast.css',
  templateUrl: './toast.html',
})
export class Toast {
  toast = inject(ToastService);
}
