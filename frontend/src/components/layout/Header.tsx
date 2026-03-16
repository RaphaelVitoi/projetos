'use client';

import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <header className="main-header">
      <div className="container">
        <h1 className="logo">
          <Link href="/">Poker<span className="accent">Racional</span></Link>
        </h1>
        <nav>
          <ul>
            <li><Link href="/aula-icm">A Aula</Link></li>
            <li><Link href="/leitura-icm">ICM</Link></li>
            <li><Link href="/psicologia-hs">Psicologia</Link></li>
            <li><Link href="/biblioteca">Biblioteca</Link></li>
            <li><Link href="/quem-sou">Quem Sou</Link></li>
            <li className="nav-dropdown" onMouseEnter={() => setToolsOpen(true)} onMouseLeave={() => setToolsOpen(false)}>
              <button className="nav-tools-trigger" aria-expanded={toolsOpen}>
                <span className="fa-solid fa-flask"></span> Lab
                <span className="fa-solid fa-chevron-down" style={{ fontSize: '0.5rem', marginLeft: '0.25rem', transition: 'transform 0.2s', transform: toolsOpen ? 'rotate(180deg)' : 'none' }}></span>
              </button>
              {toolsOpen && (
                <div className="nav-dropdown-menu">
                  <Link href="/tools/icm" onClick={() => setToolsOpen(false)}>
                    <span className="fa-solid fa-calculator"></span> Simulador ICM
                  </Link>
                  <Link href="/tools/masterclass" onClick={() => setToolsOpen(false)}>
                    <span className="fa-solid fa-graduation-cap"></span> Masterclass
                  </Link>
                  <Link href="/tools/toy-games" onClick={() => setToolsOpen(false)}>
                    <span className="fa-solid fa-crosshairs"></span> Toy Games
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
