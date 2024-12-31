// Sets up the API client for interacting with your backend. 
// For your API reference, visit: https://docs.gadget.dev/api/linkpro
import { Client } from "@gadget-client/linkpro";

export const api = new Client({ environment: window.gadgetConfig.environment });
