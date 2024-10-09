"use client";

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
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
      setFilteredArticles(articleResponse.list);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredArticles(filtered);
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

  return (
    <div className="px-4 lg:px-0 py-8 bg-[#0F172A] min-h-screen md:px-6 md:py-10 lg:py-10">
      <h1 className="text-2lg-bold mb-6">자유게시판</h1>
      
      <SearchForm onSearch={handleSearch} placeholder="검색어를 입력해주세요" />

      <div className="mt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg-medium">베스트 게시글</h2>
          <button className="flex items-center">
            <span className="text-[#94A3B8] text-xs-regular">더보기</span>
            <Image src={RightArrowIcon} alt="오른쪽 화살 아이콘" width={16} height={16} className="ml-[2px]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bestArticles.slice(0, cardCount).map((article) => (
            <BestArticleCard key={article.id} articleId={article.id} />
          ))}
        </div>
      </div>

      <div className="border-t border-[#F8FAFC1A] my-8"></div>

      <div>
        <div className="flex justify-between items-center mb-4 relative">
          <h2 className="text-white text-lg-regular">게시글</h2>
          <div className="relative z-10">
            <Dropdown onSelect={(option) => console.log(option)} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 z-0">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <ArticleCard key={article.id} articleId={article.id} />
            ))
          ) : (
            <div className="text-white">검색 결과가 없습니다.</div>
          )}
        </div>
      </div>
      <FloatingButton />
    </div>
  );
};

export default BoardPage;
