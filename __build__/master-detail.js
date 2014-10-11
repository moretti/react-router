webpackJsonp([7],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(9);
	var Router = __webpack_require__(1);
	var Route = Router.Route;
	var DefaultRoute = Router.DefaultRoute;
	var Routes = Router.Routes;
	var Link = Router.Link;
	var NotFoundRoute = Router.NotFoundRoute;
	var ContactStore = __webpack_require__(2);

	var App = React.createClass({displayName: 'App',
	  getInitialState: function() {
	    return {
	      contacts: ContactStore.getContacts(),
	      loading: true
	    };
	  },

	  componentWillMount: function () {
	    ContactStore.init();
	  },

	  componentDidMount: function() {
	    ContactStore.addChangeListener(this.updateContacts);
	  },

	  componentWillUnmount: function () {
	    ContactStore.removeChangeListener(this.updateContacts);
	  },

	  updateContacts: function () {
	    if (!this.isMounted())
	      return;

	    this.setState({
	      contacts: ContactStore.getContacts(),
	      loading: false
	    });
	  },

	  render: function() {
	    var contacts = this.state.contacts.map(function(contact) {
	      return React.DOM.li({key: contact.id}, Link({to: "contact", params: contact}, contact.first))
	    });
	    return (
	      React.DOM.div({className: "App"}, 
	        React.DOM.div({className: "ContactList"}, 
	          Link({to: "new"}, "New Contact"), 
	          React.DOM.ul(null, 
	            contacts
	          ), 
	          Link({to: "/nothing-here"}, "Invalid Link (not found)")
	        ), 
	        React.DOM.div({className: "Content"}, 
	          this.props.activeRouteHandler()
	        )
	      )
	    );
	  }
	});

	var Index = React.createClass({displayName: 'Index',
	  render: function() {
	    return React.DOM.h1(null, "Address Book");
	  }
	});

	var Contact = React.createClass({displayName: 'Contact',

	  mixins: [ Router.Navigation ],

	  getStateFromStore: function(props) {
	    props = props || this.props;
	    return {
	      contact: ContactStore.getContact(props.params.id)
	    };
	  },

	  getInitialState: function() {
	    return this.getStateFromStore();
	  },

	  componentDidMount: function() {
	    ContactStore.addChangeListener(this.updateContact);
	  },

	  componentWillUnmount: function () {
	    ContactStore.removeChangeListener(this.updateContact);
	  },

	  componentWillReceiveProps: function(newProps) {
	    this.setState(this.getStateFromStore(newProps));
	  },

	  updateContact: function () {
	    if (!this.isMounted())
	      return;

	    this.setState(this.getStateFromStore())
	  },

	  destroy: function() {
	    ContactStore.removeContact(this.props.params.id);
	    this.transitionTo('/');
	  },

	  render: function() {
	    var contact = this.state.contact || {};
	    var name = contact.first + ' ' + contact.last;
	    var avatar = contact.avatar || 'http://placekitten.com/50/50';
	    return (
	      React.DOM.div({className: "Contact"}, 
	        React.DOM.img({height: "50", src: avatar, key: avatar}), 
	        React.DOM.h3(null, name), 
	        React.DOM.button({onClick: this.destroy}, "Delete")
	      )
	    );
	  }
	});

	var NewContact = React.createClass({displayName: 'NewContact',

	  mixins: [ Router.Navigation ],

	  createContact: function(event) {
	    event.preventDefault();
	    ContactStore.addContact({
	      first: this.refs.first.getDOMNode().value,
	      last: this.refs.last.getDOMNode().value
	    }, function(contact) {
	      this.transitionTo('contact', { id: contact.id });
	    }.bind(this));
	  },

	  render: function() {
	    return (
	      React.DOM.form({onSubmit: this.createContact}, 
	        React.DOM.p(null, 
	          React.DOM.input({type: "text", ref: "first", placeholder: "First name"}), 
	          React.DOM.input({type: "text", ref: "last", placeholder: "Last name"})
	        ), 
	        React.DOM.p(null, 
	          React.DOM.button({type: "submit"}, "Save"), " ", Link({to: "/"}, "Cancel")
	        )
	      )
	    );
	  }
	});

	var NotFound = React.createClass({displayName: 'NotFound',
	  render: function() {
	    return React.DOM.h2(null, "Not found");
	  }
	});

	var routes = (
	  Route({handler: App}, 
	    DefaultRoute({handler: Index}), 
	    Route({name: "new", path: "contact/new", handler: NewContact}), 
	    Route({name: "contact", path: "contact/:id", handler: Contact}), 
	    NotFoundRoute({handler: NotFound})
	  )
	);

	React.renderComponent(
	  Routes({children: routes}),
	  document.getElementById('example')
	);



/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var API = 'http://addressbook-api.herokuapp.com/contacts';
	var _contacts = {};
	var _changeListeners = [];
	var _initCalled = false;

	var ContactStore = module.exports = {

	  init: function () {
	    if (_initCalled)
	      return;

	    _initCalled = true;

	    getJSON(API, function (err, res) {
	      res.contacts.forEach(function (contact) {
	        _contacts[contact.id] = contact;
	      });

	      ContactStore.notifyChange();
	    });
	  },

	  addContact: function (contact, cb) {
	    postJSON(API, { contact: contact }, function (res) {
	      _contacts[res.contact.id] = res.contact;
	      ContactStore.notifyChange();
	      if (cb) cb(res.contact);
	    });
	  },

	  removeContact: function (id, cb) {
	    deleteJSON(API + '/' + id, cb);
	    delete _contacts[id];
	    ContactStore.notifyChange();
	  },

	  getContacts: function () {
	    var array = [];

	    for (var id in _contacts)
	      array.push(_contacts[id]);

	    return array;
	  },

	  getContact: function (id) {
	    return _contacts[id];
	  },

	  notifyChange: function () {
	    _changeListeners.forEach(function (listener) {
	      listener();
	    });
	  },

	  addChangeListener: function (listener) {
	    _changeListeners.push(listener);
	  },

	  removeChangeListener: function (listener) {
	    _changeListeners = _changeListeners.filter(function (l) {
	      return listener !== l;
	    });
	  }

	};

	function getJSON(url, cb) {
	  var req = new XMLHttpRequest();
	  req.onload = function() {
	    if (req.status === 404) {
	      cb(new Error('not found'));
	    } else {
	      cb(null, JSON.parse(req.response));
	    }
	  };
	  req.open('GET', url);
	  req.send();
	}

	function postJSON(url, obj, cb) {
	  var req = new XMLHttpRequest();
	  req.onload = function() {
	    cb(JSON.parse(req.response));
	  };
	  req.open('POST', url);
	  req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	  req.send(JSON.stringify(obj));
	}

	function deleteJSON(url, cb) {
	  var req = new XMLHttpRequest();
	  req.onload = cb;
	  req.open('DELETE', url);
	  req.send();
	}




/***/ }
]);