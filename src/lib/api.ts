import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export interface AnalyzeRequest {
  repo_url: string;
}

export interface MindMapNode {
  id: string;
  label: string;
  type: string;
}

export interface MindMapEdge {
  source: string;
  target: string;
}

export interface AnalyzeResponse {
  summary: string;
  tech_stack: string[];
  important_files: string[];
  execution_flow: string;
  mind_map: {
    nodes: MindMapNode[];
    edges: MindMapEdge[];
  };
}

export const analyzeRepository = async (data: AnalyzeRequest): Promise<AnalyzeResponse> => {
  const response = await axios.post<AnalyzeResponse>(`${API_BASE_URL}/analyze`, data);
  return response.data;
};