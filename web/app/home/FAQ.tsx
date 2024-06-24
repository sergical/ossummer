/* eslint-disable react/no-array-index-key */
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    section: 'General',
    qa: [
      {
        question: 'What is OSSummer?',
        answer: (
          <span>
            OSSummer is a way to get more developers onchain. Similar to{' '}
            <a href="https://hacktoberfest.com">Hacktoberfest</a>, but the prize is an NFT. We will
            have other ones in the future, happy to collaborate with you if you&apos;re interested
            in participating.
          </span>
        ),
      },
      {
        question: 'How can I get started with OSSummer?',
        answer: (
          <span>
            Explore the projects featured here, create PRs, submit them on your profile page and
            mint your NFT!
          </span>
        ),
      },
    ],
  },
  {
    section: 'Maintainers',
    qa: [
      {
        question: 'How can I get my projecct added to Open Source Summer?',
        answer: (
          <span>
            You can add an <code>ossummer</code> topic to your GitHub repository.
          </span>
        ),
      },
    ],
  },
  {
    section: 'Partners',
    qa: [
      {
        question: 'I want to support the project and have stuff for the community',
        answer: (
          <span>
            Absolutely! The prize is an NFT. Once I figure out all the addresses, it&apos;s really
            easy to offer something to someone based on them having that NFT. Think Shopify Coupon
            Code or idk, something even cooler!
          </span>
        ),
      },
    ],
  },
];

export function FAQ() {
  return (
    <section id="faq">
      <div className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">FAQs</h2>
          </div>
          <div className="container mx-auto my-12 max-w-[600px] space-y-12">
            {faqs.map((faq, idx) => (
              <section key={idx} id={'faq-' + faq.section}>
                <h2 className="mb-4 text-left text-base font-semibold tracking-tight text-foreground/60">
                  {faq.section}
                </h2>
                <Accordion
                  type="single"
                  collapsible
                  className="flex w-full flex-col items-center justify-center"
                >
                  {faq.qa.map((faqItem, index) => (
                    <AccordionItem
                      key={index}
                      value={faqItem.question}
                      className="w-full max-w-[600px]"
                    >
                      <AccordionTrigger>{faqItem.question}</AccordionTrigger>
                      <AccordionContent>{faqItem.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </div>
          <h4 className="mb-12 text-center text-sm font-medium tracking-tight text-foreground/80">
            Still have questions? Email me at{' '}
            <a href="mailto:s@serg.tech" className="underline">
              s@serg.tech
            </a>
          </h4>
        </div>
      </div>
    </section>
  );
}
