/* ============================================================
   错因驱动课程任务流（course-app.js）
   挂载位置：练测区 #courseRoot，不新增第七个功能区。
   独立命名空间 data-cact / 独立本地存储 key，避免与 app.js 冲突。
   状态机与验收行为见 COURSE-CONTENT.md 1 / 4.3 / 4.4。
   ============================================================ */
(function () {
  'use strict';

  var C = window.COURSE_DATA;
  var KEY = 'zkeh_course_v1';
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };
  var norm = function (s) {
    return String(s || '').toLowerCase()
      .replace(/[.,;:!?'"`（）()，。；：！？、"'\/|]/g, ' ')
      .replace(/\s+/g, ' ').trim();
  };
  var fmtDate = function (d) {
    return d.getFullYear() + '-' +
      ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  };
  /* 一律用本地日历日计算，避免 toISOString() 在东八区把日期退回前一天 */
  var today = function () { return fmtDate(new Date()); };
  var addDays = function (base, n) {
    var p = String(base).split('-');
    var d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
    d.setDate(d.getDate() + n);
    return fmtDate(d);
  };

  /* ---------------- 状态 ---------------- */
  function defaults() {
    return {
      unit: 'A', tab: 'today', active: null, variantActive: null,
      ptab: 'classic', role: 'student', week: 1,
      records: {}, reviews: {}, familyErrors: {},
      d2Done: {}, bulkImported: {}, log: []
    };
  }
  var S = defaults();
  try {
    var raw = window.localStorage.getItem(KEY);
    if (raw) {
      var saved = JSON.parse(raw);
      Object.keys(defaults()).forEach(function (k) {
        if (saved[k] !== undefined && saved[k] !== null) S[k] = saved[k];
      });
    }
  } catch (e) { /* 禁用存储时退化为内存 */ }
  function save() {
    try { window.localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* 忽略 */ }
  }

  /* ---------------- 取数与工具 ---------------- */
  function unit(id) { return C.units.filter(function (u) { return u.id === (id || S.unit); })[0]; }
  function allItems(u) {
    return u.diagnostics.concat(u.items).concat(u.variants);
  }
  function findItem(id) {
    var found = null;
    C.units.forEach(function (u) {
      allItems(u).forEach(function (q) { if (q.id === id) found = q; });
    });
    return found;
  }
  function unitOfItem(id) {
    var r = null;
    C.units.forEach(function (u) {
      allItems(u).forEach(function (q) { if (q.id === id) r = u.id; });
    });
    return r;
  }
  function isVariant(id) { return /-B\d/.test(id); }
  function isDiagnostic(id) { return /-D\d/.test(id); }
  function rec(id) { return S.records[id]; }
  function verified(q) { return rec(q.id) && rec(q.id).teacher_verified === true; }
  function answerLabel(q) {
    return verified(q) ? '标准答案' : '参考答案（待复核）';
  }
  function diagDone(u) {
    return u.diagnostics.every(function (q) {
      var r = rec(q.id); return r && r.submitted && r.wrong_family;
    });
  }
  function passed(r) { return r && (r.state === 'correct' || r.state === 'open-pass' || r.state === 'mastered' || r.state === 'variant-pass'); }

  /* 单元完成六条件 */
  function completion(u) {
    var ids = allItems(u).map(function (q) { return q.id; });
    var rs = ids.map(rec).filter(Boolean);
    var diagSubmitted = u.diagnostics.filter(function (q) { var r = rec(q.id); return r && r.submitted; }).length;
    var skills = {};
    rs.forEach(function (r) { if (passed(r) && !isVariant(r.id) && !isDiagnostic(r.id)) skills[r.skill] = true; });
    var c2 = C.skills.every(function (s) { return !!skills[s]; });
    /* 只统计真正答错或已归因的记录；答对的变式题不计入归因分母 */
    var wrongs = rs.filter(function (r) {
      return r.state === 'wrong' || r.state === 'attributed' || !!r.attribution;
    });
    var c3 = wrongs.length > 0 && wrongs.every(function (r) { return !!r.attribution; });
    var vr = rs.filter(function (r) { return isVariant(r.id) && (r.state === 'variant-pass' || r.state === 'mastered' || r.state === 'correct' || r.state === 'open-pass'); });
    var vAll = rs.filter(function (r) { return isVariant(r.id) && r.submitted; });
    var c4 = vAll.length > 0 && (vr.length / vAll.length) >= 0.8;
    var rv = S.reviews[u.id] || [];
    var c5 = rv.length === 5 && !!S.d2Done[u.id];
    var c6 = rs.length > 0 && rs.every(function (r) { return !!r.basis_source; });
    return [
      { id: 'c1', ok: diagSubmitted === 2, detail: '诊断 ' + diagSubmitted + '/2' },
      { id: 'c2', ok: c2, detail: '已达标技能 ' + Object.keys(skills).length + '/6' },
      { id: 'c3', ok: c3, detail: wrongs.length ? '归因 ' + wrongs.filter(function (r) { return !!r.attribution; }).length + '/' + wrongs.length : '暂无错题' },
      { id: 'c4', ok: c4, detail: '变式通过 ' + vr.length + '/' + vAll.length },
      { id: 'c5', ok: c5, detail: '复现时点 ' + rv.length + '/5，D2 ' + (S.d2Done[u.id] ? '已完成' : '未完成') },
      { id: 'c6', ok: c6, detail: '解析标注 ' + rs.filter(function (r) { return !!r.basis_source; }).length + '/' + rs.length }
    ];
  }
  function unitState(u) {
    var cp = completion(u);
    if (cp.every(function (x) { return x.ok; })) return '已掌握';
    if (!diagDone(u)) return '诊断中';
    if (rec(allItems(u)[0].id) || Object.keys(S.records).some(function (k) { return unitOfItem(k) === u.id; })) return '练习中';
    return '未开始';
  }

  /* ---------------- 提交与判定 ---------------- */
  function judge(q, payload) {
    if (q.type === 'choice') {
      return norm(payload.value) === norm(q.answer) ? 'correct' : 'wrong';
    }
    if (q.type === 'fill') {
      var pool = [q.answer].concat(q.accept || []);
      return pool.some(function (a) { return norm(a) === norm(payload.value); }) ? 'correct' : 'wrong';
    }
    if (q.type === 'evidence') {
      var hasE = (q.evidenceKeys || []).some(function (k) { return norm(payload.evidence).indexOf(norm(k)) >= 0; });
      var hasA = norm(payload.value).length > 0;
      return (hasE && hasA) ? 'correct' : 'wrong';
    }
    /* open / self：不机器评分，按自查项判定 */
    var total = (q.selfCheck || []).length;
    var checked = (payload.checks || []).length;
    return (norm(payload.value).length > 0 && total > 0 && checked === total) ? 'open-pass' : 'wrong';
  }

  function writeRecord(q, payload, result, extra) {
    var u = unit(unitOfItem(q.id));
    var old = S.records[q.id] || {};
    var record = {
      id: q.id, unit: u.id, skill: q.skill, wrong_family: q.family,
      student_answer: payload.value || (payload.checks || []).join(' / '),
      evidence: payload.evidence || '',
      checks: payload.checks || [],
      submitted: true,
      wrong_step: result === 'wrong' ? (q.type === 'evidence' ? '未圈出原文依据句或结论无据' : (q.type === 'choice' || q.type === 'fill' ? '答案与依据不符' : '自查项未勾满')) : '',
      attribution: old.attribution || '',
      basis_type: q.basisType, basis: q.basis,
      basis_source: q.source, trap: q.trap,
      teacher_verified: !!old.teacher_verified,
      basis_edited: old.basis_edited || null,
      variant: q.variant || '', variant_result: old.variant_result || '',
      state: result, attempts: (old.attempts || 0) + 1,
      at: today()
    };
    if (extra) Object.keys(extra).forEach(function (k) { record[k] = extra[k]; });
    S.records[q.id] = record;
    return record;
  }

  function bumpFamily(q) {
    var key = unitOfItem(q.id) + '::' + q.family;
    S.familyErrors[key] = (S.familyErrors[key] || 0) + 1;
    return S.familyErrors[key];
  }

  function scheduleReviews(u, q) {
    var base = today();
    S.reviews[u.id] = Object.keys(C.reviewOffsets).map(function (at) {
      return { at: at, due: addDays(base, C.reviewOffsets[at]), family: q.family, rule: (u.reviews.filter(function (r) { return r.at === at; })[0] || {}).pass || '', done: false, doneAt: '' };
    });
    S.log.unshift({ at: today(), text: q.id + ' 变式通过 → 错因「' + q.family + '」写入 D0/D2/D4/D7/D14 复现队列，今日不再派原题。' });
  }

  function collectPayload(q) {
    var root = $('course-answer');
    if (!root) return { value: '', checks: [], evidence: '' };
    var val = root.querySelector('[data-cfield="value"]:checked') ||
      root.querySelector('input[type="text"][data-cfield="value"]') ||
      root.querySelector('textarea[data-cfield="value"]');
    var ev = root.querySelector('[data-cfield="evidence"]');
    var checks = [];
    root.querySelectorAll('[data-cfield="check"]:checked').forEach(function (c) { checks.push(c.value); });
    return {
      value: val ? val.value : (checks.length ? checks.join(' / ') : ''),
      evidence: ev ? ev.value : '', checks: checks
    };
  }

  function submit(q) {
    var payload = collectPayload(q);
    if (q.type !== 'self' && !norm(payload.value) && !(q.selfCheck && q.selfCheck.length)) {
      window.alert('请先写答案或思路，再提交。'); return;
    }
    var result = judge(q, payload);
    var prev = S.records[q.id];
    writeRecord(q, payload, result);

    if (result === 'wrong') {
      var n = bumpFamily(q);
      S.log.unshift({ at: today(), text: q.id + ' 判定未达标，错因「' + q.family + '」第 ' + n + ' 次；答案区已锁定，等待学生归因。' });
      if (n >= 3) {
        S.log.unshift({ at: today(), text: '同错因第 3 次错 → 不晋级，改派 L1 降级题 A-V2 并要求重新归因。' });
      }
    } else {
      S.log.unshift({ at: today(), text: q.id + ' 达标；四栏解析已解锁。' });
      if (isVariant(q.id)) {
        S.records[q.id].variant_result = '通过';
        S.records[q.id].state = 'variant-pass';
        scheduleReviews(unit(unitOfItem(q.id)), q);
        /* 回写原题的变式结果 */
        Object.keys(S.records).forEach(function (k) {
          if (S.records[k].variant === q.id) S.records[k].variant_result = '通过';
        });
      }
    }
    if (prev && prev.attribution) S.records[q.id].attribution = prev.attribution;
    save(); render();
  }

  function submitAttribution(q) {
    var el = $('course-attr-input');
    var txt = el ? el.value.trim() : '';
    if (!txt) { window.alert('请写一句归因，例如：我把 ______ 当成 ______。'); return; }
    var r = S.records[q.id];
    if (!r) return;
    r.attribution = txt;
    r.state = 'attributed';
    S.log.unshift({ at: today(), text: q.id + ' 归因已填 → 解锁四栏解析并派发同错因变式题 ' + (q.variant || '—') + '。' });
    save(); render();
  }

  /* ---------------- 渲染：外壳 ---------------- */
  function render() {
    var root = $('courseRoot');
    if (!root) return;
    var u = unit();
    var cp = completion(u);
    var st = unitState(u);
    var tabs = [
      { id: 'today', name: '今日任务' },
      { id: 'unit', name: '单元精练' },
      { id: 'review', name: '复现队列' },
      { id: 'archive', name: '错因档案' }
    ];
    if (S.role === 'teacher') tabs.push({ id: 'teacher', name: '教师复核' });

    root.innerHTML =
      '<div class="course-shell">' +
      '<div class="course-top"><div><b>错因任务流</b> <span class="tiny muted">· 一次一题、一归因、一变式 · 挂载于练测区，不新增功能区</span></div>' +
      '<div class="row"><span class="badge blue">' + esc(S.role === 'teacher' ? '教师端' : '学生端') + '</span>' +
      '<span class="badge">W' + (S.week < 10 ? '0' : '') + S.week + '</span></div></div>' +

      '<div class="unit-tabs">' + C.units.map(function (x) {
        var s = unitState(x);
        return '<button type="button" class="unit-tab' + (x.id === S.unit ? ' active' : '') + '" data-cact="unit" data-id="' + x.id + '">' +
          '<b>单元 ' + x.id + ' · ' + esc(x.level) + '</b><span>' + esc(x.title) + '</span>' +
          '<em>' + esc(s) + ' · W' + (x.week < 10 ? '0' : '') + x.week + '</em></button>';
      }).join('') + '</div>' +

      '<div class="course-tabs">' + tabs.map(function (t) {
        return '<button type="button" class="ctab' + (S.tab === t.id ? ' active' : '') + '" data-cact="tab" data-id="' + t.id + '">' + t.name + '</button>';
      }).join('') + '</div>' +

      '<div class="card compact"><div class="between"><b class="small">单元完成条件（' + cp.filter(function (x) { return x.ok; }).length + '/6）· 当前状态：' + esc(st) + '</b>' +
      '<span class="tiny muted">连续 2 次复现正确且变式通过才晋级</span></div>' +
      '<div class="cond-grid">' + cp.map(function (x, i) {
        return '<div class="cond' + (x.ok ? ' ok' : '') + '"><span>' + (x.ok ? '✓' : (i + 1)) + '</span>' + esc(C.completion[i].label) + '<em>' + esc(x.detail) + '</em></div>';
      }).join('') + '</div></div>' +

      '<div id="course-body">' +
      (S.tab === 'today' ? renderToday(u) : '') +
      (S.tab === 'unit' ? renderUnit(u) : '') +
      (S.tab === 'review' ? renderReview(u) : '') +
      (S.tab === 'archive' ? renderArchive(u) : '') +
      (S.tab === 'teacher' ? renderTeacher(u) : '') +
      '</div>' +

      '<div class="course-foot"><div class="row">' +
      '<button type="button" class="btn sm" data-cact="print" data-id="student">导出本单元题目 A4（学生版）</button>' +
      (S.role === 'teacher' ? '<button type="button" class="btn sm" data-cact="print" data-id="teacher">导出听力脚本 A4（教师版）</button>' : '') +
      '<button type="button" class="btn sm" data-cact="bulk">整卷提交（演示拆为单题）</button>' +
      '<button type="button" class="btn sm ghost" data-cact="reset">清空本机练习记录</button>' +
      '</div><p class="tiny muted" style="margin:6px 0 0">' + esc(C.meta.note) + '</p></div>' +
      '</div>';
    applyPtab();
  }

  function applyPtab() {
    var classic = $('classicPractice');
    var course = $('courseRoot');
    if (!classic || !course) return;
    var isCourse = S.ptab === 'course';
    classic.classList.toggle('hidden', isCourse);
    course.classList.toggle('hidden', !isCourse);
    Array.prototype.forEach.call(document.querySelectorAll('#practiceSwitch button'), function (b) {
      b.classList.toggle('active', b.getAttribute('data-ptab') === S.ptab);
    });
  }

  /* ---------------- 渲染：今日任务 ---------------- */
  function renderToday(u) {
    var due = (S.reviews[u.id] || []).filter(function (r) { return !r.done && r.due <= today(); });
    var byFam = {};
    due.forEach(function (r) { (byFam[r.family] = byFam[r.family] || []).push(r); });

    var next = null;
    if (!diagDone(u)) {
      next = u.diagnostics.filter(function (q) { return !(rec(q.id) && rec(q.id).submitted); })[0] || u.diagnostics[0];
    } else {
      next = u.items.filter(function (q) { return !passed(rec(q.id)); })[0] || null;
    }

    var html = '<div class="grid grid-2">' +
      '<div class="card"><h3>下一道题</h3>' +
      (next ? '<p class="small">' + esc(next.id) + ' · ' + esc(next.skill) + ' · ' + esc(next.id.indexOf('-D') > 0 ? '诊断' : '六技能') + '</p>' +
        '<p class="small muted">' + esc(next.stem.slice(0, 78)) + (next.stem.length > 78 ? '…' : '') + '</p>' +
        '<button type="button" class="btn sm primary" data-cact="open" data-id="' + next.id + '">开始本题</button>'
        : '<p class="small muted">本单元六技能已全部达标，请到「复现队列」完成到期复现。</p>') +
      '<p class="tiny" style="margin-top:8px">诊断 2 题未完成时，六技能入口锁定（先两道题试点再扩量）。</p></div>' +

      '<div class="card"><h3>到期复现（按错因族聚合）</h3>' +
      (due.length ? Object.keys(byFam).map(function (f) {
        return '<div class="fam-block"><b class="small">' + esc(f) + '</b>' +
          byFam[f].map(function (r) {
            return '<div class="between tiny"><span>' + esc(r.at) + ' · 到期 ' + esc(r.due) + '</span>' +
              '<button type="button" class="btn xs" data-cact="review-done" data-id="' + esc(r.at) + '">标记完成</button></div>';
          }).join('') + '</div>';
      }).join('') : '<p class="small muted">暂无到期复现题。变式通过后会写入 D0/D2/D4/D7/D14 队列。</p>') +
      '</div></div>';

    var pending = Object.keys(S.records).filter(function (k) { return S.records[k].state === 'wrong'; });
    if (pending.length) {
      html += '<div class="card warn"><b class="small">待归因（答案区仍锁定）</b><p class="small">' +
        pending.map(function (k) { return '<button type="button" class="btn xs" data-cact="open" data-id="' + k + '">' + esc(k) + '</button>'; }).join(' ') +
        '</p></div>';
    }

    var recent = S.log.slice(0, 5);
    html += '<div class="card"><h3>最近动作</h3>' +
      (recent.length ? '<ul class="clean small muted">' + recent.map(function (l) { return '<li>' + esc(l.at) + '　' + esc(l.text) + '</li>'; }).join('') + '</ul>' : '<p class="small muted">暂无记录。先做 2 道诊断题。</p>') +
      '</div>';
    return html;
  }

  /* ---------------- 渲染：单元精练 ---------------- */
  function renderUnit(u) {
    var showMaterials = diagDone(u);
    var html = '<div class="card"><div class="between"><h3>单元 ' + esc(u.id) + ' · ' + esc(u.title) + '</h3>' +
      '<span class="badge">' + esc(u.level) + ' · ' + esc(u.minutes) + ' 分钟</span></div>' +
      '<p class="small muted">错因族：' + esc(u.family) + '</p>' +
      '<div class="grid grid-2"><div><b class="small">学习目标</b><ol class="clean small">' +
      u.goals.map(function (g) { return '<li>' + esc(g) + '</li>'; }).join('') + '</ol></div>' +
      '<div><b class="small">主题材料</b><p class="small"><b>' + esc(u.material.title) + '</b></p>' +
      '<p class="small muted" style="white-space:pre-line">' + esc(u.material.text) + '</p>' +
      (u.readingText ? '<p class="small"><b>' + esc(u.readingText.title) + '</b></p><p class="small muted">' + esc(u.readingText.text) + '</p>' : '') +
      '</div></div>' +
      '<div class="word-strip">' + u.words.map(function (w) {
        return '<span class="word-chip"><b>' + esc(w.w) + '</b> ' + esc(w.ipa) + ' ' + esc(w.cn) + '</span>';
      }).join('') + '</div></div>';

    html += '<div class="card"><h3>诊断闸门（2 题）</h3>' +
      u.diagnostics.map(function (q) { return miniRow(q); }).join('') +
      (showMaterials ? '<p class="tiny">诊断已完成，六技能练习入口已解锁。</p>' : '<p class="tiny warn-text">先完成 2 道诊断题并填写归因，六技能练习才可点开。</p>') +
      '</div>';

    if (showMaterials) {
      html += '<div class="card"><h3>六技能练习（' + u.items.length + ' 题）</h3>' +
        C.skills.map(function (s) {
          var qs = u.items.filter(function (q) { return q.skill === s; });
          return '<div class="skill-row"><b class="small">' + esc(s) + '</b><div class="row wrap">' +
            qs.map(function (q) { return miniRow(q, true); }).join('') + '</div></div>';
        }).join('') + '</div>';

      var vr = u.variants.filter(function (q) {
        var r = rec(q.id); return r && r.submitted;
      });
      html += '<div class="card"><h3>同错因变式（换词换境）</h3>' +
        u.variants.map(function (q) { return miniRow(q); }).join('') +
        '<p class="tiny muted">变式由「答错 → 归因」后派发；通过后写入复现队列，今日不再出现原题。</p></div>';
    }

    /* 单题卡：一次只呈现一道 */
    var active = S.active ? findItem(S.active) : null;
    if (active) html += renderQuestion(active);
    return html;
  }

  function miniRow(q, compact) {
    var r = rec(q.id);
    var label = !r || r.state === 'unanswered' || r.state === 'imported' ? '未作答' :
      (r.state === 'wrong' ? '待归因' : (passed(r) ? '已达标' : '已归因'));
    var cls = r ? (r.state === 'wrong' ? 'bad' : (passed(r) ? 'good' : 'mid')) : '';
    return '<button type="button" class="mini-q ' + cls + (S.active === q.id ? ' active' : '') + '" data-cact="open" data-id="' + q.id + '">' +
      '<b>' + esc(q.id) + '</b>' + (compact ? '' : '<span>' + esc(q.skill) + '</span>') + '<em>' + esc(label) + '</em></button>';
  }

  /* ---------------- 渲染：单题卡 ---------------- */
  function answerArea(q, r) {
    var disabled = r && r.submitted ? ' disabled' : '';
    var html = '<div id="course-answer" class="answer-area">';
    if (q.type === 'choice') {
      html += '<div class="choice-row">' + (q.options || []).map(function (o) {
        var v = String(o).trim().charAt(0);
        return '<label class="choice"><input type="radio" name="cq-' + esc(q.id) + '" data-cfield="value" value="' + esc(v) + '"' + disabled + '> ' + esc(o) + '</label>';
      }).join('') + '</div>';
      html += '<p class="tiny muted">输入选项字母也可：<input type="text" class="inline-input" data-cfield="value" placeholder="A / B / C / D"' + disabled + '></p>';
    } else if (q.type === 'evidence') {
      html += '<label class="small">你的答案<br><textarea rows="2" data-cfield="value" placeholder="先写结论"' + disabled + '>' + esc(r ? r.student_answer : '') + '</textarea></label>' +
        '<label class="small">原文依据句（必填，未圈依据句即使结论接近也判不通过）<br><textarea rows="2" data-cfield="evidence" placeholder="抄下原文定位句"' + disabled + '>' + esc(r ? r.evidence : '') + '</textarea></label>';
    } else if (q.type === 'open' || q.type === 'self') {
      html += '<label class="small">作答 / 思路（开放题不机器评分、不代写范文）<br><textarea rows="3" data-cfield="value" placeholder="写你的作答或口头复述要点"' + disabled + '>' + esc(r ? r.student_answer : '') + '</textarea></label>' +
        '<div class="checks"><b class="tiny">自查项（须全部勾选）</b>' +
        (q.selfCheck || []).map(function (c, i) {
          var on = r && (r.checks || []).indexOf(c) >= 0;
          return '<label class="check"><input type="checkbox" data-cfield="check" value="' + esc(c) + '"' + (on ? ' checked' : '') + disabled + '> ' + esc(c) + '</label>';
        }).join('') + '</div>';
    } else {
      html += '<label class="small">你的答案<br><input type="text" class="wide" data-cfield="value" placeholder="多个空用 / 或空格分隔" value="' + esc(r ? r.student_answer : '') + '"' + disabled + '></label>';
    }
    html += '</div>';
    return html;
  }

  function fourCols(q) {
    var v = verified(q);
    var r = rec(q.id);
    return '<div class="analysis-grid four">' +
      '<div class="analysis-cell answer"><b>' + esc(answerLabel(q)) + '</b>' + esc(q.answer) +
      '<p class="tiny">' + esc(q.rule || '') + '</p></div>' +
      '<div class="analysis-cell"><b>依据类型</b>' + esc(q.basisType) + '</div>' +
      '<div class="analysis-cell"><b>具体依据 / 原文定位句</b>' + esc((r && r.basis_edited) || q.basis) + '</div>' +
      '<div class="analysis-cell trap"><b>易错提醒</b>' + esc(q.trap) + '</div>' +
      '</div>' +
      '<p class="tiny ' + (v ? '' : 'warn-text') + '">依据来源：' + esc(v ? '教师已复核' : q.source) +
      (v ? '' : '　· 学生端不显示「标准答案」字样，教师端可交叉核对') + '</p>';
  }

  function renderQuestion(q) {
    var r = rec(q.id);
    var u = unit(unitOfItem(q.id));
    var fb = (u.feedback || []).filter(function (f) { return f.family === q.family; })[0] || {};
    var wrongLocked = r && r.state === 'wrong';
    var attributed = r && (r.state === 'attributed' || r.state === 'variant-pass' || r.state === 'mastered' || r.state === 'correct' || r.state === 'open-pass');
    var downgraded = (S.familyErrors[u.id + '::' + q.family] || 0) >= 3;

    var html = '<div class="q-panel" id="q-panel"><div class="q-panel-head"><div class="row wrap">' +
      '<span class="badge blue">' + esc(q.id) + '</span><span class="badge">' + esc(q.skill) + '</span>' +
      '<span class="badge">' + esc(isDiagnostic(q.id) ? '诊断题' : (isVariant(q.id) ? '变式题 · L4 迁移级' : u.level + ' 精练')) + '</span>' +
      '<span class="tiny muted">错因族：' + esc(q.family) + '</span></div>' +
      '<button type="button" class="btn xs ghost" data-cact="close">收起</button></div>' +
      '<div class="q-stem big">' + esc(q.stem) + '</div>';

    if (isVariant(q.id) && q.move) html += '<p class="tiny">迁移点：' + esc(q.move) + '（原题答案不作为本题判分依据）</p>';
    html += answerArea(q, r);

    if (!r || !r.submitted) {
      html += '<div class="row"><button type="button" class="btn sm primary" data-cact="submit" data-id="' + q.id + '">提交本题</button>' +
        '<span class="tiny muted">提交前不显示答案；客观题自动判，开放题按自查项判定。</span></div>';
    } else if (wrongLocked) {
      html += '<div class="lock-box"><b>答案区已锁定</b>' +
        '<p class="small">' + esc(fb.hint || q.hint || '先说清楚错在哪一步。') + '</p>' +
        '<p class="tiny">请自己写一句归因（整理交出去，理解留给孩子），写完才解锁四栏解析与变式题。</p>' +
        '<div class="row"><input type="text" id="course-attr-input" class="wide" placeholder="' + esc(fb.attr || q.attribution || '我把 ______ 当成 ______。') + '" value="' + esc(r.attribution || '') + '">' +
        '<button type="button" class="btn sm primary" data-cact="attr" data-id="' + q.id + '">提交归因</button></div>' +
        (downgraded ? '<p class="tiny warn-text">同错因第 3 次错：不晋级，改派 L1 降级题 A-V2，并重新归因。</p>' : '') +
        '</div>';
    } else {
      html += '<div class="hint-box">' + (r.state === 'correct' || r.state === 'open-pass' || r.state === 'variant-pass' ? '本题达标。' : '归因已填，解析已解锁。') +
        (q.type === 'open' || q.type === 'self' ? ' 开放题不输出机器分数，仅显示判定规则与自查结果。' : '') + '</div>';
      html += fourCols(q);
      if (r.attribution) html += '<p class="tiny">我的归因：' + esc(r.attribution) + '　|　错误思路：' + esc(r.wrong_step || '—') + '</p>';

      if (!isVariant(q.id) && r.attribution && q.variant) {
        var vq = findItem(q.variant);
        var vr = rec(q.variant);
        html += '<div class="variant-box"><b class="small">同错因变式题 ' + esc(q.variant) + '</b>' +
          (vq ? '<p class="small">' + esc(vq.stem.slice(0, 90)) + (vq.stem.length > 90 ? '…' : '') + '</p>' : '') +
          (vr && (vr.state === 'variant-pass' || passed(vr)) ? '<span class="badge good">变式已通过 · 已写入复现队列</span>' :
            '<button type="button" class="btn sm" data-cact="open" data-id="' + esc(q.variant) + '">去做变式题（换词换境）</button>') +
          '</div>';
      }
      if (isVariant(q.id) && r.variant_result === '通过') {
        html += '<p class="tiny">变式通过 → 错因「' + esc(q.family) + '」已进入 D0/D2/D4/D7/D14 复现队列，今日不再出现原题。</p>';
      }
    }
    html += '</div>';
    return html;
  }

  /* ---------------- 渲染：复现队列 ---------------- */
  function renderReview(u) {
    var rv = S.reviews[u.id] || [];
    return '<div class="card"><div class="between"><h3>D0 / D2 / D4 / D7 / D14 复现队列</h3>' +
      '<span class="tiny muted">到期项按错因族聚合进「今日任务」，不按题型打散</span></div>' +
      (rv.length ? '<table class="ctable"><thead><tr><th>时点</th><th>到期日</th><th>错因族</th><th>动作</th><th>通过判定</th><th>状态</th></tr></thead><tbody>' +
        rv.map(function (r, i) {
          var plan = u.reviews[i] || {};
          return '<tr><td><b>' + esc(r.at) + '</b></td><td>' + esc(r.due) + '</td><td>' + esc(r.family) + '</td>' +
            '<td>' + esc(plan.action || '—') + '（' + esc(plan.items || '—') + '）</td><td>' + esc(r.rule || plan.pass || '—') + '</td>' +
            '<td>' + (r.done ? '<span class="badge good">已完成 ' + esc(r.doneAt) + '</span>' :
              '<button type="button" class="btn xs" data-cact="review-done" data-id="' + esc(r.at) + '">标记完成</button>') + '</td></tr>';
        }).join('') + '</tbody></table>' : '<p class="small muted">尚无复现队列：需先完成「答错 → 归因 → 变式通过」，系统才会排期。</p>') +
      '<p class="tiny">D2 完成是单元完成条件 5；连续 2 次复现正确且变式通过才晋级。复现日期按首次变式通过当天加 0/2/4/7/14 天计算。</p></div>' +
      '<div class="card"><h3>各单元复习安排（课程包原表）</h3><table class="ctable"><thead><tr><th>时点</th>' +
      C.units.map(function (x) { return '<th>单元 ' + esc(x.id) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      ['D0', 'D2', 'D4', 'D7', 'D14'].map(function (at, i) {
        return '<tr><td><b>' + at + '</b></td>' + C.units.map(function (x) {
          var p = x.reviews[i] || {};
          return '<td>' + esc(p.items || '—') + '<br><span class="tiny muted">' + esc(p.action || '') + '；' + esc(p.pass || '') + '</span></td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
  }

  /* ---------------- 渲染：错因档案 ---------------- */
  function renderArchive(u) {
    var rs = Object.keys(S.records).map(rec).filter(function (r) { return r.unit === u.id; });
    var wrongs = rs.filter(function (r) { return r.state === 'wrong' || r.attribution; });
    return '<div class="card"><div class="between"><h3>错因档案（五项结构化留存 + 学生错答留痕）</h3>' +
      '<span class="tiny muted">单题入库 · 可回翻 · 依据来源可交叉核对</span></div>' +
      (wrongs.length ? '<table class="ctable archive"><thead><tr><th>题目识别</th><th>学生错答</th><th>错误思路（归因原句）</th><th>标准解法与依据</th><th>知识点锚</th><th>复习建议</th></tr></thead><tbody>' +
        wrongs.map(function (r) {
          var q = findItem(r.id) || {};
          return '<tr><td><b>' + esc(r.id) + '</b><br><span class="tiny">' + esc(r.skill) + ' / ' + esc(r.at || '') + '</span></td>' +
            '<td>' + esc(r.student_answer || '—') + '</td>' +
            '<td>' + esc(r.attribution || '（未填，答案锁定中）') + '<br><span class="tiny muted">' + esc(r.wrong_step || '') + '</span></td>' +
            '<td>' + esc(q.answer || '—') + '<br><span class="tiny muted">' + esc(r.basis || '') + '</span></td>' +
            '<td>' + esc(r.wrong_family || '—') + '</td>' +
            '<td>' + esc(q.variant ? '变式 ' + q.variant + ' → D0/D2/D4/D7/D14' : '同类题回炉') + '<br><span class="tiny muted">' + esc(r.basis_source || '') + '</span></td></tr>';
        }).join('') + '</tbody></table>' : '<p class="small muted">暂无错题记录。答错并填写归因后会自动入库。</p>') +
      '<p class="tiny">档案不做整卷答案页；每题独立留存，修改依据时保留修改前后两份。</p></div>';
  }

  /* ---------------- 渲染：教师复核 ---------------- */
  function renderTeacher(u) {
    var qList = allItems(u).filter(function (q) { return q.source.indexOf('【待核实】') >= 0; });
    var pending = qList.filter(function (q) { return !verified(q); });
    return '<div class="card"><div class="between"><h3>教师复核台（交叉核对依据）</h3>' +
      '<span class="badge red">待核实 ' + pending.length + ' / ' + qList.length + '</span></div>' +
      '<p class="small muted">系统生成的解析一律标【待核实】；用标准答案或可靠题库核对后才可作为「标准答案」。学生端在复核前只显示「参考答案（待复核）」。</p>' +
      '<table class="ctable"><thead><tr><th>题号</th><th>当前依据</th><th>复核</th></tr></thead><tbody>' +
      qList.map(function (q) {
        var r = rec(q.id);
        return '<tr><td><b>' + esc(q.id) + '</b><br><span class="tiny">' + esc(q.family) + '</span></td>' +
          '<td>' + (r && r.basis_edited ? '<span class="tiny">改前：' + esc(q.basis.slice(0, 60)) + '…</span><br>' : '') +
          '<textarea class="cell-edit" data-cchange="basis" data-id="' + esc(q.id) + '" rows="2">' + esc((r && r.basis_edited) || q.basis) + '</textarea></td>' +
          '<td>' + (verified(q) ? '<span class="badge good">已复核</span>' :
            '<button type="button" class="btn xs primary" data-cact="verify" data-id="' + esc(q.id) + '">复核通过</button>') + '</td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<div class="card"><h3>按板块 / 错因分布</h3><table class="ctable"><thead><tr><th>错因族</th><th>答错次数</th><th>处置</th></tr></thead><tbody>' +
      (Object.keys(S.familyErrors).filter(function (k) { return k.indexOf(u.id + '::') === 0; }).map(function (k) {
        var n = S.familyErrors[k];
        return '<tr><td>' + esc(k.split('::')[1]) + '</td><td>' + n + '</td><td>' + (n >= 3 ? '<span class="warn-text">不晋级，派 L1 降级题并重新归因</span>' : '派同错因变式') + '</td></tr>';
      }).join('') || '<tr><td colspan="3" class="muted">暂无错因记录</td></tr>') + '</tbody></table></div>' +
      '<div class="card"><h3>教师版听力脚本（不向学生展示）</h3><p class="small">' + esc(u.listeningScript) + '</p></div>';
  }

  /* ---------------- 打印 ---------------- */
  function doPrint(kind) {
    var u = unit();
    var box = $('course-print-root');
    if (!box) { box = document.createElement('div'); box.id = 'course-print-root'; document.body.appendChild(box); }
    var lines = '';
    if (kind === 'teacher') {
      lines = '<h2>单元 ' + esc(u.id) + ' 听力脚本（教师版）</h2><p>' + esc(u.listeningScript) + '</p>' +
        '<h3>参考答案与判定规则</h3><ul>' + allItems(u).map(function (q) {
          return '<li><b>' + esc(q.id) + '</b> ' + esc(q.answer) + (q.rule ? '｜' + esc(q.rule) : '') + '</li>';
        }).join('') + '</ul>';
    } else {
      lines = '<h2>单元 ' + esc(u.id) + ' · ' + esc(u.title) + '（学生版）</h2>' +
        '<p class="tiny">' + esc(u.level) + ' / W' + u.week + ' / ' + u.minutes + ' 分钟 · 原创示意题，非真题</p>' +
        '<h3>主题材料</h3><p><b>' + esc(u.material.title) + '</b></p><p>' + esc(u.material.text) + '</p>' +
        (u.readingText ? '<p><b>' + esc(u.readingText.title) + '</b></p><p>' + esc(u.readingText.text) + '</p>' : '') +
        '<h3>诊断题</h3><ol>' + u.diagnostics.map(function (q) { return '<li>' + esc(q.stem) + '</li>'; }).join('') + '</ol>' +
        '<h3>六技能练习</h3><ol>' + u.items.map(function (q) { return '<li>[' + esc(q.skill) + '] ' + esc(q.stem) + '</li>'; }).join('') + '</ol>' +
        '<h3>变式题</h3><ol>' + u.variants.map(function (q) { return '<li>' + esc(q.stem) + '</li>'; }).join('') + '</ol>';
    }
    box.innerHTML = '<div class="ph"><h2>英语中考学习台 · 错因任务流</h2><div class="line"><span>单元 ' + esc(u.id) + ' · ' + esc(kind === 'teacher' ? '教师版' : '学生版') + '</span><span>姓名：____________　日期：__________</span></div></div>' + lines;
    window.print();
  }

  /* ---------------- 事件 ---------------- */
  document.addEventListener('click', function (ev) {
    var ptab = ev.target.closest('[data-ptab]');
    if (ptab) { S.ptab = ptab.getAttribute('data-ptab'); save(); applyPtab(); return; }
    var t = ev.target.closest('[data-cact]');
    if (!t) return;
    var act = t.getAttribute('data-cact');
    var id = t.getAttribute('data-id');

    if (act === 'unit') { S.unit = id; S.active = null; S.tab = 'today'; save(); render(); }
    else if (act === 'tab') { S.tab = id; save(); render(); }
    else if (act === 'open') { S.active = id; S.tab = 'unit'; save(); render(); scrollToPanel(); }
    else if (act === 'close') { S.active = null; save(); render(); }
    else if (act === 'submit') { var q = findItem(id); if (q) submit(q); }
    else if (act === 'attr') { var q2 = findItem(id); if (q2) submitAttribution(q2); }
    else if (act === 'review-done') {
      var rv = S.reviews[S.unit] || [];
      rv.forEach(function (r) { if (r.at === id) { r.done = true; r.doneAt = today(); } });
      if (id === 'D2') S.d2Done[S.unit] = true;
      S.log.unshift({ at: today(), text: '复现 ' + id + ' 标记完成' + (id === 'D2' ? '（单元完成条件 5 达成）' : '') + '。' });
      save(); render();
    }
    else if (act === 'verify') {
      var q3 = findItem(id);
      if (!q3) return;
      var ta = document.querySelector('[data-cchange="basis"][data-id="' + id + '"]');
      var edited = ta ? ta.value.trim() : '';
      var r3 = S.records[id] || {
        id: id, unit: unitOfItem(id), skill: q3.skill, wrong_family: q3.family,
        student_answer: '', submitted: false, basis_type: q3.basisType, basis: q3.basis,
        basis_source: q3.source, state: 'unanswered', at: today()
      };
      r3.basis_edited = edited && edited !== q3.basis ? edited : (r3.basis_edited || null);
      r3.teacher_verified = true;
      r3.basis_source = '教师已复核';
      S.records[id] = r3;
      S.log.unshift({ at: today(), text: id + ' 解析已由教师复核' + (r3.basis_edited ? '并改正依据（保留改前/改后两份）' : '') + '。' });
      save(); render();
    }
    else if (act === 'bulk') {
      var u = unit();
      var n = 0;
      allItems(u).forEach(function (q) {
        if (!S.records[q.id]) {
          S.records[q.id] = {
            id: q.id, unit: u.id, skill: q.skill, wrong_family: q.family,
            student_answer: '', submitted: false, basis_type: q.basisType, basis: q.basis,
            basis_source: q.source, state: 'imported', at: today()
          };
          n++;
        }
      });
      S.bulkImported[u.id] = true;
      S.log.unshift({ at: today(), text: '整卷一次性提交 → 拆为 ' + n + ' 道单题入库；未生成整卷答案页，答案仍按单题归因后解锁。' });
      window.alert('已拆为 ' + n + ' 道单题入库，未生成整卷答案页。');
      save(); render();
    }
    else if (act === 'print') { doPrint(id); }
    else if (act === 'reset') {
      if (!window.confirm('清空本机全部错因任务记录？此操作不可撤销。')) return;
      S = defaults(); save(); render();
    }
  });

  document.addEventListener('change', function (ev) {
    var t = ev.target;
    if (t.getAttribute && t.getAttribute('data-cchange') === 'basis') {
      var id = t.getAttribute('data-id');
      var q = findItem(id);
      if (!q) return;
      var r = S.records[id];
      if (r) { r.basis_edited = t.value.trim(); save(); }
    }
  });

  function scrollToPanel() {
    var p = $('q-panel');
    if (p && p.scrollIntoView) p.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* 与主应用同步角色与周次（app.js 在 renderAll 末尾派发 zkeh:render） */
  function syncHost() {
    var roleBtn = document.querySelector('#roleSwitch button.active');
    if (roleBtn) S.role = roleBtn.getAttribute('data-role') || 'student';
    var ws = $('weekSelect');
    if (ws) S.week = Number(ws.value) || 1;
    save(); render();
  }
  window.addEventListener('zkeh:render', syncHost);
  window.addEventListener('DOMContentLoaded', function () { syncHost(); });
  syncHost();
})();
