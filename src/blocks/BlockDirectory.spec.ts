/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

// tslint:disable:max-classes-per-file

import { Row, Stage } from '../rows';
import { createTestRow } from '../testFunctions.spec';
import AbstractBlock from './AbstractBlock';
import BlockDirectory from './BlockDirectory';
import RandomAccessContainer from './RandomAccessContainer';
import SerialContainer from './SerialContainer';

describe('BlockDirectory class', () => {

    class Lead extends AbstractBlock {
        protected calculate(): void { /* NOOP */ }
        public getLast(): Row { return this.initialRow; }
        public accept(): this { return this; }
        public estimateRows(): number { return 0; }
    }

    class Course extends SerialContainer<Lead> {
        protected createBlock(initialRow: Row, index: number): Lead {
            return new Lead(initialRow, { container: this, index });
        }
        protected getDefaultLength(initialRow: Row): number {
            return initialRow.length - 1;
        }
        protected readonly minLength: number = 1;
        protected readonly maxLength: number = 40;
    }

    class Touch extends RandomAccessContainer<Course> { }

    const testRow = createTestRow('', Stage.Triples);

    let directory: BlockDirectory;

    let touch: Touch;

    beforeEach(() => {
        directory = new BlockDirectory();
        touch = new Touch(testRow);
        touch.insertBlock(1, new Course(testRow));
        touch.insertBlock(2, new Course(testRow));
    });

    it('can compute the ownership of a lead', () => {
        const lead = touch.getBlock(1).getBlock(3);
        expect(BlockDirectory.getIndices(lead)).toEqual([1, 3]);
    });

    it('can compute the ownership of a course', () => {
        const course = touch.getBlock(1);
        expect(BlockDirectory.getIndices(course)).toEqual([1]);
    });

    it('starts out with no leads in the index', () => {
        for (let courseIndex = 1; courseIndex <= 2; courseIndex += 1) {
            for (let leadIndex = 1; leadIndex <= 6; leadIndex += 1) {
                const lead = touch.getBlock(courseIndex).getBlock(leadIndex);
                expect(directory.contains(lead)).toBe(false);
            }
        }
    });

    it('starts out with no courses in the index', () => {
        for (let courseIndex = 1; courseIndex <= 2; courseIndex += 1) {
            const course = touch.getBlock(courseIndex);
            expect(directory.contains(course)).toBe(false);
        }
    });

    it('can store a lead', () => {
        const lead = touch.getBlock(1).getBlock(3);
        directory.add(lead);
        expect(directory.contains(lead)).toBe(true);
    });

    it('can store a lead and retrieve with indices', () => {
        const lead = touch.getBlock(1).getBlock(3);
        directory.add(lead);
        expect(directory.contains(1, 3)).toBe(true);
    });

    it('can store with indices', () => {
        directory.add(1, 3);
        expect(directory.contains(1, 3)).toBe(true);
    });

    it('can store with indices and retrieve with the lead', () => {
        const lead = touch.getBlock(1).getBlock(3);
        directory.add(1, 3);
        expect(directory.contains(lead)).toBe(true);
    });

    it('copes when adding the same lead multiple times', () => {
        directory.add(1, 3);
        directory.add(1, 3);
        expect(directory.contains(1, 3)).toBe(true);
        expect(directory.contains(1)).toBe(true);
    });

    it('copes when adding multiple leads from the same course', () => {
        directory.add(1, 3);
        directory.add(1, 4);
        expect(directory.contains(1, 3)).toBe(true);
        expect(directory.contains(1, 4)).toBe(true);
        expect(directory.contains(1)).toBe(true);
    });

    it('returns this when storing a lead', () => {
        expect(directory.add(touch.getBlock(1).getBlock(3))).toBe(directory);
    });

    it('returns this when storing with indices', () => {
        expect(directory.add(1, 3)).toBe(directory);
    });

    it('stores the parent course as well as its lead', () => {
        directory.add(touch.getBlock(1).getBlock(3));
        expect(directory.contains(touch.getBlock(1))).toBe(true);
    });

    it('stores the course as well as its lead by indices', () => {
        directory.add(1, 3);
        expect(directory.contains(1)).toBe(true);
    });

    it('knows when it is empty', () => {
        expect(directory.empty).toBe(true);
    });

    it('knows when it is not empty', () => {
        directory.add(touch.getBlock(1).getBlock(3));
        expect(directory.empty).toBe(false);
    });

    it('throws an exception for an unowned block', () => {
        expect(() => { BlockDirectory.getIndices(touch); }).toThrow();
        expect(() => { directory.add(touch); }).toThrow();
        expect(() => { directory.contains(touch); }).toThrow();
    });

    it('throws an exception for an incorrectly owned block', () => {
        const course = new Course(testRow, { container: touch, index: 0 });
        expect(() => { BlockDirectory.getIndices(course); }).toThrow();
        expect(() => { directory.add(course); }).toThrow();
        expect(() => { directory.contains(course); }).toThrow();
    });

});
