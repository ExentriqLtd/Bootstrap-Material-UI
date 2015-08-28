# Exentriq - Bootstrap Material UI

**Note:** Not use this current version for production, only test purpose.

## Introduction

Implements Google's Material Design in Bootstrap

View the [DOC](http://bootstrap-material-ui.exentriq.com)

View the [CHANGELOG](https://github.com/ExentriqLtd/Bootstrap-Material-UI/blob/master/CHANGELOG.md)

## HTML Setup

Use the files in the "dist" folder

```
<!DOCTYPE html>
<html>
<head>
  <!--Import exentriq-bootstrap-material-ui.min.css-->
  <link type="text/css" rel="stylesheet" href="css/exentriq-bootstrap-material-ui.min.css"  media="screen,projection"/>

  <!--Let browser know website is optimized for mobile-->
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body>
  <!--Import exentriq-bootstrap-material-ui.min.js-->
  <script type="text/javascript" src="js/exentriq-bootstrap-material-ui.min.js"></script>
</body>
</html>
```

## Package dependencies

No need to separately include the following libraries, are already included in this library.

- Bootstrap (v3.3.5)
- jQuery (v2.1.4)
- jQuery Validation (v1.14.0)
- Autosize (v3.0.8)
- VelocityJS (v1.2.2)
- Waves (v0.7.2)
- Animate Sass (v0.6.4)
- Prism (v1.0.1)

## Installation

Install the main tools (require sudo on certain systems):

```
npm install -g grunt
npm install -g grunt-cli
npm install -g bower
```

Install the project dependencies, change to the project's root directory (require sudo on certain systems):

```
bower install
npm install
```

Run Grunt:

```
grunt
```

Grunt will then watch concurrently for changes to src and jade folders, js, scss and jade files build each as required.

## Links

[Bootstrap](http://getbootstrap.com), [Google Material Design](http://www.google.com/design/spec/material-design)
