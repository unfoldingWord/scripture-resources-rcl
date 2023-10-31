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
        },
        {
          "text": "τις",
          "occurrence": 1,
        },
        {
          "text": "εἴ",
          "occurrence": 3,
        },
        {
          "text": "τις",
          "occurrence": 2,
        },
        {
          "text": "εἴ",
          "occurrence": 4,
        },
        {
          "text": "τις",
          "occurrence": 3,
        }
      ]
}