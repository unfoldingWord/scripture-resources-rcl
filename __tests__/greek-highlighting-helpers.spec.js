import { generateSelection, selectionsFromQuoteAndVerseObjects, getPrecedingText } from "../src/core/selections/selections";
import path from 'path';

describe('selectionHelpers.getPrecedingText', () => {
  it('should be nothing', () => {
    const string = `ὅτε δὲ ἡ χρηστότης καὶ ἡ φιλανθρωπία ἐπεφάνη τοῦ Σωτῆρος ἡμῶν, Θεοῦ,`;
    const subquote = `ὅτε δὲ ἡ χρηστότης καὶ ἡ φιλανθρωπία ἐπεφάνη τοῦ Σωτῆρος ἡμῶν, Θεοῦ`;
    const index = 0;
    const occurrence = 1;
    const precedingText = getPrecedingText(string, subquote, occurrence, index);
    expect(precedingText).toBe('');
  })
  it('should be nothing', () => {
    const string = `ὅτε δὲ ἡ χρηστότης καὶ ἡ φιλανθρωπία ἐπεφάνη τοῦ Σωτῆρος ἡμῶν, Θεοῦ,`;
    const subquote = `ὅτε`;
    const index = 0;
    const occurrence = 1;
    const precedingText = getPrecedingText(string, subquote, occurrence, index);
    expect(precedingText).toBe('');
  })
})

describe('selectionHelpers.selectionsFromQuoteAndVerseObjects Titus', () => {
  it('should have all words highlighted Titus 1:1', () => {
    generateTest('tit/1-1');
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

describe('selectionHelpers.generateSelection', () => {
  it('should only contain one occurrence for the given text', () => {
    const precedingText = "ἐφανέρωσεν δὲ καιροῖς ἰδίοις τὸν λόγον αὐτοῦ ἐν κηρύγματι ὃ ἐπιστεύθην ἐγὼ κατ’ ἐπιταγὴν";
    const entireText = "ἐφανέρωσεν δὲ καιροῖς ἰδίοις τὸν λόγον αὐτοῦ ἐν κηρύγματι ὃ ἐπιστεύθην ἐγὼ κατ’ ἐπιταγὴν τοῦ σωτῆρος ἡμῶν θεοῦ";
    const selectedText = `τοῦ`;
    const expectedSelection = {
      text: selectedText,
      occurrence: 1,
      occurrences: 1
    }
    const selection = generateSelection({ selectedText, precedingText, entireText });
    expect(selection).toMatchObject(expectedSelection);
  })

  it('should return second occurrence for the given text', () => {
    const selectedText = "ἡ";
    const precedingText = "ὅτε δὲ ἡ χρηστότης καὶ ";
    const entireText = "ὅτε δὲ ἡ χρηστότης καὶ ἡ φιλανθρωπία ἐπεφάνη τοῦ Σωτῆρος ἡμῶν, Θεοῦ,";
    const expectedSelection = {
      text: selectedText,
      occurrence: 2,
      occurrences: 2
    }
    const selection = generateSelection({ selectedText, precedingText, entireText });
    expect(selection).toMatchObject(expectedSelection);
  })
})


function generateTest(fileName) {
  const { quote, verseObjects, occurrence, expected } = require(path.join(__dirname, './fixtures/highlighting', fileName));
  const selections = selectionsFromQuoteAndVerseObjects({ quote, verseObjects, occurrence });
  expect(selections).toMatchObject(expected);
}