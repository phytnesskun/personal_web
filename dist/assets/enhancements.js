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
      label:'案例 02 / 课堂之外的沟通', title:'让“我没懂”，变成一个可以回应的问题。',
      cards:[['教学问题','学生的困惑需要具体表达，教师也需要知道下一次讲解从哪里开始。'],['已实现的入口','教师与学生分别登录，支持中英文界面，面向学生反馈与教学管理。'],['设计关注','让角色入口清晰，让反馈围绕具体概念展开。下面的虚构案例用于说明这一思路。']],
      images:[['feedback-teacher.png','真实界面：教师登录入口。'],['feedback-student.png','真实界面：学生登录入口。']],
      note:'截图仅展示公开登录页。下面是独立的流程示例，使用虚构内容，不代表已验证的后台功能。',
      steps:[['学生视角','“两个波的振幅都是 1，为什么相差 90° 时合振幅不是 2？”'],['教师视角','先定位到“位移与振幅的区别”，用同一位置的读数检查逐点相加。'],['下一次学习','回到波形实验，比较 0°、90°、180°，再用不等振幅的例子检查理解。']],
      foot:'虚构的波动课场景 · 仅在本页切换展示，不发送或保存任何学生信息。'
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
      label:'CASE 02 / AROUND THE CLASSROOM', title:'Turn “I don’t understand” into a question we can work with.',
      cards:[['The teaching problem','Students need to express a precise difficulty, and teachers need a useful starting point for the next explanation.'],['Available entry points','Separate teacher and student sign-in, with Chinese and English interfaces for feedback and teaching administration.'],['The design focus','Clear roles and feedback tied to a concrete concept. The fictional example below illustrates this idea.']],
      images:[['feedback-teacher.png','Actual interface: teacher sign-in.'],['feedback-student.png','Actual interface: student sign-in.']],
      note:'Screenshots show only the public sign-in pages. The separate illustrative workflow below uses fictional content, not verified back-office functionality.',
      steps:[['Student perspective','“Both waves have amplitude 1. Why is the resultant not 2 when the phase difference is 90°?”'],['Teacher perspective','Focus on displacement versus amplitude. Read the curves at one position to test point-by-point addition.'],['Next learning step','Return to the wave lab. Compare 0°, 90° and 180°, then test understanding using unequal amplitudes.']],
      foot:'Fictional waves lesson · This display runs only on this page and sends or saves no student information.'
    }
  }
};

function caseStudy(p) {
  const c=CASES[lang][p.id];
  return `<section class="case-study"><div class="case-intro"><p class="eyebrow">${c.label}</p><h2>${c.title}</h2></div><div class="case-facts">${c.cards.map(([label,text])=>`<article><h3>${label}</h3><p>${text}</p></article>`).join('')}</div><div class="case-gallery">${c.images.map(([file,caption])=>`<figure><a href="/assets/${file}" target="_blank" rel="noopener" aria-label="${esc(caption)} · ${lang==='zh'?'查看大图':'View full image'}"><img src="/assets/${file}" width="1265" height="712" loading="lazy" alt="${esc(caption)}"></a><figcaption>${caption} <span aria-hidden="true">↗</span></figcaption></figure>`).join('')}</div><p class="evidence-note">${c.note}</p><section class="case-walkthrough" aria-labelledby="walkthrough-title"><div><p class="eyebrow">${lang==='zh'?'一步一步看':'STEP BY STEP'}</p><h3 id="walkthrough-title">${lang==='zh'?'一个具体的使用场景':'A concrete use case'}</h3></div><div><div class="step-buttons" aria-label="${lang==='zh'?'场景步骤':'Scenario steps'}">${c.steps.map(([title],i)=>`<button type="button" data-case-step="${i}" aria-pressed="${i===0}" aria-controls="case-step-content"><span>0${i+1}</span>${title}</button>`).join('')}</div><div id="case-step-content" class="step-content" aria-live="polite"><h4>${c.steps[0][0]}</h4><p>${c.steps[0][1]}</p></div><p class="evidence-note">${c.foot}</p></div></section></section>`;
}

function researchExplainers(d) {
  const labels=lang==='zh'?['研究的问题','为何值得研究','论文发现','作者身份','阅读原文','概念示意 · 非实验或模拟数据']:['The question','Why it matters','The finding','Authorship','Read the preprint','Conceptual illustration · not experimental or simulated data'];
  return `<section class="research-explainers" aria-label="${lang==='zh'?'代表论文解读':'Research explained'}">${d.explainers.map((p,i)=>`<article class="research-feature"><div class="research-feature-copy"><p class="eyebrow">PRL / ${i===0?'2018':'2023'}</p><h2>${esc(p.title)}</h2>${[['question',labels[0]],['why',labels[1]],['finding',labels[2]]].map(([key,label])=>`<h3>${label}</h3><p>${esc(p[key])}</p>`).join('')}<p class="research-credit"><strong>${labels[3]}</strong> ${esc(p.credit)}</p>${external(p.sourceUrl,labels[4])}</div><figure><img src="/assets/${i===0?'research-flat-band.svg':'research-zero-mode.svg'}" alt="${esc(p.title)} — ${labels[5]}" loading="lazy"><figcaption>${labels[5]}</figcaption></figure></article>`).join('')}</section>`;
}

