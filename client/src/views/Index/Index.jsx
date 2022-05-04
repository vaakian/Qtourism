import React, { useCallback, useState } from 'react';
import './index.scss';
import { Input, AutoComplete, Avatar, Carousel, Image, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { usePackageService } from '../../services';
import { throttle } from '../../utils';

const Index = () => {
  // const packageService = usePackageService()
  // const { isLoading, data, isSuccess } = useQuery('package', async () => {
  //   const { data } = await delayedPromise(1000, packageService.getPackages)
  //   return data
  // })
  return (
    <div className="index">
      <div
        className="search absolute left-1/2 top-1/2"
        style={{ marginInline: 'auto' }}
      >
        <Title />
        <div
          className="bg-slate-50 p-5 rounded-md shadow-lg bg-opacity-90 w-[450px]"
          style={{ marginInline: 'auto' }}
        >
          <PackageCarousel />
          <Caption />
          <SearchItem />
        </div>
      </div>
    </div>
  );
};
const PackageCarousel = () => {
  return (
    <Carousel autoplay>
      {[1, 2, 3, 4].map((i) => (
        <img
          className="rounded-md"
          src={`https://source.unsplash.com/random/275x150/?travel,scenery&${i}`}
          key={i}
        ></img>
      ))}
    </Carousel>
  );
};
const Title = () => {
  return (
    <div className="title text-center">
      <h1>Freedom旅游客栈</h1>
    </div>
  );
};
const Caption = () => {
  return (
    <div className="caption text-center">
      <h1>搜索</h1>
      <p>输入关键字，搜索相关内容</p>
    </div>
  );
};
export const SearchItem = () => {
  const [keyword, setKeyword] = useState('');
  const [options, setOptions] = useState('');
  const packageService = usePackageService();
  const navigate = useNavigate();
  console.log({ options });
  const { isFetching, data } = useQuery(
    ['search', keyword],
    async ({ queryKey }) => {
      const { data } = await packageService.getPackages({
        keyword: queryKey[1],
        page: 1,
      });
      Array.isArray(data) &&
        setOptions(
          data.map((item) => ({
            value: item.id.toString(),
            label: item.name,
          }))
        );
      return data;
    }
  );
  const onSelect = (value) => {
    // onSelect 直接跳到该套餐
    if (value) {
      navigate(`/package/${value}`);
    }
  };
  const onSearch = (value) => {
    // 跳到搜索结果页
    if (value) {
      navigate(`/package?keyword=${value}`);
    }
  };
  const onKeywordChange = useCallback(
    throttle((e) => {
      setKeyword(e.target.value);
    }, 800),
    [setKeyword]
  );
  return (
    <div
      className="w-full flex justify-center"
      style={{ marginInline: 'auto' }}
    >
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{ width: 300 }}
        options={options}
        onSelect={onSelect}
      >
        <Input.Search
          loading={isFetching}
          placeholder="搜索未知的圣地🌍"
          size="large"
          onSearch={onSearch}
          onChange={onKeywordChange}
          enterButton
        />
      </AutoComplete>
    </div>
  );
};

export default Index;
