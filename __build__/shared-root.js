webpackJsonp([4],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(9);
	var Router = __webpack_require__(1);
	var Route = Router.Route;
	var Routes = Router.Routes;
	var Link = Router.Link;

	var App = React.createClass({displayName: 'App',
	  render: function () {
	    return (
	      React.DOM.div(null, 
	        React.DOM.ol(null, 
	          React.DOM.li(null, Link({to: "home"}, "Home")), 
	          React.DOM.li(null, Link({to: "signin"}, "Sign in")), 
	          React.DOM.li(null, Link({to: "forgot-password"}, "Forgot Password"))
	        ), 
	        this.props.activeRouteHandler(null)
	      )
	    );
	  }
	});

	var SignedIn = React.createClass({displayName: 'SignedIn',
	  render: function () {
	    return (
	      React.DOM.div(null, 
	        React.DOM.h2(null, "Signed In"), 
	        this.props.activeRouteHandler(null)
	      )
	    );
	  }
	});

	var Home = React.createClass({displayName: 'Home',
	  render: function () {
	    return (
	      React.DOM.h3(null, "Welcome home!")
	    );
	  }
	});

	var SignedOut = React.createClass({displayName: 'SignedOut',
	  render: function () {
	    return (
	      React.DOM.div(null, 
	        React.DOM.h2(null, "Signed Out"), 
	        this.props.activeRouteHandler(null)
	      )
	    );
	  }
	});

	var SignIn = React.createClass({displayName: 'SignIn',
	  render: function () {
	    return (
	      React.DOM.h3(null, "Please sign in.")
	    );
	  }
	});

	var ForgotPassword = React.createClass({displayName: 'ForgotPassword',
	  render: function () {
	    return (
	      React.DOM.h3(null, "Forgot your password?")
	    );
	  }
	});

	var routes = (
	  Routes(null, 
	    Route({handler: App}, 
	      Route({handler: SignedOut}, 
	        Route({name: "signin", handler: SignIn}), 
	        Route({name: "forgot-password", handler: ForgotPassword})
	      ), 
	      Route({handler: SignedIn}, 
	        Route({name: "home", handler: Home})
	      )
	    )
	  )
	);

	React.renderComponent(routes, document.getElementById('example'));


/***/ }
]);