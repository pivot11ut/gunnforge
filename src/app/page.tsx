import TerminalWithBoot from '@/components/TerminalWithBoot';
import { getCurrentUser } from '@/lib/auth';

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <TerminalWithBoot
      isAuthenticated={!!user}
      username={user?.username}
    />
  );
}
