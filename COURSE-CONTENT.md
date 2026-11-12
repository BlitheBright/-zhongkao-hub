# 英语中考学习台 · 错因驱动课程包

> 基于公众号「智体小日记」2026-11-05《用 WorkBuddy 搭建数学错题管理系统，让孩子告别无效抄题，小学到高中持续补漏洞！》的核心思路做**方法论迁移**。
> 原文讨论的是**数学**错题系统，不涉及英语题型；本文件把其流程思路转译为英语中考练习课程，题型与文本均为原创示意内容，非中考真题、非教材原文。
> 所有题目可直接印发；作文不代写范文、练习不整卷代做；考情与教材信息以官方实物为准【待核实】。

## 0. 文章核心思路与迁移对照

| 项目 | 内容 | 教学处理建议 |
|---|---|---|
| 原文痛点 | 「抄题、整理、归类把时间占满了，留给分析错因和针对性练习的反而少了」；「换个数字、换个图形，还是照样错」 | 系统自动归类与排复现；每类错因必配换词换境的变式题，验证迁移而非记答案 |
| 原文分工 | 「IMA 管存题和归类，WorkBuddy 负责读取资料、分析错因、生成复盘内容」；「没有把所有活都塞进一个对话框」 | 题库归档与错因分析分离：单题入库 → 结构化错因档案 → 复现调度，三个动作各自独立 |
| 原文断言一 | 「整理这件事情可以交出去，理解还是得由孩子自己来完成」 | **硬交互**：答错后必须自己写一句归因（「我把…当成…」），否则不解锁答案与变式 |
| 原文断言二 | 「错题分析不能只停留在最后得出的那个答案上面」 | 每题记录「学生选了什么 / 错在哪一步 / 标准解法与依据 / 知识点锚 / 复习建议」五项 |
| 原文流程 | 「先挑了两道带图形的题目做尝试」；「裁剪成单道题目的图片…按照学科和知识点上传」 | 每单元 2 道诊断题先行；一次只练一道，题干与语境完整，不上传整卷 |
| 原文断言三 | 「能够把错题积攒住，错误的原因也说清楚，后续的练习还能接上」 | 2 / 4 / 7 / 14 天复现队列 + 同错因变式题 + 可回翻的来路记录 |
| 原文风控 | 「拿标准答案或者比较可靠的题库去做一次交叉的核对」；「页面生成得再整齐美观，也不能被当成计算过程一定没有错误的证据」 | 判定规则标明依据来源；教师端复核后才显示「标准答案」，否则显示「参考答案（待复核）」 |

---

## 一、学习台定位、适用人群、核心模块、页面状态与交互状态

| 项目 | 内容 | 教学处理建议 |
|---|---|---|
| 定位 | 以**错因档案**为中枢的英语中考练习台，不是课程播放页，也不是刷题库 | 每屏只呈现一道题与它的错因来路 |
| 适用人群 | 杭州 2027 届九年级学生，120 分制下 60–70 分（得分率 50%–58%）；默写尚可，词汇 / 听力 / 作文弱 | 起点按 L1 单步错因，不直接进语篇推断 |
| 不适用 | 尖子生拔高、全校统一考试系统、需要账号与跨端同步的场景 | 超出设计稿边界，不做 |
| 使用节奏 | 每日约 25 分钟（一次一题、一归因、一变式），周末 60 分钟复现 | 与既有 31 周计划并行，不另起时间轴 |

**核心模块（六个，全部围绕文章思路）**

| 模块 | 功能 | 对应原文思路 |
|---|---|---|
| 单题入库与错因档案 | 题干识别 / 学生错误思路 / 标准解法与依据 / 知识点锚 / 复习建议，五项结构化留存 | 「按照…这几项内容做出相应的输出」 |
| 诊断闸门 | 每单元先做 2 道诊断题，据错因分流到对应层级 | 「先挑了两道…做尝试」 |
| 六技能练习流 | 词汇 / 语法 / 听 / 说 / 读 / 写，一次一题，题面与语境完整 | 「裁剪成单道题目的图片」 |
| 归因与变式 | 答错先写一句归因，再解锁四栏解析与同错因变式题 | 「理解还是得由孩子自己来完成」 |
| 复现调度 | D0 / D2 / D4 / D7 / D14 队列，到期进今日任务 | 「后续的练习还能接上」 |
| 教师复核台 | 交叉核对依据、标记【待核实】、改正解析、查看归因原文 | 「人工再过一遍」「交叉的核对」 |

**页面状态**（对象：课程单元）

| 状态 | 进入条件 | 页面可见内容 |
|---|---|---|
| 未开始 | 单元未解锁 | 错因名称、2 道诊断题入口、预计题量 |
| 诊断中 | 点开诊断题 | 仅诊断题，不显示答案、不显示后续题 |
| 诊断通过 | 2 题已提交且归因已填 | 六技能练习入口、本题错因档案摘要 |
| 练习中 | 进入任一技能 | 单题题面 + 作答区，隐藏其他题 |
| 待归因 | 客观题判错且归因未填 | 答案区隐藏，显示归因输入框与提示话术 |
| 待复现 | 变式通过 | 今日任务显示复现日期，不再出现原题 |
| 已掌握 | 连续 2 次复现正确 | 单元标记完成，档案可回翻但不再派题 |
| 教师待复核 | 解析由系统生成且未核对 | 教师端红标【待核实】，学生端显示「参考答案（待复核）」 |

