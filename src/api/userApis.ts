import { authAxiosInstance } from '@/app/api/auth/axiosInstance';
import { IMembership } from '@/types/user';

export const getUserGroups = async () => {
  const response = await authAxiosInstance.get<IMembership>(`/user/groups`);
  return response.data;
};
