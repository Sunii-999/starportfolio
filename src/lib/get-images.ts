import fs from 'fs';
import path from 'path';

export function getProjectImages(slug: string) {
  const rootPath = path.join(process.cwd(), 'public/images', slug);
  
  const getFiles = (subfolder: string) => {
    const fullPath = path.join(rootPath, subfolder);
    if (!fs.existsSync(fullPath)) return [];
    return fs.readdirSync(fullPath)
      .filter(file => !file.startsWith('.'))
      .sort(); 
  };

  const floorplans = getFiles('floorplans');
  const atmos = getFiles('atmos');
  const details = getFiles('details');
  const model = getFiles('model');
  const sketch = getFiles('sketch');
  const moodboard = getFiles('sketch');
  const renders = getFiles('renders');

  const pairs = floorplans.map((fp, index) => ({
    floorplan: `/images/${slug}/floorplans/${fp}`,
    atmos: atmos[index] ? `/images/${slug}/atmos/${atmos[index]}` : null
  }));

  return {
    pairs,
    details: details.map(d => `/images/${slug}/details/${d}`),
    model: model.map(m => `/images/${slug}/model/${m}`),
    sketch: sketch.map(s => `/images/${slug}/sketch/${s}`),
    moodboard: moodboard.map(m => `/images/${slug}/moodboard/${m}`),
    renders: renders.map(r => `/images/${slug}/renders/${r}`)
  };
}