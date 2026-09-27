/* =========================================================
   MIRSAD — INTERACTIVE LAB ENGINE
   ========================================================= */

(function(){

  const QUESTIONS = {

    network:[

      {
        q:"أي بروتوكول يستخدم غالبًا لتوزيع عناوين IP تلقائيًا؟",
        a:["DNS","DHCP","SSH","SMTP"],
        c:1,
        why:"DHCP يوزع إعدادات الشبكة ومنها عنوان IP."
      },

      {
        q:"ما الوظيفة الأساسية لـ DNS؟",
        a:[
          "ترجمة أسماء النطاقات إلى عناوين IP",
          "تشفير القرص",
          "فحص الفيروسات",
          "إدارة كلمات المرور"
        ],
        c:0,
        why:"DNS يترجم أسماء النطاقات إلى عناوين IP."
      },

      {
        q:"أي منفذ يرتبط عادةً بخدمة SSH؟",
        a:["21","22","53","443"],
        c:1,
        why:"SSH يستخدم المنفذ 22 عادةً."
      },

      {
        q:"ظهر في السجل عدد كبير من محاولات الاتصال بمنفذ واحد من جهاز غير معروف. ماذا تفعل؟",
        a:[
          "تتجاهله",
          "تتحقق من السجلات والسياق ومصدر الاتصالات",
          "تحذف السجل",
          "تعطي الجهاز صلاحية"
        ],
        c:1,
        why:"التحقيق يبدأ بجمع السياق ومقارنة السلوك."
      },

      {
        q:"أي معلومة تساعدك في بناء خط زمني للحادث؟",
        a:[
          "لون الواجهة",
          "Timestamp للأحداث",
          "اسم المستخدم فقط",
          "حجم الشاشة"
        ],
        c:1,
        why:"الـ timestamps أساسية لبناء timeline."
      }

    ],

    linux:[

      {
        q:"أي أمر يعرض الملفات في المجلد الحالي؟",
        a:["pwd","ls","cd","rm"],
        c:1,
        why:"ls يعرض محتويات المجلد."
      },

      {
        q:"أي أمر يعرض المسار الحالي؟",
        a:["pwd","cat","mkdir","grep"],
        c:0,
        why:"pwd يعرض working directory."
      },

      {
        q:"أي أمر ينشئ مجلدًا جديدًا؟",
        a:["touch","mkdir","cp","mv"],
        c:1,
        why:"mkdir ينشئ directory."
      },

      {
        q:"أي أمر يعرض محتوى ملف نصي؟",
        a:["cat","cd","chmod","clear"],
        c:0,
        why:"cat يعرض محتوى الملفات النصية."
      },

      {
        q:"ما قيمة الـ Flag الموجودة في ملف المهمة؟",

        terminal:`$ ls
Documents  Downloads  secret.txt

$ cat secret.txt
MIRSAD{LINUX_101}`,

        flag:"MIRSAD{LINUX_101}"

      }

    ],

    "web-security":[

      {
        q:"لماذا نتحقق من مدخلات المستخدم؟",
        a:[
          "لتجميل الصفحة",
          "لتقليل البيانات غير المتوقعة والمخاطر الأمنية",
          "لزيادة حجم الكود",
          "لا حاجة"
        ],
        c:1,
        why:"Validation يقلل مدخلات غير متوقعة ويساعد على بناء تطبيق آمن."
      },

      {
        q:"ما الذي يضيفه HTTPS؟",
        a:[
          "تشفير الاتصال أثناء النقل",
          "زيادة مساحة القرص",
          "حذف cookies",
          "تغيير DNS"
        ],
        c:0,
        why:"HTTPS يستخدم TLS لحماية الاتصال."
      },

      {
        q:"أي خاصية Cookie تمنع JavaScript من قراءة الكوكي؟",
        a:[
          "Secure",
          "HttpOnly",
          "Cache",
          "Public"
        ],
        c:1,
        why:"HttpOnly تمنع الوصول للكوكي من JavaScript في المتصفح."
      },

      {
        q:"ما المقصود بـ XSS؟",
        a:[
          "تخزين مشفر",
          "حقن كود يتم تفسيره داخل سياق صفحة ويب",
          "نوع DNS",
          "نسخة احتياطية"
        ],
        c:1,
        why:"XSS يرتبط بإدخال غير آمن يتم تفسيره ككود."
      },

      {
        q:"أين لا ينبغي وضع مفتاح API سري؟",
        a:[
          "خدمة إدارة أسرار",
          "متغير بيئي على الخادم",
          "JavaScript المرسل للمتصفح",
          "خزنة أسرار"
        ],
        c:2,
        why:"أي secret في كود المتصفح يمكن للمستخدم الوصول إليه."
      }

    ],

    "log-analysis":[

      {
        q:"ما الحقل الأهم لربط الأحداث زمنيًا؟",
        a:[
          "Timestamp",
          "Font",
          "Theme",
          "Resolution"
        ],
        c:0,
        why:"الوقت يربط الأحداث ببعضها."
      },

      {
        q:"عدة محاولات دخول فاشلة من نفس المصدر قد تكون مؤشرًا على؟",
        a:[
          "Brute-force محتمل",
          "تغيير لون",
          "نسخ احتياطي",
          "تحديث شاشة"
        ],
        c:0,
        why:"النمط يستحق التحقيق، مع مراعاة السياق."
      },

      {
        q:"ما الذي يجعل IP مفيدًا في التحقيق؟",
        a:[
          "يربط الحدث بمصدر شبكي محتمل",
          "يحدد هوية الشخص دائمًا",
          "يغير كلمة المرور",
          "يشفر السجل"
        ],
        c:0,
        why:"IP مؤشر شبكي وليس إثباتًا قطعيًا لهوية الشخص."
      },

      {
        q:"ماذا تفعل بسجل مهم أثناء التحقيق؟",
        a:[
          "تحذفه",
          "تحافظ على سلامته ونسخته",
          "تعدله",
          "تستبدله"
        ],
        c:1,
        why:"سلامة الأدلة والسجلات مهمة."
      },

      {
        q:"أي نمط يحتاج اهتمامًا أكبر؟",
        a:[
          "حدث منفرد طبيعي",
          "تكرار غير معتاد ومتزامن مع تغييرات أخرى",
          "دخول معروف",
          "رسالة نظام متوقعة"
        ],
        c:1,
        why:"الأنماط المترابطة أهم من حدث منفرد."
      }

    ],

    "incident-response":[

      {
        q:"ما أول مرحلة في الاستجابة للحوادث؟",
        a:[
          "التحقق والاكتشاف",
          "حذف الأدلة",
          "النشر العام",
          "إغلاق كل الأجهزة"
        ],
        c:0,
        why:"يبدأ التعامل بفهم الحادث والتحقق منه."
      },

      {
        q:"ما الهدف من الاحتواء؟",
        a:[
          "تقليل انتشار وتأثير الحادث",
          "حذف كل شيء",
          "زيادة الصلاحيات",
          "نشر كلمة المرور"
        ],
        c:0,
        why:"Containment يحد من التأثير والانتشار."
      },

      {
        q:"ما الذي يجب الحفاظ عليه؟",
        a:[
          "الأدلة والسجلات",
          "الرسائل الشخصية فقط",
          "ألوان الواجهة",
          "ملفات غير مرتبطة"
        ],
        c:0,
        why:"حفظ الأدلة يساعد التحقيق والتحليل اللاحق."
      },

      {
        q:"بعد المعالجة، لماذا نراجع السبب الجذري؟",
        a:[
          "لمنع تكرار الحادث",
          "لتغيير الشعار",
          "لزيادة XP فقط",
          "لإخفاء المشكلة"
        ],
        c:0,
        why:"Root cause analysis يساعد في منع التكرار."
      },

      {
        q:"ماذا يجب أن يحتوي التقرير النهائي؟",
        a:[
          "التسلسل الزمني والإجراءات والنتائج والدروس",
          "صور عشوائية",
          "كلمة مرور المسؤول",
          "لا شيء"
        ],
        c:0,
        why:"التقرير يوثق ما حدث وكيف تمت المعالجة وما الذي تعلمناه."
      }

    ]

  };

  const META =
    Object.fromEntries(
      Mirsad.labs.map(
        x => [x.id,x]
      )
    );

  function renderLab(){

    if(!Mirsad.requireAuth())
      return;

    const root =
      document.getElementById("app");

    const params =
      new URLSearchParams(
        location.search
      );

    const id =
      params.get("id") || "network";

    const lab =
      META[id] || Mirsad.labs[0];

    const qs =
      QUESTIONS[lab.id] ||
      QUESTIONS.network;

    const user =
      Mirsad.user();

    const key =
      "MIRSAD_RUN_" + lab.id;

    let run =
      JSON.parse(
        sessionStorage.getItem(key) ||
        '{"i":0,"score":0,"answers":[]}'
      );

    const shellMarkup = () => {

      const pct =
        Math.round(
          (run.i / qs.length) * 100
        );

      root.innerHTML = `

        <div class="app-shell">

          <aside
            class="sidebar"
            id="sidebar"
          >

            <div class="brand">

              <div class="brand-mark">
                ${Mirsad.icon("shield",25)}
              </div>

              <div>

                <strong>
                  مِرصاد
                </strong>

                <small>
                  CYBER ACADEMY
                </small>

              </div>

            </div>

            <div class="side-section">

              <span class="side-label">
                مساحة التدريب
              </span>

              <nav class="main-nav">

                <a
                  class="nav-item"
                  href="dashboard.html"
                >
                  <span class="nav-symbol">
                    ${Mirsad.icon("grid",19)}
                  </span>
                  <span>
                    لوحة التحكم
                  </span>
                </a>

                <a
                  class="nav-item active"
                  href="labs.html"
                >
                  <span class="nav-symbol">
                    ${Mirsad.icon("shield",19)}
                  </span>
                  <span>
                    المختبرات
                  </span>
                  <i class="nav-pulse"></i>
                </a>

                <a
                  class="nav-item"
                  href="leaderboard.html"
                >
                  <span class="nav-symbol">
                    ${Mirsad.icon("trophy",19)}
                  </span>
                  <span>
                    المتصدرون
                  </span>
                </a>

                <a
                  class="nav-item"
                  href="profile.html"
                >
                  <span class="nav-symbol">
                    ${Mirsad.icon("user",19)}
                  </span>
                  <span>
                    ملفي الشخصي
                  </span>
                </a>

              </nav>

            </div>

            <div class="side-lab-card">

              <div class="mini-orbit"></div>

              <span>
                ACTIVE LAB
              </span>

              <strong>
                ${Mirsad.esc(lab.title)}
              </strong>

              <small>
                التدريب يعمل داخل بيئة محاكاة آمنة.
              </small>

            </div>

            <div class="sidebar-user">

              <div class="avatar">
                ${Mirsad.esc(
                  user.name.slice(0,1)
                )}
              </div>

              <div class="sidebar-user-text">

                <b>
                  ${Mirsad.esc(user.name)}
                </b>

                <span>
                  LVL ${Mirsad.levelFromXP(user.xp)}
                </span>

              </div>

              <button
                class="icon-btn"
                onclick="logout()"
              >
                ${Mirsad.icon("logout",17)}
              </button>

            </div>

          </aside>

          <main class="main-area">

            <header class="topbar">

              <div class="mobile-left">

                <a
                  class="icon-btn mobile-menu"
                  href="labs.html"
                >
                  ${Mirsad.icon("arrow",19)}
                </a>

              </div>

              <div class="crumb">

                <span>
                  MIRSAD
                </span>

                <b>
                  /
                </b>

                <strong>
                  ${Mirsad.esc(lab.title)}
                </strong>

                <small>
                  ${Mirsad.esc(lab.en)}
                </small>

              </div>

              <div class="top-actions">

                <div class="top-xp">

                  <span>
                    ${Mirsad.icon("bolt",16)}
                  </span>

                  <b>
                    ${user.xp}
                  </b>

                  <small>
                    XP
                  </small>

                </div>

                <a
                  class="profile-chip"
                  href="profile.html"
                >

                  <span class="avatar mini">
                    ${Mirsad.esc(
                      user.name.slice(0,1)
                    )}
                  </span>

                  <span>

                    <b>
                      ${Mirsad.esc(user.name)}
                    </b>

                    <small>
                      المستوى
                      ${Mirsad.levelFromXP(user.xp)}
                    </small>

                  </span>

                </a>

              </div>

            </header>

            <div class="page-wrap">

              <section class="lab-run-hero">

                <div>

                  <span class="eyebrow">

                    <i></i>

                    ${Mirsad.esc(lab.en)}

                  </span>

                  <h1>
                    ${Mirsad.esc(lab.title)}
                  </h1>

                  <p>
                    ${Mirsad.esc(lab.desc)}
                  </p>

                  <div class="tags">

                    <span>
                      ${lab.level}
                    </span>

                    <span>
                      ${lab.mins} دقيقة
                    </span>

                    <span>
                      +${lab.xp} XP
                    </span>

                  </div>

                </div>

                <div class="mission-ring">

                  <strong>
                    ${run.i}
                  </strong>

                  <small>
                    / ${qs.length}
                  </small>

                  <span>
                    MISSIONS
                  </span>

                </div>

              </section>

              <section
                class="lab-progress-panel"
              >

                <div>

                  <span>
                    التقدم في المهمة
                  </span>

                  <b>
                    ${run.i}/${qs.length}
                  </b>

                </div>

                <div class="progress-bar">

                  <span
                    style="width:${pct}%"
                  ></span>

                </div>

                <small>
                  أكمل التحديات بالترتيب
                  لتحصل على مكافأة المختبر.
                </small>

              </section>

              <section class="challenge-layout">

                <div class="panel challenge-panel">

                  <div class="challenge-top">

                    <span class="challenge-number">
                      CHALLENGE
                      ${String(run.i+1).padStart(2,"0")}
                    </span>

                    <span class="challenge-points">
                      +${Math.round(
                        lab.xp / qs.length
                      )} XP
                    </span>

                  </div>

                  <h2>
                    ${Mirsad.esc(
                      qs[run.i].q
                    )}
                  </h2>

                  ${
                    qs[run.i].terminal
                      ? `
                        <div class="terminal">

                          <div class="terminal-head">

                            <span>
                              <i></i>
                              <i></i>
                              <i></i>
                            </span>

                            <b>
                              mirsad@lab:~
                            </b>

                          </div>

                          <pre>${Mirsad.esc(
                            qs[run.i].terminal
                          )}</pre>

                        </div>
                      `
                      : ""
                  }

                  ${
                    qs[run.i].flag
                      ? `
                        <div class="flag-input">

                          <label>
                            أدخل الـ Flag
                          </label>

                          <div>

                            <input
                              id="flag-answer"
                              placeholder="MIRSAD{...}"
                            >

                            <button
                              class="btn primary"
                              id="flag-btn"
                            >
                              تحقق
                              ${Mirsad.icon(
                                "check",
                                16
                              )}
                            </button>

                          </div>

                        </div>
                      `
                      : `
                        <div class="answers">

                          ${
                            qs[run.i].a
                              .map(
                                (a,i) => `

                                  <button
                                    class="answer"
                                    data-i="${i}"
                                  >

                                    <span>
                                      ${String.fromCharCode(
                                        65+i
                                      )}
                                    </span>

                                    <b>
                                      ${Mirsad.esc(a)}
                                    </b>

                                    ${Mirsad.icon(
                                      "arrow",
                                      15
                                    )}

                                  </button>

                                `
                              )
                              .join("")
                          }

                        </div>
                      `
                  }

                  <div
                    id="challenge-feedback"
                  ></div>

                </div>

                <aside
                  class="panel mission-aside"
                >

                  <span class="eyebrow">
                    MISSION INTEL
                  </span>

                  <div class="intel-icon">
                    ${Mirsad.icon(
                      lab.icon,
                      25
                    )}
                  </div>

                  <h3>
                    ملاحظات العملية
                  </h3>

                  <p>
                    اقرأ السؤال كاملًا،
                    حلّل المعطيات، ثم اختر الإجابة.
                    بعض المهام تحتوي على Terminal أو Flag.
                  </p>

                  <div class="intel-line">

                    <span>
                      النوع
                    </span>

                    <b>
                      محاكاة تدريبية
                    </b>

                  </div>

                  <div class="intel-line">

                    <span>
                      المستوى
                    </span>

                    <b>
                      ${lab.level}
                    </b>

                  </div>

                  <div class="intel-line">

                    <span>
                      المكافأة
                    </span>

                    <b>
                      +${lab.xp} XP
                    </b>

                  </div>

                  <a
                    href="labs.html"
                    class="btn outline full"
                  >
                    خروج من المختبر
                  </a>

                </aside>

              </section>

            </div>

          </main>

        </div>

      `;

    };

    function save(){

      sessionStorage.setItem(
        key,
        JSON.stringify(run)
      );

    }

    function finish(){

      const s =
        Mirsad.state();

      const u =
        s.users.find(
          x => x.id === s.session
        );

      if(!u.completedLabs.includes(lab.id)){

        u.completedLabs.push(
          lab.id
        );

        u.xp += lab.xp;

        u.streak =
          (u.streak || 0) + 1;

        if(
          u.completedLabs.length === 1 &&
          !u.badges.includes("first")
        ){
          u.badges.push("first");
        }

        if(
          lab.id === "linux" &&
          !u.badges.includes("linux")
        ){
          u.badges.push("linux");
        }

        if(
          lab.id === "web-security" &&
          !u.badges.includes("web")
        ){
          u.badges.push("web");
        }

        if(
          u.streak >= 7 &&
          !u.badges.includes("streak")
        ){
          u.badges.push("streak");
        }

        Mirsad.save(s);

      }

      sessionStorage.removeItem(key);

      root.querySelector(
        ".page-wrap"
      ).innerHTML = `

        <div class="completion-screen">

          <div class="complete-symbol">
            ${Mirsad.icon("trophy",40)}
          </div>

          <span class="eyebrow">
            MISSION COMPLETE
          </span>

          <h1>
            اكتملت العملية بنجاح.
          </h1>

          <p>
            أنهيت جميع تحديات
            <b>
              ${Mirsad.esc(lab.title)}
            </b>
            وحصلت على مكافأة المختبر.
          </p>

          <div class="completion-stats">

            <div>
              <b>
                +${lab.xp}
              </b>
              <span>
                XP
              </span>
            </div>

            <div>
              <b>
                ${qs.length}
              </b>
              <span>
                تحديات
              </span>
            </div>

            <div>
              <b>
                LVL ${Mirsad.levelFromXP(u.xp)}
              </b>
              <span>
                المستوى
              </span>
            </div>

          </div>

          <div class="hero-actions center">

            <a
              class="btn primary"
              href="labs.html"
            >
              المختبرات
              ${Mirsad.icon("arrow",16)}
            </a>

            <a
              class="btn ghost"
              href="dashboard.html"
            >
              لوحة التحكم
            </a>

          </div>

        </div>

      `;

    }

    function feedback(ok,why){

      const el =
        document.getElementById(
          "challenge-feedback"
        );

      el.innerHTML = `

        <div
          class="
            feedback
            ${ok ? "ok" : "bad"}
          "
        >

          ${Mirsad.icon(
            ok ? "check" : "incident",
            18
          )}

          <div>

            <b>
              ${
                ok
                  ? "إجابة صحيحة"
                  : "ليست الإجابة الصحيحة"
              }
            </b>

            <span>
              ${Mirsad.esc(why)}
            </span>

          </div>

        </div>

      `;

    }

    function answer(value){

      const q =
        qs[run.i];

      const ok =
        q.flag
          ? value.trim() === q.flag
          : Number(value) === q.c;

      if(!ok){

        feedback(
          false,
          q.why ||
          "راجع المعطيات وحاول مرة أخرى."
        );

        return;

      }

      run.score++;

      run.i++;

      save();

      if(run.i >= qs.length){

        finish();

        return;

      }

      shellMarkup();

      attach();

    }

    function attach(){

      root
        .querySelectorAll(".answer")
        .forEach(
          b =>
            b.onclick =
              () =>
                answer(
                  b.dataset.i
                )
        );

      const btn =
        root.querySelector(
          "#flag-btn"
        );

      if(btn){

        btn.onclick =
          () =>
            answer(
              root
                .querySelector(
                  "#flag-answer"
                )
                .value
            );

      }

      const inp =
        root.querySelector(
          "#flag-answer"
        );

      if(inp){

        inp.onkeydown = e => {

          if(e.key === "Enter")
            btn.click();

        };

      }

    }

    shellMarkup();

    attach();

  }

  document.addEventListener(
    "DOMContentLoaded",
    () => {

      if(
        document.body.dataset.page ===
        "lab"
      ){
        renderLab();
      }

    }
  );

})();
