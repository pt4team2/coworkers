import { PacmanLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className="mx-auto my-[200px] flex flex-col items-center justify-center gap-10">
      <PacmanLoader
        color="#10b981"
        // cssOverride={{ margin: '150px auto' }}
        size={40}
      />
      <div className="text-xl-medium m-auto block text-brand-primary">
        로딩중...
      </div>
    </div>
  );
}
