import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { QuoteService } from '../quote.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrls: ['./new-quote.component.css']
})
export class NewQuoteComponent implements OnInit {

  constructor(private quoteService: QuoteService, private alertService: AlertService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
  	this.quoteService.addQuote(form.value.content)
  		.subscribe(
  			() => this.alertService.success("Quote successfully created!", true)
  		);
  	form.reset();
  }

}
