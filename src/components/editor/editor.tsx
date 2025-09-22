'use client';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { common, createLowlight } from 'lowlight';
import { type Control, Controller } from 'react-hook-form';
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
      Placeholder.configure({ placeholder: 'Write your story...' }),
      CustomCodeBlockLowlight.configure({ lowlight: createLowlight(common), defaultLanguage: 'typescript' }),
      TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),
      Image,
    ],
    editorProps: {
      attributes: {
        class: cn('min-h-[calc(100vh-64px-64px-64px-64px-84px-48px-40px-40px-20px-2px)] pt-5 pb-12 outline-none', className),
      },
    },
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    immediatelyRender: false,
  });

  return (
    <div>
      <EditorToolbar editor={editor} />
      <EditorContent className='tiptap' editor={editor} />
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
