import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    // TODO: create a proper method later
    const joinCode = "123456";

    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      userId,
      joinCode,
    });
    await ctx.db.insert("members", {
      userId,
      workspaceId,
      role: "admin",
    });
    return workspaceId;
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }
    const members = await ctx.db
      .query("members")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .collect();
    const workspaceIds = members.map((member) => member.workspaceId);

    return Promise.all(
      workspaceIds.map((workspaceId) => ctx.db.get(workspaceId))
    );
  },
});

export const getById = query({
  args: {
    id: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    // TODO: only get those workspace which uses has access to
    if (!userId) {
      throw new Error("Unauthorized");
    }
    return await ctx.db.get(args.id);
  },
});
