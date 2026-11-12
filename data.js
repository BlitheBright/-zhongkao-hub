/* ============================================================
   中考英语备考学习台 - 内容数据
   边界：人教版（2024 修订版）九年级上册 / 浙江杭州 / 120 分制 / 2027 届
   声明：本文件中的题目、语篇、词条均为原创示意内容，
        非中考真题、非教材原文；教材页码与考情以官方实物为准。
   ============================================================ */
(function () {
  'use strict';

  var DATA = {};

  DATA.meta = {
    name: '中考英语备考学习台',
    version: '1.0',
    audience: '杭州 2027 届九年级学生（120 分制下 60-70 分，得分率 50%-58%），默写尚可，词汇 / 听力 / 作文薄弱',
    teacher: '任课教师 / 备课组：内容维护、讲评、导出打印、按板块看错题',
    baseDate: '2026-11-12',
    startDate: '2026-11-16',
    totalWeeks: 31,
    exam: '浙江省统一卷 120 分 = 听力 20 / 阅读理解 40 / 语言运用 40 / 书面表达 20；考试时长 100 分钟',
    examSource: '【待核实】省卷题型分值以学校拿到的官方真题卷为准',
    book: '人教版（2024 修订版）九年级上册 Unit 1-8',
    bookSource: '【待核实】教材附录页码以课本实物为准；政策以 2027 年杭州市区最新官方通知为准',
    disclaimer: '示意内容与功能演示，不代写范文、不整卷代做、不承诺分数'
  };

  /* ---------- 四阶段 ---------- */
  DATA.stages = [
    {
      id: 1, name: '阶段 1｜九上重学与补地基', weeks: 'W01-W08',
      date: '2026-11-16 ~ 2027-01-10',
      focus: ['课本同步 8 单元', '词汇与语法基本形式', '七八年级补欠账'],
      use: '每周 1 单元；W01 只开词汇线与听力线；不碰多时态混合辨析、长难句、阅读推断'
    },
    {
      id: 2, name: '阶段 2｜话题一轮与作文成型', weeks: 'W09-W16',
      date: '2027-01-11 ~ 2027-03-07',
      focus: ['话题一轮', '五类文体各成型 1 篇（80 词左右）', '任务型阅读', '语言运用'],
      use: '寒假集中补词汇；不再重复九上；此时才引入省卷题型分块'
    },
    {
      id: 3, name: '阶段 3｜题型专项与限时', weeks: 'W17-W25',
      date: '2027-03-08 ~ 2027-05-09',
      focus: ['阅读与完形方法', '限时套卷', '整套听力', '错题回炉'],
      use: '开放 B / C 层练习；错题按四大板块归类'
    },
    {
      id: 4, name: '阶段 4｜考前保温', weeks: 'W26-W31',
      date: '2027-05-10 ~ 2027-06-20',
      focus: ['保温卷', '作文稳稿', '错词终轮'],
      use: '只做会做的不丢；W31 末日 6/20 为 6 月第三周周日，属推断【待核实：以 2027 年官方通知为准】'
    }
  ];

  /* ---------- 31 周日历 ---------- */
  DATA.weeks = [
    { w: 1, date: '11/16-11/22', stage: 1, unit: 1, focus: 'Unit 1 现在完成时 vs 一般过去时；W01 基线诊断' },
    { w: 2, date: '11/23-11/29', stage: 1, unit: 2, focus: 'Unit 2 形式主语；作文线开放' },
    { w: 3, date: '11/30-12/06', stage: 1, unit: 3, focus: 'Unit 3 宾语从句 that / if / whether' },
    { w: 4, date: '12/07-12/13', stage: 1, unit: 4, focus: 'Unit 4 宾语从句疑问词；日记体写作' },
    { w: 5, date: '12/14-12/20', stage: 1, unit: 5, focus: 'Unit 5 被动语态一般现在 / 过去' },
    { w: 6, date: '12/21-12/27', stage: 1, unit: 6, focus: 'Unit 6 被动语态一般将来' },
    { w: 7, date: '12/28-01/03', stage: 1, unit: 7, focus: 'Unit 7 定语从句；只做识别与单句模仿' },
    { w: 8, date: '01/04-01/10', stage: 1, unit: 8, focus: 'Unit 8 主谓一致；八单元错词集中回炉' },
    { w: 9, date: '01/11-01/17', stage: 2, unit: null, focus: '话题一轮：校园与家庭；书信成型' },
    { w: 10, date: '01/18-01/24', stage: 2, unit: null, focus: '话题一轮：健康与饮食；日记成型' },
    { w: 11, date: '01/25-01/31', stage: 2, unit: null, focus: '话题一轮：旅行与自然；任务型阅读起步' },
    { w: 12, date: '02/01-02/07', stage: 2, unit: null, focus: '寒假集中补词汇；词汇运用专项' },
    { w: 13, date: '02/08-02/14', stage: 2, unit: null, focus: '寒假：不规则动词与词形变化回炉' },
    { w: 14, date: '02/15-02/21', stage: 2, unit: null, focus: '话题一轮：科技与环保；通知类写作' },
    { w: 15, date: '02/22-02/28', stage: 2, unit: null, focus: '话题一轮：文化与节日；观点议论成型' },
    { w: 16, date: '03/01-03/07', stage: 2, unit: null, focus: '一轮收口；图表描述【本地是否考查待核实】' },
    { w: 17, date: '03/08-03/14', stage: 3, unit: null, focus: '完形三步法；开放 C 层练习' },
    { w: 18, date: '03/15-03/21', stage: 3, unit: null, focus: '阅读细节与词义猜测专项' },
    { w: 19, date: '03/22-03/28', stage: 3, unit: null, focus: '阅读推断与主旨专项' },
    { w: 20, date: '03/29-04/04', stage: 3, unit: null, focus: '阶段测；四大板块分项统计' },
    { w: 21, date: '04/05-04/11', stage: 3, unit: null, focus: '整套听力限时；核对 2027 官方通知' },
    { w: 22, date: '04/12-04/18', stage: 3, unit: null, focus: '限时套卷一；错因归类' },
    { w: 23, date: '04/19-04/25', stage: 3, unit: null, focus: '限时套卷二；作文稳稿' },
    { w: 24, date: '04/26-05/02', stage: 3, unit: null, focus: '语法填空与词汇运用回炉' },
    { w: 25, date: '05/03-05/09', stage: 3, unit: null, focus: '阶段测；错题终轮归类' },
    { w: 26, date: '05/10-05/16', stage: 4, unit: null, focus: '保温卷一；只做会做的不丢' },
    { w: 27, date: '05/17-05/23', stage: 4, unit: null, focus: '保温卷二；作文模板复盘' },
    { w: 28, date: '05/24-05/30', stage: 4, unit: null, focus: '错词本终轮；不规则动词复核' },
    { w: 29, date: '05/31-06/06', stage: 4, unit: null, focus: '保温卷三；答题节奏' },
    { w: 30, date: '06/07-06/13', stage: 4, unit: null, focus: '作文稳稿；听力保持' },
    { w: 31, date: '06/14-06/20', stage: 4, unit: null, focus: '考前一周：只回炉错题，不碰新难题' }
  ];

  /* ---------- 九上 8 单元 ---------- */
  DATA.units = [
    { id: 1, name: 'Unit 1 The Changing World（变化中的世界）', grammar: '现在完成时与一般过去时对比（过去的事影响到现在用 have/has + 过去分词；只说过去某时用一般过去时）', topic: '家乡与社会变化', writing: '写"我的变化"5 句', vocab: '变化类话题词、合成词', review: '七上 You and Me' },
    { id: 2, name: 'Unit 2 Inspiring People（榜样人物）', grammar: '形式主语（it 先占位，真正内容在后面的 to do）', topic: '人物事迹', writing: '人物介绍 3 句', vocab: '职业名词后缀 -ian / -er / -or', review: '七上 My School' },
    { id: 3, name: 'Unit 3 Smart Learning（学会学习）', grammar: '宾语从句 that / if / whether（整句当宾语，用陈述语序）', topic: '学习策略', writing: '学习习惯 5 句', vocab: '学习类固定搭配', review: '七下 Keep Fit' },
    { id: 4, name: 'Unit 4 Our Memory（记忆）', grammar: '宾语从句疑问词（what / when / where / how 引导，后面仍用陈述语序）', topic: '记忆方法', writing: '日记体 5 句', vocab: '记忆类话题词', review: '七下 Eat Well' },
    { id: 5, name: 'Unit 5 Power of Ideas（创意的力量）', grammar: '被动语态一般现在 / 过去（不必说谁做的，用 be + 过去分词）', topic: '发明创造', writing: '介绍一项发明 5 句', vocab: '发明类话题词', review: '八上 Happy Holiday' },
    { id: 6, name: 'Unit 6 Beyond Earth（超越地球）', grammar: '被动语态一般将来（will be + 过去分词）', topic: '太空探索', writing: '描述太空梦想 5 句', vocab: '合成词、太空类话题词', review: '八上 Amazing Plants and Animals' },
    { id: 7, name: 'Unit 7 Feel the Rhythm（感受节奏）', grammar: '定语从句 that / which / who（一个句子放名词后面修饰它）', topic: '音乐与音乐家', writing: '我的音乐故事 5 句', vocab: '音乐类话题词', review: '八下 Stay Healthy' },
    { id: 8, name: 'Unit 8 More than a Game（不止于比赛）', grammar: '主谓一致（主语单复数决定动词形式）', topic: '体育赛事与体育精神', writing: '介绍一位运动员 5 句', vocab: '体育类话题词', review: '八下 Crossing Cultures' }
  ];

  DATA.appendix = [
    { name: '单元词表', page: 'p.107（据教材目录页转录）', use: '每日滚动听写的唯一词源' },
    { name: '字母顺序总词表', page: 'p.117（据教材目录页转录）', use: '错词本索引' },
    { name: '小学词汇回补表', page: 'p.126（据教材目录页转录）', use: 'W01 基线诊断与补欠账第一份清单' },
    { name: '不规则动词表', page: 'p.127（据教材目录页转录）', use: '现在完成时 / 被动语态刚需，每日固定 3 个' },
    { name: '听力原文', page: 'p.94（据教材目录页转录）', use: '听后对原文跟读 2 遍' },
    { name: '语法附录', page: 'p.104（据教材目录页转录）', use: '随新课查证基本形式' },
    { name: '拓展阅读', page: 'p.81（据教材目录页转录）', use: '阶段 2 任务型阅读素材' }
  ];

  /* ---------- 8 专题 ---------- */
  DATA.topics = [
    { id: 'T1', name: '词汇与构词', exam: '语言运用 40 分', stage: '全程', items: ['音形义用四联', '话题词群', '词形变化', '固定搭配', '合成词与后缀', '三级输出：听写 → 默写 → 造句', '错词本（错 2 次以上才收）'] },
    { id: 'T2', name: '语法基本形式', exam: '语法填空 10 分 + 写作准确性', stage: 'W01-W08 只做识别与单句模仿', items: ['现在完成时', '形式主语', '宾语从句', '被动语态', '定语从句', '主谓一致', '自查清单：时态一致 / 三单 / 名词单复数 / 词形变化'] },
    { id: 'T3', name: '听力', exam: '听力 20 分', stage: '全程不断线', items: ['教材音频 + 听力原文跟读', '听前 30 秒读题预测', '听中只记首字母或中文', '听后归因：不认识 / 认识但没反应过来', '单句听写不超过 12 词', '阶段 3 整套限时'] },
    { id: 'T4', name: '语言运用', exam: '完形 15 + 词汇运用 15 + 语法填空 10', stage: 'W09 起专项', items: ['完形三步法', '选词填空', '汉语提示填空（与默写优势直接对接）', '语法填空词形变化'] },
    { id: 'T5', name: '阅读理解与任务型阅读', exam: '阅读 30 + 任务型 10', stage: '任务型 W09 提前，推断 W17 起', items: ['细节回原文定位', '推断找依据不臆测', '主旨抓首尾段与高频词', '词义猜测看上下文', '任务型阅读信息转换'] },
    { id: 'T6', name: '写作', exam: '书面表达 20 分（80 词左右）', stage: 'W02 起，60 词起步', items: ['审题圈要点 → 三段提纲 → 模板填充 → 自查清单 → 升格 1 处', '每周 1 篇改 3 稿', '五类文体：书信 / 日记 / 通知 / 观点议论 / 图表描述', '句型库每单元摘课本 2 句'] },
    { id: 'T7', name: '模拟检测', exam: '全卷 120 分', stage: 'W01 基线 / 每 4 周 / W17 起限时', items: ['W01 基线诊断', '阶段测', '限时套卷', '保温卷'] },
    { id: 'T8', name: '七八年级补欠账', exam: '词汇与语言运用基础', stage: 'W01-W08 每周 1 个单元', items: ['取新版七八年级单元中重要度 ≥4 的知识点', '难度 2 起步', '只写单元名不写序号（图谱序号存在不一致，以课本目录为准）'] }
  ];

  /* ---------- 六板块内容清单 ---------- */
  DATA.blocks = [
    { id: 'vocab', name: '词汇', exam: '语言运用 40 分｜全程', items: ['课本单元词表', '小学词汇回补表', '不规则动词表', '话题词群：校园 / 家庭 / 健康 / 饮食 / 旅行 / 自然 / 文化 / 发明 / 太空 / 音乐 / 体育', '合成词、后缀、固定搭配', '三级输出：听写 → 默写 → 造句', '当天 / 2 / 4 / 7 / 14 天滚动复现', '错词本只收错 2 次以上'] },
    { id: 'grammar', name: '语法', exam: '语法填空 10 分 + 写作准确性｜W01-W08 只做基本形式', items: ['现在完成时（过去的事影响到现在）', '形式主语（it 先占位）', '宾语从句（整句当宾语、陈述语序）', '被动语态（be + 过去分词）', '定语从句（句子放名词后修饰它）', '主谓一致（主语单复数决定动词）', '自查清单：时态一致 / 三单 / 名词单复数 / 词形变化', '不引入虚拟语气、倒装、独立主格（超纲，中考不作要求）'] },
    { id: 'listening', name: '听力', exam: '听力 20 分｜全程每日 10 分钟', items: ['教材音频 + 听力原文跟读 2 遍', '听前 30 秒读题预测、预判词性', '听中只记首字母或中文', '听后归因：不认识 / 认识但没反应过来', '每周 2 次单句听写，单句不超过 12 词', '阶段 3 整套限时'] },
    { id: 'reading', name: '阅读', exam: '阅读理解 30 + 任务型阅读 10｜W17 起重点', items: ['细节题回原文定位', '推断题找依据不臆测', '主旨题抓首尾段与高频词', '词义猜测看上下文线索', '任务型阅读做信息转换（W09 提前介入）'] },
    { id: 'cloze', name: '完形', exam: '完形填空 15 分｜W17 起重点', items: ['通读抓主旨', '上下文找复现与逻辑', '复核代入', '每题标注上下文线索'] },
    { id: 'writing', name: '写作', exam: '书面表达 20 分｜W02 起', items: ['审题圈要点 → 三段提纲 → 模板填充 → 自查清单 → 升格 1 处', '每周 1 篇改 3 稿，只改 3 处最痛的', '五类文体（本地是否全考【待核实】）', '60 词起步 → 80 词左右', '句型库：每单元摘课本 2 句', '只做批改、升格与模板提供，不代写范文'] }
  ];

  /* ---------- 示意词条（供滚动听写条演示，非教材原表） ---------- */
  DATA.words = [
    { w: 'change', ipa: '/tʃeɪndʒ/', cn: '变化', topic: '变化' },
    { w: 'world', ipa: '/wɜːld/', cn: '世界', topic: '变化' },
    { w: 'improve', ipa: '/ɪmˈpruːv/', cn: '改进', topic: '变化' },
    { w: 'admire', ipa: '/ədˈmaɪə/', cn: '钦佩', topic: '人物' },
    { w: 'inspire', ipa: '/ɪnˈspaɪə/', cn: '激励', topic: '人物' },
    { w: 'courage', ipa: '/ˈkʌrɪdʒ/', cn: '勇气', topic: '人物' },
    { w: 'learn', ipa: '/lɜːn/', cn: '学习', topic: '学习' },
    { w: 'method', ipa: '/ˈmeθəd/', cn: '方法', topic: '学习' },
    { w: 'practice', ipa: '/ˈpræktɪs/', cn: '练习', topic: '学习' },
    { w: 'memory', ipa: '/ˈmeməri/', cn: '记忆', topic: '记忆' },
    { w: 'remember', ipa: '/rɪˈmembə/', cn: '记得', topic: '记忆' },
    { w: 'review', ipa: '/rɪˈvjuː/', cn: '复习', topic: '记忆' },
    { w: 'invent', ipa: '/ɪnˈvent/', cn: '发明', topic: '发明' },
    { w: 'invention', ipa: '/ɪnˈvenʃn/', cn: '发明物', topic: '发明' },
    { w: 'discover', ipa: '/dɪˈskʌvə/', cn: '发现', topic: '发明' },
    { w: 'space', ipa: '/speɪs/', cn: '太空', topic: '太空' },
    { w: 'explore', ipa: '/ɪkˈsplɔː/', cn: '探索', topic: '太空' },
    { w: 'planet', ipa: '/ˈplænɪt/', cn: '行星', topic: '太空' },
    { w: 'music', ipa: '/ˈmjuːzɪk/', cn: '音乐', topic: '音乐' },
    { w: 'rhythm', ipa: '/ˈrɪðəm/', cn: '节奏', topic: '音乐' },
    { w: 'concert', ipa: '/ˈkɒnsət/', cn: '音乐会', topic: '音乐' },
    { w: 'sport', ipa: '/spɔːt/', cn: '运动', topic: '体育' },
    { w: 'athlete', ipa: '/ˈæθliːt/', cn: '运动员', topic: '体育' },
    { w: 'compete', ipa: '/kəmˈpiːt/', cn: '竞争', topic: '体育' },
    { w: 'sentence', ipa: '/ˈsentəns/', cn: '句子', topic: '通用' },
    { w: 'clause', ipa: '/klɔːz/', cn: '从句', topic: '通用' },
    { w: 'passive', ipa: '/ˈpæsɪv/', cn: '被动的', topic: '通用' },
    { w: 'agree', ipa: '/əˈɡriː/', cn: '同意', topic: '通用' },
    { w: 'mistake', ipa: '/mɪˈsteɪk/', cn: '错误', topic: '通用' },
    { w: 'progress', ipa: '/ˈprəʊɡres/', cn: '进步', topic: '通用' }
  ];

  /* ---------- 题库（原创示意题，四栏解析：答案 / 依据类型 / 具体依据 / 易错提醒） ---------- */
  DATA.questions = [
    {
      id: 'Q01', block: '词汇运用', level: 'A', openWeek: 1, knowledge: '被动语态（一般现在 / 过去）',
      stem: '用括号内所给词的适当形式填空：The bridge ______ (build) across the river in 2010.',
      answer: 'was built',
      basisType: '语法规则',
      basis: '主语 bridge 是动作承受者，且 in 2010 为过去时间，用一般过去时被动语态 was + 过去分词。',
      trap: '漏掉 be 动词只写 built；或误写 is built 造成时态不一致。'
    },
    {
      id: 'Q02', block: '语法', level: 'A', openWeek: 3, knowledge: '宾语从句陈述语序',
      stem: '选择：Could you tell me ______?  A. where is the library  B. where the library is  C. where was the library  D. the library is where',
      answer: 'B',
      basisType: '语法规则',
      basis: '宾语从句用陈述语序，排除疑问语序 A / C；D 的引导词位置不当。',
      trap: '受汉语"图书馆在哪"影响直接选 A。'
    },
    {
      id: 'Q03', block: '语法', level: 'A', openWeek: 1, knowledge: '现在完成时与一般过去时对比',
      stem: '用括号内所给词的适当形式填空：I ______ (live) in Hangzhou since 2018.',
      answer: 'have lived',
      basisType: '语法规则',
      basis: 'since + 过去时间点表示动作持续到现在，用现在完成时 have/has + 过去分词。',
      trap: '误用一般过去时 lived，忽略 since 的持续含义。'
    },
    {
      id: 'Q04', block: '语法', level: 'B', openWeek: 7, knowledge: '定语从句 that / which / who',
      stem: '选择：I like music ______ I can dance to.  A. who  B. what  C. that  D. whose',
      answer: 'C',
      basisType: '语法规则',
      basis: '先行词 music 是物，从句缺宾语，用 that / which；who 指人，what 不引导定语从句。',
      trap: '看到"喜欢的东西"就误选 what。'
    },
    {
      id: 'Q05', block: '语法', level: 'B', openWeek: 8, knowledge: '主谓一致',
      stem: '用 be 动词的适当形式填空：The number of students in our school ______ over 1,000.',
      answer: 'is',
      basisType: '语法规则',
      basis: 'the number of + 复数名词作主语时，中心词 number 为单数，谓语用单数。',
      trap: '看到 students 就填 are，忽略真正的主语中心词。'
    },
    {
      id: 'Q06', block: '词汇运用', level: 'A', openWeek: 2, knowledge: '形式主语',
      stem: '用括号内所给词的适当形式填空：It is important for us ______ (learn) from mistakes.',
      answer: 'to learn',
      basisType: '固定搭配',
      basis: 'It is + 形容词 + for sb + to do 为形式主语结构，it 占位，真内容是后面的不定式。',
      trap: '误填 learning；或把 for 改成 of（此处形容词描述事情而非人的品性）。'
    },
    {
      id: 'Q07', block: '阅读', level: 'B', openWeek: 9, knowledge: '细节题回原文定位',
      stem: '【示意语篇】Last summer, Li Mei volunteered at a small library in her hometown. Every Saturday she read stories to children and helped them choose books. 问：Where did Li Mei volunteer last summer?',
      answer: 'At a small library in her hometown.',
      basisType: '原文定位句',
      basis: '原文定位句：Li Mei volunteered at a small library in her hometown.',
      trap: '凭印象答 school 或 community centre，未回原文定位。'
    },
    {
      id: 'Q08', block: '阅读', level: 'C', openWeek: 17, knowledge: '推断题找依据不臆测',
      stem: '【示意语篇】Tom used to leave all his homework until the last minute. This term he keeps a small notebook and writes down one task each evening. His teacher says his work is now handed in on time. 问：What can we infer about Tom?',
      answer: 'He has formed a habit of planning his work.',
      basisType: '原文定位句',
      basis: '依据句：he keeps a small notebook and writes down one task each evening 与 his work is now handed in on time。',
      trap: '臆测"他成绩全班第一"等原文没有的信息；推断必须有依据句。'
    },
    {
      id: 'Q09', block: '完形', level: 'B', openWeek: 17, knowledge: '上下文找复现与逻辑',
      stem: '【示意语篇】I was nervous before the speech. My teacher smiled and said, "Take a deep breath." Her ______ made me feel calm.  A. word  B. words  C. silence  D. question',
      answer: 'B',
      basisType: '上下文线索',
      basis: '上文 said 后出现直接引语，说明老师说了话，空格与"说的话"构成复现；且需用复数与 said 的内容对应。',
      trap: '只看空格所在句，不回看上文的 said；或误选 silence 与前文矛盾。'
    },
    {
      id: 'Q10', block: '阅读', level: 'B', openWeek: 9, knowledge: '词义猜测看上下文',
      stem: '【示意语篇】The old printer was so noisy that we replaced it with a new one. The new machine is quiet and much faster. 问：What does "replaced" most likely mean here?',
      answer: '换掉 / 用新的代替旧的',
      basisType: '上下文线索',
      basis: '线索：so noisy that ... with a new one 与下文 The new machine，构成旧去新来的对比。',
      trap: '按熟词硬套成"放回原处"，忽略对比线索。'
    },
    {
      id: 'Q11', block: '听力', level: 'A', openWeek: 1, knowledge: '听前预测',
      stem: '听前 30 秒：题目为 Where does the conversation take place? 请写出你会圈出的预判关键词，并说明空格需要什么词性的信息。',
      answer: '示例：圈 Where / take place；预判需要地点名词（如 library, hospital, restaurant）。',
      basisType: '上下文线索',
      basis: '疑问词 Where 指向地点，听中只需抓地点名词，不必听懂每个词。',
      trap: '听前不读题、听中试图逐词听懂，导致漏掉关键词。'
    },
    {
      id: 'Q12', block: '写作', level: 'B', openWeek: 2, knowledge: '作文自查清单（单三 / 用词）',
      stem: '按自查清单指出句中 2 处硬伤并改正（只改病处，不重写全文、不代写范文）：He go to school by bike every day and he very like English.',
      answer: 'go → goes（第三人称单数）；very like → likes ... very much / like ... a lot',
      basisType: '语法规则 + 固定搭配',
      basis: '主语 He 为第三人称单数，一般现在时动词加 -s；very 不直接修饰动词 like，用 like ... very much。',
      trap: '整篇重写、只改一处，或直接替学生写出一篇范文。'
    }
  ];

  /* ---------- 周测 / 模拟检测 ---------- */
  DATA.weeklyTest = {
    name: '周六周测（40 分钟）',
    items: ['20 词滚动听写（7 新 3 旧）', '1 段听力填空', '1 篇作文提纲（不给模板）', '1 篇任务型阅读（W09 起）'],
    rule: '三项各记正确率，不记总分排名；不承诺分数'
  };

  DATA.mocks = [
    { name: 'W01 基线诊断', when: 'W01 周六，不设达标线', items: ['小学词汇回补表抽 30 词汉→英', 'Unit 1 音频听写填空 1 段', '60 词无模板作文 1 篇', '一份卷按四大板块统计分项得分率'] },
    { name: '阶段测', when: '每 4 周一次', items: ['按听力 / 阅读 / 语言运用 / 书面表达四块统计得分率', '错因归类，不排名'] },
    { name: '限时套卷', when: 'W17 起', items: ['对齐 100 分钟 / 120 分结构', '答题节奏与检查顺序'] },
    { name: '考前保温卷', when: 'W26-W31', items: ['保温卷三套', '错题回炉', '作文稳稿'] }
  ];
  DATA.scoringNote = '评分建议【待核实：以本地最新评分标准为准】；只报四大板块分项得分率与错因归类，不做总分排名、不承诺分数。';

  /* ---------- 工具区 ---------- */
  DATA.tools = {
    sentenceBank: [
      { en: 'I think it is important to ...', ipa: '/aɪ θɪŋk ɪt ɪz ɪmˈpɔːtnt tuː/', cn: '我认为……是重要的。' },
      { en: 'First of all ... Secondly ... Finally ...', ipa: '/fɜːst əv ɔːl/ /ˈsekəndli/ /ˈfaɪnəli/', cn: '首先……其次……最后……' },
      { en: 'In my opinion, ...', ipa: '/ɪn maɪ əˈpɪnjən/', cn: '在我看来，……' }
    ],
    writingChecklist: ['要点是否齐全', '时态是否一致', '第三人称单数', '名词单复数', '拼写', '字数（60 词起步 → 80 词左右）', '至少 1 个衔接词'],
    writingRubric: ['语法错误', '用词不当', '中式英语', '衔接缺失', '要点遗漏'],
    upgradeDemo: '升格示范，供讲评参考：保留学生原意，只改 3 处最痛的问题，再升格 1 处衔接或从句。',
    wordbookRule: '只收错 2 次以上的词；按话题归类；不整表重抄。',
    recallRule: '复现节奏：当天 / 第 2 天 / 第 4 天 / 第 7 天 / 第 14 天；每次听写条固定掺 3 个旧词。',
    essayRule: '作文只给批改量表、逐句旁批与升格示范；不代写范文、不整卷代做。'
  };

  /* ---------- 【可直接印发】A4 导出清单 ---------- */
  DATA.printables = [
    { id: 'dictation', name: '每日 10 词滚动听写条', note: '7 新 3 旧，含中文提示与词形变化栏' },
    { id: 'weekly', name: '周六周测卷', note: '4 项组成，留白作答区' },
    { id: 'essay', name: '作文格纸与自查清单', note: '含 7 项自查，不含范文' },
    { id: 'wordcard', name: '错词卡', note: '按话题归类，含复现日期栏' },
    { id: 'unitwords', name: '单元词表', note: '示意词，实际按课本单元词表替换' },
    { id: 'analysis', name: '依据型解析讲义', note: '四栏：答案 / 依据类型 / 具体依据 / 易错提醒' },
    { id: 'stage', name: '阶段测卷', note: '四大板块分项统计栏' }
  ];

  /* ---------- 教师维护区默认值 ---------- */
  DATA.teacher = {
    minutes: { vocab: 8, listening: 10, writing: 5, spare: 2 },
    minutesNote: '每日约 25 分钟；按 W01 基线结果只调三线分钟配比，其余结构不动。',
    visibility: '学生：先显示思路与依据，提交后再显示答案；教师：全量可见',
    announcement: '【公告位】2027 年杭州市区中考通知约 2027 年 4 月发布；发布后在此核对题型分值与是否切换人机对话，只微调听力线。',
    toggles: ['阶段导航', '课本同步', '专题复习', '练测', '工具与交付'],
    examBlocks: [
      { name: '听力', full: 20 },
      { name: '阅读理解', full: 40 },
      { name: '语言运用', full: 40 },
      { name: '书面表达', full: 20 }
    ]
  };

  /* ---------- 适用边界与限制 ---------- */
  DATA.boundaries = [
    '需终端与网络；听力需耳机与安静环境，每周预留打印备份。',
    '纸笔默写、作文手写与卷面规范不能完全搬到线上，每日听写与作文初稿保留纸笔。',
    '作文自动评分不作依据，仍由教师按中考书面表达标准批改；只做批改、升格与模板提供，不代写范文。',
    '学生作业给思路、范例与同类题；答案与解析对教师端开放，不整卷代做。',
    '教师需先录入内容；W01 基线、每周错词、2027 年官方通知均需人工更新。',
    '超纲内容（虚拟语气、倒装、独立主格、复杂非谓语）不进题库，中考不作要求。',
    '省卷题型分值以官方真题卷为准；教材单元与附录页码以课本实物为准；政策以 2027 年杭州市区最新官方通知为准。',
    '面向单个学生或普通班中等偏弱分段，不是全校统一备考系统；不夸大应试承诺。',
    '本项目未引入账号体系与云后端（设计稿边界外），进度与错词保存在本机浏览器。'
  ];

  window.APP_DATA = DATA;
})();
