import LoginButton from '@/components/layout/login-button';

export function ContributorsHero() {
  return (
    <section id="contributors-hero" className="relative m-4 overflow-hidden rounded-4xl bg-hero-bg">
      <div className="relative flex h-full flex-col justify-center py-36">
        <div className="container z-10 flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Contributors</h1>
          <p className="max-w-xl text-lg">
            Explore the contributors that are participating in Open Source Summer. Join this group
            or donate onchain to support the cause.
          </p>
          <div className="flex flex-row gap-4">
            <LoginButton inNav={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
