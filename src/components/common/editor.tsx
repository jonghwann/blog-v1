'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import type { Editor as EditorType } from '@toast-ui/react-editor';
import { useTheme } from 'next-themes';

import { uploadImage } from '@/api/upload/api';

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

const ToastEditor = dynamic(() => import('@toast-ui/react-editor').then((mod) => mod.Editor), { ssr: false });

export default function Editor() {
  const editorRef = useRef<EditorType>(null);

  const [content, setContent] = useState(' ');

  const { resolvedTheme } = useTheme();

  const handleChange = () => {
    setContent(editorRef.current?.getInstance().getMarkdown());
  };

  const handleImageUpload = async (blob: File, callback: (url: string) => void) => {
    const url = await uploadImage(blob);
    callback(url);
  };

  return (
    <ToastEditor
      key={resolvedTheme}
      ref={editorRef}
      height="100%"
      initialValue={content}
      previewStyle="vertical"
      initialEditType="markdown"
      useCommandShortcut={false}
      usageStatistics={false}
      theme={resolvedTheme}
      onChange={handleChange}
      hooks={{
        addImageBlobHook: handleImageUpload,
      }}
    />
  );
}
