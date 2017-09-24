// RxJS5 recommends that we only import operators that are used
// to keep the bundle size small.
// These only have to imported once for the whole app.

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/distinctUntilChanged';
