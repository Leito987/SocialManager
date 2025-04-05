import { useState } from "react";
import { useI18n } from "~/contexts/I18nContext";

const faqs = [
  {
    questionKey: "faq.q1",
    answerKey: "faq.a1",
  },
  {
    questionKey: "faq.q2",
    answerKey: "faq.a2",
  },
  {
    questionKey: "faq.q3",
    answerKey: "faq.a3",
  },
  {
    questionKey: "faq.q4",
    answerKey: "faq.a4",
  },
];

export function FAQ() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <div id="faq" className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">
            {t("faq.title")}
          </h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight">
            {t("app.tagline")}
          </p>
        </div>
        
        <div className="mt-12 max-w-3xl mx-auto">
          <dl className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-800 pb-6">
                <dt className="text-lg">
                  <button
                    className="flex w-full items-start justify-between text-left text-gray-900 dark:text-white"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-medium">{t(faq.questionKey)}</span>
                    <span className="ml-6 flex h-7 items-center">
                      <svg
                        className={`h-6 w-6 transform ${openIndex === index ? '-rotate-180' : 'rotate-0'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                </dt>
                <dd className={`mt-2 ${openIndex === index ? 'block' : 'hidden'}`}>
                  <p className="text-base text-gray-600 dark:text-gray-400">
                    {t(faq.answerKey)}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
