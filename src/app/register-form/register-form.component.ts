import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Users } from '../user';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  roles = ['administrator, owner, client']
  
  constructor() { }
}