**交互状态**（对象：单题）

| 状态 | 触发 | 系统动作 | 学生必须做的动作 | 能否看答案 |
|---|---|---|---|---|
| 未作答 | 进入题目 | 展示题面与听前预测栏 | — | 否 |
| 已提交待判 | 点击提交 | 客观题自动判；开放题转自评 | 开放题对照要点打勾 | 否 |
| 判定正确 | 答案匹配 | 显示四栏解析、标记达标 | 可选：读一遍依据 | 是 |
| 判定错误·未归因 | 答案不匹配 | 锁定答案区，显示错因提示话术 | 写一句「我把…当成…」 | **否** |
| 判定错误·已归因 | 归因提交 | 解锁四栏解析 + 派发同错因变式题 | 完成变式题 | 是 |
| 变式通过 | 变式答对 | 写入 D2/D4/D7/D14 队列 | — | 是 |
| 变式未通过 | 变式答错 | 不升级，改派低一级同错因题 | 重做并再归因 | 是 |

---

## 二、分级课程体系与学习路径

分级依据**错因复杂度**（呼应「错在哪一步」），不按年级或题量分。

| 层级 | 错因类型 | 典型表现 | 对应单元 | 进入条件 |
|---|---|---|---|---|
| L0 诊断级 | 定位错因族 | 2 道诊断题的错答方向 | 每单元开头 | 单元开始即进入 |
| L1 形式层 | 单步形式错因 | 三单漏 -s、名词复数、拼写、词尾听不出 | 单元 A | 诊断 ≥1 题落在形式层 |
| L2 句法层 | 结构错因 | 宾语从句疑问语序、时态选择、固定搭配 | 单元 B | 单元 A 已掌握或诊断直落 L2 |
| L3 语篇层 | 语境错因 | 推断臆测、被动语态词形、写作要点遗漏 | 单元 C | 单元 B 已掌握或诊断直落 L3 |
| L4 迁移级 | 同错因新语境 | 换话题、换文体、限时条件下仍稳定 | 各单元变式题 + W17 起限时套卷 | 连续 2 次复现正确 |

**学习路径（单单元闭环，六步）**

诊断 2 题 → 单题精练（一题一归因）→ 四栏解析 → 同错因变式（换词换境）→ 进入 D0/D2/D4/D7/D14 复现 → 回翻归档并晋级。

**与 31 周计划的对接**

| 周次 | 课程动作 | 与既有主线关系 |
|---|---|---|
| W01 | 单元 A（L1）+ W01 基线诊断，只开词汇线与听力线 | 与九上 Unit 1 同步，作文线仍 W02 起 |
| W02 | 单元 B（L2），作文线开放 | 与九上 Unit 2 同步 |
| W03 | 单元 C（L3），首次出现语篇推断 | 与九上 Unit 3 同步，C 层练习仍 W17 才整体开放 |
| W04–W08 | 三单元复现队列滚动 + 九上 Unit 4–8 同步 | 变式题替换新话题，不重复原题 |
| W09 起 | 同错因族进入话题一轮与任务型阅读 | 任务型阅读按原计划 W09 提前介入 |

---

## 三、完整课程单元

> 三个单元均含：学习目标 / 主题材料（原创示意文本）/ 核心词表（IPA + 中文）/ 2 道诊断题 / 六技能真实题面 / 答案与判定规则 / 即时反馈 / 错题复习安排。
> 文中未在词表列出的词为初中已学常见词；听力题提供朗读脚本，由教师朗读或对接教材音频，脚本不向学生展示；口语与写作不用机器评分。

### 单元 A｜错因族：一般现在时第三人称单数漏 -s 与词尾音义脱节（L1）

**对应**：W01，九上 Unit 1 前置基础；课时 40 分钟 + 复现 4 次。

**学习目标**（可观测行为动词）
1. 能写出含第三人称单数主语的一般现在时动词形式，正确率 ≥80%。
2. 能听辨 /s/、/z/、/ɪz/ 词尾并复现，5 组中至少 4 组正确。
3. 能回原文定位细节题的依据句，不凭印象作答。
4. 能写出 5 句连段并自查三单，硬伤 ≤1 处。

**主题材料（原创示意文本，非教材原文）**

> **My School Day**
> Li Ming is a Grade 9 student. He gets up at six thirty and walks to school. His first class starts at seven forty. He likes English best, because his teacher often tells stories in class. After school, he plays basketball with his friends. He does his homework before dinner. Every evening, he reads for twenty minutes and writes three new words in his notebook.

**核心词表（首次出现给 IPA 与中文释义）**

