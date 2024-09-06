import { CircularProgressbar } from 'react-circular-progressbar';

export default function ProgressBarMobile({ value }: { value: number }) {
  return (
    <div className="relative h-36 w-36">
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible',
        }}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="50%" y2="80%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#a3e635" />
          </linearGradient>
        </defs>
      </svg>

      <CircularProgressbar
        value={value}
        strokeWidth={18}
        styles={{
          path: {
            stroke: `url(#gradient)`,
            strokeLinecap: 'round', // 경로 끝 부분을 둥글게 설정
          },
          trail: { stroke: '#334155' },
          text: {
            fill: 'url(#text-gradient)',
            fontSize: '16px',
          },
        }}
      />
    </div>
  );
}
