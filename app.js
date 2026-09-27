/* =========================================================

   MIRSAD — CORE APP

   Front-end training platform

   ========================================================= */


const MIRSAD_KEY = "MIRSAD_FINAL_V1";


const LAB_CATALOG = [


  {

    id:"network",

    title:"الدفاع عن الشبكات",

    en:"NETWORK DEFENSE",

    icon:"network",

    level:"مبتدئ",

    xp:100,

    mins:20,

    desc:"افهم حركة الشبكة، المنافذ، العناوين، والسلوك غير الطبيعي من خلال سيناريوهات عملية."

  },


  {

    id:"linux",

    title:"مختبر Linux",

    en:"LINUX TERMINAL",

    icon:"terminal",

    level:"مبتدئ",

    xp:120,

    mins:25,

    desc:"تدرّب على أوامر Linux وإدارة الملفات والصلاحيات داخل بيئة طرفية محاكاة."

  },


  {

    id:"web-security",

    title:"أمن تطبيقات الويب",

    en:"WEB SECURITY",

    icon:"web",

    level:"متوسط",

    xp:180,

    mins:35,

    desc:"تعلّم أساسيات حماية المدخلات والجلسات والمصادقة واكتشاف الأخطاء الأمنية."

  },


  {

    id:"log-analysis",

    title:"تحليل السجلات",

    en:"LOG ANALYSIS",

    icon:"logs",

    level:"متوسط",

    xp:160,

    mins:30,

    desc:"حلّل أحداثًا وسجلات افتراضية وحدد المؤشرات التي تستحق التحقيق."

  },


  {

    id:"incident-response",

    title:"الاستجابة للحوادث",

    en:"INCIDENT RESPONSE",

    icon:"incident",

    level:"متقدم",

    xp:250,

    mins:45,

    desc:"تعامل مع سيناريو حادث أمني من الاكتشاف إلى الاحتواء والتحليل والاستعادة."

  }


];


const DEFAULT_STATE = {


  session:null,


  users:[],


  platform:{

    totalLabs:5,

    totalChallenges:25

  }


};


function clone(v){

  return JSON.parse(JSON.stringify(v));

}


function getState(){


  try{


    const raw =

      localStorage.getItem(MIRSAD_KEY);


    if(!raw){


      const s =

        clone(DEFAULT_STATE);


      localStorage.setItem(

        MIRSAD_KEY,

        JSON.stringify(s)

      );


      return s;

    }


    return JSON.parse(raw);


  }catch(e){


    return clone(DEFAULT_STATE);


  }


}


function saveState(state){


  localStorage.setItem(

    MIRSAD_KEY,

    JSON.stringify(state)

  );


}


function currentUser(){


  const s = getState();


  return s.users.find(

    u => u.id === s.session

  ) || null;


}


function requireAuth(){


  if(!currentUser()){


    location.href = "index.html";


    return false;


  }


  return true;


}


function uid(){


  return (

    "u_" +

    Date.now().toString(36) +

    "_" +

    Math.random().toString(36).slice(2,8)

  );


}


function esc(v){


  return String(v ?? "")

    .replaceAll("&","&amp;")

    .replaceAll("<","&lt;")

    .replaceAll(">","&gt;")

    .replaceAll('"',"&quot;")

    .replaceAll("'","&#039;");


}


function levelFromXP(xp){


  return Math.floor((xp || 0) / 100) + 1;


}


function levelTitle(level){


  if(level <= 2) return "مبتدئ";


  if(level <= 5) return "مستكشف";


  if(level <= 8) return "محلل";


  if(level <= 12) return "خبير";


  return "خبير مرصاد";


}


function progressInLevel(xp){


  return (xp || 0) % 100;


}


function initials(name){


  return (name || "م")

    .trim()

    .slice(0,1)

    .toUpperCase();


}


