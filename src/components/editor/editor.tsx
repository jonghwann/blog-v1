'use client';

import { useRef } from 'react';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight, common } from 'lowlight';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';

import EditorToolbar from './editor-toolbar';

export default function Editor() {
  const inputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Placeholder.configure({ placeholder: '내용을 입력해주세요.' }),
      CustomCodeBlockLowlight.configure({ lowlight: createLowlight(common), defaultLanguage: 'typescript' }),
      TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),
      Image,
    ],
    editorProps: { attributes: { class: 'outline-none p-2' } },
    content: '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      inputRef.current!.value = editor.getHTML();
    },
  });

  return (
    <div>
      <EditorToolbar editor={editor} />
      <EditorContent className="tiptap" editor={editor} />
      <input ref={inputRef} type="hidden" name="content" />
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