| 词 / 短语 | IPA | 中文 | 词 / 短语 | IPA | 中文 |
|---|---|---|---|---|---|
| grade | /ɡreɪd/ | 年级 | start | /stɑːt/ | 开始 |
| walk | /wɔːk/ | 步行 | because | /bɪˈkɒz/ | 因为 |
| often | /ˈɒfn/ | 经常 | homework | /ˈhəʊmwɜːk/ | 家庭作业 |
| notebook | /ˈnəʊtbʊk/ | 笔记本 | minute | /ˈmɪnɪt/ | 分钟 |

**诊断题（2 道，先试点再扩量）**

| 编号 | 真实题面 | 参考答案 | 判定规则 / 依据 |
|---|---|---|---|
| A-D1 | 用所给词的适当形式填空：He ______ (get) up at six thirty every morning. | gets | 答 get 即判定「形式层·三单漏 -s」；依据：主语 He 为第三人称单数（白话：主语是 he/she/it 或一个人/物时，一般现在时动词加 -s），every morning 提示一般现在时 |
| A-D2 | 听辨：教师朗读 "He walks to school." 与 "They walk to school." 各一遍，写出两句动词是否相同。 | 不同：walks / walk | 答「相同」判定「形式层·词尾音义脱节」；依据：/wɔːks/ 与 /wɔːk/ 的词尾 /s/ 是单数标记 |

**六技能练习题目**

| 编号 | 技能 | 真实题面 / 示例文本 | 参考答案或判定规则 |
|---|---|---|---|
| A-V1 | 词汇 | 看中文写英文：开始 ______；家庭作业 ______；笔记本 ______ | start / homework / notebook；拼写错误按「形式层·拼写」归因 |
| A-V2 | 词汇 | 用所给词的适当形式填空：He ______ (walk) to school. They ______ (walk) to school. | walks / walk；第二空错判「过度推广 -s」 |
| A-V3 | 词汇 | 下面这句错在哪一步？只写一句：He get up at six. | 判定规则：须点出「主语 He + 动词未加 -s」；只写「错了」不算通过 |
| A-G1 | 语法 | 选择：His first class ______ at seven forty. A. start B. starts C. starting D. started | B；依据：主语单数 + 一般现在时；选 D 归「时态选择」，选 C 归「非谓语误用」 |
| A-G2 | 语法 | 改错（只改病处）：He like English best. | like → likes；依据同上；整句重写不算通过 |
| A-G3 | 语法 | 用 He 改写句子：I read for twenty minutes every evening. | He reads for twenty minutes every evening.；两处变化（主语 + 动词）缺一扣一半 |
| A-H1 | 听 | 听前 30 秒：题目为 "What time does Li Ming's first class start?" 圈出预判关键词并写出需要什么词性的信息 | 判定：圈 What time / start，写出「时间数字」即通过；不读题直接听按「无预测」归因 |
| A-H2 | 听 | 听中填空（脚本见下）：Li Ming gets up at ______. He ______ to school. His first class ______ at 7:40. | 6:30 / walks / starts；数字对但漏 -s 判错，归「词尾音义脱节」 |
| A-S1 | 说 | 跟读对比：/wɔːks/ — /wɔːk/、/stɑːts/ — /stɑːt/、/ˈrɪdz/ — /riːd/，各读两遍 | 判定规则：同伴听评，能复现词尾 /s/ 或 /z/ 打勾；不用机器评分 |
| A-S2 | 说 | 情景问答：教师问 "What does Li Ming do after school?" 学生口头作答 | 判定：须含 plays（含 -s）；漏 -s 不算通过，重说一次后再记 |
| A-R1 | 读 | 细节题：What time does Li Ming's first class start? 并写出原文定位句 | At seven forty. 定位句：His first class starts at seven forty.；缺定位句不算通过 |
| A-R2 | 读 | 细节题：Why does he like English best? 写出依据句 | Because his teacher often tells stories in class. 定位句同上 |
| A-R3 | 读 | 词义猜测：文中 "writes three new words in his notebook" 的 notebook 最可能指什么？写出上下文线索 | 本子 / 记录本；线索：writes ... in 与上文 reads、new words；按熟词硬套不算通过 |
| A-W1 | 写 | 病句改错（原创学生病句，只改病处、不重写全文）：He get up at six. He like English. He play basketball after school. | gets / likes / plays；三处各 1 分；整篇重写不算通过 |
| A-W2 | 写 | 连段任务：以 He 作主语写「他的一天」5 句，不给范文；自查清单：三单、时态一致、拼写、字数、至少 1 个衔接词 | 判定规则：5 句齐全 + 三单硬伤 ≤1 处 + 至少 1 个衔接词 → 通过；未通过只改 3 处最痛的，交第 2 稿 |

**听力脚本（教师朗读，不向学生展示）**

> Li Ming gets up at six thirty. He walks to school with his friend Wang Lin. His first class starts at seven forty. After school, he plays basketball. In the evening, he reads for twenty minutes and writes three new words in his notebook.

**即时反馈规则**

