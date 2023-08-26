/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import type { Stage } from '../rows';
import Uint4Table from './Uint4Table';

/**
 * Download a table from a remote location.
 * @param stage  Stage on which the table should be valid
 * @param url    URL from which to download the table
 * @throws if the data cannot be downloaded or it is the incorrect size
 */
const downloadTable = async (
    stage: Stage,
    url: string,
): Promise<Uint4Table> => {
    const response = await fetch(url);
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const data = new Uint8Array(buffer);
    return new Uint4Table(stage, data);
};

export default downloadTable;
