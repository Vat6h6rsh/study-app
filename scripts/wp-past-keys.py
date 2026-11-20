def labelled(p,n):
 b=re.split(r'Hawk et al|Julie Pham|\(Adapted|\(Meena',source(p,n)[2])[0]
 matches=list(re.finditer(r'(?<!\S)([A-Ha-h])[.)]\s+',b))
 result=[]
 for i,m in enumerate(matches):
  s=flat(b[m.end():matches[i+1].start() if i+1<len(matches) else len(b)])
  s=re.split(r'\s+(?:\(Adapted|\(Meena|\(Santos|Components\b|Julie Pham|Hawk et al)',s)[0].strip()
  result.append(s)
 return result
past_abs_roles=[
 [('Outline / topic',[0],[], 'Sentence a introduces what the study deals with. It is an outline rather than an explicit statement of purpose.'),('Background / application',[1],[2],'Sentence b explains the circuit’s application; c describes its operating principle, also background.'),('Methodology',[4,5],[4,5,6],'Creating the prototype and inserting it into the system are procedures. Sentence g extends that procedure and includes an observed judgement.'),('Quantified result',[7],[],'Sentence h reports the measured correction and bandwidth. Sentence d is also a comparative result, but does not give the quantified outcome asked here.')],
 [('Background',[0,1],[],'A and B establish the imaging context and the potential value of PET.'),('Purpose / proposed approach',[2],[],'C introduces the new approach. The abstract does not contain a separate “aims to” sentence; do not invent one.'),('Methodology',[3,5],[3],'D explains the algorithm and testing dataset. F adds the comparison procedure, so the combined answer is more complete.'),('Results',[4,6],[6],'E states effectiveness and G gives the comparative outcome. G alone captures the specific comparison; neither gives numeric performance.')],
 [('Aim',[3,4],[3],'D states the investigation’s focus; E extends it to risks and challenges. D alone identifies the main aim.'),('Methodology',[5],[],'F names the live case-study evidence used for discussion.'),('Research gap',[6],[],'G explicitly identifies what earlier papers have rarely covered.'),('Significance / implications',[7],[],'H describes how the study adds to understanding. It does not report a numerical result.')],
 [('Background',[0,1],[0],'A identifies the gap and B describes the prevailing negative image.'),('Purpose',[2],[],'C states the aim of recovering veterans’ perspectives. The same sentence also includes the interviews used.'),('Methodology',[2],[],'C identifies qualitative interviews, 40 veterans and three cities. Purpose and method share a sentence here.'),('Results',[3],[],'D reports what analysing the interviews revealed. E interprets that contribution more broadly.')],
 [('Background / gap',[0,1],[1],'A explains neural plasticity; B identifies the unresolved coordination problem.'),('Central finding',[2],[],'“We show” presents the central finding, not an explicit purpose or a data-collection method.'),('Experimental result',[5],[],'F reports the effect of bypassing presynaptic plasticity. No detailed methods sentence is supplied; do not fabricate one.'),('Conclusion / implications',[6],[],'G integrates the two mechanisms into the abstract’s overall interpretation.')]
]
for p,roles in enumerate(past_abs_roles,1):
 s=labelled(p,7);assert len(s)==(8 if p in [1,3] else 7),(p,len(s))
 prompt,m,after,full=source(p,7)
 parts=[]
 for i,(name,idx,alt,why) in enumerate(roles):
  accepted=[' '.join(s[j] for j in idx)]
  if alt:accepted.append(' '.join(s[j] for j in alt))
  parts.append(dict(id=f'p{i+1}',name=name,accepted=accepted,explanation=why))
 past.append(dict(id=f'wp-p{p}-q7',subject='wp',topic='abstracts',title=f'Paper {p}: abstract components',source=f'Past paper {p} Q7',difficulty='Exam',pool='past',type='abstract-parts',partLabel='Q5A',marks=4,originalMarks=m,suggestedMinutes=12,prompt='Adapted to upcoming Q5A: write out the exact sentence(s) for the four named parts. Omit source letters. Some source sentences have overlapping functions.',originalPrompt=full,abstract=' '.join(f'{chr(65+i)}. {x}' for i,x in enumerate(s)),parts=parts,notes='The historical task was matching; this adaptation uses four typed components worth one mark each. The complete original task and original marks are retained. In paper 5 the original “Purpose”/“Methodology” categories are not cleanly represented; requested parts use defensible functions actually present in the text.'))
conclusion_keys=[
(['Background','Summary','Limitation','Future direction'],['Background','Background','Future direction','Summary','Limitation','Future direction','Future direction'],['Introduces the area being studied.','Names its earlier foundation.','Describes possible future applications.','Summarises the active field of research.','Acknowledges unresolved problems.','Names areas not covered and future research opportunities.','Points to continuing challenges.']),
(['Restated objective','Summary / principle','Significance','Future direction'],['Restated objective','Summary / principle','Significance','Significance','Significance','Summary / principle','Significance','Future direction'],['Restates the reported detection work.','Explains the operating principle.','States useful sensitivity properties.','Highlights practical portability and reuse.','Lists practical advantages.','Summarises the tested device application.','Identifies the importance of inkless writing.','Looks ahead to further sensor and writing developments.']),
(['Summary','Methodology','Analysis of results','Relation to objective','Future direction','Limitation'],['Summary','Methodology','Analysis of results','Relation to objective','Future direction','Limitation'],['Summarises the proposed detection mechanism.','Describes processing, model and simulations.','Evaluates performance with quantitative comparisons and an explanation.','States that performance supports the intended objective; it does not establish a separately stated hypothesis.','Proposes additional parameters, datasets and applications.','Identifies the absence of attack prevention.'])]
for p,(cats,keys,why) in enumerate(conclusion_keys,1):
 s=labelled(p,8);assert len(s)==len(keys),(p,len(s),len(keys))
 prompt,m,a,full=source(p,8)
 past.append(dict(id=f'wp-p{p}-q8',subject='wp',topic='report',title=f'Paper {p}: functions in a report conclusion',source=f'Past paper {p} Q8',difficulty='Challenge',pool='past',type='match',partLabel='Report drill',marks=m,originalMarks=m,suggestedMinutes=10,prompt=prompt,originalPrompt=full,categories=cats,items=[dict(id=f'i{i+1}',text=x,answer=keys[i],explanation=why[i]) for i,x in enumerate(s)],notes='Supplementary report-function drill adapted from an old conclusion-matching task. Some functions overlap; choose the strongest function of the whole labelled portion. It is not an additional question in the upcoming mock format.'))

