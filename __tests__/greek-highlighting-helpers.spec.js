import { generateSelection } from "../src/core/selections/selections";

describe('Selections Helpers', () => {
  it('should only contain one occurence for the given text', () => {
    const precedingText = "Παῦλος δοῦλος θεοῦ ἀπόστολος δὲ Ἰησοῦ Χριστοῦ κατὰ πίστιν ἐκλεκτῶν θεοῦ καὶ ἐπίγνωσιν ἀληθείας ";
    const entireText = "Παῦλος δοῦλος θεοῦ ἀπόστολος δὲ Ἰησοῦ Χριστοῦ κατὰ πίστιν ἐκλεκτῶν θεοῦ καὶ ἐπίγνωσιν ἀληθείας τῆς κατ’ εὐσέβειαν ";
    const selectedText = `κατ’`;
    const expectedSelection = {
      text: selectedText,
      occurrence: 1,
      occurrences: 1
    }
    const selection = generateSelection({ selectedText, precedingText, entireText });
    expect(selection).toMatchObject(expectedSelection);
  })
})