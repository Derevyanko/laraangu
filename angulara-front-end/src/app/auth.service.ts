import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthService {
	constructor(private http: Http) {}

	API = "http://localhost:8080";

	signup(username: string, email: string, password: string) {
		return this.http.post(`${this.API}/api/users`,
			{name: username, email: email, password: password},
			{headers: new Headers({"X-Requested-With": "XMLHttpRequest"})});
	}
}
