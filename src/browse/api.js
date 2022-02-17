import { getPublic } from "../coalition/api";

const getPublicCoalitions = async () => {
  const coalitions = await getPublic();
  return coalitions;
}
export { getPublicCoalitions };