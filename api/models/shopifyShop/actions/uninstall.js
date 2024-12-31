import {
  applyParams,
  save,
  deleteRecord,
  ActionOptions,
  UninstallShopifyShopActionContext,
} from "gadget-server";
import { preventCrossShopDataAccess } from "gadget-server/shopify";

/**
 * @param { UninstallShopifyShopActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  applyParams(params, record);
  await preventCrossShopDataAccess(params, record);
  await save(record);
}

/**
 * @param { UninstallShopifyShopActionContext } context
 */
export async function onSuccess({ params, record, logger, api, connections }) {
  logger.debug(
    { params },
    `This is the response from uninstall in shopifyShop model`
  );
  try {
    // Call the delete method on the shopifyShop model
    await deleteRecord(record);
    logger.debug(
      `Shopify shop record with ID ${shopId} has been deleted successfully.`
    );
  } catch (error) {
    console.error("Error deleting shopifyShop record:", error.message);
  }
}

/** @type { ActionOptions } */
export const options = { actionType: "update" };
