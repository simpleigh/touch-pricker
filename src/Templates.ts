/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/* tslint:disable:max-line-length */

import AbstractSix_mbd from './_templates/AbstractSix/mbd.dot';
import AbstractSix_siril from './_templates/AbstractSix/siril.dot';
import Course_html from './_templates/Course/html.dot';
import Course_mbd from './_templates/Course/mbd.dot';
import Course_siril from './_templates/Course/siril.dot';
import Course_text from './_templates/Course/text.dot';
import create from './_templates/create.dot';
import Music_AbstractScheme_text from './_templates/Music/AbstractScheme/text.dot';
import Music_Pattern_text from './_templates/Music/Pattern/text.dot';
import Music_PatternGroup_text from './_templates/Music/PatternGroup/text.dot';
import Pricker_Mbd_css from './_templates/Pricker/Mbd/css.dot';
import Pricker_Mbd_html from './_templates/Pricker/Mbd/html.dot';
import Start_siril from './_templates/Start/siril.dot';
import Start_text from './_templates/Start/text.dot';
import Touch_select from './_templates/Touch/select.dot';
import Touch_siril from './_templates/Touch/siril.dot';
import Touch_text from './_templates/Touch/text.dot';

/* tslint:enable:max-line-length */

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
    'AbstractSix.mbd': AbstractSix_mbd,
    'AbstractSix.siril': AbstractSix_siril,
    'Course.html': Course_html,
    'Course.mbd': Course_mbd,
    'Course.siril': Course_siril,
    'Course.text': Course_text,
    'Music.AbstractScheme.text': Music_AbstractScheme_text,
    'Music.Pattern.text': Music_Pattern_text,
    'Music.PatternGroup.text': Music_PatternGroup_text,
    'Pricker.Mbd.css': Pricker_Mbd_css,
    'Pricker.Mbd.html': Pricker_Mbd_html,
    'Start.siril': Start_siril,
    'Start.text': Start_text,
    'Touch.select': Touch_select,
    'Touch.siril': Touch_siril,
    'Touch.text': Touch_text,
    'create': create,
};

export default Templates;
