import { get as getVerb } from "@amiga-fwk-web/api-utils/verbs";
import { withOAuth2Auth } from "@amiga-fwk-web/auth-oauth2v2/decorators";
import { decorate } from "@amiga-fwk-web/api-utils/decorators";

const useApi = () => {
  const apiVerbs = decorate<(url: string, options?: Record<string, unknown>) => Promise<Response>>(withOAuth2Auth, [
    getVerb,
  ]);

  return apiVerbs;
};

export default useApi;