function icon(name,size=20){


  const p = {


    grid:

    `<svg viewBox="0 0 24 24" width="${size}" height="${size}">

      <rect x="3" y="3" width="7" height="7" rx="2"/>

      <rect x="14" y="3" width="7" height="7" rx="2"/>

      <rect x="3" y="14" width="7" height="7" rx="2"/>

      <rect x="14" y="14" width="7" height="7" rx="2"/>

    </svg>`,


    network:

    `<svg viewBox="0 0 24 24" width="${size}" height="${size}">

      <circle cx="5" cy="12" r="2.5"/>

      <circle cx="19" cy="6" r="2.5"/>

      <circle cx="19" cy="18" r="2.5"/>

      <path d="M7.5 11l9-4M7.5 13l9 4"/>

    </svg>`,


    terminal:

    `<svg viewBox="0 0 24 24" width="${size}" height="${size}">

      <rect x="3" y="4" width="18" height="16" rx="3"/>

      <path d="m7 9 3 3-3 3M12 16h5"/>

    </svg>`,


    web:

    `<svg viewBox="0 0 24 24" width="${size}" height="${size}">

      <circle cx="12" cy="12" r="9"/>

      <path d="M3 12h18"/>

      <path d="M12 3c2.2 2.4 3.2 5.4 3.2 9s-1 6.6-3.2 9"/>

      <path d="M12 3c-2.2 2.4-3.2 5.4-3.2 9s1 6.6 3.2 9"/>

    </svg>`,


    logs:

    `<svg viewBox="0 0 24 24" width="${size}" height="${size}">

      <rect x="4" y="3" width="16" height="18" rx="2"/>

      <path d="M8 8h8M8 12h8M8 16h5"/>

    </svg>`,


    incident:

    `<svg viewBox="0 0 24 24" width="${size}" height="${size}">

      <path d="M12 3 21 7v5c0 5-3.5 8-9 9-5.5-1-9-4-9-9V7l9-4Z"/>

      <path d="M12 8v5M12 16h.01"/>

    </svg>`,


    user:

    `<svg viewBox="0 0 24 24" width="${size}" height="${size}">

      <circle cx="12" cy="8" r="3.5"/>

      <path d="M5 20c.8-4 3-6 7-6s6.2 2 7 6"/>

    </svg>`,


    trophy:

    `<svg viewBox="0 0 24 24" width="${size}" height="${size}">

      <path d="M8 4h8v4c0 4-2 6-4 6s-4-2-4-6V4Z"/>

      <path d="M8 6H4v2c0 3 2 5 5 5"/>

      <path d="M16 6h4v2c0 3-2 5-5 5"/>

      <path d="M12 14v4M8 21h8"/>

    </svg>`,


    shield:

    `<svg viewBox="0 0 24 24" width="${size}" height="${size}">

      <path d="M12 3 20 6v5c0 5-3 8-8 10-5-2-8-5-8-10V6l8-3Z"/>

      <path d="m9 12 2 2 4-4"/>

    </svg>`,


    chart:

    `<svg viewBox="0 0 24 24" width="${size}" height="${size}">

      <path d="M4 19V5M4 19h17"/>

      <path d="m7 15 4-4 3 2 6-7"/>

    </svg>`,


    settings:

    `<svg viewBox="0 0 24 24" width="${size}" height="${size}">

      <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/>

      <path d="m19 13 2 1-2 3-2-1a8 8 0 0 1-2 1l-.3 2.3h-3.4L11 17a8 8 0 0 1-2-1l-2 1-2-3 2-1a8 8 0 0 1 0-2l-2-1 2-3 2 1a8 8 0 0 1 2-1l.3-2.3h3.4L15 5a8 8 0 0 1 2 1l2-1 2 3-2 1a8 8 0 0 1 0 2Z"/>

    </svg>`,


    arrow:

    `<svg viewBox="0 0 24 24" width="${size}" height="${size}">

      <path d="M5 12h14M13 6l6 6-6 6"/>

    </svg>`,


    plus:

    `<svg viewBox="0 0 24 24" width="${size}" height="${size}">

      <path d="M12 5v14M5 12h14"/>

    </svg>`,


    search:

    `<svg viewBox="0 0 24 24" width="${size}" height="${size}">

      <circle cx="10.5" cy="10.5" r="6.5"/>

      <path d="m16 16 5 5"/>

    </svg>`,


    lock:

    `<svg viewBox="0 0 24 24" width="${size}" height="${size}">

      <rect x="5" y="10" width="14" height="10" rx="2"/>

      <path d="M8 10V7a4 4 0 0 1 8 0v3"/>

    </svg>`,


    logout:

    `<svg viewBox="0 0 24 24" width="${size}" height="${size}">

      <path d="M10 5H5v14h5"/>

      <path d="M14 8l4 4-4 4M9 12h9"/>

    </svg>`,


    bolt:

    `<svg viewBox="0 0 24 24" width="${size}" height="${size}">

      <path d="m13 2-8 12h6l-1 8 8-12h-6l1-8Z"/>

    </svg>`,


    menu:

    `<svg viewBox="0 0 24 24" width="${size}" height="${size}">

      <path d="M4 7h16M4 12h16M4 17h16"/>

    </svg>`,


    check:

    `<svg viewBox="0 0 24 24" width="${size}" height="${size}">

      <path d="m5 12 4 4L19 6"/>

    </svg>`,


    book:

    `<svg viewBox="0 0 24 24" width="${size}" height="${size}">

      <path d="M4 5a3 3 0 0 1 3-2h13v17H7a3 3 0 0 0-3 2V5Z"/>

      <path d="M7 3v17"/>

    </svg>`


  };


  return `<span class="svg-icon">${p[name] || p.grid}</span>`;


}


function toast(message,type="success"){


  let el =

    document.querySelector(".m-toast");


  if(el) el.remove();


  el = document.createElement("div");


  el.className =

    "m-toast " + type;


  el.innerHTML = `

    <span>

      ${

        type === "success"

          ? icon("check",18)

          : icon("incident",18)

      }

    </span>


    <b>${esc(message)}</b>

  `;


  document.body.appendChild(el);


  setTimeout(

    () => el.classList.add("show"),

    10

  );


  setTimeout(

    () => el.remove(),

    3200

  );


}


window.Mirsad = {


  state:getState,

  save:saveState,

  user:currentUser,

  labs:LAB_CATALOG,

  icon,

  esc,

  levelFromXP,

  levelTitle,

  progressInLevel,

  toast,

  requireAuth


};


/* =========================================================

   SHELL

   ========================================================= */


function nav(page){


  const links = [


    [

      "dashboard.html",

      "dashboard",

      "لوحة التحكم",

      "grid"

    ],


    [

      "labs.html",

      "labs",

      "المختبرات",

      "shield"

    ],


    [

      "learning.html",

      "learning",

      "تعلم لغات البرمجة",

      "book"

    ],


    [

      "leaderboard.html",

      "leaderboard",

      "المتصدرون",

      "trophy"

    ],


    [

      "profile.html",

      "profile",

      "ملفي الشخصي",

      "user"

    ]


  ];


  return links.map(x => `


    <a

      href="${x[0]}"

      class="nav-item ${page === x[1] ? "active" : ""}"

    >


      <span class="nav-symbol">

        ${icon(x[3],19)}

      </span>


      <span>${x[2]}</span>


      ${

        page === x[1]

          ? '<i class="nav-pulse"></i>'

          : ""

      }


    </a>


  `).join("");


}


