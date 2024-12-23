import { CourseDto } from './course.dto';
import { LessonDto } from './lesson.dto';

export class EnrolledCourseDto {
  course: CourseDto;

  progress: number;

  resumeLesson?: LessonDto;

  completedLessons?: number[];

  constructor(partial: Partial<EnrolledCourseDto> = {}) {
    Object.assign(this, partial);
  }
}
