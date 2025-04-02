const fs = require('fs');
const sugarMetadata = require('../api/data/sugarMetadata.json');
const colorShaders = require('../api/data/colorShaders.json');

const rootDir = __dirname.substring(0, __dirname.indexOf("src") - 1);
const cacheDir = rootDir + '\\src\\content\\compileCache\\';

class ColorShader {
    algorithm;
    colors;
    index = -1;

    static fromRule(ruleString) {
        let prefab = colorShaders.find(shader => shader.name === ruleString);
        if (!prefab) {
            let parts = ruleString.split(' ');
            prefab = { colors: parts[0], algorithm: parts.length > 1 ? parts[1] : 'alternation' };
        }
        return new ColorShader(prefab);
    }

    constructor({ colors, algorithm } = {}) {
        this.colors = colors.replaceAll('-', '');
        if (algorithm === 'alternation') { this.algorithm = this.algoAlternation; }
        else if (algorithm === 'sequence') { this.algorithm = this.algoSequence; }
        else if (algorithm === 'bordered') { this.algorithm = this.algoBordered; }
        else { this.algorithm = this.algoSolid; }
    }

    apply(characters) {
        if (this.colors === '!') return characters;
        let ret = ['<span class="injected">'];
        for (let i = 0; i < characters.length; i++) {
            let char = characters[i];
            let bordered = i === 0 || i === characters.length - 1;
            ret.push(this.next(char, bordered));
        }
        ret.push('</span>');
        return ret;
    }

    next(charToColor, bordered) {
        if (charToColor.length > 1) return charToColor;
        this.algorithm(bordered);
        let ret = `<span class="${this.colors[this.index]}">${charToColor}</span>`
        return ret;
    }

    algoAlternation() {
        this.index = Math.min(this.index + 1, this.colors.length - 1);
    }
    algoSequence() {
        this.index = (this.index + 1) % this.colors.length;
    }
    algoBordered(bordered) {
        this.index = bordered ? 1 : 0;
    }
    algoSolid() { }
}

class ArticleMetadata {
    articleCache = [];

    constructor(app) {
        let config = app.config;
        for (let route of config.routes) {
            if (!route.contentTemplate) continue;
            let index = route.contentTemplate.lastIndexOf('\\');
            if (index < 0) index = route.contentTemplate.lastIndexOf('/');
            let filename = route.contentTemplate.substring(index + 1);

            let compiledPath = cacheDir + filename;
            let sourceStats = fs.statSync(route.contentTemplate);

            try {
                let timestamp = fs.statSync(compiledPath).mtime;

                if (sourceStats.mtime <= timestamp) {
                    this.cacheCompiledArticle(route.id, route.contentTemplate, compiledPath, timestamp);
                    continue;
                }
            } catch (e) { }
            let markdown = fs.readFileSync(route.contentTemplate, { encoding: 'utf-8' });
            let compiledMarkdown = runCompilation(markdown);
            fs.writeFileSync(compiledPath, compiledMarkdown, { flag: 'w' });
            this.cacheCompiledArticle(route.id, route.contentTemplate, compiledPath, new Date());
        }
        console.log('Cache constructed');
    }

    getArticle(routeId) {
        for (let cached of this.articleCache) {
            if (cached.id === routeId) return cached;
        }
        return null;
    }

    isArticleDirty(routeId) {
        let article = this.getArticle(routeId);
        if (!article) return true;

        let stats = fs.statSync(article.sourcePath);
        return stats.mtime > article.timestamp;
    }

    cacheCompiledArticle(id, sourcePath, compiledPath, timestamp) {
        let existingArticle = this.getArticle(id);
        if (existingArticle) {
            existingArticle.timestamp = timestamp;
        } else {
            this.articleCache.push({ id, sourcePath, compiledPath, timestamp });
        }
    }
}

let metadata;

exports.buildArticleCacheMetadata = (app) => {
    metadata = new ArticleMetadata(app);
}

const compileArticle = function (route) {
    let article = metadata.getArticle(route.id);
    if (article && !metadata.isArticleDirty(route.id)) {
        return article.compiledPath;
    }
    console.log('Recompiling dirty article');

    let filename = route.contentTemplate.substring(route.contentTemplate.lastIndexOf('\\') + 1);
    let markdown = fs.readFileSync(route.contentTemplate, { encoding: 'utf-8' });
    let compiledMarkdown = runCompilation(markdown);
    fs.writeFileSync(cacheDir + filename, compiledMarkdown, { flag: 'w' });
    metadata.cacheCompiledArticle(route.id, route.contentTemplate, cacheDir + filename, new Date());
    return cacheDir + filename;
}

