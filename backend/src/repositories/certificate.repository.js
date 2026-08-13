'use strict';

const BaseRepository = require('./base.repository');
const Certificate    = require('../models/certificate.model');

class CertificateRepository extends BaseRepository {
  constructor() {
    super(Certificate);
  }

  async findByStudent(studentId) {
    return this.model.find({ student: studentId });
  }

  async findByStudentWithCourse(studentId) {
    return this.model
      .find({ student: studentId })
      .populate('course', '_id title level')
      .sort({ issueDate: -1 })
      .lean();
  }

  // Usado por community.service para el feed de academia/cohorte: mismo
  // populate que findByStudentWithCourse, pero para un conjunto de
  // students (el scope ya resuelto por rol) en vez de uno solo.
  async findByStudents(studentIds) {
    return this.model
      .find({ student: { $in: studentIds } })
      .populate('student', 'firstName lastName email role')
      .populate('course', 'title level')
      .sort({ issueDate: -1 })
      .lean();
  }

  async findByStudentAndCourse(studentId, courseId) {
    return this.model.findOne({ student: studentId, course: courseId });
  }

  async exists(studentId, courseId) {
    return (await this.model.exists({ student: studentId, course: courseId })) !== null;
  }

  async findByCertificateNumber(certificateNumber) {
    return this.model
      .findOne({ certificateNumber })
      .populate('student', 'firstName lastName')
      .populate('course', 'title level')
      .lean();
  }
}

module.exports = new CertificateRepository();
