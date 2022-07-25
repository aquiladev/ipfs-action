# Base Directory Path Converter

This package converts file paths to starting from a desired "base" directory.

For example:

If the sourcePath is `parentDirectory/childDirectory/sourceDirectory` 

and the provided filePath is `parentDirectory/childDirectory/sourceDirectory/example/test.file`

then the returned filepath will be `sourceDirectory/example/test.file`


## Installation

```
npm install --save base-path-converter
```

## Usage

##### Params
* `sourcePath` - The path for the original "base" directory being read from
* `filePath` - A filepath that for a file that was read from that source directory

#### Response
A trimmed version of the filepath that starts from the "base" directory

##### Example Code
Here's an example of the package being utilized to prepare a form-data object to be send to an API.

In this example, we want to overwrite the filepath we're sending for each file, as we don't want the API receiving the file to care about the "base" folder's parents.

```javascript
const recursive = require('recursive-fs');
const FormData = require('form-data');
const basePathConverter = require('base-path-converter');

const src = './../builds/React-Builds/myBuild/'
recursive.readdirr(src, function (err, dirs, files) {
    const body = new FormData();
    files.forEach((file) => {
        const filepath = path.normalize(file);
        body.append(`file`, fs.createReadStream(file), {
            filepath: basePathConverter(src, file)
        })
    });
});
```

####Special Handling of `./`
If the sourcePath is passed in and begins with `./`, then the `./` will be trimmed from the beginning of it before the sourcePath is processed.