function shell(page,title,subtitle){


  const user = currentUser();


  if(!user){


    location.href = "index.html";


    return null;


  }


  const level =

    levelFromXP(user.xp);


  const app =

    document.getElementById("app");


  app.innerHTML = `


    <div class="app-shell">


      <aside

        class="sidebar"

        id="sidebar"

      >


        <div class="brand">


          <div class="brand-mark">

            ${icon("shield",25)}

          </div>


          <div>


            <strong>مِرصاد</strong>


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

            ${nav(page)}

          </nav>


        </div>


        <div class="side-lab-card">


          <div class="mini-orbit"></div>


          <span>

            TRAINING STATUS

          </span>


          <strong>

            النظام جاهز

          </strong>


          <small>

            جميع المختبرات تعمل داخل بيئة تدريبية آمنة.

          </small>


        </div>


        <div class="sidebar-user">


          <div class="avatar">

            ${esc(initials(user.name))}

          </div>


          <div class="sidebar-user-text">


            <b>

              ${esc(user.name)}

            </b>


            <span>

              المستوى ${level}

            </span>


          </div>


          <button

            class="icon-btn"

            title="تسجيل الخروج"

            onclick="logout()"

          >

            ${icon("logout",17)}

          </button>


        </div>


      </aside>


      <main class="main-area">


        <header class="topbar">


          <div class="mobile-left">


            <button

              class="icon-btn mobile-menu"

              onclick="

                document

                  .getElementById('sidebar')

                  .classList.toggle('open')

              "

            >

              ${icon("menu",20)}

            </button>


            <div class="top-brand">

              مِرصاد

            </div>


          </div>


          <div class="crumb">


            <span>MIRSAD</span>


            <b>/</b>


            <strong>

              ${esc(title)}

            </strong>


            <small>

              ${esc(subtitle)}

            </small>


          </div>


          <div class="top-actions">


            <div class="top-xp">


              <span>

                ${icon("bolt",16)}

              </span>


              <b>${user.xp}</b>


              <small>XP</small>


            </div>


            <a

              class="profile-chip"

              href="profile.html"

            >


              <span class="avatar mini">

                ${esc(initials(user.name))}

              </span>


              <span>


                <b>

                  ${esc(user.name)}

                </b>


                <small>

                  المستوى ${level}

                </small>


              </span>


            </a>


          </div>


        </header>


        <div

          class="page-wrap"

          id="page-content"

        ></div>


      </main>


    </div>


  `;


  return document.getElementById(

    "page-content"

  );


}


function logout(){


  const s = getState();


  s.session = null;


  saveState(s);


  location.href = "index.html";


}


window.logout = logout;


/* =========================================================

   DASHBOARD

   ========================================================= */


