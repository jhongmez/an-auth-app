import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
	
	private formBuilder = inject( FormBuilder );

	public myForm: FormGroup = this.formBuilder.group({
		email: 		['', [ Validators.required, Validators.email ]],
		password: 	['', [ Validators.required, Validators.minLength(6) ]],
	})

	login() {
		console.log( this.myForm.value );
	}
	
}
