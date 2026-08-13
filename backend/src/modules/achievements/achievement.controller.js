'use strict';

const asyncHandler       = require('../../utils/asyncHandler');
const AchievementService = require('./achievement.service');

const listUserAchievements = asyncHandler(async (req, res) => {
  const { userId, role } = req.user;
  const achievements = await AchievementService.getStudentAchievements(role, userId, userId);
  res.status(200).json({ achievements });
});

const listStudentAchievements = asyncHandler(async (req, res) => {
  const { userId, role } = req.user;
  const { studentId }    = req.params;
  const achievements = await AchievementService.getStudentAchievements(role, userId, studentId);
  res.status(200).json({ achievements });
});

module.exports = { listUserAchievements, listStudentAchievements };
