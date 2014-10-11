webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(9);
	var Router = __webpack_require__(1);
	var Route = Router.Route;
	var Routes = Router.Routes;
	var Link = Router.Link;

	var App = React.createClass({displayName: 'App',

	  mixins: [ Router.Navigation ],

	  getInitialState: function() {
	    return {
	      tacos: [
	        { name: 'duck confit' },
	        { name: 'carne asada' },
	        { name: 'shrimp' }
	      ]
	    };
	  },

	  addTaco: function() {
	    var name = prompt('taco name?');
	    this.setState({
	      tacos: this.state.tacos.concat({name: name})
	    });
	  },

	  handleRemoveTaco: function(removedTaco) {
	    var tacos = this.state.tacos.filter(function(taco) {
	      return taco.name != removedTaco;
	    });
	    this.setState({tacos: tacos});
	    this.transitionTo('/');
	  },

	  render: function() {
	    var links = this.state.tacos.map(function(taco) {
	      return React.DOM.li(null, Link({to: "taco", params: taco}, taco.name))
	    });
	    return (
	      React.DOM.div({className: "App"}, 
	        React.DOM.button({onClick: this.addTaco}, "Add Taco"), 
	        React.DOM.ul({className: "Master"}, 
	          links
	        ), 
	        React.DOM.div({className: "Detail"}, 
	          this.props.activeRouteHandler({onRemoveTaco: this.handleRemoveTaco})
	        )
	      )
	    );
	  }
	});

	var Taco = React.createClass({displayName: 'Taco',
	  remove: function() {
	    this.props.onRemoveTaco(this.props.params.name);
	  },

	  render: function() {
	    return (
	      React.DOM.div({className: "Taco"}, 
	        React.DOM.h1(null, this.props.params.name), 
	        React.DOM.button({onClick: this.remove}, "remove")
	      )
	    );
	  }
	});

	var routes = (
	  Routes(null, 
	    Route({handler: App}, 
	      Route({name: "taco", path: "taco/:name", handler: Taco})
	    )
	  )
	);

	React.renderComponent(routes, document.getElementById('example'));


/***/ }
]);