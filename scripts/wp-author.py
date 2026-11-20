from pathlib import Path
import json,re
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'src/data/wp';OUT.mkdir(parents=True,exist_ok=True)
PART={'essay':('Q1A',6),'paraphrase':('Q1B',4),'email':('Q2A',6),'questionnaire':('Q2B',4),'graph':('Q3A',5),'summary':('Q3B',5),'report':('Q4',10)}
CHECK={
'essay':['Answer the precise debate with a clear thesis','Develop two distinct arguments with examples','State a fair counter-argument and rebut it','Conclude without adding a new argument','Aim for 250 words in the upcoming exam'],
'paraphrase':['Preserve every essential claim, qualification and relationship','Change sentence structures and word forms as well as vocabulary','Keep names, figures and technical terms accurate','Keep approximately the original length','Check against the source for copied sentence frames'],
'email':['Use a specific subject and appropriate salutation','Put the purpose in the first paragraph','Include relevant facts and evidence','Make a specific, polite request','Close courteously and sign your full name'],
'questionnaire':['Write one short neutral introduction','Include exactly four open questions','Include exactly four closed questions with answer options','Ask only one thing per question','Use neutral wording and a clear time frame'],
'graph':['Read exactly what the question requests','Give an overview before figures','Compare important features using accurate values and units','Use by for change, to for endpoint and at for a peak','Offer causes only if requested; label them as possibilities'],
'summary':['Give a precise title','Retain the main idea and all essential qualifications','Cut examples and minor details','Use your own wording without opinions','Highlight key terms in your answer; follow the specified length'],
'report':['Use all seven required headings','State scope and purpose in the introduction','Describe a plausible investigation with methods and sample','Separate observed findings from conclusions','Link specific, feasible recommendations to findings']}
def rubric(task,marks,focus):
 if task=='questionnaire':return [{'id':f'o{i+1}','label':f'Open question {i+1}: relevant, neutral and genuinely open','marks':marks/8} for i in range(4)]+[{'id':f'c{i+1}','label':f'Closed question {i+1}: relevant, neutral, with clear options','marks':marks/8} for i in range(4)]
 weights={'essay':[3,1,1,1],'paraphrase':[2,1,.5,.5],'email':[2,1,2,1],'graph':[2,1,1,1],'summary':[2,1,1,1],'report':[3,2,2,3]}[task]
 labels={'essay':[f'Clear thesis and developed reasoning: {focus}','Two arguments, counter-argument and effective rebuttal','Logical paragraphs and cohesive conclusion','Accurate grammar, punctuation and controlled academic vocabulary'],
'paraphrase':[f'All source meanings and qualifications retained: {focus}','Independent sentence structures and word forms','Appropriate vocabulary with technical terms intact','Accurate grammar and approximately the source length'],
'email':[f'Task fulfilled with details and explicit action: {focus}','Purpose first and logical paragraphs','Specific subject, salutation, close and sign-off','Polite professional register and accurate mechanics'],
'graph':[f'Accurate key numbers, units and comparisons: {focus}','Overview and selection of important features','Exact response to the question; no unsupported causes','Clear trend language, organisation and mechanics'],
'summary':[f'Main idea and essential content preserved: {focus}','Concise independent wording at the required length','Accurate title and highlighted keywords','Neutral, coherent sentences with accurate mechanics'],
'report':[f'Investigation and evidence address the situation: {focus}','Clear methods, scope and limitations','All seven headings and impersonal, accurate language','Evidence-based conclusions and feasible specific recommendations']}[task]
 return [{'id':f'r{i+1}','label':l,'marks':w*marks/sum(weights)} for i,(w,l) in enumerate(zip(weights,labels))]
def writing(id,task,title,prompt,model,pool='original',target=None,passage=None,chart=None,focus='',marks=None,**extra):
 part,m=PART[task];m=marks or m
 q=dict(id=id,subject='wp',topic=task,title=title,source='Original practice' if pool=='original' else 'Exclusive mock',difficulty='Exam',pool=pool,type='writing',task=task,partLabel=part,marks=m,suggestedMinutes=m*3,prompt=prompt,modelAnswer=model,rubric=rubric(task,m,focus or title.lower()),checklist=CHECK[task],annotations=extra.pop('annotations',[f'The answer addresses {focus or title.lower()} directly.','Details support the requested task and each paragraph has a clear purpose.','The model follows the requested format with precise, complete sentences.']))
 if target:q['wordTarget']={'min':target[0],'max':target[1]}
 if passage:q['passage']=passage
 if chart:q['chart']=chart
 q.update(extra);return q
