import Image from 'next/image';
import IcPreview from '@/assets/icons/ic_imagePreview.svg';
import IcEdit from '@/assets/icons/ic_edit.svg';
import { useRef, useState } from 'react';
import { uploadImage } from '@/libs/uploadImage';
import IcSmallImage from '@/assets/icons/ic_imagePreviewIn.svg';

interface ImageInputProps {
  imageUrl: string | null;
  setImageUrl: (value: string | null) => void;
}

export default function ImageInput({ imageUrl, setImageUrl }: ImageInputProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const imgRef = useRef<HTMLInputElement | null>(null);

  // 파일 선택 시 미리보기 저장
  const saveImgFile = () => {
    const file = imgRef.current?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
  };

  // 이미지 업로드 처리
  const handleImageUpload = async () => {
    const file = imgRef.current?.files?.[0];
    if (!file) return;
    setIsUploading(true);

    try {
      const uploadUrl = await uploadImage(file); // 이미지 업로드 함수 호출
      console.log('업로드된 이미지 URL:', uploadUrl);
      setImageUrl(uploadUrl); // 업로드된 이미지 URL을 상태로 설정
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // 파일 변경 시 미리보기 및 업로드 처리
  const handleFileChange = () => {
    saveImgFile(); // 미리보기 이미지 설정
    handleImageUpload(); // 이미지 업로드
  };

  return (
    <>
      <div className="relative">
        {preview ? (
          <img
            src={preview}
            alt="미리보기 이미지"
            className="h-16 w-16 rounded-full"
          />
        ) : (
          <Image src={IcPreview} alt="미리보기" width={64} height={64} />
        )}
        <button
          className="absolute bottom-0 left-11"
          type="button"
          onClick={() => imgRef.current?.click()}
        >
          <Image src={IcEdit} alt="편집하기" width={24} height={24} />
        </button>
      </div>

      <div>
        <input
          ref={imgRef}
          type="file"
          accept="image/*"
          className="hidden"
          id="teamImage"
          onChange={handleFileChange} // 파일 변경 시 처리
        />
      </div>
      {/* 
      {isUploading && <p>업로드 중...</p>}

      {imageUrl && (
        <p>
          업로드된 이미지 URL:{' '}
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            {imageUrl}
          </a>
        </p>
      )} */}
    </>
  );
}
