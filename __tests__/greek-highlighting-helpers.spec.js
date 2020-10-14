import { generateSelection, selectionsFromQuoteAndVerseObjects, getPrecedingText } from "../src/core/selections/selections";
import path from 'path';
import usfmJS from 'usfm-js';
import ugnt_tit from './fixtures/books/ugnt_tit.js';
import ugnt_3jn from './fixtures/books/ugnt_3jn.js';

describe('selectionHelpers.selectionsFromQuoteAndVerseObjects Titus', () => {
    it('should have all words highlighted Titus 1:1', () => {
        generateTest('tit/1-1');
    })
    it('should have all words highlighted Titus 1:1 (2)', () => {
        generateTest('tit/1-1-2');
    })
    it('should have all words highlighted Titus 1:1 (3)', () => {
        generateTest('tit/1-1-3');
    })
    it('should have all words highlighted Titus 1:2', () => {
        generateTest('tit/1-2');
    })
    it('should have all words highlighted Titus 1:3', () => {
        generateTest('tit/1-3');
    })
    it('should have all words highlighted Titus 1:4', () => {
        generateTest('tit/1-4');
    })
    it('should have all words highlighted Titus 1:5', () => {
        generateTest('tit/1-5');
    })
    it('should have all words highlighted Titus 1:9', () => {
        generateTest('tit/1-9');
    })
    it('should have all words highlighted Titus 1:12', () => {
        generateTest('tit/1-12');
    })
    it('should have all words highlighted Titus 2:2', () => {
        generateTest('tit/2-2');
    })
    it('should have all words highlighted Titus 2:10', () => {
        generateTest('tit/2-10');
    })
    it('should have all words highlighted Titus 2:13', () => {
        generateTest('tit/2-13');
    })
    it('should have all words highlighted Titus 3:4', () => {
        generateTest('tit/3-4');
    })
    it('should have all words highlighted Titus 3:4 (2)', () => {
        generateTest('tit/3-4-2');
    })
    it('should have all words highlighted Titus 3:6', () => {
        generateTest('tit/3-6');
    })
    it('should have all words highlighted Titus 3:6 (2)', () => {
        generateTest('tit/3-6-2');
    })
    it('should have all words highlighted Titus 3:7', () => {
        generateTest('tit/3-7');
    })
    it('should have all words highlighted Titus 3:13', () => {
        generateTest('tit/3-13');
    })
})

describe('selectionHelpers.selectionsFromQuoteAndVerseObjects 3JN', () => {
    it('should have all words highlighted 3JN 1:10', () => {
        generateTest('3jn/1-10');
    })
    it('should have all words highlighted 3JN 1:11', () => {
        generateTest('3jn/1-11');
    })
    it('should have all words highlighted 3JN 1:11 (2)', () => {
        generateTest('3jn/1-11-2');
    })
    it('should have all words highlighted 3JN 1:12', () => {
        generateTest('3jn/1-12');
    })
    it('should have all words highlighted 3JN 1:14', () => {
        generateTest('3jn/1-14');
    })
    it('should have all words highlighted 3JN 1:15', () => {
        generateTest('3jn/1-15');
    })
})

const UGNT_TIT = usfmJS.toJSON(ugnt_tit);
const UGNT_3JN = usfmJS.toJSON(ugnt_3jn);
const books = {
    'tit': UGNT_TIT,
    '3jn': UGNT_3JN
};

function generateTest(fileName) {
    const [bookName, reference] = fileName.split('/');
    const [chapter, verse] = reference.split('-');
    const { quote, occurrence, expected } = require(path.join(__dirname, './fixtures/highlighting', fileName));
    const { verseObjects } = books[bookName].chapters[chapter][verse];
    const selections = selectionsFromQuoteAndVerseObjects({ quote, verseObjects, occurrence });
    expect(selections).toMatchObject(expected);
}