| 错因类型 | 系统提示话术（原题面外，提交后显示） | 学生归因句式 | 派发变式 |
|---|---|---|---|
| 三单漏 -s | 「再看主语是谁：He / She / It 或一个人的时候，动词要加 -s。」 | 「我把 ______ 当成复数主语了。」 | A-B1 |
| 词尾音义脱节 | 「跟读 /wɔːks/，注意词尾 /s/；听不出就先看着词读三遍再听。」 | 「我听懂了词，但没听出词尾。」 | A-B2 |
| 过度推广 -s | 「They / 复数主语后面不加 -s，只有单数第三人称才加。」 | 「我把 -s 加到了复数主语后面。」 | A-B3 |
| 无预测 | 「先读题，圈疑问词，再决定听什么；不用听懂每个词。」 | 「我没读题就直接听了。」 | A-H1 重做 |

**变式题（换词换境，验证迁移，呼应「换个数字换个图形还是错」）**

| 编号 | 题面 | 答案 | 迁移点 |
|---|---|---|---|
| A-B1 | My sister ______ (watch) TV every evening. | watches | 换主语、换动词、加 -es |
| A-B2 | 听辨：教师读 "She watches TV." / "They watch TV."，圈出听到的词尾 | 第一句有 /ɪz/，第二句无 | 换词、换词尾读音 |
| A-B3 | 把主题材料前三句的 He 全部改成 They，写出改动后的 3 句 | gets→get, walks→walk, starts→start | 反向迁移 |

**错题复习安排**

| 时点 | 动作 | 题号 | 通过判定 |
|---|---|---|---|
| D0 | 原题入库五项字段 + 写归因 | A-D1 / A-G1 / A-H2 | 归因填写完整 |
| D2 | 同错因变式 | A-B1 | 一次答对 |
| D4 | 变式 + 跟读 | A-B2 + A-S1 | 听辨 4/5 组正确 |
| D7 | 新语境填空（换话题：My sister's day） | A-B3 | 三处改动全对 |
| D14 | 混入周测 20 词听写条与 1 道语法填空 | A-G2 同类 | 正确率 ≥80% |

**回翻字段（每题必存）**：题目识别 / 学生错答 / 错误思路（归因原句）/ 标准解法与依据 / 知识点锚（三单·词尾听辨）/ 复习建议。

### 单元 B｜错因族：宾语从句疑问语序受汉语干扰、听前不预测（L2）

**对应**：W02，九上 Unit 2–3 前置；课时 40 分钟 + 复现 4 次。

**学习目标**
1. 能写出含陈述语序的宾语从句，3 句中至少 3 句语序正确。
2. 能区分 borrow / lend / keep 并正确填空，3 题全对。
3. 能在听前圈出疑问词并预判所需信息词性，2 题均完成。
4. 能写出 3 句问路/求助，功能句与从句语序均无误。

**主题材料（原创示意对话，非教材原文）**

> **Asking for Help**
> A: Excuse me, could you tell me where the library is?
> B: Sure. It's next to the science building.
> A: Do you know if it opens at eight?
> B: Yes, but I'm not sure when the reading room closes.
> A: Thanks. I wonder whether I can borrow two books today.
> B: I think you can. The library closes at five thirty.

**核心词表（IPA + 中文释义）**

| 词 / 短语 | IPA | 中文 | 词 / 短语 | IPA | 中文 |
|---|---|---|---|---|---|
| library | /ˈlaɪbrəri/ | 图书馆 | science | /ˈsaɪəns/ | 科学 |
| building | /ˈbɪldɪŋ/ | 建筑物 | borrow | /ˈbɒrəʊ/ | 借入 |
| lend | /lend/ | 借出 | keep | /kiːp/ | 借用（多久） |
| whether | /ˈweðə/ | 是否 | wonder | /ˈwʌndə/ | 想知道 |
| excuse me | /ɪkˈskjuːz miː/ | 劳驾 | next to | /nekst tuː/ | 在……旁边 |

**诊断题（2 道）**

| 编号 | 真实题面 | 参考答案 | 判定规则 / 依据 |
|---|---|---|---|
| B-D1 | 选择：Could you tell me ______? A. where is the library B. where the library is C. where the library was D. where was the library | B | 选 A / D 判「句法层·汉语疑问语序干扰」；选 C 判「时态不一致」。依据：宾语从句（白话：整句放另一句里当宾语）用陈述语序；could 在此表委婉语气，不指过去 |
| B-D2 | 听前 30 秒：题目为 "When does the library close?" 先在预测栏写下要抓的信息，再开始听录音 | 写「时间 / 数字」即放行 | 预测栏空白即判「无预测」，不放行听音；依据：疑问词 When 指向时间 |

**六技能练习题目**

