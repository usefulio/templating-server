Tinytest.add(
  'templating-server - compiles server templates',
  function(test) {
    test.equal(typeof Template, 'function');
    test.instanceOf(Template.testTemplate, Template);
  }
);