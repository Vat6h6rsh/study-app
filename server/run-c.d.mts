export interface RunResult { compileOutput: string; stdout: string; stderr: string; exitCode: number | null; unavailable?: boolean; files?: Record<string, string> }
export function findGcc(): Promise<string | null>
export function runC(code: string, stdin?: string, options?: { fixtures?: Record<string, string>; expectedFiles?: Record<string, string> }): Promise<RunResult>
