paras=[
('Offline learning access','A college uploaded all its reading material to a digital portal. Students could download chapters before travelling and study without a continuous internet connection. However, several scanned documents were incompatible with screen readers. The library therefore began replacing these files with accessible versions. Staff also provided a short guide explaining how to locate and download the readings. The change improved access only when both the documents and the instructions were usable.', 'By placing its course readings on an online platform, the college enabled learners to save chapters in advance and read them while disconnected. Access nevertheless remained difficult for users of screen-reading software because some scans could not be interpreted. Librarians responded by preparing compatible files and offering brief instructions for finding and saving them. Thus, the initiative made study easier only where learners could use both the material itself and the guidance supplied.'),
('Repair before replacement','An office introduced a repair service for damaged keyboards and monitors. Employees were asked to report faults before requesting new equipment. Technicians recorded the cause of each failure and the cost of repair. Equipment that could not be repaired safely was replaced. After three months, the records helped managers identify recurring faults and plan purchases more carefully. The service was intended to reduce unnecessary disposal without keeping unreliable devices in use.', 'To avoid discarding equipment unnecessarily, an organisation arranged for faulty displays and keyboards to be inspected and fixed. Staff first had to notify technicians of a problem rather than immediately seek a replacement. For every case, the team documented why the device failed and what restoration cost. Unsafe items beyond repair were exchanged. Three months of records then enabled management to recognise repeated defects and make better purchasing decisions, while ensuring that dependable equipment remained available.'),
('Cooling a campus','Trees can make outdoor campus spaces more comfortable by providing shade. Their effects depend on their location, size and suitability for the local climate. Planting alone is insufficient if young trees receive no water or protection. A campus gardening team therefore mapped exposed pedestrian routes before choosing planting sites. It also assigned responsibility for maintaining each site. The project treated long-term care as part of the planting process rather than as an optional later activity.', 'Shade from trees can improve comfort in open university areas, although the benefit varies with placement, growth and adaptation to local conditions. New planting will achieve little without adequate watering and protection. Before selecting sites, the gardening group identified walking routes exposed to the sun and allocated maintenance duties for each location. Ongoing care was consequently included in the project from the beginning, instead of being left as a discretionary task after planting was complete.'),
('Appointment reminders','A clinic sent appointment reminders by text message to patients who had agreed to receive them. Each message included the appointment time and a number for rescheduling. Patients were not asked to send medical information in reply. Staff continued to telephone people who preferred not to use text messages. The clinic evaluated the service by checking delivery failures and asking patients whether the reminders were clear. It did not assume that a delivered message had necessarily been read.', 'Patients who consented received text notifications from a clinic stating when they were due and how to arrange another time. Replies containing health details were not requested. Telephone reminders remained available to those who did not want texts. To assess the scheme, employees examined unsuccessful deliveries and sought feedback on how understandable the notices were. Receipt by a device was therefore distinguished from actual reading by its owner when the service was evaluated.'),
('Workplace focus','A design team reserved two afternoons each week for work without routine meetings. Urgent messages could still be sent through an agreed channel. Team members used the protected periods for tasks requiring sustained attention. The arrangement did not remove the need for discussion; instead, regular meetings were moved to other times. After a month, the team reviewed whether the schedule suited colleagues working in different locations. It planned adjustments rather than treating the initial timetable as permanent.', 'Twice weekly, a design group kept afternoon sessions free of ordinary meetings so that staff could concentrate on demanding individual assignments. An established communication route remained available for emergencies. Necessary conversations continued, with scheduled discussions taking place outside these protected hours. Following a month of use, the group considered whether the pattern accommodated employees based in different places. The original arrangement was open to revision rather than being regarded as a fixed long-term schedule.'),
('Student volunteering','A student association organised weekend reading sessions for children at a community centre. Volunteers completed an orientation before joining the programme. They worked under the supervision of the centre staff and used material selected for each age group. Attendance was optional, and children could choose among several activities. The organisers collected feedback from families before planning the next term. Their aim was to support enjoyable reading rather than turn the sessions into additional examinations.', 'Weekend activities run by a student group at a local centre sought to make reading enjoyable for children, rather than create another testing programme. Before participating, volunteers received introductory training. Centre employees supervised their work, and resources were chosen to match different ages. Children attended by choice and selected from a range of tasks. The organisers then used families’ comments to prepare the following term, keeping the emphasis on supportive and engaging encounters with books.')]
for title,p,m in paras:add('paraphrase',title,'Paraphrase the paragraph. Preserve its meaning and approximate length. Change vocabulary and sentence structure without adding claims.',m,passage=p,target=(round(len(p.split())*.9),round(len(p.split())*1.1)),focus='the stated procedure, purpose and qualifications')
emails=[
('Complaint: damaged monitor','Write a complaint email to a supplier. A monitor ordered for your office arrived with a cracked screen. Give order details and request a replacement.', '''Subject: Replacement requested for damaged monitor, order MON-284

Dear Customer Support Team,

I am writing to request a replacement for the monitor delivered to our office on 12 November under order MON-284. The screen was cracked when we opened the package, and the device has not been used.

The outer carton also had a dent near one corner. Photographs of the packaging and screen, together with the purchase receipt, are available for your inspection. We have retained the original packing materials.

Could you please arrange collection of the damaged monitor and confirm when a replacement can be delivered? We need the monitor for a training session on 20 November, so an update by 15 November would help us plan. Please also confirm that collection and replacement will involve no additional charge.

Thank you for your assistance. I look forward to your response.

Kind regards,
Asha Rao
Office Coordinator'''),
('Request: assignment extension','Write to your instructor requesting a three-day extension after an illness. Mention the assignment, propose a new date and offer evidence.', '''Subject: Three-day extension request for Writing Practice assignment

Dear Dr Sen,

I am writing to request a three-day extension for the report-writing assignment currently due on 18 November. I was unwell from 13 to 16 November and could not complete the planned interviews during that period.

The outline and background section are ready. I have rescheduled the remaining interviews for tomorrow and expect to finish the analysis shortly afterwards. Could I please submit the completed report by 21 November instead? I can provide a medical certificate if required.

I understand that the assignment schedule supports timely feedback, and I will use the additional time to complete the work rather than expand its scope. If an extension is not possible, please advise me on the appropriate submission procedure.

Thank you for considering my request.

Yours sincerely,
Rohan Mehta
BCS ZC239 student'''),
('Enquiry: skills workshop','Write an enquiry email about a workplace communication workshop. Ask about dates, fees, content and registration.', '''Subject: Enquiry about workplace communication workshop

Dear Training Coordinator,

I am interested in the workplace communication workshop advertised by your centre. I coordinate a student project team and would like to strengthen my skills in professional email and report writing.

Could you please share the workshop dates, daily schedule and mode of delivery? I would also appreciate details of the total fee, any student concession and whether learning material is included. Please let me know whether the sessions cover practical writing exercises with individual feedback.

Our team has regular commitments on weekday mornings. Could you confirm whether an evening or weekend batch is available and explain the registration process? Information about the registration deadline and any cancellation conditions would also help me make a decision.

Thank you for your time. I look forward to receiving the programme details.

Kind regards,
Neha Das
Student Project Coordinator'''),
('Apology: delayed report','Write an apology email to your project supervisor for sending a report one day late. Accept responsibility and state a preventive measure.', '''Subject: Apology for delayed submission of the survey report

Dear Ms Kapoor,

I apologise for submitting the survey report a day after the agreed deadline of 10 November. I underestimated the time needed to check inconsistent entries and should have informed you before the deadline passed.

The completed report is attached. I have checked the totals against the response sheet and clearly marked the small number of incomplete responses. The findings section and recommendations are now ready for your review.

I understand that the delay reduced the time available to prepare for the team meeting. For future reports, I will set an internal checking deadline two days before submission and report any risk of delay as soon as it becomes apparent.

Please let me know if you would like a brief discussion of the findings before the meeting. Thank you for your understanding.

Yours sincerely,
Arjun Shah
Research Assistant'''),
('Follow-up: application','Write a polite follow-up email about an internship application submitted two weeks ago. Ask for an update without demanding a decision.', '''Subject: Follow-up on software internship application, INT-46

Dear Recruitment Team,

I am writing to follow up on my application for the software internship, reference INT-46, submitted on 4 November. I remain interested in the role and would appreciate an update on the selection timetable.

My application included my CV and a portfolio of two programming projects. Please let me know if any additional information or documentation would assist your review. I would also be happy to discuss the projects at a convenient time.

I understand that evaluating applications takes time. Could you please indicate when shortlisted candidates are likely to be contacted? This would help me coordinate my academic commitments without assuming that a decision has already been made.

Thank you for considering my application and for your time. I look forward to hearing from you.

Kind regards,
Mira Thomas
B.Sc. Computer Science student'''),
('Referral: professional contact','You met a software engineer at a campus event. Write requesting details of a suitable opening and a referral if appropriate.', '''Subject: Enquiry about graduate software roles and referral process

Dear Kiran Patel,

We met at the campus technology event on 8 November and discussed your team's work on testing tools. I am writing to ask about graduate software roles at your organisation and whether my background might suit a current opening.

I am completing a B.Sc. in Computer Science and have developed a small testing utility as a course project. Could you please share the job description, eligibility requirements and application procedure for any relevant role? My CV is available if it would help you assess the fit.

If you consider my profile suitable and your organisation permits employee referrals, I would be grateful for your guidance on that process. I understand that a referral depends on your judgement and does not guarantee selection.

Thank you for your time and advice.

Kind regards,
Dev Menon
B.Sc. Computer Science student''')]
for title,p,m in emails:add('email',title,p,m,target=(140,180),focus='all requested details and an actionable polite request')
def questionnaire(title,context,opens,closed,id=None,pool='original'):
 intro=f'This voluntary survey seeks feedback on {context}. Please answer from your experience; you may skip any item.'
 model=intro+'\n\nOpen-ended questions\n'+'\n'.join(f'{i+1}. {x}' for i,x in enumerate(opens))+'\n\nClosed-ended questions\n'+'\n'.join(f'{i+5}. {x}' for i,x in enumerate(closed))
 args=dict(questionnaire={'intro':intro,'open':opens,'closed':closed},focus=context)
 if id:return writing(id,'questionnaire',title,f'Prepare a questionnaire on {context}. Include a short introduction and exactly 4 open-ended and 4 closed-ended questions.',model,pool=pool,**args)
 return add('questionnaire',title,f'Prepare a questionnaire on {context}. Include a short introduction and exactly 4 open-ended and 4 closed-ended questions.',model,**args)
