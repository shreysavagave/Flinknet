import { httpRouter } from "convex/server";
import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

export const handleClerkWebHook = httpAction(async (ctx, request) => {
  const payload = await request.json();
  const { data, type } = payload;

  if (type === "user.created") {
    await ctx.runMutation(internal.users.createUser, {
      clerkId: data.id,
      email: data.email_addresses[0].email_address,
      first_name: data.first_name,
      last_name: data.last_name,
      imageUrl: data.image_url,
      followersCount: 0,
    });
  }

  return new Response("OK", { status: 200 });
});

http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: handleClerkWebHook,
});

export default http;
