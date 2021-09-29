export function isNullOrUndefined(val: any): boolean {
  return val === undefined || val === null
}

/**
 * Splits a string array and removes any whitespaces
 * between elements (e.g. 1,  2,  3,  4 --> 1,2,3,4)
 * @param strList
 * @returns
 */
export function splitAndRemoveWhitespace(strList: string): string[] {
  return strList.split(/\s*,\s*/)
}
