import { selectionsFromQuote } from '../src/components/selections/helpers';
import * as fixtures from './fixtures/TIT-1-1';

describe('Selections From Quote', () => {
  it('should correctly extract highlighted words given verse objects and quote', () => {
    const { quote, verseObjects, occurrence } = fixtures;
    const selections = selectionsFromQuote({ quote, verseObjects, occurrence });
    expect(selections).toMatchObject(["{\"text\":\"Ἰούδας\",\"occurrence\":1,\"occurrences\":1}", "{\"text\":\"Ἰησοῦ\",\"occurrence\":1,\"occurrences\":2}", "{\"text\":\"Χριστοῦ\",\"occurrence\":1,\"occurrences\":1}", "{\"text\":\"δοῦλος\",\"occurrence\":1,\"occurrences\":1}"]);
  })
})