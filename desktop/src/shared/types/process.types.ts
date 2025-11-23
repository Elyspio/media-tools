export type ExecResult = {
	stdout: string;
	stderr: string;
};
export type SpawnResultOk = {
	/**
	 * ID du process lancé
	 */
	pid: string;
};
export type SpawnResultError = {
	error: string;
};
export type SpawnResult = SpawnResultOk | SpawnResultError;
