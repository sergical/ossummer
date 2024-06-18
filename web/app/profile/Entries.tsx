import { BorderBeam } from '@/components/magicui/border-beam';
import { Button } from '@/components/ui/button';
import { MIN_SUBMISSIONS } from '@/constants';

import { useEntries } from '@/hooks/useEntries';

export function Entries() {
  const { entries, isLoading, isError } = useEntries();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {isError.message}</div>;
  }

  const handleWhitelist = () => {
    console.log('whitelist');
  };

  const duration = entries ? (MIN_SUBMISSIONS / entries) * 2 : 4;

  const allowedToSubmit = entries && entries >= MIN_SUBMISSIONS;

  return (
    <div className="relative flex h-[250px] w-full items-center justify-center rounded-xl border border-border">
      <BorderBeam duration={duration} />
      {allowedToSubmit ? (
        <div className="text-2xl font-bold">
          <Button onClick={handleWhitelist}>Confirm entries</Button>
        </div>
      ) : (
        <div className="text-2xl font-bold">
          {entries} / {MIN_SUBMISSIONS}
        </div>
      )}
    </div>
  );
}
