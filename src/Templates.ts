/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import create from './_templates/create.dot';

import TemplateContext from './TemplateContext';

/**
 * Container for templates
 *
 * Dictionary of template functions that map data to a string
 */
// tslint:disable-next-line:variable-name
const Templates: {
    [index: string]: (data: TemplateContext) => string,
} = {
    'create': create,
};

export default Templates;
