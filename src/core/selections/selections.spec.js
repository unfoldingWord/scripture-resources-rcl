import {
  generateSelection,
  getPrecedingText,
  normalizeString,
  selectionsFromQuoteAndString,
} from "./selections";

const normalizedText = (arr) => arr.map( obj => {
  return {
    ...obj,
    text: normalizeString(obj.text),
  }
})

function createStringMap(ref, rawString) {
  const stringMap = new Map();
  stringMap.set(ref, rawString);
  return stringMap;
}

describe("selectionsFromQuoteAndString", () => {
  const ref = '1:2';

  it("phrase at beginning", () => {
    const input = {
      quote: "ἐν ἀρχῇ ἦν",
      stringMap: createStringMap(ref,
          "ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν Θεόν, καὶ Θεὸς ἦν ὁ λόγος."),
      occurrence: 1,
    };
    const output = selectionsFromQuoteAndString(input).get(ref);
    const expected = [
      { text: "ἐν", occurrence: 1, occurrences: 1 },
      { text: "ἀρχῇ", occurrence: 1, occurrences: 1 },
      { text: "ἦν", occurrence: 1, occurrences: 3 },
    ];
    expect(output).toStrictEqual(normalizedText(expected));
  });

  it("all occurrences -1", () => {
    const input = {
      quote: "καὶ",
      stringMap: createStringMap(ref,
        "διὰ τοῦτο, ἐὰν ἔλθω, ὑπομνήσω αὐτοῦ τὰ ἔργα, ἃ ποιεῖ, λόγοις πονηροῖς φλυαρῶν ἡμᾶς; καὶ μὴ ἀρκούμενος ἐπὶ τούτοις, οὔτε αὐτὸς ἐπιδέχεται τοὺς ἀδελφοὺς, καὶ τοὺς βουλομένους κωλύει, καὶ ἐκ τῆς ἐκκλησίας ἐκβάλλει."),
      occurrence: -1,
    };
    const output = selectionsFromQuoteAndString(input).get(ref);
    const expected = [
      { text: "καὶ", occurrence: 1, occurrences: 3 },
      { text: "καὶ", occurrence: 2, occurrences: 3 },
      { text: "καὶ", occurrence: 3, occurrences: 3 },
    ];
    expect(output).toStrictEqual(normalizedText(expected));
  });

  it("skip -1 with ampersand", () => {
    const input = {
      quote: "καὶ & μὴ",
      stringMap: createStringMap(ref,
          "διὰ τοῦτο, ἐὰν ἔλθω, ὑπομνήσω αὐτοῦ τὰ ἔργα, ἃ ποιεῖ, λόγοις πονηροῖς φλυαρῶν ἡμᾶς; καὶ μὴ ἀρκούμενος ἐπὶ τούτοις, οὔτε αὐτὸς ἐπιδέχεται τοὺς ἀδελφοὺς, καὶ τοὺς βουλομένους κωλύει, καὶ ἐκ τῆς ἐκκλησίας ἐκβάλλει."),
      occurrence: -1,
    };
    const output = selectionsFromQuoteAndString(input).get(ref);
    const expected = [
      {
        "occurrence": 1,
        "occurrences": 3,
        "text": "καὶ"
      },
      {
        "occurrence": 1,
        "occurrences": 1,
        "text": "μὴ"
      }
    ];
    expect(output).toStrictEqual(normalizedText(expected));
  });

  it("ampersand: repeated word", () => {
    const input = {
      quote: "Θεοῦ & Θεοῦ",
      stringMap: createStringMap(ref,
        "Παῦλος, δοῦλος Θεοῦ, ἀπόστολος δὲ Ἰησοῦ Χριστοῦ, κατὰ πίστιν ἐκλεκτῶν Θεοῦ, καὶ ἐπίγνωσιν ἀληθείας, τῆς κατ’ εὐσέβειαν"),
      occurrence: 1,
    };
    const output = selectionsFromQuoteAndString(input).get(ref);
    const expected = [
      { text: "Θεοῦ", occurrence: 1, occurrences: 2 },
      { text: "Θεοῦ", occurrence: 2, occurrences: 2 },
    ];
    expect(output).toStrictEqual(normalizedText(expected));
  });

  it("ampersand: repeating ending word preceding first.", () => {
    const input = {
      quote: "Θεὸς & λόγος",
      stringMap: createStringMap(ref,
        "ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν Θεόν, καὶ Θεὸς ἦν ὁ λόγος."),
      occurrence: 1,
    };
    const output = selectionsFromQuoteAndString(input).get(ref);
    const expected = [
      { text: "Θεὸς", occurrence: 1, occurrences: 1 },
      { text: "λόγος", occurrence: 3, occurrences: 3 },
    ];
    expect(output).toStrictEqual(normalizedText(expected));
  });

  it("ampersand: repeating ending word preceding first.", () => {
    const input = {
      quote: "Θεὸς & λόγος",
      stringMap: createStringMap(ref,
        "ἐν ἀρχῇ ἦν ὁ λόγος, καὶ Θεὸς ὁ λόγος ἦν πρὸς τὸν Θεόν, καὶ Θεὸς ἦν ὁ λόγος."),
      occurrence: 2,
    };
    const output = selectionsFromQuoteAndString(input).get(ref);
    const expected = [
      { text: "Θεὸς", occurrence: 1, occurrences: 2 },
      { text: "λόγος", occurrence: 2, occurrences: 3 },
    ];
    expect(output).toStrictEqual(normalizedText(expected));
  });

  it("ampersand: simple, short", () => {
    const input = {
      quote: "ὁ λόγος & πρὸς",
      stringMap: createStringMap(ref,
        "ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν Θεόν, καὶ Θεὸς ἦν ὁ λόγος."),
      occurrence: 1,
    };
    const output = selectionsFromQuoteAndString(input).get(ref);
    const expected = [
      { text: "ὁ", occurrence: 1, occurrences: 3 },
      { text: "λόγος", occurrence: 1, occurrences: 3 },
      { text: "πρὸς", occurrence: 1, occurrences: 1 },
    ];
    expect(output).toStrictEqual(normalizedText(expected));
  });

  it("ampersand: first occurrence of repeated quote", () => {
    const input = {
      quote: "ὁ λόγος & Θεόν",
      stringMap: createStringMap(ref,
        "ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν Θεόν, καὶ Θεὸς ἦν ὁ λόγος."),
      occurrence: 1,
    };
    const output = selectionsFromQuoteAndString(input).get(ref);
    const expected = [
      { text: "ὁ", occurrence: 1, occurrences: 3 },
      { text: "λόγος", occurrence: 1, occurrences: 3 },
      { text: "Θεόν", occurrence: 1, occurrences: 1 },
    ];
    expect(output).toStrictEqual(normalizedText(expected));
  });

  it("ampersand: second occurrence of repeated quote", () => {
    const input = {
      quote: "ὁ λόγος & Θεόν",
      stringMap: createStringMap(ref,
        "ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν Θεόν, καὶ Θεὸς ἦν ὁ λόγος."),
      occurrence: 2,
    };
    const output = selectionsFromQuoteAndString(input).get(ref);
    const expected = [
      { text: "ὁ", occurrence: 1, occurrences: 3 },
      { text: "λόγος", occurrence: 1, occurrences: 3 },
      { text: "Θεόν", occurrence: 1, occurrences: 1 },
    ];
    expect(output).toStrictEqual(normalizedText(expected));
  });

  it("repeated phrase: first occurrence", () => {
    const input = {
      quote: "ὁ λόγος",
      stringMap: createStringMap(ref,
        "ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν Θεόν, καὶ Θεὸς ἦν ὁ λόγος."),
      occurrence: 1,
    };
    const output = selectionsFromQuoteAndString(input).get(ref);
    const expected = [
      { text: "ὁ", occurrence: 1, occurrences: 3 },
      { text: "λόγος", occurrence: 1, occurrences: 3 },
    ];
    expect(output).toStrictEqual(normalizedText(expected));
  });

  it("repeated phrase: second occurrence", () => {
    const input = {
      quote: "ὁ λόγος",
      stringMap: createStringMap(ref,
        "ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν Θεόν, καὶ Θεὸς ἦν ὁ λόγος."),
      occurrence: 2,
    };
    const output = selectionsFromQuoteAndString(input).get(ref);
    const expected = [
      { text: "ὁ", occurrence: 2, occurrences: 3 },
      { text: "λόγος", occurrence: 2, occurrences: 3 },
    ];
    expect(output).toStrictEqual(normalizedText(expected));
  });

  it("repeated phrase: last occurrence", () => {
    const input = {
      quote: "ὁ λόγος",
      stringMap: createStringMap(ref,
        "ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν Θεόν, καὶ Θεὸς ἦν ὁ λόγος."),
      occurrence: 3,
    };
    const output = selectionsFromQuoteAndString(input).get(ref);
    const expected = [
      { text: "ὁ", occurrence: 3, occurrences: 3 },
      { text: "λόγος", occurrence: 3, occurrences: 3 },
    ];
    expect(output).toStrictEqual(normalizedText(expected));
  });
});

