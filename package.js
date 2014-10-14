Package.describe({
  summary: "Allows templates to be defined in .spacebars files (client or server)",
  version: '1.0.8_2',
  name: 'cwohlman:templating-server',
  git: 'git@github.com:cwohlman/meteor-templating-server.git'
});

// This package is a close copy of the templating package, with the exception
// that it processes files on both client and server

Package._transitional_registerBuildPlugin({
  name: "compileServerTemplates",
  use: ['spacebars-compiler'],
  sources: [
    'plugin/html_scanner.js',
    'plugin/compile-templates.js'
  ]
});

// This on_use describes the *runtime* implications of using this package.
Package.on_use(function (api) {
  api.versionsFrom('0.9.3');
  // XXX would like to do the following only when the first html file
  // is encountered

  api.add_files('templating.js', 'server');
  api.export('Template', 'server');

  api.use('underscore'); // only the subset in packages/blaze/microscore.js

  // html_scanner.js emits client code that calls Meteor.startup and
  // Blaze, so anybody using templating (eg apps) need to implicitly use
  // 'meteor' and 'blaze'.
  api.use('blaze');
  api.imply(['meteor', 'blaze', 'spacebars']);
});
