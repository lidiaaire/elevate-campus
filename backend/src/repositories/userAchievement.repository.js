'use strict';

const BaseRepository  = require('./base.repository');
const UserAchievement = require('../models/userAchievement.model');

class UserAchievementRepository extends BaseRepository {
  constructor() {
    super(UserAchievement);
  }

  async findByUser(userId) {
    return this.model
      .find({ user: userId })
      .populate('achievement', 'name slug description icon category points rarity')
      .sort({ unlockedAt: -1 })
      .lean();
  }

  // Usado por community.service para el feed de academia/cohorte: mismo
  // populate que findByUser, pero para un conjunto de usuarios (el scope
  // ya resuelto por rol) en vez de uno solo.
  async findByUsers(userIds) {
    return this.model
      .find({ user: { $in: userIds } })
      .populate('user', 'firstName lastName email role')
      .populate('achievement', 'name slug description icon category points rarity')
      .sort({ unlockedAt: -1 })
      .lean();
  }
}

module.exports = new UserAchievementRepository();
