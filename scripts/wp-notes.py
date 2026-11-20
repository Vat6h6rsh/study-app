DOC=ROOT.parent/'docs/wp';CON=DOC/'concepts';CON.mkdir(parents=True,exist_ok=True)
# topic, file, title, concept, why, method, template, traps, model question id
lessons=[
('essay','01-argumentative-essay.md','Q1A · Argumentative essay',
'A thesis answers a debatable question. Two distinct reasons support it. A counter-argument states a reasonable objection. A rebuttal answers that objection. The conclusion brings the reasoning back to the thesis.',
'A list of advantages does not show why your position is stronger. The marker needs a claim, reasons and a response to doubt. Use plausible examples, not invented studies or statistics.',
['Identify the exact debate and choose a qualified but definite position.','Plan two different reasons, each with an example or a clear mechanism.','Budget 35 words for the introduction, 65 for each argument, 55 for the counter-argument/rebuttal and 30 for the conclusion: 250 in total.','Give each paragraph one controlling idea and keep the thesis consistent.','Revise for the word target, relevance and grammar.'],
'''Introduction (35 words): [Context]. [Institution] should [position] because [reason one] and [reason two].
Argument 1 (65 words): First, [claim]. [Explain mechanism]. For example, [illustration]. [Connect to position].
Argument 2 (65 words): Second, [different claim]. [Explanation and example]. [Significance].
Counter-argument/rebuttal (55 words): Critics argue [fair objection]. This concern is valid where [condition]. However, [reasoned answer or safeguard].
Conclusion (30 words): Therefore, [restated position]. [Synthesis and condition for success].''',
['An opening that merely says the topic is important.','Two paragraphs repeating the same reason.','An insult or a distorted objection instead of a fair counter-argument.','A new argument in the conclusion; invented figures; a 400-word answer.'],'wp-essay-01'),
('paraphrase','02-paraphrasing.md','Q1B · Paraphrasing',
'A paraphrase restates the whole meaning in independent language at roughly the same length. It is not a summary. Preserve names, figures, technical terms, conditions and the strength of each claim.',
'Synonym substitution alone leaves the source sentence frame intact. Changing “may help” to “will solve” or “associated with” to “caused by” changes meaning.',
['Read twice and list the essential propositions.','Look away and explain the paragraph from your notes.','Change structure: split or combine sentences, reorder ideas, move a clause or change voice.','Change word form and the surrounding grammar: “the team analysed” becomes “the team’s analysis”. Use contextual synonyms.','Compare claims with the source. Check omissions, additions, copied frames, length and grammar.'],
'''Source: Although the service was free, some students could not access it because they lacked a suitable device.
Skeleton: [Obstacle] prevented [group] from using [service], despite [qualification].
Paraphrase: The absence of appropriate equipment kept some learners from using the service even though it cost nothing.
Voice: The team analysed the files → The files were analysed by the team.
Word form: The team decided → The team’s decision.
Reordering: After checking the files, staff replied → Staff replied after checking the files.''',
['Changing only two words while copying the sentence structure.','Dropping a negative, qualification, number or causal link.','Replacing a technical term inaccurately.','Condensing to half length or adding an opinion.'],'wp-paraphrase-01'),
('email','03-formal-email.md','Q2A · Formal email',
'A formal email is a purposeful message to a specific reader. The subject identifies the matter. The opening explains why you are writing. The body gives enough detail for action.',
'A busy recipient should understand the issue, identify the record and know what response is requested. Be polite and direct even when disappointed.',
['Identify the reader, relationship, purpose and requested outcome.','Write a specific subject with an order or application reference where relevant.','Use “Dear [name/title/team],”. A full name or role avoids guessing gender.','Put the purpose first, then relevant dates, references, facts and available evidence.','Make a specific request with a reasonable deadline. Thank the reader, close politely and sign your full name.'],
'''Subject: [Action] — [specific matter/reference]
Dear [Name / Team],
I am writing to [purpose]. [Brief connection or introduction if needed].
[Relevant facts, dates and evidence].
Could you please [specific action]? [Reasonable date or next step].
Thank you for your assistance.
Kind regards,
[Full name and relevant role]

Complaint: I received [item] on [date], but [defect]. Please arrange [requested remedy].
Request/referral: Could you share [details]? If my profile is suitable, I would appreciate guidance on your referral process.
Enquiry: Could you confirm [dates, fees, eligibility and application steps]?
Apology: I apologise for [failure]. [Accept responsibility]. To prevent recurrence, I will [measure].
Follow-up: I am following up on [request] sent on [date]. Could you indicate the expected timetable?''',
['No subject or signature; slang; capitals and repeated exclamation marks.','A long life history before the purpose.','Threats, blame or a vague request such as “do the needful”.','For a simulated email, describe the evidence you would attach. Do not imply the app has actually sent attachments.'],'wp-email-01'),
('questionnaire','04-questionnaire.md','Q2B · Questionnaire',
'Open-ended questions allow a free response. Closed-ended questions restrict responses to stated choices. The upcoming exam requires exactly four of each: eight questions at half a mark each.',
'Open responses reveal experiences and reasons. Closed responses allow comparison. Leading, loaded or combined questions produce unclear evidence.',
['Write a short neutral introduction stating purpose and inviting responses from experience.','Choose four distinct aspects of the topic.','Write four open prompts using what, how or describe. A yes/no stem is not open merely because space follows it.','Write four closed questions with options: yes/no, multiple choice or a balanced Likert scale.','Number 1–8, label the groups and check exactly 4+4. Avoid overlapping ranges and give a clear time frame.'],
'''Intro: This voluntary survey seeks feedback on [topic]. Please answer from your experience.
Open 1: What difficulties, if any, do you face with [one aspect]?
Open 2: Describe an experience of [one aspect].
Open 3: What change would improve [one aspect]?
Open 4: How does [one aspect] affect [specific activity]?
Closed 5: Did you use [service] last week? Yes / No.
Closed 6: Main device? Phone / Tablet / Laptop / Desktop / Other / Not used.
Closed 7: Clarity? Very clear / Clear / Neutral / Unclear / Very unclear / Not seen.
Closed 8: Uses last week? 0 / 1–2 / 3–4 / 5 or more.''',
['Leading: “Do you agree our excellent system helps?”','Double-barrelled: “Is it cheap and reliable?” Separate cost and reliability.','Ambiguous: “Do you use it often?” Define a period and frequency options.','Loaded: “Why do you waste time online?” Do not assume wrongdoing.','Nine questions, eight yes/no questions or no options for closed questions.'],'wp-questionnaire-01'),
('graph','05-graphs-and-tables.md','Q3A · Interpreting graphics and tables',
'A graphic answer selects data to answer the question. Bars compare categories; lines show sequences; pie charts show parts of a total; tables give entries. Read the command before describing.',
'A complete description can still miss the question. If asked for a difference, calculate it. Do not invent causes unless the question asks for possible reasons.',
['Read the command, title, period, units, legend, labels and scale. Identify approximate readings.','Write an overview of the main pattern first.','Select important highs, lows, changes, exceptions or comparisons.','Use labelled values exactly; use approximately for bar-height estimates. Calculate differences carefully.','Check every figure and qualification. Separate possible explanations from established observations.'],
'''Overview: The [chart/table] compares [measure] across [categories/period]. Overall, [main feature].
Evidence: A recorded [value and unit], compared with [value] for B. The gap was [difference].
Change: The figure rose from 80 to 100, an increase of 20 or 25%.
Verbs/adverbs: rose steadily; increased sharply; fell slightly; declined gradually; fluctuated; remained stable.
Prepositions: rose BY 20; rose TO 100; fell FROM 80 TO 60; peaked AT 120.
Close: [Synthesis answering the exact question].''',
['BY for an endpoint or TO for the amount of change.','40% to 50% is 10 percentage points, or 25% relative growth.','Treating groups as repeated observations of the same people.','Adding separate comparison categories or treating visits as unique visitors.','The old traffic prompt asks for reasons. Most other chart prompts do not.'],'wp-graph-01')]
