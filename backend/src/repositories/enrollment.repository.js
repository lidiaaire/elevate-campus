'use strict';

/**
 * repositories/enrollment.repository.js
 *
 * Responsabilidad: Acceso a datos para la entidad Enrollment.
 *
 * Métodos adicionales:
 *
 *   findByStudent(studentId, options?)
 *     → Matrículas del student con populate del curso (título, nivel, coverImage)
 *
 *   findByCourse(courseId, options?)
 *     → Matrículas de un curso con populate del student (nombre, email)
 *     → Usado por admin para listar students de un curso
 *
 *   findActive(studentId, courseId)
 *     → Matrícula activa del student en el curso o null
 *     → Usado frecuentemente para verificar acceso del student al contenido
 */

const BaseRepository     = require('./base.repository');
const Enrollment         = require('../models/enrollment.model');
const { ENROLLMENT_STATUS } = require('../config/constants');

class EnrollmentRepository extends BaseRepository {
  constructor() {
    super(Enrollment);
  }

  async findByStudent(studentId, options = {}) {
    const skip  = options.skip  ?? 0;
    const limit = options.limit ?? 20;
    const docs  = await this.model
      .find({ studentId })
      .populate('courseId', 'title level coverImageUrl status')
      .sort({ enrolledAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await this.model.countDocuments({ studentId });
    return { docs, total };
  }

  async findByCourse(courseId, options = {}) {
    const skip  = options.skip  ?? 0;
    const limit = options.limit ?? 20;
    const docs  = await this.model
      .find({ courseId })
      .populate('studentId', 'firstName lastName email')
      .sort({ enrolledAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await this.model.countDocuments({ courseId });
    return { docs, total };
  }

  async findActive(studentId, courseId) {
    return this.model.findOne({ studentId, courseId, status: ENROLLMENT_STATUS.ACTIVE });
  }

  // Override (en vez de delegar a super.findAll) porque admin/teacher necesitan
  // el nombre real del student y del curso, no solo el ObjectId — mismo
  // populate que ya usan findByStudent/findByCourse.
  async findAll(filters = {}, options = {}) {
    const query = {};
    if (filters.studentId !== undefined) query.studentId = filters.studentId;
    if (filters.courseId  !== undefined) query.courseId  = filters.courseId;
    if (filters.status    !== undefined) query.status    = filters.status;

    const skip  = options.skip  ?? 0;
    const limit = options.limit ?? 20;
    const sort  = options.sort  ?? { enrolledAt: -1 };

    const [docs, total] = await Promise.all([
      this.model
        .find(query)
        .populate('studentId', 'firstName lastName email')
        .populate('courseId', 'title level coverImageUrl status')
        .sort(sort)
        .skip(skip)
        .limit(limit),
      this.model.countDocuments(query),
    ]);
    return { docs, total };
  }

  async markCompleted(enrollmentId) {
    return this.model.findByIdAndUpdate(
      enrollmentId,
      { $set: { status: ENROLLMENT_STATUS.COMPLETED } },
      { new: true }
    );
  }
}

module.exports = new EnrollmentRepository();
