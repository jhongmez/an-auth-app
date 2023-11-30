import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environments';
import { AuthStatus, User } from '../interfaces';

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

	constructor() { }
	
	login( email: string, password: string): Observable<boolean> {
		return of(true)
	}
	
}
