import { parseResourceLink } from './resources'

const config = { server: "https://bg.door43.org" };
const reference = { bookId: '3jn', chapter: 1, verse: 1 };

const resourceExpectedValue = {
    "config": {
        "server": "https://bg.door43.org",
    },
    "languageId": "ru",
    "projectId": "3jn",
    "repository": "ru_rlob",
    "resourceId": "rlob",
    "resourceLink": "ru_gl/ru/rlob/master/3jn",
    "tag": "master",
    "username": "ru_gl",
}

describe('parseResourceLink without books', () => {
    it('should be ru_rlob', () => {
        const resourceLink = `https://git.door43.org/ru_gl/ru_rlob`;
        let resource = parseResourceLink({ resourceLink, config, reference });

        expect(resource).toStrictEqual(resourceExpectedValue);
    });

    it('should be ru_rlob', () => {
        const resourceLink = `https://git.door43.org/ru_gl/ru_rlob/src/branch/master`;
        let resource = parseResourceLink({ resourceLink, config, reference });

        expect(resource).toStrictEqual(resourceExpectedValue);
    });

    it('should be ru_rlob', () => {
        const resourceLink = `/ru_gl/ru_rlob`;
        let resource = parseResourceLink({ resourceLink, config, reference });

        expect(resource).toStrictEqual(resourceExpectedValue);
    });

    it('should be ru_rlob', () => {
        const resourceLink = `ru_gl/ru_rlob`;
        let resource = parseResourceLink({ resourceLink, config, reference });

        expect(resource).toStrictEqual(resourceExpectedValue);
    });

    it('should be ru_rlob', () => {
        const resourceLink = `ru_gl/ru/rlob/master/`;
        let resource = parseResourceLink({ resourceLink, config, reference });

        expect(resource).toStrictEqual(resourceExpectedValue);
    });
})


describe('parseResourceLink with books', () => {
    it('should be ru_rlob', () => {
        const resourceLink = `https://git.door43.org/ru_gl/ru_rlob/3jn`;
        let resource = parseResourceLink({ resourceLink, config, reference });

        expect(resource).toStrictEqual(resourceExpectedValue);
    });

    it('should be ru_rlob', () => {
        const resourceLink = `https://git.door43.org/ru_gl/ru_rlob/src/branch/master/3jn`;
        let resource = parseResourceLink({ resourceLink, config, reference });

        expect(resource).toStrictEqual(resourceExpectedValue);
    });

    it('should be ru_rlob 1534', () => {
        const resourceLink = `/ru_gl/ru_rlob/3jn`;
        let resource = parseResourceLink({ resourceLink, config, reference });

        expect(resource).toStrictEqual(resourceExpectedValue);
    });

    it('should be ru_rlob with book', () => {
        const resourceLink = `ru_gl/ru_rlob/3jn`;
        let resource = parseResourceLink({ resourceLink, config, reference });

        expect(resource).toStrictEqual(resourceExpectedValue);
    });

    it('should be ru_rlob', () => {
        const resourceLink = `ru_gl/ru/rlob/master/3jn`;
        let resource = parseResourceLink({ resourceLink, config, reference });

        expect(resource).toStrictEqual(resourceExpectedValue);
    });
})