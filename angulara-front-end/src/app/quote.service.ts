import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/Rx";
import {Observable} from "rxjs";

import {AuthService} from './auth.service';

@Injectable()
export class QuoteService {
  constructor(private http: Http, private authService: AuthService) {
  }

  API = "http://localhost:8080";
  token = this.authService.getToken();

  addQuote(title: string, content: string, photo: any) {
    const input = new FormData();
    input.append('photo', photo);
    const options = { photo: input };
    const quoteContent = JSON.stringify({
      title: title,
      content: content
    });
    const body = {
      options: options,
      body: quoteContent
    };
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(`${this.API}/api/quote?token=${this.token}`, body,{headers: headers});
  }

  getQuotes(): Observable<any> {
    return this.http.get(`${this.API}/api/quotes`)
      .map(
        (response: Response) => {
          return response.json().quotes;
        }
      );
  }

  updateQuote(id: number, newContent: string) {
    const body = JSON.stringify({content: newContent});
    const headers = new Headers({"Content-Type": "application/json"});
    return this.http.put(`${this.API}/api/quote/${id}?token=${this.token}`, body, {headers: headers})
      .map(
        (response: Response) => response.json()
      );
  }

  deleteQuote(id: number) {
    return this.http.delete(`${this.API}/api/quote/${id}?token=${this.token}`);
  }

  likedQuote(quoteId: number) {
    const body = {
      quoteId: quoteId,
      isLike: true
    };
    const headers = new Headers({"Content-Type": "application/json"});
    return this.http.post(`${this.API}/api/like?token=${this.token}`, body, {headers: headers})
      .map(
        (resp: Response) => resp.json()
      );
  }
}
