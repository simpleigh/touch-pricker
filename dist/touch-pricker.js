;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Pricker = factory();
  }
}(this, function() {
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 * @version 1.1.0
 */
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="Notifiable.ts" />
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="TemplateContext.ts" />
var Pricker;
(function (Pricker) {
    /**
     * Mixin that provides print functionality via templates
     *
     * A `Template` is a function that takes a [[TemplateContext]] and produces
     * a string rendering of that context.
     * Templates are precompiled using the
     * [doT.js](https://olado.github.io/doT/) template precompiler and then
     * stored in [[Templates]].
     * Each template is associated with a class and expects to render objects of
     * that class, with the instance being passed via the context.
     *
     * This mixin makes it easy to make a class printable using the following
     * steps:
     *
     * 1. Add `implements PrintableMixin` to the target class.
     *    This enables the compiler to check all dependencies have been added.
     *
     * 2. Declare a [[print]] function as follows:
     *    ```
     *    public print: (t: string, c?: TemplateContext) => string;
     *    ```
     *
     * 3. Define a [[templatePath]].
     *    If a class' templates live under `src/_templates/Apple/Banana` then
     *    the `templatePath` would be defined as:
     *    ```
     *    public readonly templatePath: string = 'Apple.Banana';
     *    ```
     *
     * 4. Call [[PrintableMixin.makePrintable]] to bind the implementation of
     *    [[print]].
     *    For our `Banana` class this would be done as follows:
     *    ```
     *    PrintableMixin.makePrintable(Banana);
     *    ```
     *
     * 5. (Optionally) check that everything has worked by extending the new
     *    class' spec. Reference the [[PrintableMixin]] spec:
     *    ```
     *    /// <reference path="PrintableMixin.spec.ts" />
     *    ```
     *    ... and then call the test function:
     *    ```
     *    describe('Banana class', () => {
     *        testPrintableMixinImplementation(() => new Banana());
     *    });
     *    ```
     *    The test function takes a single parameter which is a function that
     *    creates the class to be tested.
     */
    var PrintableMixin = /** @class */ (function () {
        function PrintableMixin() {
        }
        /**
         * Renders the object with a template.
         * Takes the name of the template and a [[TemplateContext]], adding the
         * object instance to the context before executing the template.
         * Uses the [[templatePath]] to find a template with the provided
         * template name.
         * A template at `src/_templates/Class/template.dot` would be found
         * using the `templateName` of `'template.dot'` assuming a
         * [[templatePath]] of `'Class'`.
         */
        PrintableMixin.prototype.print = function (templateName, context) {
            if (context === void 0) { context = {}; }
            templateName = this.templatePath + '.' + templateName;
            return Pricker.Templates[templateName](__assign({}, context, { 'object': this }));
        };
        /**
         * Binds print functionality to a class.
         * Takes a constructor and fills in the [[print]] implementation.
         */
        PrintableMixin.makePrintable = function (cls) {
            cls.prototype.print = PrintableMixin.prototype.print;
        };
        return PrintableMixin;
    }());
    Pricker.PrintableMixin = PrintableMixin;
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="Bell.ts" />
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
var Pricker;
(function (Pricker) {
    /**
     * Matches the number of bells to the name of each stage
     */
    var Stage;
    (function (Stage) {
        Stage[Stage["Triples"] = 7] = "Triples";
        Stage[Stage["Caters"] = 9] = "Caters";
        Stage[Stage["Cinques"] = 11] = "Cinques";
        Stage[Stage["Sextuples"] = 13] = "Sextuples";
        Stage[Stage["Septuples"] = 15] = "Septuples";
    })(Stage = Pricker.Stage || (Pricker.Stage = {}));
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="Bell.ts" />
/// <reference path="Row" />
/// <reference path="Stage" />
var Pricker;
(function (Pricker) {
    /**
     * Converts a string into a [[Row]].
     *
     * Tries to convert a string representation of a row into a row on a
     * particular stage.
     * If any bells are missing from the input string then these will be added
     * in order at the end of the row.
     * An exception is thrown if:
     *  - The input string is too long for the stage
     *  - A character is repeated in the input string
     *  - A character doesn't represent a bell on the current stage
     *
     * ```
     * > Pricker.rowFromString('231', Pricker.Stage.Cinques);
     * [2, 3, 1, 4, 5, 6, 7, 8, 9, 0, 11]
     * ```
     */
    function rowFromString(input, stage) {
        var bellSymbolsMap = {
            '1': 1, '2': 2, '3': 3, '4': 4, '5': 5,
            '6': 6, '7': 7, '8': 8, '9': 9, '0': 10,
            'E': 11, 'T': 12, 'A': 13, 'B': 14, 'C': 15
        }, bellsSeen = [], output = [];
        var bellNumber, inputIndex;
        input = input.toUpperCase();
        if (input.length > stage) {
            throw new Error('Row too long');
        }
        // Build a table to record when we've seen each bell
        for (bellNumber = 1; bellNumber <= stage; bellNumber += 1) {
            bellsSeen[bellNumber] = false;
        }
        for (inputIndex = 0; inputIndex < input.length && inputIndex < stage; inputIndex += 1) {
            bellNumber = bellSymbolsMap[input.charAt(inputIndex)];
            if (bellNumber && bellNumber <= stage) {
                if (bellsSeen[bellNumber]) {
                    throw new Error('Bell repeated');
                }
                output.push(bellNumber);
                bellsSeen[bellNumber] = true;
            }
            else {
                throw new Error('Unknown bell');
            }
        }
        if (input.length < stage) {
            for (bellNumber = 1; bellNumber <= stage; bellNumber += 1) {
                if (!bellsSeen[bellNumber]) {
                    output.push(bellNumber);
                }
            }
        }
        return output;
    }
    Pricker.rowFromString = rowFromString;
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="Row.ts" />
var Pricker;
(function (Pricker) {
    /**
     * Converts a [[Row]] into a string.
     */
    function stringFromRow(row) {
        var bellSymbols = ' 1234567890ETABC', bellCharacters = [];
        for (var _i = 0, row_1 = row; _i < row_1.length; _i++) {
            var bell = row_1[_i];
            bellCharacters.push(bellSymbols.charAt(bell));
        }
        return bellCharacters.join('');
    }
    Pricker.stringFromRow = stringFromRow;
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/* Don't reference AbstractSix or this leads to compilation errors... */
/// <reference path="../Row.ts" />
/// <reference path="../rowFromString.ts" />
/// <reference path="../stringFromRow.ts" />
var Pricker;
(function (Pricker) {
    /**
     * Visitor classes to analyse blocks
     *
     * Any [[AbstractBlock]] can [[accept]] a visitor that will process their
     * [[Row]]s (An [[AbstractContainer]] recursively calls contained blocks in
     * turn to make sure all rows are reached).
     *
     * Visitors process each row in turn in the order they would be rung.
     * They take action for each row, probably modifying some internal state
     * based on the rows that they receive.
     * They stop processing rows if rounds is reached.
     *
     * There's no way to reset a visitor: create a new one in order to complete
     * a fresh analysis.
     *
     * @preferred
     */
    var Visitor;
    (function (Visitor) {
        /**
         * Base class for all visitors
         *
         * Defers to derived classes in order to process rows, but does check
         * whether rounds has been reached and stops processing at that point.
         */
        var AbstractVisitor = /** @class */ (function () {
            function AbstractVisitor() {
                /**
                 * Whether or not we're still processing rows.
                 * Defaults to `true` (processing rows), but is set to `false` once
                 * rounds has been visited.
                 */
                this._visiting = true;
            }
            /**
             * Visits a row.
             * If we're still visiting (i.e. rounds hasn't been reached) then
             * we pass that row to derived classes for processing.
             */
            AbstractVisitor.prototype.visit = function (row, six) {
                if (!this._rounds) {
                    this._rounds = Pricker.stringFromRow(Pricker.rowFromString('', row.length));
                }
                if (this._visiting) {
                    this.visitImplementation(row, six);
                    if (Pricker.stringFromRow(row) === this._rounds) {
                        this._visiting = false;
                    }
                }
                return this;
            };
            /**
             * Reports whether rows are still being processed by providing
             * public access to [[_visiting]].
             */
            AbstractVisitor.prototype.isVisiting = function () {
                return this._visiting;
            };
            return AbstractVisitor;
        }());
        Visitor.AbstractVisitor = AbstractVisitor;
    })(Visitor = Pricker.Visitor || (Pricker.Visitor = {}));
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="BlockOwnership.ts" />
/// <reference path="Notifiable.ts" />
/// <reference path="PrintableMixin.ts"/>
/// <reference path="Row.ts" />
/// <reference path="TemplateContext.ts" />
/// <reference path="Visitor/Abstract.ts" />
var Pricker;
(function (Pricker) {
    /**
     * Abstract class representing blocks of rows
     *
     * A block:
     *  - is initialised from a row
     *  - provides access to the last row in the block
     *  - recalculates that row if the initial row is changed
     *  - provides mechanisms for controlling how the last row is created
     *  - notifies any parent block whenever those mechanisms are actuated
     *
     * Blocks are designed to be aggregated into containers.
     * Containers notify blocks of changes by setting a new initial row.
     * Blocks notify containers of changes via a callback (receiveNotification).
     */
    var AbstractBlock = /** @class */ (function () {
        /**
         * Constructor
         * @param initialRow  initial row for the block
         * @param ownership   ownership of this block
         */
        function AbstractBlock(initialRow, _ownership) {
            this._ownership = _ownership;
            /**
             * Path for this class' templates
             */
            this.templatePath = 'AbstractBlock';
            this._initialRow = initialRow.slice();
        }
        /**
         * Read access to the initial row
         */
        AbstractBlock.prototype.getInitialRow = function () {
            return this._initialRow.slice();
        };
        /**
         * Write access to the initial row
         */
        AbstractBlock.prototype.setInitialRow = function (initialRow) {
            this._initialRow = initialRow.slice();
            this.calculate();
            return this;
        };
        /**
         * Updates references to the parent container
         */
        AbstractBlock.prototype.setOwnership = function (ownership) {
            this._ownership = ownership;
            return this;
        };
        /**
         * Allows public access to the container
         */
        AbstractBlock.prototype.getContainer = function () {
            return this._ownership ? this._ownership.container : undefined;
        };
        /**
         * Allows public access to the index
         */
        AbstractBlock.prototype.getIndex = function () {
            return this._ownership ? this._ownership.index : undefined;
        };
        /**
         * Clears references to the parent container
         */
        AbstractBlock.prototype.clearOwnership = function () {
            this._ownership = undefined;
            return this;
        };
        /**
         * Notifies the parent container
         *
         * Derived classes should call this whenever the last row changes.
         */
        AbstractBlock.prototype.notifyContainer = function () {
            if (this._ownership) {
                this._ownership.container.notify(this._ownership.index);
            }
        };
        return AbstractBlock;
    }());
    Pricker.AbstractBlock = AbstractBlock;
    Pricker.PrintableMixin.makePrintable(AbstractBlock);
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="AbstractBlock.ts" />
/// <reference path="Notifiable.ts" />
/// <reference path="Row.ts" />
/// <reference path="Visitor/Abstract.ts" />
var Pricker;
(function (Pricker) {
    /**
     * Abstract class representing containers for blocks of rows
     *
     * Containers are blocks that contain other blocks.
     * Like blocks, containers:
     *  - are initialised from a row
     *  - provide access to the last row in the container
     *  - etc.
     * In addition to this containers propagate changes between child blocks.
     */
    var AbstractContainer = /** @class */ (function (_super) {
        __extends(AbstractContainer, _super);
        function AbstractContainer() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Blocks within the container
             */
            _this._blocks = [];
            return _this;
        }
        /* AbstractBlock methods **********************************************/
        /**
         * Does any calculation needed by the block
         */
        AbstractContainer.prototype.calculate = function () {
            this.propagateBlocks();
        };
        /**
         * Returns the last row in the block
         * e.g. a course head or a course end (for Stedman)
         */
        AbstractContainer.prototype.getLast = function () {
            if (this._blocks.length) {
                return this._blocks[this._blocks.length - 1].getLast();
            }
            // Handle case with zero blocks
            return this._initialRow.slice();
        };
        /**
         * Receives a visitor that will be called to process each row
         */
        AbstractContainer.prototype.accept = function () {
            var visitors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                visitors[_i] = arguments[_i];
            }
            for (var _a = 0, _b = this._blocks; _a < _b.length; _a++) {
                var block = _b[_a];
                for (var _c = 0, visitors_1 = visitors; _c < visitors_1.length; _c++) {
                    var visitor = visitors_1[_c];
                    block.accept(visitor);
                }
            }
            return this;
        };
        /**
         * Estimates the number of rows in the block
         * The estimate doesn't take into account coming round part-way through
         */
        AbstractContainer.prototype.estimateRows = function () {
            var rows = 0;
            for (var _i = 0, _a = this._blocks; _i < _a.length; _i++) {
                var block = _a[_i];
                rows += block.estimateRows();
            }
            return rows;
        };
        /* Notifiable methods *************************************************/
        /**
         * Receives a notification from a block that has changed
         * @param index  index of changed block in container
         */
        AbstractContainer.prototype.notify = function (index) {
            this.propagateBlocks(index);
            this.notifyContainer();
        };
        /* AbstractContainer methods ******************************************/
        /**
         * Propagates data between blocks within the container
         * @param index  where to start when recalculating
         */
        AbstractContainer.prototype.propagateBlocks = function (index) {
            if (index === void 0) { index = 0; }
            // Handle first block
            if (!index && this.getLength()) {
                this.propagateFirstBlock(this._blocks[0]);
                index = 1;
            }
            for (; index < this.getLength(); index += 1) {
                this.propagateCurrentBlock(this._blocks[index - 1], this._blocks[index]);
            }
        };
        /**
         * Propagates data from a previous block to a current block
         */
        AbstractContainer.prototype.propagateCurrentBlock = function (previous, current) {
            current.setInitialRow(previous.getLast());
        };
        /**
         * Propagates data for the first block within the container
         * Handled as a special case to allow for e.g. Stedman starts
         */
        AbstractContainer.prototype.propagateFirstBlock = function (first) {
            first.setInitialRow(this._initialRow);
        };
        /**
         * Read access to the length
         */
        AbstractContainer.prototype.getLength = function () {
            return this._blocks.length;
        };
        /**
         * Read access to the blocks
         *
         * Derived classes should provide public access via a more
         * suitably-named method
         */
        AbstractContainer.prototype.getBlocks = function () {
            return this._blocks.slice();
        };
        /**
         * Read access to a block
         *
         * Derived classes should provide public access via a more
         * suitably-named method
         */
        AbstractContainer.prototype.getBlock = function (index) {
            if (index < 1 || index > this.getLength()) {
                throw new Error('Block index out of range');
            }
            return this._blocks[index - 1];
        };
        return AbstractContainer;
    }(Pricker.AbstractBlock));
    Pricker.AbstractContainer = AbstractContainer;
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
var Pricker;
(function (Pricker) {
    /**
     * Types of call
     * @enum {number}
     */
    var Call;
    (function (Call) {
        Call[Call["Plain"] = 0] = "Plain";
        Call[Call["Bob"] = 1] = "Bob";
        Call[Call["Single"] = 2] = "Single";
    })(Call = Pricker.Call || (Pricker.Call = {}));
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="Bell.ts" />
/// <reference path="Call.ts" />
/// <reference path="Row.ts" />
var Pricker;
(function (Pricker) {
    /**
     * Simple functions to permute rows
     */
    var Changes;
    (function (Changes) {
        /**
         * Helper function to swap two bells
         */
        function swapPair(row, index) {
            var bell;
            bell = row[index];
            row[index] = row[index + 1];
            row[index + 1] = bell;
        }
        /**
         * Notation <1>
         */
        function permute1(row) {
            var index;
            for (index = 1; index < row.length - 1; index += 2) {
                swapPair(row, index);
            }
        }
        Changes.permute1 = permute1;
        /**
         * Notation <3>
         */
        function permute3(row) {
            var index;
            swapPair(row, 0);
            for (index = 3; index < row.length - 1; index += 2) {
                swapPair(row, index);
            }
        }
        Changes.permute3 = permute3;
        /**
         * Notation <n>
         */
        function permuteN(row) {
            var index;
            for (index = 0; index < row.length - 1; index += 2) {
                swapPair(row, index);
            }
        }
        Changes.permuteN = permuteN;
        /**
         * Notation <9> for Cinques
         */
        function permuteBob(row) {
            permuteSingle(row);
            swapPair(row, row.length - 2);
        }
        Changes.permuteBob = permuteBob;
        /**
         * Notation <90E> for Cinques
         */
        function permuteSingle(row) {
            var index;
            for (index = 0; index < row.length - 3; index += 2) {
                swapPair(row, index);
            }
        }
        Changes.permuteSingle = permuteSingle;
        /**
         * Notation dependent on call
         */
        function permuteCall(row, call) {
            if (call === Pricker.Call.Plain) {
                Changes.permuteN(row);
            }
            else if (call === Pricker.Call.Bob) {
                Changes.permuteBob(row);
            }
            else if (call === Pricker.Call.Single) {
                Changes.permuteSingle(row);
            }
        }
        Changes.permuteCall = permuteCall;
    })(Changes = Pricker.Changes || (Pricker.Changes = {}));
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
var Pricker;
(function (Pricker) {
    /**
     * Types of six
     * @enum {number}
     */
    var SixType;
    (function (SixType) {
        SixType[SixType["Slow"] = 0] = "Slow";
        SixType[SixType["Quick"] = 1] = "Quick";
    })(SixType = Pricker.SixType || (Pricker.SixType = {}));
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="AbstractBlock.ts" />
/// <reference path="BlockOwnership.ts" />
/// <reference path="Call.ts" />
/// <reference path="Changes.ts" />
/// <reference path="Row.ts" />
/// <reference path="SixType" />
var Pricker;
(function (Pricker) {
    /**
     * Base class for sixes
     */
    var AbstractSix = /** @class */ (function (_super) {
        __extends(AbstractSix, _super);
        /**
         * Constructor
         */
        function AbstractSix(initialRow, _ownership) {
            var _this = _super.call(this, initialRow, _ownership) || this;
            _this._ownership = _ownership;
            /**
             * Call used to start the six
             */
            _this._call = Pricker.Call.Plain;
            /* PrintableMixin methods *********************************************/
            /**
             * Path for this class' templates
             */
            _this.templatePath = 'AbstractSix';
            _this.calculate();
            return _this;
        }
        /* AbstractBlock methods **********************************************/
        /**
         * Does any calculation needed by the block
         */
        AbstractSix.prototype.calculate = function () {
            this._end = this._initialRow.slice(); // Create new array
            Pricker.Changes.permuteCall(this._end, this._call);
            this.applySixTransposition();
        };
        /**
         * Returns the last row in the block (the six end)
         */
        AbstractSix.prototype.getLast = function () {
            return this._end.slice();
        };
        /**
         * Estimates the number of rows in the block
         * The estimate doesn't take into account coming round part-way through
         */
        AbstractSix.prototype.estimateRows = function () {
            return 6;
        };
        /* AbstractSix methods ************************************************/
        /**
         * Returns the six head
         */
        AbstractSix.prototype.getHead = function () {
            var start = this._initialRow.slice();
            Pricker.Changes.permuteCall(start, this._call);
            return start;
        };
        /**
         * Returns the six end
         */
        AbstractSix.prototype.getEnd = function () {
            return this.getLast();
        };
        /**
         * Read access to the call
         */
        AbstractSix.prototype.getCall = function () {
            return this._call;
        };
        /**
         * Write access to the call
         */
        AbstractSix.prototype.setCall = function (call, update) {
            if (update === void 0) { update = true; }
            this._call = call;
            if (update) {
                this.calculate();
                this.notifyContainer();
            }
            return this;
        };
        /**
         * Toggles the call type between Plain -> Bob -> Single -> Plain
         */
        AbstractSix.prototype.toggleCall = function () {
            var call = (this._call + 1) % 3;
            this.setCall(call);
            return call;
        };
        return AbstractSix;
    }(Pricker.AbstractBlock));
    Pricker.AbstractSix = AbstractSix;
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="AbstractBlock.ts" />
/// <reference path="Notifiable.ts" />
var Pricker;
(function (Pricker) {
    /**
     * A block directory
     * Files information about blocks in a touch, indexed by their location
     */
    var BlockDirectory = /** @class */ (function () {
        function BlockDirectory() {
            /**
             * The directory itself
             */
            this._directory = [];
        }
        BlockDirectory.prototype.add = function (param) {
            var indices = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                indices[_i - 1] = arguments[_i];
            }
            var directory, finalIndex;
            if (typeof param === 'object') {
                indices = BlockDirectory.getIndices(param);
            }
            else {
                indices.unshift(param);
            }
            finalIndex = indices.pop();
            if (!finalIndex) {
                throw new Error('Bad ownership: must have at least one index');
            }
            directory = this._directory;
            for (var _a = 0, indices_1 = indices; _a < indices_1.length; _a++) {
                var index = indices_1[_a];
                if (!directory[index]) {
                    directory[index] = [];
                }
                directory = directory[index];
            }
            directory[finalIndex] = true;
            return this;
        };
        BlockDirectory.prototype.contains = function (param) {
            var indices = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                indices[_i - 1] = arguments[_i];
            }
            var directory;
            if (typeof param === 'object') {
                indices = BlockDirectory.getIndices(param);
            }
            else {
                indices.unshift(param);
            }
            directory = this._directory;
            for (var _a = 0, indices_2 = indices; _a < indices_2.length; _a++) {
                var index = indices_2[_a];
                if (!directory[index]) {
                    return false;
                }
                directory = directory[index];
            }
            return true;
        };
        /**
         * Computes an array of ownership indices for block
         */
        BlockDirectory.getIndices = function (block) {
            var ownershipArray = [];
            var container, index;
            index = block.getIndex();
            container = block.getContainer();
            if (!container) {
                throw new Error('Bad ownership: block has no container');
            }
            while (container instanceof Pricker.AbstractBlock) {
                if (!index) {
                    throw new Error('Bad ownership: container but no index');
                }
                ownershipArray.unshift(index);
                index = container.getIndex();
                container = container.getContainer();
            }
            return ownershipArray;
        };
        /**
         * Checks whether the index is empty
         */
        BlockDirectory.prototype.isEmpty = function () {
            return !this._directory.length;
        };
        return BlockDirectory;
    }());
    Pricker.BlockDirectory = BlockDirectory;
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="AbstractBlock.ts" />
/// <reference path="AbstractContainer.ts" />
/// <reference path="BlockOwnership.ts" />
/// <reference path="Row.ts" />
var Pricker;
(function (Pricker) {
    /**
     * Abstract container that manages a series of child blocks
     *
     * Child blocks are managed by changing the length of the container.
     * Might be used to represent a course of Stedman or a single method.
     */
    var SerialContainer = /** @class */ (function (_super) {
        __extends(SerialContainer, _super);
        /**
         * Constructor
         *
         * Extends the AbstractBlock container to create contained blocks.
         */
        function SerialContainer(initialRow, _ownership) {
            var _this = _super.call(this, initialRow, _ownership) || this;
            _this._ownership = _ownership;
            _this.extend(_this.getDefaultLength(initialRow));
            return _this;
        }
        /* SerialContainer methods ********************************************/
        /**
         * Extends the container by adding the specified number of blocks
         * @param blocks  blocks to add
         */
        SerialContainer.prototype.extend = function (blocks) {
            var oldLength = this.getLength(), newLength = oldLength + blocks;
            var index, initialRow = this.getLast();
            for (index = oldLength + 1; index <= newLength; index += 1) {
                this._blocks[index - 1] = this.createBlock(initialRow, index);
                initialRow = this._blocks[index - 1].getLast();
            }
            return this;
        };
        /**
         * Returns the default length of new containers of this type
         *
         * Derived classes should override this method if required.
         */
        SerialContainer.prototype.getDefaultLength = function (initialRow) {
            return 1;
        };
        /**
         * Write access to the length
         */
        SerialContainer.prototype.setLength = function (length) {
            if ((length < this.minLength) || (length > this.maxLength)) {
                throw new Error('Length out of range');
            }
            if (length > this.getLength()) {
                this.extend(length - this.getLength());
            }
            else {
                this._blocks = this._blocks.slice(0, length);
            }
            this.notifyContainer();
            return this;
        };
        /**
         * Write access to the length: ignores out-of-range values
         */
        SerialContainer.prototype.safeSetLength = function (length) {
            length = Math.max(length, this.minLength);
            length = Math.min(length, this.maxLength);
            return this.setLength(length);
        };
        return SerialContainer;
    }(Pricker.AbstractContainer));
    Pricker.SerialContainer = SerialContainer;
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="AbstractSix.ts" />
/// <reference path="Call.ts" />
/// <reference path="Row.ts" />
/// <reference path="SerialContainer.ts" />
/// <reference path="SixType.ts" />
var Pricker;
(function (Pricker) {
    /**
     * A course, being a set of sixes
     */
    var Course = /** @class */ (function (_super) {
        __extends(Course, _super);
        function Course() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Type of the first six
             */
            _this._firstSixType = Pricker.SixType.Slow;
            /* PrintableMixin methods *********************************************/
            /**
             * Path for this class' templates
             */
            _this.templatePath = 'Course';
            /**
             * Lower limit on length for the particular concrete class
             */
            _this.minLength = 2;
            /**
             * Upper limit on length for the particular concrete class
             */
            _this.maxLength = 60;
            /* Course methods *****************************************************/
            /**
             * Returns the course end
             */
            _this.getEnd = _this.getLast;
            /**
             * Read access to the sixes
             */
            _this.getSixes = _this.getBlocks;
            /**
             * Read access to a six
             */
            _this.getSix = _this.getBlock;
            return _this;
        }
        /* SerialContainer methods ********************************************/
        /**
         * Returns the default length of new containers of this type
         *
         * Derived classes should override this method if required.
         */
        Course.prototype.getDefaultLength = function (initialRow) {
            return initialRow.length * 2;
        };
        /**
         * Creates a new block for the container
         *
         * Used by extend() when creating the container or increasing its
         * length.
         * @param initialRow  initial row for the block
         * @param index       index of block in container
         */
        Course.prototype.createBlock = function (initialRow, index) {
            return ((this._firstSixType || Pricker.SixType.Slow) + index) % 2
                ? new Pricker.Slow(initialRow, { 'container': this, 'index': index })
                : new Pricker.Quick(initialRow, { 'container': this, 'index': index });
        };
        /**
         * Read access to the type of the first six
         */
        Course.prototype.getFirstSixType = function () {
            return this._firstSixType;
        };
        /**
         * Write access to the type of the first six
         */
        Course.prototype.setFirstSixType = function (type) {
            if (this._firstSixType === type) {
                return this; // nothing to do
            }
            this._firstSixType = type;
            // Create a new array of sixes with the correct parity
            var initialRow = this._initialRow;
            var newSixes = [];
            for (var index = 1; index <= this.getLength(); index += 1) {
                var block = this.createBlock(initialRow, index);
                block.setCall(this.getSix(index).getCall(), false);
                newSixes.push(block);
                initialRow = newSixes[index - 1].getLast();
            }
            this._blocks = newSixes;
            // ... and trigger one at the end
            if (newSixes.length) {
                this.getSix(1).setCall(this.getSix(1).getCall());
            }
            return this;
        };
        /**
         * Resets the course to be the default length
         */
        Course.prototype.resetLength = function () {
            this.setLength(this.getDefaultLength(this._initialRow));
            return this;
        };
        /**
         * Makes the course into a plain course
         */
        Course.prototype.resetCalls = function () {
            for (var _i = 0, _a = this._blocks; _i < _a.length; _i++) {
                var six = _a[_i];
                six.setCall(Pricker.Call.Plain, false); // Avoid multiple updates...
            }
            // ... and trigger one at the end
            this.getSix(1).setCall(Pricker.Call.Plain);
            return this;
        };
        /**
         * Checks whether this is a plain course
         */
        Course.prototype.isPlain = function () {
            for (var _i = 0, _a = this._blocks; _i < _a.length; _i++) {
                var six = _a[_i];
                if (six.getCall()) {
                    return false;
                }
            }
            return true;
        };
        /**
         * Clones the course
         */
        Course.prototype.clone = function () {
            var cloned = new Course(this._initialRow);
            cloned.setLength(this.getLength());
            cloned.setFirstSixType(this.getFirstSixType());
            // Copy across all the calls
            for (var index = 1; index <= this.getLength(); index += 1) {
                cloned.getSix(index).setCall(this.getSix(index).getCall(), false);
            }
            // ... and trigger one at the end
            cloned.getSix(1).setCall(this.getSix(1).getCall());
            return cloned;
        };
        /**
         * Creates a new course from a string representation
         */
        Course.fromString = function (initialRow, input) {
            var course = new Course(initialRow), patCourseEnd = '[0-9a-z]{3,15}', patCall = '(?:\\d{1,2}|\\d{1,2}s|s\\d{1,2})', patSep = '[\\s.,]+', patCalling = patCall + '(?:' + patSep + patCall + ')*', patSixes = '\\((\\d{1,2})[^\\d\\)]*\\)', patAll = ''
                + '^\\s*'
                + '(?:' + patCourseEnd + '\\s+)?'
                + '(' + patCalling + '|p)' // group 1
                + '(?:\\s+' + patSixes + ')?' // group 2 in here
                + '\\s*$', rxAll = new RegExp(patAll, 'i'), matches = rxAll.exec(input);
            var calls, i, call;
            if (!matches) {
                throw new Error('Cannot import course');
            }
            // Second group matches length of course
            if (matches[2]) {
                course.setLength(parseInt(matches[2]));
            }
            // If this is a plain course then our job is done
            if (matches[1] === 'p') {
                return course;
            }
            // Otherwise split up the calling and process
            calls = matches[1].split(new RegExp(patSep));
            for (i = 0; i < calls.length; i += 1) {
                call = calls[i];
                if (call.charAt(0) === 's') {
                    call = call.slice(1);
                    course.getSix(parseInt(call)).setCall(Pricker.Call.Single);
                }
                else if (call.slice(-1) === 's') {
                    call = call.slice(0, -1);
                    course.getSix(parseInt(call)).setCall(Pricker.Call.Single);
                }
                else {
                    course.getSix(parseInt(call)).setCall(Pricker.Call.Bob);
                }
            }
            return course;
        };
        return Course;
    }(Pricker.SerialContainer));
    Pricker.Course = Course;
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="AbstractSix.ts" />
/// <reference path="Changes.ts" />
/// <reference path="SixType" />
/// <reference path="Visitor/Abstract.ts" />
var Pricker;
(function (Pricker) {
    /**
     * A quick six
     */
    var Quick = /** @class */ (function (_super) {
        __extends(Quick, _super);
        function Quick() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Type of the six
             */
            _this.type = Pricker.SixType.Quick;
            _this.notation = Quick.notation;
            return _this;
        }
        /* AbstractBlock methods **********************************************/
        /**
         * Receives a visitor that will be called to process each row
         */
        Quick.prototype.accept = function () {
            var visitors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                visitors[_i] = arguments[_i];
            }
            var row = this.getInitialRow();
            for (var _a = 0, visitors_2 = visitors; _a < visitors_2.length; _a++) {
                var visitor = visitors_2[_a];
                Pricker.Changes.permuteCall(row, this._call);
                visitor.visit(row, this);
                Pricker.Changes.permute1(row);
                visitor.visit(row, this);
                Pricker.Changes.permute3(row);
                visitor.visit(row, this);
                Pricker.Changes.permute1(row);
                visitor.visit(row, this);
                Pricker.Changes.permute3(row);
                visitor.visit(row, this);
                visitor.visit(this._end, this);
            }
            return this;
        };
        /* AbstractSix methods ************************************************/
        /**
         * Transposes the front three bells depending upon the type of six
         */
        Quick.prototype.applySixTransposition = function () {
            Pricker.Changes.permute3(this._end);
        };
        /**
         * Notation (excluding call)
         */
        Quick.notation = ['1', '3', '1', '3', '1'];
        return Quick;
    }(Pricker.AbstractSix));
    Pricker.Quick = Quick;
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="AbstractBlock.ts" />
/// <reference path="AbstractContainer.ts" />
var Pricker;
(function (Pricker) {
    /**
     * Abstract container that allows random insertion of child blocks
     *
     * Child blocks may be inserted or removed anywhere within the container.
     * Might be used to represent a touch of Stedman or a course of spliced.
     */
    var RandomAccessContainer = /** @class */ (function (_super) {
        __extends(RandomAccessContainer, _super);
        function RandomAccessContainer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /* RandomAccessContainer methods **************************************/
        /**
         * Inserts a course at the specified index
         */
        RandomAccessContainer.prototype.insertBlock = function (index, block) {
            this._blocks.splice(index - 1, 0, block);
            this.fixupOwnership(index);
            this.notify(index - 1);
            return this;
        };
        /**
         * Deletes the course at the specified index
         */
        RandomAccessContainer.prototype.deleteBlock = function (index) {
            var block = this.getBlock(index);
            this._blocks.splice(index - 1, 1);
            block.clearOwnership();
            this.fixupOwnership(index);
            this.notify(index - 1);
            return block;
        };
        /**
         * Helper to fixup ownership of blocks
         */
        RandomAccessContainer.prototype.fixupOwnership = function (index) {
            for (var i = index; i <= this.getLength(); i += 1) {
                this.getBlock(i).setOwnership({ 'container': this, 'index': i });
            }
        };
        return RandomAccessContainer;
    }(Pricker.AbstractContainer));
    Pricker.RandomAccessContainer = RandomAccessContainer;
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="AbstractSix.ts" />
/// <reference path="Changes.ts" />
/// <reference path="SixType" />
/// <reference path="Visitor/Abstract.ts" />
var Pricker;
(function (Pricker) {
    /**
     * A slow six
     */
    var Slow = /** @class */ (function (_super) {
        __extends(Slow, _super);
        function Slow() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Type of the six
             */
            _this.type = Pricker.SixType.Slow;
            _this.notation = Slow.notation;
            return _this;
        }
        /* AbstractBlock methods **********************************************/
        /**
         * Receives a visitor that will be called to process each row
         */
        Slow.prototype.accept = function () {
            var visitors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                visitors[_i] = arguments[_i];
            }
            var row = this.getInitialRow();
            for (var _a = 0, visitors_3 = visitors; _a < visitors_3.length; _a++) {
                var visitor = visitors_3[_a];
                Pricker.Changes.permuteCall(row, this._call);
                visitor.visit(row, this);
                Pricker.Changes.permute3(row);
                visitor.visit(row, this);
                Pricker.Changes.permute1(row);
                visitor.visit(row, this);
                Pricker.Changes.permute3(row);
                visitor.visit(row, this);
                Pricker.Changes.permute1(row);
                visitor.visit(row, this);
                visitor.visit(this._end, this);
            }
            return this;
        };
        /* AbstractSix methods ************************************************/
        /**
         * Transposes the front three bells depending upon the type of six
         */
        Slow.prototype.applySixTransposition = function () {
            Pricker.Changes.permute1(this._end);
        };
        /**
         * Notation (excluding call)
         */
        Slow.notation = ['3', '1', '3', '1', '3'];
        return Slow;
    }(Pricker.AbstractSix));
    Pricker.Slow = Slow;
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="AbstractBlock.ts" />
/// <reference path="Changes.ts" />
/// <reference path="PrintableMixin.ts" />
/// <reference path="Row.ts" />
/// <reference path="rowFromString.ts" />
/// <reference path="SixType.ts" />
/// <reference path="Stage.ts" />
/// <reference path="Visitor/Abstract.ts" />
var Pricker;
(function (Pricker) {
    /**
     * A start for a touch of Stedman
     */
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        /**
         * Constructor
         */
        function Start(initialRow, _ownership) {
            var _this = _super.call(this, initialRow, _ownership) || this;
            _this._ownership = _ownership;
            /* PrintableMixin methods *********************************************/
            /**
             * Path for this class' templates
             */
            _this.templatePath = 'Start';
            _this._rowIndex = 4;
            _this._sixType = Pricker.SixType.Quick;
            _this.calculate();
            return _this;
        }
        /* AbstractBlock methods **********************************************/
        /**
         * Does any calculation needed by the block
         */
        Start.prototype.calculate = function () {
            var row = this._initialRow.slice();
            this._rows = [];
            if (this._rowIndex === 6) {
                this._lastRow = row;
                return;
            }
            // Figure out what sort of change to apply
            var change = (this._rowIndex + this._sixType) % 2
                ? Pricker.Changes.permute1
                : Pricker.Changes.permute3;
            for (var i = this._rowIndex; i < 6; i += 1) {
                // Swap the change
                change = change === Pricker.Changes.permute1
                    ? Pricker.Changes.permute3
                    : Pricker.Changes.permute1;
                // Apply it and store
                change(row);
                this._rows.push(row.slice());
            }
            this._lastRow = this._rows[this._rows.length - 1];
        };
        /**
         * Returns the last row in the block
         * e.g. a lead head or a six end (for Stedman)
         */
        Start.prototype.getLast = function () {
            return this._lastRow.slice();
        };
        /**
         * Receives a visitor that will be called to process each row
         */
        Start.prototype.accept = function () {
            var visitors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                visitors[_i] = arguments[_i];
            }
            for (var _a = 0, visitors_4 = visitors; _a < visitors_4.length; _a++) {
                var visitor = visitors_4[_a];
                for (var _b = 0, _c = this._rows; _b < _c.length; _b++) {
                    var row = _c[_b];
                    visitor.visit(row);
                }
            }
            return this;
        };
        /**
         * Estimates the number of rows in the block
         * The estimate doesn't take into account coming round part-way through
         */
        Start.prototype.estimateRows = function () {
            return this._rows.length;
        };
        /* Start methods ******************************************************/
        /**
         * Provides read access to the row index
         */
        Start.prototype.getRowIndex = function () {
            return this._rowIndex;
        };
        /**
         * Provides write access to the row index
         */
        Start.prototype.setRowIndex = function (rowIndex) {
            if (rowIndex === void 0) { rowIndex = 4; }
            if (rowIndex < 1 || rowIndex > 6) {
                throw new Error('Row index out of range');
            }
            this._rowIndex = rowIndex;
            this.calculate();
            this.notifyContainer();
            return this;
        };
        /**
         * Provides read access to the six type
         */
        Start.prototype.getSixType = function () {
            return this._sixType;
        };
        /**
         * Provides write access to the six type
         */
        Start.prototype.setSixType = function (sixType) {
            if (sixType === void 0) { sixType = Pricker.SixType.Quick; }
            this._sixType = sixType;
            this.calculate();
            this.notifyContainer();
            return this;
        };
        /**
         * Sets the row index and six type from a string representation
         */
        Start.prototype.setFromString = function (input) {
            var rowIndex = null;
            var sixType = null;
            var rowIndexPatterns = {
                'first': 1, '1st': 1, '1': 1,
                'second': 2, '2nd': 2, '2': 2,
                'third': 3, '3rd': 3, '3': 3,
                'fourth': 4, '4th': 4, '4': 4,
                'fifth': 5, '5th': 5, '5': 5,
                'sixth': 6, '6th': 6, '6': 6
            };
            for (var pattern in rowIndexPatterns) {
                if (!pattern) {
                    continue;
                } // IE8 trailing comma
                var regex = new RegExp(pattern, 'i');
                if (regex.test(input)) {
                    rowIndex = rowIndexPatterns[pattern];
                }
            }
            if (/slow/i.test(input)) {
                sixType = Pricker.SixType.Slow;
            }
            if (/quick/i.test(input)) {
                sixType = Pricker.SixType.Quick;
            }
            if (rowIndex === null) {
                throw new Error('Could not determine row index');
            }
            if (sixType === null) {
                throw new Error('Could not determine six type');
            }
            this._rowIndex = rowIndex;
            this._sixType = sixType;
            this.calculate();
            this.notifyContainer();
            return this;
        };
        return Start;
    }(Pricker.AbstractBlock));
    Pricker.Start = Start;
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="TemplateContext.ts" />
var Pricker;
(function (Pricker) {
    /**
     * Container for templates
     *
     * Dictionary of template functions that map data to a string
     */
    // tslint:disable-next-line:variable-name
    Pricker.Templates = {};
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="Changes.ts" />
/// <reference path="Course.ts" />
/// <reference path="RandomAccessContainer.ts" />
/// <reference path="Row.ts" />
/// <reference path="Stage.ts" />
/// <reference path="Start.ts" />
/// <reference path="Visitor/Abstract.ts" />
var Pricker;
(function (Pricker) {
    /**
     * A touch, being a set of courses
     */
    var Touch = /** @class */ (function (_super) {
        __extends(Touch, _super);
        /**
         * Constructor
         *
         * Extends the AbstractBlock container to set up the start.
         */
        function Touch(initialRow, _ownership) {
            var _this = _super.call(this, initialRow, _ownership) || this;
            _this._ownership = _ownership;
            /* PrintableMixin methods *********************************************/
            /**
             * Path for this class' templates
             */
            _this.templatePath = 'Touch';
            /* Touch methods ******************************************************/
            /**
             * Read access to the courses
             */
            _this.getCourses = _this.getBlocks;
            /**
             * Read access to a course
             */
            _this.getCourse = _this.getBlock;
            /**
             * Inserts a course at the specified index
             */
            _this.insertCourse = _this.insertBlock;
            /**
             * Deletes the course at the specified index
             */
            _this.deleteCourse = _this.deleteBlock;
            _this._start = new Pricker.Start(initialRow, { 'container': _this, 'index': 0 });
            return _this;
        }
        /* AbstractBlock methods **********************************************/
        /**
         * Receives a visitor that will be called to process each row
         */
        Touch.prototype.accept = function () {
            var visitors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                visitors[_i] = arguments[_i];
            }
            for (var _a = 0, visitors_5 = visitors; _a < visitors_5.length; _a++) {
                var visitor = visitors_5[_a];
                this._start.accept(visitor);
            }
            return _super.prototype.accept.apply(this, visitors);
        };
        /**
         * Estimates the number of rows in the block
         * The estimate doesn't take into account coming round part-way through
         */
        Touch.prototype.estimateRows = function () {
            return this._start.estimateRows() + _super.prototype.estimateRows.call(this);
        };
        /* AbstractContainer methods ******************************************/
        /**
         * Propagates data from a previous block to a current block
         */
        Touch.prototype.propagateCurrentBlock = function (previous, current) {
            var sixType = previous.getSix(previous.getLength()).type;
            current.setInitialRow(previous.getLast());
            current.setFirstSixType((sixType + 1) % 2);
        };
        /**
         * Propagates data for the first block within the container
         * Handled as a special case to allow for e.g. Stedman starts
         */
        Touch.prototype.propagateFirstBlock = function (first) {
            var sixType = this._start.getSixType();
            first.setInitialRow(this._start.getLast());
            first.setFirstSixType((sixType + 1) % 2);
        };
        /**
         * Read access to the start
         */
        Touch.prototype.getStart = function () {
            return this._start;
        };
        /**
         * Creates a new touch from a string representation
         */
        Touch.fromString = function (input) {
            var lines = input.split('\n');
            var i, line, course, touch, start;
            // Process each input line, making text substitutions
            for (i = 0; i < lines.length; i += 1) {
                line = lines[i];
                // Drop any content after comment characters "//"
                line = line.replace(/\/\/.*$/, '');
                // Ignore a microsiril comment "/" at the start of a line
                line = line.replace(/^\//, '');
                // Skip this line if it's blank
                if (/^\s*$/.test(line)) {
                    continue;
                }
                // Store start definitions for later processing
                if (/start/i.test(line)) {
                    start = line;
                    continue;
                }
                if (!touch) {
                    // Create the touch with a stage based on the first line
                    line = line.replace(/\s/g, '');
                    if (!Pricker.Stage[line.length]) {
                        throw new Error('Cannot recognise stage');
                    }
                    touch = new Touch(Pricker.rowFromString('123', line.length));
                }
                else {
                    // Create a course for each remaining line
                    course = Pricker.Course.fromString(touch.getLast(), line);
                    touch.insertCourse(touch.getLength() + 1, course);
                }
            }
            if (!touch) {
                throw new Error('No input lines');
            }
            if (start) {
                touch.getStart().setFromString(start);
            }
            return touch;
        };
        return Touch;
    }(Pricker.RandomAccessContainer));
    Pricker.Touch = Touch;
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
var Pricker;
(function (Pricker) {
    /**
     * DOM helper utilities
     */
    var Dom;
    (function (Dom) {
        /**
         * Computes the width of an element
         */
        function getWidth(element) {
            return element.offsetWidth + 1 // Allow for fractional part
                + getMetric(element, 'marginLeft')
                + getMetric(element, 'marginRight');
        }
        Dom.getWidth = getWidth;
        /**
         * Computes the height of an element
         */
        function getHeight(element) {
            return element.offsetHeight + 1 // Allow for fractional part
                + getMetric(element, 'marginTop')
                + getMetric(element, 'marginBottom');
        }
        Dom.getHeight = getHeight;
        /**
         * Reads a style-related metric from an element
         * Designed to read dimensions of padding, margins, etc.
         * Values of "auto" are returned as zero: set explicit values in
         * stylesheets in order to avoid this.
         */
        function getMetric(element, metric) {
            var metricText;
            if (window.getComputedStyle) {
                metricText =
                    getComputedStyle(element)[metric];
            }
            else {
                metricText = element.currentStyle[metric];
            }
            return metricText === 'auto' ? 0 : parseInt(metricText) + 1;
        }
    })(Dom = Pricker.Dom || (Pricker.Dom = {}));
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="../Dom/metrics.ts" />
/// <reference path="../Stage.ts" />
/// <reference path="../Templates.ts" />
var Pricker;
(function (Pricker_1) {
    /**
     * Prickers
     * Sadly for tslint, these will shadow the top-level namespace until I can
     * think of a better name.
     */
    // tslint:disable-next-line:no-shadowed-variable
    var Pricker;
    (function (Pricker) {
        var AbstractPricker = /** @class */ (function () {
            /**
             * Constructor
             */
            function AbstractPricker(_iframe) {
                this._iframe = _iframe;
                // NOOP
            }
            /**
             * Resizes the parent iframe if one exists
             * May be overridden; default implementation uses elements that are
             * immediate children of the body element as follows:
             *  - width: sum of all elements' widths and margins
             *  - height: maximum of all elements' heights and margins
             */
            AbstractPricker.prototype.resize = function () {
                if (!this._iframe) {
                    return;
                }
                var theDoc = this._iframe.contentWindow.document;
                var elements = theDoc.body.children;
                var width = 0;
                var height = 0;
                // tslint:disable-next-line:prefer-for-of
                for (var i = 0; i < elements.length; i = i + 1) {
                    var element = elements[i];
                    width = width + Pricker_1.Dom.getWidth(element);
                    height = Math.max(height, Pricker_1.Dom.getHeight(element));
                }
                this._iframe.width = width + 'px';
                this._iframe.height = height + 'px';
            };
            /**
             * Wraps document.getElementById and adds type information
             */
            AbstractPricker.prototype.getEl = function (id) {
                var theDoc = this._iframe
                    ? this._iframe.contentWindow.document
                    : document;
                // Ignore risk elements may be null when using our own templates
                return theDoc.getElementById(id);
            };
            return AbstractPricker;
        }());
        Pricker.AbstractPricker = AbstractPricker;
    })(Pricker = Pricker_1.Pricker || (Pricker_1.Pricker = {}));
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
var Pricker;
(function (Pricker) {
    /**
     * DOM helper utilities
     */
    var Dom;
    (function (Dom) {
        /**
         * Hides a block element
         */
        function hide(element) {
            element.style.display = 'none';
            element.style.visibility = 'hidden';
        }
        Dom.hide = hide;
        /**
         * Shows a block element
         */
        function show(element) {
            element.style.display = 'block';
            element.style.visibility = 'visible';
        }
        Dom.show = show;
    })(Dom = Pricker.Dom || (Pricker.Dom = {}));
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="../PrintableMixin" />
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="../rowFromString.ts" />
/// <reference path="../Stage.ts" />
/// <reference path="../stringFromRow.ts" />
/// <reference path="MatcherInterface.ts" />
var Pricker;
(function (Pricker) {
    /**
     * Music classes to analyse rows
     */
    var Music;
    (function (Music) {
        /**
         * Abstract music matching scheme
         */
        var AbstractScheme = /** @class */ (function () {
            /**
             * Constructor
             */
            function AbstractScheme(_stage) {
                this._stage = _stage;
                /**
                 * Path for this class' templates
                 */
                this.templatePath = 'Music.AbstractScheme';
                this._matchers = this.createMatchers(Pricker.stringFromRow(Pricker.rowFromString('', _stage)));
            }
            /* MatcherInterface methods ***************************************/
            /**
             * Matches a row string
             */
            AbstractScheme.prototype.match = function (row) {
                var result = false;
                for (var _i = 0, _a = this._matchers; _i < _a.length; _i++) {
                    var matcher = _a[_i];
                    if (!matcher) {
                        continue;
                    } // IE8 trailing comma
                    // Call matcher.match explicitly...
                    var rowResult = matcher.match(row);
                    // ... not in here, or || will short-circuit it
                    result = result || rowResult;
                }
                return result;
            };
            /**
             * Provides read access to the count of matches
             */
            AbstractScheme.prototype.getMatchCount = function () {
                var matches = 0;
                for (var _i = 0, _a = this._matchers; _i < _a.length; _i++) {
                    var matcher = _a[_i];
                    if (!matcher) {
                        continue;
                    } // IE8 trailing comma
                    matches += matcher.getMatchCount();
                }
                return matches;
            };
            /**
             * Provides read access to the matchers
             */
            AbstractScheme.prototype.getMatchers = function () {
                return this._matchers.slice();
            };
            return AbstractScheme;
        }());
        Music.AbstractScheme = AbstractScheme;
        Pricker.PrintableMixin.makePrintable(AbstractScheme);
    })(Music = Pricker.Music || (Pricker.Music = {}));
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
var Pricker;
(function (Pricker) {
    /**
     * Music classes to analyse rows
     */
    var Music;
    (function (Music) {
        /**
         * Types of music matching
         * @enum {number}
         */
        var MatchType;
        (function (MatchType) {
            MatchType[MatchType["Back"] = -1] = "Back";
            MatchType[MatchType["Row"] = 0] = "Row";
            MatchType[MatchType["Front"] = 1] = "Front";
        })(MatchType = Music.MatchType || (Music.MatchType = {}));
    })(Music = Pricker.Music || (Pricker.Music = {}));
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="../TemplateContext.ts" />
/// <reference path="MatcherInterface.ts" />
/// <reference path="MatchType.ts" />
var Pricker;
(function (Pricker) {
    /**
     * Music classes to analyse rows
     */
    var Music;
    (function (Music) {
        /**
         * Pattern that can be used to match rows
         */
        var Pattern = /** @class */ (function () {
            /**
             * Constructor
             * @param pattern  string to match
             * @param name     name of this pattern
             * @param type     type of match
             */
            function Pattern(_pattern, _name, _type) {
                if (_type === void 0) { _type = Music.MatchType.Back; }
                this._pattern = _pattern;
                this._name = _name;
                this._type = _type;
                /**
                 * Count of matches
                 */
                this._matchCount = 0;
                /**
                 * Path for this class' templates
                 */
                this.templatePath = 'Music.Pattern';
                // NOOP
            }
            /* MatcherInterface methods ***************************************/
            /**
             * Matches a row string
             */
            Pattern.prototype.match = function (row) {
                if (this._type === Music.MatchType.Back) {
                    row = row.slice(-this._pattern.length);
                }
                else if (this._type === Music.MatchType.Front) {
                    row = row.slice(0, this._pattern.length);
                }
                if (row === this._pattern) {
                    this._matchCount += 1;
                    return true;
                }
                return false;
            };
            /**
             * Provides read access to the name
             */
            Pattern.prototype.getName = function () {
                if (this._name === undefined) {
                    return this._pattern;
                }
                return this._name;
            };
            /**
             * Provides read access to the count of matches
             */
            Pattern.prototype.getMatchCount = function () {
                return this._matchCount;
            };
            /* Pattern methods ************************************************/
            /**
             * Determines whether this is a wildcard match
             */
            Pattern.prototype.isWildcardMatch = function () {
                return this._type !== Music.MatchType.Row;
            };
            return Pattern;
        }());
        Music.Pattern = Pattern;
        Pricker.PrintableMixin.makePrintable(Pattern);
    })(Music = Pricker.Music || (Pricker.Music = {}));
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="../TemplateContext.ts" />
/// <reference path="MatcherInterface.ts" />
/// <reference path="Pattern.ts" />
var Pricker;
(function (Pricker) {
    /**
     * Music classes to analyse rows
     */
    var Music;
    (function (Music) {
        /**
         * Group of similar patterns to match related rows
         */
        var PatternGroup = /** @class */ (function () {
            /**
             * Constructor
             * @param name           name of this pattern group
             * @param patterns       patterns in this group
             * @param parentPattern  top-level pattern for count
             */
            function PatternGroup(_name, patterns, _parentPattern) {
                this._name = _name;
                this._parentPattern = _parentPattern;
                /**
                 * Path for this class' templates
                 */
                this.templatePath = 'Music.PatternGroup';
                this._patterns = patterns.slice();
            }
            /* MatcherInterface methods ***************************************/
            /**
             * Matches a row string
             */
            PatternGroup.prototype.match = function (row) {
                var result = false;
                for (var _i = 0, _a = this._patterns; _i < _a.length; _i++) {
                    var pattern = _a[_i];
                    if (!pattern) {
                        continue;
                    } // IE8 trailing comma
                    // Call pattern.match explicitly...
                    var rowResult = pattern.match(row);
                    // ... not in here, or || will short-circuit it
                    result = result || rowResult;
                }
                if (this._parentPattern) {
                    this._parentPattern.match(row);
                }
                return result;
            };
            /**
             * Provides read access to the name
             */
            PatternGroup.prototype.getName = function () {
                return this._name;
            };
            /**
             * Provides read access to the count of matches
             */
            PatternGroup.prototype.getMatchCount = function () {
                if (this._parentPattern) {
                    return this._parentPattern.getMatchCount();
                }
                return this.getSubmatchCount();
            };
            /* PatternGroup methods *******************************************/
            /**
             * Provides read access to the patterns
             */
            PatternGroup.prototype.getPatterns = function () {
                return this._patterns.slice();
            };
            /**
             * Provides read access to the count of matches within patterns
             */
            PatternGroup.prototype.getSubmatchCount = function () {
                var matches = 0;
                for (var _i = 0, _a = this._patterns; _i < _a.length; _i++) {
                    var pattern = _a[_i];
                    if (!pattern) {
                        continue;
                    } // IE8 trailing comma
                    matches += pattern.getMatchCount();
                }
                return matches;
            };
            return PatternGroup;
        }());
        Music.PatternGroup = PatternGroup;
        Pricker.PrintableMixin.makePrintable(PatternGroup);
    })(Music = Pricker.Music || (Pricker.Music = {}));
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/* tslint:disable:max-line-length */
/// <reference path="../Stage.ts" />
/// <reference path="AbstractScheme.ts" />
/// <reference path="MatchType.ts" />
/// <reference path="Pattern.ts" />
/// <reference path="PatternGroup.ts" />
var Pricker;
(function (Pricker) {
    /**
     * Music classes to analyse rows
     */
    var Music;
    (function (Music) {
        /**
         * MBD-style music matching scheme
         */
        var MbdScheme = /** @class */ (function (_super) {
            __extends(MbdScheme, _super);
            function MbdScheme() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /* MatcherInterface methods ***************************************/
            /**
             * Provides read access to the name
             */
            MbdScheme.prototype.getName = function () {
                return 'MBD scheme';
            };
            /* AbstractScheme methods *****************************************/
            /**
             * Create matchers for this scheme/stage
             */
            MbdScheme.prototype.createMatchers = function (rounds) {
                var matchers = [];
                var pattern, patternArray;
                // 567890E
                pattern = rounds.slice(4 - this._stage);
                matchers.push(new Music.Pattern(pattern));
                // 56789E0
                pattern = rounds.slice(4 - this._stage, -2)
                    + rounds.slice(-1)
                    + rounds.slice(-2, -1);
                matchers.push(new Music.Pattern(pattern));
                // 657890E
                pattern = '65' + rounds.slice(6 - this._stage);
                matchers.push(new Music.Pattern(pattern));
                // Near misses
                patternArray = [];
                for (var i = 0; i < this._stage - 1; i += 1) {
                    pattern = rounds.slice(0, i) // 123
                        + rounds.charAt(i + 1) // 5
                        + rounds.charAt(i) // 4
                        + rounds.slice(i + 2); // 67890E
                    patternArray.push(new Music.Pattern(pattern, rounds.charAt(i + 1) + rounds.charAt(i), Music.MatchType.Row));
                }
                matchers.push(new Music.PatternGroup('near misses', patternArray));
                // Queens music
                // tslint:disable-next-line:switch-default
                switch (this._stage) {
                    case Pricker.Stage.Triples:
                        matchers.push(new Music.PatternGroup('468', [
                            new Music.Pattern('246', '2468'),
                            new Music.Pattern('75346', '753468'),
                            new Music.Pattern('1357246', 'Queens', Music.MatchType.Row),
                            new Music.Pattern('7531246', 'Reverse Queens', Music.MatchType.Row),
                            new Music.Pattern('1275346', 'Whittingtons', Music.MatchType.Row),
                        ], new Music.Pattern('46')));
                        break;
                    case Pricker.Stage.Caters:
                        matchers.push(new Music.PatternGroup('680', [
                            new Music.Pattern('468', '4680'),
                            new Music.Pattern('97568', '975680'),
                            new Music.Pattern('135792468', 'Queens', Music.MatchType.Row),
                            new Music.Pattern('975312468', 'Reverse Queens', Music.MatchType.Row),
                            new Music.Pattern('123497568', 'Whittingtons', Music.MatchType.Row),
                        ], new Music.Pattern('68')));
                        break;
                    case Pricker.Stage.Cinques:
                        matchers.push(new Music.PatternGroup('80T', [
                            new Music.Pattern('680', '680T'),
                            new Music.Pattern('E9780', 'E9780T'),
                            new Music.Pattern('13579E24680', 'Queens', Music.MatchType.Row),
                            new Music.Pattern('E9753124680', 'Reverse Queens', Music.MatchType.Row),
                            new Music.Pattern('531246E9780', 'Double Whittingtons', Music.MatchType.Row),
                        ], new Music.Pattern('80')));
                        break;
                    case Pricker.Stage.Sextuples:
                        matchers.push(new Music.PatternGroup('0TB', [
                            new Music.Pattern('80T', '80TB'),
                            new Music.Pattern('AE90T', 'AE90TB'),
                            new Music.Pattern('13579EA24680T', 'Queens', Music.MatchType.Row),
                            new Music.Pattern('AE9753124680T', 'Reverse Queens', Music.MatchType.Row),
                        ], new Music.Pattern('0T')));
                        break;
                    case Pricker.Stage.Septuples:
                        matchers.push(new Music.PatternGroup('TB', [
                            new Music.Pattern('0TB'),
                            new Music.Pattern('CAETB'),
                            new Music.Pattern('13579EAC24680TB', 'Queens', Music.MatchType.Row),
                            new Music.Pattern('CAE9753124680TB', 'Reverse Queens', Music.MatchType.Row),
                        ], new Music.Pattern('TB')));
                        break;
                }
                matchers.push(new Music.PatternGroup('front LB5', [
                    new Music.Pattern('12345', '12345', Music.MatchType.Front),
                    new Music.Pattern('54321', '54321', Music.MatchType.Front),
                    new Music.Pattern('23456', '23456', Music.MatchType.Front),
                    new Music.Pattern('65432', '65432', Music.MatchType.Front),
                ]));
                matchers.push(new Music.PatternGroup('back LB5', [
                    new Music.Pattern('12345', '12345', Music.MatchType.Back),
                    new Music.Pattern('54321', '54321', Music.MatchType.Back),
                    new Music.Pattern('23456', '23456', Music.MatchType.Back),
                    new Music.Pattern('65432', '65432', Music.MatchType.Back),
                ]));
                matchers.push(new Music.PatternGroup('front LB4', [
                    new Music.Pattern('1234', '1234', Music.MatchType.Front),
                    new Music.Pattern('4321', '4321', Music.MatchType.Front),
                    new Music.Pattern('2345', '2345', Music.MatchType.Front),
                    new Music.Pattern('5432', '5432', Music.MatchType.Front),
                    new Music.Pattern('3456', '3456', Music.MatchType.Front),
                    new Music.Pattern('6543', '6543', Music.MatchType.Front),
                ]));
                matchers.push(new Music.PatternGroup('back LB4', [
                    new Music.Pattern('1234', '1234', Music.MatchType.Back),
                    new Music.Pattern('4321', '4321', Music.MatchType.Back),
                    new Music.Pattern('2345', '2345', Music.MatchType.Back),
                    new Music.Pattern('5432', '5432', Music.MatchType.Back),
                    new Music.Pattern('3456', '3456', Music.MatchType.Back),
                    new Music.Pattern('6543', '6543', Music.MatchType.Back),
                ]));
                // Reverse rollups
                if (this._stage === Pricker.Stage.Triples) {
                    matchers.push(new Music.PatternGroup('reverse rollups', [new Music.Pattern('7654')]));
                }
                else {
                    patternArray = [];
                    for (var i = this._stage - 8; i >= 0; i -= 1) {
                        // reverse rounds
                        pattern = rounds.split('').reverse().join('');
                        pattern = pattern.slice(i, i + 4);
                        patternArray.push(new Music.Pattern(pattern));
                    }
                    matchers.push(new Music.PatternGroup('reverse rollups', patternArray));
                }
                return matchers;
            };
            return MbdScheme;
        }(Music.AbstractScheme));
        Music.MbdScheme = MbdScheme;
    })(Music = Pricker.Music || (Pricker.Music = {}));
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="../AbstractSix.ts" />
/// <reference path="../Row.ts" />
/// <reference path="Abstract.ts" />
var Pricker;
(function (Pricker) {
    /**
     * Visitor classes to analyse blocks
     */
    var Visitor;
    (function (Visitor) {
        /**
         * Simple visitor that counts rows
         *
         * Accumulates a count of rows that is incremented by each call to
         * [[visit]].
         * This visitor allows the count of rows in a touch because rows are not
         * processed after rounds has been reached.
         */
        var Counter = /** @class */ (function (_super) {
            __extends(Counter, _super);
            function Counter() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * Count of rows that have been visited.
                 */
                _this._count = 0;
                return _this;
            }
            /**
             * Reports the count of rows by providing public access to
             * [[_count]].
             */
            Counter.prototype.getCount = function () {
                return this._count;
            };
            /* AbstractVisitor methods ****************************************/
            /**
             * Receives a row for processing.
             */
            Counter.prototype.visitImplementation = function (row, six) {
                this._count += 1;
            };
            return Counter;
        }(Visitor.AbstractVisitor));
        Visitor.Counter = Counter;
    })(Visitor = Pricker.Visitor || (Pricker.Visitor = {}));
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="../AbstractSix.ts" />
/// <reference path="../BlockDirectory.ts" />
/// <reference path="../Row.ts" />
/// <reference path="../stringFromRow.ts" />
/// <reference path="../Music/MatcherInterface.ts" />
/// <reference path="Abstract.ts" />
var Pricker;
(function (Pricker) {
    /**
     * Visitor classes to analyse blocks
     */
    var Visitor;
    (function (Visitor) {
        /**
         * Visitor for music analysis
         *
         * Matches rows using a music matcher ([[MatcherInterface]]) that can
         * report on the musical content of a touch.
         * This visitor also accumulates a [[BlockDirectory]] referencing
         * each block containing a musical row.
         */
        var Music = /** @class */ (function (_super) {
            __extends(Music, _super);
            /**
             * Creates the visitor, providing the matcher that should be used.
             * @param _matcher Matcher to be used.
             */
            function Music(_matcher) {
                var _this = _super.call(this) || this;
                _this._matcher = _matcher;
                /**
                 * Directory of musical blocks.
                 */
                _this._directory = new Pricker.BlockDirectory();
                return _this;
            }
            /**
             * Reports on musical content of a touch by providing public access
             * to [[_matcher]].
             */
            Music.prototype.getMatcher = function () {
                return this._matcher;
            };
            /**
             * Reports where music is found within a touch by providing public
             * access to [[_directory]].
             */
            Music.prototype.getDirectory = function () {
                return this._directory;
            };
            /* AbstractVisitor methods ****************************************/
            /**
             * Receives a row for processing.
             */
            Music.prototype.visitImplementation = function (row, six) {
                var matches = this._matcher.match(Pricker.stringFromRow(row));
                if (matches && six) {
                    this._directory.add(six);
                }
            };
            return Music;
        }(Visitor.AbstractVisitor));
        Visitor.Music = Music;
    })(Visitor = Pricker.Visitor || (Pricker.Visitor = {}));
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="../AbstractSix.ts" />
/// <reference path="../BlockDirectory.ts" />
/// <reference path="../Row.ts" />
/// <reference path="../stringFromRow.ts" />
/// <reference path="Abstract.ts" />
var Pricker;
(function (Pricker) {
    /**
     * Visitor classes to analyse blocks
     */
    var Visitor;
    (function (Visitor) {
        /**
         * Visitor for proving touches
         *
         * Stores the rows that have been visited and reports when whether any
         * rows were repeated.
         * This visitor also accumulates a [[BlockDirectory]] referencing
         * each block containing a false row.
         */
        var Proof = /** @class */ (function (_super) {
            __extends(Proof, _super);
            function Proof() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * Log of rows that we've seen.
                 * Rows are accumulated into a dictionary indexed by the string
                 * representation of a row (the JavaScript implementation will thus
                 * store a hash table, ensuring good performance).
                 * Each value is an array of all blocks that contain the indexed
                 * row.
                 */
                _this._rowCounts = {};
                /**
                 * Directory of false blocks.
                 */
                _this._directory = new Pricker.BlockDirectory();
                /**
                 * Flag recording truth.
                 * Truth can easily be calculated from [[_rowCounts]], but keeping a
                 * flag up-to-date is a simple optimisation to avoid iterating over
                 * this property each time we check truth.
                 */
                _this._isTrue = true;
                return _this;
            }
            /**
             * Reports the number of times each row has been processed.
             * Processes [[_rowCounts]] to convert each array of blocks into a
             * count.
             * @returns Dictionary containing the count of each row seen,
             * indexed by the string representation of that row.
             */
            Proof.prototype.getRowCounts = function () {
                var result = {};
                for (var rowString in this._rowCounts) {
                    if (this._rowCounts.hasOwnProperty(rowString)) {
                        result[rowString] = this._rowCounts[rowString].length;
                    }
                }
                return result;
            };
            /**
             * Reports on the distribution of falseness within a touch by
             * providing public access to [[_directory]].
             */
            Proof.prototype.getDirectory = function () {
                return this._directory;
            };
            /**
             * Reports whether a touch is true by providing public access to
             * [[_isTrue]].
             */
            Proof.prototype.isTrue = function () {
                return this._isTrue;
            };
            /* AbstractVisitor methods ****************************************/
            /**
             * Receives a row for processing.
             */
            Proof.prototype.visitImplementation = function (row, six) {
                var rowString = Pricker.stringFromRow(row);
                if (rowString in this._rowCounts) {
                    // Already seen - i.e. false
                    if (this._rowCounts[rowString].length === 1) {
                        // First time this row has run false
                        // need to add the previous block to the directory
                        var previousSix = this._rowCounts[rowString][0];
                        if (previousSix) {
                            this._directory.add(previousSix);
                        }
                    }
                    this._isTrue = false;
                    if (six) {
                        this._directory.add(six);
                    }
                    this._rowCounts[rowString].push(six);
                }
                else {
                    // Not seen - i.e. true
                    this._rowCounts[rowString] = [six];
                }
            };
            return Proof;
        }(Visitor.AbstractVisitor));
        Visitor.Proof = Proof;
    })(Visitor = Pricker.Visitor || (Pricker.Visitor = {}));
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="Abstract.ts" />
/// <reference path="../BlockDirectory.ts" />
/// <reference path="../Course.ts" />
/// <reference path="../Dom/showHide.ts" />
/// <reference path="../Notifiable.ts" />
/// <reference path="../PrintableMixin.ts" />
/// <reference path="../rowFromString.ts" />
/// <reference path="../Row.ts" />
/// <reference path="../SixType.ts" />
/// <reference path="../Stage.ts" />
/// <reference path="../stringFromRow.ts" />
/// <reference path="../Touch.ts" />
/// <reference path="../Music/MbdScheme.ts" />
/// <reference path="../Visitor/Counter.ts" />
/// <reference path="../Visitor/Music.ts" />
/// <reference path="../Visitor/Proof.ts" />
var Pricker;
(function (Pricker_2) {
    var Block;
    (function (Block) {
        Block[Block["Course"] = 0] = "Course";
        Block[Block["Touch"] = 1] = "Touch";
    })(Block || (Block = {}));
    /**
     * Prickers
     * Sadly for tslint, these will shadow the top-level namespace until I can
     * think of a better name.
     */
    // tslint:disable-next-line:no-shadowed-variable
    var Pricker;
    (function (Pricker) {
        /**
         * An MBD pricker
         */
        var Mbd = /** @class */ (function (_super) {
            __extends(Mbd, _super);
            function Mbd() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * Whether we're showing six heads
                 */
                _this._showSixHeads = false;
                /**
                 * Whether we're showing advanced options
                 */
                _this._showAdvancedOptions = false;
                /**
                 * Course selected in touch view
                 */
                _this._selectedIndex = 0;
                /**
                 * Path for this class' templates
                 */
                _this.templatePath = 'Pricker.Mbd';
                return _this;
            }
            /* Notifiable methods *********************************************/
            /**
             * Receives a notification from a block that has changed
             * @param index  index of changed block in container
             */
            Mbd.prototype.notify = function (index) {
                if (index === Block.Course) {
                    this._extraSixes.setInitialRow(this._course.getEnd());
                    this._copiedIndex = undefined;
                }
                else if (index === Block.Touch) {
                    this._rowCount = undefined;
                    this._proofText = undefined;
                    this._falseness = undefined;
                    this._music = undefined;
                }
                this.redraw();
            };
            /* Pricker methods ************************************************/
            Mbd.prototype.onLoad = function () {
                var option;
                for (var i = Pricker_2.Stage.Triples; i <= Pricker_2.Stage.Septuples; i += 2) {
                    option = document.createElement('option');
                    option.value = i.toString();
                    option.innerText = Pricker_2.Stage[i];
                    this.getEl('stage').appendChild(option);
                }
                this.getEl('stage').value =
                    Pricker_2.Stage.Cinques.toString();
                this.onStage();
            };
            Mbd.prototype.onStage = function () {
                this._stage =
                    parseInt(this.getEl('stage').value);
                this._initialRow = Pricker_2.rowFromString('231', this._stage);
                this._course = new Pricker_2.Course(this._initialRow, { 'container': this, 'index': Block.Course });
                this._extraSixes = new Pricker_2.Course(this._initialRow);
                this._extraSixes.setLength(8);
                this._touch = new Pricker_2.Touch(Pricker_2.rowFromString('', this._stage), { 'container': this, 'index': Block.Touch });
                this._musicScheme = new Pricker_2.Music.MbdScheme(this._stage);
                // Call notify() to clear out state from the previous touch
                this.notify(Block.Touch); // calls redraw()
                this.redrawTouch();
            };
            Mbd.prototype.redraw = function () {
                var newCourse = this._course.clone();
                var lastSix = this._course.getSix(this._course.getLength());
                this._extraSixes.setFirstSixType((lastSix.type + 1) % 2);
                this._extraSixes.setInitialRow(this._course.getEnd());
                this.getEl('sixends').innerHTML = this._course.print('mbd', {
                    'falseness': this._falseness,
                    'music': this._music,
                    'courseIndex': this._copiedIndex,
                    'extraSixes': this._extraSixes,
                    'showSixHeads': this._showSixHeads
                });
                this.getEl('calling').innerHTML = this._course.print('html');
                newCourse.setInitialRow(this._initialRow);
                newCourse.setFirstSixType(Pricker_2.SixType.Slow);
                this.getEl('callingFromRounds').innerHTML =
                    newCourse.print('html');
                this.getEl('initialRow').value =
                    Pricker_2.stringFromRow(this._course.getInitialRow());
                this.getEl('firstSix').value =
                    this._course.getFirstSixType().toString();
                if (this._showAdvancedOptions) {
                    Pricker_2.Dom.show(this.getEl('firstSixBlock'));
                }
                else {
                    Pricker_2.Dom.hide(this.getEl('firstSixBlock'));
                }
                this.getEl('courseLength').value =
                    this._course.getLength().toString();
                if (this._savedCourse) {
                    this.getEl('savedCalling').innerHTML =
                        this._savedCourse.print('html');
                }
                else {
                    this.getEl('savedCalling').innerText = 'None';
                }
                this.resize();
            };
            Mbd.prototype.redrawTouch = function () {
                this.getEl('proofResult').innerText = this._proofText || '';
                if (this._rowCount) {
                    this.getEl('numRows').innerText =
                        this._rowCount + ' Stedman ' + Pricker_2.Stage[this._stage];
                }
                else {
                    this.getEl('numRows').innerText =
                        this._touch.estimateRows() + ' changes';
                }
                this.getEl('rowIndex').value =
                    this._touch.getStart().getRowIndex().toString();
                this.getEl('sixType').value =
                    this._touch.getStart().getSixType().toString();
                if (this._showAdvancedOptions) {
                    Pricker_2.Dom.show(this.getEl('startBlock'));
                }
                else {
                    Pricker_2.Dom.hide(this.getEl('startBlock'));
                }
                this.getEl('courses').outerHTML =
                    '<select id="courses"'
                        + ' onclick="pricker.onSelectCourse()"'
                        + ' ondblclick="pricker.onCopyCourse()">'
                        + this._touch.print('select', {
                            'touchRows': this._rowCount,
                            'styleUnreached': 'color:gray',
                            'falseness': this._falseness,
                            'styleFalse': 'color:red'
                        })
                        + '</select>';
                this.getEl('courses').size = Math.max(this._touch.getLength() + 1, 2);
                this.getEl('courses').value =
                    this._selectedIndex.toString();
                this.resize();
            };
            Mbd.prototype.c = function (six) {
                this._course.getSix(six).toggleCall();
            };
            Mbd.prototype.onSetInitialRow = function () {
                var input = this.getEl('initialRow').value;
                var initialRow;
                try {
                    initialRow = Pricker_2.rowFromString(input, this._stage);
                }
                catch (e) {
                    return;
                }
                this._course.setInitialRow(initialRow);
                this.redraw();
            };
            Mbd.prototype.onResetInitialRow = function () {
                this._course.setInitialRow(this._initialRow);
                this.redraw();
            };
            Mbd.prototype.onFirstSix = function () {
                var input = this.getEl('firstSix').value;
                this._course.setFirstSixType(parseInt(input));
                this.redraw();
            };
            Mbd.prototype.onSetLength = function () {
                var input = this.getEl('courseLength').value, length = parseInt(input);
                if (length) {
                    this._course.safeSetLength(length);
                }
            };
            Mbd.prototype.onResetLength = function () {
                this._course.resetLength();
            };
            Mbd.prototype.onResetCalls = function () {
                this._course.resetCalls();
            };
            Mbd.prototype.onSaveCalling = function () {
                this._savedCourse = this._course.clone();
                this._savedCourse.setInitialRow(this._initialRow);
                this.redraw();
            };
            Mbd.prototype.onLoadCalling = function () {
                if (this._savedCourse) {
                    this._course = this._savedCourse.clone();
                    this._course.setInitialRow(this._initialRow);
                }
                else {
                    this._course = new Pricker_2.Course(this._initialRow);
                }
                this._course.setOwnership({
                    'container': this,
                    'index': Block.Course
                });
                this.redraw();
            };
            Mbd.prototype.onRowIndex = function () {
                var input = this.getEl('rowIndex').value;
                this._touch.getStart().setRowIndex(parseInt(input));
                this.redrawTouch();
            };
            Mbd.prototype.onSixType = function () {
                var input = this.getEl('sixType').value;
                this._touch.getStart().setSixType(parseInt(input));
                this.redrawTouch();
            };
            Mbd.prototype.onSelectCourse = function () {
                var input = this.getEl('courses').value;
                this._selectedIndex = parseInt(input);
            };
            Mbd.prototype.onInsertCourse = function () {
                this._selectedIndex += 1;
                this._touch.insertCourse(this._selectedIndex, this._course.clone());
                if (this.getEl('rolling').checked) {
                    var course = this._touch.getCourse(this._selectedIndex);
                    var sixType = course.getSix(course.getLength()).type;
                    this._course.setFirstSixType((sixType + 1) % 2);
                    this._course.setInitialRow(course.getEnd());
                    this._course.resetLength();
                    this._course.resetCalls();
                }
                this.redrawTouch();
            };
            Mbd.prototype.onPasteCourse = function () {
                if (this._selectedIndex) {
                    this._touch.deleteCourse(this._selectedIndex);
                    this._touch.insertCourse(this._selectedIndex, this._course.clone());
                    if (this.getEl('rolling').checked) {
                        var course = this._touch.getCourse(this._selectedIndex);
                        var sixType = course.getSix(course.getLength()).type;
                        this._course.setFirstSixType((sixType + 1) % 2);
                        this._course.setInitialRow(course.getEnd());
                        this._selectedIndex = Math.min(this._selectedIndex + 1, this._touch.getLength());
                        this._course.resetLength();
                        this._course.resetCalls();
                    }
                    this.redrawTouch();
                }
            };
            Mbd.prototype.onCopyCourse = function () {
                if (this._selectedIndex) {
                    this._course =
                        this._touch.getCourse(this._selectedIndex).clone();
                    this._course.setOwnership({
                        'container': this,
                        'index': Block.Course
                    });
                    this._copiedIndex = this._selectedIndex;
                    this.redraw();
                }
            };
            Mbd.prototype.onCutCourse = function () {
                this.onCopyCourse();
                this.onDeleteCourse();
            };
            Mbd.prototype.onDeleteCourse = function () {
                if (this._selectedIndex) {
                    this._touch.deleteCourse(this._selectedIndex);
                    this._selectedIndex = Math.min(this._selectedIndex, this._touch.getLength());
                    this.redraw();
                    this.redrawTouch();
                }
            };
            Mbd.prototype.onLoadTouch = function () {
                var input = this.getEl('loadSaveTextarea').value;
                var newTouch;
                try {
                    newTouch = Pricker_2.Touch.fromString(input);
                }
                catch (e) {
                    // Ignore
                    return;
                }
                this._stage = newTouch.getInitialRow().length;
                this.getEl('stage').value =
                    this._stage.toString();
                this.onStage();
                this._touch = newTouch;
                this._touch.setOwnership({
                    'container': this,
                    'index': Block.Touch
                });
                // Call notify() to clear out state from the previous touch
                this.notify(Block.Touch); // calls redraw()
                this.redrawTouch();
            };
            Mbd.prototype.onSaveTouch = function () {
                this.getEl('loadSaveTextarea').value =
                    this._touch.print('text');
            };
            Mbd.prototype.onGenerateSiril = function () {
                // Make sure we have the count of rows before generating
                if (!this._rowCount) {
                    this.onProve();
                }
                this.getEl('sirilTextarea').innerText =
                    this._touch.print('siril', { 'touchRows': this._rowCount });
            };
            Mbd.prototype.onAnalyseMusic = function () {
                var visitor = new Pricker_2.Visitor.Music(this._musicScheme);
                this._touch.accept(visitor);
                this.getEl('musicTextarea').innerText =
                    visitor.getMatcher().print('text');
                this._music = visitor.getDirectory();
            };
            Mbd.prototype.onShowSixHeads = function () {
                var element = this.getEl('showSixHeads');
                this._showSixHeads = element.checked;
                this.redraw();
            };
            Mbd.prototype.onShowAdvancedOptions = function () {
                var element = this.getEl('showAdvancedOptions');
                this._showAdvancedOptions = element.checked;
                this.redraw();
                this.redrawTouch();
            };
            Mbd.prototype.onProve = function () {
                var proof = new Pricker_2.Visitor.Proof(), counter = new Pricker_2.Visitor.Counter();
                this._touch.accept(proof, counter);
                this._rowCount = counter.getCount();
                this._falseness = proof.getDirectory();
                if (proof.isTrue()) {
                    if (proof.isVisiting()) {
                        this._proofText = "True, but doesn't come round";
                    }
                    else {
                        this._proofText = 'Composition is true';
                    }
                }
                else {
                    this._proofText = 'Composition is FALSE';
                }
                this.redraw();
                this.redrawTouch();
                return proof.isTrue();
            };
            Mbd.prototype.onTab = function (pageId) {
                var tabs = this.getEl('tabs').children, tab = this.getEl('tab_' + pageId), pages = this.getEl('pages').children, page = this.getEl('page_' + pageId);
                // tslint:disable-next-line:prefer-for-of
                for (var i = 0; i < tabs.length; i += 1) {
                    tabs[i].className = 'tab';
                }
                tab.className = 'tab tab-selected';
                // tslint:disable-next-line:prefer-for-of
                for (var i = 0; i < pages.length; i += 1) {
                    pages[i].className = 'page';
                }
                page.className = 'page page-selected';
                this.resize();
            };
            return Mbd;
        }(Pricker.AbstractPricker));
        Pricker.Mbd = Mbd;
        Pricker_2.PrintableMixin.makePrintable(Mbd);
    })(Pricker = Pricker_2.Pricker || (Pricker_2.Pricker = {}));
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
var Pricker;
(function (Pricker) {
    /**
     * DOM helper utilities
     */
    var Dom;
    (function (Dom) {
        /**
         * Creates a style element for pricker rendering
         * @param parentDocument - document object to use (inject for testing)
         */
        function createAndAppendStyle(parentDocument, styles) {
            if (parentDocument === void 0) { parentDocument = document; }
            if (styles === void 0) { styles = ''; }
            var style = parentDocument.createElement('style');
            style.type = 'text/css';
            style.innerText = styles;
            parentDocument.head.appendChild(style);
            return style;
        }
        Dom.createAndAppendStyle = createAndAppendStyle;
    })(Dom = Pricker.Dom || (Pricker.Dom = {}));
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
var Pricker;
(function (Pricker) {
    /**
     * DOM helper utilities
     */
    var Dom;
    (function (Dom) {
        /**
         * Creates an iframe for pricker rendering
         * @param parentDocument - document object to use (inject for testing)
         */
        function createIframe(parentDocument) {
            if (parentDocument === void 0) { parentDocument = document; }
            var iframe = parentDocument.createElement('iframe');
            iframe.frameBorder = '0';
            iframe.scrolling = 'no';
            iframe.src = 'about:blank';
            iframe.style.border = 'none';
            return iframe;
        }
        Dom.createIframe = createIframe;
    })(Dom = Pricker.Dom || (Pricker.Dom = {}));
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
var Pricker;
(function (Pricker) {
    /**
     * DOM helper utilities
     */
    var Dom;
    (function (Dom) {
        function injectIframeData(iframe, content, globals) {
            if (content === void 0) { content = ''; }
            if (globals === void 0) { globals = {}; }
            var theDoc = iframe.contentWindow.document;
            theDoc.open();
            for (var key in globals) {
                if (globals.hasOwnProperty(key)) {
                    iframe.contentWindow[key] = globals[key];
                }
            }
            theDoc.write(content);
            theDoc.close();
        }
        Dom.injectIframeData = injectIframeData;
    })(Dom = Pricker.Dom || (Pricker.Dom = {}));
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="Pricker/Abstract.ts" />
/// <reference path="Pricker/Mbd.ts" />
/// <reference path="Dom/createAndAppendStyle.ts" />
/// <reference path="Dom/createIframe.ts" />
/// <reference path="Dom/injectIframeData.ts" />
/// <reference path="Options.ts" />
/// <reference path="Templates.ts" />
var Pricker;
(function (Pricker) {
    /**
     * Factory function to create a pricker
     * @param elementId - ID of HTML element to which the pricker will be bound
     * @param options - pricker options
     * @param parentDocument - document to use to create pricker (for testing)
     */
    function create(elementId, options, parentDocument) {
        if (options === void 0) { options = {}; }
        if (parentDocument === void 0) { parentDocument = document; }
        var pricker;
        var element = parentDocument.getElementById(elementId);
        if (!element) {
            throw new Error("Cannot find HTML element: '" + elementId + "'");
        }
        if (options.iframe || options.iframe === undefined) {
            var iframe = Pricker.Dom.createIframe(parentDocument);
            element.appendChild(iframe);
            pricker = new Pricker.Pricker.Mbd(iframe);
            Pricker.Dom.injectIframeData(iframe, Pricker.Templates.create({ 'pricker': pricker }), { pricker: pricker });
        }
        else {
            pricker = new Pricker.Pricker.Mbd();
            Pricker.Dom.createAndAppendStyle(parentDocument, pricker.print('css'));
            element.innerHTML = pricker.print('html');
            window.pricker = pricker;
            if (parentDocument === document) {
                // don't run in tests (when document has been overridden)
                pricker.onLoad();
            }
        }
        return pricker;
    }
    Pricker.create = create;
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="AbstractScheme.ts" />
/// <reference path="MatcherInterface" />
var Pricker;
(function (Pricker) {
    /**
     * Music classes to analyse rows
     */
    var Music;
    (function (Music) {
        /**
         * Custom music matching scheme defined at runtime
         */
        var CustomScheme = /** @class */ (function (_super) {
            __extends(CustomScheme, _super);
            function CustomScheme() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /* MatcherInterface methods ***************************************/
            /**
             * Provides read access to the name
             */
            CustomScheme.prototype.getName = function () {
                return 'Custom scheme';
            };
            /* AbstractScheme methods *****************************************/
            /**
             * Create matchers for this scheme/stage
             */
            CustomScheme.prototype.createMatchers = function (rounds) {
                return [];
            };
            /* CustomScheme methods *******************************************/
            /**
             * Allows additional matchers to be added
             */
            CustomScheme.prototype.addMatcher = function (matcher) {
                this._matchers.push(matcher);
            };
            return CustomScheme;
        }(Music.AbstractScheme));
        Music.CustomScheme = CustomScheme;
    })(Music = Pricker.Music || (Pricker.Music = {}));
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="../AbstractSix.ts" />
/// <reference path="../Row.ts" />
/// <reference path="../stringFromRow.ts" />
/// <reference path="Abstract.ts" />
var Pricker;
(function (Pricker) {
    /**
     * Visitor classes to analyse blocks
     */
    var Visitor;
    (function (Visitor) {
        /**
         * Simple visitor that logs rows to the console
         *
         * All visited rows are output via `console.log()`.
         * This visitor is useful for easily discovering what rows are being
         * generated.
         */
        var Console = /** @class */ (function (_super) {
            __extends(Console, _super);
            function Console() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /* AbstractVisitor methods ****************************************/
            /**
             * Receives a row for processing.
             */
            Console.prototype.visitImplementation = function (row, six) {
                /* tslint:disable-next-line:no-console */
                console.log(Pricker.stringFromRow(row));
            };
            return Console;
        }(Visitor.AbstractVisitor));
        Visitor.Console = Console;
    })(Visitor = Pricker.Visitor || (Pricker.Visitor = {}));
})(Pricker || (Pricker = {}));
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */
/// <reference path="../AbstractSix.ts" />
/// <reference path="../Row.ts" />
/// <reference path="../stringFromRow.ts" />
/// <reference path="Abstract.ts" />
var Pricker;
(function (Pricker) {
    /**
     * Visitor classes to analyse blocks
     */
    var Visitor;
    (function (Visitor) {
        /**
         * Simple visitor that accumulates rows into an array of strings
         *
         * Converts each visited row to a string and stores it.
         * The visitor accumulates rows from a touch in the order they're rung.
         */
        var StringArray = /** @class */ (function (_super) {
            __extends(StringArray, _super);
            function StringArray() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * Array of string representations of rows that have been visited.
                 */
                _this._strings = [];
                return _this;
            }
            /**
             * Reports the rows that have been visited by providing public
             * access to [[_strings]].
             */
            StringArray.prototype.getStrings = function () {
                return this._strings.slice();
            };
            /* AbstractVisitor methods ****************************************/
            /**
             * Receives a row for processing.
             */
            StringArray.prototype.visitImplementation = function (row, six) {
                this._strings.push(Pricker.stringFromRow(row));
            };
            return StringArray;
        }(Visitor.AbstractVisitor));
        Visitor.StringArray = StringArray;
    })(Visitor = Pricker.Visitor || (Pricker.Visitor = {}));
})(Pricker || (Pricker = {}));

Pricker.Templates["create"] = function anonymous(context
/*``*/) {
var out='<!DOCTYPE html><html> <head> <title>Free Touch Pricker</title> <style type="text/css"> body { margin: 0px; padding: 0px; } '+( context.pricker.print('css') )+' </style> <script type="text/javascript"> window.onload = function () { pricker.onLoad(); }; </script> </head> <body> '+( context.pricker.print('html') )+' </body></html>';return out;
};
Pricker.Templates["AbstractSix.mbd"] = function anonymous(context
/*``*/) {
var out='';if(context.underline !== true){ context.underline = false; }if(context.falseness && context.courseIndex && context.falseness.contains(context.courseIndex,context.object.getIndex())){ var className = 'falseBlock'; }else if(context.music && context.courseIndex && context.music.contains(context.courseIndex,context.object.getIndex())){ var className = 'musicalBlock'; }else{ var className = ''; }out+='<span class="'+( className )+'">';if(context.showSixHeads){out+=''+( Pricker.stringFromRow(context.object.getHead()) );}else{if(context.underline){out+='<u>';}out+=''+( Pricker.stringFromRow(context.object.getEnd()) );if(context.underline){out+='</u>';}}out+='</span>&nbsp;&nbsp;<span class="'+( Pricker.SixType[context.object.type].toLowerCase() )+'Six" onclick="pricker.c('+( context.object.getIndex() )+')">&nbsp;';if(context.object.getCall() === Pricker.Call.Plain){out+='&nbsp;';}else if(context.object.getCall() === Pricker.Call.Bob){out+='-';}else if(context.object.getCall() === Pricker.Call.Single){out+='s';}out+='&nbsp;</span>&nbsp;&nbsp;'+( context.object.getIndex() )+'<br />';if(context.showSixHeads){out+='<span class="'+( className )+'"><u>'+( Pricker.stringFromRow(context.object.getEnd()) )+'</u></span><br />';}return out;
};
Pricker.Templates["AbstractSix.siril"] = function anonymous(context
/*``*/) {
var out='';context.touchRows = context.touchRows || Infinity;if(context.object.getCall() === Pricker.Call.Plain){out+='plain';}else if(context.object.getCall() === Pricker.Call.Bob){out+='bob';}else if(context.object.getCall() === Pricker.Call.Single){out+='single';}out+=', ';if(context.touchRows > 1){if(context.touchRows >= 6){out+=''+( Pricker.SixType[context.object.type].toLowerCase() );}else{out+='+'+( context.object.notation.slice(0, context.touchRows - 1).join('.') );}out+=', ';}return out;
};
Pricker.Templates["Course.html"] = function anonymous(context
/*``*/) {
var out='<u>'+( Pricker.stringFromRow(context.object.getInitialRow()) )+'</u><br />'+( context.object.print('text') );return out;
};
Pricker.Templates["Course.mbd"] = function anonymous(context
/*``*/) {
var out='<u>'+( Pricker.stringFromRow(context.object.getInitialRow()) )+'</u><br />';var arr1=context.object.getSixes();if(arr1){var six,i1=-1,l1=arr1.length-1;while(i1<l1){six=arr1[i1+=1];if(six.getIndex() === context.object.getLength()){ context.underline = true }out+=''+( six.print('mbd', context) );} } if(context.extraSixes){var arr2=context.extraSixes.getSixes();if(arr2){var six,i2=-1,l2=arr2.length-1;while(i2<l2){six=arr2[i2+=1];out+='<span class="extraSix">';if(context.showSixHeads){out+=''+( Pricker.stringFromRow(six.getHead()) )+'<br /><u>'+( Pricker.stringFromRow(six.getEnd()) )+'</u>';}else{out+=''+( Pricker.stringFromRow(six.getEnd()) );}out+='</span><br />';} } }return out;
};
Pricker.Templates["Course.siril"] = function anonymous(context
/*``*/) {
var out='';context.touchRows = context.touchRows || Infinity;var arr1=context.object.getSixes();if(arr1){var six,i1=-1,l1=arr1.length-1;while(i1<l1){six=arr1[i1+=1];out+=''+( six.print('siril', {'touchRows': context.touchRows}) ); context.touchRows -= six.estimateRows(); if(context.touchRows <= 0){ break; }} } out+='"@  '+( context.object.print('text', {'courseEnd': false}) )+'"'+( '\n' );return out;
};
Pricker.Templates["Course.text"] = function anonymous(context
/*``*/) {
var out='';var calls = [ ];context.end = context.end || '';if (context.courseEnd === undefined) {context.courseEnd = true;}if(context.courseEnd){out+=''+( Pricker.stringFromRow(context.object.getEnd()) )+'  ';}var arr1=context.object.getSixes();if(arr1){var six,i1=-1,l1=arr1.length-1;while(i1<l1){six=arr1[i1+=1];if(six.getCall()){ calls.push(((six.getCall() === Pricker.Call.Single) ? 's' : '')+ six.getIndex()); }} } if(calls.length){out+=''+( calls.join(' ') );}else{out+='p';}if(context.object.getLength() !== context.object.getInitialRow().length * 2){out+='  ('+( context.object.getLength() )+' sixes)';}out+=''+( context.end );return out;
};
Pricker.Templates["Touch.select"] = function anonymous(context
/*``*/) {
var out='';context.touchRows = context.touchRows || Infinity;context.touchRows -= 2;  context.styleUnreached = context.styleUnreached || '';context.styleFalse = context.styleFalse || '';out+='<option value="0">'+( Pricker.stringFromRow(context.object.getStart().getLast()) )+'</option>';var arr1=context.object.getCourses();if(arr1){var course,i1=-1,l1=arr1.length-1;while(i1<l1){course=arr1[i1+=1];out+='<option value="'+( course.getIndex() )+'"';if(context.touchRows <= 0){out+=' style="'+( context.styleUnreached )+'"';}if(context.falseness && context.falseness.contains(course)){out+=' style="'+( context.styleFalse )+'"';}out+='>'+( course.print('text') )+'</option>'; context.touchRows -= course.estimateRows(); } } return out;
};
Pricker.Templates["Touch.siril"] = function anonymous(context
/*``*/) {
var out='';var courseNames = [ ],rounds = Pricker.stringFromRow(Pricker.rowFromString('', context.object.getInitialRow().length));context.touchRows = context.touchRows || Infinity;context.touchRows -= context.object.getStart().estimateRows();out+='// Generated by Free Touch Pricker'+( '\n' )+'// https://github.com/simpleigh/touch-pricker'+( '\n' )+( '\n' )+'// '+( Pricker.stringFromRow(context.object.getInitialRow()) )+( '\n' );var arr1=context.object.getCourses();if(arr1){var course,i1=-1,l1=arr1.length-1;while(i1<l1){course=arr1[i1+=1];out+='// '+( course.print('text') )+( '\n' );} } out+=''+( '\n' )+( context.object.getInitialRow().length )+' bells'+( '\n' )+( '\n' )+'composition = touch'+( '\n' )+( '\n' )+'slow = +3.1.3.1.3'+( '\n' )+'quick = +1.3.1.3.1'+( '\n' )+'plain = +'+( rounds.slice(-1) )+( '\n' )+'bob = +'+( rounds.slice(-3, -2) )+( '\n' )+'single = +'+( rounds.slice(-3) )+( '\n' )+'strt = '+( context.object.getStart().print('siril') )+( '\n' )+( '\n' );var arr2=context.object.getCourses();if(arr2){var course,index=-1,l2=arr2.length-1;while(index<l2){course=arr2[index+=1];out+='course'+( index + 1 )+' = '+( course.print('siril', {'touchRows': context.touchRows}) ); courseNames.push('course' + (index + 1));  context.touchRows -= course.estimateRows(); if(context.touchRows <= 0){ break; }} } out+=''+( '\n' )+'touch = strt, '+( courseNames.join(', ') )+( '\n' )+( '\n' )+'prove touch'+( '\n' );return out;
};
Pricker.Templates["Touch.text"] = function anonymous(context
/*``*/) {
var out=''; var start = context.object.getStart().print('text'); out+=''+( Pricker.stringFromRow(context.object.getStart().getLast()) )+( '\n' );var arr1=context.object.getCourses();if(arr1){var course,i1=-1,l1=arr1.length-1;while(i1<l1){course=arr1[i1+=1];out+=''+( course.print('text', {'end': '\n'}) );} } if(start){out+=''+( start )+( '\n' );}return out;
};
Pricker.Templates["Start.siril"] = function anonymous(context
/*``*/) {
var out=''; var Six = [Pricker.Slow, Pricker.Quick][context.object.getSixType()]; out+='+'+( Six.notation.slice(context.object.getRowIndex() - 1).join('.') );return out;
};
Pricker.Templates["Start.text"] = function anonymous(context
/*``*/) {
var out=''; var rowMap = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'last']; if(context.object.getRowIndex() === 4 &&context.object.getSixType() === Pricker.SixType.Quick){}else{out+='Start from rounds as the '+( rowMap[context.object.getRowIndex()] )+' row of a '+( Pricker.SixType[context.object.getSixType()].toLowerCase() )+' six.';}return out;
};
Pricker.Templates["Music.AbstractScheme.text"] = function anonymous(context
/*``*/) {
var out='';var arr1=context.object.getMatchers();if(arr1){var matcher,i1=-1,l1=arr1.length-1;while(i1<l1){matcher=arr1[i1+=1];out+=''+( matcher.print('text') );} } return out;
};
Pricker.Templates["Pricker.Mbd.css"] = function anonymous(context
/*``*/) {
var out='#sixends { float: left; font-family: "Courier New", "Courier", "monospace"; font-size: 12pt; margin-right: 25px;}#controls { float: left; margin-right: 25px;}.tab { background-color: #EFEFF7; border-color: black; border-radius: 15px 0 0 0; border-style: solid; border-width: 1px 1px 0 1px; cursor: pointer; float: left; height: 20px; line-height: 20px; padding-left: 10px; padding-right: 8px; text-align: center;}.tab-selected { background-color: #BDBDE7; font-weight: bold;}#pages { width: 360px;}.page { border-color: black; border-style: solid; border-width: 1px; clear: left; display: none; padding: 9px; visibility: hidden; width: 340px;}.page-selected { display: block; visibility: visible;}.page div, .page div#savedCalling { margin-bottom: 20px;}.page div:last-of-type { margin-bottom: 0px;}.page form { height: 25px; margin-bottom: 10px;}.page textarea { border-width: 1px; height: 450px; padding: 1px; width: 336px;}#touch { background-color: #EFEFF7; float: left; padding: 10px;}#touch div { margin-bottom: 5px;}#touch div:last-of-type { margin-bottom: 0px;}#courses { margin: 5px 0;}.slowSix { background-color: #F0F0F8; cursor: pointer;}.quickSix { background-color: #E2E2F0; cursor: pointer;}.extraSix { color: #505050;}.falseBlock { color: red;}.musicalBlock { color: gold;}';return out;
};
Pricker.Templates["Pricker.Mbd.html"] = function anonymous(context
/*``*/) {
var out='<div id="sixends"></div><div id="controls"> <div id="tabs"> <div id="tab_pricking" onclick="pricker.onTab(\'pricking\')" class="tab tab-selected">Pricking</div> <div id="tab_loadSave" onclick="pricker.onTab(\'loadSave\')" class="tab">Load/Save</div> <div id="tab_siril"    onclick="pricker.onTab(\'siril\')"    class="tab">Siril</div> <div id="tab_music"    onclick="pricker.onTab(\'music\')"    class="tab">Music</div> <div id="tab_view"     onclick="pricker.onTab(\'view\')"     class="tab">View</div> </div> <div id="pages"> <div class="page page-selected" id="page_pricking"> <div> <label for="stage">Number of bells:</label> <select id="stage" onchange="pricker.onStage()"></select> </div> <div> Course from rounds: <div id="callingFromRounds"></div> </div> <div> From current start row: <div id="calling"></div> </div> <div> <form onsubmit="return false"> <label for="initialRow">Starting row:</label> <input type="text" id="initialRow" size="15" maxLength="15" /> <button onclick="pricker.onSetInitialRow()">Set</button> <button onclick="pricker.onResetInitialRow()">Reset</button> </form> </div> <div id="firstSixBlock"> <label for="firstSix">First six:</label> <select id="firstSix" onchange="pricker.onFirstSix()"> <option value="'+( Pricker.SixType.Slow )+'">Slow</option> <option value="'+( Pricker.SixType.Quick )+'">Quick</option> </select> </div> <div> <form onsubmit="return false"> <label for="courseLength">Course length:</label> <input type="text" id="courseLength" size="2" maxLength="2" /> <button onclick="pricker.onSetLength()">Set</button> <button onclick="pricker.onResetLength()">Reset</button> </form> </div> <div> <label for="callReset">Current calling:</label> <button id="callReset" onclick="pricker.onResetCalls()">Reset</button> </div> <div> Saved calling: <div id="savedCalling"></div> <button id="saveCalling" onclick="pricker.onSaveCalling()">Save</button> <button id="loadCalling" onclick="pricker.onLoadCalling()">Load</button> </div> </div> <div class="page" id="page_loadSave"> <form onsubmit="return false"> <button onclick="pricker.onLoadTouch()">Import</button> <button onclick="pricker.onSaveTouch()">Export</button> </form> <textarea id="loadSaveTextarea"></textarea> </div> <div class="page" id="page_siril"> <form onsubmit="return false"> <button onclick="pricker.onGenerateSiril()">Generate</button> </form> <textarea id="sirilTextarea"></textarea> </div> <div class="page" id="page_music"> <form onsubmit="return false"> <button onclick="pricker.onAnalyseMusic()">Analyse</button> </form> <textarea id="musicTextarea"></textarea> </div> <div class="page" id="page_view"> <div> <input type="checkbox" id="showSixHeads" onclick="pricker.onShowSixHeads()" /> <label for="showSixHeads">Show six heads</label> </div> <div> <input type="checkbox" id="showAdvancedOptions" onclick="pricker.onShowAdvancedOptions()" /> <label for="showAdvancedOptions">Show advanced options</label> </div> </div> </div></div><div id="touch"> <div> <button onclick="pricker.onProve()">PROVE</button> <span id="proofResult"></span> </div> <div id="numRows"></div> <div> <label> <input id="rolling" type="checkbox" /> Rolling course entry </label> </div> <div id="startBlock"> Start with rounds as the <select id="rowIndex" onchange="pricker.onRowIndex()"> <option value="1">first</option> <option value="2">second</option> <option value="3">third</option> <option value="4">fourth</option> <option value="5">fifth</option> <option value="6">sixth</option> </select> row of a <select id="sixType" onchange="pricker.onSixType()"> <option value="'+( Pricker.SixType.Quick )+'">quick</option> <option value="'+( Pricker.SixType.Slow )+'">slow</option> </select> six. </div> <div> <form onsubmit="return false"> <button onclick="pricker.onInsertCourse()">Insert</button> <button onclick="pricker.onPasteCourse()">Paste</button> <button onclick="pricker.onCopyCourse()">Copy</button> <button onclick="pricker.onCutCourse()">Cut</button> <button onclick="pricker.onDeleteCourse()">Delete</button> </form> <select id="courses"></select> <form onsubmit="return false"> <button onclick="pricker.onInsertCourse()">Insert</button> <button onclick="pricker.onPasteCourse()">Paste</button> <button onclick="pricker.onCopyCourse()">Copy</button> <button onclick="pricker.onCutCourse()">Cut</button> <button onclick="pricker.onDeleteCourse()">Delete</button> </form> </div></div>';return out;
};
Pricker.Templates["Music.Pattern.text"] = function anonymous(context
/*``*/) {
var out='';if(context.end === undefined){ context.end = '\n'; }if(context.object.getMatchCount() > 0){if(context.object.isWildcardMatch() ||context.object.getMatchCount() > 1){out+=''+( context.object.getMatchCount() )+' ';}out+=''+( context.object.getName() )+( context.end );}return out;
};
Pricker.Templates["Music.PatternGroup.text"] = function anonymous(context
/*``*/) {
var out='';if(context.object.getMatchCount() > 0){out+=''+( context.object.getMatchCount() )+' '+( context.object.getName() );if(context.object.getSubmatchCount() > 0){out+=' ('; var first = true; var arr1=context.object.getPatterns();if(arr1){var pattern,i1=-1,l1=arr1.length-1;while(i1<l1){pattern=arr1[i1+=1]; if (!pattern) { continue; }  if(pattern.getMatchCount() > 0){if(!first){out+=', ';}out+=''+( pattern.print('text', {'end': ''}) ); first = false; }} } out+=')';}out+=''+( '\n' );}return out;
};
return Pricker;
}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9Ob3RpZmlhYmxlLnRzIiwic3JjL0Jsb2NrT3duZXJzaGlwLnRzIiwic3JjL1RlbXBsYXRlQ29udGV4dC50cyIsInNyYy9QcmludGFibGVNaXhpbi50cyIsInNyYy9CZWxsLnRzIiwic3JjL1Jvdy50cyIsInNyYy9TdGFnZS50cyIsInNyYy9yb3dGcm9tU3RyaW5nLnRzIiwic3JjL3N0cmluZ0Zyb21Sb3cudHMiLCJzcmMvVmlzaXRvci9BYnN0cmFjdC50cyIsInNyYy9BYnN0cmFjdEJsb2NrLnRzIiwic3JjL0Fic3RyYWN0Q29udGFpbmVyLnRzIiwic3JjL0NhbGwudHMiLCJzcmMvQ2hhbmdlcy50cyIsInNyYy9TaXhUeXBlLnRzIiwic3JjL0Fic3RyYWN0U2l4LnRzIiwic3JjL0Jsb2NrRGlyZWN0b3J5LnRzIiwic3JjL1NlcmlhbENvbnRhaW5lci50cyIsInNyYy9Db3Vyc2UudHMiLCJzcmMvT3B0aW9ucy50cyIsInNyYy9RdWljay50cyIsInNyYy9SYW5kb21BY2Nlc3NDb250YWluZXIudHMiLCJzcmMvU2xvdy50cyIsInNyYy9TdGFydC50cyIsInNyYy9UZW1wbGF0ZXMudHMiLCJzcmMvVG91Y2gudHMiLCJzcmMvRG9tL21ldHJpY3MudHMiLCJzcmMvUHJpY2tlci9BYnN0cmFjdC50cyIsInNyYy9Eb20vc2hvd0hpZGUudHMiLCJzcmMvTXVzaWMvTWF0Y2hlckludGVyZmFjZS50cyIsInNyYy9NdXNpYy9BYnN0cmFjdFNjaGVtZS50cyIsInNyYy9NdXNpYy9NYXRjaFR5cGUudHMiLCJzcmMvTXVzaWMvUGF0dGVybi50cyIsInNyYy9NdXNpYy9QYXR0ZXJuR3JvdXAudHMiLCJzcmMvTXVzaWMvTWJkU2NoZW1lLnRzIiwic3JjL1Zpc2l0b3IvQ291bnRlci50cyIsInNyYy9WaXNpdG9yL011c2ljLnRzIiwic3JjL1Zpc2l0b3IvUHJvb2YudHMiLCJzcmMvUHJpY2tlci9NYmQudHMiLCJzcmMvRG9tL2NyZWF0ZUFuZEFwcGVuZFN0eWxlLnRzIiwic3JjL0RvbS9jcmVhdGVJZnJhbWUudHMiLCJzcmMvRG9tL2luamVjdElmcmFtZURhdGEudHMiLCJzcmMvY3JlYXRlLnRzIiwic3JjL011c2ljL0N1c3RvbVNjaGVtZS50cyIsInNyYy9WaXNpdG9yL0NvbnNvbGUudHMiLCJzcmMvVmlzaXRvci9TdHJpbmdBcnJheS50cyIsImNyZWF0ZS5kb3QiLCJBYnN0cmFjdFNpeC9tYmQuZG90IiwiQWJzdHJhY3RTaXgvc2lyaWwuZG90IiwiQ291cnNlL2h0bWwuZG90IiwiQ291cnNlL21iZC5kb3QiLCJDb3Vyc2Uvc2lyaWwuZG90IiwiQ291cnNlL3RleHQuZG90IiwiVG91Y2gvc2VsZWN0LmRvdCIsIlRvdWNoL3NpcmlsLmRvdCIsIlRvdWNoL3RleHQuZG90IiwiU3RhcnQvc2lyaWwuZG90IiwiU3RhcnQvdGV4dC5kb3QiLCJNdXNpYy9BYnN0cmFjdFNjaGVtZS90ZXh0LmRvdCIsIlByaWNrZXIvTWJkL2Nzcy5kb3QiLCJQcmlja2VyL01iZC9odG1sLmRvdCIsIk11c2ljL1BhdHRlcm4vdGV4dC5kb3QiLCJNdXNpYy9QYXR0ZXJuR3JvdXAvdGV4dC5kb3QiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7R0FLRztBQ0xIOzs7OztHQUtHO0FBRUgsc0NBQXNDO0FDUHRDOzs7OztHQUtHO0FDTEg7Ozs7O0dBS0c7QUFFSCwyQ0FBMkM7QUFFM0MsSUFBVSxPQUFPLENBNEZoQjtBQTVGRCxXQUFVLE9BQU87SUFFYjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWlERztJQUNIO1FBQUE7UUFzQ0EsQ0FBQztRQXBDRzs7Ozs7Ozs7O1dBU0c7UUFDSSw4QkFBSyxHQUFaLFVBQ0ksWUFBb0IsRUFDcEIsT0FBOEI7WUFBOUIsd0JBQUEsRUFBQSxZQUE4QjtZQUU5QixZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsWUFBWSxDQUFDO1lBQ3RELE9B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LENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFBLFNBQVMsQ0FBQyxLQUFLLENBQUM7b0JBQzlDLElBQUksTUFBQSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFBLFNBQVMsQ0FBQyxLQUFLLENBQUM7aUJBQ2pELENBQ0osQ0FBQyxDQUFDO2dCQUVILFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFBLFlBQVksQ0FDMUIsVUFBVSxFQUNWO29CQUNJLElBQUksTUFBQSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFBLFNBQVMsQ0FBQyxJQUFJLENBQUM7b0JBQzdDLElBQUksTUFBQSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFBLFNBQVMsQ0FBQyxJQUFJLENBQUM7b0JBQzdDLElBQUksTUFBQSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFBLFNBQVMsQ0FBQyxJQUFJLENBQUM7b0JBQzdDLElBQUksTUFBQSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFBLFNBQVMsQ0FBQyxJQUFJLENBQUM7aUJBQ2hELENBQ0osQ0FBQyxDQUFDO2dCQUVILFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFBLFlBQVksQ0FDMUIsV0FBVyxFQUNYO29CQUNJLElBQUksTUFBQSxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFBLFNBQVMsQ0FBQyxLQUFLLENBQUM7b0JBQzVDLElBQUksTUFBQSxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFBLFNBQVMsQ0FBQyxLQUFLLENBQUM7b0JBQzVDLElBQUksTUFBQSxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFBLFNBQVMsQ0FBQyxLQUFLLENBQUM7b0JBQzVDLElBQUksTUFBQSxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFBLFNBQVMsQ0FBQyxLQUFLLENBQUM7b0JBQzVDLElBQUksTUFBQSxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFB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QU8sS0FBUCxPQUFPLFFBeUNoQjs7QUNyREQ7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ0b3VjaC1wcmlja2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIEludGVyZmFjZSBmb3Igb2JqZWN0cyB0aGF0IGNhbiByZWNlaXZlIG5vdGlmaWNhdGlvbnMgZnJvbSBjaGlsZHJlblxuICAgICAqXG4gICAgICogU29tZSBjbGFzc2VzIChlLmcuIFtbQWJzdHJhY3RDb250YWluZXJdXSkgY2FuIGNvbnRhaW4gYmxvY2tzLlxuICAgICAqIEJsb2NrcyBub3RpZnkgdGhlc2UgY2xhc3NlcyB3aGVuIHRoZXkgYXJlIGNoYW5nZWQuXG4gICAgICovXG4gICAgZXhwb3J0IGludGVyZmFjZSBOb3RpZmlhYmxlIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVjZWl2ZXMgYSBub3RpZmljYXRpb24gZnJvbSBhIGJsb2NrIHRoYXQgaGFzIGNoYW5nZWRcbiAgICAgICAgICogQHBhcmFtIGluZGV4ICBpbmRleCBvZiBjaGFuZ2VkIGJsb2NrIGluIGNvbnRhaW5lclxuICAgICAgICAgKi9cbiAgICAgICAgbm90aWZ5KGluZGV4OiBudW1iZXIpOiB2b2lkO1xuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIk5vdGlmaWFibGUudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBPd25lcnNoaXAgb2YgYSBibG9ja1xuICAgICAqXG4gICAgICogW1tBYnN0cmFjdEJsb2NrXV0gb2JqZWN0cyBjYW4gYmUgY29sbGVjdGVkIHRvZ2V0aGVyIHdpdGhpbiBhblxuICAgICAqIFtbQWJzdHJhY3RDb250YWluZXJdXS5cbiAgICAgKiBFYWNoIGJsb2NrIHN0b3JlcyBhIHJlZmVyZW5jZSB0byBpdHMgY29udGFpbmVyIGFsb25nIHdpdGggYSBudW1lcmljIGluZGV4XG4gICAgICogcmVwcmVzZW50aW5nIGl0cyBwb3NpdGlvbiB3aXRoaW4gdGhhdCBjb250YWluZXIuXG4gICAgICovXG4gICAgZXhwb3J0IGludGVyZmFjZSBCbG9ja093bmVyc2hpcCB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRhaW5lciBvZiB0aGUgYmxvY2suXG4gICAgICAgICAqL1xuICAgICAgICBjb250YWluZXI6IE5vdGlmaWFibGU7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluZGV4IHdpdGhpbiB0aGUgY29udGFpbmVyLlxuICAgICAgICAgKiBJbmRpY2VzIHN0YXJ0IGNvdW50aW5nIGF0IG9uZSBhbmQgaW5jcmVhc2UgdG8gdGhlIGxlbmd0aCBvZiB0aGVcbiAgICAgICAgICogY29udGFpbmVyLlxuICAgICAgICAgKi9cbiAgICAgICAgaW5kZXg6IG51bWJlcjtcblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIFRlbXBsYXRlIGNvbnRleHRcbiAgICAgKlxuICAgICAqIERpY3Rpb25hcnkgb2YgY29udGV4dCBkYXRhXG4gICAgICovXG4gICAgZXhwb3J0IGludGVyZmFjZSBUZW1wbGF0ZUNvbnRleHQge1xuICAgICAgICBbaW5kZXg6IHN0cmluZ106IGFueTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlRlbXBsYXRlQ29udGV4dC50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIE1peGluIHRoYXQgcHJvdmlkZXMgcHJpbnQgZnVuY3Rpb25hbGl0eSB2aWEgdGVtcGxhdGVzXG4gICAgICpcbiAgICAgKiBBIGBUZW1wbGF0ZWAgaXMgYSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgW1tUZW1wbGF0ZUNvbnRleHRdXSBhbmQgcHJvZHVjZXNcbiAgICAgKiBhIHN0cmluZyByZW5kZXJpbmcgb2YgdGhhdCBjb250ZXh0LlxuICAgICAqIFRlbXBsYXRlcyBhcmUgcHJlY29tcGlsZWQgdXNpbmcgdGhlXG4gICAgICogW2RvVC5qc10oaHR0cHM6Ly9vbGFkby5naXRodWIuaW8vZG9ULykgdGVtcGxhdGUgcHJlY29tcGlsZXIgYW5kIHRoZW5cbiAgICAgKiBzdG9yZWQgaW4gW1tUZW1wbGF0ZXNdXS5cbiAgICAgKiBFYWNoIHRlbXBsYXRlIGlzIGFzc29jaWF0ZWQgd2l0aCBhIGNsYXNzIGFuZCBleHBlY3RzIHRvIHJlbmRlciBvYmplY3RzIG9mXG4gICAgICogdGhhdCBjbGFzcywgd2l0aCB0aGUgaW5zdGFuY2UgYmVpbmcgcGFzc2VkIHZpYSB0aGUgY29udGV4dC5cbiAgICAgKlxuICAgICAqIFRoaXMgbWl4aW4gbWFrZXMgaXQgZWFzeSB0byBtYWtlIGEgY2xhc3MgcHJpbnRhYmxlIHVzaW5nIHRoZSBmb2xsb3dpbmdcbiAgICAgKiBzdGVwczpcbiAgICAgKlxuICAgICAqIDEuIEFkZCBgaW1wbGVtZW50cyBQcmludGFibGVNaXhpbmAgdG8gdGhlIHRhcmdldCBjbGFzcy5cbiAgICAgKiAgICBUaGlzIGVuYWJsZXMgdGhlIGNvbXBpbGVyIHRvIGNoZWNrIGFsbCBkZXBlbmRlbmNpZXMgaGF2ZSBiZWVuIGFkZGVkLlxuICAgICAqXG4gICAgICogMi4gRGVjbGFyZSBhIFtbcHJpbnRdXSBmdW5jdGlvbiBhcyBmb2xsb3dzOlxuICAgICAqICAgIGBgYFxuICAgICAqICAgIHB1YmxpYyBwcmludDogKHQ6IHN0cmluZywgYz86IFRlbXBsYXRlQ29udGV4dCkgPT4gc3RyaW5nO1xuICAgICAqICAgIGBgYFxuICAgICAqXG4gICAgICogMy4gRGVmaW5lIGEgW1t0ZW1wbGF0ZVBhdGhdXS5cbiAgICAgKiAgICBJZiBhIGNsYXNzJyB0ZW1wbGF0ZXMgbGl2ZSB1bmRlciBgc3JjL190ZW1wbGF0ZXMvQXBwbGUvQmFuYW5hYCB0aGVuXG4gICAgICogICAgdGhlIGB0ZW1wbGF0ZVBhdGhgIHdvdWxkIGJlIGRlZmluZWQgYXM6XG4gICAgICogICAgYGBgXG4gICAgICogICAgcHVibGljIHJlYWRvbmx5IHRlbXBsYXRlUGF0aDogc3RyaW5nID0gJ0FwcGxlLkJhbmFuYSc7XG4gICAgICogICAgYGBgXG4gICAgICpcbiAgICAgKiA0LiBDYWxsIFtbUHJpbnRhYmxlTWl4aW4ubWFrZVByaW50YWJsZV1dIHRvIGJpbmQgdGhlIGltcGxlbWVudGF0aW9uIG9mXG4gICAgICogICAgW1twcmludF1dLlxuICAgICAqICAgIEZvciBvdXIgYEJhbmFuYWAgY2xhc3MgdGhpcyB3b3VsZCBiZSBkb25lIGFzIGZvbGxvd3M6XG4gICAgICogICAgYGBgXG4gICAgICogICAgUHJpbnRhYmxlTWl4aW4ubWFrZVByaW50YWJsZShCYW5hbmEpO1xuICAgICAqICAgIGBgYFxuICAgICAqXG4gICAgICogNS4gKE9wdGlvbmFsbHkpIGNoZWNrIHRoYXQgZXZlcnl0aGluZyBoYXMgd29ya2VkIGJ5IGV4dGVuZGluZyB0aGUgbmV3XG4gICAgICogICAgY2xhc3MnIHNwZWMuIFJlZmVyZW5jZSB0aGUgW1tQcmludGFibGVNaXhpbl1dIHNwZWM6XG4gICAgICogICAgYGBgXG4gICAgICogICAgLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlByaW50YWJsZU1peGluLnNwZWMudHNcIiAvPlxuICAgICAqICAgIGBgYFxuICAgICAqICAgIC4uLiBhbmQgdGhlbiBjYWxsIHRoZSB0ZXN0IGZ1bmN0aW9uOlxuICAgICAqICAgIGBgYFxuICAgICAqICAgIGRlc2NyaWJlKCdCYW5hbmEgY2xhc3MnLCAoKSA9PiB7XG4gICAgICogICAgICAgIHRlc3RQcmludGFibGVNaXhpbkltcGxlbWVudGF0aW9uKCgpID0+IG5ldyBCYW5hbmEoKSk7XG4gICAgICogICAgfSk7XG4gICAgICogICAgYGBgXG4gICAgICogICAgVGhlIHRlc3QgZnVuY3Rpb24gdGFrZXMgYSBzaW5nbGUgcGFyYW1ldGVyIHdoaWNoIGlzIGEgZnVuY3Rpb24gdGhhdFxuICAgICAqICAgIGNyZWF0ZXMgdGhlIGNsYXNzIHRvIGJlIHRlc3RlZC5cbiAgICAgKi9cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgUHJpbnRhYmxlTWl4aW4ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW5kZXJzIHRoZSBvYmplY3Qgd2l0aCBhIHRlbXBsYXRlLlxuICAgICAgICAgKiBUYWtlcyB0aGUgbmFtZSBvZiB0aGUgdGVtcGxhdGUgYW5kIGEgW1tUZW1wbGF0ZUNvbnRleHRdXSwgYWRkaW5nIHRoZVxuICAgICAgICAgKiBvYmplY3QgaW5zdGFuY2UgdG8gdGhlIGNvbnRleHQgYmVmb3JlIGV4ZWN1dGluZyB0aGUgdGVtcGxhdGUuXG4gICAgICAgICAqIFVzZXMgdGhlIFtbdGVtcGxhdGVQYXRoXV0gdG8gZmluZCBhIHRlbXBsYXRlIHdpdGggdGhlIHByb3ZpZGVkXG4gICAgICAgICAqIHRlbXBsYXRlIG5hbWUuXG4gICAgICAgICAqIEEgdGVtcGxhdGUgYXQgYHNyYy9fdGVtcGxhdGVzL0NsYXNzL3RlbXBsYXRlLmRvdGAgd291bGQgYmUgZm91bmRcbiAgICAgICAgICogdXNpbmcgdGhlIGB0ZW1wbGF0ZU5hbWVgIG9mIGAndGVtcGxhdGUuZG90J2AgYXNzdW1pbmcgYVxuICAgICAgICAgKiBbW3RlbXBsYXRlUGF0aF1dIG9mIGAnQ2xhc3MnYC5cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBwcmludChcbiAgICAgICAgICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgY29udGV4dDogVGVtcGxhdGVDb250ZXh0ID0geyB9LFxuICAgICAgICApOiBzdHJpbmcge1xuICAgICAgICAgICAgdGVtcGxhdGVOYW1lID0gdGhpcy50ZW1wbGF0ZVBhdGggKyAnLicgKyB0ZW1wbGF0ZU5hbWU7XG4gICAgICAgICAgICByZXR1cm4gVGVtcGxhdGVzW3RlbXBsYXRlTmFtZV0oey4uLmNvbnRleHQsICdvYmplY3QnOiB0aGlzfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUGF0aCBmb3IgdGhlIGNsYXNzJyB0ZW1wbGF0ZXMuXG4gICAgICAgICAqIElmIGEgY2xhc3MnIHRlbXBsYXRlcyBsaXZlIHVuZGVyIGBzcmMvX3RlbXBsYXRlcy9BcHBsZS9CYW5hbmFgIHRoZW5cbiAgICAgICAgICogdGhlIGB0ZW1wbGF0ZVBhdGhgIHdvdWxkIGJlIGRlZmluZWQgYXM6XG4gICAgICAgICAqIGBgYFxuICAgICAgICAgKiBwdWJsaWMgcmVhZG9ubHkgdGVtcGxhdGVQYXRoOiBzdHJpbmcgPSAnQXBwbGUuQmFuYW5hJztcbiAgICAgICAgICogYGBgXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgcmVhZG9ubHkgdGVtcGxhdGVQYXRoOiBzdHJpbmc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJpbmRzIHByaW50IGZ1bmN0aW9uYWxpdHkgdG8gYSBjbGFzcy5cbiAgICAgICAgICogVGFrZXMgYSBjb25zdHJ1Y3RvciBhbmQgZmlsbHMgaW4gdGhlIFtbcHJpbnRdXSBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgbWFrZVByaW50YWJsZShjbHM6IGFueSkge1xuICAgICAgICAgICAgY2xzLnByb3RvdHlwZS5wcmludCA9IFByaW50YWJsZU1peGluLnByb3RvdHlwZS5wcmludDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogQmVsbCBudW1iZXJcbiAgICAgKlxuICAgICAqIG4uYi4gQmVsbCBudW1iZXJzIGFyZSAxLWluZGV4ZWQsIGkuZS46XG4gICAgICogICB0cmVibGUgPSAgMVxuICAgICAqICAgZWxldmVuID0gMTFcbiAgICAgKi9cbiAgICBleHBvcnQgdHlwZSBCZWxsID0gbnVtYmVyO1xufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJCZWxsLnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogQSByb3cgKHBlcm11dGF0aW9uIG9mIGJlbGxzKVxuICAgICAqL1xuICAgIGV4cG9ydCB0eXBlIFJvdyA9IEJlbGxbXTtcbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBNYXRjaGVzIHRoZSBudW1iZXIgb2YgYmVsbHMgdG8gdGhlIG5hbWUgb2YgZWFjaCBzdGFnZVxuICAgICAqL1xuICAgIGV4cG9ydCBlbnVtIFN0YWdlIHtcbiAgICAgICAgVHJpcGxlcyA9IDcsXG4gICAgICAgIENhdGVycyA9IDksXG4gICAgICAgIENpbnF1ZXMgPSAxMSxcbiAgICAgICAgU2V4dHVwbGVzID0gMTMsXG4gICAgICAgIFNlcHR1cGxlcyA9IDE1LFxuICAgIH1cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQmVsbC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiUm93XCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJTdGFnZVwiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgc3RyaW5nIGludG8gYSBbW1Jvd11dLlxuICAgICAqXG4gICAgICogVHJpZXMgdG8gY29udmVydCBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIHJvdyBpbnRvIGEgcm93IG9uIGFcbiAgICAgKiBwYXJ0aWN1bGFyIHN0YWdlLlxuICAgICAqIElmIGFueSBiZWxscyBhcmUgbWlzc2luZyBmcm9tIHRoZSBpbnB1dCBzdHJpbmcgdGhlbiB0aGVzZSB3aWxsIGJlIGFkZGVkXG4gICAgICogaW4gb3JkZXIgYXQgdGhlIGVuZCBvZiB0aGUgcm93LlxuICAgICAqIEFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gaWY6XG4gICAgICogIC0gVGhlIGlucHV0IHN0cmluZyBpcyB0b28gbG9uZyBmb3IgdGhlIHN0YWdlXG4gICAgICogIC0gQSBjaGFyYWN0ZXIgaXMgcmVwZWF0ZWQgaW4gdGhlIGlucHV0IHN0cmluZ1xuICAgICAqICAtIEEgY2hhcmFjdGVyIGRvZXNuJ3QgcmVwcmVzZW50IGEgYmVsbCBvbiB0aGUgY3VycmVudCBzdGFnZVxuICAgICAqXG4gICAgICogYGBgXG4gICAgICogPiBQcmlja2VyLnJvd0Zyb21TdHJpbmcoJzIzMScsIFByaWNrZXIuU3RhZ2UuQ2lucXVlcyk7XG4gICAgICogWzIsIDMsIDEsIDQsIDUsIDYsIDcsIDgsIDksIDAsIDExXVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiByb3dGcm9tU3RyaW5nKGlucHV0OiBzdHJpbmcsIHN0YWdlOiBTdGFnZSk6IFJvdyB7XG4gICAgICAgIGNvbnN0IGJlbGxTeW1ib2xzTWFwOiB7IFtpbmRleDogc3RyaW5nXTogbnVtYmVyIH0gPSB7XG4gICAgICAgICAgICAgICAgICAgICcxJzogMSwgJzInOiAyLCAnMyc6IDMsICc0JzogNCwgJzUnOiA1LFxuICAgICAgICAgICAgICAgICAgICAnNic6IDYsICc3JzogNywgJzgnOiA4LCAnOSc6IDksICcwJzogMTAsXG4gICAgICAgICAgICAgICAgICAgICdFJzogMTEsICdUJzogMTIsICdBJzogMTMsICdCJzogMTQsICdDJzogMTUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJlbGxzU2VlbjogYm9vbGVhbltdID0gWyBdLFxuICAgICAgICAgICAgb3V0cHV0OiBSb3cgPSBbIF07XG5cbiAgICAgICAgbGV0IGJlbGxOdW1iZXI6IEJlbGwsXG4gICAgICAgICAgICBpbnB1dEluZGV4OiBudW1iZXI7XG5cbiAgICAgICAgaW5wdXQgPSBpbnB1dC50b1VwcGVyQ2FzZSgpO1xuXG4gICAgICAgIGlmIChpbnB1dC5sZW5ndGggPiBzdGFnZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSb3cgdG9vIGxvbmcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJ1aWxkIGEgdGFibGUgdG8gcmVjb3JkIHdoZW4gd2UndmUgc2VlbiBlYWNoIGJlbGxcbiAgICAgICAgZm9yIChiZWxsTnVtYmVyID0gMTsgYmVsbE51bWJlciA8PSBzdGFnZTsgYmVsbE51bWJlciArPSAxKSB7XG4gICAgICAgICAgICBiZWxsc1NlZW5bYmVsbE51bWJlcl0gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoXG4gICAgICAgICAgICBpbnB1dEluZGV4ID0gMDtcbiAgICAgICAgICAgIGlucHV0SW5kZXggPCBpbnB1dC5sZW5ndGggJiYgaW5wdXRJbmRleCA8IHN0YWdlO1xuICAgICAgICAgICAgaW5wdXRJbmRleCArPSAxXG4gICAgICAgICkge1xuICAgICAgICAgICAgYmVsbE51bWJlciA9IGJlbGxTeW1ib2xzTWFwW2lucHV0LmNoYXJBdChpbnB1dEluZGV4KV07XG5cbiAgICAgICAgICAgIGlmIChiZWxsTnVtYmVyICYmIGJlbGxOdW1iZXIgPD0gc3RhZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoYmVsbHNTZWVuW2JlbGxOdW1iZXJdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQmVsbCByZXBlYXRlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChiZWxsTnVtYmVyKTtcbiAgICAgICAgICAgICAgICBiZWxsc1NlZW5bYmVsbE51bWJlcl0gPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gYmVsbCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlucHV0Lmxlbmd0aCA8IHN0YWdlKSB7XG4gICAgICAgICAgICBmb3IgKGJlbGxOdW1iZXIgPSAxOyBiZWxsTnVtYmVyIDw9IHN0YWdlOyBiZWxsTnVtYmVyICs9IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWJlbGxzU2VlbltiZWxsTnVtYmVyXSkge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChiZWxsTnVtYmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJSb3cudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIFtbUm93XV0gaW50byBhIHN0cmluZy5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gc3RyaW5nRnJvbVJvdyhyb3c6IFJvdyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGJlbGxTeW1ib2xzID0gJyAxMjM0NTY3ODkwRVRBQkMnLFxuICAgICAgICAgICAgYmVsbENoYXJhY3RlcnM6IHN0cmluZ1tdID0gWyBdO1xuXG4gICAgICAgIGZvciAoY29uc3QgYmVsbCBvZiByb3cpIHtcbiAgICAgICAgICAgIGJlbGxDaGFyYWN0ZXJzLnB1c2goYmVsbFN5bWJvbHMuY2hhckF0KGJlbGwpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBiZWxsQ2hhcmFjdGVycy5qb2luKCcnKTtcbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vKiBEb24ndCByZWZlcmVuY2UgQWJzdHJhY3RTaXggb3IgdGhpcyBsZWFkcyB0byBjb21waWxhdGlvbiBlcnJvcnMuLi4gKi9cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9Sb3cudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3Jvd0Zyb21TdHJpbmcudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3N0cmluZ0Zyb21Sb3cudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBWaXNpdG9yIGNsYXNzZXMgdG8gYW5hbHlzZSBibG9ja3NcbiAgICAgKlxuICAgICAqIEFueSBbW0Fic3RyYWN0QmxvY2tdXSBjYW4gW1thY2NlcHRdXSBhIHZpc2l0b3IgdGhhdCB3aWxsIHByb2Nlc3MgdGhlaXJcbiAgICAgKiBbW1Jvd11dcyAoQW4gW1tBYnN0cmFjdENvbnRhaW5lcl1dIHJlY3Vyc2l2ZWx5IGNhbGxzIGNvbnRhaW5lZCBibG9ja3MgaW5cbiAgICAgKiB0dXJuIHRvIG1ha2Ugc3VyZSBhbGwgcm93cyBhcmUgcmVhY2hlZCkuXG4gICAgICpcbiAgICAgKiBWaXNpdG9ycyBwcm9jZXNzIGVhY2ggcm93IGluIHR1cm4gaW4gdGhlIG9yZGVyIHRoZXkgd291bGQgYmUgcnVuZy5cbiAgICAgKiBUaGV5IHRha2UgYWN0aW9uIGZvciBlYWNoIHJvdywgcHJvYmFibHkgbW9kaWZ5aW5nIHNvbWUgaW50ZXJuYWwgc3RhdGVcbiAgICAgKiBiYXNlZCBvbiB0aGUgcm93cyB0aGF0IHRoZXkgcmVjZWl2ZS5cbiAgICAgKiBUaGV5IHN0b3AgcHJvY2Vzc2luZyByb3dzIGlmIHJvdW5kcyBpcyByZWFjaGVkLlxuICAgICAqXG4gICAgICogVGhlcmUncyBubyB3YXkgdG8gcmVzZXQgYSB2aXNpdG9yOiBjcmVhdGUgYSBuZXcgb25lIGluIG9yZGVyIHRvIGNvbXBsZXRlXG4gICAgICogYSBmcmVzaCBhbmFseXNpcy5cbiAgICAgKlxuICAgICAqIEBwcmVmZXJyZWRcbiAgICAgKi9cbiAgICBleHBvcnQgbmFtZXNwYWNlIFZpc2l0b3Ige1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCYXNlIGNsYXNzIGZvciBhbGwgdmlzaXRvcnNcbiAgICAgICAgICpcbiAgICAgICAgICogRGVmZXJzIHRvIGRlcml2ZWQgY2xhc3NlcyBpbiBvcmRlciB0byBwcm9jZXNzIHJvd3MsIGJ1dCBkb2VzIGNoZWNrXG4gICAgICAgICAqIHdoZXRoZXIgcm91bmRzIGhhcyBiZWVuIHJlYWNoZWQgYW5kIHN0b3BzIHByb2Nlc3NpbmcgYXQgdGhhdCBwb2ludC5cbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFZpc2l0b3Ige1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFdoZXRoZXIgb3Igbm90IHdlJ3JlIHN0aWxsIHByb2Nlc3Npbmcgcm93cy5cbiAgICAgICAgICAgICAqIERlZmF1bHRzIHRvIGB0cnVlYCAocHJvY2Vzc2luZyByb3dzKSwgYnV0IGlzIHNldCB0byBgZmFsc2VgIG9uY2VcbiAgICAgICAgICAgICAqIHJvdW5kcyBoYXMgYmVlbiB2aXNpdGVkLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF92aXNpdGluZzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVtZW1iZXIgcm91bmRzIHNvIHdlIGRvbid0IGhhdmUgdG8gcmVnZW5lcmF0ZSBmb3IgZWFjaCBuZXcgcm93LlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF9yb3VuZHM6IHN0cmluZztcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBWaXNpdHMgYSByb3cuXG4gICAgICAgICAgICAgKiBJZiB3ZSdyZSBzdGlsbCB2aXNpdGluZyAoaS5lLiByb3VuZHMgaGFzbid0IGJlZW4gcmVhY2hlZCkgdGhlblxuICAgICAgICAgICAgICogd2UgcGFzcyB0aGF0IHJvdyB0byBkZXJpdmVkIGNsYXNzZXMgZm9yIHByb2Nlc3NpbmcuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyB2aXNpdChyb3c6IFJvdywgc2l4PzogQWJzdHJhY3RTaXgpOiB0aGlzIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3JvdW5kcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3VuZHMgPSBzdHJpbmdGcm9tUm93KHJvd0Zyb21TdHJpbmcoJycsIHJvdy5sZW5ndGgpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlzaXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aXNpdEltcGxlbWVudGF0aW9uKHJvdywgc2l4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmluZ0Zyb21Sb3cocm93KSA9PT0gdGhpcy5fcm91bmRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aXNpdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlcG9ydHMgd2hldGhlciByb3dzIGFyZSBzdGlsbCBiZWluZyBwcm9jZXNzZWQgYnkgcHJvdmlkaW5nXG4gICAgICAgICAgICAgKiBwdWJsaWMgYWNjZXNzIHRvIFtbX3Zpc2l0aW5nXV0uXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBpc1Zpc2l0aW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl92aXNpdGluZztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBVbmRlcmx5aW5nIHZpc2l0b3IgaW1wbGVtZW50YXRpb24gKHRvIGJlIG92ZXJyaWRkZW4gYnkgZGVyaXZlZFxuICAgICAgICAgICAgICogY2xhc3NlcykuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCB2aXNpdEltcGxlbWVudGF0aW9uKFxuICAgICAgICAgICAgICAgIHJvdzogUm93LFxuICAgICAgICAgICAgICAgIHNpeD86IEFic3RyYWN0U2l4LFxuICAgICAgICAgICAgKTogdm9pZDtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQmxvY2tPd25lcnNoaXAudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIk5vdGlmaWFibGUudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlByaW50YWJsZU1peGluLnRzXCIvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlJvdy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiVGVtcGxhdGVDb250ZXh0LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJWaXNpdG9yL0Fic3RyYWN0LnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogQWJzdHJhY3QgY2xhc3MgcmVwcmVzZW50aW5nIGJsb2NrcyBvZiByb3dzXG4gICAgICpcbiAgICAgKiBBIGJsb2NrOlxuICAgICAqICAtIGlzIGluaXRpYWxpc2VkIGZyb20gYSByb3dcbiAgICAgKiAgLSBwcm92aWRlcyBhY2Nlc3MgdG8gdGhlIGxhc3Qgcm93IGluIHRoZSBibG9ja1xuICAgICAqICAtIHJlY2FsY3VsYXRlcyB0aGF0IHJvdyBpZiB0aGUgaW5pdGlhbCByb3cgaXMgY2hhbmdlZFxuICAgICAqICAtIHByb3ZpZGVzIG1lY2hhbmlzbXMgZm9yIGNvbnRyb2xsaW5nIGhvdyB0aGUgbGFzdCByb3cgaXMgY3JlYXRlZFxuICAgICAqICAtIG5vdGlmaWVzIGFueSBwYXJlbnQgYmxvY2sgd2hlbmV2ZXIgdGhvc2UgbWVjaGFuaXNtcyBhcmUgYWN0dWF0ZWRcbiAgICAgKlxuICAgICAqIEJsb2NrcyBhcmUgZGVzaWduZWQgdG8gYmUgYWdncmVnYXRlZCBpbnRvIGNvbnRhaW5lcnMuXG4gICAgICogQ29udGFpbmVycyBub3RpZnkgYmxvY2tzIG9mIGNoYW5nZXMgYnkgc2V0dGluZyBhIG5ldyBpbml0aWFsIHJvdy5cbiAgICAgKiBCbG9ja3Mgbm90aWZ5IGNvbnRhaW5lcnMgb2YgY2hhbmdlcyB2aWEgYSBjYWxsYmFjayAocmVjZWl2ZU5vdGlmaWNhdGlvbikuXG4gICAgICovXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0QmxvY2sgaW1wbGVtZW50cyBQcmludGFibGVNaXhpbiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluaXRpYWwgcm93IGZvciB0aGUgYmxvY2tcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBfaW5pdGlhbFJvdzogUm93O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAgICAgKiBAcGFyYW0gaW5pdGlhbFJvdyAgaW5pdGlhbCByb3cgZm9yIHRoZSBibG9ja1xuICAgICAgICAgKiBAcGFyYW0gb3duZXJzaGlwICAgb3duZXJzaGlwIG9mIHRoaXMgYmxvY2tcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAgICAgaW5pdGlhbFJvdzogUm93LFxuICAgICAgICAgICAgcHJvdGVjdGVkIF9vd25lcnNoaXA/OiBCbG9ja093bmVyc2hpcCxcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLl9pbml0aWFsUm93ID0gaW5pdGlhbFJvdy5zbGljZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogUHJpbnRhYmxlTWl4aW4gbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbmRlcnMgdGhlIG9iamVjdCB3aXRoIGEgdGVtcGxhdGVcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBwcmludDogKHQ6IHN0cmluZywgYz86IFRlbXBsYXRlQ29udGV4dCkgPT4gc3RyaW5nO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQYXRoIGZvciB0aGlzIGNsYXNzJyB0ZW1wbGF0ZXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0ZW1wbGF0ZVBhdGg6IHN0cmluZyA9ICdBYnN0cmFjdEJsb2NrJztcblxuICAgICAgICAvKiBBYnN0cmFjdEJsb2NrIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogRG9lcyBhbnkgY2FsY3VsYXRpb24gbmVlZGVkIGJ5IHRoZSBibG9ja1xuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IGNhbGN1bGF0ZSgpOiB2b2lkO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWFkIGFjY2VzcyB0byB0aGUgaW5pdGlhbCByb3dcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBnZXRJbml0aWFsUm93KCk6IFJvdyB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5pdGlhbFJvdy5zbGljZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyaXRlIGFjY2VzcyB0byB0aGUgaW5pdGlhbCByb3dcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzZXRJbml0aWFsUm93KGluaXRpYWxSb3c6IFJvdyk6IHRoaXMge1xuICAgICAgICAgICAgdGhpcy5faW5pdGlhbFJvdyA9IGluaXRpYWxSb3cuc2xpY2UoKTtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSBsYXN0IHJvdyBpbiB0aGUgYmxvY2tcbiAgICAgICAgICogZS5nLiBhIGxlYWQgaGVhZCBvciBhIHNpeCBlbmQgKGZvciBTdGVkbWFuKVxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGFic3RyYWN0IGdldExhc3QoKTogUm93O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVcGRhdGVzIHJlZmVyZW5jZXMgdG8gdGhlIHBhcmVudCBjb250YWluZXJcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzZXRPd25lcnNoaXAob3duZXJzaGlwOiBCbG9ja093bmVyc2hpcCk6IEFic3RyYWN0QmxvY2sge1xuICAgICAgICAgICAgdGhpcy5fb3duZXJzaGlwID0gb3duZXJzaGlwO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQWxsb3dzIHB1YmxpYyBhY2Nlc3MgdG8gdGhlIGNvbnRhaW5lclxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGdldENvbnRhaW5lcigpOiBOb3RpZmlhYmxlIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vd25lcnNoaXAgPyB0aGlzLl9vd25lcnNoaXAuY29udGFpbmVyIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFsbG93cyBwdWJsaWMgYWNjZXNzIHRvIHRoZSBpbmRleFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGdldEluZGV4KCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb3duZXJzaGlwID8gdGhpcy5fb3duZXJzaGlwLmluZGV4IDogdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsZWFycyByZWZlcmVuY2VzIHRvIHRoZSBwYXJlbnQgY29udGFpbmVyXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgY2xlYXJPd25lcnNoaXAoKTogQWJzdHJhY3RCbG9jayB7XG4gICAgICAgICAgICB0aGlzLl9vd25lcnNoaXAgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBOb3RpZmllcyB0aGUgcGFyZW50IGNvbnRhaW5lclxuICAgICAgICAgKlxuICAgICAgICAgKiBEZXJpdmVkIGNsYXNzZXMgc2hvdWxkIGNhbGwgdGhpcyB3aGVuZXZlciB0aGUgbGFzdCByb3cgY2hhbmdlcy5cbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBub3RpZnlDb250YWluZXIoKTogdm9pZCB7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3duZXJzaGlwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3duZXJzaGlwLmNvbnRhaW5lci5ub3RpZnkodGhpcy5fb3duZXJzaGlwLmluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWNlaXZlcyBhIHZpc2l0b3IgdGhhdCB3aWxsIGJlIGNhbGxlZCB0byBwcm9jZXNzIGVhY2ggcm93XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgYWNjZXB0KC4uLnZpc2l0b3JzOiBWaXNpdG9yLkFic3RyYWN0VmlzaXRvcltdKTogdGhpcztcblxuICAgICAgICAvKipcbiAgICAgICAgICogRXN0aW1hdGVzIHRoZSBudW1iZXIgb2Ygcm93cyBpbiB0aGUgYmxvY2tcbiAgICAgICAgICogVGhlIGVzdGltYXRlIGRvZXNuJ3QgdGFrZSBpbnRvIGFjY291bnQgY29taW5nIHJvdW5kIHBhcnQtd2F5IHRocm91Z2hcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBlc3RpbWF0ZVJvd3MoKTogbnVtYmVyO1xuXG4gICAgfVxuXG4gICAgUHJpbnRhYmxlTWl4aW4ubWFrZVByaW50YWJsZShBYnN0cmFjdEJsb2NrKTtcblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJBYnN0cmFjdEJsb2NrLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJOb3RpZmlhYmxlLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJSb3cudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlZpc2l0b3IvQWJzdHJhY3QudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBBYnN0cmFjdCBjbGFzcyByZXByZXNlbnRpbmcgY29udGFpbmVycyBmb3IgYmxvY2tzIG9mIHJvd3NcbiAgICAgKlxuICAgICAqIENvbnRhaW5lcnMgYXJlIGJsb2NrcyB0aGF0IGNvbnRhaW4gb3RoZXIgYmxvY2tzLlxuICAgICAqIExpa2UgYmxvY2tzLCBjb250YWluZXJzOlxuICAgICAqICAtIGFyZSBpbml0aWFsaXNlZCBmcm9tIGEgcm93XG4gICAgICogIC0gcHJvdmlkZSBhY2Nlc3MgdG8gdGhlIGxhc3Qgcm93IGluIHRoZSBjb250YWluZXJcbiAgICAgKiAgLSBldGMuXG4gICAgICogSW4gYWRkaXRpb24gdG8gdGhpcyBjb250YWluZXJzIHByb3BhZ2F0ZSBjaGFuZ2VzIGJldHdlZW4gY2hpbGQgYmxvY2tzLlxuICAgICAqL1xuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdENvbnRhaW5lcjxCbG9jayBleHRlbmRzIEFic3RyYWN0QmxvY2s+XG4gICAgICAgIGV4dGVuZHMgQWJzdHJhY3RCbG9jayBpbXBsZW1lbnRzIE5vdGlmaWFibGUge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCbG9ja3Mgd2l0aGluIHRoZSBjb250YWluZXJcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBfYmxvY2tzOiBCbG9ja1tdID0gWyBdO1xuXG4gICAgICAgIC8qIEFic3RyYWN0QmxvY2sgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEb2VzIGFueSBjYWxjdWxhdGlvbiBuZWVkZWQgYnkgdGhlIGJsb2NrXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgY2FsY3VsYXRlKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVCbG9ja3MoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSBsYXN0IHJvdyBpbiB0aGUgYmxvY2tcbiAgICAgICAgICogZS5nLiBhIGNvdXJzZSBoZWFkIG9yIGEgY291cnNlIGVuZCAoZm9yIFN0ZWRtYW4pXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZ2V0TGFzdCgpOiBSb3cge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2Jsb2Nrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYmxvY2tzW3RoaXMuX2Jsb2Nrcy5sZW5ndGggLSAxXS5nZXRMYXN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEhhbmRsZSBjYXNlIHdpdGggemVybyBibG9ja3NcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbml0aWFsUm93LnNsaWNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVjZWl2ZXMgYSB2aXNpdG9yIHRoYXQgd2lsbCBiZSBjYWxsZWQgdG8gcHJvY2VzcyBlYWNoIHJvd1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGFjY2VwdCguLi52aXNpdG9yczogVmlzaXRvci5BYnN0cmFjdFZpc2l0b3JbXSk6IHRoaXMge1xuICAgICAgICAgICAgZm9yIChjb25zdCBibG9jayBvZiB0aGlzLl9ibG9ja3MpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHZpc2l0b3Igb2YgdmlzaXRvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2suYWNjZXB0KHZpc2l0b3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVzdGltYXRlcyB0aGUgbnVtYmVyIG9mIHJvd3MgaW4gdGhlIGJsb2NrXG4gICAgICAgICAqIFRoZSBlc3RpbWF0ZSBkb2Vzbid0IHRha2UgaW50byBhY2NvdW50IGNvbWluZyByb3VuZCBwYXJ0LXdheSB0aHJvdWdoXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZXN0aW1hdGVSb3dzKCk6IG51bWJlciB7XG4gICAgICAgICAgICBsZXQgcm93czogbnVtYmVyID0gMDtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYmxvY2sgb2YgdGhpcy5fYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgcm93cyArPSBibG9jay5lc3RpbWF0ZVJvd3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByb3dzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogTm90aWZpYWJsZSBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlY2VpdmVzIGEgbm90aWZpY2F0aW9uIGZyb20gYSBibG9jayB0aGF0IGhhcyBjaGFuZ2VkXG4gICAgICAgICAqIEBwYXJhbSBpbmRleCAgaW5kZXggb2YgY2hhbmdlZCBibG9jayBpbiBjb250YWluZXJcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBub3RpZnkoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVCbG9ja3MoaW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlDb250YWluZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEFic3RyYWN0Q29udGFpbmVyIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQcm9wYWdhdGVzIGRhdGEgYmV0d2VlbiBibG9ja3Mgd2l0aGluIHRoZSBjb250YWluZXJcbiAgICAgICAgICogQHBhcmFtIGluZGV4ICB3aGVyZSB0byBzdGFydCB3aGVuIHJlY2FsY3VsYXRpbmdcbiAgICAgICAgICovXG4gICAgICAgIHByaXZhdGUgcHJvcGFnYXRlQmxvY2tzKGluZGV4OiBudW1iZXIgPSAwKTogdm9pZCB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgZmlyc3QgYmxvY2tcbiAgICAgICAgICAgIGlmICghaW5kZXggJiYgdGhpcy5nZXRMZW5ndGgoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlRmlyc3RCbG9jayh0aGlzLl9ibG9ja3NbMF0pO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICg7IGluZGV4IDwgdGhpcy5nZXRMZW5ndGgoKTsgaW5kZXggKz0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlQ3VycmVudEJsb2NrKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ibG9ja3NbaW5kZXggLSAxXSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmxvY2tzW2luZGV4XSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFByb3BhZ2F0ZXMgZGF0YSBmcm9tIGEgcHJldmlvdXMgYmxvY2sgdG8gYSBjdXJyZW50IGJsb2NrXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgcHJvcGFnYXRlQ3VycmVudEJsb2NrKHByZXZpb3VzOiBCbG9jaywgY3VycmVudDogQmxvY2spOiB2b2lkIHtcbiAgICAgICAgICAgIGN1cnJlbnQuc2V0SW5pdGlhbFJvdyhwcmV2aW91cy5nZXRMYXN0KCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFByb3BhZ2F0ZXMgZGF0YSBmb3IgdGhlIGZpcnN0IGJsb2NrIHdpdGhpbiB0aGUgY29udGFpbmVyXG4gICAgICAgICAqIEhhbmRsZWQgYXMgYSBzcGVjaWFsIGNhc2UgdG8gYWxsb3cgZm9yIGUuZy4gU3RlZG1hbiBzdGFydHNcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBwcm9wYWdhdGVGaXJzdEJsb2NrKGZpcnN0OiBCbG9jayk6IHZvaWQge1xuICAgICAgICAgICAgZmlyc3Quc2V0SW5pdGlhbFJvdyh0aGlzLl9pbml0aWFsUm93KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWFkIGFjY2VzcyB0byB0aGUgbGVuZ3RoXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZ2V0TGVuZ3RoKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmxvY2tzLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWFkIGFjY2VzcyB0byB0aGUgYmxvY2tzXG4gICAgICAgICAqXG4gICAgICAgICAqIERlcml2ZWQgY2xhc3NlcyBzaG91bGQgcHJvdmlkZSBwdWJsaWMgYWNjZXNzIHZpYSBhIG1vcmVcbiAgICAgICAgICogc3VpdGFibHktbmFtZWQgbWV0aG9kXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZ2V0QmxvY2tzKCk6IEJsb2NrW10ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Jsb2Nrcy5zbGljZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlYWQgYWNjZXNzIHRvIGEgYmxvY2tcbiAgICAgICAgICpcbiAgICAgICAgICogRGVyaXZlZCBjbGFzc2VzIHNob3VsZCBwcm92aWRlIHB1YmxpYyBhY2Nlc3MgdmlhIGEgbW9yZVxuICAgICAgICAgKiBzdWl0YWJseS1uYW1lZCBtZXRob2RcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBnZXRCbG9jayhpbmRleDogbnVtYmVyKTogQmxvY2sge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgMSB8fCBpbmRleCA+IHRoaXMuZ2V0TGVuZ3RoKCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jsb2NrIGluZGV4IG91dCBvZiByYW5nZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Jsb2Nrc1tpbmRleCAtIDFdO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBUeXBlcyBvZiBjYWxsXG4gICAgICogQGVudW0ge251bWJlcn1cbiAgICAgKi9cbiAgICBleHBvcnQgZW51bSBDYWxsIHtQbGFpbiA9IDAsIEJvYiwgU2luZ2xlfVxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJCZWxsLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJDYWxsLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJSb3cudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBTaW1wbGUgZnVuY3Rpb25zIHRvIHBlcm11dGUgcm93c1xuICAgICAqL1xuICAgIGV4cG9ydCBuYW1lc3BhY2UgQ2hhbmdlcyB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhlbHBlciBmdW5jdGlvbiB0byBzd2FwIHR3byBiZWxsc1xuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gc3dhcFBhaXIocm93OiBSb3csIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCBiZWxsOiBCZWxsO1xuXG4gICAgICAgICAgICBiZWxsID0gcm93W2luZGV4XTtcbiAgICAgICAgICAgIHJvd1tpbmRleF0gPSByb3dbaW5kZXggKyAxXTtcbiAgICAgICAgICAgIHJvd1tpbmRleCArIDFdID0gYmVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBOb3RhdGlvbiA8MT5cbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBwZXJtdXRlMShyb3c6IFJvdyk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IGluZGV4OiBudW1iZXI7XG5cbiAgICAgICAgICAgIGZvciAoaW5kZXggPSAxOyBpbmRleCA8IHJvdy5sZW5ndGggLSAxOyBpbmRleCArPSAyKSB7XG4gICAgICAgICAgICAgICAgc3dhcFBhaXIocm93LCBpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogTm90YXRpb24gPDM+XG4gICAgICAgICAqL1xuICAgICAgICBleHBvcnQgZnVuY3Rpb24gcGVybXV0ZTMocm93OiBSb3cpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCBpbmRleDogbnVtYmVyO1xuXG4gICAgICAgICAgICBzd2FwUGFpcihyb3csIDApO1xuXG4gICAgICAgICAgICBmb3IgKGluZGV4ID0gMzsgaW5kZXggPCByb3cubGVuZ3RoIC0gMTsgaW5kZXggKz0gMikge1xuICAgICAgICAgICAgICAgIHN3YXBQYWlyKHJvdywgaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE5vdGF0aW9uIDxuPlxuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIHBlcm11dGVOKHJvdzogUm93KTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgaW5kZXg6IG51bWJlcjtcblxuICAgICAgICAgICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgcm93Lmxlbmd0aCAtIDE7IGluZGV4ICs9IDIpIHtcbiAgICAgICAgICAgICAgICBzd2FwUGFpcihyb3csIGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBOb3RhdGlvbiA8OT4gZm9yIENpbnF1ZXNcbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBwZXJtdXRlQm9iKHJvdzogUm93KTogdm9pZCB7XG4gICAgICAgICAgICBwZXJtdXRlU2luZ2xlKHJvdyk7XG4gICAgICAgICAgICBzd2FwUGFpcihyb3csIHJvdy5sZW5ndGggLSAyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBOb3RhdGlvbiA8OTBFPiBmb3IgQ2lucXVlc1xuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIHBlcm11dGVTaW5nbGUocm93OiBSb3cpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCBpbmRleDogbnVtYmVyO1xuXG4gICAgICAgICAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCByb3cubGVuZ3RoIC0gMzsgaW5kZXggKz0gMikge1xuICAgICAgICAgICAgICAgIHN3YXBQYWlyKHJvdywgaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE5vdGF0aW9uIGRlcGVuZGVudCBvbiBjYWxsXG4gICAgICAgICAqL1xuICAgICAgICBleHBvcnQgZnVuY3Rpb24gcGVybXV0ZUNhbGwocm93OiBSb3csIGNhbGw6IENhbGwpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmIChjYWxsID09PSBDYWxsLlBsYWluKSB7XG4gICAgICAgICAgICAgICAgQ2hhbmdlcy5wZXJtdXRlTihyb3cpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjYWxsID09PSBDYWxsLkJvYikge1xuICAgICAgICAgICAgICAgIENoYW5nZXMucGVybXV0ZUJvYihyb3cpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjYWxsID09PSBDYWxsLlNpbmdsZSkge1xuICAgICAgICAgICAgICAgIENoYW5nZXMucGVybXV0ZVNpbmdsZShyb3cpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogVHlwZXMgb2Ygc2l4XG4gICAgICogQGVudW0ge251bWJlcn1cbiAgICAgKi9cbiAgICBleHBvcnQgZW51bSBTaXhUeXBlIHsgU2xvdyA9IDAsIFF1aWNrIH1cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQWJzdHJhY3RCbG9jay50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQmxvY2tPd25lcnNoaXAudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkNhbGwudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkNoYW5nZXMudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlJvdy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiU2l4VHlwZVwiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIEJhc2UgY2xhc3MgZm9yIHNpeGVzXG4gICAgICovXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0U2l4IGV4dGVuZHMgQWJzdHJhY3RCbG9jayB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFR5cGUgb2YgdGhlIHNpeFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGFic3RyYWN0IHR5cGU6IFNpeFR5cGU7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE5vdGF0aW9uIChleGNsdWRpbmcgY2FsbClcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBhYnN0cmFjdCBub3RhdGlvbjogc3RyaW5nW107XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNpeCBlbmQgb2YgdGhpcyBzaXhcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBfZW5kOiBSb3c7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENhbGwgdXNlZCB0byBzdGFydCB0aGUgc2l4XG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgX2NhbGw6IENhbGwgPSBDYWxsLlBsYWluO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IoXG4gICAgICAgICAgICBpbml0aWFsUm93OiBSb3csXG4gICAgICAgICAgICBwcm90ZWN0ZWQgX293bmVyc2hpcD86IEJsb2NrT3duZXJzaGlwLFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHN1cGVyKGluaXRpYWxSb3csIF9vd25lcnNoaXApO1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFByaW50YWJsZU1peGluIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQYXRoIGZvciB0aGlzIGNsYXNzJyB0ZW1wbGF0ZXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0ZW1wbGF0ZVBhdGg6IHN0cmluZyA9ICdBYnN0cmFjdFNpeCc7XG5cbiAgICAgICAgLyogQWJzdHJhY3RCbG9jayBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERvZXMgYW55IGNhbGN1bGF0aW9uIG5lZWRlZCBieSB0aGUgYmxvY2tcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBjYWxjdWxhdGUoKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLl9lbmQgPSB0aGlzLl9pbml0aWFsUm93LnNsaWNlKCk7ICAvLyBDcmVhdGUgbmV3IGFycmF5XG4gICAgICAgICAgICBDaGFuZ2VzLnBlcm11dGVDYWxsKHRoaXMuX2VuZCwgdGhpcy5fY2FsbCk7XG4gICAgICAgICAgICB0aGlzLmFwcGx5U2l4VHJhbnNwb3NpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIGxhc3Qgcm93IGluIHRoZSBibG9jayAodGhlIHNpeCBlbmQpXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZ2V0TGFzdCgpOiBSb3cge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VuZC5zbGljZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVzdGltYXRlcyB0aGUgbnVtYmVyIG9mIHJvd3MgaW4gdGhlIGJsb2NrXG4gICAgICAgICAqIFRoZSBlc3RpbWF0ZSBkb2Vzbid0IHRha2UgaW50byBhY2NvdW50IGNvbWluZyByb3VuZCBwYXJ0LXdheSB0aHJvdWdoXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZXN0aW1hdGVSb3dzKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gNjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEFic3RyYWN0U2l4IG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSBzaXggaGVhZFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGdldEhlYWQoKTogUm93IHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5faW5pdGlhbFJvdy5zbGljZSgpO1xuICAgICAgICAgICAgQ2hhbmdlcy5wZXJtdXRlQ2FsbChzdGFydCwgdGhpcy5fY2FsbCk7XG4gICAgICAgICAgICByZXR1cm4gc3RhcnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgc2l4IGVuZFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGdldEVuZCgpOiBSb3cge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGFzdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlYWQgYWNjZXNzIHRvIHRoZSBjYWxsXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZ2V0Q2FsbCgpOiBDYWxsIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyaXRlIGFjY2VzcyB0byB0aGUgY2FsbFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHNldENhbGwoY2FsbDogQ2FsbCwgdXBkYXRlOiBib29sZWFuID0gdHJ1ZSk6IEFic3RyYWN0U2l4IHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGwgPSBjYWxsO1xuICAgICAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZnlDb250YWluZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRvZ2dsZXMgdGhlIGNhbGwgdHlwZSBiZXR3ZWVuIFBsYWluIC0+IEJvYiAtPiBTaW5nbGUgLT4gUGxhaW5cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyB0b2dnbGVDYWxsKCk6IENhbGwge1xuICAgICAgICAgICAgY29uc3QgY2FsbDogQ2FsbCA9ICh0aGlzLl9jYWxsICsgMSkgJSAzO1xuICAgICAgICAgICAgdGhpcy5zZXRDYWxsKGNhbGwpO1xuICAgICAgICAgICAgcmV0dXJuIGNhbGw7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogRmluaXNoZXMgdHJhbnNwb3NpbmcgdGhlIGVuZCByb3cgZGVwZW5kaW5nIHVwb24gdGhlIHR5cGUgb2Ygc2l4XG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgYXBwbHlTaXhUcmFuc3Bvc2l0aW9uKCk6IHZvaWQ7XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQWJzdHJhY3RCbG9jay50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiTm90aWZpYWJsZS50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIEEgYmxvY2sgZGlyZWN0b3J5XG4gICAgICogRmlsZXMgaW5mb3JtYXRpb24gYWJvdXQgYmxvY2tzIGluIGEgdG91Y2gsIGluZGV4ZWQgYnkgdGhlaXIgbG9jYXRpb25cbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgQmxvY2tEaXJlY3Rvcnkge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZGlyZWN0b3J5IGl0c2VsZlxuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIF9kaXJlY3Rvcnk6IGFueSA9IFsgXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkcyBhIHNpeCB0byB0aGUgZGlyZWN0b3J5XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgYWRkKGJsb2NrOiBBYnN0cmFjdEJsb2NrKTogdGhpcztcbiAgICAgICAgcHVibGljIGFkZCguLi5pbmRpY2VzOiBudW1iZXJbXSk6IHRoaXM7XG5cbiAgICAgICAgcHVibGljIGFkZChwYXJhbTogYW55LCAuLi5pbmRpY2VzOiBudW1iZXJbXSk6IHRoaXMge1xuICAgICAgICAgICAgbGV0IGRpcmVjdG9yeTogYW55LFxuICAgICAgICAgICAgICAgIGZpbmFsSW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBpbmRpY2VzID0gQmxvY2tEaXJlY3RvcnkuZ2V0SW5kaWNlcyhwYXJhbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGluZGljZXMudW5zaGlmdChwYXJhbSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZpbmFsSW5kZXggPSBpbmRpY2VzLnBvcCgpO1xuICAgICAgICAgICAgaWYgKCFmaW5hbEluZGV4KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCYWQgb3duZXJzaGlwOiBtdXN0IGhhdmUgYXQgbGVhc3Qgb25lIGluZGV4Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRpcmVjdG9yeSA9IHRoaXMuX2RpcmVjdG9yeTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaW5kZXggb2YgaW5kaWNlcykge1xuICAgICAgICAgICAgICAgIGlmICghZGlyZWN0b3J5W2luZGV4XSkge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3RvcnlbaW5kZXhdID0gWyBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkaXJlY3RvcnkgPSBkaXJlY3RvcnlbaW5kZXhdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkaXJlY3RvcnlbZmluYWxJbmRleF0gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2tzIHdoZXRoZXIgYSBzaXggaXMgaW4gdGhlIGRpcmVjdG9yeVxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGNvbnRhaW5zKGJsb2NrOiBBYnN0cmFjdEJsb2NrKTogYm9vbGVhbjtcbiAgICAgICAgcHVibGljIGNvbnRhaW5zKC4uLmluZGljZXM6IG51bWJlcltdKTogYm9vbGVhbjtcblxuICAgICAgICBwdWJsaWMgY29udGFpbnMocGFyYW06IGFueSwgLi4uaW5kaWNlczogbnVtYmVyW10pOiBib29sZWFuIHtcbiAgICAgICAgICAgIGxldCBkaXJlY3Rvcnk6IGFueTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBpbmRpY2VzID0gQmxvY2tEaXJlY3RvcnkuZ2V0SW5kaWNlcyhwYXJhbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGluZGljZXMudW5zaGlmdChwYXJhbSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRpcmVjdG9yeSA9IHRoaXMuX2RpcmVjdG9yeTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaW5kZXggb2YgaW5kaWNlcykge1xuICAgICAgICAgICAgICAgIGlmICghZGlyZWN0b3J5W2luZGV4XSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRpcmVjdG9yeSA9IGRpcmVjdG9yeVtpbmRleF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbXB1dGVzIGFuIGFycmF5IG9mIG93bmVyc2hpcCBpbmRpY2VzIGZvciBibG9ja1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRJbmRpY2VzKGJsb2NrOiBBYnN0cmFjdEJsb2NrKTogbnVtYmVyW10ge1xuICAgICAgICAgICAgY29uc3Qgb3duZXJzaGlwQXJyYXk6IG51bWJlcltdID0gWyBdO1xuICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjogTm90aWZpYWJsZSB8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBpbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICBpbmRleCA9IGJsb2NrLmdldEluZGV4KCk7XG4gICAgICAgICAgICBjb250YWluZXIgPSBibG9jay5nZXRDb250YWluZXIoKTtcbiAgICAgICAgICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCYWQgb3duZXJzaGlwOiBibG9jayBoYXMgbm8gY29udGFpbmVyJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdoaWxlIChjb250YWluZXIgaW5zdGFuY2VvZiBBYnN0cmFjdEJsb2NrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JhZCBvd25lcnNoaXA6IGNvbnRhaW5lciBidXQgbm8gaW5kZXgnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3duZXJzaGlwQXJyYXkudW5zaGlmdChpbmRleCk7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBjb250YWluZXIuZ2V0SW5kZXgoKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSBjb250YWluZXIuZ2V0Q29udGFpbmVyKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBvd25lcnNoaXBBcnJheTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgaW5kZXggaXMgZW1wdHlcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBpc0VtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLl9kaXJlY3RvcnkubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQWJzdHJhY3RCbG9jay50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQWJzdHJhY3RDb250YWluZXIudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkJsb2NrT3duZXJzaGlwLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJSb3cudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBBYnN0cmFjdCBjb250YWluZXIgdGhhdCBtYW5hZ2VzIGEgc2VyaWVzIG9mIGNoaWxkIGJsb2Nrc1xuICAgICAqXG4gICAgICogQ2hpbGQgYmxvY2tzIGFyZSBtYW5hZ2VkIGJ5IGNoYW5naW5nIHRoZSBsZW5ndGggb2YgdGhlIGNvbnRhaW5lci5cbiAgICAgKiBNaWdodCBiZSB1c2VkIHRvIHJlcHJlc2VudCBhIGNvdXJzZSBvZiBTdGVkbWFuIG9yIGEgc2luZ2xlIG1ldGhvZC5cbiAgICAgKi9cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgU2VyaWFsQ29udGFpbmVyPEJsb2NrIGV4dGVuZHMgQWJzdHJhY3RCbG9jaz5cbiAgICAgICAgZXh0ZW5kcyBBYnN0cmFjdENvbnRhaW5lcjxCbG9jaz4ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAgICAgKlxuICAgICAgICAgKiBFeHRlbmRzIHRoZSBBYnN0cmFjdEJsb2NrIGNvbnRhaW5lciB0byBjcmVhdGUgY29udGFpbmVkIGJsb2Nrcy5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAgICAgaW5pdGlhbFJvdzogUm93LFxuICAgICAgICAgICAgcHJvdGVjdGVkIF9vd25lcnNoaXA/OiBCbG9ja093bmVyc2hpcCxcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBzdXBlcihpbml0aWFsUm93LCBfb3duZXJzaGlwKTtcbiAgICAgICAgICAgIHRoaXMuZXh0ZW5kKHRoaXMuZ2V0RGVmYXVsdExlbmd0aChpbml0aWFsUm93KSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTZXJpYWxDb250YWluZXIgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogRXh0ZW5kcyB0aGUgY29udGFpbmVyIGJ5IGFkZGluZyB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBibG9ja3NcbiAgICAgICAgICogQHBhcmFtIGJsb2NrcyAgYmxvY2tzIHRvIGFkZFxuICAgICAgICAgKi9cbiAgICAgICAgcHJpdmF0ZSBleHRlbmQoYmxvY2tzOiBudW1iZXIpOiB0aGlzIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZExlbmd0aDogbnVtYmVyID0gdGhpcy5nZXRMZW5ndGgoKSxcbiAgICAgICAgICAgICAgICBuZXdMZW5ndGg6IG51bWJlciA9IG9sZExlbmd0aCArIGJsb2NrcztcblxuICAgICAgICAgICAgbGV0IGluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgICAgaW5pdGlhbFJvdzogUm93ID0gdGhpcy5nZXRMYXN0KCk7XG5cbiAgICAgICAgICAgIGZvciAoaW5kZXggPSBvbGRMZW5ndGggKyAxOyBpbmRleCA8PSBuZXdMZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ibG9ja3NbaW5kZXggLSAxXSA9IHRoaXMuY3JlYXRlQmxvY2soaW5pdGlhbFJvdywgaW5kZXgpO1xuICAgICAgICAgICAgICAgIGluaXRpYWxSb3cgPSB0aGlzLl9ibG9ja3NbaW5kZXggLSAxXS5nZXRMYXN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgbGVuZ3RoIG9mIG5ldyBjb250YWluZXJzIG9mIHRoaXMgdHlwZVxuICAgICAgICAgKlxuICAgICAgICAgKiBEZXJpdmVkIGNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIGlmIHJlcXVpcmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIGdldERlZmF1bHRMZW5ndGgoaW5pdGlhbFJvdzogUm93KTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYSBuZXcgYmxvY2sgZm9yIHRoZSBjb250YWluZXJcbiAgICAgICAgICpcbiAgICAgICAgICogVXNlZCBieSBleHRlbmQoKSB3aGVuIGNyZWF0aW5nIHRoZSBjb250YWluZXIgb3IgaW5jcmVhc2luZyBpdHNcbiAgICAgICAgICogbGVuZ3RoLlxuICAgICAgICAgKiBAcGFyYW0gaW5pdGlhbFJvdyAgaW5pdGlhbCByb3cgZm9yIHRoZSBibG9ja1xuICAgICAgICAgKiBAcGFyYW0gaW5kZXggICAgICAgaW5kZXggb2YgYmxvY2sgaW4gY29udGFpbmVyXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgY3JlYXRlQmxvY2soaW5pdGlhbFJvdzogUm93LCBpbmRleDogbnVtYmVyKTogQmxvY2s7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyaXRlIGFjY2VzcyB0byB0aGUgbGVuZ3RoXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc2V0TGVuZ3RoKGxlbmd0aDogbnVtYmVyKTogdGhpcyB7XG4gICAgICAgICAgICBpZiAoKGxlbmd0aCA8IHRoaXMubWluTGVuZ3RoKSB8fCAobGVuZ3RoID4gdGhpcy5tYXhMZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdMZW5ndGggb3V0IG9mIHJhbmdlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChsZW5ndGggPiB0aGlzLmdldExlbmd0aCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHRlbmQobGVuZ3RoIC0gdGhpcy5nZXRMZW5ndGgoKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Jsb2NrcyA9IHRoaXMuX2Jsb2Nrcy5zbGljZSgwLCBsZW5ndGgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm5vdGlmeUNvbnRhaW5lcigpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcml0ZSBhY2Nlc3MgdG8gdGhlIGxlbmd0aDogaWdub3JlcyBvdXQtb2YtcmFuZ2UgdmFsdWVzXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc2FmZVNldExlbmd0aChsZW5ndGg6IG51bWJlcik6IHRoaXMge1xuICAgICAgICAgICAgbGVuZ3RoID0gTWF0aC5tYXgobGVuZ3RoLCB0aGlzLm1pbkxlbmd0aCk7XG4gICAgICAgICAgICBsZW5ndGggPSBNYXRoLm1pbihsZW5ndGgsIHRoaXMubWF4TGVuZ3RoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldExlbmd0aChsZW5ndGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIExvd2VyIGxpbWl0IG9uIGxlbmd0aCBmb3IgdGhlIHBhcnRpY3VsYXIgY29uY3JldGUgY2xhc3NcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBhYnN0cmFjdCBtaW5MZW5ndGg6IG51bWJlcjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVXBwZXIgbGltaXQgb24gbGVuZ3RoIGZvciB0aGUgcGFydGljdWxhciBjb25jcmV0ZSBjbGFzc1xuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGFic3RyYWN0IG1heExlbmd0aDogbnVtYmVyO1xuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkFic3RyYWN0U2l4LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJDYWxsLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJSb3cudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlNlcmlhbENvbnRhaW5lci50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiU2l4VHlwZS50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIEEgY291cnNlLCBiZWluZyBhIHNldCBvZiBzaXhlc1xuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBDb3Vyc2UgZXh0ZW5kcyBTZXJpYWxDb250YWluZXI8QWJzdHJhY3RTaXg+IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVHlwZSBvZiB0aGUgZmlyc3Qgc2l4XG4gICAgICAgICAqL1xuICAgICAgICBwcml2YXRlIF9maXJzdFNpeFR5cGU6IFNpeFR5cGUgPSBTaXhUeXBlLlNsb3c7XG5cbiAgICAgICAgLyogUHJpbnRhYmxlTWl4aW4gbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBhdGggZm9yIHRoaXMgY2xhc3MnIHRlbXBsYXRlc1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHRlbXBsYXRlUGF0aDogc3RyaW5nID0gJ0NvdXJzZSc7XG5cbiAgICAgICAgLyogU2VyaWFsQ29udGFpbmVyIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgbGVuZ3RoIG9mIG5ldyBjb250YWluZXJzIG9mIHRoaXMgdHlwZVxuICAgICAgICAgKlxuICAgICAgICAgKiBEZXJpdmVkIGNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIGlmIHJlcXVpcmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIGdldERlZmF1bHRMZW5ndGgoaW5pdGlhbFJvdzogUm93KTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiBpbml0aWFsUm93Lmxlbmd0aCAqIDI7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBibG9jayBmb3IgdGhlIGNvbnRhaW5lclxuICAgICAgICAgKlxuICAgICAgICAgKiBVc2VkIGJ5IGV4dGVuZCgpIHdoZW4gY3JlYXRpbmcgdGhlIGNvbnRhaW5lciBvciBpbmNyZWFzaW5nIGl0c1xuICAgICAgICAgKiBsZW5ndGguXG4gICAgICAgICAqIEBwYXJhbSBpbml0aWFsUm93ICBpbml0aWFsIHJvdyBmb3IgdGhlIGJsb2NrXG4gICAgICAgICAqIEBwYXJhbSBpbmRleCAgICAgICBpbmRleCBvZiBibG9jayBpbiBjb250YWluZXJcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBjcmVhdGVCbG9jayhpbml0aWFsUm93OiBSb3csIGluZGV4OiBudW1iZXIpOiBBYnN0cmFjdFNpeCB7XG4gICAgICAgICAgICByZXR1cm4gKCh0aGlzLl9maXJzdFNpeFR5cGUgfHwgU2l4VHlwZS5TbG93KSArIGluZGV4KSAlIDJcbiAgICAgICAgICAgICAgICA/IG5ldyBTbG93KGluaXRpYWxSb3csIHsnY29udGFpbmVyJzogdGhpcywgJ2luZGV4JzogaW5kZXh9KVxuICAgICAgICAgICAgICAgIDogbmV3IFF1aWNrKGluaXRpYWxSb3csIHsnY29udGFpbmVyJzogdGhpcywgJ2luZGV4JzogaW5kZXh9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMb3dlciBsaW1pdCBvbiBsZW5ndGggZm9yIHRoZSBwYXJ0aWN1bGFyIGNvbmNyZXRlIGNsYXNzXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbWluTGVuZ3RoOiBudW1iZXIgPSAyO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVcHBlciBsaW1pdCBvbiBsZW5ndGggZm9yIHRoZSBwYXJ0aWN1bGFyIGNvbmNyZXRlIGNsYXNzXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbWF4TGVuZ3RoOiBudW1iZXIgPSA2MDtcblxuICAgICAgICAvKiBDb3Vyc2UgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgY291cnNlIGVuZFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGdldEVuZDogKCkgPT4gUm93ID0gdGhpcy5nZXRMYXN0O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWFkIGFjY2VzcyB0byB0aGUgc2l4ZXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBnZXRTaXhlczogKCkgPT4gQWJzdHJhY3RTaXhbXSA9IHRoaXMuZ2V0QmxvY2tzO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWFkIGFjY2VzcyB0byBhIHNpeFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGdldFNpeDogKGluZGV4OiBudW1iZXIpID0+IEFic3RyYWN0U2l4ID0gdGhpcy5nZXRCbG9jaztcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVhZCBhY2Nlc3MgdG8gdGhlIHR5cGUgb2YgdGhlIGZpcnN0IHNpeFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGdldEZpcnN0U2l4VHlwZSgpOiBTaXhUeXBlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9maXJzdFNpeFR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogV3JpdGUgYWNjZXNzIHRvIHRoZSB0eXBlIG9mIHRoZSBmaXJzdCBzaXhcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzZXRGaXJzdFNpeFR5cGUodHlwZTogU2l4VHlwZSk6IHRoaXMge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2ZpcnN0U2l4VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzOyAgLy8gbm90aGluZyB0byBkb1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9maXJzdFNpeFR5cGUgPSB0eXBlO1xuXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBuZXcgYXJyYXkgb2Ygc2l4ZXMgd2l0aCB0aGUgY29ycmVjdCBwYXJpdHlcbiAgICAgICAgICAgIGxldCBpbml0aWFsUm93ID0gdGhpcy5faW5pdGlhbFJvdztcbiAgICAgICAgICAgIGNvbnN0IG5ld1NpeGVzOiBBYnN0cmFjdFNpeFtdID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDw9IHRoaXMuZ2V0TGVuZ3RoKCk7IGluZGV4ICs9IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBibG9jayA9IHRoaXMuY3JlYXRlQmxvY2soaW5pdGlhbFJvdywgaW5kZXgpO1xuICAgICAgICAgICAgICAgIGJsb2NrLnNldENhbGwoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0U2l4KGluZGV4KS5nZXRDYWxsKCksXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlLCAgLy8gQXZvaWQgbXVsdGlwbGUgdXBkYXRlcy4uLlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgbmV3U2l4ZXMucHVzaChibG9jayk7XG4gICAgICAgICAgICAgICAgaW5pdGlhbFJvdyA9IG5ld1NpeGVzW2luZGV4IC0gMV0uZ2V0TGFzdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9ibG9ja3MgPSBuZXdTaXhlcztcblxuICAgICAgICAgICAgLy8gLi4uIGFuZCB0cmlnZ2VyIG9uZSBhdCB0aGUgZW5kXG4gICAgICAgICAgICBpZiAobmV3U2l4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTaXgoMSkuc2V0Q2FsbCh0aGlzLmdldFNpeCgxKS5nZXRDYWxsKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXNldHMgdGhlIGNvdXJzZSB0byBiZSB0aGUgZGVmYXVsdCBsZW5ndGhcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyByZXNldExlbmd0aCgpOiB0aGlzIHtcbiAgICAgICAgICAgIHRoaXMuc2V0TGVuZ3RoKHRoaXMuZ2V0RGVmYXVsdExlbmd0aCh0aGlzLl9pbml0aWFsUm93KSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNYWtlcyB0aGUgY291cnNlIGludG8gYSBwbGFpbiBjb3Vyc2VcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyByZXNldENhbGxzKCk6IHRoaXMge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzaXggb2YgdGhpcy5fYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgc2l4LnNldENhbGwoQ2FsbC5QbGFpbiwgZmFsc2UpOyAgLy8gQXZvaWQgbXVsdGlwbGUgdXBkYXRlcy4uLlxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyAuLi4gYW5kIHRyaWdnZXIgb25lIGF0IHRoZSBlbmRcbiAgICAgICAgICAgIHRoaXMuZ2V0U2l4KDEpLnNldENhbGwoQ2FsbC5QbGFpbik7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrcyB3aGV0aGVyIHRoaXMgaXMgYSBwbGFpbiBjb3Vyc2VcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBpc1BsYWluKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzaXggb2YgdGhpcy5fYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNpeC5nZXRDYWxsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsb25lcyB0aGUgY291cnNlXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgY2xvbmUoKTogQ291cnNlIHtcbiAgICAgICAgICAgIGNvbnN0IGNsb25lZDogQ291cnNlID0gbmV3IENvdXJzZSh0aGlzLl9pbml0aWFsUm93KTtcbiAgICAgICAgICAgIGNsb25lZC5zZXRMZW5ndGgodGhpcy5nZXRMZW5ndGgoKSk7XG4gICAgICAgICAgICBjbG9uZWQuc2V0Rmlyc3RTaXhUeXBlKHRoaXMuZ2V0Rmlyc3RTaXhUeXBlKCkpO1xuXG4gICAgICAgICAgICAvLyBDb3B5IGFjcm9zcyBhbGwgdGhlIGNhbGxzXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDw9IHRoaXMuZ2V0TGVuZ3RoKCk7IGluZGV4ICs9IDEpIHtcbiAgICAgICAgICAgICAgICBjbG9uZWQuZ2V0U2l4KGluZGV4KS5zZXRDYWxsKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFNpeChpbmRleCkuZ2V0Q2FsbCgpLFxuICAgICAgICAgICAgICAgICAgICBmYWxzZSwgIC8vIEF2b2lkIG11bHRpcGxlIHVwZGF0ZXMuLi5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyAuLi4gYW5kIHRyaWdnZXIgb25lIGF0IHRoZSBlbmRcbiAgICAgICAgICAgIGNsb25lZC5nZXRTaXgoMSkuc2V0Q2FsbCh0aGlzLmdldFNpeCgxKS5nZXRDYWxsKCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gY2xvbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYSBuZXcgY291cnNlIGZyb20gYSBzdHJpbmcgcmVwcmVzZW50YXRpb25cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZnJvbVN0cmluZyhpbml0aWFsUm93OiBSb3csIGlucHV0OiBzdHJpbmcpOiBDb3Vyc2Uge1xuICAgICAgICAgICAgY29uc3QgY291cnNlOiBDb3Vyc2UgPSBuZXcgQ291cnNlKGluaXRpYWxSb3cpLFxuICAgICAgICAgICAgICAgIHBhdENvdXJzZUVuZDogc3RyaW5nID0gJ1swLTlhLXpdezMsMTV9JyxcbiAgICAgICAgICAgICAgICBwYXRDYWxsOiBzdHJpbmcgPSAnKD86XFxcXGR7MSwyfXxcXFxcZHsxLDJ9c3xzXFxcXGR7MSwyfSknLFxuICAgICAgICAgICAgICAgIHBhdFNlcDogc3RyaW5nID0gJ1tcXFxccy4sXSsnLFxuICAgICAgICAgICAgICAgIHBhdENhbGxpbmc6IHN0cmluZyA9IHBhdENhbGwgKyAnKD86JyArIHBhdFNlcCArIHBhdENhbGwgKyAnKSonLFxuICAgICAgICAgICAgICAgIHBhdFNpeGVzOiBzdHJpbmcgPSAnXFxcXCgoXFxcXGR7MSwyfSlbXlxcXFxkXFxcXCldKlxcXFwpJyxcbiAgICAgICAgICAgICAgICBwYXRBbGw6IHN0cmluZyA9ICcnXG4gICAgICAgICAgICAgICAgICAgICsgJ15cXFxccyonXG4gICAgICAgICAgICAgICAgICAgICsgJyg/OicgKyBwYXRDb3Vyc2VFbmQgKyAnXFxcXHMrKT8nXG4gICAgICAgICAgICAgICAgICAgICsgJygnICsgcGF0Q2FsbGluZyArICd8cCknICAvLyBncm91cCAxXG4gICAgICAgICAgICAgICAgICAgICsgJyg/OlxcXFxzKycgKyBwYXRTaXhlcyArICcpPycgIC8vIGdyb3VwIDIgaW4gaGVyZVxuICAgICAgICAgICAgICAgICAgICArICdcXFxccyokJyxcbiAgICAgICAgICAgICAgICByeEFsbDogUmVnRXhwID0gbmV3IFJlZ0V4cChwYXRBbGwsICdpJyksXG4gICAgICAgICAgICAgICAgbWF0Y2hlczogbnVsbCB8IHN0cmluZ1tdID0gcnhBbGwuZXhlYyhpbnB1dCk7XG5cbiAgICAgICAgICAgIGxldCBjYWxsczogc3RyaW5nW10sXG4gICAgICAgICAgICAgICAgaTogbnVtYmVyLFxuICAgICAgICAgICAgICAgIGNhbGw6IHN0cmluZztcblxuICAgICAgICAgICAgaWYgKCFtYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgaW1wb3J0IGNvdXJzZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTZWNvbmQgZ3JvdXAgbWF0Y2hlcyBsZW5ndGggb2YgY291cnNlXG4gICAgICAgICAgICBpZiAobWF0Y2hlc1syXSkge1xuICAgICAgICAgICAgICAgIGNvdXJzZS5zZXRMZW5ndGgocGFyc2VJbnQobWF0Y2hlc1syXSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJZiB0aGlzIGlzIGEgcGxhaW4gY291cnNlIHRoZW4gb3VyIGpvYiBpcyBkb25lXG4gICAgICAgICAgICBpZiAobWF0Y2hlc1sxXSA9PT0gJ3AnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHNwbGl0IHVwIHRoZSBjYWxsaW5nIGFuZCBwcm9jZXNzXG4gICAgICAgICAgICBjYWxscyA9IG1hdGNoZXNbMV0uc3BsaXQobmV3IFJlZ0V4cChwYXRTZXApKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYWxscy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGNhbGwgPSBjYWxsc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbC5jaGFyQXQoMCkgPT09ICdzJykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsID0gY2FsbC5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgY291cnNlLmdldFNpeChwYXJzZUludChjYWxsKSkuc2V0Q2FsbChDYWxsLlNpbmdsZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjYWxsLnNsaWNlKC0xKSA9PT0gJ3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGwgPSBjYWxsLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgICAgICAgICAgICAgY291cnNlLmdldFNpeChwYXJzZUludChjYWxsKSkuc2V0Q2FsbChDYWxsLlNpbmdsZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY291cnNlLmdldFNpeChwYXJzZUludChjYWxsKSkuc2V0Q2FsbChDYWxsLkJvYik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvdXJzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcmZhY2UgZm9yIG9wdGlvbnMgcGFzc2VkIHRvIGNyZWF0ZSgpXG4gICAgICovXG4gICAgZXhwb3J0IGludGVyZmFjZSBPcHRpb25zIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogV2hldGhlciB0byBwYWNrYWdlIHRoZSBwcmlja2VyIGluIGFuIGlmcmFtZS5cbiAgICAgICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgaWZyYW1lPzogYm9vbGVhbjtcblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJBYnN0cmFjdFNpeC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQ2hhbmdlcy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiU2l4VHlwZVwiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiVmlzaXRvci9BYnN0cmFjdC50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIEEgcXVpY2sgc2l4XG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIFF1aWNrIGV4dGVuZHMgQWJzdHJhY3RTaXgge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUeXBlIG9mIHRoZSBzaXhcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0eXBlID0gU2l4VHlwZS5RdWljaztcblxuICAgICAgICAvKipcbiAgICAgICAgICogTm90YXRpb24gKGV4Y2x1ZGluZyBjYWxsKVxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBub3RhdGlvbiA9IFsnMScsICczJywgJzEnLCAnMycsICcxJ107XG4gICAgICAgIHB1YmxpYyByZWFkb25seSBub3RhdGlvbiA9IFF1aWNrLm5vdGF0aW9uO1xuXG4gICAgICAgIC8qIEFic3RyYWN0QmxvY2sgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWNlaXZlcyBhIHZpc2l0b3IgdGhhdCB3aWxsIGJlIGNhbGxlZCB0byBwcm9jZXNzIGVhY2ggcm93XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgYWNjZXB0KC4uLnZpc2l0b3JzOiBWaXNpdG9yLkFic3RyYWN0VmlzaXRvcltdKTogdGhpcyB7XG4gICAgICAgICAgICBjb25zdCByb3cgPSB0aGlzLmdldEluaXRpYWxSb3coKTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCB2aXNpdG9yIG9mIHZpc2l0b3JzKSB7XG4gICAgICAgICAgICAgICAgQ2hhbmdlcy5wZXJtdXRlQ2FsbChyb3csIHRoaXMuX2NhbGwpO1xuICAgICAgICAgICAgICAgIHZpc2l0b3IudmlzaXQocm93LCB0aGlzKTtcblxuICAgICAgICAgICAgICAgIENoYW5nZXMucGVybXV0ZTEocm93KTtcbiAgICAgICAgICAgICAgICB2aXNpdG9yLnZpc2l0KHJvdywgdGhpcyk7XG5cbiAgICAgICAgICAgICAgICBDaGFuZ2VzLnBlcm11dGUzKHJvdyk7XG4gICAgICAgICAgICAgICAgdmlzaXRvci52aXNpdChyb3csIHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgQ2hhbmdlcy5wZXJtdXRlMShyb3cpO1xuICAgICAgICAgICAgICAgIHZpc2l0b3IudmlzaXQocm93LCB0aGlzKTtcblxuICAgICAgICAgICAgICAgIENoYW5nZXMucGVybXV0ZTMocm93KTtcbiAgICAgICAgICAgICAgICB2aXNpdG9yLnZpc2l0KHJvdywgdGhpcyk7XG5cbiAgICAgICAgICAgICAgICB2aXNpdG9yLnZpc2l0KHRoaXMuX2VuZCwgdGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogQWJzdHJhY3RTaXggbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRyYW5zcG9zZXMgdGhlIGZyb250IHRocmVlIGJlbGxzIGRlcGVuZGluZyB1cG9uIHRoZSB0eXBlIG9mIHNpeFxuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIGFwcGx5U2l4VHJhbnNwb3NpdGlvbigpOiB2b2lkIHtcbiAgICAgICAgICAgIENoYW5nZXMucGVybXV0ZTModGhpcy5fZW5kKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkFic3RyYWN0QmxvY2sudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkFic3RyYWN0Q29udGFpbmVyLnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogQWJzdHJhY3QgY29udGFpbmVyIHRoYXQgYWxsb3dzIHJhbmRvbSBpbnNlcnRpb24gb2YgY2hpbGQgYmxvY2tzXG4gICAgICpcbiAgICAgKiBDaGlsZCBibG9ja3MgbWF5IGJlIGluc2VydGVkIG9yIHJlbW92ZWQgYW55d2hlcmUgd2l0aGluIHRoZSBjb250YWluZXIuXG4gICAgICogTWlnaHQgYmUgdXNlZCB0byByZXByZXNlbnQgYSB0b3VjaCBvZiBTdGVkbWFuIG9yIGEgY291cnNlIG9mIHNwbGljZWQuXG4gICAgICovXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJhbmRvbUFjY2Vzc0NvbnRhaW5lcjxCbG9jayBleHRlbmRzIEFic3RyYWN0QmxvY2s+XG4gICAgICAgIGV4dGVuZHMgQWJzdHJhY3RDb250YWluZXI8QmxvY2s+IHtcblxuICAgICAgICAvKiBSYW5kb21BY2Nlc3NDb250YWluZXIgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogSW5zZXJ0cyBhIGNvdXJzZSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgaW5zZXJ0QmxvY2soaW5kZXg6IG51bWJlciwgYmxvY2s6IEJsb2NrKTogdGhpcyB7XG4gICAgICAgICAgICB0aGlzLl9ibG9ja3Muc3BsaWNlKGluZGV4IC0gMSwgMCwgYmxvY2spO1xuICAgICAgICAgICAgdGhpcy5maXh1cE93bmVyc2hpcChpbmRleCk7XG5cbiAgICAgICAgICAgIHRoaXMubm90aWZ5KGluZGV4IC0gMSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWxldGVzIHRoZSBjb3Vyc2UgYXQgdGhlIHNwZWNpZmllZCBpbmRleFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGRlbGV0ZUJsb2NrKGluZGV4OiBudW1iZXIpOiBCbG9jayB7XG4gICAgICAgICAgICBjb25zdCBibG9jazogQmxvY2sgPSB0aGlzLmdldEJsb2NrKGluZGV4KTtcblxuICAgICAgICAgICAgdGhpcy5fYmxvY2tzLnNwbGljZShpbmRleCAtIDEsIDEpO1xuICAgICAgICAgICAgYmxvY2suY2xlYXJPd25lcnNoaXAoKTtcbiAgICAgICAgICAgIHRoaXMuZml4dXBPd25lcnNoaXAoaW5kZXgpO1xuXG4gICAgICAgICAgICB0aGlzLm5vdGlmeShpbmRleCAtIDEpO1xuICAgICAgICAgICAgcmV0dXJuIGJsb2NrO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhlbHBlciB0byBmaXh1cCBvd25lcnNoaXAgb2YgYmxvY2tzXG4gICAgICAgICAqL1xuICAgICAgICBwcml2YXRlIGZpeHVwT3duZXJzaGlwKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IGluZGV4OyBpIDw9IHRoaXMuZ2V0TGVuZ3RoKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0QmxvY2soaSkuc2V0T3duZXJzaGlwKHsnY29udGFpbmVyJzogdGhpcywgJ2luZGV4JzogaX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQWJzdHJhY3RTaXgudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkNoYW5nZXMudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlNpeFR5cGVcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlZpc2l0b3IvQWJzdHJhY3QudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBBIHNsb3cgc2l4XG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIFNsb3cgZXh0ZW5kcyBBYnN0cmFjdFNpeCB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFR5cGUgb2YgdGhlIHNpeFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBTaXhUeXBlLlNsb3c7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE5vdGF0aW9uIChleGNsdWRpbmcgY2FsbClcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbm90YXRpb24gPSBbJzMnLCAnMScsICczJywgJzEnLCAnMyddO1xuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbm90YXRpb24gPSBTbG93Lm5vdGF0aW9uO1xuXG4gICAgICAgIC8qIEFic3RyYWN0QmxvY2sgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWNlaXZlcyBhIHZpc2l0b3IgdGhhdCB3aWxsIGJlIGNhbGxlZCB0byBwcm9jZXNzIGVhY2ggcm93XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgYWNjZXB0KC4uLnZpc2l0b3JzOiBWaXNpdG9yLkFic3RyYWN0VmlzaXRvcltdKTogdGhpcyB7XG4gICAgICAgICAgICBjb25zdCByb3cgPSB0aGlzLmdldEluaXRpYWxSb3coKTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCB2aXNpdG9yIG9mIHZpc2l0b3JzKSB7XG4gICAgICAgICAgICAgICAgQ2hhbmdlcy5wZXJtdXRlQ2FsbChyb3csIHRoaXMuX2NhbGwpO1xuICAgICAgICAgICAgICAgIHZpc2l0b3IudmlzaXQocm93LCB0aGlzKTtcblxuICAgICAgICAgICAgICAgIENoYW5nZXMucGVybXV0ZTMocm93KTtcbiAgICAgICAgICAgICAgICB2aXNpdG9yLnZpc2l0KHJvdywgdGhpcyk7XG5cbiAgICAgICAgICAgICAgICBDaGFuZ2VzLnBlcm11dGUxKHJvdyk7XG4gICAgICAgICAgICAgICAgdmlzaXRvci52aXNpdChyb3csIHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgQ2hhbmdlcy5wZXJtdXRlMyhyb3cpO1xuICAgICAgICAgICAgICAgIHZpc2l0b3IudmlzaXQocm93LCB0aGlzKTtcblxuICAgICAgICAgICAgICAgIENoYW5nZXMucGVybXV0ZTEocm93KTtcbiAgICAgICAgICAgICAgICB2aXNpdG9yLnZpc2l0KHJvdywgdGhpcyk7XG5cbiAgICAgICAgICAgICAgICB2aXNpdG9yLnZpc2l0KHRoaXMuX2VuZCwgdGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogQWJzdHJhY3RTaXggbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRyYW5zcG9zZXMgdGhlIGZyb250IHRocmVlIGJlbGxzIGRlcGVuZGluZyB1cG9uIHRoZSB0eXBlIG9mIHNpeFxuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIGFwcGx5U2l4VHJhbnNwb3NpdGlvbigpOiB2b2lkIHtcbiAgICAgICAgICAgIENoYW5nZXMucGVybXV0ZTEodGhpcy5fZW5kKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkFic3RyYWN0QmxvY2sudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkNoYW5nZXMudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlByaW50YWJsZU1peGluLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJSb3cudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInJvd0Zyb21TdHJpbmcudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlNpeFR5cGUudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlN0YWdlLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJWaXNpdG9yL0Fic3RyYWN0LnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogQSBzdGFydCBmb3IgYSB0b3VjaCBvZiBTdGVkbWFuXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIFN0YXJ0IGV4dGVuZHMgQWJzdHJhY3RCbG9jayB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluZGV4IG9mIHJvdW5kcyB3aXRoaW4gdGhlIHNpeFxuICAgICAgICAgKi9cbiAgICAgICAgcHJpdmF0ZSBfcm93SW5kZXg6IG51bWJlcjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVHlwZSBvZiBzaXhcbiAgICAgICAgICovXG4gICAgICAgIHByaXZhdGUgX3NpeFR5cGU6IFNpeFR5cGU7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJvd3Mgb2YgdGhlIHN0YXJ0XG4gICAgICAgICAqL1xuICAgICAgICBwcml2YXRlIF9yb3dzOiBSb3dbXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogTGFzdCByb3cgb2YgdGhlIHN0YXJ0XG4gICAgICAgICAqL1xuICAgICAgICBwcml2YXRlIF9sYXN0Um93OiBSb3c7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnN0cnVjdG9yXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgICAgIGluaXRpYWxSb3c6IFJvdyxcbiAgICAgICAgICAgIHByb3RlY3RlZCBfb3duZXJzaGlwPzogQmxvY2tPd25lcnNoaXAsXG4gICAgICAgICkge1xuICAgICAgICAgICAgc3VwZXIoaW5pdGlhbFJvdywgX293bmVyc2hpcCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3Jvd0luZGV4ID0gNDtcbiAgICAgICAgICAgIHRoaXMuX3NpeFR5cGUgPSBTaXhUeXBlLlF1aWNrO1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFByaW50YWJsZU1peGluIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQYXRoIGZvciB0aGlzIGNsYXNzJyB0ZW1wbGF0ZXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0ZW1wbGF0ZVBhdGg6IHN0cmluZyA9ICdTdGFydCc7XG5cbiAgICAgICAgLyogQWJzdHJhY3RCbG9jayBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERvZXMgYW55IGNhbGN1bGF0aW9uIG5lZWRlZCBieSB0aGUgYmxvY2tcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBjYWxjdWxhdGUoKTogdm9pZCB7XG4gICAgICAgICAgICBjb25zdCByb3cgPSB0aGlzLl9pbml0aWFsUm93LnNsaWNlKCk7XG4gICAgICAgICAgICB0aGlzLl9yb3dzID0gW107XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9yb3dJbmRleCA9PT0gNikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RSb3cgPSByb3c7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBGaWd1cmUgb3V0IHdoYXQgc29ydCBvZiBjaGFuZ2UgdG8gYXBwbHlcbiAgICAgICAgICAgIGxldCBjaGFuZ2UgPSAodGhpcy5fcm93SW5kZXggKyB0aGlzLl9zaXhUeXBlKSAlIDJcbiAgICAgICAgICAgICAgICA/IENoYW5nZXMucGVybXV0ZTFcbiAgICAgICAgICAgICAgICA6IENoYW5nZXMucGVybXV0ZTM7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9yb3dJbmRleDsgaSA8IDY7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIC8vIFN3YXAgdGhlIGNoYW5nZVxuICAgICAgICAgICAgICAgIGNoYW5nZSA9IGNoYW5nZSA9PT0gQ2hhbmdlcy5wZXJtdXRlMVxuICAgICAgICAgICAgICAgICAgICA/IENoYW5nZXMucGVybXV0ZTNcbiAgICAgICAgICAgICAgICAgICAgOiBDaGFuZ2VzLnBlcm11dGUxO1xuXG4gICAgICAgICAgICAgICAgLy8gQXBwbHkgaXQgYW5kIHN0b3JlXG4gICAgICAgICAgICAgICAgY2hhbmdlKHJvdyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm93cy5wdXNoKHJvdy5zbGljZSgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fbGFzdFJvdyA9IHRoaXMuX3Jvd3NbdGhpcy5fcm93cy5sZW5ndGggLSAxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSBsYXN0IHJvdyBpbiB0aGUgYmxvY2tcbiAgICAgICAgICogZS5nLiBhIGxlYWQgaGVhZCBvciBhIHNpeCBlbmQgKGZvciBTdGVkbWFuKVxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGdldExhc3QoKTogUm93IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sYXN0Um93LnNsaWNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVjZWl2ZXMgYSB2aXNpdG9yIHRoYXQgd2lsbCBiZSBjYWxsZWQgdG8gcHJvY2VzcyBlYWNoIHJvd1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGFjY2VwdCguLi52aXNpdG9yczogVmlzaXRvci5BYnN0cmFjdFZpc2l0b3JbXSk6IHRoaXMge1xuICAgICAgICAgICAgZm9yIChjb25zdCB2aXNpdG9yIG9mIHZpc2l0b3JzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCByb3cgb2YgdGhpcy5fcm93cykge1xuICAgICAgICAgICAgICAgICAgICB2aXNpdG9yLnZpc2l0KHJvdyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFc3RpbWF0ZXMgdGhlIG51bWJlciBvZiByb3dzIGluIHRoZSBibG9ja1xuICAgICAgICAgKiBUaGUgZXN0aW1hdGUgZG9lc24ndCB0YWtlIGludG8gYWNjb3VudCBjb21pbmcgcm91bmQgcGFydC13YXkgdGhyb3VnaFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGVzdGltYXRlUm93cygpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jvd3MubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogU3RhcnQgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFByb3ZpZGVzIHJlYWQgYWNjZXNzIHRvIHRoZSByb3cgaW5kZXhcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBnZXRSb3dJbmRleCgpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jvd0luZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFByb3ZpZGVzIHdyaXRlIGFjY2VzcyB0byB0aGUgcm93IGluZGV4XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc2V0Um93SW5kZXgocm93SW5kZXg6IG51bWJlciA9IDQpOiBTdGFydCB7XG4gICAgICAgICAgICBpZiAocm93SW5kZXggPCAxIHx8IHJvd0luZGV4ID4gNikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUm93IGluZGV4IG91dCBvZiByYW5nZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcm93SW5kZXggPSByb3dJbmRleDtcblxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGUoKTtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5Q29udGFpbmVyKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQcm92aWRlcyByZWFkIGFjY2VzcyB0byB0aGUgc2l4IHR5cGVcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBnZXRTaXhUeXBlKCk6IFNpeFR5cGUge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpeFR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUHJvdmlkZXMgd3JpdGUgYWNjZXNzIHRvIHRoZSBzaXggdHlwZVxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHNldFNpeFR5cGUoc2l4VHlwZTogU2l4VHlwZSA9IFNpeFR5cGUuUXVpY2spOiBTdGFydCB7XG4gICAgICAgICAgICB0aGlzLl9zaXhUeXBlID0gc2l4VHlwZTtcblxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGUoKTtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5Q29udGFpbmVyKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSByb3cgaW5kZXggYW5kIHNpeCB0eXBlIGZyb20gYSBzdHJpbmcgcmVwcmVzZW50YXRpb25cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzZXRGcm9tU3RyaW5nKGlucHV0OiBzdHJpbmcpOiB0aGlzIHtcbiAgICAgICAgICAgIGxldCByb3dJbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gICAgICAgICAgICBsZXQgc2l4VHlwZTogU2l4VHlwZSB8IG51bGwgPSBudWxsO1xuXG4gICAgICAgICAgICBjb25zdCByb3dJbmRleFBhdHRlcm5zOiB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9ID0ge1xuICAgICAgICAgICAgICAgICdmaXJzdCc6ICAxLCAnMXN0JzogMSwgJzEnOiAxLFxuICAgICAgICAgICAgICAgICdzZWNvbmQnOiAyLCAnMm5kJzogMiwgJzInOiAyLFxuICAgICAgICAgICAgICAgICd0aGlyZCc6ICAzLCAnM3JkJzogMywgJzMnOiAzLFxuICAgICAgICAgICAgICAgICdmb3VydGgnOiA0LCAnNHRoJzogNCwgJzQnOiA0LFxuICAgICAgICAgICAgICAgICdmaWZ0aCc6ICA1LCAnNXRoJzogNSwgJzUnOiA1LFxuICAgICAgICAgICAgICAgICdzaXh0aCc6ICA2LCAnNnRoJzogNiwgJzYnOiA2LFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBwYXR0ZXJuIGluIHJvd0luZGV4UGF0dGVybnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXBhdHRlcm4pIHsgY29udGludWU7IH0gIC8vIElFOCB0cmFpbGluZyBjb21tYVxuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKHBhdHRlcm4sICdpJyk7XG4gICAgICAgICAgICAgICAgaWYgKHJlZ2V4LnRlc3QoaW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvd0luZGV4ID0gcm93SW5kZXhQYXR0ZXJuc1twYXR0ZXJuXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgvc2xvdy9pLnRlc3QoaW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgc2l4VHlwZSA9IFNpeFR5cGUuU2xvdztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgvcXVpY2svaS50ZXN0KGlucHV0KSkge1xuICAgICAgICAgICAgICAgIHNpeFR5cGUgPSBTaXhUeXBlLlF1aWNrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocm93SW5kZXggPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBkZXRlcm1pbmUgcm93IGluZGV4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2l4VHlwZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGRldGVybWluZSBzaXggdHlwZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9yb3dJbmRleCA9IHJvd0luZGV4O1xuICAgICAgICAgICAgdGhpcy5fc2l4VHlwZSA9IHNpeFR5cGU7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlDb250YWluZXIoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJUZW1wbGF0ZUNvbnRleHQudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBDb250YWluZXIgZm9yIHRlbXBsYXRlc1xuICAgICAqXG4gICAgICogRGljdGlvbmFyeSBvZiB0ZW1wbGF0ZSBmdW5jdGlvbnMgdGhhdCBtYXAgZGF0YSB0byBhIHN0cmluZ1xuICAgICAqL1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YXJpYWJsZS1uYW1lXG4gICAgZXhwb3J0IGxldCBUZW1wbGF0ZXM6IHtcbiAgICAgICAgW2luZGV4OiBzdHJpbmddOiAoZGF0YTogVGVtcGxhdGVDb250ZXh0KSA9PiBzdHJpbmcsXG4gICAgfSA9IHsgfTtcbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQ2hhbmdlcy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQ291cnNlLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJSYW5kb21BY2Nlc3NDb250YWluZXIudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlJvdy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiU3RhZ2UudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlN0YXJ0LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJWaXNpdG9yL0Fic3RyYWN0LnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogQSB0b3VjaCwgYmVpbmcgYSBzZXQgb2YgY291cnNlc1xuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBUb3VjaCBleHRlbmRzIFJhbmRvbUFjY2Vzc0NvbnRhaW5lcjxDb3Vyc2U+IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3RhcnQgZm9yIHRoaXMgdG91Y2hcbiAgICAgICAgICovXG4gICAgICAgIHByaXZhdGUgX3N0YXJ0OiBTdGFydDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29uc3RydWN0b3JcbiAgICAgICAgICpcbiAgICAgICAgICogRXh0ZW5kcyB0aGUgQWJzdHJhY3RCbG9jayBjb250YWluZXIgdG8gc2V0IHVwIHRoZSBzdGFydC5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAgICAgaW5pdGlhbFJvdzogUm93LFxuICAgICAgICAgICAgcHJvdGVjdGVkIF9vd25lcnNoaXA/OiBCbG9ja093bmVyc2hpcCxcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBzdXBlcihpbml0aWFsUm93LCBfb3duZXJzaGlwKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0ID0gbmV3IFN0YXJ0KFxuICAgICAgICAgICAgICAgIGluaXRpYWxSb3csXG4gICAgICAgICAgICAgICAgeyAnY29udGFpbmVyJzogdGhpcywgJ2luZGV4JzogMCB9LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEFic3RyYWN0QmxvY2sgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWNlaXZlcyBhIHZpc2l0b3IgdGhhdCB3aWxsIGJlIGNhbGxlZCB0byBwcm9jZXNzIGVhY2ggcm93XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgYWNjZXB0KC4uLnZpc2l0b3JzOiBWaXNpdG9yLkFic3RyYWN0VmlzaXRvcltdKTogdGhpcyB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHZpc2l0b3Igb2YgdmlzaXRvcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFydC5hY2NlcHQodmlzaXRvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzdXBlci5hY2NlcHQoLi4udmlzaXRvcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVzdGltYXRlcyB0aGUgbnVtYmVyIG9mIHJvd3MgaW4gdGhlIGJsb2NrXG4gICAgICAgICAqIFRoZSBlc3RpbWF0ZSBkb2Vzbid0IHRha2UgaW50byBhY2NvdW50IGNvbWluZyByb3VuZCBwYXJ0LXdheSB0aHJvdWdoXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZXN0aW1hdGVSb3dzKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnQuZXN0aW1hdGVSb3dzKCkgKyBzdXBlci5lc3RpbWF0ZVJvd3MoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFByaW50YWJsZU1peGluIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQYXRoIGZvciB0aGlzIGNsYXNzJyB0ZW1wbGF0ZXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0ZW1wbGF0ZVBhdGg6IHN0cmluZyA9ICdUb3VjaCc7XG5cbiAgICAgICAgLyogQWJzdHJhY3RDb250YWluZXIgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFByb3BhZ2F0ZXMgZGF0YSBmcm9tIGEgcHJldmlvdXMgYmxvY2sgdG8gYSBjdXJyZW50IGJsb2NrXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgcHJvcGFnYXRlQ3VycmVudEJsb2NrKFxuICAgICAgICAgICAgcHJldmlvdXM6IENvdXJzZSxcbiAgICAgICAgICAgIGN1cnJlbnQ6IENvdXJzZSxcbiAgICAgICAgKTogdm9pZCB7XG4gICAgICAgICAgICBjb25zdCBzaXhUeXBlID0gcHJldmlvdXMuZ2V0U2l4KHByZXZpb3VzLmdldExlbmd0aCgpKS50eXBlO1xuICAgICAgICAgICAgY3VycmVudC5zZXRJbml0aWFsUm93KHByZXZpb3VzLmdldExhc3QoKSk7XG4gICAgICAgICAgICBjdXJyZW50LnNldEZpcnN0U2l4VHlwZSgoc2l4VHlwZSArIDEpICUgMik7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUHJvcGFnYXRlcyBkYXRhIGZvciB0aGUgZmlyc3QgYmxvY2sgd2l0aGluIHRoZSBjb250YWluZXJcbiAgICAgICAgICogSGFuZGxlZCBhcyBhIHNwZWNpYWwgY2FzZSB0byBhbGxvdyBmb3IgZS5nLiBTdGVkbWFuIHN0YXJ0c1xuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIHByb3BhZ2F0ZUZpcnN0QmxvY2soZmlyc3Q6IENvdXJzZSk6IHZvaWQge1xuICAgICAgICAgICAgY29uc3Qgc2l4VHlwZSA9IHRoaXMuX3N0YXJ0LmdldFNpeFR5cGUoKTtcbiAgICAgICAgICAgIGZpcnN0LnNldEluaXRpYWxSb3codGhpcy5fc3RhcnQuZ2V0TGFzdCgpKTtcbiAgICAgICAgICAgIGZpcnN0LnNldEZpcnN0U2l4VHlwZSgoc2l4VHlwZSArIDEpICUgMik7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBUb3VjaCBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVhZCBhY2Nlc3MgdG8gdGhlIGNvdXJzZXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBnZXRDb3Vyc2VzOiAoKSA9PiBDb3Vyc2VbXSA9IHRoaXMuZ2V0QmxvY2tzO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWFkIGFjY2VzcyB0byBhIGNvdXJzZVxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGdldENvdXJzZTogKGluZGV4OiBudW1iZXIpID0+IENvdXJzZSA9IHRoaXMuZ2V0QmxvY2s7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluc2VydHMgYSBjb3Vyc2UgYXQgdGhlIHNwZWNpZmllZCBpbmRleFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGluc2VydENvdXJzZTogKGluZGV4OiBudW1iZXIsIGNvdXJzZTogQ291cnNlKSA9PiB0aGlzID1cbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0QmxvY2s7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlbGV0ZXMgdGhlIGNvdXJzZSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZGVsZXRlQ291cnNlOiAoaW5kZXg6IG51bWJlcikgPT4gQ291cnNlID0gdGhpcy5kZWxldGVCbG9jaztcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVhZCBhY2Nlc3MgdG8gdGhlIHN0YXJ0XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZ2V0U3RhcnQoKTogU3RhcnQge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0O1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYSBuZXcgdG91Y2ggZnJvbSBhIHN0cmluZyByZXByZXNlbnRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHN0YXRpYyBmcm9tU3RyaW5nKGlucHV0OiBzdHJpbmcpOiBUb3VjaCB7XG4gICAgICAgICAgICBjb25zdCBsaW5lczogc3RyaW5nW10gPSBpbnB1dC5zcGxpdCgnXFxuJyk7XG5cbiAgICAgICAgICAgIGxldCBpOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgbGluZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgIGNvdXJzZTogQ291cnNlLFxuICAgICAgICAgICAgICAgIHRvdWNoOiBUb3VjaCB8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBzdGFydDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAvLyBQcm9jZXNzIGVhY2ggaW5wdXQgbGluZSwgbWFraW5nIHRleHQgc3Vic3RpdHV0aW9uc1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgbGluZSA9IGxpbmVzW2ldO1xuXG4gICAgICAgICAgICAgICAgLy8gRHJvcCBhbnkgY29udGVudCBhZnRlciBjb21tZW50IGNoYXJhY3RlcnMgXCIvL1wiXG4gICAgICAgICAgICAgICAgbGluZSA9IGxpbmUucmVwbGFjZSgvXFwvXFwvLiokLywgJycpO1xuXG4gICAgICAgICAgICAgICAgLy8gSWdub3JlIGEgbWljcm9zaXJpbCBjb21tZW50IFwiL1wiIGF0IHRoZSBzdGFydCBvZiBhIGxpbmVcbiAgICAgICAgICAgICAgICBsaW5lID0gbGluZS5yZXBsYWNlKC9eXFwvLywgJycpO1xuXG4gICAgICAgICAgICAgICAgLy8gU2tpcCB0aGlzIGxpbmUgaWYgaXQncyBibGFua1xuICAgICAgICAgICAgICAgIGlmICgvXlxccyokLy50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFN0b3JlIHN0YXJ0IGRlZmluaXRpb25zIGZvciBsYXRlciBwcm9jZXNzaW5nXG4gICAgICAgICAgICAgICAgaWYgKC9zdGFydC9pLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBsaW5lO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRvdWNoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgdG91Y2ggd2l0aCBhIHN0YWdlIGJhc2VkIG9uIHRoZSBmaXJzdCBsaW5lXG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSBsaW5lLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghU3RhZ2VbbGluZS5sZW5ndGhdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCByZWNvZ25pc2Ugc3RhZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0b3VjaCA9IG5ldyBUb3VjaChyb3dGcm9tU3RyaW5nKCcxMjMnLCBsaW5lLmxlbmd0aCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIGNvdXJzZSBmb3IgZWFjaCByZW1haW5pbmcgbGluZVxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2UgPSBDb3Vyc2UuZnJvbVN0cmluZyh0b3VjaC5nZXRMYXN0KCksIGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICB0b3VjaC5pbnNlcnRDb3Vyc2UodG91Y2guZ2V0TGVuZ3RoKCkgKyAxLCBjb3Vyc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0b3VjaCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gaW5wdXQgbGluZXMnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgdG91Y2guZ2V0U3RhcnQoKS5zZXRGcm9tU3RyaW5nKHN0YXJ0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRvdWNoO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIERPTSBoZWxwZXIgdXRpbGl0aWVzXG4gICAgICovXG4gICAgZXhwb3J0IG5hbWVzcGFjZSBEb20ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb21wdXRlcyB0aGUgd2lkdGggb2YgYW4gZWxlbWVudFxuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIGdldFdpZHRoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5vZmZzZXRXaWR0aCArIDEgIC8vIEFsbG93IGZvciBmcmFjdGlvbmFsIHBhcnRcbiAgICAgICAgICAgICAgICArIGdldE1ldHJpYyhlbGVtZW50LCAnbWFyZ2luTGVmdCcpXG4gICAgICAgICAgICAgICAgKyBnZXRNZXRyaWMoZWxlbWVudCwgJ21hcmdpblJpZ2h0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29tcHV0ZXMgdGhlIGhlaWdodCBvZiBhbiBlbGVtZW50XG4gICAgICAgICAqL1xuICAgICAgICBleHBvcnQgZnVuY3Rpb24gZ2V0SGVpZ2h0KGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5vZmZzZXRIZWlnaHQgKyAxICAvLyBBbGxvdyBmb3IgZnJhY3Rpb25hbCBwYXJ0XG4gICAgICAgICAgICAgICAgKyBnZXRNZXRyaWMoZWxlbWVudCwgJ21hcmdpblRvcCcpXG4gICAgICAgICAgICAgICAgKyBnZXRNZXRyaWMoZWxlbWVudCwgJ21hcmdpbkJvdHRvbScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlYWRzIGEgc3R5bGUtcmVsYXRlZCBtZXRyaWMgZnJvbSBhbiBlbGVtZW50XG4gICAgICAgICAqIERlc2lnbmVkIHRvIHJlYWQgZGltZW5zaW9ucyBvZiBwYWRkaW5nLCBtYXJnaW5zLCBldGMuXG4gICAgICAgICAqIFZhbHVlcyBvZiBcImF1dG9cIiBhcmUgcmV0dXJuZWQgYXMgemVybzogc2V0IGV4cGxpY2l0IHZhbHVlcyBpblxuICAgICAgICAgKiBzdHlsZXNoZWV0cyBpbiBvcmRlciB0byBhdm9pZCB0aGlzLlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZ2V0TWV0cmljKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBtZXRyaWM6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgICAgICBsZXQgbWV0cmljVGV4dDogc3RyaW5nO1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XG4gICAgICAgICAgICAgICAgbWV0cmljVGV4dCA9XG4gICAgICAgICAgICAgICAgICAgIChnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpIGFzIGFueSlbbWV0cmljXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWV0cmljVGV4dCA9IChlbGVtZW50IGFzIGFueSkuY3VycmVudFN0eWxlW21ldHJpY107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWV0cmljVGV4dCA9PT0gJ2F1dG8nID8gMCA6IHBhcnNlSW50KG1ldHJpY1RleHQpICsgMTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0RvbS9tZXRyaWNzLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9TdGFnZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vVGVtcGxhdGVzLnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogUHJpY2tlcnNcbiAgICAgKiBTYWRseSBmb3IgdHNsaW50LCB0aGVzZSB3aWxsIHNoYWRvdyB0aGUgdG9wLWxldmVsIG5hbWVzcGFjZSB1bnRpbCBJIGNhblxuICAgICAqIHRoaW5rIG9mIGEgYmV0dGVyIG5hbWUuXG4gICAgICovXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXNoYWRvd2VkLXZhcmlhYmxlXG4gICAgZXhwb3J0IG5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgICAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RQcmlja2VyIHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgX2lmcmFtZT86IEhUTUxJRnJhbWVFbGVtZW50LFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgLy8gTk9PUFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEV2ZW50IGhhbmRsZXIgZm9yIHdpbmRvdy5vbmxvYWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIGFic3RyYWN0IG9uTG9hZCgpOiB2b2lkO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlc2l6ZXMgdGhlIHBhcmVudCBpZnJhbWUgaWYgb25lIGV4aXN0c1xuICAgICAgICAgICAgICogTWF5IGJlIG92ZXJyaWRkZW47IGRlZmF1bHQgaW1wbGVtZW50YXRpb24gdXNlcyBlbGVtZW50cyB0aGF0IGFyZVxuICAgICAgICAgICAgICogaW1tZWRpYXRlIGNoaWxkcmVuIG9mIHRoZSBib2R5IGVsZW1lbnQgYXMgZm9sbG93czpcbiAgICAgICAgICAgICAqICAtIHdpZHRoOiBzdW0gb2YgYWxsIGVsZW1lbnRzJyB3aWR0aHMgYW5kIG1hcmdpbnNcbiAgICAgICAgICAgICAqICAtIGhlaWdodDogbWF4aW11bSBvZiBhbGwgZWxlbWVudHMnIGhlaWdodHMgYW5kIG1hcmdpbnNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJvdGVjdGVkIHJlc2l6ZSgpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2lmcmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgdGhlRG9jID0gKHRoaXMuX2lmcmFtZS5jb250ZW50V2luZG93IGFzIFdpbmRvdykuZG9jdW1lbnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudHMgPSB0aGVEb2MuYm9keS5jaGlsZHJlbjtcbiAgICAgICAgICAgICAgICBsZXQgd2lkdGggPSAwO1xuICAgICAgICAgICAgICAgIGxldCBoZWlnaHQgPSAwO1xuXG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByZWZlci1mb3Itb2ZcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSA9IGkgKyAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtZW50c1tpXSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGggPSB3aWR0aCArIERvbS5nZXRXaWR0aChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gTWF0aC5tYXgoaGVpZ2h0LCBEb20uZ2V0SGVpZ2h0KGVsZW1lbnQpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9pZnJhbWUud2lkdGggPSB3aWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgdGhpcy5faWZyYW1lLmhlaWdodCA9IGhlaWdodCArICdweCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogV3JhcHMgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgYW5kIGFkZHMgdHlwZSBpbmZvcm1hdGlvblxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcm90ZWN0ZWQgZ2V0RWw8VCBleHRlbmRzIEhUTUxFbGVtZW50PihpZDogc3RyaW5nKTogVCB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGhlRG9jID0gdGhpcy5faWZyYW1lXG4gICAgICAgICAgICAgICAgICAgID8gKHRoaXMuX2lmcmFtZS5jb250ZW50V2luZG93IGFzIFdpbmRvdykuZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAgICAgOiBkb2N1bWVudDtcblxuICAgICAgICAgICAgICAgIC8vIElnbm9yZSByaXNrIGVsZW1lbnRzIG1heSBiZSBudWxsIHdoZW4gdXNpbmcgb3VyIG93biB0ZW1wbGF0ZXNcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhlRG9jLmdldEVsZW1lbnRCeUlkKGlkKSBhcyBUO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIERPTSBoZWxwZXIgdXRpbGl0aWVzXG4gICAgICovXG4gICAgZXhwb3J0IG5hbWVzcGFjZSBEb20ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIaWRlcyBhIGJsb2NrIGVsZW1lbnRcbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBoaWRlKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG93cyBhIGJsb2NrIGVsZW1lbnRcbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBzaG93KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vUHJpbnRhYmxlTWl4aW5cIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBNdXNpYyBjbGFzc2VzIHRvIGFuYWx5c2Ugcm93c1xuICAgICAqL1xuICAgIGV4cG9ydCBuYW1lc3BhY2UgTXVzaWMge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnRlcmZhY2Ugc3VwcG9ydGVkIGJ5IGNsYXNzZXMgdGhhdCBjYW4gbWF0Y2ggYSByb3cgZm9yIG11c2ljXG4gICAgICAgICAqL1xuICAgICAgICBleHBvcnQgaW50ZXJmYWNlIE1hdGNoZXJJbnRlcmZhY2UgZXh0ZW5kcyBQcmludGFibGVNaXhpbiB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogTWF0Y2hlcyBhIHJvdyBzdHJpbmdcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbWF0Y2gocm93OiBzdHJpbmcpOiBib29sZWFuO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFByb3ZpZGVzIHJlYWQgYWNjZXNzIHRvIHRoZSBuYW1lXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGdldE5hbWUoKTogc3RyaW5nO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFByb3ZpZGVzIHJlYWQgYWNjZXNzIHRvIHRoZSBjb3VudCBvZiBtYXRjaGVzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGdldE1hdGNoQ291bnQoKTogbnVtYmVyO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9yb3dGcm9tU3RyaW5nLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9TdGFnZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vc3RyaW5nRnJvbVJvdy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiTWF0Y2hlckludGVyZmFjZS50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIE11c2ljIGNsYXNzZXMgdG8gYW5hbHlzZSByb3dzXG4gICAgICovXG4gICAgZXhwb3J0IG5hbWVzcGFjZSBNdXNpYyB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFic3RyYWN0IG11c2ljIG1hdGNoaW5nIHNjaGVtZVxuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0U2NoZW1lIGltcGxlbWVudHMgTWF0Y2hlckludGVyZmFjZSB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogTWF0Y2hlcnMgZm9yIHRoaXMgc2NoZW1lXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByb3RlY3RlZCBfbWF0Y2hlcnM6IE1hdGNoZXJJbnRlcmZhY2VbXTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX3N0YWdlOiBTdGFnZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21hdGNoZXJzID0gdGhpcy5jcmVhdGVNYXRjaGVycyhcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nRnJvbVJvdyhyb3dGcm9tU3RyaW5nKCcnLCBfc3RhZ2UpKSwgIC8vIHJvdW5kc1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIE1hdGNoZXJJbnRlcmZhY2UgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogTWF0Y2hlcyBhIHJvdyBzdHJpbmdcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIG1hdGNoKHJvdzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBtYXRjaGVyIG9mIHRoaXMuX21hdGNoZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghbWF0Y2hlcikgeyBjb250aW51ZTsgfSAgLy8gSUU4IHRyYWlsaW5nIGNvbW1hXG4gICAgICAgICAgICAgICAgICAgIC8vIENhbGwgbWF0Y2hlci5tYXRjaCBleHBsaWNpdGx5Li4uXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvd1Jlc3VsdDogYm9vbGVhbiA9IG1hdGNoZXIubWF0Y2gocm93KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gLi4uIG5vdCBpbiBoZXJlLCBvciB8fCB3aWxsIHNob3J0LWNpcmN1aXQgaXRcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0IHx8IHJvd1Jlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFByb3ZpZGVzIHJlYWQgYWNjZXNzIHRvIHRoZSBuYW1lXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBhYnN0cmFjdCBnZXROYW1lKCk6IHN0cmluZztcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBQcm92aWRlcyByZWFkIGFjY2VzcyB0byB0aGUgY291bnQgb2YgbWF0Y2hlc1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgZ2V0TWF0Y2hDb3VudCgpOiBudW1iZXIge1xuICAgICAgICAgICAgICAgIGxldCBtYXRjaGVzOiBudW1iZXIgPSAwO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBtYXRjaGVyIG9mIHRoaXMuX21hdGNoZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghbWF0Y2hlcikgeyBjb250aW51ZTsgfSAgLy8gSUU4IHRyYWlsaW5nIGNvbW1hXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZXMgKz0gbWF0Y2hlci5nZXRNYXRjaENvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIFByaW50YWJsZU1peGluIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVuZGVycyB0aGUgb2JqZWN0IHdpdGggYSB0ZW1wbGF0ZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgcHJpbnQ6ICh0OiBzdHJpbmcsIGM/OiBUZW1wbGF0ZUNvbnRleHQpID0+IHN0cmluZztcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBQYXRoIGZvciB0aGlzIGNsYXNzJyB0ZW1wbGF0ZXNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IHRlbXBsYXRlUGF0aDogc3RyaW5nID0gJ011c2ljLkFic3RyYWN0U2NoZW1lJztcblxuICAgICAgICAgICAgLyogQWJzdHJhY3RTY2hlbWUgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBDcmVhdGUgbWF0Y2hlcnMgZm9yIHRoaXMgc2NoZW1lL3N0YWdlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBjcmVhdGVNYXRjaGVycyhcbiAgICAgICAgICAgICAgICByb3VuZHM6IHN0cmluZyxcbiAgICAgICAgICAgICk6IE1hdGNoZXJJbnRlcmZhY2VbXTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBQcm92aWRlcyByZWFkIGFjY2VzcyB0byB0aGUgbWF0Y2hlcnNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIGdldE1hdGNoZXJzKCk6IE1hdGNoZXJJbnRlcmZhY2VbXSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hdGNoZXJzLnNsaWNlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIFByaW50YWJsZU1peGluLm1ha2VQcmludGFibGUoQWJzdHJhY3RTY2hlbWUpO1xuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogTXVzaWMgY2xhc3NlcyB0byBhbmFseXNlIHJvd3NcbiAgICAgKi9cbiAgICBleHBvcnQgbmFtZXNwYWNlIE11c2ljIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVHlwZXMgb2YgbXVzaWMgbWF0Y2hpbmdcbiAgICAgICAgICogQGVudW0ge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBlbnVtIE1hdGNoVHlwZSB7QmFjayA9IC0xLCBSb3csIEZyb250fVxuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1RlbXBsYXRlQ29udGV4dC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiTWF0Y2hlckludGVyZmFjZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiTWF0Y2hUeXBlLnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogTXVzaWMgY2xhc3NlcyB0byBhbmFseXNlIHJvd3NcbiAgICAgKi9cbiAgICBleHBvcnQgbmFtZXNwYWNlIE11c2ljIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUGF0dGVybiB0aGF0IGNhbiBiZSB1c2VkIHRvIG1hdGNoIHJvd3NcbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBjbGFzcyBQYXR0ZXJuIGltcGxlbWVudHMgTWF0Y2hlckludGVyZmFjZSB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ291bnQgb2YgbWF0Y2hlc1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcm90ZWN0ZWQgX21hdGNoQ291bnQ6IG51bWJlciA9IDA7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ29uc3RydWN0b3JcbiAgICAgICAgICAgICAqIEBwYXJhbSBwYXR0ZXJuICBzdHJpbmcgdG8gbWF0Y2hcbiAgICAgICAgICAgICAqIEBwYXJhbSBuYW1lICAgICBuYW1lIG9mIHRoaXMgcGF0dGVyblxuICAgICAgICAgICAgICogQHBhcmFtIHR5cGUgICAgIHR5cGUgb2YgbWF0Y2hcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY29uc3RydWN0b3IoXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIF9wYXR0ZXJuOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIF9uYW1lPzogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBfdHlwZTogTWF0Y2hUeXBlID0gTWF0Y2hUeXBlLkJhY2ssXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAvLyBOT09QXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIE1hdGNoZXJJbnRlcmZhY2UgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogTWF0Y2hlcyBhIHJvdyBzdHJpbmdcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIG1hdGNoKHJvdzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3R5cGUgPT09IE1hdGNoVHlwZS5CYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IHJvdy5zbGljZSgtdGhpcy5fcGF0dGVybi5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fdHlwZSA9PT0gTWF0Y2hUeXBlLkZyb250KSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IHJvdy5zbGljZSgwLCB0aGlzLl9wYXR0ZXJuLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJvdyA9PT0gdGhpcy5fcGF0dGVybikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXRjaENvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBQcm92aWRlcyByZWFkIGFjY2VzcyB0byB0aGUgbmFtZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9uYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhdHRlcm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFByb3ZpZGVzIHJlYWQgYWNjZXNzIHRvIHRoZSBjb3VudCBvZiBtYXRjaGVzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBnZXRNYXRjaENvdW50KCk6IG51bWJlciB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hdGNoQ291bnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIFByaW50YWJsZU1peGluIG1ldGhvZHMqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVuZGVycyB0aGUgb2JqZWN0IHdpdGggYSB0ZW1wbGF0ZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgcHJpbnQ6ICh0OiBzdHJpbmcsIGM/OiBUZW1wbGF0ZUNvbnRleHQpID0+IHN0cmluZztcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBQYXRoIGZvciB0aGlzIGNsYXNzJyB0ZW1wbGF0ZXNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IHRlbXBsYXRlUGF0aDogc3RyaW5nID0gJ011c2ljLlBhdHRlcm4nO1xuXG4gICAgICAgICAgICAvKiBQYXR0ZXJuIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIERldGVybWluZXMgd2hldGhlciB0aGlzIGlzIGEgd2lsZGNhcmQgbWF0Y2hcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIGlzV2lsZGNhcmRNYXRjaCgpOiBib29sZWFuIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdHlwZSAhPT0gTWF0Y2hUeXBlLlJvdztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgUHJpbnRhYmxlTWl4aW4ubWFrZVByaW50YWJsZShQYXR0ZXJuKTtcblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9UZW1wbGF0ZUNvbnRleHQudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIk1hdGNoZXJJbnRlcmZhY2UudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlBhdHRlcm4udHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBNdXNpYyBjbGFzc2VzIHRvIGFuYWx5c2Ugcm93c1xuICAgICAqL1xuICAgIGV4cG9ydCBuYW1lc3BhY2UgTXVzaWMge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHcm91cCBvZiBzaW1pbGFyIHBhdHRlcm5zIHRvIG1hdGNoIHJlbGF0ZWQgcm93c1xuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGNsYXNzIFBhdHRlcm5Hcm91cCBpbXBsZW1lbnRzIE1hdGNoZXJJbnRlcmZhY2Uge1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFBhdHRlcm5zIGluIHRoaXMgZ3JvdXBcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJvdGVjdGVkIF9wYXR0ZXJuczogUGF0dGVybltdO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENvbnN0cnVjdG9yXG4gICAgICAgICAgICAgKiBAcGFyYW0gbmFtZSAgICAgICAgICAgbmFtZSBvZiB0aGlzIHBhdHRlcm4gZ3JvdXBcbiAgICAgICAgICAgICAqIEBwYXJhbSBwYXR0ZXJucyAgICAgICBwYXR0ZXJucyBpbiB0aGlzIGdyb3VwXG4gICAgICAgICAgICAgKiBAcGFyYW0gcGFyZW50UGF0dGVybiAgdG9wLWxldmVsIHBhdHRlcm4gZm9yIGNvdW50XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBfbmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHBhdHRlcm5zOiBQYXR0ZXJuW10sXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIF9wYXJlbnRQYXR0ZXJuPzogUGF0dGVybixcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhdHRlcm5zID0gcGF0dGVybnMuc2xpY2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogTWF0Y2hlckludGVyZmFjZSBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBNYXRjaGVzIGEgcm93IHN0cmluZ1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgbWF0Y2gocm93OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHBhdHRlcm4gb2YgdGhpcy5fcGF0dGVybnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXR0ZXJuKSB7IGNvbnRpbnVlOyB9ICAvLyBJRTggdHJhaWxpbmcgY29tbWFcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FsbCBwYXR0ZXJuLm1hdGNoIGV4cGxpY2l0bHkuLi5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93UmVzdWx0OiBib29sZWFuID0gcGF0dGVybi5tYXRjaChyb3cpO1xuICAgICAgICAgICAgICAgICAgICAvLyAuLi4gbm90IGluIGhlcmUsIG9yIHx8IHdpbGwgc2hvcnQtY2lyY3VpdCBpdFxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgfHwgcm93UmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wYXJlbnRQYXR0ZXJuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhcmVudFBhdHRlcm4ubWF0Y2gocm93KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFByb3ZpZGVzIHJlYWQgYWNjZXNzIHRvIHRoZSBuYW1lXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUHJvdmlkZXMgcmVhZCBhY2Nlc3MgdG8gdGhlIGNvdW50IG9mIG1hdGNoZXNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIGdldE1hdGNoQ291bnQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcGFyZW50UGF0dGVybikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50UGF0dGVybi5nZXRNYXRjaENvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFN1Ym1hdGNoQ291bnQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogUHJpbnRhYmxlTWl4aW4gbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZW5kZXJzIHRoZSBvYmplY3Qgd2l0aCBhIHRlbXBsYXRlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBwcmludDogKHQ6IHN0cmluZywgYz86IFRlbXBsYXRlQ29udGV4dCkgPT4gc3RyaW5nO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFBhdGggZm9yIHRoaXMgY2xhc3MnIHRlbXBsYXRlc1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdGVtcGxhdGVQYXRoOiBzdHJpbmcgPSAnTXVzaWMuUGF0dGVybkdyb3VwJztcblxuICAgICAgICAgICAgLyogUGF0dGVybkdyb3VwIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBQcm92aWRlcyByZWFkIGFjY2VzcyB0byB0aGUgcGF0dGVybnNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIGdldFBhdHRlcm5zKCk6IFBhdHRlcm5bXSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhdHRlcm5zLnNsaWNlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUHJvdmlkZXMgcmVhZCBhY2Nlc3MgdG8gdGhlIGNvdW50IG9mIG1hdGNoZXMgd2l0aGluIHBhdHRlcm5zXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBnZXRTdWJtYXRjaENvdW50KCk6IG51bWJlciB7XG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoZXM6IG51bWJlciA9IDA7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHBhdHRlcm4gb2YgdGhpcy5fcGF0dGVybnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXR0ZXJuKSB7IGNvbnRpbnVlOyB9ICAvLyBJRTggdHJhaWxpbmcgY29tbWFcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcyArPSBwYXR0ZXJuLmdldE1hdGNoQ291bnQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgUHJpbnRhYmxlTWl4aW4ubWFrZVByaW50YWJsZShQYXR0ZXJuR3JvdXApO1xuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLyogdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9TdGFnZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQWJzdHJhY3RTY2hlbWUudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIk1hdGNoVHlwZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiUGF0dGVybi50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiUGF0dGVybkdyb3VwLnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogTXVzaWMgY2xhc3NlcyB0byBhbmFseXNlIHJvd3NcbiAgICAgKi9cbiAgICBleHBvcnQgbmFtZXNwYWNlIE11c2ljIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogTUJELXN0eWxlIG11c2ljIG1hdGNoaW5nIHNjaGVtZVxuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGNsYXNzIE1iZFNjaGVtZSBleHRlbmRzIEFic3RyYWN0U2NoZW1lIHtcblxuICAgICAgICAgICAgLyogTWF0Y2hlckludGVyZmFjZSBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBQcm92aWRlcyByZWFkIGFjY2VzcyB0byB0aGUgbmFtZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgICAgICAgICAgICAgIHJldHVybiAnTUJEIHNjaGVtZSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIEFic3RyYWN0U2NoZW1lIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ3JlYXRlIG1hdGNoZXJzIGZvciB0aGlzIHNjaGVtZS9zdGFnZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlTWF0Y2hlcnMocm91bmRzOiBzdHJpbmcpOiBNYXRjaGVySW50ZXJmYWNlW10ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoZXJzOiBNYXRjaGVySW50ZXJmYWNlW10gPSBbIF07XG4gICAgICAgICAgICAgICAgbGV0IHBhdHRlcm46IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybkFycmF5OiBQYXR0ZXJuW107XG5cbiAgICAgICAgICAgICAgICAvLyA1Njc4OTBFXG4gICAgICAgICAgICAgICAgcGF0dGVybiA9IHJvdW5kcy5zbGljZSg0IC0gdGhpcy5fc3RhZ2UpO1xuICAgICAgICAgICAgICAgIG1hdGNoZXJzLnB1c2gobmV3IFBhdHRlcm4ocGF0dGVybikpO1xuXG4gICAgICAgICAgICAgICAgLy8gNTY3ODlFMFxuICAgICAgICAgICAgICAgIHBhdHRlcm4gPSByb3VuZHMuc2xpY2UoNCAtIHRoaXMuX3N0YWdlLCAtMilcbiAgICAgICAgICAgICAgICAgICAgKyByb3VuZHMuc2xpY2UoLTEpXG4gICAgICAgICAgICAgICAgICAgICsgcm91bmRzLnNsaWNlKC0yLCAtMSk7XG4gICAgICAgICAgICAgICAgbWF0Y2hlcnMucHVzaChuZXcgUGF0dGVybihwYXR0ZXJuKSk7XG5cbiAgICAgICAgICAgICAgICAvLyA2NTc4OTBFXG4gICAgICAgICAgICAgICAgcGF0dGVybiA9ICc2NScgKyByb3VuZHMuc2xpY2UoNiAtIHRoaXMuX3N0YWdlKTtcbiAgICAgICAgICAgICAgICBtYXRjaGVycy5wdXNoKG5ldyBQYXR0ZXJuKHBhdHRlcm4pKTtcblxuICAgICAgICAgICAgICAgIC8vIE5lYXIgbWlzc2VzXG4gICAgICAgICAgICAgICAgcGF0dGVybkFycmF5ID0gWyBdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLl9zdGFnZSAtIDE7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuID0gcm91bmRzLnNsaWNlKDAsIGkpICAvLyAxMjNcbiAgICAgICAgICAgICAgICAgICAgICAgICsgcm91bmRzLmNoYXJBdChpICsgMSkgICAgLy8gNVxuICAgICAgICAgICAgICAgICAgICAgICAgKyByb3VuZHMuY2hhckF0KGkpICAgICAgICAvLyA0XG4gICAgICAgICAgICAgICAgICAgICAgICArIHJvdW5kcy5zbGljZShpICsgMik7ICAgIC8vIDY3ODkwRVxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuQXJyYXkucHVzaChuZXcgUGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm4sXG4gICAgICAgICAgICAgICAgICAgICAgICByb3VuZHMuY2hhckF0KGkgKyAxKSArIHJvdW5kcy5jaGFyQXQoaSksXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRjaFR5cGUuUm93LFxuICAgICAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbWF0Y2hlcnMucHVzaChuZXcgUGF0dGVybkdyb3VwKCduZWFyIG1pc3NlcycsIHBhdHRlcm5BcnJheSkpO1xuXG4gICAgICAgICAgICAgICAgLy8gUXVlZW5zIG11c2ljXG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnN3aXRjaC1kZWZhdWx0XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLl9zdGFnZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFN0YWdlLlRyaXBsZXM6XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVycy5wdXNoKG5ldyBQYXR0ZXJuR3JvdXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzQ2OCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMjQ2JywgJzI0NjgnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzc1MzQ2JywgJzc1MzQ2OCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMTM1NzI0NicsICdRdWVlbnMnLCBNYXRjaFR5cGUuUm93KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzc1MzEyNDYnLCAnUmV2ZXJzZSBRdWVlbnMnLCBNYXRjaFR5cGUuUm93KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzEyNzUzNDYnLCAnV2hpdHRpbmd0b25zJywgTWF0Y2hUeXBlLlJvdyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignNDYnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTdGFnZS5DYXRlcnM6XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVycy5wdXNoKG5ldyBQYXR0ZXJuR3JvdXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzY4MCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignNDY4JywgJzQ2ODAnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzk3NTY4JywgJzk3NTY4MCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMTM1NzkyNDY4JywgJ1F1ZWVucycsIE1hdGNoVHlwZS5Sb3cpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignOTc1MzEyNDY4JywgJ1JldmVyc2UgUXVlZW5zJywgTWF0Y2hUeXBlLlJvdyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCcxMjM0OTc1NjgnLCAnV2hpdHRpbmd0b25zJywgTWF0Y2hUeXBlLlJvdyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignNjgnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTdGFnZS5DaW5xdWVzOlxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcnMucHVzaChuZXcgUGF0dGVybkdyb3VwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc4MFQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzY4MCcsICc2ODBUJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCdFOTc4MCcsICdFOTc4MFQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzEzNTc5RTI0NjgwJywgJ1F1ZWVucycsIE1hdGNoVHlwZS5Sb3cpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignRTk3NTMxMjQ2ODAnLCAnUmV2ZXJzZSBRdWVlbnMnLCBNYXRjaFR5cGUuUm93KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzUzMTI0NkU5NzgwJywgJ0RvdWJsZSBXaGl0dGluZ3RvbnMnLCBNYXRjaFR5cGUuUm93KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCc4MCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIFN0YWdlLlNleHR1cGxlczpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXJzLnB1c2gobmV3IFBhdHRlcm5Hcm91cChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnMFRCJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCc4MFQnLCAnODBUQicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignQUU5MFQnLCAnQUU5MFRCJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCcxMzU3OUVBMjQ2ODBUJywgJ1F1ZWVucycsIE1hdGNoVHlwZS5Sb3cpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignQUU5NzUzMTI0NjgwVCcsICdSZXZlcnNlIFF1ZWVucycsIE1hdGNoVHlwZS5Sb3cpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzBUJyksXG4gICAgICAgICAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU3RhZ2UuU2VwdHVwbGVzOlxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcnMucHVzaChuZXcgUGF0dGVybkdyb3VwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdUQicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMFRCJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCdDQUVUQicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMTM1NzlFQUMyNDY4MFRCJywgJ1F1ZWVucycsIE1hdGNoVHlwZS5Sb3cpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignQ0FFOTc1MzEyNDY4MFRCJywgJ1JldmVyc2UgUXVlZW5zJywgTWF0Y2hUeXBlLlJvdyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignVEInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbWF0Y2hlcnMucHVzaChuZXcgUGF0dGVybkdyb3VwKFxuICAgICAgICAgICAgICAgICAgICAnZnJvbnQgTEI1JyxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzEyMzQ1JywgJzEyMzQ1JywgTWF0Y2hUeXBlLkZyb250KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCc1NDMyMScsICc1NDMyMScsIE1hdGNoVHlwZS5Gcm9udCksXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMjM0NTYnLCAnMjM0NTYnLCBNYXRjaFR5cGUuRnJvbnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzY1NDMyJywgJzY1NDMyJywgTWF0Y2hUeXBlLkZyb250KSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICApKTtcblxuICAgICAgICAgICAgICAgIG1hdGNoZXJzLnB1c2gobmV3IFBhdHRlcm5Hcm91cChcbiAgICAgICAgICAgICAgICAgICAgJ2JhY2sgTEI1JyxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzEyMzQ1JywgJzEyMzQ1JywgTWF0Y2hUeXBlLkJhY2spLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzU0MzIxJywgJzU0MzIxJywgTWF0Y2hUeXBlLkJhY2spLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzIzNDU2JywgJzIzNDU2JywgTWF0Y2hUeXBlLkJhY2spLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzY1NDMyJywgJzY1NDMyJywgTWF0Y2hUeXBlLkJhY2spLFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICkpO1xuXG4gICAgICAgICAgICAgICAgbWF0Y2hlcnMucHVzaChuZXcgUGF0dGVybkdyb3VwKFxuICAgICAgICAgICAgICAgICAgICAnZnJvbnQgTEI0JyxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzEyMzQnLCAnMTIzNCcsIE1hdGNoVHlwZS5Gcm9udCksXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignNDMyMScsICc0MzIxJywgTWF0Y2hUeXBlLkZyb250KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCcyMzQ1JywgJzIzNDUnLCBNYXRjaFR5cGUuRnJvbnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzU0MzInLCAnNTQzMicsIE1hdGNoVHlwZS5Gcm9udCksXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMzQ1NicsICczNDU2JywgTWF0Y2hUeXBlLkZyb250KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCc2NTQzJywgJzY1NDMnLCBNYXRjaFR5cGUuRnJvbnQpLFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICkpO1xuXG4gICAgICAgICAgICAgICAgbWF0Y2hlcnMucHVzaChuZXcgUGF0dGVybkdyb3VwKFxuICAgICAgICAgICAgICAgICAgICAnYmFjayBMQjQnLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMTIzNCcsICcxMjM0JywgTWF0Y2hUeXBlLkJhY2spLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzQzMjEnLCAnNDMyMScsIE1hdGNoVHlwZS5CYWNrKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCcyMzQ1JywgJzIzNDUnLCBNYXRjaFR5cGUuQmFjayksXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignNTQzMicsICc1NDMyJywgTWF0Y2hUeXBlLkJhY2spLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzM0NTYnLCAnMzQ1NicsIE1hdGNoVHlwZS5CYWNrKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCc2NTQzJywgJzY1NDMnLCBNYXRjaFR5cGUuQmFjayksXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgKSk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZXZlcnNlIHJvbGx1cHNcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3RhZ2UgPT09IFN0YWdlLlRyaXBsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcnMucHVzaChuZXcgUGF0dGVybkdyb3VwKCdyZXZlcnNlIHJvbGx1cHMnLCBbbmV3IFBhdHRlcm4oJzc2NTQnKV0pKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuQXJyYXkgPSBbIF07XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IHRoaXMuX3N0YWdlIC0gODsgaSA+PSAwOyBpIC09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJldmVyc2Ugcm91bmRzXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuID0gcm91bmRzLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuID0gcGF0dGVybi5zbGljZShpLCBpICsgNCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuQXJyYXkucHVzaChuZXcgUGF0dGVybihwYXR0ZXJuKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcnMucHVzaChuZXcgUGF0dGVybkdyb3VwKCdyZXZlcnNlIHJvbGx1cHMnLCBwYXR0ZXJuQXJyYXkpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlcnM7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vQWJzdHJhY3RTaXgudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1Jvdy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQWJzdHJhY3QudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBWaXNpdG9yIGNsYXNzZXMgdG8gYW5hbHlzZSBibG9ja3NcbiAgICAgKi9cbiAgICBleHBvcnQgbmFtZXNwYWNlIFZpc2l0b3Ige1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaW1wbGUgdmlzaXRvciB0aGF0IGNvdW50cyByb3dzXG4gICAgICAgICAqXG4gICAgICAgICAqIEFjY3VtdWxhdGVzIGEgY291bnQgb2Ygcm93cyB0aGF0IGlzIGluY3JlbWVudGVkIGJ5IGVhY2ggY2FsbCB0b1xuICAgICAgICAgKiBbW3Zpc2l0XV0uXG4gICAgICAgICAqIFRoaXMgdmlzaXRvciBhbGxvd3MgdGhlIGNvdW50IG9mIHJvd3MgaW4gYSB0b3VjaCBiZWNhdXNlIHJvd3MgYXJlIG5vdFxuICAgICAgICAgKiBwcm9jZXNzZWQgYWZ0ZXIgcm91bmRzIGhhcyBiZWVuIHJlYWNoZWQuXG4gICAgICAgICAqL1xuICAgICAgICBleHBvcnQgY2xhc3MgQ291bnRlciBleHRlbmRzIEFic3RyYWN0VmlzaXRvciB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ291bnQgb2Ygcm93cyB0aGF0IGhhdmUgYmVlbiB2aXNpdGVkLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF9jb3VudDogbnVtYmVyID0gMDtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZXBvcnRzIHRoZSBjb3VudCBvZiByb3dzIGJ5IHByb3ZpZGluZyBwdWJsaWMgYWNjZXNzIHRvXG4gICAgICAgICAgICAgKiBbW19jb3VudF1dLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgZ2V0Q291bnQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY291bnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIEFic3RyYWN0VmlzaXRvciBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVjZWl2ZXMgYSByb3cgZm9yIHByb2Nlc3NpbmcuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByb3RlY3RlZCB2aXNpdEltcGxlbWVudGF0aW9uKHJvdzogUm93LCBzaXg/OiBBYnN0cmFjdFNpeCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvdW50ICs9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0Fic3RyYWN0U2l4LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9CbG9ja0RpcmVjdG9yeS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vUm93LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9zdHJpbmdGcm9tUm93LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9NdXNpYy9NYXRjaGVySW50ZXJmYWNlLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJBYnN0cmFjdC50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIFZpc2l0b3IgY2xhc3NlcyB0byBhbmFseXNlIGJsb2Nrc1xuICAgICAqL1xuICAgIGV4cG9ydCBuYW1lc3BhY2UgVmlzaXRvciB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZpc2l0b3IgZm9yIG11c2ljIGFuYWx5c2lzXG4gICAgICAgICAqXG4gICAgICAgICAqIE1hdGNoZXMgcm93cyB1c2luZyBhIG11c2ljIG1hdGNoZXIgKFtbTWF0Y2hlckludGVyZmFjZV1dKSB0aGF0IGNhblxuICAgICAgICAgKiByZXBvcnQgb24gdGhlIG11c2ljYWwgY29udGVudCBvZiBhIHRvdWNoLlxuICAgICAgICAgKiBUaGlzIHZpc2l0b3IgYWxzbyBhY2N1bXVsYXRlcyBhIFtbQmxvY2tEaXJlY3RvcnldXSByZWZlcmVuY2luZ1xuICAgICAgICAgKiBlYWNoIGJsb2NrIGNvbnRhaW5pbmcgYSBtdXNpY2FsIHJvdy5cbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBjbGFzcyBNdXNpYyBleHRlbmRzIEFic3RyYWN0VmlzaXRvciB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRGlyZWN0b3J5IG9mIG11c2ljYWwgYmxvY2tzLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF9kaXJlY3Rvcnk6IEJsb2NrRGlyZWN0b3J5ID0gbmV3IEJsb2NrRGlyZWN0b3J5KCk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ3JlYXRlcyB0aGUgdmlzaXRvciwgcHJvdmlkaW5nIHRoZSBtYXRjaGVyIHRoYXQgc2hvdWxkIGJlIHVzZWQuXG4gICAgICAgICAgICAgKiBAcGFyYW0gX21hdGNoZXIgTWF0Y2hlciB0byBiZSB1c2VkLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX21hdGNoZXI6IE11c2ljLk1hdGNoZXJJbnRlcmZhY2UpIHtcbiAgICAgICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlcG9ydHMgb24gbXVzaWNhbCBjb250ZW50IG9mIGEgdG91Y2ggYnkgcHJvdmlkaW5nIHB1YmxpYyBhY2Nlc3NcbiAgICAgICAgICAgICAqIHRvIFtbX21hdGNoZXJdXS5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIGdldE1hdGNoZXIoKTogTXVzaWMuTWF0Y2hlckludGVyZmFjZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hdGNoZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVwb3J0cyB3aGVyZSBtdXNpYyBpcyBmb3VuZCB3aXRoaW4gYSB0b3VjaCBieSBwcm92aWRpbmcgcHVibGljXG4gICAgICAgICAgICAgKiBhY2Nlc3MgdG8gW1tfZGlyZWN0b3J5XV0uXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBnZXREaXJlY3RvcnkoKTogQmxvY2tEaXJlY3Rvcnkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kaXJlY3Rvcnk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIEFic3RyYWN0VmlzaXRvciBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVjZWl2ZXMgYSByb3cgZm9yIHByb2Nlc3NpbmcuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByb3RlY3RlZCB2aXNpdEltcGxlbWVudGF0aW9uKHJvdzogUm93LCBzaXg/OiBBYnN0cmFjdFNpeCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSB0aGlzLl9tYXRjaGVyLm1hdGNoKHN0cmluZ0Zyb21Sb3cocm93KSk7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMgJiYgc2l4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RpcmVjdG9yeS5hZGQoc2l4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0Fic3RyYWN0U2l4LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9CbG9ja0RpcmVjdG9yeS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vUm93LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9zdHJpbmdGcm9tUm93LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJBYnN0cmFjdC50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIFZpc2l0b3IgY2xhc3NlcyB0byBhbmFseXNlIGJsb2Nrc1xuICAgICAqL1xuICAgIGV4cG9ydCBuYW1lc3BhY2UgVmlzaXRvciB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZpc2l0b3IgZm9yIHByb3ZpbmcgdG91Y2hlc1xuICAgICAgICAgKlxuICAgICAgICAgKiBTdG9yZXMgdGhlIHJvd3MgdGhhdCBoYXZlIGJlZW4gdmlzaXRlZCBhbmQgcmVwb3J0cyB3aGVuIHdoZXRoZXIgYW55XG4gICAgICAgICAqIHJvd3Mgd2VyZSByZXBlYXRlZC5cbiAgICAgICAgICogVGhpcyB2aXNpdG9yIGFsc28gYWNjdW11bGF0ZXMgYSBbW0Jsb2NrRGlyZWN0b3J5XV0gcmVmZXJlbmNpbmdcbiAgICAgICAgICogZWFjaCBibG9jayBjb250YWluaW5nIGEgZmFsc2Ugcm93LlxuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGNsYXNzIFByb29mIGV4dGVuZHMgQWJzdHJhY3RWaXNpdG9yIHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBMb2cgb2Ygcm93cyB0aGF0IHdlJ3ZlIHNlZW4uXG4gICAgICAgICAgICAgKiBSb3dzIGFyZSBhY2N1bXVsYXRlZCBpbnRvIGEgZGljdGlvbmFyeSBpbmRleGVkIGJ5IHRoZSBzdHJpbmdcbiAgICAgICAgICAgICAqIHJlcHJlc2VudGF0aW9uIG9mIGEgcm93ICh0aGUgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiB3aWxsIHRodXNcbiAgICAgICAgICAgICAqIHN0b3JlIGEgaGFzaCB0YWJsZSwgZW5zdXJpbmcgZ29vZCBwZXJmb3JtYW5jZSkuXG4gICAgICAgICAgICAgKiBFYWNoIHZhbHVlIGlzIGFuIGFycmF5IG9mIGFsbCBibG9ja3MgdGhhdCBjb250YWluIHRoZSBpbmRleGVkXG4gICAgICAgICAgICAgKiByb3cuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByaXZhdGUgX3Jvd0NvdW50czpcbiAgICAgICAgICAgICAgICB7IFtpbmRleDogc3RyaW5nXTogQXJyYXk8QWJzdHJhY3RTaXggfCB1bmRlZmluZWQ+IH0gPSB7IH07XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRGlyZWN0b3J5IG9mIGZhbHNlIGJsb2Nrcy5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJpdmF0ZSBfZGlyZWN0b3J5OiBCbG9ja0RpcmVjdG9yeSA9IG5ldyBCbG9ja0RpcmVjdG9yeSgpO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEZsYWcgcmVjb3JkaW5nIHRydXRoLlxuICAgICAgICAgICAgICogVHJ1dGggY2FuIGVhc2lseSBiZSBjYWxjdWxhdGVkIGZyb20gW1tfcm93Q291bnRzXV0sIGJ1dCBrZWVwaW5nIGFcbiAgICAgICAgICAgICAqIGZsYWcgdXAtdG8tZGF0ZSBpcyBhIHNpbXBsZSBvcHRpbWlzYXRpb24gdG8gYXZvaWQgaXRlcmF0aW5nIG92ZXJcbiAgICAgICAgICAgICAqIHRoaXMgcHJvcGVydHkgZWFjaCB0aW1lIHdlIGNoZWNrIHRydXRoLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF9pc1RydWU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlcG9ydHMgdGhlIG51bWJlciBvZiB0aW1lcyBlYWNoIHJvdyBoYXMgYmVlbiBwcm9jZXNzZWQuXG4gICAgICAgICAgICAgKiBQcm9jZXNzZXMgW1tfcm93Q291bnRzXV0gdG8gY29udmVydCBlYWNoIGFycmF5IG9mIGJsb2NrcyBpbnRvIGFcbiAgICAgICAgICAgICAqIGNvdW50LlxuICAgICAgICAgICAgICogQHJldHVybnMgRGljdGlvbmFyeSBjb250YWluaW5nIHRoZSBjb3VudCBvZiBlYWNoIHJvdyBzZWVuLFxuICAgICAgICAgICAgICogaW5kZXhlZCBieSB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoYXQgcm93LlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgZ2V0Um93Q291bnRzKCk6IHsgW2luZGV4OiBzdHJpbmddOiBudW1iZXIgfSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OiB7IFtpbmRleDogc3RyaW5nXTogbnVtYmVyIH0gPSB7IH07XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHJvd1N0cmluZyBpbiB0aGlzLl9yb3dDb3VudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Jvd0NvdW50cy5oYXNPd25Qcm9wZXJ0eShyb3dTdHJpbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbcm93U3RyaW5nXSA9IHRoaXMuX3Jvd0NvdW50c1tyb3dTdHJpbmddLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVwb3J0cyBvbiB0aGUgZGlzdHJpYnV0aW9uIG9mIGZhbHNlbmVzcyB3aXRoaW4gYSB0b3VjaCBieVxuICAgICAgICAgICAgICogcHJvdmlkaW5nIHB1YmxpYyBhY2Nlc3MgdG8gW1tfZGlyZWN0b3J5XV0uXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBnZXREaXJlY3RvcnkoKTogQmxvY2tEaXJlY3Rvcnkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kaXJlY3Rvcnk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVwb3J0cyB3aGV0aGVyIGEgdG91Y2ggaXMgdHJ1ZSBieSBwcm92aWRpbmcgcHVibGljIGFjY2VzcyB0b1xuICAgICAgICAgICAgICogW1tfaXNUcnVlXV0uXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBpc1RydWUoKTogYm9vbGVhbiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzVHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogQWJzdHJhY3RWaXNpdG9yIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZWNlaXZlcyBhIHJvdyBmb3IgcHJvY2Vzc2luZy5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJvdGVjdGVkIHZpc2l0SW1wbGVtZW50YXRpb24ocm93OiBSb3csIHNpeD86IEFic3RyYWN0U2l4KTogdm9pZCB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm93U3RyaW5nOiBzdHJpbmcgPSBzdHJpbmdGcm9tUm93KHJvdyk7XG5cbiAgICAgICAgICAgICAgICBpZiAocm93U3RyaW5nIGluIHRoaXMuX3Jvd0NvdW50cykge1xuICAgICAgICAgICAgICAgICAgICAvLyBBbHJlYWR5IHNlZW4gLSBpLmUuIGZhbHNlXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Jvd0NvdW50c1tyb3dTdHJpbmddLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmlyc3QgdGltZSB0aGlzIHJvdyBoYXMgcnVuIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZWVkIHRvIGFkZCB0aGUgcHJldmlvdXMgYmxvY2sgdG8gdGhlIGRpcmVjdG9yeVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXNTaXggPSB0aGlzLl9yb3dDb3VudHNbcm93U3RyaW5nXVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1NpeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RpcmVjdG9yeS5hZGQocHJldmlvdXNTaXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNUcnVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RpcmVjdG9yeS5hZGQoc2l4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dDb3VudHNbcm93U3RyaW5nXS5wdXNoKHNpeCk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBOb3Qgc2VlbiAtIGkuZS4gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dDb3VudHNbcm93U3RyaW5nXSA9IFtzaXhdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQWJzdHJhY3QudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0Jsb2NrRGlyZWN0b3J5LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9Db3Vyc2UudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0RvbS9zaG93SGlkZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vTm90aWZpYWJsZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vUHJpbnRhYmxlTWl4aW4udHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3Jvd0Zyb21TdHJpbmcudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1Jvdy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vU2l4VHlwZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vU3RhZ2UudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3N0cmluZ0Zyb21Sb3cudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1RvdWNoLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9NdXNpYy9NYmRTY2hlbWUudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1Zpc2l0b3IvQ291bnRlci50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vVmlzaXRvci9NdXNpYy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vVmlzaXRvci9Qcm9vZi50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIGVudW0gQmxvY2sge0NvdXJzZSwgVG91Y2h9XG5cbiAgICAvKipcbiAgICAgKiBQcmlja2Vyc1xuICAgICAqIFNhZGx5IGZvciB0c2xpbnQsIHRoZXNlIHdpbGwgc2hhZG93IHRoZSB0b3AtbGV2ZWwgbmFtZXNwYWNlIHVudGlsIEkgY2FuXG4gICAgICogdGhpbmsgb2YgYSBiZXR0ZXIgbmFtZS5cbiAgICAgKi9cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc2hhZG93ZWQtdmFyaWFibGVcbiAgICBleHBvcnQgbmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBbiBNQkQgcHJpY2tlclxuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGNsYXNzIE1iZCBleHRlbmRzIEFic3RyYWN0UHJpY2tlclxuICAgICAgICAgICAgaW1wbGVtZW50cyBOb3RpZmlhYmxlLCBQcmludGFibGVNaXhpbiB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogU3RhZ2Ugd2UncmUgcHJpY2tpbmcgb25cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJpdmF0ZSBfc3RhZ2U6IFN0YWdlO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENhY2hlIG9mIHRoZSBpbml0aWFsIHJvdyBmb3IgdGhpcyBzdGFnZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF9pbml0aWFsUm93OiBSb3c7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIGNvdXJzZSBpdHNlbGZcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJpdmF0ZSBfY291cnNlOiBDb3Vyc2U7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQWRkaXRpb25hbCBzaXhlcyBkaXNwbGF5ZWQgYWZ0ZXIgdGhlIGNvdXJzZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF9leHRyYVNpeGVzOiBDb3Vyc2U7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ291cnNlIGJlaW5nIHNhdmVkIGZvciBsYXRlclxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF9zYXZlZENvdXJzZTogQ291cnNlIHwgdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRvdWNoIGJlaW5nIGNvbXBvc2VkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByaXZhdGUgX3RvdWNoOiBUb3VjaDtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBXaGV0aGVyIHdlJ3JlIHNob3dpbmcgc2l4IGhlYWRzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByaXZhdGUgX3Nob3dTaXhIZWFkczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFdoZXRoZXIgd2UncmUgc2hvd2luZyBhZHZhbmNlZCBvcHRpb25zXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByaXZhdGUgX3Nob3dBZHZhbmNlZE9wdGlvbnM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBDb3Vyc2Ugc2VsZWN0ZWQgaW4gdG91Y2ggdmlld1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF9zZWxlY3RlZEluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEluZGV4IG9mIGNvdXJzZSBjb3BpZWQgZnJvbSB0b3VjaCB2aWV3XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByaXZhdGUgX2NvcGllZEluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ291bnQgb2Ygcm93cyBpbiB0b3VjaFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF9yb3dDb3VudDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlcG9ydCBvZiB0b3VjaCBwcm9vZiBzdGF0dXNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJpdmF0ZSBfcHJvb2ZUZXh0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRGlyZWN0b3J5IG9mIGZhbHNlIHNpeGVzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByaXZhdGUgX2ZhbHNlbmVzczogQmxvY2tEaXJlY3RvcnkgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogTXVzaWMgc2NoZW1lIGluIHVzZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF9tdXNpY1NjaGVtZTogTXVzaWMuTWJkU2NoZW1lO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIERpcmVjdG9yeSBvZiBtdXNpY2FsIHNpeGVzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByaXZhdGUgX211c2ljOiBCbG9ja0RpcmVjdG9yeSB8IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgLyogTm90aWZpYWJsZSBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZWNlaXZlcyBhIG5vdGlmaWNhdGlvbiBmcm9tIGEgYmxvY2sgdGhhdCBoYXMgY2hhbmdlZFxuICAgICAgICAgICAgICogQHBhcmFtIGluZGV4ICBpbmRleCBvZiBjaGFuZ2VkIGJsb2NrIGluIGNvbnRhaW5lclxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgbm90aWZ5KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IEJsb2NrLkNvdXJzZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9leHRyYVNpeGVzLnNldEluaXRpYWxSb3codGhpcy5fY291cnNlLmdldEVuZCgpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29waWVkSW5kZXggPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gQmxvY2suVG91Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93Q291bnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Byb29mVGV4dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmFsc2VuZXNzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tdXNpYyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogUHJpbnRhYmxlTWl4aW4gbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZW5kZXJzIHRoZSBvYmplY3Qgd2l0aCBhIHRlbXBsYXRlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBwcmludDogKHQ6IHN0cmluZywgYz86IFRlbXBsYXRlQ29udGV4dCkgPT4gc3RyaW5nO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFBhdGggZm9yIHRoaXMgY2xhc3MnIHRlbXBsYXRlc1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdGVtcGxhdGVQYXRoOiBzdHJpbmcgPSAnUHJpY2tlci5NYmQnO1xuXG4gICAgICAgICAgICAvKiBQcmlja2VyIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICBwdWJsaWMgb25Mb2FkKCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIGxldCBvcHRpb246IEhUTUxPcHRpb25FbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IFN0YWdlLlRyaXBsZXM7IGkgPD0gU3RhZ2UuU2VwdHVwbGVzOyBpICs9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmlubmVyVGV4dCA9IFN0YWdlW2ldO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEVsKCdzdGFnZScpLmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RWw8SFRNTFNlbGVjdEVsZW1lbnQ+KCdzdGFnZScpLnZhbHVlID1cbiAgICAgICAgICAgICAgICAgICAgU3RhZ2UuQ2lucXVlcy50b1N0cmluZygpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vblN0YWdlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBvblN0YWdlKCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YWdlID1cbiAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQodGhpcy5nZXRFbDxIVE1MU2VsZWN0RWxlbWVudD4oJ3N0YWdlJykudmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2luaXRpYWxSb3cgPSByb3dGcm9tU3RyaW5nKCcyMzEnLCB0aGlzLl9zdGFnZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2UgPSBuZXcgQ291cnNlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbml0aWFsUm93LFxuICAgICAgICAgICAgICAgICAgICB7J2NvbnRhaW5lcic6IHRoaXMsICdpbmRleCc6IEJsb2NrLkNvdXJzZX0sXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9leHRyYVNpeGVzID0gbmV3IENvdXJzZSh0aGlzLl9pbml0aWFsUm93KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9leHRyYVNpeGVzLnNldExlbmd0aCg4KTtcbiAgICAgICAgICAgICAgICB0aGlzLl90b3VjaCA9IG5ldyBUb3VjaChcbiAgICAgICAgICAgICAgICAgICAgcm93RnJvbVN0cmluZygnJywgdGhpcy5fc3RhZ2UpLFxuICAgICAgICAgICAgICAgICAgICB7J2NvbnRhaW5lcic6IHRoaXMsICdpbmRleCc6IEJsb2NrLlRvdWNofSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMuX211c2ljU2NoZW1lID0gbmV3IE11c2ljLk1iZFNjaGVtZSh0aGlzLl9zdGFnZSk7XG5cbiAgICAgICAgICAgICAgICAvLyBDYWxsIG5vdGlmeSgpIHRvIGNsZWFyIG91dCBzdGF0ZSBmcm9tIHRoZSBwcmV2aW91cyB0b3VjaFxuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KEJsb2NrLlRvdWNoKTsgLy8gY2FsbHMgcmVkcmF3KClcbiAgICAgICAgICAgICAgICB0aGlzLnJlZHJhd1RvdWNoKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByaXZhdGUgcmVkcmF3KCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0NvdXJzZSA9IHRoaXMuX2NvdXJzZS5jbG9uZSgpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdFNpeCA9IHRoaXMuX2NvdXJzZS5nZXRTaXgodGhpcy5fY291cnNlLmdldExlbmd0aCgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9leHRyYVNpeGVzLnNldEZpcnN0U2l4VHlwZSgobGFzdFNpeC50eXBlICsgMSkgJSAyKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9leHRyYVNpeGVzLnNldEluaXRpYWxSb3codGhpcy5fY291cnNlLmdldEVuZCgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEVsKCdzaXhlbmRzJykuaW5uZXJIVE1MID0gdGhpcy5fY291cnNlLnByaW50KCdtYmQnLCB7XG4gICAgICAgICAgICAgICAgICAgICdmYWxzZW5lc3MnOiB0aGlzLl9mYWxzZW5lc3MsXG4gICAgICAgICAgICAgICAgICAgICdtdXNpYyc6IHRoaXMuX211c2ljLFxuICAgICAgICAgICAgICAgICAgICAnY291cnNlSW5kZXgnOiB0aGlzLl9jb3BpZWRJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgJ2V4dHJhU2l4ZXMnOiB0aGlzLl9leHRyYVNpeGVzLFxuICAgICAgICAgICAgICAgICAgICAnc2hvd1NpeEhlYWRzJzogdGhpcy5fc2hvd1NpeEhlYWRzLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRFbCgnY2FsbGluZycpLmlubmVySFRNTCA9IHRoaXMuX2NvdXJzZS5wcmludCgnaHRtbCcpO1xuXG4gICAgICAgICAgICAgICAgbmV3Q291cnNlLnNldEluaXRpYWxSb3codGhpcy5faW5pdGlhbFJvdyk7XG4gICAgICAgICAgICAgICAgbmV3Q291cnNlLnNldEZpcnN0U2l4VHlwZShTaXhUeXBlLlNsb3cpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RWwoJ2NhbGxpbmdGcm9tUm91bmRzJykuaW5uZXJIVE1MID1cbiAgICAgICAgICAgICAgICAgICAgbmV3Q291cnNlLnByaW50KCdodG1sJyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmdldEVsPEhUTUxJbnB1dEVsZW1lbnQ+KCdpbml0aWFsUm93JykudmFsdWUgPVxuICAgICAgICAgICAgICAgICAgICBzdHJpbmdGcm9tUm93KHRoaXMuX2NvdXJzZS5nZXRJbml0aWFsUm93KCkpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRFbDxIVE1MU2VsZWN0RWxlbWVudD4oJ2ZpcnN0U2l4JykudmFsdWUgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2UuZ2V0Rmlyc3RTaXhUeXBlKCkudG9TdHJpbmcoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zaG93QWR2YW5jZWRPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIERvbS5zaG93KHRoaXMuZ2V0RWwoJ2ZpcnN0U2l4QmxvY2snKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRG9tLmhpZGUodGhpcy5nZXRFbCgnZmlyc3RTaXhCbG9jaycpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmdldEVsPEhUTUxJbnB1dEVsZW1lbnQ+KCdjb3Vyc2VMZW5ndGgnKS52YWx1ZSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZS5nZXRMZW5ndGgoKS50b1N0cmluZygpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NhdmVkQ291cnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RWwoJ3NhdmVkQ2FsbGluZycpLmlubmVySFRNTCA9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zYXZlZENvdXJzZS5wcmludCgnaHRtbCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RWwoJ3NhdmVkQ2FsbGluZycpLmlubmVyVGV4dCA9ICdOb25lJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwcml2YXRlIHJlZHJhd1RvdWNoKCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RWwoJ3Byb29mUmVzdWx0JykuaW5uZXJUZXh0ID0gdGhpcy5fcHJvb2ZUZXh0IHx8ICcnO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9yb3dDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEVsKCdudW1Sb3dzJykuaW5uZXJUZXh0ID1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd0NvdW50ICsgJyBTdGVkbWFuICcgKyBTdGFnZVt0aGlzLl9zdGFnZV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRFbCgnbnVtUm93cycpLmlubmVyVGV4dCA9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b3VjaC5lc3RpbWF0ZVJvd3MoKSArICcgY2hhbmdlcyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRFbDxIVE1MU2VsZWN0RWxlbWVudD4oJ3Jvd0luZGV4JykudmFsdWUgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b3VjaC5nZXRTdGFydCgpLmdldFJvd0luZGV4KCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEVsPEhUTUxTZWxlY3RFbGVtZW50Pignc2l4VHlwZScpLnZhbHVlID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG91Y2guZ2V0U3RhcnQoKS5nZXRTaXhUeXBlKCkudG9TdHJpbmcoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zaG93QWR2YW5jZWRPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIERvbS5zaG93KHRoaXMuZ2V0RWwoJ3N0YXJ0QmxvY2snKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRG9tLmhpZGUodGhpcy5nZXRFbCgnc3RhcnRCbG9jaycpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmdldEVsKCdjb3Vyc2VzJykub3V0ZXJIVE1MID1cbiAgICAgICAgICAgICAgICAgICAgJzxzZWxlY3QgaWQ9XCJjb3Vyc2VzXCInXG4gICAgICAgICAgICAgICAgICAgICAgICArICcgb25jbGljaz1cInByaWNrZXIub25TZWxlY3RDb3Vyc2UoKVwiJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKyAnIG9uZGJsY2xpY2s9XCJwcmlja2VyLm9uQ29weUNvdXJzZSgpXCI+J1xuICAgICAgICAgICAgICAgICAgICAgICAgKyB0aGlzLl90b3VjaC5wcmludCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0b3VjaFJvd3MnOiB0aGlzLl9yb3dDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3R5bGVVbnJlYWNoZWQnOiAnY29sb3I6Z3JheScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ZhbHNlbmVzcyc6IHRoaXMuX2ZhbHNlbmVzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3R5bGVGYWxzZSc6ICdjb2xvcjpyZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJzwvc2VsZWN0Pic7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRFbDxIVE1MU2VsZWN0RWxlbWVudD4oJ2NvdXJzZXMnKS5zaXplID0gTWF0aC5tYXgoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoLmdldExlbmd0aCgpICsgMSxcbiAgICAgICAgICAgICAgICAgICAgMixcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RWw8SFRNTFNlbGVjdEVsZW1lbnQ+KCdjb3Vyc2VzJykudmFsdWUgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEluZGV4LnRvU3RyaW5nKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwdWJsaWMgYyhzaXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZS5nZXRTaXgoc2l4KS50b2dnbGVDYWxsKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBvblNldEluaXRpYWxSb3coKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmdldEVsPEhUTUxJbnB1dEVsZW1lbnQ+KCdpbml0aWFsUm93JykudmFsdWU7XG4gICAgICAgICAgICAgICAgbGV0IGluaXRpYWxSb3c6IFJvdztcblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxSb3cgPSByb3dGcm9tU3RyaW5nKGlucHV0LCB0aGlzLl9zdGFnZSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fY291cnNlLnNldEluaXRpYWxSb3coaW5pdGlhbFJvdyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uUmVzZXRJbml0aWFsUm93KCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZS5zZXRJbml0aWFsUm93KHRoaXMuX2luaXRpYWxSb3cpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBvbkZpcnN0U2l4KCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5nZXRFbDxIVE1MU2VsZWN0RWxlbWVudD4oJ2ZpcnN0U2l4JykudmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fY291cnNlLnNldEZpcnN0U2l4VHlwZShwYXJzZUludChpbnB1dCkpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBvblNldExlbmd0aCgpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dCA9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEVsPEhUTUxJbnB1dEVsZW1lbnQ+KCdjb3Vyc2VMZW5ndGgnKS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gcGFyc2VJbnQoaW5wdXQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2Uuc2FmZVNldExlbmd0aChsZW5ndGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uUmVzZXRMZW5ndGgoKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY291cnNlLnJlc2V0TGVuZ3RoKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBvblJlc2V0Q2FsbHMoKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY291cnNlLnJlc2V0Q2FsbHMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uU2F2ZUNhbGxpbmcoKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2F2ZWRDb3Vyc2UgPSB0aGlzLl9jb3Vyc2UuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zYXZlZENvdXJzZS5zZXRJbml0aWFsUm93KHRoaXMuX2luaXRpYWxSb3cpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBvbkxvYWRDYWxsaW5nKCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zYXZlZENvdXJzZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2UgPSB0aGlzLl9zYXZlZENvdXJzZS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2Uuc2V0SW5pdGlhbFJvdyh0aGlzLl9pbml0aWFsUm93KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2UgPSBuZXcgQ291cnNlKHRoaXMuX2luaXRpYWxSb3cpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZS5zZXRPd25lcnNoaXAoe1xuICAgICAgICAgICAgICAgICAgICAnY29udGFpbmVyJzogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgJ2luZGV4JzogQmxvY2suQ291cnNlLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uUm93SW5kZXgoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmdldEVsPEhUTUxTZWxlY3RFbGVtZW50Pigncm93SW5kZXgnKS52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl90b3VjaC5nZXRTdGFydCgpLnNldFJvd0luZGV4KHBhcnNlSW50KGlucHV0KSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXdUb3VjaCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwdWJsaWMgb25TaXhUeXBlKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5nZXRFbDxIVE1MU2VsZWN0RWxlbWVudD4oJ3NpeFR5cGUnKS52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl90b3VjaC5nZXRTdGFydCgpLnNldFNpeFR5cGUocGFyc2VJbnQoaW5wdXQpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZHJhd1RvdWNoKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBvblNlbGVjdENvdXJzZSgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuZ2V0RWw8SFRNTFNlbGVjdEVsZW1lbnQ+KCdjb3Vyc2VzJykudmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IHBhcnNlSW50KGlucHV0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uSW5zZXJ0Q291cnNlKCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggKz0gMTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoLmluc2VydENvdXJzZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291cnNlLmNsb25lKCksXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldEVsPEhUTUxJbnB1dEVsZW1lbnQ+KCdyb2xsaW5nJykuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3Vyc2UgPSB0aGlzLl90b3VjaC5nZXRDb3Vyc2UodGhpcy5fc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNpeFR5cGUgPSBjb3Vyc2UuZ2V0U2l4KGNvdXJzZS5nZXRMZW5ndGgoKSkudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291cnNlLnNldEZpcnN0U2l4VHlwZSgoc2l4VHlwZSArIDEpICUgMik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZS5zZXRJbml0aWFsUm93KGNvdXJzZS5nZXRFbmQoKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZS5yZXNldExlbmd0aCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2UucmVzZXRDYWxscygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3VG91Y2goKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uUGFzdGVDb3Vyc2UoKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG91Y2guZGVsZXRlQ291cnNlKHRoaXMuX3NlbGVjdGVkSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b3VjaC5pbnNlcnRDb3Vyc2UoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291cnNlLmNsb25lKCksXG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0RWw8SFRNTElucHV0RWxlbWVudD4oJ3JvbGxpbmcnKS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3Vyc2UgPSB0aGlzLl90b3VjaC5nZXRDb3Vyc2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaXhUeXBlID0gY291cnNlLmdldFNpeChjb3Vyc2UuZ2V0TGVuZ3RoKCkpLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2Uuc2V0Rmlyc3RTaXhUeXBlKChzaXhUeXBlICsgMSkgJSAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZS5zZXRJbml0aWFsUm93KGNvdXJzZS5nZXRFbmQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gTWF0aC5taW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG91Y2guZ2V0TGVuZ3RoKCksXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291cnNlLnJlc2V0TGVuZ3RoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2UucmVzZXRDYWxscygpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWRyYXdUb3VjaCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uQ29weUNvdXJzZSgpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2UgPVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG91Y2guZ2V0Q291cnNlKHRoaXMuX3NlbGVjdGVkSW5kZXgpLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZS5zZXRPd25lcnNoaXAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbnRhaW5lcic6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW5kZXgnOiBCbG9jay5Db3Vyc2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvcGllZEluZGV4ID0gdGhpcy5fc2VsZWN0ZWRJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBvbkN1dENvdXJzZSgpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29weUNvdXJzZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMub25EZWxldGVDb3Vyc2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uRGVsZXRlQ291cnNlKCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoLmRlbGV0ZUNvdXJzZSh0aGlzLl9zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IE1hdGgubWluKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoLmdldExlbmd0aCgpLFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZHJhd1RvdWNoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwdWJsaWMgb25Mb2FkVG91Y2goKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEVsPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdsb2FkU2F2ZVRleHRhcmVhJykudmFsdWU7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1RvdWNoOiBUb3VjaDtcblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1RvdWNoID0gVG91Y2guZnJvbVN0cmluZyhpbnB1dCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YWdlID0gbmV3VG91Y2guZ2V0SW5pdGlhbFJvdygpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEVsPEhUTUxTZWxlY3RFbGVtZW50Pignc3RhZ2UnKS52YWx1ZSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YWdlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vblN0YWdlKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl90b3VjaCA9IG5ld1RvdWNoO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoLnNldE93bmVyc2hpcCh7XG4gICAgICAgICAgICAgICAgICAgICdjb250YWluZXInOiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAnaW5kZXgnOiBCbG9jay5Ub3VjaCxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIENhbGwgbm90aWZ5KCkgdG8gY2xlYXIgb3V0IHN0YXRlIGZyb20gdGhlIHByZXZpb3VzIHRvdWNoXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkoQmxvY2suVG91Y2gpOyAvLyBjYWxscyByZWRyYXcoKVxuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3VG91Y2goKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uU2F2ZVRvdWNoKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RWw8SFRNTFRleHRBcmVhRWxlbWVudD4oJ2xvYWRTYXZlVGV4dGFyZWEnKS52YWx1ZSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoLnByaW50KCd0ZXh0Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBvbkdlbmVyYXRlU2lyaWwoKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGhhdmUgdGhlIGNvdW50IG9mIHJvd3MgYmVmb3JlIGdlbmVyYXRpbmdcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3Jvd0NvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Qcm92ZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RWwoJ3NpcmlsVGV4dGFyZWEnKS5pbm5lclRleHQgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b3VjaC5wcmludCgnc2lyaWwnLCB7J3RvdWNoUm93cyc6IHRoaXMuX3Jvd0NvdW50fSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBvbkFuYWx5c2VNdXNpYygpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2aXNpdG9yID0gbmV3IFZpc2l0b3IuTXVzaWModGhpcy5fbXVzaWNTY2hlbWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoLmFjY2VwdCh2aXNpdG9yKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEVsKCdtdXNpY1RleHRhcmVhJykuaW5uZXJUZXh0ID1cbiAgICAgICAgICAgICAgICAgICAgdmlzaXRvci5nZXRNYXRjaGVyKCkucHJpbnQoJ3RleHQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tdXNpYyA9IHZpc2l0b3IuZ2V0RGlyZWN0b3J5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBvblNob3dTaXhIZWFkcygpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5nZXRFbDxIVE1MSW5wdXRFbGVtZW50Pignc2hvd1NpeEhlYWRzJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd1NpeEhlYWRzID0gZWxlbWVudC5jaGVja2VkO1xuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBvblNob3dBZHZhbmNlZE9wdGlvbnMoKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RWw8SFRNTElucHV0RWxlbWVudD4oJ3Nob3dBZHZhbmNlZE9wdGlvbnMnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93QWR2YW5jZWRPcHRpb25zID0gZWxlbWVudC5jaGVja2VkO1xuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXdUb3VjaCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwdWJsaWMgb25Qcm92ZSgpOiBib29sZWFuIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9vZiA9IG5ldyBWaXNpdG9yLlByb29mKCksXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXIgPSBuZXcgVmlzaXRvci5Db3VudGVyKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl90b3VjaC5hY2NlcHQocHJvb2YsIGNvdW50ZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd0NvdW50ID0gY291bnRlci5nZXRDb3VudCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZhbHNlbmVzcyA9IHByb29mLmdldERpcmVjdG9yeSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHByb29mLmlzVHJ1ZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9vZi5pc1Zpc2l0aW5nKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Byb29mVGV4dCA9IFwiVHJ1ZSwgYnV0IGRvZXNuJ3QgY29tZSByb3VuZFwiO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJvb2ZUZXh0ID0gJ0NvbXBvc2l0aW9uIGlzIHRydWUnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJvb2ZUZXh0ID0gJ0NvbXBvc2l0aW9uIGlzIEZBTFNFJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3VG91Y2goKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvb2YuaXNUcnVlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBvblRhYihwYWdlSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhYnMgPSB0aGlzLmdldEVsKCd0YWJzJykuY2hpbGRyZW4sXG4gICAgICAgICAgICAgICAgICAgIHRhYiA9IHRoaXMuZ2V0RWwoJ3RhYl8nICsgcGFnZUlkKSxcbiAgICAgICAgICAgICAgICAgICAgcGFnZXMgPSB0aGlzLmdldEVsKCdwYWdlcycpLmNoaWxkcmVuLFxuICAgICAgICAgICAgICAgICAgICBwYWdlID0gdGhpcy5nZXRFbCgncGFnZV8nICsgcGFnZUlkKTtcblxuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItZm9yLW9mXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhYnNbaV0uY2xhc3NOYW1lID0gJ3RhYic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRhYi5jbGFzc05hbWUgPSAndGFiIHRhYi1zZWxlY3RlZCc7XG5cbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLWZvci1vZlxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXNbaV0uY2xhc3NOYW1lID0gJ3BhZ2UnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYWdlLmNsYXNzTmFtZSA9ICdwYWdlIHBhZ2Utc2VsZWN0ZWQnO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgUHJpbnRhYmxlTWl4aW4ubWFrZVByaW50YWJsZShNYmQpO1xuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogRE9NIGhlbHBlciB1dGlsaXRpZXNcbiAgICAgKi9cbiAgICBleHBvcnQgbmFtZXNwYWNlIERvbSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYSBzdHlsZSBlbGVtZW50IGZvciBwcmlja2VyIHJlbmRlcmluZ1xuICAgICAgICAgKiBAcGFyYW0gcGFyZW50RG9jdW1lbnQgLSBkb2N1bWVudCBvYmplY3QgdG8gdXNlIChpbmplY3QgZm9yIHRlc3RpbmcpXG4gICAgICAgICAqL1xuICAgICAgICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlQW5kQXBwZW5kU3R5bGUoXG4gICAgICAgICAgICBwYXJlbnREb2N1bWVudDogSFRNTERvY3VtZW50ID0gZG9jdW1lbnQsXG4gICAgICAgICAgICBzdHlsZXM6IHN0cmluZyA9ICcnLFxuICAgICAgICApOiBIVE1MU3R5bGVFbGVtZW50IHtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gcGFyZW50RG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgICAgIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgICAgICAgc3R5bGUuaW5uZXJUZXh0ID0gc3R5bGVzO1xuXG4gICAgICAgICAgICBwYXJlbnREb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBET00gaGVscGVyIHV0aWxpdGllc1xuICAgICAqL1xuICAgIGV4cG9ydCBuYW1lc3BhY2UgRG9tIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhbiBpZnJhbWUgZm9yIHByaWNrZXIgcmVuZGVyaW5nXG4gICAgICAgICAqIEBwYXJhbSBwYXJlbnREb2N1bWVudCAtIGRvY3VtZW50IG9iamVjdCB0byB1c2UgKGluamVjdCBmb3IgdGVzdGluZylcbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJZnJhbWUoXG4gICAgICAgICAgICBwYXJlbnREb2N1bWVudDogSFRNTERvY3VtZW50ID0gZG9jdW1lbnQsXG4gICAgICAgICk6IEhUTUxJRnJhbWVFbGVtZW50IHtcbiAgICAgICAgICAgIGNvbnN0IGlmcmFtZSA9IHBhcmVudERvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuXG4gICAgICAgICAgICBpZnJhbWUuZnJhbWVCb3JkZXIgPSAnMCc7XG4gICAgICAgICAgICBpZnJhbWUuc2Nyb2xsaW5nID0gJ25vJztcbiAgICAgICAgICAgIGlmcmFtZS5zcmMgPSAnYWJvdXQ6YmxhbmsnO1xuICAgICAgICAgICAgaWZyYW1lLnN0eWxlLmJvcmRlciA9ICdub25lJztcblxuICAgICAgICAgICAgcmV0dXJuIGlmcmFtZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogRE9NIGhlbHBlciB1dGlsaXRpZXNcbiAgICAgKi9cbiAgICBleHBvcnQgbmFtZXNwYWNlIERvbSB7XG5cbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIGluamVjdElmcmFtZURhdGEoXG4gICAgICAgICAgICBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LFxuICAgICAgICAgICAgY29udGVudDogc3RyaW5nID0gJycsXG4gICAgICAgICAgICBnbG9iYWxzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0geyB9LFxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IHRoZURvYyA9IChpZnJhbWUuY29udGVudFdpbmRvdyBhcyBXaW5kb3cpLmRvY3VtZW50O1xuICAgICAgICAgICAgdGhlRG9jLm9wZW4oKTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZ2xvYmFscykge1xuICAgICAgICAgICAgICAgIGlmIChnbG9iYWxzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgKGlmcmFtZS5jb250ZW50V2luZG93IGFzIGFueSlba2V5XSA9IGdsb2JhbHNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoZURvYy53cml0ZShjb250ZW50KTtcbiAgICAgICAgICAgIHRoZURvYy5jbG9zZSgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiUHJpY2tlci9BYnN0cmFjdC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiUHJpY2tlci9NYmQudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkRvbS9jcmVhdGVBbmRBcHBlbmRTdHlsZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiRG9tL2NyZWF0ZUlmcmFtZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiRG9tL2luamVjdElmcmFtZURhdGEudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIk9wdGlvbnMudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlRlbXBsYXRlcy50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIEZhY3RvcnkgZnVuY3Rpb24gdG8gY3JlYXRlIGEgcHJpY2tlclxuICAgICAqIEBwYXJhbSBlbGVtZW50SWQgLSBJRCBvZiBIVE1MIGVsZW1lbnQgdG8gd2hpY2ggdGhlIHByaWNrZXIgd2lsbCBiZSBib3VuZFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gcHJpY2tlciBvcHRpb25zXG4gICAgICogQHBhcmFtIHBhcmVudERvY3VtZW50IC0gZG9jdW1lbnQgdG8gdXNlIHRvIGNyZWF0ZSBwcmlja2VyIChmb3IgdGVzdGluZylcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlKFxuICAgICAgICBlbGVtZW50SWQ6IHN0cmluZyxcbiAgICAgICAgb3B0aW9uczogT3B0aW9ucyA9IHsgfSxcbiAgICAgICAgcGFyZW50RG9jdW1lbnQ6IEhUTUxEb2N1bWVudCA9IGRvY3VtZW50LFxuICAgICk6IFByaWNrZXIuTWJkIHtcbiAgICAgICAgbGV0IHByaWNrZXI6IFByaWNrZXIuTWJkO1xuXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBwYXJlbnREb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGZpbmQgSFRNTCBlbGVtZW50OiAnJHtlbGVtZW50SWR9J2ApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaWZyYW1lIHx8IG9wdGlvbnMuaWZyYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGlmcmFtZSA9IERvbS5jcmVhdGVJZnJhbWUocGFyZW50RG9jdW1lbnQpO1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgICAgICAgICAgcHJpY2tlciA9IG5ldyBQcmlja2VyLk1iZChpZnJhbWUpO1xuICAgICAgICAgICAgRG9tLmluamVjdElmcmFtZURhdGEoXG4gICAgICAgICAgICAgICAgaWZyYW1lLFxuICAgICAgICAgICAgICAgIFRlbXBsYXRlcy5jcmVhdGUoeydwcmlja2VyJzogcHJpY2tlcn0pLFxuICAgICAgICAgICAgICAgIHsgcHJpY2tlciB9LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByaWNrZXIgPSBuZXcgUHJpY2tlci5NYmQoKTtcbiAgICAgICAgICAgIERvbS5jcmVhdGVBbmRBcHBlbmRTdHlsZShwYXJlbnREb2N1bWVudCwgcHJpY2tlci5wcmludCgnY3NzJykpO1xuICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBwcmlja2VyLnByaW50KCdodG1sJyk7XG4gICAgICAgICAgICAod2luZG93IGFzIGFueSkucHJpY2tlciA9IHByaWNrZXI7XG4gICAgICAgICAgICBpZiAocGFyZW50RG9jdW1lbnQgPT09IGRvY3VtZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gZG9uJ3QgcnVuIGluIHRlc3RzICh3aGVuIGRvY3VtZW50IGhhcyBiZWVuIG92ZXJyaWRkZW4pXG4gICAgICAgICAgICAgICAgcHJpY2tlci5vbkxvYWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcmlja2VyO1xuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJBYnN0cmFjdFNjaGVtZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiTWF0Y2hlckludGVyZmFjZVwiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIE11c2ljIGNsYXNzZXMgdG8gYW5hbHlzZSByb3dzXG4gICAgICovXG4gICAgZXhwb3J0IG5hbWVzcGFjZSBNdXNpYyB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEN1c3RvbSBtdXNpYyBtYXRjaGluZyBzY2hlbWUgZGVmaW5lZCBhdCBydW50aW1lXG4gICAgICAgICAqL1xuICAgICAgICBleHBvcnQgY2xhc3MgQ3VzdG9tU2NoZW1lIGV4dGVuZHMgQWJzdHJhY3RTY2hlbWUge1xuXG4gICAgICAgICAgICAvKiBNYXRjaGVySW50ZXJmYWNlIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFByb3ZpZGVzIHJlYWQgYWNjZXNzIHRvIHRoZSBuYW1lXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdDdXN0b20gc2NoZW1lJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogQWJzdHJhY3RTY2hlbWUgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBDcmVhdGUgbWF0Y2hlcnMgZm9yIHRoaXMgc2NoZW1lL3N0YWdlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByb3RlY3RlZCBjcmVhdGVNYXRjaGVycyhyb3VuZHM6IHN0cmluZyk6IE1hdGNoZXJJbnRlcmZhY2VbXSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsgXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogQ3VzdG9tU2NoZW1lIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBbGxvd3MgYWRkaXRpb25hbCBtYXRjaGVycyB0byBiZSBhZGRlZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgYWRkTWF0Y2hlcihtYXRjaGVyOiBNYXRjaGVySW50ZXJmYWNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWF0Y2hlcnMucHVzaChtYXRjaGVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vQWJzdHJhY3RTaXgudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1Jvdy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vc3RyaW5nRnJvbVJvdy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQWJzdHJhY3QudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBWaXNpdG9yIGNsYXNzZXMgdG8gYW5hbHlzZSBibG9ja3NcbiAgICAgKi9cbiAgICBleHBvcnQgbmFtZXNwYWNlIFZpc2l0b3Ige1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaW1wbGUgdmlzaXRvciB0aGF0IGxvZ3Mgcm93cyB0byB0aGUgY29uc29sZVxuICAgICAgICAgKlxuICAgICAgICAgKiBBbGwgdmlzaXRlZCByb3dzIGFyZSBvdXRwdXQgdmlhIGBjb25zb2xlLmxvZygpYC5cbiAgICAgICAgICogVGhpcyB2aXNpdG9yIGlzIHVzZWZ1bCBmb3IgZWFzaWx5IGRpc2NvdmVyaW5nIHdoYXQgcm93cyBhcmUgYmVpbmdcbiAgICAgICAgICogZ2VuZXJhdGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGNsYXNzIENvbnNvbGUgZXh0ZW5kcyBBYnN0cmFjdFZpc2l0b3Ige1xuXG4gICAgICAgICAgICAvKiBBYnN0cmFjdFZpc2l0b3IgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlY2VpdmVzIGEgcm93IGZvciBwcm9jZXNzaW5nLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcm90ZWN0ZWQgdmlzaXRJbXBsZW1lbnRhdGlvbihyb3c6IFJvdywgc2l4PzogQWJzdHJhY3RTaXgpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZSAqL1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0cmluZ0Zyb21Sb3cocm93KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0Fic3RyYWN0U2l4LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9Sb3cudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3N0cmluZ0Zyb21Sb3cudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkFic3RyYWN0LnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogVmlzaXRvciBjbGFzc2VzIHRvIGFuYWx5c2UgYmxvY2tzXG4gICAgICovXG4gICAgZXhwb3J0IG5hbWVzcGFjZSBWaXNpdG9yIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2ltcGxlIHZpc2l0b3IgdGhhdCBhY2N1bXVsYXRlcyByb3dzIGludG8gYW4gYXJyYXkgb2Ygc3RyaW5nc1xuICAgICAgICAgKlxuICAgICAgICAgKiBDb252ZXJ0cyBlYWNoIHZpc2l0ZWQgcm93IHRvIGEgc3RyaW5nIGFuZCBzdG9yZXMgaXQuXG4gICAgICAgICAqIFRoZSB2aXNpdG9yIGFjY3VtdWxhdGVzIHJvd3MgZnJvbSBhIHRvdWNoIGluIHRoZSBvcmRlciB0aGV5J3JlIHJ1bmcuXG4gICAgICAgICAqL1xuICAgICAgICBleHBvcnQgY2xhc3MgU3RyaW5nQXJyYXkgZXh0ZW5kcyBBYnN0cmFjdFZpc2l0b3Ige1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEFycmF5IG9mIHN0cmluZyByZXByZXNlbnRhdGlvbnMgb2Ygcm93cyB0aGF0IGhhdmUgYmVlbiB2aXNpdGVkLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF9zdHJpbmdzOiBzdHJpbmdbXSA9IFsgXTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZXBvcnRzIHRoZSByb3dzIHRoYXQgaGF2ZSBiZWVuIHZpc2l0ZWQgYnkgcHJvdmlkaW5nIHB1YmxpY1xuICAgICAgICAgICAgICogYWNjZXNzIHRvIFtbX3N0cmluZ3NdXS5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIGdldFN0cmluZ3MoKTogc3RyaW5nW10ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHJpbmdzLnNsaWNlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIEFic3RyYWN0VmlzaXRvciBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVjZWl2ZXMgYSByb3cgZm9yIHByb2Nlc3NpbmcuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByb3RlY3RlZCB2aXNpdEltcGxlbWVudGF0aW9uKHJvdzogUm93LCBzaXg/OiBBYnN0cmFjdFNpeCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0cmluZ3MucHVzaChzdHJpbmdGcm9tUm93KHJvdykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiPCFET0NUWVBFIGh0bWw+XG48aHRtbD5cbiAgPGhlYWQ+XG4gICAgPHRpdGxlPkZyZWUgVG91Y2ggUHJpY2tlcjwvdGl0bGU+XG4gICAgPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuICAgICAgYm9keSB7XG4gICAgICAgIG1hcmdpbjogMHB4O1xuICAgICAgICBwYWRkaW5nOiAwcHg7XG4gICAgICB9XG5cbiAgICAgIHt7PSBjb250ZXh0LnByaWNrZXIucHJpbnQoJ2NzcycpIH19XG4gICAgPC9zdHlsZT5cbiAgICA8c2NyaXB0IHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIj5cbiAgICAgICAgd2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHByaWNrZXIub25Mb2FkKCk7XG4gICAgICAgIH07XG4gICAgPC9zY3JpcHQ+XG4gIDwvaGVhZD5cbiAgPGJvZHk+XG4gICAge3s9IGNvbnRleHQucHJpY2tlci5wcmludCgnaHRtbCcpIH19XG4gIDwvYm9keT5cbjwvaHRtbD5cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vKipcbiAqIFJlbmRlcnMgYSBzaXggYXMgSFRNTCBmb3IgTUJELXN0eWxlIHByaWNrZXJcbiAqIEBwYXJhbSB7QmxvY2tEaXJlY3Rvcnl9ICBmYWxzZW5lc3MgICAgZGlyZWN0b3J5IHRvIGxvb2t1cCBmYWxzZW5lc3NcbiAqIEBwYXJhbSB7QmxvY2tEaXJlY3Rvcnl9ICBtdXNpYyAgICAgICAgZGlyZWN0b3J5IHRvIGxvb2t1cCBtdXNpY1xuICogQHBhcmFtIHtudW1iZXJ9ICAgICAgICAgIGNvdXJzZUluZGV4ICBpbmRleCBudW1iZXIgb2YgdGhlIGNvdXJzZVxuICogQHBhcmFtIHtib29sZWFufSAgICAgICAgIHVuZGVybGluZSAgICB3aGV0aGVyIHRvIHVuZGVybGluZSB0aGUgc2l4ZW5kXG4gKiBAcGFyYW0ge2Jvb2xlYW59ICAgICAgICAgc2hvd1NpeEhlYWRzICBzaG93IHNpeCBoZWFkcyBhcyB3ZWxsIGFzIHNpeCBlbmRzXG4gKi9cblxue3s/IGNvbnRleHQudW5kZXJsaW5lICE9PSB0cnVlIH19XG5cdHt7IGNvbnRleHQudW5kZXJsaW5lID0gZmFsc2U7IH19XG57ez99fVxuXG57ez9cblx0Y29udGV4dC5mYWxzZW5lc3MgJiYgY29udGV4dC5jb3Vyc2VJbmRleCAmJiBjb250ZXh0LmZhbHNlbmVzcy5jb250YWlucyhcblx0XHRjb250ZXh0LmNvdXJzZUluZGV4LFxuXHRcdGNvbnRleHQub2JqZWN0LmdldEluZGV4KClcblx0KVxufX1cblx0e3sgdmFyIGNsYXNzTmFtZSA9ICdmYWxzZUJsb2NrJzsgfX1cbnt7Pz9cblx0Y29udGV4dC5tdXNpYyAmJiBjb250ZXh0LmNvdXJzZUluZGV4ICYmIGNvbnRleHQubXVzaWMuY29udGFpbnMoXG5cdFx0Y29udGV4dC5jb3Vyc2VJbmRleCxcblx0XHRjb250ZXh0Lm9iamVjdC5nZXRJbmRleCgpXG5cdClcbn19XG5cdHt7IHZhciBjbGFzc05hbWUgPSAnbXVzaWNhbEJsb2NrJzsgfX1cbnt7Pz99fVxuXHR7eyB2YXIgY2xhc3NOYW1lID0gJyc7IH19XG57ez99fVxuXG5cbi8qIFNpeCBoZWFkL2VuZCAqL1xuXG48c3BhbiBjbGFzcz1cInt7PSBjbGFzc05hbWUgfX1cIj5cblxuXHR7ez8gY29udGV4dC5zaG93U2l4SGVhZHMgfX1cblx0XHR7ez0gUHJpY2tlci5zdHJpbmdGcm9tUm93KGNvbnRleHQub2JqZWN0LmdldEhlYWQoKSkgfX1cblx0e3s/P319XG5cblx0XHR7ez8gY29udGV4dC51bmRlcmxpbmUgfX1cblx0XHRcdDx1PlxuXHRcdHt7P319XG5cblx0XHRcdHt7PSBQcmlja2VyLnN0cmluZ0Zyb21Sb3coY29udGV4dC5vYmplY3QuZ2V0RW5kKCkpIH19XG5cblx0XHR7ez8gY29udGV4dC51bmRlcmxpbmUgfX1cblx0XHRcdDwvdT5cblx0XHR7ez99fVxuXG5cdHt7P319XG5cbjwvc3Bhbj5cblxuJm5ic3A7Jm5ic3A7XG5cblxuLyogQ2FsbCAqL1xuXG48c3BhblxuIGNsYXNzPVwie3s9IFByaWNrZXIuU2l4VHlwZVtjb250ZXh0Lm9iamVjdC50eXBlXS50b0xvd2VyQ2FzZSgpIH19U2l4XCJcbiBvbmNsaWNrPVwicHJpY2tlci5jKHt7PSBjb250ZXh0Lm9iamVjdC5nZXRJbmRleCgpIH19KVwiXG4+XG5cdCZuYnNwO1xuXHR7ez8gY29udGV4dC5vYmplY3QuZ2V0Q2FsbCgpID09PSBQcmlja2VyLkNhbGwuUGxhaW4gfX1cblx0XHQmbmJzcDtcblx0e3s/PyBjb250ZXh0Lm9iamVjdC5nZXRDYWxsKCkgPT09IFByaWNrZXIuQ2FsbC5Cb2IgfX1cblx0XHQtXG5cdHt7Pz8gY29udGV4dC5vYmplY3QuZ2V0Q2FsbCgpID09PSBQcmlja2VyLkNhbGwuU2luZ2xlIH19XG5cdFx0c1xuXHR7ez99fVxuXHQmbmJzcDtcbjwvc3Bhbj5cblxuJm5ic3A7Jm5ic3A7XG5cblxuLyogSW5kZXggKi9cblxue3s9IGNvbnRleHQub2JqZWN0LmdldEluZGV4KCkgfX1cblxuPGJyIC8+XG5cblxuLyogU2l4IGVuZCAqL1xuXG57ez8gY29udGV4dC5zaG93U2l4SGVhZHMgfX1cblx0PHNwYW4gY2xhc3M9XCJ7ez0gY2xhc3NOYW1lIH19XCI+XG5cdFx0PHU+XG5cdFx0XHR7ez0gUHJpY2tlci5zdHJpbmdGcm9tUm93KGNvbnRleHQub2JqZWN0LmdldEVuZCgpKSB9fVxuXHRcdDwvdT5cblx0PC9zcGFuPlxuXG5cdDxiciAvPlxue3s/fX1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vKipcbiAqIFJlbmRlcnMgYSBzaXggZm9yIGNvbnN1bXB0aW9uIGJ5IHNpcmlsLWJhc2VkIHByb3ZlcnNcbiAqIEBwYXJhbSB7bnVtYmVyfSAgIHRvdWNoUm93cyAgcm93cyByZW1haW5pbmcgaW4gdGhlIHRvdWNoXG4gKi9cblxue3tcblx0Y29udGV4dC50b3VjaFJvd3MgPSBjb250ZXh0LnRvdWNoUm93cyB8fCBJbmZpbml0eTtcbn19XG5cbnt7PyBjb250ZXh0Lm9iamVjdC5nZXRDYWxsKCkgPT09IFByaWNrZXIuQ2FsbC5QbGFpbiB9fVxuXHRwbGFpblxue3s/PyBjb250ZXh0Lm9iamVjdC5nZXRDYWxsKCkgPT09IFByaWNrZXIuQ2FsbC5Cb2IgfX1cblx0Ym9iXG57ez8/IGNvbnRleHQub2JqZWN0LmdldENhbGwoKSA9PT0gUHJpY2tlci5DYWxsLlNpbmdsZSB9fVxuXHRzaW5nbGVcbnt7P319XG4sXG4gLyogc2luZ2xlIHNwYWNlICovXG5cbnt7PyBjb250ZXh0LnRvdWNoUm93cyA+IDF9fVxuXHR7ez8gY29udGV4dC50b3VjaFJvd3MgPj0gNiB9fVxuXHRcdHt7PSBQcmlja2VyLlNpeFR5cGVbY29udGV4dC5vYmplY3QudHlwZV0udG9Mb3dlckNhc2UoKSB9fVxuXHR7ez8/fX1cblx0XHQrXG5cdFx0e3s9IGNvbnRleHQub2JqZWN0Lm5vdGF0aW9uLnNsaWNlKDAsIGNvbnRleHQudG91Y2hSb3dzIC0gMSkuam9pbignLicpIH19XG5cdHt7P319XG5cdCxcblx0IC8qIHNpbmdsZSBzcGFjZSAqL1xue3s/fX1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vKipcbiAqIFJlbmRlcnMgYSBzaW5nbGUgY291cnNlIHdpdGggdGhlIGluaXRpYWwgcm93IHVuZGVybGluZWQgYmVmb3JlIGl0XG4gKi9cblxuPHU+e3s9IFByaWNrZXIuc3RyaW5nRnJvbVJvdyhjb250ZXh0Lm9iamVjdC5nZXRJbml0aWFsUm93KCkpIH19PC91PjxiciAvPlxue3s9IGNvbnRleHQub2JqZWN0LnByaW50KCd0ZXh0JykgfX1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vKipcbiAqIFJlbmRlcnMgYSBjb3Vyc2UgYXMgSFRNTCBmb3IgTUJELXN0eWxlIHByaWNrZXJcbiAqIEBwYXJhbSB7QmxvY2tEaXJlY3Rvcnl9ICBmYWxzZW5lc3MgICAgIGRpcmVjdG9yeSB0byBsb29rdXAgZmFsc2VuZXNzXG4gKiBAcGFyYW0ge0Jsb2NrRGlyZWN0b3J5fSAgbXVzaWMgICAgICAgICBkaXJlY3RvcnkgdG8gbG9va3VwIG11c2ljXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgY291cnNlSW5kZXggICBpbmRleCBudW1iZXIgb2YgdGhlIGNvdXJzZVxuICogQHBhcmFtIHtDb3Vyc2V9ICAgICAgICAgIGV4dHJhU2l4ZXMgICAgYWRkaXRpb25hbCBzaXhlcyB0byBwcmludFxuICogQHBhcmFtIHtib29sZWFufSAgICAgICAgIHNob3dTaXhIZWFkcyAgc2hvdyBzaXggaGVhZHMgYXMgd2VsbCBhcyBzaXggZW5kc1xuICovXG5cbjx1Pnt7PSBQcmlja2VyLnN0cmluZ0Zyb21Sb3coY29udGV4dC5vYmplY3QuZ2V0SW5pdGlhbFJvdygpKSB9fTwvdT48YnIgLz5cblxue3t+IGNvbnRleHQub2JqZWN0LmdldFNpeGVzKCkgOnNpeCB9fVxuXHR7ez8gc2l4LmdldEluZGV4KCkgPT09IGNvbnRleHQub2JqZWN0LmdldExlbmd0aCgpIH19XG5cdFx0e3sgY29udGV4dC51bmRlcmxpbmUgPSB0cnVlIH19XG5cdHt7P319XG5cdHt7PSBzaXgucHJpbnQoJ21iZCcsIGNvbnRleHQpIH19XG57e359fVxuXG57ez8gY29udGV4dC5leHRyYVNpeGVzIH19XG5cdHt7fiBjb250ZXh0LmV4dHJhU2l4ZXMuZ2V0U2l4ZXMoKSA6c2l4IH19XG5cdFx0PHNwYW4gY2xhc3M9XCJleHRyYVNpeFwiPlxuXHRcdFx0e3s/IGNvbnRleHQuc2hvd1NpeEhlYWRzIH19XG5cdFx0XHRcdHt7PSBQcmlja2VyLnN0cmluZ0Zyb21Sb3coc2l4LmdldEhlYWQoKSkgfX1cblx0XHRcdFx0PGJyIC8+XG5cdFx0XHRcdDx1PlxuXHRcdFx0XHRcdHt7PSBQcmlja2VyLnN0cmluZ0Zyb21Sb3coc2l4LmdldEVuZCgpKSB9fVxuXHRcdFx0XHQ8L3U+XG5cdFx0XHR7ez8/fX1cblx0XHRcdFx0e3s9IFByaWNrZXIuc3RyaW5nRnJvbVJvdyhzaXguZ2V0RW5kKCkpIH19XG5cdFx0XHR7ez99fVxuXHRcdDwvc3Bhbj48YnIgLz5cblx0e3t+fX1cbnt7P319XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLyoqXG4gKiBSZW5kZXJzIGEgY291cnNlIGZvciBjb25zdW1wdGlvbiBieSBzaXJpbC1iYXNlZCBwcm92ZXJzXG4gKiBAcGFyYW0ge251bWJlcn0gIHRvdWNoUm93cyAgcm93cyByZW1haW5pbmcgaW4gdGhlIHRvdWNoXG4gKi9cblxue3tcblx0Y29udGV4dC50b3VjaFJvd3MgPSBjb250ZXh0LnRvdWNoUm93cyB8fCBJbmZpbml0eTtcbn19XG5cbnt7fiBjb250ZXh0Lm9iamVjdC5nZXRTaXhlcygpIDpzaXggfX1cblx0e3s9IHNpeC5wcmludCgnc2lyaWwnLCB7J3RvdWNoUm93cyc6IGNvbnRleHQudG91Y2hSb3dzfSkgfX1cblxuXHR7eyBjb250ZXh0LnRvdWNoUm93cyAtPSBzaXguZXN0aW1hdGVSb3dzKCk7IH19XG5cdHt7PyBjb250ZXh0LnRvdWNoUm93cyA8PSAwIH19XG5cdFx0e3sgYnJlYWs7IH19XG5cdHt7P319XG57e359fVxuXG5cIkAgIHt7PSBjb250ZXh0Lm9iamVjdC5wcmludCgndGV4dCcsIHsnY291cnNlRW5kJzogZmFsc2V9KSB9fVwiXG57ez0gJ1xcbicgfX1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vKipcbiAqIFJlbmRlcnMgYSBjb3Vyc2UsIGUuZy46XG4gKiA0ODA3MzU2OTJFMSAgczIgMyAgKDQgc2l4ZXMpXG4gKiAyMzE0NTY3ODkwRSAgcFxuICogQHBhcmFtIHtzdHJpbmd9ICAgZW5kICAgICAgICBsaW5lIGVuZGluZ1xuICogQHBhcmFtIHtib29sZWFufSAgY291cnNlRW5kICB3aGV0aGVyIHRvIHByaW50IHRoZSBjb3Vyc2UgZW5kXG4gKi9cblxue3tcblx0dmFyIGNhbGxzID0gWyBdO1xuXHRjb250ZXh0LmVuZCA9IGNvbnRleHQuZW5kIHx8ICcnO1xuXHRpZiAoY29udGV4dC5jb3Vyc2VFbmQgPT09IHVuZGVmaW5lZCkge1xuXHRcdGNvbnRleHQuY291cnNlRW5kID0gdHJ1ZTtcblx0fVxufX1cblxue3s/IGNvbnRleHQuY291cnNlRW5kIH19XG5cdHt7PSBQcmlja2VyLnN0cmluZ0Zyb21Sb3coY29udGV4dC5vYmplY3QuZ2V0RW5kKCkpIH19XG5cdCAvKiBzaW5nbGUgc3BhY2UgKi9cblx0IC8qIHNpbmdsZSBzcGFjZSAqL1xue3s/fX1cblxue3t+IGNvbnRleHQub2JqZWN0LmdldFNpeGVzKCkgOnNpeCB9fVxuXHR7ez8gc2l4LmdldENhbGwoKSB9fVxuXHRcdHt7IGNhbGxzLnB1c2goXG5cdFx0XHQoKHNpeC5nZXRDYWxsKCkgPT09IFByaWNrZXIuQ2FsbC5TaW5nbGUpID8gJ3MnIDogJycpXG5cdFx0XHRcdCsgc2l4LmdldEluZGV4KClcblx0XHQpOyB9fVxuXHR7ez99fVxue3t+fX1cblxue3s/IGNhbGxzLmxlbmd0aCB9fVxuXHR7ez0gY2FsbHMuam9pbignICcpIH19XG57ez8/fX1cblx0cFxue3s/fX1cblxue3s/IGNvbnRleHQub2JqZWN0LmdldExlbmd0aCgpICE9PSBjb250ZXh0Lm9iamVjdC5nZXRJbml0aWFsUm93KCkubGVuZ3RoICogMiB9fVxuXHQgLyogc2luZ2xlIHNwYWNlICovXG5cdCAvKiBzaW5nbGUgc3BhY2UgKi9cblx0KHt7PSBjb250ZXh0Lm9iamVjdC5nZXRMZW5ndGgoKSB9fSBzaXhlcylcbnt7P319XG5cbnt7PSBjb250ZXh0LmVuZCB9fVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8qKlxuICogUmVuZGVycyBhIHRvdWNoIGFzIEhUTUwgZm9yIHVzZSB3aXRoaW4gYSA8c2VsZWN0PiBlbGVtZW50XG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgdG91Y2hSb3dzICAgICAgIGNvdW50IG9mIHJvd3MgaW4gdGhlIHRvdWNoXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgc3R5bGVVbnJlYWNoZWQgIHN0eWxlIHRvIGFwcGx5IGZvciB1bnJlYWNoZWQgY291cnNlc1xuICogQHBhcmFtIHtCbG9ja0RpcmVjdG9yeX0gIGZhbHNlbmVzcyAgICAgICBkaXJlY3RvcnkgdG8gbG9va3VwIGZhbHNlbmVzc1xuICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgIHN0eWxlRmFsc2UgICAgICBzdHlsZSB0byBhcHBseSBmb3IgZmFsc2UgY291cnNlc1xuICovXG5cbnt7XG5cdGNvbnRleHQudG91Y2hSb3dzID0gY29udGV4dC50b3VjaFJvd3MgfHwgSW5maW5pdHk7XG5cdGNvbnRleHQudG91Y2hSb3dzIC09IDI7ICAvKiBUT0RPIG1hZ2ljIG51bWJlciAqL1xuXHRjb250ZXh0LnN0eWxlVW5yZWFjaGVkID0gY29udGV4dC5zdHlsZVVucmVhY2hlZCB8fCAnJztcblx0Y29udGV4dC5zdHlsZUZhbHNlID0gY29udGV4dC5zdHlsZUZhbHNlIHx8ICcnO1xufX1cblxuPG9wdGlvbiB2YWx1ZT1cIjBcIj5cblx0e3s9IFByaWNrZXIuc3RyaW5nRnJvbVJvdyhjb250ZXh0Lm9iamVjdC5nZXRTdGFydCgpLmdldExhc3QoKSkgfX1cbjwvb3B0aW9uPlxuXG57e34gY29udGV4dC5vYmplY3QuZ2V0Q291cnNlcygpIDpjb3Vyc2UgfX1cblx0PG9wdGlvblxuXHRcdCB2YWx1ZT1cInt7PSBjb3Vyc2UuZ2V0SW5kZXgoKSB9fVwiXG5cdFx0e3s/IGNvbnRleHQudG91Y2hSb3dzIDw9IDAgfX1cblx0XHRcdCAvKiBzaW5nbGUgc3BhY2UgKi9cblx0XHRcdHN0eWxlPVwie3s9IGNvbnRleHQuc3R5bGVVbnJlYWNoZWQgfX1cIlxuXHRcdHt7P319XG5cdFx0e3s/IGNvbnRleHQuZmFsc2VuZXNzICYmIGNvbnRleHQuZmFsc2VuZXNzLmNvbnRhaW5zKGNvdXJzZSkgfX1cblx0XHRcdCAvKiBzaW5nbGUgc3BhY2UgKi9cblx0XHRcdHN0eWxlPVwie3s9IGNvbnRleHQuc3R5bGVGYWxzZSB9fVwiXG5cdFx0e3s/fX1cblx0PlxuXHRcdHt7PSBjb3Vyc2UucHJpbnQoJ3RleHQnKSB9fVxuXHQ8L29wdGlvbj5cblx0e3sgY29udGV4dC50b3VjaFJvd3MgLT0gY291cnNlLmVzdGltYXRlUm93cygpOyB9fVxue3t+fX1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vKipcbiAqIFJlbmRlcnMgYSB0b3VjaCBmb3IgY29uc3VtcHRpb24gYnkgc2lyaWwtYmFzZWQgcHJvdmVyc1xuICogQHBhcmFtIHtudW1iZXJ9ICB0b3VjaFJvd3MgIHJvd3MgaW4gdGhlIHRvdWNoXG4gKi9cblxue3tcblx0dmFyIGNvdXJzZU5hbWVzID0gWyBdLFxuXHRcdHJvdW5kcyA9IFByaWNrZXIuc3RyaW5nRnJvbVJvdyhcblx0XHRcdFByaWNrZXIucm93RnJvbVN0cmluZygnJywgY29udGV4dC5vYmplY3QuZ2V0SW5pdGlhbFJvdygpLmxlbmd0aClcblx0XHQpO1xuXG5cdGNvbnRleHQudG91Y2hSb3dzID0gY29udGV4dC50b3VjaFJvd3MgfHwgSW5maW5pdHk7XG5cdGNvbnRleHQudG91Y2hSb3dzIC09IGNvbnRleHQub2JqZWN0LmdldFN0YXJ0KCkuZXN0aW1hdGVSb3dzKCk7XG59fVxuXG4vKiBIZWFkZXIgKi9cbi8vIEdlbmVyYXRlZCBieSBGcmVlIFRvdWNoIFByaWNrZXJ7ez0gJ1xcbicgfX1cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW1wbGVpZ2gvdG91Y2gtcHJpY2tlcnt7PSAnXFxuJyB9fVxue3s9ICdcXG4nIH19XG5cbi8qIE91dHB1dCB0b3VjaCBhcyBjb21tZW50cyAqL1xuLy8ge3s9IFByaWNrZXIuc3RyaW5nRnJvbVJvdyhjb250ZXh0Lm9iamVjdC5nZXRJbml0aWFsUm93KCkpIH19e3s9ICdcXG4nIH19XG57e34gY29udGV4dC5vYmplY3QuZ2V0Q291cnNlcygpIDpjb3Vyc2UgfX1cblx0Ly8ge3s9IGNvdXJzZS5wcmludCgndGV4dCcpIH19e3s9ICdcXG4nIH19XG57e359fVxue3s9ICdcXG4nIH19XG5cbi8qIE51bWJlciBvZiBiZWxscyAqL1xue3s9IGNvbnRleHQub2JqZWN0LmdldEluaXRpYWxSb3coKS5sZW5ndGggfX0gYmVsbHN7ez0gJ1xcbicgfX1cbnt7PSAnXFxuJyB9fVxuXG4vKiBNaWNyb1NJUklMIHdpbGwgcHJvdmUgdGhlIGZpcnN0IHN5bWJvbCBpbiB0aGUgZmlsZSwgc28gZGVmaW5lIGl0ICovXG5jb21wb3NpdGlvbiA9IHRvdWNoe3s9ICdcXG4nIH19XG57ez0gJ1xcbicgfX1cblxuLyogU2hvcnQgYmxvY2tzICovXG5zbG93ID0gKzMuMS4zLjEuM3t7PSAnXFxuJyB9fVxucXVpY2sgPSArMS4zLjEuMy4xe3s9ICdcXG4nIH19XG5wbGFpbiA9ICt7ez0gcm91bmRzLnNsaWNlKC0xKSB9fXt7PSAnXFxuJyB9fVxuYm9iID0gK3t7PSByb3VuZHMuc2xpY2UoLTMsIC0yKSB9fXt7PSAnXFxuJyB9fVxuc2luZ2xlID0gK3t7PSByb3VuZHMuc2xpY2UoLTMpIH19e3s9ICdcXG4nIH19XG4vKiBDYW4ndCB1c2UgdGhlIG5hbWUgXCJzdGFydFwiOiBpdCdzIHByb2Nlc3NlZCBzZXBhcmF0ZWx5IGJ5IGdzaXJpbCAqL1xuc3RydCA9IHt7PSBjb250ZXh0Lm9iamVjdC5nZXRTdGFydCgpLnByaW50KCdzaXJpbCcpIH19e3s9ICdcXG4nIH19XG57ez0gJ1xcbicgfX1cblxuLyogQ291cnNlIGRlZmluaXRpb25zICovXG57e34gY29udGV4dC5vYmplY3QuZ2V0Q291cnNlcygpIDpjb3Vyc2U6aW5kZXggfX1cblx0Y291cnNle3s9IGluZGV4ICsgMSB9fSA9XG5cdCAvKiBzaW5nbGUgc3BhY2UgKi9cblx0e3s9IGNvdXJzZS5wcmludCgnc2lyaWwnLCB7J3RvdWNoUm93cyc6IGNvbnRleHQudG91Y2hSb3dzfSkgfX1cblx0e3sgY291cnNlTmFtZXMucHVzaCgnY291cnNlJyArIChpbmRleCArIDEpKTsgfX1cblxuXHR7eyBjb250ZXh0LnRvdWNoUm93cyAtPSBjb3Vyc2UuZXN0aW1hdGVSb3dzKCk7IH19XG5cdHt7PyBjb250ZXh0LnRvdWNoUm93cyA8PSAwIH19XG5cdFx0e3sgYnJlYWs7IH19XG5cdHt7P319XG57e359fVxue3s9ICdcXG4nIH19XG5cbi8qIFRvdWNoIC0gYWxsIHRoZSBjb3Vyc2VzICovXG50b3VjaCA9IHN0cnQsIHt7PSBjb3Vyc2VOYW1lcy5qb2luKCcsICcpIH19e3s9ICdcXG4nIH19XG57ez0gJ1xcbicgfX1cblxuLyogRGVmaW5lIHRoZSB0b3VjaCB0byBwcm92ZSBmb3IgR1NpcmlsICovXG5wcm92ZSB0b3VjaHt7PSAnXFxuJyB9fVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8qKlxuICogUmVuZGVycyBhIHRvdWNoIGFzIHRleHRcbiAqL1xuXG57eyB2YXIgc3RhcnQgPSBjb250ZXh0Lm9iamVjdC5nZXRTdGFydCgpLnByaW50KCd0ZXh0Jyk7IH19XG5cbnt7PSBQcmlja2VyLnN0cmluZ0Zyb21Sb3coY29udGV4dC5vYmplY3QuZ2V0U3RhcnQoKS5nZXRMYXN0KCkpIH19e3s9ICdcXG4nIH19XG57e34gY29udGV4dC5vYmplY3QuZ2V0Q291cnNlcygpIDpjb3Vyc2UgfX1cblx0e3s9IGNvdXJzZS5wcmludCgndGV4dCcsIHsnZW5kJzogJ1xcbid9KSB9fVxue3t+fX1cblxue3s/IHN0YXJ0IH19XG5cdHt7PSBzdGFydCB9fXt7PSAnXFxuJyB9fVxue3s/fX1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vKipcbiAqIFJlbmRlcnMgYSBzdGFydCBmb3IgY29uc3VtcHRpb24gYnkgc2lyaWwtYmFzZWQgcHJvdmVyc1xuICovXG5cbnt7IHZhciBTaXggPSBbUHJpY2tlci5TbG93LCBQcmlja2VyLlF1aWNrXVtjb250ZXh0Lm9iamVjdC5nZXRTaXhUeXBlKCldOyB9fVxuXG4rXG57ez0gU2l4Lm5vdGF0aW9uLnNsaWNlKGNvbnRleHQub2JqZWN0LmdldFJvd0luZGV4KCkgLSAxKS5qb2luKCcuJykgfX1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vKipcbiAqIFJlbmRlcnMgYSBzdGFydCwgZS5nLjpcbiAqIFwiU3RhcnQgZnJvbSByb3VuZHMgYXMgdGhlIGZpZnRoIHJvdyBvZiBhIHF1aWNrIHNpeC5cIlxuICovXG5cbnt7IHZhciByb3dNYXAgPSBbJycsICdmaXJzdCcsICdzZWNvbmQnLCAndGhpcmQnLCAnZm91cnRoJywgJ2ZpZnRoJywgJ2xhc3QnXTsgfX1cblxue3s/XG5cdGNvbnRleHQub2JqZWN0LmdldFJvd0luZGV4KCkgPT09IDQgJiZcblx0XHRjb250ZXh0Lm9iamVjdC5nZXRTaXhUeXBlKCkgPT09IFByaWNrZXIuU2l4VHlwZS5RdWlja1xufX1cblxuXHQvKiBObyBvdXRwdXQgZm9yIHN0YW5kYXJkIHN0YXJ0ICovXG5cbnt7Pz99fVxuXG5cdFN0YXJ0IGZyb20gcm91bmRzIGFzIHRoZVxuXHQgLyogc2luZ2xlIHNwYWNlICovXG5cdHt7PSByb3dNYXBbY29udGV4dC5vYmplY3QuZ2V0Um93SW5kZXgoKV0gfX1cblx0IC8qIHNpbmdsZSBzcGFjZSAqL1xuXHRyb3cgb2YgYVxuXHQgLyogc2luZ2xlIHNwYWNlICovXG5cdHt7PSBQcmlja2VyLlNpeFR5cGVbY29udGV4dC5vYmplY3QuZ2V0U2l4VHlwZSgpXS50b0xvd2VyQ2FzZSgpIH19XG5cdCAvKiBzaW5nbGUgc3BhY2UgKi9cblx0c2l4LlxuXG57ez99fVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8qKlxuICogUmVuZGVycyBhbiBBYnN0cmFjdFNjaGVtZSBhcyB0ZXh0XG4gKi9cblxue3t+IGNvbnRleHQub2JqZWN0LmdldE1hdGNoZXJzKCkgOm1hdGNoZXIgfX1cblxuXHR7ez0gbWF0Y2hlci5wcmludCgndGV4dCcpIH19XG5cbnt7fn19XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLyoqXG4gKiBDU1MgZm9yIE1CRC1zdHlsZSBwcmlja2VyXG4gKi9cblxuI3NpeGVuZHMge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIGZvbnQtZmFtaWx5OiBcIkNvdXJpZXIgTmV3XCIsIFwiQ291cmllclwiLCBcIm1vbm9zcGFjZVwiO1xuICAgIGZvbnQtc2l6ZTogMTJwdDtcbiAgICBtYXJnaW4tcmlnaHQ6IDI1cHg7XG59XG5cbiNjb250cm9scyB7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgbWFyZ2luLXJpZ2h0OiAyNXB4O1xufVxuXG4udGFiIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUZFRkY3O1xuICAgIGJvcmRlci1jb2xvcjogYmxhY2s7XG4gICAgYm9yZGVyLXJhZGl1czogMTVweCAwIDAgMDtcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgIGJvcmRlci13aWR0aDogMXB4IDFweCAwIDFweDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgaGVpZ2h0OiAyMHB4O1xuICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICAgIHBhZGRpbmctbGVmdDogMTBweDtcbiAgICBwYWRkaW5nLXJpZ2h0OiA4cHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4udGFiLXNlbGVjdGVkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjQkRCREU3O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4jcGFnZXMge1xuICAgIHdpZHRoOiAzNjBweDtcbn1cblxuLnBhZ2Uge1xuICAgIGJvcmRlci1jb2xvcjogYmxhY2s7XG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICBib3JkZXItd2lkdGg6IDFweDtcbiAgICBjbGVhcjogbGVmdDtcbiAgICBkaXNwbGF5OiBub25lO1xuICAgIHBhZGRpbmc6IDlweDtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgd2lkdGg6IDM0MHB4O1xufVxuXG4ucGFnZS1zZWxlY3RlZCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbn1cblxuLnBhZ2UgZGl2LCAucGFnZSBkaXYjc2F2ZWRDYWxsaW5nIHtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG4ucGFnZSBkaXY6bGFzdC1vZi10eXBlIHtcbiAgICBtYXJnaW4tYm90dG9tOiAwcHg7XG59XG5cbi5wYWdlIGZvcm0ge1xuICAgIGhlaWdodDogMjVweDtcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4ucGFnZSB0ZXh0YXJlYSB7XG4gICAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gICAgaGVpZ2h0OiA0NTBweDtcbiAgICBwYWRkaW5nOiAxcHg7XG4gICAgd2lkdGg6IDMzNnB4O1xufVxuXG4jdG91Y2gge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNFRkVGRjc7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgcGFkZGluZzogMTBweDtcbn1cblxuI3RvdWNoIGRpdiB7XG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xufVxuXG4jdG91Y2ggZGl2Omxhc3Qtb2YtdHlwZSB7XG4gICAgbWFyZ2luLWJvdHRvbTogMHB4O1xufVxuXG4jY291cnNlcyB7XG4gICAgbWFyZ2luOiA1cHggMDtcbn1cblxuLnNsb3dTaXgge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNGMEYwRjg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4ucXVpY2tTaXgge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNFMkUyRjA7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uZXh0cmFTaXgge1xuICAgIGNvbG9yOiAjNTA1MDUwO1xufVxuXG4uZmFsc2VCbG9jayB7XG4gICAgY29sb3I6IHJlZDtcbn1cblxuLm11c2ljYWxCbG9jayB7XG4gICAgY29sb3I6IGdvbGQ7XG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLyoqXG4gKiBIVE1MIGZvciBNQkQtc3R5bGUgcHJpY2tlclxuICovXG5cbjxkaXYgaWQ9XCJzaXhlbmRzXCI+PC9kaXY+XG5cbjxkaXYgaWQ9XCJjb250cm9sc1wiPlxuXG4gIDxkaXYgaWQ9XCJ0YWJzXCI+XG4gICAgPGRpdiBpZD1cInRhYl9wcmlja2luZ1wiIG9uY2xpY2s9XCJwcmlja2VyLm9uVGFiKCdwcmlja2luZycpXCIgY2xhc3M9XCJ0YWIgdGFiLXNlbGVjdGVkXCI+UHJpY2tpbmc8L2Rpdj5cbiAgICA8ZGl2IGlkPVwidGFiX2xvYWRTYXZlXCIgb25jbGljaz1cInByaWNrZXIub25UYWIoJ2xvYWRTYXZlJylcIiBjbGFzcz1cInRhYlwiPkxvYWQvU2F2ZTwvZGl2PlxuICAgIDxkaXYgaWQ9XCJ0YWJfc2lyaWxcIiAgICBvbmNsaWNrPVwicHJpY2tlci5vblRhYignc2lyaWwnKVwiICAgIGNsYXNzPVwidGFiXCI+U2lyaWw8L2Rpdj5cbiAgICA8ZGl2IGlkPVwidGFiX211c2ljXCIgICAgb25jbGljaz1cInByaWNrZXIub25UYWIoJ211c2ljJylcIiAgICBjbGFzcz1cInRhYlwiPk11c2ljPC9kaXY+XG4gICAgPGRpdiBpZD1cInRhYl92aWV3XCIgICAgIG9uY2xpY2s9XCJwcmlja2VyLm9uVGFiKCd2aWV3JylcIiAgICAgY2xhc3M9XCJ0YWJcIj5WaWV3PC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgaWQ9XCJwYWdlc1wiPlxuXG4gICAgPGRpdiBjbGFzcz1cInBhZ2UgcGFnZS1zZWxlY3RlZFwiIGlkPVwicGFnZV9wcmlja2luZ1wiPlxuICAgICAgPGRpdj5cbiAgICAgICAgPGxhYmVsIGZvcj1cInN0YWdlXCI+TnVtYmVyIG9mIGJlbGxzOjwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3QgaWQ9XCJzdGFnZVwiIG9uY2hhbmdlPVwicHJpY2tlci5vblN0YWdlKClcIj48L3NlbGVjdD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdj5cbiAgICAgICAgQ291cnNlIGZyb20gcm91bmRzOlxuICAgICAgICA8ZGl2IGlkPVwiY2FsbGluZ0Zyb21Sb3VuZHNcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdj5cbiAgICAgICAgRnJvbSBjdXJyZW50IHN0YXJ0IHJvdzpcbiAgICAgICAgPGRpdiBpZD1cImNhbGxpbmdcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdj5cbiAgICAgICAgPGZvcm0gb25zdWJtaXQ9XCJyZXR1cm4gZmFsc2VcIj5cbiAgICAgICAgPGxhYmVsIGZvcj1cImluaXRpYWxSb3dcIj5TdGFydGluZyByb3c6PC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJpbml0aWFsUm93XCIgc2l6ZT1cIjE1XCIgbWF4TGVuZ3RoPVwiMTVcIiAvPlxuICAgICAgICA8YnV0dG9uIG9uY2xpY2s9XCJwcmlja2VyLm9uU2V0SW5pdGlhbFJvdygpXCI+U2V0PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gb25jbGljaz1cInByaWNrZXIub25SZXNldEluaXRpYWxSb3coKVwiPlJlc2V0PC9idXR0b24+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBpZD1cImZpcnN0U2l4QmxvY2tcIj5cbiAgICAgICAgPGxhYmVsIGZvcj1cImZpcnN0U2l4XCI+Rmlyc3Qgc2l4OjwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3QgaWQ9XCJmaXJzdFNpeFwiIG9uY2hhbmdlPVwicHJpY2tlci5vbkZpcnN0U2l4KClcIj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwie3s9IFByaWNrZXIuU2l4VHlwZS5TbG93IH19XCI+U2xvdzwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ7ez0gUHJpY2tlci5TaXhUeXBlLlF1aWNrIH19XCI+UXVpY2s8L29wdGlvbj5cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxmb3JtIG9uc3VibWl0PVwicmV0dXJuIGZhbHNlXCI+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJjb3Vyc2VMZW5ndGhcIj5Db3Vyc2UgbGVuZ3RoOjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiY291cnNlTGVuZ3RoXCIgc2l6ZT1cIjJcIiBtYXhMZW5ndGg9XCIyXCIgLz5cbiAgICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwicHJpY2tlci5vblNldExlbmd0aCgpXCI+U2V0PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gb25jbGljaz1cInByaWNrZXIub25SZXNldExlbmd0aCgpXCI+UmVzZXQ8L2J1dHRvbj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICA8bGFiZWwgZm9yPVwiY2FsbFJlc2V0XCI+Q3VycmVudCBjYWxsaW5nOjwvbGFiZWw+XG4gICAgICAgIDxidXR0b24gaWQ9XCJjYWxsUmVzZXRcIiBvbmNsaWNrPVwicHJpY2tlci5vblJlc2V0Q2FsbHMoKVwiPlJlc2V0PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXY+XG4gICAgICAgIFNhdmVkIGNhbGxpbmc6XG4gICAgICAgIDxkaXYgaWQ9XCJzYXZlZENhbGxpbmdcIj48L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiBpZD1cInNhdmVDYWxsaW5nXCIgb25jbGljaz1cInByaWNrZXIub25TYXZlQ2FsbGluZygpXCI+U2F2ZTwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGlkPVwibG9hZENhbGxpbmdcIiBvbmNsaWNrPVwicHJpY2tlci5vbkxvYWRDYWxsaW5nKClcIj5Mb2FkPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJwYWdlXCIgaWQ9XCJwYWdlX2xvYWRTYXZlXCI+XG4gICAgICA8Zm9ybSBvbnN1Ym1pdD1cInJldHVybiBmYWxzZVwiPlxuICAgICAgICA8YnV0dG9uIG9uY2xpY2s9XCJwcmlja2VyLm9uTG9hZFRvdWNoKClcIj5JbXBvcnQ8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwicHJpY2tlci5vblNhdmVUb3VjaCgpXCI+RXhwb3J0PC9idXR0b24+XG4gICAgICA8L2Zvcm0+XG4gICAgICA8dGV4dGFyZWEgaWQ9XCJsb2FkU2F2ZVRleHRhcmVhXCI+PC90ZXh0YXJlYT5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJwYWdlXCIgaWQ9XCJwYWdlX3NpcmlsXCI+XG4gICAgICA8Zm9ybSBvbnN1Ym1pdD1cInJldHVybiBmYWxzZVwiPlxuICAgICAgICA8YnV0dG9uIG9uY2xpY2s9XCJwcmlja2VyLm9uR2VuZXJhdGVTaXJpbCgpXCI+R2VuZXJhdGU8L2J1dHRvbj5cbiAgICAgIDwvZm9ybT5cbiAgICAgIDx0ZXh0YXJlYSBpZD1cInNpcmlsVGV4dGFyZWFcIj48L3RleHRhcmVhPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInBhZ2VcIiBpZD1cInBhZ2VfbXVzaWNcIj5cbiAgICAgIDxmb3JtIG9uc3VibWl0PVwicmV0dXJuIGZhbHNlXCI+XG4gICAgICAgIDxidXR0b24gb25jbGljaz1cInByaWNrZXIub25BbmFseXNlTXVzaWMoKVwiPkFuYWx5c2U8L2J1dHRvbj5cbiAgICAgIDwvZm9ybT5cbiAgICAgIDx0ZXh0YXJlYSBpZD1cIm11c2ljVGV4dGFyZWFcIj48L3RleHRhcmVhPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInBhZ2VcIiBpZD1cInBhZ2Vfdmlld1wiPlxuICAgICAgPGRpdj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwic2hvd1NpeEhlYWRzXCIgb25jbGljaz1cInByaWNrZXIub25TaG93U2l4SGVhZHMoKVwiIC8+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJzaG93U2l4SGVhZHNcIj5TaG93IHNpeCBoZWFkczwvbGFiZWw+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cInNob3dBZHZhbmNlZE9wdGlvbnNcIiBvbmNsaWNrPVwicHJpY2tlci5vblNob3dBZHZhbmNlZE9wdGlvbnMoKVwiIC8+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJzaG93QWR2YW5jZWRPcHRpb25zXCI+U2hvdyBhZHZhbmNlZCBvcHRpb25zPC9sYWJlbD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gIDwvZGl2PlxuXG48L2Rpdj5cblxuPGRpdiBpZD1cInRvdWNoXCI+XG4gIDxkaXY+XG4gICAgPGJ1dHRvbiBvbmNsaWNrPVwicHJpY2tlci5vblByb3ZlKClcIj5QUk9WRTwvYnV0dG9uPlxuICAgIDxzcGFuIGlkPVwicHJvb2ZSZXN1bHRcIj48L3NwYW4+XG4gIDwvZGl2PlxuICA8ZGl2IGlkPVwibnVtUm93c1wiPjwvZGl2PlxuICA8ZGl2PlxuICAgIDxsYWJlbD5cbiAgICAgIDxpbnB1dCBpZD1cInJvbGxpbmdcIiB0eXBlPVwiY2hlY2tib3hcIiAvPlxuICAgICAgUm9sbGluZyBjb3Vyc2UgZW50cnlcbiAgICA8L2xhYmVsPlxuICA8L2Rpdj5cbiAgPGRpdiBpZD1cInN0YXJ0QmxvY2tcIj5cbiAgICBTdGFydCB3aXRoIHJvdW5kcyBhcyB0aGVcbiAgICA8c2VsZWN0IGlkPVwicm93SW5kZXhcIiBvbmNoYW5nZT1cInByaWNrZXIub25Sb3dJbmRleCgpXCI+XG4gICAgICA8b3B0aW9uIHZhbHVlPVwiMVwiPmZpcnN0PC9vcHRpb24+XG4gICAgICA8b3B0aW9uIHZhbHVlPVwiMlwiPnNlY29uZDwvb3B0aW9uPlxuICAgICAgPG9wdGlvbiB2YWx1ZT1cIjNcIj50aGlyZDwvb3B0aW9uPlxuICAgICAgPG9wdGlvbiB2YWx1ZT1cIjRcIj5mb3VydGg8L29wdGlvbj5cbiAgICAgIDxvcHRpb24gdmFsdWU9XCI1XCI+ZmlmdGg8L29wdGlvbj5cbiAgICAgIDxvcHRpb24gdmFsdWU9XCI2XCI+c2l4dGg8L29wdGlvbj5cbiAgICA8L3NlbGVjdD5cbiAgICByb3cgb2YgYVxuICAgIDxzZWxlY3QgaWQ9XCJzaXhUeXBlXCIgb25jaGFuZ2U9XCJwcmlja2VyLm9uU2l4VHlwZSgpXCI+XG4gICAgICA8b3B0aW9uIHZhbHVlPVwie3s9IFByaWNrZXIuU2l4VHlwZS5RdWljayB9fVwiPnF1aWNrPC9vcHRpb24+XG4gICAgICA8b3B0aW9uIHZhbHVlPVwie3s9IFByaWNrZXIuU2l4VHlwZS5TbG93IH19XCI+c2xvdzwvb3B0aW9uPlxuICAgIDwvc2VsZWN0PlxuICAgIHNpeC5cbiAgPC9kaXY+XG4gIDxkaXY+XG4gICAgPGZvcm0gb25zdWJtaXQ9XCJyZXR1cm4gZmFsc2VcIj5cbiAgICAgIDxidXR0b24gb25jbGljaz1cInByaWNrZXIub25JbnNlcnRDb3Vyc2UoKVwiPkluc2VydDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwicHJpY2tlci5vblBhc3RlQ291cnNlKClcIj5QYXN0ZTwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwicHJpY2tlci5vbkNvcHlDb3Vyc2UoKVwiPkNvcHk8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gb25jbGljaz1cInByaWNrZXIub25DdXRDb3Vyc2UoKVwiPkN1dDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwicHJpY2tlci5vbkRlbGV0ZUNvdXJzZSgpXCI+RGVsZXRlPC9idXR0b24+XG4gICAgPC9mb3JtPlxuICAgIDxzZWxlY3QgaWQ9XCJjb3Vyc2VzXCI+PC9zZWxlY3Q+XG4gICAgPGZvcm0gb25zdWJtaXQ9XCJyZXR1cm4gZmFsc2VcIj5cbiAgICAgIDxidXR0b24gb25jbGljaz1cInByaWNrZXIub25JbnNlcnRDb3Vyc2UoKVwiPkluc2VydDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwicHJpY2tlci5vblBhc3RlQ291cnNlKClcIj5QYXN0ZTwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwicHJpY2tlci5vbkNvcHlDb3Vyc2UoKVwiPkNvcHk8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gb25jbGljaz1cInByaWNrZXIub25DdXRDb3Vyc2UoKVwiPkN1dDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwicHJpY2tlci5vbkRlbGV0ZUNvdXJzZSgpXCI+RGVsZXRlPC9idXR0b24+XG4gICAgPC9mb3JtPlxuICA8L2Rpdj5cbjwvZGl2PlxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8qKlxuICogUmVuZGVycyBhIFBhdHRlcm4gYXMgdGV4dFxuICogQHBhcmFtIHtzdHJpbmd9IGVuZCAgbGluZSBlbmRpbmdcbiAqL1xuXG57ez8gY29udGV4dC5lbmQgPT09IHVuZGVmaW5lZCB9fVxuXHR7eyBjb250ZXh0LmVuZCA9ICdcXG4nOyB9fVxue3s/fX1cblxue3s/IGNvbnRleHQub2JqZWN0LmdldE1hdGNoQ291bnQoKSA+IDAgfX1cblxuXHR7ez8gY29udGV4dC5vYmplY3QuaXNXaWxkY2FyZE1hdGNoKCkgfHxcblx0XHRcdGNvbnRleHQub2JqZWN0LmdldE1hdGNoQ291bnQoKSA+IDFcblx0fX1cblx0XHR7ez0gY29udGV4dC5vYmplY3QuZ2V0TWF0Y2hDb3VudCgpIH19XG5cdFx0IC8qIHNpbmdsZSBzcGFjZSAqL1xuXHR7ez99fVxuXG5cdHt7PSBjb250ZXh0Lm9iamVjdC5nZXROYW1lKCkgfX1cblxuXHR7ez0gY29udGV4dC5lbmQgfX1cblxue3s/fX1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vKipcbiAqIFJlbmRlcnMgYSBQYXR0ZXJuR3JvdXAgYXMgdGV4dFxuICovXG5cbnt7PyBjb250ZXh0Lm9iamVjdC5nZXRNYXRjaENvdW50KCkgPiAwIH19XG5cblx0e3s9IGNvbnRleHQub2JqZWN0LmdldE1hdGNoQ291bnQoKSB9fVxuXG5cdCAvKiBzaW5nbGUgc3BhY2UgKi9cblxuXHR7ez0gY29udGV4dC5vYmplY3QuZ2V0TmFtZSgpIH19XG5cblx0e3s/IGNvbnRleHQub2JqZWN0LmdldFN1Ym1hdGNoQ291bnQoKSA+IDAgfX1cblxuXHRcdCAvKiBzaW5nbGUgc3BhY2UgKi9cblx0XHQoXG5cblx0XHR7eyB2YXIgZmlyc3QgPSB0cnVlOyB9fVxuXHRcdHt7fiBjb250ZXh0Lm9iamVjdC5nZXRQYXR0ZXJucygpIDpwYXR0ZXJuIH19XG5cdFx0XHR7eyBpZiAoIXBhdHRlcm4pIHsgY29udGludWU7IH0gLyogSUU4IHRyYWlsaW5nIGNvbW1hICovIH19XG5cdFx0XHR7ez8gcGF0dGVybi5nZXRNYXRjaENvdW50KCkgPiAwIH19XG5cdFx0XHRcdHt7PyAhZmlyc3QgfX0sIHt7P319XG5cdFx0XHRcdHt7PSBwYXR0ZXJuLnByaW50KCd0ZXh0JywgeydlbmQnOiAnJ30pIH19XG5cdFx0XHRcdHt7IGZpcnN0ID0gZmFsc2U7IH19XG5cdFx0XHR7ez99fVxuXHRcdHt7fn19XG5cblx0XHQpXG5cblx0e3s/fX1cblxuXHR7ez0gJ1xcbicgfX1cblxue3s/fX1cbiJdfQ==
