import { AIChatSession } from '@/app/api/AiModelApi';
import { Button } from '@/components/ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg';
import { toast } from 'sonner';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

const PROMPT = 'position title: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experience level and No JSON array) , give me result in HTML tags';

interface RichTextEditorProps {
  onRichTextEditorChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Updated this to work with the contenteditable event
  index: number;
  defaultValue: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ onRichTextEditorChange, index, defaultValue }) => {
  const [value, setValue] = useState<string>(defaultValue);
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState<boolean>(false);

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.experience?.[index]?.title) {
      toast('Please Add Position Title');
      return;
    }
    setLoading(true);
    const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);

    try {
      const result = await AIChatSession.sendMessage(prompt);
      const resp = await result.response.text();
      console.log('AI Response:', resp); // Log the response for debugging
      setValue(resp.replace('[', '').replace(']', ''));
    } catch (error) {
      toast('Error generating summary');
      console.error('Error:', error); // Log error for debugging
    }
    
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summery</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummeryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e: any) => {
            setValue(e.target.value);
            onRichTextEditorChange(e); // Use `any` type here for the event
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
