const experiences = [
  {
    period: "FEB 2025 – PRESENT",
    title: "Intermediate Software Implementation Specialist",
    company: "Journal Technologies Inc.",
    description:
      "Leading software deployments and managing client onboarding initiatives. Configuring systems, resolving technical issues, and ensuring successful product adoption.",
  },
  {
    period: "FEB 2025 – PRESENT",
    title: "Contract Accessibility Auditor",
    company: "AudioEye",
    description:
      "Evaluating digital products for WCAG compliance on a contract basis. Providing detailed remediation guidance to improving accessibility and usability.",
  },
  {
    period: "AUG 2024 – FEB 2025",
    title: "Full-Stack Engineer",
    company: "Growth Dynamics",
    description:
      "Designing, building, and maintaining scalable front-end and back-end systems. Collaborating with cross-functional teams to delivering performant, user-focused applications.",
  },
  {
    period: "NOV 2022 – AUG 2024",
    title: "Accessibility Auditor I–II",
    company: "ABILITY Digital Accessibility Inc.",
    description:
      "Performing manual and automated accessibility testing on web and SaaS platforms. Documenting findings and partnering with developers to driving remediation efforts.",
  },
  {
    period: "SEPT 2022 – JUNE 2024",
    title: "Data Entry Specialist",
    company: "ABC Legal Services",
    description:
      "Inputting and managing large volumes of data with accuracy. Maintaining data integrity and ensuring timely updates across systems.",
  },
  {
    period: "JAN 2022 – APR 2022",
    title: "Software Engineering Apprentice",
    company: "General Assembly",
    description:
      "Successfully completed 500+ hours of expert led instruction in HTML, CSS, and JavaScript, and hands on learning of MERN stack fundamentals and the industry's most in demand technologies. Built 4+ projects, including a full stack web application, and gained practical experience with version control, testing, and deployment best practices.",
  },
  {
    period: "JUN 2014 – DEC 2022",
    title: "Sous Chef",
    company: "Ebaes Restaurant",
    description:
      "Supporting the head chef in daily kitchen operations. Overseeing food preparation, quality control, and team coordination. Ensuring a high standard of culinary excellence and efficient service.",
  },
];

export default function MoreAboutMe() {
  return (
    <section
      id="more-about"
      aria-labelledby="more-about-heading"
      className=" border-t border-solid-black/100 bg-[#E2DAF0] flex items-center justify-center min-h-screen py-16 sm:py-24 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <span
        className="absolute top-10 right-16 text-2xl text-deep-purple/20 select-none pointer-events-none"
        aria-hidden="true"
      >
        ♡
      </span>
      <span
        className="absolute bottom-12 left-10 text-xl text-deep-purple/15 select-none pointer-events-none"
        aria-hidden="true"
      >
        ♡
      </span>
      <span
        className="absolute bottom-20 right-8 text-sm text-deep-purple/20 select-none pointer-events-none"
        aria-hidden="true"
      >
        ✦
      </span>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 grid md:grid-cols-[2fr_3fr] gap-12 md:gap-16 items-start">
        {/* Left column */}
        <div className="flex flex-col items-center md:items-start gap-6">
          {/* Circular photo — decorative duplicate of hero photo */}
          <div
            className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden bg-deep-purple ring-4 ring-white shadow-lg shrink-0"
            aria-hidden="true"
          >
            <img
              src="justin.png"
              alt=""
              className="w-full h-full object-cover object-top"
              width={192}
              height={192}
              onError={(e) => {
                const t = e.currentTarget;
                t.style.display = "none";
                const p = t.parentElement;
                if (p)
                  p.style.background =
                    "linear-gradient(135deg, #4E3C51, #B6A5D0)";
              }}
            />
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-dark-gray mb-3">
              My experiences
            </h3>
            <p className="text-dark-gray/80 text-sm leading-relaxed max-w-xs">
              I've had the pleasure of working across a variety of roles and
              industries. I'm always interested in new, exciting, and
              challenging opportunities.
            </p>
          </div>

          <a
            href="/resume.pdf"
            download
            aria-label="Download resume as PDF"
            className="inline-block border-2 border-dark-gray text-dark-gray px-6 py-3
                       rounded-lg font-medium text-sm hover:bg-dark-gray hover:text-white transition-colors"
          >
            More About Me
          </a>
        </div>

        {/* Right column */}
        <div>
          {/* Decorative badge — aria-hidden since heading already labels the section */}
          <div
            className="inline-flex items-center gap-2 border border-dark-gray/25 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-dark-gray mb-5 bg-white/40"
            aria-hidden="true"
          >
            <span className="w-2 h-2 rounded-full bg-soft-teal" />
            About
          </div>

          <h2
            id="more-about-heading"
            className="text-3xl md:text-4xl font-bold text-dark-gray mb-5 leading-tight"
          >
            More about me
          </h2>

          <p className="text-dark-gray/80 text-sm leading-relaxed mb-3">
            I'm a software accessibility engineer passionate about crafting
            digital experiences that are inclusive by design. I combine deep
            technical knowledge with a commitment to equitable access.
          </p>
          <p className="text-dark-gray/80 text-sm leading-relaxed mb-10">
            My journey in this field has been driven by a belief that the best
            software works for everyone — leveraging modern technologies while
            keeping people at the center of every decision.
          </p>

          {/* Work experience timeline */}
          <ol aria-label="Work experience">
            {experiences.map((exp, i) => (
              <li key={i} className="relative pl-7 pb-8">
                {/* Vertical connecting line — hidden from AT */}
                {i < experiences.length - 1 && (
                  <span
                    className="absolute left-[0.3rem] top-4 w-px bg-dark-gray/25 bottom-0"
                    aria-hidden="true"
                  />
                )}
                {/* Timeline dot */}
                <span
                  className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-deep-purple ring-2 ring-[#E2DAF0]"
                  aria-hidden="true"
                />

                <time className="text-xs text-dark-gray/75 font-medium block mb-1">
                  {exp.period}
                </time>
                <h4 className="font-bold text-dark-gray text-sm">
                  {exp.title}
                  <span className="font-normal text-dark-gray/75">
                    {" "}
                    at {exp.company}
                  </span>
                </h4>
                <p className="text-dark-gray/75 text-xs leading-relaxed mt-1">
                  {exp.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
