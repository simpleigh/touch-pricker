'use strict';

const path = require('path');
const Module = require('webpack').Module;
const { OriginalSource, RawSource } = require("webpack-sources");

class PrickerModule extends Module {
    constructor(context, request) {
        super('javascript/dynamic', null);

        this.context = context;
        this.request = request;

        const srcPath = path.resolve(__dirname, '..', 'src');
        const modulePath = path.resolve(this.context, this.request);
        this.relativePath = path.relative(srcPath, modulePath);
        this.objectLookup = this.relativePath.split(path.sep).join('.');
    }

    libIdent() {
        return `./src/${this.relativePath}`;
    }

    chunkCondition(chunk) {
        return chunk.hasEntryModule();
    }

    identifier() {
        return `Pricker.${this.objectLookup}`;
    }

    readableIdentifier() {
        return `Pricker.${this.objectLookup}`;
    }

    needRebuild() {
        return false;
    }

    build(options, compilation, resolver, fs, callback) {
        this.built = true;
        this.buildMeta = { };
        this.buildInfo = { };
        callback();
    }

    source(dependencyTemplates, runtime) {
        const sourceString = `exports.default = Pricker.${this.objectLookup};`;
        return new RawSource(sourceString);
    }

    size() {
        return 0;
    }

    updateHash(hash) {
        hash.update(this.relativePath);
        super.updateHash(hash);
    }
}

module.exports = PrickerModule;
