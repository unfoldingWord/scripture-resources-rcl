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
  it('should be be expected preceding text', () => {
    const string = `ὅτε δὲ ἡ χρηστότης καὶ ἡ φιλανθρωπία ἐπεφάνη τοῦ Σωτῆρος ἡμῶν, Θεοῦ,`;
    const subquote = `ἡ χρηστότης καὶ ἡ φιλανθρωπία ἐπεφάνη τοῦ Σωτῆρος ἡμῶν, Θεοῦ`;
    const index = 1;
    const occurrence = 1;
    const precedingText = getPrecedingText(string, subquote, occurrence, index);
    expect(precedingText).toBe('ὅτε δὲ ');
  });
})

describe('selectionHelpers.selectionsFromQuoteAndVerseObjects', () => {
  it('should create the correct selections from a quote', () => {
    const { quote, verseObjects, occurrence, expected } = require(path.join(__dirname, './fixtures/highlighting/tit-3-4-2'));
    const selections = selectionsFromQuoteAndVerseObjects({ quote, verseObjects, occurrence });
    expect(selections).toMatchObject(expected);
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
    const precedingText = "ὅτε δὲ";
    const subSelections = [{ text: 'ἡ', occurrence: 1, occurrences: 2 },
    { text: 'χρηστότης', occurrence: 1, occurrences: 1 },
    { text: 'καὶ', occurrence: 1, occurrences: 1 }];
    const entireText = "ὅτε δὲ ἡ χρηστότης καὶ ἡ φιλανθρωπία ἐπεφάνη τοῦ Σωτῆρος ἡμῶν, Θεοῦ,";
    const expectedSelection = {
      text: selectedText,
      occurrence: 2,
      occurrences: 2
    }
    const selection = generateSelection({ selectedText, precedingText, entireText, subSelections });
    expect(selection).toMatchObject(expectedSelection);
  })
})
