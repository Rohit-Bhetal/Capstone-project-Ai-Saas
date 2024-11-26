import React, { useState } from 'react';
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';

interface RichTextEditorProps {
  onRichTextEditorChange: (value: string) => void;
  index: number;
  value: string;
  onGenerateSummary: () => void; // Add this line to accept the summary generation function
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ onRichTextEditorChange, index, value, onGenerateSummary }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={onGenerateSummary} // Use the passed `onGenerateSummary` prop
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>Generate from AI</>
          )}
        </Button>
      </div>

      <EditorProvider>
        <Editor
          value={value}
          onChange={(e: any) => {
            onRichTextEditorChange(e.target.value); // Pass the string directly
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
