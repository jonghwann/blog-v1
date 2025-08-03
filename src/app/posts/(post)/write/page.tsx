'use client';

import { api } from '@/api/api';
// import PostForm from '@/components/post/post-form';
// import { writeAction } from './action';

export default function WritePage() {
  // return <PostForm action={writeAction} />;

  const handleClick = async () => {
    const response = await api
      .post('posts/write', { json: { title: 'test', content: 'test', tags: ['test'] }, credentials: 'include' })
      .json();
    console.log(response);
  };

  return (
    <button type='button' onClick={handleClick}>
      test
    </button>
  );
}
