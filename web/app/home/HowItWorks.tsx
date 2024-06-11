import { EnjoyRewards } from './EnjoyRewards';
import { MintNft } from './MintNft';
import { SubmitPrs } from './SubmitPrs';

export default function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How it works</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:mx-auto md:mt-12 md:max-w-[500px] md:grid-cols-1 md:gap-8 lg:mt-14 lg:max-w-full lg:grid-cols-3 lg:gap-10">
          <SubmitPrs />
          <MintNft />
          <EnjoyRewards />
        </div>
      </div>
    </section>
  );
}
