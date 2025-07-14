import PostForm from '@/components/post/post-form';

import { writeAction } from './action';


export default function WritePage() {
  return <PostForm action={writeAction} />;
}
