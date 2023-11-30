import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';

import { environment } from 'src/environments/environments';
import { AuthStatus, LoginResponse, User } from '../interfaces';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private readonly baseUrl: string = environment.baseURL;
	
	// * Inject
	private http = inject( HttpClient );
	
	// * Definimos variables privadas para obtener señales (Los parentesis son cuando inicia por primer vez)
	private _currentUser = signal<User | null>( null );
	private _authStatus = signal<AuthStatus>( AuthStatus.checking );
	
	// * Exponer a otros componentes pero NO PODRA CAMBIAR EL ESTADO DE AUTENTICACION
	public currentUser = computed( () => this._currentUser() );
	public AuthStatus = computed( () => this._authStatus() );

	constructor() { }
	
	login( email: string, password: string): Observable<boolean> {
		
		const url = `${ this.baseUrl }/auth/login`;
		const body = {
			email,
			password
		}

		return this.http.post<LoginResponse>(url, body)
			.pipe(
				// * Tap: Efecto secundario DONDE TODO SALGA BIEN
				tap( ({user, token}) => {
					this._currentUser.set( user );
					this._authStatus.set( AuthStatus.authenticated );
					localStorage.setItem('token', token)
					console.log({ user, token });
				}),
				map( () => true )
				// TODO: ERRORES
			);
	}
	
}
