import fs from 'fs';
import path from 'path';

export function getProjectImages(slug: string) {
  const rootPath = path.join(process.cwd(), 'public/images', slug);
  
  // Helper to safely read a directory
  const getFiles = (subfolder: string) => {
    const fullPath = path.join(rootPath, subfolder);
    if (!fs.existsSync(fullPath)) return [];
    return fs.readdirSync(fullPath)
      .filter(file => !file.startsWith('.')) // Ignore hidden files
      .sort(); 
  };

  const floorplans = getFiles('floorplans');
  const atmos = getFiles('atmos');
  const details = getFiles('details');

  const pairs = floorplans.map((fp, index) => ({
    floorplan: `/images/${slug}/floorplans/${fp}`,
    atmos: atmos[index] ? `/images/${slug}/atmos/${atmos[index]}` : null
  }));

  return {
    pairs,
    details: details.map(d => `/images/${slug}/details/${d}`)
  };
}