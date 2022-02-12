# Test262 maintenance rationale

Explanations behind the practices promoted by the project maintainers.

## Vestigial tests

  - vestiges
    - test which use `throw` statements inside of conditional statements rather
      than assertions
    - tests with meaningless file names, e.g.
      https://github.com/tc39/test262/blob/main/test/built-ins/Array/15.4.5-1.js
    - tests which use elaborate comment blocks to designate sections
    - tests which use outdated harness functions (e.g. `verifyEnumerable`,
      `verifyConfigurable`, and `verifyWritable`)

## Test generation

  - The feature was designed to promote uniformity of coverage, particularly
    for parts of the grammar that are used in many productions. Specifically, I
    had destructuring assignment in mind.
  - please, use restraint! Today, about 10% of the test files are generated
    tests for private fields. The feature is important, but that seems a bit
    excessive to me.

## File structure

    - the hardest part of the job is being able to answer the question: "do we
      have coverage for this?"
    - prefer flat directory hierarchy, based on the organization of the
      specification
    - use long, well-structured file names
      https://github.com/tc39/test262/tree/main/test/built-ins/Promise/race

Also, the importance of stability in file names

## Regression tests

    - be comfortable turning away tests which, while technically valid, do not
      have explicit justification in the spec (implementers have their own test
      suites; Test262 is *not* intended to subsume them, ever)
      - regression tests
      - stress tests (except in those rare cases where the language is designed
        to accommodate stress, e.g. tail call recursion, or weak maps)

## Avoiding long tests

Test262 tests are typically very focused. The vast majority exercise just one
algorithm step/grammar production, and some are even more granular that that!

Occasionally, we hear from test contributors who are uncomfortable splitting
their work across files like this. It's certainly unlike the practices that are
common in application development. In those settings, many tests are commonly
grouped into the same file and separated by function boundaries.

Test262 doesn't use the same approach as a typical application test suite in
order to limit complexity. The guidance of "one test per file" means that
consuming Test262 is relatively easy; there is no "test runner" API for
consumers to implement, and interpreting results is likewise straightforward.
It also lowers the barrier to entry for new contributors since there is no API
to learn.

## Syntax tests

When testing a syntactic feature of the language, it can be tempting to write
tests which verify that some bit of source text does *not* produce a syntax
error. In general, I try to push beyond verifying only the lack of a syntax
error because almost all such tests also have observable semantics. It's better
for a test to assert that the expected semantics are followed, even when they
may already be covered elsewhere.

There's some tension here because verifying semantics invariably requires
inserting still more code, and that addition code may degrade the tests'
precision for verifying syntax. There are probably cases where limiting the
syntax is desirable, but I don't have any formal criteria.

When considering this, you should be aware that TC39 maintains a separate
project called test262-parser-tests [1]. This project was partially motivated
by a desire to offer test material that isn't (and perhaps cannot be) related
to any specific grammar production. The availability of that project may inform
decisions about if, where, and how to include future tests for syntax in
Test262.

## Avoiding abstraction

Contributors will occasionally suggest introducing new abstractions to reduce
duplication in tests. We have historically set a pretty high bar for such
practices, both due to their many drawbacks and due to the aspects of standards
testing which limit their benefit.

The drawbacks to abstraction include:

- it degrades the tests by introducing unrelated semantics
- it discourages contributors by requiring them to learn more
- it frustrates implementers by making it harder to understand what's being
  tested and what has failed

One of abstraction's common motivations is its tendency to reduce maintenance
costs by limiting duplication. As you know, ECMA262 has a commitment to never
break backwards compatibility. This gives us a certain assurance in Test262
that maintainers of other test suites do not enjoy: Test262's tests will never
be invalidated [2]. We take advantage of this by using a more declarative,
readable, and verbose style.

Of course, abstraction has other motivations, so there will always be room for
it to some extent. If you feel the benefits of a specific proposal outweigh the
drawbacks, then be sure that it is well documented and also well-tested.
Test262 maintains tests for its "harness" abstractions in a dedicated directory
within the test suite itself [3].