describe("generateSelection", () => {
  it("should only contain one occurrence for the given text", () => {
    const precedingText = normalizeString(
      "ἐφανέρωσεν δὲ καιροῖς ἰδίοις τὸν λόγον αὐτοῦ ἐν κηρύγματι ὃ ἐπιστεύθην ἐγὼ κατ’ ἐπιταγὴν"
    );
    const entireText = normalizeString(
      "ἐφανέρωσεν δὲ καιροῖς ἰδίοις τὸν λόγον αὐτοῦ ἐν κηρύγματι ὃ ἐπιστεύθην ἐγὼ κατ’ ἐπιταγὴν τοῦ σωτῆρος ἡμῶν θεοῦ"
    );
    const selectedText = normalizeString(`τοῦ`);
    const expectedSelection = {
      text: selectedText,
      occurrence: 1,
      occurrences: 1,
    };
    const selection = generateSelection({
      selectedText,
      precedingText,
      entireText,
    });
    expect(selection).toMatchObject(expectedSelection);
  });

  it("should return second occurrence for the given text", () => {
    const selectedText = normalizeString("ἡ");
    const precedingText = normalizeString("ὅτε δὲ ἡ χρηστότης καὶ ");
    const entireText = normalizeString(
      "ὅτε δὲ ἡ χρηστότης καὶ ἡ φιλανθρωπία ἐπεφάνη τοῦ Σωτῆρος ἡμῶν, Θεοῦ,"
    );
    const expectedSelection = {
      text: selectedText,
      occurrence: 2,
      occurrences: 2,
    };
    const selection = generateSelection({
      selectedText,
      precedingText,
      entireText,
    });
    expect(selection).toMatchObject(expectedSelection);
  });
});

describe("getPrecedingText", () => {
  it("should be nothing", () => {
    const string = `ὅτε δὲ ἡ χρηστότης καὶ ἡ φιλανθρωπία ἐπεφάνη τοῦ Σωτῆρος ἡμῶν, Θεοῦ,`;
    const subquote = `ὅτε δὲ ἡ χρηστότης καὶ ἡ φιλανθρωπία ἐπεφάνη τοῦ Σωτῆρος ἡμῶν, Θεοῦ`;
    const index = 0;
    const occurrence = 1;
    const precedingText = getPrecedingText(string, subquote, occurrence, index);
    expect(precedingText).toBe("");
  });
  it("should be nothing", () => {
    const string = `ὅτε δὲ ἡ χρηστότης καὶ ἡ φιλανθρωπία ἐπεφάνη τοῦ Σωτῆρος ἡμῶν, Θεοῦ,`;
    const subquote = `ὅτε`;
    const index = 0;
    const occurrence = 1;
    const precedingText = getPrecedingText(string, subquote, occurrence, index);
    expect(precedingText).toBe("");
  });
});
