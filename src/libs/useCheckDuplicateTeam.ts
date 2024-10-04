// useCheckDuplicateTeam.ts
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import useUser from '@/hooks/useUser';
import useMemberships from '@/hooks/useMemberships';
import { IMembership } from '@/types/user';

export default function useCheckDuplicateTeam() {
  const { data: session } = useSession();
  const { user } = useUser(session?.user.id);
  const membership = useMemberships(user?.id);
  const joinGroups = membership.memberships?.map(
    (membership: IMembership) => membership.group.name,
  );
  const [isDuplicate, setIsDuplicate] = useState(false);

  const checkDuplicate = (teamName: string) => {
    if (
      teamName &&
      joinGroups?.some((existTeamName: string) => existTeamName === teamName)
    ) {
      setIsDuplicate(true);
    } else {
      setIsDuplicate(false);
    }
  };

  return { isDuplicate, checkDuplicate, joinGroups }; // joinGroups 추가
}
