webpackJsonp([3],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(9);
	var Router = __webpack_require__(1);
	var Route = Router.Route;
	var Routes = Router.Routes;
	var Link = Router.Link;

	var App = React.createClass({displayName: 'App',
	  render: function() {
	    return (
	      React.DOM.div(null, 
	        React.DOM.ul(null, 
	          React.DOM.li(null, Link({to: "user", params: {userId: "123"}}, "Bob")), 
	          React.DOM.li(null, Link({to: "user", params: {userId: "123"}, query: {showAge: true}}, "Bob With Query Params")), 
	          React.DOM.li(null, Link({to: "user", params: {userId: "abc"}}, "Sally"))
	        ), 
	        this.props.activeRouteHandler(null)
	      )
	    );
	  }
	});

	var User = React.createClass({displayName: 'User',
	  render: function() {
	    var age = this.props.query.showAge ? '33' : '';
	    return (
	      React.DOM.div({className: "User"}, 
	        React.DOM.h1(null, "User id: ", this.props.params.userId), 
	        age
	      )
	    );
	  }
	});

	var routes = (
	  Routes(null, 
	    Route({handler: App}, 
	      Route({name: "user", path: "user/:userId", handler: User})
	    )
	  )
	);

	React.renderComponent(routes, document.getElementById('example'));


/***/ }
]);