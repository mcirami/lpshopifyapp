import { api } from "../api";
import CryptoJS from "crypto-js";

export async function disconnectShopify(records, storeDomain) {
  const hostUrl = getHostUrl();
  const url = hostUrl + "/api/auth/shopify/disconnect?domain=" + storeDomain;
  const decryptedToken = decryptToken(records[0].token);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${decryptedToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function getStoreRecords(storeDomain) {
  // Fetch records from the storeConnect table where storeDomain matches
  const storeConnectRecords = await api.storeConnect.findMany({
    where: {
      storeDomain: storeDomain,
    },
  });

  // Return the records if needed
  return storeConnectRecords;
}

/**
 * @param {integer} id
 */
export async function updateStoreConnection(id, status, token = null) {
  let data = {};
  if (token) {
    data = {
      connected: status,
      token: token,
    };
  } else {
    data = {
      connected: status,
    };
  }
  // save new record
  await api.storeConnect.update(id, data);
}

export async function saveStoreConnection(token, storeDomain) {
  // save new record
  await api.storeConnect.create({
    storeDomain: storeDomain,
    connected: true,
    token: token,
  });
}

export const getHostUrl = () => {
  return process.env.NODE_ENV === "production"
    ? "https://link.pro"
    : "https://up-hare-rightly.ngrok-free.app";
};

export const encryptToken = (token) => {
  const secretKey = process.env["GADGET_PUBLIC_ENCRYPT_KEY"]; // Replace with your actual secret key
  const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
  return encryptedToken;
};

export const decryptToken = (encryptedToken) => {
  const secretKey = process.env["GADGET_PUBLIC_ENCRYPT_KEY"]; // Use the same secret key used for encryption
  const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
  const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedToken;
};
