import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  DoCheck,
  Directive,
  ElementRef,
  Renderer2,
  AfterViewInit
} from '@angular/core';

import {Quote} from '../quote.interface';
import {QuoteService} from '../quote.service';
import {AuthService} from '../auth.service';
import {NotificationsService} from '../notifications/notifications.service';
import {Notification} from '../notifications/notifications.model';

@Directive({
  selector: '[appLike]'
})

export class LikeDirective implements AfterViewInit {

  @Input() quoteLikes: Quote[];
  userID;

  constructor(public el: ElementRef,
              public renderer: Renderer2) {
  }

  ngAfterViewInit() {
    this.userID = JSON.parse(localStorage.getItem('user'));
    this.quoteLikes.forEach(item => {
      if (item['id_user'] === this.userID.id) {
        this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
      }
    });
  }

}

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

  constructor(private quoteService: QuoteService,
              private authService: AuthService,
              private notificationsService: NotificationsService,
              public renderer: Renderer2) {
  }

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
          this.notificationsService.add(new Notification('success', 'Quote successfully deleted!'));
        }
      );
  }

  onLikeQuote(event) {
    this.quoteService.likedQuote(this.quote.id)
      .subscribe(
        data => {
          if (data.like === 'save') {
            this.quote.count_like = data.count_like;
            this.renderer.setStyle(event.target, 'color', 'red');
          } else {
            this.quote.count_like = data.count_like === 0 ? null : data.count_like;
            this.renderer.setStyle(event.target, 'color', '#333');
          }
        }
      );
  }

}
