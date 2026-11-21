Improve the ITP practice experience on MOBILE (and declutter it everywhere) in this Vite+React+TS app ("Examdesk"). Read AGENTS.md first (house rules, architecture, pitfalls, definition of done), then src/components/CodeQuestion.tsx, ConceptNote.tsx, QuestionBrief.tsx, TopicPicker.tsx, Report.tsx, Delight.tsx, App.tsx, src/lib/practice.ts, src/lib/grading.ts, src/index.css, the check scripts, and ../ui-ux-learning-guide.md (the UI standard: read the mobile, forms/inputs, progressive disclosure, hierarchy, touch, feedback and performance sections carefully and apply them). Do NOT touch src/data/dm/, content/dm/, public/dm/, scripts/verify-dm* (another agent is working there). Do NOT run git. Don't change question data or marking rules. No new npm deps. Edit files with your file tools (never PowerShell Get-Content/Set-Content). Run node scripts from upper-case Y:\.

## User feedback (verbatim intent)
"The new two-pane ITP UI stutters / doesn't work well on mobile. On mobile just directly write in the blanks? Formatting can be better, too cluttered; I understand there are many options on the practice page but it's an odd way to fill the blanks. Use the UI/UX guide for ideas, think and improve."

## 1. Mobile (< 768px): answer INLINE in the program
- Replace the separate answer pane on phones with inline inputs placed exactly where each blank is in the code. Each input: monospace, same font size as code, width sized to the longest accepted answer (min ~6ch, max fits the screen), 16px+ font so iOS doesn't zoom, clear placeholder "1".."10" or a tiny blank number badge, autocapitalize/autocorrect/spellcheck off, enterkeyhint="next".
- Live validation as before (neutral empty, red + cross when wrong, green + check when correct), but subtle inside code: a 2px border/underline colour + small icon, no layout jump. Correct and revealed answers stay inline (the program then reads as complete code).
- A compact keyboard accessory toolbar that appears while a blank is focused, pinned just above the on-screen keyboard (use visualViewport to position it; fall back to sticky bottom): "Blank 3 of 10" | Prev | Next | Reveal (eye) | Done. Next moves focus to the next blank and scrolls it into view smoothly but only if off-screen; Enter = Next. Reveal fills that blank (counts as revealed, not correct). No reveal in mocks.
- Long lines: on phones, soft-wrap code with a hanging indent that preserves the original indentation visually (e.g. `white-space: pre-wrap` per line with padding-left = indent and text-indent negative), hide line numbers on phones (or make them very subtle), so there is no horizontal scrolling while typing. Desktop keeps exact formatting with horizontal scroll if needed.
- Explain-code on phones: interleaved comment lines are cluttered. Show a small, tappable comment marker at the start of lines that have an explanation; tapping toggles that one comment beneath the line (progressive disclosure). The top "Explain code" switch = expand all / collapse all. Keep comments readable (not tiny), muted colour, AA contrast.
- One clear primary action at the bottom (Check / Next question) in thumb reach; the score summary ("7/10 correct") lives in the sticky question bar, not as extra blocks.

## 2. Declutter the practice page (all sizes, mobile especially)
Order and disclosure, following the guide's hierarchy rules:
1. Sticky question bar: topic chip + "Question X of N" + prev/next + progress/score. Filters and topic picker stay behind the existing sheet/menu, not inline.
2. Title + one-sentence goal (brief.goal) visible; the full rules + sample behind a "Task details" disclosure (open by default on desktop, closed on phones? decide per guide; must stay one tap away).
3. The program (the main thing: give it the most space and visual weight).
4. Expected output: a compact collapsible block directly under the program (closed on phones with a one-line preview of the first output line; open on desktop).
5. Concept fold-out and "Back to Learn" link at the bottom.
Remove duplicated labels/chips, reduce borders and nested cards, consistent spacing scale, fewer competing colours (topic colour as an accent only). Keep Core/Extra chip small.

## 3. Desktop / tablet
Keep the two-pane layout as the default on wide screens (it works well with a keyboard), but add a small "Answer: Side panel | Inline" segmented toggle in the question header (remembered in localStorage) so inline mode is available on desktop too. Inline mode on desktop uses the same inline inputs (no keyboard toolbar; Tab/Enter navigate).

## 4. Performance: remove the stutter
Find and fix the causes (measure, don't guess): e.g. the whole code block re-rendering on every keystroke, validation running on every render for all blanks, scrollIntoView on each input, re-creating line arrays, expensive box-shadows/filters/animations, layout thrash from chips changing width while typing, live-region spam. Use memoised line rendering (React.memo per line), per-blank state updates, stable callbacks, light debounce for validation feedback (~120ms) while keeping the input itself instant, `content-visibility`/containment where safe, CSS transitions only on colour/opacity, and reduced-motion respect. Add a simple render-count or timing assertion to the browser check script (e.g. typing 20 characters into one blank re-renders at most that blank's line and the toolbar/score, not every line).

## 5. Mocks
Same inline mode on phones and the same declutter; no reveal, no live red/green while the timer runs (neutral fields), marking shown in the report.

## 6. Finish
- Update checks: inline inputs present on phones (390px) and absent side-panel there; toolbar appears on focus with correct Blank N of 10 and Prev/Next working; soft-wrap means no horizontal scroll in the code at 390px for every ITP blanks question; comment markers toggle; expected output collapsible; desktop toggle works; mock has no reveal/live validation; contrast for any new tokens in all 4 themes; the render-count/perf assertion.
- node scripts/check-ui.mjs, node scripts/check-two-pane-browser.mjs (rename/extend as needed), npm run check:behavior, npm run verify:content (structural; gcc may be blocked in your sandbox), npm run build must pass. Revert src/data/itp/verification.json if only its timestamp changed.
- Write a short audit section to content/study-app-ui-audit-mobile-inline.md (separate file; supervisor merges it) listing the guide rules applied and before/after.
- Update AGENTS.md §3 (architecture: inline mode, toolbar) and §8 (timeline, 21-22 Nov) briefly.
Report what changed, the perf findings/fixes with numbers, and check results.
