/* istanbul ignore file */

import ExampleSchema from "@/eventbus/example/schema.json";

const eventsSchemas = [ExampleSchema];

export type CountStatePayload = {
  featureId: string;
  count: number;
};

export default eventsSchemas;
