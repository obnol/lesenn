import { getUser } from "@/lib/supabase/queries/cached-queries";
import { createClient } from "@/lib/supabase/server";
import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action";
import { z } from "zod";

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof Error) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const actionClientWithMeta = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof Error) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
      track: z
        .object({
          event: z.string(),
          channel: z.string(),
        })
        .optional(),
    });
  },
});

export const authActionClient = actionClientWithMeta
  .use(async ({ next, clientInput, metadata }) => {
    const result = await next({ ctx: undefined });

    if (process.env.NODE_ENV === "development") {
      console.log("Input ->", clientInput);
      console.log("Result ->", result.data);
      console.log("Metadata ->", metadata);

      return result;
    }

    return result;
  })
  .use(async ({ next }) => {
    const user = await getUser();
    const supabase = await createClient();

    if (!user?.data) {
      throw new Error("unauthorized");
    }

    return next({
      ctx: {
        supabase,
        user: user.data,
      },
    });
  });