function teaching(d,t) {
  const c=d.teachingExample;
  const step = s => `<section class="lesson-step" id="lesson-step-${s.number}"><div class="lesson-step-index">${s.number}<span>${s.time}</span></div><div><h2>${esc(s.title)}</h2><p>${esc(s.text)}</p>${s.equations?`<div class="equations" aria-label="${lang==='zh'?'合振幅推导':'Resultant amplitude derivation'}">${s.equations.map(e=>`<p>${esc(e)}</p>`).join('')}</div>`:''}<ul>${s.prompts.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></section>`;
  return `<main id="main" class="wrap inner-main teaching-main"><a class="back-link" href="/">← ${t.back}</a><section class="page-heading"><p class="eyebrow">${esc(c.eyebrow)}</p><h1>${esc(c.title)}</h1><p>${esc(c.intro)}</p><p class="lesson-duration">${esc(c.duration)}</p><a class="button dark" href="/assets/wave-handout.html" target="_blank" rel="noopener">${c.handoutLabel} ${arrow}</a><p class="physics-teaching-link"><a class="text-link" href="/#physics-lab">${esc(d.physicsHub.teachingLink)} →</a></p></section><div class="learning-goal"><span>${lang==='zh'?'学习目标':'LEARNING GOAL'}</span><p>${esc(c.learningGoal)}</p></div><details class="model-note"><summary>${esc(c.assumptionsTitle)}</summary><ul>${c.assumptions.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></details>${step(c.steps[0])}${step(c.steps[1])}<section class="guided-lab" aria-label="${lang==='zh'?'波的叠加实验':'Wave superposition lab'}"><wave-lab lang="${lang}"></wave-lab></section>${step(c.steps[2])}<section class="lesson-challenge"><p class="eyebrow">${lang==='zh'?'轮到你了 / 2 分钟':'YOUR TURN / 2 MIN'}</p><h2>${esc(c.challenge.title)}</h2><p>${esc(c.challenge.question)}</p><p>${esc(c.challenge.extension)}</p></section><details class="lesson-answers"><summary>${esc(c.answersTitle)}</summary>${c.answers.map(a=>`<article><h3>${esc(a.label)}</h3><p>${esc(a.text)}</p></article>`).join('')}</details><section class="teaching-takeaway"><div><h2>${esc(c.keyDistinctionTitle)}</h2><p>${esc(c.keyDistinction)}</p></div><div><h2>${esc(c.teachingTipTitle)}</h2><p>${esc(c.teachingTip)}</p></div></section><div class="handout-row"><div><h3>${lang==='zh'?'把问题带到纸上':'Take the questions to paper'}</h3><p>${esc(c.handoutNote)}</p></div><a class="button dark" href="/assets/wave-handout.html" target="_blank" rel="noopener">${c.handoutLabel} ${arrow}</a></div></main>`;
}

function enhancePage() {
  // Real, shareable language URLs; keep the mounted lab when changing language.
  document.querySelectorAll('a[href^="/"]').forEach(a=>{
    const href=a.getAttribute('href');
    if(!href.startsWith('/assets/')&&!/^\/(zh|en)(\/|$)/.test(href)) a.setAttribute('href','/'+lang+href);
  });
  const canonical=location.origin+'/'+lang+(path==='/'?'/':path+'/');
  document.querySelector('link[rel="canonical"]')?.setAttribute('href',canonical);
  document.querySelector('meta[property="og:url"]')?.setAttribute('content',canonical);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content',document.title);
  document.querySelector('meta[property="og:locale"]')?.setAttribute('content',lang==='zh'?'zh_CN':'en_US');
  document.querySelector('meta[property="og:locale:alternate"]')?.setAttribute('content',lang==='zh'?'en_US':'zh_CN');
  document.querySelector('meta[name="twitter:title"]')?.setAttribute('content',document.title);
  const d=content[lang];
  const description=route==='project'?d.projects.find(p=>p.id===projectId)?.summary:route==='teaching'?d.teachingExample.intro:route==='research'?UI[lang].researchPageIntro:d.about.intro;
  document.querySelector('meta[name="description"]')?.setAttribute('content',description||'');
  document.querySelector('meta[property="og:description"]')?.setAttribute('content',description||'');
  document.querySelector('meta[name="twitter:description"]')?.setAttribute('content',description||'');
  document.querySelectorAll('[data-case-step]').forEach(button=>button.addEventListener('click',()=>{
    const i=Number(button.dataset.caseStep), c=CASES[lang][projectId];
    document.querySelectorAll('[data-case-step]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    document.getElementById('case-step-content').innerHTML=`<h4>${esc(c.steps[i][0])}</h4><p>${esc(c.steps[i][1])}</p>`;
  }));
}
