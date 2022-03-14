import { Observable, Subject } from 'rxjs';

export class StateObservable<S> extends Observable<S> {
  value: S;
  private __notifier = new Subject<S>();

  constructor(input$: Observable<S>, initialState: S) {
    super((subscriber) => {
      const subscription = this.__notifier.subscribe(subscriber);
      if (subscription && !subscription.closed) {
        subscriber.next(this.value);
      }
      return subscription;
    });

    this.value = initialState;
    input$.subscribe((value) => {
      if (value !== this.value) {
        this.value = value;
        this.__notifier.next(value);
      }
    });
  }
}
