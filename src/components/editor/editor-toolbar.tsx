'use client';

import type { Editor } from '@tiptap/react';
import { Undo2, Redo2 } from 'lucide-react';
import { Heading2, Heading3 } from 'lucide-react';
import { List, ListOrdered } from 'lucide-react';
import { Code, CodeXml } from 'lucide-react';
import { Bold, Italic, Strikethrough } from 'lucide-react';

import EditorToolbarButton from './editor-toolbar-button';

interface EditorToolbarProps {
  editor: Editor | null;
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
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

  return (
    <div className="bg-background/80 sticky top-[65px] z-[var(--z-header)] flex h-10 items-center backdrop-blur-[5px] backdrop-saturate-[180%]">
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
    </div>
  );
}
