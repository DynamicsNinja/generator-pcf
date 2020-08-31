# RESX Sub-generator

## About

This generator will generate a RESX file that will allow you to add translations for the strings used in your control. You will be able to pick locale from the predefined list if you run a generator without any options.

## Usage

Example without any options that will ask for all parameters

```
yo pcf:resx --force
```

Example with options that will not ask you for additional parameters

```
yo pcf:resx --lc 1033 --force
```

## Arguments

| Name        | Type   | Description             |
| ----------- | ------ | ----------------------- |
| controlName | string | Name of the PCF control |

## Options

| Name | Alias | Type   | Description      | Required | Default |
| ---- | ----- | ------ | ---------------- | -------- | ------- |
| lcid | lc    | string | Language Code ID | NO       |         |