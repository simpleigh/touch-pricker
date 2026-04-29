/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/**
 * Jest setup file.
 *
 * Run by Jest `setupFilesAfterEnv`:
 *
 * > code to configure or set up the testing framework before each test file in
 * > the suite is executed
 */

/* eslint-disable import/no-unassigned-import */

import 'blob-polyfill';
import 'whatwg-fetch';

import matchers from './matchers';

expect.extend(matchers);
