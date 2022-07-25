import { join } from "path";
import { getHomeDir } from "./getHomeDir";
export var ENV_CONFIG_PATH = "AWS_CONFIG_FILE";
export var getConfigFilepath = function () { return process.env[ENV_CONFIG_PATH] || join(getHomeDir(), ".aws", "config"); };
