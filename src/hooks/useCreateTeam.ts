
// import { useMutation } from '@tanstack/react-query';
// import { authAxiosInstance } from '@/app/api/auth/axiosInstance';

// interface IFormData {
//   image: string;
//   name: string;
// }

// // 팀 생성 API 요청 함수
// const createTeamRequest = async (formData: IFormData): Promise<any> => {
//   const response = await authAxiosInstance.post('/groups', formData);
//   return response.data; // 서버에서 반환하는 데이터를 반환
// };

// // useCreateTeam 훅
// const useCreateTeam = () => {
//   return useMutation<any, Error, IFormData>(createTeamRequest, {
//     onSuccess: (data: any) => {
//       console.log('Team created successfully', data);
//       // 성공 시 추가 로직 (예: 페이지 이동)
//     },
//     onError: (error: any) => {
//       console.error('Error creating team:', error.message || error);
//       // 에러 처리 로직 추가
//     },
//   });
// };

// export default useCreateTeam;