function renderDashboard(){


  const root =

    shell(

      "dashboard",

      "لوحة التحكم",

      "مركز عملياتك وتقدمك التدريبي"

    );


  if(!root) return;


  const u = currentUser();


  const completed =

    u.completedLabs.length;


  const progress =

    Math.round(

      (completed / LAB_CATALOG.length) * 100

    );


  const next =

    LAB_CATALOG.find(

      l => !u.completedLabs.includes(l.id)

    ) || LAB_CATALOG[0];


  const level =

    levelFromXP(u.xp);


  const pct =

    progressInLevel(u.xp);


  root.innerHTML = `


    <section class="command-hero">


      <div class="hero-grid"></div>


      <div class="hero-glow"></div>


      <div class="hero-copy">


        <span class="eyebrow">

          <i></i>

          MIRSAD OPERATIONS CONSOLE

        </span>


        <h1>

          جاهز تكشف<br>

          <em>التهديد قبل وقوعه؟</em>

        </h1>


        <p>

          مساحة تدريب عملية تبني مهاراتك الأمنية

          خطوة بخطوة، من أساسيات الشبكات إلى

          الاستجابة للحوادث.

        </p>


        <div class="hero-actions">


          <a

            class="btn primary"

            href="lab.html?id=${next.id}"

          >

            ${icon("bolt",17)}

            ابدأ المهمة التالية

          </a>


          <a

            class="btn ghost"

            href="labs.html"

          >

            استكشف المختبرات

            ${icon("arrow",16)}

          </a>


        </div>


        <div class="trust-line">


          <span>

            <i></i>

            بيئة تدريب آمنة

          </span>


          <span>

            <i></i>

            5 مختبرات

          </span>


          <span>

            <i></i>

            25 تحديًا

          </span>


        </div>


      </div>


      <div class="hero-radar">


        <div class="radar-ring r1"></div>

        <div class="radar-ring r2"></div>

        <div class="radar-ring r3"></div>


        <div class="radar-sweep"></div>


        <div class="radar-core">

          ${icon("shield",30)}

        </div>


        <span class="radar-dot d1"></span>

        <span class="radar-dot d2"></span>

        <span class="radar-dot d3"></span>


        <div class="radar-caption">


          <b>SECURE</b>


          <small>

            TRAINING NETWORK

          </small>


        </div>


      </div>


    </section>


    <section class="metrics-grid">


      <div class="metric-card">


        <span class="metric-icon cyan">

          ${icon("shield",21)}

        </span>


        <small>

          المختبرات المكتملة

        </small>


        <strong>

          ${completed}

          <i>/${LAB_CATALOG.length}</i>

        </strong>


        <div class="metric-line">

          <span

            style="width:${progress}%"

          ></span>

        </div>


      </div>


      <div class="metric-card">


        <span class="metric-icon violet">

          ${icon("bolt",21)}

        </span>


        <small>

          الخبرة المكتسبة

        </small>


        <strong>

          ${u.xp}

          <i> XP</i>

        </strong>


        <div class="metric-line">

          <span

            style="width:${pct}%"

          ></span>

        </div>


      </div>


      <div class="metric-card">


        <span class="metric-icon amber">

          ${icon("trophy",21)}

        </span>


        <small>

          المستوى الحالي

        </small>


        <strong>

          ${level}

          <i>

            ${esc(levelTitle(level))}

          </i>

        </strong>


        <div class="metric-line">

          <span

            style="width:${pct}%"

          ></span>

        </div>


      </div>


      <div class="metric-card">


        <span class="metric-icon green">

          ${icon("bolt",21)}

        </span>


        <small>

          سلسلة التدريب

        </small>


        <strong>

          ${u.streak || 0}

          <i> يوم</i>

        </strong>


        <div class="metric-line">

          <span

            style="

              width:${Math.min(

                (u.streak || 0) * 14,

                100

              )}%

            "

          ></span>

        </div>


      </div>


    </section>


    <section class="dashboard-grid">


      <div class="panel wide">


        <div class="panel-head">


          <div>


            <span class="eyebrow">

              ACTIVE PATH

            </span>


            <h2>

              مسارك التدريبي

            </h2>


          </div>


          <a

            href="labs.html"

            class="text-link"

          >

            كل المختبرات

            ${icon("arrow",15)}

          </a>


        </div>


        <div class="path-list">


          ${LAB_CATALOG.map(

            (l,i) => {


              const done =

                u.completedLabs.includes(

                  l.id

                );


              return `


                <a

                  href="lab.html?id=${l.id}"

                  class="

                    path-row

                    ${done ? "done" : ""}

                  "

                >


                  <span class="path-num">

                    ${String(i+1).padStart(2,"0")}

                  </span>


                  <span class="path-icon">

                    ${icon(l.icon,20)}

                  </span>


                  <span class="path-info">


                    <b>

                      ${esc(l.title)}

                    </b>


                    <small>

                      ${esc(l.en)}

                    </small>


                  </span>


                  <span class="path-level">

                    ${esc(l.level)}

                  </span>


                  <span class="path-state">

                    ${

                      done

                        ? icon("check",17)

                        : icon("arrow",16)

                    }

                  </span>


                </a>


              `;


            }

          ).join("")}


        </div>


      </div>


      <div class="panel">


        <div class="panel-head">


          <div>


            <span class="eyebrow">

              PROFILE STATUS

            </span>


            <h2>

              ملفك التدريبي

            </h2>


          </div>


        </div>


        <div class="profile-summary">


          <div class="big-avatar">


            ${esc(initials(u.name))}


            <span></span>


          </div>


          <h3>

            ${esc(u.name)}

          </h3>


          <p>

            ${esc(

              u.major ||

              "متدرب أمن سيبراني"

            )}

          </p>


          <div class="level-badge">

            LVL ${level}

            ·

            ${esc(levelTitle(level))}

          </div>


        </div>


        <div class="xp-block">


          <div>


            <span>

              التقدم للمستوى التالي

            </span>


            <b>

              ${pct}%

            </b>


          </div>

          <div class="progress-bar">

            <span

              style="width:${pct}%"

            ></span>

          </div>

        </div>


        <a

          href="profile.html"

          class="btn outline full"

        >

          إدارة الملف

          ${icon("arrow",15)}

        </a>


      </div>


    </section>


    <section class="panel spotlight">


      <div class="spot-copy">


        <span class="eyebrow">

          NEXT OPERATION

        </span>


        <h2>

          ${esc(next.title)}

        </h2>


        <p>

          ${esc(next.desc)}

        </p>


        <div class="tags">


          <span>

            ${esc(next.level)}

          </span>


          <span>

            ${next.mins} دقيقة

          </span>


          <span>

            +${next.xp} XP

          </span>


        </div>


      </div>


      <div class="spot-graphic">


        <div class="hex">

          ${icon(next.icon,34)}

        </div>


        <div class="hex-lines"></div>


      </div>


      <a

        class="btn primary"

        href="lab.html?id=${next.id}"

      >

        فتح المهمة

        ${icon("arrow",16)}

      </a>


    </section>


  `;


}


/* =========================================================

   LABS LIST

   ========================================================= */


