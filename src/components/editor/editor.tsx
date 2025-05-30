'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import EditorToolbar from './editor-toolbar';

export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: { attributes: { class: 'outline-none p-6.5' } },
    content: '',
    immediatelyRender: false,
  });

  return (
    <div>
      <EditorToolbar editor={editor} />
      <EditorContent className="tiptap" editor={editor} />
    </div>
  );
}
