/* ============================================================
   中考英语备考学习台 - 交互逻辑
   分区：状态 / 闸门 / 渲染 / 打印 / 事件 / 启动
   仅实现设计稿六个区与既定交互约定，不新增模块。
   ============================================================ */
(function () {
  'use strict';

  var D = window.APP_DATA;
  var KEY = 'zkeh_state_v1';
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };

  /* ---------------- 1. 状态 ---------------- */
  function defaults() {
    return {
      week: 1,
      role: 'student',
      view: 'nav',
      level: 'A',
      tasks: {},
      scores: {},
      answers: {},
      wordbook: [],
      wrongByBlock: {},
      minutes: {
        vocab: D.teacher.minutes.vocab,
        listening: D.teacher.minutes.listening,
        writing: D.teacher.minutes.writing,
        spare: D.teacher.minutes.spare
      },
      revealAfterSubmit: true,
      announcement: D.teacher.announcement,
      toggles: {}
    };
  }

  var state = defaults();
  try {
    var raw = window.localStorage.getItem(KEY);
    if (raw) {
      var saved = JSON.parse(raw);
      Object.keys(defaults()).forEach(function (k) {
        if (saved[k] !== undefined && saved[k] !== null) state[k] = saved[k];
      });
    }
  } catch (e) { /* 本机禁用存储时退化为内存状态 */ }

  function save() {
    try { window.localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* 忽略 */ }
  }

  /* ---------------- 2. 闸门与可见范围 ---------------- */
  function weekInfo(w) { return D.weeks[w - 1]; }
  function stageOf(w) { return D.stages[weekInfo(w).stage - 1]; }

  function writingOpen() { return state.week >= 2; }
  function mockOpen() { return state.week >= 2; }
  function levelCOpen() { return state.week >= 17; }
  function moduleEnabled(name) { return state.toggles[name] !== false; }
  function teacherAnswersVisible() { return state.role === 'teacher' || !state.revealAfterSubmit; }

  function blockOf(questionBlock) {
    if (questionBlock === '听力') return '听力';
    if (questionBlock === '阅读' || questionBlock === '完形') return '阅读理解';
    if (questionBlock === '写作') return '书面表达';
    return '语言运用';
  }

  /* ---------------- 3. 渲染：头部与闸门 ---------------- */
  function renderHeader() {
    var sel = $('weekSelect');
    sel.innerHTML = D.weeks.map(function (w) {
      return '<option value="' + w.w + '"' + (w.w === state.week ? ' selected' : '') +
        '>W' + (w.w < 10 ? '0' : '') + w.w + ' · ' + esc(w.date) + '</option>';
    }).join('');

    Array.prototype.forEach.call(document.querySelectorAll('#roleSwitch button'), function (b) {
      b.classList.toggle('active', b.getAttribute('data-role') === state.role);
    });
    Array.prototype.forEach.call(document.querySelectorAll('#levelSwitch button'), function (b) {
      b.classList.toggle('active', b.getAttribute('data-level') === state.level);
    });

    $('navTeacher').classList.toggle('locked', state.role !== 'teacher');
    $('navNote').textContent = state.role === 'teacher'
      ? '教师端：解析全量可见，可维护内容与配比；按周闸门仍生效。'
      : '学生一进来只看当周；作文与模拟检测自 W02 起开放，C 层练习自 W17 起开放。';
  }

  function renderGates() {
    Array.prototype.forEach.call(document.querySelectorAll('.nav-btn'), function (b) {
      var v = b.getAttribute('data-view');
      var nameMap = { nav: '阶段导航', books: '课本同步', topics: '专题复习', practice: '练测', tools: '工具与交付' };
      b.classList.toggle('locked', nameMap[v] ? !moduleEnabled(nameMap[v]) : false);
    });
    Array.prototype.forEach.call(document.querySelectorAll('.view'), function (s) {
      s.classList.toggle('active', s.id === 'view-' + state.view);
    });
    Array.prototype.forEach.call(document.querySelectorAll('.nav-btn'), function (b) {
      b.classList.toggle('active', b.getAttribute('data-view') === state.view);
    });
  }

  /* ---------------- 4. 渲染：阶段导航 ---------------- */
  function taskItems(w) {
    var list = [
      { id: 't1', text: '每日 10 词滚动听写条（7 新 3 旧，含中文提示与词形变化）' },
      { id: 't2', text: '教材音频听一句写一句 3 句 + 听力原文跟读 2 遍' },
      { id: 't3', text: '当天 3 个词各造 1 句，写进句型库并过自查清单' },
      { id: 't4', text: '周六周测 40 分钟：20 词 + 听力填空 + 作文提纲 + 任务型阅读（W09 起）' },
      { id: 't5', text: writingOpen() ? '周日错词回炉 + 作文第 2 稿（只改 3 处）' : '周日错词回炉（作文线 W02 起开放）' }
    ];
    return list;
  }

  function renderNav() {
    var w = weekInfo(state.week);
    var st = stageOf(state.week);
    var label = 'W' + (state.week < 10 ? '0' : '') + state.week;

    $('stageBadge').textContent = st.name.split('｜')[0];
    $('weekBig').textContent = label;
    $('weekDate').textContent = w.date + '  ·  ' + st.date;
    $('weekFocus').textContent = w.focus;
    $('stagePill').innerHTML =
      '<span class="badge blue">' + esc(st.weeks) + '</span>' +
      st.focus.map(function (f) { return '<span class="badge">' + esc(f) + '</span>'; }).join('');

    $('navNotice').innerHTML = state.week === 1
      ? '<div class="notice">W01 为渐进启动周：只上线课本同步、词汇线与听力线；作文与模拟检测自 W02 起开放，C 层练习自 W17 起开放。本周先做基线诊断，不设达标线。</div>'
      : '';

    var done = state.tasks[state.week] || {};
    var items = taskItems(state.week);
    $('taskList').innerHTML = items.map(function (it) {
      return '<div class="task-item' + (done[it.id] ? ' done' : '') + '">' +
        '<input type="checkbox" data-act="task" data-id="' + it.id + '"' + (done[it.id] ? ' checked' : '') + '>' +
        '<span>' + esc(it.text) + '</span></div>';
    }).join('');
    var n = items.filter(function (it) { return done[it.id]; }).length;
    $('taskProgressText').textContent = '本周完成 ' + n + ' / ' + items.length;
    $('taskProgressBar').style.width = Math.round(n / items.length * 100) + '%';

    var sc = state.scores[state.week] || {};
    var boardRows = D.teacher.examBlocks.map(function (b) {
      var v = sc[b.name];
      var pct = (v === undefined || v === '') ? null : Math.max(0, Math.min(100, Number(v)));
      return '<div class="between" style="padding:5px 0;border-bottom:1px dashed var(--border)">' +
        '<span class="small">' + esc(b.name) + ' <span class="tiny">/ ' + b.full + ' 分</span></span>' +
        '<span>' + (pct === null ? '<span class="tiny">未录入</span>' :
          '<b class="small">' + pct + '%</b> <span class="tiny">得分率</span>') + '</span></div>';
    }).join('');
    $('scoreBoard').innerHTML = boardRows || '';
    $('scoreHint').textContent = state.role === 'teacher'
      ? '教师端可录入本周分项得分率；按板块调下周任务，不按总分调。'
      : '学生端只读；分项得分率由教师录入，不做总分排名。';
    $('scoreEditor').innerHTML = state.role === 'teacher'
      ? '<h4>录入分项得分率（%）</h4>' + D.teacher.examBlocks.map(function (b) {
          return '<div class="setting-row"><span class="sname">' + esc(b.name) + '</span>' +
            '<input type="number" class="score-input" data-act="score" data-id="' + esc(b.name) +
            '" min="0" max="100" value="' + (sc[b.name] === undefined ? '' : esc(sc[b.name])) + '"></div>';
        }).join('')
      : '';

    $('weekGrid').innerHTML = D.weeks.map(function (x) {
      var lb = 'W' + (x.w < 10 ? '0' : '') + x.w;
      return '<div class="week-cell' + (x.w === state.week ? ' current' : '') +
        '" data-act="week" data-id="' + x.w + '" title="' + esc(x.focus) + '">' +
        lb + '<span class="d">' + esc(x.date) + '</span></div>';
    }).join('');

    $('stageLegend').innerHTML = D.stages.map(function (s) {
      return '<div class="kv"><b>' + esc(s.weeks) + '</b><span>' + esc(s.name) + '｜' +
        esc(s.date) + '｜' + esc(s.use) + '</span></div>';
    }).join('');

    $('baseline').innerHTML = '<ul class="clean small">' +
      D.mocks[0].items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') +
      '</ul><p class="tiny" style="margin-top:8px">' + esc(D.scoringNote) + '</p>';
    $('baselineCard').classList.toggle('locked', state.week !== 1);
  }

  /* ---------------- 5. 渲染：课本同步 ---------------- */
  function renderBooks() {
    $('bookNotice').textContent = '版本轴：' + D.meta.book + '。' + D.meta.bookSource;
    $('unitGrid').innerHTML = D.units.map(function (u) {
      var active = weekInfo(Math.min(state.week, 8)).unit === u.id && state.week <= 8;
      return '<div class="card unit-card"' + (active ? ' style="border-left:3px solid var(--primary)"' : '') + '>' +
        '<div class="between"><h3 style="margin:0">' + esc(u.name) + '</h3>' +
        (active ? '<span class="badge blue">当周</span>' : '<span class="badge">W' + (u.id < 10 ? '0' : '') + u.id + '</span>') + '</div>' +
        '<div class="kv"><b>语法</b><span>' + esc(u.grammar) + '</span></div>' +
        '<div class="kv"><b>话题</b><span>' + esc(u.topic) + '</span></div>' +
        '<div class="kv"><b>写作</b><span>' + esc(u.writing) + '</span></div>' +
        '<div class="kv"><b>词汇</b><span>' + esc(u.vocab) + '</span></div>' +
        '<div class="kv"><b>补欠账</b><span>' + esc(u.review) + '</span></div>' +
        '</div>';
    }).join('');

    $('appendixBody').innerHTML = D.appendix.map(function (a) {
      return '<tr><td>' + esc(a.name) + '</td><td>' + esc(a.page) + '</td><td>' + esc(a.use) + '</td></tr>';
    }).join('');
  }

  /* ---------------- 6. 渲染：专题复习 ---------------- */
  function renderTopics() {
    $('topicGrid').innerHTML = D.topics.map(function (t) {
      return '<div class="card topic-card"><div class="between"><h3 style="margin:0">' +
        esc(t.id) + ' ' + esc(t.name) + '</h3><span class="badge blue">' + esc(t.exam) + '</span></div>' +
        '<p class="tiny" style="margin:6px 0">主攻：' + esc(t.stage) + '</p>' +
        '<ul class="clean small muted">' + t.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') +
        '</ul></div>';
    }).join('');

    $('blockList').innerHTML = D.blocks.map(function (b) {
      return '<div class="card" style="margin-bottom:10px"><div class="between"><h3 style="margin:0">' +
        esc(b.name) + '</h3><span class="badge">' + esc(b.exam) + '</span></div>' +
        '<ul class="clean small muted" style="margin-top:8px">' +
        b.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul></div>';
    }).join('');
  }

  /* ---------------- 7. 渲染：练测 ---------------- */
  function norm(s) {
    return String(s || '').trim().toLowerCase()
      .replace(/[.,;:!?"'()]/g, '').replace(/\s+/g, '');
  }

  function visibleQuestions() {
    return D.questions.filter(function (q) {
      if (state.role !== 'teacher') {
        if (q.level !== state.level) return false;
        if (q.level === 'C' && !levelCOpen()) return false;
        if (q.openWeek > state.week) return false;
        if (q.block === '写作' && !writingOpen()) return false;
      }
      return true;
    });
  }

  function renderPractice() {
    var gate = [];
    if (state.level === 'C' && !levelCOpen()) gate.push('C 层自 W17 起开放');
    if (!writingOpen()) gate.push('作文题自 W02 起开放');
    if (state.role === 'teacher') gate.push('教师端：全量题目与解析可见');
    $('practiceGate').textContent = gate.join(' · ') || '按当周开放范围显示';

    var qs = visibleQuestions();
    $('questionList').innerHTML = qs.length ? qs.map(function (q) {
      var a = state.answers[q.id] || {};
      var submitted = !!a.submitted;
      var show = teacherAnswersVisible() || submitted;
      var isShort = q.answer.length <= 40;
      return '<div class="q-card">' +
        '<div class="q-head"><span class="badge blue">' + esc(q.block) + '</span>' +
        '<span class="badge">' + esc(q.level) + ' 层</span>' +
        '<span class="badge">W' + (q.openWeek < 10 ? '0' : '') + q.openWeek + ' 起</span>' +
        '<span class="tiny">' + esc(q.knowledge) + '</span></div>' +
        '<div class="q-stem"><b>' + esc(q.id) + '</b>　' + esc(q.stem) + '</div>' +
        '<div class="q-answer"><input type="text" data-act="answer" data-id="' + esc(q.id) +
          '" value="' + esc(a.value || '') + '" placeholder="先写你的答案与思路">' +
        '<button type="button" class="btn sm primary" data-act="submit" data-id="' + esc(q.id) + '">' +
          (submitted ? '已提交 · 重看' : '提交后看依据') + '</button>' +
        (submitted ? '<span class="tiny">' + (isShort ? (norm(a.value) === norm(q.answer) ? '答案一致' : '已汇入复现队列') : '开放题：对照自评') + '</span>' : '') +
        '</div>' +
        (show ? '' : '<div class="hint-box">先写思路与依据；提交后再显示答案。解析禁止只给最终答案。</div>') +
        '<div class="reveal' + (show ? '' : ' hidden') + '">' +
          '<div class="analysis-grid">' +
            '<div class="analysis-cell answer"><b>答案</b>' + esc(q.answer) + '</div>' +
            '<div class="analysis-cell"><b>依据类型</b>' + esc(q.basisType) + '</div>' +
            '<div class="analysis-cell"><b>具体依据 / 原文定位句</b>' + esc(q.basis) + '</div>' +
            '<div class="analysis-cell trap"><b>易错提醒</b>' + esc(q.trap) + '</div>' +
          '</div></div></div>';
    }).join('') : '<div class="card"><p class="small muted">当前层级与周次下没有开放题目。可切换层级或由教师端查看全量。</p></div>';

    $('weeklyTest').innerHTML = '<p class="small"><b>' + esc(D.weeklyTest.name) + '</b></p>' +
      '<ul class="clean small muted">' + D.weeklyTest.items.map(function (i) {
        return '<li>' + esc(i) + '</li>';
      }).join('') + '</ul><p class="tiny">' + esc(D.weeklyTest.rule) + '</p>';

    $('mockList').innerHTML = D.mocks.map(function (m) {
      var locked = m.name.indexOf('W01') === 0 ? false : (!mockOpen());
      return '<div class="card' + (locked ? ' locked' : '') + '" style="margin-bottom:8px;padding:11px">' +
        '<div class="between"><b class="small">' + esc(m.name) + '</b><span class="tiny">' + esc(m.when) + '</span></div>' +
        '<ul class="clean small muted" style="margin-top:5px">' + m.items.map(function (i) {
          return '<li>' + esc(i) + '</li>';
        }).join('') + '</ul>' +
        (locked ? '<p class="tiny">模拟检测自 W02 起开放；W01 只做基线诊断。</p>' : '') +
        '</div>';
    }).join('');
    $('scoringNote').textContent = D.scoringNote;
  }

  /* ---------------- 8. 渲染：工具与交付 ---------------- */
  function renderTools() {
    $('sentenceBank').innerHTML = D.tools.sentenceBank.map(function (s) {
      return '<div class="kv"><b>' + esc(s.ipa) + '</b><span>' + esc(s.en) + '　' + esc(s.cn) + '</span></div>';
    }).join('');

    $('writingTools').innerHTML =
      '<h4>自查清单</h4><ul class="clean small muted">' +
      D.tools.writingChecklist.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') +
      '</ul><h4>批改量表（五维）</h4><p class="small muted">' +
      D.tools.writingRubric.map(function (i) { return '<span class="badge" style="margin:0 4px 4px 0">' + esc(i) + '</span>'; }).join('') +
      '</p><p class="tiny">' + esc(D.tools.upgradeDemo) + '</p><p class="tiny">' + esc(D.tools.essayRule) + '</p>';
    if (!writingOpen()) {
      $('writingTools').innerHTML = '<div class="notice">作文线自 W02 起开放；W01 只启动词汇线与听力线。</div>' + $('writingTools').innerHTML;
    }

    $('wordbookRule').textContent = D.tools.wordbookRule;
    $('recallRule').textContent = D.tools.recallRule;
    $('wordbook').innerHTML = state.wordbook.length
      ? state.wordbook.map(function (x) {
          var due = (x.due || []).indexOf(state.week) >= 0;
          return '<span class="word-chip' + (due ? ' due' : '') + '" title="复现周次 W' +
            (x.due || []).join(' / W') + '">' + esc(x.w) + ' · ' + esc(x.cn) + '</span>';
        }).join('')
      : '<p class="tiny">暂无错词。答错客观题后自动汇入，按 2 / 4 / 7 / 14 天复现。</p>';

    $('printList').innerHTML = D.printables.map(function (p) {
      return '<div class="print-item"><div><div class="pname">' + esc(p.name) + '</div>' +
        '<div class="pnote">' + esc(p.note) + '</div></div>' +
        '<button type="button" class="btn sm" data-act="print" data-id="' + esc(p.id) + '">生成 A4 并打印</button></div>';
    }).join('');

    $('boundaries').innerHTML = D.boundaries.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('');
  }

  /* ---------------- 9. 渲染：教师维护 ---------------- */
  function renderTeacher() {
    $('teacherNotice').textContent = state.role === 'teacher'
      ? '教师端：可维护配比、解析可见范围、公告与内容上下架。按周开放闸门仍生效。'
      : '教师维护区仅教师端可操作；当前为学生端，设置项已锁定。';
    $('minutesNote').textContent = D.teacher.minutesNote;
    var keys = [['vocab', '词汇线'], ['listening', '听力线'], ['writing', '造句 / 作文线'], ['spare', '机动']];
    $('minutesEditor').innerHTML = keys.map(function (k) {
      return '<div class="setting-row"><span class="sname">' + k[1] + '</span>' +
        '<input type="number" min="0" max="60" data-act="minutes" data-id="' + k[0] +
        '" value="' + esc(state.minutes[k[0]]) + '"' + (state.role === 'teacher' ? '' : ' disabled') + '> 分钟</div>';
    }).join('');
    $('minutesTotal').textContent = keys.reduce(function (s, k) { return s + Number(state.minutes[k[0]] || 0); }, 0);

    $('revealAfterSubmit').checked = state.revealAfterSubmit;
    $('revealAfterSubmit').disabled = state.role !== 'teacher';
    $('visibilityNote').textContent = D.teacher.visibility +
      (state.role === 'teacher' ? '' : '（学生端不可更改）');
    $('announcement').value = state.announcement;
    $('announcement').disabled = state.role !== 'teacher';
    $('btnSaveAnnouncement').disabled = state.role !== 'teacher';

    $('toggleList').innerHTML = D.teacher.toggles.map(function (t) {
      var on = moduleEnabled(t);
      return '<div class="setting-row"><span class="sname">' + esc(t) + '</span>' +
        '<label class="check"><input type="checkbox" data-act="toggle" data-id="' + esc(t) + '"' +
        (on ? ' checked' : '') + (state.role === 'teacher' ? '' : ' disabled') + '> 上线</label></div>';
    }).join('');

    $('wrongBoard').innerHTML = D.teacher.examBlocks.map(function (b) {
      var n = state.wrongByBlock[b.name] || 0;
      return '<tr><td>' + esc(b.name) + '</td><td>' + b.full + ' 分</td><td>' + n + '</td>' +
        '<td class="small muted">' + (n ? '按错因归类后进入滚动听写条与同类题' : '本周暂无记录') + '</td></tr>';
    }).join('');
  }

  function renderAll() {
    renderHeader();
    renderGates();
    renderNav();
    renderBooks();
    renderTopics();
    renderPractice();
    renderTools();
    renderTeacher();
  }

  /* ---------------- 10. 打印（A4 导出） ---------------- */
  function sheetHead(title, sub) {
    return '<div class="ph"><h2>' + esc(title) + '</h2><div class="line"><span>' + esc(sub) +
      '</span><span>姓名：____________　日期：__________</span></div></div>';
  }
  function sheetFoot(extra) {
    return '<div class="foot">【可直接印发】由线上模块导出 · ' + esc(extra || '') +
      ' · 示意内容，非中考真题、非教材原文；不代写范文、不整卷代做。</div>';
  }

  function buildSheet(kind) {
    var w = weekInfo(state.week);
    var lb = 'W' + (state.week < 10 ? '0' : '') + state.week;
    var head = '';
    var body = '';

    if (kind === 'dictation') {
      var pool = D.words.slice(0, 10);
      head = sheetHead('每日 10 词滚动听写条', lb + ' · ' + w.date + ' · 7 新 3 旧');
      body = '<table><thead><tr><th style="width:6%">#</th><th style="width:28%">中文提示</th><th style="width:33%">英文拼写</th><th style="width:33%">词形变化 / 造句</th></tr></thead><tbody>' +
        pool.map(function (x, i) {
          return '<tr><td>' + (i + 1) + '</td><td>' + esc(x.cn) + (i >= 7 ? ' <b>（旧词复现）</b>' : '') +
            '</td><td class="blank"></td><td class="blank"></td></tr>';
        }).join('') + '</tbody></table>' +
        '<p>音标跟读：' + esc(pool.map(function (x) { return x.w + ' ' + x.ipa; }).join('；')) + '</p>' +
        '<p class="small">错 2 次以上的词进错词本，按第 2 / 4 / 7 / 14 天复现。</p>';
    } else if (kind === 'weekly') {
      head = sheetHead('周六周测卷', lb + ' · ' + D.weeklyTest.name);
      body = D.weeklyTest.items.map(function (i, idx) {
        return '<h3>' + (idx + 1) + '. ' + esc(i) + '</h3><div class="grid-lines"></div>';
      }).join('') + '<p class="small">三项各记正确率，不记总分排名。</p>';
    } else if (kind === 'essay') {
      head = sheetHead('作文格纸与自查清单', lb + ' · 60 词起步 → 80 词左右');
      body = '<div class="grid-lines" style="height:230px"></div><h3>自查清单</h3><table><thead><tr><th>项目</th><th>已检查</th></tr></thead><tbody>' +
        D.tools.writingChecklist.map(function (i) { return '<tr><td>' + esc(i) + '</td><td>□</td></tr>'; }).join('') +
        '</tbody></table><p class="small">' + esc(D.tools.essayRule) + '</p>';
    } else if (kind === 'wordcard') {
      head = sheetHead('错词卡', lb + ' · ' + D.tools.wordbookRule);
      var list = state.wordbook.length ? state.wordbook : [{ w: '（示意）', cn: '暂无错词', ipa: '', due: [] }];
      body = '<table><thead><tr><th>词 / 知识点</th><th>中文</th><th>话题</th><th>复现日期（2/4/7/14 天）</th></tr></thead><tbody>' +
        list.map(function (x) { return '<tr><td>' + esc(x.w) + '</td><td>' + esc(x.cn) + '</td><td>' + esc(x.topic || '—') + '</td><td>W' + (x.due || []).join(' / W') + '</td></tr>'; }).join('') +
        '</tbody></table>';
    } else if (kind === 'unitwords') {
      head = sheetHead('单元词表（示意）', D.meta.book + ' · 实际按课本单元词表替换');
      body = '<table><thead><tr><th>词</th><th>音标</th><th>中文</th><th>话题</th></tr></thead><tbody>' +
        D.words.slice(0, 15).map(function (x) {
          return '<tr><td>' + esc(x.w) + '</td><td>' + esc(x.ipa) + '</td><td>' + esc(x.cn) + '</td><td>' + esc(x.topic) + '</td></tr>';
        }).join('') + '</tbody></table>';
    } else if (kind === 'analysis') {
      head = sheetHead('依据型解析讲义（教师讲评用）', '四栏：答案 / 依据类型 / 具体依据 / 易错提醒');
      body = '<table><thead><tr><th style="width:8%">题号</th><th style="width:30%">题干</th><th style="width:12%">答案</th><th style="width:12%">依据类型</th><th style="width:22%">具体依据</th><th style="width:16%">易错提醒</th></tr></thead><tbody>' +
        D.questions.map(function (q) {
          return '<tr><td>' + esc(q.id) + '</td><td>' + esc(q.stem) + '</td><td>' + esc(q.answer) + '</td><td>' + esc(q.basisType) + '</td><td>' + esc(q.basis) + '</td><td>' + esc(q.trap) + '</td></tr>';
        }).join('') + '</tbody></table>';
    } else if (kind === 'stage') {
      head = sheetHead('阶段测卷 · 四大板块分项统计', lb + ' · 只报分项得分率，不排名');
      body = '<table><thead><tr><th>板块</th><th>卷面满分</th><th>得分</th><th>得分率</th><th>错因归类</th></tr></thead><tbody>' +
        D.teacher.examBlocks.map(function (b) {
          return '<tr><td>' + esc(b.name) + '</td><td>' + b.full + '</td><td class="blank"></td><td class="blank"></td><td class="blank"></td></tr>';
        }).join('') + '</tbody></table><p class="small">' + esc(D.scoringNote) + '</p>';
    }

    return '<div class="print-sheet">' + head + body + sheetFoot(D.meta.disclaimer) + '</div>';
  }

  function doPrint(kind) {
    $('print-root').innerHTML = buildSheet(kind);
    window.setTimeout(function () { window.print(); }, 60);
  }

  /* ---------------- 11. 事件 ---------------- */
  function addWrong(q) {
    var exists = state.wordbook.some(function (x) { return x.w === q.knowledge; });
    if (!exists) {
      state.wordbook.push({
        w: q.knowledge,
        cn: q.block + ' · ' + q.id,
        ipa: '',
        topic: q.block,
        addedWeek: state.week,
        due: [state.week, state.week + 1, state.week + 1, state.week + 2]
      });
    }
    var b = blockOf(q.block);
    state.wrongByBlock[b] = (state.wrongByBlock[b] || 0) + 1;
  }

  document.addEventListener('click', function (ev) {
    var t = ev.target.closest('[data-act], .nav-btn, #roleSwitch button, #levelSwitch button');
    if (!t) return;

    if (t.closest('#roleSwitch')) {
      state.role = t.getAttribute('data-role');
      if (state.role === 'student' && state.view === 'teacher') state.view = 'nav';
      save(); renderAll(); return;
    }
    if (t.closest('#levelSwitch')) {
      state.level = t.getAttribute('data-level');
      save(); renderAll(); return;
    }
    if (t.classList.contains('nav-btn')) {
      var v = t.getAttribute('data-view');
      if (v === 'teacher' && state.role !== 'teacher') {
        window.alert('教师维护区仅教师端可进入，请先切换为教师端。'); return;
      }
      var nameMap = { nav: '阶段导航', books: '课本同步', topics: '专题复习', practice: '练测', tools: '工具与交付' };
      if (nameMap[v] && !moduleEnabled(nameMap[v])) {
        window.alert('该模块已由教师端下架。'); return;
      }
      state.view = v; save(); renderAll(); return;
    }

    var act = t.getAttribute('data-act');
    var id = t.getAttribute('data-id');

    if (act === 'week') { state.week = Number(id); save(); renderAll(); }
    else if (act === 'task') {
      var box = state.tasks[state.week] || (state.tasks[state.week] = {});
      box[id] = t.checked; save(); renderNav();
    }
    else if (act === 'submit') {
      var input = document.querySelector('[data-act="answer"][data-id="' + id + '"]');
      var q = D.questions.filter(function (x) { return x.id === id; })[0];
      if (!q) return;
      var val = input ? input.value : '';
      if (!val.trim()) { window.alert('请先写一个答案或思路，再提交。'); return; }
      var prev = state.answers[id] || {};
      var isShort = q.answer.length <= 40;
      var wrong = isShort && norm(val) !== norm(q.answer);
      if (wrong && !prev.submitted) addWrong(q);
      state.answers[id] = { value: val, submitted: true };
      save(); renderPractice(); renderTools(); renderTeacher();
    }
    else if (act === 'score') { /* change 事件处理 */ }
    else if (act === 'print') { doPrint(id); }
    else if (act === 'toggle') { /* change 事件处理 */ }
    else if (act === 'minutes') { /* change 事件处理 */ }
  });

  document.addEventListener('change', function (ev) {
    var t = ev.target;
    var act = t.getAttribute('data-act');
    if (!act) {
      if (t.id === 'revealAfterSubmit') {
        state.revealAfterSubmit = t.checked; save(); renderPractice(); renderTeacher();
      }
      return;
    }
    var id = t.getAttribute('data-id');
    if (act === 'score') {
      var sc = state.scores[state.week] || (state.scores[state.week] = {});
      sc[id] = t.value === '' ? '' : Math.max(0, Math.min(100, Number(t.value)));
      save(); renderNav();
    } else if (act === 'toggle') {
      state.toggles[id] = t.checked; save(); renderAll();
    } else if (act === 'minutes') {
      state.minutes[id] = Math.max(0, Math.min(60, Number(t.value) || 0));
      save(); renderTeacher();
    } else if (act === 'task') {
      /* 由 click 事件处理 checkbox */
    }
  });

  $('weekSelect').addEventListener('change', function () {
    state.week = Number(this.value); save(); renderAll();
  });
  $('btnQuickPrint').addEventListener('click', function () { doPrint('dictation'); });
  $('btnResetTasks').addEventListener('click', function () {
    state.tasks[state.week] = {}; save(); renderNav();
  });
  $('btnAddWrong').addEventListener('click', function () {
    var unused = D.words.filter(function (x) {
      return !state.wordbook.some(function (y) { return y.w === x.w; });
    });
    if (!unused.length) return;
    var x = unused[0];
    state.wordbook.push({
      w: x.w, cn: x.cn, ipa: x.ipa, topic: x.topic, addedWeek: state.week,
      due: [state.week, state.week + 1, state.week + 1, state.week + 2]
    });
    save(); renderTools();
  });
  $('btnSaveAnnouncement').addEventListener('click', function () {
    state.announcement = $('announcement').value; save();
    window.alert('公告已保存到本机。');
  });

  /* ---------------- 12. 启动 ---------------- */
  renderAll();
})();
