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
 * @version 1.0.0
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
     *  - provides access to the end row at the end of the block
     *  - recalculates that end row if the initial row is changed
     *  - provides mechanisms for controlling how the end row is created
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
         * Derived classes should call this whenever the end row changes.
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
/// <reference path="BlockOwnership.ts" />
/// <reference path="Notifiable.ts" />
/// <reference path="Row.ts" />
/// <reference path="Visitor/Abstract.ts" />
var Pricker;
(function (Pricker) {
    /**
     * Abstract class representing containers for blocks of rows
     *
     * Note that containers are also blocks themselves.
     */
    var AbstractContainer = /** @class */ (function (_super) {
        __extends(AbstractContainer, _super);
        /**
         * Constructor
         *
         * Extends the AbstractBlock container to create contained blocks.
         */
        function AbstractContainer(initialRow, _ownership) {
            var _this = _super.call(this, initialRow, _ownership) || this;
            _this._ownership = _ownership;
            /**
             * Blocks within the container
             */
            _this._blocks = [];
            _this.extend(_this.getDefaultLength(initialRow));
            return _this;
        }
        /* AbstractBlock methods **********************************************/
        /**
         * Does any calculation needed by the block
         */
        AbstractContainer.prototype.calculate = function () {
            this.calculateBlocks();
        };
        /**
         * Returns the end row
         */
        AbstractContainer.prototype.getEnd = function () {
            if (this._blocks.length) {
                return this._blocks[this._blocks.length - 1].getEnd();
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
            this.calculateBlocks(index);
            this.notifyContainer();
        };
        /* AbstractContainer methods ******************************************/
        /**
         * Extends the container by adding the specified number of blocks
         * @param blocks  blocks to add
         */
        AbstractContainer.prototype.extend = function (blocks) {
            var oldLength = this.getLength(), newLength = oldLength + blocks;
            var index, initialRow = this.getEnd();
            for (index = oldLength + 1; index <= newLength; index += 1) {
                this._blocks[index - 1] = this.createBlock(initialRow, index);
                initialRow = this._blocks[index - 1].getEnd();
            }
            return this;
        };
        /**
         * Returns the default length of new containers of this type
         *
         * Derived classes should override this method if required.
         */
        AbstractContainer.prototype.getDefaultLength = function (initialRow) {
            return 1;
        };
        /**
         * Calculates blocks within the container
         * @param index  where to start when recalculating
         */
        AbstractContainer.prototype.calculateBlocks = function (index) {
            if (index === void 0) { index = 0; }
            var initialRow = this._initialRow;
            if (index) {
                initialRow = this._blocks[index - 1].getEnd();
            }
            for (; index < this.getLength(); index += 1) {
                this._blocks[index].setInitialRow(initialRow);
                initialRow = this._blocks[index].getEnd();
            }
        };
        /**
         * Read access to the length
         */
        AbstractContainer.prototype.getLength = function () {
            return this._blocks.length;
        };
        /**
         * Write access to the length
         */
        AbstractContainer.prototype.setLength = function (length) {
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
        AbstractContainer.prototype.safeSetLength = function (length) {
            length = Math.max(length, this.minLength);
            length = Math.min(length, this.maxLength);
            return this.setLength(length);
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
/// <reference path="AbstractBlock.ts" />
/// <reference path="BlockOwnership.ts" />
/// <reference path="Call.ts" />
/// <reference path="Changes.ts" />
/// <reference path="Row.ts" />
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
         * Returns the end row
         */
        AbstractSix.prototype.getEnd = function () {
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
         * Returns the start row
         */
        AbstractSix.prototype.getStartRow = function () {
            var start = this._initialRow.slice();
            Pricker.Changes.permuteCall(start, this._call);
            return start;
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
/// <reference path="AbstractContainer.ts" />
/// <reference path="AbstractSix.ts" />
/// <reference path="Call.ts" />
/// <reference path="Row.ts" />
var Pricker;
(function (Pricker) {
    /**
     * A course, being a set of sixes
     */
    var Course = /** @class */ (function (_super) {
        __extends(Course, _super);
        function Course() {
            /* PrintableMixin methods *********************************************/
            var _this = _super !== null && _super.apply(this, arguments) || this;
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
             * Read access to the sixes
             */
            _this.getSixes = _this.getBlocks;
            /**
             * Read access to a six
             */
            _this.getSix = _this.getBlock;
            return _this;
        }
        /* AbstractContainer methods ******************************************/
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
            return index % 2
                ? new Pricker.Slow(initialRow, { 'container': this, 'index': index })
                : new Pricker.Quick(initialRow, { 'container': this, 'index': index });
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
    }(Pricker.AbstractContainer));
    Pricker.Course = Course;
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
/// <reference path="Changes.ts" />
/// <reference path="Course.ts" />
/// <reference path="Row.ts" />
/// <reference path="Stage.ts" />
/// <reference path="Visitor/Abstract.ts" />
var Pricker;
(function (Pricker) {
    /**
     * A touch, being a set of courses
     */
    var Touch = /** @class */ (function (_super) {
        __extends(Touch, _super);
        function Touch() {
            /* AbstractBlock methods **********************************************/
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /* PrintableMixin methods *********************************************/
            /**
             * Path for this class' templates
             */
            _this.templatePath = 'Touch';
            /**
             * Lower limit on length for the particular concrete class
             */
            _this.minLength = 0;
            /**
             * Upper limit on length for the particular concrete class
             */
            _this.maxLength = 100;
            /* Touch methods ******************************************************/
            /**
             * Read access to the courses
             */
            _this.getCourses = _this.getBlocks;
            /**
             * Read access to a course
             */
            _this.getCourse = _this.getBlock;
            return _this;
        }
        /**
         * Receives a visitor that will be called to process each row
         */
        Touch.prototype.accept = function () {
            var visitors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                visitors[_i] = arguments[_i];
            }
            var row = this._initialRow.slice();
            Pricker.Changes.permute1(row); // Go backwards one change from _initialRow
            for (var _a = 0, visitors_2 = visitors; _a < visitors_2.length; _a++) {
                var visitor = visitors_2[_a];
                visitor.visit(row);
                visitor.visit(this._initialRow);
            }
            return _super.prototype.accept.apply(this, visitors);
        };
        /**
         * Estimates the number of rows in the block
         * The estimate doesn't take into account coming round part-way through
         */
        Touch.prototype.estimateRows = function () {
            return 2 + _super.prototype.estimateRows.call(this);
        };
        /* AbstractContainer methods ******************************************/
        /**
         * Returns the default length of new containers of this type
         *
         * Derived classes should override this method if required.
         */
        Touch.prototype.getDefaultLength = function (initialRow) {
            return 0;
        };
        /**
         * Creates a new block for the container
         *
         * Used by extend() when creating the container or increasing its
         * length.
         * @param initialRow  initial row for the block
         * @param index       index of block in container
         */
        Touch.prototype.createBlock = function (initialRow, index) {
            return new Pricker.Course(initialRow, { 'container': this, 'index': index });
        };
        /**
         * Inserts a course at the specified index
         */
        Touch.prototype.insertCourse = function (index, course) {
            this._blocks.splice(index - 1, 0, course);
            this.fixupOwnership(index);
            this.notify(index - 1);
            return this;
        };
        /**
         * Deletes the course at the specified index
         */
        Touch.prototype.deleteCourse = function (index) {
            var course = this.getCourse(index);
            this._blocks.splice(index - 1, 1);
            course.clearOwnership();
            this.fixupOwnership(index);
            this.notify(index - 1);
            return course;
        };
        /**
         * Helper to fixup ownership of blocks
         */
        Touch.prototype.fixupOwnership = function (index) {
            for (var i = index; i <= this.getLength(); i += 1) {
                this.getCourse(i).setOwnership({ 'container': this, 'index': i });
            }
        };
        /**
         * Creates a new touch from a string representation
         */
        Touch.fromString = function (input) {
            var lines = input.split('\n');
            var i, line, course, touch;
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
                if (!touch) {
                    // Create the touch with a stage based on the first line
                    line = line.replace(/\s/g, '');
                    if (!Pricker.Stage[line.length]) {
                        throw new Error('Cannot recognise stage');
                    }
                    touch = new Touch(Pricker.rowFromString('231', line.length));
                }
                else {
                    // Create a course for each remaining line
                    course = Pricker.Course.fromString(touch.getEnd(), line);
                    touch.insertCourse(touch.getLength() + 1, course);
                }
            }
            if (!touch) {
                throw new Error('No input lines');
            }
            return touch;
        };
        return Touch;
    }(Pricker.AbstractContainer));
    Pricker.Touch = Touch;
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
/// <reference path="../Notifiable.ts" />
/// <reference path="../PrintableMixin.ts" />
/// <reference path="../rowFromString.ts" />
/// <reference path="../Row.ts" />
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
                this._touch = new Pricker_2.Touch(this._initialRow, { 'container': this, 'index': Block.Touch });
                this._musicScheme = new Pricker_2.Music.MbdScheme(this._stage);
                this.redraw();
            };
            Mbd.prototype.redraw = function () {
                var newCourse = this._course.clone();
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
                this.getEl('callingFromRounds').innerHTML =
                    newCourse.print('html');
                this.getEl('initialRow').value =
                    Pricker_2.stringFromRow(this._course.getInitialRow());
                this.getEl('courseLength').value =
                    this._course.getLength().toString();
                if (this._savedCourse) {
                    this.getEl('savedCalling').innerHTML =
                        this._savedCourse.print('html');
                }
                else {
                    this.getEl('savedCalling').innerText = 'None';
                }
                // Proof and number of rows
                this.getEl('proofResult').innerText = this._proofText || '';
                if (this._rowCount) {
                    this.getEl('numRows').innerText =
                        this._rowCount + ' Stedman ' + Pricker_2.Stage[this._stage];
                }
                else {
                    this.getEl('numRows').innerText =
                        this._touch.estimateRows() + ' changes';
                }
                // Touch display
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
                this._extraSixes.setInitialRow(this._course.getEnd());
                this.redraw();
            };
            Mbd.prototype.onResetInitialRow = function () {
                this._course.setInitialRow(this._initialRow);
                this._extraSixes.setInitialRow(this._course.getEnd());
                this.redraw();
            };
            Mbd.prototype.onSetLength = function () {
                var input = this.getEl('courseLength').value, length = parseInt(input);
                if (length) {
                    this._course.safeSetLength(length - (length % 2));
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
            Mbd.prototype.onSelectCourse = function () {
                var input = this.getEl('courses').value;
                this._selectedIndex = parseInt(input);
            };
            Mbd.prototype.onInsertCourse = function () {
                this._selectedIndex += 1;
                this._touch.insertCourse(this._selectedIndex, this._course.clone());
                if (this.getEl('rolling').checked) {
                    this._course.setInitialRow(this._touch.getCourse(this._selectedIndex).getEnd());
                    this._course.resetLength();
                    this._course.resetCalls();
                }
            };
            Mbd.prototype.onPasteCourse = function () {
                if (this._selectedIndex) {
                    this._touch.deleteCourse(this._selectedIndex);
                    this._touch.insertCourse(this._selectedIndex, this._course.clone());
                    if (this.getEl('rolling').checked) {
                        this._course.setInitialRow(this._touch.getCourse(this._selectedIndex).getEnd());
                        this._selectedIndex = Math.min(this._selectedIndex + 1, this._touch.getLength());
                        this._course.resetLength();
                        this._course.resetCalls();
                    }
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
                this.redraw();
            };
            Mbd.prototype.onSaveTouch = function () {
                this.getEl('loadSaveTextarea').innerText =
                    this._touch.print('text');
            };
            Mbd.prototype.onGenerateSiril = function () {
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
/// <reference path="AbstractSix.ts" />
/// <reference path="Changes.ts" />
/// <reference path="Visitor/Abstract.ts" />
var Pricker;
(function (Pricker) {
    /**
     * A quick six
     */
    var Quick = /** @class */ (function (_super) {
        __extends(Quick, _super);
        function Quick() {
            /* AbstractBlock methods **********************************************/
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /* PrintableMixin methods *********************************************/
            /**
             * Path for this class' templates
             */
            _this.templatePath = 'Quick';
            return _this;
        }
        /**
         * Receives a visitor that will be called to process each row
         */
        Quick.prototype.accept = function () {
            var visitors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                visitors[_i] = arguments[_i];
            }
            var row = this.getInitialRow();
            for (var _a = 0, visitors_3 = visitors; _a < visitors_3.length; _a++) {
                var visitor = visitors_3[_a];
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
/// <reference path="AbstractSix.ts" />
/// <reference path="Changes.ts" />
/// <reference path="Visitor/Abstract.ts" />
var Pricker;
(function (Pricker) {
    /**
     * A slow six
     */
    var Slow = /** @class */ (function (_super) {
        __extends(Slow, _super);
        function Slow() {
            /* AbstractBlock methods **********************************************/
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /* PrintableMixin methods *********************************************/
            /**
             * Path for this class' templates
             */
            _this.templatePath = 'Slow';
            return _this;
        }
        /**
         * Receives a visitor that will be called to process each row
         */
        Slow.prototype.accept = function () {
            var visitors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                visitors[_i] = arguments[_i];
            }
            var row = this.getInitialRow();
            for (var _a = 0, visitors_4 = visitors; _a < visitors_4.length; _a++) {
                var visitor = visitors_4[_a];
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
var out='';if(context.underline !== true){ context.underline = false; }if(context.falseness && context.courseIndex && context.falseness.contains(context.courseIndex,context.object.getIndex())){ var className = 'falseBlock'; }else if(context.music && context.courseIndex && context.music.contains(context.courseIndex,context.object.getIndex())){ var className = 'musicalBlock'; }else{ var className = ''; }out+='<span class="'+( className )+'">';if(context.showSixHeads){out+=''+( Pricker.stringFromRow(context.object.getStartRow()) );}else{if(context.underline){out+='<u>';}out+=''+( Pricker.stringFromRow(context.object.getEnd()) );if(context.underline){out+='</u>';}}out+='</span>&nbsp;&nbsp;<span class="'+( context.type )+'Six" onclick="pricker.c('+( context.object.getIndex() )+')">&nbsp;';if(context.object.getCall() === Pricker.Call.Plain){out+='&nbsp;';}else if(context.object.getCall() === Pricker.Call.Bob){out+='-';}else if(context.object.getCall() === Pricker.Call.Single){out+='s';}out+='&nbsp;</span>&nbsp;&nbsp;'+( context.object.getIndex() )+'<br />';if(context.showSixHeads){out+='<span class="'+( className )+'"><u>'+( Pricker.stringFromRow(context.object.getEnd()) )+'</u></span><br />';}return out;
};
Pricker.Templates["AbstractSix.siril"] = function anonymous(context
/*``*/) {
var out='';context.touchRows = context.touchRows || Infinity;if(context.object.getCall() === Pricker.Call.Plain){out+='plain';}else if(context.object.getCall() === Pricker.Call.Bob){out+='bob';}else if(context.object.getCall() === Pricker.Call.Single){out+='single';}out+=', ';if(context.touchRows > 1){if(context.touchRows >= 6){out+=''+( context.type );}else{out+='+'+( context.notation.slice(0, context.touchRows - 1).join('.') );}out+=', ';}return out;
};
Pricker.Templates["Course.html"] = function anonymous(context
/*``*/) {
var out='<u>'+( Pricker.stringFromRow(context.object.getInitialRow()) )+'</u><br />'+( context.object.print('text') );return out;
};
Pricker.Templates["Course.mbd"] = function anonymous(context
/*``*/) {
var out='<u>'+( Pricker.stringFromRow(context.object.getInitialRow()) )+'</u><br />';var arr1=context.object.getSixes();if(arr1){var six,i1=-1,l1=arr1.length-1;while(i1<l1){six=arr1[i1+=1];if(six.getIndex() === context.object.getLength()){ context.underline = true }out+=''+( six.print('mbd', context) );} } if(context.extraSixes){var arr2=context.extraSixes.getSixes();if(arr2){var six,i2=-1,l2=arr2.length-1;while(i2<l2){six=arr2[i2+=1];out+='<span class="extraSix">'+( Pricker.stringFromRow(six.getEnd()) )+'</span><br />';} } }return out;
};
Pricker.Templates["Course.siril"] = function anonymous(context
/*``*/) {
var out='';context.touchRows = context.touchRows || Infinity;var arr1=context.object.getSixes();if(arr1){var six,i1=-1,l1=arr1.length-1;while(i1<l1){six=arr1[i1+=1];out+=''+( six.print('siril', {'touchRows': context.touchRows}) ); context.touchRows -= six.estimateRows(); if(context.touchRows <= 0){ break; }} } out+='"@  '+( context.object.print('text', {'courseEnd': false}) )+'"'+( '\n' );return out;
};
Pricker.Templates["Course.text"] = function anonymous(context
/*``*/) {
var out='';var calls = [ ];context.end = context.end || '';if (context.courseEnd === undefined) {context.courseEnd = true;}if(context.courseEnd){out+=''+( Pricker.stringFromRow(context.object.getEnd()) )+'  ';}var arr1=context.object.getSixes();if(arr1){var six,i1=-1,l1=arr1.length-1;while(i1<l1){six=arr1[i1+=1];if(six.getCall()){ calls.push(((six.getCall() === Pricker.Call.Single) ? 's' : '')+ six.getIndex()); }} } if(calls.length){out+=''+( calls.join(' ') );}else{out+='p';}if(context.object.getLength() !== context.object.getInitialRow().length * 2){out+='  ('+( context.object.getLength() )+' sixes)';}out+=''+( context.end );return out;
};
Pricker.Templates["Quick.mbd"] = function anonymous(context
/*``*/) {
var out=''; context.type = 'quick'; out+=''+( Pricker.Templates['AbstractSix.mbd'](context) );return out;
};
Pricker.Templates["Quick.siril"] = function anonymous(context
/*``*/) {
var out='';context.type = 'quick';context.notation = ['1', '3', '1', '3'];out+=''+( Pricker.Templates['AbstractSix.siril'](context) );return out;
};
Pricker.Templates["Slow.mbd"] = function anonymous(context
/*``*/) {
var out=''; context.type = 'slow'; out+=''+( Pricker.Templates['AbstractSix.mbd'](context) );return out;
};
Pricker.Templates["Slow.siril"] = function anonymous(context
/*``*/) {
var out='';context.type = 'slow';context.notation = ['3', '1', '3', '1'];out+=''+( Pricker.Templates['AbstractSix.siril'](context) );return out;
};
Pricker.Templates["Touch.select"] = function anonymous(context
/*``*/) {
var out='';context.touchRows = context.touchRows || Infinity;context.touchRows -= 2;  context.styleUnreached = context.styleUnreached || '';context.styleFalse = context.styleFalse || '';out+='<option value="0">'+( Pricker.stringFromRow(context.object.getInitialRow()) )+'</option>';var arr1=context.object.getCourses();if(arr1){var course,i1=-1,l1=arr1.length-1;while(i1<l1){course=arr1[i1+=1];out+='<option value="'+( course.getIndex() )+'"';if(context.touchRows <= 0){out+=' style="'+( context.styleUnreached )+'"';}if(context.falseness && context.falseness.contains(course)){out+=' style="'+( context.styleFalse )+'"';}out+='>'+( course.print('text') )+'</option>'; context.touchRows -= course.estimateRows(); } } return out;
};
Pricker.Templates["Touch.siril"] = function anonymous(context
/*``*/) {
var out='';var courseNames = [ ],rounds = Pricker.stringFromRow(Pricker.rowFromString('', context.object.getInitialRow().length));context.touchRows = context.touchRows || Infinity;context.touchRows -= 2;  out+='// Generated by Free Touch Pricker'+( '\n' )+'// https://github.com/simpleigh/touch-pricker'+( '\n' )+( '\n' )+'// '+( Pricker.stringFromRow(context.object.getInitialRow()) )+( '\n' );var arr1=context.object.getCourses();if(arr1){var course,i1=-1,l1=arr1.length-1;while(i1<l1){course=arr1[i1+=1];out+='// '+( course.print('text') )+( '\n' );} } out+=''+( '\n' )+( context.object.getInitialRow().length )+' bells'+( '\n' )+( '\n' )+'composition = touch'+( '\n' )+( '\n' )+'slow = +3.1.3.1.3'+( '\n' )+'quick = +1.3.1.3.1'+( '\n' )+'plain = +'+( rounds.slice(-1) )+( '\n' )+'bob = +'+( rounds.slice(-3, -2) )+( '\n' )+'single = +'+( rounds.slice(-3) )+( '\n' )+( '\n' );var arr2=context.object.getCourses();if(arr2){var course,index=-1,l2=arr2.length-1;while(index<l2){course=arr2[index+=1];out+='course'+( index + 1 )+' = '+( course.print('siril', {'touchRows': context.touchRows}) ); courseNames.push('course' + (index + 1));  context.touchRows -= course.estimateRows(); if(context.touchRows <= 0){ break; }} } out+=''+( '\n' )+'touch = +3.1, '+( courseNames.join(', ') )+( '\n' )+( '\n' )+'prove touch'+( '\n' );return out;
};
Pricker.Templates["Touch.text"] = function anonymous(context
/*``*/) {
var out=''+( Pricker.stringFromRow(context.object.getInitialRow()) )+( '\n' );var arr1=context.object.getCourses();if(arr1){var course,i1=-1,l1=arr1.length-1;while(i1<l1){course=arr1[i1+=1];out+=''+( course.print('text', {'end': '\n'}) );} } return out;
};
Pricker.Templates["Music.AbstractScheme.text"] = function anonymous(context
/*``*/) {
var out='';var arr1=context.object.getMatchers();if(arr1){var matcher,i1=-1,l1=arr1.length-1;while(i1<l1){matcher=arr1[i1+=1];out+=''+( matcher.print('text') );} } return out;
};
Pricker.Templates["Music.Pattern.text"] = function anonymous(context
/*``*/) {
var out='';if(context.end === undefined){ context.end = '\n'; }if(context.object.getMatchCount() > 0){if(context.object.isWildcardMatch() ||context.object.getMatchCount() > 1){out+=''+( context.object.getMatchCount() )+' ';}out+=''+( context.object.getName() )+( context.end );}return out;
};
Pricker.Templates["Music.PatternGroup.text"] = function anonymous(context
/*``*/) {
var out='';if(context.object.getMatchCount() > 0){out+=''+( context.object.getMatchCount() )+' '+( context.object.getName() );if(context.object.getSubmatchCount() > 0){out+=' ('; var first = true; var arr1=context.object.getPatterns();if(arr1){var pattern,i1=-1,l1=arr1.length-1;while(i1<l1){pattern=arr1[i1+=1]; if (!pattern) { continue; }  if(pattern.getMatchCount() > 0){if(!first){out+=', ';}out+=''+( pattern.print('text', {'end': ''}) ); first = false; }} } out+=')';}out+=''+( '\n' );}return out;
};
Pricker.Templates["Pricker.Mbd.css"] = function anonymous(context
/*``*/) {
var out='#sixends { float: left; font-family: "Courier New", "Courier", "monospace"; font-size: 12pt; margin-right: 25px;}#controls { float: left; margin-right: 25px;}.tab { background-color: #EFEFF7; border-color: black; border-radius: 15px 0 0 0; border-style: solid; border-width: 1px 1px 0 1px; cursor: pointer; float: left; height: 20px; line-height: 20px; padding-left: 10px; padding-right: 8px; text-align: center;}.tab-selected { background-color: #BDBDE7; font-weight: bold;}#pages { width: 360px;}.page { border-color: black; border-style: solid; border-width: 1px; clear: left; display: none; padding: 9px; visibility: hidden; width: 340px;}.page-selected { display: block; visibility: visible;}.page div, .page div#savedCalling { margin-bottom: 20px;}.page div:last-of-type { margin-bottom: 0px;}.page form { height: 25px; margin-bottom: 10px;}.page textarea { border-width: 1px; height: 450px; padding: 1px; width: 336px;}#touch { background-color: #EFEFF7; float: left; padding: 10px;}.slowSix { background-color: #F0F0F8; cursor: pointer;}.quickSix { background-color: #E2E2F0; cursor: pointer;}.extraSix { color: #505050;}.falseBlock { color: red;}.musicalBlock { color: gold;}';return out;
};
Pricker.Templates["Pricker.Mbd.html"] = function anonymous(context
/*``*/) {
var out='<div id="sixends"></div><div id="controls"> <div id="tabs"> <div id="tab_pricking" onclick="pricker.onTab(\'pricking\')" class="tab tab-selected">Pricking</div> <div id="tab_loadSave" onclick="pricker.onTab(\'loadSave\')" class="tab">Load/Save</div> <div id="tab_siril"    onclick="pricker.onTab(\'siril\')"    class="tab">Siril</div> <div id="tab_music"    onclick="pricker.onTab(\'music\')"    class="tab">Music</div><div id="tab_view"     onclick="pricker.onTab(\'view\')"     class="tab">View</div> </div> <div id="pages"> <div class="page page-selected" id="page_pricking"> <div> <label for="stage">Number of bells:</label> <select id="stage" onchange="pricker.onStage()"></select> </div> <div> Course from rounds: <div id="callingFromRounds"></div> </div> <div> From current start row: <div id="calling"></div> </div> <div> <form onsubmit="return false"> <label for="initialRow">Starting row:</label> <input type="text" id="initialRow" size="15" maxLength="15" /> <button onclick="pricker.onSetInitialRow()">Set</button> <button onclick="pricker.onResetInitialRow()">Reset</button> </form> </div> <div> <form onsubmit="return false"> <label for="courseLength">Course length:</label> <input type="text" id="courseLength" size="2" maxLength="2" /> <button onclick="pricker.onSetLength()">Set</button> <button onclick="pricker.onResetLength()">Reset</button> </form> </div> <div> <label for="callReset">Current calling:</label> <button id="callReset" onclick="pricker.onResetCalls()">Reset</button> </div> <div> Saved calling: <div id="savedCalling"></div> <button id="saveCalling" onclick="pricker.onSaveCalling()">Save</button> <button id="loadCalling" onclick="pricker.onLoadCalling()">Load</button> </div> </div> <div class="page" id="page_loadSave"> <form onsubmit="return false"> <button onclick="pricker.onLoadTouch()">Import</button> <button onclick="pricker.onSaveTouch()">Export</button> </form> <textarea id="loadSaveTextarea"></textarea> </div> <div class="page" id="page_siril"> <form onsubmit="return false"> <button onclick="pricker.onGenerateSiril()">Generate</button> </form> <textarea id="sirilTextarea"></textarea> </div> <div class="page" id="page_music"> <form onsubmit="return false"> <button onclick="pricker.onAnalyseMusic()">Analyse</button> </form> <textarea id="musicTextarea"></textarea> </div> <div class="page" id="page_view"> <input type="checkbox" id="showSixHeads" onclick="pricker.onShowSixHeads()"/> <label for="showSixHeads">Show six heads</label> </div> </div></div><div id="touch"> <div> <button onclick="pricker.onProve()">PROVE</button> <span id="proofResult"></span> </div> <div id="numRows"></div> <label> <input id="rolling" type="checkbox" /> Rolling course entry </label> <form onsubmit="return false"> <button onclick="pricker.onInsertCourse()">Insert</button> <button onclick="pricker.onPasteCourse()">Paste</button> <button onclick="pricker.onCopyCourse()">Copy</button> <button onclick="pricker.onCutCourse()">Cut</button> <button onclick="pricker.onDeleteCourse()">Delete</button> </form> <select id="courses"> </select> <form onsubmit="return false"> <button onclick="pricker.onInsertCourse()">Insert</button> <button onclick="pricker.onPasteCourse()">Paste</button> <button onclick="pricker.onCopyCourse()">Copy</button> <button onclick="pricker.onCutCourse()">Cut</button> <button onclick="pricker.onDeleteCourse()">Delete</button> </form></div>';return out;
};
return Pricker;
}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9Ob3RpZmlhYmxlLnRzIiwic3JjL0Jsb2NrT3duZXJzaGlwLnRzIiwic3JjL1RlbXBsYXRlQ29udGV4dC50cyIsInNyYy9QcmludGFibGVNaXhpbi50cyIsInNyYy9CZWxsLnRzIiwic3JjL1Jvdy50cyIsInNyYy9TdGFnZS50cyIsInNyYy9yb3dGcm9tU3RyaW5nLnRzIiwic3JjL3N0cmluZ0Zyb21Sb3cudHMiLCJzcmMvVmlzaXRvci9BYnN0cmFjdC50cyIsInNyYy9BYnN0cmFjdEJsb2NrLnRzIiwic3JjL0Fic3RyYWN0Q29udGFpbmVyLnRzIiwic3JjL0NhbGwudHMiLCJzcmMvQ2hhbmdlcy50cyIsInNyYy9BYnN0cmFjdFNpeC50cyIsInNyYy9CbG9ja0RpcmVjdG9yeS50cyIsInNyYy9Db3Vyc2UudHMiLCJzcmMvRG9tL21ldHJpY3MudHMiLCJzcmMvVGVtcGxhdGVzLnRzIiwic3JjL1ByaWNrZXIvQWJzdHJhY3QudHMiLCJzcmMvVG91Y2gudHMiLCJzcmMvTXVzaWMvTWF0Y2hlckludGVyZmFjZS50cyIsInNyYy9NdXNpYy9BYnN0cmFjdFNjaGVtZS50cyIsInNyYy9NdXNpYy9NYXRjaFR5cGUudHMiLCJzcmMvTXVzaWMvUGF0dGVybi50cyIsInNyYy9NdXNpYy9QYXR0ZXJuR3JvdXAudHMiLCJzcmMvTXVzaWMvTWJkU2NoZW1lLnRzIiwic3JjL1Zpc2l0b3IvQ291bnRlci50cyIsInNyYy9WaXNpdG9yL011c2ljLnRzIiwic3JjL1Zpc2l0b3IvUHJvb2YudHMiLCJzcmMvUHJpY2tlci9NYmQudHMiLCJzcmMvRG9tL2NyZWF0ZUFuZEFwcGVuZFN0eWxlLnRzIiwic3JjL0RvbS9jcmVhdGVJZnJhbWUudHMiLCJzcmMvRG9tL2luamVjdElmcmFtZURhdGEudHMiLCJzcmMvT3B0aW9ucy50cyIsInNyYy9jcmVhdGUudHMiLCJzcmMvUXVpY2sudHMiLCJzcmMvU2xvdy50cyIsInNyYy9NdXNpYy9DdXN0b21TY2hlbWUudHMiLCJzcmMvVmlzaXRvci9Db25zb2xlLnRzIiwic3JjL1Zpc2l0b3IvU3RyaW5nQXJyYXkudHMiLCJjcmVhdGUuZG90IiwiQWJzdHJhY3RTaXgvbWJkLmRvdCIsIkFic3RyYWN0U2l4L3NpcmlsLmRvdCIsIkNvdXJzZS9odG1sLmRvdCIsIkNvdXJzZS9tYmQuZG90IiwiQ291cnNlL3NpcmlsLmRvdCIsIkNvdXJzZS90ZXh0LmRvdCIsIlF1aWNrL21iZC5kb3QiLCJRdWljay9zaXJpbC5kb3QiLCJTbG93L21iZC5kb3QiLCJTbG93L3NpcmlsLmRvdCIsIlRvdWNoL3NlbGVjdC5kb3QiLCJUb3VjaC9zaXJpbC5kb3QiLCJUb3VjaC90ZXh0LmRvdCIsIk11c2ljL0Fic3RyYWN0U2NoZW1lL3RleHQuZG90IiwiTXVzaWMvUGF0dGVybi90ZXh0LmRvdCIsIk11c2ljL1BhdHRlcm5Hcm91cC90ZXh0LmRvdCIsIlByaWNrZXIvTWJkL2Nzcy5kb3QiLCJQcmlja2VyL01iZC9odG1sLmRvdCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7OztHQUtHO0FDTEg7Ozs7O0dBS0c7QUFFSCxzQ0FBc0M7QUNQdEM7Ozs7O0dBS0c7QUNMSDs7Ozs7R0FLRztBQUVILDJDQUEyQztBQUUzQyxJQUFVLE9BQU8sQ0E0RmhCO0FBNUZELFdBQVUsT0FBTztJQUViOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaURHO0lBQ0g7UUFBQTtRQXNDQSxDQUFDO1FBcENHOzs7Ozs7Ozs7V0FTRztRQUNJLDhCQUFLLEdBQVosVUFDSSxZQUFvQixFQUNwQixPQUE4QjtZQUE5Qix3QkFBQSxFQUFBLFlBQThCO1lBRTlCLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsR0FBRyxZQUFZLENBQUM7WUFDdEQsTUFBTSxDQUFDLFFBQUEsU0FBUyxDQUFDLFlBQVksQ0FBQyxjQUFLLE9BQU8sSUFBRSxRQUFRLEVBQUUsSUFBSSxJQUFFLENBQUM7UUFDakUs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Q1g7b0JBQ0ksSUFBSSxNQUFBLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQUEsU0FBUyxDQUFDLEtBQUssQ0FBQztvQkFDOUMsSUFBSSxNQUFBLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQUEsU0FBUyxDQUFDLEtBQUssQ0FBQztvQkFDOUMsSUFBSSxNQUFBLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQUEsU0FBUyxDQUFDLEtBQUssQ0FBQztvQkFDOUMsSUFBSSxNQUFBLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQUEsU0FBUyxDQUFDLEtBQUssQ0FBQztpQkFDakQsQ0FDSixDQUFDLENBQUM7Z0JBRUgsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQUEsWUFBWSxDQUMxQixVQUFVLEVBQ1Y7b0JBQ0ksSUFBSSxNQUFBLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQUEsU0FBUyxDQUFDLElBQUksQ0FBQztvQkFDN0MsSUFBSSxNQUFBLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQUEsU0FBUyxDQUFDLElBQUksQ0FBQztvQkFDN0MsSUFBSSxNQUFBLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQUEsU0FBUyxDQUFDLElBQUksQ0FBQztvQkFDN0MsSUFBSSxNQUFBLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQUEsU0FBUyxDQUFDLElBQUksQ0FBQztpQkFDaEQsQ0FDSixDQUFDLENBQUM7Z0JBRUgsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQUEsWUFBWSxDQUMxQixXQUFXLEVBQ1g7b0JBQ0ksSUFBSSxNQUFBLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQUEsU0FBUyxDQUFDLEtBQUssQ0FBQztvQkFDNUMsSUFBSSxNQUFBLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQUEsU0FBUyxDQUFDLEtBQUssQ0FBQztvQkFDNUMsSUFBSSxNQUFBLE9BQU8s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WUFDSSxnQ0FBVSxHQUFqQjtnQkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqQyxDQUFDO1lBRUQsb0VBQW9FO1lBRXBFOztlQUVHO1lBQ08seUNBQW1CLEdBQTdCLFVBQThCLEdBQVEsRUFBRSxHQUFpQjtnQkFDckQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBQSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMzQyxDQUFDO1lBRUwsa0JBQUM7UUFBRCxDQXhCQSxBQXdCQyxDQXhCZ0MsUUFBQSxlQUFlLEdBd0IvQztRQXhCWSxtQkFBVyxjQXdCdkIsQ0FBQTtJQUVMLENBQUMsRUFsQ2dCLE9BQU8sR0FBUCxlQUFPLEtBQVAsZUFBTyxRQWtDdkI7QUFFTCxDQUFDLEVBekNTLE9BQU8sS0FBUCxPQUFPLFFBeUNoQjs7QUNyREQ7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidG91Y2gtcHJpY2tlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcmZhY2UgZm9yIG9iamVjdHMgdGhhdCBjYW4gcmVjZWl2ZSBub3RpZmljYXRpb25zIGZyb20gY2hpbGRyZW5cbiAgICAgKlxuICAgICAqIFNvbWUgY2xhc3NlcyAoZS5nLiBbW0Fic3RyYWN0Q29udGFpbmVyXV0pIGNhbiBjb250YWluIGJsb2Nrcy5cbiAgICAgKiBCbG9ja3Mgbm90aWZ5IHRoZXNlIGNsYXNzZXMgd2hlbiB0aGV5IGFyZSBjaGFuZ2VkLlxuICAgICAqL1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgTm90aWZpYWJsZSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlY2VpdmVzIGEgbm90aWZpY2F0aW9uIGZyb20gYSBibG9jayB0aGF0IGhhcyBjaGFuZ2VkXG4gICAgICAgICAqIEBwYXJhbSBpbmRleCAgaW5kZXggb2YgY2hhbmdlZCBibG9jayBpbiBjb250YWluZXJcbiAgICAgICAgICovXG4gICAgICAgIG5vdGlmeShpbmRleDogbnVtYmVyKTogdm9pZDtcblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJOb3RpZmlhYmxlLnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogT3duZXJzaGlwIG9mIGEgYmxvY2tcbiAgICAgKlxuICAgICAqIFtbQWJzdHJhY3RCbG9ja11dIG9iamVjdHMgY2FuIGJlIGNvbGxlY3RlZCB0b2dldGhlciB3aXRoaW4gYW5cbiAgICAgKiBbW0Fic3RyYWN0Q29udGFpbmVyXV0uXG4gICAgICogRWFjaCBibG9jayBzdG9yZXMgYSByZWZlcmVuY2UgdG8gaXRzIGNvbnRhaW5lciBhbG9uZyB3aXRoIGEgbnVtZXJpYyBpbmRleFxuICAgICAqIHJlcHJlc2VudGluZyBpdHMgcG9zaXRpb24gd2l0aGluIHRoYXQgY29udGFpbmVyLlxuICAgICAqL1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgQmxvY2tPd25lcnNoaXAge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250YWluZXIgb2YgdGhlIGJsb2NrLlxuICAgICAgICAgKi9cbiAgICAgICAgY29udGFpbmVyOiBOb3RpZmlhYmxlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmRleCB3aXRoaW4gdGhlIGNvbnRhaW5lci5cbiAgICAgICAgICogSW5kaWNlcyBzdGFydCBjb3VudGluZyBhdCBvbmUgYW5kIGluY3JlYXNlIHRvIHRoZSBsZW5ndGggb2YgdGhlXG4gICAgICAgICAqIGNvbnRhaW5lci5cbiAgICAgICAgICovXG4gICAgICAgIGluZGV4OiBudW1iZXI7XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBUZW1wbGF0ZSBjb250ZXh0XG4gICAgICpcbiAgICAgKiBEaWN0aW9uYXJ5IG9mIGNvbnRleHQgZGF0YVxuICAgICAqL1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgVGVtcGxhdGVDb250ZXh0IHtcbiAgICAgICAgW2luZGV4OiBzdHJpbmddOiBhbnk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJUZW1wbGF0ZUNvbnRleHQudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBNaXhpbiB0aGF0IHByb3ZpZGVzIHByaW50IGZ1bmN0aW9uYWxpdHkgdmlhIHRlbXBsYXRlc1xuICAgICAqXG4gICAgICogQSBgVGVtcGxhdGVgIGlzIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIFtbVGVtcGxhdGVDb250ZXh0XV0gYW5kIHByb2R1Y2VzXG4gICAgICogYSBzdHJpbmcgcmVuZGVyaW5nIG9mIHRoYXQgY29udGV4dC5cbiAgICAgKiBUZW1wbGF0ZXMgYXJlIHByZWNvbXBpbGVkIHVzaW5nIHRoZVxuICAgICAqIFtkb1QuanNdKGh0dHBzOi8vb2xhZG8uZ2l0aHViLmlvL2RvVC8pIHRlbXBsYXRlIHByZWNvbXBpbGVyIGFuZCB0aGVuXG4gICAgICogc3RvcmVkIGluIFtbVGVtcGxhdGVzXV0uXG4gICAgICogRWFjaCB0ZW1wbGF0ZSBpcyBhc3NvY2lhdGVkIHdpdGggYSBjbGFzcyBhbmQgZXhwZWN0cyB0byByZW5kZXIgb2JqZWN0cyBvZlxuICAgICAqIHRoYXQgY2xhc3MsIHdpdGggdGhlIGluc3RhbmNlIGJlaW5nIHBhc3NlZCB2aWEgdGhlIGNvbnRleHQuXG4gICAgICpcbiAgICAgKiBUaGlzIG1peGluIG1ha2VzIGl0IGVhc3kgdG8gbWFrZSBhIGNsYXNzIHByaW50YWJsZSB1c2luZyB0aGUgZm9sbG93aW5nXG4gICAgICogc3RlcHM6XG4gICAgICpcbiAgICAgKiAxLiBBZGQgYGltcGxlbWVudHMgUHJpbnRhYmxlTWl4aW5gIHRvIHRoZSB0YXJnZXQgY2xhc3MuXG4gICAgICogICAgVGhpcyBlbmFibGVzIHRoZSBjb21waWxlciB0byBjaGVjayBhbGwgZGVwZW5kZW5jaWVzIGhhdmUgYmVlbiBhZGRlZC5cbiAgICAgKlxuICAgICAqIDIuIERlY2xhcmUgYSBbW3ByaW50XV0gZnVuY3Rpb24gYXMgZm9sbG93czpcbiAgICAgKiAgICBgYGBcbiAgICAgKiAgICBwdWJsaWMgcHJpbnQ6ICh0OiBzdHJpbmcsIGM/OiBUZW1wbGF0ZUNvbnRleHQpID0+IHN0cmluZztcbiAgICAgKiAgICBgYGBcbiAgICAgKlxuICAgICAqIDMuIERlZmluZSBhIFtbdGVtcGxhdGVQYXRoXV0uXG4gICAgICogICAgSWYgYSBjbGFzcycgdGVtcGxhdGVzIGxpdmUgdW5kZXIgYHNyYy9fdGVtcGxhdGVzL0FwcGxlL0JhbmFuYWAgdGhlblxuICAgICAqICAgIHRoZSBgdGVtcGxhdGVQYXRoYCB3b3VsZCBiZSBkZWZpbmVkIGFzOlxuICAgICAqICAgIGBgYFxuICAgICAqICAgIHB1YmxpYyByZWFkb25seSB0ZW1wbGF0ZVBhdGg6IHN0cmluZyA9ICdBcHBsZS5CYW5hbmEnO1xuICAgICAqICAgIGBgYFxuICAgICAqXG4gICAgICogNC4gQ2FsbCBbW1ByaW50YWJsZU1peGluLm1ha2VQcmludGFibGVdXSB0byBiaW5kIHRoZSBpbXBsZW1lbnRhdGlvbiBvZlxuICAgICAqICAgIFtbcHJpbnRdXS5cbiAgICAgKiAgICBGb3Igb3VyIGBCYW5hbmFgIGNsYXNzIHRoaXMgd291bGQgYmUgZG9uZSBhcyBmb2xsb3dzOlxuICAgICAqICAgIGBgYFxuICAgICAqICAgIFByaW50YWJsZU1peGluLm1ha2VQcmludGFibGUoQmFuYW5hKTtcbiAgICAgKiAgICBgYGBcbiAgICAgKlxuICAgICAqIDUuIChPcHRpb25hbGx5KSBjaGVjayB0aGF0IGV2ZXJ5dGhpbmcgaGFzIHdvcmtlZCBieSBleHRlbmRpbmcgdGhlIG5ld1xuICAgICAqICAgIGNsYXNzJyBzcGVjLiBSZWZlcmVuY2UgdGhlIFtbUHJpbnRhYmxlTWl4aW5dXSBzcGVjOlxuICAgICAqICAgIGBgYFxuICAgICAqICAgIC8vLyA8cmVmZXJlbmNlIHBhdGg9XCJQcmludGFibGVNaXhpbi5zcGVjLnRzXCIgLz5cbiAgICAgKiAgICBgYGBcbiAgICAgKiAgICAuLi4gYW5kIHRoZW4gY2FsbCB0aGUgdGVzdCBmdW5jdGlvbjpcbiAgICAgKiAgICBgYGBcbiAgICAgKiAgICBkZXNjcmliZSgnQmFuYW5hIGNsYXNzJywgKCkgPT4ge1xuICAgICAqICAgICAgICB0ZXN0UHJpbnRhYmxlTWl4aW5JbXBsZW1lbnRhdGlvbigoKSA9PiBuZXcgQmFuYW5hKCkpO1xuICAgICAqICAgIH0pO1xuICAgICAqICAgIGBgYFxuICAgICAqICAgIFRoZSB0ZXN0IGZ1bmN0aW9uIHRha2VzIGEgc2luZ2xlIHBhcmFtZXRlciB3aGljaCBpcyBhIGZ1bmN0aW9uIHRoYXRcbiAgICAgKiAgICBjcmVhdGVzIHRoZSBjbGFzcyB0byBiZSB0ZXN0ZWQuXG4gICAgICovXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFByaW50YWJsZU1peGluIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVuZGVycyB0aGUgb2JqZWN0IHdpdGggYSB0ZW1wbGF0ZS5cbiAgICAgICAgICogVGFrZXMgdGhlIG5hbWUgb2YgdGhlIHRlbXBsYXRlIGFuZCBhIFtbVGVtcGxhdGVDb250ZXh0XV0sIGFkZGluZyB0aGVcbiAgICAgICAgICogb2JqZWN0IGluc3RhbmNlIHRvIHRoZSBjb250ZXh0IGJlZm9yZSBleGVjdXRpbmcgdGhlIHRlbXBsYXRlLlxuICAgICAgICAgKiBVc2VzIHRoZSBbW3RlbXBsYXRlUGF0aF1dIHRvIGZpbmQgYSB0ZW1wbGF0ZSB3aXRoIHRoZSBwcm92aWRlZFxuICAgICAgICAgKiB0ZW1wbGF0ZSBuYW1lLlxuICAgICAgICAgKiBBIHRlbXBsYXRlIGF0IGBzcmMvX3RlbXBsYXRlcy9DbGFzcy90ZW1wbGF0ZS5kb3RgIHdvdWxkIGJlIGZvdW5kXG4gICAgICAgICAqIHVzaW5nIHRoZSBgdGVtcGxhdGVOYW1lYCBvZiBgJ3RlbXBsYXRlLmRvdCdgIGFzc3VtaW5nIGFcbiAgICAgICAgICogW1t0ZW1wbGF0ZVBhdGhdXSBvZiBgJ0NsYXNzJ2AuXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgcHJpbnQoXG4gICAgICAgICAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgIGNvbnRleHQ6IFRlbXBsYXRlQ29udGV4dCA9IHsgfSxcbiAgICAgICAgKTogc3RyaW5nIHtcbiAgICAgICAgICAgIHRlbXBsYXRlTmFtZSA9IHRoaXMudGVtcGxhdGVQYXRoICsgJy4nICsgdGVtcGxhdGVOYW1lO1xuICAgICAgICAgICAgcmV0dXJuIFRlbXBsYXRlc1t0ZW1wbGF0ZU5hbWVdKHsuLi5jb250ZXh0LCAnb2JqZWN0JzogdGhpc30pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBhdGggZm9yIHRoZSBjbGFzcycgdGVtcGxhdGVzLlxuICAgICAgICAgKiBJZiBhIGNsYXNzJyB0ZW1wbGF0ZXMgbGl2ZSB1bmRlciBgc3JjL190ZW1wbGF0ZXMvQXBwbGUvQmFuYW5hYCB0aGVuXG4gICAgICAgICAqIHRoZSBgdGVtcGxhdGVQYXRoYCB3b3VsZCBiZSBkZWZpbmVkIGFzOlxuICAgICAgICAgKiBgYGBcbiAgICAgICAgICogcHVibGljIHJlYWRvbmx5IHRlbXBsYXRlUGF0aDogc3RyaW5nID0gJ0FwcGxlLkJhbmFuYSc7XG4gICAgICAgICAqIGBgYFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGFic3RyYWN0IHJlYWRvbmx5IHRlbXBsYXRlUGF0aDogc3RyaW5nO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCaW5kcyBwcmludCBmdW5jdGlvbmFsaXR5IHRvIGEgY2xhc3MuXG4gICAgICAgICAqIFRha2VzIGEgY29uc3RydWN0b3IgYW5kIGZpbGxzIGluIHRoZSBbW3ByaW50XV0gaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc3RhdGljIG1ha2VQcmludGFibGUoY2xzOiBhbnkpIHtcbiAgICAgICAgICAgIGNscy5wcm90b3R5cGUucHJpbnQgPSBQcmludGFibGVNaXhpbi5wcm90b3R5cGUucHJpbnQ7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIEJlbGwgbnVtYmVyXG4gICAgICpcbiAgICAgKiBuLmIuIEJlbGwgbnVtYmVycyBhcmUgMS1pbmRleGVkLCBpLmUuOlxuICAgICAqICAgdHJlYmxlID0gIDFcbiAgICAgKiAgIGVsZXZlbiA9IDExXG4gICAgICovXG4gICAgZXhwb3J0IHR5cGUgQmVsbCA9IG51bWJlcjtcbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQmVsbC50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIEEgcm93IChwZXJtdXRhdGlvbiBvZiBiZWxscylcbiAgICAgKi9cbiAgICBleHBvcnQgdHlwZSBSb3cgPSBCZWxsW107XG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogTWF0Y2hlcyB0aGUgbnVtYmVyIG9mIGJlbGxzIHRvIHRoZSBuYW1lIG9mIGVhY2ggc3RhZ2VcbiAgICAgKi9cbiAgICBleHBvcnQgZW51bSBTdGFnZSB7XG4gICAgICAgIFRyaXBsZXMgPSA3LFxuICAgICAgICBDYXRlcnMgPSA5LFxuICAgICAgICBDaW5xdWVzID0gMTEsXG4gICAgICAgIFNleHR1cGxlcyA9IDEzLFxuICAgICAgICBTZXB0dXBsZXMgPSAxNSxcbiAgICB9XG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkJlbGwudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlJvd1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiU3RhZ2VcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIHN0cmluZyBpbnRvIGEgW1tSb3ddXS5cbiAgICAgKlxuICAgICAqIFRyaWVzIHRvIGNvbnZlcnQgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSByb3cgaW50byBhIHJvdyBvbiBhXG4gICAgICogcGFydGljdWxhciBzdGFnZS5cbiAgICAgKiBJZiBhbnkgYmVsbHMgYXJlIG1pc3NpbmcgZnJvbSB0aGUgaW5wdXQgc3RyaW5nIHRoZW4gdGhlc2Ugd2lsbCBiZSBhZGRlZFxuICAgICAqIGluIG9yZGVyIGF0IHRoZSBlbmQgb2YgdGhlIHJvdy5cbiAgICAgKiBBbiBleGNlcHRpb24gaXMgdGhyb3duIGlmOlxuICAgICAqICAtIFRoZSBpbnB1dCBzdHJpbmcgaXMgdG9vIGxvbmcgZm9yIHRoZSBzdGFnZVxuICAgICAqICAtIEEgY2hhcmFjdGVyIGlzIHJlcGVhdGVkIGluIHRoZSBpbnB1dCBzdHJpbmdcbiAgICAgKiAgLSBBIGNoYXJhY3RlciBkb2Vzbid0IHJlcHJlc2VudCBhIGJlbGwgb24gdGhlIGN1cnJlbnQgc3RhZ2VcbiAgICAgKlxuICAgICAqIGBgYFxuICAgICAqID4gUHJpY2tlci5yb3dGcm9tU3RyaW5nKCcyMzEnLCBQcmlja2VyLlN0YWdlLkNpbnF1ZXMpO1xuICAgICAqIFsyLCAzLCAxLCA0LCA1LCA2LCA3LCA4LCA5LCAwLCAxMV1cbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gcm93RnJvbVN0cmluZyhpbnB1dDogc3RyaW5nLCBzdGFnZTogU3RhZ2UpOiBSb3cge1xuICAgICAgICBjb25zdCBiZWxsU3ltYm9sc01hcDogeyBbaW5kZXg6IHN0cmluZ106IG51bWJlciB9ID0ge1xuICAgICAgICAgICAgICAgICAgICAnMSc6IDEsICcyJzogMiwgJzMnOiAzLCAnNCc6IDQsICc1JzogNSxcbiAgICAgICAgICAgICAgICAgICAgJzYnOiA2LCAnNyc6IDcsICc4JzogOCwgJzknOiA5LCAnMCc6IDEwLFxuICAgICAgICAgICAgICAgICAgICAnRSc6IDExLCAnVCc6IDEyLCAnQSc6IDEzLCAnQic6IDE0LCAnQyc6IDE1LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiZWxsc1NlZW46IGJvb2xlYW5bXSA9IFsgXSxcbiAgICAgICAgICAgIG91dHB1dDogUm93ID0gWyBdO1xuXG4gICAgICAgIGxldCBiZWxsTnVtYmVyOiBCZWxsLFxuICAgICAgICAgICAgaW5wdXRJbmRleDogbnVtYmVyO1xuXG4gICAgICAgIGlucHV0ID0gaW5wdXQudG9VcHBlckNhc2UoKTtcblxuICAgICAgICBpZiAoaW5wdXQubGVuZ3RoID4gc3RhZ2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUm93IHRvbyBsb25nJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCdWlsZCBhIHRhYmxlIHRvIHJlY29yZCB3aGVuIHdlJ3ZlIHNlZW4gZWFjaCBiZWxsXG4gICAgICAgIGZvciAoYmVsbE51bWJlciA9IDE7IGJlbGxOdW1iZXIgPD0gc3RhZ2U7IGJlbGxOdW1iZXIgKz0gMSkge1xuICAgICAgICAgICAgYmVsbHNTZWVuW2JlbGxOdW1iZXJdID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKFxuICAgICAgICAgICAgaW5wdXRJbmRleCA9IDA7XG4gICAgICAgICAgICBpbnB1dEluZGV4IDwgaW5wdXQubGVuZ3RoICYmIGlucHV0SW5kZXggPCBzdGFnZTtcbiAgICAgICAgICAgIGlucHV0SW5kZXggKz0gMVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGJlbGxOdW1iZXIgPSBiZWxsU3ltYm9sc01hcFtpbnB1dC5jaGFyQXQoaW5wdXRJbmRleCldO1xuXG4gICAgICAgICAgICBpZiAoYmVsbE51bWJlciAmJiBiZWxsTnVtYmVyIDw9IHN0YWdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJlbGxzU2VlbltiZWxsTnVtYmVyXSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JlbGwgcmVwZWF0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goYmVsbE51bWJlcik7XG4gICAgICAgICAgICAgICAgYmVsbHNTZWVuW2JlbGxOdW1iZXJdID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGJlbGwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbnB1dC5sZW5ndGggPCBzdGFnZSkge1xuICAgICAgICAgICAgZm9yIChiZWxsTnVtYmVyID0gMTsgYmVsbE51bWJlciA8PSBzdGFnZTsgYmVsbE51bWJlciArPSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFiZWxsc1NlZW5bYmVsbE51bWJlcl0pIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goYmVsbE51bWJlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiUm93LnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBbW1Jvd11dIGludG8gYSBzdHJpbmcuXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ0Zyb21Sb3cocm93OiBSb3cpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBiZWxsU3ltYm9scyA9ICcgMTIzNDU2Nzg5MEVUQUJDJyxcbiAgICAgICAgICAgIGJlbGxDaGFyYWN0ZXJzOiBzdHJpbmdbXSA9IFsgXTtcblxuICAgICAgICBmb3IgKGNvbnN0IGJlbGwgb2Ygcm93KSB7XG4gICAgICAgICAgICBiZWxsQ2hhcmFjdGVycy5wdXNoKGJlbGxTeW1ib2xzLmNoYXJBdChiZWxsKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYmVsbENoYXJhY3RlcnMuam9pbignJyk7XG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLyogRG9uJ3QgcmVmZXJlbmNlIEFic3RyYWN0U2l4IG9yIHRoaXMgbGVhZHMgdG8gY29tcGlsYXRpb24gZXJyb3JzLi4uICovXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vUm93LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9yb3dGcm9tU3RyaW5nLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9zdHJpbmdGcm9tUm93LnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogVmlzaXRvciBjbGFzc2VzIHRvIGFuYWx5c2UgYmxvY2tzXG4gICAgICpcbiAgICAgKiBBbnkgW1tBYnN0cmFjdEJsb2NrXV0gY2FuIFtbYWNjZXB0XV0gYSB2aXNpdG9yIHRoYXQgd2lsbCBwcm9jZXNzIHRoZWlyXG4gICAgICogW1tSb3ddXXMgKEFuIFtbQWJzdHJhY3RDb250YWluZXJdXSByZWN1cnNpdmVseSBjYWxscyBjb250YWluZWQgYmxvY2tzIGluXG4gICAgICogdHVybiB0byBtYWtlIHN1cmUgYWxsIHJvd3MgYXJlIHJlYWNoZWQpLlxuICAgICAqXG4gICAgICogVmlzaXRvcnMgcHJvY2VzcyBlYWNoIHJvdyBpbiB0dXJuIGluIHRoZSBvcmRlciB0aGV5IHdvdWxkIGJlIHJ1bmcuXG4gICAgICogVGhleSB0YWtlIGFjdGlvbiBmb3IgZWFjaCByb3csIHByb2JhYmx5IG1vZGlmeWluZyBzb21lIGludGVybmFsIHN0YXRlXG4gICAgICogYmFzZWQgb24gdGhlIHJvd3MgdGhhdCB0aGV5IHJlY2VpdmUuXG4gICAgICogVGhleSBzdG9wIHByb2Nlc3Npbmcgcm93cyBpZiByb3VuZHMgaXMgcmVhY2hlZC5cbiAgICAgKlxuICAgICAqIFRoZXJlJ3Mgbm8gd2F5IHRvIHJlc2V0IGEgdmlzaXRvcjogY3JlYXRlIGEgbmV3IG9uZSBpbiBvcmRlciB0byBjb21wbGV0ZVxuICAgICAqIGEgZnJlc2ggYW5hbHlzaXMuXG4gICAgICpcbiAgICAgKiBAcHJlZmVycmVkXG4gICAgICovXG4gICAgZXhwb3J0IG5hbWVzcGFjZSBWaXNpdG9yIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQmFzZSBjbGFzcyBmb3IgYWxsIHZpc2l0b3JzXG4gICAgICAgICAqXG4gICAgICAgICAqIERlZmVycyB0byBkZXJpdmVkIGNsYXNzZXMgaW4gb3JkZXIgdG8gcHJvY2VzcyByb3dzLCBidXQgZG9lcyBjaGVja1xuICAgICAgICAgKiB3aGV0aGVyIHJvdW5kcyBoYXMgYmVlbiByZWFjaGVkIGFuZCBzdG9wcyBwcm9jZXNzaW5nIGF0IHRoYXQgcG9pbnQuXG4gICAgICAgICAqL1xuICAgICAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RWaXNpdG9yIHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBXaGV0aGVyIG9yIG5vdCB3ZSdyZSBzdGlsbCBwcm9jZXNzaW5nIHJvd3MuXG4gICAgICAgICAgICAgKiBEZWZhdWx0cyB0byBgdHJ1ZWAgKHByb2Nlc3Npbmcgcm93cyksIGJ1dCBpcyBzZXQgdG8gYGZhbHNlYCBvbmNlXG4gICAgICAgICAgICAgKiByb3VuZHMgaGFzIGJlZW4gdmlzaXRlZC5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJpdmF0ZSBfdmlzaXRpbmc6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlbWVtYmVyIHJvdW5kcyBzbyB3ZSBkb24ndCBoYXZlIHRvIHJlZ2VuZXJhdGUgZm9yIGVhY2ggbmV3IHJvdy5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJpdmF0ZSBfcm91bmRzOiBzdHJpbmc7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVmlzaXRzIGEgcm93LlxuICAgICAgICAgICAgICogSWYgd2UncmUgc3RpbGwgdmlzaXRpbmcgKGkuZS4gcm91bmRzIGhhc24ndCBiZWVuIHJlYWNoZWQpIHRoZW5cbiAgICAgICAgICAgICAqIHdlIHBhc3MgdGhhdCByb3cgdG8gZGVyaXZlZCBjbGFzc2VzIGZvciBwcm9jZXNzaW5nLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgdmlzaXQocm93OiBSb3csIHNpeD86IEFic3RyYWN0U2l4KTogdGhpcyB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9yb3VuZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm91bmRzID0gc3RyaW5nRnJvbVJvdyhyb3dGcm9tU3RyaW5nKCcnLCByb3cubGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Zpc2l0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlzaXRJbXBsZW1lbnRhdGlvbihyb3csIHNpeCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHJpbmdGcm9tUm93KHJvdykgPT09IHRoaXMuX3JvdW5kcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlzaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZXBvcnRzIHdoZXRoZXIgcm93cyBhcmUgc3RpbGwgYmVpbmcgcHJvY2Vzc2VkIGJ5IHByb3ZpZGluZ1xuICAgICAgICAgICAgICogcHVibGljIGFjY2VzcyB0byBbW192aXNpdGluZ11dLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgaXNWaXNpdGluZygpOiBib29sZWFuIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdmlzaXRpbmc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVW5kZXJseWluZyB2aXNpdG9yIGltcGxlbWVudGF0aW9uICh0byBiZSBvdmVycmlkZGVuIGJ5IGRlcml2ZWRcbiAgICAgICAgICAgICAqIGNsYXNzZXMpLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgdmlzaXRJbXBsZW1lbnRhdGlvbihcbiAgICAgICAgICAgICAgICByb3c6IFJvdyxcbiAgICAgICAgICAgICAgICBzaXg/OiBBYnN0cmFjdFNpeCxcbiAgICAgICAgICAgICk6IHZvaWQ7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkJsb2NrT3duZXJzaGlwLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJOb3RpZmlhYmxlLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJQcmludGFibGVNaXhpbi50c1wiLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJSb3cudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlRlbXBsYXRlQ29udGV4dC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiVmlzaXRvci9BYnN0cmFjdC50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIEFic3RyYWN0IGNsYXNzIHJlcHJlc2VudGluZyBibG9ja3Mgb2Ygcm93c1xuICAgICAqXG4gICAgICogQSBibG9jazpcbiAgICAgKiAgLSBpcyBpbml0aWFsaXNlZCBmcm9tIGEgcm93XG4gICAgICogIC0gcHJvdmlkZXMgYWNjZXNzIHRvIHRoZSBlbmQgcm93IGF0IHRoZSBlbmQgb2YgdGhlIGJsb2NrXG4gICAgICogIC0gcmVjYWxjdWxhdGVzIHRoYXQgZW5kIHJvdyBpZiB0aGUgaW5pdGlhbCByb3cgaXMgY2hhbmdlZFxuICAgICAqICAtIHByb3ZpZGVzIG1lY2hhbmlzbXMgZm9yIGNvbnRyb2xsaW5nIGhvdyB0aGUgZW5kIHJvdyBpcyBjcmVhdGVkXG4gICAgICogIC0gbm90aWZpZXMgYW55IHBhcmVudCBibG9jayB3aGVuZXZlciB0aG9zZSBtZWNoYW5pc21zIGFyZSBhY3R1YXRlZFxuICAgICAqXG4gICAgICogQmxvY2tzIGFyZSBkZXNpZ25lZCB0byBiZSBhZ2dyZWdhdGVkIGludG8gY29udGFpbmVycy5cbiAgICAgKiBDb250YWluZXJzIG5vdGlmeSBibG9ja3Mgb2YgY2hhbmdlcyBieSBzZXR0aW5nIGEgbmV3IGluaXRpYWwgcm93LlxuICAgICAqIEJsb2NrcyBub3RpZnkgY29udGFpbmVycyBvZiBjaGFuZ2VzIHZpYSBhIGNhbGxiYWNrIChyZWNlaXZlTm90aWZpY2F0aW9uKS5cbiAgICAgKi9cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RCbG9jayBpbXBsZW1lbnRzIFByaW50YWJsZU1peGluIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW5pdGlhbCByb3cgZm9yIHRoZSBibG9ja1xuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIF9pbml0aWFsUm93OiBSb3c7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnN0cnVjdG9yXG4gICAgICAgICAqIEBwYXJhbSBpbml0aWFsUm93ICBpbml0aWFsIHJvdyBmb3IgdGhlIGJsb2NrXG4gICAgICAgICAqIEBwYXJhbSBvd25lcnNoaXAgICBvd25lcnNoaXAgb2YgdGhpcyBibG9ja1xuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IoXG4gICAgICAgICAgICBpbml0aWFsUm93OiBSb3csXG4gICAgICAgICAgICBwcm90ZWN0ZWQgX293bmVyc2hpcD86IEJsb2NrT3duZXJzaGlwLFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuX2luaXRpYWxSb3cgPSBpbml0aWFsUm93LnNsaWNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBQcmludGFibGVNaXhpbiBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVuZGVycyB0aGUgb2JqZWN0IHdpdGggYSB0ZW1wbGF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHByaW50OiAodDogc3RyaW5nLCBjPzogVGVtcGxhdGVDb250ZXh0KSA9PiBzdHJpbmc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBhdGggZm9yIHRoaXMgY2xhc3MnIHRlbXBsYXRlc1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHRlbXBsYXRlUGF0aDogc3RyaW5nID0gJ0Fic3RyYWN0QmxvY2snO1xuXG4gICAgICAgIC8qIEFic3RyYWN0QmxvY2sgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEb2VzIGFueSBjYWxjdWxhdGlvbiBuZWVkZWQgYnkgdGhlIGJsb2NrXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgY2FsY3VsYXRlKCk6IHZvaWQ7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlYWQgYWNjZXNzIHRvIHRoZSBpbml0aWFsIHJvd1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGdldEluaXRpYWxSb3coKTogUm93IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbml0aWFsUm93LnNsaWNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogV3JpdGUgYWNjZXNzIHRvIHRoZSBpbml0aWFsIHJvd1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHNldEluaXRpYWxSb3coaW5pdGlhbFJvdzogUm93KTogdGhpcyB7XG4gICAgICAgICAgICB0aGlzLl9pbml0aWFsUm93ID0gaW5pdGlhbFJvdy5zbGljZSgpO1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGUoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIGVuZCByb3dcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRFbmQoKTogUm93O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVcGRhdGVzIHJlZmVyZW5jZXMgdG8gdGhlIHBhcmVudCBjb250YWluZXJcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzZXRPd25lcnNoaXAob3duZXJzaGlwOiBCbG9ja093bmVyc2hpcCk6IEFic3RyYWN0QmxvY2sge1xuICAgICAgICAgICAgdGhpcy5fb3duZXJzaGlwID0gb3duZXJzaGlwO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQWxsb3dzIHB1YmxpYyBhY2Nlc3MgdG8gdGhlIGNvbnRhaW5lclxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGdldENvbnRhaW5lcigpOiBOb3RpZmlhYmxlIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vd25lcnNoaXAgPyB0aGlzLl9vd25lcnNoaXAuY29udGFpbmVyIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFsbG93cyBwdWJsaWMgYWNjZXNzIHRvIHRoZSBpbmRleFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGdldEluZGV4KCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb3duZXJzaGlwID8gdGhpcy5fb3duZXJzaGlwLmluZGV4IDogdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsZWFycyByZWZlcmVuY2VzIHRvIHRoZSBwYXJlbnQgY29udGFpbmVyXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgY2xlYXJPd25lcnNoaXAoKTogQWJzdHJhY3RCbG9jayB7XG4gICAgICAgICAgICB0aGlzLl9vd25lcnNoaXAgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBOb3RpZmllcyB0aGUgcGFyZW50IGNvbnRhaW5lclxuICAgICAgICAgKlxuICAgICAgICAgKiBEZXJpdmVkIGNsYXNzZXMgc2hvdWxkIGNhbGwgdGhpcyB3aGVuZXZlciB0aGUgZW5kIHJvdyBjaGFuZ2VzLlxuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIG5vdGlmeUNvbnRhaW5lcigpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9vd25lcnNoaXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vd25lcnNoaXAuY29udGFpbmVyLm5vdGlmeSh0aGlzLl9vd25lcnNoaXAuaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlY2VpdmVzIGEgdmlzaXRvciB0aGF0IHdpbGwgYmUgY2FsbGVkIHRvIHByb2Nlc3MgZWFjaCByb3dcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBhY2NlcHQoLi4udmlzaXRvcnM6IFZpc2l0b3IuQWJzdHJhY3RWaXNpdG9yW10pOiB0aGlzO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFc3RpbWF0ZXMgdGhlIG51bWJlciBvZiByb3dzIGluIHRoZSBibG9ja1xuICAgICAgICAgKiBUaGUgZXN0aW1hdGUgZG9lc24ndCB0YWtlIGludG8gYWNjb3VudCBjb21pbmcgcm91bmQgcGFydC13YXkgdGhyb3VnaFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGFic3RyYWN0IGVzdGltYXRlUm93cygpOiBudW1iZXI7XG5cbiAgICB9XG5cbiAgICBQcmludGFibGVNaXhpbi5tYWtlUHJpbnRhYmxlKEFic3RyYWN0QmxvY2spO1xuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkFic3RyYWN0QmxvY2sudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkJsb2NrT3duZXJzaGlwLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJOb3RpZmlhYmxlLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJSb3cudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlZpc2l0b3IvQWJzdHJhY3QudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBBYnN0cmFjdCBjbGFzcyByZXByZXNlbnRpbmcgY29udGFpbmVycyBmb3IgYmxvY2tzIG9mIHJvd3NcbiAgICAgKlxuICAgICAqIE5vdGUgdGhhdCBjb250YWluZXJzIGFyZSBhbHNvIGJsb2NrcyB0aGVtc2VsdmVzLlxuICAgICAqL1xuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdENvbnRhaW5lcjxCbG9jayBleHRlbmRzIEFic3RyYWN0QmxvY2s+XG4gICAgICAgIGV4dGVuZHMgQWJzdHJhY3RCbG9jayBpbXBsZW1lbnRzIE5vdGlmaWFibGUge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCbG9ja3Mgd2l0aGluIHRoZSBjb250YWluZXJcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBfYmxvY2tzOiBCbG9ja1tdID0gWyBdO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAgICAgKlxuICAgICAgICAgKiBFeHRlbmRzIHRoZSBBYnN0cmFjdEJsb2NrIGNvbnRhaW5lciB0byBjcmVhdGUgY29udGFpbmVkIGJsb2Nrcy5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAgICAgaW5pdGlhbFJvdzogUm93LFxuICAgICAgICAgICAgcHJvdGVjdGVkIF9vd25lcnNoaXA/OiBCbG9ja093bmVyc2hpcCxcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBzdXBlcihpbml0aWFsUm93LCBfb3duZXJzaGlwKTtcbiAgICAgICAgICAgIHRoaXMuZXh0ZW5kKHRoaXMuZ2V0RGVmYXVsdExlbmd0aChpbml0aWFsUm93KSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBBYnN0cmFjdEJsb2NrIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogRG9lcyBhbnkgY2FsY3VsYXRpb24gbmVlZGVkIGJ5IHRoZSBibG9ja1xuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIGNhbGN1bGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlQmxvY2tzKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgZW5kIHJvd1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGdldEVuZCgpOiBSb3cge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2Jsb2Nrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYmxvY2tzW3RoaXMuX2Jsb2Nrcy5sZW5ndGggLSAxXS5nZXRFbmQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSGFuZGxlIGNhc2Ugd2l0aCB6ZXJvIGJsb2Nrc1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRpYWxSb3cuc2xpY2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWNlaXZlcyBhIHZpc2l0b3IgdGhhdCB3aWxsIGJlIGNhbGxlZCB0byBwcm9jZXNzIGVhY2ggcm93XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgYWNjZXB0KC4uLnZpc2l0b3JzOiBWaXNpdG9yLkFic3RyYWN0VmlzaXRvcltdKTogdGhpcyB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGJsb2NrIG9mIHRoaXMuX2Jsb2Nrcykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdmlzaXRvciBvZiB2aXNpdG9ycykge1xuICAgICAgICAgICAgICAgICAgICBibG9jay5hY2NlcHQodmlzaXRvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogRXN0aW1hdGVzIHRoZSBudW1iZXIgb2Ygcm93cyBpbiB0aGUgYmxvY2tcbiAgICAgICAgICogVGhlIGVzdGltYXRlIGRvZXNuJ3QgdGFrZSBpbnRvIGFjY291bnQgY29taW5nIHJvdW5kIHBhcnQtd2F5IHRocm91Z2hcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBlc3RpbWF0ZVJvd3MoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGxldCByb3dzOiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgZm9yIChjb25zdCBibG9jayBvZiB0aGlzLl9ibG9ja3MpIHtcbiAgICAgICAgICAgICAgICByb3dzICs9IGJsb2NrLmVzdGltYXRlUm93cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJvd3M7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBOb3RpZmlhYmxlIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVjZWl2ZXMgYSBub3RpZmljYXRpb24gZnJvbSBhIGJsb2NrIHRoYXQgaGFzIGNoYW5nZWRcbiAgICAgICAgICogQHBhcmFtIGluZGV4ICBpbmRleCBvZiBjaGFuZ2VkIGJsb2NrIGluIGNvbnRhaW5lclxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIG5vdGlmeShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUJsb2NrcyhpbmRleCk7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeUNvbnRhaW5lcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogQWJzdHJhY3RDb250YWluZXIgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEV4dGVuZHMgdGhlIGNvbnRhaW5lciBieSBhZGRpbmcgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgYmxvY2tzXG4gICAgICAgICAqIEBwYXJhbSBibG9ja3MgIGJsb2NrcyB0byBhZGRcbiAgICAgICAgICovXG4gICAgICAgIHByaXZhdGUgZXh0ZW5kKGJsb2NrczogbnVtYmVyKTogdGhpcyB7XG4gICAgICAgICAgICBjb25zdCBvbGRMZW5ndGg6IG51bWJlciA9IHRoaXMuZ2V0TGVuZ3RoKCksXG4gICAgICAgICAgICAgICAgbmV3TGVuZ3RoOiBudW1iZXIgPSBvbGRMZW5ndGggKyBibG9ja3M7XG5cbiAgICAgICAgICAgIGxldCBpbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgICAgIGluaXRpYWxSb3c6IFJvdyA9IHRoaXMuZ2V0RW5kKCk7XG5cbiAgICAgICAgICAgIGZvciAoaW5kZXggPSBvbGRMZW5ndGggKyAxOyBpbmRleCA8PSBuZXdMZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ibG9ja3NbaW5kZXggLSAxXSA9IHRoaXMuY3JlYXRlQmxvY2soaW5pdGlhbFJvdywgaW5kZXgpO1xuICAgICAgICAgICAgICAgIGluaXRpYWxSb3cgPSB0aGlzLl9ibG9ja3NbaW5kZXggLSAxXS5nZXRFbmQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBsZW5ndGggb2YgbmV3IGNvbnRhaW5lcnMgb2YgdGhpcyB0eXBlXG4gICAgICAgICAqXG4gICAgICAgICAqIERlcml2ZWQgY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgaWYgcmVxdWlyZWQuXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdExlbmd0aChpbml0aWFsUm93OiBSb3cpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBibG9jayBmb3IgdGhlIGNvbnRhaW5lclxuICAgICAgICAgKlxuICAgICAgICAgKiBVc2VkIGJ5IGV4dGVuZCgpIHdoZW4gY3JlYXRpbmcgdGhlIGNvbnRhaW5lciBvciBpbmNyZWFzaW5nIGl0c1xuICAgICAgICAgKiBsZW5ndGguXG4gICAgICAgICAqIEBwYXJhbSBpbml0aWFsUm93ICBpbml0aWFsIHJvdyBmb3IgdGhlIGJsb2NrXG4gICAgICAgICAqIEBwYXJhbSBpbmRleCAgICAgICBpbmRleCBvZiBibG9jayBpbiBjb250YWluZXJcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBjcmVhdGVCbG9jayhpbml0aWFsUm93OiBSb3csIGluZGV4OiBudW1iZXIpOiBCbG9jaztcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2FsY3VsYXRlcyBibG9ja3Mgd2l0aGluIHRoZSBjb250YWluZXJcbiAgICAgICAgICogQHBhcmFtIGluZGV4ICB3aGVyZSB0byBzdGFydCB3aGVuIHJlY2FsY3VsYXRpbmdcbiAgICAgICAgICovXG4gICAgICAgIHByaXZhdGUgY2FsY3VsYXRlQmxvY2tzKGluZGV4OiBudW1iZXIgPSAwKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgaW5pdGlhbFJvdzogUm93ID0gdGhpcy5faW5pdGlhbFJvdztcblxuICAgICAgICAgICAgaWYgKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbFJvdyA9IHRoaXMuX2Jsb2Nrc1tpbmRleCAtIDFdLmdldEVuZCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKDsgaW5kZXggPCB0aGlzLmdldExlbmd0aCgpOyBpbmRleCArPSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYmxvY2tzW2luZGV4XS5zZXRJbml0aWFsUm93KGluaXRpYWxSb3cpO1xuICAgICAgICAgICAgICAgIGluaXRpYWxSb3cgPSB0aGlzLl9ibG9ja3NbaW5kZXhdLmdldEVuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlYWQgYWNjZXNzIHRvIHRoZSBsZW5ndGhcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBnZXRMZW5ndGgoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ibG9ja3MubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyaXRlIGFjY2VzcyB0byB0aGUgbGVuZ3RoXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc2V0TGVuZ3RoKGxlbmd0aDogbnVtYmVyKTogdGhpcyB7XG4gICAgICAgICAgICBpZiAoKGxlbmd0aCA8IHRoaXMubWluTGVuZ3RoKSB8fCAobGVuZ3RoID4gdGhpcy5tYXhMZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdMZW5ndGggb3V0IG9mIHJhbmdlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChsZW5ndGggPiB0aGlzLmdldExlbmd0aCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHRlbmQobGVuZ3RoIC0gdGhpcy5nZXRMZW5ndGgoKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Jsb2NrcyA9IHRoaXMuX2Jsb2Nrcy5zbGljZSgwLCBsZW5ndGgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm5vdGlmeUNvbnRhaW5lcigpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcml0ZSBhY2Nlc3MgdG8gdGhlIGxlbmd0aDogaWdub3JlcyBvdXQtb2YtcmFuZ2UgdmFsdWVzXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc2FmZVNldExlbmd0aChsZW5ndGg6IG51bWJlcik6IHRoaXMge1xuICAgICAgICAgICAgbGVuZ3RoID0gTWF0aC5tYXgobGVuZ3RoLCB0aGlzLm1pbkxlbmd0aCk7XG4gICAgICAgICAgICBsZW5ndGggPSBNYXRoLm1pbihsZW5ndGgsIHRoaXMubWF4TGVuZ3RoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldExlbmd0aChsZW5ndGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIExvd2VyIGxpbWl0IG9uIGxlbmd0aCBmb3IgdGhlIHBhcnRpY3VsYXIgY29uY3JldGUgY2xhc3NcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBhYnN0cmFjdCBtaW5MZW5ndGg6IG51bWJlcjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVXBwZXIgbGltaXQgb24gbGVuZ3RoIGZvciB0aGUgcGFydGljdWxhciBjb25jcmV0ZSBjbGFzc1xuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGFic3RyYWN0IG1heExlbmd0aDogbnVtYmVyO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWFkIGFjY2VzcyB0byB0aGUgYmxvY2tzXG4gICAgICAgICAqXG4gICAgICAgICAqIERlcml2ZWQgY2xhc3NlcyBzaG91bGQgcHJvdmlkZSBwdWJsaWMgYWNjZXNzIHZpYSBhIG1vcmVcbiAgICAgICAgICogc3VpdGFibHktbmFtZWQgbWV0aG9kXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgZ2V0QmxvY2tzKCk6IEJsb2NrW10ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Jsb2Nrcy5zbGljZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlYWQgYWNjZXNzIHRvIGEgYmxvY2tcbiAgICAgICAgICpcbiAgICAgICAgICogRGVyaXZlZCBjbGFzc2VzIHNob3VsZCBwcm92aWRlIHB1YmxpYyBhY2Nlc3MgdmlhIGEgbW9yZVxuICAgICAgICAgKiBzdWl0YWJseS1uYW1lZCBtZXRob2RcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBnZXRCbG9jayhpbmRleDogbnVtYmVyKTogQmxvY2sge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgMSB8fCBpbmRleCA+IHRoaXMuZ2V0TGVuZ3RoKCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jsb2NrIGluZGV4IG91dCBvZiByYW5nZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Jsb2Nrc1tpbmRleCAtIDFdO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBUeXBlcyBvZiBjYWxsXG4gICAgICogQGVudW0ge251bWJlcn1cbiAgICAgKi9cbiAgICBleHBvcnQgZW51bSBDYWxsIHtQbGFpbiA9IDAsIEJvYiwgU2luZ2xlfVxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJCZWxsLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJDYWxsLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJSb3cudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBTaW1wbGUgZnVuY3Rpb25zIHRvIHBlcm11dGUgcm93c1xuICAgICAqL1xuICAgIGV4cG9ydCBuYW1lc3BhY2UgQ2hhbmdlcyB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhlbHBlciBmdW5jdGlvbiB0byBzd2FwIHR3byBiZWxsc1xuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gc3dhcFBhaXIocm93OiBSb3csIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCBiZWxsOiBCZWxsO1xuXG4gICAgICAgICAgICBiZWxsID0gcm93W2luZGV4XTtcbiAgICAgICAgICAgIHJvd1tpbmRleF0gPSByb3dbaW5kZXggKyAxXTtcbiAgICAgICAgICAgIHJvd1tpbmRleCArIDFdID0gYmVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBOb3RhdGlvbiA8MT5cbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBwZXJtdXRlMShyb3c6IFJvdyk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IGluZGV4OiBudW1iZXI7XG5cbiAgICAgICAgICAgIGZvciAoaW5kZXggPSAxOyBpbmRleCA8IHJvdy5sZW5ndGggLSAxOyBpbmRleCArPSAyKSB7XG4gICAgICAgICAgICAgICAgc3dhcFBhaXIocm93LCBpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogTm90YXRpb24gPDM+XG4gICAgICAgICAqL1xuICAgICAgICBleHBvcnQgZnVuY3Rpb24gcGVybXV0ZTMocm93OiBSb3cpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCBpbmRleDogbnVtYmVyO1xuXG4gICAgICAgICAgICBzd2FwUGFpcihyb3csIDApO1xuXG4gICAgICAgICAgICBmb3IgKGluZGV4ID0gMzsgaW5kZXggPCByb3cubGVuZ3RoIC0gMTsgaW5kZXggKz0gMikge1xuICAgICAgICAgICAgICAgIHN3YXBQYWlyKHJvdywgaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE5vdGF0aW9uIDxuPlxuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIHBlcm11dGVOKHJvdzogUm93KTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgaW5kZXg6IG51bWJlcjtcblxuICAgICAgICAgICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgcm93Lmxlbmd0aCAtIDE7IGluZGV4ICs9IDIpIHtcbiAgICAgICAgICAgICAgICBzd2FwUGFpcihyb3csIGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBOb3RhdGlvbiA8OT4gZm9yIENpbnF1ZXNcbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBwZXJtdXRlQm9iKHJvdzogUm93KTogdm9pZCB7XG4gICAgICAgICAgICBwZXJtdXRlU2luZ2xlKHJvdyk7XG4gICAgICAgICAgICBzd2FwUGFpcihyb3csIHJvdy5sZW5ndGggLSAyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBOb3RhdGlvbiA8OTBFPiBmb3IgQ2lucXVlc1xuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIHBlcm11dGVTaW5nbGUocm93OiBSb3cpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCBpbmRleDogbnVtYmVyO1xuXG4gICAgICAgICAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCByb3cubGVuZ3RoIC0gMzsgaW5kZXggKz0gMikge1xuICAgICAgICAgICAgICAgIHN3YXBQYWlyKHJvdywgaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE5vdGF0aW9uIGRlcGVuZGVudCBvbiBjYWxsXG4gICAgICAgICAqL1xuICAgICAgICBleHBvcnQgZnVuY3Rpb24gcGVybXV0ZUNhbGwocm93OiBSb3csIGNhbGw6IENhbGwpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmIChjYWxsID09PSBDYWxsLlBsYWluKSB7XG4gICAgICAgICAgICAgICAgQ2hhbmdlcy5wZXJtdXRlTihyb3cpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjYWxsID09PSBDYWxsLkJvYikge1xuICAgICAgICAgICAgICAgIENoYW5nZXMucGVybXV0ZUJvYihyb3cpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjYWxsID09PSBDYWxsLlNpbmdsZSkge1xuICAgICAgICAgICAgICAgIENoYW5nZXMucGVybXV0ZVNpbmdsZShyb3cpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkFic3RyYWN0QmxvY2sudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkJsb2NrT3duZXJzaGlwLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJDYWxsLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJDaGFuZ2VzLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJSb3cudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBCYXNlIGNsYXNzIGZvciBzaXhlc1xuICAgICAqL1xuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFNpeCBleHRlbmRzIEFic3RyYWN0QmxvY2sge1xuICAgICAgICAvKipcbiAgICAgICAgICogU2l4IGVuZCBvZiB0aGlzIHNpeFxuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIF9lbmQ6IFJvdztcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2FsbCB1c2VkIHRvIHN0YXJ0IHRoZSBzaXhcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBfY2FsbDogQ2FsbCA9IENhbGwuUGxhaW47XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnN0cnVjdG9yXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgICAgIGluaXRpYWxSb3c6IFJvdyxcbiAgICAgICAgICAgIHByb3RlY3RlZCBfb3duZXJzaGlwPzogQmxvY2tPd25lcnNoaXAsXG4gICAgICAgICkge1xuICAgICAgICAgICAgc3VwZXIoaW5pdGlhbFJvdywgX293bmVyc2hpcCk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogQWJzdHJhY3RCbG9jayBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERvZXMgYW55IGNhbGN1bGF0aW9uIG5lZWRlZCBieSB0aGUgYmxvY2tcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBjYWxjdWxhdGUoKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLl9lbmQgPSB0aGlzLl9pbml0aWFsUm93LnNsaWNlKCk7ICAvLyBDcmVhdGUgbmV3IGFycmF5XG4gICAgICAgICAgICBDaGFuZ2VzLnBlcm11dGVDYWxsKHRoaXMuX2VuZCwgdGhpcy5fY2FsbCk7XG4gICAgICAgICAgICB0aGlzLmFwcGx5U2l4VHJhbnNwb3NpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIGVuZCByb3dcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBnZXRFbmQoKTogUm93IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbmQuc2xpY2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFc3RpbWF0ZXMgdGhlIG51bWJlciBvZiByb3dzIGluIHRoZSBibG9ja1xuICAgICAgICAgKiBUaGUgZXN0aW1hdGUgZG9lc24ndCB0YWtlIGludG8gYWNjb3VudCBjb21pbmcgcm91bmQgcGFydC13YXkgdGhyb3VnaFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGVzdGltYXRlUm93cygpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIDY7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBBYnN0cmFjdFNpeCBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgc3RhcnQgcm93XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZ2V0U3RhcnRSb3coKTogUm93IHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5faW5pdGlhbFJvdy5zbGljZSgpO1xuICAgICAgICAgICAgQ2hhbmdlcy5wZXJtdXRlQ2FsbChzdGFydCwgdGhpcy5fY2FsbCk7XG4gICAgICAgICAgICByZXR1cm4gc3RhcnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVhZCBhY2Nlc3MgdG8gdGhlIGNhbGxcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBnZXRDYWxsKCk6IENhbGwge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NhbGw7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogV3JpdGUgYWNjZXNzIHRvIHRoZSBjYWxsXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc2V0Q2FsbChjYWxsOiBDYWxsLCB1cGRhdGU6IGJvb2xlYW4gPSB0cnVlKTogQWJzdHJhY3RTaXgge1xuICAgICAgICAgICAgdGhpcy5fY2FsbCA9IGNhbGw7XG4gICAgICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeUNvbnRhaW5lcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogVG9nZ2xlcyB0aGUgY2FsbCB0eXBlIGJldHdlZW4gUGxhaW4gLT4gQm9iIC0+IFNpbmdsZSAtPiBQbGFpblxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHRvZ2dsZUNhbGwoKTogQ2FsbCB7XG4gICAgICAgICAgICBjb25zdCBjYWxsOiBDYWxsID0gKHRoaXMuX2NhbGwgKyAxKSAlIDM7XG4gICAgICAgICAgICB0aGlzLnNldENhbGwoY2FsbCk7XG4gICAgICAgICAgICByZXR1cm4gY2FsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaW5pc2hlcyB0cmFuc3Bvc2luZyB0aGUgZW5kIHJvdyBkZXBlbmRpbmcgdXBvbiB0aGUgdHlwZSBvZiBzaXhcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBhcHBseVNpeFRyYW5zcG9zaXRpb24oKTogdm9pZDtcblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJBYnN0cmFjdEJsb2NrLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJOb3RpZmlhYmxlLnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogQSBibG9jayBkaXJlY3RvcnlcbiAgICAgKiBGaWxlcyBpbmZvcm1hdGlvbiBhYm91dCBibG9ja3MgaW4gYSB0b3VjaCwgaW5kZXhlZCBieSB0aGVpciBsb2NhdGlvblxuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBCbG9ja0RpcmVjdG9yeSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBkaXJlY3RvcnkgaXRzZWxmXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgX2RpcmVjdG9yeTogYW55ID0gWyBdO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGRzIGEgc2l4IHRvIHRoZSBkaXJlY3RvcnlcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBhZGQoYmxvY2s6IEFic3RyYWN0QmxvY2spOiB0aGlzO1xuICAgICAgICBwdWJsaWMgYWRkKC4uLmluZGljZXM6IG51bWJlcltdKTogdGhpcztcblxuICAgICAgICBwdWJsaWMgYWRkKHBhcmFtOiBhbnksIC4uLmluZGljZXM6IG51bWJlcltdKTogdGhpcyB7XG4gICAgICAgICAgICBsZXQgZGlyZWN0b3J5OiBhbnksXG4gICAgICAgICAgICAgICAgZmluYWxJbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGluZGljZXMgPSBCbG9ja0RpcmVjdG9yeS5nZXRJbmRpY2VzKHBhcmFtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5kaWNlcy51bnNoaWZ0KHBhcmFtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZmluYWxJbmRleCA9IGluZGljZXMucG9wKCk7XG4gICAgICAgICAgICBpZiAoIWZpbmFsSW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JhZCBvd25lcnNoaXA6IG11c3QgaGF2ZSBhdCBsZWFzdCBvbmUgaW5kZXgnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGlyZWN0b3J5ID0gdGhpcy5fZGlyZWN0b3J5O1xuICAgICAgICAgICAgZm9yIChjb25zdCBpbmRleCBvZiBpbmRpY2VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFkaXJlY3RvcnlbaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdG9yeVtpbmRleF0gPSBbIF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRpcmVjdG9yeSA9IGRpcmVjdG9yeVtpbmRleF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRpcmVjdG9yeVtmaW5hbEluZGV4XSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVja3Mgd2hldGhlciBhIHNpeCBpcyBpbiB0aGUgZGlyZWN0b3J5XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgY29udGFpbnMoYmxvY2s6IEFic3RyYWN0QmxvY2spOiBib29sZWFuO1xuICAgICAgICBwdWJsaWMgY29udGFpbnMoLi4uaW5kaWNlczogbnVtYmVyW10pOiBib29sZWFuO1xuXG4gICAgICAgIHB1YmxpYyBjb250YWlucyhwYXJhbTogYW55LCAuLi5pbmRpY2VzOiBudW1iZXJbXSk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgbGV0IGRpcmVjdG9yeTogYW55O1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGluZGljZXMgPSBCbG9ja0RpcmVjdG9yeS5nZXRJbmRpY2VzKHBhcmFtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5kaWNlcy51bnNoaWZ0KHBhcmFtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGlyZWN0b3J5ID0gdGhpcy5fZGlyZWN0b3J5O1xuICAgICAgICAgICAgZm9yIChjb25zdCBpbmRleCBvZiBpbmRpY2VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFkaXJlY3RvcnlbaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGlyZWN0b3J5ID0gZGlyZWN0b3J5W2luZGV4XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29tcHV0ZXMgYW4gYXJyYXkgb2Ygb3duZXJzaGlwIGluZGljZXMgZm9yIGJsb2NrXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc3RhdGljIGdldEluZGljZXMoYmxvY2s6IEFic3RyYWN0QmxvY2spOiBudW1iZXJbXSB7XG4gICAgICAgICAgICBjb25zdCBvd25lcnNoaXBBcnJheTogbnVtYmVyW10gPSBbIF07XG4gICAgICAgICAgICBsZXQgY29udGFpbmVyOiBOb3RpZmlhYmxlIHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIGluZGV4ID0gYmxvY2suZ2V0SW5kZXgoKTtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGJsb2NrLmdldENvbnRhaW5lcigpO1xuICAgICAgICAgICAgaWYgKCFjb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JhZCBvd25lcnNoaXA6IGJsb2NrIGhhcyBubyBjb250YWluZXInKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2hpbGUgKGNvbnRhaW5lciBpbnN0YW5jZW9mIEFic3RyYWN0QmxvY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoIWluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQmFkIG93bmVyc2hpcDogY29udGFpbmVyIGJ1dCBubyBpbmRleCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvd25lcnNoaXBBcnJheS51bnNoaWZ0KGluZGV4KTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGNvbnRhaW5lci5nZXRJbmRleCgpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lci5nZXRDb250YWluZXIoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG93bmVyc2hpcEFycmF5O1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBpbmRleCBpcyBlbXB0eVxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGlzRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuX2RpcmVjdG9yeS5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJBYnN0cmFjdENvbnRhaW5lci50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQWJzdHJhY3RTaXgudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkNhbGwudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlJvdy50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIEEgY291cnNlLCBiZWluZyBhIHNldCBvZiBzaXhlc1xuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBDb3Vyc2UgZXh0ZW5kcyBBYnN0cmFjdENvbnRhaW5lcjxBYnN0cmFjdFNpeD4ge1xuXG4gICAgICAgIC8qIFByaW50YWJsZU1peGluIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQYXRoIGZvciB0aGlzIGNsYXNzJyB0ZW1wbGF0ZXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0ZW1wbGF0ZVBhdGg6IHN0cmluZyA9ICdDb3Vyc2UnO1xuXG4gICAgICAgIC8qIEFic3RyYWN0Q29udGFpbmVyIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGxlbmd0aCBvZiBuZXcgY29udGFpbmVycyBvZiB0aGlzIHR5cGVcbiAgICAgICAgICpcbiAgICAgICAgICogRGVyaXZlZCBjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCBpZiByZXF1aXJlZC5cbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBnZXREZWZhdWx0TGVuZ3RoKGluaXRpYWxSb3c6IFJvdyk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gaW5pdGlhbFJvdy5sZW5ndGggKiAyO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYSBuZXcgYmxvY2sgZm9yIHRoZSBjb250YWluZXJcbiAgICAgICAgICpcbiAgICAgICAgICogVXNlZCBieSBleHRlbmQoKSB3aGVuIGNyZWF0aW5nIHRoZSBjb250YWluZXIgb3IgaW5jcmVhc2luZyBpdHNcbiAgICAgICAgICogbGVuZ3RoLlxuICAgICAgICAgKiBAcGFyYW0gaW5pdGlhbFJvdyAgaW5pdGlhbCByb3cgZm9yIHRoZSBibG9ja1xuICAgICAgICAgKiBAcGFyYW0gaW5kZXggICAgICAgaW5kZXggb2YgYmxvY2sgaW4gY29udGFpbmVyXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlQmxvY2soaW5pdGlhbFJvdzogUm93LCBpbmRleDogbnVtYmVyKTogQWJzdHJhY3RTaXgge1xuICAgICAgICAgICAgcmV0dXJuIGluZGV4ICUgMlxuICAgICAgICAgICAgICAgID8gbmV3IFNsb3coaW5pdGlhbFJvdywgeydjb250YWluZXInOiB0aGlzLCAnaW5kZXgnOiBpbmRleH0pXG4gICAgICAgICAgICAgICAgOiBuZXcgUXVpY2soaW5pdGlhbFJvdywgeydjb250YWluZXInOiB0aGlzLCAnaW5kZXgnOiBpbmRleH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIExvd2VyIGxpbWl0IG9uIGxlbmd0aCBmb3IgdGhlIHBhcnRpY3VsYXIgY29uY3JldGUgY2xhc3NcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBtaW5MZW5ndGg6IG51bWJlciA9IDI7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVwcGVyIGxpbWl0IG9uIGxlbmd0aCBmb3IgdGhlIHBhcnRpY3VsYXIgY29uY3JldGUgY2xhc3NcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBtYXhMZW5ndGg6IG51bWJlciA9IDYwO1xuXG4gICAgICAgIC8qIENvdXJzZSBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWFkIGFjY2VzcyB0byB0aGUgc2l4ZXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBnZXRTaXhlczogKCkgPT4gQWJzdHJhY3RTaXhbXSA9IHRoaXMuZ2V0QmxvY2tzO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWFkIGFjY2VzcyB0byBhIHNpeFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGdldFNpeDogKGluZGV4OiBudW1iZXIpID0+IEFic3RyYWN0U2l4ID0gdGhpcy5nZXRCbG9jaztcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVzZXRzIHRoZSBjb3Vyc2UgdG8gYmUgdGhlIGRlZmF1bHQgbGVuZ3RoXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgcmVzZXRMZW5ndGgoKTogdGhpcyB7XG4gICAgICAgICAgICB0aGlzLnNldExlbmd0aCh0aGlzLmdldERlZmF1bHRMZW5ndGgodGhpcy5faW5pdGlhbFJvdykpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogTWFrZXMgdGhlIGNvdXJzZSBpbnRvIGEgcGxhaW4gY291cnNlXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgcmVzZXRDYWxscygpOiB0aGlzIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2l4IG9mIHRoaXMuX2Jsb2Nrcykge1xuICAgICAgICAgICAgICAgIHNpeC5zZXRDYWxsKENhbGwuUGxhaW4sIGZhbHNlKTsgIC8vIEF2b2lkIG11bHRpcGxlIHVwZGF0ZXMuLi5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gLi4uIGFuZCB0cmlnZ2VyIG9uZSBhdCB0aGUgZW5kXG4gICAgICAgICAgICB0aGlzLmdldFNpeCgxKS5zZXRDYWxsKENhbGwuUGxhaW4pO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVja3Mgd2hldGhlciB0aGlzIGlzIGEgcGxhaW4gY291cnNlXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgaXNQbGFpbigpOiBib29sZWFuIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2l4IG9mIHRoaXMuX2Jsb2Nrcykge1xuICAgICAgICAgICAgICAgIGlmIChzaXguZ2V0Q2FsbCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDbG9uZXMgdGhlIGNvdXJzZVxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGNsb25lKCk6IENvdXJzZSB7XG4gICAgICAgICAgICBjb25zdCBjbG9uZWQ6IENvdXJzZSA9IG5ldyBDb3Vyc2UodGhpcy5faW5pdGlhbFJvdyk7XG4gICAgICAgICAgICBjbG9uZWQuc2V0TGVuZ3RoKHRoaXMuZ2V0TGVuZ3RoKCkpO1xuXG4gICAgICAgICAgICAvLyBDb3B5IGFjcm9zcyBhbGwgdGhlIGNhbGxzXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDw9IHRoaXMuZ2V0TGVuZ3RoKCk7IGluZGV4ICs9IDEpIHtcbiAgICAgICAgICAgICAgICBjbG9uZWQuZ2V0U2l4KGluZGV4KS5zZXRDYWxsKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFNpeChpbmRleCkuZ2V0Q2FsbCgpLFxuICAgICAgICAgICAgICAgICAgICBmYWxzZSwgIC8vIEF2b2lkIG11bHRpcGxlIHVwZGF0ZXMuLi5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyAuLi4gYW5kIHRyaWdnZXIgb25lIGF0IHRoZSBlbmRcbiAgICAgICAgICAgIGNsb25lZC5nZXRTaXgoMSkuc2V0Q2FsbCh0aGlzLmdldFNpeCgxKS5nZXRDYWxsKCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gY2xvbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYSBuZXcgY291cnNlIGZyb20gYSBzdHJpbmcgcmVwcmVzZW50YXRpb25cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZnJvbVN0cmluZyhpbml0aWFsUm93OiBSb3csIGlucHV0OiBzdHJpbmcpOiBDb3Vyc2Uge1xuICAgICAgICAgICAgY29uc3QgY291cnNlOiBDb3Vyc2UgPSBuZXcgQ291cnNlKGluaXRpYWxSb3cpLFxuICAgICAgICAgICAgICAgIHBhdENvdXJzZUVuZDogc3RyaW5nID0gJ1swLTlhLXpdezMsMTV9JyxcbiAgICAgICAgICAgICAgICBwYXRDYWxsOiBzdHJpbmcgPSAnKD86XFxcXGR7MSwyfXxcXFxcZHsxLDJ9c3xzXFxcXGR7MSwyfSknLFxuICAgICAgICAgICAgICAgIHBhdFNlcDogc3RyaW5nID0gJ1tcXFxccy4sXSsnLFxuICAgICAgICAgICAgICAgIHBhdENhbGxpbmc6IHN0cmluZyA9IHBhdENhbGwgKyAnKD86JyArIHBhdFNlcCArIHBhdENhbGwgKyAnKSonLFxuICAgICAgICAgICAgICAgIHBhdFNpeGVzOiBzdHJpbmcgPSAnXFxcXCgoXFxcXGR7MSwyfSlbXlxcXFxkXFxcXCldKlxcXFwpJyxcbiAgICAgICAgICAgICAgICBwYXRBbGw6IHN0cmluZyA9ICcnXG4gICAgICAgICAgICAgICAgICAgICsgJ15cXFxccyonXG4gICAgICAgICAgICAgICAgICAgICsgJyg/OicgKyBwYXRDb3Vyc2VFbmQgKyAnXFxcXHMrKT8nXG4gICAgICAgICAgICAgICAgICAgICsgJygnICsgcGF0Q2FsbGluZyArICd8cCknICAvLyBncm91cCAxXG4gICAgICAgICAgICAgICAgICAgICsgJyg/OlxcXFxzKycgKyBwYXRTaXhlcyArICcpPycgIC8vIGdyb3VwIDIgaW4gaGVyZVxuICAgICAgICAgICAgICAgICAgICArICdcXFxccyokJyxcbiAgICAgICAgICAgICAgICByeEFsbDogUmVnRXhwID0gbmV3IFJlZ0V4cChwYXRBbGwsICdpJyksXG4gICAgICAgICAgICAgICAgbWF0Y2hlczogbnVsbCB8IHN0cmluZ1tdID0gcnhBbGwuZXhlYyhpbnB1dCk7XG5cbiAgICAgICAgICAgIGxldCBjYWxsczogc3RyaW5nW10sXG4gICAgICAgICAgICAgICAgaTogbnVtYmVyLFxuICAgICAgICAgICAgICAgIGNhbGw6IHN0cmluZztcblxuICAgICAgICAgICAgaWYgKCFtYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgaW1wb3J0IGNvdXJzZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTZWNvbmQgZ3JvdXAgbWF0Y2hlcyBsZW5ndGggb2YgY291cnNlXG4gICAgICAgICAgICBpZiAobWF0Y2hlc1syXSkge1xuICAgICAgICAgICAgICAgIGNvdXJzZS5zZXRMZW5ndGgocGFyc2VJbnQobWF0Y2hlc1syXSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJZiB0aGlzIGlzIGEgcGxhaW4gY291cnNlIHRoZW4gb3VyIGpvYiBpcyBkb25lXG4gICAgICAgICAgICBpZiAobWF0Y2hlc1sxXSA9PT0gJ3AnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHNwbGl0IHVwIHRoZSBjYWxsaW5nIGFuZCBwcm9jZXNzXG4gICAgICAgICAgICBjYWxscyA9IG1hdGNoZXNbMV0uc3BsaXQobmV3IFJlZ0V4cChwYXRTZXApKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYWxscy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGNhbGwgPSBjYWxsc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbC5jaGFyQXQoMCkgPT09ICdzJykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsID0gY2FsbC5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgY291cnNlLmdldFNpeChwYXJzZUludChjYWxsKSkuc2V0Q2FsbChDYWxsLlNpbmdsZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjYWxsLnNsaWNlKC0xKSA9PT0gJ3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGwgPSBjYWxsLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgICAgICAgICAgICAgY291cnNlLmdldFNpeChwYXJzZUludChjYWxsKSkuc2V0Q2FsbChDYWxsLlNpbmdsZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY291cnNlLmdldFNpeChwYXJzZUludChjYWxsKSkuc2V0Q2FsbChDYWxsLkJvYik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvdXJzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBET00gaGVscGVyIHV0aWxpdGllc1xuICAgICAqL1xuICAgIGV4cG9ydCBuYW1lc3BhY2UgRG9tIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29tcHV0ZXMgdGhlIHdpZHRoIG9mIGFuIGVsZW1lbnRcbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRXaWR0aChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQub2Zmc2V0V2lkdGggKyAxICAvLyBBbGxvdyBmb3IgZnJhY3Rpb25hbCBwYXJ0XG4gICAgICAgICAgICAgICAgKyBnZXRNZXRyaWMoZWxlbWVudCwgJ21hcmdpbkxlZnQnKVxuICAgICAgICAgICAgICAgICsgZ2V0TWV0cmljKGVsZW1lbnQsICdtYXJnaW5SaWdodCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbXB1dGVzIHRoZSBoZWlnaHQgb2YgYW4gZWxlbWVudFxuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIGdldEhlaWdodChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgMSAgLy8gQWxsb3cgZm9yIGZyYWN0aW9uYWwgcGFydFxuICAgICAgICAgICAgICAgICsgZ2V0TWV0cmljKGVsZW1lbnQsICdtYXJnaW5Ub3AnKVxuICAgICAgICAgICAgICAgICsgZ2V0TWV0cmljKGVsZW1lbnQsICdtYXJnaW5Cb3R0b20nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWFkcyBhIHN0eWxlLXJlbGF0ZWQgbWV0cmljIGZyb20gYW4gZWxlbWVudFxuICAgICAgICAgKiBEZXNpZ25lZCB0byByZWFkIGRpbWVuc2lvbnMgb2YgcGFkZGluZywgbWFyZ2lucywgZXRjLlxuICAgICAgICAgKiBWYWx1ZXMgb2YgXCJhdXRvXCIgYXJlIHJldHVybmVkIGFzIHplcm86IHNldCBleHBsaWNpdCB2YWx1ZXMgaW5cbiAgICAgICAgICogc3R5bGVzaGVldHMgaW4gb3JkZXIgdG8gYXZvaWQgdGhpcy5cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGdldE1ldHJpYyhlbGVtZW50OiBIVE1MRWxlbWVudCwgbWV0cmljOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICAgICAgbGV0IG1ldHJpY1RleHQ6IHN0cmluZztcbiAgICAgICAgICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xuICAgICAgICAgICAgICAgIG1ldHJpY1RleHQgPVxuICAgICAgICAgICAgICAgICAgICAoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSBhcyBhbnkpW21ldHJpY107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1ldHJpY1RleHQgPSAoZWxlbWVudCBhcyBhbnkpLmN1cnJlbnRTdHlsZVttZXRyaWNdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1ldHJpY1RleHQgPT09ICdhdXRvJyA/IDAgOiBwYXJzZUludChtZXRyaWNUZXh0KSArIDE7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJUZW1wbGF0ZUNvbnRleHQudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBDb250YWluZXIgZm9yIHRlbXBsYXRlc1xuICAgICAqXG4gICAgICogRGljdGlvbmFyeSBvZiB0ZW1wbGF0ZSBmdW5jdGlvbnMgdGhhdCBtYXAgZGF0YSB0byBhIHN0cmluZ1xuICAgICAqL1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YXJpYWJsZS1uYW1lXG4gICAgZXhwb3J0IGxldCBUZW1wbGF0ZXM6IHtcbiAgICAgICAgW2luZGV4OiBzdHJpbmddOiAoZGF0YTogVGVtcGxhdGVDb250ZXh0KSA9PiBzdHJpbmcsXG4gICAgfSA9IHsgfTtcbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vRG9tL21ldHJpY3MudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1N0YWdlLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9UZW1wbGF0ZXMudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBQcmlja2Vyc1xuICAgICAqIFNhZGx5IGZvciB0c2xpbnQsIHRoZXNlIHdpbGwgc2hhZG93IHRoZSB0b3AtbGV2ZWwgbmFtZXNwYWNlIHVudGlsIEkgY2FuXG4gICAgICogdGhpbmsgb2YgYSBiZXR0ZXIgbmFtZS5cbiAgICAgKi9cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc2hhZG93ZWQtdmFyaWFibGVcbiAgICBleHBvcnQgbmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFByaWNrZXIge1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENvbnN0cnVjdG9yXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBfaWZyYW1lPzogSFRNTElGcmFtZUVsZW1lbnQsXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAvLyBOT09QXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRXZlbnQgaGFuZGxlciBmb3Igd2luZG93Lm9ubG9hZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgYWJzdHJhY3Qgb25Mb2FkKCk6IHZvaWQ7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVzaXplcyB0aGUgcGFyZW50IGlmcmFtZSBpZiBvbmUgZXhpc3RzXG4gICAgICAgICAgICAgKiBNYXkgYmUgb3ZlcnJpZGRlbjsgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiB1c2VzIGVsZW1lbnRzIHRoYXQgYXJlXG4gICAgICAgICAgICAgKiBpbW1lZGlhdGUgY2hpbGRyZW4gb2YgdGhlIGJvZHkgZWxlbWVudCBhcyBmb2xsb3dzOlxuICAgICAgICAgICAgICogIC0gd2lkdGg6IHN1bSBvZiBhbGwgZWxlbWVudHMnIHdpZHRocyBhbmQgbWFyZ2luc1xuICAgICAgICAgICAgICogIC0gaGVpZ2h0OiBtYXhpbXVtIG9mIGFsbCBlbGVtZW50cycgaGVpZ2h0cyBhbmQgbWFyZ2luc1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcm90ZWN0ZWQgcmVzaXplKCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5faWZyYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0aGVEb2MgPSAodGhpcy5faWZyYW1lLmNvbnRlbnRXaW5kb3cgYXMgV2luZG93KS5kb2N1bWVudDtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50cyA9IHRoZURvYy5ib2R5LmNoaWxkcmVuO1xuICAgICAgICAgICAgICAgIGxldCB3aWR0aCA9IDA7XG4gICAgICAgICAgICAgICAgbGV0IGhlaWdodCA9IDA7XG5cbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLWZvci1vZlxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpID0gaSArIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGVsZW1lbnRzW2ldIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IHdpZHRoICsgRG9tLmdldFdpZHRoKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSBNYXRoLm1heChoZWlnaHQsIERvbS5nZXRIZWlnaHQoZWxlbWVudCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX2lmcmFtZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICB0aGlzLl9pZnJhbWUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBXcmFwcyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBhbmQgYWRkcyB0eXBlIGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByb3RlY3RlZCBnZXRFbDxUIGV4dGVuZHMgSFRNTEVsZW1lbnQ+KGlkOiBzdHJpbmcpOiBUIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aGVEb2MgPSB0aGlzLl9pZnJhbWVcbiAgICAgICAgICAgICAgICAgICAgPyAodGhpcy5faWZyYW1lLmNvbnRlbnRXaW5kb3cgYXMgV2luZG93KS5kb2N1bWVudFxuICAgICAgICAgICAgICAgICAgICA6IGRvY3VtZW50O1xuXG4gICAgICAgICAgICAgICAgLy8gSWdub3JlIHJpc2sgZWxlbWVudHMgbWF5IGJlIG51bGwgd2hlbiB1c2luZyBvdXIgb3duIHRlbXBsYXRlc1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGVEb2MuZ2V0RWxlbWVudEJ5SWQoaWQpIGFzIFQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkNoYW5nZXMudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkNvdXJzZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiUm93LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJTdGFnZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiVmlzaXRvci9BYnN0cmFjdC50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIEEgdG91Y2gsIGJlaW5nIGEgc2V0IG9mIGNvdXJzZXNcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgVG91Y2ggZXh0ZW5kcyBBYnN0cmFjdENvbnRhaW5lcjxDb3Vyc2U+IHtcblxuICAgICAgICAvKiBBYnN0cmFjdEJsb2NrIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVjZWl2ZXMgYSB2aXNpdG9yIHRoYXQgd2lsbCBiZSBjYWxsZWQgdG8gcHJvY2VzcyBlYWNoIHJvd1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGFjY2VwdCguLi52aXNpdG9yczogVmlzaXRvci5BYnN0cmFjdFZpc2l0b3JbXSk6IHRoaXMge1xuICAgICAgICAgICAgY29uc3Qgcm93OiBSb3cgPSB0aGlzLl9pbml0aWFsUm93LnNsaWNlKCk7XG5cbiAgICAgICAgICAgIENoYW5nZXMucGVybXV0ZTEocm93KTsgIC8vIEdvIGJhY2t3YXJkcyBvbmUgY2hhbmdlIGZyb20gX2luaXRpYWxSb3dcblxuICAgICAgICAgICAgZm9yIChjb25zdCB2aXNpdG9yIG9mIHZpc2l0b3JzKSB7XG4gICAgICAgICAgICAgICAgdmlzaXRvci52aXNpdChyb3cpO1xuICAgICAgICAgICAgICAgIHZpc2l0b3IudmlzaXQodGhpcy5faW5pdGlhbFJvdyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzdXBlci5hY2NlcHQoLi4udmlzaXRvcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVzdGltYXRlcyB0aGUgbnVtYmVyIG9mIHJvd3MgaW4gdGhlIGJsb2NrXG4gICAgICAgICAqIFRoZSBlc3RpbWF0ZSBkb2Vzbid0IHRha2UgaW50byBhY2NvdW50IGNvbWluZyByb3VuZCBwYXJ0LXdheSB0aHJvdWdoXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZXN0aW1hdGVSb3dzKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gMiArIHN1cGVyLmVzdGltYXRlUm93cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogUHJpbnRhYmxlTWl4aW4gbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBhdGggZm9yIHRoaXMgY2xhc3MnIHRlbXBsYXRlc1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHRlbXBsYXRlUGF0aDogc3RyaW5nID0gJ1RvdWNoJztcblxuICAgICAgICAvKiBBYnN0cmFjdENvbnRhaW5lciBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBsZW5ndGggb2YgbmV3IGNvbnRhaW5lcnMgb2YgdGhpcyB0eXBlXG4gICAgICAgICAqXG4gICAgICAgICAqIERlcml2ZWQgY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgaWYgcmVxdWlyZWQuXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdExlbmd0aChpbml0aWFsUm93OiBSb3cpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBibG9jayBmb3IgdGhlIGNvbnRhaW5lclxuICAgICAgICAgKlxuICAgICAgICAgKiBVc2VkIGJ5IGV4dGVuZCgpIHdoZW4gY3JlYXRpbmcgdGhlIGNvbnRhaW5lciBvciBpbmNyZWFzaW5nIGl0c1xuICAgICAgICAgKiBsZW5ndGguXG4gICAgICAgICAqIEBwYXJhbSBpbml0aWFsUm93ICBpbml0aWFsIHJvdyBmb3IgdGhlIGJsb2NrXG4gICAgICAgICAqIEBwYXJhbSBpbmRleCAgICAgICBpbmRleCBvZiBibG9jayBpbiBjb250YWluZXJcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBjcmVhdGVCbG9jayhpbml0aWFsUm93OiBSb3csIGluZGV4OiBudW1iZXIpOiBDb3Vyc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb3Vyc2UoaW5pdGlhbFJvdywgeydjb250YWluZXInOiB0aGlzLCAnaW5kZXgnOiBpbmRleH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIExvd2VyIGxpbWl0IG9uIGxlbmd0aCBmb3IgdGhlIHBhcnRpY3VsYXIgY29uY3JldGUgY2xhc3NcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBtaW5MZW5ndGg6IG51bWJlciA9IDA7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVwcGVyIGxpbWl0IG9uIGxlbmd0aCBmb3IgdGhlIHBhcnRpY3VsYXIgY29uY3JldGUgY2xhc3NcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBtYXhMZW5ndGg6IG51bWJlciA9IDEwMDtcblxuICAgICAgICAvKiBUb3VjaCBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVhZCBhY2Nlc3MgdG8gdGhlIGNvdXJzZXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBnZXRDb3Vyc2VzOiAoKSA9PiBDb3Vyc2VbXSA9IHRoaXMuZ2V0QmxvY2tzO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWFkIGFjY2VzcyB0byBhIGNvdXJzZVxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGdldENvdXJzZTogKGluZGV4OiBudW1iZXIpID0+IENvdXJzZSA9IHRoaXMuZ2V0QmxvY2s7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluc2VydHMgYSBjb3Vyc2UgYXQgdGhlIHNwZWNpZmllZCBpbmRleFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGluc2VydENvdXJzZShpbmRleDogbnVtYmVyLCBjb3Vyc2U6IENvdXJzZSk6IHRoaXMge1xuICAgICAgICAgICAgdGhpcy5fYmxvY2tzLnNwbGljZShpbmRleCAtIDEsIDAsIGNvdXJzZSk7XG4gICAgICAgICAgICB0aGlzLmZpeHVwT3duZXJzaGlwKGluZGV4KTtcblxuICAgICAgICAgICAgdGhpcy5ub3RpZnkoaW5kZXggLSAxKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlbGV0ZXMgdGhlIGNvdXJzZSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZGVsZXRlQ291cnNlKGluZGV4OiBudW1iZXIpOiBDb3Vyc2Uge1xuICAgICAgICAgICAgY29uc3QgY291cnNlOiBDb3Vyc2UgPSB0aGlzLmdldENvdXJzZShpbmRleCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2Jsb2Nrcy5zcGxpY2UoaW5kZXggLSAxLCAxKTtcbiAgICAgICAgICAgIGNvdXJzZS5jbGVhck93bmVyc2hpcCgpO1xuICAgICAgICAgICAgdGhpcy5maXh1cE93bmVyc2hpcChpbmRleCk7XG5cbiAgICAgICAgICAgIHRoaXMubm90aWZ5KGluZGV4IC0gMSk7XG4gICAgICAgICAgICByZXR1cm4gY291cnNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhlbHBlciB0byBmaXh1cCBvd25lcnNoaXAgb2YgYmxvY2tzXG4gICAgICAgICAqL1xuICAgICAgICBwcml2YXRlIGZpeHVwT3duZXJzaGlwKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IGluZGV4OyBpIDw9IHRoaXMuZ2V0TGVuZ3RoKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q291cnNlKGkpLnNldE93bmVyc2hpcCh7J2NvbnRhaW5lcic6IHRoaXMsICdpbmRleCc6IGl9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IHRvdWNoIGZyb20gYSBzdHJpbmcgcmVwcmVzZW50YXRpb25cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZnJvbVN0cmluZyhpbnB1dDogc3RyaW5nKTogVG91Y2gge1xuICAgICAgICAgICAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gaW5wdXQuc3BsaXQoJ1xcbicpO1xuXG4gICAgICAgICAgICBsZXQgaTogbnVtYmVyLFxuICAgICAgICAgICAgICAgIGxpbmU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICBjb3Vyc2U6IENvdXJzZSxcbiAgICAgICAgICAgICAgICB0b3VjaDogVG91Y2ggfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIC8vIFByb2Nlc3MgZWFjaCBpbnB1dCBsaW5lLCBtYWtpbmcgdGV4dCBzdWJzdGl0dXRpb25zXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBsaW5lID0gbGluZXNbaV07XG5cbiAgICAgICAgICAgICAgICAvLyBEcm9wIGFueSBjb250ZW50IGFmdGVyIGNvbW1lbnQgY2hhcmFjdGVycyBcIi8vXCJcbiAgICAgICAgICAgICAgICBsaW5lID0gbGluZS5yZXBsYWNlKC9cXC9cXC8uKiQvLCAnJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBJZ25vcmUgYSBtaWNyb3NpcmlsIGNvbW1lbnQgXCIvXCIgYXQgdGhlIHN0YXJ0IG9mIGEgbGluZVxuICAgICAgICAgICAgICAgIGxpbmUgPSBsaW5lLnJlcGxhY2UoL15cXC8vLCAnJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBTa2lwIHRoaXMgbGluZSBpZiBpdCdzIGJsYW5rXG4gICAgICAgICAgICAgICAgaWYgKC9eXFxzKiQvLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCF0b3VjaCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgdGhlIHRvdWNoIHdpdGggYSBzdGFnZSBiYXNlZCBvbiB0aGUgZmlyc3QgbGluZVxuICAgICAgICAgICAgICAgICAgICBsaW5lID0gbGluZS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIVN0YWdlW2xpbmUubGVuZ3RoXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgcmVjb2duaXNlIHN0YWdlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdG91Y2ggPSBuZXcgVG91Y2gocm93RnJvbVN0cmluZygnMjMxJywgbGluZS5sZW5ndGgpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBjb3Vyc2UgZm9yIGVhY2ggcmVtYWluaW5nIGxpbmVcbiAgICAgICAgICAgICAgICAgICAgY291cnNlID0gQ291cnNlLmZyb21TdHJpbmcodG91Y2guZ2V0RW5kKCksIGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICB0b3VjaC5pbnNlcnRDb3Vyc2UodG91Y2guZ2V0TGVuZ3RoKCkgKyAxLCBjb3Vyc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0b3VjaCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gaW5wdXQgbGluZXMnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRvdWNoO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9QcmludGFibGVNaXhpblwiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIE11c2ljIGNsYXNzZXMgdG8gYW5hbHlzZSByb3dzXG4gICAgICovXG4gICAgZXhwb3J0IG5hbWVzcGFjZSBNdXNpYyB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEludGVyZmFjZSBzdXBwb3J0ZWQgYnkgY2xhc3NlcyB0aGF0IGNhbiBtYXRjaCBhIHJvdyBmb3IgbXVzaWNcbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBpbnRlcmZhY2UgTWF0Y2hlckludGVyZmFjZSBleHRlbmRzIFByaW50YWJsZU1peGluIHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBNYXRjaGVzIGEgcm93IHN0cmluZ1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBtYXRjaChyb3c6IHN0cmluZyk6IGJvb2xlYW47XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUHJvdmlkZXMgcmVhZCBhY2Nlc3MgdG8gdGhlIG5hbWVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZ2V0TmFtZSgpOiBzdHJpbmc7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUHJvdmlkZXMgcmVhZCBhY2Nlc3MgdG8gdGhlIGNvdW50IG9mIG1hdGNoZXNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZ2V0TWF0Y2hDb3VudCgpOiBudW1iZXI7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3Jvd0Zyb21TdHJpbmcudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1N0YWdlLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9zdHJpbmdGcm9tUm93LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJNYXRjaGVySW50ZXJmYWNlLnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogTXVzaWMgY2xhc3NlcyB0byBhbmFseXNlIHJvd3NcbiAgICAgKi9cbiAgICBleHBvcnQgbmFtZXNwYWNlIE11c2ljIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWJzdHJhY3QgbXVzaWMgbWF0Y2hpbmcgc2NoZW1lXG4gICAgICAgICAqL1xuICAgICAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RTY2hlbWUgaW1wbGVtZW50cyBNYXRjaGVySW50ZXJmYWNlIHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBNYXRjaGVycyBmb3IgdGhpcyBzY2hlbWVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJvdGVjdGVkIF9tYXRjaGVyczogTWF0Y2hlckludGVyZmFjZVtdO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENvbnN0cnVjdG9yXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfc3RhZ2U6IFN0YWdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWF0Y2hlcnMgPSB0aGlzLmNyZWF0ZU1hdGNoZXJzKFxuICAgICAgICAgICAgICAgICAgICBzdHJpbmdGcm9tUm93KHJvd0Zyb21TdHJpbmcoJycsIF9zdGFnZSkpLCAgLy8gcm91bmRzXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogTWF0Y2hlckludGVyZmFjZSBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBNYXRjaGVzIGEgcm93IHN0cmluZ1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgbWF0Y2gocm93OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1hdGNoZXIgb2YgdGhpcy5fbWF0Y2hlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtYXRjaGVyKSB7IGNvbnRpbnVlOyB9ICAvLyBJRTggdHJhaWxpbmcgY29tbWFcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FsbCBtYXRjaGVyLm1hdGNoIGV4cGxpY2l0bHkuLi5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93UmVzdWx0OiBib29sZWFuID0gbWF0Y2hlci5tYXRjaChyb3cpO1xuICAgICAgICAgICAgICAgICAgICAvLyAuLi4gbm90IGluIGhlcmUsIG9yIHx8IHdpbGwgc2hvcnQtY2lyY3VpdCBpdFxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgfHwgcm93UmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUHJvdmlkZXMgcmVhZCBhY2Nlc3MgdG8gdGhlIG5hbWVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIGFic3RyYWN0IGdldE5hbWUoKTogc3RyaW5nO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFByb3ZpZGVzIHJlYWQgYWNjZXNzIHRvIHRoZSBjb3VudCBvZiBtYXRjaGVzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBnZXRNYXRjaENvdW50KCk6IG51bWJlciB7XG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoZXM6IG51bWJlciA9IDA7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1hdGNoZXIgb2YgdGhpcy5fbWF0Y2hlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtYXRjaGVyKSB7IGNvbnRpbnVlOyB9ICAvLyBJRTggdHJhaWxpbmcgY29tbWFcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcyArPSBtYXRjaGVyLmdldE1hdGNoQ291bnQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogUHJpbnRhYmxlTWl4aW4gbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZW5kZXJzIHRoZSBvYmplY3Qgd2l0aCBhIHRlbXBsYXRlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBwcmludDogKHQ6IHN0cmluZywgYz86IFRlbXBsYXRlQ29udGV4dCkgPT4gc3RyaW5nO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFBhdGggZm9yIHRoaXMgY2xhc3MnIHRlbXBsYXRlc1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdGVtcGxhdGVQYXRoOiBzdHJpbmcgPSAnTXVzaWMuQWJzdHJhY3RTY2hlbWUnO1xuXG4gICAgICAgICAgICAvKiBBYnN0cmFjdFNjaGVtZSBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENyZWF0ZSBtYXRjaGVycyBmb3IgdGhpcyBzY2hlbWUvc3RhZ2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IGNyZWF0ZU1hdGNoZXJzKFxuICAgICAgICAgICAgICAgIHJvdW5kczogc3RyaW5nLFxuICAgICAgICAgICAgKTogTWF0Y2hlckludGVyZmFjZVtdO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFByb3ZpZGVzIHJlYWQgYWNjZXNzIHRvIHRoZSBtYXRjaGVyc1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgZ2V0TWF0Y2hlcnMoKTogTWF0Y2hlckludGVyZmFjZVtdIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWF0Y2hlcnMuc2xpY2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgUHJpbnRhYmxlTWl4aW4ubWFrZVByaW50YWJsZShBYnN0cmFjdFNjaGVtZSk7XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBNdXNpYyBjbGFzc2VzIHRvIGFuYWx5c2Ugcm93c1xuICAgICAqL1xuICAgIGV4cG9ydCBuYW1lc3BhY2UgTXVzaWMge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUeXBlcyBvZiBtdXNpYyBtYXRjaGluZ1xuICAgICAgICAgKiBAZW51bSB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGVudW0gTWF0Y2hUeXBlIHtCYWNrID0gLTEsIFJvdywgRnJvbnR9XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vVGVtcGxhdGVDb250ZXh0LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJNYXRjaGVySW50ZXJmYWNlLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJNYXRjaFR5cGUudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBNdXNpYyBjbGFzc2VzIHRvIGFuYWx5c2Ugcm93c1xuICAgICAqL1xuICAgIGV4cG9ydCBuYW1lc3BhY2UgTXVzaWMge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQYXR0ZXJuIHRoYXQgY2FuIGJlIHVzZWQgdG8gbWF0Y2ggcm93c1xuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGNsYXNzIFBhdHRlcm4gaW1wbGVtZW50cyBNYXRjaGVySW50ZXJmYWNlIHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBDb3VudCBvZiBtYXRjaGVzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByb3RlY3RlZCBfbWF0Y2hDb3VudDogbnVtYmVyID0gMDtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAgICAgICAgICogQHBhcmFtIHBhdHRlcm4gIHN0cmluZyB0byBtYXRjaFxuICAgICAgICAgICAgICogQHBhcmFtIG5hbWUgICAgIG5hbWUgb2YgdGhpcyBwYXR0ZXJuXG4gICAgICAgICAgICAgKiBAcGFyYW0gdHlwZSAgICAgdHlwZSBvZiBtYXRjaFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgX3BhdHRlcm46IHN0cmluZyxcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgX25hbWU/OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIF90eXBlOiBNYXRjaFR5cGUgPSBNYXRjaFR5cGUuQmFjayxcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIC8vIE5PT1BcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogTWF0Y2hlckludGVyZmFjZSBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBNYXRjaGVzIGEgcm93IHN0cmluZ1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgbWF0Y2gocm93OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdHlwZSA9PT0gTWF0Y2hUeXBlLkJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gcm93LnNsaWNlKC10aGlzLl9wYXR0ZXJuLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl90eXBlID09PSBNYXRjaFR5cGUuRnJvbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gcm93LnNsaWNlKDAsIHRoaXMuX3BhdHRlcm4ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocm93ID09PSB0aGlzLl9wYXR0ZXJuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hdGNoQ291bnQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFByb3ZpZGVzIHJlYWQgYWNjZXNzIHRvIHRoZSBuYW1lXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX25hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcGF0dGVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUHJvdmlkZXMgcmVhZCBhY2Nlc3MgdG8gdGhlIGNvdW50IG9mIG1hdGNoZXNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIGdldE1hdGNoQ291bnQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWF0Y2hDb3VudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogUHJpbnRhYmxlTWl4aW4gbWV0aG9kcyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZW5kZXJzIHRoZSBvYmplY3Qgd2l0aCBhIHRlbXBsYXRlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBwcmludDogKHQ6IHN0cmluZywgYz86IFRlbXBsYXRlQ29udGV4dCkgPT4gc3RyaW5nO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFBhdGggZm9yIHRoaXMgY2xhc3MnIHRlbXBsYXRlc1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdGVtcGxhdGVQYXRoOiBzdHJpbmcgPSAnTXVzaWMuUGF0dGVybic7XG5cbiAgICAgICAgICAgIC8qIFBhdHRlcm4gbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoaXMgaXMgYSB3aWxkY2FyZCBtYXRjaFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgaXNXaWxkY2FyZE1hdGNoKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90eXBlICE9PSBNYXRjaFR5cGUuUm93O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBQcmludGFibGVNaXhpbi5tYWtlUHJpbnRhYmxlKFBhdHRlcm4pO1xuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1RlbXBsYXRlQ29udGV4dC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiTWF0Y2hlckludGVyZmFjZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiUGF0dGVybi50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIE11c2ljIGNsYXNzZXMgdG8gYW5hbHlzZSByb3dzXG4gICAgICovXG4gICAgZXhwb3J0IG5hbWVzcGFjZSBNdXNpYyB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdyb3VwIG9mIHNpbWlsYXIgcGF0dGVybnMgdG8gbWF0Y2ggcmVsYXRlZCByb3dzXG4gICAgICAgICAqL1xuICAgICAgICBleHBvcnQgY2xhc3MgUGF0dGVybkdyb3VwIGltcGxlbWVudHMgTWF0Y2hlckludGVyZmFjZSB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUGF0dGVybnMgaW4gdGhpcyBncm91cFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcm90ZWN0ZWQgX3BhdHRlcm5zOiBQYXR0ZXJuW107XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ29uc3RydWN0b3JcbiAgICAgICAgICAgICAqIEBwYXJhbSBuYW1lICAgICAgICAgICBuYW1lIG9mIHRoaXMgcGF0dGVybiBncm91cFxuICAgICAgICAgICAgICogQHBhcmFtIHBhdHRlcm5zICAgICAgIHBhdHRlcm5zIGluIHRoaXMgZ3JvdXBcbiAgICAgICAgICAgICAqIEBwYXJhbSBwYXJlbnRQYXR0ZXJuICB0b3AtbGV2ZWwgcGF0dGVybiBmb3IgY291bnRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY29uc3RydWN0b3IoXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIF9uYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcGF0dGVybnM6IFBhdHRlcm5bXSxcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgX3BhcmVudFBhdHRlcm4/OiBQYXR0ZXJuLFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGF0dGVybnMgPSBwYXR0ZXJucy5zbGljZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKiBNYXRjaGVySW50ZXJmYWNlIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIE1hdGNoZXMgYSByb3cgc3RyaW5nXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBtYXRjaChyb3c6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcGF0dGVybiBvZiB0aGlzLl9wYXR0ZXJucykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXBhdHRlcm4pIHsgY29udGludWU7IH0gIC8vIElFOCB0cmFpbGluZyBjb21tYVxuICAgICAgICAgICAgICAgICAgICAvLyBDYWxsIHBhdHRlcm4ubWF0Y2ggZXhwbGljaXRseS4uLlxuICAgICAgICAgICAgICAgICAgICBjb25zdCByb3dSZXN1bHQ6IGJvb2xlYW4gPSBwYXR0ZXJuLm1hdGNoKHJvdyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIC4uLiBub3QgaW4gaGVyZSwgb3IgfHwgd2lsbCBzaG9ydC1jaXJjdWl0IGl0XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCByb3dSZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3BhcmVudFBhdHRlcm4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50UGF0dGVybi5tYXRjaChyb3cpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUHJvdmlkZXMgcmVhZCBhY2Nlc3MgdG8gdGhlIG5hbWVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIGdldE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBQcm92aWRlcyByZWFkIGFjY2VzcyB0byB0aGUgY291bnQgb2YgbWF0Y2hlc1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgZ2V0TWF0Y2hDb3VudCgpOiBudW1iZXIge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wYXJlbnRQYXR0ZXJuKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnRQYXR0ZXJuLmdldE1hdGNoQ291bnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3VibWF0Y2hDb3VudCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKiBQcmludGFibGVNaXhpbiBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlbmRlcnMgdGhlIG9iamVjdCB3aXRoIGEgdGVtcGxhdGVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIHByaW50OiAodDogc3RyaW5nLCBjPzogVGVtcGxhdGVDb250ZXh0KSA9PiBzdHJpbmc7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUGF0aCBmb3IgdGhpcyBjbGFzcycgdGVtcGxhdGVzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSB0ZW1wbGF0ZVBhdGg6IHN0cmluZyA9ICdNdXNpYy5QYXR0ZXJuR3JvdXAnO1xuXG4gICAgICAgICAgICAvKiBQYXR0ZXJuR3JvdXAgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFByb3ZpZGVzIHJlYWQgYWNjZXNzIHRvIHRoZSBwYXR0ZXJuc1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgZ2V0UGF0dGVybnMoKTogUGF0dGVybltdIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcGF0dGVybnMuc2xpY2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBQcm92aWRlcyByZWFkIGFjY2VzcyB0byB0aGUgY291bnQgb2YgbWF0Y2hlcyB3aXRoaW4gcGF0dGVybnNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIGdldFN1Ym1hdGNoQ291bnQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2hlczogbnVtYmVyID0gMDtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcGF0dGVybiBvZiB0aGlzLl9wYXR0ZXJucykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXBhdHRlcm4pIHsgY29udGludWU7IH0gIC8vIElFOCB0cmFpbGluZyBjb21tYVxuICAgICAgICAgICAgICAgICAgICBtYXRjaGVzICs9IHBhdHRlcm4uZ2V0TWF0Y2hDb3VudCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaGVzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBQcmludGFibGVNaXhpbi5tYWtlUHJpbnRhYmxlKFBhdHRlcm5Hcm91cCk7XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vKiB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGggKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1N0YWdlLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJBYnN0cmFjdFNjaGVtZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiTWF0Y2hUeXBlLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJQYXR0ZXJuLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJQYXR0ZXJuR3JvdXAudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBNdXNpYyBjbGFzc2VzIHRvIGFuYWx5c2Ugcm93c1xuICAgICAqL1xuICAgIGV4cG9ydCBuYW1lc3BhY2UgTXVzaWMge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNQkQtc3R5bGUgbXVzaWMgbWF0Y2hpbmcgc2NoZW1lXG4gICAgICAgICAqL1xuICAgICAgICBleHBvcnQgY2xhc3MgTWJkU2NoZW1lIGV4dGVuZHMgQWJzdHJhY3RTY2hlbWUge1xuXG4gICAgICAgICAgICAvKiBNYXRjaGVySW50ZXJmYWNlIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFByb3ZpZGVzIHJlYWQgYWNjZXNzIHRvIHRoZSBuYW1lXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdNQkQgc2NoZW1lJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogQWJzdHJhY3RTY2hlbWUgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBDcmVhdGUgbWF0Y2hlcnMgZm9yIHRoaXMgc2NoZW1lL3N0YWdlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByb3RlY3RlZCBjcmVhdGVNYXRjaGVycyhyb3VuZHM6IHN0cmluZyk6IE1hdGNoZXJJbnRlcmZhY2VbXSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hlcnM6IE1hdGNoZXJJbnRlcmZhY2VbXSA9IFsgXTtcbiAgICAgICAgICAgICAgICBsZXQgcGF0dGVybjogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuQXJyYXk6IFBhdHRlcm5bXTtcblxuICAgICAgICAgICAgICAgIC8vIDU2Nzg5MEVcbiAgICAgICAgICAgICAgICBwYXR0ZXJuID0gcm91bmRzLnNsaWNlKDQgLSB0aGlzLl9zdGFnZSk7XG4gICAgICAgICAgICAgICAgbWF0Y2hlcnMucHVzaChuZXcgUGF0dGVybihwYXR0ZXJuKSk7XG5cbiAgICAgICAgICAgICAgICAvLyA1Njc4OUUwXG4gICAgICAgICAgICAgICAgcGF0dGVybiA9IHJvdW5kcy5zbGljZSg0IC0gdGhpcy5fc3RhZ2UsIC0yKVxuICAgICAgICAgICAgICAgICAgICArIHJvdW5kcy5zbGljZSgtMSlcbiAgICAgICAgICAgICAgICAgICAgKyByb3VuZHMuc2xpY2UoLTIsIC0xKTtcbiAgICAgICAgICAgICAgICBtYXRjaGVycy5wdXNoKG5ldyBQYXR0ZXJuKHBhdHRlcm4pKTtcblxuICAgICAgICAgICAgICAgIC8vIDY1Nzg5MEVcbiAgICAgICAgICAgICAgICBwYXR0ZXJuID0gJzY1JyArIHJvdW5kcy5zbGljZSg2IC0gdGhpcy5fc3RhZ2UpO1xuICAgICAgICAgICAgICAgIG1hdGNoZXJzLnB1c2gobmV3IFBhdHRlcm4ocGF0dGVybikpO1xuXG4gICAgICAgICAgICAgICAgLy8gTmVhciBtaXNzZXNcbiAgICAgICAgICAgICAgICBwYXR0ZXJuQXJyYXkgPSBbIF07XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IHRoaXMuX3N0YWdlIC0gMTsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm4gPSByb3VuZHMuc2xpY2UoMCwgaSkgIC8vIDEyM1xuICAgICAgICAgICAgICAgICAgICAgICAgKyByb3VuZHMuY2hhckF0KGkgKyAxKSAgICAvLyA1XG4gICAgICAgICAgICAgICAgICAgICAgICArIHJvdW5kcy5jaGFyQXQoaSkgICAgICAgIC8vIDRcbiAgICAgICAgICAgICAgICAgICAgICAgICsgcm91bmRzLnNsaWNlKGkgKyAyKTsgICAgLy8gNjc4OTBFXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm5BcnJheS5wdXNoKG5ldyBQYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdW5kcy5jaGFyQXQoaSArIDEpICsgcm91bmRzLmNoYXJBdChpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGNoVHlwZS5Sb3csXG4gICAgICAgICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtYXRjaGVycy5wdXNoKG5ldyBQYXR0ZXJuR3JvdXAoJ25lYXIgbWlzc2VzJywgcGF0dGVybkFycmF5KSk7XG5cbiAgICAgICAgICAgICAgICAvLyBRdWVlbnMgbXVzaWNcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6c3dpdGNoLWRlZmF1bHRcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX3N0YWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU3RhZ2UuVHJpcGxlczpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXJzLnB1c2gobmV3IFBhdHRlcm5Hcm91cChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnNDY4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCcyNDYnLCAnMjQ2OCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignNzUzNDYnLCAnNzUzNDY4JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCcxMzU3MjQ2JywgJ1F1ZWVucycsIE1hdGNoVHlwZS5Sb3cpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignNzUzMTI0NicsICdSZXZlcnNlIFF1ZWVucycsIE1hdGNoVHlwZS5Sb3cpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMTI3NTM0NicsICdXaGl0dGluZ3RvbnMnLCBNYXRjaFR5cGUuUm93KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCc0NicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIFN0YWdlLkNhdGVyczpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXJzLnB1c2gobmV3IFBhdHRlcm5Hcm91cChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnNjgwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCc0NjgnLCAnNDY4MCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignOTc1NjgnLCAnOTc1NjgwJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCcxMzU3OTI0NjgnLCAnUXVlZW5zJywgTWF0Y2hUeXBlLlJvdyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCc5NzUzMTI0NjgnLCAnUmV2ZXJzZSBRdWVlbnMnLCBNYXRjaFR5cGUuUm93KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzEyMzQ5NzU2OCcsICdXaGl0dGluZ3RvbnMnLCBNYXRjaFR5cGUuUm93KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCc2OCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIFN0YWdlLkNpbnF1ZXM6XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVycy5wdXNoKG5ldyBQYXR0ZXJuR3JvdXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzgwVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignNjgwJywgJzY4MFQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJ0U5NzgwJywgJ0U5NzgwVCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMTM1NzlFMjQ2ODAnLCAnUXVlZW5zJywgTWF0Y2hUeXBlLlJvdyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCdFOTc1MzEyNDY4MCcsICdSZXZlcnNlIFF1ZWVucycsIE1hdGNoVHlwZS5Sb3cpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignNTMxMjQ2RTk3ODAnLCAnRG91YmxlIFdoaXR0aW5ndG9ucycsIE1hdGNoVHlwZS5Sb3cpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzgwJyksXG4gICAgICAgICAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU3RhZ2UuU2V4dHVwbGVzOlxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcnMucHVzaChuZXcgUGF0dGVybkdyb3VwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcwVEInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzgwVCcsICc4MFRCJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCdBRTkwVCcsICdBRTkwVEInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzEzNTc5RUEyNDY4MFQnLCAnUXVlZW5zJywgTWF0Y2hUeXBlLlJvdyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCdBRTk3NTMxMjQ2ODBUJywgJ1JldmVyc2UgUXVlZW5zJywgTWF0Y2hUeXBlLlJvdyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMFQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTdGFnZS5TZXB0dXBsZXM6XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVycy5wdXNoKG5ldyBQYXR0ZXJuR3JvdXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1RCJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCcwVEInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJ0NBRVRCJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCcxMzU3OUVBQzI0NjgwVEInLCAnUXVlZW5zJywgTWF0Y2hUeXBlLlJvdyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCdDQUU5NzUzMTI0NjgwVEInLCAnUmV2ZXJzZSBRdWVlbnMnLCBNYXRjaFR5cGUuUm93KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCdUQicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtYXRjaGVycy5wdXNoKG5ldyBQYXR0ZXJuR3JvdXAoXG4gICAgICAgICAgICAgICAgICAgICdmcm9udCBMQjUnLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMTIzNDUnLCAnMTIzNDUnLCBNYXRjaFR5cGUuRnJvbnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzU0MzIxJywgJzU0MzIxJywgTWF0Y2hUeXBlLkZyb250KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCcyMzQ1NicsICcyMzQ1NicsIE1hdGNoVHlwZS5Gcm9udCksXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignNjU0MzInLCAnNjU0MzInLCBNYXRjaFR5cGUuRnJvbnQpLFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICkpO1xuXG4gICAgICAgICAgICAgICAgbWF0Y2hlcnMucHVzaChuZXcgUGF0dGVybkdyb3VwKFxuICAgICAgICAgICAgICAgICAgICAnYmFjayBMQjUnLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMTIzNDUnLCAnMTIzNDUnLCBNYXRjaFR5cGUuQmFjayksXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignNTQzMjEnLCAnNTQzMjEnLCBNYXRjaFR5cGUuQmFjayksXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMjM0NTYnLCAnMjM0NTYnLCBNYXRjaFR5cGUuQmFjayksXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignNjU0MzInLCAnNjU0MzInLCBNYXRjaFR5cGUuQmFjayksXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgKSk7XG5cbiAgICAgICAgICAgICAgICBtYXRjaGVycy5wdXNoKG5ldyBQYXR0ZXJuR3JvdXAoXG4gICAgICAgICAgICAgICAgICAgICdmcm9udCBMQjQnLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMTIzNCcsICcxMjM0JywgTWF0Y2hUeXBlLkZyb250KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCc0MzIxJywgJzQzMjEnLCBNYXRjaFR5cGUuRnJvbnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzIzNDUnLCAnMjM0NScsIE1hdGNoVHlwZS5Gcm9udCksXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignNTQzMicsICc1NDMyJywgTWF0Y2hUeXBlLkZyb250KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCczNDU2JywgJzM0NTYnLCBNYXRjaFR5cGUuRnJvbnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzY1NDMnLCAnNjU0MycsIE1hdGNoVHlwZS5Gcm9udCksXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgKSk7XG5cbiAgICAgICAgICAgICAgICBtYXRjaGVycy5wdXNoKG5ldyBQYXR0ZXJuR3JvdXAoXG4gICAgICAgICAgICAgICAgICAgICdiYWNrIExCNCcsXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCcxMjM0JywgJzEyMzQnLCBNYXRjaFR5cGUuQmFjayksXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignNDMyMScsICc0MzIxJywgTWF0Y2hUeXBlLkJhY2spLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzIzNDUnLCAnMjM0NScsIE1hdGNoVHlwZS5CYWNrKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCc1NDMyJywgJzU0MzInLCBNYXRjaFR5cGUuQmFjayksXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMzQ1NicsICczNDU2JywgTWF0Y2hUeXBlLkJhY2spLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzY1NDMnLCAnNjU0MycsIE1hdGNoVHlwZS5CYWNrKSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICApKTtcblxuICAgICAgICAgICAgICAgIC8vIFJldmVyc2Ugcm9sbHVwc1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdGFnZSA9PT0gU3RhZ2UuVHJpcGxlcykge1xuICAgICAgICAgICAgICAgICAgICBtYXRjaGVycy5wdXNoKG5ldyBQYXR0ZXJuR3JvdXAoJ3JldmVyc2Ugcm9sbHVwcycsIFtuZXcgUGF0dGVybignNzY1NCcpXSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm5BcnJheSA9IFsgXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gdGhpcy5fc3RhZ2UgLSA4OyBpID49IDA7IGkgLT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmV2ZXJzZSByb3VuZHNcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm4gPSByb3VuZHMuc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm4gPSBwYXR0ZXJuLnNsaWNlKGksIGkgKyA0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm5BcnJheS5wdXNoKG5ldyBQYXR0ZXJuKHBhdHRlcm4pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBtYXRjaGVycy5wdXNoKG5ldyBQYXR0ZXJuR3JvdXAoJ3JldmVyc2Ugcm9sbHVwcycsIHBhdHRlcm5BcnJheSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaGVycztcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9BYnN0cmFjdFNpeC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vUm93LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJBYnN0cmFjdC50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIFZpc2l0b3IgY2xhc3NlcyB0byBhbmFseXNlIGJsb2Nrc1xuICAgICAqL1xuICAgIGV4cG9ydCBuYW1lc3BhY2UgVmlzaXRvciB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNpbXBsZSB2aXNpdG9yIHRoYXQgY291bnRzIHJvd3NcbiAgICAgICAgICpcbiAgICAgICAgICogQWNjdW11bGF0ZXMgYSBjb3VudCBvZiByb3dzIHRoYXQgaXMgaW5jcmVtZW50ZWQgYnkgZWFjaCBjYWxsIHRvXG4gICAgICAgICAqIFtbdmlzaXRdXS5cbiAgICAgICAgICogVGhpcyB2aXNpdG9yIGFsbG93cyB0aGUgY291bnQgb2Ygcm93cyBpbiBhIHRvdWNoIGJlY2F1c2Ugcm93cyBhcmUgbm90XG4gICAgICAgICAqIHByb2Nlc3NlZCBhZnRlciByb3VuZHMgaGFzIGJlZW4gcmVhY2hlZC5cbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBjbGFzcyBDb3VudGVyIGV4dGVuZHMgQWJzdHJhY3RWaXNpdG9yIHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBDb3VudCBvZiByb3dzIHRoYXQgaGF2ZSBiZWVuIHZpc2l0ZWQuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByaXZhdGUgX2NvdW50OiBudW1iZXIgPSAwO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlcG9ydHMgdGhlIGNvdW50IG9mIHJvd3MgYnkgcHJvdmlkaW5nIHB1YmxpYyBhY2Nlc3MgdG9cbiAgICAgICAgICAgICAqIFtbX2NvdW50XV0uXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBnZXRDb3VudCgpOiBudW1iZXIge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb3VudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogQWJzdHJhY3RWaXNpdG9yIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZWNlaXZlcyBhIHJvdyBmb3IgcHJvY2Vzc2luZy5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJvdGVjdGVkIHZpc2l0SW1wbGVtZW50YXRpb24ocm93OiBSb3csIHNpeD86IEFic3RyYWN0U2l4KTogdm9pZCB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY291bnQgKz0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vQWJzdHJhY3RTaXgudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0Jsb2NrRGlyZWN0b3J5LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9Sb3cudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3N0cmluZ0Zyb21Sb3cudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL011c2ljL01hdGNoZXJJbnRlcmZhY2UudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkFic3RyYWN0LnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogVmlzaXRvciBjbGFzc2VzIHRvIGFuYWx5c2UgYmxvY2tzXG4gICAgICovXG4gICAgZXhwb3J0IG5hbWVzcGFjZSBWaXNpdG9yIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVmlzaXRvciBmb3IgbXVzaWMgYW5hbHlzaXNcbiAgICAgICAgICpcbiAgICAgICAgICogTWF0Y2hlcyByb3dzIHVzaW5nIGEgbXVzaWMgbWF0Y2hlciAoW1tNYXRjaGVySW50ZXJmYWNlXV0pIHRoYXQgY2FuXG4gICAgICAgICAqIHJlcG9ydCBvbiB0aGUgbXVzaWNhbCBjb250ZW50IG9mIGEgdG91Y2guXG4gICAgICAgICAqIFRoaXMgdmlzaXRvciBhbHNvIGFjY3VtdWxhdGVzIGEgW1tCbG9ja0RpcmVjdG9yeV1dIHJlZmVyZW5jaW5nXG4gICAgICAgICAqIGVhY2ggYmxvY2sgY29udGFpbmluZyBhIG11c2ljYWwgcm93LlxuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGNsYXNzIE11c2ljIGV4dGVuZHMgQWJzdHJhY3RWaXNpdG9yIHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBEaXJlY3Rvcnkgb2YgbXVzaWNhbCBibG9ja3MuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByaXZhdGUgX2RpcmVjdG9yeTogQmxvY2tEaXJlY3RvcnkgPSBuZXcgQmxvY2tEaXJlY3RvcnkoKTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBDcmVhdGVzIHRoZSB2aXNpdG9yLCBwcm92aWRpbmcgdGhlIG1hdGNoZXIgdGhhdCBzaG91bGQgYmUgdXNlZC5cbiAgICAgICAgICAgICAqIEBwYXJhbSBfbWF0Y2hlciBNYXRjaGVyIHRvIGJlIHVzZWQuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfbWF0Y2hlcjogTXVzaWMuTWF0Y2hlckludGVyZmFjZSkge1xuICAgICAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVwb3J0cyBvbiBtdXNpY2FsIGNvbnRlbnQgb2YgYSB0b3VjaCBieSBwcm92aWRpbmcgcHVibGljIGFjY2Vzc1xuICAgICAgICAgICAgICogdG8gW1tfbWF0Y2hlcl1dLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgZ2V0TWF0Y2hlcigpOiBNdXNpYy5NYXRjaGVySW50ZXJmYWNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWF0Y2hlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZXBvcnRzIHdoZXJlIG11c2ljIGlzIGZvdW5kIHdpdGhpbiBhIHRvdWNoIGJ5IHByb3ZpZGluZyBwdWJsaWNcbiAgICAgICAgICAgICAqIGFjY2VzcyB0byBbW19kaXJlY3RvcnldXS5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIGdldERpcmVjdG9yeSgpOiBCbG9ja0RpcmVjdG9yeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RpcmVjdG9yeTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogQWJzdHJhY3RWaXNpdG9yIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZWNlaXZlcyBhIHJvdyBmb3IgcHJvY2Vzc2luZy5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJvdGVjdGVkIHZpc2l0SW1wbGVtZW50YXRpb24ocm93OiBSb3csIHNpeD86IEFic3RyYWN0U2l4KTogdm9pZCB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHRoaXMuX21hdGNoZXIubWF0Y2goc3RyaW5nRnJvbVJvdyhyb3cpKTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcyAmJiBzaXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlyZWN0b3J5LmFkZChzaXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vQWJzdHJhY3RTaXgudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0Jsb2NrRGlyZWN0b3J5LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9Sb3cudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3N0cmluZ0Zyb21Sb3cudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkFic3RyYWN0LnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogVmlzaXRvciBjbGFzc2VzIHRvIGFuYWx5c2UgYmxvY2tzXG4gICAgICovXG4gICAgZXhwb3J0IG5hbWVzcGFjZSBWaXNpdG9yIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVmlzaXRvciBmb3IgcHJvdmluZyB0b3VjaGVzXG4gICAgICAgICAqXG4gICAgICAgICAqIFN0b3JlcyB0aGUgcm93cyB0aGF0IGhhdmUgYmVlbiB2aXNpdGVkIGFuZCByZXBvcnRzIHdoZW4gd2hldGhlciBhbnlcbiAgICAgICAgICogcm93cyB3ZXJlIHJlcGVhdGVkLlxuICAgICAgICAgKiBUaGlzIHZpc2l0b3IgYWxzbyBhY2N1bXVsYXRlcyBhIFtbQmxvY2tEaXJlY3RvcnldXSByZWZlcmVuY2luZ1xuICAgICAgICAgKiBlYWNoIGJsb2NrIGNvbnRhaW5pbmcgYSBmYWxzZSByb3cuXG4gICAgICAgICAqL1xuICAgICAgICBleHBvcnQgY2xhc3MgUHJvb2YgZXh0ZW5kcyBBYnN0cmFjdFZpc2l0b3Ige1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIExvZyBvZiByb3dzIHRoYXQgd2UndmUgc2Vlbi5cbiAgICAgICAgICAgICAqIFJvd3MgYXJlIGFjY3VtdWxhdGVkIGludG8gYSBkaWN0aW9uYXJ5IGluZGV4ZWQgYnkgdGhlIHN0cmluZ1xuICAgICAgICAgICAgICogcmVwcmVzZW50YXRpb24gb2YgYSByb3cgKHRoZSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIHdpbGwgdGh1c1xuICAgICAgICAgICAgICogc3RvcmUgYSBoYXNoIHRhYmxlLCBlbnN1cmluZyBnb29kIHBlcmZvcm1hbmNlKS5cbiAgICAgICAgICAgICAqIEVhY2ggdmFsdWUgaXMgYW4gYXJyYXkgb2YgYWxsIGJsb2NrcyB0aGF0IGNvbnRhaW4gdGhlIGluZGV4ZWRcbiAgICAgICAgICAgICAqIHJvdy5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJpdmF0ZSBfcm93Q291bnRzOlxuICAgICAgICAgICAgICAgIHsgW2luZGV4OiBzdHJpbmddOiBBcnJheTxBYnN0cmFjdFNpeCB8IHVuZGVmaW5lZD4gfSA9IHsgfTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBEaXJlY3Rvcnkgb2YgZmFsc2UgYmxvY2tzLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF9kaXJlY3Rvcnk6IEJsb2NrRGlyZWN0b3J5ID0gbmV3IEJsb2NrRGlyZWN0b3J5KCk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRmxhZyByZWNvcmRpbmcgdHJ1dGguXG4gICAgICAgICAgICAgKiBUcnV0aCBjYW4gZWFzaWx5IGJlIGNhbGN1bGF0ZWQgZnJvbSBbW19yb3dDb3VudHNdXSwgYnV0IGtlZXBpbmcgYVxuICAgICAgICAgICAgICogZmxhZyB1cC10by1kYXRlIGlzIGEgc2ltcGxlIG9wdGltaXNhdGlvbiB0byBhdm9pZCBpdGVyYXRpbmcgb3ZlclxuICAgICAgICAgICAgICogdGhpcyBwcm9wZXJ0eSBlYWNoIHRpbWUgd2UgY2hlY2sgdHJ1dGguXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByaXZhdGUgX2lzVHJ1ZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVwb3J0cyB0aGUgbnVtYmVyIG9mIHRpbWVzIGVhY2ggcm93IGhhcyBiZWVuIHByb2Nlc3NlZC5cbiAgICAgICAgICAgICAqIFByb2Nlc3NlcyBbW19yb3dDb3VudHNdXSB0byBjb252ZXJ0IGVhY2ggYXJyYXkgb2YgYmxvY2tzIGludG8gYVxuICAgICAgICAgICAgICogY291bnQuXG4gICAgICAgICAgICAgKiBAcmV0dXJucyBEaWN0aW9uYXJ5IGNvbnRhaW5pbmcgdGhlIGNvdW50IG9mIGVhY2ggcm93IHNlZW4sXG4gICAgICAgICAgICAgKiBpbmRleGVkIGJ5IHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhhdCByb3cuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBnZXRSb3dDb3VudHMoKTogeyBbaW5kZXg6IHN0cmluZ106IG51bWJlciB9IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQ6IHsgW2luZGV4OiBzdHJpbmddOiBudW1iZXIgfSA9IHsgfTtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgcm93U3RyaW5nIGluIHRoaXMuX3Jvd0NvdW50cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcm93Q291bnRzLmhhc093blByb3BlcnR5KHJvd1N0cmluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtyb3dTdHJpbmddID0gdGhpcy5fcm93Q291bnRzW3Jvd1N0cmluZ10ubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZXBvcnRzIG9uIHRoZSBkaXN0cmlidXRpb24gb2YgZmFsc2VuZXNzIHdpdGhpbiBhIHRvdWNoIGJ5XG4gICAgICAgICAgICAgKiBwcm92aWRpbmcgcHVibGljIGFjY2VzcyB0byBbW19kaXJlY3RvcnldXS5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIGdldERpcmVjdG9yeSgpOiBCbG9ja0RpcmVjdG9yeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RpcmVjdG9yeTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZXBvcnRzIHdoZXRoZXIgYSB0b3VjaCBpcyB0cnVlIGJ5IHByb3ZpZGluZyBwdWJsaWMgYWNjZXNzIHRvXG4gICAgICAgICAgICAgKiBbW19pc1RydWVdXS5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIGlzVHJ1ZSgpOiBib29sZWFuIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faXNUcnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKiBBYnN0cmFjdFZpc2l0b3IgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlY2VpdmVzIGEgcm93IGZvciBwcm9jZXNzaW5nLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcm90ZWN0ZWQgdmlzaXRJbXBsZW1lbnRhdGlvbihyb3c6IFJvdywgc2l4PzogQWJzdHJhY3RTaXgpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3dTdHJpbmc6IHN0cmluZyA9IHN0cmluZ0Zyb21Sb3cocm93KTtcblxuICAgICAgICAgICAgICAgIGlmIChyb3dTdHJpbmcgaW4gdGhpcy5fcm93Q291bnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFscmVhZHkgc2VlbiAtIGkuZS4gZmFsc2VcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcm93Q291bnRzW3Jvd1N0cmluZ10ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGaXJzdCB0aW1lIHRoaXMgcm93IGhhcyBydW4gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5lZWQgdG8gYWRkIHRoZSBwcmV2aW91cyBibG9jayB0byB0aGUgZGlyZWN0b3J5XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmV2aW91c1NpeCA9IHRoaXMuX3Jvd0NvdW50c1tyb3dTdHJpbmddWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzU2l4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlyZWN0b3J5LmFkZChwcmV2aW91c1NpeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc1RydWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlyZWN0b3J5LmFkZChzaXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd0NvdW50c1tyb3dTdHJpbmddLnB1c2goc2l4KTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5vdCBzZWVuIC0gaS5lLiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd0NvdW50c1tyb3dTdHJpbmddID0gW3NpeF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJBYnN0cmFjdC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vQmxvY2tEaXJlY3RvcnkudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0NvdXJzZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vTm90aWZpYWJsZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vUHJpbnRhYmxlTWl4aW4udHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3Jvd0Zyb21TdHJpbmcudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1Jvdy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vU3RhZ2UudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3N0cmluZ0Zyb21Sb3cudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1RvdWNoLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9NdXNpYy9NYmRTY2hlbWUudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1Zpc2l0b3IvQ291bnRlci50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vVmlzaXRvci9NdXNpYy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vVmlzaXRvci9Qcm9vZi50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIGVudW0gQmxvY2sge0NvdXJzZSwgVG91Y2h9XG5cbiAgICAvKipcbiAgICAgKiBQcmlja2Vyc1xuICAgICAqIFNhZGx5IGZvciB0c2xpbnQsIHRoZXNlIHdpbGwgc2hhZG93IHRoZSB0b3AtbGV2ZWwgbmFtZXNwYWNlIHVudGlsIEkgY2FuXG4gICAgICogdGhpbmsgb2YgYSBiZXR0ZXIgbmFtZS5cbiAgICAgKi9cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc2hhZG93ZWQtdmFyaWFibGVcbiAgICBleHBvcnQgbmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBbiBNQkQgcHJpY2tlclxuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGNsYXNzIE1iZCBleHRlbmRzIEFic3RyYWN0UHJpY2tlclxuICAgICAgICAgICAgaW1wbGVtZW50cyBOb3RpZmlhYmxlLCBQcmludGFibGVNaXhpbiB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogU3RhZ2Ugd2UncmUgcHJpY2tpbmcgb25cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJpdmF0ZSBfc3RhZ2U6IFN0YWdlO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENhY2hlIG9mIHRoZSBpbml0aWFsIHJvdyBmb3IgdGhpcyBzdGFnZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF9pbml0aWFsUm93OiBSb3c7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIGNvdXJzZSBpdHNlbGZcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJpdmF0ZSBfY291cnNlOiBDb3Vyc2U7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQWRkaXRpb25hbCBzaXhlcyBkaXNwbGF5ZWQgYWZ0ZXIgdGhlIGNvdXJzZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF9leHRyYVNpeGVzOiBDb3Vyc2U7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ291cnNlIGJlaW5nIHNhdmVkIGZvciBsYXRlclxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF9zYXZlZENvdXJzZTogQ291cnNlIHwgdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRvdWNoIGJlaW5nIGNvbXBvc2VkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByaXZhdGUgX3RvdWNoOiBUb3VjaDtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBXaGV0aGVyIHdlJ3JlIHNob3dpbmcgc2l4IGhlYWRzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByaXZhdGUgX3Nob3dTaXhIZWFkczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENvdXJzZSBzZWxlY3RlZCBpbiB0b3VjaCB2aWV3XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByaXZhdGUgX3NlbGVjdGVkSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSW5kZXggb2YgY291cnNlIGNvcGllZCBmcm9tIHRvdWNoIHZpZXdcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJpdmF0ZSBfY29waWVkSW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBDb3VudCBvZiByb3dzIGluIHRvdWNoXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByaXZhdGUgX3Jvd0NvdW50OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVwb3J0IG9mIHRvdWNoIHByb29mIHN0YXR1c1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF9wcm9vZlRleHQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBEaXJlY3Rvcnkgb2YgZmFsc2Ugc2l4ZXNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJpdmF0ZSBfZmFsc2VuZXNzOiBCbG9ja0RpcmVjdG9yeSB8IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBNdXNpYyBzY2hlbWUgaW4gdXNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByaXZhdGUgX211c2ljU2NoZW1lOiBNdXNpYy5NYmRTY2hlbWU7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRGlyZWN0b3J5IG9mIG11c2ljYWwgc2l4ZXNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJpdmF0ZSBfbXVzaWM6IEJsb2NrRGlyZWN0b3J5IHwgdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAvKiBOb3RpZmlhYmxlIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlY2VpdmVzIGEgbm90aWZpY2F0aW9uIGZyb20gYSBibG9jayB0aGF0IGhhcyBjaGFuZ2VkXG4gICAgICAgICAgICAgKiBAcGFyYW0gaW5kZXggIGluZGV4IG9mIGNoYW5nZWQgYmxvY2sgaW4gY29udGFpbmVyXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBub3RpZnkoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gQmxvY2suQ291cnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V4dHJhU2l4ZXMuc2V0SW5pdGlhbFJvdyh0aGlzLl9jb3Vyc2UuZ2V0RW5kKCkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3BpZWRJbmRleCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSBCbG9jay5Ub3VjaCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dDb3VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJvb2ZUZXh0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mYWxzZW5lc3MgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX211c2ljID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKiBQcmludGFibGVNaXhpbiBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlbmRlcnMgdGhlIG9iamVjdCB3aXRoIGEgdGVtcGxhdGVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIHByaW50OiAodDogc3RyaW5nLCBjPzogVGVtcGxhdGVDb250ZXh0KSA9PiBzdHJpbmc7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUGF0aCBmb3IgdGhpcyBjbGFzcycgdGVtcGxhdGVzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSB0ZW1wbGF0ZVBhdGg6IHN0cmluZyA9ICdQcmlja2VyLk1iZCc7XG5cbiAgICAgICAgICAgIC8qIFByaWNrZXIgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIHB1YmxpYyBvbkxvYWQoKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gU3RhZ2UuVHJpcGxlczsgaSA8PSBTdGFnZS5TZXB0dXBsZXM7IGkgKz0gMikge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gaS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb24uaW5uZXJUZXh0ID0gU3RhZ2VbaV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RWwoJ3N0YWdlJykuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRFbDxIVE1MU2VsZWN0RWxlbWVudD4oJ3N0YWdlJykudmFsdWUgPVxuICAgICAgICAgICAgICAgICAgICBTdGFnZS5DaW5xdWVzLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9uU3RhZ2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uU3RhZ2UoKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhZ2UgPVxuICAgICAgICAgICAgICAgICAgICBwYXJzZUludCh0aGlzLmdldEVsPEhUTUxTZWxlY3RFbGVtZW50Pignc3RhZ2UnKS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5pdGlhbFJvdyA9IHJvd0Zyb21TdHJpbmcoJzIzMScsIHRoaXMuX3N0YWdlKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZSA9IG5ldyBDb3Vyc2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXRpYWxSb3csXG4gICAgICAgICAgICAgICAgICAgIHsnY29udGFpbmVyJzogdGhpcywgJ2luZGV4JzogQmxvY2suQ291cnNlfSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMuX2V4dHJhU2l4ZXMgPSBuZXcgQ291cnNlKHRoaXMuX2luaXRpYWxSb3cpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2V4dHJhU2l4ZXMuc2V0TGVuZ3RoKDgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoID0gbmV3IFRvdWNoKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbml0aWFsUm93LFxuICAgICAgICAgICAgICAgICAgICB7J2NvbnRhaW5lcic6IHRoaXMsICdpbmRleCc6IEJsb2NrLlRvdWNofSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMuX211c2ljU2NoZW1lID0gbmV3IE11c2ljLk1iZFNjaGVtZSh0aGlzLl9zdGFnZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwcml2YXRlIHJlZHJhdygpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdDb3Vyc2UgPSB0aGlzLl9jb3Vyc2UuY2xvbmUoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2V4dHJhU2l4ZXMuc2V0SW5pdGlhbFJvdyh0aGlzLl9jb3Vyc2UuZ2V0RW5kKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RWwoJ3NpeGVuZHMnKS5pbm5lckhUTUwgPSB0aGlzLl9jb3Vyc2UucHJpbnQoJ21iZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgJ2ZhbHNlbmVzcyc6IHRoaXMuX2ZhbHNlbmVzcyxcbiAgICAgICAgICAgICAgICAgICAgJ211c2ljJzogdGhpcy5fbXVzaWMsXG4gICAgICAgICAgICAgICAgICAgICdjb3Vyc2VJbmRleCc6IHRoaXMuX2NvcGllZEluZGV4LFxuICAgICAgICAgICAgICAgICAgICAnZXh0cmFTaXhlcyc6IHRoaXMuX2V4dHJhU2l4ZXMsXG4gICAgICAgICAgICAgICAgICAgICdzaG93U2l4SGVhZHMnOiB0aGlzLl9zaG93U2l4SGVhZHMsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmdldEVsKCdjYWxsaW5nJykuaW5uZXJIVE1MID0gdGhpcy5fY291cnNlLnByaW50KCdodG1sJyk7XG5cbiAgICAgICAgICAgICAgICBuZXdDb3Vyc2Uuc2V0SW5pdGlhbFJvdyh0aGlzLl9pbml0aWFsUm93KTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEVsKCdjYWxsaW5nRnJvbVJvdW5kcycpLmlubmVySFRNTCA9XG4gICAgICAgICAgICAgICAgICAgIG5ld0NvdXJzZS5wcmludCgnaHRtbCcpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRFbDxIVE1MSW5wdXRFbGVtZW50PignaW5pdGlhbFJvdycpLnZhbHVlID1cbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nRnJvbVJvdyh0aGlzLl9jb3Vyc2UuZ2V0SW5pdGlhbFJvdygpKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RWw8SFRNTElucHV0RWxlbWVudD4oJ2NvdXJzZUxlbmd0aCcpLnZhbHVlID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291cnNlLmdldExlbmd0aCgpLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2F2ZWRDb3Vyc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRFbCgnc2F2ZWRDYWxsaW5nJykuaW5uZXJIVE1MID1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NhdmVkQ291cnNlLnByaW50KCdodG1sJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRFbCgnc2F2ZWRDYWxsaW5nJykuaW5uZXJUZXh0ID0gJ05vbmUnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFByb29mIGFuZCBudW1iZXIgb2Ygcm93c1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RWwoJ3Byb29mUmVzdWx0JykuaW5uZXJUZXh0ID0gdGhpcy5fcHJvb2ZUZXh0IHx8ICcnO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9yb3dDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEVsKCdudW1Sb3dzJykuaW5uZXJUZXh0ID1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd0NvdW50ICsgJyBTdGVkbWFuICcgKyBTdGFnZVt0aGlzLl9zdGFnZV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRFbCgnbnVtUm93cycpLmlubmVyVGV4dCA9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b3VjaC5lc3RpbWF0ZVJvd3MoKSArICcgY2hhbmdlcyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gVG91Y2ggZGlzcGxheVxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RWwoJ2NvdXJzZXMnKS5vdXRlckhUTUwgPVxuICAgICAgICAgICAgICAgICAgICAnPHNlbGVjdCBpZD1cImNvdXJzZXNcIidcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJyBvbmNsaWNrPVwicHJpY2tlci5vblNlbGVjdENvdXJzZSgpXCInXG4gICAgICAgICAgICAgICAgICAgICAgICArICcgb25kYmxjbGljaz1cInByaWNrZXIub25Db3B5Q291cnNlKClcIj4nXG4gICAgICAgICAgICAgICAgICAgICAgICArIHRoaXMuX3RvdWNoLnByaW50KCdzZWxlY3QnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RvdWNoUm93cyc6IHRoaXMuX3Jvd0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdHlsZVVucmVhY2hlZCc6ICdjb2xvcjpncmF5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZmFsc2VuZXNzJzogdGhpcy5fZmFsc2VuZXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdHlsZUZhbHNlJzogJ2NvbG9yOnJlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKyAnPC9zZWxlY3Q+JztcbiAgICAgICAgICAgICAgICB0aGlzLmdldEVsPEhUTUxTZWxlY3RFbGVtZW50PignY291cnNlcycpLnNpemUgPSBNYXRoLm1heChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG91Y2guZ2V0TGVuZ3RoKCkgKyAxLFxuICAgICAgICAgICAgICAgICAgICAyLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRFbDxIVE1MU2VsZWN0RWxlbWVudD4oJ2NvdXJzZXMnKS52YWx1ZSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXgudG9TdHJpbmcoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBjKHNpeDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY291cnNlLmdldFNpeChzaXgpLnRvZ2dsZUNhbGwoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uU2V0SW5pdGlhbFJvdygpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuZ2V0RWw8SFRNTElucHV0RWxlbWVudD4oJ2luaXRpYWxSb3cnKS52YWx1ZTtcbiAgICAgICAgICAgICAgICBsZXQgaW5pdGlhbFJvdzogUm93O1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFJvdyA9IHJvd0Zyb21TdHJpbmcoaW5wdXQsIHRoaXMuX3N0YWdlKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2Uuc2V0SW5pdGlhbFJvdyhpbml0aWFsUm93KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9leHRyYVNpeGVzLnNldEluaXRpYWxSb3codGhpcy5fY291cnNlLmdldEVuZCgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwdWJsaWMgb25SZXNldEluaXRpYWxSb3coKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY291cnNlLnNldEluaXRpYWxSb3codGhpcy5faW5pdGlhbFJvdyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXh0cmFTaXhlcy5zZXRJbml0aWFsUm93KHRoaXMuX2NvdXJzZS5nZXRFbmQoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uU2V0TGVuZ3RoKCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RWw8SFRNTElucHV0RWxlbWVudD4oJ2NvdXJzZUxlbmd0aCcpLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBsZW5ndGggPSBwYXJzZUludChpbnB1dCk7XG5cbiAgICAgICAgICAgICAgICBpZiAobGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZS5zYWZlU2V0TGVuZ3RoKGxlbmd0aCAtIChsZW5ndGggJSAyKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwdWJsaWMgb25SZXNldExlbmd0aCgpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2UucmVzZXRMZW5ndGgoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uUmVzZXRDYWxscygpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2UucmVzZXRDYWxscygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwdWJsaWMgb25TYXZlQ2FsbGluZygpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zYXZlZENvdXJzZSA9IHRoaXMuX2NvdXJzZS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NhdmVkQ291cnNlLnNldEluaXRpYWxSb3codGhpcy5faW5pdGlhbFJvdyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uTG9hZENhbGxpbmcoKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NhdmVkQ291cnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZSA9IHRoaXMuX3NhdmVkQ291cnNlLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZS5zZXRJbml0aWFsUm93KHRoaXMuX2luaXRpYWxSb3cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZSA9IG5ldyBDb3Vyc2UodGhpcy5faW5pdGlhbFJvdyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fY291cnNlLnNldE93bmVyc2hpcCh7XG4gICAgICAgICAgICAgICAgICAgICdjb250YWluZXInOiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAnaW5kZXgnOiBCbG9jay5Db3Vyc2UsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwdWJsaWMgb25TZWxlY3RDb3Vyc2UoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmdldEVsPEhUTUxTZWxlY3RFbGVtZW50PignY291cnNlcycpLnZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSBwYXJzZUludChpbnB1dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBvbkluc2VydENvdXJzZSgpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEluZGV4ICs9IDE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl90b3VjaC5pbnNlcnRDb3Vyc2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZS5jbG9uZSgpLFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRFbDxIVE1MSW5wdXRFbGVtZW50Pigncm9sbGluZycpLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291cnNlLnNldEluaXRpYWxSb3coXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b3VjaC5nZXRDb3Vyc2UodGhpcy5fc2VsZWN0ZWRJbmRleCkuZ2V0RW5kKCksXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZS5yZXNldExlbmd0aCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2UucmVzZXRDYWxscygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uUGFzdGVDb3Vyc2UoKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG91Y2guZGVsZXRlQ291cnNlKHRoaXMuX3NlbGVjdGVkSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b3VjaC5pbnNlcnRDb3Vyc2UoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291cnNlLmNsb25lKCksXG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0RWw8SFRNTElucHV0RWxlbWVudD4oJ3JvbGxpbmcnKS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2Uuc2V0SW5pdGlhbFJvdyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b3VjaC5nZXRDb3Vyc2UodGhpcy5fc2VsZWN0ZWRJbmRleCkuZ2V0RW5kKCksXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IE1hdGgubWluKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoLmdldExlbmd0aCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZS5yZXNldExlbmd0aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291cnNlLnJlc2V0Q2FsbHMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uQ29weUNvdXJzZSgpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2UgPVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG91Y2guZ2V0Q291cnNlKHRoaXMuX3NlbGVjdGVkSW5kZXgpLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZS5zZXRPd25lcnNoaXAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbnRhaW5lcic6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW5kZXgnOiBCbG9jay5Db3Vyc2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvcGllZEluZGV4ID0gdGhpcy5fc2VsZWN0ZWRJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBvbkN1dENvdXJzZSgpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29weUNvdXJzZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMub25EZWxldGVDb3Vyc2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uRGVsZXRlQ291cnNlKCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoLmRlbGV0ZUNvdXJzZSh0aGlzLl9zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IE1hdGgubWluKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoLmdldExlbmd0aCgpLFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uTG9hZFRvdWNoKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRFbDxIVE1MVGV4dEFyZWFFbGVtZW50PignbG9hZFNhdmVUZXh0YXJlYScpLnZhbHVlO1xuICAgICAgICAgICAgICAgIGxldCBuZXdUb3VjaDogVG91Y2g7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBuZXdUb3VjaCA9IFRvdWNoLmZyb21TdHJpbmcoaW5wdXQpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWdub3JlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFnZSA9IG5ld1RvdWNoLmdldEluaXRpYWxSb3coKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRFbDxIVE1MU2VsZWN0RWxlbWVudD4oJ3N0YWdlJykudmFsdWUgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGFnZS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHRoaXMub25TdGFnZSgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fdG91Y2ggPSBuZXdUb3VjaDtcbiAgICAgICAgICAgICAgICB0aGlzLl90b3VjaC5zZXRPd25lcnNoaXAoe1xuICAgICAgICAgICAgICAgICAgICAnY29udGFpbmVyJzogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgJ2luZGV4JzogQmxvY2suVG91Y2gsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwdWJsaWMgb25TYXZlVG91Y2goKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRFbCgnbG9hZFNhdmVUZXh0YXJlYScpLmlubmVyVGV4dCA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoLnByaW50KCd0ZXh0Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBvbkdlbmVyYXRlU2lyaWwoKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRFbCgnc2lyaWxUZXh0YXJlYScpLmlubmVyVGV4dCA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoLnByaW50KCdzaXJpbCcsIHsndG91Y2hSb3dzJzogdGhpcy5fcm93Q291bnR9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uQW5hbHlzZU11c2ljKCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpc2l0b3IgPSBuZXcgVmlzaXRvci5NdXNpYyh0aGlzLl9tdXNpY1NjaGVtZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdG91Y2guYWNjZXB0KHZpc2l0b3IpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RWwoJ211c2ljVGV4dGFyZWEnKS5pbm5lclRleHQgPVxuICAgICAgICAgICAgICAgICAgICB2aXNpdG9yLmdldE1hdGNoZXIoKS5wcmludCgndGV4dCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX211c2ljID0gdmlzaXRvci5nZXREaXJlY3RvcnkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uU2hvd1NpeEhlYWRzKCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmdldEVsPEhUTUxJbnB1dEVsZW1lbnQ+KCdzaG93U2l4SGVhZHMnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93U2l4SGVhZHMgPSBlbGVtZW50LmNoZWNrZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uUHJvdmUoKTogYm9vbGVhbiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvb2YgPSBuZXcgVmlzaXRvci5Qcm9vZigpLFxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyID0gbmV3IFZpc2l0b3IuQ291bnRlcigpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fdG91Y2guYWNjZXB0KHByb29mLCBjb3VudGVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3dDb3VudCA9IGNvdW50ZXIuZ2V0Q291bnQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9mYWxzZW5lc3MgPSBwcm9vZi5nZXREaXJlY3RvcnkoKTtcblxuICAgICAgICAgICAgICAgIGlmIChwcm9vZi5pc1RydWUoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvb2YuaXNWaXNpdGluZygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm9vZlRleHQgPSBcIlRydWUsIGJ1dCBkb2Vzbid0IGNvbWUgcm91bmRcIjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Byb29mVGV4dCA9ICdDb21wb3NpdGlvbiBpcyB0cnVlJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Byb29mVGV4dCA9ICdDb21wb3NpdGlvbiBpcyBGQUxTRSc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvb2YuaXNUcnVlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBvblRhYihwYWdlSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhYnMgPSB0aGlzLmdldEVsKCd0YWJzJykuY2hpbGRyZW4sXG4gICAgICAgICAgICAgICAgICAgIHRhYiA9IHRoaXMuZ2V0RWwoJ3RhYl8nICsgcGFnZUlkKSxcbiAgICAgICAgICAgICAgICAgICAgcGFnZXMgPSB0aGlzLmdldEVsKCdwYWdlcycpLmNoaWxkcmVuLFxuICAgICAgICAgICAgICAgICAgICBwYWdlID0gdGhpcy5nZXRFbCgncGFnZV8nICsgcGFnZUlkKTtcblxuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItZm9yLW9mXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhYnNbaV0uY2xhc3NOYW1lID0gJ3RhYic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRhYi5jbGFzc05hbWUgPSAndGFiIHRhYi1zZWxlY3RlZCc7XG5cbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLWZvci1vZlxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXNbaV0uY2xhc3NOYW1lID0gJ3BhZ2UnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYWdlLmNsYXNzTmFtZSA9ICdwYWdlIHBhZ2Utc2VsZWN0ZWQnO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgUHJpbnRhYmxlTWl4aW4ubWFrZVByaW50YWJsZShNYmQpO1xuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogRE9NIGhlbHBlciB1dGlsaXRpZXNcbiAgICAgKi9cbiAgICBleHBvcnQgbmFtZXNwYWNlIERvbSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYSBzdHlsZSBlbGVtZW50IGZvciBwcmlja2VyIHJlbmRlcmluZ1xuICAgICAgICAgKiBAcGFyYW0gcGFyZW50RG9jdW1lbnQgLSBkb2N1bWVudCBvYmplY3QgdG8gdXNlIChpbmplY3QgZm9yIHRlc3RpbmcpXG4gICAgICAgICAqL1xuICAgICAgICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlQW5kQXBwZW5kU3R5bGUoXG4gICAgICAgICAgICBwYXJlbnREb2N1bWVudDogSFRNTERvY3VtZW50ID0gZG9jdW1lbnQsXG4gICAgICAgICAgICBzdHlsZXM6IHN0cmluZyA9ICcnLFxuICAgICAgICApOiBIVE1MU3R5bGVFbGVtZW50IHtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gcGFyZW50RG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgICAgIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgICAgICAgc3R5bGUuaW5uZXJUZXh0ID0gc3R5bGVzO1xuXG4gICAgICAgICAgICBwYXJlbnREb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBET00gaGVscGVyIHV0aWxpdGllc1xuICAgICAqL1xuICAgIGV4cG9ydCBuYW1lc3BhY2UgRG9tIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhbiBpZnJhbWUgZm9yIHByaWNrZXIgcmVuZGVyaW5nXG4gICAgICAgICAqIEBwYXJhbSBwYXJlbnREb2N1bWVudCAtIGRvY3VtZW50IG9iamVjdCB0byB1c2UgKGluamVjdCBmb3IgdGVzdGluZylcbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJZnJhbWUoXG4gICAgICAgICAgICBwYXJlbnREb2N1bWVudDogSFRNTERvY3VtZW50ID0gZG9jdW1lbnQsXG4gICAgICAgICk6IEhUTUxJRnJhbWVFbGVtZW50IHtcbiAgICAgICAgICAgIGNvbnN0IGlmcmFtZSA9IHBhcmVudERvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuXG4gICAgICAgICAgICBpZnJhbWUuZnJhbWVCb3JkZXIgPSAnMCc7XG4gICAgICAgICAgICBpZnJhbWUuc2Nyb2xsaW5nID0gJ25vJztcbiAgICAgICAgICAgIGlmcmFtZS5zcmMgPSAnYWJvdXQ6YmxhbmsnO1xuICAgICAgICAgICAgaWZyYW1lLnN0eWxlLmJvcmRlciA9ICdub25lJztcblxuICAgICAgICAgICAgcmV0dXJuIGlmcmFtZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogRE9NIGhlbHBlciB1dGlsaXRpZXNcbiAgICAgKi9cbiAgICBleHBvcnQgbmFtZXNwYWNlIERvbSB7XG5cbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIGluamVjdElmcmFtZURhdGEoXG4gICAgICAgICAgICBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LFxuICAgICAgICAgICAgY29udGVudDogc3RyaW5nID0gJycsXG4gICAgICAgICAgICBnbG9iYWxzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0geyB9LFxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IHRoZURvYyA9IChpZnJhbWUuY29udGVudFdpbmRvdyBhcyBXaW5kb3cpLmRvY3VtZW50O1xuICAgICAgICAgICAgdGhlRG9jLm9wZW4oKTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZ2xvYmFscykge1xuICAgICAgICAgICAgICAgIGlmIChnbG9iYWxzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgKGlmcmFtZS5jb250ZW50V2luZG93IGFzIGFueSlba2V5XSA9IGdsb2JhbHNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoZURvYy53cml0ZShjb250ZW50KTtcbiAgICAgICAgICAgIHRoZURvYy5jbG9zZSgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcmZhY2UgZm9yIG9wdGlvbnMgcGFzc2VkIHRvIGNyZWF0ZSgpXG4gICAgICovXG4gICAgZXhwb3J0IGludGVyZmFjZSBPcHRpb25zIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogV2hldGhlciB0byBwYWNrYWdlIHRoZSBwcmlja2VyIGluIGFuIGlmcmFtZS5cbiAgICAgICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgaWZyYW1lPzogYm9vbGVhbjtcblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJQcmlja2VyL0Fic3RyYWN0LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJQcmlja2VyL01iZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiRG9tL2NyZWF0ZUFuZEFwcGVuZFN0eWxlLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJEb20vY3JlYXRlSWZyYW1lLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJEb20vaW5qZWN0SWZyYW1lRGF0YS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiT3B0aW9ucy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiVGVtcGxhdGVzLnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogRmFjdG9yeSBmdW5jdGlvbiB0byBjcmVhdGUgYSBwcmlja2VyXG4gICAgICogQHBhcmFtIGVsZW1lbnRJZCAtIElEIG9mIEhUTUwgZWxlbWVudCB0byB3aGljaCB0aGUgcHJpY2tlciB3aWxsIGJlIGJvdW5kXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBwcmlja2VyIG9wdGlvbnNcbiAgICAgKiBAcGFyYW0gcGFyZW50RG9jdW1lbnQgLSBkb2N1bWVudCB0byB1c2UgdG8gY3JlYXRlIHByaWNrZXIgKGZvciB0ZXN0aW5nKVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoXG4gICAgICAgIGVsZW1lbnRJZDogc3RyaW5nLFxuICAgICAgICBvcHRpb25zOiBPcHRpb25zID0geyB9LFxuICAgICAgICBwYXJlbnREb2N1bWVudDogSFRNTERvY3VtZW50ID0gZG9jdW1lbnQsXG4gICAgKTogUHJpY2tlci5NYmQge1xuICAgICAgICBsZXQgcHJpY2tlcjogUHJpY2tlci5NYmQ7XG5cbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHBhcmVudERvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZmluZCBIVE1MIGVsZW1lbnQ6ICcke2VsZW1lbnRJZH0nYCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5pZnJhbWUgfHwgb3B0aW9ucy5pZnJhbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgaWZyYW1lID0gRG9tLmNyZWF0ZUlmcmFtZShwYXJlbnREb2N1bWVudCk7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgICAgICAgICBwcmlja2VyID0gbmV3IFByaWNrZXIuTWJkKGlmcmFtZSk7XG4gICAgICAgICAgICBEb20uaW5qZWN0SWZyYW1lRGF0YShcbiAgICAgICAgICAgICAgICBpZnJhbWUsXG4gICAgICAgICAgICAgICAgVGVtcGxhdGVzLmNyZWF0ZSh7J3ByaWNrZXInOiBwcmlja2VyfSksXG4gICAgICAgICAgICAgICAgeyBwcmlja2VyIH0sXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJpY2tlciA9IG5ldyBQcmlja2VyLk1iZCgpO1xuICAgICAgICAgICAgRG9tLmNyZWF0ZUFuZEFwcGVuZFN0eWxlKHBhcmVudERvY3VtZW50LCBwcmlja2VyLnByaW50KCdjc3MnKSk7XG4gICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IHByaWNrZXIucHJpbnQoJ2h0bWwnKTtcbiAgICAgICAgICAgICh3aW5kb3cgYXMgYW55KS5wcmlja2VyID0gcHJpY2tlcjtcbiAgICAgICAgICAgIGlmIChwYXJlbnREb2N1bWVudCA9PT0gZG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBkb24ndCBydW4gaW4gdGVzdHMgKHdoZW4gZG9jdW1lbnQgaGFzIGJlZW4gb3ZlcnJpZGRlbilcbiAgICAgICAgICAgICAgICBwcmlja2VyLm9uTG9hZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByaWNrZXI7XG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkFic3RyYWN0U2l4LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJDaGFuZ2VzLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJWaXNpdG9yL0Fic3RyYWN0LnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogQSBxdWljayBzaXhcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgUXVpY2sgZXh0ZW5kcyBBYnN0cmFjdFNpeCB7XG5cbiAgICAgICAgLyogQWJzdHJhY3RCbG9jayBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlY2VpdmVzIGEgdmlzaXRvciB0aGF0IHdpbGwgYmUgY2FsbGVkIHRvIHByb2Nlc3MgZWFjaCByb3dcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBhY2NlcHQoLi4udmlzaXRvcnM6IFZpc2l0b3IuQWJzdHJhY3RWaXNpdG9yW10pOiB0aGlzIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ2V0SW5pdGlhbFJvdygpO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHZpc2l0b3Igb2YgdmlzaXRvcnMpIHtcbiAgICAgICAgICAgICAgICBDaGFuZ2VzLnBlcm11dGVDYWxsKHJvdywgdGhpcy5fY2FsbCk7XG4gICAgICAgICAgICAgICAgdmlzaXRvci52aXNpdChyb3csIHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgQ2hhbmdlcy5wZXJtdXRlMShyb3cpO1xuICAgICAgICAgICAgICAgIHZpc2l0b3IudmlzaXQocm93LCB0aGlzKTtcblxuICAgICAgICAgICAgICAgIENoYW5nZXMucGVybXV0ZTMocm93KTtcbiAgICAgICAgICAgICAgICB2aXNpdG9yLnZpc2l0KHJvdywgdGhpcyk7XG5cbiAgICAgICAgICAgICAgICBDaGFuZ2VzLnBlcm11dGUxKHJvdyk7XG4gICAgICAgICAgICAgICAgdmlzaXRvci52aXNpdChyb3csIHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgQ2hhbmdlcy5wZXJtdXRlMyhyb3cpO1xuICAgICAgICAgICAgICAgIHZpc2l0b3IudmlzaXQocm93LCB0aGlzKTtcblxuICAgICAgICAgICAgICAgIHZpc2l0b3IudmlzaXQodGhpcy5fZW5kLCB0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBQcmludGFibGVNaXhpbiBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogUGF0aCBmb3IgdGhpcyBjbGFzcycgdGVtcGxhdGVzXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdGVtcGxhdGVQYXRoOiBzdHJpbmcgPSAnUXVpY2snO1xuXG4gICAgICAgIC8qIEFic3RyYWN0U2l4IG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcmFuc3Bvc2VzIHRoZSBmcm9udCB0aHJlZSBiZWxscyBkZXBlbmRpbmcgdXBvbiB0aGUgdHlwZSBvZiBzaXhcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBhcHBseVNpeFRyYW5zcG9zaXRpb24oKTogdm9pZCB7XG4gICAgICAgICAgICBDaGFuZ2VzLnBlcm11dGUzKHRoaXMuX2VuZCk7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJBYnN0cmFjdFNpeC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQ2hhbmdlcy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiVmlzaXRvci9BYnN0cmFjdC50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIEEgc2xvdyBzaXhcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgU2xvdyBleHRlbmRzIEFic3RyYWN0U2l4IHtcblxuICAgICAgICAvKiBBYnN0cmFjdEJsb2NrIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVjZWl2ZXMgYSB2aXNpdG9yIHRoYXQgd2lsbCBiZSBjYWxsZWQgdG8gcHJvY2VzcyBlYWNoIHJvd1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGFjY2VwdCguLi52aXNpdG9yczogVmlzaXRvci5BYnN0cmFjdFZpc2l0b3JbXSk6IHRoaXMge1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5nZXRJbml0aWFsUm93KCk7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgdmlzaXRvciBvZiB2aXNpdG9ycykge1xuICAgICAgICAgICAgICAgIENoYW5nZXMucGVybXV0ZUNhbGwocm93LCB0aGlzLl9jYWxsKTtcbiAgICAgICAgICAgICAgICB2aXNpdG9yLnZpc2l0KHJvdywgdGhpcyk7XG5cbiAgICAgICAgICAgICAgICBDaGFuZ2VzLnBlcm11dGUzKHJvdyk7XG4gICAgICAgICAgICAgICAgdmlzaXRvci52aXNpdChyb3csIHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgQ2hhbmdlcy5wZXJtdXRlMShyb3cpO1xuICAgICAgICAgICAgICAgIHZpc2l0b3IudmlzaXQocm93LCB0aGlzKTtcblxuICAgICAgICAgICAgICAgIENoYW5nZXMucGVybXV0ZTMocm93KTtcbiAgICAgICAgICAgICAgICB2aXNpdG9yLnZpc2l0KHJvdywgdGhpcyk7XG5cbiAgICAgICAgICAgICAgICBDaGFuZ2VzLnBlcm11dGUxKHJvdyk7XG4gICAgICAgICAgICAgICAgdmlzaXRvci52aXNpdChyb3csIHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgdmlzaXRvci52aXNpdCh0aGlzLl9lbmQsIHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFByaW50YWJsZU1peGluIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQYXRoIGZvciB0aGlzIGNsYXNzJyB0ZW1wbGF0ZXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0ZW1wbGF0ZVBhdGg6IHN0cmluZyA9ICdTbG93JztcblxuICAgICAgICAvKiBBYnN0cmFjdFNpeCBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogVHJhbnNwb3NlcyB0aGUgZnJvbnQgdGhyZWUgYmVsbHMgZGVwZW5kaW5nIHVwb24gdGhlIHR5cGUgb2Ygc2l4XG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgYXBwbHlTaXhUcmFuc3Bvc2l0aW9uKCk6IHZvaWQge1xuICAgICAgICAgICAgQ2hhbmdlcy5wZXJtdXRlMSh0aGlzLl9lbmQpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQWJzdHJhY3RTY2hlbWUudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIk1hdGNoZXJJbnRlcmZhY2VcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBNdXNpYyBjbGFzc2VzIHRvIGFuYWx5c2Ugcm93c1xuICAgICAqL1xuICAgIGV4cG9ydCBuYW1lc3BhY2UgTXVzaWMge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDdXN0b20gbXVzaWMgbWF0Y2hpbmcgc2NoZW1lIGRlZmluZWQgYXQgcnVudGltZVxuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGNsYXNzIEN1c3RvbVNjaGVtZSBleHRlbmRzIEFic3RyYWN0U2NoZW1lIHtcblxuICAgICAgICAgICAgLyogTWF0Y2hlckludGVyZmFjZSBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBQcm92aWRlcyByZWFkIGFjY2VzcyB0byB0aGUgbmFtZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgICAgICAgICAgICAgIHJldHVybiAnQ3VzdG9tIHNjaGVtZSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIEFic3RyYWN0U2NoZW1lIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ3JlYXRlIG1hdGNoZXJzIGZvciB0aGlzIHNjaGVtZS9zdGFnZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlTWF0Y2hlcnMocm91bmRzOiBzdHJpbmcpOiBNYXRjaGVySW50ZXJmYWNlW10ge1xuICAgICAgICAgICAgICAgIHJldHVybiBbIF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIEN1c3RvbVNjaGVtZSBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQWxsb3dzIGFkZGl0aW9uYWwgbWF0Y2hlcnMgdG8gYmUgYWRkZWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIGFkZE1hdGNoZXIobWF0Y2hlcjogTWF0Y2hlckludGVyZmFjZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21hdGNoZXJzLnB1c2gobWF0Y2hlcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0Fic3RyYWN0U2l4LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9Sb3cudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3N0cmluZ0Zyb21Sb3cudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkFic3RyYWN0LnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogVmlzaXRvciBjbGFzc2VzIHRvIGFuYWx5c2UgYmxvY2tzXG4gICAgICovXG4gICAgZXhwb3J0IG5hbWVzcGFjZSBWaXNpdG9yIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2ltcGxlIHZpc2l0b3IgdGhhdCBsb2dzIHJvd3MgdG8gdGhlIGNvbnNvbGVcbiAgICAgICAgICpcbiAgICAgICAgICogQWxsIHZpc2l0ZWQgcm93cyBhcmUgb3V0cHV0IHZpYSBgY29uc29sZS5sb2coKWAuXG4gICAgICAgICAqIFRoaXMgdmlzaXRvciBpcyB1c2VmdWwgZm9yIGVhc2lseSBkaXNjb3ZlcmluZyB3aGF0IHJvd3MgYXJlIGJlaW5nXG4gICAgICAgICAqIGdlbmVyYXRlZC5cbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBjbGFzcyBDb25zb2xlIGV4dGVuZHMgQWJzdHJhY3RWaXNpdG9yIHtcblxuICAgICAgICAgICAgLyogQWJzdHJhY3RWaXNpdG9yIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZWNlaXZlcyBhIHJvdyBmb3IgcHJvY2Vzc2luZy5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJvdGVjdGVkIHZpc2l0SW1wbGVtZW50YXRpb24ocm93OiBSb3csIHNpeD86IEFic3RyYWN0U2l4KTogdm9pZCB7XG4gICAgICAgICAgICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGUgKi9cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzdHJpbmdGcm9tUm93KHJvdykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9BYnN0cmFjdFNpeC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vUm93LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9zdHJpbmdGcm9tUm93LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJBYnN0cmFjdC50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIFZpc2l0b3IgY2xhc3NlcyB0byBhbmFseXNlIGJsb2Nrc1xuICAgICAqL1xuICAgIGV4cG9ydCBuYW1lc3BhY2UgVmlzaXRvciB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNpbXBsZSB2aXNpdG9yIHRoYXQgYWNjdW11bGF0ZXMgcm93cyBpbnRvIGFuIGFycmF5IG9mIHN0cmluZ3NcbiAgICAgICAgICpcbiAgICAgICAgICogQ29udmVydHMgZWFjaCB2aXNpdGVkIHJvdyB0byBhIHN0cmluZyBhbmQgc3RvcmVzIGl0LlxuICAgICAgICAgKiBUaGUgdmlzaXRvciBhY2N1bXVsYXRlcyByb3dzIGZyb20gYSB0b3VjaCBpbiB0aGUgb3JkZXIgdGhleSdyZSBydW5nLlxuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGNsYXNzIFN0cmluZ0FycmF5IGV4dGVuZHMgQWJzdHJhY3RWaXNpdG9yIHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBcnJheSBvZiBzdHJpbmcgcmVwcmVzZW50YXRpb25zIG9mIHJvd3MgdGhhdCBoYXZlIGJlZW4gdmlzaXRlZC5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJpdmF0ZSBfc3RyaW5nczogc3RyaW5nW10gPSBbIF07XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVwb3J0cyB0aGUgcm93cyB0aGF0IGhhdmUgYmVlbiB2aXNpdGVkIGJ5IHByb3ZpZGluZyBwdWJsaWNcbiAgICAgICAgICAgICAqIGFjY2VzcyB0byBbW19zdHJpbmdzXV0uXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBnZXRTdHJpbmdzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RyaW5ncy5zbGljZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKiBBYnN0cmFjdFZpc2l0b3IgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlY2VpdmVzIGEgcm93IGZvciBwcm9jZXNzaW5nLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcm90ZWN0ZWQgdmlzaXRJbXBsZW1lbnRhdGlvbihyb3c6IFJvdywgc2l4PzogQWJzdHJhY3RTaXgpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHJpbmdzLnB1c2goc3RyaW5nRnJvbVJvdyhyb3cpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIjwhRE9DVFlQRSBodG1sPlxuPGh0bWw+XG4gIDxoZWFkPlxuICAgIDx0aXRsZT5GcmVlIFRvdWNoIFByaWNrZXI8L3RpdGxlPlxuICAgIDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj5cbiAgICAgIGJvZHkge1xuICAgICAgICBtYXJnaW46IDBweDtcbiAgICAgICAgcGFkZGluZzogMHB4O1xuICAgICAgfVxuXG4gICAgICB7ez0gY29udGV4dC5wcmlja2VyLnByaW50KCdjc3MnKSB9fVxuICAgIDwvc3R5bGU+XG4gICAgPHNjcmlwdCB0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCI+XG4gICAgICAgIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBwcmlja2VyLm9uTG9hZCgpO1xuICAgICAgICB9O1xuICAgIDwvc2NyaXB0PlxuICA8L2hlYWQ+XG4gIDxib2R5PlxuICAgIHt7PSBjb250ZXh0LnByaWNrZXIucHJpbnQoJ2h0bWwnKSB9fVxuICA8L2JvZHk+XG48L2h0bWw+XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLyoqXG4gKiBSZW5kZXJzIGEgc2l4IGFzIEhUTUwgZm9yIE1CRC1zdHlsZSBwcmlja2VyXG4gKiBAcGFyYW0ge0Jsb2NrRGlyZWN0b3J5fSAgZmFsc2VuZXNzICAgIGRpcmVjdG9yeSB0byBsb29rdXAgZmFsc2VuZXNzXG4gKiBAcGFyYW0ge0Jsb2NrRGlyZWN0b3J5fSAgbXVzaWMgICAgICAgIGRpcmVjdG9yeSB0byBsb29rdXAgbXVzaWNcbiAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICBjb3Vyc2VJbmRleCAgaW5kZXggbnVtYmVyIG9mIHRoZSBjb3Vyc2VcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gICAgICAgICB1bmRlcmxpbmUgICAgd2hldGhlciB0byB1bmRlcmxpbmUgdGhlIHNpeGVuZFxuICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgIHR5cGUgICAgICAgICBzaXggdHlwZSwgZWl0aGVyIFwicXVpY2tcIiBvciBcInNsb3dcIlxuICogQHBhcmFtIHtib29sZWFufSAgICAgICAgIHNob3dTaXhIZWFkcyAgc2hvdyBzaXggaGVhZHMgYXMgd2VsbCBhcyBzaXggZW5kc1xuICovXG5cbnt7PyBjb250ZXh0LnVuZGVybGluZSAhPT0gdHJ1ZSB9fVxuXHR7eyBjb250ZXh0LnVuZGVybGluZSA9IGZhbHNlOyB9fVxue3s/fX1cblxue3s/XG5cdGNvbnRleHQuZmFsc2VuZXNzICYmIGNvbnRleHQuY291cnNlSW5kZXggJiYgY29udGV4dC5mYWxzZW5lc3MuY29udGFpbnMoXG5cdFx0Y29udGV4dC5jb3Vyc2VJbmRleCxcblx0XHRjb250ZXh0Lm9iamVjdC5nZXRJbmRleCgpXG5cdClcbn19XG5cdHt7IHZhciBjbGFzc05hbWUgPSAnZmFsc2VCbG9jayc7IH19XG57ez8/XG5cdGNvbnRleHQubXVzaWMgJiYgY29udGV4dC5jb3Vyc2VJbmRleCAmJiBjb250ZXh0Lm11c2ljLmNvbnRhaW5zKFxuXHRcdGNvbnRleHQuY291cnNlSW5kZXgsXG5cdFx0Y29udGV4dC5vYmplY3QuZ2V0SW5kZXgoKVxuXHQpXG59fVxuXHR7eyB2YXIgY2xhc3NOYW1lID0gJ211c2ljYWxCbG9jayc7IH19XG57ez8/fX1cblx0e3sgdmFyIGNsYXNzTmFtZSA9ICcnOyB9fVxue3s/fX1cblxuXG4vKiBTaXggaGVhZC9lbmQgKi9cblxuPHNwYW4gY2xhc3M9XCJ7ez0gY2xhc3NOYW1lIH19XCI+XG5cblx0e3s/IGNvbnRleHQuc2hvd1NpeEhlYWRzIH19XG5cdFx0e3s9IFByaWNrZXIuc3RyaW5nRnJvbVJvdyhjb250ZXh0Lm9iamVjdC5nZXRTdGFydFJvdygpKSB9fVxuXHR7ez8/fX1cblxuXHRcdHt7PyBjb250ZXh0LnVuZGVybGluZSB9fVxuXHRcdFx0PHU+XG5cdFx0e3s/fX1cblxuXHRcdFx0e3s9IFByaWNrZXIuc3RyaW5nRnJvbVJvdyhjb250ZXh0Lm9iamVjdC5nZXRFbmQoKSkgfX1cblxuXHRcdHt7PyBjb250ZXh0LnVuZGVybGluZSB9fVxuXHRcdFx0PC91PlxuXHRcdHt7P319XG5cblx0e3s/fX1cblxuPC9zcGFuPlxuXG4mbmJzcDsmbmJzcDtcblxuXG4vKiBDYWxsICovXG5cbjxzcGFuXG4gY2xhc3M9XCJ7ez0gY29udGV4dC50eXBlIH19U2l4XCJcbiBvbmNsaWNrPVwicHJpY2tlci5jKHt7PSBjb250ZXh0Lm9iamVjdC5nZXRJbmRleCgpIH19KVwiXG4+XG5cdCZuYnNwO1xuXHR7ez8gY29udGV4dC5vYmplY3QuZ2V0Q2FsbCgpID09PSBQcmlja2VyLkNhbGwuUGxhaW4gfX1cblx0XHQmbmJzcDtcblx0e3s/PyBjb250ZXh0Lm9iamVjdC5nZXRDYWxsKCkgPT09IFByaWNrZXIuQ2FsbC5Cb2IgfX1cblx0XHQtXG5cdHt7Pz8gY29udGV4dC5vYmplY3QuZ2V0Q2FsbCgpID09PSBQcmlja2VyLkNhbGwuU2luZ2xlIH19XG5cdFx0c1xuXHR7ez99fVxuXHQmbmJzcDtcbjwvc3Bhbj5cblxuJm5ic3A7Jm5ic3A7XG5cblxuLyogSW5kZXggKi9cblxue3s9IGNvbnRleHQub2JqZWN0LmdldEluZGV4KCkgfX1cblxuPGJyIC8+XG5cblxuLyogU2l4IGVuZCAqL1xuXG57ez8gY29udGV4dC5zaG93U2l4SGVhZHMgfX1cblx0PHNwYW4gY2xhc3M9XCJ7ez0gY2xhc3NOYW1lIH19XCI+XG5cdFx0PHU+XG5cdFx0XHR7ez0gUHJpY2tlci5zdHJpbmdGcm9tUm93KGNvbnRleHQub2JqZWN0LmdldEVuZCgpKSB9fVxuXHRcdDwvdT5cblx0PC9zcGFuPlxuXG5cdDxiciAvPlxue3s/fX1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vKipcbiAqIFJlbmRlcnMgYSBzaXggZm9yIGNvbnN1bXB0aW9uIGJ5IHNpcmlsLWJhc2VkIHByb3ZlcnNcbiAqIEBwYXJhbSB7bnVtYmVyfSAgIHRvdWNoUm93cyAgcm93cyByZW1haW5pbmcgaW4gdGhlIHRvdWNoXG4gKiBAcGFyYW0ge3N0cmluZ30gICB0eXBlICAgICAgIHNpeCB0eXBlLCBlaXRoZXIgXCJxdWlja1wiIG9yIFwic2xvd1wiXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBub3RhdGlvbiAgIGFycmF5IG9mIHBsYWNlIG5vdGF0aW9uXG4gKi9cblxue3tcblx0Y29udGV4dC50b3VjaFJvd3MgPSBjb250ZXh0LnRvdWNoUm93cyB8fCBJbmZpbml0eTtcbn19XG5cbnt7PyBjb250ZXh0Lm9iamVjdC5nZXRDYWxsKCkgPT09IFByaWNrZXIuQ2FsbC5QbGFpbiB9fVxuXHRwbGFpblxue3s/PyBjb250ZXh0Lm9iamVjdC5nZXRDYWxsKCkgPT09IFByaWNrZXIuQ2FsbC5Cb2IgfX1cblx0Ym9iXG57ez8/IGNvbnRleHQub2JqZWN0LmdldENhbGwoKSA9PT0gUHJpY2tlci5DYWxsLlNpbmdsZSB9fVxuXHRzaW5nbGVcbnt7P319XG4sXG4gLyogc2luZ2xlIHNwYWNlICovXG5cbnt7PyBjb250ZXh0LnRvdWNoUm93cyA+IDF9fVxuXHR7ez8gY29udGV4dC50b3VjaFJvd3MgPj0gNiB9fVxuXHRcdHt7PSBjb250ZXh0LnR5cGUgfX1cblx0e3s/P319XG5cdFx0K1xuXHRcdHt7PSBjb250ZXh0Lm5vdGF0aW9uLnNsaWNlKDAsIGNvbnRleHQudG91Y2hSb3dzIC0gMSkuam9pbignLicpIH19XG5cdHt7P319XG5cdCxcblx0IC8qIHNpbmdsZSBzcGFjZSAqL1xue3s/fX1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vKipcbiAqIFJlbmRlcnMgYSBzaW5nbGUgY291cnNlIHdpdGggdGhlIGluaXRpYWwgcm93IHVuZGVybGluZWQgYmVmb3JlIGl0XG4gKi9cblxuPHU+e3s9IFByaWNrZXIuc3RyaW5nRnJvbVJvdyhjb250ZXh0Lm9iamVjdC5nZXRJbml0aWFsUm93KCkpIH19PC91PjxiciAvPlxue3s9IGNvbnRleHQub2JqZWN0LnByaW50KCd0ZXh0JykgfX1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vKipcbiAqIFJlbmRlcnMgYSBjb3Vyc2UgYXMgSFRNTCBmb3IgTUJELXN0eWxlIHByaWNrZXJcbiAqIEBwYXJhbSB7QmxvY2tEaXJlY3Rvcnl9ICBmYWxzZW5lc3MgICAgIGRpcmVjdG9yeSB0byBsb29rdXAgZmFsc2VuZXNzXG4gKiBAcGFyYW0ge0Jsb2NrRGlyZWN0b3J5fSAgbXVzaWMgICAgICAgICBkaXJlY3RvcnkgdG8gbG9va3VwIG11c2ljXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgY291cnNlSW5kZXggICBpbmRleCBudW1iZXIgb2YgdGhlIGNvdXJzZVxuICogQHBhcmFtIHtDb3Vyc2V9ICAgICAgICAgIGV4dHJhU2l4ZXMgICAgYWRkaXRpb25hbCBzaXhlcyB0byBwcmludFxuICogQHBhcmFtIHtib29sZWFufSAgICAgICAgIHNob3dTaXhIZWFkcyAgc2hvdyBzaXggaGVhZHMgYXMgd2VsbCBhcyBzaXggZW5kc1xuICovXG5cbjx1Pnt7PSBQcmlja2VyLnN0cmluZ0Zyb21Sb3coY29udGV4dC5vYmplY3QuZ2V0SW5pdGlhbFJvdygpKSB9fTwvdT48YnIgLz5cblxue3t+IGNvbnRleHQub2JqZWN0LmdldFNpeGVzKCkgOnNpeCB9fVxuXHR7ez8gc2l4LmdldEluZGV4KCkgPT09IGNvbnRleHQub2JqZWN0LmdldExlbmd0aCgpIH19XG5cdFx0e3sgY29udGV4dC51bmRlcmxpbmUgPSB0cnVlIH19XG5cdHt7P319XG5cdHt7PSBzaXgucHJpbnQoJ21iZCcsIGNvbnRleHQpIH19XG57e359fVxuXG57ez8gY29udGV4dC5leHRyYVNpeGVzIH19XG5cdHt7fiBjb250ZXh0LmV4dHJhU2l4ZXMuZ2V0U2l4ZXMoKSA6c2l4IH19XG5cdFx0PHNwYW4gY2xhc3M9XCJleHRyYVNpeFwiPlxuXHRcdHt7PSBQcmlja2VyLnN0cmluZ0Zyb21Sb3coc2l4LmdldEVuZCgpKSB9fVxuXHRcdDwvc3Bhbj48YnIgLz5cblx0e3t+fX1cbnt7P319XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLyoqXG4gKiBSZW5kZXJzIGEgY291cnNlIGZvciBjb25zdW1wdGlvbiBieSBzaXJpbC1iYXNlZCBwcm92ZXJzXG4gKiBAcGFyYW0ge251bWJlcn0gIHRvdWNoUm93cyAgcm93cyByZW1haW5pbmcgaW4gdGhlIHRvdWNoXG4gKi9cblxue3tcblx0Y29udGV4dC50b3VjaFJvd3MgPSBjb250ZXh0LnRvdWNoUm93cyB8fCBJbmZpbml0eTtcbn19XG5cbnt7fiBjb250ZXh0Lm9iamVjdC5nZXRTaXhlcygpIDpzaXggfX1cblx0e3s9IHNpeC5wcmludCgnc2lyaWwnLCB7J3RvdWNoUm93cyc6IGNvbnRleHQudG91Y2hSb3dzfSkgfX1cblxuXHR7eyBjb250ZXh0LnRvdWNoUm93cyAtPSBzaXguZXN0aW1hdGVSb3dzKCk7IH19XG5cdHt7PyBjb250ZXh0LnRvdWNoUm93cyA8PSAwIH19XG5cdFx0e3sgYnJlYWs7IH19XG5cdHt7P319XG57e359fVxuXG5cIkAgIHt7PSBjb250ZXh0Lm9iamVjdC5wcmludCgndGV4dCcsIHsnY291cnNlRW5kJzogZmFsc2V9KSB9fVwiXG57ez0gJ1xcbicgfX1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vKipcbiAqIFJlbmRlcnMgYSBjb3Vyc2UsIGUuZy46XG4gKiA0ODA3MzU2OTJFMSAgczIgMyAgKDQgc2l4ZXMpXG4gKiAyMzE0NTY3ODkwRSAgcFxuICogQHBhcmFtIHtzdHJpbmd9ICAgZW5kICAgICAgICBsaW5lIGVuZGluZ1xuICogQHBhcmFtIHtib29sZWFufSAgY291cnNlRW5kICB3aGV0aGVyIHRvIHByaW50IHRoZSBjb3Vyc2UgZW5kXG4gKi9cblxue3tcblx0dmFyIGNhbGxzID0gWyBdO1xuXHRjb250ZXh0LmVuZCA9IGNvbnRleHQuZW5kIHx8ICcnO1xuXHRpZiAoY29udGV4dC5jb3Vyc2VFbmQgPT09IHVuZGVmaW5lZCkge1xuXHRcdGNvbnRleHQuY291cnNlRW5kID0gdHJ1ZTtcblx0fVxufX1cblxue3s/IGNvbnRleHQuY291cnNlRW5kIH19XG5cdHt7PSBQcmlja2VyLnN0cmluZ0Zyb21Sb3coY29udGV4dC5vYmplY3QuZ2V0RW5kKCkpIH19XG5cdCAvKiBzaW5nbGUgc3BhY2UgKi9cblx0IC8qIHNpbmdsZSBzcGFjZSAqL1xue3s/fX1cblxue3t+IGNvbnRleHQub2JqZWN0LmdldFNpeGVzKCkgOnNpeCB9fVxuXHR7ez8gc2l4LmdldENhbGwoKSB9fVxuXHRcdHt7IGNhbGxzLnB1c2goXG5cdFx0XHQoKHNpeC5nZXRDYWxsKCkgPT09IFByaWNrZXIuQ2FsbC5TaW5nbGUpID8gJ3MnIDogJycpXG5cdFx0XHRcdCsgc2l4LmdldEluZGV4KClcblx0XHQpOyB9fVxuXHR7ez99fVxue3t+fX1cblxue3s/IGNhbGxzLmxlbmd0aCB9fVxuXHR7ez0gY2FsbHMuam9pbignICcpIH19XG57ez8/fX1cblx0cFxue3s/fX1cblxue3s/IGNvbnRleHQub2JqZWN0LmdldExlbmd0aCgpICE9PSBjb250ZXh0Lm9iamVjdC5nZXRJbml0aWFsUm93KCkubGVuZ3RoICogMiB9fVxuXHQgLyogc2luZ2xlIHNwYWNlICovXG5cdCAvKiBzaW5nbGUgc3BhY2UgKi9cblx0KHt7PSBjb250ZXh0Lm9iamVjdC5nZXRMZW5ndGgoKSB9fSBzaXhlcylcbnt7P319XG5cbnt7PSBjb250ZXh0LmVuZCB9fVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8qKlxuICogUmVuZGVycyBhIHF1aWNrIHNpeCBhcyBIVE1MIGZvciBNQkQtc3R5bGUgcHJpY2tlclxuICogQHBhcmFtIHtCbG9ja0RpcmVjdG9yeX0gIGZhbHNlbmVzcyAgICBkaXJlY3RvcnkgdG8gbG9va3VwIGZhbHNlbmVzc1xuICogQHBhcmFtIHtCbG9ja0RpcmVjdG9yeX0gIG11c2ljICAgICAgICBkaXJlY3RvcnkgdG8gbG9va3VwIG11c2ljXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgY291cnNlSW5kZXggIGluZGV4IG51bWJlciBvZiB0aGUgY291cnNlXG4gKiBAcGFyYW0ge2Jvb2xlYW59ICAgICAgICAgdW5kZXJsaW5lICAgIHdoZXRoZXIgdG8gdW5kZXJsaW5lIHRoZSBzaXhlbmRcbiAqL1xuXG57eyBjb250ZXh0LnR5cGUgPSAncXVpY2snOyB9fVxuXG57ez0gUHJpY2tlci5UZW1wbGF0ZXNbJ0Fic3RyYWN0U2l4Lm1iZCddKGNvbnRleHQpIH19XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLyoqXG4gKiBSZW5kZXJzIGEgcXVpY2sgc2l4IGZvciBjb25zdW1wdGlvbiBieSBzaXJpbC1iYXNlZCBwcm92ZXJzXG4gKiBAcGFyYW0ge251bWJlcn0gIHRvdWNoUm93cyAgcm93cyByZW1haW5pbmcgaW4gdGhlIHRvdWNoXG4gKi9cblxue3tcblx0Y29udGV4dC50eXBlID0gJ3F1aWNrJztcblx0Y29udGV4dC5ub3RhdGlvbiA9IFsnMScsICczJywgJzEnLCAnMyddO1xufX1cblxue3s9IFByaWNrZXIuVGVtcGxhdGVzWydBYnN0cmFjdFNpeC5zaXJpbCddKGNvbnRleHQpIH19XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLyoqXG4gKiBSZW5kZXJzIGEgc2xvdyBzaXggYXMgSFRNTCBmb3IgTUJELXN0eWxlIHByaWNrZXJcbiAqIEBwYXJhbSB7QmxvY2tEaXJlY3Rvcnl9ICBmYWxzZW5lc3MgICAgZGlyZWN0b3J5IHRvIGxvb2t1cCBmYWxzZW5lc3NcbiAqIEBwYXJhbSB7QmxvY2tEaXJlY3Rvcnl9ICBtdXNpYyAgICAgICAgZGlyZWN0b3J5IHRvIGxvb2t1cCBtdXNpY1xuICogQHBhcmFtIHtudW1iZXJ9ICAgICAgICAgIGNvdXJzZUluZGV4ICBpbmRleCBudW1iZXIgb2YgdGhlIGNvdXJzZVxuICogQHBhcmFtIHtib29sZWFufSAgICAgICAgIHVuZGVybGluZSAgICB3aGV0aGVyIHRvIHVuZGVybGluZSB0aGUgc2l4ZW5kXG4gKi9cblxue3sgY29udGV4dC50eXBlID0gJ3Nsb3cnOyB9fVxuXG57ez0gUHJpY2tlci5UZW1wbGF0ZXNbJ0Fic3RyYWN0U2l4Lm1iZCddKGNvbnRleHQpIH19XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLyoqXG4gKiBSZW5kZXJzIGEgc2xvdyBzaXggZm9yIGNvbnN1bXB0aW9uIGJ5IHNpcmlsLWJhc2VkIHByb3ZlcnNcbiAqIEBwYXJhbSB7bnVtYmVyfSAgdG91Y2hSb3dzICByb3dzIHJlbWFpbmluZyBpbiB0aGUgdG91Y2hcbiAqL1xuXG57e1xuXHRjb250ZXh0LnR5cGUgPSAnc2xvdyc7XG5cdGNvbnRleHQubm90YXRpb24gPSBbJzMnLCAnMScsICczJywgJzEnXTtcbn19XG5cbnt7PSBQcmlja2VyLlRlbXBsYXRlc1snQWJzdHJhY3RTaXguc2lyaWwnXShjb250ZXh0KSB9fVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8qKlxuICogUmVuZGVycyBhIHRvdWNoIGFzIEhUTUwgZm9yIHVzZSB3aXRoaW4gYSA8c2VsZWN0PiBlbGVtZW50XG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgdG91Y2hSb3dzICAgICAgIGNvdW50IG9mIHJvd3MgaW4gdGhlIHRvdWNoXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgc3R5bGVVbnJlYWNoZWQgIHN0eWxlIHRvIGFwcGx5IGZvciB1bnJlYWNoZWQgY291cnNlc1xuICogQHBhcmFtIHtCbG9ja0RpcmVjdG9yeX0gIGZhbHNlbmVzcyAgICAgICBkaXJlY3RvcnkgdG8gbG9va3VwIGZhbHNlbmVzc1xuICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgIHN0eWxlRmFsc2UgICAgICBzdHlsZSB0byBhcHBseSBmb3IgZmFsc2UgY291cnNlc1xuICovXG5cbnt7XG5cdGNvbnRleHQudG91Y2hSb3dzID0gY29udGV4dC50b3VjaFJvd3MgfHwgSW5maW5pdHk7XG5cdGNvbnRleHQudG91Y2hSb3dzIC09IDI7ICAvKiBUT0RPIG1hZ2ljIG51bWJlciAqL1xuXHRjb250ZXh0LnN0eWxlVW5yZWFjaGVkID0gY29udGV4dC5zdHlsZVVucmVhY2hlZCB8fCAnJztcblx0Y29udGV4dC5zdHlsZUZhbHNlID0gY29udGV4dC5zdHlsZUZhbHNlIHx8ICcnO1xufX1cblxuPG9wdGlvbiB2YWx1ZT1cIjBcIj5cblx0e3s9IFByaWNrZXIuc3RyaW5nRnJvbVJvdyhjb250ZXh0Lm9iamVjdC5nZXRJbml0aWFsUm93KCkpIH19XG48L29wdGlvbj5cblxue3t+IGNvbnRleHQub2JqZWN0LmdldENvdXJzZXMoKSA6Y291cnNlIH19XG5cdDxvcHRpb25cblx0XHQgdmFsdWU9XCJ7ez0gY291cnNlLmdldEluZGV4KCkgfX1cIlxuXHRcdHt7PyBjb250ZXh0LnRvdWNoUm93cyA8PSAwIH19XG5cdFx0XHQgLyogc2luZ2xlIHNwYWNlICovXG5cdFx0XHRzdHlsZT1cInt7PSBjb250ZXh0LnN0eWxlVW5yZWFjaGVkIH19XCJcblx0XHR7ez99fVxuXHRcdHt7PyBjb250ZXh0LmZhbHNlbmVzcyAmJiBjb250ZXh0LmZhbHNlbmVzcy5jb250YWlucyhjb3Vyc2UpIH19XG5cdFx0XHQgLyogc2luZ2xlIHNwYWNlICovXG5cdFx0XHRzdHlsZT1cInt7PSBjb250ZXh0LnN0eWxlRmFsc2UgfX1cIlxuXHRcdHt7P319XG5cdD5cblx0XHR7ez0gY291cnNlLnByaW50KCd0ZXh0JykgfX1cblx0PC9vcHRpb24+XG5cdHt7IGNvbnRleHQudG91Y2hSb3dzIC09IGNvdXJzZS5lc3RpbWF0ZVJvd3MoKTsgfX1cbnt7fn19XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLyoqXG4gKiBSZW5kZXJzIGEgdG91Y2ggZm9yIGNvbnN1bXB0aW9uIGJ5IHNpcmlsLWJhc2VkIHByb3ZlcnNcbiAqIEBwYXJhbSB7bnVtYmVyfSAgdG91Y2hSb3dzICByb3dzIGluIHRoZSB0b3VjaFxuICovXG5cbnt7XG5cdHZhciBjb3Vyc2VOYW1lcyA9IFsgXSxcblx0XHRyb3VuZHMgPSBQcmlja2VyLnN0cmluZ0Zyb21Sb3coXG5cdFx0XHRQcmlja2VyLnJvd0Zyb21TdHJpbmcoJycsIGNvbnRleHQub2JqZWN0LmdldEluaXRpYWxSb3coKS5sZW5ndGgpXG5cdFx0KTtcblxuXHRjb250ZXh0LnRvdWNoUm93cyA9IGNvbnRleHQudG91Y2hSb3dzIHx8IEluZmluaXR5O1xuXHRjb250ZXh0LnRvdWNoUm93cyAtPSAyOyAgLyogVE9ETzogbWFnaWMgbnVtYmVyICovXG59fVxuXG4vKiBIZWFkZXIgKi9cbi8vIEdlbmVyYXRlZCBieSBGcmVlIFRvdWNoIFByaWNrZXJ7ez0gJ1xcbicgfX1cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW1wbGVpZ2gvdG91Y2gtcHJpY2tlcnt7PSAnXFxuJyB9fVxue3s9ICdcXG4nIH19XG5cbi8qIE91dHB1dCB0b3VjaCBhcyBjb21tZW50cyAqL1xuLy8ge3s9IFByaWNrZXIuc3RyaW5nRnJvbVJvdyhjb250ZXh0Lm9iamVjdC5nZXRJbml0aWFsUm93KCkpIH19e3s9ICdcXG4nIH19XG57e34gY29udGV4dC5vYmplY3QuZ2V0Q291cnNlcygpIDpjb3Vyc2UgfX1cblx0Ly8ge3s9IGNvdXJzZS5wcmludCgndGV4dCcpIH19e3s9ICdcXG4nIH19XG57e359fVxue3s9ICdcXG4nIH19XG5cbi8qIE51bWJlciBvZiBiZWxscyAqL1xue3s9IGNvbnRleHQub2JqZWN0LmdldEluaXRpYWxSb3coKS5sZW5ndGggfX0gYmVsbHN7ez0gJ1xcbicgfX1cbnt7PSAnXFxuJyB9fVxuXG4vKiBNaWNyb1NJUklMIHdpbGwgcHJvdmUgdGhlIGZpcnN0IHN5bWJvbCBpbiB0aGUgZmlsZSwgc28gZGVmaW5lIGl0ICovXG5jb21wb3NpdGlvbiA9IHRvdWNoe3s9ICdcXG4nIH19XG57ez0gJ1xcbicgfX1cblxuLyogU2hvcnQgYmxvY2tzICovXG5zbG93ID0gKzMuMS4zLjEuM3t7PSAnXFxuJyB9fVxucXVpY2sgPSArMS4zLjEuMy4xe3s9ICdcXG4nIH19XG5wbGFpbiA9ICt7ez0gcm91bmRzLnNsaWNlKC0xKSB9fXt7PSAnXFxuJyB9fVxuYm9iID0gK3t7PSByb3VuZHMuc2xpY2UoLTMsIC0yKSB9fXt7PSAnXFxuJyB9fVxuc2luZ2xlID0gK3t7PSByb3VuZHMuc2xpY2UoLTMpIH19e3s9ICdcXG4nIH19XG57ez0gJ1xcbicgfX1cblxuLyogQ291cnNlIGRlZmluaXRpb25zICovXG57e34gY29udGV4dC5vYmplY3QuZ2V0Q291cnNlcygpIDpjb3Vyc2U6aW5kZXggfX1cblx0Y291cnNle3s9IGluZGV4ICsgMSB9fSA9XG5cdCAvKiBzaW5nbGUgc3BhY2UgKi9cblx0e3s9IGNvdXJzZS5wcmludCgnc2lyaWwnLCB7J3RvdWNoUm93cyc6IGNvbnRleHQudG91Y2hSb3dzfSkgfX1cblx0e3sgY291cnNlTmFtZXMucHVzaCgnY291cnNlJyArIChpbmRleCArIDEpKTsgfX1cblxuXHR7eyBjb250ZXh0LnRvdWNoUm93cyAtPSBjb3Vyc2UuZXN0aW1hdGVSb3dzKCk7IH19XG5cdHt7PyBjb250ZXh0LnRvdWNoUm93cyA8PSAwIH19XG5cdFx0e3sgYnJlYWs7IH19XG5cdHt7P319XG57e359fVxue3s9ICdcXG4nIH19XG5cbi8qIFRvdWNoIC0gYWxsIHRoZSBjb3Vyc2VzICovXG50b3VjaCA9ICszLjEsIHt7PSBjb3Vyc2VOYW1lcy5qb2luKCcsICcpIH19e3s9ICdcXG4nIH19XG57ez0gJ1xcbicgfX1cblxuLyogRGVmaW5lIHRoZSB0b3VjaCB0byBwcm92ZSBmb3IgR1NpcmlsICovXG5wcm92ZSB0b3VjaHt7PSAnXFxuJyB9fVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8qKlxuICogUmVuZGVycyBhIHRvdWNoIGFzIHRleHRcbiAqL1xuXG57ez0gUHJpY2tlci5zdHJpbmdGcm9tUm93KGNvbnRleHQub2JqZWN0LmdldEluaXRpYWxSb3coKSkgfX17ez0gJ1xcbicgfX1cbnt7fiBjb250ZXh0Lm9iamVjdC5nZXRDb3Vyc2VzKCkgOmNvdXJzZSB9fVxuXHR7ez0gY291cnNlLnByaW50KCd0ZXh0JywgeydlbmQnOiAnXFxuJ30pIH19XG57e359fVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8qKlxuICogUmVuZGVycyBhbiBBYnN0cmFjdFNjaGVtZSBhcyB0ZXh0XG4gKi9cblxue3t+IGNvbnRleHQub2JqZWN0LmdldE1hdGNoZXJzKCkgOm1hdGNoZXIgfX1cblxuXHR7ez0gbWF0Y2hlci5wcmludCgndGV4dCcpIH19XG5cbnt7fn19XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLyoqXG4gKiBSZW5kZXJzIGEgUGF0dGVybiBhcyB0ZXh0XG4gKiBAcGFyYW0ge3N0cmluZ30gZW5kICBsaW5lIGVuZGluZ1xuICovXG5cbnt7PyBjb250ZXh0LmVuZCA9PT0gdW5kZWZpbmVkIH19XG5cdHt7IGNvbnRleHQuZW5kID0gJ1xcbic7IH19XG57ez99fVxuXG57ez8gY29udGV4dC5vYmplY3QuZ2V0TWF0Y2hDb3VudCgpID4gMCB9fVxuXG5cdHt7PyBjb250ZXh0Lm9iamVjdC5pc1dpbGRjYXJkTWF0Y2goKSB8fFxuXHRcdFx0Y29udGV4dC5vYmplY3QuZ2V0TWF0Y2hDb3VudCgpID4gMVxuXHR9fVxuXHRcdHt7PSBjb250ZXh0Lm9iamVjdC5nZXRNYXRjaENvdW50KCkgfX1cblx0XHQgLyogc2luZ2xlIHNwYWNlICovXG5cdHt7P319XG5cblx0e3s9IGNvbnRleHQub2JqZWN0LmdldE5hbWUoKSB9fVxuXG5cdHt7PSBjb250ZXh0LmVuZCB9fVxuXG57ez99fVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8qKlxuICogUmVuZGVycyBhIFBhdHRlcm5Hcm91cCBhcyB0ZXh0XG4gKi9cblxue3s/IGNvbnRleHQub2JqZWN0LmdldE1hdGNoQ291bnQoKSA+IDAgfX1cblxuXHR7ez0gY29udGV4dC5vYmplY3QuZ2V0TWF0Y2hDb3VudCgpIH19XG5cblx0IC8qIHNpbmdsZSBzcGFjZSAqL1xuXG5cdHt7PSBjb250ZXh0Lm9iamVjdC5nZXROYW1lKCkgfX1cblxuXHR7ez8gY29udGV4dC5vYmplY3QuZ2V0U3VibWF0Y2hDb3VudCgpID4gMCB9fVxuXG5cdFx0IC8qIHNpbmdsZSBzcGFjZSAqL1xuXHRcdChcblxuXHRcdHt7IHZhciBmaXJzdCA9IHRydWU7IH19XG5cdFx0e3t+IGNvbnRleHQub2JqZWN0LmdldFBhdHRlcm5zKCkgOnBhdHRlcm4gfX1cblx0XHRcdHt7IGlmICghcGF0dGVybikgeyBjb250aW51ZTsgfSAvKiBJRTggdHJhaWxpbmcgY29tbWEgKi8gfX1cblx0XHRcdHt7PyBwYXR0ZXJuLmdldE1hdGNoQ291bnQoKSA+IDAgfX1cblx0XHRcdFx0e3s/ICFmaXJzdCB9fSwge3s/fX1cblx0XHRcdFx0e3s9IHBhdHRlcm4ucHJpbnQoJ3RleHQnLCB7J2VuZCc6ICcnfSkgfX1cblx0XHRcdFx0e3sgZmlyc3QgPSBmYWxzZTsgfX1cblx0XHRcdHt7P319XG5cdFx0e3t+fX1cblxuXHRcdClcblxuXHR7ez99fVxuXG5cdHt7PSAnXFxuJyB9fVxuXG57ez99fVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8qKlxuICogQ1NTIGZvciBNQkQtc3R5bGUgcHJpY2tlclxuICovXG5cbiNzaXhlbmRzIHtcbiAgICBmbG9hdDogbGVmdDtcbiAgICBmb250LWZhbWlseTogXCJDb3VyaWVyIE5ld1wiLCBcIkNvdXJpZXJcIiwgXCJtb25vc3BhY2VcIjtcbiAgICBmb250LXNpemU6IDEycHQ7XG4gICAgbWFyZ2luLXJpZ2h0OiAyNXB4O1xufVxuXG4jY29udHJvbHMge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIG1hcmdpbi1yaWdodDogMjVweDtcbn1cblxuLnRhYiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0VGRUZGNztcbiAgICBib3JkZXItY29sb3I6IGJsYWNrO1xuICAgIGJvcmRlci1yYWRpdXM6IDE1cHggMCAwIDA7XG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICBib3JkZXItd2lkdGg6IDFweCAxcHggMCAxcHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIGhlaWdodDogMjBweDtcbiAgICBsaW5lLWhlaWdodDogMjBweDtcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG4gICAgcGFkZGluZy1yaWdodDogOHB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnRhYi1zZWxlY3RlZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0JEQkRFNztcbiAgICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuI3BhZ2VzIHtcbiAgICB3aWR0aDogMzYwcHg7XG59XG5cbi5wYWdlIHtcbiAgICBib3JkZXItY29sb3I6IGJsYWNrO1xuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gICAgY2xlYXI6IGxlZnQ7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICBwYWRkaW5nOiA5cHg7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIHdpZHRoOiAzNDBweDtcbn1cblxuLnBhZ2Utc2VsZWN0ZWQge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG59XG5cbi5wYWdlIGRpdiwgLnBhZ2UgZGl2I3NhdmVkQ2FsbGluZyB7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbn1cblxuLnBhZ2UgZGl2Omxhc3Qtb2YtdHlwZSB7XG4gICAgbWFyZ2luLWJvdHRvbTogMHB4O1xufVxuXG4ucGFnZSBmb3JtIHtcbiAgICBoZWlnaHQ6IDI1cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLnBhZ2UgdGV4dGFyZWEge1xuICAgIGJvcmRlci13aWR0aDogMXB4O1xuICAgIGhlaWdodDogNDUwcHg7XG4gICAgcGFkZGluZzogMXB4O1xuICAgIHdpZHRoOiAzMzZweDtcbn1cblxuI3RvdWNoIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUZFRkY3O1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIHBhZGRpbmc6IDEwcHg7XG59XG5cbi5zbG93U2l4IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjBGMEY4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnF1aWNrU2l4IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRTJFMkYwO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmV4dHJhU2l4IHtcbiAgICBjb2xvcjogIzUwNTA1MDtcbn1cblxuLmZhbHNlQmxvY2sge1xuICAgIGNvbG9yOiByZWQ7XG59XG5cbi5tdXNpY2FsQmxvY2sge1xuICAgIGNvbG9yOiBnb2xkO1xufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8qKlxuICogSFRNTCBmb3IgTUJELXN0eWxlIHByaWNrZXJcbiAqL1xuXG48ZGl2IGlkPVwic2l4ZW5kc1wiPjwvZGl2PlxuXG48ZGl2IGlkPVwiY29udHJvbHNcIj5cblxuICA8ZGl2IGlkPVwidGFic1wiPlxuICAgIDxkaXYgaWQ9XCJ0YWJfcHJpY2tpbmdcIiBvbmNsaWNrPVwicHJpY2tlci5vblRhYigncHJpY2tpbmcnKVwiIGNsYXNzPVwidGFiIHRhYi1zZWxlY3RlZFwiPlByaWNraW5nPC9kaXY+XG4gICAgPGRpdiBpZD1cInRhYl9sb2FkU2F2ZVwiIG9uY2xpY2s9XCJwcmlja2VyLm9uVGFiKCdsb2FkU2F2ZScpXCIgY2xhc3M9XCJ0YWJcIj5Mb2FkL1NhdmU8L2Rpdj5cbiAgICA8ZGl2IGlkPVwidGFiX3NpcmlsXCIgICAgb25jbGljaz1cInByaWNrZXIub25UYWIoJ3NpcmlsJylcIiAgICBjbGFzcz1cInRhYlwiPlNpcmlsPC9kaXY+XG4gICAgPGRpdiBpZD1cInRhYl9tdXNpY1wiICAgIG9uY2xpY2s9XCJwcmlja2VyLm9uVGFiKCdtdXNpYycpXCIgICAgY2xhc3M9XCJ0YWJcIj5NdXNpYzwvZGl2PlxuXHQ8ZGl2IGlkPVwidGFiX3ZpZXdcIiAgICAgb25jbGljaz1cInByaWNrZXIub25UYWIoJ3ZpZXcnKVwiICAgICBjbGFzcz1cInRhYlwiPlZpZXc8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBpZD1cInBhZ2VzXCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwicGFnZSBwYWdlLXNlbGVjdGVkXCIgaWQ9XCJwYWdlX3ByaWNraW5nXCI+XG4gICAgICA8ZGl2PlxuICAgICAgICA8bGFiZWwgZm9yPVwic3RhZ2VcIj5OdW1iZXIgb2YgYmVsbHM6PC9sYWJlbD5cbiAgICAgICAgPHNlbGVjdCBpZD1cInN0YWdlXCIgb25jaGFuZ2U9XCJwcmlja2VyLm9uU3RhZ2UoKVwiPjwvc2VsZWN0PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICBDb3Vyc2UgZnJvbSByb3VuZHM6XG4gICAgICAgIDxkaXYgaWQ9XCJjYWxsaW5nRnJvbVJvdW5kc1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICBGcm9tIGN1cnJlbnQgc3RhcnQgcm93OlxuICAgICAgICA8ZGl2IGlkPVwiY2FsbGluZ1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICA8Zm9ybSBvbnN1Ym1pdD1cInJldHVybiBmYWxzZVwiPlxuICAgICAgICA8bGFiZWwgZm9yPVwiaW5pdGlhbFJvd1wiPlN0YXJ0aW5nIHJvdzo8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImluaXRpYWxSb3dcIiBzaXplPVwiMTVcIiBtYXhMZW5ndGg9XCIxNVwiIC8+XG4gICAgICAgIDxidXR0b24gb25jbGljaz1cInByaWNrZXIub25TZXRJbml0aWFsUm93KClcIj5TZXQ8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwicHJpY2tlci5vblJlc2V0SW5pdGlhbFJvdygpXCI+UmVzZXQ8L2J1dHRvbj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICA8Zm9ybSBvbnN1Ym1pdD1cInJldHVybiBmYWxzZVwiPlxuICAgICAgICA8bGFiZWwgZm9yPVwiY291cnNlTGVuZ3RoXCI+Q291cnNlIGxlbmd0aDo8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImNvdXJzZUxlbmd0aFwiIHNpemU9XCIyXCIgbWF4TGVuZ3RoPVwiMlwiIC8+XG4gICAgICAgIDxidXR0b24gb25jbGljaz1cInByaWNrZXIub25TZXRMZW5ndGgoKVwiPlNldDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIG9uY2xpY2s9XCJwcmlja2VyLm9uUmVzZXRMZW5ndGgoKVwiPlJlc2V0PC9idXR0b24+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdj5cbiAgICAgICAgPGxhYmVsIGZvcj1cImNhbGxSZXNldFwiPkN1cnJlbnQgY2FsbGluZzo8L2xhYmVsPlxuICAgICAgICA8YnV0dG9uIGlkPVwiY2FsbFJlc2V0XCIgb25jbGljaz1cInByaWNrZXIub25SZXNldENhbGxzKClcIj5SZXNldDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICBTYXZlZCBjYWxsaW5nOlxuICAgICAgICA8ZGl2IGlkPVwic2F2ZWRDYWxsaW5nXCI+PC9kaXY+XG4gICAgICAgIDxidXR0b24gaWQ9XCJzYXZlQ2FsbGluZ1wiIG9uY2xpY2s9XCJwcmlja2VyLm9uU2F2ZUNhbGxpbmcoKVwiPlNhdmU8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBpZD1cImxvYWRDYWxsaW5nXCIgb25jbGljaz1cInByaWNrZXIub25Mb2FkQ2FsbGluZygpXCI+TG9hZDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicGFnZVwiIGlkPVwicGFnZV9sb2FkU2F2ZVwiPlxuICAgICAgPGZvcm0gb25zdWJtaXQ9XCJyZXR1cm4gZmFsc2VcIj5cbiAgICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwicHJpY2tlci5vbkxvYWRUb3VjaCgpXCI+SW1wb3J0PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gb25jbGljaz1cInByaWNrZXIub25TYXZlVG91Y2goKVwiPkV4cG9ydDwvYnV0dG9uPlxuICAgICAgPC9mb3JtPlxuICAgICAgPHRleHRhcmVhIGlkPVwibG9hZFNhdmVUZXh0YXJlYVwiPjwvdGV4dGFyZWE+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicGFnZVwiIGlkPVwicGFnZV9zaXJpbFwiPlxuICAgICAgPGZvcm0gb25zdWJtaXQ9XCJyZXR1cm4gZmFsc2VcIj5cbiAgICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwicHJpY2tlci5vbkdlbmVyYXRlU2lyaWwoKVwiPkdlbmVyYXRlPC9idXR0b24+XG4gICAgICA8L2Zvcm0+XG4gICAgICA8dGV4dGFyZWEgaWQ9XCJzaXJpbFRleHRhcmVhXCI+PC90ZXh0YXJlYT5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJwYWdlXCIgaWQ9XCJwYWdlX211c2ljXCI+XG4gICAgICA8Zm9ybSBvbnN1Ym1pdD1cInJldHVybiBmYWxzZVwiPlxuICAgICAgICA8YnV0dG9uIG9uY2xpY2s9XCJwcmlja2VyLm9uQW5hbHlzZU11c2ljKClcIj5BbmFseXNlPC9idXR0b24+XG4gICAgICA8L2Zvcm0+XG4gICAgICA8dGV4dGFyZWEgaWQ9XCJtdXNpY1RleHRhcmVhXCI+PC90ZXh0YXJlYT5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJwYWdlXCIgaWQ9XCJwYWdlX3ZpZXdcIj5cbiAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cInNob3dTaXhIZWFkc1wiIG9uY2xpY2s9XCJwcmlja2VyLm9uU2hvd1NpeEhlYWRzKClcIi8+XG4gICAgICA8bGFiZWwgZm9yPVwic2hvd1NpeEhlYWRzXCI+U2hvdyBzaXggaGVhZHM8L2xhYmVsPlxuICAgIDwvZGl2PlxuXG4gIDwvZGl2PlxuXG48L2Rpdj5cblxuPGRpdiBpZD1cInRvdWNoXCI+XG4gIDxkaXY+XG4gICAgPGJ1dHRvbiBvbmNsaWNrPVwicHJpY2tlci5vblByb3ZlKClcIj5QUk9WRTwvYnV0dG9uPlxuICAgIDxzcGFuIGlkPVwicHJvb2ZSZXN1bHRcIj48L3NwYW4+XG4gIDwvZGl2PlxuICA8ZGl2IGlkPVwibnVtUm93c1wiPjwvZGl2PlxuICA8bGFiZWw+XG4gICAgPGlucHV0IGlkPVwicm9sbGluZ1wiIHR5cGU9XCJjaGVja2JveFwiIC8+XG4gICAgUm9sbGluZyBjb3Vyc2UgZW50cnlcbiAgPC9sYWJlbD5cbiAgPGZvcm0gb25zdWJtaXQ9XCJyZXR1cm4gZmFsc2VcIj5cbiAgICA8YnV0dG9uIG9uY2xpY2s9XCJwcmlja2VyLm9uSW5zZXJ0Q291cnNlKClcIj5JbnNlcnQ8L2J1dHRvbj5cbiAgICA8YnV0dG9uIG9uY2xpY2s9XCJwcmlja2VyLm9uUGFzdGVDb3Vyc2UoKVwiPlBhc3RlPC9idXR0b24+XG4gICAgPGJ1dHRvbiBvbmNsaWNrPVwicHJpY2tlci5vbkNvcHlDb3Vyc2UoKVwiPkNvcHk8L2J1dHRvbj5cbiAgICA8YnV0dG9uIG9uY2xpY2s9XCJwcmlja2VyLm9uQ3V0Q291cnNlKClcIj5DdXQ8L2J1dHRvbj5cbiAgICA8YnV0dG9uIG9uY2xpY2s9XCJwcmlja2VyLm9uRGVsZXRlQ291cnNlKClcIj5EZWxldGU8L2J1dHRvbj5cbiAgPC9mb3JtPlxuICA8c2VsZWN0IGlkPVwiY291cnNlc1wiPlxuICA8L3NlbGVjdD5cbiAgPGZvcm0gb25zdWJtaXQ9XCJyZXR1cm4gZmFsc2VcIj5cbiAgICA8YnV0dG9uIG9uY2xpY2s9XCJwcmlja2VyLm9uSW5zZXJ0Q291cnNlKClcIj5JbnNlcnQ8L2J1dHRvbj5cbiAgICA8YnV0dG9uIG9uY2xpY2s9XCJwcmlja2VyLm9uUGFzdGVDb3Vyc2UoKVwiPlBhc3RlPC9idXR0b24+XG4gICAgPGJ1dHRvbiBvbmNsaWNrPVwicHJpY2tlci5vbkNvcHlDb3Vyc2UoKVwiPkNvcHk8L2J1dHRvbj5cbiAgICA8YnV0dG9uIG9uY2xpY2s9XCJwcmlja2VyLm9uQ3V0Q291cnNlKClcIj5DdXQ8L2J1dHRvbj5cbiAgICA8YnV0dG9uIG9uY2xpY2s9XCJwcmlja2VyLm9uRGVsZXRlQ291cnNlKClcIj5EZWxldGU8L2J1dHRvbj5cbiAgPC9mb3JtPlxuPC9kaXY+XG4iXX0=