function renderLabsPage(){


  const root =

    shell(

      "labs",

      "المختبرات",

      "تعلّم بالعمل داخل سيناريوهات محاكاة"

    );


  if(!root) return;


  const u =

    currentUser();


  root.innerHTML = `


    <section class="page-hero compact">


      <div>


        <span class="eyebrow">

          <i></i>

          TRAINING ENVIRONMENT

        </span>


        <h1>

          المختبرات

          <em>العملية</em>

        </h1>


        <p>

          كل مختبر مصمم كمهمة حقيقية:

          اقرأ، حلّل، جرّب، ثم اثبت مهارتك.

        </p>


      </div>


      <div class="hero-stat">


        <b>

          ${LAB_CATALOG.length}

        </b>


        <span>

          مختبرات متاحة

        </span>


        <small>

          ${u.completedLabs.length}

          مكتملة

        </small>


      </div>


    </section>


    <div class="lab-toolbar">


      <div class="filter-pills">


        <button

          class="filter active"

          data-filter="all"

        >

          الكل

        </button>


        <button

          class="filter"

          data-filter="مبتدئ"

        >

          مبتدئ

        </button>


        <button

          class="filter"

          data-filter="متوسط"

        >

          متوسط

        </button>


        <button

          class="filter"

          data-filter="متقدم"

        >

          متقدم

        </button>


      </div>


      <div class="searchbox">


        ${icon("search",18)}


        <input

          id="lab-search"

          placeholder="ابحث عن مختبر أو مهارة..."

        >


      </div>


    </div>


    <div

      class="lab-grid"

      id="lab-grid"

    ></div>


  `;


  const draw = (

    filter = "all",

    q = ""

  ) => {


    const items =

      LAB_CATALOG.filter(l =>


        (filter === "all" ||

          l.level === filter)


        &&


        (

          !q ||

          (

            `${l.title}

             ${l.en}

             ${l.desc}`

          )

          .toLowerCase()

          .includes(

            q.toLowerCase()

          )

        )


      );


    document.getElementById(

      "lab-grid"

    ).innerHTML =


      items.map(l => {


        const done =

          u.completedLabs.includes(

            l.id

          );


        return `


          <article class="lab-card-pro">


            <div class="lab-card-no">

              ${String(

                LAB_CATALOG.indexOf(l)+1

              ).padStart(2,"0")}

            </div>


            <div class="lab-card-icon">

              ${icon(l.icon,26)}

            </div>


            <div class="lab-card-meta">


              <span>

                ${esc(l.level)}

              </span>


              <span>

                ${l.mins} MIN

              </span>


              <b>

                ${done ? "مكتمل" : "متاح"}

              </b>


            </div>


            <span class="eyebrow">

              ${esc(l.en)}

            </span>


            <h3>

              ${esc(l.title)}

            </h3>


            <p>

              ${esc(l.desc)}

            </p>


            <div class="lab-tags">


              <span>

                +${l.xp} XP

              </span>


              <span>

                ${l.mins} دقيقة

              </span>


              <span>

                ${l.level}

              </span>


            </div>


            <div class="lab-card-bottom">


              <span>

                ${

                  done

                    ? icon("check",15) +

                      " مكتمل سابقًا"

                    : "جاهز للبدء"

                }

              </span>


              <a

                href="lab.html?id=${l.id}"

                class="round-arrow"

              >

                ${icon("arrow",18)}

              </a>


            </div>


          </article>


        `;


      }).join("")


      ||


      `

        <div class="empty-state">


          <div>

            ${icon("search",30)}

          </div>


          <h3>

            ما لقينا نتيجة

          </h3>


          <p>

            جرّب كلمة بحث ثانية.

          </p>


        </div>

      `;


  };


  draw();


  document

    .querySelectorAll(".filter")

    .forEach(btn => {


      btn.addEventListener(

        "click",

        () => {


          document

            .querySelectorAll(".filter")

            .forEach(x =>

              x.classList.remove("active")

            );


          btn.classList.add("active");


          draw(

            btn.dataset.filter,

            document.getElementById(

              "lab-search"

            ).value

          );


        }

      );


    });


  document

    .getElementById("lab-search")

    .addEventListener(

      "input",

      e => {


        draw(

          document

            .querySelector(

              ".filter.active"

            )

            .dataset.filter,


          e.target.value

        );


      }

    );


}


/* =========================================================

   PROFILE

   ========================================================= */


