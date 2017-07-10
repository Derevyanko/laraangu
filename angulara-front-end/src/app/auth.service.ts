import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/Rx";

@Injectable()
export class AuthService {
	constructor(private http: Http) {}

	API = "http://localhost:8080";

	signup(username: string, email: string, password: string) {
		return this.http.post(`${this.API}/api/users`,
			{name: username, email: email, password: password},
			{headers: new Headers({"X-Requested-With": "XMLHttpRequest"})});
	}

	signin(email: string, password: string) {
		return this.http.post(`${this.API}/api/user/signin`,
			{email: email, password: password},
			{headers: new Headers({"X-Requested-With": "XMLHttpRequest"})})
			.map(
				(response: Response) => {
					const token = response.json().token;
					const user = response.json().user;
					const base64Url = token.split(".")[1];
					const base64 = base64Url.replace("-", "+").replace("_", "/");
					return {
						user: user,
						token: token,
						decoded: JSON.parse(window.atob(base64))
					};
				}
			)
			.do(
				tokenData => {
					localStorage.setItem("token", tokenData.token);
					localStorage.setItem("user", JSON.stringify(tokenData.user));
				}
			);
	}

	logout() {
        localStorage.removeItem("token");
    	localStorage.removeItem("user");
    }

	getToken() {
		return localStorage.getItem("token");
	}

	getUser() {
		const token = this.getToken();
		return this.http.get(`${this.API}/api/get_auth_user?token=${token}`);
	}
}
