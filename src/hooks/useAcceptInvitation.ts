import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { authAxiosInstance } from '@/app/api/auth/axiosInstance';

interface IFormData {
  userEmail: string;
  token: string;
}

// // 팀 생성 API 요청 함수
const acceptTeamRequest = useMutation({
  mutationFn: (formData: IFormData) => {
    return authAxiosInstance.post(`/groups/accept-invitation`, formData);
  },
  onSuccess: () => {
    console.log('팀 참여 완료!');
  },
  onError: () => (error: any) => {
    console.error('에러 발생', error);
  },
});

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<IFormData>();
export default acceptTeamRequest;
