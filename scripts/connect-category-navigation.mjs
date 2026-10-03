import fs from 'node:fs';
const file='src/pages/index.astro';let source=fs.readFileSync(file,'utf8');
const before='<h3>{group.label}</h3>';
if(!source.includes(before))throw Error('Category navigation already updated or anchor missing');
source=source.replace(before,'<h3>{[\'hygiene-bathroom\',\'kitchen-food\',\'air-water-filters\'].includes(group.slug)?<a href={`/category/${group.slug}/`}>{group.label} →</a>:group.label}</h3>');
fs.writeFileSync(file,source);
