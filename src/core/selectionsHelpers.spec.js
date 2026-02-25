import {
  areAllQuoteWordsFound,
  areAllQuoteWordsFoundInOriginal, areAllQuoteWordsFoundInTarget,
  getQuoteTokenArray,
  getSelectionsAsArray
} from "./selectionsHelpers";

const selections_jos_17_11 = {
  '17:11': [
    {text: 'וּ֠⁠בְנוֹתֶי⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנוֹתֶ֜י⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנוֹתֶ֗י⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנֹתֶ֔י⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנֹתֶ֔י⁠הָ', occurrence: 2},
    {text: 'וּ⁠בְנוֹתֶ֑י⁠הָ', occurrence: 1}
  ]
};

const selections_jos_17_11_longer = {
  '17:11': [
    {text: 'וּ֠⁠בְנוֹתֶי⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנוֹתֶ֜י⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנוֹתֶ֗י⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנֹתֶ֔י⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנֹתֶ֔י⁠הָ', occurrence: 2},
    {text: 'וּ⁠בְנוֹתֶ֑י⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנוֹתֶ֑י⁠הָ', occurrence: 2}
  ]
};

const selections_jos_17_11_shorter = {
  '17:11': [
    {text: 'וּ⁠בְנוֹתֶ֜י⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנוֹתֶ֗י⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנֹתֶ֔י⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנֹתֶ֔י⁠הָ', occurrence: 2},
    {text: 'וּ⁠בְנוֹתֶ֑י⁠הָ', occurrence: 1}
  ]
};

const quote_jos_17_11 = "וּ֠⁠בְנוֹתֶי⁠הָ & וּ⁠בְנוֹתֶ֜י⁠הָ & וּ⁠בְנוֹתֶ֗י⁠הָ & וּ⁠בְנֹתֶ֔י⁠הָ & וּ⁠בְנֹתֶ֔י⁠הָ & וּ⁠בְנוֹתֶ֑י⁠הָ";

const quote_jos_17_11_mismatch = "וּ֠⁠בְנוֹתֶי⁠הָ & וּ⁠בְנוֹתֶ֜י⁠הָ & וּ⁠בְנוֹתֶ֗י⁠הָ & וּ⁠בְנֹתֶ֔י⁠הָ & וּ⁠בְנֹתֶ֔י⁠הָ & וּ⁠בְנֹתֶ֔י⁠ה";

const selections_jos_17_10 =
{
  "17:10":
    [
      {
        "text": "נֶ֣גְבָּ⁠ה",
        "occurrence": 1
      },
      {
        "text": "לְ⁠אֶפְרַ֗יִם",
        "occurrence": 1
      },
      {
        "text": "וְ⁠צָפ֨וֹנָ⁠ה֙",
        "occurrence": 1
      },
      {
        "text": "לִ⁠מְנַשֶּׁ֔ה",
        "occurrence": 1
      }
    ],
};

const quote_jos_17_10 = "נֶ֣גְבָּ⁠ה לְ⁠אֶפְרַ֗יִם וְ⁠צָפ֨וֹנָ⁠ה֙ לִ⁠מְנַשֶּׁ֔ה";