def chart(title,labels,values,unit='Number',kind='bar',series='Recorded value',note=None):
 c=dict(kind=kind,title=title,xLabel='Category / period',yLabel=unit,labels=labels,series=[dict(name=series,values=values)])
 if note:c['note']=note
 return c
original=[];mocks=[];past=[]
def add(task,title,prompt,model,**kw):
 seq=sum(q.get('task',q['type'])==task for q in original)+1
 q=writing(f'wp-{task}-{seq:02}',task,title,prompt,model,**kw);original.append(q);return q

essays=[
('AI as a learning aid','Should universities allow students to use AI tools while preparing assignments?', '''Universities should permit AI tools during assignment preparation when students disclose their use and remain responsible for the submitted work. A blanket ban would overlook useful learning support, while unrestricted use would weaken assessment. Clear boundaries offer a more educational response.

First, AI can make difficult material easier to approach. A student who cannot follow a textbook explanation may request a simpler example and then test that explanation against course notes. This process can support independent learning, particularly outside classroom hours. However, students must verify generated claims because fluent language does not guarantee accuracy.

Second, supervised use can develop the judgement needed in professional work. Asking students to compare an AI draft with reliable material encourages them to identify unsupported statements, biased assumptions and weak reasoning. Requiring a brief account of revisions also makes their own contribution visible to teachers.

Critics reasonably argue that students may submit generated answers without understanding them. This risk deserves attention, but prohibition alone cannot demonstrate understanding. Short oral explanations, intermediate drafts and questions about individual choices provide better evidence of learning. Assessments should therefore reward reasoning and revision alongside the final product.

Universities should distinguish assistance from substitution. Students may use tools to explore ideas or receive language feedback, but they should construct and defend the argument themselves. With disclosure, verification and appropriate assessment, AI can become a learning aid rather than a shortcut. The central objective should remain the development of informed writers who can explain both what they claim and why they believe it.'''),
('Flexible work','Should employers offer hybrid working wherever the job allows it?', '''Employers should offer hybrid working when duties can be performed effectively away from the office. A carefully organised arrangement can improve employees' control over their time while preserving the collaboration that workplaces need. Flexibility should depend on the work, rather than managerial habit.

First, fewer compulsory journeys can make the working day more manageable. An employee who avoids a lengthy commute has more time for rest or family responsibilities. This does not automatically produce better performance, but it removes a predictable source of fatigue. Teams can assess results through completed work instead of assuming that visible attendance proves commitment.

Second, planned office days can make collaboration more purposeful. A team might meet for project planning, practical training and difficult decisions, while completing concentrated individual tasks elsewhere. Publishing shared attendance days would help employees coordinate without requiring everyone to travel merely to join online meetings from separate desks.

Opponents argue that remote work can isolate new employees and delay informal learning. These concerns are valid, especially during induction. They support regular mentoring and appropriate office attendance, however, rather than an identical rule for every role. New staff could attend more frequently until they become confident in their responsibilities.

Hybrid working also requires clear availability, secure information handling and accessible equipment. Employers should review arrangements with staff and adjust them when service suffers. Overall, a flexible system with explicit expectations offers a fair balance between autonomy and teamwork. Its success should be judged by reliable delivery, effective cooperation and employee experience, with arrangements revised whenever the evidence shows persistent difficulties.'''),
('Refill stations','Should colleges replace disposable water bottles with refill stations?', '''Colleges should make safe refill stations the normal source of drinking water and reduce routine dependence on disposable bottles. This change can address avoidable waste while making drinking water more accessible. It should be introduced with maintenance and contingency plans rather than as a symbolic ban.

First, refill stations prevent waste at its source. Recycling still requires collection, transport and processing, and a bottle placed in the wrong bin may never reach a recycling facility. A student who repeatedly fills the same durable container avoids producing many discarded containers. The campus can reinforce this habit by placing stations near classrooms and shared spaces.

Second, a dependable free supply can reduce repeated spending. Students should not need to purchase packaged water simply because a lecture block lacks a working tap. Clearly labelled stations, accessible heights and published maintenance contacts would make the service useful to a wider range of users, including visitors.

Critics may point out that poorly maintained dispensers create hygiene concerns. That objection is serious, but it argues for testing and accountability rather than permanent reliance on packaging. The college should assign responsibility for cleaning, record inspections and provide an alternative supply during interruptions. Users should also receive clear information about any temporary closure.

The transition should therefore begin with reliable infrastructure and consultation. Emergency supplies can remain available without making disposable bottles the everyday default. By measuring station reliability and waste collected, colleges can judge progress honestly. A practical refill system combines environmental responsibility with student welfare and turns an abstract commitment into an everyday service.'''),
('Sleep and assessment','Should schools avoid scheduling major tests very early in the morning?', '''Schools should avoid placing major tests very early in the morning whenever a workable later schedule is available. Assessment should measure understanding as fairly as possible, and its timing can affect students' ability to demonstrate what they know. Convenience should be balanced against readiness to learn.

First, an early test may compound unequal travel demands. Some pupils live near school, while others must leave home much earlier because of long bus routes. A demanding examination immediately after arrival gives the second group little opportunity to settle. A later session allows time for normal classroom routines before concentrated assessment begins.

Second, sensible scheduling can support preparation without encouraging unhealthy habits. Schools can communicate a predictable timetable and discourage studying through the night. Students still have responsibility for managing their time, but institutional arrangements should reinforce that responsibility. A schedule that allows breakfast and an orderly journey supports a more reasonable examination experience.

Opponents may argue that early tests leave the rest of the day free and simplify staffing. These are legitimate administrative benefits. Nevertheless, rotating examination sessions or adjusting a limited number of major test days may preserve those benefits while improving fairness. Schools should discuss practical constraints before choosing a consistent policy.

Timing alone cannot remove anxiety, poor preparation or differences in achievement. It is one adjustable part of assessment design. Schools should review attendance, student feedback and transport arrangements before making changes. Where later testing is feasible, it offers a modest but useful way to align assessment with student welfare while retaining demanding academic standards for everyone taking the examination.'''),
('Peer tutoring','Should universities provide organised peer tutoring alongside lectures?', '''Universities should provide organised peer tutoring alongside lectures because it can extend opportunities to practise and clarify difficult ideas. Such support should complement qualified teaching and remain accessible to students who need it. Its value depends on preparation, supervision and clear limits.

First, a fellow student may recognise the precise difficulty that a beginner faces. Someone who recently learnt a programming concept can explain the intermediate steps that an experienced lecturer may assume are obvious. Small tutoring sessions also allow learners to ask questions they might hesitate to raise in a crowded classroom. The tutor benefits by having to explain the reasoning clearly.

Second, a structured scheme can make support more equitable. Without an organised service, students with strong friendship networks may obtain help more easily than others. Published session times, accessible rooms and an online booking option can reduce that difference. Participation should be voluntary, with additional arrangements for learners whose employment or caring responsibilities restrict attendance.

Critics rightly warn that peers may pass on errors or simply provide assignment answers. The solution is to train tutors, supply approved practice material and establish referral routes to teachers. Tutors should guide the learner through a method rather than complete assessed work. Periodic observation can identify explanations that need correction.

Peer tutoring cannot replace adequate staffing or resolve every learning difficulty. It can, however, create a useful bridge between lectures and independent study. Universities should pilot the scheme, collect feedback and revise it. With appropriate oversight, peer support can strengthen both academic understanding and a sense of belonging within the university community.'''),
('Digital services and access','Should essential public services retain an assisted offline option?', '''Essential public services should retain an assisted offline option while expanding digital access. Online systems can save time, but access to a service should not depend entirely on owning a suitable device or navigating a complicated website. Inclusion requires more than placing a form online.

First, digital ability and resources vary. A person may have a phone but lack reliable connectivity, accessible software or confidence in completing an unfamiliar application. Errors can delay support precisely when it is most needed. An assistance desk or scheduled telephone service can help users complete the same process without forcing them to rely on unofficial intermediaries.

Second, an alternative channel improves resilience. A failed network connection or inaccessible verification screen should not prevent a time-sensitive request from being recorded. Staff should have a documented procedure for acknowledging applications during interruptions. This creates a route for resolving problems rather than leaving users to repeatedly attempt a failed transaction.

Opponents argue that maintaining several channels increases costs and duplicates work. That concern deserves a practical response. Assisted applications can enter the same administrative system as online submissions, while appointments and targeted support can manage demand. The alternative need not reproduce every office process in full.

Digital expansion remains worthwhile when it simplifies routine tasks. Its success, however, should include successful completion by people facing access barriers. Authorities should publish assistance arrangements and review where users abandon applications. A coordinated combination of online convenience and human support offers a fairer service, allowing technical progress to widen participation without making essential help depend on digital confidence alone.''')]
for title,prompt,model in essays:add('essay',title,prompt+' Write a 250-word argumentative essay.',model,target=(250,250),annotations=['The opening takes a qualified but definite position.','Two body paragraphs develop distinct reasons with concrete examples.','The counter-argument receives a practical rebuttal; the conclusion returns to the thesis without invented statistics.'])
for source_file in ['wp-short-writing.py','wp-evidence-writing.py','wp-keys.py','wp-drills.py','wp-mocks.py','wp-past.py','wp-past-keys.py']:
 exec(compile((ROOT/'scripts'/source_file).read_text(encoding='utf-8-sig'),source_file,'exec'))
