'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Dropdown from '@/components/pages/boards/dropdown/Dropdown';
import BestArticleCard from '@/components/pages/boards/bestArticleCard/BestArticleCard';
import ArticleCard from '@/components/pages/boards/articleCard/ArticleCard';
import SearchForm from '@/components/pages/boards/searchForm/SearchForm';
import FloatingButton from '@/components/pages/boards/flaotingButton/FloatingButton';
import RightArrowIcon from '@/assets/icons/ic_rightArrow.svg';
import { getArticles } from '@/services/api/article';
import { Article } from '@/types/article';

const BoardPage = () => {
  const [cardCount, setCardCount] = useState(1);
  const [bestArticles, setBestArticles] = useState<Article[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const handleResize = () => {
    if (window.innerWidth >= 1200) {
      setCardCount(3);
    } else if (window.innerWidth >= 744) {
      setCardCount(2);
    } else {
      setCardCount(1);
    }
  };

  const fetchArticles = async () => {
    try {
      const bestResponse = await getArticles({
        page: 1,
        pageSize: 3,
        orderBy: 'like',
      });
      setBestArticles(bestResponse.list);

      const articleResponse = await getArticles({
        page: 1,
        pageSize: 4,
        orderBy: 'recent',
      });
      setArticles(articleResponse.list);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    fetchArticles();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(articles);

  return (
    <div className="min-h-screen bg-[#0F172A] px-4 py-8 md:px-6 md:py-10 lg:px-0 lg:py-10">
      <h1 className="text-2lg-bold mb-6">자유게시판</h1>

      <SearchForm
        onSearch={(term) => console.log(term)}
        placeholder="검색어를 입력해주세요"
      />

      <div className="mt-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg-medium">베스트 게시글</h2>
          <button className="flex items-center">
            <span className="text-xs-regular text-[#94A3B8]">더보기</span>
            <Image
              src={RightArrowIcon}
              alt="오른쪽 화살 아이콘"
              width={16}
              height={16}
              className="ml-[2px]"
            />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bestArticles.slice(0, cardCount).map((article) => (
            <BestArticleCard key={article.id} articleId={article.id} />
          ))}
        </div>
      </div>

      <div className="my-8 border-t border-[#F8FAFC1A]"></div>

      <div>
        <div className="relative mb-4 flex items-center justify-between">
          <h2 className="text-lg-regular text-white">게시글</h2>
          <div className="relative z-10">
            <Dropdown onSelect={(option) => console.log(option)} />
          </div>
        </div>

        <div className="z-0 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.id} articleId={article.id} />
          ))}
        </div>
      </div>
      <FloatingButton />
    </div>
  );
};

export default BoardPage;
