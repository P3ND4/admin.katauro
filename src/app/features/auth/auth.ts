import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorLogService } from '../../shared/services/errors/error.log.service';
import { AuthService } from '../../shared/services/auth/auth-service';
import { Router } from '@angular/router';
import { BoxLoader } from "../../shared/components/box-loader/box-loader";

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, CommonModule, BoxLoader],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {
  passForm: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder, private errorServ: ErrorLogService, private auth: AuthService, private router: Router) {
    this.passForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit() {
    this.loading = true
    this.auth.login(this.passForm.value.password).add(() => {
      this.loading = false
      if (this.auth.isLogged()) {
        this.router.navigate(['/dashboard/products']);
      }
    })
  }
}

