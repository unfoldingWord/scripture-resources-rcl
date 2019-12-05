import {
  selectionsFromQuoteAndString,
} from './selections';

test('selectionsFromQuoteAndString', () => {
  const input = {
    quote: "λόγος",
    string: "ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν Θεόν, καὶ Θεὸς ἦν ὁ λόγος.",
    occurrence: -1,
  };
  const output = selectionsFromQuoteAndString(input);
  const expected = [
    { text: "λόγος", occurrence: 1, occurrences: 3 },
    { text: "λόγος", occurrence: 2, occurrences: 3 },
    { text: "λόγος", occurrence: 3, occurrences: 3 },
  ];
  expect(output).toStrictEqual(expected);
});

test('selectionsFromQuoteAndString', () => {
  const input = {
    quote: "ἐν ἀρχῇ ἦν",
    string: "ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν Θεόν, καὶ Θεὸς ἦν ὁ λόγος.",
    occurrence: 1,
  };
  const output = selectionsFromQuoteAndString(input);
  const expected = [
    { text: "ἐν", occurrence: 1, occurrences: 1 },
    { text: "ἀρχῇ", occurrence: 1, occurrences: 1 },
    { text: "ἦν", occurrence: 1, occurrences: 3 },
  ];
  expect(output).toStrictEqual(expected);
});

test('selectionsFromQuoteAndString', () => {
  const input = {
    quote: "Θεὸς…λόγος",
    string: "ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν Θεόν, καὶ Θεὸς ἦν ὁ λόγος.",
    occurrence: 1,
  };
  const output = selectionsFromQuoteAndString(input);
  const expected = [
    { text: "Θεὸς", occurrence: 1, occurrences: 1 },
    { text: "λόγος", occurrence: 3, occurrences: 3 },
  ];
  expect(output).toStrictEqual(expected);
});

test('selectionsFromQuoteAndString', () => {
  const input = {
    quote: "ὁ λόγος…πρὸς",
    string: "ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν Θεόν, καὶ Θεὸς ἦν ὁ λόγος.",
    occurrence: 1,
  };
  const output = selectionsFromQuoteAndString(input);
  const expected = [
    { text: "ὁ", occurrence: 1, occurrences: 3 },
    { text: "λόγος", occurrence: 1, occurrences: 3 },
    { text: "πρὸς", occurrence: 1, occurrences: 1 },
  ];
  expect(output).toStrictEqual(expected);
});

test('selectionsFromQuoteAndString', () => {
  const input = {
    quote: "ὁ λόγος…Θεόν",
    string: "ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν Θεόν, καὶ Θεὸς ἦν ὁ λόγος.",
    occurrence: 2,
  };
  const output = selectionsFromQuoteAndString(input);
  const expected = [
    { text: "ὁ", occurrence: 2, occurrences: 3 },
    { text: "λόγος", occurrence: 2, occurrences: 3 },
    { text: "Θεόν", occurrence: 1, occurrences: 1 },
  ];
  expect(output).toStrictEqual(expected);
});

test('selectionsFromQuoteAndString', () => {
  const input = {
    quote: "ὁ λόγος",
    string: "ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν Θεόν, καὶ Θεὸς ἦν ὁ λόγος.",
    occurrence: 1,
  };
  const output = selectionsFromQuoteAndString(input);
  const expected = [
    { text: "ὁ", occurrence: 1, occurrences: 3 },
    { text: "λόγος", occurrence: 1, occurrences: 3 },
  ];
  expect(output).toStrictEqual(expected);
});

test('selectionsFromQuoteAndString', () => {
  const input = {
    quote: "ὁ λόγος",
    string: "ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν Θεόν, καὶ Θεὸς ἦν ὁ λόγος.",
    occurrence: 2,
  };
  const output = selectionsFromQuoteAndString(input);
  const expected = [
    { text: "ὁ", occurrence: 2, occurrences: 3 },
    { text: "λόγος", occurrence: 2, occurrences: 3 },
  ];
  expect(output).toStrictEqual(expected);
});