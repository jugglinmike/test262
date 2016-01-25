/**
 * Possible candidate for test generation? Templates:
 *
 * (function f(n) { ----body----  }(10000))
 * (function* f(n) { ----body----  }(10000))
 * ((n) => { ---body--- }(10000))
 */
(function() {
  var p = typeof print === 'undefined' ? console.log.bind(console) : print;
  var stmts = [
    // BlockStatement
    { f: 'block', expected: true, pattern: '{ S }' },
    { f: 'block', expected: true, pattern: '{ void 0; S }' },

    // Declaration
    { f: 'function', expected: false, pattern: 'function x() { S } x();' },
    { f: 'class', expected: false, pattern: 'class C { method() { S } } new C().method();' },

    // VariableStatement
    { f: 'variable', expected: false, pattern: 'var x = E;' },
    { f: 'variable', expected: false, pattern: 'var x, y = E;' },
    { f: 'variable', expected: false, pattern: 'var [x] = [E];' },
    { f: 'variable', expected: false, pattern: 'let x = E;' },
    { f: 'variable', expected: false, pattern: 'let x, y = E;' },
    { f: 'variable', expected: false, pattern: 'let [x] = [E];' },
    { f: 'variable', expected: false, pattern: 'const x = E;' },
    { f: 'variable', expected: false, pattern: 'const x = 0, y = E;' },
    { f: 'variable', expected: false, pattern: 'const [x] = [E];' },

    // ExpressionStatement
    { f: 'expression', expected: false, pattern: 'E;' },

    // IfStatement
    { f: 'if', expected: true, pattern: 'if (true) { S }' },
    { f: 'if', expected: false, pattern: 'if (E) {}' },
    { f: 'if', expected: true, pattern: 'if (false) { } else { S }' },
    { f: 'if', expected: false, pattern: 'if (E) { } else { }' },

    // BreakableStatement
      // SwitchStatement
      { f: 'switch', expected: false, pattern: 'switch(E) {}' },
      { f: 'switch', expected: false, pattern: 'switch(E) { default: }' },
      { f: 'switch', expected: false, pattern: 'switch(0) { case E: }' },
      { f: 'switch', expected: true, pattern: 'switch(0) { case 0: S }' },
      { f: 'switch', expected: true, pattern: 'switch(0) { default: S }' },
      { f: 'switch', expected: false, pattern: 'switch(0) { case E: default: }' },
      { f: 'switch', expected: true, pattern: 'switch(0) { case 0: S default: }' },

      // IterationStatement
      { f: 'for-in', expected: false, pattern: 'var y; for (y in [0]) { S }' },
      { f: 'for-in', expected: false, pattern: 'var y; for (y in E) { }' },
      { f: 'for-in', expected: false, pattern: 'for (var y in [0]) { S }' },
      { f: 'for-in', expected: false, pattern: 'for (var y in E) { }' },
      { f: 'for-in', expected: false, pattern: 'for (let y in [0]) { S }' },
      { f: 'for-in', expected: false, pattern: 'for (let y in E) { }' },
      { f: 'for-in', expected: false, pattern: 'for (const y in [0]) { S }' },
      { f: 'for-in', expected: false, pattern: 'for (const y in E) { }' },

      { f: 'for-of', expected: false, pattern: 'var y; for (y of [0]) { S }' },
      { f: 'for-of', expected: false, pattern: 'var y; for (y of E) { }' },
      { f: 'for-of', expected: false, pattern: 'for (var y of [0]) { S }' },
      { f: 'for-of', expected: false, pattern: 'for (var y of E) { }' },
      { f: 'for-of', expected: false, pattern: 'for (let y of [0]) { S }' },
      { f: 'for-of', expected: false, pattern: 'for (let y of E) { }' },
      { f: 'for-of', expected: false, pattern: 'for (const y of [0]) { S }' },
      { f: 'for-of', expected: false, pattern: 'for (const y of E) { }' },

      { f: 'for', expected: true, pattern: 'var x; for (x = 0; x < 1; ++x) { S }' },
      { f: 'for', expected: false, pattern: 'for (E; ;) { }' },
      { f: 'for', expected: false, pattern: 'for (; E;) { }' },
      { f: 'for', expected: false, pattern: 'for (; ; E) { }' },
      { f: 'for', expected: true, pattern: 'for (var x = 0; ;) { S }' },
      { f: 'for', expected: false, pattern: 'for (var x = E; ;) { }' },
      { f: 'for', expected: false, pattern: 'for (var x = 0; E;) { }' },
      { f: 'for', expected: false, pattern: 'for (var x = 0; ; E) { }' },
      { f: 'for', expected: true, pattern: 'for (let x = 0; ;) { S }' },
      { f: 'for', expected: false, pattern: 'for (let x = E; ;) { }' },
      { f: 'for', expected: false, pattern: 'for (let x = 0; E;) { }' },
      { f: 'for', expected: false, pattern: 'for (let x = 0; ; E) { }' },
      { f: 'for', expected: true, pattern: 'for (const x = 0; ;) { S }' },
      { f: 'for', expected: false, pattern: 'for (const x = E; ;) { }' },
      { f: 'for', expected: false, pattern: 'for (const x = 0; E;) { }' },
      { f: 'for', expected: false, pattern: 'for (const x = 0; ; E) { }' },

      { f: 'do-while', expected: true, pattern: 'do { S } while (false)' },
      { f: 'do-while', expected: false, pattern: 'do { } while (E)' },

      { f: 'while', expected: false, pattern: 'while (E) { }' },
      { f: 'while', expected: true, pattern: 'while (true) { S }' },

    // ReturnStatement
    // (a little useless--all the other tests rely on this being correct)
    { f: 'return', expected: true, pattern: 'return E;' },

    // WithStatement
    // (these are a special case and probably not worth testing since TCO
    // doesn't occur outside of strict mode)
    //{ expected: false, pattern: 'with ({}) { S }' },
    //{ expected: false, pattern: 'with (E) { }' },

    // LabeledStatement
    { f: 'labeled', expected: true, pattern: 'test262: S' },

    // ThrowStatement
    { f: 'throw', expected: false, pattern: 'throw E;' },

    // TryStatement
    { f: 'try', expected: false, pattern: 'try { S } catch (err) { throw err; }' },
    { f: 'try', expected: true, pattern: 'try { throw null; } catch (err) { S }' },
    { f: 'try', expected: true, pattern: 'try { } catch (err) { } finally { S }' },
    { f: 'try', expected: true, pattern: 'try { } finally { S }' }
  ];
  var exprs = [
    // AssignmentExpression
      // ArrowFunction
      { f: 'arrow-function', expected: false, pattern: ['var a = () => f(n - 1); a();', null] },
      // LeftHandSideExpression = AssignmentExpression
      { f: 'assignment', expected: false, pre: 'var x;', pattern: 'x = f(n-1)' },
      { f: 'assignment', expected: false, pre: 'var x;', pattern: '[x = f(n-1)] = []' },
      // LeftHandSideExpression AssignmentOperator AssignmentExpression
      { f: 'compound-assignment', expected: false, pre: 'var x;', pattern: 'x += f(n-1)' },
      { f: 'compound-assignment', expected: false, pre: 'var x;', pattern: 'x -= f(n-1)' },
      { f: 'compound-assignment', expected: false, pre: 'var x;', pattern: 'x *= f(n-1)' },
      { f: 'compound-assignment', expected: false, pre: 'var x;', pattern: 'x /= f(n-1)' },
      { f: 'compound-assignment', expected: false, pre: 'var x;', pattern: 'x %= f(n-1)' },
      { f: 'compound-assignment', expected: false, pre: 'var x;', pattern: 'x <<= f(n-1)' },
      { f: 'compound-assignment', expected: false, pre: 'var x;', pattern: 'x >>= f(n-1)' },
      { f: 'compound-assignment', expected: false, pre: 'var x;', pattern: 'x >>>= f(n-1)' },
      { f: 'compound-assignment', expected: false, pre: 'var x;', pattern: 'x &= f(n-1)' },
      { f: 'compound-assignment', expected: false, pre: 'var x;', pattern: 'x |= f(n-1)' },
      { f: 'compound-assignment', expected: false, pre: 'var x;', pattern: 'x ^= f(n-1)' },

    // BitwiseANDExpression
    { f: 'bitwise-and', expected: false, pattern: '0 & f(n-1)' },
    { f: 'bitwise-and', expected: false, pattern: 'f(n-1) & 0' },

    // BitwiseXORExpression
    { f: 'bitwise-xor', expected: false, pattern: '0 ^ f(n-1)' },
    { f: 'bitwise-xor', expected: false, pattern: 'f(n-1) ^ 0' },

    // BitwiseORExpression
    { f: 'bitwise-or', expected: false, pattern: '0 | f(n-1)' },
    { f: 'bitwise-or', expected: false, pattern: 'f(n-1) | 0' },

    // EqualityExpression
    { f: 'equals', expected: false, pattern: '0 == f(n-1)' },
    { f: 'equals', expected: false, pattern: 'f(n-1) == 0' },
    { f: 'does-not-equals', expected: false, pattern: '0 != f(n-1)' },
    { f: 'does-not-equals', expected: false, pattern: 'f(n-1) != 0' },
    { f: 'strict-equals', expected: false, pattern: '0 === f(n-1)' },
    { f: 'strict-equals', expected: false, pattern: 'f(n-1) === 0' },
    { f: 'strict-does-not-equals', expected: false, pattern: '0 !== f(n-1)' },
    { f: 'strict-does-not-equals', expected: false, pattern: 'f(n-1) !== 0' },

    // RelationalExpression
    { f: 'less-than', expected: false, pattern: '0 < f(n-1)' },
    { f: 'less-than', expected: false, pattern: 'f(n-1) < 0' },
    { f: 'greater-than', expected: false, pattern: '0 > f(n-1)' },
    { f: 'greater-than', expected: false, pattern: 'f(n-1) > 0' },
    { f: 'less-than-or-equal-to', expected: false, pattern: '0 <= f(n-1)' },
    { f: 'less-than-or-equal-to', expected: false, pattern: 'f(n-1) <= 0' },
    { f: 'greater-than-or-equal-to', expected: false, pattern: '0 >= f(n-1)' },
    { f: 'greater-than-or-equal-to', expected: false, pattern: 'f(n-1) >= 0' },
    { f: 'instanceof', expected: false, pattern: 'f(n-1) instanceof f' },
    { f: 'instanceof', expected: false, pattern: 'f instanceof f(n-1)' },
    { f: 'in', expected: false, pattern: 'f(n-1) in f' },
    { f: 'in', expected: false, pattern: 'f in f(n-1)' },

    // ShiftExpression
    { f: 'left-shift', expected: false, pattern: '0 << f(n-1)' },
    { f: 'left-shift', expected: false, pattern: 'f(n-1) << 0' },
    { f: 'right-shift', expected: false, pattern: '0 >> f(n-1)' },
    { f: 'right-shift', expected: false, pattern: 'f(n-1) >> 0' },
    { f: 'unsigned-right-shift', expected: false, pattern: '0 >>> f(n-1)' },
    { f: 'unsigned-right-shift', expected: false, pattern: 'f(n-1) >>> 0' },

    // AdditiveExpression
    { f: 'addition', expected: false, pattern: '0 + f(n-1)' },
    { f: 'addition', expected: false, pattern: 'f(n-1) + 0' },
    { f: 'subtraction', expected: false, pattern: '0 - f(n-1)' },
    { f: 'subtraction', expected: false, pattern: 'f(n-1) - 0' },

    // MultiplicativeExpression
    { f: 'multiplication', expected: false, pattern: '0 * f(n-1)' },
    { f: 'multiplication', expected: false, pattern: 'f(n-1) * 0' },
    { f: 'division', expected: false, pattern: '0 / f(n-1)' },
    { f: 'division', expected: false, pattern: 'f(n-1) / 0' },
    { f: 'modulus', expected: false, pattern: '0 % f(n-1)' },
    { f: 'modulus', expected: false, pattern: 'f(n-1) % 0' },

    // UnaryExpression
    { f: 'delete', expected: false, pattern: 'delete f(n-1)' },
    { f: 'void', expected: false, pattern: 'void f(n-1)' },
    { f: 'typeof', expected: false, pattern: 'typeof f(n-1)' },
    { f: 'prefix-increment', expected: false, pattern: ['var o = { get attr() { return f(n-1); } };', '++o.attr'] },
    { f: 'prefix-decrement', expected: false, pattern: ['var o = { get attr() { return f(n-1); } };', '--o.attr'] },
    { f: 'unary-plus', expected: false, pattern: '+f(n-1)' },
    { f: 'unary-minus', expected: false, pattern: '-f(n-1)' },
    { f: 'bitwise-not', expected: false, pattern: '~f(n-1)' },
    { f: 'logical-not', expected: false, pattern: '!f(n-1)' },

    // PostfixExpression
    { f: 'postfix-increment', expected: false, pattern: ['var o = { get attr() { return f(n-1); } };', 'o.attr++'] },
    { f: 'postfix-decrement', expected: false, pattern: ['var o = { get attr() { return f(n-1); } };', 'o.attr--'] },

    // CallExpression
      // SuperCall
      // TODO: Special case (needs to be wrapped in a class)
      // super
      // MemberExpression CallExpression
      // CallExpression Arguments
      { f: 'call', expected: true, pattern: 'f(n-1)' },
      // CallExpression TemplateLiteral
      // TODO: special case (needs to modify the base case)
      //{ expected: true, pattern: 'f`${ n-1 }`' },
      { f: 'call', expected: false, pattern: 'f`${ f(n-1) }`' },
      // CallExpression [ Expression ]
      { f: 'call', expected: false, pattern: 'f(0)[f(n-1)]' },
      // CallExpression . IdentifierName
      { f: 'call', expected: false, pattern: ['var o = function() { return { get attr() { return f(n-1); } }; };', 'o().attr'] },

    // NewExpression
    { f: 'new', expected: false, pattern: 'new f' },

    // MemberExpression
      // MemberExpression [ Expression ]
      { expected: false, pattern: 'f[f(n-1)]' },
      // MemberExpression . IdentifierName
      { expected: false, pattern: ['var o = { get attr() { return f(n-1); } };', 'o.attr'] },
      // SuperProperty
      // TOD: Special case (needs to be wrapped in a class)
      // MetaProperty
      // TODO: what?
      // new MemberExpression Arguments
      { expected: false, pattern: 'new f(n - 1)' },
      // MemberExpression TemplateLiteral
      // TODO: special case (needs to modify the base case)

    // PrimaryExpression
      // this
      // TODO: what?
      //' this',
      // IdentifierReference
      // TODO: special case (needs to be wrapped in a `with` statement)
      // with ({ get foo() { console.log(1); } }) { (function() { 'use strict'; foo; }()) }
      // Literal
      // TODO: What?
      // ArrayLiteral
      { f: 'array', expected: false, pattern: '[f(n-1)]' },
      // ObjectLiteral
      { f: 'object', expected: false, pattern: '{ [f(n-1)]: 0 }' },
      { f: 'object', expected: false, pattern: '{ 0: f(n-1) }' },
      // FunctionExpression
      // TODO: TestSetup/AssertionSetup
      { f: 'function', expected: false, pattern: ['var e = function() { return f(n-1); }; e();', null] },
      // ClassExpression
      // TODO: TestSetup/AssertionSetup
      { f: 'class', expected: false, pattern: ['var C = class { method() { return f(n-1); } }; new C().method();', null] },
      // GeneratorExpression
      { f: 'generators', expected: false, pattern: ['var g = function*() { return f(n-1); }; g().next();', null] },
      // RegularExpressionLiteral
      // TODO: What?
      // TemplateLiteral
      { f: 'template-literal', expected: false, pattern: '`${ f(n-1) }`' },

      // Expression
      { f: 'comma', expected: false, pattern: 'f(n-1), 0' },
      { f: 'comma', expected: true, pattern: '0, f(n-1)' },

      // ConditionalExpression
      { f: 'conditional', expected: true, pattern: 'true ? f(n-1) : 0' },
      { f: 'conditional', expected: true, pattern: 'false ? 0 : f(n-1)' },
      { f: 'conditional', expected: false, pattern: 'f(n-1) ? 1 : 0' },

      // LogicalANDExpression
      { f: 'logical-and', expected: true, pattern: 'true && f(n-1)' },
      { f: 'logical-and', expected: false, pattern: 'f(n-1) && true' },

      // LogicalORExpression
      { f: 'logical-or', expected: true, pattern: 'false || f(n-1)' },
      { f: 'logical-or', expected: false, pattern: 'f(n-1) || true' },

      // ParenthesizedExpression
      { expected: true, pattern: '(f(n-1))' },
      { expected: false, pattern: '(f(n-1) || true)' }
  ];

  var testGenerators = {
    fromStatement: function(testCase) {

      testCase.fileName = 'test/language/statements/' + testCase.f + '/tco.js';

      testCase.body = testCase.pattern
        .replace(/S/, 'return f(n - 1);')
        .replace(/E/, 'f(n - 1)');
    },
    fromExpression: function(testCase) {
      var pattern = testCase.pattern;

      testCase.fileName = 'test/language/expressions/' + testCase.f + '/tco.js';

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
      testCase.source = [
          '(function() {',
          '  var finished = false;',
          testCase.pre ? '  ' + testCase.pre : null,
          '  (function f(n) {',
          '    "use strict";',
          '    if (n === 0) {',
          '      finished = true;',
          '      return f;',
          '    }',
          '    ' + testCase.body,
          '  }(100000));',
          '  return finished;',
          '}());'
        ]
        .filter(function(line) { return !!line; })
        .join('\n');
    }
  };

  exprs.map(testGenerators.fromExpression);
  stmts.map(testGenerators.fromStatement);

  var testCases = []
    .concat(exprs)
    .concat(stmts);

  testCases.forEach(testGenerators.fromBody);

  testCases.forEach(function(testCase) {
      var exception, result;

      try {
        result = eval(testCase.source);
      } catch (e) {
        exception = e;
      }

      if (exception) {
        result = exception instanceof InternalError ? 'overflow' : 'error';
      } else {
        result = result ? 'success' : 'error';
      }

      if (testCase.fileName) { print(testCase.fileName); }
      if (!(result === 'success' && testCase.expected) && !(result === 'overflow' && !testCase.expected)) {
        print('Actual: ' + result + ' ||| Expected: ' + testCase.expected + '\n' + testCase.source + '\n\n');
      }
    });
}());
