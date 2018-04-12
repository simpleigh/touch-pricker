'use strict';

const path = require('path');
const PrickerModule = require('./PrickerModule');

class PrickerPlugin {
    apply(compiler) {
        compiler.hooks.compile.tap(
            'PrickerPlugin',
            ({ normalModuleFactory }) => normalModuleFactory.hooks.factory.tap(
                'PrickerPlugin',
                factory => (data, callback) => {
                    const context = data.context;
                    const request = data.dependencies[0].request;
    
                    const entry = path.resolve(
                        __dirname,
                        '..',
                        'src',
                        'index.spec.js'
                    );
                    const requestPath = path.resolve(context, request);
    
                    if (requestPath === entry) {
                        // Entry: add to bundle
                        return factory(data, callback);
                    } else if (request.match(/\.spec(\.ts)?$/)) {
                        // Spec: add to bundle
                        return factory(data, callback);
                    } else {
                        // Pricker module
                        return callback(
                            null,
                            new PrickerModule(context, request)
                        );
                    }
                }
            )
        );
    }
}

module.exports = PrickerPlugin;
