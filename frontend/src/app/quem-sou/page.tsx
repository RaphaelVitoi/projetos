import Link from 'next/link';

export default function QuemSou() {
  return (
    <>
      
    <header className="main-header">
        <div className="container">
            <h1><a href="index.html">Raphael Vitoi</a> <span style={{/* MIGRAR ESTILOS: font-weight: normal; opacity: 0.7; font-size: 0.9em; */}}>/ Manifesto</span></h1>
            <nav>
                <ul>
                    <li><a href="index.html">â† Voltar ao Hub</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main className="container">
        <section id="hero-aula">
            <h2>Sobre o Autor</h2>
            <p><strong>Educador, Estrategista e Especialista em Sistemas Complexos.</strong></p>
        </section>

        <!-- VIDEO PLAYER COMPONENT -->
        <section>
            <div className="video-wrapper">
                <div className="video-container">
                    <video controls autoplay muted playsinline preload="metadata">
                        <source src="0309.mp4" type="video/mp4">
                        Seu navegador nÃ£o suporta a tag de vÃ­deo.
                    </video>
                </div>
            </div>
        </section>

        <section id="manifesto">
            <article style={{/* MIGRAR ESTILOS: text-align: center; max-width: 800px; */}}>
                <h3>Sobre o Autor</h3>
                <p>Educador e Profissional de Poker hÃ¡ mais de dez anos, Raphael Vitoi Ã© um especialista em <strong>Sistemas Complexos, ICM, Multiway Spots e Teoria dos Jogos</strong>. Sua abordagem transita entre a <strong>AnÃ¡lise Bayesiana, Preditiva e Recursiva</strong>, focando na adaptaÃ§Ã£o estratÃ©gica e anÃ¡lise comportamental (GTO e desvio).</p>
                <p>AlÃ©m das mesas, mergulha na <strong>Psicologia do Poker</strong>, dissecando os vieses cognitivos que custam dinheiro.</p>
                
                <div className="callout" style={{/* MIGRAR ESTILOS: text-align: left; margin-top: 2rem; */}}>
                    <p><strong>PolÃ­mata e Estrategista:</strong> Raphael nÃ£o ensina apenas "cartas"; ele ensina arquitetura de decisÃ£o. Como <strong>Embaixador Deepsolver</strong>, <strong>Afiliado GTO Wizard</strong> e criador do <strong>trueICM</strong>, ele decodifica a complexidade dos sistemas para jogadores que buscam o topo da cadeia alimentar.</p>
                </div>

                <p><em>"O poker nÃ£o Ã© sobre sorte. Ã‰ sobre a gestÃ£o elegante da incerteza."</em></p>

                <div style={{/* MIGRAR ESTILOS: margin-top: 2rem; */}}>
                    <a href="index.html#metodo" className="card-cta" style={{/* MIGRAR ESTILOS: font-size: 1rem; */}}>Conhecer o MÃ©todo Poker Racional â†’</a>
                </div>
            </article>
        </section>
    </main>
    
    <script type="module" src="main.js"></script>

    </>
  );
}
