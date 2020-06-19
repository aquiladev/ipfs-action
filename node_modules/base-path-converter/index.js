function convertFilePathToBaseDirectoryPath(sourcePath, filePath) {
    let newString = (sourcePath.startsWith('./') ? sourcePath.substring(2) : sourcePath);
    //make sure there isn't a dangling / to throw a false positive into the mix
    const lastIndexOfDirectory = newString.lastIndexOf('/');
    if(lastIndexOfDirectory === -1) {
        return filePath;
    }
    const lengthOfSource = sourcePath.length;
    //only trim if the / is the last character in the string
    if (lastIndexOfDirectory === (lengthOfSource - 1)) {
        newString = sourcePath.slice(0,-1);
    }

    //now that we're sure of no false positive, let's check and see where the "root" directory is
    const newLastIndex = newString.lastIndexOf('/');
    if ( newLastIndex === -1) {
        return newString;
    } else {
        const pathGarbage = newString.substring(0, newLastIndex + 1);
        newString = filePath.split(pathGarbage)[1];
    }

    return newString;
}

module.exports = convertFilePathToBaseDirectoryPath