function renderProfile(){


  const root =

    shell(

      "profile",

      "الملف الشخصي",

      "هويتك التدريبية وإنجازاتك ومعلوماتك"

    );


  if(!root) return;


  const u =

    currentUser();


  const level =

    levelFromXP(u.xp);


  const pct =

    progressInLevel(u.xp);


  root.innerHTML = `


    <section class="profile-hero-pro">


      <div class="profile-grid"></div>


      <div class="profile-light"></div>


      <div class="profile-avatar-xl">


        ${esc(initials(u.name))}


        <span></span>


      </div>


      <div class="profile-identity">


        <span class="eyebrow">

          MIRSAD OPERATIVE

        </span>


        <h1>

          ${esc(u.name)}

        </h1>


        <p>

          ${esc(u.email)}

        </p>


        <div class="identity-tags">


          <span>

            ${esc(

              u.university ||

              "لم تتم الإضافة"

            )}

          </span>


          <span>

            ${esc(

              u.major ||

              "لم تتم الإضافة"

            )}

          </span>


        </div>


      </div>


      <div class="profile-level">


        <small>

          LEVEL

        </small>


        <strong>

          ${level}

        </strong>


        <b>

          ${esc(levelTitle(level))}

        </b>


        <div class="progress-bar">


          <span

            style="width:${pct}%"

          ></span>


        </div>


        <span>

          ${pct}/100 XP

        </span>


      </div>


    </section>


    <section class="form-layout">


      <div class="panel form-panel">


        <div class="panel-head">


          <div>


            <span class="eyebrow">

              IDENTITY DATA

            </span>


            <h2>

              معلوماتك الأساسية

            </h2>


          </div>


          <span class="status-dot">

            محفوظة

          </span>


        </div>


        <form

          id="profile-form"

          class="form-grid"

        >


          <label>

            الاسم الكامل

            <input

              name="name"

              value="${esc(u.name)}"

              required

            >

          </label>


          <label>

            البريد الإلكتروني

            <input

              type="email"

              name="email"

              value="${esc(u.email)}"

              required

            >

          </label>


          <label>

            العمر

            <input

              type="number"

              name="age"

              min="13"

              max="100"

              value="${esc(u.age || "")}"

            >

          </label>


          <label>

            الجامعة / الكلية

            <input

              name="university"

              value="${esc(

                u.university || ""

              )}"

              placeholder="مثال: جامعة الإمام عبدالرحمن"

            >

          </label>


          <label>

            التخصص

            <input

              name="major"

              value="${esc(

                u.major || ""

              )}"

              placeholder="مثال: الأمن السيبراني"

            >

          </label>


          <label>

            المستوى الدراسي


            <select name="studyLevel">


              ${

                [

                  "ثانوي",

                  "دبلوم",

                  "بكالوريوس",

                  "ماجستير",

                  "متخرج",

                  "مهتم بالتعلم"

                ]

                .map(x =>

                  `

                    <option

                      ${

                        u.studyLevel === x

                          ? "selected"

                          : ""

                      }

                    >

                      ${x}

                    </option>

                  `

                )

                .join("")

              }


            </select>


          </label>


          <label class="full">


            نبذة قصيرة


            <textarea

              name="bio"

              rows="4"

              placeholder="عرّف عن نفسك أو اكتب هدفك من تعلم الأمن السيبراني..."

            >${esc(u.bio || "")}</textarea>


          </label>


          <div class="form-actions full">


            <button

              class="btn primary"

              type="submit"

            >

              ${icon("check",16)}

              حفظ التغييرات

            </button>


            <span>

              تُحفظ بياناتك على هذا الجهاز في النسخة الحالية.

            </span>


          </div>


        </form>


      </div>


      <div class="panel achievement-panel">


        <div class="panel-head">


          <div>


            <span class="eyebrow">

              OPERATIVE RECORD

            </span>


            <h2>

              سجل الإنجازات

            </h2>


          </div>


        </div>


        <div class="achievement-grid">


          <div>

            <span>${icon("shield",18)}</span>

            <b>${u.completedLabs.length}</b>

            <small>مختبر مكتمل</small>

          </div>


          <div>

            <span>${icon("bolt",18)}</span>

            <b>${u.xp}</b>

            <small>XP مكتسب</small>

          </div>


          <div>

            <span>${icon("trophy",18)}</span>

            <b>${(u.badges || []).length}</b>

            <small>شارة</small>

          </div>


          <div>

            <span>${icon("bolt",18)}</span>

            <b>${u.streak || 0}</b>

            <small>سلسلة أيام</small>

          </div>


        </div>


        <div class="badge-list">


          ${

            [

              [

                "welcome",

                "بداية الرحلة",

                "أنشأت ملفك التدريبي"

              ],

              [

                "first",

                "أول عملية",

                "أكملت أول مختبر"

              ],

              [

                "linux",

                "Linux Hunter",

                "أكملت مختبر Linux"

              ],

              [

                "web",

                "Web Guardian",

                "أكملت مختبر الويب"

              ],

              [

                "streak",

                "On Fire",

                "حافظت على سلسلة تدريبية"

              ]

            ]

            .map(b => {


              const unlocked =

                u.badges?.includes(

                  b[0]

                );


              return `


                <div

                  class="

                  badge

                  ${

                    unlocked

                      ? "unlocked"

                      : ""

                  }

                >


                  <span>

                    ${

                      unlocked

                        ? "✓"

                        : "?"

                    }

                  </span>


                  <div>


                    <b>

                      ${b[1]}

                    </b>


                    <small>

                      ${b[2]}

                    </small>


                  </div>


                </div>


              `;


            })

            .join("")

          }


        </div>


      </div>


    </section>


  `;


  document

    .getElementById("profile-form")

    .addEventListener(

      "submit",

      e => {


        e.preventDefault();


        const fd =

          new FormData(e.target);


        const s =

          getState();


        const idx =

          s.users.findIndex(

            x => x.id === s.session

          );


        if(idx < 0) return;


        const u2 =

          s.users[idx];


        [

          "name",

          "email",

          "age",

          "university",

          "major",

          "studyLevel",

          "bio"

        ]

        .forEach(

          k => u2[k] = fd.get(k)

        );


        saveState(s);


        toast(

          "تم تحديث ملفك بنجاح"

        );


        setTimeout(

          renderProfile,

          350

        );


      }

    );


}


/* =========================================================

   LEADERBOARD

   ========================================================= */


