'use client';


import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { createLowlight, common } from 'lowlight';
import { useRef } from 'react';

import { cn } from '@/lib/utils';

import EditorToolbar from './editor-toolbar';

interface EditorProps {
  className?: string;
  defaultValue?: string;
}

export default function Editor({ className, defaultValue }: EditorProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Placeholder.configure({ placeholder: 'Write your story...' }),
      CustomCodeBlockLowlight.configure({ lowlight: createLowlight(common), defaultLanguage: 'typescript' }),
      TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),
      Image,
    ],
    editorProps: {
      attributes: {
        class: cn(
          'outline-none min-h-[calc(100vh-64px-64px-64px-64px-84px-48px-40px-40px-20px-2px)] pb-12 pt-5',
          className,
        ),
      },
    },
    content: defaultValue ?? '',
    immediatelyRender: false,
  });

  return (
    <div>
      <EditorToolbar editor={editor} />
      <EditorContent className="tiptap" editor={editor} />
      <input ref={inputRef} type="hidden" name="content" value={editor?.getHTML() ?? ''} />
    </div>
  );
}

const CustomCodeBlockLowlight = CodeBlockLowlight.extend({
  addKeyboardShortcuts() {
    return {
      Tab: () => {
        this.editor.commands.insertContent('  ');
        return true;
      },
    };
  },
});
