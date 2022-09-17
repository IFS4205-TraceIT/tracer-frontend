import { AuthUser } from "~/types/AuthUser";

const temporaryUser = () => {
  return useState("temporaryUser", (): AuthUser => null);
};

const authUser = () => {
  return useState("authUser", (): AuthUser => null);
};

export default function () {
  return {
    temporaryUser,
    authUser,
  };
}
