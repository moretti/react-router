/** @jsx React.DOM */
var React = require('react');
var Router = require('../../modules/main');
var Routes = Router.Routes;
var Route = Router.Route;

var routes = (
  <Routes>
    <Route handler={require('./js/components/TodoApp')}>
      <Route name="all" handler={require('./js/components/All')}/>
      <Route name="active" handler={require('./js/components/Active')}/>
      <Route name="completed" handler={require('./js/components/Completed')}/>
    </Route>
  </Routes>
);

React.renderComponent(routes, document.body);