const targetVersesForRef_jos_17_11 = [
  {
    "chapter": 17,
    "verse": 11,
    "verseData": {
      "verseObjects": [
        {
          "tag": "zaln",
          "type": "milestone",
          "strong": "c:H1961",
          "lemma": "הָיָה",
          "morph": "He,C:Vqw3ms",
          "occurrence": "1",
          "occurrences": "1",
          "content": "וַ⁠יְהִ֨י",
          "children": [
            {
              "text": "And",
              "tag": "w",
              "type": "word",
              "occurrence": "1",
              "occurrences": "1"
            }
          ],
          "endTag": "zaln-e\\*"
        },
        {
          "type": "text",
          "text": " "
        },
        {
          "tag": "zaln",
          "type": "milestone",
          "strong": "l:H4519",
          "lemma": "מְנַשֶּׁה",
          "morph": "He,R:Np",
          "occurrence": "1",
          "occurrences": "1",
          "content": "לִ⁠מְנַשֶּׁ֜ה",
          "children": [
            {
              "text": "to",
              "tag": "w",
              "type": "word",
              "occurrence": "1",
              "occurrences": "1"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "Manasseh",
              "tag": "w",
              "type": "word",
              "occurrence": "1",
              "occurrences": "1"
            }
          ],
          "endTag": "zaln-e\\*"
        },
        {
          "type": "text",
          "text": " "
        },
        {
          "tag": "zaln",
          "type": "milestone",
          "strong": "b:H3485",
          "lemma": "יִשָּׂשכָר",
          "morph": "He,R:Np",
          "occurrence": "1",
          "occurrences": "1",
          "content": "בְּ⁠יִשָּׂשכָ֣ר",
          "children": [
            {
              "text": "in",
              "tag": "w",
              "type": "word",
              "occurrence": "1",
              "occurrences": "2"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "Issachar",
              "tag": "w",
              "type": "word",
              "occurrence": "1",
              "occurrences": "1"
            }
          ],
          "endTag": "zaln-e\\*"
        },
        {
          "type": "text",
          "text": " "
        },
        {
          "tag": "zaln",
          "type": "milestone",
          "strong": "c:b:H0836",
          "lemma": "אָשֵׁר",
          "morph": "He,C:R:Np",
          "occurrence": "1",
          "occurrences": "1",
          "content": "וּ⁠בְ⁠אָשֵׁ֗ר",
          "children": [
            {
              "text": "and",
              "tag": "w",
              "type": "word",
              "occurrence": "1",
              "occurrences": "12"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "in",
              "tag": "w",
              "type": "word",
              "occurrence": "2",
              "occurrences": "2"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "Asher",
              "tag": "w",
              "type": "word",
              "occurrence": "1",
              "occurrences": "1"
            }
          ],
          "endTag": "zaln-e\\*"
        },
        {
          "type": "text",
          "text": " {"
        },
        {
          "tag": "zaln",
          "type": "milestone",
          "strong": "H1052",
          "lemma": "בֵּית שְׁאָן",
          "morph": "He,Np",
          "occurrence": "1",
          "occurrences": "1",
          "content": "בֵּית",
          "children": [
            {
              "tag": "zaln",
              "type": "milestone",
              "strong": "H1052",
              "lemma": "בֵּית שְׁאָן",
              "morph": "He,Np",
              "occurrence": "1",
              "occurrences": "1",
              "content": "שְׁאָ֣ן",
              "children": [
                {
                  "text": "were",
                  "tag": "w",
                  "type": "word",
                  "occurrence": "1",
                  "occurrences": "1"
                },
                {
                  "type": "text",
                  "text": "} "
                },
                {
                  "text": "Beth",
                  "tag": "w",
                  "type": "word",
                  "occurrence": "1",
                  "occurrences": "1"
                },
                {
                  "type": "text",
                  "text": " "
                },
                {
                  "text": "Shan",
                  "tag": "w",
                  "type": "word",
                  "occurrence": "1",
                  "occurrences": "1"
                }
              ],
              "endTag": "zaln-e\\*"
            }
          ],
          "endTag": "zaln-e\\*"
        },
        {
          "type": "text",
          "text": " "
        },
        {
          "tag": "zaln",
          "type": "milestone",
          "strong": "c:H1323",
          "lemma": "בַּת",
          "morph": "He,C:Ncfpc:Sp3fs",
          "occurrence": "1",
          "occurrences": "1",
          "content": "וּ֠⁠בְנוֹתֶי⁠הָ",
          "children": [
            {
              "text": "and",
              "tag": "w",
              "type": "word",
              "occurrence": "2",
              "occurrences": "12"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "its",
              "tag": "w",
              "type": "word",
              "occurrence": "1",
              "occurrences": "6"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "daughters",
              "tag": "w",
              "type": "word",
              "occurrence": "1",
              "occurrences": "6"
            }
          ],
          "endTag": "zaln-e\\*"
        },
        {
          "type": "text",
          "text": " "
        },
        {
          "tag": "zaln",
          "type": "milestone",
          "strong": "c:H2991",
          "lemma": "יִבְלְעָם",
          "morph": "He,C:Np",
          "occurrence": "1",
          "occurrences": "1",
          "content": "וְ⁠יִבְלְעָ֨ם",
          "children": [
            {
              "text": "and",
              "tag": "w",
              "type": "word",
              "occurrence": "3",
              "occurrences": "12"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "Ibleam",
              "tag": "w",
              "type": "word",
              "occurrence": "1",
              "occurrences": "1"
            }
          ],
          "endTag": "zaln-e\\*"
        },
        {
          "type": "text",
          "text": " "
        },
        {
          "tag": "zaln",
          "type": "milestone",
          "strong": "c:H1323",
          "lemma": "בַּת",
          "morph": "He,C:Ncfpc:Sp3fs",
          "occurrence": "1",
          "occurrences": "1",
          "content": "וּ⁠בְנוֹתֶ֜י⁠הָ",
          "children": [
            {
              "text": "and",
              "tag": "w",
              "type": "word",
              "occurrence": "4",
              "occurrences": "12"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "its",
              "tag": "w",
              "type": "word",
              "occurrence": "2",
              "occurrences": "6"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "daughters",
              "tag": "w",
              "type": "word",
              "occurrence": "2",
              "occurrences": "6"
            }
          ],
          "endTag": "zaln-e\\*"
        },
        {
          "type": "text",
          "text": " "
        },
        {
          "tag": "zaln",
          "type": "milestone",
          "strong": "c:H0853",
          "lemma": "אֵת",
          "morph": "He,C:To",
          "occurrence": "1",
          "occurrences": "1",
          "content": "וְֽ⁠אֶת",
          "children": [
            {
              "text": "and",
              "tag": "w",
              "type": "word",
              "occurrence": "5",
              "occurrences": "12"
            }
          ],
          "endTag": "zaln-e\\*"
        },
        {
          "type": "text",
          "text": " "
        },
        {
          "tag": "zaln",
          "type": "milestone",
          "strong": "H3427",
          "lemma": "יָשַׁב",
          "morph": "He,Vqrmpc",
          "occurrence": "1",
          "occurrences": "1",
          "content": "יֹשְׁבֵ֧י",
          "children": [
            {
              "text": "the",
              "tag": "w",
              "type": "word",
              "occurrence": "1",
              "occurrences": "5"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "dwellers",
              "tag": "w",
              "type": "word",
              "occurrence": "1",
              "occurrences": "4"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "of",
              "tag": "w",
              "type": "word",
              "occurrence": "1",
              "occurrences": "5"
            }
          ],
          "endTag": "zaln-e\\*"
        },
        {
          "type": "text",
          "text": " "
        },
        {
          "tag": "zaln",
          "type": "milestone",
          "strong": "H1756",
          "lemma": "דּוֹר",
          "morph": "He,Np",
          "occurrence": "1",
          "occurrences": "1",
          "content": "דֹ֣אר",
          "children": [
            {
              "text": "Dor",
              "tag": "w",
              "type": "word",
              "occurrence": "1",
              "occurrences": "2"
            }
          ],
          "endTag": "zaln-e\\*"
        },
        {
          "type": "text",
          "text": " "
        },
        {
          "tag": "zaln",
          "type": "milestone",
          "strong": "c:H1323",
          "lemma": "בַּת",
          "morph": "He,C:Ncfpc:Sp3fs",
          "occurrence": "1",
          "occurrences": "1",
          "content": "וּ⁠בְנוֹתֶ֗י⁠הָ",
          "children": [
            {
              "text": "and",
              "tag": "w",
              "type": "word",
              "occurrence": "6",
              "occurrences": "12"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "its",
              "tag": "w",
              "type": "word",
              "occurrence": "3",
              "occurrences": "6"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "daughters",
              "tag": "w",
              "type": "word",
              "occurrence": "3",
              "occurrences": "6"
            }
          ],
          "endTag": "zaln-e\\*"
        },
        {
          "type": "text",
          "text": " "
        },
        {
          "tag": "zaln",
          "type": "milestone",
          "strong": "c:H3427",
          "lemma": "יָשַׁב",
          "morph": "He,C:Vqrmpc",
          "occurrence": "1",
          "occurrences": "2",
          "content": "וְ⁠יֹשְׁבֵ֤י",
          "children": [
            {
              "text": "and",
              "tag": "w",
              "type": "word",
              "occurrence": "7",
              "occurrences": "12"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "the",
              "tag": "w",
              "type": "word",
              "occurrence": "2",
              "occurrences": "5"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "dwellers",
              "tag": "w",
              "type": "word",
              "occurrence": "2",
              "occurrences": "4"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "of",
              "tag": "w",
              "type": "word",
              "occurrence": "2",
              "occurrences": "5"
            }
          ],
          "endTag": "zaln-e\\*"
        },
        {
          "type": "text",
          "text": " "
        },
        {
          "tag": "zaln",
          "type": "milestone",
          "strong": "H5874",
          "lemma": "עֵין־דֹּאר",
          "morph": "He,Np",
          "occurrence": "1",
          "occurrences": "1",
          "content": "עֵֽין",
          "children": [
            {
              "tag": "zaln",
              "type": "milestone",
              "strong": "H5874",
              "lemma": "עֵין־דֹּאר",
              "morph": "He,Np",
              "occurrence": "1",
              "occurrences": "1",
              "content": "דֹּר֙",
              "children": [
                {
                  "text": "En",
                  "tag": "w",
                  "type": "word",
                  "occurrence": "1",
                  "occurrences": "1"
                },
                {
                  "type": "text",
                  "text": " "
                },
                {
                  "text": "Dor",
                  "tag": "w",
                  "type": "word",
                  "occurrence": "2",
                  "occurrences": "2"
                }
              ],
              "endTag": "zaln-e\\*"
            }
          ],
          "endTag": "zaln-e\\*"
        },
        {
          "type": "text",
          "text": " "
        },
        {
          "tag": "zaln",
          "type": "milestone",
          "strong": "c:H1323",
          "lemma": "בַּת",
          "morph": "He,C:Ncfpc:Sp3fs",
          "occurrence": "1",
          "occurrences": "2",
          "content": "וּ⁠בְנֹתֶ֔י⁠הָ",
          "children": [
            {
              "text": "and",
              "tag": "w",
              "type": "word",
              "occurrence": "8",
              "occurrences": "12"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "its",
              "tag": "w",
              "type": "word",
              "occurrence": "4",
              "occurrences": "6"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "daughters",
              "tag": "w",
              "type": "word",
              "occurrence": "4",
              "occurrences": "6"
            }
          ],
          "endTag": "zaln-e\\*"
        },
        {
          "type": "text",
          "text": " "
        },
        {
          "tag": "zaln",
          "type": "milestone",
          "strong": "c:H3427",
          "lemma": "יָשַׁב",
          "morph": "He,C:Vqrmpc",
          "occurrence": "2",
          "occurrences": "2",
          "content": "וְ⁠יֹשְׁבֵ֤י",
          "children": [
            {
              "text": "and",
              "tag": "w",
              "type": "word",
              "occurrence": "9",
              "occurrences": "12"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "the",
              "tag": "w",
              "type": "word",
              "occurrence": "3",
              "occurrences": "5"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "dwellers",
              "tag": "w",
              "type": "word",
              "occurrence": "3",
              "occurrences": "4"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "of",
              "tag": "w",
              "type": "word",
              "occurrence": "3",
              "occurrences": "5"
            }
          ],
          "endTag": "zaln-e\\*"
        },
        {
          "type": "text",
          "text": " "
        },
        {
          "tag": "zaln",
          "type": "milestone",
          "strong": "H8590",
          "lemma": "תַּעֲנָךְ",
          "morph": "He,Np",
          "occurrence": "1",
          "occurrences": "1",
          "content": "תַעְנַךְ֙",
          "children": [
            {
              "text": "Taanach",
              "tag": "w",
              "type": "word",
              "occurrence": "1",
              "occurrences": "1"
            }
          ],
          "endTag": "zaln-e\\*"
        },
        {
          "type": "text",
          "text": " "
        },
        {
          "tag": "zaln",
          "type": "milestone",
          "strong": "c:H1323",
          "lemma": "בַּת",
          "morph": "He,C:Ncfpc:Sp3fs",
          "occurrence": "2",
          "occurrences": "2",
          "content": "וּ⁠בְנֹתֶ֔י⁠הָ",
          "children": [
            {
              "text": "and",
              "tag": "w",
              "type": "word",
              "occurrence": "10",
              "occurrences": "12"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "its",
              "tag": "w",
              "type": "word",
              "occurrence": "5",
              "occurrences": "6"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "daughters",
              "tag": "w",
              "type": "word",
              "occurrence": "5",
              "occurrences": "6"
            }
          ],
          "endTag": "zaln-e\\*"
        },
        {
          "type": "text",
          "text": " "
        },
        {
          "tag": "zaln",
          "type": "milestone",
          "strong": "c:H3427",
          "lemma": "יָשַׁב",
          "morph": "He,C:Vqrmpc",
          "occurrence": "1",
          "occurrences": "1",
          "content": "וְ⁠יֹשְׁבֵ֥י",
          "children": [
            {
              "text": "and",
              "tag": "w",
              "type": "word",
              "occurrence": "11",
              "occurrences": "12"
            }
          ],
          "endTag": "zaln-e\\*"
        },
        {
          "type": "text",
          "text": " "
        },
        {
          "tag": "zaln",
          "type": "milestone",
          "strong": "H4023",
          "lemma": "מְגִדּוֹן",
          "morph": "He,Np",
          "occurrence": "1",
          "occurrences": "1",
          "content": "מְגִדּ֖וֹ",
          "children": [
            {
              "text": "the",
              "tag": "w",
              "type": "word",
              "occurrence": "4",
              "occurrences": "5"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "dwellers",
              "tag": "w",
              "type": "word",
              "occurrence": "4",
              "occurrences": "4"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "of",
              "tag": "w",
              "type": "word",
              "occurrence": "4",
              "occurrences": "5"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "Megiddo",
              "tag": "w",
              "type": "word",
              "occurrence": "1",
              "occurrences": "1"
            }
          ],
          "endTag": "zaln-e\\*"
        },
        {
          "type": "text",
          "text": " "
        },
        {
          "tag": "zaln",
          "type": "milestone",
          "strong": "c:H1323",
          "lemma": "בַּת",
          "morph": "He,C:Ncfpc:Sp3fs",
          "occurrence": "1",
          "occurrences": "1",
          "content": "וּ⁠בְנוֹתֶ֑י⁠הָ",
          "children": [
            {
              "text": "and",
              "tag": "w",
              "type": "word",
              "occurrence": "12",
              "occurrences": "12"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "its",
              "tag": "w",
              "type": "word",
              "occurrence": "6",
              "occurrences": "6"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "daughters",
              "tag": "w",
              "type": "word",
              "occurrence": "6",
              "occurrences": "6"
            }
          ],
          "endTag": "zaln-e\\*"
        },
        {
          "type": "text",
          "text": ", "
        },
        {
          "tag": "zaln",
          "type": "milestone",
          "strong": "H7969",
          "lemma": "שָׁלוֹשׁ",
          "morph": "He,Acmsc",
          "occurrence": "1",
          "occurrences": "1",
          "content": "שְׁלֹ֖שֶׁת",
          "children": [
            {
              "text": "the",
              "tag": "w",
              "type": "word",
              "occurrence": "5",
              "occurrences": "5"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "three",
              "tag": "w",
              "type": "word",
              "occurrence": "1",
              "occurrences": "1"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "of",
              "tag": "w",
              "type": "word",
              "occurrence": "5",
              "occurrences": "5"
            }
          ],
          "endTag": "zaln-e\\*"
        },
        {
          "type": "text",
          "text": " "
        },
        {
          "tag": "zaln",
          "type": "milestone",
          "strong": "d:H5316",
          "lemma": "נֶפֶת",
          "morph": "He,Td:Ncfsa",
          "occurrence": "1",
          "occurrences": "1",
          "content": "הַ⁠נָּֽפֶת",
          "children": [
            {
              "text": "a",
              "tag": "w",
              "type": "word",
              "occurrence": "1",
              "occurrences": "1"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "text": "height",
              "tag": "w",
              "type": "word",
              "occurrence": "1",
              "occurrences": "1"
            }
          ],
          "endTag": "zaln-e\\*"
        },
        {
          "type": "text",
          "text": ".\n\n"
        },
        {
          "tag": "ts\\*",
          "nextChar": "\n"
        }
      ]
    }
  }
];

