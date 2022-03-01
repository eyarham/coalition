import { getLoggedInUser } from "../user/api";

const getIsAdminUser = async () => {
  const user = await getLoggedInUser();
  const { isAdmin } = user.data();
  return isAdmin === true;
}

export { getIsAdminUser };

