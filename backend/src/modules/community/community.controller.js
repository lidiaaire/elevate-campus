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

// El body solo aporta `content` — type y scopeTeacherId los decide
// exclusivamente el Service, nunca el cliente (igual que createPost).
const createAnnouncement = asyncHandler(async (req, res) => {
  const { userId, role } = req.user;
  const { content }      = req.body;

  const post = await CommunityService.createAnnouncement(role, userId, { content });
  res.status(201).json({ post });
});

const getComments = asyncHandler(async (req, res) => {
  const { userId, role } = req.user;
  const { postId }       = req.params;

  const comments = await CommunityService.getComments(role, userId, postId);
  res.status(200).json({ comments });
});

// El body solo aporta `content` — post y author los decide el controller/
// service a partir del param y del token, nunca el cliente.
const createComment = asyncHandler(async (req, res) => {
  const { userId, role } = req.user;
  const { postId }       = req.params;
  const { content }      = req.body;

  const comment = await CommunityService.createComment(role, userId, postId, { content });
  res.status(201).json({ comment });
});

const deletePost = asyncHandler(async (req, res) => {
  const { userId, role } = req.user;
  const { postId }       = req.params;

  await CommunityService.deletePost(role, userId, postId);
  res.status(204).send();
});

const deleteComment = asyncHandler(async (req, res) => {
  const { userId, role }        = req.user;
  const { postId, commentId }   = req.params;

  await CommunityService.deleteComment(role, userId, postId, commentId);
  res.status(204).send();
});

module.exports = {
  getFeed,
  createPost,
  createAnnouncement,
  deletePost,
  getComments,
  createComment,
  deleteComment,
};
