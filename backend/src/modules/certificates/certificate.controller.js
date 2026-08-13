'use strict';

const asyncHandler          = require('../../utils/asyncHandler');
const CertificateService    = require('./certificate.service');

const getMyCertificates = asyncHandler(async (req, res) => {
  const { userId, role } = req.user;
  const certificates = await CertificateService.getStudentCertificates(role, userId, userId);
  res.status(200).json({ certificates });
});

const getStudentCertificates = asyncHandler(async (req, res) => {
  const { userId, role } = req.user;
  const { studentId }    = req.params;
  const certificates = await CertificateService.getStudentCertificates(role, userId, studentId);
  res.status(200).json({ certificates });
});

const downloadCertificatePdf = asyncHandler(async (req, res) => {
  const filePath = await CertificateService.getCertificatePdf(req.user.userId, req.params.id);
  res.download(filePath);
});

const verifyCertificate = asyncHandler(async (req, res) => {
  const data = await CertificateService.verifyCertificate(req.params.certificateNumber);
  res.status(200).json({ certificate: data });
});

module.exports = {
  getMyCertificates,
  getStudentCertificates,
  downloadCertificatePdf,
  verifyCertificate,
};
