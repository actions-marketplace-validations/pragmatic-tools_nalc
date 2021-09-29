import matcher from 'matcher'

/**
 * Prevent label strings from having a trailing comma ','
 * which creates an empty element once we split the string
 */
export function isValidLabelsInput(labels: string): boolean {
  return labels.search(/^.*,$/) === -1
}

export function isValidLabelsArray(labels: string[]): boolean {
  return labels.length > 0
}

/**
 * Used for checking if all expected labels are found
 * from an incoming set of labels. Expected labels
 * can be used as a wild card (e.g. elem* will match element, elements)
 *
 * Returns all expected labels that were NOT found
 */
export function getLabelSetDifferences(
  labels: string[],
  expectedLabels: string[]
): string[] {
  const missingLabels: string[] = []
  for (const expectedLabel of expectedLabels) {
    const matchedLabels: string[] = labels.filter(prLabel =>
      matcher.isMatch(prLabel, expectedLabel)
    )
    if (matchedLabels.length === 0) {
      missingLabels.push(expectedLabel)
    }
  }
  return missingLabels
}
