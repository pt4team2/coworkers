import { CircularProgressbar } from 'react-circular-progressbar';

export default function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-[14px] w-[14px]">
      <CircularProgressbar
        value={value}
        // text={`${value}%`}
        strokeWidth={20}
        styles={{
          path: { stroke: '#10B981' }, // 경로 색상
          trail: { stroke: '#d6d6d6' }, // 경로의 배경색
          text: { fill: '#f88', fontSize: '16px' }, // 텍스트 스타일
        }}
      />
    </div>
  );
}
