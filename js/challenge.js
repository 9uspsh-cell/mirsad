/* =========================================================
   MIRSAD CHALLENGE ENGINE
   Safe simulated learning challenges
========================================================= */

(() => {

    "use strict";


    const challenges = [

        {
            id: "bot-01",

            mission: "MISSION 01",

            category: "LOGIC",

            title: "بوت ضد عضو مرصاد",

            description:
                "لديك برنامج بسيط يستقبل رقماً. المطلوب تحديد النتيجة الصحيحة للبرنامج.",

            scenario:
                "إذا كان الرقم زوجياً يطبع البرنامج Even، وإذا كان فردياً يطبع Odd.",

            code:
`number = 17

if number % 2 == 0:
    print("Even")
else:
    print("Odd")`,

            question:
                "ما الذي سيطبعه البرنامج عند إدخال الرقم 17؟",

            options: [
                "Even",
                "Odd",
                "Error",
                "Nothing"
            ],

            answer: 1,

            xp: 50
        },


        {
            id: "network-01",

            mission: "MISSION 02",

            category: "NETWORK",

            title: "الاتصال المشبوه",

            description:
                "أمامك سجل مبسط لحركة شبكة. ابحث عن الاتصال الذي يحتاج إلى تحقيق.",

            scenario:
                "ثلاثة أجهزة أرسلت عدداً طبيعياً من الطلبات، بينما جهاز واحد أرسل عدداً مرتفعاً جداً.",

            code:
`10.0.0.12  ->  18 requests
10.0.0.20  ->  23 requests
10.0.0.44  ->  21 requests
10.0.0.99  ->  940 requests`,

            question:
                "أي عنوان يحتاج إلى التحقيق أولاً؟",

            options: [
                "10.0.0.12",
                "10.0.0.20",
                "10.0.0.44",
                "10.0.0.99"
            ],

            answer: 3,

            xp: 75
        },


        {
            id: "web-01",

            mission: "MISSION 03",

            category: "WEB SECURITY",

            title: "مدخل غير موثوق",

            description:
                "لديك نموذج تسجيل. التطبيق يستقبل قيمة من المستخدم ويجب عليه التحقق منها قبل استخدامها.",

            scenario:
                "القاعدة الأساسية: لا تثق بالبيانات القادمة من المستخدم مباشرة.",

            code:
`const username =
    input.value;

if (username.length < 3) {
    showError();
}`,

            question:
                "ما الهدف من التحقق من المدخلات؟",

            options: [
                "تقليل البيانات غير الصحيحة والمخاطر",
                "زيادة سرعة الإنترنت",
                "تغيير عنوان IP",
                "رفع دقة الشاشة"
            ],

            answer: 0,

            xp: 75
        }

    ];


    let currentChallenge = 0;

    let selected = null;


    function open() {

        currentChallenge =
            getNextChallenge();

        selected = null;

        render();

    }


    function getNextChallenge() {

        const saved =
            JSON.parse(
                localStorage.getItem(
                    "mirsad_challenges"
                ) || "[]"
            );

        const index =
            challenges.findIndex(
                challenge =>
                    !saved.includes(
                        challenge.id
                    )
            );

        return index === -1
            ? 0
            : index;

    }


    function render() {

        const challenge =
            challenges[currentChallenge];


        const existing =
            document.getElementById(
                "challengeOverlay"
            );


        if (existing) {
            existing.remove();
        }


        const overlay =
            document.createElement("div");


        overlay.id =
            "challengeOverlay";


        overlay.className =
            "challenge-overlay";


        overlay.innerHTML = `

            <div class="challenge-modal">

                <button
                    class="challenge-close"
                    id="challengeClose"
                    type="button"
                >
                    ×
                </button>


                <div class="challenge-top">

                    <div>

                        <span class="challenge-kicker">
                            ${challenge.mission}
                        </span>

                        <h2>
                            ${challenge.title}
                        </h2>

                        <p>
                            ${challenge.description}
                        </p>

                    </div>


                    <div class="challenge-xp">
                        +${challenge.xp}
                        <small>XP</small>
                    </div>

                </div>


                <div class="challenge-layout">

                    <div class="challenge-scenario">

                        <span>
                            SCENARIO
                        </span>

                        <p>
                            ${challenge.scenario}
                        </p>


                        <pre><code>${escapeHtml(
                            challenge.code
                        )}</code></pre>

                    </div>


                    <div class="challenge-question">

                        <span>
                            CHALLENGE
                        </span>

                        <h3>
                            ${challenge.question}
                        </h3>


                        <div
                            class="challenge-options"
                            id="challengeOptions"
                        >

                            ${challenge.options
                                .map(
                                    (option, index) => `
                                        <button
                                            type="button"
                                            class="challenge-option"
                                            data-index="${index}"
                                        >
                                            <b>
                                                ${String.fromCharCode(
                                                    65 + index
                                                )}
                                            </b>

                                            ${option}
                                        </button>
                                    `
                                )
                                .join("")
                            }

                        </div>


                        <button
                            class="challenge-submit"
                            id="challengeSubmit"
                            type="button"
                        >
                            تحقق من الحل
                            <span>↗</span>
                        </button>


                        <div
                            class="challenge-result"
                            id="challengeResult"
                        ></div>

                    </div>

                </div>

            </div>

        `;


        document.body.appendChild(
            overlay
        );


        requestAnimationFrame(
            () =>
                overlay.classList.add(
                    "open"
                )
        );


        document.body.style.overflow =
            "hidden";


        document
            .getElementById(
                "challengeClose"
            )
            .addEventListener(
                "click",
                close
            );


        document
            .querySelectorAll(
                ".challenge-option"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        document
                            .querySelectorAll(
                                ".challenge-option"
                            )
                            .forEach(
                                item =>
                                    item.classList.remove(
                                        "selected"
                                    )
                            );

                        button.classList.add(
                            "selected"
                        );

                        selected =
                            Number(
                                button.dataset.index
                            );

                    }
                );

            });


        document
            .getElementById(
                "challengeSubmit"
            )
            .addEventListener(
                "click",
                () =>
                    check(challenge)
            );


        addStyles();

    }


    function check(challenge) {

        const result =
            document.getElementById(
                "challengeResult"
            );


        if (selected === null) {

            result.textContent =
                "اختر إجابة أولاً.";

            result.className =
                "challenge-result error";

            return;

        }


        if (
            selected ===
            challenge.answer
        ) {

            const completed =
                JSON.parse(
                    localStorage.getItem(
                        "mirsad_challenges"
                    ) || "[]"
                );


            if (
                !completed.includes(
                    challenge.id
                )
            ) {

                completed.push(
                    challenge.id
                );

                localStorage.setItem(
                    "mirsad_challenges",
                    JSON.stringify(
                        completed
                    )
                );


                const state =
                    JSON.parse(
                        localStorage.getItem(
                            "mirsad_learning_state"
                        ) || "{}"
                    );


                state.xp =
                    Number(
                        state.xp || 0
                    ) + challenge.xp;


                localStorage.setItem(
                    "mirsad_learning_state",
                    JSON.stringify(
                        state
                    )
                );

            }


            result.innerHTML =
                `✓ ممتاز! الحل صحيح. حصلت على <strong>+${challenge.xp} XP</strong>`;

            result.className =
                "challenge-result success";


            document
                .querySelectorAll(
                    ".challenge-option"
                )
                .forEach(
                    (button, index) => {

                        if (
                            index ===
                            challenge.answer
                        ) {

                            button.classList.add(
                                "correct"
                            );

                        }

                    }
                );

        } else {

            result.textContent =
                "الحل غير صحيح. حلّل السيناريو مرة ثانية.";

            result.className =
                "challenge-result error";


            const selectedButton =
                document.querySelector(
                    `.challenge-option[data-index="${selected}"]`
                );


            if (selectedButton) {

                selectedButton.classList.add(
                    "wrong"
                );

            }

        }

    }


    function close() {

        const overlay =
            document.getElementById(
                "challengeOverlay"
            );


        if (!overlay) return;


        overlay.classList.remove(
            "open"
        );


        setTimeout(
            () =>
                overlay.remove(),
            250
        );


        document.body.style.overflow =
            "";

    }


    function escapeHtml(text) {

        return text
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    function addStyles() {

        if (
            document.getElementById(
                "challengeStyles"
            )
        ) {
            return;
        }


        const style =
            document.createElement("style");


        style.id =
            "challengeStyles";


        style.textContent = `

            .challenge-overlay {
                position: fixed;
                inset: 0;
                z-index: 500;

                display: flex;
                align-items: center;
                justify-content: center;

                padding: 20px;

                background:
                    rgba(0,0,0,.82);

                backdrop-filter:
                    blur(18px);

                opacity: 0;

                transition: opacity .25s ease;
            }

            .challenge-overlay.open {
                opacity: 1;
            }

            .challenge-modal {
                position: relative;

                width:
                    min(1050px, 96vw);

                max-height:
                    90vh;

                overflow-y: auto;

                padding: 38px;

                border:
                    1px solid
                    rgba(0,229,178,.16);

                border-radius: 25px;

                color: #eef8f6;

                background:
                    linear-gradient(
                        145deg,
                        #0b1a22,
                        #050c11
                    );

                box-shadow:
                    0 50px 150px
                    rgba(0,0,0,.65);
            }

            .challenge-close {
                position: absolute;

                top: 18px;
                left: 18px;

                width: 36px;
                height: 36px;

                border:
                    1px solid
                    rgba(255,255,255,.08);

                border-radius: 10px;

                color: #84969d;

                background:
                    rgba(255,255,255,.03);

                font-size: 22px;

                cursor: pointer;
            }

            .challenge-top {
                display: flex;
                justify-content: space-between;

                gap: 20px;

                margin-bottom: 30px;
            }

            .challenge-kicker {
                color: #00e5b2;

                font-size: 9px;
                font-weight: 900;

                letter-spacing: 2px;
            }

            .challenge-top h2 {
                margin:
                    8px 0;

                font-size: 32px;
            }

            .challenge-top p {
                max-width: 700px;

                margin: 0;

                color: #84969d;

                font-size: 12px;
                line-height: 1.9;
            }

            .challenge-xp {
                min-width: 80px;
                height: 80px;

                display: flex;
                align-items: center;
                justify-content: center;

                flex-direction: column;

                border:
                    1px solid
                    rgba(0,229,178,.15);

                border-radius: 18px;

                color: #00e5b2;

                background:
                    rgba(0,229,178,.05);

                font-size: 20px;
                font-weight: 900;
            }

            .challenge-xp small {
                color: #52636a;

                font-size: 8px;
                letter-spacing: 1px;
            }

            .challenge-layout {
                display: grid;

                grid-template-columns:
                    1fr 1fr;

                gap: 15px;
            }

            .challenge-scenario,
            .challenge-question {
                padding: 22px;

                border:
                    1px solid
                    rgba(255,255,255,.07);

                border-radius: 17px;

                background:
                    rgba(255,255,255,.018);
            }

            .challenge-scenario > span,
            .challenge-question > span {
                color: #71838a;

                font-size: 8px;
                font-weight: 900;

                letter-spacing: 2px;
            }

            .challenge-scenario p {
                color: #b9c7ca;

                font-size: 11px;
                line-height: 1.9;
            }

            .challenge-scenario pre {
                overflow-x: auto;

                margin:
                    20px 0 0;

                padding: 18px;

                border-radius: 12px;

                background:
                    #03070a;

                direction: ltr;
                text-align: left;

                color: #bfeee4;

                font:
                    11px/1.9
                    Consolas,
                    monospace;
            }

            .challenge-question h3 {
                margin:
                    15px 0 20px;

                font-size: 17px;
                line-height: 1.8;
            }

            .challenge-options {
                display: grid;
                gap: 7px;
            }

            .challenge-option {
                width: 100%;

                display: flex;
                align-items: center;
                gap: 10px;

                padding: 12px;

                border:
                    1px solid
                    rgba(255,255,255,.07);

                border-radius: 10px;

                color: #9badb2;

                background:
                    rgba(0,0,0,.14);

                text-align: right;

                font-family: inherit;
                font-size: 10px;

                cursor: pointer;

                transition: .2s ease;
            }

            .challenge-option b {
                width: 24px;
                height: 24px;

                display: grid;
                place-items: center;

                flex-shrink: 0;

                border-radius: 7px;

                background:
                    rgba(255,255,255,.05);

                color: inherit;
            }

            .challenge-option:hover,
            .challenge-option.selected {
                color: #eef8f6;

                border-color:
                    rgba(0,229,178,.3);

                background:
                    rgba(0,229,178,.06);
            }

            .challenge-option.correct {
                color: #bfffee;

                border-color:
                    rgba(0,229,178,.45);
            }

            .challenge-option.wrong {
                color: #ffd0d7;

                border-color:
                    rgba(255,101,122,.35);
            }

            .challenge-submit {
                width: 100%;

                height: 46px;

                margin-top: 16px;

                border: 0;

                border-radius: 11px;

                color: #00150f;

                background:
                    #00e5b2;

                font-family: inherit;

                font-size: 10px;
                font-weight: 900;

                cursor: pointer;
            }

            .challenge-result {
                min-height: 20px;

                margin-top: 13px;

                font-size: 10px;
            }

            .challenge-result.success {
                color: #00e5b2;
            }

            .challenge-result.error {
                color: #ff7184;
            }

            @media(max-width: 750px) {

                .challenge-modal {
                    padding: 25px 17px;
                }

                .challenge-layout {
                    grid-template-columns: 1fr;
                }

                .challenge-top {
                    flex-direction: column;
                }

            }

        `;


        document.head.appendChild(
            style
        );

    }


    window.MirsadChallenge = {
        open
    };

})();
