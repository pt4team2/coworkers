import { authAxiosInstance } from '@/app/api/auth/axiosInstance';

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData(); // formData 변수명을 소문자로 수정
  formData.append('image', file); // FormData 객체에 파일 추가

  try {
    const response = await authAxiosInstance.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // 적절한 헤더 설정
      },
    });

    return response.data.url; // 서버에서 반환된 이미지 URL 반환
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw new Error('이미지 업로드에 실패했습니다.'); // 에러 처리
  }
};
