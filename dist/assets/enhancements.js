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
      label:'案例 02 / 管理系统', title:'把周反馈、催填与课表，收进同一套角色权限。',
      cards:[['管理问题','任课填写、班主任催填、调课审批与花名册维护往往散落在不同表格。'],['已实现的入口','教务系统按角色提供填写、班级总览、课表与行政模块；作品集只展示化名截图。'],['隐私边界','不深链生产登录页；截图来自本地化名演示库（李老师 / 张三 / 李四）。']],
      images:[['management/01-fill-grid.png','化名截图：任课填写网格与批量工具。'],['management/02-homeroom-overview.png','化名截图：班主任总览与催填。']],
      note:'完整模块导读见「管理系统」长页。本页不打开可写演示，也不进入生产真库。',
      steps:[['任课填写','按班批量登记本周表现，折叠次要列并套用预设。'],['班主任催填','看清未填科目，把催填落到具体老师。'],['导出审计','打印 / CSV 留痕，课时可按周汇总。']],
      foot:'化名演示截图 · 详细 01–06 模块见 /management/'
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
      label:'CASE 02 / MANAGEMENT SYSTEM', title:'Weekly feedback, chase-up and timetable under one role model.',
      cards:[['The admin problem','Fill-in, chase-up, timetable approvals and rosters often live in separate spreadsheets.'],['What exists today','Role-based fill, homeroom overview, timetable and admin modules; the portfolio shows anonymised screenshots only.'],['Privacy boundary','No deep link into production sign-in; shots come from a local anonymised demo (Teacher Li / Zhang San / Li Si).']],
      images:[['management/01-fill-grid.png','Anonymised shot: subject-teacher fill grid and batch tools.'],['management/02-homeroom-overview.png','Anonymised shot: homeroom overview and chase-up.']],
      note:'The full module walkthrough lives on the Management long page. This page opens no writable demo and no production database.',
      steps:[['Subject fill-in','Batch-enter the week by class; fold columns and apply presets.'],['Homeroom chase-up','See missing subjects and route reminders to teachers.'],['Export audit','Print/CSV leave a trail; hours roll up by week.']],
      foot:'Anonymised demo screenshots · modules 01–06 at /management/'
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

