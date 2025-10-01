'use client';
import type { Editor } from '@tiptap/react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  CodeXml,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link,
  List,
  ListOrdered,
  Redo2,
  Strikethrough,
  TextQuote,
  Undo2,
} from 'lucide-react';
import { useRef } from 'react';
import { uploadImage } from '@/api/upload/api';
import EditorToolbarButton from './editor-toolbar-button';

interface EditorToolbarProps {
  editor: Editor | null;
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isUndoDisabled = !editor?.can().undo();
  const isRedoDisabled = !editor?.can().redo();

  const isHeading2Active = editor?.isActive('heading', { level: 2 });
  const isHeading3Active = editor?.isActive('heading', { level: 3 });
  const isBlockquoteActive = editor?.isActive('blockquote');
  const isBulletListActive = editor?.isActive('bulletList');
  const isOrderedListActive = editor?.isActive('orderedList');
  const isCodeBlockActive = editor?.isActive('codeBlock');

  const isBoldActive = editor?.isActive('bold');
  const isItalicActive = editor?.isActive('italic');
  const isStrikeActive = editor?.isActive('strike');
  const isLinkActive = editor?.isActive('link');
  const isCodeActive = editor?.isActive('code');

  const isAlignLeftActive = editor?.isActive({ textAlign: 'left' });
  const isAlignCenterActive = editor?.isActive({ textAlign: 'center' });
  const isAlignRightActive = editor?.isActive({ textAlign: 'right' });
  const isAlignJustifyActive = editor?.isActive({ textAlign: 'justify' });

  const handleLinkClick = () => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('링크 URL을 입력하세요:', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor?.commands.unsetLink();
      return;
    }

    editor?.commands.setLink({ href: url });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { url } = await uploadImage(file);
      editor?.chain().focus().setImage({ src: url }).run();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='sticky top-0 z-[var(--z-header)] flex min-h-12 flex-wrap items-center gap-4 bg-background/80 backdrop-blur-[5px]'>
      <EditorToolbarButton Icon={Undo2} isActive={!isUndoDisabled} onClick={() => editor?.chain().focus().undo().run()} />
      <EditorToolbarButton Icon={Redo2} isActive={!isRedoDisabled} onClick={() => editor?.chain().focus().redo().run()} />

      <EditorToolbarButton
        Icon={Heading2}
        isActive={isHeading2Active}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
      />
      <EditorToolbarButton
        Icon={Heading3}
        isActive={isHeading3Active}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
      />
      <EditorToolbarButton
        Icon={TextQuote}
        isActive={isBlockquoteActive}
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
      />
      <EditorToolbarButton Icon={List} isActive={isBulletListActive} onClick={() => editor?.chain().focus().toggleBulletList().run()} />
      <EditorToolbarButton
        Icon={ListOrdered}
        isActive={isOrderedListActive}
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      />
      <EditorToolbarButton Icon={Code} isActive={isCodeBlockActive} onClick={() => editor?.chain().focus().toggleCodeBlock().run()} />

      <EditorToolbarButton Icon={Bold} isActive={isBoldActive} onClick={() => editor?.chain().focus().toggleBold().run()} />
      <EditorToolbarButton Icon={Italic} isActive={isItalicActive} onClick={() => editor?.chain().focus().toggleItalic().run()} />
      <EditorToolbarButton Icon={Strikethrough} isActive={isStrikeActive} onClick={() => editor?.chain().focus().toggleStrike().run()} />
      <EditorToolbarButton Icon={Link} isActive={isLinkActive} onClick={handleLinkClick} />
      <EditorToolbarButton Icon={CodeXml} isActive={isCodeActive} onClick={() => editor?.chain().focus().toggleCode().run()} />

      <EditorToolbarButton
        Icon={AlignLeft}
        isActive={isAlignLeftActive}
        onClick={() => editor?.chain().focus().setTextAlign('left').run()}
      />
      <EditorToolbarButton
        Icon={AlignCenter}
        isActive={isAlignCenterActive}
        onClick={() => editor?.chain().focus().setTextAlign('center').run()}
      />
      <EditorToolbarButton
        Icon={AlignRight}
        isActive={isAlignRightActive}
        onClick={() => editor?.chain().focus().setTextAlign('right').run()}
      />
      <EditorToolbarButton
        Icon={AlignJustify}
        isActive={isAlignJustifyActive}
        onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
      />

      <EditorToolbarButton className='text-secondary-foreground' Icon={ImagePlus} onClick={() => fileInputRef.current?.click()} />
      <input className='hidden' ref={fileInputRef} type='file' onChange={handleImageUpload} />
    </div>
  );
}
