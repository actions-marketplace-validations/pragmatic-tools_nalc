import {isNullOrUndefined, splitAndRemoveWhitespace} from '../src/utils'
import {
  isValidLabelsInput,
  isValidLabelsArray,
  getLabelSetDifferences
} from '../src/validators'
import {expect, test} from '@jest/globals'

test.each([null, undefined])('verifies null or undefined', val => {
  expect(isNullOrUndefined(val)).toBeTruthy()
})

test.each([
  {inputStr: 'element-1', validState: true},
  {inputStr: 'element-1, element2', validState: true},
  {inputStr: 'element-1,', validState: false},
  {inputStr: 'element-1, element-2,', validState: false}
])('can detect invalid label string', ({inputStr, validState}) => {
  expect(isValidLabelsInput(inputStr)).toEqual(validState)
})

test.each([
  {inputStr: [], validState: false},
  {inputStr: ['element-1, element2'], validState: true}
])('can detect invalid labels array', ({inputStr, validState}) => {
  expect(isValidLabelsArray(inputStr)).toEqual(validState)
})

test.each([
  {
    inputStr: 'element-1,       element-2, element-3',
    expected: ['element-1', 'element-2', 'element-3']
  },
  {
    inputStr: 'element-1, element-2, element-3',
    expected: ['element-1', 'element-2', 'element-3']
  }
])(
  'can split string representation of a list correctly',
  ({inputStr, expected}) => {
    expect(splitAndRemoveWhitespace(inputStr)).toEqual(expected)
  }
)

test('can determine if there are no missing expected labels', () => {
  const missingLabels: string[] = getLabelSetDifferences(
    ['el1', 'el2'],
    ['el1', 'el2']
  )
  expect(missingLabels).toEqual([])
})

test('can determine if there are no missing expected labels with wildcard match', () => {
  const missingLabels: string[] = getLabelSetDifferences(
    ['el1', 'el2'],
    ['el*']
  )
  expect(missingLabels).toEqual([])
})

test('can determine the missing expected labels', () => {
  const missingLabels: string[] = getLabelSetDifferences(['el1', 'el2'], ['ex'])
  expect(missingLabels).toEqual(['ex'])
})
