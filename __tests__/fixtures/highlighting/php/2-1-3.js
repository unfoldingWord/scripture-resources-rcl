module.exports = {
    book:"php",
    chapter:2,
    verse:1,
    quote:"τις…τι…τις…τις",
    occurrence:1,
    expected:
      [
        {
          "text": "τις",
          "occurrence": 1,
          "occurrences": 3
        },
        {
          "text": "τι",
          "occurrence": 1,
          "occurrences": 1
        },
        {
          "text": "τις",
          "occurrence": 2,
          "occurrences": 3
        },
        {
          "text": "τις",
          "occurrence": 3,
          "occurrences": 3
        }
      ]
}