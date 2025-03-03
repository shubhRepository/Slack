import {
  mutation as rawMutation,
  internalMutation as rawInternalMutation,
} from "../_generated/server";
import { DataModel } from "../_generated/dataModel";
import { Triggers } from "convex-helpers/server/triggers";
import {
  customCtx,
  customMutation,
} from "convex-helpers/server/customFunctions";

const triggers = new Triggers<DataModel>();

triggers.register("workspaces", async (ctx, change) => {
  if (change.operation === "insert") {
    await ctx.db.insert("channels", {
      name: "general",
      workspaceId: change.id,
    });
  }
});

export const mutation = customMutation(rawMutation, customCtx(triggers.wrapDB));
export const internalMutation = customMutation(
  rawInternalMutation,
  customCtx(triggers.wrapDB)
);
