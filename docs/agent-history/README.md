# Agent prompt history

Every delegated job's prompt, in order, so the reasoning behind each feature is recoverable. Agents: Codex CLI `gpt-6.1-sol` (xhigh/high effort) unless noted; Sonnet subagents filled in when Codex usage ran out. The manager agent (Claude Code) verified each result (gcc, checks, build) and committed. See `../../AGENTS.md`.

| Date | Prompt | What it produced | Notes |
|---|---|---|---|
| 19 Nov | `codex_prompt.md` | Topic-sorted ITP question bank from 5 past papers (`content/itp/question-bank.md`) | Source text from pdftotext extractions outside the repo |
| 19 Nov | `codex_app_prompt.md` | The app itself: practice, mocks, C scratchpad, 121 ITP questions, progress | gcc installed mid-run; manager verified 120/120 |
| 19 Nov | `codex_learn_prompt.md` | Learn tab + 13 ITP concept notes | |
| 19 Nov | `codex_ui_prompt.md` | UI/UX audit against `ui-ux-learning-guide.md` (502 items) + fixes | `content/study-app-ui-audit.md` |
| 19 Nov | `codex_theme_prompt.md` | 4 themes, theme switcher, collapsible sidebar | User found single-hue design bland → next two |
| 19 Nov | `codex_brief_prompt.md` | "What this program does" briefs on every ITP question | Codex hit usage limit; Sonnet verified samples with gcc |
| 19 Nov | `codex_visual_prompt.md` | Multi-colour topic palettes, confetti/shake feedback, typography | Finished by a Sonnet subagent |
| 20 Nov | `wp-content.md` → `wp-content-v2.md` | WP subject: 12 notes, 185 tasks, 3 mocks, save-for-grading | v2 rebuilt around the instructor's 50-mark Q1A–Q5B format |
| 20 Nov | (Sonnet, inline) | WP cheatsheet; mobile navigation (sticky top bar, bottom tabs, sheets) | |
| 21 Nov | `itp-two-pane.md` | Two-pane ITP practice, exactly 10 blanks, password-style answer boxes, Explain-code comments | Sandbox blocked gcc/git; manager verified + committed |
| 21 Nov | `itp-exam-style-and-nav.md` | Expected output under programs, 77 exam-pattern questions, 148-method coverage, Core/Extra, topic grouping, Mocks D/E/F | Real exam papers used as a pattern only, never verbatim |
| 21 Nov | `itp-concepts-and-reveal.md` | Spec for beginner comments, concept fold-out, reveal-fills-program, Reveal all | Executed as the two split prompts below |
| 21 Nov | `itp-comments-content.md` | Beginner-level comments + concept notes, run as 5 parallel slices writing `tmp-patches/*.json` | Merged by id by the manager |
| 21 Nov | `itp-reveal-ui.md` | Concept fold-out, revealed answers fill the program, Reveal all | |
| 21 Nov | `dm-content.md` | DM content: notes, auto-gradable question types, mocks, maths verifiers | DM exam 28 Nov; UI integration is a follow-up |
| 21 Nov | `itp-mobile-inline.md` + `itp-code-no-scroll.md` | Phones: answer inline in the code with a keyboard toolbar; decluttered practice page; desktop Side panel/Inline toggle; stutter fixed (line-level memoisation); program in page flow with soft-wrap, no inner scroll | Codex hit its limit before starting; done by a Sonnet subagent (commit 54ea1b4) |
| 26 Nov | `dm-ui.md` + `dm-ui-integration-2026-11-26.md` | DM UI integration spec and completed implementation handoff | All nine editors, manifest-driven Slot 1 route, five mocks, mobile checks; supervisor owns GCC verification and commit |
| 26 Nov | `dm-slot1-content.md` | DM Slot 1 pattern: reported questions + variants (39 core), full typed induction proofs with 5-part rubrics, Mocks 4-5 in the exact Slot 1 layout, slot1-pattern.md + Learn note, verify-dm-slot1 | Recurrence answer cross-checked independently by the manager |
| 28 Nov | `dm-slot1-lessons.md` | Teacher-style lessons for all 39 Slot 1 practice questions + Mocks 4-5 (53), stored in src/data/dm/lessons.json (generator-safe), shown under each answer and as Learn note 13 | 4 parallel Sonnet slices; DM exam day |
