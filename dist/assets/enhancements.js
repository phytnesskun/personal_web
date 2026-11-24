/* Case studies and a guided lesson; all demos stay in the browser. */
const CASES = {
  zh: {
    'caie-physics': {
      label:'案例 01 / 从备课到练习', title:'把一次选题过程，放在同一个工作台。',
      cards:[['教学问题','围绕一个概念选题时，需要在不同年份和试卷之间反复查找。'],['工具组织','按阶段、主题、子主题与考季缩小范围，再通过选题篮安排练习。'],['开发实践','以真实备课需求为起点，借助 AI 辅助软件开发；题目选择与教学判断仍由教师完成。']],
      images:[['caie-interface.png','AS 阶段：筛选、题目卡片与选题篮。'],['caie-waves.png','波动专题：缩小范围，将候选题放入选题篮。']],
      note:'实际产品界面，采集于 2026 年 10 月。试题版权归 Cambridge / UCLES；此处仅展示工具使用场景。',
      steps:[['定位概念','选择 AS，再选择 Waves 或 Superposition，按需要继续缩小到子主题。'],['组织练习','把合适的题目放进选题篮，结合课堂目标决定顺序与题量。'],['准备课堂','选择题目与答案的呈现方式，再使用原工具的打印入口。']],
      foot:'这里展示操作流程；点击“进入题库”可在原网站使用完整功能。'
    },
    'student-feedback': {
      label:'案例 02 / 学生周反馈', title:'要收齐一名学生的反馈，先要知道谁教他哪一科。',
      cards:[['从一张班级表说起','一位老师可能跨班、跨科任教。同班只有部分学生上高数，中途还有插班生。班名能帮我找到表，却不能告诉我这名学生的每一科该找谁。'],['和任课老师逐一核对','我找每位老师核实：你在哪些班、教哪些学生、教什么科目？我把核实的对应关系录入数据库，让老师打开系统就能看到自己要填的学生和科目。'],['我想让记录积累下来','我希望每次作业和考试都能留在学生自己的学习记录里。这样，老师过一段时间还能回看一条评语，结合后来的作业或考试判断是否需要继续跟进。']],
      images:[['management/01-fill-grid.png?v=6eeee8e96477','演示界面：任课教师的周反馈填写表。',2578,878],['management/02-homeroom-overview.png?v=f07b94827f69','演示界面：班主任查看本班各科的填报情况。',2592,1236]],
      note:'两张界面节选均使用示例姓名和班级代号。下方用一名虚构学生的第 4 周记录说明两位教师怎样接手。',
      steps:[['物理老师填报','这周布置了 3 份作业，学生完成 2 份。老师给出综合等级 C，并写下“下次检查图线截距”。'],['班主任读回','班主任打开该生同一周的记录，能看到物理老师的评语。学生也选了数学，数学反馈显示“未填”。'],['分别跟进','班主任可以请学生用物理作业讲一讲怎样读截距，同时向数学老师补收本周的反馈。']],
      foot:'这个案例已用虚构记录走通。实际工作中，我观察到同事减少了切换表格的步骤。'
    }
  },
  en: {
    'caie-physics': {
      label:'CASE 01 / FROM PREPARATION TO PRACTICE', title:'One workspace for choosing the next good question.',
      cards:[['The teaching problem','Finding practice for one concept can involve repeatedly searching across years and papers.'],['How the tool is organised','Narrow the set by stage, topic, subtopic and session, then organise practice in a selection basket.'],['Development practice','Real lesson-preparation needs guide AI-assisted software development. Teachers still make the question-selection and teaching decisions.']],
      images:[['caie-interface.png','AS stage: filters, question cards and the selection basket.'],['caie-waves.png','A waves topic: narrow the results and collect a candidate question.']],
      note:'Actual interface, captured in October 2026. Question copyright belongs to Cambridge / UCLES; these images illustrate the tool workflow.',
      steps:[['Find the concept','Choose AS, then Waves or Superposition. Narrow to a subtopic when needed.'],['Build the practice','Collect suitable questions in the basket and decide on their order and number for the lesson.'],['Prepare the lesson','Choose how questions and answers appear, then use the original tool’s print controls.']],
      foot:'This is a walkthrough. Open the question bank to use the complete application.'
    },
    'student-feedback': {
      label:'CASE 02 / WEEKLY PUPIL FEEDBACK', title:'Who teaches this pupil, and which reports should we expect?',
      cards:[['Start with the class list','A teacher could teach several classes and more than one subject. Only some pupils in a form took further maths, and others joined during the year. A class list alone could not tell me who taught each pupil.'],['Check each teaching list','I went to each teacher to check which pupils they taught and for which subjects. I recorded those links in the database so teachers could open their own reporting lists.'],['Keep a record over time','I would like each pupil’s homework and exam records to build up over time. A teacher could then revisit an earlier observation alongside a later piece of work and decide whether the pupil still needed help.']],
      images:[['management/01-fill-grid.png?v=6eeee8e96477','Demo screen showing the subject teacher’s weekly reporting grid.',2578,878],['management/02-homeroom-overview.png?v=f07b94827f69','Demo screen showing the form tutor’s view of reports across subjects.',2592,1236]],
      note:'The interface excerpts use demo labels for pupils, teachers and classes. The week 4 example below follows the same fictional pupil from the subject teacher to the form tutor.',
      steps:[['Record the observation','The pupil completed two of the three physics tasks. The teacher enters an overall C and makes a note to check how the pupil reads the intercept on a graph.'],['Read across subjects','In the same week the form tutor can read the physics comment. The pupil also takes maths, and that report is marked as missing.'],['Follow up','The tutor can ask the pupil to show how they read the intercept on their graph, and ask the maths teacher for the outstanding report.']],
      foot:'I tested this example with fictional records. At school, I observed that colleagues needed to switch between spreadsheets less often.'
    }
  }
};

