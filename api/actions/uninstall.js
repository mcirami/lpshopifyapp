import { UninstallGlobalActionContext } from "gadget-server";
/**
 * @param { UninstallGlobalActionContext } context
 */
export async function run({ params, logger, api, connections }) {
  logger.debug(
    { params },
    `This is the response from uninstall in Api/actions`
  );
  const storeId = params.id;
  await api.internal.shopifyApp.deleteMany({
    filter: {
      shopId: { equals: storeId },
    },
  });
  await api.internal.shopifyAppInstallation.deleteMany({
    filter: {
      shopId: { equals: storeId },
    },
  });
  await api.internal.shopifyCollect.deleteMany({
    filter: {
      shopId: { equals: storeId },
    },
  });
  await api.internal.shopifyCollection.deleteMany({
    filter: {
      shopId: { equals: storeId },
    },
  });
  await api.internal.shopifyProduct.deleteMany({
    filter: {
      shopId: { equals: storeId },
    },
  });
  await api.internal.shopifyProductImage.deleteMany({
    filter: {
      shopId: { equals: storeId },
    },
  });
  await api.internal.shopifyProductVariant.deleteMany({
    filter: {
      shopId: { equals: storeId },
    },
  });
  await api.internal.shopifySync.deleteMany({
    filter: {
      shopId: { equals: storeId },
    },
  });
}

export const options = {
  triggers: {
    shopify: {
      webhooks: ["app/uninstalled"],
    },
  },
};
