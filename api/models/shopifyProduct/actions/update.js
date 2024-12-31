import {
  applyParams,
  save,
  ActionOptions,
  UpdateShopifyProductActionContext,
} from "gadget-server";
import { preventCrossShopDataAccess } from "gadget-server/shopify";

/**
 * @param { UpdateShopifyProductActionContext } context
 */
export async function run({ params, record, api, connections }) {
  applyParams(params, record);
  await preventCrossShopDataAccess(params, record);
  await save(record);
}

/**
 * @param { UpdateShopifyProductActionContext } context
 */
export async function onSuccess({
  params,
  record,
  logger,
  api,
  connections,
  context,
}) {
  // Logic goes here
}

/** @type { ActionOptions } */
export const options = { actionType: "update" };
