'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Shoplists Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/shoplists',
      permissions: '*'
    }, {
      resources: '/api/shoplists/:shoplistId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/shoplists',
      permissions: ['get', 'post']
    }, {
      resources: '/api/shoplists/:shoplistId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/shoplists',
      permissions: ['get']
    }, {
      resources: '/api/shoplists/:shoplistId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Shoplists Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Shoplist is being processed and the current user created it then allow any manipulation
  if (req.shoplist && req.user && req.shoplist.user && req.shoplist.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