function renderLeaderboard(){


  const root =

    shell(

      "leaderboard",

      "المتصدرون",

      "ترتيب المتدربين حسب الخبرة المكتسبة"

    );


  if(!root) return;


  const s =

    getState();


  const users =

    [...s.users]

      .sort(

        (a,b) => b.xp - a.xp

      );


  root.innerHTML = `


    <section class="page-hero compact leaderboard-head">


      <div>


        <span class="eyebrow">

          <i></i>

          OPERATIVE RANKING

        </span>


        <h1>

          سجل

          <em>المتصدرين</em>

        </h1>


        <p>

          المراكز مبنية على XP المكتسب من إكمال المختبرات.

        </p>


      </div>


      <div class="hero-stat">


        <b>

          ${users.length}

        </b>


        <span>

          متدربين مسجلين

        </span>


      </div>


    </section>


    <section class="leader-layout">


      <div class="panel ranking-panel">


        <div class="ranking-table-head">


          <span>#</span>

          <span>المتدرب</span>

          <span>المستوى</span>

          <span>المختبرات</span>

          <span>XP</span>


        </div>


        ${

          users.map(

            (u,i) => `


              <div

                class="

                  ranking-row

                  ${

                    u.id === s.session

                      ? "me"

                      : ""

                  }

                ">


                <span

                  class="

                    rank

                    ${

                      i < 3

                        ? "top"

                        : ""

                    }

                  "

                >

                  ${String(i+1).padStart(2,"0")}

                </span>


                <span class="rank-user">


                  <span class="avatar mini">

                    ${esc(

                      initials(u.name)

                    )}

                  </span>


                  <b>


                    ${esc(u.name)}


                    ${

                      u.id === s.session

                        ? "<small>أنت</small>"

                        : ""

                    }


                  </b>


                </span>


                <span>

                  LVL ${levelFromXP(u.xp)}

                </span>


                <span>

                  ${u.completedLabs.length}

                </span>


                <strong>

                  ${u.xp}

                </strong>


              </div>


            `

          ).join("")


          ||


          `

            <div class="empty-state">


              <h3>

                لا يوجد متدربون بعد

              </h3>


            </div>

          `

        }


      </div>


      <div class="panel rank-info">


        <span class="eyebrow">

          YOUR POSITION

        </span>


        <h2>

          تقدمك

        </h2>


        <div class="rank-big">


          #${

            Math.max(

              1,

              users.findIndex(

                x => x.id === s.session

              ) + 1

            )

          }


        </div>


        <p>

          أكمل مختبرات أكثر وارفع خبرتك

          لتتقدم في الترتيب.

        </p>


        <a

          href="labs.html"

          class="btn primary full"

        >

          اذهب للمختبرات

          ${icon("arrow",16)}

        </a>


      </div>


    </section>


  `;


}


/* =========================================================

   ADMIN / PLATFORM

   ========================================================= */


function renderAdmin(){


  const root =

    shell(

      "admin",

      "مركز المنصة",

      "إحصائيات ومحتوى منصة مرصاد"

    );


  if(!root) return;


  const s =

    getState();


  root.innerHTML = `


    <section class="page-hero compact">


      <div>


        <span class="eyebrow">

          <i></i>

          PLATFORM CONTROL

        </span>


        <h1>

          مركز

          <em>المنصة</em>

        </h1>


        <p>

          نظرة تشغيلية على المحتوى التدريبي والحساب الحالي.

        </p>


      </div>


      <div class="hero-stat">


        <b>

          ONLINE

        </b>


        <span>

          Training Core

        </span>


      </div>


    </section>


    <section class="metrics-grid">


      <div class="metric-card">


        <span class="metric-icon cyan">

          ${icon("user",21)}

        </span>


        <small>

          الحسابات على الجهاز

        </small>


        <strong>

          ${s.users.length}

        </strong>


      </div>


      <div class="metric-card">


        <span class="metric-icon violet">

          ${icon("shield",21)}

        </span>


        <small>

          المختبرات

        </small>


        <strong>

          ${LAB_CATALOG.length}

        </strong>


      </div>


      <div class="metric-card">


        <span class="metric-icon amber">

          ${icon("book",21)}

        </span>


        <small>

          التحديات

        </small>


        <strong>

          25

        </strong>


      </div>


      <div class="metric-card">


        <span class="metric-icon green">

          ${icon("chart",21)}

        </span>


        <small>

          حالة النظام

        </small>


        <strong>

          100%

        </strong>


      </div>


    </section>


    <section class="panel">


      <div class="panel-head">


        <div>


          <span class="eyebrow">

            CONTENT REGISTRY

          </span>


          <h2>

            سجل المختبرات

          </h2>


        </div>


      </div>


      <div class="registry">


        ${

          LAB_CATALOG.map(

            l => `


              <div class="registry-row">


                <span class="lab-icon tiny">

                  ${icon(l.icon,18)}

                </span>


                <b>

                  ${esc(l.title)}

                </b>


                <span>

                  ${esc(l.level)}

                </span>


                <span>

                  ${l.xp} XP

                </span>


                <span class="status-pill">

                  ACTIVE

                </span>


              </div>


            `

          ).join("")

        }


      </div>


    </section>


  `;


}


/* =========================================================

   HOME

   ========================================================= */


