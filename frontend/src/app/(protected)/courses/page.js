'use client';

import { useAuth } from '@/hooks/useAuth';
import StudentCourses from './StudentCourses';
import CourseCatalog from '@/components/courses/CourseCatalog';

export default function CoursesPage() {
  const { user } = useAuth();
  return user?.role === 'student' ? <StudentCourses /> : <CourseCatalog />;
}
