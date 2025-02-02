import {
  deleteRecord,
  ActionOptions,
  DeleteShopifyProductActionContext,
} from "gadget-server";
import { preventCrossShopDataAccess } from "gadget-server/shopify";

/**
 * @param { DeleteShopifyProductActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  await preventCrossShopDataAccess(params, record);
  await deleteRecord(record);
}

/**
 * @param { DeleteShopifyProductActionContext } context
 */
export async function onSuccess({
  params,
  record,
  logger,
  api,
  connections,
  context,
}) {
  // your logic goes here
}

/** @type { ActionOptions } */
export const options = { actionType: "delete" };
