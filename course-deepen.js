/* ============================================================
   课程内容深化数据（course-deepen.js）
   对应 COURSE-DEEPEN.md 六大深化项；题组与抽样卷复用 course-app.js 单题状态机。
   全部为原创示意内容，非中考真题、非教材原文。
   ============================================================ */
(function () {
  'use strict';
  var SYS = '系统生成【待核实】';

  /* ---------- 深化 1：选项级错因分支判定 ---------- */
  var branches = [
    { qid: 'A-D2', unit: 'A', options: [
      { key: 'A', ok: false, family: '词尾音义脱节', basis: '/wɔːks/ 与 /wɔːk/ 词尾 /s/ 是单数标记', remedy: 'A-B2 / A-S1' },
      { key: 'B', ok: true, family: '—', basis: '两句主语单复数不同', remedy: '—' }
    ] },
    { qid: 'A-G1', unit: 'A', options: [
      { key: 'A', ok: false, family: '三单漏 -s', basis: 'His first class 为单数', remedy: 'A-B1' },
      { key: 'B', ok: true, family: '—', basis: '单数主语 + 一般现在时', remedy: '—' },
      { key: 'C', ok: false, family: '非谓语误用', basis: '谓语位置不能用现在分词', remedy: 'A-G3' },
      { key: 'D', ok: false, family: '时态选择', basis: '日常作息用一般现在时，seven forty 不是过去时间', remedy: 'A-H2' }
    ] },
    { qid: 'B-D1', unit: 'B', options: [
      { key: 'A', ok: false, family: '汉语疑问语序干扰', basis: '从句须陈述语序', remedy: 'B-B1' },
      { key: 'B', ok: true, family: '—', basis: '主语在前、be 在后', remedy: '—' },
      { key: 'C', ok: false, family: '时态不一致', basis: 'could 是委婉语气，不指过去', remedy: 'B-B2' },
      { key: 'D', ok: false, family: '汉语疑问语序干扰 + 时态', basis: '双重错误，先记语序为主错因', remedy: 'B-B1' }
    ] },
    { qid: 'B-G1', unit: 'B', options: [
      { key: 'A', ok: false, family: '汉语疑问语序干扰', basis: '去掉助动词、改陈述语序', remedy: 'B-G2' },
      { key: 'B', ok: true, family: '—', basis: '陈述语序 + 主语单数加 -s', remedy: '—' },
      { key: 'C', ok: false, family: '三单漏 -s', basis: 'the reading room 是单数', remedy: 'B-B2' }
    ] },
    { qid: 'B-B1', unit: 'B', options: [
      { key: 'A', ok: false, family: '汉语疑问语序干扰', basis: '换引导词后仍须陈述语序', remedy: 'B-B3' },
      { key: 'B', ok: true, family: '—', basis: '主语 he 单数用 lives', remedy: '—' }
    ] },
    { qid: 'C-D1', unit: 'C', options: [
      { key: 'A', ok: false, family: '主动/被动混淆', basis: '桥是被建的，须 be + 过去分词', remedy: 'C-B1' },
      { key: 'B', ok: true, family: '—', basis: '1980 为过去时间', remedy: '—' },
      { key: 'C', ok: false, family: '时态选择 + 主动被动', basis: '与 in 1980 冲突', remedy: 'C-G1' }
    ] },
    { qid: 'C-G2', unit: 'C', options: [
      { key: 'A', ok: true, family: '—', basis: 'Now 提示现在的能力', remedy: '—' },
      { key: 'B', ok: false, family: '时态不一致', basis: '被全篇过去时带偏', remedy: 'C-G2 重做' },
      { key: 'C', ok: false, family: '谓语动词叠加', basis: 'were 后不能再接动词原形 cross', remedy: 'C-W1' }
    ] },
    { qid: 'C-R3', unit: 'C', options: [
      { key: 'A', ok: true, family: '—', basis: '首尾句与高频词 bridge', remedy: '—' },
      { key: 'B', ok: false, family: '以偏概全', basis: '人物引语只是细节', remedy: 'C-B2' },
      { key: 'C', ok: false, family: '以偏概全', basis: 'buses 只在第 4 句出现一次', remedy: 'C-B2' }
    ] }
  ];

  /* ---------- 深化 2：L1→L4 四阶递进题组（12 题，可直接作答） ---------- */
  var ladder = [
    {
      id: 'A-L1', unit: 'A', group: '三单漏 -s', level: 'L1', limit: '不限时', skill: '语法', type: 'fill',
      stem: '【L1】用所给词的适当形式填空：My brother ______ (go) to school by bike every day.',
      answer: 'goes', accept: ['goes'],
      rule: '答 go 归「三单漏 -s」', basisType: '语法规则',
      basis: 'My brother 是单数第三人称，every day 提示一般现在时，go 以 o 结尾加 -es。',
      trap: 'go 加 -es，不是 -s。', source: SYS, family: '三单漏 -s',
      hint: '先看主语是谁，再决定动词词尾。', attribution: '我把 ______ 当成复数主语了。', variant: ''
    },
    {
      id: 'A-L2', unit: 'A', group: '三单漏 -s', level: 'L2', limit: '≤3 分钟', skill: '写', type: 'fill',
      stem: '【L2】改错（只改病处）：My brother go to school by bike. His friends walks with him.',
      answer: 'goes / walk', accept: ['goes walk', 'goes / walk', 'go → goes, walks → walk'],
      rule: '第二处归「过度推广 -s」；整句重写不算通过', basisType: '语法规则',
      basis: 'My brother 单数用 goes；His friends 复数用原形 walk。',
      trap: '两句主语单复数相反，别一刀切加 -s。', source: SYS, family: '过度推广 -s',
      hint: '一句一句圈主语，再各改一处。', attribution: '我把 -s 加到了复数主语后面。', variant: ''
    },
    {
      id: 'A-L3', unit: 'A', group: '三单漏 -s', level: 'L3', limit: '≤5 分钟', skill: '读', type: 'evidence',
      stem: '【L3】语篇填空并写出依据句：Tina lives next door. She ______ (get) up at six and ______ (read) English for ten minutes. Her parents ______ (not drive) to work; they take the bus.',
      answer: 'gets / reads / don\'t drive；依据句：Tina lives next door',
      rule: '缺依据句不算通过', evidenceKeys: ['tina lives', 'lives next door'],
      basisType: '原文定位句', basis: 'Tina lives next door 提示全文为一般现在时；She 单数加 -s，Her parents 复数用原形。',
      trap: '第三空是否定式，别漏 don\'t。', source: SYS, family: '三单漏 -s',
      hint: '先找提示全文时态的那句，再逐空判主语。', attribution: '我没回原文找时态依据句。', variant: ''
    },
    {
      id: 'A-L4', unit: 'A', group: '三单漏 -s', level: 'L4', limit: '≤2 分钟', skill: '写', type: 'open',
      stem: '【L4·换文体】把三句改成以 My sister 为主语的通知式三句，不增减信息：I get up at six. I walk to school. I read English every evening.',
      answer: '不设唯一答案；三处动词变化各 1 分',
      rule: 'My sister gets up at six. She walks to school. She reads English every evening.；漏一处扣 1 分',
      basisType: '语法规则', basis: '第一人称换第三人称单数，三句动词同步变化。',
      trap: '换文体不换错因，仍考三单。', source: SYS, family: '三单漏 -s',
      hint: '逐句改主语，再逐个改动词，别只改第一句。', attribution: '我漏改了第 ______ 句。', variant: '',
      selfCheck: ['三句都写了', 'get / walk / read 三处都变成第三人称单数', '没有增减原句信息', '在 2 分钟内完成']
    },
    {
      id: 'B-L1', unit: 'B', group: '宾语从句语序', level: 'L1', limit: '不限时', skill: '语法', type: 'choice',
      stem: '【L1】选择：Do you know ______? A. where is the lab  B. where the lab is',
      options: ['A', 'B'], answer: 'B',
      rule: '选 A 归「汉语疑问语序干扰」', basisType: '语法规则',
      basis: '宾语从句用陈述语序，主语 the lab 在 be 动词前。',
      trap: '别把疑问句语序搬进从句。', source: SYS, family: '汉语疑问语序干扰',
      hint: '从句里主语在前、be 在后。', attribution: '我把汉语的「在哪」搬进从句了。', variant: ''
    },
    {
      id: 'B-L2', unit: 'B', group: '宾语从句语序', level: 'L2', limit: '≤3 分钟', skill: '语法', type: 'fill',
      stem: '【L2】合并成一句：I wonder ... + When does the library close?',
      answer: 'I wonder when the library closes.',
      accept: ['I wonder when the library closes.', 'i wonder when the library closes'],
      rule: '语序、去助动词、动词加 -s 各 1 分',
      basisType: '语法规则', basis: '疑问句并入宾语从句后改陈述语序，去掉 does，动词自行加 -s。',
      trap: '去掉 does 后最容易忘记 closes 的 -s。', source: SYS, family: '汉语疑问语序干扰',
      hint: '三步：去 does → 改语序 → 动词加 -s。', attribution: '我去掉 does 后忘了动词变形。', variant: ''
    },
    {
      id: 'B-L3', unit: 'B', group: '宾语从句语序', level: 'L3', limit: '≤5 分钟', skill: '读', type: 'evidence',
      stem: '【L3】语篇改错（只改病处，3 处）并圈出 could、if 两处依据：Could you tell me where is the office? I don\'t know when does it open. Do you know if the reading room close at five?',
      answer: 'where the office is / when it opens / closes；依据词：could、if',
      rule: '漏依据句不算通过', evidenceKeys: ['could', 'if'],
      basisType: '上下文线索', basis: 'could 表委婉语气不指过去；if 表「是否」不是条件状语从句。',
      trap: '第三句除了语序还要补 -s。', source: SYS, family: '汉语疑问语序干扰',
      hint: '先圈 could 与 if，判断时态与 if 的用法，再改三处。',
      attribution: '我没看 could / if 就直接改了。', variant: ''
    },
    {
      id: 'B-L4', unit: 'B', group: '宾语从句语序', level: 'L4', limit: '≤3 分钟', skill: '写', type: 'open',
      stem: '【L4·换话题】就「借书规则」写 2 句宾语从句，用 I wonder whether ... 与 Do you know how long ...',
      answer: '不设唯一答案；按判定规则验收（不代写范文）',
      rule: '2 句齐全 + 陈述语序 + 引导词合适 + 意思通顺 → 通过',
      basisType: '评分量表', basis: '两个功能句各 1 句，从句均须陈述语序。',
      trap: '换话题不换错因；不提供范文。', source: SYS, family: '汉语疑问语序干扰',
      hint: '写完逐句读一遍，检查 is / does 有没有跑到主语前面。',
      attribution: '我换了话题就忘了检查语序。', variant: '',
      selfCheck: ['写了 2 句', '分别用了 I wonder whether 与 Do you know how long', '两句从句都是陈述语序', '话题是借书规则', '在 3 分钟内完成']
    },
    {
      id: 'C-L1', unit: 'C', group: '被动语态与推断依据', level: 'L1', limit: '不限时', skill: '语法', type: 'fill',
      stem: '【L1】用所给词的适当形式填空：The bridge ______ (build) in 1980.',
      answer: 'was built', accept: ['was built'],
      rule: '漏 be 或漏过去分词均判「主动/被动混淆」', basisType: '语法规则',
      basis: '桥被建，in 1980 为过去时间 → was + built（不规则动词）。',
      trap: 'build 的过去分词是 built，不是 builded。', source: SYS, family: '主动/被动混淆',
      hint: '先判断主语是做事的还是被做的。', attribution: '我把桥当成动作发出者了。', variant: ''
    },
    {
      id: 'C-L2', unit: 'C', group: '被动语态与推断依据', level: 'L2', limit: '≤3 分钟', skill: '语法', type: 'fill',
      stem: '【L2】主动变被动：The workers opened the new bridge in 2020.',
      answer: 'The new bridge was opened in 2020.',
      accept: ['The new bridge was opened in 2020.', 'the new bridge was opened in 2020'],
      rule: '新主语 / be / 过去分词 / 时间状语各 1 分',
      basisType: '语法规则', basis: '宾语提前作主语 + was + opened + 保留时间状语。',
      trap: '时间状语不能丢。', source: SYS, family: '主动/被动混淆',
      hint: '四块逐一对照，写完后数一遍。', attribution: '我漏了 ______ 这一块。', variant: ''
    },
    {
      id: 'C-L3', unit: 'C', group: '被动语态与推断依据', level: 'L3', limit: '≤5 分钟', skill: '读', type: 'evidence',
      stem: '【L3·新文本】推断："The library was closed at five. Anna got there at five fifteen. She waited, then went home and finished the book she had." 问：What can we infer about Anna? 须圈出依据句。',
      answer: 'She could not borrow a book that evening. 依据句：The library was closed at five 与 Anna got there at five fifteen。',
      rule: '答「她忘了带卡」等原文无据内容判「臆测」；未圈依据句即使结论接近也判不通过',
      evidenceKeys: ['closed at five', 'five fifteen', 'was closed'],
      basisType: '原文定位句', basis: 'The library was closed at five. Anna got there at five fifteen. She waited, then went home...',
      trap: '只能推出「没借成书」，不能补原因。', source: SYS, family: '臆测',
      hint: '把两句时间与动作连起来，只说能推出的那一句。',
      attribution: '我按自己的想象补了信息。', variant: ''
    },
    {
      id: 'C-L4', unit: 'C', group: '被动语态与推断依据', level: 'L4', limit: '≤3 分钟', skill: '说', type: 'open',
      stem: '【L4·换文体】把 C 单元「介绍一处变化」5 句连段压成 3 句口头复述提纲，5 项要点（时间/旧状况/新状况/影响/感受）仍需覆盖。',
      answer: '不设唯一答案；按判定规则验收（不代写范文）',
      rule: '5 项要点全在 + 至少 1 处被动结构 + 3 句以内 → 通过',
      basisType: '评分量表', basis: '压缩句数不等于删要点；口头题不用机器评分。',
      trap: '不提供范文、不整卷代做。', source: SYS, family: '要点遗漏',
      hint: '逐项打勾后再合并句子，别先合并再找漏。',
      attribution: '我压缩时把 ______ 要点删掉了。', variant: '',
      selfCheck: ['5 项要点都还在', '压成 3 句以内', '至少 1 处被动结构', '同伴听评通过', '在 3 分钟内完成']
    }
  ];

  /* ---------- 深化 3：作文批改量表与升格示范 ---------- */
  var rubric = {
    dims: [
      { name: '要点覆盖', s0: '缺 ≥2 项', s1: '缺 1 项', s2: '5/5 全', obs: '对照题面要点清单逐项打勾' },
      { name: '语法准确', s0: '硬伤 ≥4 处', s1: '硬伤 2–3 处', s2: '硬伤 ≤1 处', obs: '三单、时态一致、被动 be、从句语序' },
      { name: '词形与拼写', s0: '≥4 处错', s1: '2–3 处', s2: '≤1 处', obs: '名词单复数、不规则过去分词、常见词拼写' },
      { name: '衔接与连贯', s0: '无衔接词', s1: '1 个，位置生硬', s2: '≥2 个且用得对', obs: 'first / then / however / so / finally' },
      { name: '字数与卷面', s0: '少于要求 1/3 或难辨认', s1: '差 ≤10 词或涂改多', s2: '达标、卷面清楚', obs: '上册 60–70 词起步，阶段 2 到 80 词左右' }
    ],
    passLine: '要点覆盖 2 分 且 语法准确 ≥1 分 且 其余各项不出现 0 分 → 通过；未通过只改 3 处最痛的，交第 2 稿，不整篇重写。',
    upgrades: [
      { before: 'He get up at six. He like English.', after: 'He gets up at six. He likes English.', reason: '主语 He 第三人称单数，一般现在时动词加 -s', attr: '我把 He 当成复数主语了' },
      { before: 'The old bridge build in 1980.', after: 'The old bridge was built in 1980.', reason: '桥是被建的，须 be + 过去分词', attr: '我把桥当成动作发出者了' },
      { before: 'Could you tell me where is the library?', after: 'Could you tell me where the library is?', reason: '宾语从句用陈述语序', attr: '我把汉语的「在哪」搬进从句了' }
    ],
    secondDraft: [
      '我按老师圈的 3 处逐一改了，没有重写整篇',
      '改后重读一遍，三单 / 时态 / 被动 be 各查一次',
      '要点清单 5 项逐项打勾，缺的只补不删',
      '至少 1 个衔接词，位置读得顺',
      '字数达标、卷面清楚'
    ]
  };

  /* ---------- 深化 4：听力精听标注、单句听写、三栏记录单 ---------- */
  var listening = {
    scripts: [
      { unit: 'A', title: 'My School Day', sentences: [
        { no: 'A1', text: 'Li Ming gets up at six thirty.', marks: 'six thirty「数」；gets 词尾 [s]' },
        { no: 'A2', text: 'He walks to school with his friend Wang Lin.', marks: 'walks 词尾 [s]；with his 弱读连读' },
        { no: 'A3', text: 'His first class starts at seven forty.', marks: 'starts 词尾 [s]；seven forty「数」' },
        { no: 'A4', text: 'After school, he plays basketball.', marks: 'plays 词尾 [z]；After⌣school 连读' },
        { no: 'A5', text: 'In the evening, he reads for twenty minutes and writes three new words in his notebook.', marks: 'reads [z] / writes [s]；twenty、three「数」' }
      ] },
      { unit: 'B', title: 'Asking for Help', sentences: [
        { no: 'B1', text: 'Excuse me, could you tell me where the library is?', marks: 'could you 弱读；从句降调、is 不提前' },
        { no: 'B2', text: "It's next to the science building.", marks: 'next⌣to 连读；science building 名词短语整体听' },
        { no: 'B3', text: 'It opens at eight in the morning and closes at five thirty in the afternoon.', marks: 'eight / five thirty「数」；opens [s]、closes [ɪz]' },
        { no: 'B4', text: 'You can borrow two books today.', marks: 'two「数」；borrow 弱读起首' },
        { no: 'B5', text: 'The reading room is on the second floor.', marks: '补充信息，非题目所问，训练抗干扰' }
      ] },
      { unit: 'C', title: 'A Change in Our Town', sentences: [
        { no: 'C1', text: 'Here is the news about the new bridge.', marks: '主题句，抓 bridge' },
        { no: 'C2', text: 'The old bridge was built in 1980.', marks: 'was 弱读最易吞；1980「数」' },
        { no: 'C3', text: 'It was closed in 2018 because it was too narrow.', marks: 'because 后是原因；2018「数」；narrow 关键形容词' },
        { no: 'C4', text: 'The new bridge was opened in 2020.', marks: 'was 同样弱读；2020「数」' },
        { no: 'C5', text: 'Now the trip to the market takes fifteen minutes instead of forty.', marks: 'fifteen / forty「数」；instead of 前现在、后过去' }
      ] }
    ],
    dictation: [
      { id: 'A-1', sentence: 'He walks to school with his friend.', point: '词尾 [s]' },
      { id: 'A-2', sentence: 'His first class starts at seven forty.', point: '数字 + 词尾' },
      { id: 'A-3', sentence: 'After school, he plays basketball.', point: '词尾 [z]' },
      { id: 'A-4', sentence: 'He reads for twenty minutes every evening.', point: '数字 + 词尾' },
      { id: 'B-1', sentence: 'Could you tell me where the library is?', point: '陈述语序听辨' },
      { id: 'B-2', sentence: "It's next to the science building.", point: '连读 + 名词短语' },
      { id: 'B-3', sentence: 'It opens at eight in the morning.', point: '数字 + 词尾' },
      { id: 'B-4', sentence: 'You can borrow two books today.', point: '数字 + 弱读' },
      { id: 'C-1', sentence: 'The old bridge was built in 1980.', point: '弱读 was + 数字' },
      { id: 'C-2', sentence: 'It was closed because it was too narrow.', point: '原因 + 形容词' },
      { id: 'C-3', sentence: 'The new bridge was opened in 2020.', point: '弱读 was + 数字' },
      { id: 'C-4', sentence: 'The trip takes fifteen minutes instead of forty.', point: '双数字对照' }
    ],
    recordSheet: ['题号', '听前预测（数字 / 原因 / 形容词）', '听中记录（首字母或中文）', '听后归因（不认识 → 退回词汇线；认识但没反应过来 → 跟读 2 遍）']
  };

  /* ---------- 深化 5：W01–W08 跨单元滚动复现 ---------- */
  var spiral = [
    { week: 'W01', carrier: '九上 Unit 1 The Changing World', families: '三单漏 -s / 词尾音义脱节', transfer: '原题 + 同族变式', items: 'A-D1、A-B1、A-B2', pass: '变式一次答对' },
    { week: 'W02', carrier: '九上 Unit 2 Inspiring People', families: '汉语疑问语序干扰 / 听前不预测', transfer: '人物事迹话题', items: 'B-D1、B-B1、B-L3', pass: '语序 3/3 正确' },
    { week: 'W03', carrier: '九上 Unit 3 Smart Learning', families: '推断臆测 / 被动词形 / 要点遗漏', transfer: '说明文 + 日记体', items: 'C-D1、C-B2、C-L4', pass: '依据句圈对且要点 5/5' },
    { week: 'W04', carrier: '九上 Unit 4 Our Memory', families: '回带 A 组三单 + B 组宾语从句', transfer: '日记体第一人称 → 第三人称转述，动词须同步变化', items: 'A-L4、B-L2', pass: '三处动词变化全对' },
    { week: 'W05', carrier: '九上 Unit 5 Power of Ideas', families: '回带 C 组被动语态', transfer: '换话题到发明创造，换不规则动词', items: 'C-B1、C-L2', pass: 'be + 过去分词无硬伤' },
    { week: 'W06', carrier: '九上 Unit 6 Beyond Earth', families: '回带 C 组推断依据', transfer: '科普说明文，依据句跨段', items: 'C-L3、C-R2', pass: '圈对跨段依据句，不臆测' },
    { week: 'W07', carrier: '九上 Unit 7 Feel the Rhythm', families: '回带 B 组从句语序', transfer: '与定语从句 that/which 对比，只做识别', items: 'B-L1、B-B3', pass: '能指出两类从句语序相同' },
    { week: 'W08', carrier: '九上 Unit 8 More than a Game', families: '三族汇合（三单 / 从句 / 被动）', transfer: '介绍一位运动员 5 句，自查清单三族同查', items: 'A-L3、B-L4、C-L4', pass: '三族硬伤合计 ≤1 处' }
  ];

  /* ---------- 深化 6：抽样模拟检测卷 ---------- */
  var mockItems = [
    { id: 'M-H1', unit: 'A', block: '听力', skill: '听', type: 'self',
      stem: '【听力·听前 30 秒】题目 "When was the new library opened?" 圈出疑问词并写出要抓的信息类型。',
      answer: '圈 When / opened；写「年份 / 数字」即通过', rule: '预测栏空白判「无预测」，不放行听音',
      basisType: '学习策略', basis: '疑问词 When 指向时间信息。', trap: '别抓成地点。',
      source: SYS, family: '无预测', hint: '先读题圈疑问词，再决定听什么。', attribution: '我没读题就听了。', variant: '',
      selfCheck: ['我圈出了 When 或 opened', '我写出要抓「年份 / 数字」', '我在听音前完成'] },
    { id: 'M-H2', unit: 'A', block: '听力', skill: '听', type: 'fill',
      stem: '【听力·听中填空】The new library was opened in ______. It is next to the ______ ______.',
      answer: '2021 / science building', accept: ['2021 science building', '2021 / science building'],
      rule: '两空全对通过；名词短语两词都要写', basisType: '原文定位句',
      basis: 'The new library was opened in 2021. It is next to the science building.',
      trap: 'science building 是两词，别只写 building。', source: SYS, family: '词尾音义脱节',
      hint: '听前数清空格，先预判词性。', attribution: '我没预判空格词性。', variant: '' },
    { id: 'M-H3', unit: 'A', block: '听力', skill: '听', type: 'fill',
      stem: '【听力·听中填空】It opens at ______ and closes at ______ ______.',
      answer: 'eight / five thirty', accept: ['eight five thirty', 'eight / five thirty', '8 5:30', '8 / 5:30'],
      rule: '两处时间全对通过', basisType: '原文定位句',
      basis: 'It opens at eight in the morning and closes at five thirty in the afternoon.',
      trap: 'five thirty 两词。', source: SYS, family: '词尾音义脱节',
      hint: '两个时间点分别记，别混成一个。', attribution: '我把两个时间记混了。', variant: '' },
    { id: 'M-R1', unit: 'B', block: '阅读理解', skill: '读', type: 'evidence',
      stem: '【阅读·细节】When was the new reading room opened? 写出原文定位句。材料：Last year our school had only one reading room. It was small and dark. In 2022, a new reading room was opened on the second floor. Now two classes can use it at the same time. "I used to read at home," says Chen Lin, a Grade 9 student. "Now I often stay at school after class."',
      answer: 'In 2022. 定位句：In 2022, a new reading room was opened on the second floor.',
      rule: '缺定位句不算通过', evidenceKeys: ['in 2022', 'was opened'],
      basisType: '原文定位句', basis: 'In 2022, a new reading room was opened on the second floor.',
      trap: '别答 Last year，那是旧阅览室的时间。', source: SYS, family: '未回原文定位',
      hint: '找 was opened 那句，把时间抄下来。', attribution: '我没回原文找依据句。', variant: '' },
    { id: 'M-R2', unit: 'B', block: '阅读理解', skill: '读', type: 'evidence',
      stem: '【阅读·推断】What can we infer about Chen Lin now? 圈出依据句（材料同 M-R1）。',
      answer: 'He often reads / stays at school after class now. 依据句：Now I often stay at school after class.',
      rule: '答「他考了满分」等原文无据内容判「臆测」；未圈依据句即使结论接近也判不通过',
      evidenceKeys: ['stay at school', 'now i often', 'used to read at home'],
      basisType: '原文定位句', basis: '"I used to read at home"... "Now I often stay at school after class."',
      trap: '只能推出「现在常留校」，不能推出成绩变化。', source: SYS, family: '臆测',
      hint: '推断必须圈原文依据句，文中没说的不能加。', attribution: '我按自己的想象补了信息。', variant: '' },
    { id: 'M-R3', unit: 'B', block: '阅读理解', skill: '读', type: 'open',
      stem: '【阅读·词义猜测】文中 "stay" 最可能是什么意思？写出上下文线索（材料同 M-R1）。',
      answer: '停留 / 待在；线索：used to read at home 与 after class。',
      rule: '须写出上下文线索；按熟词硬套不算通过', basisType: '上下文线索',
      basis: '过去在家读 → 现在课后留校，形成时间地点对照。',
      trap: '别只写「待」，要说清凭什么猜。', source: SYS, family: '未用上下文线索',
      hint: '找 used to 与 Now 的对照。', attribution: '我直接按印象猜，没找线索。', variant: '',
      selfCheck: ['我写出了 stay 在文中的意思', '我写出至少一处上下文线索', '线索来自原文而非印象'] },
    { id: 'M-R4', unit: 'B', block: '阅读理解', skill: '读', type: 'fill',
      stem: '【任务型阅读·信息转换】完成表格（每空不超过 3 词，材料同 M-R1）：Old reading room：______ / ______；New reading room：______ / ______',
      answer: 'small / dark；second floor / two classes at the same time',
      accept: ['small dark second floor two classes', 'small / dark / second floor / two classes'],
      rule: '每空 ≤3 词，抄整句不给分', basisType: '信息转换',
      basis: 'It was small and dark. / In 2022, a new reading room was opened on the second floor. Now two classes can use it at the same time.',
      trap: '把句子整句抄下来属于未转换。', source: SYS, family: '信息转换超词数',
      hint: '先圈形容词与地点 / 数量，再压成短语。', attribution: '我直接抄了整句。', variant: '' },
    { id: 'M-U1', unit: 'C', block: '语言运用', skill: '语法', type: 'fill',
      stem: '【完形】Last year our school ______ (have) only one reading room. It ______ (be) small and dark.',
      answer: 'had / was', accept: ['had was', 'had / was'],
      rule: '两个空都要变，缺一扣一半', basisType: '语法规则', basis: 'Last year 提示一般过去时。',
      trap: '别只改第一空。', source: SYS, family: '时态选择',
      hint: '看到 Last year 就把两句都拉回过去。', attribution: '我漏改了第 ______ 空。', variant: '' },
    { id: 'M-U2', unit: 'C', block: '语言运用', skill: '词汇', type: 'fill',
      stem: '【词汇运用·选词填空】从 small / same / second 中选词：The new one is on the ______ floor. Two classes can use it at the ______ time.',
      answer: 'second / same', accept: ['second same', 'second / same'],
      rule: '两空全对通过', basisType: '固定搭配', basis: 'on the second floor / at the same time。',
      trap: 'small 是干扰项。', source: SYS, family: '搭配混淆',
      hint: '两个都是固定短语，整体记。', attribution: '我把 ______ 填串了。', variant: '' },
    { id: 'M-U3', unit: 'C', block: '语言运用', skill: '词汇', type: 'fill',
      stem: '【词汇运用·汉语提示填空】这个阅览室很明亮：The reading room is very ______ (明亮的). 它去年开放：It ______ (开放) last year.',
      answer: 'bright / opened', accept: ['bright opened', 'bright / opened'],
      rule: '两空全对通过；词形变化错按「词形变化错」归因', basisType: '词汇 + 词形',
      basis: '汉语提示给词义；last year 提示一般过去时 opened。',
      trap: '此处 it 指阅览室主动开放，别写 was opened。', source: SYS, family: '词形变化错',
      hint: '先写中文对应的词，再看时间状语定形式。', attribution: '我没看 last year 就填了。', variant: '' },
    { id: 'M-U4', unit: 'C', block: '语言运用', skill: '语法', type: 'fill',
      stem: '【语法填空】"I used to read at home," ______ (say) Chen Lin. Now I often ______ (stay) at school after class.',
      answer: 'said / stay', accept: ['said stay', 'said / stay'],
      rule: '两空全对通过', basisType: '语法规则', basis: '引语外动词用过去时 said；Now 提示一般现在 stay。',
      trap: '别被材料里的 says 带偏。', source: SYS, family: '时态选择',
      hint: '一空看引语，一空看 Now。', attribution: '我被前一句的时态带偏了。', variant: '' },
    { id: 'M-U5', unit: 'C', block: '语言运用', skill: '语法', type: 'fill',
      stem: '【语法填空】A new reading room ______ (open) on the second floor in 2022.',
      answer: 'was opened', accept: ['was opened'],
      rule: 'be 与过去分词缺一不可', basisType: '语法规则', basis: '阅览室被开放 + in 2022。',
      trap: '别写成 opened。', source: SYS, family: '主动/被动混淆',
      hint: '先看主语能不能自己「开放」自己。', attribution: '我把阅览室当成动作发出者了。', variant: '' },
    { id: 'M-U6', unit: 'C', block: '语言运用', skill: '语法', type: 'fill',
      stem: '【语法填空】Could you tell me where the reading room ______ (be)?',
      answer: 'is', accept: ['is'],
      rule: '语序与时态均正确通过', basisType: '语法规则', basis: '宾语从句陈述语序；could 表委婉，问现在地点用 is。',
      trap: '别写 is it，也别写 was。', source: SYS, family: '汉语疑问语序干扰',
      hint: '从句里主语在前，could 不指过去。', attribution: '我把 is 提前 / 当成过去时了。', variant: '' },
    { id: 'M-W1', unit: 'C', block: '书面表达', skill: '写', type: 'open',
      stem: '【书面表达·20 分示意】介绍你学校的一处变化，写 5 句。要点清单：时间 / 旧状况 / 新状况 / 影响 / 感受。至少 1 个衔接词。不提供范文，按五维量表批阅。',
      answer: '不设唯一答案，按五维量表验收（不代写范文）',
      rule: '要点 5/5 + 语法硬伤 ≤1 处 + 至少 1 个衔接词 → 通过；未通过只改 3 处，交第 2 稿',
      basisType: '评分量表', basis: '量表见「内容深化 · 作文批改量表」；由教师按中考书面表达标准批阅。',
      trap: '不提供范文、不机器评分、不整卷代做。', source: SYS, family: '要点遗漏',
      hint: '对照 5 项要点逐项打勾，缺哪项补哪项。', attribution: '我漏了 ______ 要点。', variant: '',
      selfCheck: ['写了时间', '写了旧状况', '写了新状况', '写了影响', '写了感受', '至少 1 个衔接词', '语法硬伤 ≤1 处', '写满 5 句'] }
  ];

  var mockAnalysis = [
    { id: 'M-H1', answer: '圈 When / opened；年份 / 数字', type: '学习策略', basis: '疑问词 When 指向时间', trap: '别抓成地点' },
    { id: 'M-H2', answer: '2021 / science building', type: '原文定位句', basis: 'The new library was opened in 2021. It is next to the science building.', trap: '名词短语两词都要写' },
    { id: 'M-H3', answer: 'eight / five thirty', type: '原文定位句', basis: 'It opens at eight... closes at five thirty', trap: 'five thirty 两词' },
    { id: 'M-R1', answer: 'In 2022. 定位句：In 2022, a new reading room was opened on the second floor.', type: '原文定位句', basis: '同上', trap: '缺定位句不算通过' },
    { id: 'M-R2', answer: 'He often stays at school after class now. 依据句：Now I often stay at school after class.', type: '原文定位句', basis: '同上', trap: '答「考了满分」判臆测' },
    { id: 'M-R3', answer: '停留 / 待在；线索 used to read at home 与 after class', type: '上下文线索', basis: '在家读 → 课后留校', trap: '别按熟词硬套' },
    { id: 'M-R4', answer: 'small / dark；second floor / two classes at the same time', type: '信息转换', basis: '第 2 句与第 3–4 句', trap: '每空 ≤3 词，抄整句不给分' },
    { id: 'M-U1', answer: 'had / was', type: '语法规则', basis: 'Last year 提示一般过去时', trap: '两个空都要变' },
    { id: 'M-U2', answer: 'second / same', type: '固定搭配', basis: 'on the second floor / at the same time', trap: 'small 是干扰项' },
    { id: 'M-U3', answer: 'bright / opened', type: '词汇 + 词形', basis: '汉语提示 + last year 用过去式', trap: '别写 was opened' },
    { id: 'M-U4', answer: 'said / stay', type: '语法规则', basis: '引语外过去；Now 提示一般现在', trap: '别被 says 带偏' },
    { id: 'M-U5', answer: 'was opened', type: '语法规则', basis: '阅览室被开放 + in 2022', trap: 'be 与过去分词缺一不可' },
    { id: 'M-U6', answer: 'is', type: '语法规则', basis: '宾语从句陈述语序 + 现在时', trap: '别写 is it' },
    { id: 'M-W1', answer: '不设唯一答案', type: '评分量表', basis: '五维量表见第 4 节', trap: '不代写范文、不机器评分' }
  ];

  var mockSections = [
    { block: '听力', ids: 'M-H1–H3', full: 6, families: '无预测 / 词尾音义脱节 / 数字漏听' },
    { block: '阅读理解', ids: 'M-R1–R4', full: 10, families: '未回原文定位 / 臆测 / 信息转换超词数' },
    { block: '语言运用', ids: 'M-U1–U6', full: 12, families: '时态选择 / 词形变化 / 主动被动混淆 / 从句语序' },
    { block: '书面表达', ids: 'M-W1', full: 20, families: '要点遗漏 / 三单 / 衔接 / 卷面' }
  ];

  var mockListeningScript = 'The new library was opened in 2021. It is next to the science building. It opens at eight in the morning and closes at five thirty in the afternoon.';
  var mockReadingText = 'Last year our school had only one reading room. It was small and dark. In 2022, a new reading room was opened on the second floor. Now two classes can use it at the same time. "I used to read at home," says Chen Lin, a Grade 9 student. "Now I often stay at school after class."';

  window.COURSE_DEEPEN = {
    meta: {
      name: '课程内容深化包',
      source: 'COURSE-DEEPEN.md',
      note: '全部原创示意，非中考真题、非教材原文；深化题不计入原三单元的单元完成六条件；口语与写作不机器评分。',
      sys: SYS
    },
    branches: branches,
    ladder: ladder,
    rubric: rubric,
    listening: listening,
    spiral: spiral,
    mock: { items: mockItems, analysis: mockAnalysis, sections: mockSections, listeningScript: mockListeningScript, readingText: mockReadingText },
    ladderGradient: [
      { dim: '语境', L1: '单句可判', L2: '相邻 1–2 句', L3: '全段 + 首尾句', L4: '换话题 / 换文体' },
      { dim: '是否需推断', L1: '否', L2: '否', L3: '是，须圈依据句', L4: '是，限时条件下' },
      { dim: '限时', L1: '不限', L2: '≤3 分钟', L3: '≤5 分钟', L4: '≤2–3 分钟' },
      { dim: '开放题', L1: '唯一答案', L2: '唯一答案', L3: '唯一答案 + 依据句', L4: '判定规则，不设唯一答案' },
      { dim: '判错后动作', L1: '归因 + 同族变式', L2: '归因 + 降级 L1', L3: '归因 + 回原文定位', L4: '归因 + 换境重做' }
    ]
  };
})();
