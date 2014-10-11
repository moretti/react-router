webpackJsonp([8],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(9);
	var Router = __webpack_require__(1);
	var Routes = Router.Routes;
	var Route = Router.Route;
	var DefaultRoute = Router.DefaultRoute;
	var Link = Router.Link;
	var ActiveState = Router.ActiveState;
	var data = __webpack_require__(3);

	var CategoryNav = React.createClass({displayName: 'CategoryNav',
	  getInitialState: function() {
	    return { isOpen: this.props.defaultIsOpen};
	  },

	  getDefaultProps: function() {
	    return { isOpen: false };
	  },

	  componentWillReceiveProps: function(newProps) {
	    if (!this.state.isOpen)
	      this.setState({isOpen: newProps.defaultIsOpen});
	  },

	  toggle: function() {
	    this.setState({isOpen: !this.state.isOpen});
	  },

	  buildToggleClassName: function() {
	    var toggleClassName = 'CategoryNav__Toggle';
	    if (this.state.isOpen)
	      toggleClassName += ' CategoryNav__Toggle--is-open';
	    return toggleClassName;
	  },

	  renderItems: function() {
	    var category = this.props.category;
	    return this.state.isOpen ? category.items.map(function(item) {
	      var params = { name: item.name, category: category.name };
	      return (
	        React.DOM.li({key: item.name}, 
	          Link({to: "item", params: params}, item.name)
	        )
	      );
	    }) : null;
	  },

	  render: function() {
	    var category = this.props.category;
	    return (
	      React.DOM.div({className: "CategoryNav"}, 
	        React.DOM.h3({
	          className: this.buildToggleClassName(), 
	          onClick: this.toggle
	        }, category.name), 
	        React.DOM.ul(null, this.renderItems())
	      )
	    );
	  }
	});

	var Sidebar = React.createClass({displayName: 'Sidebar',
	  renderCategory: function(category) {
	    return CategoryNav({
	      key: category.name, 
	      defaultIsOpen: category.name === this.props.activeCategory, 
	      category: category}
	    );
	  },

	  render: function() {
	    return (
	      React.DOM.div({className: "Sidebar"}, 
	        this.props.categories.map(this.renderCategory)
	      )
	    );
	  }
	});

	var App = React.createClass({displayName: 'App',
	  mixins: [ActiveState],

	  render: function() {
	    var activeCategory = this.getActiveParams().category;
	    return (
	      React.DOM.div(null, 
	        Sidebar({activeCategory: activeCategory, categories: data.getAll()}), 
	        React.DOM.div({className: "Content"}, 
	          this.props.activeRouteHandler(null)
	        )
	      )
	    );
	  }
	});

	var Item = React.createClass({displayName: 'Item',
	  render: function() {
	    var params = this.props.params;
	    var category = data.lookupCategory(params.category);
	    var item = data.lookupItem(params.category, params.name);
	    return (
	      React.DOM.div(null, 
	        React.DOM.h2(null, category.name, " / ", item.name), 
	        React.DOM.p(null, "Price: $", item.price)
	      )
	    );
	  }
	});

	var Index = React.createClass({displayName: 'Index',
	  render: function() {
	    return (
	      React.DOM.div(null, 
	        React.DOM.p(null, "Sidebar features:"), 
	        React.DOM.ul({style: {maxWidth: '400px'}}, 
	          React.DOM.li(null, "User can open/close categories"), 
	          React.DOM.li(null, 
	            "Visiting an item on first page load will automatically open" + ' ' +
	            "the correct category. (Click an item, then reload the" + ' ' +
	            "browser.)"
	          ), 
	          React.DOM.li(null, 
	            "Navigating with forward/back buttons will open an active" + ' ' +
	            "category if it is not already open. (Navigate to several" + ' ' +
	            "items, close all the categories, then use back/forward" + ' ' +
	            "buttons.)"
	          ), 
	          React.DOM.li(null, 
	            "Only the user can close a category. (Navigating from an" + ' ' +
	            "active category will not close it.)"
	          )
	        )
	      )
	    );
	  }
	});

	var routes = (
	  Routes(null, 
	    Route({handler: App}, 
	      DefaultRoute({handler: Index}), 
	      Route({name: "item", path: ":category/:name", handler: Item})
	    )
	  )
	);

	React.renderComponent(routes, document.getElementById('example'));



/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var data = [
	  {
	    name: 'Tacos',
	    items: [
	      { name: 'Carne Asada', price: 7 },
	      { name: 'Pollo', price: 6 },
	      { name: 'Carnitas', price: 6 }
	    ]
	  },
	  {
	    name: 'Burgers',
	    items: [
	      { name: 'Buffalo Bleu', price: 8 },
	      { name: 'Bacon', price: 8 },
	      { name: 'Mushroom and Swiss', price: 6 }
	    ]
	  },
	  {
	    name: 'Drinks',
	    items: [
	      { name: 'Lemonade', price: 3 },
	      { name: 'Root Beer', price: 4 },
	      { name: 'Iron Port', price: 5 }
	    ]
	  }
	];

	var dataMap = data.reduce(function(map, category) {
	  category.itemsMap = category.items.reduce(function(itemsMap, item) {
	    itemsMap[item.name] = item;
	    return itemsMap;
	  }, {});
	  map[category.name] = category;
	  return map;
	}, {});

	exports.getAll = function() {
	  return data;
	};

	exports.lookupCategory = function(name) {
	  return dataMap[name];
	};

	exports.lookupItem = function(category, item) {
	  return dataMap[category].itemsMap[item];
	};



/***/ }
]);