function renderHome(){


  const app =

    document.getElementById("app");


  if(currentUser()){


    location.href =

      "dashboard.html";


    return;


  }


  app.innerHTML = `


    <main class="landing">


      <div class="landing-noise"></div>


      <div class="landing-glow one"></div>


      <div class="landing-glow two"></div>


      <nav class="landing-nav">


        <div class="brand">


          <div class="brand-mark">

            ${icon("shield",24)}

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


        <div class="landing-nav-center">


          <span>

            منصة تدريب عملية

          </span>


          <i></i>


          <span>

            CTF • SOC • NETWORK

          </span>


        </div>


        <a

          href="#auth"

          class="btn outline"

        >

          الدخول للمنصة

          ${icon("arrow",15)}

        </a>


      </nav>


      <section class="landing-hero">


        <div class="landing-copy">


          <span class="eyebrow">


            <i></i>


            CYBERSECURITY LEARNING PLATFORM


          </span>


          <h1>


            تعلّم الأمن السيبراني<br>


            <em>

              بشكل مختلف.

            </em>


          </h1>


          <p>

            منصة تدريب عربية مبنية حول الممارسة:

            مختبرات، سيناريوهات، تحديات، تقدم شخصي

            وسجل إنجازات في واجهة واحدة.

          </p>


          <div class="hero-actions">


            <a

              href="#auth"

              class="btn primary xl"

            >

              ${icon("shield",18)}

              ابدأ رحلتك

            </a>


            <a

              href="#features"

              class="btn ghost xl"

            >

              كيف تعمل المنصة؟

              ${icon("arrow",16)}

            </a>


          </div>


          <div class="trust-line">


            <span>

              <i></i>

              بيئة تدريب آمنة

            </span>


            <span>

              <i></i>

              5 مختبرات

            </span>


            <span>

              <i></i>

              25 تحديًا

            </span>


          </div>


        </div>


        <div class="landing-console">


          <div class="console-top">


            <span>

              <i></i>

              <i></i>

              <i></i>

            </span>


            <b>

              mirsad://operations

            </b>


            <span>

              SECURE

            </span>


          </div>


          <div class="console-body">


            <div class="console-sidebar">


              <span class="active">

                ${icon("grid",15)}

              </span>


              <span>

                ${icon("shield",15)}

              </span>


              <span>

                ${icon("terminal",15)}

              </span>


              <span>

                ${icon("chart",15)}

              </span>


            </div>


            <div class="console-main">


              <div class="console-kicker">

                LIVE TRAINING / 01

              </div>


              <h3>

                جاهز للمهمة التالية

              </h3>


              <div class="console-card">


                <div class="console-card-icon">

                  ${icon("network",23)}

                </div>


                <div>


                  <b>

                    الدفاع عن الشبكات

                  </b>


                  <small>

                    Network Defense

                  </small>


                </div>


                <strong>

                  +100 XP

                </strong>


              </div>


              <div class="console-bars">


                <span

                  style="width:78%"

                ></span>


                <span

                  style="width:54%"

                ></span>


                <span

                  style="width:91%"

                ></span>


              </div>


              <div class="console-grid">


                <div>


                  <small>

                    Threat Level

                  </small>


                  <b>

                    LOW

                  </b>


                </div>


                <div>


                  <small>

                    Labs

                  </small>


                  <b>

                    05

                  </b>


                </div>


                <div>


                  <small>

                    Protocol

                  </small>


                  <b>

                    TCP/IP

                  </b>


                </div>


              </div>


            </div>


          </div>


          <div class="console-bottom">


            <span>

              ENCRYPTED SESSION

            </span>


            <span>

              ● SYSTEM READY

            </span>


          </div>


        </div>


      </section>


      <section

        id="features"

        class="landing-features"

      >


        <div class="feature-card large">


          <span class="feature-no">

            01

          </span>


          <div class="feature-icon">

            ${icon("terminal",25)}

          </div>


          <span class="eyebrow">

            HANDS-ON

          </span>


          <h3>

            تعلّم داخل المختبر، مو من كتاب.

          </h3>


          <p>

            كل درس يتحول إلى مهمة تفاعلية

            فيها قرار، تحليل ونتيجة واضحة.

          </p>


        </div>


        <div class="feature-card">


          <span class="feature-no">

            02

          </span>


          <div class="feature-icon">

            ${icon("chart",24)}

          </div>


          <span class="eyebrow">

            PROGRESS

          </span>


          <h3>

            ملف تدريبي يتطور معك.

          </h3>


          <p>

            XP، مستويات، إنجازات وسجل تقدم

            محفوظ على حسابك.

          </p>


        </div>


        <div class="feature-card">


          <span class="feature-no">

            03

          </span>


          <div class="feature-icon">

            ${icon("trophy",24)}

          </div>


          <span class="eyebrow">

            RANKING

          </span>


          <h3>

            رتبتك تعكس شغلك.

          </h3>


          <p>

            تنافس على المتصدرين بناءً على

            الخبرة التي تكسبها.

          </p>


        </div>


      </section>


      <section

        id="auth"

        class="auth-section"

      >


        <div class="auth-copy">


          <span class="eyebrow">

            CREATE YOUR OPERATIVE ID

          </span>


          <h2>

            ابدأ بإنشاء<br>

            <em>

              هويتك التدريبية.

            </em>

          </h2>


          <p>

            أدخل بياناتك مرة واحدة، وبعدها

            كل إنجاز ومختبر ومستوى يبقى

            مرتبطًا بحسابك على هذا الجهاز.

          </p>


        </div>


        <div

          class="auth-card"

          id="auth-card"

        ></div>


      </section>


      <footer class="landing-footer">


        <span>

          مِرصاد / CYBER ACADEMY

        </span>


        <span>

          BUILD • LEARN • DEFEND

        </span>


      </footer>


    </main>


  `;


}


document.addEventListener(

  "DOMContentLoaded",

  () => {


    const page =

      document.body.dataset.page;


    if(page === "home")

      renderHome();


    else if(page === "dashboard")

      renderDashboard();


    else if(page === "labs")

      renderLabsPage();


    else if(page === "profile")

      renderProfile();


    else if(page === "leaderboard")

      renderLeaderboard();


    else if(page === "admin")

      renderAdmin();


    /* lab page is handled by labs.js */


  }

);