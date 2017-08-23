'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Manage products Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/manage-products',
      permissions: '*'
    }, {
      resources: '/api/manage-products/:manageProductId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/manage-products',
      permissions: ['get', 'post']
    }, {
      resources: '/api/manage-products/:manageProductId',
      permissions: ['get', 'post']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/manage-products',
      permissions: ['get']
    }, {
      resources: '/api/manage-products/:manageProductId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Manage products Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Manage product is being processed and the current user created it then allow any manipulation
  if (req.manageProduct && req.user && req.manageProduct.user && req.manageProduct.user.id === req.user.id) {
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
