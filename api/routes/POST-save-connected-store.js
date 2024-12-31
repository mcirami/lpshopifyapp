import { RouteContext } from "gadget-server";

import {
  encryptToken,
  getStoreRecords,
  saveStoreConnection,
  updateStoreConnection,
} from "../components/methods";

export default function route({ request, logger, api }) {
  const payload = request.body; // Get the incoming payload
  const storeDomain = payload.storeDomain;
  const encryptedToken = encryptToken(payload.token);

  getStoreRecords(storeDomain).then((records) => {
    if (records.length > 0) {
      updateStoreConnection(records[0].id, true, encryptedToken);
    } else {
      saveStoreConnection(encryptedToken, storeDomain);
    }
  });

  // Respond with a 204 No Content status
  //return context.response.status(204).send();
  return 204;
}
