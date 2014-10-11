webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(9);
	var Router = __webpack_require__(1);
	var Route = Router.Route;
	var Routes = Router.Routes;
	var Redirect = Router.Redirect;
	var Link = Router.Link;

	var App = React.createClass({displayName: 'App',
	  render: function() {
	    return (
	      React.DOM.div(null, 
	        React.DOM.ul(null, 
	          React.DOM.li(null, Link({to: "user", params: {userId: "123"}}, "Bob")), 
	          React.DOM.li(null, Link({to: "user", params: {userId: "abc"}}, "Sally"))
	        ), 
	        this.props.activeRouteHandler(null)
	      )
	    );
	  }
	});

	var User = React.createClass({displayName: 'User',
	  render: function() {
	    return (
	      React.DOM.div({className: "User"}, 
	        React.DOM.h1(null, "User id: ", this.props.params.userId), 
	        React.DOM.ul(null, 
	          React.DOM.li(null, Link({to: "task", params: {userId: this.props.params.userId, taskId: "foo"}}, "foo task")), 
	          React.DOM.li(null, Link({to: "task", params: {userId: this.props.params.userId, taskId: "bar"}}, "bar task"))
	        ), 
	        this.props.activeRouteHandler(null)
	      )
	    );
	  }
	});

	var Task = React.createClass({displayName: 'Task',
	  render: function() {
	    return (
	      React.DOM.div({className: "Task"}, 
	        React.DOM.h2(null, "User id: ", this.props.params.userId), 
	        React.DOM.h3(null, "Task id: ", this.props.params.taskId)
	      )
	    );
	  }
	});

	var routes = (
	  Route({handler: App}, 
	    Route({name: "user", path: "/user/:userId", handler: User}, 
	      Route({name: "task", path: "tasks/:taskId", handler: Task}), 
	      Redirect({from: "todos/:taskId", to: "task"})
	    )
	  )
	);

	React.renderComponent(
	  Routes({children: routes}),
	  document.getElementById('example')
	);


/***/ }
]);