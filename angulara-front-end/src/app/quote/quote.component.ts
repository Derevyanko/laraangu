import {Component, OnInit, Input, Output, EventEmitter, DoCheck} from '@angular/core';

import { Quote } from '../quote.interface';
import { QuoteService } from '../quote.service';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit, DoCheck {
  @Input() quote: Quote;
  @Output() quoteDeleted = new EventEmitter<Quote>();
  editing = false;
  editValue = "";
  isLogin = false;

  constructor(private quoteService: QuoteService, private authService: AuthService) { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.isLogin = this.authService.isLogin();
  }

  onEdit() {
  	this.editing = true;
  	this.editValue = this.quote.content;
  }

  onUpdate() {
  	this.quoteService.updateQuote(this.quote.id, this.editValue)
  		.subscribe(
  			(quote: Quote) => {
  				this.quote.content = this.editValue;
  				this.editValue = "";
  			}
  		);
  	this.editing = false;
  }

  onCancel() {
  	this.editValue = "";
  	this.editing = false;
  }

  onDelete() {
  	this.quoteService.deleteQuote(this.quote.id)
  		.subscribe(
  			() => {
  				this.quoteDeleted.emit(this.quote);
  				console.log("Quote Delete")
  			}
  		);
  }

  onLikeQuote() {
    this.quoteService.likedQuote(this.quote.id)
      .subscribe(
        data => {
          console.log(data);
          if (data.like === 'save') {
            console.log('red');
            this.quote.count_like = data.count_like;
          } else {
            console.log('white');
            this.quote.count_like = data.count_like === 0 ? null : data.count_like;
          }
        }
      );
  }

}