describe('Testing areAllQuoteWordsFoundInOriginal', () => {
  it('test single multiword part quote with selection but not normalized', () => {
    generateTestQuotesFoundInOriginal(quote_jos_17_10, selections_jos_17_10, true);
  });
  it('test single part quote with empty selection', () => {
    generateTestQuotesFoundInOriginal('tit/1-1', {}, false);
  });
  it('test multipart quote with empty selection', () => {
    generateTestQuotesFoundInOriginal(quote_jos_17_11, {}, false);
  });
  it('test multipart quote with perfect selection', () => {
    generateTestQuotesFoundInOriginal(quote_jos_17_11, selections_jos_17_11, true);
  });
  it('test multipart quote with shorter selection word count', () => {
    generateTestQuotesFoundInOriginal(quote_jos_17_11, selections_jos_17_11_shorter, false);
  });
  it('test multipart quote with longer selection word count', () => {
    generateTestQuotesFoundInOriginal(quote_jos_17_11, selections_jos_17_11_longer, false);
  });
  it('test multipart impertect quote with selection', () => {
    generateTestQuotesFoundInOriginal(quote_jos_17_11_mismatch, selections_jos_17_11, false);
  });
});

describe('Testing findTargetWordInAlignment', () => {
  it('test multipart quote with perfect selection', () => {
    generateTestQuotesFoundInTarget(quote_jos_17_11, targetVersesForRef_jos_17_11, true);
  });
})

