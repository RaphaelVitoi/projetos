import sys
import os
from pathlib import Path
import chromadb
from chromadb.utils import embedding_functions

class MemoryRAG:
    def __init__(self, memory_dir: str = ".claude/agent-memory"):
        self.memory_dir = Path(memory_dir)
        
        db_path = str(self.memory_dir / ".chroma_db")
        self.client = chromadb.PersistentClient(path=db_path)
        
        self.emb_fn = embedding_functions.SentenceTransformerEmbeddingFunction(
            model_name="all-MiniLM-L6-v2" 
        )
        
        self.collection = self.client.get_or_create_collection(
            name="agent_collective_memory",
            embedding_function=self.emb_fn
        )

    def _chunk_text(self, text: str, chunk_size: int = 1000) -> list[str]:
        paragraphs = text.split('\n\n')
        return [p.strip() for p in paragraphs if len(p.strip()) > 10]

    def ingest_all_memories(self):
        print("[RAG] Iniciando ingestão de memórias...")
        memory_files = list(self.memory_dir.rglob("MEMORY.md"))
        
        for file_path in memory_files:
            # Ignora a própria pasta do ChromaDB se estiver ali dentro
            if ".chroma_db" in str(file_path): continue
                
            agent_name = file_path.parent.name
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            chunks = self._chunk_text(content)
            ids = [f"{agent_name}_chunk_{i}" for i in range(len(chunks))]
            metadatas = [{"agent": agent_name, "source": str(file_path)} for _ in chunks]
            
            if chunks:
                self.collection.upsert(
                    documents=chunks,
                    metadatas=metadatas,
                    ids=ids
                )
                print(f"  + Ingeridos {len(chunks)} fragmentos do agente @{agent_name}")

    def query_memory(self, question: str, n_results: int = 3):
        print(f"\n[RAG] Buscando na mente coletiva: '{question}'\n")
        results = self.collection.query(
            query_texts=[question],
            n_results=n_results
        )
        
        if not results['documents'][0]:
            print("Nenhuma memória relevante encontrada.")
            return
            
        for i, doc in enumerate(results['documents'][0]):
            agent = results['metadatas'][0][i]['agent']
            dist = results['distances'][0][i]
            print(f"--- Trecho {i+1} (@{agent} | Distância: {dist:.3f}) ---")
            print(f"{doc}\n")

if __name__ == "__main__":
    rag = MemoryRAG()
    if len(sys.argv) > 1:
        cmd = sys.argv[1]
        if cmd == "ingest":
            rag.ingest_all_memories()
        elif cmd == "query" and len(sys.argv) > 2:
            question = sys.argv[2]
            rag.query_memory(question)
        else:
            print("Uso: python memory_rag.py [ingest | query 'pergunta']")
    else:
        rag.ingest_all_memories()