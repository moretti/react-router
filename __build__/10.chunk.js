webpackJsonp([10],{

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(9);
	var ReactRouter = __webpack_require__(1);
	var Link = ReactRouter.Link;

	var Dashboard = React.createClass({displayName: 'Dashboard',

	  render: function() {
	    return (
	      React.DOM.div(null, 
	        React.DOM.h1(null, "Dashboard!"), 
	        React.DOM.ul(null, 
	          React.DOM.li(null, Link({to: "inbox"}, "Inbox"))
	        ), 
	        this.props.activeRouteHandler()
	      )
	    );
	  }
	});

	module.exports = Dashboard;


/***/ }

});