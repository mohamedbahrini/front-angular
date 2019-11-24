import { Component, OnInit, OnDestroy } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit, OnDestroy {
  receivedMessages: string[] = [];
  private topicSubscription: Subscription;
  constructor(private rxStompService: RxStompService) { }

  ngOnInit() {
    this.topicSubscription = this.rxStompService.watch('/topic/messaging').subscribe((message: Message) => {
      this.receivedMessages.push(message.body);
    });
  }

  onSendMessage() {
    const message = `Message generated at ${new Date}`;
    this.rxStompService.publish({ destination: '/topic/messaging', body: message });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }
}
