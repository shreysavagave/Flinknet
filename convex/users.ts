import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server";

export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
    first_name: v.optional(v.string()),
    last_name: v.optional(v.string()),
    username: v.optional(v.string()),
    bio: v.optional(v.string()),
    location: v.optional(v.string()),
    websiteUrl: v.optional(v.string()),
    followersCount: v.number(),
    pushToken: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) =>
        q.eq("clerkId", args.clerkId)
      )
      .unique();

    if (existingUser) {
      return existingUser._id;
    }

    if (args.username) {
      const usernameTaken = await ctx.db
        .query("users")
        .withIndex("by_username", (q) =>
          q.eq("username", args.username)
        )
        .unique();

      if (usernameTaken) {
        throw new Error("Username already taken");
      }
    }

    return await ctx.db.insert("users", args);
  },
});

