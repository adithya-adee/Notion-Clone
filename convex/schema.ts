import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    userId: v.string(),
    isArchived: v.boolean(),
    coverImage: v.optional(v.string()),
    parentDocument: v.optional(v.id("documents")),
    content: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.boolean(),
  })
    .index("by_user", ["userId"]) // Removed trailing space
    .index("by_parent_user", ["userId", "parentDocument"]),
});