qs=[
('Digital library','students’ use of the digital library',['What difficulties, if any, do you face when finding a reading?','How do you decide which digital resources to use?','What change would improve your experience of the library portal?','Describe an occasion when a digital resource supported your learning.'],['On how many days did you use the portal last week? 0 / 1–2 / 3–4 / 5–7.','Have you received a portal orientation? Yes / No / Unsure.','How easy is it to find a book? Very easy / Easy / Neither easy nor difficult / Difficult / Very difficult / Not used.','Which device do you use most often? Phone / Tablet / Laptop / Desktop / Other / Not used.']),
('Hybrid teams','communication in a hybrid workplace',['What helps you coordinate with colleagues working elsewhere?','Describe a communication difficulty you have experienced.','How could team meetings become more useful?','What support would help you participate fully in discussions?'],['How many days did you work remotely last week? 0 / 1 / 2 / 3 / 4 / 5 or more.','Is there a documented urgent-contact channel? Yes / No / Unsure.','How clear are meeting agendas? Very clear / Clear / Neutral / Unclear / Very unclear / No meetings.','Which channel do you use most for routine updates? Email / Chat / Calls / Shared board / Other.']),
('Campus waste','campus waste separation',['What makes it easier for you to separate waste?','Describe any difficulty with the current bin labels.','Where would an additional bin be most useful?','What change would improve the collection system?'],['Did you use a campus recycling bin last week? Yes / No / Do not recall.','How clear are bin labels? Very clear / Clear / Neutral / Unclear / Very unclear / Not seen.','How often did you see an overflowing bin last week? Never / Once / 2–3 times / 4 or more / Not observed.','Which location do you use most? Library / Canteen / Hostel / Classroom block / Other / None.']),
('Well-being access','access to campus well-being services',['What would help students find information about support?','What barriers, if any, affect your access to the service?','How could the booking process be improved?','What additional support would you like the campus to offer?'],['Before this survey, were you aware of the service? Yes / No / Unsure.','Have you tried to book an appointment this term? Yes / No / Prefer not to say.','How clear is the published booking information? Very clear / Clear / Neutral / Unclear / Very unclear / Not seen.','Which information channel would you prefer? Portal / Email / Printed notice / In-person desk / Other / No preference.']),
('Peer learning','a university peer-tutoring programme',['What would you hope to gain from a tutoring session?','Describe a topic for which you would welcome support.','What would make a session comfortable for you?','How could the programme fit your weekly schedule?'],['Have you attended a session this term? Yes / No.','Which mode would you prefer? In person / Online / Either / No preference.','How useful was your most recent session? Very useful / Useful / Neutral / Not useful / Not at all useful / Not attended.','Which session length would suit you best? 20 / 30 / 45 / 60 minutes / No preference.']),
('Shuttle use','the campus shuttle service',['Describe any difficulty you face when using the shuttle.','What would improve the information about arrival times?','Which route change would help you most, and why?','How does the timetable affect your travel planning?'],['How many journeys did you make last week? 0 / 1–2 / 3–5 / 6–10 / More than 10.','Did you miss a class because a shuttle was late this month? Yes / No / Not used.','How reliable is the service? Very reliable / Reliable / Neutral / Unreliable / Very unreliable / Not used.','Which time do you most often travel? Before 9 a.m. / 9 a.m.–noon / Noon–3 p.m. / After 3 p.m. / Not used.'])]
for a in qs:questionnaire(*a)
