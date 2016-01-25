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
    { d: 'block', expected: true, pattern: '{ S }' },
    { d: 'block', expected: true, pattern: '{ void 0; S }' },

    // Declaration
    { d: 'function', expected: false, pattern: 'function x() { S } x();' },
    { d: 'class', expected: false, pattern: 'class C { method() { S } } new C().method();' },

    // VariableStatement
    { d: 'variable', expected: false, pattern: 'var x = E;' },
    { d: 'variable', expected: false, pattern: 'var x, y = E;' },
    { d: 'variable', expected: false, pattern: 'var [x] = [E];' },
    { d: 'variable', expected: false, pattern: 'let x = E;' },
    { d: 'variable', expected: false, pattern: 'let x, y = E;' },
    { d: 'variable', expected: false, pattern: 'let [x] = [E];' },
    { d: 'variable', expected: false, pattern: 'const x = E;' },
    { d: 'variable', expected: false, pattern: 'const x = 0, y = E;' },
    { d: 'variable', expected: false, pattern: 'const [x] = [E];' },

    // ExpressionStatement
    { d: 'expression', expected: false, pattern: 'E;' },

    // IfStatement
    { d: 'if', expected: true, pattern: 'if (true) { S }' },
    { d: 'if', expected: false, pattern: 'if (E) {}' },
    { d: 'if', expected: true, pattern: 'if (false) { } else { S }' },
    { d: 'if', expected: false, pattern: 'if (E) { } else { }' },

    // BreakableStatement
      // SwitchStatement
      { d: 'switch', expected: false, pattern: 'switch(E) {}' },
      { d: 'switch', expected: false, pattern: 'switch(E) { default: }' },
      { d: 'switch', expected: false, pattern: 'switch(0) { case E: }' },
      { d: 'switch', expected: true, pattern: 'switch(0) { case 0: S }' },
      { d: 'switch', expected: true, pattern: 'switch(0) { default: S }' },
      { d: 'switch', expected: false, pattern: 'switch(0) { case E: default: }' },
      { d: 'switch', expected: true, pattern: 'switch(0) { case 0: S default: }' },

      // IterationStatement
      { d: 'for-in', expected: false, pattern: 'var y; for (y in [0]) { S }' },
      { d: 'for-in', expected: false, pattern: 'var y; for (y in E) { }' },
      { d: 'for-in', expected: false, pattern: 'for (var y in [0]) { S }' },
      { d: 'for-in', expected: false, pattern: 'for (var y in E) { }' },
      { d: 'for-in', expected: false, pattern: 'for (let y in [0]) { S }' },
      { d: 'for-in', expected: false, pattern: 'for (let y in E) { }' },
      { d: 'for-in', expected: false, pattern: 'for (const y in [0]) { S }' },
      { d: 'for-in', expected: false, pattern: 'for (const y in E) { }' },

      { d: 'for-of', expected: false, pattern: 'var y; for (y of [0]) { S }' },
      { d: 'for-of', expected: false, pattern: 'var y; for (y of E) { }' },
      { d: 'for-of', expected: false, pattern: 'for (var y of [0]) { S }' },
      { d: 'for-of', expected: false, pattern: 'for (var y of E) { }' },
      { d: 'for-of', expected: false, pattern: 'for (let y of [0]) { S }' },
      { d: 'for-of', expected: false, pattern: 'for (let y of E) { }' },
      { d: 'for-of', expected: false, pattern: 'for (const y of [0]) { S }' },
      { d: 'for-of', expected: false, pattern: 'for (const y of E) { }' },

      { d: 'for', expected: true, pattern: 'var x; for (x = 0; x < 1; ++x) { S }' },
      { d: 'for', expected: false, pattern: 'for (E; ;) { }' },
      { d: 'for', expected: false, pattern: 'for (; E;) { }' },
      { d: 'for', expected: false, pattern: 'for (; ; E) { }' },
      { d: 'for', expected: true, pattern: 'for (var x = 0; ;) { S }' },
      { d: 'for', expected: false, pattern: 'for (var x = E; ;) { }' },
      { d: 'for', expected: false, pattern: 'for (var x = 0; E;) { }' },
      { d: 'for', expected: false, pattern: 'for (var x = 0; ; E) { }' },
      { d: 'for', expected: true, pattern: 'for (let x = 0; ;) { S }' },
      { d: 'for', expected: false, pattern: 'for (let x = E; ;) { }' },
      { d: 'for', expected: false, pattern: 'for (let x = 0; E;) { }' },
      { d: 'for', expected: false, pattern: 'for (let x = 0; ; E) { }' },
      { d: 'for', expected: true, pattern: 'for (const x = 0; ;) { S }' },
      { d: 'for', expected: false, pattern: 'for (const x = E; ;) { }' },
      { d: 'for', expected: false, pattern: 'for (const x = 0; E;) { }' },
      { d: 'for', expected: false, pattern: 'for (const x = 0; ; E) { }' },

      { d: 'do-while', expected: true, pattern: 'do { S } while (false)' },
      { d: 'do-while', expected: false, pattern: 'do { } while (E)' },

      { d: 'while', expected: false, pattern: 'while (E) { }' },
      { d: 'while', expected: true, pattern: 'while (true) { S }' },

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
    { d: 'try', expected: false, pattern: 'try { S } catch (err) { throw err; }' },
    { d: 'try', expected: true, pattern: 'try { throw null; } catch (err) { S }' },
    { d: 'try', expected: true, pattern: 'try { } catch (err) { } finally { S }' },
    { d: 'try', expected: true, pattern: 'try { } finally { S }' }
  ];
  var exprs = [
    // AssignmentExpression
      // ArrowFunction
      { d: 'arrow-function', expected: false, pattern: ['var a = () => f(n - 1); a();', null] },
      // LeftHandSideExpression = AssignmentExpression
      { d: 'assignment', expected: false, pre: 'var x;', pattern: 'x = f(n-1)' },
      { d: 'assignment', expected: false, pre: 'var x;', pattern: '[x = f(n-1)] = []' },
      // LeftHandSideExpression AssignmentOperator AssignmentExpression
      { d: 'compound-assignment', expected: false, pre: 'var x;', pattern: 'x += f(n-1)' },
      { d: 'compound-assignment', expected: false, pre: 'var x;', pattern: 'x -= f(n-1)' },
      { d: 'compound-assignment', expected: false, pre: 'var x;', pattern: 'x *= f(n-1)' },
      { d: 'compound-assignment', expected: false, pre: 'var x;', pattern: 'x /= f(n-1)' },
      { d: 'compound-assignment', expected: false, pre: 'var x;', pattern: 'x %= f(n-1)' },
      { d: 'compound-assignment', expected: false, pre: 'var x;', pattern: 'x <<= f(n-1)' },
      { d: 'compound-assignment', expected: false, pre: 'var x;', pattern: 'x >>= f(n-1)' },
      { d: 'compound-assignment', expected: false, pre: 'var x;', pattern: 'x >>>= f(n-1)' },
      { d: 'compound-assignment', expected: false, pre: 'var x;', pattern: 'x &= f(n-1)' },
      { d: 'compound-assignment', expected: false, pre: 'var x;', pattern: 'x |= f(n-1)' },
      { d: 'compound-assignment', expected: false, pre: 'var x;', pattern: 'x ^= f(n-1)' },

    // BitwiseANDExpression
    { d: 'bitwise-and', expected: false, pattern: '0 & f(n-1)' },
    { d: 'bitwise-and', expected: false, pattern: 'f(n-1) & 0' },

    // BitwiseXORExpression
    { d: 'bitwise-xor', expected: false, pattern: '0 ^ f(n-1)' },
    { d: 'bitwise-xor', expected: false, pattern: 'f(n-1) ^ 0' },

    // BitwiseORExpression
    { d: 'bitwise-or', expected: false, pattern: '0 | f(n-1)' },
    { d: 'bitwise-or', expected: false, pattern: 'f(n-1) | 0' },

    // EqualityExpression
    { d: 'equals', expected: false, pattern: '0 == f(n-1)' },
    { d: 'equals', expected: false, pattern: 'f(n-1) == 0' },
    { d: 'does-not-equals', expected: false, pattern: '0 != f(n-1)' },
    { d: 'does-not-equals', expected: false, pattern: 'f(n-1) != 0' },
    { d: 'strict-equals', expected: false, pattern: '0 === f(n-1)' },
    { d: 'strict-equals', expected: false, pattern: 'f(n-1) === 0' },
    { d: 'strict-does-not-equals', expected: false, pattern: '0 !== f(n-1)' },
    { d: 'strict-does-not-equals', expected: false, pattern: 'f(n-1) !== 0' },

    // RelationalExpression
    { d: 'less-than', expected: false, pattern: '0 < f(n-1)' },
    { d: 'less-than', expected: false, pattern: 'f(n-1) < 0' },
    { d: 'greater-than', expected: false, pattern: '0 > f(n-1)' },
    { d: 'greater-than', expected: false, pattern: 'f(n-1) > 0' },
    { d: 'less-than-or-equal-to', expected: false, pattern: '0 <= f(n-1)' },
    { d: 'less-than-or-equal-to', expected: false, pattern: 'f(n-1) <= 0' },
    { d: 'greater-than-or-equal-to', expected: false, pattern: '0 >= f(n-1)' },
    { d: 'greater-than-or-equal-to', expected: false, pattern: 'f(n-1) >= 0' },
    { d: 'instanceof', expected: false, pattern: 'f(n-1) instanceof f' },
    { d: 'instanceof', expected: false, pattern: 'f instanceof f(n-1)' },
    { d: 'in', expected: false, pattern: 'f(n-1) in f' },
    { d: 'in', expected: false, pattern: 'f in f(n-1)' },

    // ShiftExpression
    { d: 'left-shift', expected: false, pattern: '0 << f(n-1)' },
    { d: 'left-shift', expected: false, pattern: 'f(n-1) << 0' },
    { d: 'right-shift', expected: false, pattern: '0 >> f(n-1)' },
    { d: 'right-shift', expected: false, pattern: 'f(n-1) >> 0' },
    { d: 'unsigned-right-shift', expected: false, pattern: '0 >>> f(n-1)' },
    { d: 'unsigned-right-shift', expected: false, pattern: 'f(n-1) >>> 0' },

    // AdditiveExpression
    { d: 'addition', expected: false, pattern: '0 + f(n-1)' },
    { d: 'addition', expected: false, pattern: 'f(n-1) + 0' },
    { d: 'subtraction', expected: false, pattern: '0 - f(n-1)' },
    { d: 'subtraction', expected: false, pattern: 'f(n-1) - 0' },

    // MultiplicativeExpression
    { d: 'multiplication', expected: false, pattern: '0 * f(n-1)' },
    { d: 'multiplication', expected: false, pattern: 'f(n-1) * 0' },
    { d: 'division', expected: false, pattern: '0 / f(n-1)' },
    { d: 'division', expected: false, pattern: 'f(n-1) / 0' },
    { d: 'modulus', expected: false, pattern: '0 % f(n-1)' },
    { d: 'modulus', expected: false, pattern: 'f(n-1) % 0' },

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
      // TODO: Special case (needs to be wrapped in a class)
      // super
      // MemberExpression CallExpression
      // CallExpression Arguments
      { d: 'call', expected: true, pattern: 'f(n-1)' },
      // CallExpression TemplateLiteral
      // TODO: special case (needs to modify the base case)
      //{ expected: true, pattern: 'f`${ n-1 }`' },
      { d: 'call', expected: false, pattern: 'f`${ f(n-1) }`' },
      // CallExpression [ Expression ]
      { d: 'call', expected: false, pattern: 'f(0)[f(n-1)]' },
      // CallExpression . IdentifierName
      { d: 'call', expected: false, pattern: ['var o = function() { return { get attr() { return f(n-1); } }; };', 'o().attr'] },

    // NewExpression
    { d: 'new', expected: false, pattern: 'new f' },

    // MemberExpression
      // MemberExpression [ Expression ]
      { expected: false, pattern: 'f[f(n-1)]' },
      // MemberExpression . IdentifierName
      { expected: false, pattern: ['var o = { get attr() { return f(n-1); } };', 'o.attr'] },
      // SuperProperty
      // TODO: Special case (needs to be wrapped in a class)
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
      //{ d: '../identifier-resolution', expected: false, pattern: 'with ({ get foo() { /*something...*/ } }) { (function() { "use strict"; foo; }()) }' }
      // Literal
      // TODO: What?
      // ArrayLiteral
      { d: 'array', expected: false, pattern: '[f(n-1)]' },
      // ObjectLiteral
      { d: 'object', expected: false, pattern: '{ [f(n-1)]: 0 }' },
      { d: 'object', expected: false, pattern: '{ 0: f(n-1) }' },
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
      { d: 'comma', expected: false, pattern: 'f(n-1), 0' },
      { d: 'comma', expected: true, pattern: '0, f(n-1)' },

      // ConditionalExpression
      { d: 'conditional', expected: true, pattern: 'true ? f(n-1) : 0' },
      { d: 'conditional', expected: true, pattern: 'false ? 0 : f(n-1)' },
      { d: 'conditional', expected: false, pattern: 'f(n-1) ? 1 : 0' },

      // LogicalANDExpression
      { d: 'logical-and', expected: true, pattern: 'true && f(n-1)' },
      { d: 'logical-and', expected: false, pattern: 'f(n-1) && true' },

      // LogicalORExpression
      { d: 'logical-or', expected: true, pattern: 'false || f(n-1)' },
      { d: 'logical-or', expected: false, pattern: 'f(n-1) || true' },

      // ParenthesizedExpression
      { expected: true, pattern: '(f(n-1))' },
      { expected: false, pattern: '(f(n-1) || true)' }
  ];

  function buildDir(subdir, name) {
    var dir = 'test/language/statements/';
    if (name && name.indexOf('../') === 0) {
      name = name.slice(3);
    } else {
      dir += subdir + '/';
    }

    return dir + name + '/';
  }

  var testGenerators = {
    fromStatement: function(testCase) {

      testCase.fileName = buildDir('statements', testCase.d) + 'tco.js';

      testCase.body = testCase.pattern
        .replace(/S/, 'return f(n - 1);')
        .replace(/E/, 'f(n - 1)');
    },
    fromExpression: function(testCase) {
      var pattern = testCase.pattern;

      testCase.fileName = buildDir('expressions', testCase.d) + 'tco.js';

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
      result = result ? 'success' : 'error';
    }

    if ((result === 'success' && testCase.expected) || (result === 'overflow' && !testCase.expected)) {
      print('PASS: ' + testCase.fileName);
    } else {
      print('FAIL: ' + testCase.fileName);
      print('Actual: ' + result + ' ||| Expected: ' + testCase.expected);
      print(testCase.source + '\n\n');
    }
  }

  exprs.map(testGenerators.fromExpression);
  stmts.map(testGenerators.fromStatement);

  var testCases = [].concat(exprs).concat(stmts);

  testCases.forEach(testGenerators.fromBody);

  testCases.forEach(execute);
}());
