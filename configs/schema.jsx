import { boolean, integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CourseList = pgTable('CourseList', {
    id: serial('id').primaryKey(),
    courseId: varchar('courseId').notNull(),
    name: varchar('name').notNull(),
    category: varchar('category').notNull(),
    level: varchar('level').notNull(),
    includeVideo: varchar('includeVideo').notNull().default('Yes'),
    imagePrompt: varchar('imagePrompt'),
    courseOutput: json('courseOutput').notNull(),
    createdBy: varchar('createdBy').notNull(),
    userName: varchar('userName'),
    userProfileImage: varchar('userProfileImage'),
    courseBanner: varchar('courseBanner').default('/courseImagePlaceholder.png'),
    publish: boolean('publish').default(false)
})

export const Chapters = pgTable('Chapters', {
    id: serial('id').primaryKey(),
    courseId: varchar('courseId').notNull(),
    chapter: json('chapter').notNull(),
})

export const Users = pgTable('Users', {
    id: serial('id').primaryKey(),
    username: varchar('username').notNull(),
    email: varchar('email').notNull(),
    token: integer('token').notNull().default(0),
})