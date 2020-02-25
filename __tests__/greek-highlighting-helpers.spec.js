import { generateSelection, selectionsFromQuoteAndVerseObjects, getPrecedingText } from "../src/core/selections/selections";
import path from 'path';

describe('Selections Helpers', () => {
  it('should text getPrecedingText', () => {
    const string = `ὅτε δὲ ἡ χρηστότης καὶ ἡ φιλανθρωπία ἐπεφάνη τοῦ Σωτῆρος ἡμῶν, Θεοῦ,`;
    const subquote = `ὅτε ἡ χρηστότης καὶ ἡ φιλανθρωπία ἐπεφάνη τοῦ Σωτῆρος ἡμῶν, Θεοῦ`;
    const index = 0;
    const occurrence = 1;
    const precedingText = getPrecedingText(string, subquote, occurrence, index);
    expect(precedingText).toBe('');
  })
  it('should create the correct selections from a quote', () => {
    const { quote, verseObjects, occurrence, expected } = require(path.join(__dirname, './fixtures/highlighting/tit-3-13'));
    const selections = selectionsFromQuoteAndVerseObjects({ quote, verseObjects, occurrence });
    expect(selections).toMatchObject(expected);
  })
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
})