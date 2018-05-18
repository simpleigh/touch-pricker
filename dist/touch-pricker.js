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
                newSixes[index - 1] = this.createBlock(initialRow, index);
                newSixes[index - 1].setCall(this.getSix(index).getCall());
                initialRow = newSixes[index - 1].getLast();
            }
            this._blocks = newSixes;
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
    var Start = /** @class */ (function () {
        /**
         * Constructor
         * @param rowIndex  index of rounds within the six
         * @param sixType   type of six
         */
        function Start(rowIndex, sixType) {
            if (rowIndex === void 0) { rowIndex = 4; }
            if (sixType === void 0) { sixType = Pricker.SixType.Quick; }
            /**
             * Path for this class' templates
             */
            this.templatePath = 'Start';
            if (rowIndex < 1 || rowIndex > 6) {
                throw new Error('Row index out of range');
            }
            this._rowIndex = rowIndex;
            this._sixType = sixType;
        }
        /* Start methods ******************************************************/
        /**
         * Sets the stage
         */
        Start.prototype.setStage = function (stage) {
            var row = Pricker.rowFromString('123', stage);
            this._rows = [];
            if (this._rowIndex === 6) {
                this._lastRow = row;
                return this;
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
            return this;
        };
        /**
         * Provides read access to the row index
         */
        Start.prototype.getRowIndex = function () {
            return this._rowIndex;
        };
        /**
         * Provides read access to the six type
         */
        Start.prototype.getSixType = function () {
            return this._sixType;
        };
        /**
         * Returns the last row of the start
         */
        Start.prototype.getLast = function () {
            if (!this._lastRow) {
                throw new Error('Must set stage before using start object');
            }
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
            if (!this._rows) {
                throw new Error('Must set stage before using start object');
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
         * Counts the number of rows during the start
         */
        Start.prototype.estimateRows = function () {
            return 6 - this._rowIndex;
        };
        return Start;
    }());
    Pricker.Start = Start;
    Pricker.PrintableMixin.makePrintable(Start);
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
            _this._start = new Pricker.Start();
            _this._start.setStage(initialRow.length);
            return _this;
        }
        /* AbstractBlock methods **********************************************/
        /**
         * Write access to the initial row
         */
        Touch.prototype.setInitialRow = function (initialRow) {
            this._start.setStage(initialRow.length);
            this.calculate();
            return this;
        };
        /**
         * Receives a visitor that will be called to process each row
         */
        Touch.prototype.accept = function () {
            var visitors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                visitors[_i] = arguments[_i];
            }
            this._start.setStage(this._initialRow.length);
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
            this._start.setStage(this._initialRow.length);
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
         * Write access to the start
         */
        Touch.prototype.setStart = function (start) {
            this._start = start;
            this.notify(0);
            return this;
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
                    course = Pricker.Course.fromString(touch.getLast(), line);
                    touch.insertCourse(touch.getLength() + 1, course);
                }
            }
            if (!touch) {
                throw new Error('No input lines');
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
Pricker.Templates["Start.siril"] = function anonymous(context
/*``*/) {
var out=''; var Six = [Pricker.Slow, Pricker.Quick][context.object.getSixType()]; out+='+'+( Six.notation.slice(context.object.getRowIndex() - 1).join('.') );return out;
};
Pricker.Templates["Start.text"] = function anonymous(context
/*``*/) {
var out=''; var rowMap = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'last']; if(context.object.getRowIndex() === 4 &&context.object.getSixType() === Pricker.SixType.Quick){}else{out+='Start from rounds as the '+( rowMap[context.object.getRowIndex()] )+' row of a '+( Pricker.SixType[context.object.getSixType()].toLowerCase() )+' six.';}return out;
};
Pricker.Templates["Touch.select"] = function anonymous(context
/*``*/) {
var out='';context.touchRows = context.touchRows || Infinity;context.touchRows -= 2;  context.styleUnreached = context.styleUnreached || '';context.styleFalse = context.styleFalse || '';out+='<option value="0">'+( Pricker.stringFromRow(context.object.getInitialRow()) )+'</option>';var arr1=context.object.getCourses();if(arr1){var course,i1=-1,l1=arr1.length-1;while(i1<l1){course=arr1[i1+=1];out+='<option value="'+( course.getIndex() )+'"';if(context.touchRows <= 0){out+=' style="'+( context.styleUnreached )+'"';}if(context.falseness && context.falseness.contains(course)){out+=' style="'+( context.styleFalse )+'"';}out+='>'+( course.print('text') )+'</option>'; context.touchRows -= course.estimateRows(); } } return out;
};
Pricker.Templates["Touch.siril"] = function anonymous(context
/*``*/) {
var out='';var courseNames = [ ],rounds = Pricker.stringFromRow(Pricker.rowFromString('', context.object.getInitialRow().length));context.touchRows = context.touchRows || Infinity;context.touchRows -= 2;  out+='// Generated by Free Touch Pricker'+( '\n' )+'// https://github.com/simpleigh/touch-pricker'+( '\n' )+( '\n' )+'// '+( Pricker.stringFromRow(context.object.getInitialRow()) )+( '\n' );var arr1=context.object.getCourses();if(arr1){var course,i1=-1,l1=arr1.length-1;while(i1<l1){course=arr1[i1+=1];out+='// '+( course.print('text') )+( '\n' );} } out+=''+( '\n' )+( context.object.getInitialRow().length )+' bells'+( '\n' )+( '\n' )+'composition = touch'+( '\n' )+( '\n' )+'slow = +3.1.3.1.3'+( '\n' )+'quick = +1.3.1.3.1'+( '\n' )+'plain = +'+( rounds.slice(-1) )+( '\n' )+'bob = +'+( rounds.slice(-3, -2) )+( '\n' )+'single = +'+( rounds.slice(-3) )+( '\n' )+'strt = '+( context.object.getStart().print('siril') )+( '\n' )+( '\n' );var arr2=context.object.getCourses();if(arr2){var course,index=-1,l2=arr2.length-1;while(index<l2){course=arr2[index+=1];out+='course'+( index + 1 )+' = '+( course.print('siril', {'touchRows': context.touchRows}) ); courseNames.push('course' + (index + 1));  context.touchRows -= course.estimateRows(); if(context.touchRows <= 0){ break; }} } out+=''+( '\n' )+'touch = strt, '+( courseNames.join(', ') )+( '\n' )+( '\n' )+'prove touch'+( '\n' );return out;
};
Pricker.Templates["Touch.text"] = function anonymous(context
/*``*/) {
var out=''; var start = context.object.getStart().print('text'); out+=''+( Pricker.stringFromRow(context.object.getStart().getLast()) )+( '\n' );var arr1=context.object.getCourses();if(arr1){var course,i1=-1,l1=arr1.length-1;while(i1<l1){course=arr1[i1+=1];out+=''+( course.print('text', {'end': '\n'}) );} } if(start){out+=''+( start )+( '\n' );}return out;
};
Pricker.Templates["Music.AbstractScheme.text"] = function anonymous(context
/*``*/) {
var out='';var arr1=context.object.getMatchers();if(arr1){var matcher,i1=-1,l1=arr1.length-1;while(i1<l1){matcher=arr1[i1+=1];out+=''+( matcher.print('text') );} } return out;
};
Pricker.Templates["Pricker.Mbd.css"] = function anonymous(context
/*``*/) {
var out='#sixends { float: left; font-family: "Courier New", "Courier", "monospace"; font-size: 12pt; margin-right: 25px;}#controls { float: left; margin-right: 25px;}.tab { background-color: #EFEFF7; border-color: black; border-radius: 15px 0 0 0; border-style: solid; border-width: 1px 1px 0 1px; cursor: pointer; float: left; height: 20px; line-height: 20px; padding-left: 10px; padding-right: 8px; text-align: center;}.tab-selected { background-color: #BDBDE7; font-weight: bold;}#pages { width: 360px;}.page { border-color: black; border-style: solid; border-width: 1px; clear: left; display: none; padding: 9px; visibility: hidden; width: 340px;}.page-selected { display: block; visibility: visible;}.page div, .page div#savedCalling { margin-bottom: 20px;}.page div:last-of-type { margin-bottom: 0px;}.page form { height: 25px; margin-bottom: 10px;}.page textarea { border-width: 1px; height: 450px; padding: 1px; width: 336px;}#touch { background-color: #EFEFF7; float: left; padding: 10px;}.slowSix { background-color: #F0F0F8; cursor: pointer;}.quickSix { background-color: #E2E2F0; cursor: pointer;}.extraSix { color: #505050;}.falseBlock { color: red;}.musicalBlock { color: gold;}';return out;
};
Pricker.Templates["Pricker.Mbd.html"] = function anonymous(context
/*``*/) {
var out='<div id="sixends"></div><div id="controls"> <div id="tabs"> <div id="tab_pricking" onclick="pricker.onTab(\'pricking\')" class="tab tab-selected">Pricking</div> <div id="tab_loadSave" onclick="pricker.onTab(\'loadSave\')" class="tab">Load/Save</div> <div id="tab_siril"    onclick="pricker.onTab(\'siril\')"    class="tab">Siril</div> <div id="tab_music"    onclick="pricker.onTab(\'music\')"    class="tab">Music</div><div id="tab_view"     onclick="pricker.onTab(\'view\')"     class="tab">View</div> </div> <div id="pages"> <div class="page page-selected" id="page_pricking"> <div> <label for="stage">Number of bells:</label> <select id="stage" onchange="pricker.onStage()"></select> </div> <div> Course from rounds: <div id="callingFromRounds"></div> </div> <div> From current start row: <div id="calling"></div> </div> <div> <form onsubmit="return false"> <label for="initialRow">Starting row:</label> <input type="text" id="initialRow" size="15" maxLength="15" /> <button onclick="pricker.onSetInitialRow()">Set</button> <button onclick="pricker.onResetInitialRow()">Reset</button> </form> </div> <div> <label for="firstSix">First six:</label> <select id="firstSix" onchange="pricker.onFirstSix()"> <option value="'+( Pricker.SixType.Slow )+'">Slow</option> <option value="'+( Pricker.SixType.Quick )+'">Quick</option> </select> </div> <div> <form onsubmit="return false"> <label for="courseLength">Course length:</label> <input type="text" id="courseLength" size="2" maxLength="2" /> <button onclick="pricker.onSetLength()">Set</button> <button onclick="pricker.onResetLength()">Reset</button> </form> </div> <div> <label for="callReset">Current calling:</label> <button id="callReset" onclick="pricker.onResetCalls()">Reset</button> </div> <div> Saved calling: <div id="savedCalling"></div> <button id="saveCalling" onclick="pricker.onSaveCalling()">Save</button> <button id="loadCalling" onclick="pricker.onLoadCalling()">Load</button> </div> </div> <div class="page" id="page_loadSave"> <form onsubmit="return false"> <button onclick="pricker.onLoadTouch()">Import</button> <button onclick="pricker.onSaveTouch()">Export</button> </form> <textarea id="loadSaveTextarea"></textarea> </div> <div class="page" id="page_siril"> <form onsubmit="return false"> <button onclick="pricker.onGenerateSiril()">Generate</button> </form> <textarea id="sirilTextarea"></textarea> </div> <div class="page" id="page_music"> <form onsubmit="return false"> <button onclick="pricker.onAnalyseMusic()">Analyse</button> </form> <textarea id="musicTextarea"></textarea> </div> <div class="page" id="page_view"> <input type="checkbox" id="showSixHeads" onclick="pricker.onShowSixHeads()"/> <label for="showSixHeads">Show six heads</label> </div> </div></div><div id="touch"> <div> <button onclick="pricker.onProve()">PROVE</button> <span id="proofResult"></span> </div> <div id="numRows"></div> <label> <input id="rolling" type="checkbox" /> Rolling course entry </label> <form onsubmit="return false"> <button onclick="pricker.onInsertCourse()">Insert</button> <button onclick="pricker.onPasteCourse()">Paste</button> <button onclick="pricker.onCopyCourse()">Copy</button> <button onclick="pricker.onCutCourse()">Cut</button> <button onclick="pricker.onDeleteCourse()">Delete</button> </form> <select id="courses"> </select> <form onsubmit="return false"> <button onclick="pricker.onInsertCourse()">Insert</button> <button onclick="pricker.onPasteCourse()">Paste</button> <button onclick="pricker.onCopyCourse()">Copy</button> <button onclick="pricker.onCutCourse()">Cut</button> <button onclick="pricker.onDeleteCourse()">Delete</button> </form></div>';return out;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9Ob3RpZmlhYmxlLnRzIiwic3JjL0Jsb2NrT3duZXJzaGlwLnRzIiwic3JjL1RlbXBsYXRlQ29udGV4dC50cyIsInNyYy9QcmludGFibGVNaXhpbi50cyIsInNyYy9CZWxsLnRzIiwic3JjL1Jvdy50cyIsInNyYy9TdGFnZS50cyIsInNyYy9yb3dGcm9tU3RyaW5nLnRzIiwic3JjL3N0cmluZ0Zyb21Sb3cudHMiLCJzcmMvVmlzaXRvci9BYnN0cmFjdC50cyIsInNyYy9BYnN0cmFjdEJsb2NrLnRzIiwic3JjL0Fic3RyYWN0Q29udGFpbmVyLnRzIiwic3JjL0NhbGwudHMiLCJzcmMvQ2hhbmdlcy50cyIsInNyYy9TaXhUeXBlLnRzIiwic3JjL0Fic3RyYWN0U2l4LnRzIiwic3JjL0Jsb2NrRGlyZWN0b3J5LnRzIiwic3JjL1NlcmlhbENvbnRhaW5lci50cyIsInNyYy9Db3Vyc2UudHMiLCJzcmMvT3B0aW9ucy50cyIsInNyYy9RdWljay50cyIsInNyYy9SYW5kb21BY2Nlc3NDb250YWluZXIudHMiLCJzcmMvU2xvdy50cyIsInNyYy9TdGFydC50cyIsInNyYy9UZW1wbGF0ZXMudHMiLCJzcmMvVG91Y2gudHMiLCJzcmMvRG9tL21ldHJpY3MudHMiLCJzcmMvUHJpY2tlci9BYnN0cmFjdC50cyIsInNyYy9NdXNpYy9NYXRjaGVySW50ZXJmYWNlLnRzIiwic3JjL011c2ljL0Fic3RyYWN0U2NoZW1lLnRzIiwic3JjL011c2ljL01hdGNoVHlwZS50cyIsInNyYy9NdXNpYy9QYXR0ZXJuLnRzIiwic3JjL011c2ljL1BhdHRlcm5Hcm91cC50cyIsInNyYy9NdXNpYy9NYmRTY2hlbWUudHMiLCJzcmMvVmlzaXRvci9Db3VudGVyLnRzIiwic3JjL1Zpc2l0b3IvTXVzaWMudHMiLCJzcmMvVmlzaXRvci9Qcm9vZi50cyIsInNyYy9Qcmlja2VyL01iZC50cyIsInNyYy9Eb20vY3JlYXRlQW5kQXBwZW5kU3R5bGUudHMiLCJzcmMvRG9tL2NyZWF0ZUlmcmFtZS50cyIsInNyYy9Eb20vaW5qZWN0SWZyYW1lRGF0YS50cyIsInNyYy9jcmVhdGUudHMiLCJzcmMvTXVzaWMvQ3VzdG9tU2NoZW1lLnRzIiwic3JjL1Zpc2l0b3IvQ29uc29sZS50cyIsInNyYy9WaXNpdG9yL1N0cmluZ0FycmF5LnRzIiwiY3JlYXRlLmRvdCIsIkFic3RyYWN0U2l4L21iZC5kb3QiLCJBYnN0cmFjdFNpeC9zaXJpbC5kb3QiLCJDb3Vyc2UvaHRtbC5kb3QiLCJDb3Vyc2UvbWJkLmRvdCIsIkNvdXJzZS9zaXJpbC5kb3QiLCJDb3Vyc2UvdGV4dC5kb3QiLCJTdGFydC9zaXJpbC5kb3QiLCJTdGFydC90ZXh0LmRvdCIsIlRvdWNoL3NlbGVjdC5kb3QiLCJUb3VjaC9zaXJpbC5kb3QiLCJUb3VjaC90ZXh0LmRvdCIsIk11c2ljL0Fic3RyYWN0U2NoZW1lL3RleHQuZG90IiwiUHJpY2tlci9NYmQvY3NzLmRvdCIsIlByaWNrZXIvTWJkL2h0bWwuZG90IiwiTXVzaWMvUGF0dGVybi90ZXh0LmRvdCIsIk11c2ljL1BhdHRlcm5Hcm91cC90ZXh0LmRvdCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7OztHQUtHO0FDTEg7Ozs7O0dBS0c7QUFFSCxzQ0FBc0M7QUNQdEM7Ozs7O0dBS0c7QUNMSDs7Ozs7R0FLRztBQUVILDJDQUEyQztBQUUzQyxJQUFVLE9BQU8sQ0E0RmhCO0FBNUZELFdBQVUsT0FBTztJQUViOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaURHO0lBQ0g7UUFBQTtRQXNDQSxDQUFDO1FBcENHOzs7Ozs7Ozs7V0FTRztRQUNJLDhCQUFLLEdBQVosVUFDSSxZQUFvQixFQUNwQixPQUE4QjtZQUE5Qix3QkFBQSxFQUFBLFlBQThCO1lBRTlCLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsR0FBRyxZQUFZLENBQUM7WUFDdEQsT0FBTyxRQUFBLFNBQVMsQ0FBQyxZQUFZLENBQUMsY0FBSyxPQUFPLElBQUUsUUFBUSxFQUFFLElBQUksSUFBRSxDQUFDO1FBQ2pFLENBQUM7UUFZRDs7O1dBR0c7UUFDVyw0QkFBYSxHQUEzQixVQUE0QixHQUFRO1lBQ2hDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQ3pELENBQUM7UUFFTCxxQkFBQztJQUFELENBdENBLEFBc0NDLElBQUE7SUF0Q3FCLHNCQUFjLGlCQXNDbkMsQ0FBQTtBQUVMLENBQUMsRUE1RlMsT0FBTyxLQUFQLE9BQU8sUUE0RmhCO0FDckdEOzs7OztHQUtHO0FDTEg7Ozs7O0dBS0c7QUFFSCxnQ0FBZ0M7QUNQaEM7Ozs7O0dBS0c7QUFFSCxJQUFVLE9BQU8sQ0FZaEI7QUFaRCxXQUFVLE9BQU87SUFFYjs7T0FFRztJQUNILElBQVksS0FNWDtJQU5ELFdBQVksS0FBSztRQUNiLHVDQUFXLENBQUE7UUFDWCxxQ0FBVSxDQUFBO1FBQ1Ysd0NBQVksQ0FBQTtRQUNaLDRDQUFjLENBQUE7UUFDZCw0Q0FBYyxDQUFBO0lBQ2xCLENBQUMsRUFOVyxLQUFLLEdBQUwsYUFBSyxLQUFMLGFBQUssUUFNaEI7QUFDTCxDQUFDLEVBWlMsT0FBTyxLQUFQLE9BQU8sUUFZaEI7QUNuQkQ7Ozs7O0dBS0c7QUFFSCxnQ0FBZ0M7QUFDaEMsNEJBQTRCO0FBQzVCLDhCQUE4QjtBQUU5QixJQUFVLE9BQU8sQ0F1RWhCO0FBdkVELFdBQVUsT0FBTztJQUViOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsdUJBQThCLEtBQWEsRUFBRSxLQUFZO1FBQ3JELElBQU0sY0FBYyxHQUFnQztZQUN4QyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ3RDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDdkMsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtTQUM5QyxFQUNMLFNBQVMsR0FBYyxFQUFHLEVBQzFCLE1BQU0sR0FBUSxFQUFHLENBQUM7UUFFdEIsSUFBSSxVQUFnQixFQUNoQixVQUFrQixDQUFDO1FBRXZCLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFNUIsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBRTtZQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ25DO1FBRUQsb0RBQW9EO1FBQ3BELEtBQUssVUFBVSxHQUFHLENBQUMsRUFBRSxVQUFVLElBQUksS0FBSyxFQUFFLFVBQVUsSUFBSSxDQUFDLEVBQUU7WUFDdkQsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUNqQztRQUVELEtBQ0ksVUFBVSxHQUFHLENBQUMsRUFDZCxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSxVQUFVLEdBQUcsS0FBSyxFQUMvQyxVQUFVLElBQUksQ0FBQyxFQUNqQjtZQUNFLFVBQVUsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBRXRELElBQUksVUFBVSxJQUFJLFVBQVUsSUFBSSxLQUFLLEVBQUU7Z0JBQ25DLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUNwQztnQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN4QixTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQ2hDO2lCQUFNO2dCQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDbkM7U0FDSjtRQUVELElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLEVBQUU7WUFDdEIsS0FBSyxVQUFVLEdBQUcsQ0FBQyxFQUFFLFVBQVUsSUFBSSxLQUFLLEVBQUUsVUFBVSxJQUFJLENBQUMsRUFBRTtnQkFDdkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRTtvQkFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDM0I7YUFDSjtTQUNKO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQWxEZSxxQkFBYSxnQkFrRDVCLENBQUE7QUFFTCxDQUFDLEVBdkVTLE9BQU8sS0FBUCxPQUFPLFFBdUVoQjtBQ2xGRDs7Ozs7R0FLRztBQUVILCtCQUErQjtBQUUvQixJQUFVLE9BQU8sQ0FnQmhCO0FBaEJELFdBQVUsT0FBTztJQUViOztPQUVHO0lBQ0gsdUJBQThCLEdBQVE7UUFDbEMsSUFBTSxXQUFXLEdBQUcsa0JBQWtCLEVBQ2xDLGNBQWMsR0FBYSxFQUFHLENBQUM7UUFFbkMsS0FBbUIsVUFBRyxFQUFILFdBQUcsRUFBSCxpQkFBRyxFQUFILElBQUc7WUFBakIsSUFBTSxJQUFJLFlBQUE7WUFDWCxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNqRDtRQUVELE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBVGUscUJBQWEsZ0JBUzVCLENBQUE7QUFFTCxDQUFDLEVBaEJTLE9BQU8sS0FBUCxPQUFPLFFBZ0JoQjtBQ3pCRDs7Ozs7R0FLRztBQUVILHdFQUF3RTtBQUN4RSxrQ0FBa0M7QUFDbEMsNENBQTRDO0FBQzVDLDRDQUE0QztBQUU1QyxJQUFVLE9BQU8sQ0FpRmhCO0FBakZELFdBQVUsT0FBTztJQUViOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsSUFBaUIsT0FBTyxDQTREdkI7SUE1REQsV0FBaUIsT0FBTztRQUVwQjs7Ozs7V0FLRztRQUNIO1lBQUE7Z0JBRUk7Ozs7bUJBSUc7Z0JBQ0ssY0FBUyxHQUFZLElBQUksQ0FBQztZQTJDdEMsQ0FBQztZQXBDRzs7OztlQUlHO1lBQ0ksK0JBQUssR0FBWixVQUFhLEdBQVEsRUFBRSxHQUFpQjtnQkFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFBLGFBQWEsQ0FBQyxRQUFBLGFBQWEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7aUJBQy9EO2dCQUVELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDaEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDbkMsSUFBSSxRQUFBLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFO3dCQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztxQkFDMUI7aUJBQ0o7Z0JBQ0QsT0FBTyxJQUFJLENBQUM7WUFDaEIsQ0FBQztZQUVEOzs7ZUFHRztZQUNJLG9DQUFVLEdBQWpCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQixDQUFDO1lBV0wsc0JBQUM7UUFBRCxDQWxEQSxBQWtEQyxJQUFBO1FBbERxQix1QkFBZSxrQkFrRHBDLENBQUE7SUFFTCxDQUFDLEVBNURnQixPQUFPLEdBQVAsZUFBTyxLQUFQLGVBQU8sUUE0RHZCO0FBRUwsQ0FBQyxFQWpGUyxPQUFPLEtBQVAsT0FBTyxRQWlGaEI7QUM3RkQ7Ozs7O0dBS0c7QUFFSCwwQ0FBMEM7QUFDMUMsc0NBQXNDO0FBQ3RDLHlDQUF5QztBQUN6QywrQkFBK0I7QUFDL0IsMkNBQTJDO0FBQzNDLDRDQUE0QztBQUU1QyxJQUFVLE9BQU8sQ0FvSWhCO0FBcElELFdBQVUsT0FBTztJQUViOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSDtRQU9JOzs7O1dBSUc7UUFDSCx1QkFDSSxVQUFlLEVBQ0wsVUFBMkI7WUFBM0IsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7WUFZekM7O2VBRUc7WUFDYSxpQkFBWSxHQUFXLGVBQWUsQ0FBQztZQWJuRCxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMxQyxDQUFDO1FBcUJEOztXQUVHO1FBQ0kscUNBQWEsR0FBcEI7WUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEMsQ0FBQztRQUVEOztXQUVHO1FBQ0kscUNBQWEsR0FBcEIsVUFBcUIsVUFBZTtZQUNoQyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQVFEOztXQUVHO1FBQ0ksb0NBQVksR0FBbkIsVUFBb0IsU0FBeUI7WUFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDNUIsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVEOztXQUVHO1FBQ0ksb0NBQVksR0FBbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDbkUsQ0FBQztRQUVEOztXQUVHO1FBQ0ksZ0NBQVEsR0FBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUMvRCxDQUFDO1FBRUQ7O1dBRUc7UUFDSSxzQ0FBYyxHQUFyQjtZQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQzVCLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRDs7OztXQUlHO1FBQ08sdUNBQWUsR0FBekI7WUFDSSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzNEO1FBQ0wsQ0FBQztRQWFMLG9CQUFDO0lBQUQsQ0FoSEEsQUFnSEMsSUFBQTtJQWhIcUIscUJBQWEsZ0JBZ0hsQyxDQUFBO0lBRUQsUUFBQSxjQUFjLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRWhELENBQUMsRUFwSVMsT0FBTyxLQUFQLE9BQU8sUUFvSWhCO0FDbEpEOzs7OztHQUtHO0FBRUgseUNBQXlDO0FBQ3pDLHNDQUFzQztBQUN0QywrQkFBK0I7QUFDL0IsNENBQTRDO0FBRTVDLElBQVUsT0FBTyxDQWlKaEI7QUFqSkQsV0FBVSxPQUFPO0lBRWI7Ozs7Ozs7OztPQVNHO0lBQ0g7UUFDWSxxQ0FBYTtRQUR6QjtZQUFBLHFFQW1JQztZQWhJRzs7ZUFFRztZQUNPLGFBQU8sR0FBWSxFQUFHLENBQUM7O1FBNkhyQyxDQUFDO1FBM0hHLHdFQUF3RTtRQUV4RTs7V0FFRztRQUNPLHFDQUFTLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNCLENBQUM7UUFFRDs7O1dBR0c7UUFDSSxtQ0FBTyxHQUFkO1lBQ0ksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDckIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQzFEO1lBRUQsK0JBQStCO1lBQy9CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNwQyxDQUFDO1FBRUQ7O1dBRUc7UUFDSSxrQ0FBTSxHQUFiO1lBQWMsa0JBQXNDO2lCQUF0QyxVQUFzQyxFQUF0QyxxQkFBc0MsRUFBdEMsSUFBc0M7Z0JBQXRDLDZCQUFzQzs7WUFDaEQsS0FBb0IsVUFBWSxFQUFaLEtBQUEsSUFBSSxDQUFDLE9BQU8sRUFBWixjQUFZLEVBQVosSUFBWTtnQkFBM0IsSUFBTSxLQUFLLFNBQUE7Z0JBQ1osS0FBc0IsVUFBUSxFQUFSLHFCQUFRLEVBQVIsc0JBQVEsRUFBUixJQUFRO29CQUF6QixJQUFNLE9BQU8saUJBQUE7b0JBQ2QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDekI7YUFDSjtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRDs7O1dBR0c7UUFDSSx3Q0FBWSxHQUFuQjtZQUNJLElBQUksSUFBSSxHQUFXLENBQUMsQ0FBQztZQUNyQixLQUFvQixVQUFZLEVBQVosS0FBQSxJQUFJLENBQUMsT0FBTyxFQUFaLGNBQVksRUFBWixJQUFZO2dCQUEzQixJQUFNLEtBQUssU0FBQTtnQkFDWixJQUFJLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVELHdFQUF3RTtRQUV4RTs7O1dBR0c7UUFDSSxrQ0FBTSxHQUFiLFVBQWMsS0FBYTtZQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBRUQsd0VBQXdFO1FBRXhFOzs7V0FHRztRQUNLLDJDQUFlLEdBQXZCLFVBQXdCLEtBQWlCO1lBQWpCLHNCQUFBLEVBQUEsU0FBaUI7WUFDckMscUJBQXFCO1lBQ3JCLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUM1QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2FBQ2I7WUFFRCxPQUFPLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRTtnQkFDekMsSUFBSSxDQUFDLHFCQUFxQixDQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FDdEIsQ0FBQzthQUNMO1FBQ0wsQ0FBQztRQUVEOztXQUVHO1FBQ08saURBQXFCLEdBQS9CLFVBQWdDLFFBQWUsRUFBRSxPQUFjO1lBQzNELE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUVEOzs7V0FHRztRQUNPLCtDQUFtQixHQUE3QixVQUE4QixLQUFZO1lBQ3RDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFFRDs7V0FFRztRQUNJLHFDQUFTLEdBQWhCO1lBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUMvQixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSxxQ0FBUyxHQUFoQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNoQyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSxvQ0FBUSxHQUFmLFVBQWdCLEtBQWE7WUFDekIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQzthQUMvQztZQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUVMLHdCQUFDO0lBQUQsQ0FuSUEsQUFtSUMsQ0FsSVcsUUFBQSxhQUFhLEdBa0l4QjtJQW5JcUIseUJBQWlCLG9CQW1JdEMsQ0FBQTtBQUVMLENBQUMsRUFqSlMsT0FBTyxLQUFQLE9BQU8sUUFpSmhCO0FDN0pEOzs7OztHQUtHO0FBRUgsSUFBVSxPQUFPLENBT2hCO0FBUEQsV0FBVSxPQUFPO0lBRWI7OztPQUdHO0lBQ0gsSUFBWSxJQUE2QjtJQUF6QyxXQUFZLElBQUk7UUFBRSxpQ0FBUyxDQUFBO1FBQUUsNkJBQUcsQ0FBQTtRQUFFLG1DQUFNLENBQUE7SUFBQSxDQUFDLEVBQTdCLElBQUksR0FBSixZQUFJLEtBQUosWUFBSSxRQUF5QjtBQUM3QyxDQUFDLEVBUFMsT0FBTyxLQUFQLE9BQU8sUUFPaEI7QUNkRDs7Ozs7R0FLRztBQUVILGdDQUFnQztBQUNoQyxnQ0FBZ0M7QUFDaEMsK0JBQStCO0FBRS9CLElBQVUsT0FBTyxDQXNGaEI7QUF0RkQsV0FBVSxPQUFPO0lBRWI7O09BRUc7SUFDSCxJQUFpQixPQUFPLENBZ0Z2QjtJQWhGRCxXQUFpQixPQUFPO1FBRXBCOztXQUVHO1FBQ0gsa0JBQWtCLEdBQVEsRUFBRSxLQUFhO1lBQ3JDLElBQUksSUFBVSxDQUFDO1lBRWYsSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM1QixHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUMxQixDQUFDO1FBRUQ7O1dBRUc7UUFDSCxrQkFBeUIsR0FBUTtZQUM3QixJQUFJLEtBQWEsQ0FBQztZQUVsQixLQUFLLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUU7Z0JBQ2hELFFBQVEsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDeEI7UUFDTCxDQUFDO1FBTmUsZ0JBQVEsV0FNdkIsQ0FBQTtRQUVEOztXQUVHO1FBQ0gsa0JBQXlCLEdBQVE7WUFDN0IsSUFBSSxLQUFhLENBQUM7WUFFbEIsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVqQixLQUFLLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUU7Z0JBQ2hELFFBQVEsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDeEI7UUFDTCxDQUFDO1FBUmUsZ0JBQVEsV0FRdkIsQ0FBQTtRQUVEOztXQUVHO1FBQ0gsa0JBQXlCLEdBQVE7WUFDN0IsSUFBSSxLQUFhLENBQUM7WUFFbEIsS0FBSyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFO2dCQUNoRCxRQUFRLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3hCO1FBQ0wsQ0FBQztRQU5lLGdCQUFRLFdBTXZCLENBQUE7UUFFRDs7V0FFRztRQUNILG9CQUEyQixHQUFRO1lBQy9CLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUhlLGtCQUFVLGFBR3pCLENBQUE7UUFFRDs7V0FFRztRQUNILHVCQUE4QixHQUFRO1lBQ2xDLElBQUksS0FBYSxDQUFDO1lBRWxCLEtBQUssS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRTtnQkFDaEQsUUFBUSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUN4QjtRQUNMLENBQUM7UUFOZSxxQkFBYSxnQkFNNUIsQ0FBQTtRQUVEOztXQUVHO1FBQ0gscUJBQTRCLEdBQVEsRUFBRSxJQUFVO1lBQzVDLElBQUksSUFBSSxLQUFLLFFBQUEsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDckIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN6QjtpQkFBTSxJQUFJLElBQUksS0FBSyxRQUFBLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQzFCLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDM0I7aUJBQU0sSUFBSSxJQUFJLEtBQUssUUFBQSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUM3QixPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzlCO1FBQ0wsQ0FBQztRQVJlLG1CQUFXLGNBUTFCLENBQUE7SUFFTCxDQUFDLEVBaEZnQixPQUFPLEdBQVAsZUFBTyxLQUFQLGVBQU8sUUFnRnZCO0FBQ0wsQ0FBQyxFQXRGUyxPQUFPLEtBQVAsT0FBTyxRQXNGaEI7QUNqR0Q7Ozs7O0dBS0c7QUFFSCxJQUFVLE9BQU8sQ0FPaEI7QUFQRCxXQUFVLE9BQU87SUFFYjs7O09BR0c7SUFDSCxJQUFZLE9BQTJCO0lBQXZDLFdBQVksT0FBTztRQUFHLHFDQUFRLENBQUE7UUFBRSx1Q0FBSyxDQUFBO0lBQUMsQ0FBQyxFQUEzQixPQUFPLEdBQVAsZUFBTyxLQUFQLGVBQU8sUUFBb0I7QUFDM0MsQ0FBQyxFQVBTLE9BQU8sS0FBUCxPQUFPLFFBT2hCO0FDZEQ7Ozs7O0dBS0c7QUFFSCx5Q0FBeUM7QUFDekMsMENBQTBDO0FBQzFDLGdDQUFnQztBQUNoQyxtQ0FBbUM7QUFDbkMsK0JBQStCO0FBQy9CLGdDQUFnQztBQUVoQyxJQUFVLE9BQU8sQ0E0SGhCO0FBNUhELFdBQVUsT0FBTztJQUViOztPQUVHO0lBQ0g7UUFBMEMsK0JBQWE7UUFzQm5EOztXQUVHO1FBQ0gscUJBQ0ksVUFBZSxFQUNMLFVBQTJCO1lBRnpDLFlBSUksa0JBQU0sVUFBVSxFQUFFLFVBQVUsQ0FBQyxTQUVoQztZQUphLGdCQUFVLEdBQVYsVUFBVSxDQUFpQjtZQVZ6Qzs7ZUFFRztZQUNPLFdBQUssR0FBUyxRQUFBLElBQUksQ0FBQyxLQUFLLENBQUM7WUFhbkMsd0VBQXdFO1lBRXhFOztlQUVHO1lBQ2Esa0JBQVksR0FBVyxhQUFhLENBQUM7WUFSakQsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOztRQUNyQixDQUFDO1FBU0Qsd0VBQXdFO1FBRXhFOztXQUVHO1FBQ08sK0JBQVMsR0FBbkI7WUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBRSxtQkFBbUI7WUFDMUQsUUFBQSxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ2pDLENBQUM7UUFFRDs7V0FFRztRQUNJLDZCQUFPLEdBQWQ7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsQ0FBQztRQUVEOzs7V0FHRztRQUNJLGtDQUFZLEdBQW5CO1lBQ0ksT0FBTyxDQUFDLENBQUM7UUFDYixDQUFDO1FBRUQsd0VBQXdFO1FBRXhFOztXQUVHO1FBQ0ksNkJBQU8sR0FBZDtZQUNJLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdkMsUUFBQSxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkMsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVEOztXQUVHO1FBQ0ksNEJBQU0sR0FBYjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFFRDs7V0FFRztRQUNJLDZCQUFPLEdBQWQ7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQztRQUVEOztXQUVHO1FBQ0ksNkJBQU8sR0FBZCxVQUFlLElBQVUsRUFBRSxNQUFzQjtZQUF0Qix1QkFBQSxFQUFBLGFBQXNCO1lBQzdDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksTUFBTSxFQUFFO2dCQUNSLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDakIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBQzFCO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVEOztXQUVHO1FBQ0ksZ0NBQVUsR0FBakI7WUFDSSxJQUFNLElBQUksR0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkIsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQU9MLGtCQUFDO0lBQUQsQ0FySEEsQUFxSEMsQ0FySHlDLFFBQUEsYUFBYSxHQXFIdEQ7SUFySHFCLG1CQUFXLGNBcUhoQyxDQUFBO0FBRUwsQ0FBQyxFQTVIUyxPQUFPLEtBQVAsT0FBTyxRQTRIaEI7QUMxSUQ7Ozs7O0dBS0c7QUFFSCx5Q0FBeUM7QUFDekMsc0NBQXNDO0FBRXRDLElBQVUsT0FBTyxDQTJHaEI7QUEzR0QsV0FBVSxPQUFPO0lBRWI7OztPQUdHO0lBQ0g7UUFBQTtZQUVJOztlQUVHO1lBQ08sZUFBVSxHQUFRLEVBQUcsQ0FBQztRQThGcEMsQ0FBQztRQXRGVSw0QkFBRyxHQUFWLFVBQVcsS0FBVTtZQUFFLGlCQUFvQjtpQkFBcEIsVUFBb0IsRUFBcEIscUJBQW9CLEVBQXBCLElBQW9CO2dCQUFwQixnQ0FBb0I7O1lBQ3ZDLElBQUksU0FBYyxFQUNkLFVBQThCLENBQUM7WUFFbkMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzNCLE9BQU8sR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzlDO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDMUI7WUFFRCxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO2FBQ2xFO1lBRUQsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDNUIsS0FBb0IsVUFBTyxFQUFQLG1CQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO2dCQUF0QixJQUFNLEtBQUssZ0JBQUE7Z0JBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDbkIsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUcsQ0FBQztpQkFDMUI7Z0JBQ0QsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoQztZQUVELFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDN0IsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQVFNLGlDQUFRLEdBQWYsVUFBZ0IsS0FBVTtZQUFFLGlCQUFvQjtpQkFBcEIsVUFBb0IsRUFBcEIscUJBQW9CLEVBQXBCLElBQW9CO2dCQUFwQixnQ0FBb0I7O1lBQzVDLElBQUksU0FBYyxDQUFDO1lBRW5CLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUMzQixPQUFPLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM5QztpQkFBTTtnQkFDSCxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzFCO1lBRUQsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDNUIsS0FBb0IsVUFBTyxFQUFQLG1CQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO2dCQUF0QixJQUFNLEtBQUssZ0JBQUE7Z0JBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDbkIsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO2dCQUNELFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDaEM7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQ7O1dBRUc7UUFDVyx5QkFBVSxHQUF4QixVQUF5QixLQUFvQjtZQUN6QyxJQUFNLGNBQWMsR0FBYSxFQUFHLENBQUM7WUFDckMsSUFBSSxTQUFpQyxFQUNqQyxLQUF5QixDQUFDO1lBRTlCLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDekIsU0FBUyxHQUFHLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQzthQUM1RDtZQUVELE9BQU8sU0FBUyxZQUFZLFFBQUEsYUFBYSxFQUFFO2dCQUN2QyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztpQkFDNUQ7Z0JBQ0QsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDOUIsS0FBSyxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDN0IsU0FBUyxHQUFHLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUN4QztZQUVELE9BQU8sY0FBYyxDQUFDO1FBQzFCLENBQUM7UUFFRDs7V0FFRztRQUNJLGdDQUFPLEdBQWQ7WUFDSSxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDbkMsQ0FBQztRQUVMLHFCQUFDO0lBQUQsQ0FuR0EsQUFtR0MsSUFBQTtJQW5HWSxzQkFBYyxpQkFtRzFCLENBQUE7QUFFTCxDQUFDLEVBM0dTLE9BQU8sS0FBUCxPQUFPLFFBMkdoQjtBQ3JIRDs7Ozs7R0FLRztBQUVILHlDQUF5QztBQUN6Qyw2Q0FBNkM7QUFDN0MsMENBQTBDO0FBQzFDLCtCQUErQjtBQUUvQixJQUFVLE9BQU8sQ0F3R2hCO0FBeEdELFdBQVUsT0FBTztJQUViOzs7OztPQUtHO0lBQ0g7UUFDWSxtQ0FBd0I7UUFFaEM7Ozs7V0FJRztRQUNILHlCQUNJLFVBQWUsRUFDTCxVQUEyQjtZQUZ6QyxZQUlJLGtCQUFNLFVBQVUsRUFBRSxVQUFVLENBQUMsU0FFaEM7WUFKYSxnQkFBVSxHQUFWLFVBQVUsQ0FBaUI7WUFHckMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7UUFDbkQsQ0FBQztRQUVELHdFQUF3RTtRQUV4RTs7O1dBR0c7UUFDSyxnQ0FBTSxHQUFkLFVBQWUsTUFBYztZQUN6QixJQUFNLFNBQVMsR0FBVyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQ3RDLFNBQVMsR0FBVyxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBRTNDLElBQUksS0FBYSxFQUNiLFVBQVUsR0FBUSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFckMsS0FBSyxLQUFLLEdBQUcsU0FBUyxHQUFHLENBQUMsRUFBRSxLQUFLLElBQUksU0FBUyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUU7Z0JBQ3hELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM5RCxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDbEQ7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQ7Ozs7V0FJRztRQUNPLDBDQUFnQixHQUExQixVQUEyQixVQUFlO1lBQ3RDLE9BQU8sQ0FBQyxDQUFDO1FBQ2IsQ0FBQztRQVlEOztXQUVHO1FBQ0ksbUNBQVMsR0FBaEIsVUFBaUIsTUFBYztZQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ3hELE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUMxQztZQUVELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7YUFDMUM7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDaEQ7WUFFRCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFFdkIsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVEOztXQUVHO1FBQ0ksdUNBQWEsR0FBcEIsVUFBcUIsTUFBYztZQUMvQixNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFZTCxzQkFBQztJQUFELENBOUZBLEFBOEZDLENBN0ZXLFFBQUEsaUJBQWlCLEdBNkY1QjtJQTlGcUIsdUJBQWUsa0JBOEZwQyxDQUFBO0FBRUwsQ0FBQyxFQXhHUyxPQUFPLEtBQVAsT0FBTyxRQXdHaEI7QUNwSEQ7Ozs7O0dBS0c7QUFFSCx1Q0FBdUM7QUFDdkMsZ0NBQWdDO0FBQ2hDLCtCQUErQjtBQUMvQiwyQ0FBMkM7QUFDM0MsbUNBQW1DO0FBRW5DLElBQVUsT0FBTyxDQW9OaEI7QUFwTkQsV0FBVSxPQUFPO0lBRWI7O09BRUc7SUFDSDtRQUE0QiwwQkFBNEI7UUFBeEQ7WUFBQSxxRUE4TUM7WUE1TUc7O2VBRUc7WUFDSyxtQkFBYSxHQUFZLFFBQUEsT0FBTyxDQUFDLElBQUksQ0FBQztZQUU5Qyx3RUFBd0U7WUFFeEU7O2VBRUc7WUFDYSxrQkFBWSxHQUFXLFFBQVEsQ0FBQztZQTJCaEQ7O2VBRUc7WUFDZ0IsZUFBUyxHQUFXLENBQUMsQ0FBQztZQUV6Qzs7ZUFFRztZQUNnQixlQUFTLEdBQVcsRUFBRSxDQUFDO1lBRTFDLHdFQUF3RTtZQUV4RTs7ZUFFRztZQUNJLFlBQU0sR0FBYyxLQUFJLENBQUMsT0FBTyxDQUFDO1lBRXhDOztlQUVHO1lBQ0ksY0FBUSxHQUF3QixLQUFJLENBQUMsU0FBUyxDQUFDO1lBRXREOztlQUVHO1lBQ0ksWUFBTSxHQUFtQyxLQUFJLENBQUMsUUFBUSxDQUFDOztRQThJbEUsQ0FBQztRQWhNRyx3RUFBd0U7UUFFeEU7Ozs7V0FJRztRQUNPLGlDQUFnQixHQUExQixVQUEyQixVQUFlO1lBQ3RDLE9BQU8sVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDTyw0QkFBVyxHQUFyQixVQUFzQixVQUFlLEVBQUUsS0FBYTtZQUNoRCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLFFBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0JBQ3JELENBQUMsQ0FBQyxJQUFJLFFBQUEsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDO2dCQUMzRCxDQUFDLENBQUMsSUFBSSxRQUFBLEtBQUssQ0FBQyxVQUFVLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7UUE2QkQ7O1dBRUc7UUFDSSxnQ0FBZSxHQUF0QjtZQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM5QixDQUFDO1FBRUQ7O1dBRUc7UUFDSSxnQ0FBZSxHQUF0QixVQUF1QixJQUFhO1lBQ2hDLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxJQUFJLEVBQUU7Z0JBQzdCLE9BQU8sSUFBSSxDQUFDLENBQUUsZ0JBQWdCO2FBQ2pDO1lBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFFMUIsc0RBQXNEO1lBQ3RELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDbEMsSUFBTSxRQUFRLEdBQWtCLEVBQUUsQ0FBQztZQUNuQyxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUU7Z0JBQ3ZELFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQzFELFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFDMUQsVUFBVSxHQUFHLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDOUM7WUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztZQUV4QixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQ7O1dBRUc7UUFDSSw0QkFBVyxHQUFsQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3hELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRDs7V0FFRztRQUNJLDJCQUFVLEdBQWpCO1lBQ0ksS0FBa0IsVUFBWSxFQUFaLEtBQUEsSUFBSSxDQUFDLE9BQU8sRUFBWixjQUFZLEVBQVosSUFBWTtnQkFBekIsSUFBTSxHQUFHLFNBQUE7Z0JBQ1YsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFBLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBRSw0QkFBNEI7YUFDaEU7WUFFRCxpQ0FBaUM7WUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFbkMsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVEOztXQUVHO1FBQ0ksd0JBQU8sR0FBZDtZQUNJLEtBQWtCLFVBQVksRUFBWixLQUFBLElBQUksQ0FBQyxPQUFPLEVBQVosY0FBWSxFQUFaLElBQVk7Z0JBQXpCLElBQU0sR0FBRyxTQUFBO2dCQUNWLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUNmLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjthQUNKO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVEOztXQUVHO1FBQ0ksc0JBQUssR0FBWjtZQUNJLElBQU0sTUFBTSxHQUFXLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNwRCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7WUFFL0MsNEJBQTRCO1lBQzVCLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRTtnQkFDdkQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQzVCLEtBQUssQ0FDUixDQUFDO2FBQ0w7WUFFRCxpQ0FBaUM7WUFDakMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBRW5ELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFFRDs7V0FFRztRQUNXLGlCQUFVLEdBQXhCLFVBQXlCLFVBQWUsRUFBRSxLQUFhO1lBQ25ELElBQU0sTUFBTSxHQUFXLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUN6QyxZQUFZLEdBQVcsZ0JBQWdCLEVBQ3ZDLE9BQU8sR0FBVyxrQ0FBa0MsRUFDcEQsTUFBTSxHQUFXLFVBQVUsRUFDM0IsVUFBVSxHQUFXLE9BQU8sR0FBRyxLQUFLLEdBQUcsTUFBTSxHQUFHLE9BQU8sR0FBRyxJQUFJLEVBQzlELFFBQVEsR0FBVyw0QkFBNEIsRUFDL0MsTUFBTSxHQUFXLEVBQUU7a0JBQ2IsT0FBTztrQkFDUCxLQUFLLEdBQUcsWUFBWSxHQUFHLFFBQVE7a0JBQy9CLEdBQUcsR0FBRyxVQUFVLEdBQUcsS0FBSyxDQUFFLFVBQVU7a0JBQ3BDLFNBQVMsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFFLGtCQUFrQjtrQkFDL0MsT0FBTyxFQUNiLEtBQUssR0FBVyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQ3ZDLE9BQU8sR0FBb0IsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVqRCxJQUFJLEtBQWUsRUFDZixDQUFTLEVBQ1QsSUFBWSxDQUFDO1lBRWpCLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2FBQzNDO1lBRUQsd0NBQXdDO1lBQ3hDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNaLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDMUM7WUFFRCxpREFBaUQ7WUFDakQsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO2dCQUNwQixPQUFPLE1BQU0sQ0FBQzthQUNqQjtZQUVELDZDQUE2QztZQUM3QyxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzdDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNsQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO29CQUN4QixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3REO3FCQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtvQkFDL0IsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUN0RDtxQkFBTTtvQkFDSCxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDbkQ7YUFDSjtZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFDTCxhQUFDO0lBQUQsQ0E5TUEsQUE4TUMsQ0E5TTJCLFFBQUEsZUFBZSxHQThNMUM7SUE5TVksY0FBTSxTQThNbEIsQ0FBQTtBQUNMLENBQUMsRUFwTlMsT0FBTyxLQUFQLE9BQU8sUUFvTmhCO0FDak9EOzs7OztHQUtHO0FDTEg7Ozs7O0dBS0c7QUFFSCx1Q0FBdUM7QUFDdkMsbUNBQW1DO0FBQ25DLGdDQUFnQztBQUNoQyw0Q0FBNEM7QUFFNUMsSUFBVSxPQUFPLENBMkRoQjtBQTNERCxXQUFVLE9BQU87SUFFYjs7T0FFRztJQUNIO1FBQTJCLHlCQUFXO1FBQXRDO1lBQUEscUVBb0RDO1lBbERHOztlQUVHO1lBQ2EsVUFBSSxHQUFHLFFBQUEsT0FBTyxDQUFDLEtBQUssQ0FBQztZQU1yQixjQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQzs7UUF5QzlDLENBQUM7UUF2Q0csd0VBQXdFO1FBRXhFOztXQUVHO1FBQ0ksc0JBQU0sR0FBYjtZQUFjLGtCQUFzQztpQkFBdEMsVUFBc0MsRUFBdEMscUJBQXNDLEVBQXRDLElBQXNDO2dCQUF0Qyw2QkFBc0M7O1lBQ2hELElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVqQyxLQUFzQixVQUFRLEVBQVIscUJBQVEsRUFBUixzQkFBUSxFQUFSLElBQVE7Z0JBQXpCLElBQU0sT0FBTyxpQkFBQTtnQkFDZCxRQUFBLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRXpCLFFBQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRXpCLFFBQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRXpCLFFBQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRXpCLFFBQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRXpCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNsQztZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRCx3RUFBd0U7UUFFeEU7O1dBRUc7UUFDTyxxQ0FBcUIsR0FBL0I7WUFDSSxRQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUEzQ0Q7O1dBRUc7UUFDb0IsY0FBUSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBMENoRSxZQUFDO0tBcERELEFBb0RDLENBcEQwQixRQUFBLFdBQVcsR0FvRHJDO0lBcERZLGFBQUssUUFvRGpCLENBQUE7QUFFTCxDQUFDLEVBM0RTLE9BQU8sS0FBUCxPQUFPLFFBMkRoQjtBQ3ZFRDs7Ozs7R0FLRztBQUVILHlDQUF5QztBQUN6Qyw2Q0FBNkM7QUFFN0MsSUFBVSxPQUFPLENBaURoQjtBQWpERCxXQUFVLE9BQU87SUFFYjs7Ozs7T0FLRztJQUNIO1FBQ1kseUNBQXdCO1FBRHBDOztRQXVDQSxDQUFDO1FBcENHLHdFQUF3RTtRQUV4RTs7V0FFRztRQUNJLDJDQUFXLEdBQWxCLFVBQW1CLEtBQWEsRUFBRSxLQUFZO1lBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkIsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVEOztXQUVHO1FBQ0ksMkNBQVcsR0FBbEIsVUFBbUIsS0FBYTtZQUM1QixJQUFNLEtBQUssR0FBVSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkIsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVEOztXQUVHO1FBQ0ssOENBQWMsR0FBdEIsVUFBdUIsS0FBYTtZQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFXLEtBQUssRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3ZELElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQzthQUNsRTtRQUNMLENBQUM7UUFFTCw0QkFBQztJQUFELENBdkNBLEFBdUNDLENBdENXLFFBQUEsaUJBQWlCLEdBc0M1QjtJQXZDcUIsNkJBQXFCLHdCQXVDMUMsQ0FBQTtBQUVMLENBQUMsRUFqRFMsT0FBTyxLQUFQLE9BQU8sUUFpRGhCO0FDM0REOzs7OztHQUtHO0FBRUgsdUNBQXVDO0FBQ3ZDLG1DQUFtQztBQUNuQyxnQ0FBZ0M7QUFDaEMsNENBQTRDO0FBRTVDLElBQVUsT0FBTyxDQTJEaEI7QUEzREQsV0FBVSxPQUFPO0lBRWI7O09BRUc7SUFDSDtRQUEwQix3QkFBVztRQUFyQztZQUFBLHFFQW9EQztZQWxERzs7ZUFFRztZQUNhLFVBQUksR0FBRyxRQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFNcEIsY0FBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7O1FBeUM3QyxDQUFDO1FBdkNHLHdFQUF3RTtRQUV4RTs7V0FFRztRQUNJLHFCQUFNLEdBQWI7WUFBYyxrQkFBc0M7aUJBQXRDLFVBQXNDLEVBQXRDLHFCQUFzQyxFQUF0QyxJQUFzQztnQkFBdEMsNkJBQXNDOztZQUNoRCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFakMsS0FBc0IsVUFBUSxFQUFSLHFCQUFRLEVBQVIsc0JBQVEsRUFBUixJQUFRO2dCQUF6QixJQUFNLE9BQU8saUJBQUE7Z0JBQ2QsUUFBQSxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3JDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUV6QixRQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUV6QixRQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUV6QixRQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUV6QixRQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUV6QixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDbEM7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsd0VBQXdFO1FBRXhFOztXQUVHO1FBQ08sb0NBQXFCLEdBQS9CO1lBQ0ksUUFBQSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBM0NEOztXQUVHO1FBQ29CLGFBQVEsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQTBDaEUsV0FBQztLQXBERCxBQW9EQyxDQXBEeUIsUUFBQSxXQUFXLEdBb0RwQztJQXBEWSxZQUFJLE9Bb0RoQixDQUFBO0FBRUwsQ0FBQyxFQTNEUyxPQUFPLEtBQVAsT0FBTyxRQTJEaEI7QUN2RUQ7Ozs7O0dBS0c7QUFFSCxtQ0FBbUM7QUFDbkMsMENBQTBDO0FBQzFDLCtCQUErQjtBQUMvQix5Q0FBeUM7QUFDekMsbUNBQW1DO0FBQ25DLGlDQUFpQztBQUNqQyw0Q0FBNEM7QUFFNUMsSUFBVSxPQUFPLENBMkloQjtBQTNJRCxXQUFVLE9BQU87SUFFYjs7T0FFRztJQUNIO1FBc0JJOzs7O1dBSUc7UUFDSCxlQUFZLFFBQW9CLEVBQUUsT0FBZ0M7WUFBdEQseUJBQUEsRUFBQSxZQUFvQjtZQUFFLHdCQUFBLEVBQUEsVUFBbUIsUUFBQSxPQUFPLENBQUMsS0FBSztZQWVsRTs7ZUFFRztZQUNhLGlCQUFZLEdBQVcsT0FBTyxDQUFDO1lBakIzQyxJQUFJLFFBQVEsR0FBRyxDQUFDLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRTtnQkFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2FBQzdDO1lBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDNUIsQ0FBQztRQWNELHdFQUF3RTtRQUV4RTs7V0FFRztRQUNJLHdCQUFRLEdBQWYsVUFBZ0IsS0FBWTtZQUN4QixJQUFNLEdBQUcsR0FBRyxRQUFBLGFBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFFaEIsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLENBQUMsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7Z0JBQ3BCLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFFRCwwQ0FBMEM7WUFDMUMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO2dCQUM3QyxDQUFDLENBQUMsUUFBQSxPQUFPLENBQUMsUUFBUTtnQkFDbEIsQ0FBQyxDQUFDLFFBQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUV2QixLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QyxrQkFBa0I7Z0JBQ2xCLE1BQU0sR0FBRyxNQUFNLEtBQUssUUFBQSxPQUFPLENBQUMsUUFBUTtvQkFDaEMsQ0FBQyxDQUFDLFFBQUEsT0FBTyxDQUFDLFFBQVE7b0JBQ2xCLENBQUMsQ0FBQyxRQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUM7Z0JBRXZCLHFCQUFxQjtnQkFDckIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2FBQ2hDO1lBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2xELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRDs7V0FFRztRQUNJLDJCQUFXLEdBQWxCO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7UUFFRDs7V0FFRztRQUNJLDBCQUFVLEdBQWpCO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7UUFFRDs7V0FFRztRQUNJLHVCQUFPLEdBQWQ7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO2FBQy9EO1lBRUQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pDLENBQUM7UUFFRDs7V0FFRztRQUNJLHNCQUFNLEdBQWI7WUFBYyxrQkFBc0M7aUJBQXRDLFVBQXNDLEVBQXRDLHFCQUFzQyxFQUF0QyxJQUFzQztnQkFBdEMsNkJBQXNDOztZQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDYixNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7YUFDL0Q7WUFFRCxLQUFzQixVQUFRLEVBQVIscUJBQVEsRUFBUixzQkFBUSxFQUFSLElBQVE7Z0JBQXpCLElBQU0sT0FBTyxpQkFBQTtnQkFDZCxLQUFrQixVQUFVLEVBQVYsS0FBQSxJQUFJLENBQUMsS0FBSyxFQUFWLGNBQVUsRUFBVixJQUFVO29CQUF2QixJQUFNLEdBQUcsU0FBQTtvQkFDVixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN0QjthQUNKO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVEOztXQUVHO1FBQ0ksNEJBQVksR0FBbkI7WUFDSSxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzlCLENBQUM7UUFFTCxZQUFDO0lBQUQsQ0FsSUEsQUFrSUMsSUFBQTtJQWxJWSxhQUFLLFFBa0lqQixDQUFBO0lBRUQsUUFBQSxjQUFjLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRXhDLENBQUMsRUEzSVMsT0FBTyxLQUFQLE9BQU8sUUEySWhCO0FDMUpEOzs7OztHQUtHO0FBRUgsMkNBQTJDO0FBRTNDLElBQVUsT0FBTyxDQVdoQjtBQVhELFdBQVUsT0FBTztJQUViOzs7O09BSUc7SUFDSCx5Q0FBeUM7SUFDOUIsaUJBQVMsR0FFaEIsRUFBRyxDQUFDO0FBQ1osQ0FBQyxFQVhTLE9BQU8sS0FBUCxPQUFPLFFBV2hCO0FDcEJEOzs7OztHQUtHO0FBRUgsbUNBQW1DO0FBQ25DLGtDQUFrQztBQUNsQyxpREFBaUQ7QUFDakQsK0JBQStCO0FBQy9CLGlDQUFpQztBQUNqQyxpQ0FBaUM7QUFDakMsNENBQTRDO0FBRTVDLElBQVUsT0FBTyxDQThLaEI7QUE5S0QsV0FBVSxPQUFPO0lBRWI7O09BRUc7SUFDSDtRQUEyQix5QkFBNkI7UUFPcEQ7O1dBRUc7UUFDSCxlQUNJLFVBQWUsRUFDTCxVQUEyQjtZQUZ6QyxZQUlJLGtCQUFNLFVBQVUsRUFBRSxVQUFVLENBQUMsU0FHaEM7WUFMYSxnQkFBVSxHQUFWLFVBQVUsQ0FBaUI7WUF1Q3pDLHdFQUF3RTtZQUV4RTs7ZUFFRztZQUNhLGtCQUFZLEdBQVcsT0FBTyxDQUFDO1lBMkIvQyx3RUFBd0U7WUFFeEU7O2VBRUc7WUFDSSxnQkFBVSxHQUFtQixLQUFJLENBQUMsU0FBUyxDQUFDO1lBRW5EOztlQUVHO1lBQ0ksZUFBUyxHQUE4QixLQUFJLENBQUMsUUFBUSxDQUFDO1lBRTVEOztlQUVHO1lBQ0ksa0JBQVksR0FDZixLQUFJLENBQUMsV0FBVyxDQUFDO1lBRXJCOztlQUVHO1lBQ0ksa0JBQVksR0FBOEIsS0FBSSxDQUFDLFdBQVcsQ0FBQztZQXpGOUQsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFFBQUEsS0FBSyxFQUFFLENBQUM7WUFDMUIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztRQUM1QyxDQUFDO1FBRUQsd0VBQXdFO1FBRXhFOztXQUVHO1FBQ0ksNkJBQWEsR0FBcEIsVUFBcUIsVUFBZTtZQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRDs7V0FFRztRQUNJLHNCQUFNLEdBQWI7WUFBYyxrQkFBc0M7aUJBQXRDLFVBQXNDLEVBQXRDLHFCQUFzQyxFQUF0QyxJQUFzQztnQkFBdEMsNkJBQXNDOztZQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTlDLEtBQXNCLFVBQVEsRUFBUixxQkFBUSxFQUFSLHNCQUFRLEVBQVIsSUFBUTtnQkFBekIsSUFBTSxPQUFPLGlCQUFBO2dCQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQy9CO1lBRUQsT0FBTyxpQkFBTSxNQUFNLGFBQUksUUFBUSxFQUFFO1FBQ3JDLENBQUM7UUFFRDs7O1dBR0c7UUFDSSw0QkFBWSxHQUFuQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsR0FBRyxpQkFBTSxZQUFZLFdBQUUsQ0FBQztRQUM3RCxDQUFDO1FBU0Qsd0VBQXdFO1FBRXhFOztXQUVHO1FBQ08scUNBQXFCLEdBQS9CLFVBQ0ksUUFBZ0IsRUFDaEIsT0FBZTtZQUVmLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzNELE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDMUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBRUQ7OztXQUdHO1FBQ08sbUNBQW1CLEdBQTdCLFVBQThCLEtBQWE7WUFDdkMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQXlCRDs7V0FFRztRQUNJLHdCQUFRLEdBQWY7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQztRQUVEOztXQUVHO1FBQ0ksd0JBQVEsR0FBZixVQUFnQixLQUFZO1lBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQ7O1dBRUc7UUFDVyxnQkFBVSxHQUF4QixVQUF5QixLQUFhO1lBQ2xDLElBQU0sS0FBSyxHQUFhLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFMUMsSUFBSSxDQUFTLEVBQ1QsSUFBWSxFQUNaLE1BQWMsRUFDZCxLQUF3QixDQUFDO1lBRTdCLHFEQUFxRDtZQUNyRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDbEMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFaEIsaURBQWlEO2dCQUNqRCxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBRW5DLHlEQUF5RDtnQkFDekQsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUUvQiwrQkFBK0I7Z0JBQy9CLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDcEIsU0FBUztpQkFDWjtnQkFFRCxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLHdEQUF3RDtvQkFDeEQsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUMvQixJQUFJLENBQUMsUUFBQSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO3dCQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7cUJBQzdDO29CQUNELEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxRQUFBLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7aUJBQ3hEO3FCQUFNO29CQUNILDBDQUEwQztvQkFDMUMsTUFBTSxHQUFHLFFBQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ2xELEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDckQ7YUFDSjtZQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ3JDO1lBRUQsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNMLFlBQUM7SUFBRCxDQXhLQSxBQXdLQyxDQXhLMEIsUUFBQSxxQkFBcUIsR0F3Sy9DO0lBeEtZLGFBQUssUUF3S2pCLENBQUE7QUFDTCxDQUFDLEVBOUtTLE9BQU8sS0FBUCxPQUFPLFFBOEtoQjtBQzdMRDs7Ozs7R0FLRztBQUVILElBQVUsT0FBTyxDQTRDaEI7QUE1Q0QsV0FBVSxPQUFPO0lBRWI7O09BRUc7SUFDSCxJQUFpQixHQUFHLENBcUNuQjtJQXJDRCxXQUFpQixHQUFHO1FBRWhCOztXQUVHO1FBQ0gsa0JBQXlCLE9BQW9CO1lBQ3pDLE9BQU8sT0FBTyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUUsNEJBQTRCO2tCQUN0RCxTQUFTLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQztrQkFDaEMsU0FBUyxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBSmUsWUFBUSxXQUl2QixDQUFBO1FBRUQ7O1dBRUc7UUFDSCxtQkFBMEIsT0FBb0I7WUFDMUMsT0FBTyxPQUFPLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBRSw0QkFBNEI7a0JBQ3ZELFNBQVMsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDO2tCQUMvQixTQUFTLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFKZSxhQUFTLFlBSXhCLENBQUE7UUFFRDs7Ozs7V0FLRztRQUNILG1CQUFtQixPQUFvQixFQUFFLE1BQWM7WUFDbkQsSUFBSSxVQUFrQixDQUFDO1lBQ3ZCLElBQUksTUFBTSxDQUFDLGdCQUFnQixFQUFFO2dCQUN6QixVQUFVO29CQUNMLGdCQUFnQixDQUFDLE9BQU8sQ0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2xEO2lCQUFNO2dCQUNILFVBQVUsR0FBSSxPQUFlLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3REO1lBQ0QsT0FBTyxVQUFVLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEUsQ0FBQztJQUVMLENBQUMsRUFyQ2dCLEdBQUcsR0FBSCxXQUFHLEtBQUgsV0FBRyxRQXFDbkI7QUFFTCxDQUFDLEVBNUNTLE9BQU8sS0FBUCxPQUFPLFFBNENoQjtBQ25ERDs7Ozs7R0FLRztBQUVILDBDQUEwQztBQUMxQyxvQ0FBb0M7QUFDcEMsd0NBQXdDO0FBRXhDLElBQVUsT0FBTyxDQXNFaEI7QUF0RUQsV0FBVSxTQUFPO0lBRWI7Ozs7T0FJRztJQUNILGdEQUFnRDtJQUNoRCxJQUFpQixPQUFPLENBNER2QjtJQTVERCxXQUFpQixPQUFPO1FBRXBCO1lBRUk7O2VBRUc7WUFDSCx5QkFDYyxPQUEyQjtnQkFBM0IsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7Z0JBRXJDLE9BQU87WUFDWCxDQUFDO1lBT0Q7Ozs7OztlQU1HO1lBQ08sZ0NBQU0sR0FBaEI7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ2YsT0FBTztpQkFDVjtnQkFFRCxJQUFNLE1BQU0sR0FBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQXdCLENBQUMsUUFBUSxDQUFDO2dCQUMvRCxJQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDdEMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFFZix5Q0FBeUM7Z0JBQ3pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUM1QyxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFnQixDQUFDO29CQUMzQyxLQUFLLEdBQUcsS0FBSyxHQUFHLFVBQUEsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDdEMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFVBQUEsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2lCQUNyRDtnQkFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3hDLENBQUM7WUFFRDs7ZUFFRztZQUNPLCtCQUFLLEdBQWYsVUFBdUMsRUFBVTtnQkFDN0MsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU87b0JBQ3ZCLENBQUMsQ0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQXdCLENBQUMsUUFBUTtvQkFDakQsQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQkFFZixnRUFBZ0U7Z0JBQ2hFLE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQU0sQ0FBQztZQUMxQyxDQUFDO1lBRUwsc0JBQUM7UUFBRCxDQXhEQSxBQXdEQyxJQUFBO1FBeERxQix1QkFBZSxrQkF3RHBDLENBQUE7SUFFTCxDQUFDLEVBNURnQixPQUFPLEdBQVAsaUJBQU8sS0FBUCxpQkFBTyxRQTREdkI7QUFFTCxDQUFDLEVBdEVTLE9BQU8sS0FBUCxPQUFPLFFBc0VoQjtBQ2pGRDs7Ozs7R0FLRztBQUVILDBDQUEwQztBQ1AxQzs7Ozs7R0FLRztBQUVILDRDQUE0QztBQUM1QyxvQ0FBb0M7QUFDcEMsNENBQTRDO0FBQzVDLDRDQUE0QztBQUU1QyxJQUFVLE9BQU8sQ0FrR2hCO0FBbEdELFdBQVUsT0FBTztJQUViOztPQUVHO0lBQ0gsSUFBaUIsS0FBSyxDQTJGckI7SUEzRkQsV0FBaUIsS0FBSztRQUVsQjs7V0FFRztRQUNIO1lBT0k7O2VBRUc7WUFDSCx3QkFBc0IsTUFBYTtnQkFBYixXQUFNLEdBQU4sTUFBTSxDQUFPO2dCQW1EbkM7O21CQUVHO2dCQUNhLGlCQUFZLEdBQVcsc0JBQXNCLENBQUM7Z0JBckQxRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQ2hDLFFBQUEsYUFBYSxDQUFDLFFBQUEsYUFBYSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUMzQyxDQUFDO1lBQ04sQ0FBQztZQUVELG9FQUFvRTtZQUVwRTs7ZUFFRztZQUNJLDhCQUFLLEdBQVosVUFBYSxHQUFXO2dCQUNwQixJQUFJLE1BQU0sR0FBWSxLQUFLLENBQUM7Z0JBRTVCLEtBQXNCLFVBQWMsRUFBZCxLQUFBLElBQUksQ0FBQyxTQUFTLEVBQWQsY0FBYyxFQUFkLElBQWM7b0JBQS9CLElBQU0sT0FBTyxTQUFBO29CQUNkLElBQUksQ0FBQyxPQUFPLEVBQUU7d0JBQUUsU0FBUztxQkFBRSxDQUFFLHFCQUFxQjtvQkFDbEQsbUNBQW1DO29CQUNuQyxJQUFNLFNBQVMsR0FBWSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM5QywrQ0FBK0M7b0JBQy9DLE1BQU0sR0FBRyxNQUFNLElBQUksU0FBUyxDQUFDO2lCQUNoQztnQkFFRCxPQUFPLE1BQU0sQ0FBQztZQUNsQixDQUFDO1lBT0Q7O2VBRUc7WUFDSSxzQ0FBYSxHQUFwQjtnQkFDSSxJQUFJLE9BQU8sR0FBVyxDQUFDLENBQUM7Z0JBRXhCLEtBQXNCLFVBQWMsRUFBZCxLQUFBLElBQUksQ0FBQyxTQUFTLEVBQWQsY0FBYyxFQUFkLElBQWM7b0JBQS9CLElBQU0sT0FBTyxTQUFBO29CQUNkLElBQUksQ0FBQyxPQUFPLEVBQUU7d0JBQUUsU0FBUztxQkFBRSxDQUFFLHFCQUFxQjtvQkFDbEQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztpQkFDdEM7Z0JBRUQsT0FBTyxPQUFPLENBQUM7WUFDbkIsQ0FBQztZQXVCRDs7ZUFFRztZQUNJLG9DQUFXLEdBQWxCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNsQyxDQUFDO1lBRUwscUJBQUM7UUFBRCxDQWxGQSxBQWtGQyxJQUFBO1FBbEZxQixvQkFBYyxpQkFrRm5DLENBQUE7UUFFRCxRQUFBLGNBQWMsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFakQsQ0FBQyxFQTNGZ0IsS0FBSyxHQUFMLGFBQUssS0FBTCxhQUFLLFFBMkZyQjtBQUVMLENBQUMsRUFsR1MsT0FBTyxLQUFQLE9BQU8sUUFrR2hCO0FDOUdEOzs7OztHQUtHO0FBRUgsSUFBVSxPQUFPLENBZWhCO0FBZkQsV0FBVSxPQUFPO0lBRWI7O09BRUc7SUFDSCxJQUFpQixLQUFLLENBUXJCO0lBUkQsV0FBaUIsS0FBSztRQUVsQjs7O1dBR0c7UUFDSCxJQUFZLFNBQWlDO1FBQTdDLFdBQVksU0FBUztZQUFFLDBDQUFTLENBQUE7WUFBRSx1Q0FBRyxDQUFBO1lBQUUsMkNBQUssQ0FBQTtRQUFBLENBQUMsRUFBakMsU0FBUyxHQUFULGVBQVMsS0FBVCxlQUFTLFFBQXdCO0lBRWpELENBQUMsRUFSZ0IsS0FBSyxHQUFMLGFBQUssS0FBTCxhQUFLLFFBUXJCO0FBRUwsQ0FBQyxFQWZTLE9BQU8sS0FBUCxPQUFPLFFBZWhCO0FDdEJEOzs7OztHQUtHO0FBRUgsOENBQThDO0FBQzlDLDRDQUE0QztBQUM1QyxxQ0FBcUM7QUFFckMsSUFBVSxPQUFPLENBK0ZoQjtBQS9GRCxXQUFVLE9BQU87SUFFYjs7T0FFRztJQUNILElBQWlCLEtBQUssQ0F3RnJCO0lBeEZELFdBQWlCLEtBQUs7UUFFbEI7O1dBRUc7UUFDSDtZQU9JOzs7OztlQUtHO1lBQ0gsaUJBQ2MsUUFBZ0IsRUFDaEIsS0FBYyxFQUNkLEtBQWlDO2dCQUFqQyxzQkFBQSxFQUFBLFFBQW1CLE1BQUEsU0FBUyxDQUFDLElBQUk7Z0JBRmpDLGFBQVEsR0FBUixRQUFRLENBQVE7Z0JBQ2hCLFVBQUssR0FBTCxLQUFLLENBQVM7Z0JBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBNEI7Z0JBZC9DOzttQkFFRztnQkFDTyxnQkFBVyxHQUFXLENBQUMsQ0FBQztnQkE0RGxDOzttQkFFRztnQkFDYSxpQkFBWSxHQUFXLGVBQWUsQ0FBQztnQkFsRG5ELE9BQU87WUFDWCxDQUFDO1lBRUQsb0VBQW9FO1lBRXBFOztlQUVHO1lBQ0ksdUJBQUssR0FBWixVQUFhLEdBQVc7Z0JBQ3BCLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxNQUFBLFNBQVMsQ0FBQyxJQUFJLEVBQUU7b0JBQy9CLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDMUM7cUJBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLE1BQUEsU0FBUyxDQUFDLEtBQUssRUFBRTtvQkFDdkMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzVDO2dCQUVELElBQUksR0FBRyxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ3ZCLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO29CQUN0QixPQUFPLElBQUksQ0FBQztpQkFDZjtnQkFFRCxPQUFPLEtBQUssQ0FBQztZQUNqQixDQUFDO1lBRUQ7O2VBRUc7WUFDSSx5QkFBTyxHQUFkO2dCQUNJLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7b0JBQzFCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztpQkFDeEI7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RCLENBQUM7WUFFRDs7ZUFFRztZQUNJLCtCQUFhLEdBQXBCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUM1QixDQUFDO1lBY0Qsb0VBQW9FO1lBRXBFOztlQUVHO1lBQ0ksaUNBQWUsR0FBdEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLE1BQUEsU0FBUyxDQUFDLEdBQUcsQ0FBQztZQUN4QyxDQUFDO1lBRUwsY0FBQztRQUFELENBL0VBLEFBK0VDLElBQUE7UUEvRVksYUFBTyxVQStFbkIsQ0FBQTtRQUVELFFBQUEsY0FBYyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUxQyxDQUFDLEVBeEZnQixLQUFLLEdBQUwsYUFBSyxLQUFMLGFBQUssUUF3RnJCO0FBRUwsQ0FBQyxFQS9GUyxPQUFPLEtBQVAsT0FBTyxRQStGaEI7QUMxR0Q7Ozs7O0dBS0c7QUFFSCw4Q0FBOEM7QUFDOUMsNENBQTRDO0FBQzVDLG1DQUFtQztBQUVuQyxJQUFVLE9BQU8sQ0FnSGhCO0FBaEhELFdBQVUsT0FBTztJQUViOztPQUVHO0lBQ0gsSUFBaUIsS0FBSyxDQXlHckI7SUF6R0QsV0FBaUIsS0FBSztRQUVsQjs7V0FFRztRQUNIO1lBT0k7Ozs7O2VBS0c7WUFDSCxzQkFDYyxLQUFhLEVBQ3ZCLFFBQW1CLEVBQ1QsY0FBd0I7Z0JBRnhCLFVBQUssR0FBTCxLQUFLLENBQVE7Z0JBRWIsbUJBQWMsR0FBZCxjQUFjLENBQVU7Z0JBb0R0Qzs7bUJBRUc7Z0JBQ2EsaUJBQVksR0FBVyxvQkFBb0IsQ0FBQztnQkFyRHhELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3RDLENBQUM7WUFFRCxvRUFBb0U7WUFFcEU7O2VBRUc7WUFDSSw0QkFBSyxHQUFaLFVBQWEsR0FBVztnQkFDcEIsSUFBSSxNQUFNLEdBQVksS0FBSyxDQUFDO2dCQUU1QixLQUFzQixVQUFjLEVBQWQsS0FBQSxJQUFJLENBQUMsU0FBUyxFQUFkLGNBQWMsRUFBZCxJQUFjO29CQUEvQixJQUFNLE9BQU8sU0FBQTtvQkFDZCxJQUFJLENBQUMsT0FBTyxFQUFFO3dCQUFFLFNBQVM7cUJBQUUsQ0FBRSxxQkFBcUI7b0JBQ2xELG1DQUFtQztvQkFDbkMsSUFBTSxTQUFTLEdBQVksT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDOUMsK0NBQStDO29CQUMvQyxNQUFNLEdBQUcsTUFBTSxJQUFJLFNBQVMsQ0FBQztpQkFDaEM7Z0JBRUQsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO29CQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDbEM7Z0JBRUQsT0FBTyxNQUFNLENBQUM7WUFDbEIsQ0FBQztZQUVEOztlQUVHO1lBQ0ksOEJBQU8sR0FBZDtnQkFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDdEIsQ0FBQztZQUVEOztlQUVHO1lBQ0ksb0NBQWEsR0FBcEI7Z0JBQ0ksSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO29CQUNyQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLENBQUM7aUJBQzlDO2dCQUNELE9BQU8sSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDbkMsQ0FBQztZQWNELG9FQUFvRTtZQUVwRTs7ZUFFRztZQUNJLGtDQUFXLEdBQWxCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNsQyxDQUFDO1lBRUQ7O2VBRUc7WUFDSSx1Q0FBZ0IsR0FBdkI7Z0JBQ0ksSUFBSSxPQUFPLEdBQVcsQ0FBQyxDQUFDO2dCQUV4QixLQUFzQixVQUFjLEVBQWQsS0FBQSxJQUFJLENBQUMsU0FBUyxFQUFkLGNBQWMsRUFBZCxJQUFjO29CQUEvQixJQUFNLE9BQU8sU0FBQTtvQkFDZCxJQUFJLENBQUMsT0FBTyxFQUFFO3dCQUFFLFNBQVM7cUJBQUUsQ0FBRSxxQkFBcUI7b0JBQ2xELE9BQU8sSUFBSSxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7aUJBQ3RDO2dCQUVELE9BQU8sT0FBTyxDQUFDO1lBQ25CLENBQUM7WUFFTCxtQkFBQztRQUFELENBaEdBLEFBZ0dDLElBQUE7UUFoR1ksa0JBQVksZUFnR3hCLENBQUE7UUFFRCxRQUFBLGNBQWMsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFL0MsQ0FBQyxFQXpHZ0IsS0FBSyxHQUFMLGFBQUssS0FBTCxhQUFLLFFBeUdyQjtBQUVMLENBQUMsRUFoSFMsT0FBTyxLQUFQLE9BQU8sUUFnSGhCO0FDM0hEOzs7OztHQUtHO0FBRUgsb0NBQW9DO0FBRXBDLG9DQUFvQztBQUNwQywwQ0FBMEM7QUFDMUMscUNBQXFDO0FBQ3JDLG1DQUFtQztBQUNuQyx3Q0FBd0M7QUFFeEMsSUFBVSxPQUFPLENBc01oQjtBQXRNRCxXQUFVLE9BQU87SUFFYjs7T0FFRztJQUNILElBQWlCLEtBQUssQ0ErTHJCO0lBL0xELFdBQWlCLEtBQUs7UUFFbEI7O1dBRUc7UUFDSDtZQUErQiw2QkFBYztZQUE3Qzs7WUF3TEEsQ0FBQztZQXRMRyxvRUFBb0U7WUFFcEU7O2VBRUc7WUFDSSwyQkFBTyxHQUFkO2dCQUNJLE9BQU8sWUFBWSxDQUFDO1lBQ3hCLENBQUM7WUFFRCxvRUFBb0U7WUFFcEU7O2VBRUc7WUFDTyxrQ0FBYyxHQUF4QixVQUF5QixNQUFjO2dCQUNuQyxJQUFNLFFBQVEsR0FBdUIsRUFBRyxDQUFDO2dCQUN6QyxJQUFJLE9BQWUsRUFDZixZQUF1QixDQUFDO2dCQUU1QixVQUFVO2dCQUNWLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3hDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFBLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUVwQyxVQUFVO2dCQUNWLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO3NCQUNyQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3NCQUNoQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFBLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUVwQyxVQUFVO2dCQUNWLE9BQU8sR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMvQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksTUFBQSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFFcEMsY0FBYztnQkFDZCxZQUFZLEdBQUcsRUFBRyxDQUFDO2dCQUNuQixLQUFLLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDakQsT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFFLE1BQU07MEJBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFJLElBQUk7MEJBQzVCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQVEsSUFBSTswQkFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBSSxTQUFTO29CQUN2QyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksTUFBQSxPQUFPLENBQ3pCLE9BQU8sRUFDUCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUN2QyxNQUFBLFNBQVMsQ0FBQyxHQUFHLENBQ2hCLENBQUMsQ0FBQztpQkFDTjtnQkFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksTUFBQSxZQUFZLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBRTdELGVBQWU7Z0JBQ2YsMENBQTBDO2dCQUMxQyxRQUFRLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ2pCLEtBQUssUUFBQSxLQUFLLENBQUMsT0FBTzt3QkFDZCxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksTUFBQSxZQUFZLENBQzFCLEtBQUssRUFDTDs0QkFDSSxJQUFJLE1BQUEsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7NEJBQzFCLElBQUksTUFBQSxPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQzs0QkFDOUIsSUFBSSxNQUFBLE9BQU8sQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQUEsU0FBUyxDQUFDLEdBQUcsQ0FBQzs0QkFDL0MsSUFBSSxNQUFBLE9BQU8sQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsTUFBQSxTQUFTLENBQUMsR0FBRyxDQUFDOzRCQUN2RCxJQUFJLE1BQUEsT0FBTyxDQUFDLFNBQVMsRUFBRSxjQUFjLEVBQUUsTUFBQSxTQUFTLENBQUMsR0FBRyxDQUFDO3lCQUN4RCxFQUNELElBQUksTUFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQ3BCLENBQUMsQ0FBQzt3QkFDSCxNQUFNO29CQUVWLEtBQUssUUFBQSxLQUFLLENBQUMsTUFBTTt3QkFDYixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksTUFBQSxZQUFZLENBQzFCLEtBQUssRUFDTDs0QkFDSSxJQUFJLE1BQUEsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7NEJBQzFCLElBQUksTUFBQSxPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQzs0QkFDOUIsSUFBSSxNQUFBLE9BQU8sQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQUEsU0FBUyxDQUFDLEdBQUcsQ0FBQzs0QkFDakQsSUFBSSxNQUFBLE9BQU8sQ0FBQyxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBQSxTQUFTLENBQUMsR0FBRyxDQUFDOzRCQUN6RCxJQUFJLE1BQUEsT0FBTyxDQUFDLFdBQVcsRUFBRSxjQUFjLEVBQUUsTUFBQSxTQUFTLENBQUMsR0FBRyxDQUFDO3lCQUMxRCxFQUNELElBQUksTUFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQ3BCLENBQUMsQ0FBQzt3QkFDSCxNQUFNO29CQUVWLEtBQUssUUFBQSxLQUFLLENBQUMsT0FBTzt3QkFDZCxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksTUFBQSxZQUFZLENBQzFCLEtBQUssRUFDTDs0QkFDSSxJQUFJLE1BQUEsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7NEJBQzFCLElBQUksTUFBQSxPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQzs0QkFDOUIsSUFBSSxNQUFBLE9BQU8sQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQUEsU0FBUyxDQUFDLEdBQUcsQ0FBQzs0QkFDbkQsSUFBSSxNQUFBLE9BQU8sQ0FBQyxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsTUFBQSxTQUFTLENBQUMsR0FBRyxDQUFDOzRCQUMzRCxJQUFJLE1BQUEsT0FBTyxDQUFDLGFBQWEsRUFBRSxxQkFBcUIsRUFBRSxNQUFBLFNBQVMsQ0FBQyxHQUFHLENBQUM7eUJBQ25FLEVBQ0QsSUFBSSxNQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FDcEIsQ0FBQyxDQUFDO3dCQUNILE1BQU07b0JBRVYsS0FBSyxRQUFBLEtBQUssQ0FBQyxTQUFTO3dCQUNoQixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksTUFBQSxZQUFZLENBQzFCLEtBQUssRUFDTDs0QkFDSSxJQUFJLE1BQUEsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7NEJBQzFCLElBQUksTUFBQSxPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQzs0QkFDOUIsSUFBSSxNQUFBLE9BQU8sQ0FBQyxlQUFlLEVBQUUsUUFBUSxFQUFFLE1BQUEsU0FBUyxDQUFDLEdBQUcsQ0FBQzs0QkFDckQsSUFBSSxNQUFBLE9BQU8sQ0FBQyxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsTUFBQSxTQUFTLENBQUMsR0FBRyxDQUFDO3lCQUNoRSxFQUNELElBQUksTUFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQ3BCLENBQUMsQ0FBQzt3QkFDSCxNQUFNO29CQUVWLEtBQUssUUFBQSxLQUFLLENBQUMsU0FBUzt3QkFDaEIsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQUEsWUFBWSxDQUMxQixJQUFJLEVBQ0o7NEJBQ0ksSUFBSSxNQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUM7NEJBQ2xCLElBQUksTUFBQSxPQUFPLENBQUMsT0FBTyxDQUFDOzRCQUNwQixJQUFJLE1BQUEsT0FBTyxDQUFDLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxNQUFBLFNBQVMsQ0FBQyxHQUFHLENBQUM7NEJBQ3ZELElBQUksTUFBQSxPQUFPLENBQUMsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBQSxTQUFTLENBQUMsR0FBRyxDQUFDO3lCQUNsRSxFQUNELElBQUksTUFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQ3BCLENBQUMsQ0FBQzt3QkFDSCxNQUFNO2lCQUNiO2dCQUVELFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFBLFlBQVksQ0FDMUIsV0FBVyxFQUNYO29CQUNJLElBQUksTUFBQSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFBLFNBQVMsQ0FBQyxLQUFLLENBQUM7b0JBQzlDLElBQUksTUFBQSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFBLFNBQVMsQ0FBQyxLQUFLLENBQUM7b0JBQzlDLElBQUksTUFBQSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFBLFNBQVMsQ0FBQyxLQUFLLENBQUM7b0JBQzlDLElBQUksTUFBQSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFBLFNBQVMsQ0FBQyxLQUFLLENBQUM7aUJBQ2pELENBQ0osQ0FBQyxDQUFDO2dCQUVILFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFBLFlBQVksQ0FDMUIsVUFBVSxFQUNWO29CQUNJLElBQUksTUFBQSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFBLFNBQVMsQ0FBQyxJQUFJLENBQUM7b0JBQzdDLElBQUksTUFBQSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFBLFNBQVMsQ0FBQyxJQUFJLENBQUM7b0JBQzdDLElBQUksTUFBQSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFBLFNBQVMsQ0FBQyxJQUFJLENBQUM7b0JBQzdDLElBQUksTUFBQSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFBLFNBQVMsQ0FBQyxJQUFJLENBQUM7aUJBQ2hELENBQ0osQ0FBQyxDQUFDO2dCQUVILFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFBLFlBQVksQ0FDMUIsV0FBVyxFQUNYO29CQUNJLElBQUksTUFBQSxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFBLFNBQVMsQ0FBQyxLQUFLLENBQUM7b0JBQzVDLElBQUksTUFBQSxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFBLFNBQVMsQ0FBQyxLQUFLLENBQUM7b0JBQzVDLElBQUksTUFBQSxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFBLFNBQVMsQ0FBQyxLQUFLLENBQUM7b0JBQzVDLElBQUksTUFBQSxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFBLFNBQVMsQ0FBQyxLQUFLLENBQUM7b0JBQzVDLElBQUksTUFBQSxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFBLFNBQVMsQ0FBQyxLQUFLLENBQUM7b0JBQzVDLElBQUksTUFBQSxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFBLFNBQVMsQ0FBQyxLQUFLLENBQUM7aUJBQy9DLENBQ0osQ0FBQyxDQUFDO2dCQUVILFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFBLFlBQVksQ0FDMUIsVUFBVSxF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QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidG91Y2gtcHJpY2tlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcmZhY2UgZm9yIG9iamVjdHMgdGhhdCBjYW4gcmVjZWl2ZSBub3RpZmljYXRpb25zIGZyb20gY2hpbGRyZW5cbiAgICAgKlxuICAgICAqIFNvbWUgY2xhc3NlcyAoZS5nLiBbW0Fic3RyYWN0Q29udGFpbmVyXV0pIGNhbiBjb250YWluIGJsb2Nrcy5cbiAgICAgKiBCbG9ja3Mgbm90aWZ5IHRoZXNlIGNsYXNzZXMgd2hlbiB0aGV5IGFyZSBjaGFuZ2VkLlxuICAgICAqL1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgTm90aWZpYWJsZSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlY2VpdmVzIGEgbm90aWZpY2F0aW9uIGZyb20gYSBibG9jayB0aGF0IGhhcyBjaGFuZ2VkXG4gICAgICAgICAqIEBwYXJhbSBpbmRleCAgaW5kZXggb2YgY2hhbmdlZCBibG9jayBpbiBjb250YWluZXJcbiAgICAgICAgICovXG4gICAgICAgIG5vdGlmeShpbmRleDogbnVtYmVyKTogdm9pZDtcblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJOb3RpZmlhYmxlLnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogT3duZXJzaGlwIG9mIGEgYmxvY2tcbiAgICAgKlxuICAgICAqIFtbQWJzdHJhY3RCbG9ja11dIG9iamVjdHMgY2FuIGJlIGNvbGxlY3RlZCB0b2dldGhlciB3aXRoaW4gYW5cbiAgICAgKiBbW0Fic3RyYWN0Q29udGFpbmVyXV0uXG4gICAgICogRWFjaCBibG9jayBzdG9yZXMgYSByZWZlcmVuY2UgdG8gaXRzIGNvbnRhaW5lciBhbG9uZyB3aXRoIGEgbnVtZXJpYyBpbmRleFxuICAgICAqIHJlcHJlc2VudGluZyBpdHMgcG9zaXRpb24gd2l0aGluIHRoYXQgY29udGFpbmVyLlxuICAgICAqL1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgQmxvY2tPd25lcnNoaXAge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250YWluZXIgb2YgdGhlIGJsb2NrLlxuICAgICAgICAgKi9cbiAgICAgICAgY29udGFpbmVyOiBOb3RpZmlhYmxlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmRleCB3aXRoaW4gdGhlIGNvbnRhaW5lci5cbiAgICAgICAgICogSW5kaWNlcyBzdGFydCBjb3VudGluZyBhdCBvbmUgYW5kIGluY3JlYXNlIHRvIHRoZSBsZW5ndGggb2YgdGhlXG4gICAgICAgICAqIGNvbnRhaW5lci5cbiAgICAgICAgICovXG4gICAgICAgIGluZGV4OiBudW1iZXI7XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBUZW1wbGF0ZSBjb250ZXh0XG4gICAgICpcbiAgICAgKiBEaWN0aW9uYXJ5IG9mIGNvbnRleHQgZGF0YVxuICAgICAqL1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgVGVtcGxhdGVDb250ZXh0IHtcbiAgICAgICAgW2luZGV4OiBzdHJpbmddOiBhbnk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJUZW1wbGF0ZUNvbnRleHQudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBNaXhpbiB0aGF0IHByb3ZpZGVzIHByaW50IGZ1bmN0aW9uYWxpdHkgdmlhIHRlbXBsYXRlc1xuICAgICAqXG4gICAgICogQSBgVGVtcGxhdGVgIGlzIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIFtbVGVtcGxhdGVDb250ZXh0XV0gYW5kIHByb2R1Y2VzXG4gICAgICogYSBzdHJpbmcgcmVuZGVyaW5nIG9mIHRoYXQgY29udGV4dC5cbiAgICAgKiBUZW1wbGF0ZXMgYXJlIHByZWNvbXBpbGVkIHVzaW5nIHRoZVxuICAgICAqIFtkb1QuanNdKGh0dHBzOi8vb2xhZG8uZ2l0aHViLmlvL2RvVC8pIHRlbXBsYXRlIHByZWNvbXBpbGVyIGFuZCB0aGVuXG4gICAgICogc3RvcmVkIGluIFtbVGVtcGxhdGVzXV0uXG4gICAgICogRWFjaCB0ZW1wbGF0ZSBpcyBhc3NvY2lhdGVkIHdpdGggYSBjbGFzcyBhbmQgZXhwZWN0cyB0byByZW5kZXIgb2JqZWN0cyBvZlxuICAgICAqIHRoYXQgY2xhc3MsIHdpdGggdGhlIGluc3RhbmNlIGJlaW5nIHBhc3NlZCB2aWEgdGhlIGNvbnRleHQuXG4gICAgICpcbiAgICAgKiBUaGlzIG1peGluIG1ha2VzIGl0IGVhc3kgdG8gbWFrZSBhIGNsYXNzIHByaW50YWJsZSB1c2luZyB0aGUgZm9sbG93aW5nXG4gICAgICogc3RlcHM6XG4gICAgICpcbiAgICAgKiAxLiBBZGQgYGltcGxlbWVudHMgUHJpbnRhYmxlTWl4aW5gIHRvIHRoZSB0YXJnZXQgY2xhc3MuXG4gICAgICogICAgVGhpcyBlbmFibGVzIHRoZSBjb21waWxlciB0byBjaGVjayBhbGwgZGVwZW5kZW5jaWVzIGhhdmUgYmVlbiBhZGRlZC5cbiAgICAgKlxuICAgICAqIDIuIERlY2xhcmUgYSBbW3ByaW50XV0gZnVuY3Rpb24gYXMgZm9sbG93czpcbiAgICAgKiAgICBgYGBcbiAgICAgKiAgICBwdWJsaWMgcHJpbnQ6ICh0OiBzdHJpbmcsIGM/OiBUZW1wbGF0ZUNvbnRleHQpID0+IHN0cmluZztcbiAgICAgKiAgICBgYGBcbiAgICAgKlxuICAgICAqIDMuIERlZmluZSBhIFtbdGVtcGxhdGVQYXRoXV0uXG4gICAgICogICAgSWYgYSBjbGFzcycgdGVtcGxhdGVzIGxpdmUgdW5kZXIgYHNyYy9fdGVtcGxhdGVzL0FwcGxlL0JhbmFuYWAgdGhlblxuICAgICAqICAgIHRoZSBgdGVtcGxhdGVQYXRoYCB3b3VsZCBiZSBkZWZpbmVkIGFzOlxuICAgICAqICAgIGBgYFxuICAgICAqICAgIHB1YmxpYyByZWFkb25seSB0ZW1wbGF0ZVBhdGg6IHN0cmluZyA9ICdBcHBsZS5CYW5hbmEnO1xuICAgICAqICAgIGBgYFxuICAgICAqXG4gICAgICogNC4gQ2FsbCBbW1ByaW50YWJsZU1peGluLm1ha2VQcmludGFibGVdXSB0byBiaW5kIHRoZSBpbXBsZW1lbnRhdGlvbiBvZlxuICAgICAqICAgIFtbcHJpbnRdXS5cbiAgICAgKiAgICBGb3Igb3VyIGBCYW5hbmFgIGNsYXNzIHRoaXMgd291bGQgYmUgZG9uZSBhcyBmb2xsb3dzOlxuICAgICAqICAgIGBgYFxuICAgICAqICAgIFByaW50YWJsZU1peGluLm1ha2VQcmludGFibGUoQmFuYW5hKTtcbiAgICAgKiAgICBgYGBcbiAgICAgKlxuICAgICAqIDUuIChPcHRpb25hbGx5KSBjaGVjayB0aGF0IGV2ZXJ5dGhpbmcgaGFzIHdvcmtlZCBieSBleHRlbmRpbmcgdGhlIG5ld1xuICAgICAqICAgIGNsYXNzJyBzcGVjLiBSZWZlcmVuY2UgdGhlIFtbUHJpbnRhYmxlTWl4aW5dXSBzcGVjOlxuICAgICAqICAgIGBgYFxuICAgICAqICAgIC8vLyA8cmVmZXJlbmNlIHBhdGg9XCJQcmludGFibGVNaXhpbi5zcGVjLnRzXCIgLz5cbiAgICAgKiAgICBgYGBcbiAgICAgKiAgICAuLi4gYW5kIHRoZW4gY2FsbCB0aGUgdGVzdCBmdW5jdGlvbjpcbiAgICAgKiAgICBgYGBcbiAgICAgKiAgICBkZXNjcmliZSgnQmFuYW5hIGNsYXNzJywgKCkgPT4ge1xuICAgICAqICAgICAgICB0ZXN0UHJpbnRhYmxlTWl4aW5JbXBsZW1lbnRhdGlvbigoKSA9PiBuZXcgQmFuYW5hKCkpO1xuICAgICAqICAgIH0pO1xuICAgICAqICAgIGBgYFxuICAgICAqICAgIFRoZSB0ZXN0IGZ1bmN0aW9uIHRha2VzIGEgc2luZ2xlIHBhcmFtZXRlciB3aGljaCBpcyBhIGZ1bmN0aW9uIHRoYXRcbiAgICAgKiAgICBjcmVhdGVzIHRoZSBjbGFzcyB0byBiZSB0ZXN0ZWQuXG4gICAgICovXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFByaW50YWJsZU1peGluIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVuZGVycyB0aGUgb2JqZWN0IHdpdGggYSB0ZW1wbGF0ZS5cbiAgICAgICAgICogVGFrZXMgdGhlIG5hbWUgb2YgdGhlIHRlbXBsYXRlIGFuZCBhIFtbVGVtcGxhdGVDb250ZXh0XV0sIGFkZGluZyB0aGVcbiAgICAgICAgICogb2JqZWN0IGluc3RhbmNlIHRvIHRoZSBjb250ZXh0IGJlZm9yZSBleGVjdXRpbmcgdGhlIHRlbXBsYXRlLlxuICAgICAgICAgKiBVc2VzIHRoZSBbW3RlbXBsYXRlUGF0aF1dIHRvIGZpbmQgYSB0ZW1wbGF0ZSB3aXRoIHRoZSBwcm92aWRlZFxuICAgICAgICAgKiB0ZW1wbGF0ZSBuYW1lLlxuICAgICAgICAgKiBBIHRlbXBsYXRlIGF0IGBzcmMvX3RlbXBsYXRlcy9DbGFzcy90ZW1wbGF0ZS5kb3RgIHdvdWxkIGJlIGZvdW5kXG4gICAgICAgICAqIHVzaW5nIHRoZSBgdGVtcGxhdGVOYW1lYCBvZiBgJ3RlbXBsYXRlLmRvdCdgIGFzc3VtaW5nIGFcbiAgICAgICAgICogW1t0ZW1wbGF0ZVBhdGhdXSBvZiBgJ0NsYXNzJ2AuXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgcHJpbnQoXG4gICAgICAgICAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgIGNvbnRleHQ6IFRlbXBsYXRlQ29udGV4dCA9IHsgfSxcbiAgICAgICAgKTogc3RyaW5nIHtcbiAgICAgICAgICAgIHRlbXBsYXRlTmFtZSA9IHRoaXMudGVtcGxhdGVQYXRoICsgJy4nICsgdGVtcGxhdGVOYW1lO1xuICAgICAgICAgICAgcmV0dXJuIFRlbXBsYXRlc1t0ZW1wbGF0ZU5hbWVdKHsuLi5jb250ZXh0LCAnb2JqZWN0JzogdGhpc30pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBhdGggZm9yIHRoZSBjbGFzcycgdGVtcGxhdGVzLlxuICAgICAgICAgKiBJZiBhIGNsYXNzJyB0ZW1wbGF0ZXMgbGl2ZSB1bmRlciBgc3JjL190ZW1wbGF0ZXMvQXBwbGUvQmFuYW5hYCB0aGVuXG4gICAgICAgICAqIHRoZSBgdGVtcGxhdGVQYXRoYCB3b3VsZCBiZSBkZWZpbmVkIGFzOlxuICAgICAgICAgKiBgYGBcbiAgICAgICAgICogcHVibGljIHJlYWRvbmx5IHRlbXBsYXRlUGF0aDogc3RyaW5nID0gJ0FwcGxlLkJhbmFuYSc7XG4gICAgICAgICAqIGBgYFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGFic3RyYWN0IHJlYWRvbmx5IHRlbXBsYXRlUGF0aDogc3RyaW5nO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCaW5kcyBwcmludCBmdW5jdGlvbmFsaXR5IHRvIGEgY2xhc3MuXG4gICAgICAgICAqIFRha2VzIGEgY29uc3RydWN0b3IgYW5kIGZpbGxzIGluIHRoZSBbW3ByaW50XV0gaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc3RhdGljIG1ha2VQcmludGFibGUoY2xzOiBhbnkpIHtcbiAgICAgICAgICAgIGNscy5wcm90b3R5cGUucHJpbnQgPSBQcmludGFibGVNaXhpbi5wcm90b3R5cGUucHJpbnQ7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIEJlbGwgbnVtYmVyXG4gICAgICpcbiAgICAgKiBuLmIuIEJlbGwgbnVtYmVycyBhcmUgMS1pbmRleGVkLCBpLmUuOlxuICAgICAqICAgdHJlYmxlID0gIDFcbiAgICAgKiAgIGVsZXZlbiA9IDExXG4gICAgICovXG4gICAgZXhwb3J0IHR5cGUgQmVsbCA9IG51bWJlcjtcbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQmVsbC50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIEEgcm93IChwZXJtdXRhdGlvbiBvZiBiZWxscylcbiAgICAgKi9cbiAgICBleHBvcnQgdHlwZSBSb3cgPSBCZWxsW107XG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogTWF0Y2hlcyB0aGUgbnVtYmVyIG9mIGJlbGxzIHRvIHRoZSBuYW1lIG9mIGVhY2ggc3RhZ2VcbiAgICAgKi9cbiAgICBleHBvcnQgZW51bSBTdGFnZSB7XG4gICAgICAgIFRyaXBsZXMgPSA3LFxuICAgICAgICBDYXRlcnMgPSA5LFxuICAgICAgICBDaW5xdWVzID0gMTEsXG4gICAgICAgIFNleHR1cGxlcyA9IDEzLFxuICAgICAgICBTZXB0dXBsZXMgPSAxNSxcbiAgICB9XG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkJlbGwudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlJvd1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiU3RhZ2VcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIHN0cmluZyBpbnRvIGEgW1tSb3ddXS5cbiAgICAgKlxuICAgICAqIFRyaWVzIHRvIGNvbnZlcnQgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSByb3cgaW50byBhIHJvdyBvbiBhXG4gICAgICogcGFydGljdWxhciBzdGFnZS5cbiAgICAgKiBJZiBhbnkgYmVsbHMgYXJlIG1pc3NpbmcgZnJvbSB0aGUgaW5wdXQgc3RyaW5nIHRoZW4gdGhlc2Ugd2lsbCBiZSBhZGRlZFxuICAgICAqIGluIG9yZGVyIGF0IHRoZSBlbmQgb2YgdGhlIHJvdy5cbiAgICAgKiBBbiBleGNlcHRpb24gaXMgdGhyb3duIGlmOlxuICAgICAqICAtIFRoZSBpbnB1dCBzdHJpbmcgaXMgdG9vIGxvbmcgZm9yIHRoZSBzdGFnZVxuICAgICAqICAtIEEgY2hhcmFjdGVyIGlzIHJlcGVhdGVkIGluIHRoZSBpbnB1dCBzdHJpbmdcbiAgICAgKiAgLSBBIGNoYXJhY3RlciBkb2Vzbid0IHJlcHJlc2VudCBhIGJlbGwgb24gdGhlIGN1cnJlbnQgc3RhZ2VcbiAgICAgKlxuICAgICAqIGBgYFxuICAgICAqID4gUHJpY2tlci5yb3dGcm9tU3RyaW5nKCcyMzEnLCBQcmlja2VyLlN0YWdlLkNpbnF1ZXMpO1xuICAgICAqIFsyLCAzLCAxLCA0LCA1LCA2LCA3LCA4LCA5LCAwLCAxMV1cbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gcm93RnJvbVN0cmluZyhpbnB1dDogc3RyaW5nLCBzdGFnZTogU3RhZ2UpOiBSb3cge1xuICAgICAgICBjb25zdCBiZWxsU3ltYm9sc01hcDogeyBbaW5kZXg6IHN0cmluZ106IG51bWJlciB9ID0ge1xuICAgICAgICAgICAgICAgICAgICAnMSc6IDEsICcyJzogMiwgJzMnOiAzLCAnNCc6IDQsICc1JzogNSxcbiAgICAgICAgICAgICAgICAgICAgJzYnOiA2LCAnNyc6IDcsICc4JzogOCwgJzknOiA5LCAnMCc6IDEwLFxuICAgICAgICAgICAgICAgICAgICAnRSc6IDExLCAnVCc6IDEyLCAnQSc6IDEzLCAnQic6IDE0LCAnQyc6IDE1LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiZWxsc1NlZW46IGJvb2xlYW5bXSA9IFsgXSxcbiAgICAgICAgICAgIG91dHB1dDogUm93ID0gWyBdO1xuXG4gICAgICAgIGxldCBiZWxsTnVtYmVyOiBCZWxsLFxuICAgICAgICAgICAgaW5wdXRJbmRleDogbnVtYmVyO1xuXG4gICAgICAgIGlucHV0ID0gaW5wdXQudG9VcHBlckNhc2UoKTtcblxuICAgICAgICBpZiAoaW5wdXQubGVuZ3RoID4gc3RhZ2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUm93IHRvbyBsb25nJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCdWlsZCBhIHRhYmxlIHRvIHJlY29yZCB3aGVuIHdlJ3ZlIHNlZW4gZWFjaCBiZWxsXG4gICAgICAgIGZvciAoYmVsbE51bWJlciA9IDE7IGJlbGxOdW1iZXIgPD0gc3RhZ2U7IGJlbGxOdW1iZXIgKz0gMSkge1xuICAgICAgICAgICAgYmVsbHNTZWVuW2JlbGxOdW1iZXJdID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKFxuICAgICAgICAgICAgaW5wdXRJbmRleCA9IDA7XG4gICAgICAgICAgICBpbnB1dEluZGV4IDwgaW5wdXQubGVuZ3RoICYmIGlucHV0SW5kZXggPCBzdGFnZTtcbiAgICAgICAgICAgIGlucHV0SW5kZXggKz0gMVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGJlbGxOdW1iZXIgPSBiZWxsU3ltYm9sc01hcFtpbnB1dC5jaGFyQXQoaW5wdXRJbmRleCldO1xuXG4gICAgICAgICAgICBpZiAoYmVsbE51bWJlciAmJiBiZWxsTnVtYmVyIDw9IHN0YWdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJlbGxzU2VlbltiZWxsTnVtYmVyXSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JlbGwgcmVwZWF0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goYmVsbE51bWJlcik7XG4gICAgICAgICAgICAgICAgYmVsbHNTZWVuW2JlbGxOdW1iZXJdID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGJlbGwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbnB1dC5sZW5ndGggPCBzdGFnZSkge1xuICAgICAgICAgICAgZm9yIChiZWxsTnVtYmVyID0gMTsgYmVsbE51bWJlciA8PSBzdGFnZTsgYmVsbE51bWJlciArPSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFiZWxsc1NlZW5bYmVsbE51bWJlcl0pIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goYmVsbE51bWJlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiUm93LnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBbW1Jvd11dIGludG8gYSBzdHJpbmcuXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ0Zyb21Sb3cocm93OiBSb3cpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBiZWxsU3ltYm9scyA9ICcgMTIzNDU2Nzg5MEVUQUJDJyxcbiAgICAgICAgICAgIGJlbGxDaGFyYWN0ZXJzOiBzdHJpbmdbXSA9IFsgXTtcblxuICAgICAgICBmb3IgKGNvbnN0IGJlbGwgb2Ygcm93KSB7XG4gICAgICAgICAgICBiZWxsQ2hhcmFjdGVycy5wdXNoKGJlbGxTeW1ib2xzLmNoYXJBdChiZWxsKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYmVsbENoYXJhY3RlcnMuam9pbignJyk7XG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLyogRG9uJ3QgcmVmZXJlbmNlIEFic3RyYWN0U2l4IG9yIHRoaXMgbGVhZHMgdG8gY29tcGlsYXRpb24gZXJyb3JzLi4uICovXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vUm93LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9yb3dGcm9tU3RyaW5nLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9zdHJpbmdGcm9tUm93LnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogVmlzaXRvciBjbGFzc2VzIHRvIGFuYWx5c2UgYmxvY2tzXG4gICAgICpcbiAgICAgKiBBbnkgW1tBYnN0cmFjdEJsb2NrXV0gY2FuIFtbYWNjZXB0XV0gYSB2aXNpdG9yIHRoYXQgd2lsbCBwcm9jZXNzIHRoZWlyXG4gICAgICogW1tSb3ddXXMgKEFuIFtbQWJzdHJhY3RDb250YWluZXJdXSByZWN1cnNpdmVseSBjYWxscyBjb250YWluZWQgYmxvY2tzIGluXG4gICAgICogdHVybiB0byBtYWtlIHN1cmUgYWxsIHJvd3MgYXJlIHJlYWNoZWQpLlxuICAgICAqXG4gICAgICogVmlzaXRvcnMgcHJvY2VzcyBlYWNoIHJvdyBpbiB0dXJuIGluIHRoZSBvcmRlciB0aGV5IHdvdWxkIGJlIHJ1bmcuXG4gICAgICogVGhleSB0YWtlIGFjdGlvbiBmb3IgZWFjaCByb3csIHByb2JhYmx5IG1vZGlmeWluZyBzb21lIGludGVybmFsIHN0YXRlXG4gICAgICogYmFzZWQgb24gdGhlIHJvd3MgdGhhdCB0aGV5IHJlY2VpdmUuXG4gICAgICogVGhleSBzdG9wIHByb2Nlc3Npbmcgcm93cyBpZiByb3VuZHMgaXMgcmVhY2hlZC5cbiAgICAgKlxuICAgICAqIFRoZXJlJ3Mgbm8gd2F5IHRvIHJlc2V0IGEgdmlzaXRvcjogY3JlYXRlIGEgbmV3IG9uZSBpbiBvcmRlciB0byBjb21wbGV0ZVxuICAgICAqIGEgZnJlc2ggYW5hbHlzaXMuXG4gICAgICpcbiAgICAgKiBAcHJlZmVycmVkXG4gICAgICovXG4gICAgZXhwb3J0IG5hbWVzcGFjZSBWaXNpdG9yIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQmFzZSBjbGFzcyBmb3IgYWxsIHZpc2l0b3JzXG4gICAgICAgICAqXG4gICAgICAgICAqIERlZmVycyB0byBkZXJpdmVkIGNsYXNzZXMgaW4gb3JkZXIgdG8gcHJvY2VzcyByb3dzLCBidXQgZG9lcyBjaGVja1xuICAgICAgICAgKiB3aGV0aGVyIHJvdW5kcyBoYXMgYmVlbiByZWFjaGVkIGFuZCBzdG9wcyBwcm9jZXNzaW5nIGF0IHRoYXQgcG9pbnQuXG4gICAgICAgICAqL1xuICAgICAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RWaXNpdG9yIHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBXaGV0aGVyIG9yIG5vdCB3ZSdyZSBzdGlsbCBwcm9jZXNzaW5nIHJvd3MuXG4gICAgICAgICAgICAgKiBEZWZhdWx0cyB0byBgdHJ1ZWAgKHByb2Nlc3Npbmcgcm93cyksIGJ1dCBpcyBzZXQgdG8gYGZhbHNlYCBvbmNlXG4gICAgICAgICAgICAgKiByb3VuZHMgaGFzIGJlZW4gdmlzaXRlZC5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJpdmF0ZSBfdmlzaXRpbmc6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlbWVtYmVyIHJvdW5kcyBzbyB3ZSBkb24ndCBoYXZlIHRvIHJlZ2VuZXJhdGUgZm9yIGVhY2ggbmV3IHJvdy5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJpdmF0ZSBfcm91bmRzOiBzdHJpbmc7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVmlzaXRzIGEgcm93LlxuICAgICAgICAgICAgICogSWYgd2UncmUgc3RpbGwgdmlzaXRpbmcgKGkuZS4gcm91bmRzIGhhc24ndCBiZWVuIHJlYWNoZWQpIHRoZW5cbiAgICAgICAgICAgICAqIHdlIHBhc3MgdGhhdCByb3cgdG8gZGVyaXZlZCBjbGFzc2VzIGZvciBwcm9jZXNzaW5nLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgdmlzaXQocm93OiBSb3csIHNpeD86IEFic3RyYWN0U2l4KTogdGhpcyB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9yb3VuZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm91bmRzID0gc3RyaW5nRnJvbVJvdyhyb3dGcm9tU3RyaW5nKCcnLCByb3cubGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Zpc2l0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlzaXRJbXBsZW1lbnRhdGlvbihyb3csIHNpeCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHJpbmdGcm9tUm93KHJvdykgPT09IHRoaXMuX3JvdW5kcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlzaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZXBvcnRzIHdoZXRoZXIgcm93cyBhcmUgc3RpbGwgYmVpbmcgcHJvY2Vzc2VkIGJ5IHByb3ZpZGluZ1xuICAgICAgICAgICAgICogcHVibGljIGFjY2VzcyB0byBbW192aXNpdGluZ11dLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgaXNWaXNpdGluZygpOiBib29sZWFuIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdmlzaXRpbmc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVW5kZXJseWluZyB2aXNpdG9yIGltcGxlbWVudGF0aW9uICh0byBiZSBvdmVycmlkZGVuIGJ5IGRlcml2ZWRcbiAgICAgICAgICAgICAqIGNsYXNzZXMpLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgdmlzaXRJbXBsZW1lbnRhdGlvbihcbiAgICAgICAgICAgICAgICByb3c6IFJvdyxcbiAgICAgICAgICAgICAgICBzaXg/OiBBYnN0cmFjdFNpeCxcbiAgICAgICAgICAgICk6IHZvaWQ7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkJsb2NrT3duZXJzaGlwLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJOb3RpZmlhYmxlLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJQcmludGFibGVNaXhpbi50c1wiLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJSb3cudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlRlbXBsYXRlQ29udGV4dC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiVmlzaXRvci9BYnN0cmFjdC50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIEFic3RyYWN0IGNsYXNzIHJlcHJlc2VudGluZyBibG9ja3Mgb2Ygcm93c1xuICAgICAqXG4gICAgICogQSBibG9jazpcbiAgICAgKiAgLSBpcyBpbml0aWFsaXNlZCBmcm9tIGEgcm93XG4gICAgICogIC0gcHJvdmlkZXMgYWNjZXNzIHRvIHRoZSBsYXN0IHJvdyBpbiB0aGUgYmxvY2tcbiAgICAgKiAgLSByZWNhbGN1bGF0ZXMgdGhhdCByb3cgaWYgdGhlIGluaXRpYWwgcm93IGlzIGNoYW5nZWRcbiAgICAgKiAgLSBwcm92aWRlcyBtZWNoYW5pc21zIGZvciBjb250cm9sbGluZyBob3cgdGhlIGxhc3Qgcm93IGlzIGNyZWF0ZWRcbiAgICAgKiAgLSBub3RpZmllcyBhbnkgcGFyZW50IGJsb2NrIHdoZW5ldmVyIHRob3NlIG1lY2hhbmlzbXMgYXJlIGFjdHVhdGVkXG4gICAgICpcbiAgICAgKiBCbG9ja3MgYXJlIGRlc2lnbmVkIHRvIGJlIGFnZ3JlZ2F0ZWQgaW50byBjb250YWluZXJzLlxuICAgICAqIENvbnRhaW5lcnMgbm90aWZ5IGJsb2NrcyBvZiBjaGFuZ2VzIGJ5IHNldHRpbmcgYSBuZXcgaW5pdGlhbCByb3cuXG4gICAgICogQmxvY2tzIG5vdGlmeSBjb250YWluZXJzIG9mIGNoYW5nZXMgdmlhIGEgY2FsbGJhY2sgKHJlY2VpdmVOb3RpZmljYXRpb24pLlxuICAgICAqL1xuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEJsb2NrIGltcGxlbWVudHMgUHJpbnRhYmxlTWl4aW4ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbml0aWFsIHJvdyBmb3IgdGhlIGJsb2NrXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgX2luaXRpYWxSb3c6IFJvdztcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29uc3RydWN0b3JcbiAgICAgICAgICogQHBhcmFtIGluaXRpYWxSb3cgIGluaXRpYWwgcm93IGZvciB0aGUgYmxvY2tcbiAgICAgICAgICogQHBhcmFtIG93bmVyc2hpcCAgIG93bmVyc2hpcCBvZiB0aGlzIGJsb2NrXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgICAgIGluaXRpYWxSb3c6IFJvdyxcbiAgICAgICAgICAgIHByb3RlY3RlZCBfb3duZXJzaGlwPzogQmxvY2tPd25lcnNoaXAsXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5faW5pdGlhbFJvdyA9IGluaXRpYWxSb3cuc2xpY2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFByaW50YWJsZU1peGluIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW5kZXJzIHRoZSBvYmplY3Qgd2l0aCBhIHRlbXBsYXRlXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgcHJpbnQ6ICh0OiBzdHJpbmcsIGM/OiBUZW1wbGF0ZUNvbnRleHQpID0+IHN0cmluZztcblxuICAgICAgICAvKipcbiAgICAgICAgICogUGF0aCBmb3IgdGhpcyBjbGFzcycgdGVtcGxhdGVzXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdGVtcGxhdGVQYXRoOiBzdHJpbmcgPSAnQWJzdHJhY3RCbG9jayc7XG5cbiAgICAgICAgLyogQWJzdHJhY3RCbG9jayBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERvZXMgYW55IGNhbGN1bGF0aW9uIG5lZWRlZCBieSB0aGUgYmxvY2tcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBjYWxjdWxhdGUoKTogdm9pZDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVhZCBhY2Nlc3MgdG8gdGhlIGluaXRpYWwgcm93XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZ2V0SW5pdGlhbFJvdygpOiBSb3cge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRpYWxSb3cuc2xpY2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcml0ZSBhY2Nlc3MgdG8gdGhlIGluaXRpYWwgcm93XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc2V0SW5pdGlhbFJvdyhpbml0aWFsUm93OiBSb3cpOiB0aGlzIHtcbiAgICAgICAgICAgIHRoaXMuX2luaXRpYWxSb3cgPSBpbml0aWFsUm93LnNsaWNlKCk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgbGFzdCByb3cgaW4gdGhlIGJsb2NrXG4gICAgICAgICAqIGUuZy4gYSBsZWFkIGhlYWQgb3IgYSBzaXggZW5kIChmb3IgU3RlZG1hbilcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRMYXN0KCk6IFJvdztcblxuICAgICAgICAvKipcbiAgICAgICAgICogVXBkYXRlcyByZWZlcmVuY2VzIHRvIHRoZSBwYXJlbnQgY29udGFpbmVyXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc2V0T3duZXJzaGlwKG93bmVyc2hpcDogQmxvY2tPd25lcnNoaXApOiBBYnN0cmFjdEJsb2NrIHtcbiAgICAgICAgICAgIHRoaXMuX293bmVyc2hpcCA9IG93bmVyc2hpcDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFsbG93cyBwdWJsaWMgYWNjZXNzIHRvIHRoZSBjb250YWluZXJcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBnZXRDb250YWluZXIoKTogTm90aWZpYWJsZSB8IHVuZGVmaW5lZCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb3duZXJzaGlwID8gdGhpcy5fb3duZXJzaGlwLmNvbnRhaW5lciA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBbGxvd3MgcHVibGljIGFjY2VzcyB0byB0aGUgaW5kZXhcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBnZXRJbmRleCgpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX293bmVyc2hpcCA/IHRoaXMuX293bmVyc2hpcC5pbmRleCA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDbGVhcnMgcmVmZXJlbmNlcyB0byB0aGUgcGFyZW50IGNvbnRhaW5lclxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGNsZWFyT3duZXJzaGlwKCk6IEFic3RyYWN0QmxvY2sge1xuICAgICAgICAgICAgdGhpcy5fb3duZXJzaGlwID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogTm90aWZpZXMgdGhlIHBhcmVudCBjb250YWluZXJcbiAgICAgICAgICpcbiAgICAgICAgICogRGVyaXZlZCBjbGFzc2VzIHNob3VsZCBjYWxsIHRoaXMgd2hlbmV2ZXIgdGhlIGxhc3Qgcm93IGNoYW5nZXMuXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgbm90aWZ5Q29udGFpbmVyKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYgKHRoaXMuX293bmVyc2hpcCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX293bmVyc2hpcC5jb250YWluZXIubm90aWZ5KHRoaXMuX293bmVyc2hpcC5pbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVjZWl2ZXMgYSB2aXNpdG9yIHRoYXQgd2lsbCBiZSBjYWxsZWQgdG8gcHJvY2VzcyBlYWNoIHJvd1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGFic3RyYWN0IGFjY2VwdCguLi52aXNpdG9yczogVmlzaXRvci5BYnN0cmFjdFZpc2l0b3JbXSk6IHRoaXM7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVzdGltYXRlcyB0aGUgbnVtYmVyIG9mIHJvd3MgaW4gdGhlIGJsb2NrXG4gICAgICAgICAqIFRoZSBlc3RpbWF0ZSBkb2Vzbid0IHRha2UgaW50byBhY2NvdW50IGNvbWluZyByb3VuZCBwYXJ0LXdheSB0aHJvdWdoXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgZXN0aW1hdGVSb3dzKCk6IG51bWJlcjtcblxuICAgIH1cblxuICAgIFByaW50YWJsZU1peGluLm1ha2VQcmludGFibGUoQWJzdHJhY3RCbG9jayk7XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQWJzdHJhY3RCbG9jay50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiTm90aWZpYWJsZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiUm93LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJWaXNpdG9yL0Fic3RyYWN0LnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogQWJzdHJhY3QgY2xhc3MgcmVwcmVzZW50aW5nIGNvbnRhaW5lcnMgZm9yIGJsb2NrcyBvZiByb3dzXG4gICAgICpcbiAgICAgKiBDb250YWluZXJzIGFyZSBibG9ja3MgdGhhdCBjb250YWluIG90aGVyIGJsb2Nrcy5cbiAgICAgKiBMaWtlIGJsb2NrcywgY29udGFpbmVyczpcbiAgICAgKiAgLSBhcmUgaW5pdGlhbGlzZWQgZnJvbSBhIHJvd1xuICAgICAqICAtIHByb3ZpZGUgYWNjZXNzIHRvIHRoZSBsYXN0IHJvdyBpbiB0aGUgY29udGFpbmVyXG4gICAgICogIC0gZXRjLlxuICAgICAqIEluIGFkZGl0aW9uIHRvIHRoaXMgY29udGFpbmVycyBwcm9wYWdhdGUgY2hhbmdlcyBiZXR3ZWVuIGNoaWxkIGJsb2Nrcy5cbiAgICAgKi9cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RDb250YWluZXI8QmxvY2sgZXh0ZW5kcyBBYnN0cmFjdEJsb2NrPlxuICAgICAgICBleHRlbmRzIEFic3RyYWN0QmxvY2sgaW1wbGVtZW50cyBOb3RpZmlhYmxlIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQmxvY2tzIHdpdGhpbiB0aGUgY29udGFpbmVyXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgX2Jsb2NrczogQmxvY2tbXSA9IFsgXTtcblxuICAgICAgICAvKiBBYnN0cmFjdEJsb2NrIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogRG9lcyBhbnkgY2FsY3VsYXRpb24gbmVlZGVkIGJ5IHRoZSBibG9ja1xuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIGNhbGN1bGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlQmxvY2tzKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgbGFzdCByb3cgaW4gdGhlIGJsb2NrXG4gICAgICAgICAqIGUuZy4gYSBjb3Vyc2UgaGVhZCBvciBhIGNvdXJzZSBlbmQgKGZvciBTdGVkbWFuKVxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGdldExhc3QoKTogUm93IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9ibG9ja3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Jsb2Nrc1t0aGlzLl9ibG9ja3MubGVuZ3RoIC0gMV0uZ2V0TGFzdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBIYW5kbGUgY2FzZSB3aXRoIHplcm8gYmxvY2tzXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5pdGlhbFJvdy5zbGljZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlY2VpdmVzIGEgdmlzaXRvciB0aGF0IHdpbGwgYmUgY2FsbGVkIHRvIHByb2Nlc3MgZWFjaCByb3dcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBhY2NlcHQoLi4udmlzaXRvcnM6IFZpc2l0b3IuQWJzdHJhY3RWaXNpdG9yW10pOiB0aGlzIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYmxvY2sgb2YgdGhpcy5fYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCB2aXNpdG9yIG9mIHZpc2l0b3JzKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrLmFjY2VwdCh2aXNpdG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFc3RpbWF0ZXMgdGhlIG51bWJlciBvZiByb3dzIGluIHRoZSBibG9ja1xuICAgICAgICAgKiBUaGUgZXN0aW1hdGUgZG9lc24ndCB0YWtlIGludG8gYWNjb3VudCBjb21pbmcgcm91bmQgcGFydC13YXkgdGhyb3VnaFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGVzdGltYXRlUm93cygpOiBudW1iZXIge1xuICAgICAgICAgICAgbGV0IHJvd3M6IG51bWJlciA9IDA7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGJsb2NrIG9mIHRoaXMuX2Jsb2Nrcykge1xuICAgICAgICAgICAgICAgIHJvd3MgKz0gYmxvY2suZXN0aW1hdGVSb3dzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcm93cztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIE5vdGlmaWFibGUgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWNlaXZlcyBhIG5vdGlmaWNhdGlvbiBmcm9tIGEgYmxvY2sgdGhhdCBoYXMgY2hhbmdlZFxuICAgICAgICAgKiBAcGFyYW0gaW5kZXggIGluZGV4IG9mIGNoYW5nZWQgYmxvY2sgaW4gY29udGFpbmVyXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgbm90aWZ5KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlQmxvY2tzKGluZGV4KTtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5Q29udGFpbmVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBBYnN0cmFjdENvbnRhaW5lciBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogUHJvcGFnYXRlcyBkYXRhIGJldHdlZW4gYmxvY2tzIHdpdGhpbiB0aGUgY29udGFpbmVyXG4gICAgICAgICAqIEBwYXJhbSBpbmRleCAgd2hlcmUgdG8gc3RhcnQgd2hlbiByZWNhbGN1bGF0aW5nXG4gICAgICAgICAqL1xuICAgICAgICBwcml2YXRlIHByb3BhZ2F0ZUJsb2NrcyhpbmRleDogbnVtYmVyID0gMCk6IHZvaWQge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGZpcnN0IGJsb2NrXG4gICAgICAgICAgICBpZiAoIWluZGV4ICYmIHRoaXMuZ2V0TGVuZ3RoKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZUZpcnN0QmxvY2sodGhpcy5fYmxvY2tzWzBdKTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAoOyBpbmRleCA8IHRoaXMuZ2V0TGVuZ3RoKCk7IGluZGV4ICs9IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZUN1cnJlbnRCbG9jayhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmxvY2tzW2luZGV4IC0gMV0sXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Jsb2Nrc1tpbmRleF0sXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQcm9wYWdhdGVzIGRhdGEgZnJvbSBhIHByZXZpb3VzIGJsb2NrIHRvIGEgY3VycmVudCBibG9ja1xuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIHByb3BhZ2F0ZUN1cnJlbnRCbG9jayhwcmV2aW91czogQmxvY2ssIGN1cnJlbnQ6IEJsb2NrKTogdm9pZCB7XG4gICAgICAgICAgICBjdXJyZW50LnNldEluaXRpYWxSb3cocHJldmlvdXMuZ2V0TGFzdCgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQcm9wYWdhdGVzIGRhdGEgZm9yIHRoZSBmaXJzdCBibG9jayB3aXRoaW4gdGhlIGNvbnRhaW5lclxuICAgICAgICAgKiBIYW5kbGVkIGFzIGEgc3BlY2lhbCBjYXNlIHRvIGFsbG93IGZvciBlLmcuIFN0ZWRtYW4gc3RhcnRzXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgcHJvcGFnYXRlRmlyc3RCbG9jayhmaXJzdDogQmxvY2spOiB2b2lkIHtcbiAgICAgICAgICAgIGZpcnN0LnNldEluaXRpYWxSb3codGhpcy5faW5pdGlhbFJvdyk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVhZCBhY2Nlc3MgdG8gdGhlIGxlbmd0aFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGdldExlbmd0aCgpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Jsb2Nrcy5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVhZCBhY2Nlc3MgdG8gdGhlIGJsb2Nrc1xuICAgICAgICAgKlxuICAgICAgICAgKiBEZXJpdmVkIGNsYXNzZXMgc2hvdWxkIHByb3ZpZGUgcHVibGljIGFjY2VzcyB2aWEgYSBtb3JlXG4gICAgICAgICAqIHN1aXRhYmx5LW5hbWVkIG1ldGhvZFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGdldEJsb2NrcygpOiBCbG9ja1tdIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ibG9ja3Muc2xpY2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWFkIGFjY2VzcyB0byBhIGJsb2NrXG4gICAgICAgICAqXG4gICAgICAgICAqIERlcml2ZWQgY2xhc3NlcyBzaG91bGQgcHJvdmlkZSBwdWJsaWMgYWNjZXNzIHZpYSBhIG1vcmVcbiAgICAgICAgICogc3VpdGFibHktbmFtZWQgbWV0aG9kXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZ2V0QmxvY2soaW5kZXg6IG51bWJlcik6IEJsb2NrIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IDEgfHwgaW5kZXggPiB0aGlzLmdldExlbmd0aCgpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCbG9jayBpbmRleCBvdXQgb2YgcmFuZ2UnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ibG9ja3NbaW5kZXggLSAxXTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogVHlwZXMgb2YgY2FsbFxuICAgICAqIEBlbnVtIHtudW1iZXJ9XG4gICAgICovXG4gICAgZXhwb3J0IGVudW0gQ2FsbCB7UGxhaW4gPSAwLCBCb2IsIFNpbmdsZX1cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQmVsbC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQ2FsbC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiUm93LnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogU2ltcGxlIGZ1bmN0aW9ucyB0byBwZXJtdXRlIHJvd3NcbiAgICAgKi9cbiAgICBleHBvcnQgbmFtZXNwYWNlIENoYW5nZXMge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIZWxwZXIgZnVuY3Rpb24gdG8gc3dhcCB0d28gYmVsbHNcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIHN3YXBQYWlyKHJvdzogUm93LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgYmVsbDogQmVsbDtcblxuICAgICAgICAgICAgYmVsbCA9IHJvd1tpbmRleF07XG4gICAgICAgICAgICByb3dbaW5kZXhdID0gcm93W2luZGV4ICsgMV07XG4gICAgICAgICAgICByb3dbaW5kZXggKyAxXSA9IGJlbGw7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogTm90YXRpb24gPDE+XG4gICAgICAgICAqL1xuICAgICAgICBleHBvcnQgZnVuY3Rpb24gcGVybXV0ZTEocm93OiBSb3cpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCBpbmRleDogbnVtYmVyO1xuXG4gICAgICAgICAgICBmb3IgKGluZGV4ID0gMTsgaW5kZXggPCByb3cubGVuZ3RoIC0gMTsgaW5kZXggKz0gMikge1xuICAgICAgICAgICAgICAgIHN3YXBQYWlyKHJvdywgaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE5vdGF0aW9uIDwzPlxuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIHBlcm11dGUzKHJvdzogUm93KTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgaW5kZXg6IG51bWJlcjtcblxuICAgICAgICAgICAgc3dhcFBhaXIocm93LCAwKTtcblxuICAgICAgICAgICAgZm9yIChpbmRleCA9IDM7IGluZGV4IDwgcm93Lmxlbmd0aCAtIDE7IGluZGV4ICs9IDIpIHtcbiAgICAgICAgICAgICAgICBzd2FwUGFpcihyb3csIGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBOb3RhdGlvbiA8bj5cbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBwZXJtdXRlTihyb3c6IFJvdyk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IGluZGV4OiBudW1iZXI7XG5cbiAgICAgICAgICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IHJvdy5sZW5ndGggLSAxOyBpbmRleCArPSAyKSB7XG4gICAgICAgICAgICAgICAgc3dhcFBhaXIocm93LCBpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogTm90YXRpb24gPDk+IGZvciBDaW5xdWVzXG4gICAgICAgICAqL1xuICAgICAgICBleHBvcnQgZnVuY3Rpb24gcGVybXV0ZUJvYihyb3c6IFJvdyk6IHZvaWQge1xuICAgICAgICAgICAgcGVybXV0ZVNpbmdsZShyb3cpO1xuICAgICAgICAgICAgc3dhcFBhaXIocm93LCByb3cubGVuZ3RoIC0gMik7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogTm90YXRpb24gPDkwRT4gZm9yIENpbnF1ZXNcbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBwZXJtdXRlU2luZ2xlKHJvdzogUm93KTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgaW5kZXg6IG51bWJlcjtcblxuICAgICAgICAgICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgcm93Lmxlbmd0aCAtIDM7IGluZGV4ICs9IDIpIHtcbiAgICAgICAgICAgICAgICBzd2FwUGFpcihyb3csIGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBOb3RhdGlvbiBkZXBlbmRlbnQgb24gY2FsbFxuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIHBlcm11dGVDYWxsKHJvdzogUm93LCBjYWxsOiBDYWxsKTogdm9pZCB7XG4gICAgICAgICAgICBpZiAoY2FsbCA9PT0gQ2FsbC5QbGFpbikge1xuICAgICAgICAgICAgICAgIENoYW5nZXMucGVybXV0ZU4ocm93KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2FsbCA9PT0gQ2FsbC5Cb2IpIHtcbiAgICAgICAgICAgICAgICBDaGFuZ2VzLnBlcm11dGVCb2Iocm93KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2FsbCA9PT0gQ2FsbC5TaW5nbGUpIHtcbiAgICAgICAgICAgICAgICBDaGFuZ2VzLnBlcm11dGVTaW5nbGUocm93KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIFR5cGVzIG9mIHNpeFxuICAgICAqIEBlbnVtIHtudW1iZXJ9XG4gICAgICovXG4gICAgZXhwb3J0IGVudW0gU2l4VHlwZSB7IFNsb3cgPSAwLCBRdWljayB9XG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkFic3RyYWN0QmxvY2sudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkJsb2NrT3duZXJzaGlwLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJDYWxsLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJDaGFuZ2VzLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJSb3cudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlNpeFR5cGVcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBCYXNlIGNsYXNzIGZvciBzaXhlc1xuICAgICAqL1xuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFNpeCBleHRlbmRzIEFic3RyYWN0QmxvY2sge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUeXBlIG9mIHRoZSBzaXhcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBhYnN0cmFjdCB0eXBlOiBTaXhUeXBlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBOb3RhdGlvbiAoZXhjbHVkaW5nIGNhbGwpXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYWJzdHJhY3Qgbm90YXRpb246IHN0cmluZ1tdO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaXggZW5kIG9mIHRoaXMgc2l4XG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgX2VuZDogUm93O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYWxsIHVzZWQgdG8gc3RhcnQgdGhlIHNpeFxuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIF9jYWxsOiBDYWxsID0gQ2FsbC5QbGFpbjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29uc3RydWN0b3JcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAgICAgaW5pdGlhbFJvdzogUm93LFxuICAgICAgICAgICAgcHJvdGVjdGVkIF9vd25lcnNoaXA/OiBCbG9ja093bmVyc2hpcCxcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBzdXBlcihpbml0aWFsUm93LCBfb3duZXJzaGlwKTtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBQcmludGFibGVNaXhpbiBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogUGF0aCBmb3IgdGhpcyBjbGFzcycgdGVtcGxhdGVzXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdGVtcGxhdGVQYXRoOiBzdHJpbmcgPSAnQWJzdHJhY3RTaXgnO1xuXG4gICAgICAgIC8qIEFic3RyYWN0QmxvY2sgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEb2VzIGFueSBjYWxjdWxhdGlvbiBuZWVkZWQgYnkgdGhlIGJsb2NrXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgY2FsY3VsYXRlKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5fZW5kID0gdGhpcy5faW5pdGlhbFJvdy5zbGljZSgpOyAgLy8gQ3JlYXRlIG5ldyBhcnJheVxuICAgICAgICAgICAgQ2hhbmdlcy5wZXJtdXRlQ2FsbCh0aGlzLl9lbmQsIHRoaXMuX2NhbGwpO1xuICAgICAgICAgICAgdGhpcy5hcHBseVNpeFRyYW5zcG9zaXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSBsYXN0IHJvdyBpbiB0aGUgYmxvY2sgKHRoZSBzaXggZW5kKVxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGdldExhc3QoKTogUm93IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbmQuc2xpY2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFc3RpbWF0ZXMgdGhlIG51bWJlciBvZiByb3dzIGluIHRoZSBibG9ja1xuICAgICAgICAgKiBUaGUgZXN0aW1hdGUgZG9lc24ndCB0YWtlIGludG8gYWNjb3VudCBjb21pbmcgcm91bmQgcGFydC13YXkgdGhyb3VnaFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGVzdGltYXRlUm93cygpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIDY7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBBYnN0cmFjdFNpeCBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgc2l4IGhlYWRcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBnZXRIZWFkKCk6IFJvdyB7XG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuX2luaXRpYWxSb3cuc2xpY2UoKTtcbiAgICAgICAgICAgIENoYW5nZXMucGVybXV0ZUNhbGwoc3RhcnQsIHRoaXMuX2NhbGwpO1xuICAgICAgICAgICAgcmV0dXJuIHN0YXJ0O1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIHNpeCBlbmRcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBnZXRFbmQoKTogUm93IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldExhc3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWFkIGFjY2VzcyB0byB0aGUgY2FsbFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGdldENhbGwoKTogQ2FsbCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcml0ZSBhY2Nlc3MgdG8gdGhlIGNhbGxcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzZXRDYWxsKGNhbGw6IENhbGwsIHVwZGF0ZTogYm9vbGVhbiA9IHRydWUpOiBBYnN0cmFjdFNpeCB7XG4gICAgICAgICAgICB0aGlzLl9jYWxsID0gY2FsbDtcbiAgICAgICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5Q29udGFpbmVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUb2dnbGVzIHRoZSBjYWxsIHR5cGUgYmV0d2VlbiBQbGFpbiAtPiBCb2IgLT4gU2luZ2xlIC0+IFBsYWluXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgdG9nZ2xlQ2FsbCgpOiBDYWxsIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbGw6IENhbGwgPSAodGhpcy5fY2FsbCArIDEpICUgMztcbiAgICAgICAgICAgIHRoaXMuc2V0Q2FsbChjYWxsKTtcbiAgICAgICAgICAgIHJldHVybiBjYWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpbmlzaGVzIHRyYW5zcG9zaW5nIHRoZSBlbmQgcm93IGRlcGVuZGluZyB1cG9uIHRoZSB0eXBlIG9mIHNpeFxuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IGFwcGx5U2l4VHJhbnNwb3NpdGlvbigpOiB2b2lkO1xuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkFic3RyYWN0QmxvY2sudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIk5vdGlmaWFibGUudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBBIGJsb2NrIGRpcmVjdG9yeVxuICAgICAqIEZpbGVzIGluZm9ybWF0aW9uIGFib3V0IGJsb2NrcyBpbiBhIHRvdWNoLCBpbmRleGVkIGJ5IHRoZWlyIGxvY2F0aW9uXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIEJsb2NrRGlyZWN0b3J5IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGRpcmVjdG9yeSBpdHNlbGZcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBfZGlyZWN0b3J5OiBhbnkgPSBbIF07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZHMgYSBzaXggdG8gdGhlIGRpcmVjdG9yeVxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGFkZChibG9jazogQWJzdHJhY3RCbG9jayk6IHRoaXM7XG4gICAgICAgIHB1YmxpYyBhZGQoLi4uaW5kaWNlczogbnVtYmVyW10pOiB0aGlzO1xuXG4gICAgICAgIHB1YmxpYyBhZGQocGFyYW06IGFueSwgLi4uaW5kaWNlczogbnVtYmVyW10pOiB0aGlzIHtcbiAgICAgICAgICAgIGxldCBkaXJlY3Rvcnk6IGFueSxcbiAgICAgICAgICAgICAgICBmaW5hbEluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyYW0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgaW5kaWNlcyA9IEJsb2NrRGlyZWN0b3J5LmdldEluZGljZXMocGFyYW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbmRpY2VzLnVuc2hpZnQocGFyYW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmaW5hbEluZGV4ID0gaW5kaWNlcy5wb3AoKTtcbiAgICAgICAgICAgIGlmICghZmluYWxJbmRleCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQmFkIG93bmVyc2hpcDogbXVzdCBoYXZlIGF0IGxlYXN0IG9uZSBpbmRleCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkaXJlY3RvcnkgPSB0aGlzLl9kaXJlY3Rvcnk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGluZGV4IG9mIGluZGljZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWRpcmVjdG9yeVtpbmRleF0pIHtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0b3J5W2luZGV4XSA9IFsgXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGlyZWN0b3J5ID0gZGlyZWN0b3J5W2luZGV4XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGlyZWN0b3J5W2ZpbmFsSW5kZXhdID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrcyB3aGV0aGVyIGEgc2l4IGlzIGluIHRoZSBkaXJlY3RvcnlcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBjb250YWlucyhibG9jazogQWJzdHJhY3RCbG9jayk6IGJvb2xlYW47XG4gICAgICAgIHB1YmxpYyBjb250YWlucyguLi5pbmRpY2VzOiBudW1iZXJbXSk6IGJvb2xlYW47XG5cbiAgICAgICAgcHVibGljIGNvbnRhaW5zKHBhcmFtOiBhbnksIC4uLmluZGljZXM6IG51bWJlcltdKTogYm9vbGVhbiB7XG4gICAgICAgICAgICBsZXQgZGlyZWN0b3J5OiBhbnk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyYW0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgaW5kaWNlcyA9IEJsb2NrRGlyZWN0b3J5LmdldEluZGljZXMocGFyYW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbmRpY2VzLnVuc2hpZnQocGFyYW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkaXJlY3RvcnkgPSB0aGlzLl9kaXJlY3Rvcnk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGluZGV4IG9mIGluZGljZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWRpcmVjdG9yeVtpbmRleF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkaXJlY3RvcnkgPSBkaXJlY3RvcnlbaW5kZXhdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb21wdXRlcyBhbiBhcnJheSBvZiBvd25lcnNoaXAgaW5kaWNlcyBmb3IgYmxvY2tcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5kaWNlcyhibG9jazogQWJzdHJhY3RCbG9jayk6IG51bWJlcltdIHtcbiAgICAgICAgICAgIGNvbnN0IG93bmVyc2hpcEFycmF5OiBudW1iZXJbXSA9IFsgXTtcbiAgICAgICAgICAgIGxldCBjb250YWluZXI6IE5vdGlmaWFibGUgfCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgaW5kZXggPSBibG9jay5nZXRJbmRleCgpO1xuICAgICAgICAgICAgY29udGFpbmVyID0gYmxvY2suZ2V0Q29udGFpbmVyKCk7XG4gICAgICAgICAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQmFkIG93bmVyc2hpcDogYmxvY2sgaGFzIG5vIGNvbnRhaW5lcicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aGlsZSAoY29udGFpbmVyIGluc3RhbmNlb2YgQWJzdHJhY3RCbG9jaykge1xuICAgICAgICAgICAgICAgIGlmICghaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCYWQgb3duZXJzaGlwOiBjb250YWluZXIgYnV0IG5vIGluZGV4Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG93bmVyc2hpcEFycmF5LnVuc2hpZnQoaW5kZXgpO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gY29udGFpbmVyLmdldEluZGV4KCk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gY29udGFpbmVyLmdldENvbnRhaW5lcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gb3duZXJzaGlwQXJyYXk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGluZGV4IGlzIGVtcHR5XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgaXNFbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5fZGlyZWN0b3J5Lmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkFic3RyYWN0QmxvY2sudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkFic3RyYWN0Q29udGFpbmVyLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJCbG9ja093bmVyc2hpcC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiUm93LnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogQWJzdHJhY3QgY29udGFpbmVyIHRoYXQgbWFuYWdlcyBhIHNlcmllcyBvZiBjaGlsZCBibG9ja3NcbiAgICAgKlxuICAgICAqIENoaWxkIGJsb2NrcyBhcmUgbWFuYWdlZCBieSBjaGFuZ2luZyB0aGUgbGVuZ3RoIG9mIHRoZSBjb250YWluZXIuXG4gICAgICogTWlnaHQgYmUgdXNlZCB0byByZXByZXNlbnQgYSBjb3Vyc2Ugb2YgU3RlZG1hbiBvciBhIHNpbmdsZSBtZXRob2QuXG4gICAgICovXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNlcmlhbENvbnRhaW5lcjxCbG9jayBleHRlbmRzIEFic3RyYWN0QmxvY2s+XG4gICAgICAgIGV4dGVuZHMgQWJzdHJhY3RDb250YWluZXI8QmxvY2s+IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29uc3RydWN0b3JcbiAgICAgICAgICpcbiAgICAgICAgICogRXh0ZW5kcyB0aGUgQWJzdHJhY3RCbG9jayBjb250YWluZXIgdG8gY3JlYXRlIGNvbnRhaW5lZCBibG9ja3MuXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgICAgIGluaXRpYWxSb3c6IFJvdyxcbiAgICAgICAgICAgIHByb3RlY3RlZCBfb3duZXJzaGlwPzogQmxvY2tPd25lcnNoaXAsXG4gICAgICAgICkge1xuICAgICAgICAgICAgc3VwZXIoaW5pdGlhbFJvdywgX293bmVyc2hpcCk7XG4gICAgICAgICAgICB0aGlzLmV4dGVuZCh0aGlzLmdldERlZmF1bHRMZW5ndGgoaW5pdGlhbFJvdykpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogU2VyaWFsQ29udGFpbmVyIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEV4dGVuZHMgdGhlIGNvbnRhaW5lciBieSBhZGRpbmcgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgYmxvY2tzXG4gICAgICAgICAqIEBwYXJhbSBibG9ja3MgIGJsb2NrcyB0byBhZGRcbiAgICAgICAgICovXG4gICAgICAgIHByaXZhdGUgZXh0ZW5kKGJsb2NrczogbnVtYmVyKTogdGhpcyB7XG4gICAgICAgICAgICBjb25zdCBvbGRMZW5ndGg6IG51bWJlciA9IHRoaXMuZ2V0TGVuZ3RoKCksXG4gICAgICAgICAgICAgICAgbmV3TGVuZ3RoOiBudW1iZXIgPSBvbGRMZW5ndGggKyBibG9ja3M7XG5cbiAgICAgICAgICAgIGxldCBpbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgICAgIGluaXRpYWxSb3c6IFJvdyA9IHRoaXMuZ2V0TGFzdCgpO1xuXG4gICAgICAgICAgICBmb3IgKGluZGV4ID0gb2xkTGVuZ3RoICsgMTsgaW5kZXggPD0gbmV3TGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYmxvY2tzW2luZGV4IC0gMV0gPSB0aGlzLmNyZWF0ZUJsb2NrKGluaXRpYWxSb3csIGluZGV4KTtcbiAgICAgICAgICAgICAgICBpbml0aWFsUm93ID0gdGhpcy5fYmxvY2tzW2luZGV4IC0gMV0uZ2V0TGFzdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGxlbmd0aCBvZiBuZXcgY29udGFpbmVycyBvZiB0aGlzIHR5cGVcbiAgICAgICAgICpcbiAgICAgICAgICogRGVyaXZlZCBjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCBpZiByZXF1aXJlZC5cbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBnZXREZWZhdWx0TGVuZ3RoKGluaXRpYWxSb3c6IFJvdyk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IGJsb2NrIGZvciB0aGUgY29udGFpbmVyXG4gICAgICAgICAqXG4gICAgICAgICAqIFVzZWQgYnkgZXh0ZW5kKCkgd2hlbiBjcmVhdGluZyB0aGUgY29udGFpbmVyIG9yIGluY3JlYXNpbmcgaXRzXG4gICAgICAgICAqIGxlbmd0aC5cbiAgICAgICAgICogQHBhcmFtIGluaXRpYWxSb3cgIGluaXRpYWwgcm93IGZvciB0aGUgYmxvY2tcbiAgICAgICAgICogQHBhcmFtIGluZGV4ICAgICAgIGluZGV4IG9mIGJsb2NrIGluIGNvbnRhaW5lclxuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IGNyZWF0ZUJsb2NrKGluaXRpYWxSb3c6IFJvdywgaW5kZXg6IG51bWJlcik6IEJsb2NrO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcml0ZSBhY2Nlc3MgdG8gdGhlIGxlbmd0aFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHNldExlbmd0aChsZW5ndGg6IG51bWJlcik6IHRoaXMge1xuICAgICAgICAgICAgaWYgKChsZW5ndGggPCB0aGlzLm1pbkxlbmd0aCkgfHwgKGxlbmd0aCA+IHRoaXMubWF4TGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTGVuZ3RoIG91dCBvZiByYW5nZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobGVuZ3RoID4gdGhpcy5nZXRMZW5ndGgoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXh0ZW5kKGxlbmd0aCAtIHRoaXMuZ2V0TGVuZ3RoKCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ibG9ja3MgPSB0aGlzLl9ibG9ja3Muc2xpY2UoMCwgbGVuZ3RoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5ub3RpZnlDb250YWluZXIoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogV3JpdGUgYWNjZXNzIHRvIHRoZSBsZW5ndGg6IGlnbm9yZXMgb3V0LW9mLXJhbmdlIHZhbHVlc1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHNhZmVTZXRMZW5ndGgobGVuZ3RoOiBudW1iZXIpOiB0aGlzIHtcbiAgICAgICAgICAgIGxlbmd0aCA9IE1hdGgubWF4KGxlbmd0aCwgdGhpcy5taW5MZW5ndGgpO1xuICAgICAgICAgICAgbGVuZ3RoID0gTWF0aC5taW4obGVuZ3RoLCB0aGlzLm1heExlbmd0aCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRMZW5ndGgobGVuZ3RoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMb3dlciBsaW1pdCBvbiBsZW5ndGggZm9yIHRoZSBwYXJ0aWN1bGFyIGNvbmNyZXRlIGNsYXNzXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgYWJzdHJhY3QgbWluTGVuZ3RoOiBudW1iZXI7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVwcGVyIGxpbWl0IG9uIGxlbmd0aCBmb3IgdGhlIHBhcnRpY3VsYXIgY29uY3JldGUgY2xhc3NcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBhYnN0cmFjdCBtYXhMZW5ndGg6IG51bWJlcjtcblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJBYnN0cmFjdFNpeC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQ2FsbC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiUm93LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJTZXJpYWxDb250YWluZXIudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlNpeFR5cGUudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBBIGNvdXJzZSwgYmVpbmcgYSBzZXQgb2Ygc2l4ZXNcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgQ291cnNlIGV4dGVuZHMgU2VyaWFsQ29udGFpbmVyPEFic3RyYWN0U2l4PiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFR5cGUgb2YgdGhlIGZpcnN0IHNpeFxuICAgICAgICAgKi9cbiAgICAgICAgcHJpdmF0ZSBfZmlyc3RTaXhUeXBlOiBTaXhUeXBlID0gU2l4VHlwZS5TbG93O1xuXG4gICAgICAgIC8qIFByaW50YWJsZU1peGluIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQYXRoIGZvciB0aGlzIGNsYXNzJyB0ZW1wbGF0ZXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0ZW1wbGF0ZVBhdGg6IHN0cmluZyA9ICdDb3Vyc2UnO1xuXG4gICAgICAgIC8qIEFic3RyYWN0Q29udGFpbmVyIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGxlbmd0aCBvZiBuZXcgY29udGFpbmVycyBvZiB0aGlzIHR5cGVcbiAgICAgICAgICpcbiAgICAgICAgICogRGVyaXZlZCBjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCBpZiByZXF1aXJlZC5cbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBnZXREZWZhdWx0TGVuZ3RoKGluaXRpYWxSb3c6IFJvdyk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gaW5pdGlhbFJvdy5sZW5ndGggKiAyO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYSBuZXcgYmxvY2sgZm9yIHRoZSBjb250YWluZXJcbiAgICAgICAgICpcbiAgICAgICAgICogVXNlZCBieSBleHRlbmQoKSB3aGVuIGNyZWF0aW5nIHRoZSBjb250YWluZXIgb3IgaW5jcmVhc2luZyBpdHNcbiAgICAgICAgICogbGVuZ3RoLlxuICAgICAgICAgKiBAcGFyYW0gaW5pdGlhbFJvdyAgaW5pdGlhbCByb3cgZm9yIHRoZSBibG9ja1xuICAgICAgICAgKiBAcGFyYW0gaW5kZXggICAgICAgaW5kZXggb2YgYmxvY2sgaW4gY29udGFpbmVyXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlQmxvY2soaW5pdGlhbFJvdzogUm93LCBpbmRleDogbnVtYmVyKTogQWJzdHJhY3RTaXgge1xuICAgICAgICAgICAgcmV0dXJuICgodGhpcy5fZmlyc3RTaXhUeXBlIHx8IFNpeFR5cGUuU2xvdykgKyBpbmRleCkgJSAyXG4gICAgICAgICAgICAgICAgPyBuZXcgU2xvdyhpbml0aWFsUm93LCB7J2NvbnRhaW5lcic6IHRoaXMsICdpbmRleCc6IGluZGV4fSlcbiAgICAgICAgICAgICAgICA6IG5ldyBRdWljayhpbml0aWFsUm93LCB7J2NvbnRhaW5lcic6IHRoaXMsICdpbmRleCc6IGluZGV4fSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogTG93ZXIgbGltaXQgb24gbGVuZ3RoIGZvciB0aGUgcGFydGljdWxhciBjb25jcmV0ZSBjbGFzc1xuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IG1pbkxlbmd0aDogbnVtYmVyID0gMjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVXBwZXIgbGltaXQgb24gbGVuZ3RoIGZvciB0aGUgcGFydGljdWxhciBjb25jcmV0ZSBjbGFzc1xuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IG1heExlbmd0aDogbnVtYmVyID0gNjA7XG5cbiAgICAgICAgLyogQ291cnNlIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIGNvdXJzZSBlbmRcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBnZXRFbmQ6ICgpID0+IFJvdyA9IHRoaXMuZ2V0TGFzdDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVhZCBhY2Nlc3MgdG8gdGhlIHNpeGVzXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZ2V0U2l4ZXM6ICgpID0+IEFic3RyYWN0U2l4W10gPSB0aGlzLmdldEJsb2NrcztcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVhZCBhY2Nlc3MgdG8gYSBzaXhcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBnZXRTaXg6IChpbmRleDogbnVtYmVyKSA9PiBBYnN0cmFjdFNpeCA9IHRoaXMuZ2V0QmxvY2s7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlYWQgYWNjZXNzIHRvIHRoZSB0eXBlIG9mIHRoZSBmaXJzdCBzaXhcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBnZXRGaXJzdFNpeFR5cGUoKTogU2l4VHlwZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZmlyc3RTaXhUeXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyaXRlIGFjY2VzcyB0byB0aGUgdHlwZSBvZiB0aGUgZmlyc3Qgc2l4XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc2V0Rmlyc3RTaXhUeXBlKHR5cGU6IFNpeFR5cGUpOiB0aGlzIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9maXJzdFNpeFR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpczsgIC8vIG5vdGhpbmcgdG8gZG9cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fZmlyc3RTaXhUeXBlID0gdHlwZTtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IGFycmF5IG9mIHNpeGVzIHdpdGggdGhlIGNvcnJlY3QgcGFyaXR5XG4gICAgICAgICAgICBsZXQgaW5pdGlhbFJvdyA9IHRoaXMuX2luaXRpYWxSb3c7XG4gICAgICAgICAgICBjb25zdCBuZXdTaXhlczogQWJzdHJhY3RTaXhbXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8PSB0aGlzLmdldExlbmd0aCgpOyBpbmRleCArPSAxKSB7XG4gICAgICAgICAgICAgICAgbmV3U2l4ZXNbaW5kZXggLSAxXSA9IHRoaXMuY3JlYXRlQmxvY2soaW5pdGlhbFJvdywgaW5kZXgpO1xuICAgICAgICAgICAgICAgIG5ld1NpeGVzW2luZGV4IC0gMV0uc2V0Q2FsbCh0aGlzLmdldFNpeChpbmRleCkuZ2V0Q2FsbCgpKTtcbiAgICAgICAgICAgICAgICBpbml0aWFsUm93ID0gbmV3U2l4ZXNbaW5kZXggLSAxXS5nZXRMYXN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2Jsb2NrcyA9IG5ld1NpeGVzO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXNldHMgdGhlIGNvdXJzZSB0byBiZSB0aGUgZGVmYXVsdCBsZW5ndGhcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyByZXNldExlbmd0aCgpOiB0aGlzIHtcbiAgICAgICAgICAgIHRoaXMuc2V0TGVuZ3RoKHRoaXMuZ2V0RGVmYXVsdExlbmd0aCh0aGlzLl9pbml0aWFsUm93KSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNYWtlcyB0aGUgY291cnNlIGludG8gYSBwbGFpbiBjb3Vyc2VcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyByZXNldENhbGxzKCk6IHRoaXMge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzaXggb2YgdGhpcy5fYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgc2l4LnNldENhbGwoQ2FsbC5QbGFpbiwgZmFsc2UpOyAgLy8gQXZvaWQgbXVsdGlwbGUgdXBkYXRlcy4uLlxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyAuLi4gYW5kIHRyaWdnZXIgb25lIGF0IHRoZSBlbmRcbiAgICAgICAgICAgIHRoaXMuZ2V0U2l4KDEpLnNldENhbGwoQ2FsbC5QbGFpbik7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrcyB3aGV0aGVyIHRoaXMgaXMgYSBwbGFpbiBjb3Vyc2VcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBpc1BsYWluKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzaXggb2YgdGhpcy5fYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNpeC5nZXRDYWxsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsb25lcyB0aGUgY291cnNlXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgY2xvbmUoKTogQ291cnNlIHtcbiAgICAgICAgICAgIGNvbnN0IGNsb25lZDogQ291cnNlID0gbmV3IENvdXJzZSh0aGlzLl9pbml0aWFsUm93KTtcbiAgICAgICAgICAgIGNsb25lZC5zZXRMZW5ndGgodGhpcy5nZXRMZW5ndGgoKSk7XG4gICAgICAgICAgICBjbG9uZWQuc2V0Rmlyc3RTaXhUeXBlKHRoaXMuZ2V0Rmlyc3RTaXhUeXBlKCkpO1xuXG4gICAgICAgICAgICAvLyBDb3B5IGFjcm9zcyBhbGwgdGhlIGNhbGxzXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDw9IHRoaXMuZ2V0TGVuZ3RoKCk7IGluZGV4ICs9IDEpIHtcbiAgICAgICAgICAgICAgICBjbG9uZWQuZ2V0U2l4KGluZGV4KS5zZXRDYWxsKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFNpeChpbmRleCkuZ2V0Q2FsbCgpLFxuICAgICAgICAgICAgICAgICAgICBmYWxzZSwgIC8vIEF2b2lkIG11bHRpcGxlIHVwZGF0ZXMuLi5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyAuLi4gYW5kIHRyaWdnZXIgb25lIGF0IHRoZSBlbmRcbiAgICAgICAgICAgIGNsb25lZC5nZXRTaXgoMSkuc2V0Q2FsbCh0aGlzLmdldFNpeCgxKS5nZXRDYWxsKCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gY2xvbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYSBuZXcgY291cnNlIGZyb20gYSBzdHJpbmcgcmVwcmVzZW50YXRpb25cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZnJvbVN0cmluZyhpbml0aWFsUm93OiBSb3csIGlucHV0OiBzdHJpbmcpOiBDb3Vyc2Uge1xuICAgICAgICAgICAgY29uc3QgY291cnNlOiBDb3Vyc2UgPSBuZXcgQ291cnNlKGluaXRpYWxSb3cpLFxuICAgICAgICAgICAgICAgIHBhdENvdXJzZUVuZDogc3RyaW5nID0gJ1swLTlhLXpdezMsMTV9JyxcbiAgICAgICAgICAgICAgICBwYXRDYWxsOiBzdHJpbmcgPSAnKD86XFxcXGR7MSwyfXxcXFxcZHsxLDJ9c3xzXFxcXGR7MSwyfSknLFxuICAgICAgICAgICAgICAgIHBhdFNlcDogc3RyaW5nID0gJ1tcXFxccy4sXSsnLFxuICAgICAgICAgICAgICAgIHBhdENhbGxpbmc6IHN0cmluZyA9IHBhdENhbGwgKyAnKD86JyArIHBhdFNlcCArIHBhdENhbGwgKyAnKSonLFxuICAgICAgICAgICAgICAgIHBhdFNpeGVzOiBzdHJpbmcgPSAnXFxcXCgoXFxcXGR7MSwyfSlbXlxcXFxkXFxcXCldKlxcXFwpJyxcbiAgICAgICAgICAgICAgICBwYXRBbGw6IHN0cmluZyA9ICcnXG4gICAgICAgICAgICAgICAgICAgICsgJ15cXFxccyonXG4gICAgICAgICAgICAgICAgICAgICsgJyg/OicgKyBwYXRDb3Vyc2VFbmQgKyAnXFxcXHMrKT8nXG4gICAgICAgICAgICAgICAgICAgICsgJygnICsgcGF0Q2FsbGluZyArICd8cCknICAvLyBncm91cCAxXG4gICAgICAgICAgICAgICAgICAgICsgJyg/OlxcXFxzKycgKyBwYXRTaXhlcyArICcpPycgIC8vIGdyb3VwIDIgaW4gaGVyZVxuICAgICAgICAgICAgICAgICAgICArICdcXFxccyokJyxcbiAgICAgICAgICAgICAgICByeEFsbDogUmVnRXhwID0gbmV3IFJlZ0V4cChwYXRBbGwsICdpJyksXG4gICAgICAgICAgICAgICAgbWF0Y2hlczogbnVsbCB8IHN0cmluZ1tdID0gcnhBbGwuZXhlYyhpbnB1dCk7XG5cbiAgICAgICAgICAgIGxldCBjYWxsczogc3RyaW5nW10sXG4gICAgICAgICAgICAgICAgaTogbnVtYmVyLFxuICAgICAgICAgICAgICAgIGNhbGw6IHN0cmluZztcblxuICAgICAgICAgICAgaWYgKCFtYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgaW1wb3J0IGNvdXJzZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTZWNvbmQgZ3JvdXAgbWF0Y2hlcyBsZW5ndGggb2YgY291cnNlXG4gICAgICAgICAgICBpZiAobWF0Y2hlc1syXSkge1xuICAgICAgICAgICAgICAgIGNvdXJzZS5zZXRMZW5ndGgocGFyc2VJbnQobWF0Y2hlc1syXSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJZiB0aGlzIGlzIGEgcGxhaW4gY291cnNlIHRoZW4gb3VyIGpvYiBpcyBkb25lXG4gICAgICAgICAgICBpZiAobWF0Y2hlc1sxXSA9PT0gJ3AnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHNwbGl0IHVwIHRoZSBjYWxsaW5nIGFuZCBwcm9jZXNzXG4gICAgICAgICAgICBjYWxscyA9IG1hdGNoZXNbMV0uc3BsaXQobmV3IFJlZ0V4cChwYXRTZXApKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYWxscy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGNhbGwgPSBjYWxsc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbC5jaGFyQXQoMCkgPT09ICdzJykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsID0gY2FsbC5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgY291cnNlLmdldFNpeChwYXJzZUludChjYWxsKSkuc2V0Q2FsbChDYWxsLlNpbmdsZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjYWxsLnNsaWNlKC0xKSA9PT0gJ3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGwgPSBjYWxsLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgICAgICAgICAgICAgY291cnNlLmdldFNpeChwYXJzZUludChjYWxsKSkuc2V0Q2FsbChDYWxsLlNpbmdsZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY291cnNlLmdldFNpeChwYXJzZUludChjYWxsKSkuc2V0Q2FsbChDYWxsLkJvYik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvdXJzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcmZhY2UgZm9yIG9wdGlvbnMgcGFzc2VkIHRvIGNyZWF0ZSgpXG4gICAgICovXG4gICAgZXhwb3J0IGludGVyZmFjZSBPcHRpb25zIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogV2hldGhlciB0byBwYWNrYWdlIHRoZSBwcmlja2VyIGluIGFuIGlmcmFtZS5cbiAgICAgICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgaWZyYW1lPzogYm9vbGVhbjtcblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJBYnN0cmFjdFNpeC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQ2hhbmdlcy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiU2l4VHlwZVwiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiVmlzaXRvci9BYnN0cmFjdC50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIEEgcXVpY2sgc2l4XG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIFF1aWNrIGV4dGVuZHMgQWJzdHJhY3RTaXgge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUeXBlIG9mIHRoZSBzaXhcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0eXBlID0gU2l4VHlwZS5RdWljaztcblxuICAgICAgICAvKipcbiAgICAgICAgICogTm90YXRpb24gKGV4Y2x1ZGluZyBjYWxsKVxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBub3RhdGlvbiA9IFsnMScsICczJywgJzEnLCAnMycsICcxJ107XG4gICAgICAgIHB1YmxpYyByZWFkb25seSBub3RhdGlvbiA9IFF1aWNrLm5vdGF0aW9uO1xuXG4gICAgICAgIC8qIEFic3RyYWN0QmxvY2sgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWNlaXZlcyBhIHZpc2l0b3IgdGhhdCB3aWxsIGJlIGNhbGxlZCB0byBwcm9jZXNzIGVhY2ggcm93XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgYWNjZXB0KC4uLnZpc2l0b3JzOiBWaXNpdG9yLkFic3RyYWN0VmlzaXRvcltdKTogdGhpcyB7XG4gICAgICAgICAgICBjb25zdCByb3cgPSB0aGlzLmdldEluaXRpYWxSb3coKTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCB2aXNpdG9yIG9mIHZpc2l0b3JzKSB7XG4gICAgICAgICAgICAgICAgQ2hhbmdlcy5wZXJtdXRlQ2FsbChyb3csIHRoaXMuX2NhbGwpO1xuICAgICAgICAgICAgICAgIHZpc2l0b3IudmlzaXQocm93LCB0aGlzKTtcblxuICAgICAgICAgICAgICAgIENoYW5nZXMucGVybXV0ZTEocm93KTtcbiAgICAgICAgICAgICAgICB2aXNpdG9yLnZpc2l0KHJvdywgdGhpcyk7XG5cbiAgICAgICAgICAgICAgICBDaGFuZ2VzLnBlcm11dGUzKHJvdyk7XG4gICAgICAgICAgICAgICAgdmlzaXRvci52aXNpdChyb3csIHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgQ2hhbmdlcy5wZXJtdXRlMShyb3cpO1xuICAgICAgICAgICAgICAgIHZpc2l0b3IudmlzaXQocm93LCB0aGlzKTtcblxuICAgICAgICAgICAgICAgIENoYW5nZXMucGVybXV0ZTMocm93KTtcbiAgICAgICAgICAgICAgICB2aXNpdG9yLnZpc2l0KHJvdywgdGhpcyk7XG5cbiAgICAgICAgICAgICAgICB2aXNpdG9yLnZpc2l0KHRoaXMuX2VuZCwgdGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogQWJzdHJhY3RTaXggbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRyYW5zcG9zZXMgdGhlIGZyb250IHRocmVlIGJlbGxzIGRlcGVuZGluZyB1cG9uIHRoZSB0eXBlIG9mIHNpeFxuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIGFwcGx5U2l4VHJhbnNwb3NpdGlvbigpOiB2b2lkIHtcbiAgICAgICAgICAgIENoYW5nZXMucGVybXV0ZTModGhpcy5fZW5kKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkFic3RyYWN0QmxvY2sudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkFic3RyYWN0Q29udGFpbmVyLnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogQWJzdHJhY3QgY29udGFpbmVyIHRoYXQgYWxsb3dzIHJhbmRvbSBpbnNlcnRpb24gb2YgY2hpbGQgYmxvY2tzXG4gICAgICpcbiAgICAgKiBDaGlsZCBibG9ja3MgbWF5IGJlIGluc2VydGVkIG9yIHJlbW92ZWQgYW55d2hlcmUgd2l0aGluIHRoZSBjb250YWluZXIuXG4gICAgICogTWlnaHQgYmUgdXNlZCB0byByZXByZXNlbnQgYSB0b3VjaCBvZiBTdGVkbWFuIG9yIGEgY291cnNlIG9mIHNwbGljZWQuXG4gICAgICovXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJhbmRvbUFjY2Vzc0NvbnRhaW5lcjxCbG9jayBleHRlbmRzIEFic3RyYWN0QmxvY2s+XG4gICAgICAgIGV4dGVuZHMgQWJzdHJhY3RDb250YWluZXI8QmxvY2s+IHtcblxuICAgICAgICAvKiBSYW5kb21BY2Nlc3NDb250YWluZXIgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogSW5zZXJ0cyBhIGNvdXJzZSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgaW5zZXJ0QmxvY2soaW5kZXg6IG51bWJlciwgYmxvY2s6IEJsb2NrKTogdGhpcyB7XG4gICAgICAgICAgICB0aGlzLl9ibG9ja3Muc3BsaWNlKGluZGV4IC0gMSwgMCwgYmxvY2spO1xuICAgICAgICAgICAgdGhpcy5maXh1cE93bmVyc2hpcChpbmRleCk7XG5cbiAgICAgICAgICAgIHRoaXMubm90aWZ5KGluZGV4IC0gMSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWxldGVzIHRoZSBjb3Vyc2UgYXQgdGhlIHNwZWNpZmllZCBpbmRleFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGRlbGV0ZUJsb2NrKGluZGV4OiBudW1iZXIpOiBCbG9jayB7XG4gICAgICAgICAgICBjb25zdCBibG9jazogQmxvY2sgPSB0aGlzLmdldEJsb2NrKGluZGV4KTtcblxuICAgICAgICAgICAgdGhpcy5fYmxvY2tzLnNwbGljZShpbmRleCAtIDEsIDEpO1xuICAgICAgICAgICAgYmxvY2suY2xlYXJPd25lcnNoaXAoKTtcbiAgICAgICAgICAgIHRoaXMuZml4dXBPd25lcnNoaXAoaW5kZXgpO1xuXG4gICAgICAgICAgICB0aGlzLm5vdGlmeShpbmRleCAtIDEpO1xuICAgICAgICAgICAgcmV0dXJuIGJsb2NrO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhlbHBlciB0byBmaXh1cCBvd25lcnNoaXAgb2YgYmxvY2tzXG4gICAgICAgICAqL1xuICAgICAgICBwcml2YXRlIGZpeHVwT3duZXJzaGlwKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IGluZGV4OyBpIDw9IHRoaXMuZ2V0TGVuZ3RoKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0QmxvY2soaSkuc2V0T3duZXJzaGlwKHsnY29udGFpbmVyJzogdGhpcywgJ2luZGV4JzogaX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQWJzdHJhY3RTaXgudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkNoYW5nZXMudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlNpeFR5cGVcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlZpc2l0b3IvQWJzdHJhY3QudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBBIHNsb3cgc2l4XG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIFNsb3cgZXh0ZW5kcyBBYnN0cmFjdFNpeCB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFR5cGUgb2YgdGhlIHNpeFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBTaXhUeXBlLlNsb3c7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE5vdGF0aW9uIChleGNsdWRpbmcgY2FsbClcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbm90YXRpb24gPSBbJzMnLCAnMScsICczJywgJzEnLCAnMyddO1xuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbm90YXRpb24gPSBTbG93Lm5vdGF0aW9uO1xuXG4gICAgICAgIC8qIEFic3RyYWN0QmxvY2sgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWNlaXZlcyBhIHZpc2l0b3IgdGhhdCB3aWxsIGJlIGNhbGxlZCB0byBwcm9jZXNzIGVhY2ggcm93XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgYWNjZXB0KC4uLnZpc2l0b3JzOiBWaXNpdG9yLkFic3RyYWN0VmlzaXRvcltdKTogdGhpcyB7XG4gICAgICAgICAgICBjb25zdCByb3cgPSB0aGlzLmdldEluaXRpYWxSb3coKTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCB2aXNpdG9yIG9mIHZpc2l0b3JzKSB7XG4gICAgICAgICAgICAgICAgQ2hhbmdlcy5wZXJtdXRlQ2FsbChyb3csIHRoaXMuX2NhbGwpO1xuICAgICAgICAgICAgICAgIHZpc2l0b3IudmlzaXQocm93LCB0aGlzKTtcblxuICAgICAgICAgICAgICAgIENoYW5nZXMucGVybXV0ZTMocm93KTtcbiAgICAgICAgICAgICAgICB2aXNpdG9yLnZpc2l0KHJvdywgdGhpcyk7XG5cbiAgICAgICAgICAgICAgICBDaGFuZ2VzLnBlcm11dGUxKHJvdyk7XG4gICAgICAgICAgICAgICAgdmlzaXRvci52aXNpdChyb3csIHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgQ2hhbmdlcy5wZXJtdXRlMyhyb3cpO1xuICAgICAgICAgICAgICAgIHZpc2l0b3IudmlzaXQocm93LCB0aGlzKTtcblxuICAgICAgICAgICAgICAgIENoYW5nZXMucGVybXV0ZTEocm93KTtcbiAgICAgICAgICAgICAgICB2aXNpdG9yLnZpc2l0KHJvdywgdGhpcyk7XG5cbiAgICAgICAgICAgICAgICB2aXNpdG9yLnZpc2l0KHRoaXMuX2VuZCwgdGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogQWJzdHJhY3RTaXggbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRyYW5zcG9zZXMgdGhlIGZyb250IHRocmVlIGJlbGxzIGRlcGVuZGluZyB1cG9uIHRoZSB0eXBlIG9mIHNpeFxuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIGFwcGx5U2l4VHJhbnNwb3NpdGlvbigpOiB2b2lkIHtcbiAgICAgICAgICAgIENoYW5nZXMucGVybXV0ZTEodGhpcy5fZW5kKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkNoYW5nZXMudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlByaW50YWJsZU1peGluLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJSb3cudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInJvd0Zyb21TdHJpbmcudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlNpeFR5cGUudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlN0YWdlLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJWaXNpdG9yL0Fic3RyYWN0LnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogQSBzdGFydCBmb3IgYSB0b3VjaCBvZiBTdGVkbWFuXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIFN0YXJ0IGltcGxlbWVudHMgUHJpbnRhYmxlTWl4aW4ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmRleCBvZiByb3VuZHMgd2l0aGluIHRoZSBzaXhcbiAgICAgICAgICovXG4gICAgICAgIHByaXZhdGUgX3Jvd0luZGV4OiBudW1iZXI7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFR5cGUgb2Ygc2l4XG4gICAgICAgICAqL1xuICAgICAgICBwcml2YXRlIF9zaXhUeXBlOiBTaXhUeXBlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSb3dzIG9mIHRoZSBzdGFydFxuICAgICAgICAgKi9cbiAgICAgICAgcHJpdmF0ZSBfcm93czogUm93W107XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIExhc3Qgcm93IG9mIHRoZSBzdGFydFxuICAgICAgICAgKi9cbiAgICAgICAgcHJpdmF0ZSBfbGFzdFJvdzogUm93O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAgICAgKiBAcGFyYW0gcm93SW5kZXggIGluZGV4IG9mIHJvdW5kcyB3aXRoaW4gdGhlIHNpeFxuICAgICAgICAgKiBAcGFyYW0gc2l4VHlwZSAgIHR5cGUgb2Ygc2l4XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3Rvcihyb3dJbmRleDogbnVtYmVyID0gNCwgc2l4VHlwZTogU2l4VHlwZSA9IFNpeFR5cGUuUXVpY2spIHtcbiAgICAgICAgICAgIGlmIChyb3dJbmRleCA8IDEgfHwgcm93SW5kZXggPiA2KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSb3cgaW5kZXggb3V0IG9mIHJhbmdlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9yb3dJbmRleCA9IHJvd0luZGV4O1xuICAgICAgICAgICAgdGhpcy5fc2l4VHlwZSA9IHNpeFR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBQcmludGFibGVNaXhpbiBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVuZGVycyB0aGUgb2JqZWN0IHdpdGggYSB0ZW1wbGF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHByaW50OiAodDogc3RyaW5nLCBjPzogVGVtcGxhdGVDb250ZXh0KSA9PiBzdHJpbmc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBhdGggZm9yIHRoaXMgY2xhc3MnIHRlbXBsYXRlc1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHRlbXBsYXRlUGF0aDogc3RyaW5nID0gJ1N0YXJ0JztcblxuICAgICAgICAvKiBTdGFydCBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgc3RhZ2VcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzZXRTdGFnZShzdGFnZTogU3RhZ2UpOiB0aGlzIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IHJvd0Zyb21TdHJpbmcoJzEyMycsIHN0YWdlKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvd3MgPSBbXTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3Jvd0luZGV4ID09PSA2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdFJvdyA9IHJvdztcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRmlndXJlIG91dCB3aGF0IHNvcnQgb2YgY2hhbmdlIHRvIGFwcGx5XG4gICAgICAgICAgICBsZXQgY2hhbmdlID0gKHRoaXMuX3Jvd0luZGV4ICsgdGhpcy5fc2l4VHlwZSkgJSAyXG4gICAgICAgICAgICAgICAgPyBDaGFuZ2VzLnBlcm11dGUxXG4gICAgICAgICAgICAgICAgOiBDaGFuZ2VzLnBlcm11dGUzO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fcm93SW5kZXg7IGkgPCA2OyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAvLyBTd2FwIHRoZSBjaGFuZ2VcbiAgICAgICAgICAgICAgICBjaGFuZ2UgPSBjaGFuZ2UgPT09IENoYW5nZXMucGVybXV0ZTFcbiAgICAgICAgICAgICAgICAgICAgPyBDaGFuZ2VzLnBlcm11dGUzXG4gICAgICAgICAgICAgICAgICAgIDogQ2hhbmdlcy5wZXJtdXRlMTtcblxuICAgICAgICAgICAgICAgIC8vIEFwcGx5IGl0IGFuZCBzdG9yZVxuICAgICAgICAgICAgICAgIGNoYW5nZShyb3cpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd3MucHVzaChyb3cuc2xpY2UoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2xhc3RSb3cgPSB0aGlzLl9yb3dzW3RoaXMuX3Jvd3MubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQcm92aWRlcyByZWFkIGFjY2VzcyB0byB0aGUgcm93IGluZGV4XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZ2V0Um93SW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yb3dJbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQcm92aWRlcyByZWFkIGFjY2VzcyB0byB0aGUgc2l4IHR5cGVcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBnZXRTaXhUeXBlKCk6IFNpeFR5cGUge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpeFR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgbGFzdCByb3cgb2YgdGhlIHN0YXJ0XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZ2V0TGFzdCgpOiBSb3cge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9sYXN0Um93KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IHNldCBzdGFnZSBiZWZvcmUgdXNpbmcgc3RhcnQgb2JqZWN0Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sYXN0Um93LnNsaWNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVjZWl2ZXMgYSB2aXNpdG9yIHRoYXQgd2lsbCBiZSBjYWxsZWQgdG8gcHJvY2VzcyBlYWNoIHJvd1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGFjY2VwdCguLi52aXNpdG9yczogVmlzaXRvci5BYnN0cmFjdFZpc2l0b3JbXSk6IHRoaXMge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9yb3dzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IHNldCBzdGFnZSBiZWZvcmUgdXNpbmcgc3RhcnQgb2JqZWN0Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgdmlzaXRvciBvZiB2aXNpdG9ycykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgcm93IG9mIHRoaXMuX3Jvd3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdmlzaXRvci52aXNpdChyb3cpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ291bnRzIHRoZSBudW1iZXIgb2Ygcm93cyBkdXJpbmcgdGhlIHN0YXJ0XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZXN0aW1hdGVSb3dzKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gNiAtIHRoaXMuX3Jvd0luZGV4O1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBQcmludGFibGVNaXhpbi5tYWtlUHJpbnRhYmxlKFN0YXJ0KTtcblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJUZW1wbGF0ZUNvbnRleHQudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBDb250YWluZXIgZm9yIHRlbXBsYXRlc1xuICAgICAqXG4gICAgICogRGljdGlvbmFyeSBvZiB0ZW1wbGF0ZSBmdW5jdGlvbnMgdGhhdCBtYXAgZGF0YSB0byBhIHN0cmluZ1xuICAgICAqL1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YXJpYWJsZS1uYW1lXG4gICAgZXhwb3J0IGxldCBUZW1wbGF0ZXM6IHtcbiAgICAgICAgW2luZGV4OiBzdHJpbmddOiAoZGF0YTogVGVtcGxhdGVDb250ZXh0KSA9PiBzdHJpbmcsXG4gICAgfSA9IHsgfTtcbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQ2hhbmdlcy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQ291cnNlLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJSYW5kb21BY2Nlc3NDb250YWluZXIudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlJvdy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiU3RhZ2UudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlN0YXJ0LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJWaXNpdG9yL0Fic3RyYWN0LnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogQSB0b3VjaCwgYmVpbmcgYSBzZXQgb2YgY291cnNlc1xuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBUb3VjaCBleHRlbmRzIFJhbmRvbUFjY2Vzc0NvbnRhaW5lcjxDb3Vyc2U+IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3RhcnQgZm9yIHRoaXMgdG91Y2hcbiAgICAgICAgICovXG4gICAgICAgIHByaXZhdGUgX3N0YXJ0OiBTdGFydDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29uc3RydWN0b3JcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAgICAgaW5pdGlhbFJvdzogUm93LFxuICAgICAgICAgICAgcHJvdGVjdGVkIF9vd25lcnNoaXA/OiBCbG9ja093bmVyc2hpcCxcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBzdXBlcihpbml0aWFsUm93LCBfb3duZXJzaGlwKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0ID0gbmV3IFN0YXJ0KCk7XG4gICAgICAgICAgICB0aGlzLl9zdGFydC5zZXRTdGFnZShpbml0aWFsUm93Lmxlbmd0aCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBBYnN0cmFjdEJsb2NrIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogV3JpdGUgYWNjZXNzIHRvIHRoZSBpbml0aWFsIHJvd1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHNldEluaXRpYWxSb3coaW5pdGlhbFJvdzogUm93KTogdGhpcyB7XG4gICAgICAgICAgICB0aGlzLl9zdGFydC5zZXRTdGFnZShpbml0aWFsUm93Lmxlbmd0aCk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVjZWl2ZXMgYSB2aXNpdG9yIHRoYXQgd2lsbCBiZSBjYWxsZWQgdG8gcHJvY2VzcyBlYWNoIHJvd1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGFjY2VwdCguLi52aXNpdG9yczogVmlzaXRvci5BYnN0cmFjdFZpc2l0b3JbXSk6IHRoaXMge1xuICAgICAgICAgICAgdGhpcy5fc3RhcnQuc2V0U3RhZ2UodGhpcy5faW5pdGlhbFJvdy5sZW5ndGgpO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHZpc2l0b3Igb2YgdmlzaXRvcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFydC5hY2NlcHQodmlzaXRvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzdXBlci5hY2NlcHQoLi4udmlzaXRvcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVzdGltYXRlcyB0aGUgbnVtYmVyIG9mIHJvd3MgaW4gdGhlIGJsb2NrXG4gICAgICAgICAqIFRoZSBlc3RpbWF0ZSBkb2Vzbid0IHRha2UgaW50byBhY2NvdW50IGNvbWluZyByb3VuZCBwYXJ0LXdheSB0aHJvdWdoXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZXN0aW1hdGVSb3dzKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnQuZXN0aW1hdGVSb3dzKCkgKyBzdXBlci5lc3RpbWF0ZVJvd3MoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFByaW50YWJsZU1peGluIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQYXRoIGZvciB0aGlzIGNsYXNzJyB0ZW1wbGF0ZXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0ZW1wbGF0ZVBhdGg6IHN0cmluZyA9ICdUb3VjaCc7XG5cbiAgICAgICAgLyogQWJzdHJhY3RDb250YWluZXIgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFByb3BhZ2F0ZXMgZGF0YSBmcm9tIGEgcHJldmlvdXMgYmxvY2sgdG8gYSBjdXJyZW50IGJsb2NrXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgcHJvcGFnYXRlQ3VycmVudEJsb2NrKFxuICAgICAgICAgICAgcHJldmlvdXM6IENvdXJzZSxcbiAgICAgICAgICAgIGN1cnJlbnQ6IENvdXJzZSxcbiAgICAgICAgKTogdm9pZCB7XG4gICAgICAgICAgICBjb25zdCBzaXhUeXBlID0gcHJldmlvdXMuZ2V0U2l4KHByZXZpb3VzLmdldExlbmd0aCgpKS50eXBlO1xuICAgICAgICAgICAgY3VycmVudC5zZXRJbml0aWFsUm93KHByZXZpb3VzLmdldExhc3QoKSk7XG4gICAgICAgICAgICBjdXJyZW50LnNldEZpcnN0U2l4VHlwZSgoc2l4VHlwZSArIDEpICUgMik7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUHJvcGFnYXRlcyBkYXRhIGZvciB0aGUgZmlyc3QgYmxvY2sgd2l0aGluIHRoZSBjb250YWluZXJcbiAgICAgICAgICogSGFuZGxlZCBhcyBhIHNwZWNpYWwgY2FzZSB0byBhbGxvdyBmb3IgZS5nLiBTdGVkbWFuIHN0YXJ0c1xuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIHByb3BhZ2F0ZUZpcnN0QmxvY2soZmlyc3Q6IENvdXJzZSk6IHZvaWQge1xuICAgICAgICAgICAgY29uc3Qgc2l4VHlwZSA9IHRoaXMuX3N0YXJ0LmdldFNpeFR5cGUoKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0LnNldFN0YWdlKHRoaXMuX2luaXRpYWxSb3cubGVuZ3RoKTtcbiAgICAgICAgICAgIGZpcnN0LnNldEluaXRpYWxSb3codGhpcy5fc3RhcnQuZ2V0TGFzdCgpKTtcbiAgICAgICAgICAgIGZpcnN0LnNldEZpcnN0U2l4VHlwZSgoc2l4VHlwZSArIDEpICUgMik7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBUb3VjaCBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVhZCBhY2Nlc3MgdG8gdGhlIGNvdXJzZXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBnZXRDb3Vyc2VzOiAoKSA9PiBDb3Vyc2VbXSA9IHRoaXMuZ2V0QmxvY2tzO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWFkIGFjY2VzcyB0byBhIGNvdXJzZVxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGdldENvdXJzZTogKGluZGV4OiBudW1iZXIpID0+IENvdXJzZSA9IHRoaXMuZ2V0QmxvY2s7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluc2VydHMgYSBjb3Vyc2UgYXQgdGhlIHNwZWNpZmllZCBpbmRleFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGluc2VydENvdXJzZTogKGluZGV4OiBudW1iZXIsIGNvdXJzZTogQ291cnNlKSA9PiB0aGlzID1cbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0QmxvY2s7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlbGV0ZXMgdGhlIGNvdXJzZSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZGVsZXRlQ291cnNlOiAoaW5kZXg6IG51bWJlcikgPT4gQ291cnNlID0gdGhpcy5kZWxldGVCbG9jaztcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVhZCBhY2Nlc3MgdG8gdGhlIHN0YXJ0XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZ2V0U3RhcnQoKTogU3RhcnQge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0O1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyaXRlIGFjY2VzcyB0byB0aGUgc3RhcnRcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzZXRTdGFydChzdGFydDogU3RhcnQpOiBUb3VjaCB7XG4gICAgICAgICAgICB0aGlzLl9zdGFydCA9IHN0YXJ0O1xuICAgICAgICAgICAgdGhpcy5ub3RpZnkoMCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IHRvdWNoIGZyb20gYSBzdHJpbmcgcmVwcmVzZW50YXRpb25cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZnJvbVN0cmluZyhpbnB1dDogc3RyaW5nKTogVG91Y2gge1xuICAgICAgICAgICAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gaW5wdXQuc3BsaXQoJ1xcbicpO1xuXG4gICAgICAgICAgICBsZXQgaTogbnVtYmVyLFxuICAgICAgICAgICAgICAgIGxpbmU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICBjb3Vyc2U6IENvdXJzZSxcbiAgICAgICAgICAgICAgICB0b3VjaDogVG91Y2ggfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIC8vIFByb2Nlc3MgZWFjaCBpbnB1dCBsaW5lLCBtYWtpbmcgdGV4dCBzdWJzdGl0dXRpb25zXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBsaW5lID0gbGluZXNbaV07XG5cbiAgICAgICAgICAgICAgICAvLyBEcm9wIGFueSBjb250ZW50IGFmdGVyIGNvbW1lbnQgY2hhcmFjdGVycyBcIi8vXCJcbiAgICAgICAgICAgICAgICBsaW5lID0gbGluZS5yZXBsYWNlKC9cXC9cXC8uKiQvLCAnJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBJZ25vcmUgYSBtaWNyb3NpcmlsIGNvbW1lbnQgXCIvXCIgYXQgdGhlIHN0YXJ0IG9mIGEgbGluZVxuICAgICAgICAgICAgICAgIGxpbmUgPSBsaW5lLnJlcGxhY2UoL15cXC8vLCAnJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBTa2lwIHRoaXMgbGluZSBpZiBpdCdzIGJsYW5rXG4gICAgICAgICAgICAgICAgaWYgKC9eXFxzKiQvLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCF0b3VjaCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgdGhlIHRvdWNoIHdpdGggYSBzdGFnZSBiYXNlZCBvbiB0aGUgZmlyc3QgbGluZVxuICAgICAgICAgICAgICAgICAgICBsaW5lID0gbGluZS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIVN0YWdlW2xpbmUubGVuZ3RoXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgcmVjb2duaXNlIHN0YWdlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdG91Y2ggPSBuZXcgVG91Y2gocm93RnJvbVN0cmluZygnMjMxJywgbGluZS5sZW5ndGgpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBjb3Vyc2UgZm9yIGVhY2ggcmVtYWluaW5nIGxpbmVcbiAgICAgICAgICAgICAgICAgICAgY291cnNlID0gQ291cnNlLmZyb21TdHJpbmcodG91Y2guZ2V0TGFzdCgpLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2guaW5zZXJ0Q291cnNlKHRvdWNoLmdldExlbmd0aCgpICsgMSwgY291cnNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdG91Y2gpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGlucHV0IGxpbmVzJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0b3VjaDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBET00gaGVscGVyIHV0aWxpdGllc1xuICAgICAqL1xuICAgIGV4cG9ydCBuYW1lc3BhY2UgRG9tIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29tcHV0ZXMgdGhlIHdpZHRoIG9mIGFuIGVsZW1lbnRcbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRXaWR0aChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQub2Zmc2V0V2lkdGggKyAxICAvLyBBbGxvdyBmb3IgZnJhY3Rpb25hbCBwYXJ0XG4gICAgICAgICAgICAgICAgKyBnZXRNZXRyaWMoZWxlbWVudCwgJ21hcmdpbkxlZnQnKVxuICAgICAgICAgICAgICAgICsgZ2V0TWV0cmljKGVsZW1lbnQsICdtYXJnaW5SaWdodCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbXB1dGVzIHRoZSBoZWlnaHQgb2YgYW4gZWxlbWVudFxuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIGdldEhlaWdodChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgMSAgLy8gQWxsb3cgZm9yIGZyYWN0aW9uYWwgcGFydFxuICAgICAgICAgICAgICAgICsgZ2V0TWV0cmljKGVsZW1lbnQsICdtYXJnaW5Ub3AnKVxuICAgICAgICAgICAgICAgICsgZ2V0TWV0cmljKGVsZW1lbnQsICdtYXJnaW5Cb3R0b20nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWFkcyBhIHN0eWxlLXJlbGF0ZWQgbWV0cmljIGZyb20gYW4gZWxlbWVudFxuICAgICAgICAgKiBEZXNpZ25lZCB0byByZWFkIGRpbWVuc2lvbnMgb2YgcGFkZGluZywgbWFyZ2lucywgZXRjLlxuICAgICAgICAgKiBWYWx1ZXMgb2YgXCJhdXRvXCIgYXJlIHJldHVybmVkIGFzIHplcm86IHNldCBleHBsaWNpdCB2YWx1ZXMgaW5cbiAgICAgICAgICogc3R5bGVzaGVldHMgaW4gb3JkZXIgdG8gYXZvaWQgdGhpcy5cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGdldE1ldHJpYyhlbGVtZW50OiBIVE1MRWxlbWVudCwgbWV0cmljOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICAgICAgbGV0IG1ldHJpY1RleHQ6IHN0cmluZztcbiAgICAgICAgICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xuICAgICAgICAgICAgICAgIG1ldHJpY1RleHQgPVxuICAgICAgICAgICAgICAgICAgICAoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSBhcyBhbnkpW21ldHJpY107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1ldHJpY1RleHQgPSAoZWxlbWVudCBhcyBhbnkpLmN1cnJlbnRTdHlsZVttZXRyaWNdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1ldHJpY1RleHQgPT09ICdhdXRvJyA/IDAgOiBwYXJzZUludChtZXRyaWNUZXh0KSArIDE7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9Eb20vbWV0cmljcy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vU3RhZ2UudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1RlbXBsYXRlcy50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIFByaWNrZXJzXG4gICAgICogU2FkbHkgZm9yIHRzbGludCwgdGhlc2Ugd2lsbCBzaGFkb3cgdGhlIHRvcC1sZXZlbCBuYW1lc3BhY2UgdW50aWwgSSBjYW5cbiAgICAgKiB0aGluayBvZiBhIGJldHRlciBuYW1lLlxuICAgICAqL1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zaGFkb3dlZC12YXJpYWJsZVxuICAgIGV4cG9ydCBuYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAgICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0UHJpY2tlciB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ29uc3RydWN0b3JcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY29uc3RydWN0b3IoXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIF9pZnJhbWU/OiBIVE1MSUZyYW1lRWxlbWVudCxcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIC8vIE5PT1BcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBFdmVudCBoYW5kbGVyIGZvciB3aW5kb3cub25sb2FkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBhYnN0cmFjdCBvbkxvYWQoKTogdm9pZDtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZXNpemVzIHRoZSBwYXJlbnQgaWZyYW1lIGlmIG9uZSBleGlzdHNcbiAgICAgICAgICAgICAqIE1heSBiZSBvdmVycmlkZGVuOyBkZWZhdWx0IGltcGxlbWVudGF0aW9uIHVzZXMgZWxlbWVudHMgdGhhdCBhcmVcbiAgICAgICAgICAgICAqIGltbWVkaWF0ZSBjaGlsZHJlbiBvZiB0aGUgYm9keSBlbGVtZW50IGFzIGZvbGxvd3M6XG4gICAgICAgICAgICAgKiAgLSB3aWR0aDogc3VtIG9mIGFsbCBlbGVtZW50cycgd2lkdGhzIGFuZCBtYXJnaW5zXG4gICAgICAgICAgICAgKiAgLSBoZWlnaHQ6IG1heGltdW0gb2YgYWxsIGVsZW1lbnRzJyBoZWlnaHRzIGFuZCBtYXJnaW5zXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByb3RlY3RlZCByZXNpemUoKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pZnJhbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHRoZURvYyA9ICh0aGlzLl9pZnJhbWUuY29udGVudFdpbmRvdyBhcyBXaW5kb3cpLmRvY3VtZW50O1xuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRzID0gdGhlRG9jLmJvZHkuY2hpbGRyZW47XG4gICAgICAgICAgICAgICAgbGV0IHdpZHRoID0gMDtcbiAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0ID0gMDtcblxuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItZm9yLW9mXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkgPSBpICsgMSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZWxlbWVudHNbaV0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoID0gd2lkdGggKyBEb20uZ2V0V2lkdGgoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IE1hdGgubWF4KGhlaWdodCwgRG9tLmdldEhlaWdodChlbGVtZW50KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5faWZyYW1lLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgIHRoaXMuX2lmcmFtZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFdyYXBzIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIGFuZCBhZGRzIHR5cGUgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJvdGVjdGVkIGdldEVsPFQgZXh0ZW5kcyBIVE1MRWxlbWVudD4oaWQ6IHN0cmluZyk6IFQge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRoZURvYyA9IHRoaXMuX2lmcmFtZVxuICAgICAgICAgICAgICAgICAgICA/ICh0aGlzLl9pZnJhbWUuY29udGVudFdpbmRvdyBhcyBXaW5kb3cpLmRvY3VtZW50XG4gICAgICAgICAgICAgICAgICAgIDogZG9jdW1lbnQ7XG5cbiAgICAgICAgICAgICAgICAvLyBJZ25vcmUgcmlzayBlbGVtZW50cyBtYXkgYmUgbnVsbCB3aGVuIHVzaW5nIG91ciBvd24gdGVtcGxhdGVzXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoZURvYy5nZXRFbGVtZW50QnlJZChpZCkgYXMgVDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vUHJpbnRhYmxlTWl4aW5cIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBNdXNpYyBjbGFzc2VzIHRvIGFuYWx5c2Ugcm93c1xuICAgICAqL1xuICAgIGV4cG9ydCBuYW1lc3BhY2UgTXVzaWMge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnRlcmZhY2Ugc3VwcG9ydGVkIGJ5IGNsYXNzZXMgdGhhdCBjYW4gbWF0Y2ggYSByb3cgZm9yIG11c2ljXG4gICAgICAgICAqL1xuICAgICAgICBleHBvcnQgaW50ZXJmYWNlIE1hdGNoZXJJbnRlcmZhY2UgZXh0ZW5kcyBQcmludGFibGVNaXhpbiB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogTWF0Y2hlcyBhIHJvdyBzdHJpbmdcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbWF0Y2gocm93OiBzdHJpbmcpOiBib29sZWFuO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFByb3ZpZGVzIHJlYWQgYWNjZXNzIHRvIHRoZSBuYW1lXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGdldE5hbWUoKTogc3RyaW5nO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFByb3ZpZGVzIHJlYWQgYWNjZXNzIHRvIHRoZSBjb3VudCBvZiBtYXRjaGVzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGdldE1hdGNoQ291bnQoKTogbnVtYmVyO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9yb3dGcm9tU3RyaW5nLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9TdGFnZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vc3RyaW5nRnJvbVJvdy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiTWF0Y2hlckludGVyZmFjZS50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIE11c2ljIGNsYXNzZXMgdG8gYW5hbHlzZSByb3dzXG4gICAgICovXG4gICAgZXhwb3J0IG5hbWVzcGFjZSBNdXNpYyB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFic3RyYWN0IG11c2ljIG1hdGNoaW5nIHNjaGVtZVxuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0U2NoZW1lIGltcGxlbWVudHMgTWF0Y2hlckludGVyZmFjZSB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogTWF0Y2hlcnMgZm9yIHRoaXMgc2NoZW1lXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByb3RlY3RlZCBfbWF0Y2hlcnM6IE1hdGNoZXJJbnRlcmZhY2VbXTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX3N0YWdlOiBTdGFnZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21hdGNoZXJzID0gdGhpcy5jcmVhdGVNYXRjaGVycyhcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nRnJvbVJvdyhyb3dGcm9tU3RyaW5nKCcnLCBfc3RhZ2UpKSwgIC8vIHJvdW5kc1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIE1hdGNoZXJJbnRlcmZhY2UgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogTWF0Y2hlcyBhIHJvdyBzdHJpbmdcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIG1hdGNoKHJvdzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBtYXRjaGVyIG9mIHRoaXMuX21hdGNoZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghbWF0Y2hlcikgeyBjb250aW51ZTsgfSAgLy8gSUU4IHRyYWlsaW5nIGNvbW1hXG4gICAgICAgICAgICAgICAgICAgIC8vIENhbGwgbWF0Y2hlci5tYXRjaCBleHBsaWNpdGx5Li4uXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvd1Jlc3VsdDogYm9vbGVhbiA9IG1hdGNoZXIubWF0Y2gocm93KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gLi4uIG5vdCBpbiBoZXJlLCBvciB8fCB3aWxsIHNob3J0LWNpcmN1aXQgaXRcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0IHx8IHJvd1Jlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFByb3ZpZGVzIHJlYWQgYWNjZXNzIHRvIHRoZSBuYW1lXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBhYnN0cmFjdCBnZXROYW1lKCk6IHN0cmluZztcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBQcm92aWRlcyByZWFkIGFjY2VzcyB0byB0aGUgY291bnQgb2YgbWF0Y2hlc1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgZ2V0TWF0Y2hDb3VudCgpOiBudW1iZXIge1xuICAgICAgICAgICAgICAgIGxldCBtYXRjaGVzOiBudW1iZXIgPSAwO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBtYXRjaGVyIG9mIHRoaXMuX21hdGNoZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghbWF0Y2hlcikgeyBjb250aW51ZTsgfSAgLy8gSUU4IHRyYWlsaW5nIGNvbW1hXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZXMgKz0gbWF0Y2hlci5nZXRNYXRjaENvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIFByaW50YWJsZU1peGluIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVuZGVycyB0aGUgb2JqZWN0IHdpdGggYSB0ZW1wbGF0ZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgcHJpbnQ6ICh0OiBzdHJpbmcsIGM/OiBUZW1wbGF0ZUNvbnRleHQpID0+IHN0cmluZztcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBQYXRoIGZvciB0aGlzIGNsYXNzJyB0ZW1wbGF0ZXNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IHRlbXBsYXRlUGF0aDogc3RyaW5nID0gJ011c2ljLkFic3RyYWN0U2NoZW1lJztcblxuICAgICAgICAgICAgLyogQWJzdHJhY3RTY2hlbWUgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBDcmVhdGUgbWF0Y2hlcnMgZm9yIHRoaXMgc2NoZW1lL3N0YWdlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBjcmVhdGVNYXRjaGVycyhcbiAgICAgICAgICAgICAgICByb3VuZHM6IHN0cmluZyxcbiAgICAgICAgICAgICk6IE1hdGNoZXJJbnRlcmZhY2VbXTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBQcm92aWRlcyByZWFkIGFjY2VzcyB0byB0aGUgbWF0Y2hlcnNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIGdldE1hdGNoZXJzKCk6IE1hdGNoZXJJbnRlcmZhY2VbXSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hdGNoZXJzLnNsaWNlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIFByaW50YWJsZU1peGluLm1ha2VQcmludGFibGUoQWJzdHJhY3RTY2hlbWUpO1xuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogTXVzaWMgY2xhc3NlcyB0byBhbmFseXNlIHJvd3NcbiAgICAgKi9cbiAgICBleHBvcnQgbmFtZXNwYWNlIE11c2ljIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVHlwZXMgb2YgbXVzaWMgbWF0Y2hpbmdcbiAgICAgICAgICogQGVudW0ge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBlbnVtIE1hdGNoVHlwZSB7QmFjayA9IC0xLCBSb3csIEZyb250fVxuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1RlbXBsYXRlQ29udGV4dC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiTWF0Y2hlckludGVyZmFjZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiTWF0Y2hUeXBlLnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogTXVzaWMgY2xhc3NlcyB0byBhbmFseXNlIHJvd3NcbiAgICAgKi9cbiAgICBleHBvcnQgbmFtZXNwYWNlIE11c2ljIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUGF0dGVybiB0aGF0IGNhbiBiZSB1c2VkIHRvIG1hdGNoIHJvd3NcbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBjbGFzcyBQYXR0ZXJuIGltcGxlbWVudHMgTWF0Y2hlckludGVyZmFjZSB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ291bnQgb2YgbWF0Y2hlc1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcm90ZWN0ZWQgX21hdGNoQ291bnQ6IG51bWJlciA9IDA7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ29uc3RydWN0b3JcbiAgICAgICAgICAgICAqIEBwYXJhbSBwYXR0ZXJuICBzdHJpbmcgdG8gbWF0Y2hcbiAgICAgICAgICAgICAqIEBwYXJhbSBuYW1lICAgICBuYW1lIG9mIHRoaXMgcGF0dGVyblxuICAgICAgICAgICAgICogQHBhcmFtIHR5cGUgICAgIHR5cGUgb2YgbWF0Y2hcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY29uc3RydWN0b3IoXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIF9wYXR0ZXJuOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIF9uYW1lPzogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBfdHlwZTogTWF0Y2hUeXBlID0gTWF0Y2hUeXBlLkJhY2ssXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAvLyBOT09QXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIE1hdGNoZXJJbnRlcmZhY2UgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogTWF0Y2hlcyBhIHJvdyBzdHJpbmdcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIG1hdGNoKHJvdzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3R5cGUgPT09IE1hdGNoVHlwZS5CYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IHJvdy5zbGljZSgtdGhpcy5fcGF0dGVybi5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fdHlwZSA9PT0gTWF0Y2hUeXBlLkZyb250KSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IHJvdy5zbGljZSgwLCB0aGlzLl9wYXR0ZXJuLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJvdyA9PT0gdGhpcy5fcGF0dGVybikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXRjaENvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBQcm92aWRlcyByZWFkIGFjY2VzcyB0byB0aGUgbmFtZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9uYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhdHRlcm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFByb3ZpZGVzIHJlYWQgYWNjZXNzIHRvIHRoZSBjb3VudCBvZiBtYXRjaGVzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBnZXRNYXRjaENvdW50KCk6IG51bWJlciB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hdGNoQ291bnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIFByaW50YWJsZU1peGluIG1ldGhvZHMqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVuZGVycyB0aGUgb2JqZWN0IHdpdGggYSB0ZW1wbGF0ZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgcHJpbnQ6ICh0OiBzdHJpbmcsIGM/OiBUZW1wbGF0ZUNvbnRleHQpID0+IHN0cmluZztcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBQYXRoIGZvciB0aGlzIGNsYXNzJyB0ZW1wbGF0ZXNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IHRlbXBsYXRlUGF0aDogc3RyaW5nID0gJ011c2ljLlBhdHRlcm4nO1xuXG4gICAgICAgICAgICAvKiBQYXR0ZXJuIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIERldGVybWluZXMgd2hldGhlciB0aGlzIGlzIGEgd2lsZGNhcmQgbWF0Y2hcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIGlzV2lsZGNhcmRNYXRjaCgpOiBib29sZWFuIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdHlwZSAhPT0gTWF0Y2hUeXBlLlJvdztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgUHJpbnRhYmxlTWl4aW4ubWFrZVByaW50YWJsZShQYXR0ZXJuKTtcblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9UZW1wbGF0ZUNvbnRleHQudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIk1hdGNoZXJJbnRlcmZhY2UudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlBhdHRlcm4udHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBNdXNpYyBjbGFzc2VzIHRvIGFuYWx5c2Ugcm93c1xuICAgICAqL1xuICAgIGV4cG9ydCBuYW1lc3BhY2UgTXVzaWMge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHcm91cCBvZiBzaW1pbGFyIHBhdHRlcm5zIHRvIG1hdGNoIHJlbGF0ZWQgcm93c1xuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGNsYXNzIFBhdHRlcm5Hcm91cCBpbXBsZW1lbnRzIE1hdGNoZXJJbnRlcmZhY2Uge1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFBhdHRlcm5zIGluIHRoaXMgZ3JvdXBcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJvdGVjdGVkIF9wYXR0ZXJuczogUGF0dGVybltdO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENvbnN0cnVjdG9yXG4gICAgICAgICAgICAgKiBAcGFyYW0gbmFtZSAgICAgICAgICAgbmFtZSBvZiB0aGlzIHBhdHRlcm4gZ3JvdXBcbiAgICAgICAgICAgICAqIEBwYXJhbSBwYXR0ZXJucyAgICAgICBwYXR0ZXJucyBpbiB0aGlzIGdyb3VwXG4gICAgICAgICAgICAgKiBAcGFyYW0gcGFyZW50UGF0dGVybiAgdG9wLWxldmVsIHBhdHRlcm4gZm9yIGNvdW50XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBfbmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHBhdHRlcm5zOiBQYXR0ZXJuW10sXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIF9wYXJlbnRQYXR0ZXJuPzogUGF0dGVybixcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhdHRlcm5zID0gcGF0dGVybnMuc2xpY2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogTWF0Y2hlckludGVyZmFjZSBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBNYXRjaGVzIGEgcm93IHN0cmluZ1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgbWF0Y2gocm93OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHBhdHRlcm4gb2YgdGhpcy5fcGF0dGVybnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXR0ZXJuKSB7IGNvbnRpbnVlOyB9ICAvLyBJRTggdHJhaWxpbmcgY29tbWFcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FsbCBwYXR0ZXJuLm1hdGNoIGV4cGxpY2l0bHkuLi5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93UmVzdWx0OiBib29sZWFuID0gcGF0dGVybi5tYXRjaChyb3cpO1xuICAgICAgICAgICAgICAgICAgICAvLyAuLi4gbm90IGluIGhlcmUsIG9yIHx8IHdpbGwgc2hvcnQtY2lyY3VpdCBpdFxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgfHwgcm93UmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wYXJlbnRQYXR0ZXJuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhcmVudFBhdHRlcm4ubWF0Y2gocm93KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFByb3ZpZGVzIHJlYWQgYWNjZXNzIHRvIHRoZSBuYW1lXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUHJvdmlkZXMgcmVhZCBhY2Nlc3MgdG8gdGhlIGNvdW50IG9mIG1hdGNoZXNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIGdldE1hdGNoQ291bnQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcGFyZW50UGF0dGVybikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50UGF0dGVybi5nZXRNYXRjaENvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFN1Ym1hdGNoQ291bnQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogUHJpbnRhYmxlTWl4aW4gbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZW5kZXJzIHRoZSBvYmplY3Qgd2l0aCBhIHRlbXBsYXRlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBwcmludDogKHQ6IHN0cmluZywgYz86IFRlbXBsYXRlQ29udGV4dCkgPT4gc3RyaW5nO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFBhdGggZm9yIHRoaXMgY2xhc3MnIHRlbXBsYXRlc1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdGVtcGxhdGVQYXRoOiBzdHJpbmcgPSAnTXVzaWMuUGF0dGVybkdyb3VwJztcblxuICAgICAgICAgICAgLyogUGF0dGVybkdyb3VwIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBQcm92aWRlcyByZWFkIGFjY2VzcyB0byB0aGUgcGF0dGVybnNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIGdldFBhdHRlcm5zKCk6IFBhdHRlcm5bXSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhdHRlcm5zLnNsaWNlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUHJvdmlkZXMgcmVhZCBhY2Nlc3MgdG8gdGhlIGNvdW50IG9mIG1hdGNoZXMgd2l0aGluIHBhdHRlcm5zXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBnZXRTdWJtYXRjaENvdW50KCk6IG51bWJlciB7XG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoZXM6IG51bWJlciA9IDA7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHBhdHRlcm4gb2YgdGhpcy5fcGF0dGVybnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXR0ZXJuKSB7IGNvbnRpbnVlOyB9ICAvLyBJRTggdHJhaWxpbmcgY29tbWFcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcyArPSBwYXR0ZXJuLmdldE1hdGNoQ291bnQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgUHJpbnRhYmxlTWl4aW4ubWFrZVByaW50YWJsZShQYXR0ZXJuR3JvdXApO1xuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLyogdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9TdGFnZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQWJzdHJhY3RTY2hlbWUudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIk1hdGNoVHlwZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiUGF0dGVybi50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiUGF0dGVybkdyb3VwLnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogTXVzaWMgY2xhc3NlcyB0byBhbmFseXNlIHJvd3NcbiAgICAgKi9cbiAgICBleHBvcnQgbmFtZXNwYWNlIE11c2ljIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogTUJELXN0eWxlIG11c2ljIG1hdGNoaW5nIHNjaGVtZVxuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGNsYXNzIE1iZFNjaGVtZSBleHRlbmRzIEFic3RyYWN0U2NoZW1lIHtcblxuICAgICAgICAgICAgLyogTWF0Y2hlckludGVyZmFjZSBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBQcm92aWRlcyByZWFkIGFjY2VzcyB0byB0aGUgbmFtZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgICAgICAgICAgICAgIHJldHVybiAnTUJEIHNjaGVtZSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIEFic3RyYWN0U2NoZW1lIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ3JlYXRlIG1hdGNoZXJzIGZvciB0aGlzIHNjaGVtZS9zdGFnZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlTWF0Y2hlcnMocm91bmRzOiBzdHJpbmcpOiBNYXRjaGVySW50ZXJmYWNlW10ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoZXJzOiBNYXRjaGVySW50ZXJmYWNlW10gPSBbIF07XG4gICAgICAgICAgICAgICAgbGV0IHBhdHRlcm46IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybkFycmF5OiBQYXR0ZXJuW107XG5cbiAgICAgICAgICAgICAgICAvLyA1Njc4OTBFXG4gICAgICAgICAgICAgICAgcGF0dGVybiA9IHJvdW5kcy5zbGljZSg0IC0gdGhpcy5fc3RhZ2UpO1xuICAgICAgICAgICAgICAgIG1hdGNoZXJzLnB1c2gobmV3IFBhdHRlcm4ocGF0dGVybikpO1xuXG4gICAgICAgICAgICAgICAgLy8gNTY3ODlFMFxuICAgICAgICAgICAgICAgIHBhdHRlcm4gPSByb3VuZHMuc2xpY2UoNCAtIHRoaXMuX3N0YWdlLCAtMilcbiAgICAgICAgICAgICAgICAgICAgKyByb3VuZHMuc2xpY2UoLTEpXG4gICAgICAgICAgICAgICAgICAgICsgcm91bmRzLnNsaWNlKC0yLCAtMSk7XG4gICAgICAgICAgICAgICAgbWF0Y2hlcnMucHVzaChuZXcgUGF0dGVybihwYXR0ZXJuKSk7XG5cbiAgICAgICAgICAgICAgICAvLyA2NTc4OTBFXG4gICAgICAgICAgICAgICAgcGF0dGVybiA9ICc2NScgKyByb3VuZHMuc2xpY2UoNiAtIHRoaXMuX3N0YWdlKTtcbiAgICAgICAgICAgICAgICBtYXRjaGVycy5wdXNoKG5ldyBQYXR0ZXJuKHBhdHRlcm4pKTtcblxuICAgICAgICAgICAgICAgIC8vIE5lYXIgbWlzc2VzXG4gICAgICAgICAgICAgICAgcGF0dGVybkFycmF5ID0gWyBdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLl9zdGFnZSAtIDE7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuID0gcm91bmRzLnNsaWNlKDAsIGkpICAvLyAxMjNcbiAgICAgICAgICAgICAgICAgICAgICAgICsgcm91bmRzLmNoYXJBdChpICsgMSkgICAgLy8gNVxuICAgICAgICAgICAgICAgICAgICAgICAgKyByb3VuZHMuY2hhckF0KGkpICAgICAgICAvLyA0XG4gICAgICAgICAgICAgICAgICAgICAgICArIHJvdW5kcy5zbGljZShpICsgMik7ICAgIC8vIDY3ODkwRVxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuQXJyYXkucHVzaChuZXcgUGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm4sXG4gICAgICAgICAgICAgICAgICAgICAgICByb3VuZHMuY2hhckF0KGkgKyAxKSArIHJvdW5kcy5jaGFyQXQoaSksXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRjaFR5cGUuUm93LFxuICAgICAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbWF0Y2hlcnMucHVzaChuZXcgUGF0dGVybkdyb3VwKCduZWFyIG1pc3NlcycsIHBhdHRlcm5BcnJheSkpO1xuXG4gICAgICAgICAgICAgICAgLy8gUXVlZW5zIG11c2ljXG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnN3aXRjaC1kZWZhdWx0XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLl9zdGFnZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFN0YWdlLlRyaXBsZXM6XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVycy5wdXNoKG5ldyBQYXR0ZXJuR3JvdXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzQ2OCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMjQ2JywgJzI0NjgnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzc1MzQ2JywgJzc1MzQ2OCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMTM1NzI0NicsICdRdWVlbnMnLCBNYXRjaFR5cGUuUm93KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzc1MzEyNDYnLCAnUmV2ZXJzZSBRdWVlbnMnLCBNYXRjaFR5cGUuUm93KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzEyNzUzNDYnLCAnV2hpdHRpbmd0b25zJywgTWF0Y2hUeXBlLlJvdyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignNDYnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTdGFnZS5DYXRlcnM6XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVycy5wdXNoKG5ldyBQYXR0ZXJuR3JvdXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzY4MCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignNDY4JywgJzQ2ODAnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzk3NTY4JywgJzk3NTY4MCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMTM1NzkyNDY4JywgJ1F1ZWVucycsIE1hdGNoVHlwZS5Sb3cpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignOTc1MzEyNDY4JywgJ1JldmVyc2UgUXVlZW5zJywgTWF0Y2hUeXBlLlJvdyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCcxMjM0OTc1NjgnLCAnV2hpdHRpbmd0b25zJywgTWF0Y2hUeXBlLlJvdyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignNjgnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTdGFnZS5DaW5xdWVzOlxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcnMucHVzaChuZXcgUGF0dGVybkdyb3VwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc4MFQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzY4MCcsICc2ODBUJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCdFOTc4MCcsICdFOTc4MFQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzEzNTc5RTI0NjgwJywgJ1F1ZWVucycsIE1hdGNoVHlwZS5Sb3cpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignRTk3NTMxMjQ2ODAnLCAnUmV2ZXJzZSBRdWVlbnMnLCBNYXRjaFR5cGUuUm93KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzUzMTI0NkU5NzgwJywgJ0RvdWJsZSBXaGl0dGluZ3RvbnMnLCBNYXRjaFR5cGUuUm93KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCc4MCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIFN0YWdlLlNleHR1cGxlczpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXJzLnB1c2gobmV3IFBhdHRlcm5Hcm91cChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnMFRCJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCc4MFQnLCAnODBUQicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignQUU5MFQnLCAnQUU5MFRCJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCcxMzU3OUVBMjQ2ODBUJywgJ1F1ZWVucycsIE1hdGNoVHlwZS5Sb3cpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignQUU5NzUzMTI0NjgwVCcsICdSZXZlcnNlIFF1ZWVucycsIE1hdGNoVHlwZS5Sb3cpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzBUJyksXG4gICAgICAgICAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU3RhZ2UuU2VwdHVwbGVzOlxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcnMucHVzaChuZXcgUGF0dGVybkdyb3VwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdUQicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMFRCJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCdDQUVUQicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMTM1NzlFQUMyNDY4MFRCJywgJ1F1ZWVucycsIE1hdGNoVHlwZS5Sb3cpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignQ0FFOTc1MzEyNDY4MFRCJywgJ1JldmVyc2UgUXVlZW5zJywgTWF0Y2hUeXBlLlJvdyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignVEInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbWF0Y2hlcnMucHVzaChuZXcgUGF0dGVybkdyb3VwKFxuICAgICAgICAgICAgICAgICAgICAnZnJvbnQgTEI1JyxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzEyMzQ1JywgJzEyMzQ1JywgTWF0Y2hUeXBlLkZyb250KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCc1NDMyMScsICc1NDMyMScsIE1hdGNoVHlwZS5Gcm9udCksXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMjM0NTYnLCAnMjM0NTYnLCBNYXRjaFR5cGUuRnJvbnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzY1NDMyJywgJzY1NDMyJywgTWF0Y2hUeXBlLkZyb250KSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICApKTtcblxuICAgICAgICAgICAgICAgIG1hdGNoZXJzLnB1c2gobmV3IFBhdHRlcm5Hcm91cChcbiAgICAgICAgICAgICAgICAgICAgJ2JhY2sgTEI1JyxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzEyMzQ1JywgJzEyMzQ1JywgTWF0Y2hUeXBlLkJhY2spLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzU0MzIxJywgJzU0MzIxJywgTWF0Y2hUeXBlLkJhY2spLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzIzNDU2JywgJzIzNDU2JywgTWF0Y2hUeXBlLkJhY2spLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzY1NDMyJywgJzY1NDMyJywgTWF0Y2hUeXBlLkJhY2spLFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICkpO1xuXG4gICAgICAgICAgICAgICAgbWF0Y2hlcnMucHVzaChuZXcgUGF0dGVybkdyb3VwKFxuICAgICAgICAgICAgICAgICAgICAnZnJvbnQgTEI0JyxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzEyMzQnLCAnMTIzNCcsIE1hdGNoVHlwZS5Gcm9udCksXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignNDMyMScsICc0MzIxJywgTWF0Y2hUeXBlLkZyb250KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCcyMzQ1JywgJzIzNDUnLCBNYXRjaFR5cGUuRnJvbnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzU0MzInLCAnNTQzMicsIE1hdGNoVHlwZS5Gcm9udCksXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMzQ1NicsICczNDU2JywgTWF0Y2hUeXBlLkZyb250KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCc2NTQzJywgJzY1NDMnLCBNYXRjaFR5cGUuRnJvbnQpLFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICkpO1xuXG4gICAgICAgICAgICAgICAgbWF0Y2hlcnMucHVzaChuZXcgUGF0dGVybkdyb3VwKFxuICAgICAgICAgICAgICAgICAgICAnYmFjayBMQjQnLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignMTIzNCcsICcxMjM0JywgTWF0Y2hUeXBlLkJhY2spLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzQzMjEnLCAnNDMyMScsIE1hdGNoVHlwZS5CYWNrKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCcyMzQ1JywgJzIzNDUnLCBNYXRjaFR5cGUuQmFjayksXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybignNTQzMicsICc1NDMyJywgTWF0Y2hUeXBlLkJhY2spLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4oJzM0NTYnLCAnMzQ1NicsIE1hdGNoVHlwZS5CYWNrKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuKCc2NTQzJywgJzY1NDMnLCBNYXRjaFR5cGUuQmFjayksXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgKSk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZXZlcnNlIHJvbGx1cHNcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3RhZ2UgPT09IFN0YWdlLlRyaXBsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcnMucHVzaChuZXcgUGF0dGVybkdyb3VwKCdyZXZlcnNlIHJvbGx1cHMnLCBbbmV3IFBhdHRlcm4oJzc2NTQnKV0pKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuQXJyYXkgPSBbIF07XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IHRoaXMuX3N0YWdlIC0gODsgaSA+PSAwOyBpIC09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJldmVyc2Ugcm91bmRzXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuID0gcm91bmRzLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuID0gcGF0dGVybi5zbGljZShpLCBpICsgNCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuQXJyYXkucHVzaChuZXcgUGF0dGVybihwYXR0ZXJuKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcnMucHVzaChuZXcgUGF0dGVybkdyb3VwKCdyZXZlcnNlIHJvbGx1cHMnLCBwYXR0ZXJuQXJyYXkpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlcnM7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vQWJzdHJhY3RTaXgudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1Jvdy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQWJzdHJhY3QudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBWaXNpdG9yIGNsYXNzZXMgdG8gYW5hbHlzZSBibG9ja3NcbiAgICAgKi9cbiAgICBleHBvcnQgbmFtZXNwYWNlIFZpc2l0b3Ige1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaW1wbGUgdmlzaXRvciB0aGF0IGNvdW50cyByb3dzXG4gICAgICAgICAqXG4gICAgICAgICAqIEFjY3VtdWxhdGVzIGEgY291bnQgb2Ygcm93cyB0aGF0IGlzIGluY3JlbWVudGVkIGJ5IGVhY2ggY2FsbCB0b1xuICAgICAgICAgKiBbW3Zpc2l0XV0uXG4gICAgICAgICAqIFRoaXMgdmlzaXRvciBhbGxvd3MgdGhlIGNvdW50IG9mIHJvd3MgaW4gYSB0b3VjaCBiZWNhdXNlIHJvd3MgYXJlIG5vdFxuICAgICAgICAgKiBwcm9jZXNzZWQgYWZ0ZXIgcm91bmRzIGhhcyBiZWVuIHJlYWNoZWQuXG4gICAgICAgICAqL1xuICAgICAgICBleHBvcnQgY2xhc3MgQ291bnRlciBleHRlbmRzIEFic3RyYWN0VmlzaXRvciB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ291bnQgb2Ygcm93cyB0aGF0IGhhdmUgYmVlbiB2aXNpdGVkLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF9jb3VudDogbnVtYmVyID0gMDtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZXBvcnRzIHRoZSBjb3VudCBvZiByb3dzIGJ5IHByb3ZpZGluZyBwdWJsaWMgYWNjZXNzIHRvXG4gICAgICAgICAgICAgKiBbW19jb3VudF1dLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgZ2V0Q291bnQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY291bnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIEFic3RyYWN0VmlzaXRvciBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVjZWl2ZXMgYSByb3cgZm9yIHByb2Nlc3NpbmcuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByb3RlY3RlZCB2aXNpdEltcGxlbWVudGF0aW9uKHJvdzogUm93LCBzaXg/OiBBYnN0cmFjdFNpeCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvdW50ICs9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0Fic3RyYWN0U2l4LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9CbG9ja0RpcmVjdG9yeS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vUm93LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9zdHJpbmdGcm9tUm93LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9NdXNpYy9NYXRjaGVySW50ZXJmYWNlLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJBYnN0cmFjdC50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIFZpc2l0b3IgY2xhc3NlcyB0byBhbmFseXNlIGJsb2Nrc1xuICAgICAqL1xuICAgIGV4cG9ydCBuYW1lc3BhY2UgVmlzaXRvciB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZpc2l0b3IgZm9yIG11c2ljIGFuYWx5c2lzXG4gICAgICAgICAqXG4gICAgICAgICAqIE1hdGNoZXMgcm93cyB1c2luZyBhIG11c2ljIG1hdGNoZXIgKFtbTWF0Y2hlckludGVyZmFjZV1dKSB0aGF0IGNhblxuICAgICAgICAgKiByZXBvcnQgb24gdGhlIG11c2ljYWwgY29udGVudCBvZiBhIHRvdWNoLlxuICAgICAgICAgKiBUaGlzIHZpc2l0b3IgYWxzbyBhY2N1bXVsYXRlcyBhIFtbQmxvY2tEaXJlY3RvcnldXSByZWZlcmVuY2luZ1xuICAgICAgICAgKiBlYWNoIGJsb2NrIGNvbnRhaW5pbmcgYSBtdXNpY2FsIHJvdy5cbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBjbGFzcyBNdXNpYyBleHRlbmRzIEFic3RyYWN0VmlzaXRvciB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRGlyZWN0b3J5IG9mIG11c2ljYWwgYmxvY2tzLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF9kaXJlY3Rvcnk6IEJsb2NrRGlyZWN0b3J5ID0gbmV3IEJsb2NrRGlyZWN0b3J5KCk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ3JlYXRlcyB0aGUgdmlzaXRvciwgcHJvdmlkaW5nIHRoZSBtYXRjaGVyIHRoYXQgc2hvdWxkIGJlIHVzZWQuXG4gICAgICAgICAgICAgKiBAcGFyYW0gX21hdGNoZXIgTWF0Y2hlciB0byBiZSB1c2VkLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX21hdGNoZXI6IE11c2ljLk1hdGNoZXJJbnRlcmZhY2UpIHtcbiAgICAgICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlcG9ydHMgb24gbXVzaWNhbCBjb250ZW50IG9mIGEgdG91Y2ggYnkgcHJvdmlkaW5nIHB1YmxpYyBhY2Nlc3NcbiAgICAgICAgICAgICAqIHRvIFtbX21hdGNoZXJdXS5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIGdldE1hdGNoZXIoKTogTXVzaWMuTWF0Y2hlckludGVyZmFjZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hdGNoZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVwb3J0cyB3aGVyZSBtdXNpYyBpcyBmb3VuZCB3aXRoaW4gYSB0b3VjaCBieSBwcm92aWRpbmcgcHVibGljXG4gICAgICAgICAgICAgKiBhY2Nlc3MgdG8gW1tfZGlyZWN0b3J5XV0uXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBnZXREaXJlY3RvcnkoKTogQmxvY2tEaXJlY3Rvcnkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kaXJlY3Rvcnk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIEFic3RyYWN0VmlzaXRvciBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVjZWl2ZXMgYSByb3cgZm9yIHByb2Nlc3NpbmcuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByb3RlY3RlZCB2aXNpdEltcGxlbWVudGF0aW9uKHJvdzogUm93LCBzaXg/OiBBYnN0cmFjdFNpeCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSB0aGlzLl9tYXRjaGVyLm1hdGNoKHN0cmluZ0Zyb21Sb3cocm93KSk7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMgJiYgc2l4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RpcmVjdG9yeS5hZGQoc2l4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0Fic3RyYWN0U2l4LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9CbG9ja0RpcmVjdG9yeS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vUm93LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9zdHJpbmdGcm9tUm93LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJBYnN0cmFjdC50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIFZpc2l0b3IgY2xhc3NlcyB0byBhbmFseXNlIGJsb2Nrc1xuICAgICAqL1xuICAgIGV4cG9ydCBuYW1lc3BhY2UgVmlzaXRvciB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZpc2l0b3IgZm9yIHByb3ZpbmcgdG91Y2hlc1xuICAgICAgICAgKlxuICAgICAgICAgKiBTdG9yZXMgdGhlIHJvd3MgdGhhdCBoYXZlIGJlZW4gdmlzaXRlZCBhbmQgcmVwb3J0cyB3aGVuIHdoZXRoZXIgYW55XG4gICAgICAgICAqIHJvd3Mgd2VyZSByZXBlYXRlZC5cbiAgICAgICAgICogVGhpcyB2aXNpdG9yIGFsc28gYWNjdW11bGF0ZXMgYSBbW0Jsb2NrRGlyZWN0b3J5XV0gcmVmZXJlbmNpbmdcbiAgICAgICAgICogZWFjaCBibG9jayBjb250YWluaW5nIGEgZmFsc2Ugcm93LlxuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGNsYXNzIFByb29mIGV4dGVuZHMgQWJzdHJhY3RWaXNpdG9yIHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBMb2cgb2Ygcm93cyB0aGF0IHdlJ3ZlIHNlZW4uXG4gICAgICAgICAgICAgKiBSb3dzIGFyZSBhY2N1bXVsYXRlZCBpbnRvIGEgZGljdGlvbmFyeSBpbmRleGVkIGJ5IHRoZSBzdHJpbmdcbiAgICAgICAgICAgICAqIHJlcHJlc2VudGF0aW9uIG9mIGEgcm93ICh0aGUgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiB3aWxsIHRodXNcbiAgICAgICAgICAgICAqIHN0b3JlIGEgaGFzaCB0YWJsZSwgZW5zdXJpbmcgZ29vZCBwZXJmb3JtYW5jZSkuXG4gICAgICAgICAgICAgKiBFYWNoIHZhbHVlIGlzIGFuIGFycmF5IG9mIGFsbCBibG9ja3MgdGhhdCBjb250YWluIHRoZSBpbmRleGVkXG4gICAgICAgICAgICAgKiByb3cuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByaXZhdGUgX3Jvd0NvdW50czpcbiAgICAgICAgICAgICAgICB7IFtpbmRleDogc3RyaW5nXTogQXJyYXk8QWJzdHJhY3RTaXggfCB1bmRlZmluZWQ+IH0gPSB7IH07XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRGlyZWN0b3J5IG9mIGZhbHNlIGJsb2Nrcy5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJpdmF0ZSBfZGlyZWN0b3J5OiBCbG9ja0RpcmVjdG9yeSA9IG5ldyBCbG9ja0RpcmVjdG9yeSgpO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEZsYWcgcmVjb3JkaW5nIHRydXRoLlxuICAgICAgICAgICAgICogVHJ1dGggY2FuIGVhc2lseSBiZSBjYWxjdWxhdGVkIGZyb20gW1tfcm93Q291bnRzXV0sIGJ1dCBrZWVwaW5nIGFcbiAgICAgICAgICAgICAqIGZsYWcgdXAtdG8tZGF0ZSBpcyBhIHNpbXBsZSBvcHRpbWlzYXRpb24gdG8gYXZvaWQgaXRlcmF0aW5nIG92ZXJcbiAgICAgICAgICAgICAqIHRoaXMgcHJvcGVydHkgZWFjaCB0aW1lIHdlIGNoZWNrIHRydXRoLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF9pc1RydWU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlcG9ydHMgdGhlIG51bWJlciBvZiB0aW1lcyBlYWNoIHJvdyBoYXMgYmVlbiBwcm9jZXNzZWQuXG4gICAgICAgICAgICAgKiBQcm9jZXNzZXMgW1tfcm93Q291bnRzXV0gdG8gY29udmVydCBlYWNoIGFycmF5IG9mIGJsb2NrcyBpbnRvIGFcbiAgICAgICAgICAgICAqIGNvdW50LlxuICAgICAgICAgICAgICogQHJldHVybnMgRGljdGlvbmFyeSBjb250YWluaW5nIHRoZSBjb3VudCBvZiBlYWNoIHJvdyBzZWVuLFxuICAgICAgICAgICAgICogaW5kZXhlZCBieSB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoYXQgcm93LlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgZ2V0Um93Q291bnRzKCk6IHsgW2luZGV4OiBzdHJpbmddOiBudW1iZXIgfSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OiB7IFtpbmRleDogc3RyaW5nXTogbnVtYmVyIH0gPSB7IH07XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHJvd1N0cmluZyBpbiB0aGlzLl9yb3dDb3VudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Jvd0NvdW50cy5oYXNPd25Qcm9wZXJ0eShyb3dTdHJpbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbcm93U3RyaW5nXSA9IHRoaXMuX3Jvd0NvdW50c1tyb3dTdHJpbmddLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVwb3J0cyBvbiB0aGUgZGlzdHJpYnV0aW9uIG9mIGZhbHNlbmVzcyB3aXRoaW4gYSB0b3VjaCBieVxuICAgICAgICAgICAgICogcHJvdmlkaW5nIHB1YmxpYyBhY2Nlc3MgdG8gW1tfZGlyZWN0b3J5XV0uXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBnZXREaXJlY3RvcnkoKTogQmxvY2tEaXJlY3Rvcnkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kaXJlY3Rvcnk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVwb3J0cyB3aGV0aGVyIGEgdG91Y2ggaXMgdHJ1ZSBieSBwcm92aWRpbmcgcHVibGljIGFjY2VzcyB0b1xuICAgICAgICAgICAgICogW1tfaXNUcnVlXV0uXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBpc1RydWUoKTogYm9vbGVhbiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzVHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogQWJzdHJhY3RWaXNpdG9yIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZWNlaXZlcyBhIHJvdyBmb3IgcHJvY2Vzc2luZy5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJvdGVjdGVkIHZpc2l0SW1wbGVtZW50YXRpb24ocm93OiBSb3csIHNpeD86IEFic3RyYWN0U2l4KTogdm9pZCB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm93U3RyaW5nOiBzdHJpbmcgPSBzdHJpbmdGcm9tUm93KHJvdyk7XG5cbiAgICAgICAgICAgICAgICBpZiAocm93U3RyaW5nIGluIHRoaXMuX3Jvd0NvdW50cykge1xuICAgICAgICAgICAgICAgICAgICAvLyBBbHJlYWR5IHNlZW4gLSBpLmUuIGZhbHNlXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Jvd0NvdW50c1tyb3dTdHJpbmddLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmlyc3QgdGltZSB0aGlzIHJvdyBoYXMgcnVuIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZWVkIHRvIGFkZCB0aGUgcHJldmlvdXMgYmxvY2sgdG8gdGhlIGRpcmVjdG9yeVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXNTaXggPSB0aGlzLl9yb3dDb3VudHNbcm93U3RyaW5nXVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1NpeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RpcmVjdG9yeS5hZGQocHJldmlvdXNTaXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNUcnVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RpcmVjdG9yeS5hZGQoc2l4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dDb3VudHNbcm93U3RyaW5nXS5wdXNoKHNpeCk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBOb3Qgc2VlbiAtIGkuZS4gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dDb3VudHNbcm93U3RyaW5nXSA9IFtzaXhdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQWJzdHJhY3QudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0Jsb2NrRGlyZWN0b3J5LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9Db3Vyc2UudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL05vdGlmaWFibGUudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1ByaW50YWJsZU1peGluLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9yb3dGcm9tU3RyaW5nLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9Sb3cudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1NpeFR5cGUudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1N0YWdlLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9zdHJpbmdGcm9tUm93LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9Ub3VjaC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vTXVzaWMvTWJkU2NoZW1lLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9WaXNpdG9yL0NvdW50ZXIudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1Zpc2l0b3IvTXVzaWMudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1Zpc2l0b3IvUHJvb2YudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICBlbnVtIEJsb2NrIHtDb3Vyc2UsIFRvdWNofVxuXG4gICAgLyoqXG4gICAgICogUHJpY2tlcnNcbiAgICAgKiBTYWRseSBmb3IgdHNsaW50LCB0aGVzZSB3aWxsIHNoYWRvdyB0aGUgdG9wLWxldmVsIG5hbWVzcGFjZSB1bnRpbCBJIGNhblxuICAgICAqIHRoaW5rIG9mIGEgYmV0dGVyIG5hbWUuXG4gICAgICovXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXNoYWRvd2VkLXZhcmlhYmxlXG4gICAgZXhwb3J0IG5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQW4gTUJEIHByaWNrZXJcbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBjbGFzcyBNYmQgZXh0ZW5kcyBBYnN0cmFjdFByaWNrZXJcbiAgICAgICAgICAgIGltcGxlbWVudHMgTm90aWZpYWJsZSwgUHJpbnRhYmxlTWl4aW4ge1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFN0YWdlIHdlJ3JlIHByaWNraW5nIG9uXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByaXZhdGUgX3N0YWdlOiBTdGFnZTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBDYWNoZSBvZiB0aGUgaW5pdGlhbCByb3cgZm9yIHRoaXMgc3RhZ2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJpdmF0ZSBfaW5pdGlhbFJvdzogUm93O1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRoZSBjb3Vyc2UgaXRzZWxmXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByaXZhdGUgX2NvdXJzZTogQ291cnNlO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEFkZGl0aW9uYWwgc2l4ZXMgZGlzcGxheWVkIGFmdGVyIHRoZSBjb3Vyc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJpdmF0ZSBfZXh0cmFTaXhlczogQ291cnNlO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENvdXJzZSBiZWluZyBzYXZlZCBmb3IgbGF0ZXJcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJpdmF0ZSBfc2F2ZWRDb3Vyc2U6IENvdXJzZSB8IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUb3VjaCBiZWluZyBjb21wb3NlZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF90b3VjaDogVG91Y2g7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogV2hldGhlciB3ZSdyZSBzaG93aW5nIHNpeCBoZWFkc1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF9zaG93U2l4SGVhZHM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBDb3Vyc2Ugc2VsZWN0ZWQgaW4gdG91Y2ggdmlld1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF9zZWxlY3RlZEluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEluZGV4IG9mIGNvdXJzZSBjb3BpZWQgZnJvbSB0b3VjaCB2aWV3XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByaXZhdGUgX2NvcGllZEluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ291bnQgb2Ygcm93cyBpbiB0b3VjaFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF9yb3dDb3VudDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlcG9ydCBvZiB0b3VjaCBwcm9vZiBzdGF0dXNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJpdmF0ZSBfcHJvb2ZUZXh0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRGlyZWN0b3J5IG9mIGZhbHNlIHNpeGVzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByaXZhdGUgX2ZhbHNlbmVzczogQmxvY2tEaXJlY3RvcnkgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogTXVzaWMgc2NoZW1lIGluIHVzZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwcml2YXRlIF9tdXNpY1NjaGVtZTogTXVzaWMuTWJkU2NoZW1lO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIERpcmVjdG9yeSBvZiBtdXNpY2FsIHNpeGVzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByaXZhdGUgX211c2ljOiBCbG9ja0RpcmVjdG9yeSB8IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgLyogTm90aWZpYWJsZSBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZWNlaXZlcyBhIG5vdGlmaWNhdGlvbiBmcm9tIGEgYmxvY2sgdGhhdCBoYXMgY2hhbmdlZFxuICAgICAgICAgICAgICogQHBhcmFtIGluZGV4ICBpbmRleCBvZiBjaGFuZ2VkIGJsb2NrIGluIGNvbnRhaW5lclxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgbm90aWZ5KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IEJsb2NrLkNvdXJzZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9leHRyYVNpeGVzLnNldEluaXRpYWxSb3codGhpcy5fY291cnNlLmdldEVuZCgpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29waWVkSW5kZXggPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gQmxvY2suVG91Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93Q291bnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Byb29mVGV4dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmFsc2VuZXNzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tdXNpYyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogUHJpbnRhYmxlTWl4aW4gbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZW5kZXJzIHRoZSBvYmplY3Qgd2l0aCBhIHRlbXBsYXRlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBwcmludDogKHQ6IHN0cmluZywgYz86IFRlbXBsYXRlQ29udGV4dCkgPT4gc3RyaW5nO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFBhdGggZm9yIHRoaXMgY2xhc3MnIHRlbXBsYXRlc1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdGVtcGxhdGVQYXRoOiBzdHJpbmcgPSAnUHJpY2tlci5NYmQnO1xuXG4gICAgICAgICAgICAvKiBQcmlja2VyIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICBwdWJsaWMgb25Mb2FkKCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIGxldCBvcHRpb246IEhUTUxPcHRpb25FbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IFN0YWdlLlRyaXBsZXM7IGkgPD0gU3RhZ2UuU2VwdHVwbGVzOyBpICs9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmlubmVyVGV4dCA9IFN0YWdlW2ldO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEVsKCdzdGFnZScpLmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RWw8SFRNTFNlbGVjdEVsZW1lbnQ+KCdzdGFnZScpLnZhbHVlID1cbiAgICAgICAgICAgICAgICAgICAgU3RhZ2UuQ2lucXVlcy50b1N0cmluZygpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vblN0YWdlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBvblN0YWdlKCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YWdlID1cbiAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQodGhpcy5nZXRFbDxIVE1MU2VsZWN0RWxlbWVudD4oJ3N0YWdlJykudmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2luaXRpYWxSb3cgPSByb3dGcm9tU3RyaW5nKCcyMzEnLCB0aGlzLl9zdGFnZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2UgPSBuZXcgQ291cnNlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbml0aWFsUm93LFxuICAgICAgICAgICAgICAgICAgICB7J2NvbnRhaW5lcic6IHRoaXMsICdpbmRleCc6IEJsb2NrLkNvdXJzZX0sXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9leHRyYVNpeGVzID0gbmV3IENvdXJzZSh0aGlzLl9pbml0aWFsUm93KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9leHRyYVNpeGVzLnNldExlbmd0aCg4KTtcbiAgICAgICAgICAgICAgICB0aGlzLl90b3VjaCA9IG5ldyBUb3VjaChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5pdGlhbFJvdyxcbiAgICAgICAgICAgICAgICAgICAgeydjb250YWluZXInOiB0aGlzLCAnaW5kZXgnOiBCbG9jay5Ub3VjaH0sXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tdXNpY1NjaGVtZSA9IG5ldyBNdXNpYy5NYmRTY2hlbWUodGhpcy5fc3RhZ2UpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJpdmF0ZSByZWRyYXcoKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Q291cnNlID0gdGhpcy5fY291cnNlLmNsb25lKCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0U2l4ID0gdGhpcy5fY291cnNlLmdldFNpeCh0aGlzLl9jb3Vyc2UuZ2V0TGVuZ3RoKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2V4dHJhU2l4ZXMuc2V0Rmlyc3RTaXhUeXBlKChsYXN0U2l4LnR5cGUgKyAxKSAlIDIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2V4dHJhU2l4ZXMuc2V0SW5pdGlhbFJvdyh0aGlzLl9jb3Vyc2UuZ2V0RW5kKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RWwoJ3NpeGVuZHMnKS5pbm5lckhUTUwgPSB0aGlzLl9jb3Vyc2UucHJpbnQoJ21iZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgJ2ZhbHNlbmVzcyc6IHRoaXMuX2ZhbHNlbmVzcyxcbiAgICAgICAgICAgICAgICAgICAgJ211c2ljJzogdGhpcy5fbXVzaWMsXG4gICAgICAgICAgICAgICAgICAgICdjb3Vyc2VJbmRleCc6IHRoaXMuX2NvcGllZEluZGV4LFxuICAgICAgICAgICAgICAgICAgICAnZXh0cmFTaXhlcyc6IHRoaXMuX2V4dHJhU2l4ZXMsXG4gICAgICAgICAgICAgICAgICAgICdzaG93U2l4SGVhZHMnOiB0aGlzLl9zaG93U2l4SGVhZHMsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmdldEVsKCdjYWxsaW5nJykuaW5uZXJIVE1MID0gdGhpcy5fY291cnNlLnByaW50KCdodG1sJyk7XG5cbiAgICAgICAgICAgICAgICBuZXdDb3Vyc2Uuc2V0SW5pdGlhbFJvdyh0aGlzLl9pbml0aWFsUm93KTtcbiAgICAgICAgICAgICAgICBuZXdDb3Vyc2Uuc2V0Rmlyc3RTaXhUeXBlKFNpeFR5cGUuU2xvdyk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRFbCgnY2FsbGluZ0Zyb21Sb3VuZHMnKS5pbm5lckhUTUwgPVxuICAgICAgICAgICAgICAgICAgICBuZXdDb3Vyc2UucHJpbnQoJ2h0bWwnKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RWw8SFRNTElucHV0RWxlbWVudD4oJ2luaXRpYWxSb3cnKS52YWx1ZSA9XG4gICAgICAgICAgICAgICAgICAgIHN0cmluZ0Zyb21Sb3codGhpcy5fY291cnNlLmdldEluaXRpYWxSb3coKSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmdldEVsPEhUTUxTZWxlY3RFbGVtZW50PignZmlyc3RTaXgnKS52YWx1ZSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZS5nZXRGaXJzdFNpeFR5cGUoKS50b1N0cmluZygpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRFbDxIVE1MSW5wdXRFbGVtZW50PignY291cnNlTGVuZ3RoJykudmFsdWUgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2UuZ2V0TGVuZ3RoKCkudG9TdHJpbmcoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zYXZlZENvdXJzZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEVsKCdzYXZlZENhbGxpbmcnKS5pbm5lckhUTUwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2F2ZWRDb3Vyc2UucHJpbnQoJ2h0bWwnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEVsKCdzYXZlZENhbGxpbmcnKS5pbm5lclRleHQgPSAnTm9uZSc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gUHJvb2YgYW5kIG51bWJlciBvZiByb3dzXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRFbCgncHJvb2ZSZXN1bHQnKS5pbm5lclRleHQgPSB0aGlzLl9wcm9vZlRleHQgfHwgJyc7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Jvd0NvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RWwoJ251bVJvd3MnKS5pbm5lclRleHQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93Q291bnQgKyAnIFN0ZWRtYW4gJyArIFN0YWdlW3RoaXMuX3N0YWdlXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEVsKCdudW1Sb3dzJykuaW5uZXJUZXh0ID1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoLmVzdGltYXRlUm93cygpICsgJyBjaGFuZ2VzJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBUb3VjaCBkaXNwbGF5XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRFbCgnY291cnNlcycpLm91dGVySFRNTCA9XG4gICAgICAgICAgICAgICAgICAgICc8c2VsZWN0IGlkPVwiY291cnNlc1wiJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKyAnIG9uY2xpY2s9XCJwcmlja2VyLm9uU2VsZWN0Q291cnNlKClcIidcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJyBvbmRibGNsaWNrPVwicHJpY2tlci5vbkNvcHlDb3Vyc2UoKVwiPidcbiAgICAgICAgICAgICAgICAgICAgICAgICsgdGhpcy5fdG91Y2gucHJpbnQoJ3NlbGVjdCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndG91Y2hSb3dzJzogdGhpcy5fcm93Q291bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0eWxlVW5yZWFjaGVkJzogJ2NvbG9yOmdyYXknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdmYWxzZW5lc3MnOiB0aGlzLl9mYWxzZW5lc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0eWxlRmFsc2UnOiAnY29sb3I6cmVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICArICc8L3NlbGVjdD4nO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RWw8SFRNTFNlbGVjdEVsZW1lbnQ+KCdjb3Vyc2VzJykuc2l6ZSA9IE1hdGgubWF4KFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b3VjaC5nZXRMZW5ndGgoKSArIDEsXG4gICAgICAgICAgICAgICAgICAgIDIsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEVsPEhUTUxTZWxlY3RFbGVtZW50PignY291cnNlcycpLnZhbHVlID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleC50b1N0cmluZygpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIGMoc2l4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2UuZ2V0U2l4KHNpeCkudG9nZ2xlQ2FsbCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwdWJsaWMgb25TZXRJbml0aWFsUm93KCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5nZXRFbDxIVE1MSW5wdXRFbGVtZW50PignaW5pdGlhbFJvdycpLnZhbHVlO1xuICAgICAgICAgICAgICAgIGxldCBpbml0aWFsUm93OiBSb3c7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpbml0aWFsUm93ID0gcm93RnJvbVN0cmluZyhpbnB1dCwgdGhpcy5fc3RhZ2UpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZS5zZXRJbml0aWFsUm93KGluaXRpYWxSb3cpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBvblJlc2V0SW5pdGlhbFJvdygpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2Uuc2V0SW5pdGlhbFJvdyh0aGlzLl9pbml0aWFsUm93KTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwdWJsaWMgb25GaXJzdFNpeCgpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuZ2V0RWw8SFRNTFNlbGVjdEVsZW1lbnQ+KCdmaXJzdFNpeCcpLnZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZS5zZXRGaXJzdFNpeFR5cGUocGFyc2VJbnQoaW5wdXQpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwdWJsaWMgb25TZXRMZW5ndGgoKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRFbDxIVE1MSW5wdXRFbGVtZW50PignY291cnNlTGVuZ3RoJykudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IHBhcnNlSW50KGlucHV0KTtcblxuICAgICAgICAgICAgICAgIGlmIChsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291cnNlLnNhZmVTZXRMZW5ndGgobGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBvblJlc2V0TGVuZ3RoKCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZS5yZXNldExlbmd0aCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwdWJsaWMgb25SZXNldENhbGxzKCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZS5yZXNldENhbGxzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBvblNhdmVDYWxsaW5nKCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NhdmVkQ291cnNlID0gdGhpcy5fY291cnNlLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2F2ZWRDb3Vyc2Uuc2V0SW5pdGlhbFJvdyh0aGlzLl9pbml0aWFsUm93KTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwdWJsaWMgb25Mb2FkQ2FsbGluZygpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2F2ZWRDb3Vyc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291cnNlID0gdGhpcy5fc2F2ZWRDb3Vyc2UuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291cnNlLnNldEluaXRpYWxSb3codGhpcy5faW5pdGlhbFJvdyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291cnNlID0gbmV3IENvdXJzZSh0aGlzLl9pbml0aWFsUm93KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2Uuc2V0T3duZXJzaGlwKHtcbiAgICAgICAgICAgICAgICAgICAgJ2NvbnRhaW5lcic6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICdpbmRleCc6IEJsb2NrLkNvdXJzZSxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBvblNlbGVjdENvdXJzZSgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuZ2V0RWw8SFRNTFNlbGVjdEVsZW1lbnQ+KCdjb3Vyc2VzJykudmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IHBhcnNlSW50KGlucHV0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uSW5zZXJ0Q291cnNlKCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggKz0gMTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoLmluc2VydENvdXJzZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291cnNlLmNsb25lKCksXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldEVsPEhUTUxJbnB1dEVsZW1lbnQ+KCdyb2xsaW5nJykuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3Vyc2UgPSB0aGlzLl90b3VjaC5nZXRDb3Vyc2UodGhpcy5fc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNpeFR5cGUgPSBjb3Vyc2UuZ2V0U2l4KGNvdXJzZS5nZXRMZW5ndGgoKSkudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291cnNlLnNldEZpcnN0U2l4VHlwZSgoc2l4VHlwZSArIDEpICUgMik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZS5zZXRJbml0aWFsUm93KGNvdXJzZS5nZXRFbmQoKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZS5yZXNldExlbmd0aCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2UucmVzZXRDYWxscygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uUGFzdGVDb3Vyc2UoKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG91Y2guZGVsZXRlQ291cnNlKHRoaXMuX3NlbGVjdGVkSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b3VjaC5pbnNlcnRDb3Vyc2UoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291cnNlLmNsb25lKCksXG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0RWw8SFRNTElucHV0RWxlbWVudD4oJ3JvbGxpbmcnKS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3Vyc2UgPSB0aGlzLl90b3VjaC5nZXRDb3Vyc2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaXhUeXBlID0gY291cnNlLmdldFNpeChjb3Vyc2UuZ2V0TGVuZ3RoKCkpLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2Uuc2V0Rmlyc3RTaXhUeXBlKChzaXhUeXBlICsgMSkgJSAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZS5zZXRJbml0aWFsUm93KGNvdXJzZS5nZXRFbmQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gTWF0aC5taW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG91Y2guZ2V0TGVuZ3RoKCksXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291cnNlLnJlc2V0TGVuZ3RoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3Vyc2UucmVzZXRDYWxscygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwdWJsaWMgb25Db3B5Q291cnNlKCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdXJzZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b3VjaC5nZXRDb3Vyc2UodGhpcy5fc2VsZWN0ZWRJbmRleCkuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291cnNlLnNldE93bmVyc2hpcCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAnY29udGFpbmVyJzogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbmRleCc6IEJsb2NrLkNvdXJzZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29waWVkSW5kZXggPSB0aGlzLl9zZWxlY3RlZEluZGV4O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uQ3V0Q291cnNlKCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIHRoaXMub25Db3B5Q291cnNlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkRlbGV0ZUNvdXJzZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwdWJsaWMgb25EZWxldGVDb3Vyc2UoKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG91Y2guZGVsZXRlQ291cnNlKHRoaXMuX3NlbGVjdGVkSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gTWF0aC5taW4oXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG91Y2guZ2V0TGVuZ3RoKCksXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwdWJsaWMgb25Mb2FkVG91Y2goKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEVsPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdsb2FkU2F2ZVRleHRhcmVhJykudmFsdWU7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1RvdWNoOiBUb3VjaDtcblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1RvdWNoID0gVG91Y2guZnJvbVN0cmluZyhpbnB1dCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YWdlID0gbmV3VG91Y2guZ2V0SW5pdGlhbFJvdygpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEVsPEhUTUxTZWxlY3RFbGVtZW50Pignc3RhZ2UnKS52YWx1ZSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YWdlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vblN0YWdlKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl90b3VjaCA9IG5ld1RvdWNoO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoLnNldE93bmVyc2hpcCh7XG4gICAgICAgICAgICAgICAgICAgICdjb250YWluZXInOiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAnaW5kZXgnOiBCbG9jay5Ub3VjaCxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBvblNhdmVUb3VjaCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEVsKCdsb2FkU2F2ZVRleHRhcmVhJykuaW5uZXJUZXh0ID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG91Y2gucHJpbnQoJ3RleHQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uR2VuZXJhdGVTaXJpbCgpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEVsKCdzaXJpbFRleHRhcmVhJykuaW5uZXJUZXh0ID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG91Y2gucHJpbnQoJ3NpcmlsJywgeyd0b3VjaFJvd3MnOiB0aGlzLl9yb3dDb3VudH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwdWJsaWMgb25BbmFseXNlTXVzaWMoKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmlzaXRvciA9IG5ldyBWaXNpdG9yLk11c2ljKHRoaXMuX211c2ljU2NoZW1lKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90b3VjaC5hY2NlcHQodmlzaXRvcik7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRFbCgnbXVzaWNUZXh0YXJlYScpLmlubmVyVGV4dCA9XG4gICAgICAgICAgICAgICAgICAgIHZpc2l0b3IuZ2V0TWF0Y2hlcigpLnByaW50KCd0ZXh0Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbXVzaWMgPSB2aXNpdG9yLmdldERpcmVjdG9yeSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwdWJsaWMgb25TaG93U2l4SGVhZHMoKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZ2V0RWw8SFRNTElucHV0RWxlbWVudD4oJ3Nob3dTaXhIZWFkcycpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dTaXhIZWFkcyA9IGVsZW1lbnQuY2hlY2tlZDtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwdWJsaWMgb25Qcm92ZSgpOiBib29sZWFuIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9vZiA9IG5ldyBWaXNpdG9yLlByb29mKCksXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXIgPSBuZXcgVmlzaXRvci5Db3VudGVyKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl90b3VjaC5hY2NlcHQocHJvb2YsIGNvdW50ZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd0NvdW50ID0gY291bnRlci5nZXRDb3VudCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZhbHNlbmVzcyA9IHByb29mLmdldERpcmVjdG9yeSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHByb29mLmlzVHJ1ZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9vZi5pc1Zpc2l0aW5nKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Byb29mVGV4dCA9IFwiVHJ1ZSwgYnV0IGRvZXNuJ3QgY29tZSByb3VuZFwiO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJvb2ZUZXh0ID0gJ0NvbXBvc2l0aW9uIGlzIHRydWUnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJvb2ZUZXh0ID0gJ0NvbXBvc2l0aW9uIGlzIEZBTFNFJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9vZi5pc1RydWUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIG9uVGFiKHBhZ2VJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFicyA9IHRoaXMuZ2V0RWwoJ3RhYnMnKS5jaGlsZHJlbixcbiAgICAgICAgICAgICAgICAgICAgdGFiID0gdGhpcy5nZXRFbCgndGFiXycgKyBwYWdlSWQpLFxuICAgICAgICAgICAgICAgICAgICBwYWdlcyA9IHRoaXMuZ2V0RWwoJ3BhZ2VzJykuY2hpbGRyZW4sXG4gICAgICAgICAgICAgICAgICAgIHBhZ2UgPSB0aGlzLmdldEVsKCdwYWdlXycgKyBwYWdlSWQpO1xuXG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByZWZlci1mb3Itb2ZcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhYnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFic1tpXS5jbGFzc05hbWUgPSAndGFiJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGFiLmNsYXNzTmFtZSA9ICd0YWIgdGFiLXNlbGVjdGVkJztcblxuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItZm9yLW9mXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWdlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBwYWdlc1tpXS5jbGFzc05hbWUgPSAncGFnZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhZ2UuY2xhc3NOYW1lID0gJ3BhZ2UgcGFnZS1zZWxlY3RlZCc7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBQcmludGFibGVNaXhpbi5tYWtlUHJpbnRhYmxlKE1iZCk7XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBET00gaGVscGVyIHV0aWxpdGllc1xuICAgICAqL1xuICAgIGV4cG9ydCBuYW1lc3BhY2UgRG9tIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhIHN0eWxlIGVsZW1lbnQgZm9yIHByaWNrZXIgcmVuZGVyaW5nXG4gICAgICAgICAqIEBwYXJhbSBwYXJlbnREb2N1bWVudCAtIGRvY3VtZW50IG9iamVjdCB0byB1c2UgKGluamVjdCBmb3IgdGVzdGluZylcbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBbmRBcHBlbmRTdHlsZShcbiAgICAgICAgICAgIHBhcmVudERvY3VtZW50OiBIVE1MRG9jdW1lbnQgPSBkb2N1bWVudCxcbiAgICAgICAgICAgIHN0eWxlczogc3RyaW5nID0gJycsXG4gICAgICAgICk6IEhUTUxTdHlsZUVsZW1lbnQge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSBwYXJlbnREb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgICAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICAgICAgICBzdHlsZS5pbm5lclRleHQgPSBzdHlsZXM7XG5cbiAgICAgICAgICAgIHBhcmVudERvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIERPTSBoZWxwZXIgdXRpbGl0aWVzXG4gICAgICovXG4gICAgZXhwb3J0IG5hbWVzcGFjZSBEb20ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGVzIGFuIGlmcmFtZSBmb3IgcHJpY2tlciByZW5kZXJpbmdcbiAgICAgICAgICogQHBhcmFtIHBhcmVudERvY3VtZW50IC0gZG9jdW1lbnQgb2JqZWN0IHRvIHVzZSAoaW5qZWN0IGZvciB0ZXN0aW5nKVxuICAgICAgICAgKi9cbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUlmcmFtZShcbiAgICAgICAgICAgIHBhcmVudERvY3VtZW50OiBIVE1MRG9jdW1lbnQgPSBkb2N1bWVudCxcbiAgICAgICAgKTogSFRNTElGcmFtZUVsZW1lbnQge1xuICAgICAgICAgICAgY29uc3QgaWZyYW1lID0gcGFyZW50RG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG5cbiAgICAgICAgICAgIGlmcmFtZS5mcmFtZUJvcmRlciA9ICcwJztcbiAgICAgICAgICAgIGlmcmFtZS5zY3JvbGxpbmcgPSAnbm8nO1xuICAgICAgICAgICAgaWZyYW1lLnNyYyA9ICdhYm91dDpibGFuayc7XG4gICAgICAgICAgICBpZnJhbWUuc3R5bGUuYm9yZGVyID0gJ25vbmUnO1xuXG4gICAgICAgICAgICByZXR1cm4gaWZyYW1lO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBET00gaGVscGVyIHV0aWxpdGllc1xuICAgICAqL1xuICAgIGV4cG9ydCBuYW1lc3BhY2UgRG9tIHtcblxuICAgICAgICBleHBvcnQgZnVuY3Rpb24gaW5qZWN0SWZyYW1lRGF0YShcbiAgICAgICAgICAgIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsXG4gICAgICAgICAgICBjb250ZW50OiBzdHJpbmcgPSAnJyxcbiAgICAgICAgICAgIGdsb2JhbHM6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7IH0sXG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgdGhlRG9jID0gKGlmcmFtZS5jb250ZW50V2luZG93IGFzIFdpbmRvdykuZG9jdW1lbnQ7XG4gICAgICAgICAgICB0aGVEb2Mub3BlbigpO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBnbG9iYWxzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGdsb2JhbHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAoaWZyYW1lLmNvbnRlbnRXaW5kb3cgYXMgYW55KVtrZXldID0gZ2xvYmFsc1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhlRG9jLndyaXRlKGNvbnRlbnQpO1xuICAgICAgICAgICAgdGhlRG9jLmNsb3NlKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJQcmlja2VyL0Fic3RyYWN0LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJQcmlja2VyL01iZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiRG9tL2NyZWF0ZUFuZEFwcGVuZFN0eWxlLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJEb20vY3JlYXRlSWZyYW1lLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJEb20vaW5qZWN0SWZyYW1lRGF0YS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiT3B0aW9ucy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiVGVtcGxhdGVzLnRzXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogRmFjdG9yeSBmdW5jdGlvbiB0byBjcmVhdGUgYSBwcmlja2VyXG4gICAgICogQHBhcmFtIGVsZW1lbnRJZCAtIElEIG9mIEhUTUwgZWxlbWVudCB0byB3aGljaCB0aGUgcHJpY2tlciB3aWxsIGJlIGJvdW5kXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBwcmlja2VyIG9wdGlvbnNcbiAgICAgKiBAcGFyYW0gcGFyZW50RG9jdW1lbnQgLSBkb2N1bWVudCB0byB1c2UgdG8gY3JlYXRlIHByaWNrZXIgKGZvciB0ZXN0aW5nKVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoXG4gICAgICAgIGVsZW1lbnRJZDogc3RyaW5nLFxuICAgICAgICBvcHRpb25zOiBPcHRpb25zID0geyB9LFxuICAgICAgICBwYXJlbnREb2N1bWVudDogSFRNTERvY3VtZW50ID0gZG9jdW1lbnQsXG4gICAgKTogUHJpY2tlci5NYmQge1xuICAgICAgICBsZXQgcHJpY2tlcjogUHJpY2tlci5NYmQ7XG5cbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHBhcmVudERvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZmluZCBIVE1MIGVsZW1lbnQ6ICcke2VsZW1lbnRJZH0nYCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5pZnJhbWUgfHwgb3B0aW9ucy5pZnJhbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgaWZyYW1lID0gRG9tLmNyZWF0ZUlmcmFtZShwYXJlbnREb2N1bWVudCk7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgICAgICAgICBwcmlja2VyID0gbmV3IFByaWNrZXIuTWJkKGlmcmFtZSk7XG4gICAgICAgICAgICBEb20uaW5qZWN0SWZyYW1lRGF0YShcbiAgICAgICAgICAgICAgICBpZnJhbWUsXG4gICAgICAgICAgICAgICAgVGVtcGxhdGVzLmNyZWF0ZSh7J3ByaWNrZXInOiBwcmlja2VyfSksXG4gICAgICAgICAgICAgICAgeyBwcmlja2VyIH0sXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJpY2tlciA9IG5ldyBQcmlja2VyLk1iZCgpO1xuICAgICAgICAgICAgRG9tLmNyZWF0ZUFuZEFwcGVuZFN0eWxlKHBhcmVudERvY3VtZW50LCBwcmlja2VyLnByaW50KCdjc3MnKSk7XG4gICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IHByaWNrZXIucHJpbnQoJ2h0bWwnKTtcbiAgICAgICAgICAgICh3aW5kb3cgYXMgYW55KS5wcmlja2VyID0gcHJpY2tlcjtcbiAgICAgICAgICAgIGlmIChwYXJlbnREb2N1bWVudCA9PT0gZG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBkb24ndCBydW4gaW4gdGVzdHMgKHdoZW4gZG9jdW1lbnQgaGFzIGJlZW4gb3ZlcnJpZGRlbilcbiAgICAgICAgICAgICAgICBwcmlja2VyLm9uTG9hZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByaWNrZXI7XG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkFic3RyYWN0U2NoZW1lLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJNYXRjaGVySW50ZXJmYWNlXCIgLz5cblxubmFtZXNwYWNlIFByaWNrZXIge1xuXG4gICAgLyoqXG4gICAgICogTXVzaWMgY2xhc3NlcyB0byBhbmFseXNlIHJvd3NcbiAgICAgKi9cbiAgICBleHBvcnQgbmFtZXNwYWNlIE11c2ljIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3VzdG9tIG11c2ljIG1hdGNoaW5nIHNjaGVtZSBkZWZpbmVkIGF0IHJ1bnRpbWVcbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBjbGFzcyBDdXN0b21TY2hlbWUgZXh0ZW5kcyBBYnN0cmFjdFNjaGVtZSB7XG5cbiAgICAgICAgICAgIC8qIE1hdGNoZXJJbnRlcmZhY2UgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUHJvdmlkZXMgcmVhZCBhY2Nlc3MgdG8gdGhlIG5hbWVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHVibGljIGdldE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ0N1c3RvbSBzY2hlbWUnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKiBBYnN0cmFjdFNjaGVtZSBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENyZWF0ZSBtYXRjaGVycyBmb3IgdGhpcyBzY2hlbWUvc3RhZ2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJvdGVjdGVkIGNyZWF0ZU1hdGNoZXJzKHJvdW5kczogc3RyaW5nKTogTWF0Y2hlckludGVyZmFjZVtdIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWyBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKiBDdXN0b21TY2hlbWUgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEFsbG93cyBhZGRpdGlvbmFsIG1hdGNoZXJzIHRvIGJlIGFkZGVkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHB1YmxpYyBhZGRNYXRjaGVyKG1hdGNoZXI6IE1hdGNoZXJJbnRlcmZhY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXRjaGVycy5wdXNoKG1hdGNoZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9BYnN0cmFjdFNpeC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vUm93LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9zdHJpbmdGcm9tUm93LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJBYnN0cmFjdC50c1wiIC8+XG5cbm5hbWVzcGFjZSBQcmlja2VyIHtcblxuICAgIC8qKlxuICAgICAqIFZpc2l0b3IgY2xhc3NlcyB0byBhbmFseXNlIGJsb2Nrc1xuICAgICAqL1xuICAgIGV4cG9ydCBuYW1lc3BhY2UgVmlzaXRvciB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNpbXBsZSB2aXNpdG9yIHRoYXQgbG9ncyByb3dzIHRvIHRoZSBjb25zb2xlXG4gICAgICAgICAqXG4gICAgICAgICAqIEFsbCB2aXNpdGVkIHJvd3MgYXJlIG91dHB1dCB2aWEgYGNvbnNvbGUubG9nKClgLlxuICAgICAgICAgKiBUaGlzIHZpc2l0b3IgaXMgdXNlZnVsIGZvciBlYXNpbHkgZGlzY292ZXJpbmcgd2hhdCByb3dzIGFyZSBiZWluZ1xuICAgICAgICAgKiBnZW5lcmF0ZWQuXG4gICAgICAgICAqL1xuICAgICAgICBleHBvcnQgY2xhc3MgQ29uc29sZSBleHRlbmRzIEFic3RyYWN0VmlzaXRvciB7XG5cbiAgICAgICAgICAgIC8qIEFic3RyYWN0VmlzaXRvciBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVjZWl2ZXMgYSByb3cgZm9yIHByb2Nlc3NpbmcuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByb3RlY3RlZCB2aXNpdEltcGxlbWVudGF0aW9uKHJvdzogUm93LCBzaXg/OiBBYnN0cmFjdFNpeCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlICovXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3RyaW5nRnJvbVJvdyhyb3cpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vQWJzdHJhY3RTaXgudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1Jvdy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vc3RyaW5nRnJvbVJvdy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQWJzdHJhY3QudHNcIiAvPlxuXG5uYW1lc3BhY2UgUHJpY2tlciB7XG5cbiAgICAvKipcbiAgICAgKiBWaXNpdG9yIGNsYXNzZXMgdG8gYW5hbHlzZSBibG9ja3NcbiAgICAgKi9cbiAgICBleHBvcnQgbmFtZXNwYWNlIFZpc2l0b3Ige1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaW1wbGUgdmlzaXRvciB0aGF0IGFjY3VtdWxhdGVzIHJvd3MgaW50byBhbiBhcnJheSBvZiBzdHJpbmdzXG4gICAgICAgICAqXG4gICAgICAgICAqIENvbnZlcnRzIGVhY2ggdmlzaXRlZCByb3cgdG8gYSBzdHJpbmcgYW5kIHN0b3JlcyBpdC5cbiAgICAgICAgICogVGhlIHZpc2l0b3IgYWNjdW11bGF0ZXMgcm93cyBmcm9tIGEgdG91Y2ggaW4gdGhlIG9yZGVyIHRoZXkncmUgcnVuZy5cbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydCBjbGFzcyBTdHJpbmdBcnJheSBleHRlbmRzIEFic3RyYWN0VmlzaXRvciB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQXJyYXkgb2Ygc3RyaW5nIHJlcHJlc2VudGF0aW9ucyBvZiByb3dzIHRoYXQgaGF2ZSBiZWVuIHZpc2l0ZWQuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByaXZhdGUgX3N0cmluZ3M6IHN0cmluZ1tdID0gWyBdO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlcG9ydHMgdGhlIHJvd3MgdGhhdCBoYXZlIGJlZW4gdmlzaXRlZCBieSBwcm92aWRpbmcgcHVibGljXG4gICAgICAgICAgICAgKiBhY2Nlc3MgdG8gW1tfc3RyaW5nc11dLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBwdWJsaWMgZ2V0U3RyaW5ncygpOiBzdHJpbmdbXSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0cmluZ3Muc2xpY2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogQWJzdHJhY3RWaXNpdG9yIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZWNlaXZlcyBhIHJvdyBmb3IgcHJvY2Vzc2luZy5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcHJvdGVjdGVkIHZpc2l0SW1wbGVtZW50YXRpb24ocm93OiBSb3csIHNpeD86IEFic3RyYWN0U2l4KTogdm9pZCB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RyaW5ncy5wdXNoKHN0cmluZ0Zyb21Sb3cocm93KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCI8IURPQ1RZUEUgaHRtbD5cbjxodG1sPlxuICA8aGVhZD5cbiAgICA8dGl0bGU+RnJlZSBUb3VjaCBQcmlja2VyPC90aXRsZT5cbiAgICA8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICBib2R5IHtcbiAgICAgICAgbWFyZ2luOiAwcHg7XG4gICAgICAgIHBhZGRpbmc6IDBweDtcbiAgICAgIH1cblxuICAgICAge3s9IGNvbnRleHQucHJpY2tlci5wcmludCgnY3NzJykgfX1cbiAgICA8L3N0eWxlPlxuICAgIDxzY3JpcHQgdHlwZT1cInRleHQvamF2YXNjcmlwdFwiPlxuICAgICAgICB3aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcHJpY2tlci5vbkxvYWQoKTtcbiAgICAgICAgfTtcbiAgICA8L3NjcmlwdD5cbiAgPC9oZWFkPlxuICA8Ym9keT5cbiAgICB7ez0gY29udGV4dC5wcmlja2VyLnByaW50KCdodG1sJykgfX1cbiAgPC9ib2R5PlxuPC9odG1sPlxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8qKlxuICogUmVuZGVycyBhIHNpeCBhcyBIVE1MIGZvciBNQkQtc3R5bGUgcHJpY2tlclxuICogQHBhcmFtIHtCbG9ja0RpcmVjdG9yeX0gIGZhbHNlbmVzcyAgICBkaXJlY3RvcnkgdG8gbG9va3VwIGZhbHNlbmVzc1xuICogQHBhcmFtIHtCbG9ja0RpcmVjdG9yeX0gIG11c2ljICAgICAgICBkaXJlY3RvcnkgdG8gbG9va3VwIG11c2ljXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgY291cnNlSW5kZXggIGluZGV4IG51bWJlciBvZiB0aGUgY291cnNlXG4gKiBAcGFyYW0ge2Jvb2xlYW59ICAgICAgICAgdW5kZXJsaW5lICAgIHdoZXRoZXIgdG8gdW5kZXJsaW5lIHRoZSBzaXhlbmRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gICAgICAgICBzaG93U2l4SGVhZHMgIHNob3cgc2l4IGhlYWRzIGFzIHdlbGwgYXMgc2l4IGVuZHNcbiAqL1xuXG57ez8gY29udGV4dC51bmRlcmxpbmUgIT09IHRydWUgfX1cblx0e3sgY29udGV4dC51bmRlcmxpbmUgPSBmYWxzZTsgfX1cbnt7P319XG5cbnt7P1xuXHRjb250ZXh0LmZhbHNlbmVzcyAmJiBjb250ZXh0LmNvdXJzZUluZGV4ICYmIGNvbnRleHQuZmFsc2VuZXNzLmNvbnRhaW5zKFxuXHRcdGNvbnRleHQuY291cnNlSW5kZXgsXG5cdFx0Y29udGV4dC5vYmplY3QuZ2V0SW5kZXgoKVxuXHQpXG59fVxuXHR7eyB2YXIgY2xhc3NOYW1lID0gJ2ZhbHNlQmxvY2snOyB9fVxue3s/P1xuXHRjb250ZXh0Lm11c2ljICYmIGNvbnRleHQuY291cnNlSW5kZXggJiYgY29udGV4dC5tdXNpYy5jb250YWlucyhcblx0XHRjb250ZXh0LmNvdXJzZUluZGV4LFxuXHRcdGNvbnRleHQub2JqZWN0LmdldEluZGV4KClcblx0KVxufX1cblx0e3sgdmFyIGNsYXNzTmFtZSA9ICdtdXNpY2FsQmxvY2snOyB9fVxue3s/P319XG5cdHt7IHZhciBjbGFzc05hbWUgPSAnJzsgfX1cbnt7P319XG5cblxuLyogU2l4IGhlYWQvZW5kICovXG5cbjxzcGFuIGNsYXNzPVwie3s9IGNsYXNzTmFtZSB9fVwiPlxuXG5cdHt7PyBjb250ZXh0LnNob3dTaXhIZWFkcyB9fVxuXHRcdHt7PSBQcmlja2VyLnN0cmluZ0Zyb21Sb3coY29udGV4dC5vYmplY3QuZ2V0SGVhZCgpKSB9fVxuXHR7ez8/fX1cblxuXHRcdHt7PyBjb250ZXh0LnVuZGVybGluZSB9fVxuXHRcdFx0PHU+XG5cdFx0e3s/fX1cblxuXHRcdFx0e3s9IFByaWNrZXIuc3RyaW5nRnJvbVJvdyhjb250ZXh0Lm9iamVjdC5nZXRFbmQoKSkgfX1cblxuXHRcdHt7PyBjb250ZXh0LnVuZGVybGluZSB9fVxuXHRcdFx0PC91PlxuXHRcdHt7P319XG5cblx0e3s/fX1cblxuPC9zcGFuPlxuXG4mbmJzcDsmbmJzcDtcblxuXG4vKiBDYWxsICovXG5cbjxzcGFuXG4gY2xhc3M9XCJ7ez0gUHJpY2tlci5TaXhUeXBlW2NvbnRleHQub2JqZWN0LnR5cGVdLnRvTG93ZXJDYXNlKCkgfX1TaXhcIlxuIG9uY2xpY2s9XCJwcmlja2VyLmMoe3s9IGNvbnRleHQub2JqZWN0LmdldEluZGV4KCkgfX0pXCJcbj5cblx0Jm5ic3A7XG5cdHt7PyBjb250ZXh0Lm9iamVjdC5nZXRDYWxsKCkgPT09IFByaWNrZXIuQ2FsbC5QbGFpbiB9fVxuXHRcdCZuYnNwO1xuXHR7ez8/IGNvbnRleHQub2JqZWN0LmdldENhbGwoKSA9PT0gUHJpY2tlci5DYWxsLkJvYiB9fVxuXHRcdC1cblx0e3s/PyBjb250ZXh0Lm9iamVjdC5nZXRDYWxsKCkgPT09IFByaWNrZXIuQ2FsbC5TaW5nbGUgfX1cblx0XHRzXG5cdHt7P319XG5cdCZuYnNwO1xuPC9zcGFuPlxuXG4mbmJzcDsmbmJzcDtcblxuXG4vKiBJbmRleCAqL1xuXG57ez0gY29udGV4dC5vYmplY3QuZ2V0SW5kZXgoKSB9fVxuXG48YnIgLz5cblxuXG4vKiBTaXggZW5kICovXG5cbnt7PyBjb250ZXh0LnNob3dTaXhIZWFkcyB9fVxuXHQ8c3BhbiBjbGFzcz1cInt7PSBjbGFzc05hbWUgfX1cIj5cblx0XHQ8dT5cblx0XHRcdHt7PSBQcmlja2VyLnN0cmluZ0Zyb21Sb3coY29udGV4dC5vYmplY3QuZ2V0RW5kKCkpIH19XG5cdFx0PC91PlxuXHQ8L3NwYW4+XG5cblx0PGJyIC8+XG57ez99fVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8qKlxuICogUmVuZGVycyBhIHNpeCBmb3IgY29uc3VtcHRpb24gYnkgc2lyaWwtYmFzZWQgcHJvdmVyc1xuICogQHBhcmFtIHtudW1iZXJ9ICAgdG91Y2hSb3dzICByb3dzIHJlbWFpbmluZyBpbiB0aGUgdG91Y2hcbiAqL1xuXG57e1xuXHRjb250ZXh0LnRvdWNoUm93cyA9IGNvbnRleHQudG91Y2hSb3dzIHx8IEluZmluaXR5O1xufX1cblxue3s/IGNvbnRleHQub2JqZWN0LmdldENhbGwoKSA9PT0gUHJpY2tlci5DYWxsLlBsYWluIH19XG5cdHBsYWluXG57ez8/IGNvbnRleHQub2JqZWN0LmdldENhbGwoKSA9PT0gUHJpY2tlci5DYWxsLkJvYiB9fVxuXHRib2Jcbnt7Pz8gY29udGV4dC5vYmplY3QuZ2V0Q2FsbCgpID09PSBQcmlja2VyLkNhbGwuU2luZ2xlIH19XG5cdHNpbmdsZVxue3s/fX1cbixcbiAvKiBzaW5nbGUgc3BhY2UgKi9cblxue3s/IGNvbnRleHQudG91Y2hSb3dzID4gMX19XG5cdHt7PyBjb250ZXh0LnRvdWNoUm93cyA+PSA2IH19XG5cdFx0e3s9IFByaWNrZXIuU2l4VHlwZVtjb250ZXh0Lm9iamVjdC50eXBlXS50b0xvd2VyQ2FzZSgpIH19XG5cdHt7Pz99fVxuXHRcdCtcblx0XHR7ez0gY29udGV4dC5vYmplY3Qubm90YXRpb24uc2xpY2UoMCwgY29udGV4dC50b3VjaFJvd3MgLSAxKS5qb2luKCcuJykgfX1cblx0e3s/fX1cblx0LFxuXHQgLyogc2luZ2xlIHNwYWNlICovXG57ez99fVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8qKlxuICogUmVuZGVycyBhIHNpbmdsZSBjb3Vyc2Ugd2l0aCB0aGUgaW5pdGlhbCByb3cgdW5kZXJsaW5lZCBiZWZvcmUgaXRcbiAqL1xuXG48dT57ez0gUHJpY2tlci5zdHJpbmdGcm9tUm93KGNvbnRleHQub2JqZWN0LmdldEluaXRpYWxSb3coKSkgfX08L3U+PGJyIC8+XG57ez0gY29udGV4dC5vYmplY3QucHJpbnQoJ3RleHQnKSB9fVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8qKlxuICogUmVuZGVycyBhIGNvdXJzZSBhcyBIVE1MIGZvciBNQkQtc3R5bGUgcHJpY2tlclxuICogQHBhcmFtIHtCbG9ja0RpcmVjdG9yeX0gIGZhbHNlbmVzcyAgICAgZGlyZWN0b3J5IHRvIGxvb2t1cCBmYWxzZW5lc3NcbiAqIEBwYXJhbSB7QmxvY2tEaXJlY3Rvcnl9ICBtdXNpYyAgICAgICAgIGRpcmVjdG9yeSB0byBsb29rdXAgbXVzaWNcbiAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICBjb3Vyc2VJbmRleCAgIGluZGV4IG51bWJlciBvZiB0aGUgY291cnNlXG4gKiBAcGFyYW0ge0NvdXJzZX0gICAgICAgICAgZXh0cmFTaXhlcyAgICBhZGRpdGlvbmFsIHNpeGVzIHRvIHByaW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59ICAgICAgICAgc2hvd1NpeEhlYWRzICBzaG93IHNpeCBoZWFkcyBhcyB3ZWxsIGFzIHNpeCBlbmRzXG4gKi9cblxuPHU+e3s9IFByaWNrZXIuc3RyaW5nRnJvbVJvdyhjb250ZXh0Lm9iamVjdC5nZXRJbml0aWFsUm93KCkpIH19PC91PjxiciAvPlxuXG57e34gY29udGV4dC5vYmplY3QuZ2V0U2l4ZXMoKSA6c2l4IH19XG5cdHt7PyBzaXguZ2V0SW5kZXgoKSA9PT0gY29udGV4dC5vYmplY3QuZ2V0TGVuZ3RoKCkgfX1cblx0XHR7eyBjb250ZXh0LnVuZGVybGluZSA9IHRydWUgfX1cblx0e3s/fX1cblx0e3s9IHNpeC5wcmludCgnbWJkJywgY29udGV4dCkgfX1cbnt7fn19XG5cbnt7PyBjb250ZXh0LmV4dHJhU2l4ZXMgfX1cblx0e3t+IGNvbnRleHQuZXh0cmFTaXhlcy5nZXRTaXhlcygpIDpzaXggfX1cblx0XHQ8c3BhbiBjbGFzcz1cImV4dHJhU2l4XCI+XG5cdFx0XHR7ez8gY29udGV4dC5zaG93U2l4SGVhZHMgfX1cblx0XHRcdFx0e3s9IFByaWNrZXIuc3RyaW5nRnJvbVJvdyhzaXguZ2V0SGVhZCgpKSB9fVxuXHRcdFx0XHQ8YnIgLz5cblx0XHRcdFx0PHU+XG5cdFx0XHRcdFx0e3s9IFByaWNrZXIuc3RyaW5nRnJvbVJvdyhzaXguZ2V0RW5kKCkpIH19XG5cdFx0XHRcdDwvdT5cblx0XHRcdHt7Pz99fVxuXHRcdFx0XHR7ez0gUHJpY2tlci5zdHJpbmdGcm9tUm93KHNpeC5nZXRFbmQoKSkgfX1cblx0XHRcdHt7P319XG5cdFx0PC9zcGFuPjxiciAvPlxuXHR7e359fVxue3s/fX1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vKipcbiAqIFJlbmRlcnMgYSBjb3Vyc2UgZm9yIGNvbnN1bXB0aW9uIGJ5IHNpcmlsLWJhc2VkIHByb3ZlcnNcbiAqIEBwYXJhbSB7bnVtYmVyfSAgdG91Y2hSb3dzICByb3dzIHJlbWFpbmluZyBpbiB0aGUgdG91Y2hcbiAqL1xuXG57e1xuXHRjb250ZXh0LnRvdWNoUm93cyA9IGNvbnRleHQudG91Y2hSb3dzIHx8IEluZmluaXR5O1xufX1cblxue3t+IGNvbnRleHQub2JqZWN0LmdldFNpeGVzKCkgOnNpeCB9fVxuXHR7ez0gc2l4LnByaW50KCdzaXJpbCcsIHsndG91Y2hSb3dzJzogY29udGV4dC50b3VjaFJvd3N9KSB9fVxuXG5cdHt7IGNvbnRleHQudG91Y2hSb3dzIC09IHNpeC5lc3RpbWF0ZVJvd3MoKTsgfX1cblx0e3s/IGNvbnRleHQudG91Y2hSb3dzIDw9IDAgfX1cblx0XHR7eyBicmVhazsgfX1cblx0e3s/fX1cbnt7fn19XG5cblwiQCAge3s9IGNvbnRleHQub2JqZWN0LnByaW50KCd0ZXh0Jywgeydjb3Vyc2VFbmQnOiBmYWxzZX0pIH19XCJcbnt7PSAnXFxuJyB9fVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8qKlxuICogUmVuZGVycyBhIGNvdXJzZSwgZS5nLjpcbiAqIDQ4MDczNTY5MkUxICBzMiAzICAoNCBzaXhlcylcbiAqIDIzMTQ1Njc4OTBFICBwXG4gKiBAcGFyYW0ge3N0cmluZ30gICBlbmQgICAgICAgIGxpbmUgZW5kaW5nXG4gKiBAcGFyYW0ge2Jvb2xlYW59ICBjb3Vyc2VFbmQgIHdoZXRoZXIgdG8gcHJpbnQgdGhlIGNvdXJzZSBlbmRcbiAqL1xuXG57e1xuXHR2YXIgY2FsbHMgPSBbIF07XG5cdGNvbnRleHQuZW5kID0gY29udGV4dC5lbmQgfHwgJyc7XG5cdGlmIChjb250ZXh0LmNvdXJzZUVuZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0Y29udGV4dC5jb3Vyc2VFbmQgPSB0cnVlO1xuXHR9XG59fVxuXG57ez8gY29udGV4dC5jb3Vyc2VFbmQgfX1cblx0e3s9IFByaWNrZXIuc3RyaW5nRnJvbVJvdyhjb250ZXh0Lm9iamVjdC5nZXRFbmQoKSkgfX1cblx0IC8qIHNpbmdsZSBzcGFjZSAqL1xuXHQgLyogc2luZ2xlIHNwYWNlICovXG57ez99fVxuXG57e34gY29udGV4dC5vYmplY3QuZ2V0U2l4ZXMoKSA6c2l4IH19XG5cdHt7PyBzaXguZ2V0Q2FsbCgpIH19XG5cdFx0e3sgY2FsbHMucHVzaChcblx0XHRcdCgoc2l4LmdldENhbGwoKSA9PT0gUHJpY2tlci5DYWxsLlNpbmdsZSkgPyAncycgOiAnJylcblx0XHRcdFx0KyBzaXguZ2V0SW5kZXgoKVxuXHRcdCk7IH19XG5cdHt7P319XG57e359fVxuXG57ez8gY2FsbHMubGVuZ3RoIH19XG5cdHt7PSBjYWxscy5qb2luKCcgJykgfX1cbnt7Pz99fVxuXHRwXG57ez99fVxuXG57ez8gY29udGV4dC5vYmplY3QuZ2V0TGVuZ3RoKCkgIT09IGNvbnRleHQub2JqZWN0LmdldEluaXRpYWxSb3coKS5sZW5ndGggKiAyIH19XG5cdCAvKiBzaW5nbGUgc3BhY2UgKi9cblx0IC8qIHNpbmdsZSBzcGFjZSAqL1xuXHQoe3s9IGNvbnRleHQub2JqZWN0LmdldExlbmd0aCgpIH19IHNpeGVzKVxue3s/fX1cblxue3s9IGNvbnRleHQuZW5kIH19XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLyoqXG4gKiBSZW5kZXJzIGEgc3RhcnQgZm9yIGNvbnN1bXB0aW9uIGJ5IHNpcmlsLWJhc2VkIHByb3ZlcnNcbiAqL1xuXG57eyB2YXIgU2l4ID0gW1ByaWNrZXIuU2xvdywgUHJpY2tlci5RdWlja11bY29udGV4dC5vYmplY3QuZ2V0U2l4VHlwZSgpXTsgfX1cblxuK1xue3s9IFNpeC5ub3RhdGlvbi5zbGljZShjb250ZXh0Lm9iamVjdC5nZXRSb3dJbmRleCgpIC0gMSkuam9pbignLicpIH19XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLyoqXG4gKiBSZW5kZXJzIGEgc3RhcnQsIGUuZy46XG4gKiBcIlN0YXJ0IGZyb20gcm91bmRzIGFzIHRoZSBmaWZ0aCByb3cgb2YgYSBxdWljayBzaXguXCJcbiAqL1xuXG57eyB2YXIgcm93TWFwID0gWycnLCAnZmlyc3QnLCAnc2Vjb25kJywgJ3RoaXJkJywgJ2ZvdXJ0aCcsICdmaWZ0aCcsICdsYXN0J107IH19XG5cbnt7P1xuXHRjb250ZXh0Lm9iamVjdC5nZXRSb3dJbmRleCgpID09PSA0ICYmXG5cdFx0Y29udGV4dC5vYmplY3QuZ2V0U2l4VHlwZSgpID09PSBQcmlja2VyLlNpeFR5cGUuUXVpY2tcbn19XG5cblx0LyogTm8gb3V0cHV0IGZvciBzdGFuZGFyZCBzdGFydCAqL1xuXG57ez8/fX1cblxuXHRTdGFydCBmcm9tIHJvdW5kcyBhcyB0aGVcblx0IC8qIHNpbmdsZSBzcGFjZSAqL1xuXHR7ez0gcm93TWFwW2NvbnRleHQub2JqZWN0LmdldFJvd0luZGV4KCldIH19XG5cdCAvKiBzaW5nbGUgc3BhY2UgKi9cblx0cm93IG9mIGFcblx0IC8qIHNpbmdsZSBzcGFjZSAqL1xuXHR7ez0gUHJpY2tlci5TaXhUeXBlW2NvbnRleHQub2JqZWN0LmdldFNpeFR5cGUoKV0udG9Mb3dlckNhc2UoKSB9fVxuXHQgLyogc2luZ2xlIHNwYWNlICovXG5cdHNpeC5cblxue3s/fX1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vKipcbiAqIFJlbmRlcnMgYSB0b3VjaCBhcyBIVE1MIGZvciB1c2Ugd2l0aGluIGEgPHNlbGVjdD4gZWxlbWVudFxuICogQHBhcmFtIHtudW1iZXJ9ICAgICAgICAgIHRvdWNoUm93cyAgICAgICBjb3VudCBvZiByb3dzIGluIHRoZSB0b3VjaFxuICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgIHN0eWxlVW5yZWFjaGVkICBzdHlsZSB0byBhcHBseSBmb3IgdW5yZWFjaGVkIGNvdXJzZXNcbiAqIEBwYXJhbSB7QmxvY2tEaXJlY3Rvcnl9ICBmYWxzZW5lc3MgICAgICAgZGlyZWN0b3J5IHRvIGxvb2t1cCBmYWxzZW5lc3NcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICBzdHlsZUZhbHNlICAgICAgc3R5bGUgdG8gYXBwbHkgZm9yIGZhbHNlIGNvdXJzZXNcbiAqL1xuXG57e1xuXHRjb250ZXh0LnRvdWNoUm93cyA9IGNvbnRleHQudG91Y2hSb3dzIHx8IEluZmluaXR5O1xuXHRjb250ZXh0LnRvdWNoUm93cyAtPSAyOyAgLyogVE9ETyBtYWdpYyBudW1iZXIgKi9cblx0Y29udGV4dC5zdHlsZVVucmVhY2hlZCA9IGNvbnRleHQuc3R5bGVVbnJlYWNoZWQgfHwgJyc7XG5cdGNvbnRleHQuc3R5bGVGYWxzZSA9IGNvbnRleHQuc3R5bGVGYWxzZSB8fCAnJztcbn19XG5cbjxvcHRpb24gdmFsdWU9XCIwXCI+XG5cdHt7PSBQcmlja2VyLnN0cmluZ0Zyb21Sb3coY29udGV4dC5vYmplY3QuZ2V0SW5pdGlhbFJvdygpKSB9fVxuPC9vcHRpb24+XG5cbnt7fiBjb250ZXh0Lm9iamVjdC5nZXRDb3Vyc2VzKCkgOmNvdXJzZSB9fVxuXHQ8b3B0aW9uXG5cdFx0IHZhbHVlPVwie3s9IGNvdXJzZS5nZXRJbmRleCgpIH19XCJcblx0XHR7ez8gY29udGV4dC50b3VjaFJvd3MgPD0gMCB9fVxuXHRcdFx0IC8qIHNpbmdsZSBzcGFjZSAqL1xuXHRcdFx0c3R5bGU9XCJ7ez0gY29udGV4dC5zdHlsZVVucmVhY2hlZCB9fVwiXG5cdFx0e3s/fX1cblx0XHR7ez8gY29udGV4dC5mYWxzZW5lc3MgJiYgY29udGV4dC5mYWxzZW5lc3MuY29udGFpbnMoY291cnNlKSB9fVxuXHRcdFx0IC8qIHNpbmdsZSBzcGFjZSAqL1xuXHRcdFx0c3R5bGU9XCJ7ez0gY29udGV4dC5zdHlsZUZhbHNlIH19XCJcblx0XHR7ez99fVxuXHQ+XG5cdFx0e3s9IGNvdXJzZS5wcmludCgndGV4dCcpIH19XG5cdDwvb3B0aW9uPlxuXHR7eyBjb250ZXh0LnRvdWNoUm93cyAtPSBjb3Vyc2UuZXN0aW1hdGVSb3dzKCk7IH19XG57e359fVxuIiwiLyoqXG4gKiBGcmVlIFRvdWNoIFByaWNrZXJcbiAqIEBhdXRob3IgTGVpZ2ggU2ltcHNvbiA8Y29kZUBzaW1wbGVpZ2guY29tPlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgMjAxNS0xOCBMZWlnaCBTaW1wc29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbi8qKlxuICogUmVuZGVycyBhIHRvdWNoIGZvciBjb25zdW1wdGlvbiBieSBzaXJpbC1iYXNlZCBwcm92ZXJzXG4gKiBAcGFyYW0ge251bWJlcn0gIHRvdWNoUm93cyAgcm93cyBpbiB0aGUgdG91Y2hcbiAqL1xuXG57e1xuXHR2YXIgY291cnNlTmFtZXMgPSBbIF0sXG5cdFx0cm91bmRzID0gUHJpY2tlci5zdHJpbmdGcm9tUm93KFxuXHRcdFx0UHJpY2tlci5yb3dGcm9tU3RyaW5nKCcnLCBjb250ZXh0Lm9iamVjdC5nZXRJbml0aWFsUm93KCkubGVuZ3RoKVxuXHRcdCk7XG5cblx0Y29udGV4dC50b3VjaFJvd3MgPSBjb250ZXh0LnRvdWNoUm93cyB8fCBJbmZpbml0eTtcblx0Y29udGV4dC50b3VjaFJvd3MgLT0gMjsgIC8qIFRPRE86IG1hZ2ljIG51bWJlciAqL1xufX1cblxuLyogSGVhZGVyICovXG4vLyBHZW5lcmF0ZWQgYnkgRnJlZSBUb3VjaCBQcmlja2Vye3s9ICdcXG4nIH19XG4vLyBodHRwczovL2dpdGh1Yi5jb20vc2ltcGxlaWdoL3RvdWNoLXByaWNrZXJ7ez0gJ1xcbicgfX1cbnt7PSAnXFxuJyB9fVxuXG4vKiBPdXRwdXQgdG91Y2ggYXMgY29tbWVudHMgKi9cbi8vIHt7PSBQcmlja2VyLnN0cmluZ0Zyb21Sb3coY29udGV4dC5vYmplY3QuZ2V0SW5pdGlhbFJvdygpKSB9fXt7PSAnXFxuJyB9fVxue3t+IGNvbnRleHQub2JqZWN0LmdldENvdXJzZXMoKSA6Y291cnNlIH19XG5cdC8vIHt7PSBjb3Vyc2UucHJpbnQoJ3RleHQnKSB9fXt7PSAnXFxuJyB9fVxue3t+fX1cbnt7PSAnXFxuJyB9fVxuXG4vKiBOdW1iZXIgb2YgYmVsbHMgKi9cbnt7PSBjb250ZXh0Lm9iamVjdC5nZXRJbml0aWFsUm93KCkubGVuZ3RoIH19IGJlbGxze3s9ICdcXG4nIH19XG57ez0gJ1xcbicgfX1cblxuLyogTWljcm9TSVJJTCB3aWxsIHByb3ZlIHRoZSBmaXJzdCBzeW1ib2wgaW4gdGhlIGZpbGUsIHNvIGRlZmluZSBpdCAqL1xuY29tcG9zaXRpb24gPSB0b3VjaHt7PSAnXFxuJyB9fVxue3s9ICdcXG4nIH19XG5cbi8qIFNob3J0IGJsb2NrcyAqL1xuc2xvdyA9ICszLjEuMy4xLjN7ez0gJ1xcbicgfX1cbnF1aWNrID0gKzEuMy4xLjMuMXt7PSAnXFxuJyB9fVxucGxhaW4gPSAre3s9IHJvdW5kcy5zbGljZSgtMSkgfX17ez0gJ1xcbicgfX1cbmJvYiA9ICt7ez0gcm91bmRzLnNsaWNlKC0zLCAtMikgfX17ez0gJ1xcbicgfX1cbnNpbmdsZSA9ICt7ez0gcm91bmRzLnNsaWNlKC0zKSB9fXt7PSAnXFxuJyB9fVxuLyogQ2FuJ3QgdXNlIHRoZSBuYW1lIFwic3RhcnRcIjogaXQncyBwcm9jZXNzZWQgc2VwYXJhdGVseSBieSBnc2lyaWwgKi9cbnN0cnQgPSB7ez0gY29udGV4dC5vYmplY3QuZ2V0U3RhcnQoKS5wcmludCgnc2lyaWwnKSB9fXt7PSAnXFxuJyB9fVxue3s9ICdcXG4nIH19XG5cbi8qIENvdXJzZSBkZWZpbml0aW9ucyAqL1xue3t+IGNvbnRleHQub2JqZWN0LmdldENvdXJzZXMoKSA6Y291cnNlOmluZGV4IH19XG5cdGNvdXJzZXt7PSBpbmRleCArIDEgfX0gPVxuXHQgLyogc2luZ2xlIHNwYWNlICovXG5cdHt7PSBjb3Vyc2UucHJpbnQoJ3NpcmlsJywgeyd0b3VjaFJvd3MnOiBjb250ZXh0LnRvdWNoUm93c30pIH19XG5cdHt7IGNvdXJzZU5hbWVzLnB1c2goJ2NvdXJzZScgKyAoaW5kZXggKyAxKSk7IH19XG5cblx0e3sgY29udGV4dC50b3VjaFJvd3MgLT0gY291cnNlLmVzdGltYXRlUm93cygpOyB9fVxuXHR7ez8gY29udGV4dC50b3VjaFJvd3MgPD0gMCB9fVxuXHRcdHt7IGJyZWFrOyB9fVxuXHR7ez99fVxue3t+fX1cbnt7PSAnXFxuJyB9fVxuXG4vKiBUb3VjaCAtIGFsbCB0aGUgY291cnNlcyAqL1xudG91Y2ggPSBzdHJ0LCB7ez0gY291cnNlTmFtZXMuam9pbignLCAnKSB9fXt7PSAnXFxuJyB9fVxue3s9ICdcXG4nIH19XG5cbi8qIERlZmluZSB0aGUgdG91Y2ggdG8gcHJvdmUgZm9yIEdTaXJpbCAqL1xucHJvdmUgdG91Y2h7ez0gJ1xcbicgfX1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vKipcbiAqIFJlbmRlcnMgYSB0b3VjaCBhcyB0ZXh0XG4gKi9cblxue3sgdmFyIHN0YXJ0ID0gY29udGV4dC5vYmplY3QuZ2V0U3RhcnQoKS5wcmludCgndGV4dCcpOyB9fVxuXG57ez0gUHJpY2tlci5zdHJpbmdGcm9tUm93KGNvbnRleHQub2JqZWN0LmdldFN0YXJ0KCkuZ2V0TGFzdCgpKSB9fXt7PSAnXFxuJyB9fVxue3t+IGNvbnRleHQub2JqZWN0LmdldENvdXJzZXMoKSA6Y291cnNlIH19XG5cdHt7PSBjb3Vyc2UucHJpbnQoJ3RleHQnLCB7J2VuZCc6ICdcXG4nfSkgfX1cbnt7fn19XG5cbnt7PyBzdGFydCB9fVxuXHR7ez0gc3RhcnQgfX17ez0gJ1xcbicgfX1cbnt7P319XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLyoqXG4gKiBSZW5kZXJzIGFuIEFic3RyYWN0U2NoZW1lIGFzIHRleHRcbiAqL1xuXG57e34gY29udGV4dC5vYmplY3QuZ2V0TWF0Y2hlcnMoKSA6bWF0Y2hlciB9fVxuXG5cdHt7PSBtYXRjaGVyLnByaW50KCd0ZXh0JykgfX1cblxue3t+fX1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vKipcbiAqIENTUyBmb3IgTUJELXN0eWxlIHByaWNrZXJcbiAqL1xuXG4jc2l4ZW5kcyB7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgZm9udC1mYW1pbHk6IFwiQ291cmllciBOZXdcIiwgXCJDb3VyaWVyXCIsIFwibW9ub3NwYWNlXCI7XG4gICAgZm9udC1zaXplOiAxMnB0O1xuICAgIG1hcmdpbi1yaWdodDogMjVweDtcbn1cblxuI2NvbnRyb2xzIHtcbiAgICBmbG9hdDogbGVmdDtcbiAgICBtYXJnaW4tcmlnaHQ6IDI1cHg7XG59XG5cbi50YWIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNFRkVGRjc7XG4gICAgYm9yZGVyLWNvbG9yOiBibGFjaztcbiAgICBib3JkZXItcmFkaXVzOiAxNXB4IDAgMCAwO1xuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgYm9yZGVyLXdpZHRoOiAxcHggMXB4IDAgMXB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmbG9hdDogbGVmdDtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xuICAgIHBhZGRpbmctcmlnaHQ6IDhweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi50YWItc2VsZWN0ZWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNCREJERTc7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbiNwYWdlcyB7XG4gICAgd2lkdGg6IDM2MHB4O1xufVxuXG4ucGFnZSB7XG4gICAgYm9yZGVyLWNvbG9yOiBibGFjaztcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgIGJvcmRlci13aWR0aDogMXB4O1xuICAgIGNsZWFyOiBsZWZ0O1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgcGFkZGluZzogOXB4O1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICB3aWR0aDogMzQwcHg7XG59XG5cbi5wYWdlLXNlbGVjdGVkIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xufVxuXG4ucGFnZSBkaXYsIC5wYWdlIGRpdiNzYXZlZENhbGxpbmcge1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG5cbi5wYWdlIGRpdjpsYXN0LW9mLXR5cGUge1xuICAgIG1hcmdpbi1ib3R0b206IDBweDtcbn1cblxuLnBhZ2UgZm9ybSB7XG4gICAgaGVpZ2h0OiAyNXB4O1xuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG59XG5cbi5wYWdlIHRleHRhcmVhIHtcbiAgICBib3JkZXItd2lkdGg6IDFweDtcbiAgICBoZWlnaHQ6IDQ1MHB4O1xuICAgIHBhZGRpbmc6IDFweDtcbiAgICB3aWR0aDogMzM2cHg7XG59XG5cbiN0b3VjaCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0VGRUZGNztcbiAgICBmbG9hdDogbGVmdDtcbiAgICBwYWRkaW5nOiAxMHB4O1xufVxuXG4uc2xvd1NpeCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0YwRjBGODtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5xdWlja1NpeCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0UyRTJGMDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5leHRyYVNpeCB7XG4gICAgY29sb3I6ICM1MDUwNTA7XG59XG5cbi5mYWxzZUJsb2NrIHtcbiAgICBjb2xvcjogcmVkO1xufVxuXG4ubXVzaWNhbEJsb2NrIHtcbiAgICBjb2xvcjogZ29sZDtcbn1cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vKipcbiAqIEhUTUwgZm9yIE1CRC1zdHlsZSBwcmlja2VyXG4gKi9cblxuPGRpdiBpZD1cInNpeGVuZHNcIj48L2Rpdj5cblxuPGRpdiBpZD1cImNvbnRyb2xzXCI+XG5cbiAgPGRpdiBpZD1cInRhYnNcIj5cbiAgICA8ZGl2IGlkPVwidGFiX3ByaWNraW5nXCIgb25jbGljaz1cInByaWNrZXIub25UYWIoJ3ByaWNraW5nJylcIiBjbGFzcz1cInRhYiB0YWItc2VsZWN0ZWRcIj5Qcmlja2luZzwvZGl2PlxuICAgIDxkaXYgaWQ9XCJ0YWJfbG9hZFNhdmVcIiBvbmNsaWNrPVwicHJpY2tlci5vblRhYignbG9hZFNhdmUnKVwiIGNsYXNzPVwidGFiXCI+TG9hZC9TYXZlPC9kaXY+XG4gICAgPGRpdiBpZD1cInRhYl9zaXJpbFwiICAgIG9uY2xpY2s9XCJwcmlja2VyLm9uVGFiKCdzaXJpbCcpXCIgICAgY2xhc3M9XCJ0YWJcIj5TaXJpbDwvZGl2PlxuICAgIDxkaXYgaWQ9XCJ0YWJfbXVzaWNcIiAgICBvbmNsaWNrPVwicHJpY2tlci5vblRhYignbXVzaWMnKVwiICAgIGNsYXNzPVwidGFiXCI+TXVzaWM8L2Rpdj5cblx0PGRpdiBpZD1cInRhYl92aWV3XCIgICAgIG9uY2xpY2s9XCJwcmlja2VyLm9uVGFiKCd2aWV3JylcIiAgICAgY2xhc3M9XCJ0YWJcIj5WaWV3PC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgaWQ9XCJwYWdlc1wiPlxuXG4gICAgPGRpdiBjbGFzcz1cInBhZ2UgcGFnZS1zZWxlY3RlZFwiIGlkPVwicGFnZV9wcmlja2luZ1wiPlxuICAgICAgPGRpdj5cbiAgICAgICAgPGxhYmVsIGZvcj1cInN0YWdlXCI+TnVtYmVyIG9mIGJlbGxzOjwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3QgaWQ9XCJzdGFnZVwiIG9uY2hhbmdlPVwicHJpY2tlci5vblN0YWdlKClcIj48L3NlbGVjdD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdj5cbiAgICAgICAgQ291cnNlIGZyb20gcm91bmRzOlxuICAgICAgICA8ZGl2IGlkPVwiY2FsbGluZ0Zyb21Sb3VuZHNcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdj5cbiAgICAgICAgRnJvbSBjdXJyZW50IHN0YXJ0IHJvdzpcbiAgICAgICAgPGRpdiBpZD1cImNhbGxpbmdcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdj5cbiAgICAgICAgPGZvcm0gb25zdWJtaXQ9XCJyZXR1cm4gZmFsc2VcIj5cbiAgICAgICAgPGxhYmVsIGZvcj1cImluaXRpYWxSb3dcIj5TdGFydGluZyByb3c6PC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJpbml0aWFsUm93XCIgc2l6ZT1cIjE1XCIgbWF4TGVuZ3RoPVwiMTVcIiAvPlxuICAgICAgICA8YnV0dG9uIG9uY2xpY2s9XCJwcmlja2VyLm9uU2V0SW5pdGlhbFJvdygpXCI+U2V0PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gb25jbGljaz1cInByaWNrZXIub25SZXNldEluaXRpYWxSb3coKVwiPlJlc2V0PC9idXR0b24+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdj5cbiAgICAgICAgPGxhYmVsIGZvcj1cImZpcnN0U2l4XCI+Rmlyc3Qgc2l4OjwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3QgaWQ9XCJmaXJzdFNpeFwiIG9uY2hhbmdlPVwicHJpY2tlci5vbkZpcnN0U2l4KClcIj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwie3s9IFByaWNrZXIuU2l4VHlwZS5TbG93IH19XCI+U2xvdzwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ7ez0gUHJpY2tlci5TaXhUeXBlLlF1aWNrIH19XCI+UXVpY2s8L29wdGlvbj5cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxmb3JtIG9uc3VibWl0PVwicmV0dXJuIGZhbHNlXCI+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJjb3Vyc2VMZW5ndGhcIj5Db3Vyc2UgbGVuZ3RoOjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiY291cnNlTGVuZ3RoXCIgc2l6ZT1cIjJcIiBtYXhMZW5ndGg9XCIyXCIgLz5cbiAgICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwicHJpY2tlci5vblNldExlbmd0aCgpXCI+U2V0PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gb25jbGljaz1cInByaWNrZXIub25SZXNldExlbmd0aCgpXCI+UmVzZXQ8L2J1dHRvbj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICA8bGFiZWwgZm9yPVwiY2FsbFJlc2V0XCI+Q3VycmVudCBjYWxsaW5nOjwvbGFiZWw+XG4gICAgICAgIDxidXR0b24gaWQ9XCJjYWxsUmVzZXRcIiBvbmNsaWNrPVwicHJpY2tlci5vblJlc2V0Q2FsbHMoKVwiPlJlc2V0PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXY+XG4gICAgICAgIFNhdmVkIGNhbGxpbmc6XG4gICAgICAgIDxkaXYgaWQ9XCJzYXZlZENhbGxpbmdcIj48L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiBpZD1cInNhdmVDYWxsaW5nXCIgb25jbGljaz1cInByaWNrZXIub25TYXZlQ2FsbGluZygpXCI+U2F2ZTwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGlkPVwibG9hZENhbGxpbmdcIiBvbmNsaWNrPVwicHJpY2tlci5vbkxvYWRDYWxsaW5nKClcIj5Mb2FkPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJwYWdlXCIgaWQ9XCJwYWdlX2xvYWRTYXZlXCI+XG4gICAgICA8Zm9ybSBvbnN1Ym1pdD1cInJldHVybiBmYWxzZVwiPlxuICAgICAgICA8YnV0dG9uIG9uY2xpY2s9XCJwcmlja2VyLm9uTG9hZFRvdWNoKClcIj5JbXBvcnQ8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwicHJpY2tlci5vblNhdmVUb3VjaCgpXCI+RXhwb3J0PC9idXR0b24+XG4gICAgICA8L2Zvcm0+XG4gICAgICA8dGV4dGFyZWEgaWQ9XCJsb2FkU2F2ZVRleHRhcmVhXCI+PC90ZXh0YXJlYT5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJwYWdlXCIgaWQ9XCJwYWdlX3NpcmlsXCI+XG4gICAgICA8Zm9ybSBvbnN1Ym1pdD1cInJldHVybiBmYWxzZVwiPlxuICAgICAgICA8YnV0dG9uIG9uY2xpY2s9XCJwcmlja2VyLm9uR2VuZXJhdGVTaXJpbCgpXCI+R2VuZXJhdGU8L2J1dHRvbj5cbiAgICAgIDwvZm9ybT5cbiAgICAgIDx0ZXh0YXJlYSBpZD1cInNpcmlsVGV4dGFyZWFcIj48L3RleHRhcmVhPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInBhZ2VcIiBpZD1cInBhZ2VfbXVzaWNcIj5cbiAgICAgIDxmb3JtIG9uc3VibWl0PVwicmV0dXJuIGZhbHNlXCI+XG4gICAgICAgIDxidXR0b24gb25jbGljaz1cInByaWNrZXIub25BbmFseXNlTXVzaWMoKVwiPkFuYWx5c2U8L2J1dHRvbj5cbiAgICAgIDwvZm9ybT5cbiAgICAgIDx0ZXh0YXJlYSBpZD1cIm11c2ljVGV4dGFyZWFcIj48L3RleHRhcmVhPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInBhZ2VcIiBpZD1cInBhZ2Vfdmlld1wiPlxuICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwic2hvd1NpeEhlYWRzXCIgb25jbGljaz1cInByaWNrZXIub25TaG93U2l4SGVhZHMoKVwiLz5cbiAgICAgIDxsYWJlbCBmb3I9XCJzaG93U2l4SGVhZHNcIj5TaG93IHNpeCBoZWFkczwvbGFiZWw+XG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG5cbjwvZGl2PlxuXG48ZGl2IGlkPVwidG91Y2hcIj5cbiAgPGRpdj5cbiAgICA8YnV0dG9uIG9uY2xpY2s9XCJwcmlja2VyLm9uUHJvdmUoKVwiPlBST1ZFPC9idXR0b24+XG4gICAgPHNwYW4gaWQ9XCJwcm9vZlJlc3VsdFwiPjwvc3Bhbj5cbiAgPC9kaXY+XG4gIDxkaXYgaWQ9XCJudW1Sb3dzXCI+PC9kaXY+XG4gIDxsYWJlbD5cbiAgICA8aW5wdXQgaWQ9XCJyb2xsaW5nXCIgdHlwZT1cImNoZWNrYm94XCIgLz5cbiAgICBSb2xsaW5nIGNvdXJzZSBlbnRyeVxuICA8L2xhYmVsPlxuICA8Zm9ybSBvbnN1Ym1pdD1cInJldHVybiBmYWxzZVwiPlxuICAgIDxidXR0b24gb25jbGljaz1cInByaWNrZXIub25JbnNlcnRDb3Vyc2UoKVwiPkluc2VydDwvYnV0dG9uPlxuICAgIDxidXR0b24gb25jbGljaz1cInByaWNrZXIub25QYXN0ZUNvdXJzZSgpXCI+UGFzdGU8L2J1dHRvbj5cbiAgICA8YnV0dG9uIG9uY2xpY2s9XCJwcmlja2VyLm9uQ29weUNvdXJzZSgpXCI+Q29weTwvYnV0dG9uPlxuICAgIDxidXR0b24gb25jbGljaz1cInByaWNrZXIub25DdXRDb3Vyc2UoKVwiPkN1dDwvYnV0dG9uPlxuICAgIDxidXR0b24gb25jbGljaz1cInByaWNrZXIub25EZWxldGVDb3Vyc2UoKVwiPkRlbGV0ZTwvYnV0dG9uPlxuICA8L2Zvcm0+XG4gIDxzZWxlY3QgaWQ9XCJjb3Vyc2VzXCI+XG4gIDwvc2VsZWN0PlxuICA8Zm9ybSBvbnN1Ym1pdD1cInJldHVybiBmYWxzZVwiPlxuICAgIDxidXR0b24gb25jbGljaz1cInByaWNrZXIub25JbnNlcnRDb3Vyc2UoKVwiPkluc2VydDwvYnV0dG9uPlxuICAgIDxidXR0b24gb25jbGljaz1cInByaWNrZXIub25QYXN0ZUNvdXJzZSgpXCI+UGFzdGU8L2J1dHRvbj5cbiAgICA8YnV0dG9uIG9uY2xpY2s9XCJwcmlja2VyLm9uQ29weUNvdXJzZSgpXCI+Q29weTwvYnV0dG9uPlxuICAgIDxidXR0b24gb25jbGljaz1cInByaWNrZXIub25DdXRDb3Vyc2UoKVwiPkN1dDwvYnV0dG9uPlxuICAgIDxidXR0b24gb25jbGljaz1cInByaWNrZXIub25EZWxldGVDb3Vyc2UoKVwiPkRlbGV0ZTwvYnV0dG9uPlxuICA8L2Zvcm0+XG48L2Rpdj5cbiIsIi8qKlxuICogRnJlZSBUb3VjaCBQcmlja2VyXG4gKiBAYXV0aG9yIExlaWdoIFNpbXBzb24gPGNvZGVAc2ltcGxlaWdoLmNvbT5cbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IDIwMTUtMTggTGVpZ2ggU2ltcHNvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG4vKipcbiAqIFJlbmRlcnMgYSBQYXR0ZXJuIGFzIHRleHRcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbmQgIGxpbmUgZW5kaW5nXG4gKi9cblxue3s/IGNvbnRleHQuZW5kID09PSB1bmRlZmluZWQgfX1cblx0e3sgY29udGV4dC5lbmQgPSAnXFxuJzsgfX1cbnt7P319XG5cbnt7PyBjb250ZXh0Lm9iamVjdC5nZXRNYXRjaENvdW50KCkgPiAwIH19XG5cblx0e3s/IGNvbnRleHQub2JqZWN0LmlzV2lsZGNhcmRNYXRjaCgpIHx8XG5cdFx0XHRjb250ZXh0Lm9iamVjdC5nZXRNYXRjaENvdW50KCkgPiAxXG5cdH19XG5cdFx0e3s9IGNvbnRleHQub2JqZWN0LmdldE1hdGNoQ291bnQoKSB9fVxuXHRcdCAvKiBzaW5nbGUgc3BhY2UgKi9cblx0e3s/fX1cblxuXHR7ez0gY29udGV4dC5vYmplY3QuZ2V0TmFtZSgpIH19XG5cblx0e3s9IGNvbnRleHQuZW5kIH19XG5cbnt7P319XG4iLCIvKipcbiAqIEZyZWUgVG91Y2ggUHJpY2tlclxuICogQGF1dGhvciBMZWlnaCBTaW1wc29uIDxjb2RlQHNpbXBsZWlnaC5jb20+XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAyMDE1LTE4IExlaWdoIFNpbXBzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLyoqXG4gKiBSZW5kZXJzIGEgUGF0dGVybkdyb3VwIGFzIHRleHRcbiAqL1xuXG57ez8gY29udGV4dC5vYmplY3QuZ2V0TWF0Y2hDb3VudCgpID4gMCB9fVxuXG5cdHt7PSBjb250ZXh0Lm9iamVjdC5nZXRNYXRjaENvdW50KCkgfX1cblxuXHQgLyogc2luZ2xlIHNwYWNlICovXG5cblx0e3s9IGNvbnRleHQub2JqZWN0LmdldE5hbWUoKSB9fVxuXG5cdHt7PyBjb250ZXh0Lm9iamVjdC5nZXRTdWJtYXRjaENvdW50KCkgPiAwIH19XG5cblx0XHQgLyogc2luZ2xlIHNwYWNlICovXG5cdFx0KFxuXG5cdFx0e3sgdmFyIGZpcnN0ID0gdHJ1ZTsgfX1cblx0XHR7e34gY29udGV4dC5vYmplY3QuZ2V0UGF0dGVybnMoKSA6cGF0dGVybiB9fVxuXHRcdFx0e3sgaWYgKCFwYXR0ZXJuKSB7IGNvbnRpbnVlOyB9IC8qIElFOCB0cmFpbGluZyBjb21tYSAqLyB9fVxuXHRcdFx0e3s/IHBhdHRlcm4uZ2V0TWF0Y2hDb3VudCgpID4gMCB9fVxuXHRcdFx0XHR7ez8gIWZpcnN0IH19LCB7ez99fVxuXHRcdFx0XHR7ez0gcGF0dGVybi5wcmludCgndGV4dCcsIHsnZW5kJzogJyd9KSB9fVxuXHRcdFx0XHR7eyBmaXJzdCA9IGZhbHNlOyB9fVxuXHRcdFx0e3s/fX1cblx0XHR7e359fVxuXG5cdFx0KVxuXG5cdHt7P319XG5cblx0e3s9ICdcXG4nIH19XG5cbnt7P319XG4iXX0=
