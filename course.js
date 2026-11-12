/* ============================================================
   错因驱动课程任务数据（course.js）
   来源：COURSE-CONTENT.md，三单元逐题结构化，可直接渲染与印发。
   边界：全部为原创示意题，非中考真题、非教材原文；不新增第七个功能区。
   字段说明见 COURSE-CONTENT.md 4.2「学习进度记录字段」。
   ============================================================ */
(function () {
  'use strict';

  /* 题目通用字段：
     id 题号 | skill 六技能 | type: choice/fill/evidence/open/self
     stem 真实题面 | options 选项 | answer 参考答案 | accept 可接受写法
     rule 判定规则 | basisType 依据类型 | basis 具体依据/原文定位句 | trap 易错提醒
     source 依据来源 | family 错因族 | hint 即时反馈话术 | attribution 归因句式
     variant 派发变式题号 | evidenceKeys 依据句须含的关键词 | selfCheck 自评勾选项
  */

  var SYS = '系统生成【待核实】';

  /* ---------------- 单元 A：L1 形式层 ---------------- */
  var A = {
    id: 'A', level: 'L1', week: 1, minutes: 40,
    title: '三单漏 -s 与词尾音义脱节',
    family: '形式层·三单漏 -s / 词尾音义脱节',
    goalText: '一般现在时第三人称单数与词尾听辨',
    goals: [
      '能写出含第三人称单数主语的一般现在时动词形式，正确率 ≥80%',
      '能听辨 /s/、/z/、/ɪz/ 词尾并复现，5 组中至少 4 组正确',
      '能回原文定位细节题的依据句，不凭印象作答',
      '能写出 5 句连段并自查三单，硬伤 ≤1 处'
    ],
    material: {
      title: 'My School Day',
      text: 'Li Ming is a Grade 9 student. He gets up at six thirty and walks to school. His first class starts at seven forty. He likes English best, because his teacher often tells stories in class. After school, he plays basketball with his friends. He does his homework before dinner. Every evening, he reads for twenty minutes and writes three new words in his notebook.'
    },
    words: [
      { w: 'grade', ipa: '/ɡreɪd/', cn: '年级' }, { w: 'start', ipa: '/stɑːt/', cn: '开始' },
      { w: 'walk', ipa: '/wɔːk/', cn: '步行' }, { w: 'because', ipa: '/bɪˈkɒz/', cn: '因为' },
      { w: 'often', ipa: '/ˈɒfn/', cn: '经常' }, { w: 'homework', ipa: '/ˈhəʊmwɜːk/', cn: '家庭作业' },
      { w: 'notebook', ipa: '/ˈnəʊtbʊk/', cn: '笔记本' }, { w: 'minute', ipa: '/ˈmɪnɪt/', cn: '分钟' }
    ],
    listeningScript: 'Li Ming gets up at six thirty. He walks to school with his friend Wang Lin. His first class starts at seven forty. After school, he plays basketball. In the evening, he reads for twenty minutes and writes three new words in his notebook.',
    diagnostics: [
      {
        id: 'A-D1', skill: '语法', type: 'fill',
        stem: '用所给词的适当形式填空：He ______ (get) up at six thirty every morning.',
        answer: 'gets', accept: ['gets'],
        rule: '答 get 即判定「形式层·三单漏 -s」',
        basisType: '语法规则',
        basis: '主语 He 为第三人称单数（白话：主语是 he / she / it 或一个人 / 物时，一般现在时动词加 -s）；every morning 提示一般现在时。',
        trap: '别只看到 every morning 就写原形，先看主语是谁。',
        source: SYS, family: '三单漏 -s',
        hint: '再看主语是谁：He / She / It 或一个人的时候，动词要加 -s。',
        attribution: '我把 ______ 当成复数主语了。', variant: 'A-B1'
      },
      {
        id: 'A-D2', skill: '听', type: 'choice',
        stem: '听辨：教师朗读 "He walks to school." 与 "They walk to school." 各一遍，两句动词是否相同？',
        options: ['A. 相同', 'B. 不同（walks / walk）'], answer: 'B',
        rule: '答「相同」判定「形式层·词尾音义脱节」',
        basisType: '语音知识点',
        basis: '/wɔːks/ 与 /wɔːk/ 的词尾 /s/ 是第三人称单数标记，两句动词形式不同。',
        trap: '听懂词义不等于听出词尾；词尾也承载语法信息。',
        source: SYS, family: '词尾音义脱节',
        hint: '跟读 /wɔːks/，注意词尾 /s/；听不出就先看着词读三遍再听。',
        attribution: '我听懂了词，但没听出词尾。', variant: 'A-B2'
      }
    ],
    items: [
      {
        id: 'A-V1', skill: '词汇', type: 'fill',
        stem: '看中文写英文：开始 ______；家庭作业 ______；笔记本 ______',
        answer: 'start / homework / notebook', accept: ['start homework notebook', 'start / homework / notebook', 'start, homework, notebook'],
        rule: '三词全对达标；拼写错误按「形式层·拼写」归因',
        basisType: '固定搭配', basis: '课本单元词表：start / homework / notebook。',
        trap: 'homework 不可数，不加 -s。', source: SYS, family: '拼写',
        hint: '按音节拆开拼：home-work、note-book。', attribution: '我把 ______ 拼成了 ______。', variant: 'A-B1'
      },
      {
        id: 'A-V2', skill: '词汇', type: 'fill',
        stem: '用所给词的适当形式填空：He ______ (walk) to school. They ______ (walk) to school.',
        answer: 'walks / walk', accept: ['walks walk', 'walks / walk', 'walks, walk'],
        rule: '第二空错判「过度推广 -s」',
        basisType: '语法规则', basis: 'He 单数加 -s；They 复数用原形。',
        trap: '不是所有句子都加 -s。', source: SYS, family: '过度推广 -s',
        hint: 'They / 复数主语后面不加 -s，只有单数第三人称才加。',
        attribution: '我把 -s 加到了复数主语后面。', variant: 'A-B3'
      },
      {
        id: 'A-V3', skill: '词汇', type: 'open',
        stem: '下面这句错在哪一步？只写一句：He get up at six.',
        answer: '主语 He 是第三人称单数，动词 get 未加 -s，应改为 gets。',
        rule: '须点出「主语 He + 动词未加 -s」；只写「错了」不算通过',
        basisType: '语法规则', basis: '一般现在时第三人称单数动词加 -s。',
        trap: '要说到「哪一步」错，不能只判断对错。', source: SYS, family: '三单漏 -s',
        hint: '按「主语 → 时态 → 动词形式」三步说出错的位置。',
        attribution: '我只看出了错，没说清错在哪一步。', variant: 'A-B1',
        selfCheck: ['我指出了主语 He 是第三人称单数', '我指出了动词未加 -s', '我写出了正确形式 gets']
      },
      {
        id: 'A-G1', skill: '语法', type: 'choice',
        stem: '选择：His first class ______ at seven forty. A. start  B. starts  C. starting  D. started',
        options: ['A', 'B', 'C', 'D'], answer: 'B',
        rule: '选 D 归「时态选择」；选 C 归「非谓语误用」；选 A 归「三单漏 -s」',
        basisType: '语法规则', basis: '主语 His first class 为单数，seven forty 为日常作息，用一般现在时 starts。',
        trap: '看到具体时刻别立刻选过去时，作息描述用一般现在时。', source: SYS, family: '三单漏 -s',
        hint: '再看主语是谁：His first class 是「一节课」，属于单数。',
        attribution: '我把 ______ 当成了 ______。', variant: 'A-B1'
      },
      {
        id: 'A-G2', skill: '语法', type: 'fill',
        stem: '改错（只改病处）：He like English best.',
        answer: 'likes', accept: ['likes', 'like → likes'],
        rule: '整句重写不算通过，只改病处', basisType: '语法规则',
        basis: '主语 He 第三人称单数 → like 加 -s。', trap: '改一处即可，别重写整句。',
        source: SYS, family: '三单漏 -s', hint: '只圈出动词那一个词改。',
        attribution: '我没看清「只改病处」的要求。', variant: 'A-B1'
      },
      {
        id: 'A-G3', skill: '语法', type: 'fill',
        stem: '用 He 改写句子：I read for twenty minutes every evening.',
        answer: 'He reads for twenty minutes every evening.',
        accept: ['He reads for twenty minutes every evening.', 'he reads for twenty minutes every evening'],
        rule: '两处变化（主语 + 动词）缺一扣一半',
        basisType: '语法规则', basis: '换主语必须同步换动词形式：I read → He reads。',
        trap: '只换主语不换动词，是最常见的漏改。', source: SYS, family: '三单漏 -s',
        hint: '改完再读一遍：主语和动词要成对变化。',
        attribution: '我只改了主语，忘了改动词。', variant: 'A-B1'
      },
      {
        id: 'A-H1', skill: '听', type: 'self',
        stem: '听前 30 秒：题目为 "What time does Li Ming\'s first class start?" 圈出预判关键词，并写出需要什么词性的信息。',
        answer: '圈 What time / start；写出「时间数字」即通过',
        rule: '不读题直接听按「无预测」归因', basisType: '学习策略',
        basis: '疑问词 What time 指向时间信息，听中只需抓数字。',
        trap: '不用听懂每个词，先决定听什么。', source: SYS, family: '无预测',
        hint: '先读题，圈疑问词，再决定听什么；不用听懂每个词。',
        attribution: '我没读题就直接听了。', variant: 'A-H1',
        selfCheck: ['我圈出了 What time 或 start', '我写出了要抓的是「时间 / 数字」', '我在听音前完成，不是听完补写']
      },
      {
        id: 'A-H2', skill: '听', type: 'fill',
        stem: '听中填空（脚本不展示）：Li Ming gets up at ______. He ______ to school. His first class ______ at 7:40.',
        answer: '6:30 / walks / starts', accept: ['6:30 walks starts', 'six thirty walks starts', '6:30 / walks / starts', 'six thirty / walks / starts'],
        rule: '数字对但漏 -s 判错，归「词尾音义脱节」',
        basisType: '原文定位句', basis: '听力脚本：He walks to school... His first class starts at seven forty.',
        trap: '填空里两个动词都带 -s，别只填数字。', source: SYS, family: '词尾音义脱节',
        hint: '听完后按「主语是单数」复查每个动词词尾。',
        attribution: '我听懂了词，但没听出词尾。', variant: 'A-B2'
      },
      {
        id: 'A-S1', skill: '说', type: 'self',
        stem: '跟读对比：/wɔːks/ — /wɔːk/、/stɑːts/ — /stɑːt/、/ˈrɪdz/ — /riːd/，各读两遍。',
        answer: '同伴听评，能复现词尾 /s/ 或 /z/ 打勾',
        rule: '不用机器评分；口语题不输出分数',
        basisType: '语音知识点', basis: '词尾 /s/ /z/ /ɪz/ 是单数标记，须读出区别。',
        trap: '读得快不等于读对，词尾不能吞。', source: SYS, family: '词尾音义脱节',
        hint: '先放慢读词尾，再连回整句。', attribution: '我读的时候把词尾吞掉了。', variant: 'A-B2',
        selfCheck: ['三组都各读了两遍', '同伴听出 /s/ 与 /z/ 的差别', '我能自己复现词尾，不靠看词']
      },
      {
        id: 'A-S2', skill: '说', type: 'self',
        stem: '情景问答：教师问 "What does Li Ming do after school?" 学生口头作答。',
        answer: 'He plays basketball with his friends.（须含 plays）',
        rule: '漏 -s 不算通过，重说一次后再记；不用机器评分',
        basisType: '原文定位句', basis: 'After school, he plays basketball with his friends.',
        trap: '口头最容易漏 -s，说完自己复听一遍。', source: SYS, family: '三单漏 -s',
        hint: '说完补一句自查：主语 He，动词加 -s 了吗？',
        attribution: '我说话时没检查动词词尾。', variant: 'A-B1',
        selfCheck: ['我用完整句作答，不是只说 basketball', '动词用了 plays（含 -s）', '同伴听评通过']
      },
      {
        id: 'A-R1', skill: '读', type: 'evidence',
        stem: '细节题：What time does Li Ming\'s first class start? 并写出原文定位句。',
        answer: 'At seven forty. 定位句：His first class starts at seven forty.',
        rule: '缺定位句不算通过', evidenceKeys: ['seven forty', '7:40', 'starts at'],
        basisType: '原文定位句', basis: 'His first class starts at seven forty.',
        trap: '凭印象写时间，不回原文，属于无效作答。', source: SYS, family: '未回原文定位',
        hint: '先回原文找 start 所在句，再抄依据句。',
        attribution: '我没回原文找依据句。', variant: 'A-R2'
      },
      {
        id: 'A-R2', skill: '读', type: 'evidence',
        stem: '细节题：Why does he like English best? 写出依据句。',
        answer: 'Because his teacher often tells stories in class. 定位句：He likes English best, because his teacher often tells stories in class.',
        rule: '缺依据句不算通过', evidenceKeys: ['because', 'tells stories'],
        basisType: '原文定位句', basis: 'He likes English best, because his teacher often tells stories in class.',
        trap: 'Why 问原因，依据句里通常有 because。', source: SYS, family: '未回原文定位',
        hint: '在原文里找 because，把它后面那半句抄下来。',
        attribution: '我用自己的话概括了，没抄依据句。', variant: 'A-R2'
      },
      {
        id: 'A-R3', skill: '读', type: 'open',
        stem: '词义猜测：文中 "writes three new words in his notebook" 的 notebook 最可能指什么？写出上下文线索。',
        answer: '本子 / 记录本；线索：writes ... in 与上文 reads、new words。',
        rule: '按熟词硬套不算通过；须写出上下文线索',
        basisType: '上下文线索', basis: 'writes ... in 说明是可写东西的物品；reads / new words 提示与学习记录有关。',
        trap: '不要只写中文意思，要写「凭什么猜出来」。', source: SYS, family: '未用上下文线索',
        hint: '找动作 writes 与地点 in，再联系前后的 reads、new words。',
        attribution: '我直接按印象猜，没找上下文线索。', variant: 'A-R3',
        selfCheck: ['我写出了 notebook 的意思', '我写出了至少一处上下文线索', '我没有用「看着像」当理由']
      },
      {
        id: 'A-W1', skill: '写', type: 'fill',
        stem: '病句改错（只改病处、不重写全文）：He get up at six. He like English. He play basketball after school.',
        answer: 'gets / likes / plays',
        accept: ['gets likes plays', 'gets / likes / plays', 'gets, likes, plays'],
        rule: '三处各 1 分；整篇重写不算通过',
        basisType: '语法规则', basis: '三句主语均为 He，动词各加 -s / -es。',
        trap: 'play 加 -s，不是 -es；go / watch 才加 -es。', source: SYS, family: '三单漏 -s',
        hint: '一句一句看主语，只圈动词那一处改。',
        attribution: '我漏改了第 ______ 句。', variant: 'A-B1'
      },
      {
        id: 'A-W2', skill: '写', type: 'open',
        stem: '连段任务：以 He 作主语写「他的一天」5 句，不给范文；自查清单：三单、时态一致、拼写、字数、至少 1 个衔接词。',
        answer: '不设唯一答案，按判定规则验收（不代写范文）',
        rule: '5 句齐全 + 三单硬伤 ≤1 处 + 至少 1 个衔接词 → 通过；未通过只改 3 处最痛的，交第 2 稿',
        basisType: '评分量表', basis: '要点与自查清单见题面；由教师按中考书面表达标准批阅。',
        trap: '不提供范文，不整卷代做；只改 3 处。', source: SYS, family: '要点遗漏',
        hint: '对照 5 项自查清单逐项打勾，缺哪项补哪项。',
        attribution: '我漏了 ______ 自查项。', variant: 'A-W2',
        selfCheck: ['我写满 5 句', '每句主语 He 对应动词都加了 -s', '全文时态一致', '我用了至少 1 个衔接词（first / then / so 等）', '我按清单自查过一遍']
      }
    ],
    variants: [
      {
        id: 'A-B1', skill: '语法', type: 'fill', from: '三单漏 -s',
        stem: 'My sister ______ (watch) TV every evening.', answer: 'watches', accept: ['watches'],
        rule: '一次答对即通过；换主语、换动词、加 -es',
        basisType: '语法规则', basis: 'My sister 单数第三人称，watch 以 ch 结尾加 -es。',
        trap: '不是简单加 -s，ch 结尾加 -es。', source: SYS, family: '三单漏 -s',
        hint: '主语是「一个人」，watches 别漏 -es。', attribution: '我把 ______ 当成了 ______。', move: '换主语 / 换动词 / 加 -es'
      },
      {
        id: 'A-B2', skill: '听', type: 'choice', from: '词尾音义脱节',
        stem: '听辨：教师读 "She watches TV." / "They watch TV."，圈出听到的词尾。第一句词尾是？',
        options: ['A. /ɪz/', 'B. 无词尾'], answer: 'A',
        rule: '一次答对即通过；换词、换词尾读音',
        basisType: '语音知识点', basis: 'watches 词尾读 /ɪz/；watch 无词尾。',
        trap: '/ɪz/ 是一个音节，别漏。', source: SYS, family: '词尾音义脱节',
        hint: '先跟读 watches 两遍，再听辨。', attribution: '我没听出词尾的 /ɪz/。', move: '换词 / 换词尾读音'
      },
      {
        id: 'A-B3', skill: '写', type: 'open', from: '过度推广 -s',
        stem: '把主题材料前三句的 He 全部改成 They，写出改动后的 3 句。',
        answer: 'gets→get, walks→walk, starts→start（三处改动全对）',
        rule: '三处改动全对通过；反向迁移',
        basisType: '语法规则', basis: '复数主语后动词用原形。',
        trap: '三句都要改，别只改第一句。', source: SYS, family: '过度推广 -s',
        hint: '一句一句划掉 He 换成 They，再逐个去掉 -s。',
        attribution: '我漏改了第 ______ 句。', move: '反向迁移 / 新语境',
        selfCheck: ['三句都写了', 'gets / walks / starts 三处都改对', '没有误改其他词']
      }
    ],
    reviews: [
      { at: 'D0', items: 'A-D1 / A-G1 / A-H2', action: '原题入库五项字段 + 写归因', pass: '归因填写完整' },
      { at: 'D2', items: 'A-B1', action: '同错因变式', pass: '一次答对' },
      { at: 'D4', items: 'A-B2 + A-S1', action: '变式 + 跟读', pass: '听辨 4/5 组正确' },
      { at: 'D7', items: 'A-B3', action: '新语境（My sister\'s day）', pass: '三处改动全对' },
      { at: 'D14', items: 'A-G2 同类', action: '混入周测 20 词听写条与 1 道语法填空', pass: '正确率 ≥80%' }
    ],
    feedback: [
      { family: '三单漏 -s', hint: '再看主语是谁：He / She / It 或一个人的时候，动词要加 -s。', attr: '我把 ______ 当成复数主语了。', variant: 'A-B1' },
      { family: '词尾音义脱节', hint: '跟读 /wɔːks/，注意词尾 /s/；听不出就先看着词读三遍再听。', attr: '我听懂了词，但没听出词尾。', variant: 'A-B2' },
      { family: '过度推广 -s', hint: 'They / 复数主语后面不加 -s，只有单数第三人称才加。', attr: '我把 -s 加到了复数主语后面。', variant: 'A-B3' },
      { family: '无预测', hint: '先读题，圈疑问词，再决定听什么；不用听懂每个词。', attr: '我没读题就直接听了。', variant: 'A-H1' }
    ]
  };

  /* ---------------- 单元 B：L2 句法层 ---------------- */
  var B = {
    id: 'B', level: 'L2', week: 2, minutes: 40,
    title: '宾语从句疑问语序受汉语干扰、听前不预测',
    family: '句法层·汉语疑问语序干扰 / 听前不预测',
    goalText: '宾语从句陈述语序与听前预测',
    goals: [
      '能写出含陈述语序的宾语从句，3 句中至少 3 句语序正确',
      '能区分 borrow / lend / keep 并正确填空，3 题全对',
      '能在听前圈出疑问词并预判所需信息词性，2 题均完成',
      '能写出 3 句问路 / 求助，功能句与从句语序均无误'
    ],
    material: {
      title: 'Asking for Help',
      text: 'A: Excuse me, could you tell me where the library is?\nB: Sure. It\'s next to the science building.\nA: Do you know if it opens at eight?\nB: Yes, but I\'m not sure when the reading room closes.\nA: Thanks. I wonder whether I can borrow two books today.\nB: I think you can. The library closes at five thirty.'
    },
    readingText: {
      title: 'A Good Question',
      text: 'Last month, our teacher asked us to write down one question before each English class. At first, I wrote "I don\'t know the word". My teacher said, "Tell me where you saw it." So I began to copy the sentence, not just the word. Now I can often guess a new word from the sentences around it. My notebook is full of sentences, not single words.'
    },
    words: [
      { w: 'library', ipa: '/ˈlaɪbrəri/', cn: '图书馆' }, { w: 'science', ipa: '/ˈsaɪəns/', cn: '科学' },
      { w: 'building', ipa: '/ˈbɪldɪŋ/', cn: '建筑物' }, { w: 'borrow', ipa: '/ˈbɒrəʊ/', cn: '借入' },
      { w: 'lend', ipa: '/lend/', cn: '借出' }, { w: 'keep', ipa: '/kiːp/', cn: '借用（多久）' },
      { w: 'whether', ipa: '/ˈweðə/', cn: '是否' }, { w: 'wonder', ipa: '/ˈwʌndə/', cn: '想知道' },
      { w: 'excuse me', ipa: '/ɪkˈskjuːz miː/', cn: '劳驾' }, { w: 'next to', ipa: '/nekst tuː/', cn: '在……旁边' }
    ],
    listeningScript: 'Excuse me, could you tell me where the library is? It\'s next to the science building. It opens at eight in the morning and closes at five thirty in the afternoon. You can borrow two books today. The reading room is on the second floor.',
    diagnostics: [
      {
        id: 'B-D1', skill: '语法', type: 'choice',
        stem: '选择：Could you tell me ______? A. where is the library  B. where the library is  C. where the library was  D. where was the library',
        options: ['A', 'B', 'C', 'D'], answer: 'B',
        rule: '选 A / D 判「句法层·汉语疑问语序干扰」；选 C 判「时态不一致」',
        basisType: '语法规则',
        basis: '宾语从句（白话：整句放另一句里当宾语）用陈述语序；could 在此表委婉语气，不指过去，问现在的地点仍用 is。',
        trap: '别把 could 看成过去时。', source: SYS, family: '汉语疑问语序干扰',
        hint: '从句里主语在前、be 动词在后，别把 is 提到前面去。',
        attribution: '我把汉语的「在哪」直接搬进从句了。', variant: 'B-B1'
      },
      {
        id: 'B-D2', skill: '听', type: 'self',
        stem: '听前 30 秒：题目为 "When does the library close?" 先在预测栏写下要抓的信息，再开始听录音。',
        answer: '写「时间 / 数字」即放行',
        rule: '预测栏空白即判「无预测」，不放行听音',
        basisType: '学习策略', basis: '疑问词 When 指向时间信息。',
        trap: '没写预测不能开始听。', source: SYS, family: '无预测',
        hint: '先读题圈疑问词，再决定听什么，不用听懂每个词。',
        attribution: '我没读题就听了。', variant: 'B-H1',
        selfCheck: ['我圈出了 When 或 close', '我写出要抓「时间 / 数字」', '我在听音前完成预测']
      }
    ],
    items: [
      {
        id: 'B-V1', skill: '词汇', type: 'fill',
        stem: '固定搭配填空：Could you ______ me where ...? / Do you ______ if ...? / I ______ whether ...',
        answer: 'tell / know / wonder',
        accept: ['tell know wonder', 'tell / know / wonder', 'tell, know, wonder'],
        rule: '错一空按「搭配混淆」归因', basisType: '固定搭配',
        basis: 'tell me / Do you know / I wonder 为固定功能句。',
        trap: '三个动词不能互换。', source: SYS, family: '搭配混淆',
        hint: '按「请求—询问—想知道」三个功能记。',
        attribution: '我把 ______ 和 ______ 弄混了。', variant: 'B-V2'
      },
      {
        id: 'B-V2', skill: '词汇', type: 'fill',
        stem: '选词填空（borrow / lend / keep）：Can I ______ two books? I can ______ you mine. How long can I ______ it?',
        answer: 'borrow / lend / keep',
        accept: ['borrow lend keep', 'borrow / lend / keep', 'borrow, lend, keep'],
        rule: '3 题全对通过', basisType: '固定搭配',
        basis: 'borrow 借入、lend 借出、keep 借多久，三者方向不同。',
        trap: 'How long 问时长，只能用 keep。', source: SYS, family: '搭配混淆',
        hint: 'borrow 借入、lend 借出、keep 借多久，先看方向。',
        attribution: '我把借入和借出弄反了。', variant: 'B-V2'
      },
      {
        id: 'B-V3', skill: '词汇', type: 'fill',
        stem: '写出复数与职业名词：library → ______（复数）；science → ______（研究科学的人）',
        answer: 'libraries / scientist',
        accept: ['libraries scientist', 'libraries / scientist', 'libraries, scientist'],
        rule: '两空全对通过', basisType: '构词法',
        basis: '辅音字母 + y 变 ies；后缀 -ist 表「从事……的人」。',
        trap: 'library 不是加 -s。', source: SYS, family: '词形变化错',
        hint: '先看词尾是辅音 + y，再想 -ist。',
        attribution: '我没看词尾就加了 -s。', variant: 'B-B2'
      },
      {
        id: 'B-G1', skill: '语法', type: 'choice',
        stem: '选择：Do you know ______? A. when does the reading room close  B. when the reading room closes  C. when the reading room close',
        options: ['A', 'B', 'C'], answer: 'B',
        rule: '选 A 判语序错；选 C 判三单漏 -s',
        basisType: '语法规则', basis: '陈述语序 + 主语 the reading room 为单数，谓语加 -s。',
        trap: '语的同时别忘动词形式。', source: SYS, family: '汉语疑问语序干扰',
        hint: '语序对了还要看主语单复数：the reading room 是单数。',
        attribution: '我只顾改语序，忘了检查动词。', variant: 'B-B2'
      },
      {
        id: 'B-G2', skill: '语法', type: 'fill',
        stem: '改错（只改病处）：I don\'t know where is the science building.',
        answer: 'where the science building is',
        accept: ['where the science building is', 'I don\'t know where the science building is.'],
        rule: '整句重写不算通过', basisType: '语法规则',
        basis: '宾语从句用陈述语序：主语 + be。', trap: '只调换 is 的位置。',
        source: SYS, family: '汉语疑问语序干扰',
        hint: '把 is 挪到 the science building 后面。',
        attribution: '我把 is 留在了主语前面。', variant: 'B-B1'
      },
      {
        id: 'B-G3', skill: '语法', type: 'fill',
        stem: '合并成一句：Where is the library? + Could you tell me ...?',
        answer: 'Could you tell me where the library is?',
        accept: ['Could you tell me where the library is?', 'could you tell me where the library is?'],
        rule: '语序与标点均正确通过', basisType: '语法规则',
        basis: '疑问句并入宾语从句后改陈述语序，句末随主句用问号。',
        trap: '合并后从句里不能再留疑问语序。', source: SYS, family: '汉语疑问语序干扰',
        hint: '先写主句 Could you tell me，再把从句改成陈述语序。',
        attribution: '我把两个句子直接拼在一起了。', variant: 'B-B1'
      },
      {
        id: 'B-H1', skill: '听', type: 'self',
        stem: '听前预测：题目 "When does the library close?" 圈关键词并写出需要什么词性的信息。',
        answer: '圈 When / close，写「时间数字」通过',
        rule: '未写预测不放行听音', basisType: '学习策略',
        basis: 'When 指向时间，听中只抓数字。', trap: '预测要写在听音之前。',
        source: SYS, family: '无预测',
        hint: '先读题圈疑问词，再决定听什么。',
        attribution: '我没读题就听了。', variant: 'B-H1',
        selfCheck: ['我圈出了 When 或 close', '我写出要抓「时间 / 数字」', '我在听音前完成']
      },
      {
        id: 'B-H2', skill: '听', type: 'fill',
        stem: '听中填空：The library is next to the ______ ______. It opens at ______ and closes at ______ ______. You can borrow ______ books.',
        answer: 'science building / eight / five thirty / two',
        accept: ['science building eight five thirty two', 'science building / eight / five thirty / two', 'science building 8 5:30 two', 'science building / 8 / 5:30 / 2'],
        rule: '数字对、名词拼写错按「形式层」归因',
        basisType: '原文定位句', basis: '听力脚本：It\'s next to the science building. It opens at eight... closes at five thirty... You can borrow two books today.',
        trap: 'five thirty 是两个词，别写成一个数字串就完事。', source: SYS, family: '词尾音义脱节',
        hint: '听前先数清有几个空，判断每空的词性。',
        attribution: '我没预判空格的词性。', variant: 'B-H1'
      },
      {
        id: 'B-S1', skill: '说', type: 'self',
        stem: '跟读：Could you tell me where the library is? 从句部分用陈述语序、句末降调。',
        answer: '同伴听评，不把 is 提前；不用机器评分',
        rule: '口语题不输出机器分数', basisType: '语音知识点',
        basis: '陈述语序 where the library is；礼貌问句句末降调。',
        trap: '一紧张就把 is 提到前面。', source: SYS, family: '汉语疑问语序干扰',
        hint: '先把 the library is 连读三遍，再套进整句。',
        attribution: '我口语里把 is 提前了。', variant: 'B-B1',
        selfCheck: ['从句是 the library is，不是 is the library', '句末用降调', '同伴听评通过']
      },
      {
        id: 'B-S2', skill: '说', type: 'self',
        stem: '情景问答：向新同学问路，用 Could you tell me ... 与 Do you know if ... 各说一句。',
        answer: '两句均为陈述语序、功能句完整',
        rule: '漏一项重说一次；不用机器评分', basisType: '功能句',
        basis: 'Could you tell me where ... is? / Do you know if ...?',
        trap: '两个功能句都要说到。', source: SYS, family: '汉语疑问语序干扰',
        hint: '一句问地点，一句问是否，说完自查语序。',
        attribution: '我漏了第 ______ 个功能句。', variant: 'B-B1',
        selfCheck: ['两句都说了', '两句从句都是陈述语序', '同伴听评通过']
      },
      {
        id: 'B-R1', skill: '读', type: 'evidence',
        stem: '细节题：What did the writer write at first? 写出原文定位句。',
        answer: '"I don\'t know the word". 定位句：At first, I wrote "I don\'t know the word".',
        rule: '缺定位句不算通过', evidenceKeys: ['at first', 'don\'t know the word'],
        basisType: '原文定位句', basis: 'At first, I wrote "I don\'t know the word".',
        trap: '注意 At first，不是 Now。', source: SYS, family: '未回原文定位',
        hint: '找 At first 那句，整句抄下来。',
        attribution: '我把 Now 的内容当成 At first 了。', variant: 'B-R2'
      },
      {
        id: 'B-R2', skill: '读', type: 'evidence',
        stem: '推断题：What can we infer about the writer now? 必须圈出依据句。',
        answer: 'He / She can guess new words from sentences. 依据句：Now I can often guess a new word from the sentences around it.',
        rule: '答「考了满分」等原文无据内容判「臆测」，不放行后续阅读题',
        evidenceKeys: ['guess a new word', 'sentences around it', 'now i can'],
        basisType: '原文定位句', basis: 'Now I can often guess a new word from the sentences around it.',
        trap: '文中没说的不能加。', source: SYS, family: '臆测',
        hint: '推断必须圈出原文依据句，文中没说的不能加。',
        attribution: '我按自己的想象补了信息。', variant: 'B-B2'
      },
      {
        id: 'B-R3', skill: '读', type: 'open',
        stem: '词义猜测："the sentences around it" 中 around 的意思，并写出上下文线索。',
        answer: '在……周围 / 上下文；线索 sentences 与 guess a new word。',
        rule: '须写出上下文线索', basisType: '上下文线索',
        basis: 'guess a new word 需借助前后句子，故 around 指「在它周围」。',
        trap: '别只写「附近」，要说清在文中指什么。', source: SYS, family: '未用上下文线索',
        hint: '想想猜生词时要看哪些句子。',
        attribution: '我没联系上下文就选了常用义。', variant: 'B-R3',
        selfCheck: ['我写出了 around 在文中的意思', '我写出了上下文线索', '线索来自原文而非印象']
      },
      {
        id: 'B-W1', skill: '写', type: 'fill',
        stem: '病句改错（只改病处）：Could you tell me where is the library? I don\'t know when does it open.',
        answer: 'where the library is / when it opens',
        accept: ['where the library is when it opens', 'where the library is / when it opens'],
        rule: '两处各 1 分', basisType: '语法规则',
        basis: '两处均为宾语从句，须用陈述语序；第二处主语 it 为单数用 opens。',
        trap: '第二句除了语序还要去 does、动词加 -s。', source: SYS, family: '汉语疑问语序干扰',
        hint: '去掉 does 后，动词要自己背 -s。',
        attribution: '我改了语序但忘了动词形式。', variant: 'B-B1'
      },
      {
        id: 'B-W2', skill: '写', type: 'open',
        stem: '连段任务：写 3 句询问学校设施，分别用 Could you tell me ... / Do you know if ... / I wonder whether ...；不给范文。',
        answer: '不设唯一答案，按判定规则验收（不代写范文）',
        rule: '3 句齐全 + 从句语序全对 + 至少 1 个功能句 → 通过',
        basisType: '评分量表', basis: '要点与功能句见题面；由教师按书面表达标准批阅。',
        trap: '不提供范文、不整卷代做。', source: SYS, family: '要点遗漏',
        hint: '一句一句对照三个功能句，写完自查从句语序。',
        attribution: '我漏了 ______ 功能句。', variant: 'B-W2',
        selfCheck: ['我写满 3 句', '分别用了三个指定功能句', '每句从句都是陈述语序', '我自查过一遍再交']
      }
    ],
    variants: [
      {
        id: 'B-B1', skill: '语法', type: 'choice', from: '汉语疑问语序干扰',
        stem: '选择：I wonder ______. A. where does he live  B. where he lives',
        options: ['A', 'B'], answer: 'B',
        rule: '一次答对即通过；换引导词、换主语、换动词',
        basisType: '语法规则', basis: '宾语从句陈述语序，主语 he 单数用 lives。',
        trap: '别把 does 带进从句。', source: SYS, family: '汉语疑问语序干扰',
        hint: '从句里主语在前，动词自己带 -s。', attribution: '我又把疑问语序搬进来了。', move: '换引导词 / 换主语 / 换动词'
      },
      {
        id: 'B-B2', skill: '语法', type: 'fill', from: '时态不一致 / 三单',
        stem: '用所给词的适当形式填空：Do you know if the reading room ______ (close) at five?',
        answer: 'closes', accept: ['closes'],
        rule: '一次答对即通过；同时考从句语序与三单',
        basisType: '语法规则', basis: 'the reading room 单数，一般现在时 closes。',
        trap: 'if 在这里是「是否」，不是条件状语从句。', source: SYS, family: '时态不一致',
        hint: 'if 表「是否」时，后面照常用陈述句。', attribution: '我把 if 当成「如果」了。', move: '换语境 / 复合考点'
      },
      {
        id: 'B-B3', skill: '写', type: 'open', from: '汉语疑问语序干扰',
        stem: '换话题：把问路对话改成问「借书规则」，写出 2 句宾语从句。',
        answer: '不设唯一答案；语序正确 + 引导词合适 + 意思通顺',
        rule: '判定规则验收，不设唯一答案', basisType: '评分量表',
        basis: '须含 2 句宾语从句且语序正确；话题为借书规则。',
        trap: '换话题不换错因，仍考语序。', source: SYS, family: '汉语疑问语序干扰',
        hint: '把 where 换成 whether / how long 试试。',
        attribution: '我换了话题就忘了检查语序。', move: '换话题迁移',
        selfCheck: ['我写了 2 句', '两句都是宾语从句且陈述语序', '话题是借书规则']
      }
    ],
    reviews: [
      { at: 'D0', items: 'B-D1 / B-G1 / B-H2', action: '原题入库五项字段 + 写归因', pass: '归因填写完整' },
      { at: 'D2', items: 'B-B1', action: '同错因变式', pass: '一次答对' },
      { at: 'D4', items: 'B-B2 + B-V2', action: '变式 + 搭配回炉', pass: '3 题全对' },
      { at: 'D7', items: 'B-B3', action: '新语境 2 句宾语从句', pass: '语序与引导词均对' },
      { at: 'D14', items: 'B-G2 同类', action: '混入周测语法填空 1 题 + 听力填空 1 段', pass: '正确率 ≥80%' }
    ],
    feedback: [
      { family: '汉语疑问语序干扰', hint: '从句里主语在前、be 动词在后，别把 is 提到前面去。', attr: '我把汉语的「在哪」直接搬进从句了。', variant: 'B-B1' },
      { family: '时态不一致', hint: 'could 在这里是委婉语气，不是过去时；问现在的地点仍用 is。', attr: '我把 could 当成过去时了。', variant: 'B-B2' },
      { family: '搭配混淆', hint: 'borrow 借入、lend 借出、keep 借多久，先看方向。', attr: '我把借入和借出弄反了。', variant: 'B-V2' },
      { family: '无预测', hint: '先读题圈疑问词，再决定听什么，不用听懂每个词。', attr: '我没读题就听了。', variant: 'B-H1' }
    ]
  };

  /* ---------------- 单元 C：L3 语篇层 ---------------- */
  var C = {
    id: 'C', level: 'L3', week: 3, minutes: 45,
    title: '阅读推断臆测、被动词形变化、写作要点遗漏',
    family: '语篇层·推断臆测 / 被动词形 / 要点遗漏',
    goalText: '被动语态、推断依据与要点覆盖',
    goals: [
      '能写出一般现在 / 过去时的被动语态形式，3 题全对',
      '做推断题时能圈出原文依据句，2 题均不臆测',
      '能按 5 项要点清单写 5 句连段，要点覆盖 5/5',
      '能口头复述一处变化，含 3 处完整被动结构'
    ],
    material: {
      title: 'A Change in Our Town',
      text: 'Ten years ago, the old bridge was the only way across the river. It was built in 1980 and was closed in 2018 because it was too narrow. In 2020, a new bridge was opened. Now two buses can cross it at the same time. Many people say the trip to the market takes fifteen minutes instead of forty. "I used to leave home before six," says Mrs Wang. "Now I can leave at seven."'
    },
    words: [
      { w: 'bridge', ipa: '/brɪdʒ/', cn: '桥' }, { w: 'narrow', ipa: '/ˈnærəʊ/', cn: '狭窄的' },
      { w: 'wide', ipa: '/waɪd/', cn: '宽的' }, { w: 'cross', ipa: '/krɒs/', cn: '穿过' },
      { w: 'market', ipa: '/ˈmɑːkɪt/', cn: '市场' }, { w: 'daily', ipa: '/ˈdeɪli/', cn: '日常的' },
      { w: 'instead of', ipa: '/ɪnˈsted əv/', cn: '而不是' }, { w: 'used to', ipa: '/juːst tuː/', cn: '过去常常' }
    ],
    listeningScript: 'Here is the news about the new bridge. The old bridge was built in 1980. It was closed in 2018 because it was too narrow. The new bridge was opened in 2020. Now the trip to the market takes fifteen minutes instead of forty.',
    diagnostics: [
      {
        id: 'C-D1', skill: '语法', type: 'choice',
        stem: '选择：The old bridge ______ in 1980. A. built  B. was built  C. builds',
        options: ['A', 'B', 'C'], answer: 'B',
        rule: '选 A 判「语篇层·主动/被动混淆」',
        basisType: '语法规则',
        basis: '被动语态（白话：不必说谁做的，用 be + 过去分词）；桥是被建的，1980 用过去时 was built。',
        trap: '桥不能自己建自己。', source: SYS, family: '主动/被动混淆',
        hint: '先看主语是做事的还是被做的：桥不能自己建自己，用 be + 过去分词。',
        attribution: '我把桥当成动作发出者了。', variant: 'C-B1'
      },
      {
        id: 'C-D2', skill: '读', type: 'evidence',
        stem: '推断题：What can we infer about the old bridge? 写出答案并圈出依据句。',
        answer: 'It was too narrow, so it was closed in 2018. 依据句：It was built in 1980 and was closed in 2018 because it was too narrow.',
        rule: '答「很漂亮 / 很受欢迎」等原文无据内容判「臆测」，不放行后续阅读题',
        evidenceKeys: ['narrow', 'closed in 2018', 'too narrow'],
        basisType: '原文定位句', basis: 'It was built in 1980 and was closed in 2018 because it was too narrow.',
        trap: '推断只能是原文信息的合理转换，不能加新信息。', source: SYS, family: '臆测',
        hint: '推断必须圈出原文依据句，文中没说的不能加。',
        attribution: '我按自己的想象补了信息。', variant: 'C-B2'
      }
    ],
    items: [
      {
        id: 'C-V1', skill: '词汇', type: 'fill',
        stem: '写出词形链：build → ______ → was ______；close → ______ → was ______',
        answer: 'built / built；closed / closed',
        accept: ['built built closed closed', 'built / built / closed / closed', 'built built; closed closed'],
        rule: '不规则与规则变化各 1 分', basisType: '词形变化',
        basis: 'build–built–built 为不规则变化；close–closed–closed 为规则变化。',
        trap: '别把 build 当成加 -ed。', source: SYS, family: '词形变化错',
        hint: '先分清规则动词和不规则动词，再写三形式。',
        attribution: '我把不规则动词当规则动词加了 -ed。', variant: 'C-B1'
      },
      {
        id: 'C-V2', skill: '词汇', type: 'fill',
        stem: '写反义词：narrow ↔ ______；old ↔ ______；before ↔ ______',
        answer: 'wide / new / now',
        accept: ['wide new now', 'wide / new / now', 'wide, new, now'],
        rule: '三空全对通过', basisType: '词汇语义',
        basis: 'narrow–wide；old–new；before–now（文中时间对照）。',
        trap: 'before 的反义在本文里是 now，不是 after。', source: SYS, family: '词形变化错',
        hint: '回到原文看 before 用来对照哪个时间词。',
        attribution: '我没回原文看语境就写了反义词。', variant: 'C-V2'
      },
      {
        id: 'C-V3', skill: '词汇', type: 'fill',
        stem: '搭配填空：instead ______ / used ______ / at the ______ time',
        answer: 'of / to / same',
        accept: ['of to same', 'of / to / same', 'of, to, same'],
        rule: '三空全对通过', basisType: '固定搭配',
        basis: 'instead of / used to / at the same time。',
        trap: 'used to 后接动词原形。', source: SYS, family: '搭配混淆',
        hint: '三个都是固定短语，整体记。',
        attribution: '我把 ______ 的介词记错了。', variant: 'C-V3'
      },
      {
        id: 'C-G1', skill: '语法', type: 'fill',
        stem: '用所给词的适当形式填空：The new bridge ______ (open) in 2020.',
        answer: 'was opened', accept: ['was opened'],
        rule: '漏 be 或误用 opening 均判「主动/被动混淆」',
        basisType: '语法规则', basis: '桥被开通，2020 为过去时间 → was + opened。',
        trap: '两个词缺一不可。', source: SYS, family: '主动/被动混淆',
        hint: '先看时间是 2020 还是 now，再决定 be 用 was 还是 is。',
        attribution: '我没看时间就填了。', variant: 'C-G1'
      },
      {
        id: 'C-G2', skill: '语法', type: 'choice',
        stem: '选择：Two buses ______ cross it now. A. can  B. could  C. were',
        options: ['A', 'B', 'C'], answer: 'A',
        rule: '选 B / C 判「时态不一致」', basisType: '上下文线索',
        basis: 'Now 提示一般现在的能力，用 can。',
        trap: '别被全篇的过去时带偏。', source: SYS, family: '时态不一致',
        hint: '看到 Now 就把时间拉回现在。',
        attribution: '我被前文的过去时带偏了。', variant: 'C-G2'
      },
      {
        id: 'C-G3', skill: '语法', type: 'fill',
        stem: '主动变被动：People closed the old bridge in 2018.',
        answer: 'The old bridge was closed in 2018.',
        accept: ['The old bridge was closed in 2018.', 'the old bridge was closed in 2018'],
        rule: '主语、be、过去分词、时间状语各 1 分',
        basisType: '语法规则', basis: '宾语提前作主语 + was + closed + 保留时间状语。',
        trap: '时间状语不能丢。', source: SYS, family: '主动/被动混淆',
        hint: '四块逐一对照：新主语 / be / 过去分词 / in 2018。',
        attribution: '我漏了 ______ 这一块。', variant: 'C-B1'
      },
      {
        id: 'C-H1', skill: '听', type: 'self',
        stem: '听前预测：题目 "Why was the old bridge closed?" 圈关键词并写出预判的词性。',
        answer: '圈 Why / closed，写「原因 / 形容词」通过',
        rule: '未写预测不放行听音', basisType: '学习策略',
        basis: 'Why 指向原因，because 后多为形容词或从句。',
        trap: 'Why 题不要只抓数字。', source: SYS, family: '无预测',
        hint: '先读题圈疑问词，再决定听什么。',
        attribution: '我没读题就听了。', variant: 'C-H1',
        selfCheck: ['我圈出了 Why 或 closed', '我写出要抓「原因 / 形容词」', '我在听音前完成']
      },
      {
        id: 'C-H2', skill: '听', type: 'fill',
        stem: '听中填空：The old bridge was built in ______. It was closed in ______ because it was too ______. The new bridge was opened in ______.',
        answer: '1980 / 2018 / narrow / 2020',
        accept: ['1980 2018 narrow 2020', '1980 / 2018 / narrow / 2020', '1980, 2018, narrow, 2020'],
        rule: '数字对但漏 was 判「被动结构听漏」',
        basisType: '原文定位句', basis: '听力脚本：The old bridge was built in 1980. It was closed in 2018 because it was too narrow. The new bridge was opened in 2020.',
        trap: '题干已有 was，别重复写；但自己造句时不能漏。',
        source: SYS, family: '主动/被动混淆',
        hint: '听前数清四个空，预判哪几个是数字。',
        attribution: '我没预判空格词性。', variant: 'C-H1'
      },
      {
        id: 'C-S1', skill: '说', type: 'self',
        stem: '复述：用 was built / was closed / was opened 说 3 句。',
        answer: '同伴听评，三处 be 动词不漏；不用机器评分',
        rule: '口语题不输出机器分数', basisType: '语音知识点',
        basis: '三个被动结构都含 was，连读时容易吞掉。',
        trap: '说得快时 was 最容易被吞。', source: SYS, family: '主动/被动混淆',
        hint: '先放慢把 was 读清楚，再连成句。',
        attribution: '我说的时候把 was 吞掉了。', variant: 'C-B1',
        selfCheck: ['三句都说了', '三处 was 都没漏', '同伴听评通过']
      },
      {
        id: 'C-S2', skill: '说', type: 'self',
        stem: '情景：向同学介绍学校一处变化（3 句），须含时间 + 旧状况 + 新状况。',
        answer: '三要素齐全、被动结构至少 1 处',
        rule: '不用机器评分，同伴按三要素打勾',
        basisType: '评分量表', basis: '时间 / 旧状况 / 新状况；被动结构至少 1 处。',
        trap: '别只说「变好了」，要说清前后。', source: SYS, family: '要点遗漏',
        hint: '按「以前—现在—影响」三句说。',
        attribution: '我漏了 ______ 要素。', variant: 'C-B3',
        selfCheck: ['我说了时间', '我说了旧状况', '我说了新状况', '至少用了 1 处被动结构']
      },
      {
        id: 'C-R1', skill: '读', type: 'evidence',
        stem: '细节题：How long does the trip to the market take now? 写出原文定位句。',
        answer: 'Fifteen minutes. 定位句：Many people say the trip to the market takes fifteen minutes instead of forty.',
        rule: '缺定位句不算通过', evidenceKeys: ['fifteen minutes', 'instead of forty'],
        basisType: '原文定位句', basis: 'Many people say the trip to the market takes fifteen minutes instead of forty.',
        trap: '别答成 forty，那是过去。', source: SYS, family: '未回原文定位',
        hint: '注意 instead of，前面是现在，后面是过去。',
        attribution: '我把过去的时间当成现在的了。', variant: 'C-R1'
      },
      {
        id: 'C-R2', skill: '读', type: 'evidence',
        stem: '推断题：What can we infer about Mrs Wang\'s morning now? 圈出依据句。',
        answer: 'She can leave home later. 依据句："I used to leave home before six" 与 "Now I can leave at seven."',
        rule: '答「她不上班了」等原文无据内容判「臆测」；未圈依据句即使结论接近也判不通过',
        evidenceKeys: ['leave at seven', 'before six', 'used to'],
        basisType: '原文定位句', basis: '"I used to leave home before six," says Mrs Wang. "Now I can leave at seven."',
        trap: '只能推出「出门晚了」，不能推出别的生活变化。',
        source: SYS, family: '臆测',
        hint: '推断必须圈出原文依据句，文中没说的不能加。',
        attribution: '我按自己的想象补了信息。', variant: 'C-B2'
      },
      {
        id: 'C-R3', skill: '读', type: 'choice',
        stem: '主旨题：Which is the best title? A. A New Bridge  B. Mrs Wang\'s Family  C. Buses in Town',
        options: ['A', 'B', 'C'], answer: 'A',
        rule: '选 B / C 判「以偏概全」', basisType: '篇章结构',
        basis: '首尾句与高频词 bridge 贯穿全篇；Mrs Wang 与 buses 只是细节。',
        trap: '例子不等于主旨。', source: SYS, family: '臆测',
        hint: '数一数哪个词在全篇出现最多，再看首尾句。',
        attribution: '我把一个细节当成了主旨。', variant: 'C-B2'
      },
      {
        id: 'C-W1', skill: '写', type: 'fill',
        stem: '病句改错（只改病处）：The old bridge build in 1980. It close in 2018.',
        answer: 'was built / was closed',
        accept: ['was built was closed', 'was built / was closed'],
        rule: '两处各 1 分；整篇重写不算通过',
        basisType: '语法规则', basis: '两处均须补 be 动词并改为过去分词。',
        trap: 'be 和过去分词要一起改。', source: SYS, family: '主动/被动混淆',
        hint: '每句都要补上 was，再把动词改成过去分词。',
        attribution: '我只改了动词，忘了补 was。', variant: 'C-B1'
      },
      {
        id: 'C-W2', skill: '写', type: 'open',
        stem: '连段任务：介绍一处变化写 5 句，要点清单：时间 / 旧状况 / 新状况 / 影响 / 感受；不给范文。',
        answer: '不设唯一答案，按判定规则验收（不代写范文）',
        rule: '要点 5/5 + 被动语态硬伤 ≤1 处 + 至少 1 个衔接词 → 通过；缺要点按「要点遗漏」归因，只补不重写',
        basisType: '评分量表', basis: '要点清单见题面；由教师按书面表达标准批阅。',
        trap: '不提供范文、不整卷代做；只补不重写。', source: SYS, family: '要点遗漏',
        hint: '对照 5 项要点逐项打勾，缺哪项补哪项，不用重写整篇。',
        attribution: '我漏了 ______ 要点。', variant: 'C-B3',
        selfCheck: ['写了时间', '写了旧状况', '写了新状况', '写了影响', '写了感受', '被动语态硬伤 ≤1 处', '用了至少 1 个衔接词']
      }
    ],
    variants: [
      {
        id: 'C-B1', skill: '语法', type: 'fill', from: '主动/被动混淆',
        stem: '换话题（发明）：Paper ______ (invent) in ancient China.',
        answer: 'was invented', accept: ['was invented'],
        rule: '一次答对即通过；换话题、换不规则动词',
        basisType: '语法规则', basis: '纸被发明，过去时间 → was + invented。',
        trap: 'invent 是规则动词，但被动结构不变。', source: SYS, family: '主动/被动混淆',
        hint: '先判断主语是做事的还是被做的。',
        attribution: '我换了话题就忘了用被动。', move: '换话题 / 呼应九上 Unit 5'
      },
      {
        id: 'C-B2', skill: '读', type: 'evidence', from: '臆测',
        stem: '换文本推断："The shop was closed at six. Tom arrived at six ten. He went home and came back the next morning." 问：What can we infer about Tom? 须圈依据句。',
        answer: 'He did not get in that evening. 依据句：The shop was closed at six 与 arrived at six ten。',
        rule: '臆测「Tom 忘了带钱」不算通过；依据句须含关键词',
        evidenceKeys: ['closed at six', 'six ten', 'arrived'],
        basisType: '原文定位句', basis: 'The shop was closed at six. Tom arrived at six ten. He went home and came back the next morning.',
        trap: '换文本仍考「不臆测」。', source: SYS, family: '臆测',
        hint: '把两句时间与动作连起来，只说能推出的那一句。',
        attribution: '我又补了原文没有的信息。', move: '换文本 / 仍考不臆测'
      },
      {
        id: 'C-B3', skill: '写', type: 'open', from: '要点遗漏',
        stem: '换文体：把 5 句连段压成 3 句通知，5 项要点仍需覆盖。',
        answer: '不设唯一答案；5 项要点全在 + 被动结构无误 + 有称呼或落款',
        rule: '判定规则验收，不设唯一答案', basisType: '评分量表',
        basis: '要点清单：时间 / 旧状况 / 新状况 / 影响 / 感受；另需通知格式。',
        trap: '压缩句数不等于删要点。', source: SYS, family: '要点遗漏',
        hint: '逐项打勾后再合并句子，别先合并再找漏。',
        attribution: '我压缩时把 ______ 要点删掉了。', move: '换文体迁移',
        selfCheck: ['5 项要点都还在', '压成了 3 句', '有称呼或落款', '被动结构无误']
      }
    ],
    reviews: [
      { at: 'D0', items: 'C-D1 / C-G1 / C-R2', action: '原题入库五项字段 + 写归因', pass: '归因填写完整' },
      { at: 'D2', items: 'C-B1', action: '同错因变式', pass: '一次答对' },
      { at: 'D4', items: 'C-B2', action: '变式 + 圈依据句', pass: '依据句圈对且不臆测' },
      { at: 'D7', items: 'C-B3', action: '换文体输出', pass: '5 项要点全覆盖' },
      { at: 'D14', items: 'C-G3 / C-R2 / C-W2 同类', action: '混入阶段测：语法填空 1 题 + 阅读推断 1 题 + 作文要点自查', pass: '分项得分率 ≥75%' }
    ],
    feedback: [
      { family: '主动/被动混淆', hint: '先看主语是做事的还是被做的：桥不能自己建自己，用 be + 过去分词。', attr: '我把桥当成动作发出者了。', variant: 'C-B1' },
      { family: '臆测', hint: '推断必须圈出原文依据句，文中没说的不能加。', attr: '我按自己的想象补了信息。', variant: 'C-B2' },
      { family: '要点遗漏', hint: '对照 5 项要点逐项打勾，缺哪项补哪项，不用重写整篇。', attr: '我漏了 ______ 要点。', variant: 'C-B3' },
      { family: '词形变化错', hint: '先看时间是 1980 还是 now，再决定 be 用 was 还是 is。', attr: '我没看时间就填了。', variant: 'C-G1' }
    ]
  };

  window.COURSE_DATA = {
    meta: {
      name: '错因驱动课程任务流',
      source: 'COURSE-CONTENT.md（公众号「智体小日记」2026-11-05 方法论迁移）',
      note: '全部题目与文本为原创示意，非中考真题、非教材原文；口语与写作不机器评分；不代写范文、不整卷代做。',
      sys: SYS
    },
    skills: ['词汇', '语法', '听', '说', '读', '写'],
    levels: [
      { id: 'L1', name: '形式层', text: '50–70 词 / ≤8 词句 / 不限时 / 唯一答案', unit: 'A' },
      { id: 'L2', name: '句法层', text: '60–90 词 / 8–12 词句 / 单题 ≤3 分钟 / 明示依据', unit: 'B' },
      { id: 'L3', name: '语篇层', text: '80–110 词 / 12–16 词句 / 单题 ≤5 分钟 / 须圈依据句', unit: 'C' },
      { id: 'L4', name: '迁移级', text: '100–150 词 / 16 词以上 / 跨段整合 / 按省卷比例限时', unit: '变式题 + W17 起限时套卷' }
    ],
    reviewOffsets: { D0: 0, D2: 2, D4: 4, D7: 7, D14: 14 },
    units: [A, B, C],
    completion: [
      { id: 'c1', label: '2 道诊断题已提交，错因族已定位' },
      { id: 'c2', label: '六技能各至少 1 题达标' },
      { id: 'c3', label: '所有错题归因填写率 100%' },
      { id: 'c4', label: '同错因变式题正确率 ≥80%' },
      { id: 'c5', label: '复现队列已排且 D2 已完成' },
      { id: 'c6', label: '系统生成解析已复核或标【待核实】' }
    ]
  };
})();
