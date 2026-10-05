const fs = require('fs');

const html = fs.readFileSync('stitch_exports/screen.html', 'utf-8');

// Extract body content
let bodyContent = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)[1];

// Extract styles
const styleMatches = html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi);
let styles = '';
for (const match of styleMatches) {
    if (!match[1].includes('tailwindcss')) {
        styles += match[1] + '\n';
    }
}

let jsx = bodyContent;
jsx = jsx.replace(/class=/g, 'className=');
jsx = jsx.replace(/for=/g, 'htmlFor=');
jsx = jsx.replace(/stroke-width=/g, 'strokeWidth=');
jsx = jsx.replace(/stroke-linecap=/g, 'strokeLinecap=');
jsx = jsx.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
jsx = jsx.replace(/fill-rule=/g, 'fillRule=');
jsx = jsx.replace(/clip-rule=/g, 'clipRule=');
jsx = jsx.replace(/tabindex=/g, 'tabIndex=');

// Handle self closing tags properly
const selfClosingTags = ['img', 'input', 'hr', 'br', 'path', 'circle', 'polygon', 'rect'];
selfClosingTags.forEach(tag => {
    const regex = new RegExp(`<${tag}([^>]*?)>`, 'gi');
    jsx = jsx.replace(regex, (match, attrs) => {
        if (match.endsWith('/>')) return match;
        return `<${tag}${attrs} />`;
    });
});

// Remove leftover closing tags for self closing elements
selfClosingTags.forEach(tag => {
    const regex = new RegExp(`<\/${tag}>`, 'gi');
    jsx = jsx.replace(regex, '');
});

jsx = jsx.replace(/<a(.*?)href="#katalog"(.*?)>/g, '<Link$1to="/katalog"$2>');
jsx = jsx.replace(/<a(.*?)href="#lab"(.*?)>/g, '<Link$1to="/lab"$2>');
jsx = jsx.replace(/<a(.*?)href="#anatomi"(.*?)>/g, '<Link$1to="/anatomi"$2>');
jsx = jsx.replace(/<a(.*?)href="#kuis"(.*?)>/g, '<Link$1to="/kuis"$2>');
jsx = jsx.replace(/<a(.*?)href="#guru"(.*?)>/g, '<Link$1to="/"$2>');
jsx = jsx.replace(/<a(.*?)href="#"(.*?)>/g, '<Link$1to="/"$2>');
jsx = jsx.replace(/<\/a>/g, '</Link>');

jsx = jsx.replace(/<!--[\s\S]*?-->/g, ''); // remove comments

const component = `import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/home.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page-container scroll-smooth text-slate-900 bg-[#fcfdfc] font-sans">
      ${jsx}
    </div>
  );
}
`;

fs.writeFileSync('src/pages/HomePage.jsx', component);
fs.writeFileSync('src/styles/home.css', styles);
console.log('Conversion complete');
