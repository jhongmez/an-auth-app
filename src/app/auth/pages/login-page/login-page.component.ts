import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
	
	private formBuilder = inject( FormBuilder );
	private authService = inject( AuthService );

	public myForm: FormGroup = this.formBuilder.group({
		email: 		['', [ Validators.required, Validators.email ]],
		password: 	['', [ Validators.required, Validators.minLength(6) ]],
	})

	login() {
		// console.log( this.myForm.value );
		const { email, password } = this.myForm.value;
		this.authService.login( email, password ).subscribe( success => {
			console.log(success);
		})
	}
	
}
