module.exports = {
    book:"php",
    chapter:2,
    verse:1,
    quote:"εἴ τις",
    occurrence:-1,
    expected:
      [
        {
          "text": "εἴ",
          "occurrence": 1,
          "occurrences": 4
        },
        {
          "text": "τις",
          "occurrence": 1,
          "occurrences": 3
        },
        {
          "text": "εἴ",
          "occurrence": 3,
          "occurrences": 4
        },
        {
          "text": "τις",
          "occurrence": 2,
          "occurrences": 3
        },
        {
          "text": "εἴ",
          "occurrence": 4,
          "occurrences": 4
        },
        {
          "text": "τις",
          "occurrence": 3,
          "occurrences": 3
        }
      ]
}