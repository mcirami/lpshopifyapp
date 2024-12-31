import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "storeConnect" model, go to https://linkpro.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "2pYujpQe7C0n",
  fields: {
    connected: {
      type: "boolean",
      default: false,
      storageKey: "2r10NqEFhiqY",
    },
    storeDomain: {
      type: "string",
      validations: { required: true, unique: true },
      storageKey: "IStuurfIahhQ",
    },
    token: {
      type: "string",
      validations: { required: true },
      storageKey: "srGIgG_15SAh",
    },
  },
};
