import { Ref } from "vue";
import { AuthUser } from "~/types/AuthUser";

const temporaryUser = (): Ref<AuthUser> => {
  return useState("temporaryUser", (): AuthUser => null);
};

const authUser = (): Ref<AuthUser> => {
  return useState("authUser", (): AuthUser => null);
};

export default function () {
  return {
    temporaryUser,
    authUser,
  };
}
