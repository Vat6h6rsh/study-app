# CLAUDE.md

All project context, house rules, verification steps and history are in **[AGENTS.md](AGENTS.md)**. Read it before making changes, and keep it updated when you finish meaningful work.

Most important rules in brief:
- Commits have **no Co-Authored-By / attribution lines**.
- Verify before committing (AGENTS.md §5): `npm run verify:content` (gcc), `npm run check:behavior`, `node scripts/check-ui.mjs`, `npm run build`, run from an upper-case `Y:\` path.
- Never commit the student's real exam papers (`Bits_res/docs/agent-prompts/assesment.md` stays local).
- Don't edit files with PowerShell 5.1 `Get-Content`/`Set-Content` (corrupts UTF-8).
