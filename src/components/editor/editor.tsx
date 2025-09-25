'use client';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, Extension, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { type Control, Controller } from 'react-hook-form';
import CodeBlockShiki from 'tiptap-extension-code-block-shiki';
import { cn } from '@/lib/utils';
import EditorToolbar from './editor-toolbar';

interface EditorProps {
  control: Control<any>;
  name: string;
  defaultValue?: string;
  className?: string;
}

export default function Editor({ control, name, defaultValue, className }: EditorProps) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => <Content value={value} onChange={onChange} className={className} />}
    />
  );
}

interface ContentProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

function Content({ value, onChange, className }: ContentProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Image,
      Link.configure({ openOnClick: false }),
      CodeBlockShiki.configure({ defaultTheme: 'dark-plus', defaultLanguage: 'tsx' }),
      Placeholder.configure({ placeholder: 'Write your story...' }),
      TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),
      CodeBlockTabExtension,
    ],
    editorProps: { attributes: { class: cn('pt-5 pb-15 outline-none', className) } },
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  return (
    <div>
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} className='editor' />
    </div>
  );
}

const CodeBlockTabExtension = Extension.create({
  addKeyboardShortcuts() {
    return {
      Tab: () => {
        this.editor.commands.insertContent('  ');
        return true;
      },
    };
  },
});