function caseStudy(p) {
  const c=p.case||CASES[lang][p.id];
  return `<section class="case-study"><div class="case-intro"><p class="eyebrow">${c.label}</p><h2>${c.title}</h2></div><div class="case-facts">${c.cards.map(([label,text])=>`<article><h3>${label}</h3><p>${text}</p></article>`).join('')}</div><div class="case-gallery${(c.images||[]).length===1?' case-gallery-single':''}">${(c.images||[]).map(([file,caption,width=1265,height=712])=>`<figure><a href="/assets/${file}" target="_blank" rel="noopener" aria-label="${esc(caption)} · ${lang==='zh'?'查看大图':'View full image'}"><img src="/assets/${file}" width="${width}" height="${height}" loading="lazy" alt="${esc(caption)}"></a><figcaption>${caption} <span aria-hidden="true">↗</span></figcaption></figure>`).join('')}</div><p class="evidence-note">${c.note}</p><section class="case-walkthrough" aria-labelledby="walkthrough-title"><div><p class="eyebrow">${lang==='zh'?'一步一步看':'STEP BY STEP'}</p><h3 id="walkthrough-title">${lang==='zh'?'一个具体的使用场景':'A concrete use case'}</h3></div><div><div class="step-buttons" aria-label="${lang==='zh'?'场景步骤':'Scenario steps'}">${c.steps.map(([title],i)=>`<button type="button" data-case-step="${i}" aria-pressed="${i===0}" aria-controls="case-step-content"><span>0${i+1}</span>${title}</button>`).join('')}</div><div id="case-step-content" class="step-content" aria-live="polite"><h4>${c.steps[0][0]}</h4><p>${c.steps[0][1]}</p></div><p class="evidence-note">${c.foot}</p></div></section></section>`;
}

function researchExplainers(d) {
  const labels=lang==='zh'?['研究的问题','为何值得研究','论文发现','作者身份','阅读原文','概念示意 · 非实验或模拟数据']:['The question','Why it matters','The finding','Authorship','Read the preprint','Conceptual illustration · not experimental or simulated data'];
  return `<section class="research-explainers" aria-label="${lang==='zh'?'代表论文解读':'Research explained'}">${d.explainers.map((p,i)=>`<article class="research-feature"><div class="research-feature-copy"><p class="eyebrow">PRL / ${i===0?'2018':'2023'}</p><h2>${esc(p.title)}</h2>${[['question',labels[0]],['why',labels[1]],['finding',labels[2]]].map(([key,label])=>`<h3>${label}</h3><p>${esc(p[key])}</p>`).join('')}<p class="research-credit"><strong>${labels[3]}</strong> ${esc(p.credit)}</p>${external(p.sourceUrl,labels[4])}</div><figure><img src="/assets/${i===0?'research-flat-band.svg':'research-zero-mode.svg'}" alt="${esc(p.title)} — ${labels[5]}" loading="lazy"><figcaption>${labels[5]}</figcaption></figure></article>`).join('')}</section>`;
}


// Cached versions of app.js include this name in their shared route table.
function management() {
  return document.getElementById('app').innerHTML;
}

