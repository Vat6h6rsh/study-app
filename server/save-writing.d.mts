import type { Plugin } from 'vite'
export function writingSaver(): Plugin
export class SubmissionError extends Error { status: number }
export function saveSubmission(data: unknown): Promise<{file:string}>
export function submissionMarkdown(data: unknown, now?: Date): Promise<{filename:string;markdown:string}>
