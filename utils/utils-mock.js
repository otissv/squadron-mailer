'use strict';

export function find (query, mock) {
  if (Array.isArray(query)) return [ mock.find(a => query.find(q => q._id === a._id)) ];
  if (query._id) return mock.filter(item => item._id === query._id)[0];
  return mock;
};

export function findByField (query, mock, field) {
  if (query.[field) return mock.filter(item => item.[field === query.[field)[0];
  return mock.filter(item => item.[field === query)[0];
};
