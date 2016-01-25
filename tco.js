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
    { expected: true, pattern: '{ S }' },
    { expected: true, pattern: '{ void 0; S }' },

    // Declaration
    { expected: false, pattern: 'function x() { S } x();' },
    { expected: false, pattern: 'class C { method() { S } } new C().method();' },

    // VariableStatement
    { expected: false, pattern: 'var x = E;' },
    { expected: false, pattern: 'var x, y = E;' },
    { expected: false, pattern: 'var [x] = [E];' },
    { expected: false, pattern: 'let x = E;' },
    { expected: false, pattern: 'let x, y = E;' },
    { expected: false, pattern: 'let [x] = [E];' },
    { expected: false, pattern: 'const x = E;' },
    { expected: false, pattern: 'const x = 0, y = E;' },
    { expected: false, pattern: 'const [x] = [E];' },

    // ExpressionStatement
    { expected: false, pattern: 'E;' },

    // IfStatement
    { expected: true, pattern: 'if (true) { S }' },
    { expected: false, pattern: 'if (E) {}' },
    { expected: true, pattern: 'if (false) { } else { S }' },
    { expected: false, pattern: 'if (E) { } else { }' },

    // BreakableStatement
      // SwitchStatement
      { expected: false, pattern: 'switch(E) {}' },
      { expected: false, pattern: 'switch(E) { default: }' },
      { expected: false, pattern: 'switch(0) { case E: }' },
      { expected: true, pattern: 'switch(0) { case 0: S }' },
      { expected: true, pattern: 'switch(0) { default: S }' },
      { expected: false, pattern: 'switch(0) { case E: default: }' },
      { expected: true, pattern: 'switch(0) { case 0: S default: }' },

      // IterationStatement
      { expected: false, pattern: 'var y; for (y in [0]) { S }' },
      { expected: false, pattern: 'var y; for (y in E) { }' },
      { expected: false, pattern: 'for (var y in [0]) { S }' },
      { expected: false, pattern: 'for (var y in E) { }' },
      { expected: false, pattern: 'for (let y in [0]) { S }' },
      { expected: false, pattern: 'for (let y in E) { }' },
      { expected: false, pattern: 'for (const y in [0]) { S }' },
      { expected: false, pattern: 'for (const y in E) { }' },

      { expected: false, pattern: 'var y; for (y of [0]) { S }' },
      { expected: false, pattern: 'var y; for (y of E) { }' },
      { expected: false, pattern: 'for (var y of [0]) { S }' },
      { expected: false, pattern: 'for (var y of E) { }' },
      { expected: false, pattern: 'for (let y of [0]) { S }' },
      { expected: false, pattern: 'for (let y of E) { }' },
      { expected: false, pattern: 'for (const y of [0]) { S }' },
      { expected: false, pattern: 'for (const y of E) { }' },

      { expected: true, pattern: 'var x; for (x = 0; x < 1; ++x) { S }' },
      { expected: false, pattern: 'for (E; ;) { }' },
      { expected: false, pattern: 'for (; E;) { }' },
      { expected: false, pattern: 'for (; ; E) { }' },
      { expected: true, pattern: 'for (var x = 0; ;) { S }' },
      { expected: false, pattern: 'for (var x = E; ;) { }' },
      { expected: false, pattern: 'for (var x = 0; E;) { }' },
      { expected: false, pattern: 'for (var x = 0; ; E) { }' },
      { expected: true, pattern: 'for (let x = 0; ;) { S }' },
      { expected: false, pattern: 'for (let x = E; ;) { }' },
      { expected: false, pattern: 'for (let x = 0; E;) { }' },
      { expected: false, pattern: 'for (let x = 0; ; E) { }' },
      { expected: true, pattern: 'for (const x = 0; ;) { S }' },
      { expected: false, pattern: 'for (const x = E; ;) { }' },
      { expected: false, pattern: 'for (const x = 0; E;) { }' },
      { expected: false, pattern: 'for (const x = 0; ; E) { }' },

      { expected: true, pattern: 'do { S } while (false)' },
      { expected: false, pattern: 'do { } while (E)' },

      { expected: false, pattern: 'while (E) { }' },
      { expected: true, pattern: 'while (true) { S }' },

    // ReturnStatement
    // (a little useless--all the other tests rely on this being correct)
    { expected: true, pattern: 'return E;' },

    // WithStatement
    // (these are a special case and probably not worth testing since TCO
    // doesn't occur outside of strict mode)
    //{ expected: false, pattern: 'with ({}) { S }' },
    //{ expected: false, pattern: 'with (E) { }' },

    // LabeledStatement
    { expected: true, pattern: 'test262: S' },

    // ThrowStatement
    { expected: false, pattern: 'throw E;' },

    // TryStatement
    { expected: false, pattern: 'try { S } catch (err) { throw err; }' },
    { expected: true, pattern: 'try { throw null; } catch (err) { S }' },
    { expected: true, pattern: 'try { } catch (err) { } finally { S }' },
    { expected: true, pattern: 'try { } finally { S }' }
  ];
  var exprs = [
    // AssignmentExpression
      // ArrowFunction
      // TODO: TestSetup/AssertionSetup
      { expected: false, pattern: ['var a = () => f(n - 1); a();', ''] },
      // LeftHandSideExpression = AssignmentExpression
      { expected: false, pattern: ['var x;', 'x = f(n-1)'] },
      { expected: false, pattern: ['var x;', '[x = f(n-1)] = []'] },
      // LeftHandSideExpression AssignmentOperator AssignmentExpression
      { expected: false, pattern: ['var x;', 'x += f(n-1)'] },
      { expected: false, pattern: ['var x;', 'x -= f(n-1)'] },
      { expected: false, pattern: ['var x;', 'x *= f(n-1)'] },
      { expected: false, pattern: ['var x;', 'x /= f(n-1)'] },
      { expected: false, pattern: ['var x;', 'x %= f(n-1)'] },
      { expected: false, pattern: ['var x;', 'x <<= f(n-1)'] },
      { expected: false, pattern: ['var x;', 'x >>= f(n-1)'] },
      { expected: false, pattern: ['var x;', 'x >>>= f(n-1)'] },
      { expected: false, pattern: ['var x;', 'x &= f(n-1)'] },
      { expected: false, pattern: ['var x;', 'x |= f(n-1)'] },
      { expected: false, pattern: ['var x;', 'x ^= f(n-1)'] },

    // BitwiseANDExpression
    { expected: false, pattern: '0 & f(n-1)' },
    { expected: false, pattern: 'f(n-1) & 0' },

    // BitwiseXORExpression
    { expected: false, pattern: '0 ^ f(n-1)' },
    { expected: false, pattern: 'f(n-1) ^ 0' },

    // BitwiseORExpression
    { expected: false, pattern: '0 | f(n-1)' },
    { expected: false, pattern: 'f(n-1) | 0' },

    // EqualityExpression
    { expected: false, pattern: '0 == f(n-1)' },
    { expected: false, pattern: 'f(n-1) == 0' },
    { expected: false, pattern: '0 != f(n-1)' },
    { expected: false, pattern: 'f(n-1) != 0' },
    { expected: false, pattern: '0 === f(n-1)' },
    { expected: false, pattern: 'f(n-1) === 0' },
    { expected: false, pattern: '0 !== f(n-1)' },
    { expected: false, pattern: 'f(n-1) !== 0' },

    // RelationalExpression
    { expected: false, pattern: '0 < f(n-1)' },
    { expected: false, pattern: 'f(n-1) < 0' },
    { expected: false, pattern: '0 > f(n-1)' },
    { expected: false, pattern: 'f(n-1) > 0' },
    { expected: false, pattern: '0 <= f(n-1)' },
    { expected: false, pattern: 'f(n-1) <= 0' },
    { expected: false, pattern: '0 >= f(n-1)' },
    { expected: false, pattern: 'f(n-1) >= 0' },
    { expected: false, pattern: 'f(n-1) instanceof f' },
    { expected: false, pattern: 'f instanceof f(n-1)' },
    { expected: false, pattern: 'f(n-1) in f' },
    { expected: false, pattern: 'f in f(n-1)' },

    // ShiftExpression
    { expected: false, pattern: '0 << f(n-1)' },
    { expected: false, pattern: 'f(n-1) << 0' },
    { expected: false, pattern: '0 >> f(n-1)' },
    { expected: false, pattern: 'f(n-1) >> 0' },
    { expected: false, pattern: '0 >>> f(n-1)' },
    { expected: false, pattern: 'f(n-1) >>> 0' },

    // AdditiveExpression
    { expected: false, pattern: '0 + f(n-1)' },
    { expected: false, pattern: 'f(n-1) + 0' },
    { expected: false, pattern: '0 - f(n-1)' },
    { expected: false, pattern: 'f(n-1) - 0' },

    // MultiplicativeExpression
    { expected: false, pattern: '0 * f(n-1)' },
    { expected: false, pattern: 'f(n-1) * 0' },
    { expected: false, pattern: '0 / f(n-1)' },
    { expected: false, pattern: 'f(n-1) / 0' },
    { expected: false, pattern: '0 % f(n-1)' },
    { expected: false, pattern: 'f(n-1) % 0' },

    // UnaryExpression
    { expected: false, pattern: 'delete f(n-1)' },
    { expected: false, pattern: 'void f(n-1)' },
    { expected: false, pattern: 'typeof f(n-1)' },
    { expected: false, pattern: ['var o = { get attr() { return f(n-1); } };', '++o.attr'] },
    { expected: false, pattern: ['var o = { get attr() { return f(n-1); } };', '--o.attr'] },
    { expected: false, pattern: '+f(n-1)' },
    { expected: false, pattern: '-f(n-1)' },
    { expected: false, pattern: '~f(n-1)' },
    { expected: false, pattern: '!f(n-1)' },

    // PostfixExpression
    { expected: false, pattern: ['var o = { get attr() { return f(n-1); } };', 'o.attr++'] },
    { expected: false, pattern: ['var o = { get attr() { return f(n-1); } };', 'o.attr--'] },

    // CallExpression
      // SuperCall
      // TODO: Special case (needs to be wrapped in a class)
      // super
      // MemberExpression CallExpression
      // CallExpression Arguments
      { expected: true, pattern: 'f(n-1)' },
      // CallExpression TemplateLiteral
      // TODO: special case (needs to modify the base case)
      //{ expected: true, pattern: 'f`${ n-1 }`' },
      { expected: false, pattern: 'f`${ f(n-1) }`' },
      // CallExpression [ Expression ]
      { expected: false, pattern: 'f(0)[f(n-1)]' },
      // CallExpression . IdentifierName
      { expected: false, pattern: ['var o = function() { return { get attr() { return f(n-1); } }; };', 'o().attr'] },

    // NewExpression
    { expected: false, pattern: 'new f' },

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
      { expected: false, pattern: '[f(n-1)]' },
      // ObjectLiteral
      { expected: false, pattern: '{ [f(n-1)]: 0 }' },
      { expected: false, pattern: '{ 0: f(n-1) }' },
      // FunctionExpression
      // TODO: TestSetup/AssertionSetup
      { expected: false, pattern: ['var e = function() { return f(n-1); }; e();', ''] },
      // ClassExpression
      // TODO: TestSetup/AssertionSetup
      { expected: false, pattern: ['var C = class { method() { return f(n-1); } }; new C().method();', ''] },
      // GeneratorExpression
      { expected: false, pattern: ['var g = function*() { return f(n-1); }; g().next();', ''] },
      // RegularExpressionLiteral
      // TODO: What?
      // TemplateLiteral
      { expected: false, pattern: '`${ f(n-1) }`' },

      // Expression
      { expected: false, pattern: 'f(n-1), 0' },
      { expected: true, pattern: '0, f(n-1)' },

      // ConditionalExpression
      { expected: true, pattern: 'true ? f(n-1) : 0' },
      { expected: true, pattern: 'false ? 0 : f(n-1)' },
      { expected: false, pattern: 'f(n-1) ? 1 : 0' },

      // LogicalANDExpression
      { expected: true, pattern: 'true && f(n-1)' },
      { expected: false, pattern: 'f(n-1) && true' },

      // LogicalORExpression
      { expected: true, pattern: 'false || f(n-1)' },
      { expected: false, pattern: 'f(n-1) || true' },

      // ParenthesizedExpression
      { expected: true, pattern: '(f(n-1))' },
      { expected: false, pattern: '(f(n-1) || true)' }
  ];

  var testGenerators = {
    fromStatement: function(testCase) {
      testCase.body = testCase.pattern
        .replace(/S/, 'return f(n - 1);')
        .replace(/E/, 'f(n - 1)');
    },
    fromExpression: function(testCase) {
      var pattern = testCase.pattern;
      if (Array.isArray(pattern)) {
        testCase.body = pattern[0] + 'return ' + pattern[1] + ';';
      } else {
        testCase.body = 'return ' + pattern + ';';
      }
    },
    fromBody: function(testCase) {
      testCase.source = [
        '(function() {',
        '  var finished = false;',
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
      ].join('\n');
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

      if (!(result === 'success' && testCase.expected) && !(result === 'overflow' && !testCase.expected)) {
        print('Actual: ' + result + ' ||| Expected: ' + testCase.expected + '\n' + testCase.source + '\n\n');
      }
    });
}());
