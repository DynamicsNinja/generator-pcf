# <%= controlName %> ![GitHub release (latest by date)](https://img.shields.io/github/v/release/<%= githubUsername %>/<%= repo %>) ![GitHub All Releases](https://img.shields.io/github/downloads/<%= githubUsername %>/<%= repo %>/total)

## Overview

<%= controlDescription %>

## Download

[![download](https://user-images.githubusercontent.com/14048382/27844360-c7ea9670-6174-11e7-8658-80d356c1ba8f.png)](https://github.com/<%= githubUsername %>/<%= repo %>/releases/latest)

## Configuration

| Field | Description | Default | Required |
| - | - | - | :-: |
<% props.forEach(function(p){ %>| <%= p.name %> | <%= p.desc %> | <%= p.default %> | <% if(p.required == 'true'){ %>:heavy_check_mark:<% } else{ %>:x:<% } %> |
<% }); %>

## Preview

![](<%- previewImage %>)    

## Features

- Allows quick README document creation