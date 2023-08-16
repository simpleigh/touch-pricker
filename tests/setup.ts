/* eslint-disable import/no-unassigned-import */
import 'blob-polyfill';
import 'whatwg-fetch';
/* eslint-enable */

import matchers from './matchers';

expect.extend(matchers);
