const baseDirectoryConverter = require('./../index.js');

describe('convertToRootDirectoryPath testing ', () => {
    test('ending / is removed', () => {
        expect(baseDirectoryConverter('example/', 'example/')).toBe('example');
    });
    test('relative path is changed', () => {
        expect(baseDirectoryConverter('parentDirectory/childDirectory/sourceDirectory', 'parentDirectory/childDirectory/sourceDirectory/example/test.file')).toBe('sourceDirectory/example/test.file');
    });
    test('./ condition is handled correctly', () => {
        expect(baseDirectoryConverter('./testing', 'testing/testfile.test')).toBe('testing/testfile.test');
    });
    test('./../ condition is handled correctly', () => {
        expect(baseDirectoryConverter('./../testing', '../testing/testfile.test')).toBe('testing/testfile.test');
    });
    test('./ with subfolders condition is handled correctly', () => {
        expect(baseDirectoryConverter('./testing', 'testing/testing2/testfile.test')).toBe('testing/testing2/testfile.test');
    });
    test('./../ with subfolders condition is handled correctly', () => {
        expect(baseDirectoryConverter('./../testing/test', '../testing/test/testfile.test')).toBe('test/testfile.test');
    });
});