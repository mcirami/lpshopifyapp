import type { GadgetPermissions } from "gadget-server";

/**
 * This metadata describes the access control configuration available in your application.
 * Grants that are not defined here are set to false by default.
 *
 * View and edit your roles and permissions in the Gadget editor at https://linkpro.gadget.app/edit/settings/permissions
 */
export const permissions: GadgetPermissions = {
  type: "gadget/permissions/v1",
  roles: {
    "shopify-app-users": {
      storageKey: "Role-Shopify-App",
      models: {
        shopifyAppInstallation: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyAppInstallation.gelly",
          },
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyCollect: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyCollect.gelly",
          },
        },
        shopifyCollection: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyCollection.gelly",
          },
        },
        shopifyGdprRequest: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyGdprRequest.gelly",
          },
          actions: {
            create: true,
            update: true,
          },
        },
        shopifyProduct: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyProduct.gelly",
          },
        },
        shopifyProductImage: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyProductImage.gelly",
          },
        },
        shopifyProductOption: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyProductOption.gelly",
          },
        },
        shopifyProductVariant: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyProductVariant.gelly",
          },
        },
        shopifyShop: {
          read: {
            filter: "accessControl/filters/shopify/shopifyShop.gelly",
          },
          actions: {
            install: true,
            reinstall: true,
            uninstall: true,
            update: true,
          },
        },
        shopifySync: {
          read: {
            filter: "accessControl/filters/shopify/shopifySync.gelly",
          },
          actions: {
            abort: true,
            complete: true,
            error: true,
            run: true,
          },
        },
        storeConnect: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
      },
      actions: {
        scheduledShopifySync: true,
      },
    },
    unauthenticated: {
      storageKey: "unauthenticated",
    },
  },
};