/**
 * Generates and evaluates a test based on the provided quote, selections, and expected outcome.
 *
 * @param {string} quote - The text to be evaluated to check if all its words are found.
 * @param {Object|Map} selections - A collection of verse objects mapped by references, provided either as a plain object or a Map.
 * @param {boolean} expected - The expected result of the evaluation, indicating whether all words in the quote are found in the selections.
 * @return {void} This method does not return any value; it validates the test result internally.
 */
function generateTestQuotesFoundInOriginal(quote, selections, expected) {
  // Convert selections object to Map
  const selectionsMap = new Map();

  // If selections is a plain object
  if (selections && typeof selections === 'object' && !(selections instanceof Map)) {
    Object.entries(selections).forEach(([ref, verseObjectsArray]) => {
      selectionsMap.set(ref, verseObjectsArray);
    });
  } else if (selections instanceof Map) {
    // If it's already a Map, just copy it
    selections.forEach((value, key) => {
      selectionsMap.set(key, value);
    });
  }

  const quoteTokenArray = getQuoteTokenArray(quote);
  const selectionsAsArray = getSelectionsAsArray(selectionsMap);
  const found = areAllQuoteWordsFoundInOriginal(quoteTokenArray, selectionsAsArray);

  const matchedExpected = found == expected;
  if (!matchedExpected) {
    console.error(`areAllQuoteWordsFoundInOriginal() - Test failed for quote: ${quote}, expected: ${expected}, found: ${found}`, selections);
  }
  expect(matchedExpected).toBeTruthy();
}

function generateTestQuotesFoundInTarget(quote, targetVerseObjects, expected) {
  const quoteTokenArray = getQuoteTokenArray(quote);
  const found = areAllQuoteWordsFoundInTarget(quoteTokenArray, targetVerseObjects);

  const matchedExpected = found == expected;
  if (!matchedExpected) {
    console.error(`areAllQuoteWordsFoundInTarget() - Test failed for quote: ${quote}, expected: ${expected}, found: ${found}`, selections);
  }
  expect(matchedExpected).toBeTruthy();
}