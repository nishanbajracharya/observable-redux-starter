import { Observable } from 'rxjs/Observable';

export const fetchAppName = () =>
  Observable.of({
    name: 'React Redux Observable',
  });