function management(d,t) {
  const m=d.managementPortfolio;
  if(!m) return `<main id="main" class="wrap inner-main"><h1>404</h1><a href="/management/">${t.back}</a></main>`;
  const teachingHome=m.teachingHome||'https://bingkun.rth1.xyz/';
  const casesHome=m.casesHome||teachingHome;
  const ext=(url,label,cls='')=>`<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
  const roles=m.roles.map(([role,text])=>`<div><strong>${esc(role)}</strong><span>${esc(text)}</span></div>`).join('');
  const steps=m.steps.map((step,i)=>`<li><span>0${i+1}</span><div><strong>${esc(step[0])}</strong><em>${esc(step[1])}</em></div></li>`).join('');
  const modules=m.modules.map(mod=>{
    const shots=mod.images?.length
      ? `<div class="mgmt-shots${mod.images.length===1?' single':''}">${mod.images.map(([file,caption])=>`<figure><img src="/assets/${esc(file)}" width="1440" height="900" loading="lazy" alt="${esc(caption)}"><figcaption>${esc(caption)}</figcaption></figure>`).join('')}</div>`
      : '';
    const gap=mod.gap?`<p class="mgmt-gap-note">${esc(mod.gap)}</p>`:'';
    return `<article class="mgmt-module" id="module-${esc(mod.id)}"><div class="mgmt-num" aria-hidden="true">${esc(mod.id)}</div><div class="mgmt-module-copy"><h3>${esc(mod.title)}</h3><p>${esc(mod.summary)}</p>${gap}${shots}</div></article>`;
  }).join('');
  const others=m.others.map(item=>{
    let link='';
    if(item.href&&item.linkLabel){
      link=item.href.startsWith('http')?ext(item.href,item.linkLabel,'textish'):`<a class="textish" href="${esc(item.href)}">${esc(item.linkLabel)}</a>`;
    }
    return `<article><p class="mgmt-kicker">${esc(item.kicker)}</p><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p>${link}</article>`;
  }).join('');
  return `<div class="mgmt-shell"><a class="skip" href="#main">${t.skip}</a><header class="mgmt-header wrap"><a class="mgmt-brand" href="/management/"><span class="mgmt-brand-mark" aria-hidden="true">亓</span><span>Bingkun Qi<small>${lang==='zh'?'TEACHING · ADMIN':'PHYSICS · TEACHING · AI'}</small></span></a><nav class="mgmt-nav" aria-label="${lang==='zh'?'主导航':'Main navigation'}">${ext(teachingHome,m.navTeaching)}${`<a href="/management/" aria-current="page">${esc(m.navManagement)}</a>`}${ext(casesHome,m.navOthers)}<div class="mgmt-lang" aria-label="Language"><button type="button" data-lang="zh" aria-pressed="${lang==='zh'}">中</button><span>/</span><button type="button" data-lang="en" aria-pressed="${lang==='en'}">EN</button></div></nav></header><main id="main" class="wrap"><section class="mgmt-hero"><div><p class="mgmt-kicker">${esc(m.eyebrow)}</p><h1>${esc(m.headline)}</h1><p class="mgmt-hero-lead">${esc(m.lead)}</p><div class="mgmt-actions"><a class="mgmt-btn mgmt-btn-solid" href="#modules">${esc(m.ctaPrimary)}</a>${ext(teachingHome,m.ctaSecondary,'mgmt-btn mgmt-btn-ghost')}</div></div><aside class="mgmt-hero-panel" aria-label="${esc(m.panelTitle)}"><h2>${esc(m.panelTitle)}</h2><div class="mgmt-role-grid">${roles}</div></aside></section><section class="mgmt-workflow" id="workflow" aria-labelledby="workflow-title"><div class="mgmt-workflow-head"><div><p class="mgmt-kicker">${esc(m.workflowLabel)}</p><h2 id="workflow-title">${esc(m.workflowTitle)}</h2><p>${esc(m.workflowCode)}</p></div><div><p>${esc(m.workflowLead)}</p><ol class="mgmt-steps">${steps}</ol></div></div></section><section class="mgmt-modules" id="modules"><div class="mgmt-section-head"><p class="mgmt-kicker">01 — 06</p><h2>${esc(m.modulesTitle)}</h2><p>${esc(m.modulesLead)}</p></div>${modules}</section><section class="mgmt-other" id="other-entries"><p class="mgmt-kicker">${lang==='zh'?'旁注与回链':'NOTES & LINKS'}</p><h2>${esc(m.otherTitle)}</h2><p>${esc(m.otherLead)}</p><div class="mgmt-other-grid">${others}</div><p class="mgmt-gap-note" style="margin-top:18px;background:#e7efe8;color:#003d2b">${esc(m.privacyNote)}</p></section></main><footer class="mgmt-footer wrap"><span>${esc(m.footerName)}</span><a href="#top">${esc(m.backTop)}</a></footer></div>`;
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
  const description=route==='project'?d.projects.find(p=>p.id===projectId)?.summary:route==='teaching'?d.teachingOverview.intro:route==='management'?d.managementPortfolio?.lead:route==='research'?UI[lang].researchPageIntro:d.about.intro;
  document.querySelector('meta[name="description"]')?.setAttribute('content',description||'');
  document.querySelector('meta[property="og:description"]')?.setAttribute('content',description||'');
  document.querySelector('meta[name="twitter:description"]')?.setAttribute('content',description||'');
  document.querySelectorAll('[data-case-step]').forEach(button=>button.addEventListener('click',()=>{
    const i=Number(button.dataset.caseStep), c=d.projects.find(p=>p.id===projectId)?.case||CASES[lang][projectId];
    document.querySelectorAll('[data-case-step]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    document.getElementById('case-step-content').innerHTML=`<h4>${esc(c.steps[i][0])}</h4><p>${esc(c.steps[i][1])}</p>`;
  }));
}
