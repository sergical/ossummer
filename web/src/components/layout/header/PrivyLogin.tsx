'use client';
import { usePrivy } from '@privy-io/react-auth';

export default function PrivyLogin() {
  const { ready, authenticated, login, logout } = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);
  const disableLogout = !ready || (ready && !authenticated);

  if (authenticated) {
    return (
      <button
        disabled={disableLogout}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={logout}
        type="button"
      >
        Log out
      </button>
    );
  }
  return (
    <button disabled={disableLogin} onClick={login} type="button">
      Log in
    </button>
  );
}