# Tighten new essay models to the explicit 250-word exam target.
trim_words={
'wp-essay-01':['useful ','more '],
'wp-essay-02':['carefully ','lengthy ','planned ','shared ','regular ','appropriate ','explicit ','persistent '],
'wp-essay-03':['routine ','avoidable ','Clearly ','repeated ','durable ','dependable ','temporary ','everyday '],
'wp-essay-04':['major ','very ','fairly ','long ','normal ','sensible ','reasonable ','legitimate ','limited ','practical ','modest '],
'wp-essay-05':['organised ','qualified ','precise ','recently ','experienced ','crowded ','structured ','strong ','additional ','appropriate ','useful '],
'wp-essay-06':['Essential ','suitable ','entirely ','reliable ','complicated ','repeatedly ','unofficial ','documented ','routine '],
'wp-mock-1-q1a':['routine ','ordinary ','emergency ','more ','clearly ','appropriate ','common '],
'wp-mock-2-q1a':['faulty ','avoidable ','future ','clearer ','Qualified ','practical ','dependable ','temporary ','essential ','transparent ','normal '],
'wp-mock-3-q1a':['valuable ','practical ','different ','supervised ','broader ','realistic ','thoughtful ','sustained ']}
for q in original+mocks:
 if q['id'] in trim_words:
  for word in trim_words[q['id']]:
   m=re.search(re.escape(word),q['modelAnswer'],re.I);assert m,(q['id'],word)
   q['modelAnswer']=q['modelAnswer'][:m.start()]+q['modelAnswer'][m.end():]
  q['modelAnswer']=q['modelAnswer'].replace('A organised arrangement','An organised arrangement')
  q['modelAnswer']=re.sub(r'(?<=[.!?])(\s+)([a-z])',lambda m:m[1]+m[2].upper(),q['modelAnswer'])
  # Restore initial capital after removing an opening adjective.
  q['modelAnswer']=q['modelAnswer'][0].upper()+q['modelAnswer'][1:]
  assert len(q['modelAnswer'].split())==250,(q['id'],len(q['modelAnswer'].split()))
