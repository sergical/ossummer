/* eslint-disable react/no-array-index-key */
'use client';

import ColorChangingHeading from '@/components/color-changing-header';
import Footer from '@/components/layout/footer/Footer';
type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

const faqItems: FAQItem[] = [
  {
    question: 'What is OSSummer?',
    answer: (
      <span>
        OSSummer is a way to get more developers onchain. Similar to{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://hacktoberfest.com/"
          className="font-medium text-primary underline underline-offset-4"
        >
          Hacktoberfest
        </a>
        , but the prize is an NFT. We will have other ones in the future, happy to collaborate with
        you if you&apos;re interested in participating.
      </span>
    ),
  },
  {
    question: 'How can I get started with OSSummer?',
    answer:
      'Explore the projects featured here, create PRs, submit them on your profile page and mint your NFT!',
  },
  {
    question: 'How can I get my project added to Open Source Summer?',
    answer: 'You can add an ossummer topic to your GitHub repository.',
  },
  {
    question: 'How do I make sure I get quality PRs?',
    answer: (
      <span>
        In the future we can add a quality gate to project submissions. Contributions come in
        differnt forms, it&apos;s hard to make sure they are all meeting your expected quality. To
        help, here&apos;s a link to{' '}
        <a
          href="https://github.com/sergical/ossummer/blob/main/.github/CONTRIBUTING_TEMPLATE.md"
          className="font-medium text-primary underline underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          CONTRIBUTING.md
        </a>{' '}
        and{' '}
        <a
          href="https://github.com/sergical/ossummer/blob/main/CODE_OF_CONDUCT.md"
          className="font-medium text-primary underline underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          CODE_OF_CONDUCT.md
        </a>{' '}
        to add to your project.
      </span>
    ),
  },
  {
    question: 'I want to support the project and have stuff for the community',
    answer:
      "Absolutely! The prize is an NFT. Once I figure out all the addresses, it's really easy to offer something to someone based on them having that NFT. Think Shopify Coupon Code or idk, something even cooler!",
  },
  {
    question: 'Still have questions?',
    answer: (
      <span>
        Email me at{' '}
        <a
          href="mailto:s@serg.tech"
          className="font-medium text-primary underline underline-offset-4"
        >
          s@serg.tech
        </a>
      </span>
    ),
  },
];

export function FAQ() {
  return (
    <div className="bg-ossummer">
      <section id="faq">
        <div className="py-14">
          <div className="container mx-auto px-4 md:px-8">
            <div className="mx-auto text-center">
              <ColorChangingHeading text="FAQs" color="text-foreground" />
            </div>
            <div className="container mx-auto my-12 max-w-[564px] space-y-12">
              {faqItems.map((faqItem, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold">{faqItem.question}</h3>
                  <p>{faqItem.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
