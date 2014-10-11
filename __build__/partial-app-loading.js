webpackJsonp([9],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(9);
	var Router = __webpack_require__(1);
	var Route = Router.Route;
	var Routes = Router.Routes;
	var Link = Router.Link;

	var AsyncReactComponent = {
	  loadedComponent: null,

	  load: function() {
	    if (this.constructor.loadedComponent) {
	      return;
	    }

	    this.bundle(function(component) {
	      this.constructor.loadedComponent = component;
	      this.forceUpdate();
	    }.bind(this));
	  },

	  componentDidMount: function() {
	    setTimeout(this.load, 1000); // feel it good
	  },

	  render: function() {
	    var component = this.constructor.loadedComponent;
	    return component ? component(this.props) : this.preRender();
	  }
	};

	var PreDashboard = React.createClass({displayName: 'PreDashboard',
	  mixins: [AsyncReactComponent],
	  bundle: __webpack_require__(5),
	  preRender: function() {
	    return React.DOM.div(null, "Loading dashboard...")
	  }
	});

	var PreInbox = React.createClass({displayName: 'PreInbox',
	  mixins: [AsyncReactComponent],
	  bundle: __webpack_require__(7),
	  preRender: function() {
	    return React.DOM.div(null, "Loading inbox...")
	  }
	});

	var App = React.createClass({displayName: 'App',
	  render: function() {
	    return (
	      React.DOM.div(null, 
	        React.DOM.h1(null, "Partial App"), 
	        React.DOM.ul(null, 
	          React.DOM.li(null, Link({to: "dashboard"}, "Dashboard"))
	        ), 
	        this.props.activeRouteHandler()
	      )
	    );
	  }
	});

	var routes = (
	  Routes(null, 
	    Route({handler: App}, 
	      Route({name: "dashboard", path: "dashboard", handler: PreDashboard}, 
	        Route({name: "inbox", path: "dashboard/inbox", handler: PreInbox})
	      )
	    )
	  )
	);

	React.renderComponent(routes, document.getElementById('example'));


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(cb) {
		__webpack_require__.e/*nsure*/(10, function(require) {
			cb(__webpack_require__(6));
		});
	}

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(cb) {
		__webpack_require__.e/*nsure*/(11, function(require) {
			cb(__webpack_require__(8));
		});
	}

/***/ }
]);