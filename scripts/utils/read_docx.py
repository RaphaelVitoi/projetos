from docx import Document
path = r'frontend/public/docs/tasks/assets/Aula 1.2  (1).docx'
doc = Document(path)
print('\n'.join(p.text for p in doc.paragraphs if p.text.strip()))
