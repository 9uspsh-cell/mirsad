/* =========================================================
   MIRSAD PROGRAMMING ACADEMY
========================================================= */

"use strict";


/* =========================================================
   STORAGE
========================================================= */

const STORAGE_KEY = "mirsad_programming_academy";


const defaultState = {
    xp: 0,
    selectedLanguage: null,

    progress: {},

    completedLessons: [],

    quizPassed: [],

    challengesPassed: []
};


function loadState() {

    try {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (!saved) {

            return structuredClone(defaultState);

        }

        return {
            ...structuredClone(defaultState),
            ...JSON.parse(saved)
        };

    } catch {

        return structuredClone(defaultState);

    }

}


let state = loadState();


function saveState() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
    );

}


/* =========================================================
   PROGRAMMING DATA
========================================================= */

const LANGUAGES = [

    {
        id: "python",
        name: "Python",
        short: "PY",
        color: "#48d597",
        description:
            "لغة سهلة وقوية مناسبة للمبتدئين والذكاء الاصطناعي.",
        video: "rfscVS0vtbw",

        lessons: [

            {
                title: "أساسيات Python",
                description:
                    "تعرّف على طريقة كتابة أول برنامج Python.",

                objectives: [
                    "فهم فكرة Python وطريقة تشغيل الكود.",
                    "استخدام print لإظهار النتائج.",
                    "كتابة المتغيرات الأساسية.",
                    "فهم أنواع البيانات."
                ],

                code:
`name = "Mirsad"

print("Hello", name)`,

                question:
                    "ما الدالة المستخدمة لطباعة نص في Python؟",

                options: [
                    "print()",
                    "echo()",
                    "console()",
                    "write()"
                ],

                answer: 0,

                challengeTitle:
                    "اطبع اسمك",

                challengeDescription:
                    "اكتب برنامج Python يستخدم print لطباعة كلمة Mirsad.",

                starter:
`print("Mirsad")`,

                validate(code) {

                    return /print\s*\(/i.test(code) &&
                           /mirsad/i.test(code);

                }
            },


            {
                title: "المتغيرات والبيانات",
                description:
                    "تعلم كيف تخزن المعلومات داخل المتغيرات.",

                objectives: [
                    "إنشاء المتغيرات.",
                    "التعامل مع النصوص والأرقام.",
                    "فهم int و float و str.",
                    "تغيير قيم المتغيرات."
                ],

                code:
`age = 20
name = "Mirsad"

print(name)
print(age)`,

                question:
                    "أي قيمة تمثل نصًا؟",

                options: [
                    `"Mirsad"`,
                    "20",
                    "3.14",
                    "True"
                ],

                answer: 0,

                challengeTitle:
                    "أنشئ متغيرًا",

                challengeDescription:
                    "أنشئ متغيرًا باسم age واجعل قيمته 20.",

                starter:
`age = 20
print(age)`,

                validate(code) {

                    return /age\s*=\s*20/.test(code);

                }
            },


            {
                title: "الشروط",
                description:
                    "اجعل برنامجك يتخذ قرارات باستخدام if و else.",

                objectives: [
                    "فهم if.",
                    "استخدام else.",
                    "استخدام المقارنات.",
                    "كتابة قرار بسيط."
                ],

                code:
`age = 20

if age >= 18:
    print("Adult")
else:
    print("Young")`,

                question:
                    "ما الكلمة المستخدمة للشرط الأساسي؟",

                options: [
                    "if",
                    "when",
                    "check",
                    "case"
                ],

                answer: 0,

                challengeTitle:
                    "زوجي أم فردي؟",

                challengeDescription:
                    "اكتب شرطًا يتحقق من أن الرقم زوجي باستخدام % 2.",

                starter:
`number = 10

if number % 2 == 0:
    print("Even")`,

                validate(code) {

                    return (
                        /%\s*2/.test(code) &&
                        /if/.test(code)
                    );

                }
            },


            {
                title: "الحلقات",
                description:
                    "كرر الأوامر باستخدام for و while.",

                objectives: [
                    "فهم فكرة التكرار.",
                    "استخدام for.",
                    "استخدام range.",
                    "كتابة حلقة بسيطة."
                ],

                code:
`for i in range(5):
    print(i)`,

                question:
                    "ما الكلمة المستخدمة لإنشاء حلقة تكرار؟",

                options: [
                    "for",
                    "repeat",
                    "loop",
                    "again"
                ],

                answer: 0,

                challengeTitle:
                    "اطبع الأرقام",

                challengeDescription:
                    "اكتب حلقة تطبع الأرقام من 1 إلى 5.",

                starter:
`for i in range(1, 6):
    print(i)`,

                validate(code) {

                    return (
                        /for/.test(code) &&
                        /range\s*\(/.test(code)
                    );

                }
            },


            {
                title: "الدوال",
                description:
                    "قسّم برنامجك إلى أجزاء قابلة لإعادة الاستخدام.",

                objectives: [
                    "إنشاء function.",
                    "استخدام parameters.",
                    "إرجاع النتائج.",
                    "إعادة استخدام الدوال."
                ],

                code:
`def greet(name):
    return "Hello " + name

print(greet("Mirsad"))`,

                question:
                    "ما الكلمة المستخدمة لتعريف دالة في Python؟",

                options: [
                    "def",
                    "function",
                    "func",
                    "method"
                ],

                answer: 0,

                challengeTitle:
                    "أنشئ دالة",

                challengeDescription:
                    "أنشئ دالة باسم greet تستقبل name.",

                starter:
`def greet(name):
    return "Hello " + name`,

                validate(code) {

                    return /def\s+greet\s*\(/.test(code);

                }
            }

        ]
    },


    {
        id: "cpp",
        name: "C++",
        short: "C++",
        color: "#62a8ff",
        description:
            "لغة قوية لبناء الأنظمة والألعاب والبرامج عالية الأداء.",
        video: "vLnPwxZdW4Y",

        lessons: [

            {
                title: "أساسيات C++",
                description:
                    "اكتب أول برنامج C++ وتعرف على بنية البرنامج.",

                objectives: [
                    "فهم main.",
                    "استخدام cout.",
                    "إضافة المكتبات.",
                    "تشغيل أول برنامج."
                ],

                code:
`#include <iostream>
using namespace std;

int main() {
    cout << "Hello Mirsad";
    return 0;
}`,

                question:
                    "ما الدالة التي يبدأ منها برنامج C++؟",

                options: [
                    "main()",
                    "start()",
                    "run()",
                    "program()"
                ],

                answer: 0,

                challengeTitle:
                    "Hello Mirsad",

                challengeDescription:
                    "استخدم cout لطباعة Mirsad.",

                starter:
`#include <iostream>
using namespace std;

int main() {
    cout << "Mirsad";
}`,

                validate(code) {

                    return /cout\s*<</.test(code) &&
                           /mirsad/i.test(code);

                }
            },


            {
                title: "المتغيرات",
                description:
                    "تعلم أنواع البيانات الأساسية في C++.",

                objectives: [
                    "استخدام int.",
                    "استخدام double.",
                    "استخدام string.",
                    "إنشاء المتغيرات."
                ],

                code:
`int age = 20;
double price = 15.5;
string name = "Mirsad";`,

                question:
                    "أي نوع مناسب للأعداد الصحيحة؟",

                options: [
                    "int",
                    "string",
                    "char",
                    "bool"
                ],

                answer: 0,

                challengeTitle:
                    "متغير العمر",

                challengeDescription:
                    "أنشئ متغير int باسم age وقيمته 20.",

                starter:
`int age = 20;`,

                validate(code) {

                    return /int\s+age\s*=\s*20/.test(code);

                }
            },


            {
                title: "cin و cout",
                description:
                    "تعلم استقبال البيانات وعرض النتائج.",

                objectives: [
                    "استخدام cout.",
                    "استخدام cin.",
                    "قراءة المدخلات.",
                    "عرض النتائج."
                ],

                code:
`int age;

cout << "Age: ";
cin >> age;`,

                question:
                    "ما الأمر المستخدم لقراءة إدخال المستخدم؟",

                options: [
                    "cin",
                    "cout",
                    "input",
                    "read"
                ],

                answer: 0,

                challengeTitle:
                    "اقرأ رقمًا",

                challengeDescription:
                    "استخدم cin لقراءة قيمة داخل number.",

                starter:
`int number;
cin >> number;`,

                validate(code) {

                    return /cin\s*>>/.test(code);

                }
            },


            {
                title: "if و else",
                description:
                    "اجعل البرنامج يتخذ قرارات.",

                objectives: [
                    "استخدام if.",
                    "استخدام else.",
                    "المقارنة بين القيم.",
                    "بناء قرار."
                ],

                code:
`if (age >= 18) {
    cout << "Adult";
} else {
    cout << "Young";
}`,

                question:
                    "ما الكلمة المستخدمة للشرط؟",

                options: [
                    "if",
                    "when",
                    "check",
                    "condition"
                ],

                answer: 0,

                challengeTitle:
                    "Even / Odd",

                challengeDescription:
                    "تحقق هل الرقم زوجي باستخدام % 2.",

                starter:
`if (number % 2 == 0) {
    cout << "Even";
}`,

                validate(code) {

                    return (
                        /if/.test(code) &&
                        /%\s*2/.test(code)
                    );

                }
            },


            {
                title: "الحلقات",
                description:
                    "كرر الأوامر باستخدام for.",

                objectives: [
                    "فهم loops.",
                    "استخدام for.",
                    "استخدام counter.",
                    "طباعة مجموعة أرقام."
                ],

                code:
`for (int i = 1; i <= 5; i++) {
    cout << i << endl;
}`,

                question:
                    "أي كلمة تستخدم لإنشاء حلقة؟",

                options: [
                    "for",
                    "loop",
                    "repeat",
                    "again"
                ],

                answer: 0,

                challengeTitle:
                    "عداد",

                challengeDescription:
                    "أنشئ for تطبع من 1 إلى 5.",

                starter:
`for (int i = 1; i <= 5; i++) {
    cout << i << endl;
}`,

                validate(code) {

                    return /for\s*\(/.test(code);

                }
            }

        ]
    },


    {
        id: "c",
        name: "C",
        short: "C",
        color: "#8cbcff",
        description:
            "لغة أساسية لفهم البرمجة والأنظمة والذاكرة.",
        video: "KJgsSFOSQv0",

        lessons: [

            {
                title: "مقدمة C",
                description: "اكتب أول برنامج C.",

                objectives: [
                    "فهم main.",
                    "استخدام printf.",
                    "إضافة stdio.h.",
                    "بناء برنامج بسيط."
                ],

                code:
`#include <stdio.h>

int main() {
    printf("Hello Mirsad");
    return 0;
}`,

                question:
                    "ما الدالة المستخدمة لطباعة النص في C؟",

                options: [
                    "printf()",
                    "print()",
                    "cout",
                    "echo()"
                ],

                answer: 0,

                challengeTitle:
                    "Hello C",

                challengeDescription:
                    "استخدم printf لطباعة Mirsad.",

                starter:
`printf("Mirsad");`,

                validate(code) {

                    return /printf\s*\(/.test(code);

                }
            },


            {
                title: "المتغيرات",
                description: "تعلم أنواع البيانات.",

                objectives: [
                    "int.",
                    "float.",
                    "char.",
                    "إنشاء المتغيرات."
                ],

                code:
`int age = 20;
float price = 10.5;
char grade = 'A';`,

                question:
                    "ما النوع المناسب للعدد الصحيح؟",

                options: [
                    "int",
                    "float",
                    "char",
                    "string"
                ],

                answer: 0,

                challengeTitle:
                    "متغير",

                challengeDescription:
                    "أنشئ int باسم age.",

                starter:
`int age = 20;`,

                validate(code) {

                    return /int\s+age/.test(code);

                }
            },


            {
                title: "الشروط",
                description: "تعلم if و else.",

                objectives: [
                    "if.",
                    "else.",
                    "المقارنات.",
                    "القرارات."
                ],

                code:
`if (age >= 18) {
    printf("Adult");
} else {
    printf("Young");
}`,

                question:
                    "ما الكلمة الأساسية للشرط؟",

                options: [
                    "if",
                    "when",
                    "case",
                    "check"
                ],

                answer: 0,

                challengeTitle:
                    "شرط",

                challengeDescription:
                    "اكتب شرط if يتحقق من العمر.",

                starter:
`if (age >= 18) {
    printf("Adult");
}`,

                validate(code) {

                    return /if\s*\(/.test(code);

                }
            },


            {
                title: "الحلقات",
                description: "كرر التعليمات باستخدام for.",

                objectives: [
                    "فهم التكرار.",
                    "استخدام for.",
                    "counter.",
                    "طباعة الأرقام."
                ],

                code:
`for (int i = 0; i < 5; i++) {
    printf("%d", i);
}`,

                question:
                    "ما الكلمة المستخدمة للحلقة؟",

                options: [
                    "for",
                    "loop",
                    "repeat",
                    "again"
                ],

                answer: 0,

                challengeTitle:
                    "حلقة",

                challengeDescription:
                    "اكتب حلقة for.",

                starter:
`for (int i = 0; i < 5; i++) {
    printf("%d", i);
}`,

                validate(code) {

                    return /for\s*\(/.test(code);

                }
            }

        ]
    },


    {
        id: "javascript",
        name: "JavaScript",
        short: "JS",
        color: "#f5d34f",
        description:
            "لغة الويب التفاعلية لبناء واجهات وتطبيقات حديثة.",
        video: "jS4aFq5-91M",

        lessons: [

            {
                title: "أساسيات JavaScript",
                description: "ابدأ بكتابة أول كود JavaScript.",

                objectives: [
                    "استخدام console.log.",
                    "فهم المتغيرات.",
                    "كتابة JavaScript.",
                    "تشغيل الكود."
                ],

                code:
`const name = "Mirsad";

console.log(name);`,

                question:
                    "ما الأمر المستخدم لإظهار قيمة في console؟",

                options: [
                    "console.log()",
                    "print()",
                    "echo()",
                    "show()"
                ],

                answer: 0,

                challengeTitle:
                    "Console",

                challengeDescription:
                    "استخدم console.log لطباعة Mirsad.",

                starter:
`console.log("Mirsad");`,

                validate(code) {

                    return /console\.log\s*\(/.test(code);

                }
            },


            {
                title: "المتغيرات",
                description: "تعلم const و let.",

                objectives: [
                    "let.",
                    "const.",
                    "القيم.",
                    "أنواع البيانات."
                ],

                code:
`let age = 20;
const name = "Mirsad";`,

                question:
                    "أي كلمة تستخدم لإنشاء ثابت؟",

                options: [
                    "const",
                    "fixed",
                    "static",
                    "constant"
                ],

                answer: 0,

                challengeTitle:
                    "أنشئ ثابتًا",

                challengeDescription:
                    "أنشئ const باسم name.",

                starter:
`const name = "Mirsad";`,

                validate(code) {

                    return /const\s+name/.test(code);

                }
            },


            {
                title: "الشروط",
                description: "اجعل JavaScript يتخذ القرارات.",

                objectives: [
                    "if.",
                    "else.",
                    "المقارنة.",
                    "القرارات."
                ],

                code:
`if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Young");
}`,

                question:
                    "ما الكلمة الأساسية للشرط؟",

                options: [
                    "if",
                    "when",
                    "check",
                    "case"
                ],

                answer: 0,

                challengeTitle:
                    "Even / Odd",

                challengeDescription:
                    "تحقق هل الرقم زوجي.",

                starter:
`if (number % 2 === 0) {
    console.log("Even");
}`,

                validate(code) {

                    return /if\s*\(/.test(code) &&
                           /%\s*2/.test(code);

                }
            },


            {
                title: "الحلقات",
                description: "استخدم loops للتكرار.",

                objectives: [
                    "for.",
                    "counter.",
                    "التكرار.",
                    "تنفيذ أمر عدة مرات."
                ],

                code:
`for (let i = 0; i < 5; i++) {
    console.log(i);
}`,

                question:
                    "ما الكلمة المستخدمة للحلقة؟",

                options: [
                    "for",
                    "repeat",
                    "loop",
                    "again"
                ],

                answer: 0,

                challengeTitle:
                    "Loop",

                challengeDescription:
                    "اكتب حلقة for.",

                starter:
`for (let i = 0; i < 5; i++) {
    console.log(i);
}`,

                validate(code) {

                    return /for\s*\(/.test(code);

                }
            }

        ]
    },


    {
        id: "java",
        name: "Java",
        short: "JAVA",
        color: "#ff8b58",
        description:
            "لغة قوية لبناء التطبيقات والأنظمة متعددة المنصات.",
        video: "GoXwIVyNvX0",

        lessons: [

            {
                title: "أساسيات Java",
                description: "تعرف على بنية برنامج Java.",

                objectives: [
                    "فهم class.",
                    "فهم main.",
                    "استخدام System.out.",
                    "تشغيل البرنامج."
                ],

                code:
`public class Main {

    public static void main(String[] args) {
        System.out.println("Mirsad");
    }

}`,

                question:
                    "ما الدالة التي يبدأ منها برنامج Java؟",

                options: [
                    "main()",
                    "start()",
                    "run()",
                    "begin()"
                ],

                answer: 0,

                challengeTitle:
                    "Hello Java",

                challengeDescription:
                    "اطبع Mirsad باستخدام System.out.println.",

                starter:
`System.out.println("Mirsad");`,

                validate(code) {

                    return /System\.out\.println/.test(code);

                }
            },


            {
                title: "المتغيرات",
                description: "تعلم أنواع البيانات.",

                objectives: [
                    "int.",
                    "double.",
                    "String.",
                    "boolean."
                ],

                code:
`int age = 20;
String name = "Mirsad";
boolean active = true;`,

                question:
                    "أي نوع يستخدم للنصوص؟",

                options: [
                    "String",
                    "int",
                    "double",
                    "boolean"
                ],

                answer: 0,

                challengeTitle:
                    "String",

                challengeDescription:
                    "أنشئ String باسم name.",

                starter:
`String name = "Mirsad";`,

                validate(code) {

                    return /String\s+name/.test(code);

                }
            },


            {
                title: "الشروط",
                description: "استخدم if و else.",

                objectives: [
                    "if.",
                    "else.",
                    "المقارنات.",
                    "القرارات."
                ],

                code:
`if (age >= 18) {
    System.out.println("Adult");
} else {
    System.out.println("Young");
}`,

                question:
                    "ما الكلمة المستخدمة للشرط؟",

                options: [
                    "if",
                    "when",
                    "check",
                    "case"
                ],

                answer: 0,

                challengeTitle:
                    "شرط Java",

                challengeDescription:
                    "اكتب if تتحقق من العمر.",

                starter:
`if (age >= 18) {
    System.out.println("Adult");
}`,

                validate(code) {

                    return /if\s*\(/.test(code);

                }
            },


            {
                title: "الحلقات",
                description: "كرر الأوامر باستخدام for.",

                objectives: [
                    "for.",
                    "counter.",
                    "التكرار.",
                    "طباعة القيم."
                ],

                code:
`for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}`,

                question:
                    "ما الكلمة المستخدمة للحلقة؟",

                options: [
                    "for",
                    "repeat",
                    "loop",
                    "again"
                ],

                answer: 0,

                challengeTitle:
                    "Java Loop",

                challengeDescription:
                    "اكتب حلقة for.",

                starter:
`for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}`,

                validate(code) {

                    return /for\s*\(/.test(code);

                }
            }

        ]
    },


    {
        id: "html",
        name: "HTML",
        short: "HTML",
        color: "#ff704d",
        description:
            "الأساس الذي تُبنى عليه صفحات الويب.",
        video: "pQN-pnXPaVg",

        lessons: [

            {
                title: "أساسيات HTML",
                description: "ابنِ أول صفحة ويب.",

                objectives: [
                    "فهم HTML.",
                    "استخدام html.",
                    "استخدام head و body.",
                    "إنشاء صفحة."
                ],

                code:
`<!DOCTYPE html>
<html>

<head>
    <title>Mirsad</title>
</head>

<body>
    <h1>Hello Mirsad</h1>
</body>

</html>`,

                question:
                    "ما العنصر الرئيسي الذي يحتوي صفحة HTML؟",

                options: [
                    "<html>",
                    "<page>",
                    "<web>",
                    "<document>"
                ],

                answer: 0,

                challengeTitle:
                    "أول صفحة",

                challengeDescription:
                    "أنشئ عنوان h1 يحتوي كلمة Mirsad.",

                starter:
`<h1>Mirsad</h1>`,

                validate(code) {

                    return /<h1[\s\S]*mirsad[\s\S]*<\/h1>/i.test(code);

                }
            },


            {
                title: "العناوين والنصوص",
                description: "تعلم عناصر المحتوى.",

                objectives: [
                    "h1.",
                    "h2.",
                    "p.",
                    "تنظيم المحتوى."
                ],

                code:
`<h1>مرصاد</h1>
<h2>أكاديمية البرمجة</h2>
<p>تعلم البرمجة.</p>`,

                question:
                    "أي عنصر يمثل العنوان الرئيسي؟",

                options: [
                    "<h1>",
                    "<title>",
                    "<header>",
                    "<main>"
                ],

                answer: 0,

                challengeTitle:
                    "عنوان",

                challengeDescription:
                    "أنشئ h1.",

                starter:
`<h1>مرصاد</h1>`,

                validate(code) {

                    return /<h1[\s\S]*<\/h1>/i.test(code);

                }
            },


            {
                title: "الروابط والصور",
                description: "أضف روابط وصور.",

                objectives: [
                    "a.",
                    "href.",
                    "img.",
                    "src."
                ],

                code:
`<a href="https://example.com">
    افتح الرابط
</a>`,

                question:
                    "ما الخاصية المستخدمة لتحديد رابط a؟",

                options: [
                    "href",
                    "src",
                    "link",
                    "url"
                ],

                answer: 0,

                challengeTitle:
                    "رابط",

                challengeDescription:
                    "أنشئ عنصر a يحتوي href.",

                starter:
`<a href="https://example.com">
    الرابط
</a>`,

                validate(code) {

                    return /<a[\s\S]*href=/i.test(code);

                }
            },


            {
                title: "النماذج",
                description: "تعرف على input و form.",

                objectives: [
                    "form.",
                    "input.",
                    "type.",
                    "placeholder."
                ],

                code:
`<form>
    <input
        type="text"
        placeholder="اسمك"
    >
</form>`,

                question:
                    "ما العنصر المستخدم لإدخال البيانات؟",

                options: [
                    "<input>",
                    "<data>",
                    "<field>",
                    "<text>"
                ],

                answer: 0,

                challengeTitle:
                    "Input",

                challengeDescription:
                    "أنشئ input من نوع text.",

                starter:
`<input type="text">`,

                validate(code) {

                    return /<input[\s\S]*type\s*=\s*["']text/i.test(code);

                }
            }

        ]
    },


    {
        id: "css",
        name: "CSS",
        short: "CSS",
        color: "#4aa9ff",
        description:
            "حوّل صفحات الويب إلى واجهات احترافية.",
        video: "1Rs2ND1ryYc",

        lessons: [

            {
                title: "أساسيات CSS",
                description: "تعلم كيف تتحكم في شكل الصفحة.",

                objectives: [
                    "Selectors.",
                    "الألوان.",
                    "الخلفيات.",
                    "النصوص."
                ],

                code:
`.title {
    color: #20d9ff;
    font-size: 32px;
}`,

                question:
                    "ما الخاصية التي تغير لون النص؟",

                options: [
                    "color",
                    "text-color",
                    "font-color",
                    "paint"
                ],

                answer: 0,

                challengeTitle:
                    "غيّر اللون",

                challengeDescription:
                    "استخدم color لتغيير لون العنصر.",

                starter:
`.title {
    color: red;
}`,

                validate(code) {

                    return /color\s*:/.test(code);

                }
            },


            {
                title: "Box Model",
                description: "افهم المسافات وحجم العناصر.",

                objectives: [
                    "margin.",
                    "padding.",
                    "border.",
                    "width."
                ],

                code:
`.card {
    padding: 20px;
    margin: 10px;
    border: 1px solid #333;
}`,

                question:
                    "ما الخاصية التي تضيف مساحة داخل العنصر؟",

                options: [
                    "padding",
                    "margin",
                    "space",
                    "inside"
                ],

                answer: 0,

                challengeTitle:
                    "Padding",

                challengeDescription:
                    "أضف padding بقيمة 20px.",

                starter:
`.card {
    padding: 20px;
}`,

                validate(code) {

                    return /padding\s*:\s*20px/.test(code);

                }
            },


            {
                title: "Flexbox",
                description: "رتب العناصر بطريقة احترافية.",

                objectives: [
                    "display flex.",
                    "justify-content.",
                    "align-items.",
                    "gap."
                ],

                code:
`.container {
    display: flex;
    justify-content: center;
    align-items: center;
}`,

                question:
                    "ما الخاصية التي تفعل Flexbox؟",

                options: [
                    "display: flex",
                    "flex: true",
                    "layout: flex",
                    "position: flex"
                ],

                answer: 0,

                challengeTitle:
                    "Flex",

                challengeDescription:
                    "فعّل Flexbox على العنصر.",

                starter:
`.container {
    display: flex;
}`,

                validate(code) {

                    return /display\s*:\s*flex/.test(code);

                }
            },


            {
                title: "Grid",
                description: "أنشئ تخطيطات شبكية.",

                objectives: [
                    "display grid.",
                    "columns.",
                    "gap.",
                    "responsive layout."
                ],

                code:
`.cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}`,

                question:
                    "ما الخاصية المستخدمة لتفعيل CSS Grid؟",

                options: [
                    "display: grid",
                    "grid: true",
                    "layout: grid",
                    "display: columns"
                ],

                answer: 0,

                challengeTitle:
                    "Grid",

                challengeDescription:
                    "فعّل Grid على العنصر.",

                starter:
`.cards {
    display: grid;
}`,

                validate(code) {

                    return /display\s*:\s*grid/.test(code);

                }
            }

        ]
    }

];


/* =========================================================
   DOM
========================================================= */

const $ = selector =>
    document.querySelector(selector);


const $$ = selector =>
    [...document.querySelectorAll(selector)];


/* =========================================================
   INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    init
);


function init() {

    renderLanguages();

    updateStats();

    setupSearch();

    setupNavigation();

    $("#copyCode")
        ?.addEventListener(
            "click",
            copyLessonCode
        );

    $("#quizSubmit")
        ?.addEventListener(
            "click",
            checkQuiz
        );

    $("#runChallenge")
        ?.addEventListener(
            "click",
            runChallenge
        );

    $("#completeLesson")
        ?.addEventListener(
            "click",
            completeCurrentLesson
        );

    $("#previousLesson")
        ?.addEventListener(
            "click",
            () => changeLesson(-1)
        );

    $("#nextLesson")
        ?.addEventListener(
            "click",
            () => changeLesson(1)
        );

}


/* =========================================================
   LANGUAGE CARDS
========================================================= */

function renderLanguages(query = "") {

    const grid =
        $("#languageGrid");

    if (!grid) return;

    const filtered =
        LANGUAGES.filter(language =>
            (
                language.name +
                language.description
            )
                .toLowerCase()
                .includes(
                    query.toLowerCase()
                )
        );

    grid.innerHTML =
        filtered.map(language => {

            const progress =
                getLanguageProgress(language);

            return `

                <article
                    class="language-card"
                    style="--language-color:${language.color}"
                    data-language="${language.id}"
                >

                    <div class="language-icon">
                        ${escapeHTML(language.short)}
                    </div>

                    <h3>
                        ${escapeHTML(language.name)}
                    </h3>

                    <p>
                        ${escapeHTML(language.description)}
                    </p>

                    <div class="language-bottom">

                        <span class="language-progress">
                            ${progress}/${language.lessons.length}
                            دروس
                        </span>

                        <span class="language-arrow">
                            ←
                        </span>

                    </div>

                </article>

            `;

        }).join("");


    $$(".language-card")
        .forEach(card => {

            card.addEventListener(
                "click",
                () =>
                    openLanguage(
                        card.dataset.language
                    )
            );

        });

}


/* =========================================================
   LANGUAGE OPEN
========================================================= */

function openLanguage(languageId) {

    const language =
        getLanguage(languageId);

    if (!language) return;

    state.selectedLanguage =
        languageId;

    saveState();

    const languagesSection =
        $("#languagesSection");

    const lessonRoom =
        $("#lessonRoom");

    languagesSection.hidden = true;

    lessonRoom.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    renderLessonSidebar();

    openLesson(
        getLanguageProgress(language) || 0
    );

}


/* =========================================================
   LESSON
========================================================= */

let currentLessonIndex = 0;

let selectedQuizAnswer = null;


function openLesson(index) {

    const language =
        getLanguage(
            state.selectedLanguage
        );

    if (!language) return;

    if (
        index < 0 ||
        index >= language.lessons.length
    ) {
        return;
    }

    currentLessonIndex = index;

    selectedQuizAnswer = null;

    const lesson =
        language.lessons[index];

    $("#lessonLanguageName")
        .textContent =
        language.name;

    $("#lessonTitle")
        .textContent =
        lesson.title;

    $("#lessonNumber")
        .textContent =
        `LESSON ${String(index + 1).padStart(2, "0")}`;

    $("#lessonMainTitle")
        .textContent =
        lesson.title;

    $("#lessonDescription")
        .textContent =
        lesson.description;

    $("#lessonCount")
        .textContent =
        `${String(index + 1).padStart(2, "0")} / ${String(language.lessons.length).padStart(2, "0")}`;

    $("#lessonXP")
        .textContent = 50;

    $("#lessonVideo")
        .src =
        `https://www.youtube.com/embed/${language.video}?rel=0`;

    $("#lessonObjectives")
        .innerHTML =
        lesson.objectives
            .map(item =>
                `<li>${escapeHTML(item)}</li>`
            )
            .join("");

    $("#exampleLanguage")
        .textContent =
        language.name;

    $("#lessonCode")
        .textContent =
        lesson.code;

    $("#quizQuestion")
        .textContent =
        lesson.question;

    $("#quizResult")
        .textContent = "";

    $("#quizOptions")
        .innerHTML =
        lesson.options
            .map((option, index) => `

                <button
                    class="quiz-option"
                    data-index="${index}"
                >
                    ${escapeHTML(option)}
                </button>

            `)
            .join("");

    $$(".quiz-option")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    $$(".quiz-option")
                        .forEach(item =>
                            item.classList.remove(
                                "selected"
                            )
                        );

                    button.classList.add(
                        "selected"
                    );

                    selectedQuizAnswer =
                        Number(
                            button.dataset.index
                        );

                }
            );

        });


    $("#challengeTitle")
        .textContent =
        lesson.challengeTitle;

    $("#challengeDescription")
        .textContent =
        lesson.challengeDescription;

    $("#challengeEditor")
        .value =
        lesson.starter;

    $("#challengeOutput")
        .textContent =
        "جاهز للتشغيل...";

    $("#challengeOutput")
        .className =
        "challenge-output";

    renderLessonSidebar();

    updateNavigationButtons();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   LESSON SIDEBAR
========================================================= */

function renderLessonSidebar() {

    const language =
        getLanguage(
            state.selectedLanguage
        );

    if (!language) return;

    const list =
        $("#lessonList");

    list.innerHTML =
        language.lessons
            .map((lesson, index) => {

                const key =
                    lessonKey(
                        language.id,
                        index
                    );

                const done =
                    state.completedLessons
                        .includes(key);

                return `

                    <button
                        class="
                            lesson-item
                            ${index === currentLessonIndex ? "active" : ""}
                            ${done ? "done" : ""}
                        "
                        data-index="${index}"
                    >

                        <span class="lesson-item-number">
                            ${String(index + 1).padStart(2, "0")}
                        </span>

                        <span>
                            ${escapeHTML(lesson.title)}
                        </span>

                    </button>

                `;

            }).join("");


    $$(".lesson-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                () =>
                    openLesson(
                        Number(
                            button.dataset.index
                        )
                    )
            );

        });

}


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

    $("#backToLanguages")
        ?.addEventListener(
            "click",
            () => {

                $("#lessonRoom").hidden = true;

                $("#languagesSection").hidden = false;

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );


    $("#startLearningBtn")
        ?.addEventListener(
            "click",
            () => {

                $("#languagesSection")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

}


function changeLesson(direction) {

    const language =
        getLanguage(
            state.selectedLanguage
        );

    if (!language) return;

    const next =
        currentLessonIndex + direction;

    if (
        next < 0 ||
        next >= language.lessons.length
    ) {
        return;
    }

    openLesson(next);

}


function updateNavigationButtons() {

    const language =
        getLanguage(
            state.selectedLanguage
        );

    if (!language) return;

    $("#previousLesson").disabled =
        currentLessonIndex === 0;

    $("#nextLesson").disabled =
        currentLessonIndex ===
        language.lessons.length - 1;

}


/* =========================================================
   QUIZ
========================================================= */

function checkQuiz() {

    const language =
        getLanguage(
            state.selectedLanguage
        );

    const lesson =
        language.lessons[
            currentLessonIndex
        ];

    if (
        selectedQuizAnswer === null
    ) {

        showToast(
            "اختر إجابة أولًا."
        );

        return;

    }

    const buttons =
        $$(".quiz-option");

    buttons.forEach(button => {

        const index =
            Number(
                button.dataset.index
            );

        if (
            index === lesson.answer
        ) {
            button.classList.add(
                "correct"
            );
        }

        if (
            index === selectedQuizAnswer &&
            index !== lesson.answer
        ) {
            button.classList.add(
                "wrong"
            );
        }

    });


    const key =
        lessonKey(
            language.id,
            currentLessonIndex
        );


    if (
        selectedQuizAnswer ===
        lesson.answer
    ) {

        $("#quizResult")
            .textContent =
            "✓ إجابة صحيحة — أحسنت!";

        $("#quizResult")
            .style.color =
            "#43e7a4";


        if (
            !state.quizPassed
                .includes(key)
        ) {

            state.quizPassed.push(key);

            addXP(25);

        }

    } else {

        $("#quizResult")
            .textContent =
            "✕ الإجابة غير صحيحة، حاول مرة أخرى.";

        $("#quizResult")
            .style.color =
            "#ff667d";

    }

    saveState();

    updateStats();

}


/* =========================================================
   CHALLENGE
========================================================= */

function runChallenge() {

    const language =
        getLanguage(
            state.selectedLanguage
        );

    const lesson =
        language.lessons[
            currentLessonIndex
        ];

    const code =
        $("#challengeEditor")
            .value
            .trim();

    const output =
        $("#challengeOutput");

    if (!code) {

        output.textContent =
            "اكتب الحل أولًا.";

        output.className =
            "challenge-output error";

        return;

    }


    const passed =
        lesson.validate(code);


    if (passed) {

        output.textContent =
            "✓ تم اجتياز التحدي بنجاح! +50 XP";

        output.className =
            "challenge-output success";


        const key =
            lessonKey(
                language.id,
                currentLessonIndex
            );


        if (
            !state.challengesPassed
                .includes(key)
        ) {

            state.challengesPassed
                .push(key);

            addXP(50);

        }

    } else {

        output.textContent =
            "✕ الحل لم يجتز التحقق. راجع المطلوب وحاول مرة أخرى.";

        output.className =
            "challenge-output error";

    }

    saveState();

    updateStats();

}


/* =========================================================
   COMPLETE LESSON
========================================================= */

function completeCurrentLesson() {

    const language =
        getLanguage(
            state.selectedLanguage
        );

    if (!language) return;

    const key =
        lessonKey(
            language.id,
            currentLessonIndex
        );


    if (
        !state.completedLessons
            .includes(key)
    ) {

        state.completedLessons
            .push(key);

        addXP(50);

        showToast(
            "تم إكمال الدرس! +50 XP"
        );

    } else {

        showToast(
            "هذا الدرس مكتمل مسبقًا."
        );

    }


    saveState();

    updateStats();

    renderLessonSidebar();

}


/* =========================================================
   STATS
========================================================= */

function updateStats() {

    const completed =
        state.completedLessons.length;

    const total =
        LANGUAGES.reduce(
            (sum, language) =>
                sum + language.lessons.length,
            0
        );

    const percent =
        total
            ? Math.round(
                completed / total * 100
            )
            : 0;


    $("#headerXP")
        ?.replaceChildren(
            document.createTextNode(
                state.xp
            )
        );

    $("#academyXP")
        ?.replaceChildren(
            document.createTextNode(
                state.xp
            )
        );

    $("#completedLessons")
        ?.replaceChildren(
            document.createTextNode(
                completed
            )
        );

    $("#progressPercent")
        ?.replaceChildren(
            document.createTextNode(
                `${percent}%`
            )
        );


    const ring =
        $(".progress-ring");

    if (ring) {

        ring.style.background =
            `
            radial-gradient(
                circle,
                #0b1119 57%,
                transparent 59%
            ),
            conic-gradient(
                #20d9ff
                ${percent * 3.6}deg,
                #18222f
                ${percent * 3.6}deg
            )
            `;

    }


    let level = "مبتدئ";

    if (state.xp >= 500) {
        level = "خبير";
    } else if (state.xp >= 250) {
        level = "متقدم";
    } else if (state.xp >= 100) {
        level = "متعلم";
    }

    $("#academyLevel")
        ?.replaceChildren(
            document.createTextNode(
                level
            )
        );

}


/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

    $("#languageSearch")
        ?.addEventListener(
            "input",
            event =>
                renderLanguages(
                    event.target.value
                )
        );

}


/* =========================================================
   COPY
========================================================= */

async function copyLessonCode() {

    const code =
        $("#lessonCode")
            ?.textContent || "";

    try {

        await navigator.clipboard.writeText(
            code
        );

        showToast(
            "تم نسخ الكود."
        );

    } catch {

        showToast(
            "تعذر نسخ الكود."
        );

    }

}


/* =========================================================
   HELPERS
========================================================= */

function getLanguage(id) {

    return LANGUAGES.find(
        language =>
            language.id === id
    );

}


function getLanguageProgress(language) {

    return language.lessons.filter(
        (_, index) =>
            state.completedLessons
                .includes(
                    lessonKey(
                        language.id,
                        index
                    )
                )
    ).length;

}


function lessonKey(
    languageId,
    lessonIndex
) {

    return `${languageId}:${lessonIndex}`;

}


function addXP(amount) {

    state.xp += amount;

    saveState();

}


function showToast(message) {

    const toast =
        $("#toast");

    if (!toast) return;

    toast.textContent =
        message;

    toast.classList.add("show");

    clearTimeout(
        showToast.timer
    );

    showToast.timer =
        setTimeout(
            () =>
                toast.classList.remove(
                    "show"
                ),
            2800
        );

}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   PUBLIC API
========================================================= */

window.MirsadProgrammingAcademy = {

    getState() {

        return {
            ...state
        };

    },

    getLanguages() {

        return LANGUAGES;

    },

    resetProgress() {

        state =
            structuredClone(
                defaultState
            );

        saveState();

        location.reload();

    }

};
