# json-html

> A simple, safe command to convert json to collapsible html for human inspection.  

![Verify](https://github.com/localnerve/json-html/workflows/Verify/badge.svg)

A command-line utility that takes json from stdin and writes collapsible html to stdout.  
This exists to provide an alternative to popular "json viewer" Chrome extensions.

## Usage

### Install
```shell
npm install -g @localnerve/json-html
```

### Run
```shell
cat input.json | json-html >output.html
// or go at an endpoint directly
curl 'https://api.example.com/path/item' | json-html >output.html
```

### License
License: MIT
