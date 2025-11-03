
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Add the model-viewer script to the page
const useModelViewerScript = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
};

const models = [
  {
    name: 'Robotic Arm',
    src: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
    alt: 'A 3D model of a robotic arm',
    poster: 'https://picsum.photos/seed/robotarm/600/400',
    description: 'An articulated robotic arm used in manufacturing and automation. Explore its joints and structure.',
  },
  {
    name: 'Jet Engine',
    src: 'https://modelviewer.dev/shared-assets/models/Turbofan.glb',
    alt: 'A 3D model of a jet engine',
    poster: 'https://picsum.photos/seed/jetengine/600/400',
    description: 'A detailed model of a turbofan jet engine. Zoom in to see the intricate fan blades and internal components.',
  },
  {
    name: 'Vintage Camera',
    src: 'https://modelviewer.dev/shared-assets/models/camera.glb',
    alt: 'A 3D model of a vintage camera',
    poster: 'https://picsum.photos/seed/camera/600/400',
    description: 'A classic film camera. Rotate the model to see its various dials, lenses, and mechanisms.',
  },
];

export default function ArVrVisualizerPage() {
  useModelViewerScript();
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [isLoading, setIsLoading] = useState(true);

  const handleModelChange = (modelName: string) => {
    const model = models.find(m => m.name === modelName);
    if (model) {
      setIsLoading(true);
      setSelectedModel(model);
    }
  };
  
  // A little trick to know when the model is loaded
  useEffect(() => {
    const modelViewerElement = document.querySelector('model-viewer');
    const onModelLoad = () => setIsLoading(false);
    
    if (modelViewerElement) {
        modelViewerElement.addEventListener('load', onModelLoad);
    }

    return () => {
        if(modelViewerElement) {
            modelViewerElement.removeEventListener('load', onModelLoad);
        }
    }
  }, [selectedModel]);


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AR/VR Engineering Visualizer</h1>
        <p className="text-muted-foreground">Interact with detailed 3D models of complex engineering objects.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card className="h-[60vh] w-full relative overflow-hidden">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
                        <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    </div>
                )}
                <div id="model-viewer-container" className="h-full w-full">
                    {/* @ts-ignore */}
                    <model-viewer
                        src={selectedModel.src}
                        alt={selectedModel.alt}
                        ar
                        ar-modes="webxr scene-viewer quick-look"
                        camera-controls
                        poster={selectedModel.poster}
                        shadow-intensity="1"
                        environment-image="neutral"
                        auto-rotate
                        style={{ width: '100%', height: '100%' }}
                        onLoad={() => setIsLoading(false)}
                    >
                      <Button slot="ar-button" className="absolute bottom-4 right-4">
                        View in AR
                      </Button>
                    </model-viewer>
                </div>
            </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Controls & Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Select Model</label>
                <Select onValueChange={handleModelChange} defaultValue={selectedModel.name}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map(model => (
                      <SelectItem key={model.name} value={model.name}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h3 className="font-semibold">{selectedModel.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{selectedModel.description}</p>
              </div>
               <div className="text-xs text-muted-foreground pt-4">
                  <p><b>Controls:</b></p>
                  <ul className="list-disc pl-4 mt-1">
                    <li><b>Left-click & drag:</b> Rotate</li>
                    <li><b>Right-click & drag:</b> Pan</li>
                    <li><b>Scroll wheel:</b> Zoom</li>
                  </ul>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
