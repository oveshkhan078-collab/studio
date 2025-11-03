'use client';

import { useState, useTransition, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  User,
  Box,
  Goal,
  MousePointer,
  Trash2,
  Paintbrush,
  Loader2,
  Wand2,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateModel } from './actions';
import { useToast } from '@/hooks/use-toast';

type ElementType = 'player' | 'wall' | 'goal';

interface GameElement {
  id: number;
  type: ElementType;
  x: number;
  y: number;
  color: string;
  modelUrl?: string;
}

const GRID_SIZE = 10;
const CELL_SIZE = 60; // size in pixels

const toolbelt: { type: ElementType; icon: React.ReactNode; label: string }[] = [
  { type: 'player', icon: <User className="w-5 h-5" />, label: 'Player' },
  { type: 'wall', icon: <Box className="w-5 h-5" />, label: 'Wall' },
  { type: 'goal', icon: <Goal className="w-5 h-5" />, label: 'Goal' },
];

export default function GameDesignSandboxPage() {
  const [elements, setElements] = useState<GameElement[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<number | null>(null);
  const [activeTool, setActiveTool] = useState<ElementType | 'cursor'>('cursor');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const selectedElement = useMemo(
    () => elements.find((el) => el.id === selectedElementId),
    [elements, selectedElementId]
  );

  const handleGridClick = (x: number, y: number) => {
    if (activeTool === 'cursor') {
      const clickedElement = elements.find((el) => el.x === x && el.y === y);
      setSelectedElementId(clickedElement ? clickedElement.id : null);
    } else {
      // Prevent placing on top of another element
      if (elements.some((el) => el.x === x && el.y === y)) return;

      const newElement: GameElement = {
        id: Date.now(),
        type: activeTool,
        x,
        y,
        color:
          activeTool === 'player'
            ? '#3b82f6'
            : activeTool === 'goal'
            ? '#10b981'
            : '#64748b',
      };
      setElements([...elements, newElement]);
    }
  };

  const updateElement = (id: number, updates: Partial<GameElement>) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  const deleteSelectedElement = () => {
    if (selectedElementId) {
      setElements((prev) => prev.filter((el) => el.id !== selectedElementId));
      setSelectedElementId(null);
    }
  };

  const handleGenerateModel = (prompt: string) => {
    if (!selectedElement) return;
    startTransition(async () => {
      try {
        const result = await generateModel({ prompt });
        if (result.modelUrl) {
          updateElement(selectedElement.id, { modelUrl: result.modelUrl });
          toast({
            title: 'Model Generated!',
            description: 'The 3D model has been applied to the element.',
          });
        }
      } catch (error) {
        toast({
          title: 'AI Error',
          description:
            'Failed to generate the 3D model. Please try another prompt.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-grow">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">3D Game Design Sandbox</h1>
          <p className="text-muted-foreground">
            Create your 3D game level. Select a tool and click on the grid.
          </p>
        </div>

        <div className="flex gap-4">
          {/* Toolbelt */}
          <Card className="w-24 flex-shrink-0">
            <CardContent className="p-2">
              <div className="flex flex-col gap-2">
                <Button
                  variant={activeTool === 'cursor' ? 'secondary' : 'ghost'}
                  size="icon"
                  className="w-full h-16 flex-col gap-1"
                  onClick={() => setActiveTool('cursor')}
                >
                  <MousePointer className="w-5 h-5" />
                  <span className="text-xs">Select</span>
                </Button>
                {toolbelt.map(({ type, icon, label }) => (
                  <Button
                    key={type}
                    variant={activeTool === type ? 'secondary' : 'ghost'}
                    size="icon"
                    className="w-full h-16 flex-col gap-1"
                    onClick={() => setActiveTool(type)}
                  >
                    {icon}
                    <span className="text-xs">{label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Grid */}
          <div
            className="grid bg-muted/50 rounded-lg overflow-hidden border"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
              width: GRID_SIZE * CELL_SIZE,
              height: GRID_SIZE * CELL_SIZE,
            }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
              const x = i % GRID_SIZE;
              const y = Math.floor(i / GRID_SIZE);
              const element = elements.find((el) => el.x === x && el.y === y);

              return (
                <div
                  key={i}
                  className="border-r border-b border-background/50 hover:bg-primary/10 cursor-pointer"
                  onClick={() => handleGridClick(x, y)}
                >
                  {element && (
                    <div
                      className={cn(
                        'w-full h-full flex items-center justify-center transition-all duration-200',
                        selectedElementId === element.id &&
                          'ring-2 ring-primary ring-offset-2 ring-offset-muted/50'
                      )}
                      style={{ backgroundColor: element.color }}
                    >
                      {element.modelUrl ? (
                         <div className="w-full h-full relative group">
                            <iframe src={element.modelUrl} className="w-full h-full border-0 pointer-events-none" />
                             <a href={element.modelUrl} download={`${element.type}-${element.id}.glb`} target='_blank' rel='noopener noreferrer' className="absolute bottom-1 right-1 bg-background/50 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                <Download className="w-3 h-3 text-foreground" />
                             </a>
                         </div>
                      ) : (
                        <div className="text-white">
                          {toolbelt.find(t => t.type === element.type)?.icon}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Properties Panel */}
      <div className="w-full lg:w-96 flex-shrink-0">
        <Card>
          <CardHeader>
            <CardTitle>Properties</CardTitle>
            <CardDescription>
              {selectedElement
                ? `Editing ${selectedElement.type}`
                : 'Select an element to edit.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedElement ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={selectedElement.color}
                      onChange={(e) =>
                        updateElement(selectedElement.id, {
                          color: e.target.value,
                        })
                      }
                      className="p-1 h-10 w-14"
                    />
                    <Input
                      type="text"
                      value={selectedElement.color}
                      onChange={(e) =>
                        updateElement(selectedElement.id, {
                          color: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-md font-semibold flex items-center gap-2">
                    <Wand2 className="w-4 h-4" /> AI Model Generator
                  </h3>
                  <p className="text-xs text-muted-foreground">Describe a 3D model for this object. E.g., "a futuristic crate" or "a crystal key".</p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const prompt = formData.get('prompt') as string;
                      handleGenerateModel(prompt);
                    }}
                    className="flex gap-2"
                  >
                    <Input name="prompt" placeholder="Describe a 3D model..." required disabled={isPending} />
                    <Button type="submit" size="icon" disabled={isPending}>
                      {isPending ? <Loader2 className="animate-spin" /> : <Paintbrush />}
                    </Button>
                  </form>
                </div>

                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={deleteSelectedElement}
                >
                  <Trash2 className="mr-2" />
                  Delete Element
                </Button>
              </div>
            ) : (
              <div className="text-center text-muted-foreground h-40 flex flex-col items-center justify-center">
                <MousePointer className="w-8 h-8 mb-2" />
                <p>No element selected.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
