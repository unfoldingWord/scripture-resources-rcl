import { areSelected } from "./helpers";

describe("selectionsFromQuoteAndString", () => {
  it("should select text with greek's elision marks", () => {
    const ref = "12:25"
    const selected = areSelected({
      ref,
      words: [
        {
          "strong": "G25960",
          "lemma": "κατά",
          "morph": "Gr,P,,,,,G,,,",
          "occurrence": "1",
          "occurrences": "2",
          "content": "καθ’"
        }
      ],
      selections: new Map([[ref, [
        {
          "text": "πᾶσα",
          "occurrence": 1
        },
        {
          "text": "βασιλεία",
          "occurrence": 1
        },
        {
          "text": "μερισθεῖσα",
          "occurrence": 1
        },
        {
          "text": "καθ",
          "occurrence": 1
        },
        {
          "text": "ἑαυτῆς",
          "occurrence": 1
        },
        {
          "text": "ἐρημοῦται",
          "occurrence": 1
        },
        {
          "text": "καὶ",
          "occurrence": 1
        },
        {
          "text": "πᾶσα",
          "occurrence": 2
        },
        {
          "text": "πόλις",
          "occurrence": 1
        },
        {
          "text": "ἢ",
          "occurrence": 1
        },
        {
          "text": "οἰκία",
          "occurrence": 1
        },
        {
          "text": "μερισθεῖσα",
          "occurrence": 2
        },
        {
          "text": "καθ",
          "occurrence": 2
        },
        {
          "text": "ἑαυτῆς",
          "occurrence": 2
        },
        {
          "text": "οὐ",
          "occurrence": 1
        },
        {
          "text": "σταθήσεται",
          "occurrence": 1
        }
      ]]])
    })
    expect(selected).toBe(true);
  });
})