| 编号 | 技能 | 真实题面 / 示例文本 | 参考答案或判定规则 |
|---|---|---|---|
| B-V1 | 词汇 | 固定搭配填空：Could you ______ me where ...? / Do you ______ if ...? / I ______ whether ... | tell / know / wonder；错一空按「搭配混淆」归因 |
| B-V2 | 词汇 | 选词填空（borrow / lend / keep）：Can I ______ two books? I can ______ you mine. How long can I ______ it? | borrow / lend / keep；依据：借入、借出、借多久三者方向不同 |
| B-V3 | 词汇 | 写出复数与职业名词：library → ______（复数）；science → ______（研究科学的人） | libraries / scientist；依据：辅音字母 + y 变 ies；后缀 -ist |
| B-G1 | 语法 | 选择：Do you know ______? A. when does the reading room close B. when the reading room closes C. when the reading room close | B；依据：陈述语序 + 主语单数谓语加 -s |
| B-G2 | 语法 | 改错（只改病处）：I don't know where is the science building. | where the science building is；整句重写不算通过 |
| B-G3 | 语法 | 合并成一句：Where is the library? + Could you tell me ...? | Could you tell me where the library is? |
| B-H1 | 听 | 听前预测：题目 "When does the library close?" 圈关键词并写出需要什么词性的信息 | 圈 When / close，写「时间数字」通过 |
| B-H2 | 听 | 听中填空（脚本见下）：The library is next to the ______ ______. It opens at ______ and closes at ______ ______. You can borrow ______ books. | science building / eight / five thirty / two；数字对、名词拼写错按「形式层」归因 |
| B-S1 | 说 | 跟读：Could you tell me where the library is? 从句部分用陈述语序、句末降调 | 判定规则：同伴听评，不把 is 提前；不用机器评分 |
| B-S2 | 说 | 情景问答：向新同学问路，用 Could you tell me ... 与 Do you know if ... 各说一句 | 判定：两句均为陈述语序、功能句完整；漏一项重说一次 |
| B-R1 | 读 | 细节题：What did the writer write at first? 写出原文定位句 | "I don't know the word". 定位句：At first, I wrote "I don't know the word". |
| B-R2 | 读 | 推断题：What can we infer about the writer now? 必须圈出依据句 | He / She can guess new words from sentences. 依据句：Now I can often guess a new word from the sentences around it.；答「考了满分」判「臆测」 |
| B-R3 | 读 | 词义猜测："the sentences around it" 中 around 的意思，并写出上下文线索 | 在……周围 / 上下文；线索 sentences 与 guess a new word |
| B-W1 | 写 | 病句改错（原创学生病句，只改病处）：Could you tell me where is the library? I don't know when does it open. | where the library is / when it opens；两处各 1 分 |
| B-W2 | 写 | 连段任务：写 3 句询问学校设施，分别用 Could you tell me ... / Do you know if ... / I wonder whether ...；不给范文 | 判定规则：3 句齐全 + 从句语序全对 + 至少 1 个功能句 → 通过；不代写范文 |

**阅读文本（原创示意，供 B-R1–B-R3 使用）**

> **A Good Question**
> Last month, our teacher asked us to write down one question before each English class. At first, I wrote "I don't know the word". My teacher said, "Tell me where you saw it." So I began to copy the sentence, not just the word. Now I can often guess a new word from the sentences around it. My notebook is full of sentences, not single words.

**听力脚本（教师朗读，不向学生展示）**

> Excuse me, could you tell me where the library is? It's next to the science building. It opens at eight in the morning and closes at five thirty in the afternoon. You can borrow two books today. The reading room is on the second floor.

**即时反馈规则**

| 错因类型 | 系统提示话术 | 学生归因句式 | 派发变式 |
|---|---|---|---|
| 汉语疑问语序干扰 | 「从句里主语在前、be 动词在后，别把 is 提到前面去。」 | 「我把汉语的『在哪』直接搬进从句了。」 | B-B1 |
| 时态不一致 | 「could 在这里是委婉语气，不是过去时；问现在的地点仍用 is。」 | 「我把 could 当成过去时了。」 | B-B2 |
| 搭配混淆 | 「borrow 借入、lend 借出、keep 借多久，先看方向。」 | 「我把借入和借出弄反了。」 | B-V2 重做 |
| 无预测 | 「先读题圈疑问词，再决定听什么，不用听懂每个词。」 | 「我没读题就听了。」 | B-H1 重做 |

**变式题**

| 编号 | 题面 | 答案 / 判定 | 迁移点 |
|---|---|---|---|
| B-B1 | 选择：I wonder ______. A. where does he live B. where he lives | B | 换引导词、换主语、换动词 |
| B-B2 | 用所给词的适当形式填空：Do you know if the reading room ______ (close) at five? | closes | 换语境，同时考从句语序与三单 |
| B-B3 | 换话题：把问路对话改成问「借书规则」，写出 2 句宾语从句 | 判定：语序正确 + 引导词合适 + 意思通顺；不设唯一答案 | 换话题迁移 |

**错题复习安排**

| 时点 | 动作 | 题号 | 通过判定 |
|---|---|---|---|
| D0 | 原题入库五项字段 + 写归因 | B-D1 / B-G1 / B-H2 | 归因填写完整 |
| D2 | 同错因变式 | B-B1 | 一次答对 |
| D4 | 变式 + 搭配回炉 | B-B2 + B-V2 | 3 题全对 |
| D7 | 新语境 2 句宾语从句 | B-B3 | 语序与引导词均对 |
| D14 | 混入周测语法填空 1 题 + 听力填空 1 段 | B-G2 同类 | 正确率 ≥80% |

