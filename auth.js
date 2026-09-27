/* =========================================================
   MIRSAD — AUTH / ACCOUNT ONBOARDING
   ========================================================= */

(function(){

  function hash(text){
    let h = 2166136261;

    for(let i = 0; i < text.length; i++){
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }

    return (h >>> 0).toString(16);
  }

  function form(){

    const card = document.getElementById("auth-card");

    if(!card) return;

    const s = Mirsad.state();

    let mode = "register";

    const render = () => {

      card.innerHTML = `
        <div class="auth-tabs">

          <button class="${mode === "register" ? "active" : ""}"
                  data-mode="register">
            حساب جديد
          </button>

          <button class="${mode === "login" ? "active" : ""}"
                  data-mode="login">
            تسجيل الدخول
          </button>

        </div>

        <div class="auth-head">

          <span class="eyebrow">
            ${mode === "register" ? "NEW OPERATIVE" : "RETURNING OPERATIVE"}
          </span>

          <h3>
            ${mode === "register" ? "أنشئ حسابك" : "مرحبًا بعودتك"}
          </h3>

          <p>
            ${
              mode === "register"
                ? "بيانات بسيطة تكفي لبدء ملفك التدريبي."
                : "أدخل بريدك وكلمة المرور للعودة إلى تقدمك."
            }
          </p>

        </div>

        <form id="auth-form" class="auth-form">

          ${
            mode === "register"
              ? `
                <label>
                  الاسم الكامل
                  <input
                    name="name"
                    placeholder="مثال: عبدالله محمد"
                    required
                  >
                </label>

                <div class="two">

                  <label>
                    العمر
                    <input
                      type="number"
                      name="age"
                      min="13"
                      max="100"
                      placeholder="20"
                      required
                    >
                  </label>

                  <label>
                    المستوى
                    <select name="studyLevel">
                      <option>ثانوي</option>
                      <option>دبلوم</option>
                      <option>بكالوريوس</option>
                      <option>ماجستير</option>
                      <option>متخرج</option>
                      <option>مهتم بالتعلم</option>
                    </select>
                  </label>

                </div>

                <label>
                  الجامعة / الكلية
                  <input
                    name="university"
                    placeholder="اكتب جامعتك أو كليتك"
                    required
                  >
                </label>

                <label>
                  التخصص
                  <input
                    name="major"
                    placeholder="مثال: الأمن السيبراني"
                    required
                  >
                </label>
              `
              : ""
          }

          <label>
            البريد الإلكتروني
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              required
            >
          </label>

          <label>
            كلمة المرور
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              minlength="6"
              required
            >
          </label>

          ${
            mode === "register"
              ? `
                <label>
                  تأكيد كلمة المرور
                  <input
                    type="password"
                    name="confirm"
                    placeholder="••••••••"
                    minlength="6"
                    required
                  >
                </label>
              `
              : ""
          }

          <button
            class="btn primary full"
            type="submit"
          >
            ${
              mode === "register"
                ? icon("plus",17) + " إنشاء الحساب والبدء"
                : icon("lock",17) + " دخول آمن"
            }
          </button>

          <small class="auth-note">
            ${icon("shield",13)}
            بيانات النسخة الحالية تحفظ محليًا في متصفحك.
          </small>

          <div id="auth-error" class="form-error"></div>

        </form>
      `;

      card.querySelectorAll("[data-mode]").forEach(button => {

        button.onclick = () => {
          mode = button.dataset.mode;
          render();
        };

      });

      card.querySelector("#auth-form").onsubmit = submit;
    };

    function submit(e){

      e.preventDefault();

      const fd = new FormData(e.target);

      const email = String(fd.get("email"))
        .trim()
        .toLowerCase();

      const password = String(fd.get("password"));

      const error = document.getElementById("auth-error");

      if(mode === "login"){

        const u = s.users.find(
          x =>
            x.email === email &&
            x.passwordHash === hash(password)
        );

        if(!u){

          error.textContent =
            "البريد أو كلمة المرور غير صحيحة.";

          return;
        }

        s.session = u.id;

        Mirsad.save(s);

        location.href = "dashboard.html";

        return;
      }

      const name = String(fd.get("name")).trim();

      const confirm = String(fd.get("confirm"));

      if(password !== confirm){

        error.textContent =
          "تأكيد كلمة المرور غير مطابق.";

        return;
      }

      if(s.users.some(x => x.email === email)){

        error.textContent =
          "هذا البريد مسجل مسبقًا.";

        return;
      }

      const u = {

        id:
          Date.now().toString(36) +
          Math.random().toString(36).slice(2,7),

        name,
        email,

        passwordHash: hash(password),

        age: fd.get("age"),

        university: fd.get("university"),

        major: fd.get("major"),

        studyLevel: fd.get("studyLevel"),

        bio: "",

        xp: 0,

        streak: 0,

        completedLabs: [],

        badges: ["welcome"],

        createdAt: new Date().toISOString()

      };

      s.users.push(u);

      s.session = u.id;

      Mirsad.save(s);

      location.href = "dashboard.html";
    }

    render();
  }

  document.addEventListener(
    "DOMContentLoaded",
    form
  );

})();