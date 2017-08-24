'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Addressmasters Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/addressmasters',
      permissions: '*'
    }, {
      resources: '/api/addressmasters/:addressmasterId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/addressmasters',
      permissions: ['get', 'post']
    }, {
      resources: '/api/addressmasters/:addressmasterId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/addressmasters',
      permissions: ['get']
    }, {
      resources: '/api/addressmasters/:addressmasterId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Addressmasters Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Addressmaster is being processed and the current user created it then allow any manipulation
  if (req.addressmaster && req.user && req.addressmaster.user && req.addressmaster.user.id === req.user.id) {
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