**回翻字段**：题目识别 / 学生错答 / 错误思路 / 标准解法与依据 / 知识点锚（宾语从句语序·听前预测）/ 复习建议。

---

### 单元 C｜错因族：阅读推断臆测、被动语态词形变化、写作要点遗漏（L3）

**对应**：W03，九上 Unit 1 / Unit 5 话题前置；课时 45 分钟 + 复现 4 次。

**学习目标**
1. 能写出一般现在/过去时的被动语态形式，3 题全对。
2. 做推断题时能圈出原文依据句，2 题均不臆测。
3. 能按 5 项要点清单写 5 句连段，要点覆盖 5/5。
4. 能口头复述一处变化，含 3 处完整被动结构。

**主题材料（原创示意说明文，非教材原文）**

> **A Change in Our Town**
> Ten years ago, the old bridge was the only way across the river. It was built in 1980 and was closed in 2018 because it was too narrow. In 2020, a new bridge was opened. Now two buses can cross it at the same time. Many people say the trip to the market takes fifteen minutes instead of forty. "I used to leave home before six," says Mrs Wang. "Now I can leave at seven."

**核心词表（IPA + 中文释义）**

| 词 / 短语 | IPA | 中文 | 词 / 短语 | IPA | 中文 |
|---|---|---|---|---|---|
| bridge | /brɪdʒ/ | 桥 | narrow | /ˈnærəʊ/ | 狭窄的 |
| wide | /waɪd/ | 宽的 | cross | /krɒs/ | 穿过 |
| market | /ˈmɑːkɪt/ | 市场 | daily | /ˈdeɪli/ | 日常的 |
| instead of | /ɪnˈsted əv/ | 而不是 | used to | /juːst tuː/ | 过去常常 |

**诊断题（2 道）**

| 编号 | 真实题面 | 参考答案 | 判定规则 / 依据 |
|---|---|---|---|
| C-D1 | 选择：The old bridge ______ in 1980. A. built B. was built C. builds | B | 选 A 判「语篇层·主动/被动混淆」；依据：被动语态（白话：不必说谁做的，用 be + 过去分词），桥是被建的 |
| C-D2 | 推断题：What can we infer about the old bridge? 写出答案并圈出依据句 | It was too narrow, so it was closed in 2018. 依据句：It was built in 1980 and was closed in 2018 because it was too narrow. | 答「很漂亮 / 很受欢迎」等原文无据内容判「臆测」，不放行后续阅读题 |

**六技能练习题目**

| 编号 | 技能 | 真实题面 / 示例文本 | 参考答案或判定规则 |
|---|---|---|---|
| C-V1 | 词汇 | 写出词形链：build → ______ → was ______；close → ______ → was ______ | built / built；closed / closed；不规则与规则变化各 1 分 |
| C-V2 | 词汇 | 写反义词：narrow ↔ ______；old ↔ ______；before ↔ ______ | wide / new / now |
| C-V3 | 词汇 | 搭配填空：instead ______ / used ______ / at the ______ time | of / to / same |
| C-G1 | 语法 | 用所给词的适当形式填空：The new bridge ______ (open) in 2020. | was opened；漏 be 或误用 opening 均判「主动/被动混淆」 |
| C-G2 | 语法 | 选择：Two buses ______ cross it now. A. can B. could C. were | A；依据 Now |
| C-G3 | 语法 | 主动变被动：People closed the old bridge in 2018. | The old bridge was closed in 2018.；主语、be、过去分词、时间状语各 1 分 |
| C-H1 | 听 | 听前预测：题目 "Why was the old bridge closed?" 圈关键词并写出预判的词性 | 圈 Why / closed，写「原因 / 形容词」通过 |
| C-H2 | 听 | 听中填空（脚本见下）：The old bridge was built in ______. It was closed in ______ because it was too ______. The new bridge was opened in ______. | 1980 / 2018 / narrow / 2020；数字对但漏 was 判「被动结构听漏」 |
| C-S1 | 说 | 复述：用 was built / was closed / was opened 说 3 句 | 判定规则：同伴听评，三处 be 动词不漏；不用机器评分 |
| C-S2 | 说 | 情景：向同学介绍学校一处变化（3 句），须含时间 + 旧状况 + 新状况 | 判定：三要素齐全、被动结构至少 1 处 |
| C-R1 | 读 | 细节题：How long does the trip to the market take now? 写出原文定位句 | Fifteen minutes. 定位句：Many people say the trip to the market takes fifteen minutes instead of forty. |
| C-R2 | 读 | 推断题：What can we infer about Mrs Wang's morning now? 圈出依据句 | She can leave home later. 依据句："I used to leave home before six" 与 "Now I can leave at seven."；答「她不上班了」判「臆测」 |
| C-R3 | 读 | 主旨题：Which is the best title? A. A New Bridge B. Mrs Wang's Family C. Buses in Town | A；依据：首尾句与高频词 bridge |
| C-W1 | 写 | 病句改错（原创学生病句，只改病处）：The old bridge build in 1980. It close in 2018. | was built / was closed |
| C-W2 | 写 | 连段任务：介绍一处变化写 5 句，要点清单：时间 / 旧状况 / 新状况 / 影响 / 感受；不给范文 | 判定规则：要点 5/5 + 被动语态硬伤 ≤1 处 + 至少 1 个衔接词 → 通过；缺要点按「要点遗漏」归因，只补不重写 |

