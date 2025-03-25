class Logger {
    lines = [];

    log(line) {
        this.lines.push(line);
    }

    toString() {
        return this.lines.join('\n');
    }
}

const logger = new Logger();

exports.getLog = function () {
    return logger.toString();
}

exports.parseXML = function (text) {
    let endOfMetadata = text.indexOf('?>') + 2;
    let firstTag = 'objects';
    let start = text.indexOf('objects>', endOfMetadata) + 7;
    let results = parseTag(text, start, firstTag);

    logger.log(JSON.stringify(results[0]));
    return results[0];
}

function parseTag(text, index, tagName) {
    let attributes = [];

    // Parse out attributes
    while (true) {
        // Trim out the noise, or break at the end
        let char = text[index];
        if (char === '>') break;
        if (char === '/') { index++; break; }
        if (char === ' ') { index++; continue; }

        // Pull out the attribute data
        let attribute = [];
        let quoteCount = 0;
        while (quoteCount < 2) {
            if (text[index] === '"') quoteCount++;
            attribute.push(text[index++]);
        }
        let attString = attribute.join('');
        let parts = attString.split('=');
        attributes.push({ name: parts[0], value: stripQuotes(parts[1]) });
    }

    // Build out the tag object structure
    let tag = {
        name: tagName, children: [],
        attributes
    }

    // If this tag is self closing, we don't need to parse any children so just return it
    let selfClosing = text[index - 1] === '/';
    if (selfClosing) {
        return [tag, index + 1];
    }
    index++;

    // If not, we need to parse out the children
    while (true) {

        // Parse plain text
        let plainText = [];
        while (text[index] !== '<') plainText.push(text[index++]);
        let plainTextString = plainText.join('').trim();
        if (plainTextString.length > 0) tag.children.push({ name: 'PlainText', value: plainTextString });
        index++;

        // If the tag is a comment, just skip past it
        if (text[index] === '!') {
            index = text.indexOf('-->', index) + 3;
            continue;
        }
        // If the tag is a closing tag, that means it's this tags closing tag
        if (text[index] === '/') {
            index = text.indexOf('>', index) + 1;
            return [tag, index];
        }

        // Otherwise, get the name and parse the child tag
        let childTagName = [];
        while (text[index] !== ' ') childTagName.push(text[index++]);
        let results = parseTag(text, index + 1, childTagName.join(''));
        tag.children.push(results[0]);
        index = results[1];
    }
}

function stripQuotes(text) {
    return text.substring(1, text.length - 1);
}