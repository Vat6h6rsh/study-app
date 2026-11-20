lessons += [
('summary','06-summarising.md','Q3B · Summary with title and keywords',
'A summary retains the main idea and essential supporting points in fewer words. Aim for about half the passage length unless a precise limit is supplied. Add a relevant title and highlight or underline keywords in your answer.',
'Examples, repetition and minor details usually consume space without changing the message. Opinions and new explanations distort the source.',
['Read the whole passage and state its main idea in one sentence.','Identify essential supporting points and qualifications.','Cut examples, repetition and decorative detail. Keep numbers only when essential.','Draft a connected paragraph in your own words and add a short informative title.','Highlight a few central concepts in the answer. Check the length and compare with the original.'],
'''[Specific title]
[Main idea in new words]. [Essential supporting point]. [Qualification or stated implication].
Highlight central terms such as ==accessible resources==. Do not highlight the entire paragraph.''',
['No title or highlighted keywords; highlighting only the source.','“I think” or a recommendation absent from the passage.','Copying sentences or producing disconnected fragments.','Using an old 15–20-word instruction for a new half-length task.'],'wp-summary-01'),
('report','07-report-writing.md','Q4 · Investigation report',
'A report records a systematic investigation for a reader who needs evidence and action. Use the seven required sections: title, abstract/executive summary, introduction, methodology, findings, conclusion and recommendations.',
'Methods explain how evidence was obtained. Findings say what was observed. Conclusions interpret it. Recommendations propose action. The executive summary covers the whole report, including outcomes; the introduction supplies context and scope.',
['Identify the audience, problem, purpose and boundaries. Use supplied facts first.','Plan a plausible investigation: surveys for patterns, interviews for experiences, observation for direct events and records for documented history.','Describe who or what was studied, where, when, how and how the evidence was analysed. Give one limitation.','Present specific findings. For a simulated task, label necessary assumptions; do not imply that you actually interviewed real people.','Draw conclusions justified by the findings. Recommend feasible actions with owners, timing and a review measure.','Write the executive summary last, then place it after the title. Check headings and impersonal style.'],
'''Title: Investigation into [specific situation]
Executive Summary: [Purpose]. [Method]. [Main finding]. [Recommended direction].
Introduction: This report investigates [problem] for [audience]. It covers [scope/period].
Methodology: Evidence was collected through [survey/interviews/observation/records] involving [sample] during [period]. [Analysis]. [Limitation].
Findings: [Observed result 1 with evidence]. [Result 2]. [Exception].
Conclusion: The evidence indicates [interpretation]. [Qualification].
Recommendations: [Owner] should [action] by [date]. [Second action]. Review progress using [measure] after [period].

Finding: 18 of 30 respondents reported noise.
Conclusion: Current quiet-zone arrangements are insufficient.
Recommendation: The manager should move the signs within two weeks.''',
['A narrative with no investigation or methods.','An executive summary containing only background.','Claiming all students agree after a small sample.','“Improve everything” without a specific action, owner or timetable.','A new finding in the conclusion. A literature review is not a substitute for the required sections.'],'wp-report-01'),
('abstracts','08-abstract-parts.md','Q5A · Write out abstract components',
'An abstract compresses background, purpose/aim, methodology, results/findings and conclusion/implications. Q5A asks you to write out four named parts worth one mark each. Enter sentence text, not a letter or label.',
'Function matters more than position. One sentence can combine moves, and an abstract may omit a move. “We show” commonly signals a result rather than an aim.',
['Read the four requested names first.','Identify context/problem and what the study set out to do.','Locate procedure, sample, tools or dataset. Separate what was done from what was discovered.','Find observed outcomes and their final interpretation.','Copy the exact relevant sentence(s). A sentence combining purpose and method may belong in both boxes.'],
'''Background: [Known situation / unresolved problem]. Signals: “Previous work…”, “Little is known…”.
Purpose: [Aim/research question]. Signals: “This study aimed to…”, “The purpose was…”.
Methodology: [How evidence was collected/analysed]. Signals: “We interviewed…”, “Data were collected…”.
Results: [Observed finding]. Signals: “We found…”, “The results showed…”.
Conclusion/implications: [Meaning/application]. Signals: “These findings suggest…”, “This may support…”.''',
['Entering “C” instead of the purpose sentence.','Paraphrasing when asked to write out source text.','Calling every later sentence methodology.','Inventing a missing aim or method. Old matching papers contain overlapping roles.'],'wp-abstract-01'),
('grammar','09-grammar-correction.md','Q5B · Full paragraph correction',
'Rewrite the entire paragraph in complete, grammatical sentences. Preserve meaning and highlight every correction. A list of errors alone does not satisfy the task.',
'Errors interact. Changing a noun may require a new verb, article or pronoun. A full reread catches errors introduced during repair. Marking changes makes the correction visible.',
['Read for meaning and identify the time frame.','Find each clause’s subject and finite verb. Ignore intervening of-phrases when checking agreement.','Scan tense consistency, articles, prepositions and pronoun reference.','Check word form, spelling, plurals and countability: carefully, not careful; information, not informations.','Repair run-ons and comma splices with a full stop, semicolon or comma plus conjunction. Join fragments to a main clause.','Highlight changed words and punctuation. For a deletion, highlight the repaired phrase. Reread the whole paragraph.'],
'''Agreement: Each response were → Each response ==was==.
Tense: Yesterday the team meet → Yesterday the team ==met==.
Articles: an useful guide → ==a== useful guide; a hour → ==an== hour.
Preposition: in Monday → ==on== Monday.
Pronoun: explained to they → explained to ==them==.
Run-on: The file failed we retried → The file failed==;== we retried.
Comma splice: The file failed, we retried → The file failed, ==so== we retried.
Fragment: Because the file failed. → Because the file failed, ==we retried==.
Word form: spoke polite → spoke ==politely==.
Spelling: recieve → ==receive==.
Plural: two device → two ==devices==.''',
['Correcting only some errors or omitting a sentence.','Changing the message to avoid difficult grammar.','Highlighting the original error instead of its correction.','Leaving a comma splice after fixing vocabulary.','Treating singular they/their as automatically wrong. It is acceptable with an unknown-gender individual.'],'wp-grammar-01'),
('style','10-academic-style.md','Academic style, cohesion and vocabulary',
'Academic style is precise and appropriately formal. Unity means every sentence serves the controlling idea. Coherence is logical ordering. Cohesion uses references, repeated key terms and suitable transitions to connect ideas.',
'The supplied synonyms list includes near-synonyms with different connotations. Notorious and renowned are not interchangeable. Prove is stronger than indicate. Choose meaning, not complexity.',
['Choose one controlling idea per paragraph. Put familiar information before new detail.','Identify the relationship: addition, contrast, cause, example or conclusion.','Use a suitable transition only where helpful: furthermore, however, consequently, for example, overall.','Check pronoun references and consistent terminology. Replace unclear “this” with a specific noun phrase.','Choose a context-fitting synonym and check its grammar and strength.'],
'''get → obtain / acquire
show → indicate / demonstrate / display (choose according to evidence)
help → assist / support
decrease → reduce / decline (check transitive/intransitive grammar)
fair → impartial / objective
explain → clarify / elaborate
idea → concept / notion
start → begin / initiate
big → substantial / large
wrong → incorrect / inaccurate

Paragraph: [Claim]. For example, [support]. However, [qualification]. Therefore, [limited conclusion].''',
['Moreover between unrelated claims.','Therefore when no consequence follows.','Obscure synonyms replacing clear ordinary words.','Confusing findings, conclusions and implications.'],None)]
for topic,filename,title,concept,why,method,template,mistakes,qid in lessons:
 q=next((q for q in original if q['id']==qid),None)
 if q and q['type']=='writing':
  prompt=q['prompt']+('\n\nSource passage: '+q['passage'] if q.get('passage') else '')
  if q.get('chart'):prompt+='\n\n'+q['chart']['title']+': '+ '; '.join(label+' '+str(q['chart']['series'][0]['values'][i]) for i,label in enumerate(q['chart']['labels']))+'. Unit: '+q['chart']['yLabel']+'.'
  model=q['modelAnswer'];reason='\n'.join('- '+x for x in q['annotations'])
 elif q and q['type']=='abstract-parts':
  prompt=q['abstract']+'\n\nWrite out: '+', '.join(p['name'] for p in q['parts']);model='\n\n'.join(p['name']+': '+p['accepted'][0] for p in q['parts']);reason='\n'.join('- '+p['explanation'] for p in q['parts'])
 elif q and q['type']=='grammar-rewrite':
  prompt=q['original'];model=q['corrected']
  # Highlight intervals in the original corrected key, avoiding nested/overlapping markers.
  intervals=[]
  for e in q['errors']:
   pos=model.find(e['correction'])
   if pos>=0:intervals.append((pos,pos+len(e['correction'])))
  merged=[]
  for a,b in sorted(intervals):
   if merged and a<=merged[-1][1]:merged[-1]=(merged[-1][0],max(b,merged[-1][1]))
   else:merged.append((a,b))
  for a,b in reversed(merged):model=model[:a]+'=='+model[a:b]+'=='+model[b:]
  reason='\n'.join('- '+e['error']+' → '+e['correction']+': '+e['rule'] for e in q['errors'])
 else:
  prompt='Rewrite formally and connect the ideas: “The team got lots of replies. The survey was small. It proves everybody loves the system.”'
  model='The team obtained numerous responses. However, the sample was small. The findings therefore indicate favourable views among respondents rather than universal approval.'
  reason='- Obtain fits data collection.\n- However introduces a qualification.\n- The conclusion is limited to the sample; prove and everybody are removed.'
 body=f'# {title}\n\nTopic ID: `{topic}`\n\n## Concept\n\n{concept}\n\n## Why it matters\n\n{why}\n\n## Step-by-step method\n\n'+'\n'.join(f'{i+1}. {x}' for i,x in enumerate(method))+f'\n\n## Template / skeleton\n\n```text\n{template}\n```\n\nTip: Replace every placeholder with task-specific content.\n\n## Worked exam-style prompt\n\n{prompt}\n\n## Fully worked model answer\n\n{model}\n\n## Why the model works\n\n{reason}\n\n## Common mistakes that lose marks\n\n'+'\n'.join('- '+x for x in mistakes)+'\n\nTrap: A memorised answer on a related topic may still miss this prompt.\n\nRemember: Check the finished answer against the exact instruction.\n\nNote: Models illustrate one good answer. The practice rubrics are advisory, not official instructor marking keys.\n'
 (CON/filename).write_text(body,encoding='utf-8')