# Meet the historical chart instructions exactly, and count summary titles too.
for q in past:
 suffix={'wp-p1-q4':'Both areas retained distinct consumption profiles throughout.','wp-p2-q4':'Regional differences therefore persisted despite the widespread longer-term decline.','wp-p3-q4':'Values remain approximate.','wp-p4-q4':'These are estimates read from bar lengths. The graphic does not indicate whether the six categories account for every death in the country.','wp-p5-q4':'No later afternoon observations are provided.'}.get(q['id'])
 if suffix:q['modelAnswer']+=' '+suffix
 edits={'wp-p1-q6':('alongside broader subject choices','and subject choices'),'wp-p2-q5':('capable, responsible','responsible'),'wp-p2-q6':(' participation nationwide',' participation'),'wp-p3-q5':('engaging multidisciplinary','multidisciplinary'),'wp-p3-q6':('greater attention','attention')}
 if q['id'] in edits:q['modelAnswer']=q['modelAnswer'].replace(*edits[q['id']])
 if q['id']=='wp-p3-q5':q['modelAnswer']=q['modelAnswer'].replace('broad capabilities','capabilities').replace('also prepares','prepares')
for q in original:
 if q['id']=='wp-report-05':q['modelAnswer']=q['modelAnswer'].replace('responsibility and follow-up','responsibility and consistent, documented follow-up')
for name,data in [('original',original),('mocks',mocks),('past',past),('papers',papers)]:
 (OUT/f'{name}.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('WP content:',len(original),'original,',len(past),'past,',len(mocks),'mock parts')
for q in original+mocks+past:
 if q['type']=='writing' and 'wordTarget' in q:
  words=len(q['modelAnswer'].replace('==','').split());t=q['wordTarget']
  if not t['min']*.85<=words<=t['max']*1.15:print('LENGTH',q['id'],words,t)
  if q['task']=='essay':print('ESSAY',q['id'],words)
exec(compile((ROOT/'scripts/wp-notes.py').read_text(encoding='utf-8-sig'),'wp-notes.py','exec'))
exec(compile((ROOT/'scripts/wp-notes-extra.py').read_text(encoding='utf-8-sig'),'wp-notes-extra.py','exec'))