**听力脚本（教师朗读，不向学生展示）**

> Here is the news about the new bridge. The old bridge was built in 1980. It was closed in 2018 because it was too narrow. The new bridge was opened in 2020. Now the trip to the market takes fifteen minutes instead of forty.

**即时反馈规则**

| 错因类型 | 系统提示话术 | 学生归因句式 | 派发变式 |
|---|---|---|---|
| 主动/被动混淆 | 「先看主语是做事的还是被做的：桥不能自己建自己，用 be + 过去分词。」 | 「我把桥当成动作发出者了。」 | C-B1 |
| 臆测 | 「推断必须圈出原文依据句，文中没说的不能加。」 | 「我按自己的想象补了信息。」 | C-B2 |
| 要点遗漏 | 「对照 5 项要点逐项打勾，缺哪项补哪项，不用重写整篇。」 | 「我漏了 ______ 要点。」 | C-B3 |
| 词形变化错 | 「先看时间是 1980 还是 now，再决定 be 用 was 还是 is。」 | 「我没看时间就填了。」 | C-G1 重做 |

**变式题**

| 编号 | 题面 | 答案 / 判定 | 迁移点 |
|---|---|---|---|
| C-B1 | 换话题（发明）：Paper ______ (invent) in ancient China. | was invented | 换话题、换不规则动词，呼应九上 Unit 5 |
| C-B2 | 换文本推断（原创示意）："The shop was closed at six. Tom arrived at six ten. He went home and came back the next morning." 问：What can we infer about Tom? 须圈依据句 | He did not get in that evening. 依据句：The shop was closed at six 与 arrived at six ten；臆测「Tom 忘了带钱」不算通过 | 换文本、仍考「不臆测」 |
| C-B3 | 换文体：把 5 句连段压成 3 句通知，5 项要点仍需覆盖 | 判定：5 项要点全在 + 被动结构无误 + 有称呼或落款；不设唯一答案 | 换文体迁移 |

**错题复习安排**

| 时点 | 动作 | 题号 | 通过判定 |
|---|---|---|---|
| D0 | 原题入库五项字段 + 写归因 | C-D1 / C-G1 / C-R2 | 归因填写完整 |
| D2 | 同错因变式 | C-B1 | 一次答对 |
| D4 | 变式 + 圈依据句 | C-B2 | 依据句圈对且不臆测 |
| D7 | 换文体输出 | C-B3 | 5 项要点全覆盖 |
| D14 | 混入阶段测：语法填空 1 题 + 阅读推断 1 题 + 作文要点自查 | C-G3 / C-R2 / C-W2 同类 | 分项得分率 ≥75% |

**回翻字段**：题目识别 / 学生错答 / 错误思路 / 标准解法与依据 / 知识点锚（被动语态·推断依据·要点覆盖）/ 复习建议。

---

## 四、练习难度梯度、学习进度记录、单元完成条件与可验收功能行为

### 4.1 难度梯度（按错因复杂度递进，非按题量）

| 维度 | L1 形式层（单元 A） | L2 句法层（单元 B） | L3 语篇层（单元 C） | L4 迁移级（变式与套卷） |
|---|---|---|---|---|
| 文本词数 | 50–70 词 | 60–90 词 | 80–110 词 | 100–150 词 |
| 平均句长 | ≤8 词 | 8–12 词 | 12–16 词（含从句） | 16 词以上 |
| 语境依赖 | 单句可判 | 需看相邻 1–2 句 | 需看全段与首尾句 | 需跨段整合 |
| 是否需要推断 | 否 | 少量（有明示依据句） | 是，必须圈依据句 | 是，限时条件下 |
| 技能复合度 | 单技能 | 双技能（语法 + 听/读） | 三技能（读 + 语法 + 写） | 全技能 + 限时 |
| 限时 | 不限时 | 单题 ≤3 分钟 | 单题 ≤5 分钟 | 按省卷 100 分钟比例 |
| 开放题判定 | 唯一答案 | 唯一答案 + 1 类可接受表达 | 判定规则（要点 / 依据句） | 评分量表（教师复核） |

### 4.2 学习进度记录字段（每题一条，可回翻）

| 字段 | 内容 | 用途 |
|---|---|---|
| `unit_id` / `item_id` | 单元与题号，如 A / A-G1 | 定位来路 |
| `skill` | 词汇 / 语法 / 听 / 说 / 读 / 写 | 六技能覆盖统计 |
| `wrong_family` | 三单漏 -s / 疑问语序干扰 / 臆测 等 | 错因族归档（文章「按知识点上传」） |
| `student_answer` | 学生实际作答原文 | 留存错误证据 |
| `wrong_step` | 错在哪一步（系统判或学生选） | 「不只看答案」 |
| `attribution_text` | 学生归因原句 | 理解留给学生，未填不放行 |
| `basis_type` / `basis_text` | 依据类型与具体依据 / 原文定位句 | 四栏解析 |
| `basis_source` | 教材 / 教师核定 / 系统生成【待核实】 | 交叉核对（文章风控） |
| `teacher_verified` | 是 / 否 | 未核对则不显示「标准答案」 |
| `variant_result` | 变式通过 / 未通过 | 迁移验收 |
| `review_due` / `review_result` | D0 / D2 / D4 / D7 / D14 与结果 | 复现调度 |
| `state` | 见第一部分交互状态 | 页面渲染依据 |

