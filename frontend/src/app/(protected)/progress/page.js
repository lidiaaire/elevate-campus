'use client';

import { useAuth } from '@/hooks/useAuth';
import StudentProgress from './StudentProgress';
import TeacherProgress from '@/components/progress/TeacherProgress';
import AdminProgress   from '@/components/progress/AdminProgress';

export default function ProgressPage() {
  const { user } = useAuth();

  if (user?.role === 'teacher') return <TeacherProgress />;
  if (user?.role === 'admin')   return <AdminProgress />;
  return <StudentProgress />;
}