function teaching(d,t) {
  const c=d.teachingExample, sample=d.projects.find(p=>p.id==='teaching-design');
  const step = s => `<section class="lesson-step" id="lesson-step-${s.number}"><div class="lesson-step-index">${s.number}<span>${s.time}</span></div><div><h2>${esc(s.title)}</h2><p>${esc(s.text)}</p>${s.equations?`<div class="equations" aria-label="${lang==='zh'?'合振幅推导':'Resultant amplitude derivation'}">${s.equations.map(e=>`<p>${esc(e)}</p>`).join('')}</div>`:''}<ul>${s.prompts.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></section>`;
  return `<main id="main" class="wrap inner-main teaching-main"><a class="back-link" href="/">← ${t.back}</a><section class="page-heading teaching-overview"><p class="eyebrow">TEACHING / FROM QUESTIONS TO UNDERSTANDING</p><h1>${esc(d.teachingOverview.title)}</h1><p>${esc(d.teachingOverview.intro)}</p></section>${sample?`<article class="teaching-sample"><div><p class="eyebrow">${lang==='zh'?'原创课例 / 受力分析':'ORIGINAL LESSON / FORCE ANALYSIS'}</p><h2>${esc(sample.title)}</h2><p>${esc(sample.summary)}</p><a class="button dark" href="/projects/teaching-design/">${lang==='zh'?'阅读课例与材料':'Explore the lesson and materials'} →</a></div><a class="diagram-cover" href="/projects/teaching-design/" aria-label="${esc(sample.title)}"><img src="/assets/${esc(sample.cover.file)}" alt="${esc(sample.cover.alt)}" width="1000" height="350" loading="lazy"></a></article>`:''}<section class="page-heading" id="wave-lesson"><p class="eyebrow">${esc(c.eyebrow)}</p><h2>${esc(c.title)}</h2><p>${esc(c.intro)}</p><p class="lesson-duration">${esc(c.duration)}</p><a class="button dark" href="/assets/wave-handout.html" target="_blank" rel="noopener">${c.handoutLabel} ${arrow}</a><p class="physics-teaching-link"><a class="text-link" href="/#physics-lab">${esc(d.physicsHub.teachingLink)} →</a></p></section><div class="learning-goal"><span>${lang==='zh'?'学习目标':'LEARNING GOAL'}</span><p>${esc(c.learningGoal)}</p></div><details class="model-note"><summary>${esc(c.assumptionsTitle)}</summary><ul>${c.assumptions.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></details>${step(c.steps[0])}${step(c.steps[1])}<section class="guided-lab" aria-label="${lang==='zh'?'波的叠加实验':'Wave superposition lab'}"><wave-lab lang="${lang}"></wave-lab></section>${step(c.steps[2])}<section class="lesson-challenge"><p class="eyebrow">${lang==='zh'?'轮到你了 / 2 分钟':'YOUR TURN / 2 MIN'}</p><h2>${esc(c.challenge.title)}</h2><p>${esc(c.challenge.question)}</p><p>${esc(c.challenge.extension)}</p></section><details class="lesson-answers"><summary>${esc(c.answersTitle)}</summary>${c.answers.map(a=>`<article><h3>${esc(a.label)}</h3><p>${esc(a.text)}</p></article>`).join('')}</details><section class="teaching-takeaway"><div><h2>${esc(c.keyDistinctionTitle)}</h2><p>${esc(c.keyDistinction)}</p></div><div><h2>${esc(c.teachingTipTitle)}</h2><p>${esc(c.teachingTip)}</p></div></section><div class="handout-row"><div><h3>${lang==='zh'?'把问题带到纸上':'Take the questions to paper'}</h3><p>${esc(c.handoutNote)}</p></div><a class="button dark" href="/assets/wave-handout.html" target="_blank" rel="noopener">${c.handoutLabel} ${arrow}</a></div></main>`;
}

function enhancePage() {
  // Real, shareable language URLs; keep the mounted lab when changing language.
  document.querySelectorAll('a[href^="/"]').forEach(a=>{
    const href=a.getAttribute('href');
    if(!href.startsWith('/assets/')&&!href.startsWith('/lab/')&&!/^\/(zh|en)(\/|$)/.test(href)) a.setAttribute('href','/'+lang+href);
  });
  const canonical=location.origin+'/'+lang+(path==='/'?'/':path+'/');
  document.querySelector('link[rel="canonical"]')?.setAttribute('href',canonical);
  document.querySelector('meta[property="og:url"]')?.setAttribute('content',canonical);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content',document.title);
  document.querySelector('meta[property="og:locale"]')?.setAttribute('content',lang==='zh'?'zh_CN':'en_US');
  document.querySelector('meta[property="og:locale:alternate"]')?.setAttribute('content',lang==='zh'?'en_US':'zh_CN');
  document.querySelector('meta[name="twitter:title"]')?.setAttribute('content',document.title);
  const d=content[lang];
  const description=route==='project'?d.projects.find(p=>p.id===projectId)?.summary:route==='teaching'?d.teachingOverview.intro:route==='research'?UI[lang].researchPageIntro:d.about.intro;
  document.querySelector('meta[name="description"]')?.setAttribute('content',description||'');
  document.querySelector('meta[property="og:description"]')?.setAttribute('content',description||'');
  document.querySelector('meta[name="twitter:description"]')?.setAttribute('content',description||'');
  document.querySelectorAll('[data-case-step]').forEach(button=>button.addEventListener('click',()=>{
    const i=Number(button.dataset.caseStep), c=d.projects.find(p=>p.id===projectId)?.case||CASES[lang][projectId];
    document.querySelectorAll('[data-case-step]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    document.getElementById('case-step-content').innerHTML=`<h4>${esc(c.steps[i][0])}</h4><p>${esc(c.steps[i][1])}</p>`;
  }));
}
