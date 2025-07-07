import { writeAction } from './action';

import PostForm from '@/components/post/post-form';

export default function WritePage() {
  return <PostForm action={writeAction} />;
}
