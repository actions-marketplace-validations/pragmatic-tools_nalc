import * as core from '@actions/core'
import * as github from '@actions/github'
import {isNullOrUndefined, splitAndRemoveWhitespace} from './utils'
import {
  isValidLabelsInput,
  isValidLabelsArray,
  getLabelSetDifferences
} from './validators'

interface Label {
  color: string
  default: boolean
  description: string
  name: string
  node_id: string
  url: string
}

async function run(): Promise<void> {
  try {
    const input: string = core.getInput('expectedLabels')
    if (!isValidLabelsInput) {
      throw new Error("Missing input: 'expectedLabels'")
    }
    const expectedLabelsArr: string[] = splitAndRemoveWhitespace(input)
    if (!isValidLabelsArray(expectedLabelsArr)) {
      throw new Error("Invalid labels input, cannot have trailing comma ','")
    }
    const prLabels: Label[] | undefined =
      github.context.payload.pull_request?.labels
    if (isNullOrUndefined(prLabels) || prLabels?.length === 0) {
      throw new Error(
        `The following expected pull request labels are missing: ${expectedLabelsArr.toString()}`
      )
    }
    const prLabelsName: string[] = (prLabels as Label[]).map(
      label => label.name
    )
    const missingLabels: string[] = getLabelSetDifferences(
      prLabelsName,
      expectedLabelsArr
    )

    if (missingLabels.length > 0) {
      throw new Error(
        `Missing the expected pull request labels: ${missingLabels.toString()}`
      )
    }
  } catch (error: any) {
    core.setFailed(error.message)
  }
}

run()
