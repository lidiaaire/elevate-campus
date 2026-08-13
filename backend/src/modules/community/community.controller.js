'use strict';

const asyncHandler      = require('../../utils/asyncHandler');
const CommunityService   = require('./community.service');

const getFeed = asyncHandler(async (req, res) => {
  const { userId, role } = req.user;
  const { page, limit }  = req.query;

  const result = await CommunityService.getFeed(role, userId, { page, limit });
  res.status(200).json(result);
});

// El body solo aporta `content` — type y scopeTeacherId los decide
// exclusivamente el Service, nunca el cliente.
const createPost = asyncHandler(async (req, res) => {
  const { userId, role } = req.user;
  const { content }      = req.body;

  const post = await CommunityService.createPost(role, userId, { content });
  res.status(201).json({ post });
});

module.exports = { getFeed, createPost };
