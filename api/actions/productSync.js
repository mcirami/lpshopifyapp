import { ProductSyncGlobalActionContext } from "gadget-server";

/**
 * @param { ProductSyncGlobalActionContext } context
 */
export async function run({ params, trigger, logger, api, connections }) {
  const payload = trigger.payload;
  const topic = trigger.topic;
  const storeDomain = connections.shopify.currentShopDomain;
  const productUrl = "https://" + storeDomain + "/products/" + payload.handle;
  const data =
    topic === "products/delete"
      ? {
          id: payload.id,
          storeDomain: storeDomain,
        }
      : {
          id: payload.id,
          image: payload.image?.src || null,
          title: payload.title,
          price: payload.variants[0].price,
          productUrl: productUrl,
          storeDomain: storeDomain,
        };

  switch (topic) {
    case "products/create":
      postToLinkPro("/shopify/webhook/add-product", data);
      break;
    case "products/update":
      postToLinkPro("/shopify/webhook/update-product", data);
      break;
    case "products/delete":
      postToLinkPro("/shopify/webhook/delete-product", data);
      break;
    default:
      break;
  }
}

export const options = {
  triggers: {
    shopify: {
      webhooks: ["products/create", "products/update", "products/delete"],
    },
  },
};

export const postToLinkPro = async (slug, data) => {
  const hostUrl =
    process.env.NODE_ENV === "production"
      ? "https://link.pro"
      : "https://up-hare-rightly.ngrok-free.app";
  const url = hostUrl + slug + "?product=" + JSON.stringify(data);

  try {
    const fetchResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
      },
      /*  body: {
      product: JSON.stringify(myData),
      }*/
    });

    if (!fetchResponse.ok) {
      throw new Error(`HTTP error! status: ${fetchResponse.status}`);
    }
  } catch (error) {
    console.error("Error posting data:", error);
  }
};
