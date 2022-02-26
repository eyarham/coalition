import { getDocs } from "firebase/firestore";
import { getLoggedInUser } from "../user/api";
import api from "../_common/api";

const getIsAdminUser = async () => {
  const user = await getLoggedInUser();
  const { isAdmin } = user.data();
  return isAdmin === true;
}
const getSystemRules = async () => {
  const snap = api("systemRules").getCollection();
  const docsSnap = await getDocs(snap);
  return docsSnap.docs;
}

export { getIsAdminUser, getSystemRules };

