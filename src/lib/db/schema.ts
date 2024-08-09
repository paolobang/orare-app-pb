import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const userSystemEnum = pgEnum('user_system_enum', ['system', 'user'])


export const chats = pgTable('chats',{
    chatId: serial('chat_id').primaryKey(), 
    userId: varchar('user_id', {length: 256}).notNull(), 
    prayerInput: text('prayer_input').notNull(), 
    chatCreatedAt: timestamp('chat_created_at').notNull().defaultNow(), 
})

export const messages = pgTable("messages", {
    messageId: serial("message_id").primaryKey(),
    chatId: integer('chat_id').references(() => chats.chatId).notNull(), 
    messageContent: text('message_content').notNull(),
    messageCreatedAt: timestamp('message_created_at').notNull().defaultNow(),
    role: userSystemEnum('role').notNull(),
})

// drizzle-orm 
// drizzle-kit 
// npx drizzle-kit studio