var app = module.exports = require('derby').createApp('charts', __filename);
app.use(require('derby-debug'));
app.serverUse(module, 'derby-stylus');
app.use(require('d-bootstrap'));
app.loadViews(__dirname);
app.loadStyles(__dirname);
app.component(require('d-connection-alert'));
app.component(require('d-barchart'));
app.component(require('d-barchart-vanilla'));
app.component(require('d-d3-barchart'));

// This lets us play with the model in the console:
//   MODEL.get("widgets");
app.proto.create = function(model) {
  global.MODEL = model
}

app.get('/', function(page, model, params, next) {
  var data = model.at('widgets.data');
  data.subscribe(function(err) {
    if (err) return next(err);
    data.setNull('foo', [{value: 1}, {value: 10}, {value: 20 }]);
    page.render();
  });
});

// adding a prototype method to page of app
app.proto.remove = function(d,i,el) {
  this.model.remove("widgets.data.foo", i, 1);
}
app.proto.add = function() {
  this.model.push("widgets.data.foo", {value: Math.random() * 100 });
}