### 4.3 单元完成条件（六条硬条件，全部满足才标记完成）

| # | 条件 | 验收方式 |
|---|---|---|
| 1 | 2 道诊断题已提交，错因族已定位 | 诊断记录存在且 `wrong_family` 非空 |
| 2 | 六技能各至少 1 题达标 | `skill` 六种取值均有达标记录 |
| 3 | 所有错题归因填写率 100% | 每条错误记录 `attribution_text` 非空 |
| 4 | 同错因变式题正确率 ≥80% | `variant_result` 统计 |
| 5 | 复现队列已排且 D2 已完成 | `review_due` 五个时点存在、D2 有结果 |
| 6 | 系统生成解析已由教师复核或标【待核实】 | `teacher_verified` / `basis_source` 齐全 |

**晋级条件**：连续 2 次复现正确 且 变式通过 → 进入下一错因族；同错因第 3 次错 → 不升级，改派 L1 降级题并重新归因。

### 4.4 可验收的功能行为（可直接作测试用例）

| # | 给定 / 当 / 则 | 对应原文思路 |
|---|---|---|
| 1 | 给定学生答错且未填归因，当点击「看答案」，则答案区保持隐藏，显示「请先写一句：我把 ___ 当成 ___」 | 整理交出去、理解留给孩子 |
| 2 | 给定已填归因，当提交，则展示四栏解析并解锁同错因变式题 | 错因要看到过程 |
| 3 | 给定变式通过，则该错因写入 D0/D2/D4/D7/D14 队列，今日任务不再出现原题 | 后续练习接上 |
| 4 | 给定同错因第 3 次错，则不晋级，改派低一级题并要求重新归因 | 换个数字还是错 |
| 5 | 给定整卷一次性提交，则系统拆为单题入库，不生成整卷答案页 | 单题裁剪、不整卷代做 |
| 6 | 给定解析由系统生成且教师未核对，则学生端显示「参考答案（待复核）」而非「标准答案」，教师端红标【待核实】 | 人工交叉核对 |
| 7 | 给定教师改正了依据，则原记录保留修改前后两份并可回翻 | 每道错题来路清楚 |
| 8 | 给定阅读推断题作答，当未圈依据句，则判不通过，即使结论接近参考答案 | 不臆测、不只看答案 |
| 9 | 给定口语或写作开放题，则不输出机器分数，只显示判定规则与教师/同伴打勾位 | 页面整齐不等于正确 |
| 10 | 给定单元开始，当未完成 2 道诊断题，则六技能练习入口不可点 | 先两道题试点再扩量 |
| 11 | 给定到期复现题，当进入今日任务，则按错因族聚在一起呈现，不按题型打散 | 按知识点归档 |
| 12 | 给定单元六条件未全满足，当查询完成状态，则显示「练习中」并列出未满足项 | 单元完成可验收 |
| 13 | 给定学生错答，当查看档案，则可同时看到学生错答、错误思路、标准解法与依据、知识点锚、复习建议五项 | 结构化输出 |
| 14 | 给定同一错因换词换境的变式，当答案与原题相同字符串，则仍按各自判定规则独立判分 | 验证迁移而非记答案 |

---

## 附：接入现有项目与边界标注

| 项目 | 内容 | 教学处理建议 |
|---|---|---|
| 接入方式 | 本文件题目按 `unit_id / item_id / skill / wrong_family / basis_type / basis_text / variant / review_due` 组织，可直接转为 `course.js` 数据，由既有练测区渲染；不新增第七个功能区 | 沿用设计稿六区，在「专题复习」与「练测」内承载课程单元 |
| 打印 | 单元题目、听力脚本（教师版）、变式题、复现安排可各自导出 A4；听力脚本不进学生版 | 打印件由同一数据生成 |
| 事实标注 | 主题材料、题目、脚本均为原创示意，非中考真题、非教材原文；省卷题型分值以官方真题卷为准【待核实】；教材单元与附录页码以课本实物为准【待核实】 | 不得当作真题或教材原文引用 |
| 复核 | 系统生成的解析一律标【待核实】，教师用标准答案或可靠题库交叉核对后才可作为「标准答案」 | 呼应文章风控 |
| 边界 | 不代写范文、不整卷代做、不机器评分作文与口语、不引入虚拟语气/倒装/独立主格等超纲内容、不承诺分数 | 超纲内容中考不作要求 |
| 适用范围 | 单个学生或普通班中等偏弱分段；不替代纸笔默写与作文手写 | 与既有适用边界一致 |

