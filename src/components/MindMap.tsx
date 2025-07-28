import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { type MindMapNode, type MindMapEdge } from '@/lib/api';

interface MindMapProps {
  nodes: MindMapNode[];
  edges: MindMapEdge[];
}

const nodeTypes = {
  file: ({ data }: { data: any }) => (
    <div className="px-4 py-2 shadow-lg rounded-lg border-2 border-primary/20 bg-card text-card-foreground min-w-[120px] text-center">
      <div className="font-medium text-sm">{data.label}</div>
      <div className="text-xs text-muted-foreground mt-1">{data.type}</div>
    </div>
  ),
  component: ({ data }: { data: any }) => (
    <div className="px-4 py-2 shadow-lg rounded-lg border-2 border-accent/30 bg-accent/10 text-card-foreground min-w-[120px] text-center">
      <div className="font-medium text-sm">{data.label}</div>
      <div className="text-xs text-muted-foreground mt-1">{data.type}</div>
    </div>
  ),
  service: ({ data }: { data: any }) => (
    <div className="px-4 py-2 shadow-lg rounded-lg border-2 border-destructive/20 bg-destructive/10 text-card-foreground min-w-[120px] text-center">
      <div className="font-medium text-sm">{data.label}</div>
      <div className="text-xs text-muted-foreground mt-1">{data.type}</div>
    </div>
  ),
};

export function MindMap({ nodes: rawNodes, edges: rawEdges }: MindMapProps) {
  // Transform API data to React Flow format
  const initialNodes: Node[] = useMemo(() => {
    return rawNodes.map((node, index) => ({
      id: node.id,
      type: node.type || 'file',
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
      data: {
        label: node.label,
        type: node.type || 'file',
      },
    }));
  }, [rawNodes]);

  const initialEdges: Edge[] = useMemo(() => {
    return rawEdges.map((edge, index) => ({
      id: `edge-${index}`,
      source: edge.source,
      target: edge.target,
      type: 'smoothstep',
      animated: true,
      style: { stroke: 'hsl(var(--primary))' },
    }));
  }, [rawEdges]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Auto-layout nodes in a more organized way
  const organizeLayout = useCallback(() => {
    const organized = nodes.map((node, index) => {
      const cols = Math.ceil(Math.sqrt(nodes.length));
      const row = Math.floor(index / cols);
      const col = index % cols;
      
      return {
        ...node,
        position: {
          x: col * 200 + 100,
          y: row * 150 + 100,
        },
      };
    });
    
    setNodes(organized);
  }, [nodes, setNodes]);

  return (
    <div className="h-[600px] w-full rounded-lg border border-border bg-background/50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        className="rounded-lg"
      >
        <Background gap={20} size={1} className="opacity-30" />
        <Controls className="bg-card border border-border rounded-lg" />
        <MiniMap 
          className="bg-card border border-border rounded-lg"
          maskColor="hsl(var(--background) / 0.8)"
        />
      </ReactFlow>
      
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={organizeLayout}
          className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
        >
          Auto Layout
        </button>
      </div>
    </div>
  );
}