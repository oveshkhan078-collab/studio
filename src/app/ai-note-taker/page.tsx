'use client';

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Textarea} from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {useState, useTransition, useEffect} from 'react';
import {getAiNotes} from './actions';
import {BookCopy, Loader2, Save} from 'lucide-react';
import {useToast} from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const FormSchema = z.object({
  topic: z.string().min(3, {
    message: 'Topic must be at least 3 characters.',
  }),
});

type NotesOutput = {
  notes: string;
};

type SavedNote = {
  topic: string;
  notes: string;
  date: string;
};

export default function AiNoteTakerPage() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<NotesOutput | null>(null);
  const [currentTopic, setCurrentTopic] = useState('');
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>([]);
  const {toast} = useToast();

  useEffect(() => {
    try {
      const notesFromStorage = localStorage.getItem('savedAiNotes');
      if (notesFromStorage) {
        setSavedNotes(JSON.parse(notesFromStorage));
      }
    } catch (error) {
      console.error('Failed to load notes from localStorage', error);
    }
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      topic: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setResult(null);
    setCurrentTopic(data.topic);
    startTransition(async () => {
      try {
        const res = await getAiNotes(data);
        setResult(res);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to generate notes. Please try again.',
          variant: 'destructive',
        });
      }
    });
  }

  const handleSaveNote = () => {
    if (result) {
      const newNote: SavedNote = {
        topic: currentTopic,
        notes: result.notes,
        date: new Date().toISOString(),
      };
      const updatedNotes = [newNote, ...savedNotes];
      setSavedNotes(updatedNotes);
      try {
        localStorage.setItem('savedAiNotes', JSON.stringify(updatedNotes));
        toast({
          title: 'Note Saved!',
          description: `Notes on "${currentTopic}" have been saved.`,
        });
      } catch (error) {
        toast({
          title: 'Error Saving Note',
          description:
            'Could not save note to local storage. Your browser might be full or in private mode.',
          variant: 'destructive',
        });
      }
    }
    setShowSaveConfirm(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">AI Note Taker</h1>
        <Card>
          <CardHeader>
            <CardTitle>Generate Study Notes</CardTitle>
            <CardDescription>
              Enter a topic, and the AI will create detailed study notes for
              you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="topic"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'The OSI Model in computer networks', 'Principle of Virtual Work in mechanics'"
                          className="resize-y"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Be specific for the best results.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending}>
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Generate Notes
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isPending && (
          <Card className="flex items-center justify-center min-h-[300px]">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p>AI is generating your notes...</p>
            </div>
          </Card>
        )}

        {result && !isPending && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Generated Notes: {currentTopic}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSaveConfirm(true)}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
              {result.notes}
            </CardContent>
          </Card>
        )}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">My Saved Notes</h2>
        <Card>
          <CardContent className="p-4 max-h-[80vh] overflow-y-auto">
            {savedNotes.length > 0 ? (
              <div className="space-y-4">
                {savedNotes.map((note, index) => (
                  <details key={index} className="group">
                    <summary className="flex cursor-pointer items-center justify-between rounded-md bg-muted p-3 font-medium transition-colors hover:bg-muted/80">
                      <span>{note.topic}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(note.date).toLocaleDateString()}
                      </span>
                    </summary>
                    <div className="prose prose-sm mt-2 max-w-none rounded-md border p-4 text-foreground whitespace-pre-wrap">
                      {note.notes}
                    </div>
                  </details>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center p-4">
                <BookCopy className="h-10 w-10 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">
                  You haven't saved any notes yet.
                  <br />
                  Generate and save notes to see them here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={showSaveConfirm} onOpenChange={setShowSaveConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save This Note?</AlertDialogTitle>
            <AlertDialogDescription>
              This will save the notes for "{currentTopic}" to your browser's
              local storage.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSaveNote}>Save</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
