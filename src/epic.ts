import { Observable } from 'rxjs';
import { StateObservable } from './StateObservable';

export interface Action<T = any> {
  type: T
}

export declare interface Epic<
  Input extends Action = any,
  Output extends Input = Input,
  State = any,
  Dependencies = any
> {
  (
    action$: Observable<Input>,
    state$: StateObservable<State>,
    dependencies: Dependencies
  ): Observable<Output>;
}