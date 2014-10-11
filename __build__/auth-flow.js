webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(9);
	var Router = __webpack_require__(1);
	var Route = Router.Route;
	var Routes = Router.Routes;
	var Link = Router.Link;

	var App = React.createClass({displayName: 'App',
	  getInitialState: function() {
	    return {
	      loggedIn: auth.loggedIn()
	    };
	  },

	  setStateOnAuth: function(loggedIn) {
	    this.setState({
	      loggedIn: loggedIn
	    });
	  },

	  componentWillMount: function() {
	    auth.onChange = this.setStateOnAuth;
	    auth.login();
	  },

	  render: function() {
	    var loginOrOut = this.state.loggedIn ?
	      Link({to: "logout"}, "Log out") :
	      Link({to: "login"}, "Sign in");
	    return (
	      React.DOM.div(null, 
	        React.DOM.ul(null, 
	          React.DOM.li(null, loginOrOut), 
	          React.DOM.li(null, Link({to: "about"}, "About")), 
	          React.DOM.li(null, Link({to: "dashboard"}, "Dashboard"), " (authenticated)")
	        ), 
	        this.props.activeRouteHandler(null)
	      )
	    );
	  }
	});

	var AuthenticatedRoute = {
	  statics: {
	    willTransitionTo: function (transition) {
	      if (!auth.loggedIn()) {
	        Login.attemptedTransition = transition;
	        transition.redirect('/login');
	      }
	    }
	  }
	};

	var Dashboard = React.createClass({displayName: 'Dashboard',
	  mixins: [AuthenticatedRoute],

	  render: function() {
	    var token = auth.getToken();
	    return (
	      React.DOM.div(null, 
	        React.DOM.h1(null, "Dashboard"), 
	        React.DOM.p(null, "You made it!"), 
	        React.DOM.p(null, token)
	      )
	    );
	  }
	});

	var Login = React.createClass({displayName: 'Login',
	  mixins: [ Router.Navigation ],

	  statics: {
	    attemptedTransition: null
	  },

	  getInitialState: function() {
	    return {
	      error: false
	    };
	  },

	  handleSubmit: function(event) {
	    event.preventDefault();
	    var email = this.refs.email.getDOMNode().value;
	    var pass = this.refs.pass.getDOMNode().value;
	    auth.login(email, pass, function(loggedIn) {
	      if (!loggedIn)
	        return this.setState({ error: true });

	      if (Login.attemptedTransition) {
	        var transition = Login.attemptedTransition;
	        Login.attemptedTransition = null;
	        transition.retry();
	      } else {
	        this.replaceWith('/about');
	      }
	    }.bind(this));
	  },

	  render: function() {
	    var errors = this.state.error ? React.DOM.p(null, "Bad login information") : '';
	    return (
	      React.DOM.form({onSubmit: this.handleSubmit}, 
	        React.DOM.label(null, React.DOM.input({ref: "email", placeholder: "email", defaultValue: "joe@example.com"})), 
	        React.DOM.label(null, React.DOM.input({ref: "pass", placeholder: "password"})), " (hint: password1)", React.DOM.br(null), 
	        React.DOM.button({type: "submit"}, "login"), 
	        errors
	      )
	    );
	  }
	});

	var About = React.createClass({displayName: 'About',
	  render: function() {
	    return React.DOM.h1(null, "About");
	  }
	});

	var Logout = React.createClass({displayName: 'Logout',
	  componentDidMount: function() {
	    auth.logout();
	  },

	  render: function() {
	    return React.DOM.p(null, "You are now logged out");
	  }
	});


	// Fake authentication lib

	var auth = {
	  login: function(email, pass, cb) {
	    var cb = arguments[arguments.length - 1];
	    if (localStorage.token) {
	      cb && cb(true);
	      this.onChange(true);
	      return;
	    }
	    pretendRequest(email, pass, function(res) {
	      if (res.authenticated) {
	        localStorage.token = res.token;
	        cb && cb(true);
	        this.onChange(true);
	      } else {
	        cb && cb(false);
	        this.onChange(false);
	      }
	    }.bind(this));
	  },

	  getToken: function() {
	    return localStorage.token;
	  },

	  logout: function(cb) {
	    delete localStorage.token;
	    cb && cb();
	    this.onChange(false);
	  },

	  loggedIn: function() {
	    return !!localStorage.token;
	  },

	  onChange: function() {}
	};

	function pretendRequest(email, pass, cb) {
	  setTimeout(function() {
	    if (email === 'joe@example.com' && pass === 'password1') {
	      cb({
	        authenticated: true,
	        token: Math.random().toString(36).substring(7),
	      });
	    } else {
	      cb({authenticated: false});
	    }
	  }, 0);
	}


	var routes = (
	  Routes(null, 
	    Route({handler: App}, 
	      Route({name: "login", handler: Login}), 
	      Route({name: "logout", handler: Logout}), 
	      Route({name: "about", handler: About}), 
	      Route({name: "dashboard", handler: Dashboard})
	    )
	  )
	);

	React.renderComponent(routes, document.getElementById('example'));


/***/ }
]);