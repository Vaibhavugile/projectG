import "../styles/faqSection.css";

const faqs = [
  {
    question: "What is Kalyan Result Today?",
    answer:
      "Kalyan Result Today includes the latest open result, jodi result and close result announced for the Kalyan market.",
  },
  {
    question: "How can I check Main Bazar Result?",
    answer:
      "You can check Main Bazar Result daily along with open-close figures, jodi chart and panel chart updates.",
  },
  {
    question: "What is Jodi in Satta Matka?",
    answer:
      "Jodi is a two-digit number generated from open and close results and is one of the most searched Matka result formats.",
  },
  {
    question: "What is a Panel Chart?",
    answer:
      "Panel Chart contains historical panel numbers and previous market records used for result analysis.",
  },
  {
    question: "When are market results updated?",
    answer:
      "Results are updated according to the official market open and close timings for each Matka market.",
  },
];

function FAQSection() {
  return (
    <section className="faq-section">

      <div className="faq-header">
        <h2>❓ Frequently Asked Questions</h2>

        <p>
          Answers about Kalyan Result, Main Bazar Result,
          Jodi Charts and Satta Matka markets.
        </p>
      </div>

      <div className="faq-list">

        {faqs.map((item) => (
          <div
            key={item.question}
            className="faq-card"
          >
            <h3>{item.question}</h3>

            <p>{item.answer}</p>
          </div>
        ))}

      </div>

    </section>
  );
}

export default FAQSection;