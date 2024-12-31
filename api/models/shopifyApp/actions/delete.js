import {
  deleteRecord,
  ActionOptions,
  DeleteShopifyAppActionContext,
} from "gadget-server";

/**
 * @param { DeleteShopifyAppActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  await deleteRecord(record);
}

/**
 * @param { DeleteShopifyAppActionContext } context
 */
export async function onSuccess({ params, record, logger, api, connections }) {
  logger.debug({ record }, `This is the response from shopifyApp model delete`);
}

/** @type { ActionOptions } */
export const options = { actionType: "delete" };
