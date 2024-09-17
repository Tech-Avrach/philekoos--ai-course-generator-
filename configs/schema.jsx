import { json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CourseList = pgTable('CourseList', {
    id: serial('id').primaryKey(),
    courseId: varchar('course_id').notNull(),
    name: varchar('name').notNull(),
    category: varchar('category').notNull(),
    level: varchar('level').notNull(),
    courseOutput: json('course_output').notNull(),
    createdBy: varchar('created_by').notNull(),
    userName: varchar('user_name'),
    userProfileImage: varchar('user_profile_image')
})