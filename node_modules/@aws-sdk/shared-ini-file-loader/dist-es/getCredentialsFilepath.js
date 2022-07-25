import { join } from "path";
import { getHomeDir } from "./getHomeDir";
export var ENV_CREDENTIALS_PATH = "AWS_SHARED_CREDENTIALS_FILE";
export var getCredentialsFilepath = function () {
    return process.env[ENV_CREDENTIALS_PATH] || join(getHomeDir(), ".aws", "credentials");
};
