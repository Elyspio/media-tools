import { injectable } from "inversify";
import { safeStorage } from "electron";
import fs from "node:fs";
import path from "node:path";
import { MainContextModule } from "@main/modules/context/main.context.module";
import { inject } from "inversify";

type SecretKey = "oidc-refresh-token";

type SecretsFilePayload = Partial<Record<SecretKey, string>>;

@injectable()
export class SecureStorageModule {
	public constructor(@inject(MainContextModule) private readonly mainContextModule: MainContextModule) {}

	public async setSecret(key: SecretKey, value: string): Promise<void> {
		this.ensureEncryptionAvailable();
		const secrets = await this.readSecrets();
		secrets[key] = safeStorage.encryptString(value).toString("base64");
		await this.writeSecrets(secrets);
	}

	public async getSecret(key: SecretKey): Promise<string | undefined> {
		this.ensureEncryptionAvailable();
		const secrets = await this.readSecrets();
		const encrypted = secrets[key];
		if (!encrypted) return undefined;
		return safeStorage.decryptString(Buffer.from(encrypted, "base64"));
	}

	public async deleteSecret(key: SecretKey): Promise<void> {
		const secrets = await this.readSecrets();
		if (!secrets[key]) return;
		delete secrets[key];
		await this.writeSecrets(secrets);
	}

	private ensureEncryptionAvailable() {
		if (!safeStorage.isEncryptionAvailable()) {
			throw new Error("Secure storage encryption is not available on this system");
		}
	}

	private get secretsFilePath() {
		return path.resolve(this.mainContextModule.appFolder, "config", "secrets.json");
	}

	private async readSecrets(): Promise<SecretsFilePayload> {
		if (!fs.existsSync(this.secretsFilePath)) {
			return {};
		}

		try {
			const content = await fs.promises.readFile(this.secretsFilePath, "utf-8");
			return JSON.parse(content) as SecretsFilePayload;
		} catch {
			return {};
		}
	}

	private async writeSecrets(secrets: SecretsFilePayload): Promise<void> {
		await fs.promises.mkdir(path.dirname(this.secretsFilePath), { recursive: true });
		await fs.promises.writeFile(this.secretsFilePath, JSON.stringify(secrets, null, 2));
	}
}