const runCompilation = function (markdown) {
    let currToken = [];
    let pieces = [];
    let lastMatch;
    let i = 0;
    while (i < markdown.length) {
        i = skipIgnoredMarkdown(i, markdown);

        // Try to format a Qud string, injecting it if successful
        let result = formatString(i, markdown);
        if (result.didFormat) {
            if (lastMatch) {
                pieces.push(markdown.substring(0, lastMatch.start));
                pieces.push(lastMatch.injectionMarkup);
                pieces.push(markdown.substring(lastMatch.end, result.start));
                pieces.push(result.injectionMarkup);
                markdown = markdown.substring(result.end);
            } else {
                pieces.push(markdown.substring(0, result.start));
                pieces.push(result.injectionMarkup);
                markdown = markdown.substring(result.end);
            }
            currToken = [];
            lastMatch = null;
            i = 0;
            continue;
        }
        while (/[a-zA-Z']/.test(markdown[i]) && i < markdown.length) currToken.push(markdown[i++]);

        let matchResult = checkMatches(currToken, markdown, i);

        // There are instances where some matches are subsets of others
        // In these instances, we cache the last match and if it turns out
        // that was correct, we apply it in posterity
        if (!matchResult.matches && lastMatch) {
            pieces.push(markdown.substring(0, lastMatch.start));
            pieces.push(lastMatch.injectionMarkup);
            markdown = markdown.substring(lastMatch.end);
            i = 0;
            currToken = [];
            lastMatch = null;
        }
        // Otherwise, no matches we trim our token to just the current word so no words are dropped
        else if (!matchResult.matches && currToken.length > 0) {
            while (currToken.length > 0 && /[a-zA-Z']/.test(currToken.shift()));
            while (currToken.length > 0 && !/[a-zA-Z']/.test(currToken[0])) currToken.shift();
        }
        // If there's multiple matches, we can't say whether the perfect match is actually right
        else if (matchResult.perfectMatch && matchResult.matches > 1) {
            lastMatch = matchResult.perfectMatch;
            currToken.push(markdown[i++]);
        }
        // If there's only 1 perfect match, it's the right one and we apply it
        else if (matchResult.perfectMatch && matchResult.matches === 1) {
            let match = matchResult.perfectMatch;
            pieces.push(markdown.substring(0, match.start));
            pieces.push(match.injectionMarkup);
            markdown = markdown.substring(match.end);
            i = 0;
            currToken = [];
            lastMatch = null;
        } else {
            currToken.push(markdown[i++]);
        }
    }
    pieces.push(markdown);
    return pieces.join('');
}

exports.compileArticle = compileArticle;
exports.runCompilation = runCompilation;

function checkMatches(currToken, markdown, i) {
    let tokenLen = currToken.length;
    let startsSentence = i >= tokenLen + 2 ? (
        markdown[i - tokenLen - 2] === '.' || markdown[i - tokenLen - 1] === '\n' ||
        markdown[i - tokenLen - 2] === ' ' || markdown[i - tokenLen - 1] === '>' ||
        markdown[i - tokenLen - 2] === '-'
    ) : false;
    let perfectMatch;
    let matches = 0;

    // Go through and check match quality
    for (let sugarObj of sugarMetadata) {
        let matched = true;
        let baseWordMatch = false;
        let capitalize = false;
        let index = 0;

        // Check to see if our token character matches sugar object names
        for (index; index < currToken.length; index++) {
            if (index >= sugarObj.name.length) {
                baseWordMatch = true;
                matched = false;
                break;
            }
            let tokenChar = currToken[index];
            let compareChar = sugarObj.name[index];

            // If the first characters didn't match, check casing if relevant
            if (tokenChar !== compareChar && index === 0 && startsSentence) {
                compareChar = compareChar.toUpperCase();
                capitalize = true;
            }
            if (tokenChar !== compareChar) {
                matched = false; break;
            }
        }
        if (!matched && !baseWordMatch) continue; // If the tokens did not match, just move along
        let wordModifier = '';
        if (!matched && baseWordMatch) { wordModifier = getWordModifier(currToken, sugarObj.name, index); }
        if (!matched && !wordModifier) continue;
        matches++;

        if (perfectMatch) continue;

        // If this was a perfect match, mark it as the match
        if (index + wordModifier.length === currToken.length && index === sugarObj.name.length) {
            let resultObj = {
                match: sugarObj, start: i - currToken.length, end: i,
                injectionMarkup: buildInjectionMarkup(sugarObj, wordModifier, capitalize)
            };
            perfectMatch = resultObj;
        }
    }

    return { matches, perfectMatch };
}
const correctedDir = '/icons/';

function buildInjectionMarkup(sugarObj, wordModifier, capitalize) {
    let qudzooDir = correctedDir + sugarObj.src;
    sugarObj.prefix = sugarObj.prefix.replace('!!!!', qudzooDir);
    let name = sugarObj.displayName;
    if (wordModifier.length) {
        let bracketIndex = sugarObj.displayName.lastIndexOf('}');
        if (bracketIndex < 0 || bracketIndex !== sugarObj.displayName.length - 1) {
            name += wordModifier;
        } else {
            name = name.substring(0, bracketIndex - 1) + wordModifier + "}}";
        }
    }
    if (capitalize) {
        let i = 0;
        if (name[i] === '{') { while (name[i] !== '|') i++; i++; }
        let capital = name[i].toUpperCase();
        name = name.substring(0, i) + capital + name.substring(i + 1);
    }

    return `${sugarObj.prefix}${formatAll(0, name)}${sugarObj.suffix}`;
}

function skipIgnoredMarkdown(index, markdown) {
    let originalIndex = index;
    switch (markdown[index]) {
        case '`':
            if (markdown[index - 1] === '\\') return originalIndex + 1;
            index++;
            while (markdown[index] !== '`') index++;
            return index + 1;
        case '#':
            while (markdown[index] === '#') index++;
            if (markdown[index] !== ' ') return originalIndex;
            while (markdown[index] !== '\n') index++;
            return index;
        case '!':
            if (markdown[index + 1] !== '[') return originalIndex;
            while (markdown[index] !== ')') index++;
            return index;
        default: return index;
    }
}

function formatAll(index, markdown) {
    let retParts = [];
    while (index < markdown.length) {
        let result = formatString(index, markdown);
        if (result.didFormat) {
            index = result.end;
            retParts.push(result.injectionMarkup);
        } else retParts.push(markdown[index++]);
    }
    return retParts.join('');
}

function formatString(index, markdown) {
    let start = index;
    if (!(markdown[index] === '{' && markdown[index + 1] === '{')) return { didFormat: false };

    let currToken = [];
    while (markdown[index] === '{') index++;
    while (markdown[index] !== '|' && index < markdown.length) currToken.push(markdown[index++]);
    if (index >= markdown.length) return { didFormat: false };
    let rule = currToken.join('');
    let shader = ColorShader.fromRule(rule);
    index++;

    currToken = [];
    while (true) {
        while (markdown[index] !== '}' && markdown[index] !== '{') currToken.push(markdown[index++]);
        if (markdown[index] === '{' && markdown[index + 1] === '{') {
            let subResult = formatString(index, markdown);
            if (!subResult.didFormat) continue;
            index = subResult.end;
            currToken.push(subResult.injectionMarkup);
        } else if (markdown[index] === '}' && markdown[index + 1] === '}') break;
    }

    currToken = shader.apply(currToken);
    return { didFormat: true, start, end: index + 2, injectionMarkup: currToken.join('') };
}

function getWordModifier(token, objName, index) {
    if (isAdverb(token, objName, index)) {
        return 'ing';
    }
    if (isPossessiveOrPastTense(token, objName, index)) {
        return [token[index], token[index + 1]].join('');
    }
    if (isPluralOrPossessivePlural(token, objName, index)) {
        return token[index];
    }
}

function isAdverb(token, objName, index) {
    if (index !== objName.length) return false;
    if (index + 3 !== token.length) return false;
    return token[index] === 'i' && token[index + 1] === 'n' && token[index + 2] === 'g';
}

function isPossessiveOrPastTense(token, objName, index) {
    if (index !== objName.length) return false;
    if (index + 2 !== token.length) return false;
    return (token[index] === 'e' && token[index + 1] === 'd') ||
        (token[index] === "'" && token[index + 1] === 's');
}

function isPluralOrPossessivePlural(token, objName, index) {
    if (index !== objName.length) return false;
    if (index + 1 !== token.length) return false;
    return token[index] === 's' || token[index] === "'";
}