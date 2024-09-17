import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProviders, signIn } from 'next-auth/react';
import googleLogo from '@/assets/icons/googleLogo.svg';
import kakaotalkLogo from '@/assets/icons/kakaotalkLogo.svg';

interface OAuthLoginOptionsProps {
  label: string;
}

export default function OAuthLoginOptions({ label }: OAuthLoginOptionsProps) {
  // 카카오 로그인
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res: any = await getProviders();

      setProviders(res);
    })();
  }, []);

  return (
    <div className="flex w-85.75-custom flex-col items-center gap-4 md:w-115-custom lg:w-115-custom">
      <div className="flex w-full items-center text-text-primary">
        <div className="h-px flex-grow bg-border-tertiary"></div>
        <span className="text-lg-regular mx-6 text-text-inverse">OR</span>
        <div className="h-px flex-grow bg-border-tertiary"></div>
      </div>
      <div className="flex w-full items-center justify-between">
        <span className="text-lg-medium text-text-inverse">{label}</span>
        <div className="flex gap-4">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              signIn('google', { redirect: true, callbackUrl: '/' });
            }}
          >
            <Image
              src={googleLogo}
              width={42}
              height={42}
              alt="구글로 로그인하기"
            />
          </Link>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              signIn('kakao', { redirect: true, callbackUrl: '/' });
            }}
          >
            <Image
              src={kakaotalkLogo}
              width={42}
              height={42}
              alt="카카오로 로그인하기"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
