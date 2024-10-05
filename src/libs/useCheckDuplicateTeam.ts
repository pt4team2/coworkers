// useCheckDuplicateTeam.ts
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import useUser from '@/hooks/useUser';
import useMemberships from '@/hooks/useMemberships';
import { IMembership } from '@/types/user';
import useSessionStore from '@/store/useSessionStore';

export default function useCheckDuplicateTeam() {
  const { user } = useSessionStore();
  const { userData } = useUser(user?.id);
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
