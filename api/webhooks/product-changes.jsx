import { RouteContext } from "gadget-server";

/**
 * Route handler for product changes webhook
 *
 * @param { RouteContext } route context
 */
export default async function route({ request, reply, logger }) {
  // Log the incoming webhook payload
  logger.debug({ request }, "Incoming product changes webhook received");

  // Process the webhook data here (e.g., update your database)
  // ...

  // Reply with a 204 No Content response
  return reply.code(204).send();
}
