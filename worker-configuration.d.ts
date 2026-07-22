/* eslint-disable */

interface __BaseEnv_Env {
	ZANDA_API_KEY: string;
	ZANDA_BASE_URL: string;
	ZANDA_TIME_ZONE: string;
	MCP_BEARER_TOKENS: string;
	MCP_OBJECT: DurableObjectNamespace<import("./src/index").ZandaMcpAgent>;
	MCP_SANITISED_OBJECT: DurableObjectNamespace<import("./src/index").SanitisedZandaMcpAgent>;
}
declare namespace Cloudflare {
	interface GlobalProps {
		mainModule: typeof import("./src/index");
		durableNamespaces: "ZandaMcpAgent";
	}
	interface Env extends __BaseEnv_Env {}
}
interface Env extends __BaseEnv_Env {}
type StringifyValues<EnvType extends Record<string, unknown>> = {
	[Binding in keyof EnvType]: EnvType[Binding] extends string ? EnvType[Binding] : string;
};
declare namespace NodeJS {
	interface ProcessEnv extends StringifyValues<Pick<Cloudflare.Env, "ZANDA_API_KEY" | "ZANDA_BASE_URL" | "MCP_BEARER_TOKENS">> {}
}
