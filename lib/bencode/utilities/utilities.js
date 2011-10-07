(function() {

  // Ensure compatibility with CommonJS modules or browser
  var root;
  root = typeof module !== "undefined" && module.exports ? module.exports : window;

  // We'll use an instance of this to break iterations
  root.__Breaker = function() {}

  // cache reference to Object.hasOwnProperty
  var hasOwnProperty = Object.hasOwnProperty;

  Array.prototype.__each = function( iterator, context, callback ) {
    var len = this.length;

    if ( len < 1 || iterator == null || typeof iterator !== "function" ) return;

    var self = this
      , i    = 0
    ;
    for( i; i < len; ++i ) {
      if ( iterator.call( context, self[i] ) instanceof __Breaker ) return;
    }
    if ( callback != null && typeof callback === "function" ) callback();
  }

  Object.prototype.__each = function( iterator, context, callback ) {

    if ( iterator == null || typeof iterator !== "function" ) return;

    var self = this;
    for( var key in self ) {
      if ( hasOwnProperty.call( self, key ) ) {
        if ( iterator.call( context, self[key], key, self ) instanceof __Breaker ) return;
      }
    }
    if ( callback != null && typeof callback === "function" ) callback();
  }

}).call( this );