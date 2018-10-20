import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


// LINK: http://jasonwatmore.com/post/2018/06/25/angular-6-communicating-between-components-with-observable-subject

@Injectable({ providedIn: 'root' })
export class MessageService {
  private subject = new Subject<any>();

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
