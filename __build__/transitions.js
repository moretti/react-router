webpackJsonp([6],[
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
	          React.DOM.li(null, Link({to: "dashboard"}, "Dashboard")), 
	          React.DOM.li(null, Link({to: "form"}, "Form"))
	        ), 
	        this.props.activeRouteHandler() || React.DOM.h1(null, "Home")
	      )
	    );
	  }
	});

	var Dashboard = React.createClass({displayName: 'Dashboard',
	  render: function() {
	    return React.DOM.h1(null, "Dashboard")
	  }
	});

	var Form = React.createClass({displayName: 'Form',

	  mixins: [ Router.Navigation ],

	  statics: {
	    willTransitionFrom: function(transition, component) {
	      if (component.refs.userInput.getDOMNode().value !== '') {
	        if (!confirm('You have unsaved information, are you sure you want to leave this page?')) {
	          transition.abort();
	        }
	      }
	    }
	  },

	  handleSubmit: function(event) {
	    event.preventDefault();
	    this.refs.userInput.getDOMNode().value = '';
	    this.transitionTo('/');
	  },

	  render: function() {
	    return (
	      React.DOM.div(null, 
	        React.DOM.form({onSubmit: this.handleSubmit}, 
	          React.DOM.p(null, "Click the dashboard link with text in the input."), 
	          React.DOM.input({type: "text", ref: "userInput", defaultValue: "ohai"}), 
	          React.DOM.button({type: "submit"}, "Go")
	        )
	      )
	    );
	  }
	});

	var routes = (
	  Routes(null, 
	    Route({handler: App}, 
	      Route({name: "dashboard", handler: Dashboard}), 
	      Route({name: "form", handler: Form})
	    )
	  )
	);

	React.renderComponent(routes, document.getElementById('example'));


/***/ }
]);