analysis='''# WP exam analysis — BCS ZC239

The instructor’s upcoming format overrides the historical layouts. Answers are typed into text boxes. Assume 2.5 hours (150 minutes), following the past papers. There are five questions, nine parts and 50 marks.

| Question | Parts and marks |
| --- | --- |
| Q1 | A: argumentative essay, 250 words (6); B: paraphrase (4) |
| Q2 | A: formal email (6); B: exactly 4 open + 4 closed questions (4, half each) |
| Q3 | A: requested graphic/table interpretation (5); B: half-length summary with title, highlighted keywords and no opinion/details (5) |
| Q4 | Investigation report: title, abstract/executive summary, introduction, methodology, findings, conclusion, recommendations (10) |
| Q5 | A: write out four named abstract parts (4); B: rewrite the entire erroneous paragraph and highlight every correction (6) |

Citations/referencing are not in the rubric. Article writing and flowcharts are not examined. Allow three minutes per mark, including planning and review.

## Every historical task

Papers 1–3 actually contain eight tasks each; papers 4–5 have seven each: 38 total. Original wording and marks are retained. Abstract adaptations use the new four-part, 4-mark scale and show original marks separately. Conclusion matching remains supplementary report practice, not an extra mock question.

| Paper | Original task | Type / topic | Original marks | New mapping |
| --- | --- | --- | --- | --- |
'''
for p in range(1,6):
 for n in sorted(source_blocks[p]):
  q=next(q for q in past if q['id']==f'wp-p{p}-q{n}')
  analysis+=f"| {p} | Q{n} | {q.get('task',q['type'])}: {q['title'].split(': ',1)[-1]} | {q['originalMarks']:g} | {q['partLabel']} |\n"
