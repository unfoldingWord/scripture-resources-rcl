import { generateSelection, selectionsFromQuoteAndVerseObjects } from "../src/core/selections/selections";
import path from 'path';

describe('Selections Helpers', () => {
  it('should create the correct selections from a quote', () => {
    const { quote, verseObjects, occurrence, expected } = require(path.join(__dirname, './fixtures/highlighting/tit-1-9'));
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