# README Sub-generator

## About

This generator will generate the README file for you using the control metadata found in **ControlManifest.Input.xml** file. You will also get a download button and relevant badges to track releases directly from the GitHub repository.

## Usage

Example without any options that will ask for all parameters

```
yo pcf:readme --force
```

Example with options that will not ask you for additional parameters

```
yo pcf:readme --gu DynamicsNinja --gr PCF-Clipboard-Control --lc 1033 --force
```

## Arguments

| Name        | Type   | Description             |
| ----------- | ------ | ----------------------- |
| controlName | string | Name of the PCF control |

## Options

| Name           | Alias | Type   | Description        | Required | Default |
| -------------- | ----- | ------ | ------------------ | -------- | ------- |
| githubUsername | gu    | string | GitHub username    | NO       |         |
| repositoryName | gr    | string | GitHub repository  | NO       |         |
| lcid           | lc    | string | Language Code ID   | NO       |         |
| previewImage   | pi    | string | Preview image path | NO       |         |
