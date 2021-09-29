# Not Another Label Checker

Not Another Label Checker (NALC) was created out of the need to have a label checker that supports wildcards. Most label checkers only do an exact match for labels, but NALC allows us to do a bit more.

## Want to learn more about GitHub Labels?
[Read Here](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels#about-labels)

# Usage

## Example Usage
If a pull request requires the labels `feature` and a wildcard match of `bugs-*`, we specify it as a string, separated by commas `feature,bugs-*`. We must also set the **triggers** (`labeled, unlabeled`) to correctly activate the action at the appropriate time.


```yaml
name: 'Pull Request Label Validator'
on:
  pull_request:
    types: [labeled, unlabeled, opened, reopened, synchronize]

jobs:
  require-pull-request-labels:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: pragmatic-tools/nalc@v1.0
        with:
          expectedLabels: 'feature,bugs-*'
```