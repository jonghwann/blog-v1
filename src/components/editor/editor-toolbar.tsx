'use client';

import {
  Undo2,
  Redo2,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Code,
  CodeXml,
  Bold,
  Italic,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ImagePlus,
} from 'lucide-react';
import { useRef } from 'react';

import { uploadImageAction } from '@/app/posts/action';

import EditorToolbarButton from './editor-toolbar-button';

import type { Editor } from '@tiptap/react';

interface EditorToolbarProps {
  editor: Editor | null;
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isUndoDisabled = !editor?.can().undo();
  const isRedoDisabled = !editor?.can().redo();
  const isHeading2Active = editor?.isActive('heading', { level: 2 });
  const isHeading3Active = editor?.isActive('heading', { level: 3 });
  const isBulletListActive = editor?.isActive('bulletList');
  const isOrderedListActive = editor?.isActive('orderedList');
  const isCodeBlockActive = editor?.isActive('codeBlock');
  const isBoldActive = editor?.isActive('bold');
  const isItalicActive = editor?.isActive('italic');
  const isStrikeActive = editor?.isActive('strike');
  const isCodeActive = editor?.isActive('code');
  const isAlignLeftActive = editor?.isActive({ textAlign: 'left' });
  const isAlignCenterActive = editor?.isActive({ textAlign: 'center' });
  const isAlignRightActive = editor?.isActive({ textAlign: 'right' });
  const isAlignJustifyActive = editor?.isActive({ textAlign: 'justify' });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadImageAction(file);
      editor?.chain().focus().setImage({ src: url }).run();
    } catch (error) {
      console.error('Error in handleImageUpload:', error);
    }
  };

  return (
    <div className="bg-background/80 flex min-h-10 flex-wrap items-center gap-4 backdrop-blur-[5px] backdrop-saturate-[180%]">
      <EditorToolbarButton
        Icon={Undo2}
        disabled={isUndoDisabled}
        onClick={() => editor?.chain().focus().undo().run()}
      />

      <EditorToolbarButton
        Icon={Redo2}
        disabled={isRedoDisabled}
        onClick={() => editor?.chain().focus().redo().run()}
      />

      <EditorToolbarButton
        Icon={Heading2}
        disabled={!isHeading2Active}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
      />

      <EditorToolbarButton
        Icon={Heading3}
        disabled={!isHeading3Active}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
      />

      <EditorToolbarButton
        Icon={List}
        disabled={!isBulletListActive}
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      />

      <EditorToolbarButton
        Icon={ListOrdered}
        disabled={!isOrderedListActive}
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      />

      <EditorToolbarButton
        Icon={Code}
        disabled={!isCodeBlockActive}
        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
      />

      <EditorToolbarButton
        Icon={Bold}
        disabled={!isBoldActive}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      />

      <EditorToolbarButton
        Icon={Italic}
        disabled={!isItalicActive}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      />

      <EditorToolbarButton
        Icon={Strikethrough}
        disabled={!isStrikeActive}
        onClick={() => editor?.chain().focus().toggleStrike().run()}
      />

      <EditorToolbarButton
        Icon={CodeXml}
        disabled={!isCodeActive}
        onClick={() => editor?.chain().focus().toggleCode().run()}
      />

      <EditorToolbarButton
        Icon={AlignLeft}
        disabled={!isAlignLeftActive}
        onClick={() => editor?.chain().focus().setTextAlign('left').run()}
      />

      <EditorToolbarButton
        Icon={AlignCenter}
        disabled={!isAlignCenterActive}
        onClick={() => editor?.chain().focus().setTextAlign('center').run()}
      />

      <EditorToolbarButton
        Icon={AlignRight}
        disabled={!isAlignRightActive}
        onClick={() => editor?.chain().focus().setTextAlign('right').run()}
      />

      <EditorToolbarButton
        Icon={AlignJustify}
        disabled={!isAlignJustifyActive}
        onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
      />

      <EditorToolbarButton
        className="text-secondary-foreground"
        Icon={ImagePlus}
        onClick={() => fileInputRef.current?.click()}
      />

      <input className="hidden" ref={fileInputRef} type="file" onChange={handleImageUpload} />
    </div>
  );
}