analysis+='''
## Frequency and priority

| Skill | Old tasks / papers | Upcoming marks | Priority |
| --- | --- | --- | --- |
| Essay | 5 / 5 | 6 | High; prepare 250 words |
| Paraphrase | 8 / 5 | 4 | High; preserve meaning and length |
| Email | 2 / 2 | 6 | High; prepare several purposes |
| Questionnaire | 2 / 2 | 4 | High; exactly 4+4 |
| Graphic interpretation | 5 / 5 | 5 | High; answer the command |
| Summary | 8 / 5 | 5 | High; new title/highlight/half-length rule |
| Full report | 0 / 0 | 10 | Highest single-task weight despite zero old frequency |
| Abstract components | 5 / 5 | 4 | High; write text, not letters |
| Grammar rewrite | 0 / 0 | 6 | High; all corrections, all marked |
| Conclusion matching | 3 / 3 | No separate part | Supports reports and abstracts |

## Provenance and accuracy

Source PDFs and page numbers are recorded in public/wp/sources.json. Five original images were extracted offline using installed pypdf after isolated Python checks found PyMuPDF unavailable. No dependency was installed. Original images remain authoritative.

The consumption chart has exact labelled values. Rural poverty and internet access are approximate bar-height readings. Never Land deaths are in millions, with TB approximately 1.8 million; the heart-disease example in revision notes is inconsistent with the actual figure.

The traffic image skips 1100 in its upper handwritten y-axis labels. The redraw follows the regular grid from the baseline and flags the tallest two values as uncertain. Its model states that assumption. Only this old chart prompt requests possible reasons; its model distinguishes possible causes from observations.

Moves may overlap. Paper 4 sentence C combines purpose and interviews. Paper 5 lacks a clean aim or data-collection sentence; the adaptation requests defensible functions actually present. These reasoned keys are not official marking keys.

New report scenarios supply investigation notes, so models do not invent unlabelled results. Course methods inform the lessons; the instructor’s new format controls mock structure and priorities. The long full notes were skimmed for report and accuracy guidance. No external sources were fetched.
'''
(DOC/'00-exam-analysis.md').write_text(analysis,encoding='utf-8')
