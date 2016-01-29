/**
 * Possible candidate for test generation? Templates:
 *
 * (function f(n) { ----body----  }(10000))
 * (function* f(n) { ----body----  }(10000))
 * ((n) => { ---body--- }(10000))
 */
(function() {
  var p = typeof print === 'undefined' ? console.log.bind(console) : print;
  if (typeof InternalError === 'undefined') { InternalError = Error; }
  var stmts = [
    // BlockStatement
    { d: 'block', f: 'stmt', expected: true, pattern: '{ S }' },
    { d: 'block', f: 'stmt-list', expected: true, pattern: '{ void 0; S }' },

    // Declaration
    { d: 'function', expected: false, pattern: 'function x() { S } x();' },
    { d: 'class', expected: false, pattern: 'class C { method() { S } } new C().method();' },

    // VariableStatement
    { d: 'variable', f: 'sngl', expected: false, pattern: 'var x = E;' },
    { d: 'variable', f: 'mult', expected: false, pattern: 'var x, y = E;' },
    { d: 'variable', f: 'dstr', expected: false, pattern: 'var [x] = [E];' },
    { d: 'let', f: 'sngl', expected: false, pattern: 'let x = E;' },
    { d: 'let', f: 'mult', expected: false, pattern: 'let x, y = E;' },
    { d: 'let', f: 'dstr', expected: false, pattern: 'let [x] = [E];' },
    { d: 'const', f: 'sngl', expected: false, pattern: 'const x = E;' },
    { d: 'const', f: 'mult', expected: false, pattern: 'const x = 0, y = E;' },
    { d: 'const', f: 'dstr', expected: false, pattern: 'const [x] = [E];' },

    // ExpressionStatement
    { d: 'expression', expected: false, pattern: 'E;' },

    // IfStatement
    { d: 'if', f: 'if-body', expected: true, pattern: 'if (true) { S }' },
    { d: 'if', f: 'if-cond', expected: false, pattern: 'if (E) {}' },
    { d: 'if', f: 'else-body', expected: true, pattern: 'if (false) { } else { S }' },
    { d: 'if', f: 'else-cond', expected: false, pattern: 'if (E) { } else { }' },

    // BreakableStatement
      // SwitchStatement
      { d: 'switch', f: 'cond', expected: false, pattern: 'switch(E) {}' },
      { d: 'switch', f: 'cond-dftl', expected: false, pattern: 'switch(E) { default: }' },
      { d: 'switch', f: 'case-sltr', expected: false, pattern: 'switch(0) { case E: }' },
      { d: 'switch', f: 'case-body', expected: true, pattern: 'switch(0) { case 0: S }' },
      { d: 'switch', f: 'dftl-body', expected: true, pattern: 'switch(0) { default: S }' },
      { d: 'switch', f: 'case-sltr-dflt', expected: false, pattern: 'switch(0) { case E: default: }' },
      { d: 'switch', f: 'case-body-dflt', expected: true, pattern: 'switch(0) { case 0: S default: }' },

      // IterationStatement
      { d: 'for-in', f: 'lhs-body', expected: false, pattern: 'var y; for (y in [0]) { S }' },
      { d: 'for-in', f: 'lhs-expr', expected: false, pattern: 'var y; for (y in E) { }' },
      { d: 'for-in', f: 'var-body', expected: false, pattern: 'for (var y in [0]) { S }' },
      { d: 'for-in', f: 'var-expr', expected: false, pattern: 'for (var y in E) { }' },
      { d: 'for-in', f: 'let-body', expected: false, pattern: 'for (let y in [0]) { S }' },
      { d: 'for-in', f: 'let-expr', expected: false, pattern: 'for (let y in E) { }' },
      { d: 'for-in', f: 'const-body', expected: false, pattern: 'for (const y in [0]) { S }' },
      { d: 'for-in', f: 'const-expr', expected: false, pattern: 'for (const y in E) { }' },

      { d: 'for-of', f: 'lhs-body', expected: false, pattern: 'var y; for (y of [0]) { S }' },
      { d: 'for-of', f: 'lhs-expr', expected: false, pattern: 'var y; for (y of E) { }' },
      { d: 'for-of', f: 'var-body', expected: false, pattern: 'for (var y of [0]) { S }' },
      { d: 'for-of', f: 'var-expr', expected: false, pattern: 'for (var y of E) { }' },
      { d: 'for-of', f: 'let-body', expected: false, pattern: 'for (let y of [0]) { S }' },
      { d: 'for-of', f: 'let-expr', expected: false, pattern: 'for (let y of E) { }' },
      { d: 'for-of', f: 'const-body', expected: false, pattern: 'for (const y of [0]) { S }' },
      { d: 'for-of', f: 'const-expr', expected: false, pattern: 'for (const y of E) { }' },

      { d: 'for', f: 'lhs-body', expected: true, pattern: 'var x; for (x = 0; x < 1; ++x) { S }' },
      { d: 'for', f: 'lhs-init', expected: false, pattern: 'for (E; ;) { }' },
      { d: 'for', f: 'lhs-test', expected: false, pattern: 'for (; E;) { }' },
      { d: 'for', f: 'lhs-incr', expected: false, pattern: 'for (; ; E) { }' },
      { d: 'for', f: 'var-body', expected: true, pattern: 'for (var x = 0; ;) { S }' },
      { d: 'for', f: 'var-init', expected: false, pattern: 'for (var x = E; ;) { }' },
      { d: 'for', f: 'var-test', expected: false, pattern: 'for (var x = 0; E;) { }' },
      { d: 'for', f: 'var-incr', expected: false, pattern: 'for (var x = 0; ; E) { }' },
      { d: 'for', f: 'let-body', expected: true, pattern: 'for (let x = 0; ;) { S }' },
      { d: 'for', f: 'let-init', expected: false, pattern: 'for (let x = E; ;) { }' },
      { d: 'for', f: 'let-test', expected: false, pattern: 'for (let x = 0; E;) { }' },
      { d: 'for', f: 'let-incr', expected: false, pattern: 'for (let x = 0; ; E) { }' },
      { d: 'for', f: 'const-body', expected: true, pattern: 'for (const x = 0; ;) { S }' },
      { d: 'for', f: 'const-init', expected: false, pattern: 'for (const x = E; ;) { }' },
      { d: 'for', f: 'const-test', expected: false, pattern: 'for (const x = 0; E;) { }' },
      { d: 'for', f: 'const-incr', expected: false, pattern: 'for (const x = 0; ; E) { }' },

      { d: 'do-while', f: 'body', expected: true, pattern: 'do { S } while (false)' },
      { d: 'do-while', f: 'expr', expected: false, pattern: 'do { } while (E)' },

      { d: 'while', f: 'expr', expected: false, pattern: 'while (E) { }' },
      { d: 'while', f: 'body', expected: true, pattern: 'while (true) { S }' },

    // ReturnStatement
    // (a little useless--all the other tests rely on this being correct)
    { d: 'return', expected: true, pattern: 'return E;' },

    // WithStatement
    // (these are a special case and probably not worth testing since TCO
    // doesn't occur outside of strict mode)
    //{ expected: false, pattern: 'with ({}) { S }' },
    //{ expected: false, pattern: 'with (E) { }' },

    // LabeledStatement
    { d: 'labeled', expected: true, pattern: 'test262: S' },

    // ThrowStatement
    { d: 'throw', expected: false, pattern: 'throw E;' },

    // TryStatement
    { d: 'try', f: 'try', expected: false, pattern: 'try { S } catch (err) { throw err; }' },
    { d: 'try', f: 'catch', expected: true, pattern: 'try { throw null; } catch (err) { S }' },
    { d: 'try', f: 'catch-finally', expected: true, pattern: 'try { } catch (err) { } finally { S }' },
    { d: 'try', f: 'finally', expected: true, pattern: 'try { } finally { S }' }
  ];
  var exprs = [
    // AssignmentExpression
      // ArrowFunction
      { d: 'arrow-function', expected: false, pattern: ['var a = () => f(n - 1); a();', null] },
      // LeftHandSideExpression = AssignmentExpression
      { d: 'assignment', expected: false, pre: 'var x;', pattern: 'x = f(n-1)' },
      { d: 'assignment', f: 'dstr', expected: false, pre: 'var x;', pattern: '[x = f(n-1)] = []' },
      // LeftHandSideExpression AssignmentOperator AssignmentExpression
      { d: 'compound-assignment', f: 'add', expected: false, pre: 'var x;', pattern: 'x += f(n-1)' },
      { d: 'compound-assignment', f: 'sub', expected: false, pre: 'var x;', pattern: 'x -= f(n-1)' },
      { d: 'compound-assignment', f: 'mlt', expected: false, pre: 'var x;', pattern: 'x *= f(n-1)' },
      { d: 'compound-assignment', f: 'div', expected: false, pre: 'var x;', pattern: 'x /= f(n-1)' },
      { d: 'compound-assignment', f: 'mod', expected: false, pre: 'var x;', pattern: 'x %= f(n-1)' },
      { d: 'compound-assignment', f: 'lshft', expected: false, pre: 'var x;', pattern: 'x <<= f(n-1)' },
      { d: 'compound-assignment', f: 'rshft', expected: false, pre: 'var x;', pattern: 'x >>= f(n-1)' },
      { d: 'compound-assignment', f: 'urshft', expected: false, pre: 'var x;', pattern: 'x >>>= f(n-1)' },
      { d: 'compound-assignment', f: 'and', expected: false, pre: 'var x;', pattern: 'x &= f(n-1)' },
      { d: 'compound-assignment', f: 'or', expected: false, pre: 'var x;', pattern: 'x |= f(n-1)' },
      { d: 'compound-assignment', f: 'not', expected: false, pre: 'var x;', pattern: 'x ^= f(n-1)' },

    // BitwiseANDExpression
    { d: 'bitwise-and', f: 'right', expected: false, pattern: '0 & f(n-1)' },
    { d: 'bitwise-and', f: 'left', expected: false, pattern: 'f(n-1) & 0' },

    // BitwiseXORExpression
    { d: 'bitwise-xor', f: 'right', expected: false, pattern: '0 ^ f(n-1)' },
    { d: 'bitwise-xor', f: 'left', expected: false, pattern: 'f(n-1) ^ 0' },

    // BitwiseORExpression
    { d: 'bitwise-or', f: 'right', expected: false, pattern: '0 | f(n-1)' },
    { d: 'bitwise-or', f: 'left', expected: false, pattern: 'f(n-1) | 0' },

    // EqualityExpression
    { d: 'equals', f: 'right', expected: false, pattern: '0 == f(n-1)' },
    { d: 'equals', f: 'left', expected: false, pattern: 'f(n-1) == 0' },
    { d: 'does-not-equals', f: 'right', expected: false, pattern: '0 != f(n-1)' },
    { d: 'does-not-equals', f: 'left', expected: false, pattern: 'f(n-1) != 0' },
    { d: 'strict-equals', f: 'roight', expected: false, pattern: '0 === f(n-1)' },
    { d: 'strict-equals', f: 'left', expected: false, pattern: 'f(n-1) === 0' },
    { d: 'strict-does-not-equals', f: 'right', expected: false, pattern: '0 !== f(n-1)' },
    { d: 'strict-does-not-equals', f: 'left', expected: false, pattern: 'f(n-1) !== 0' },

    // RelationalExpression
    { d: 'less-than', f: 'right', expected: false, pattern: '0 < f(n-1)' },
    { d: 'less-than', f: 'left',  expected: false, pattern: 'f(n-1) < 0' },
    { d: 'greater-than', f: 'right', expected: false, pattern: '0 > f(n-1)' },
    { d: 'greater-than', f: 'left', expected: false, pattern: 'f(n-1) > 0' },
    { d: 'less-than-or-equal-to', f: 'right', expected: false, pattern: '0 <= f(n-1)' },
    { d: 'less-than-or-equal-to', f: 'left', expected: false, pattern: 'f(n-1) <= 0' },
    { d: 'greater-than-or-equal-to', f: 'right', expected: false, pattern: '0 >= f(n-1)' },
    { d: 'greater-than-or-equal-to', f: 'left', expected: false, pattern: 'f(n-1) >= 0' },
    { d: 'instanceof', f: 'right', expected: false, pattern: 'f instanceof f(n-1)' },
    { d: 'instanceof', f: 'left', expected: false, pattern: 'f(n-1) instanceof f' },
    { d: 'in', f: 'right', expected: false, pattern: 'f in f(n-1)' },
    { d: 'in', f: 'left', expected: false, pattern: 'f(n-1) in f' },

    // ShiftExpression
    { d: 'left-shift', f: 'right', expected: false, pattern: '0 << f(n-1)' },
    { d: 'left-shift', f: 'left', expected: false, pattern: 'f(n-1) << 0' },
    { d: 'right-shift', f: 'right', expected: false, pattern: '0 >> f(n-1)' },
    { d: 'right-shift', f: 'left', expected: false, pattern: 'f(n-1) >> 0' },
    { d: 'unsigned-right-shift', f: 'right', expected: false, pattern: '0 >>> f(n-1)' },
    { d: 'unsigned-right-shift', f: 'left', expected: false, pattern: 'f(n-1) >>> 0' },

    // AdditiveExpression
    { d: 'addition', f: 'right', expected: false, pattern: '0 + f(n-1)' },
    { d: 'addition', f: 'left', expected: false, pattern: 'f(n-1) + 0' },
    { d: 'subtraction', f: 'right', expected: false, pattern: '0 - f(n-1)' },
    { d: 'subtraction', f: 'left', expected: false, pattern: 'f(n-1) - 0' },

    // MultiplicativeExpression
    { d: 'multiplication', f: 'right', expected: false, pattern: '0 * f(n-1)' },
    { d: 'multiplication', f: 'left', expected: false, pattern: 'f(n-1) * 0' },
    { d: 'division', f: 'right', expected: false, pattern: '0 / f(n-1)' },
    { d: 'division', f: 'left', expected: false, pattern: 'f(n-1) / 0' },
    { d: 'modulus', f: 'right', expected: false, pattern: '0 % f(n-1)' },
    { d: 'modulus', f: 'left', expected: false, pattern: 'f(n-1) % 0' },

    // UnaryExpression
    { d: 'delete', expected: false, pattern: 'delete f(n-1)' },
    { d: 'void', expected: false, pattern: 'void f(n-1)' },
    { d: 'typeof', expected: false, pattern: 'typeof f(n-1)' },
    { d: 'prefix-increment', expected: false, pattern: ['var o = { get attr() { return f(n-1); } };', '++o.attr'] },
    { d: 'prefix-decrement', expected: false, pattern: ['var o = { get attr() { return f(n-1); } };', '--o.attr'] },
    { d: 'unary-plus', expected: false, pattern: '+f(n-1)' },
    { d: 'unary-minus', expected: false, pattern: '-f(n-1)' },
    { d: 'bitwise-not', expected: false, pattern: '~f(n-1)' },
    { d: 'logical-not', expected: false, pattern: '!f(n-1)' },

    // PostfixExpression
    { d: 'postfix-increment', expected: false, pattern: ['var o = { get attr() { return f(n-1); } };', 'o.attr++'] },
    { d: 'postfix-decrement', expected: false, pattern: ['var o = { get attr() { return f(n-1); } };', 'o.attr--'] },

    // CallExpression
      // SuperCall
      // TODO: This does not work; further research necessary.
      //{ d: 'super', expected: false, source: [
      //  'var finished = false;',
      //  'var child;',
      //  'class Parent {',
      //  '  constructor(n) {',
      //  '    if (n === 0) {',
      //  '      finished = true;',
      //  '      return;',
      //  '    }',
      //  '    return Child.prototype.constructor(n - 1);',
      //  '  }',
      //  '}',
      //  'class Child extends Parent {',
      //  '  constructor(n) {',
      //  '    super(n);',
      //  '  }',
      //  '}',
      //  'child = new Child();',
      //].join('\n') },
      // MemberExpression Arguments
      { d: 'call', f: 'member-args', expected: true, pattern: 'f(n-1)' },
      // CallExpression Arguments
      { d: 'call', f: 'call-args', expected: true, pattern: ['function getF() { return f; }', 'getF()(n-1)' ] },
      // CallExpression TemplateLiteral
      { d: 'tagged-template', f: 'call', expected: true, source: [
        '(function() {',
        '  "use strict";',
        '  var finished = false;',
        '  function getF() {',
        '    return f;',
        '  }',
        '  function f(_, n) {',
        '    if (n === 0) {',
        '      finished = true;',
        '      return;',
        '    }',
        '    return getF()`${n-1}`;',
        '  }',
        '  f(null, $MAX_ITERATIONS);',
        '  return finished;',
        '}());'
      ].join('\n') },
      // CallExpression [ Expression ]
      { d: 'call', f: 'brkt-call', expected: false, pattern: 'f(n-1)["prop"]' },
      { d: 'call', f: 'brkt-expr', expected: false, pattern: '[][f(n-1)]' },
      // CallExpression . IdentifierName
      { d: 'call', f: 'dot-call', expected: false, pattern: 'f(n-1).attr' },
      { d: 'call', f: 'dot-id', expected: false, pattern: ['var o = function() { return { get attr() { return f(n-1); } }; };', 'o().attr'] },

    // NewExpression
    { d: 'new', expected: false, pattern: 'new f' },

    // MemberExpression
      // MemberExpression [ Expression ]
      { d: 'member', f: 'brkt-member', expected: false, pattern: ['var o = { get attr() { return f(n-1); } };', 'o.attr["prop"]'] },
      { d: 'member', f: 'brkt-expr', expected: false, pattern: '[][f(n-1)]' },
      // MemberExpression . IdentifierName
      { d: 'member', f: 'dot-member', expected: false, pattern: ['var o = { get attr() { return f(n-1); } };', 'o.attr.prop'] },
      { d: 'member', f: 'dot-id', expected: false, pattern: ['var o = { get attr() { return f(n-1); } };', 'o.attr'] },
      // SuperProperty
      { d: 'super', f: 'brkt', expected: false, source: [
        '(function() {',
        '  "use strict";',
        '  var finished = false;',
        '  class Parent {}',
        '  class Child extends Parent {',
        '    method(n) {',
        '      Object.defineProperty(Parent.prototype, "prop", {',
        '        configurable: true,',
        '        get: function() {',
        '          if (n === 0) {',
        '            finished = true;',
        '            return;',
        '          }',
        '          return this.method(n - 1);',
        '        }',
        '      });',
        '      return super.prop;',
        '    }',
        '  }',
        '  new Child().method($MAX_ITERATIONS);',
        '  return finished;',
        '}());'
      ].join('\n') },
      { d: 'super', f: 'dot', expected: false, source: [
        '(function() {',
        '  "use strict";',
        '  var finished = false;',
        '  class Parent {}',
        '  class Child extends Parent {',
        '    method(n) {',
        '      Object.defineProperty(Parent.prototype, "prop", {',
        '        configurable: true,',
        '        get: function() {',
        '          if (n === 0) {',
        '            finished = true;',
        '            return;',
        '          }',
        '          return this.method(n - 1);',
        '        }',
        '      });',
        '      return super["prop"];',
        '    }',
        '  }',
        '  new Child().method($MAX_ITERATIONS);',
        '  return finished;',
        '}());'
      ].join('\n') },

      // MetaProperty
      // TODO: what?
      // new MemberExpression Arguments
      { expected: false, pattern: 'new f(n - 1)' },
      // MemberExpression TemplateLiteral
      { d: 'tagged-template', f: 'member', expected: true, source: [
        '(function() {',
        '  "use strict";',
        '  var finished = false;',
        '  function f(_, n) {',
        '    if (n === 0) {',
        '      finished = true;',
        '      return;',
        '    }',
        '    return f`${n-1}`;',
        '  }',
        '  f(null, $MAX_ITERATIONS);',
        '  return finished;',
        '}());'
      ].join('\n') },

    // PrimaryExpression
      // this
      // TODO: what?
      //' this',
      // IdentifierReference
      { d: 'with', expected: false, source: [
        '(function() {',
        '  var o = {};',
        '  var finished = false;',
        '  with (o) {',
        '    (function() {',
        '      "use strict";',
        '      var oneless;',
        '      Object.defineProperty(o, "prop", {',
        '        get: function() {',
        '          f(oneless);',
        '        }',
        '      });',
        '      function f(n) {',
        '        if (n === 0) {',
        '          finished = true;',
        '          return;',
        '        }',
        '        oneless = n - 1;',
        '        return prop;',
        '      }',
        '      f(100000);',
        '    }());',
        '  }',
        '  return finished;',
        '}());'
      ].join('\n') },
      // Literal
      // TODO: What?
      // ArrayLiteral
      { d: 'array', expected: false, pattern: '[f(n-1)]' },
      // ObjectLiteral
      { d: 'object', f: 'prop', expected: false, pattern: '{ [f(n-1)]: 0 }' },
      { d: 'object', f: 'val', expected: false, pattern: '{ 0: f(n-1) }' },
      // FunctionExpression
      { d: 'function', expected: false, pattern: ['var e = function() { return f(n-1); }; e();', null] },
      // ClassExpression
      { d: 'class', expected: false, pattern: ['var C = class { method() { return f(n-1); } }; new C().method();', null] },
      // GeneratorExpression
      { d: 'generators', expected: false, pattern: ['var g = function*() { return f(n-1); }; g().next();', null] },
      // RegularExpressionLiteral
      // TODO: What?
      // TemplateLiteral
      { d: 'template-literal', expected: false, pattern: '`${ f(n-1) }`' },

      // Expression
      { d: 'comma', f: 'expr', expected: false, pattern: 'f(n-1), 0' },
      { d: 'comma', f: 'final', expected: true, pattern: '0, f(n-1)' },

      // ConditionalExpression
      { d: 'conditional', f: 'cond', expected: true, pattern: 'true ? f(n-1) : 0' },
      { d: 'conditional', f: 'pos', expected: true, pattern: 'false ? 0 : f(n-1)' },
      { d: 'conditional', f: 'neg', expected: false, pattern: 'f(n-1) ? 1 : 0' },

      // LogicalANDExpression
      { d: 'logical-and', f: 'right', expected: true, pattern: 'true && f(n-1)' },
      { d: 'logical-and', f: 'left', expected: false, pattern: 'f(n-1) && true' },

      // LogicalORExpression
      { d: 'logical-or', f: 'right', expected: true, pattern: 'false || f(n-1)' },
      { d: 'logical-or', f: 'left', expected: false, pattern: 'f(n-1) || true' },

      // ParenthesizedExpression
      { f: 'pos', expected: true, pattern: '(f(n-1))' },
      { f: 'neg', expected: false, pattern: '(f(n-1) || true)' }
  ];

  function buildName(subdir, testCase) {
    var path = 'test/language/' + subdir + '/';
    if (testCase.d) {
      path += testCase.d + '/';
    }

    path += 'tco';

    if (testCase.f) {
      path += '-' + testCase.f;
    }

    return path + '.js';
  }

  var testGenerators = {
    fromStatement: function(testCase) {
      testCase.fileName = buildName('statements', testCase);
      testCase.type = 'statement';

      testCase.body = testCase.pattern
        .replace(/S/, 'return f(n - 1);')
        .replace(/E/, 'f(n - 1)');
    },
    fromExpression: function(testCase) {
      var pattern = testCase.pattern;

      testCase.fileName = buildName('expressions', testCase);
      testCase.type = 'expression';

      if (Array.isArray(pattern)) {
        testCase.body = pattern[0];
        if (pattern[1] !== null) {
          testCase.body += '\n    return ' + pattern[1] + ';';
        }
      } else {
        testCase.body = 'return ' + pattern + ';';
      }
    },
    fromBody: function(testCase) {
      // Special-case tests are defined with complete source text and may be
      // passed over.
      if (testCase.source) {
        return;
      }
      var preCall, baseCase, postCall, srcLines;

      if (testCase.expected) {
        preCall = ['var callCount = 0;'];
        baseCase = ['  callCount += 1'];
        postCall = ['assert.sameValue(callCount, 1)'];
      } else {
        preCall = [
          'var exception;',
          'try {'
        ];
        baseCase = [];
        postCall = [
          '} catch(e) {',
          '  exception = e;',
          '}',
          'assert(exception);'
        ];
      }

      if (testCase.pre) {
        preCall = preCall.concat(testCase.pre);
      }

      srcLines = []
          .concat(preCall)
          .concat([
            '(function f(n) {',
            '  "use strict";',
            '  if (n === 0) {'
          ])
          .concat(baseCase)
          .concat([
            '    return f;',
            '  }',
            '  ' + testCase.body,
            '}($MAX_ITERATIONS));'
          ])
          .concat(postCall);

        testCase.source = srcLines.join('\n');
    }
  };
  function addFrontmatter(testCase) {
    var description = testCase.type + ' is '  + (testCase.expected ? '' : 'not ') +
      'a candidate for tail-call optimization.';
    testCase.source = [
      '// Copyright (C) 2016 the V8 project authors. All rights reserved.',
      '// This code is governed by the BSD license found in the LICENSE file.',
      '/*---',
      'description: ' + description,
      'id: static-semantics-hasproductionintailposition',
      '---*/',
      '',
      ''
    ].join('\n') + testCase.source;
  }

  function execute(testCase) {
    var exception, result;

    try {
      result = eval(testCase.source);
    } catch (e) {
      exception = e;
    }

    if (exception) {
      result = exception instanceof InternalError ? 'overflow' : 'error';
    } else {
      result = 'success';
    }

    if ((result === 'success' && testCase.expected) || (result === 'overflow' && !testCase.expected)) {
      p('PASS: ' + testCase.fileName);
    } else {
      p('FAIL: ' + testCase.fileName);
      p('Actual: ' + result + ' ||| Expected: ' + testCase.expected);
      if (exception) {
        p(exception.message);
      }
      p(testCase.source + '\n\n');
    }
    //p(testCase.source + '\n\n');
  }

  exprs.map(testGenerators.fromExpression);
  stmts.map(testGenerators.fromStatement);

  var testCases = [].concat(exprs).concat(stmts);

  testCases.forEach(testGenerators.fromBody);
  testCases.forEach(addFrontmatter);

  eval([
    'var $MAX_ITERATIONS = 100000;',
    'assert = function(val) {',
    '  if (!val) {',
    '    throw new Error("Expected " + val + " to be truthy.");',
    '  }',
    '};',
    'assert.sameValue = function(a, b) {',
    '  if (a !== b) {',
    '    throw new Error("Expected " + a + " to equal " + b + ".");',
    '  }',
    '};'
  ].join('\n'));

  testCases.forEach(execute);
}());
