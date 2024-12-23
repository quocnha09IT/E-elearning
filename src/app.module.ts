import { UserModule } from '@/user/user.module';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BlogModule } from './blog/blog.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { CoreModule } from './core/core.module';
import { CourseModule } from './course/course.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { ReviewModule } from './review/review.module';
import { SettingModule } from './setting/setting.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OpenAiModule } from './openAi/openAi.module';

@Module({
  imports: [
    CoreModule,
    UserModule,
    BlogModule,
    CourseModule,
    DashboardModule,
    EnrollmentModule,
    BookmarkModule,
    ReviewModule,
    SettingModule,
    OpenAiModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),  // Đảm bảo rootPath trỏ tới thư mục public trong dự án
      serveRoot: '/',  // Đặt URL gốc cho thư mục images
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
