# Actions Sub-generator

## About

This generator will generate the GitHub Actions Workflow file. The Workflow will run everytime you commit something to the master branch or when there is a new pull request. You can also run the workflow manually. The workflow will Release the solution files, when a tag with format "v\*" is applied to the commit.

## Usage

Example without any options will use the control name you provided when you triggered the first run.

```
yo pcf:github-action --force
```

## Arguments

| Name        | Type   | Description             |
| ----------- | ------ | ----------------------- |
| controlName | string | Name of the PCF control |
