"use client";

import React, { useState, useEffect, useRef } from "react";

type Item = {
  id: string;
  x: number;
  y: number;
  type: "trash" | "enemy";
};

export default function Peixinho2D() {
  const [peixeY, setPeixeY] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [items, setItems] = useState<Item[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gameAreaRef = useRef<HTMLDivElement>(null);

  const gravity = 0.5;
  const jumpForce = -8;
  const peixeHeightPx = 40;
  const peixeWidthPx = 50;
  const areiaHeight = 80;

  // Função pular / reiniciar
  function jump() {
    if (!gameOver) setVelocity(jumpForce);
    else resetGame();
  }

  // Espaço tecla para pular
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.code === "Space") {
        e.preventDefault();
        jump();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [gameOver]);

  // Toque na tela para pular (mobile)
  useEffect(() => {
    function onTouchStart(e: TouchEvent) {
      e.preventDefault();
      jump();
    }
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    return () => window.removeEventListener("touchstart", onTouchStart);
  }, [gameOver]);

  // Atualiza posição do peixe e dos itens
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setPeixeY((oldY) => {
        let newY = oldY + velocity;
        setVelocity((v) => v + gravity);

        if (gameAreaRef.current) {
          const maxY =
            gameAreaRef.current.clientHeight - areiaHeight - peixeHeightPx - 10;
          if (newY > maxY) {
            newY = maxY;
            setVelocity(0);
          }
          if (newY < 0) {
            newY = 0;
            setVelocity(0);
          }
        }
        return newY;
      });

      setItems((oldItems) => {
        const moved = oldItems
          .map((item) => ({ ...item, x: item.x - 7 }))
          .filter((item) => item.x > -80);

        if (Math.random() < 0.25) {
          const isEnemy = Math.random() < 0.4;
          const newItem: Item = {
            id: Math.random().toString(36).substr(2, 9),
            x: (gameAreaRef.current?.clientWidth || 800) + 80,
            y:
              Math.random() *
              ((gameAreaRef.current?.clientHeight || 600) - areiaHeight - 60),
            type: isEnemy ? "enemy" : "trash",
          };
          moved.push(newItem);
        }

        return moved;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [velocity, gameOver]);

  // Detecta colisões
  useEffect(() => {
    if (gameOver) return;

    items.forEach((item) => {
      if (!gameAreaRef.current) return;

      const peixeRect = {
        x: 60,
        y: peixeY,
        width: peixeWidthPx,
        height: peixeHeightPx,
      };
      const itemRect = {
        x: item.x,
        y: item.y,
        width: 50,
        height: 50,
      };

      const collided =
        peixeRect.x < itemRect.x + itemRect.width &&
        peixeRect.x + peixeRect.width > itemRect.x &&
        peixeRect.y < itemRect.y + itemRect.height &&
        peixeRect.y + peixeRect.height > itemRect.y;

      if (collided) {
        if (item.type === "trash") {
          setScore((s) => s + 1);
          setItems((old) => old.filter((i) => i.id !== item.id));
        } else {
          setGameOver(true);
        }
      }
    });
  }, [items, peixeY, gameOver]);

  // Reinicia o jogo
  function resetGame() {
    setItems([]);
    setScore(0);
    setPeixeY(0);
    setVelocity(0);
    setGameOver(false);
  }

  return (
    <>
      <div
        ref={gameAreaRef}
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background:
            "linear-gradient(to top, #506c29 15%, #115d8f 40%, #003b5c 90%)",
          userSelect: "none",
          touchAction: "none",
          filter: "drop-shadow(0 0 5px rgba(0,0,0,0.7))",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Área jogável */}
        <div
          style={{
            position: "relative",
            flexGrow: 1,
            overflow: "hidden",
          }}
        >
          {/* Peixe principal */}
          <div
            style={{
              position: "absolute",
              left: 60,
              top: peixeY,
              width: peixeWidthPx,
              height: peixeHeightPx,
              backgroundColor: "#ff7f50",
              borderRadius: "50% / 50%",
              boxShadow: "inset 10px 0 15px rgba(255,127,80,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              filter: "drop-shadow(0 0 8px #ff7f50)",
              transition: "top 0.05s linear",
              zIndex: 10,
              userSelect: "none",
              transform: "scaleX(-1)",
            }}
            aria-label="Peixe principal"
          >
            🐠
          </div>

          {/* Itens */}
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                position: "absolute",
                left: item.x,
                top: item.y,
                width: 50,
                height: 50,
                fontSize: 36,
                userSelect: "none",
                pointerEvents: "none",
                transition: "left 0.05s linear",
                filter:
                  item.type === "trash"
                    ? "drop-shadow(0 0 4px #7ec8e3)"
                    : "drop-shadow(0 0 6px #f55)",
                zIndex: 9,
              }}
              aria-label={item.type === "trash" ? "Lixo" : "Peixe inimigo"}
            >
              {item.type === "trash" ? "🗑" : "🐠"}
            </div>
          ))}

          {/* Pedras */}
          <Stones />

          {/* Algas */}
          <Seaweed />

          {/* Fundo animais */}
          <BackgroundAnimals />
        </div>

        {/* Areia no chão */}
        <div
          style={{
            height: areiaHeight,
            width: "100%",
            background: "linear-gradient(to top, #c2b280 0%, #8b7a4f 100%)",
            boxShadow: "inset 0 10px 20px #7a6f4a",
            zIndex: 5,
            userSelect: "none",
          }}
        />
      </div>

      {/* Pontuação */}
      <div
        style={{
          position: "fixed",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 24,
          fontWeight: "bold",
          color: "#ccefff",
          textShadow: "0 0 5px #000",
          userSelect: "none",
          zIndex: 20,
        }}
      >
        Pontuação: {score}
      </div>

      {/* Tela Game Over */}
      {gameOver && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.85)",
            color: "white",
            fontSize: 32,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            userSelect: "none",
            padding: 20,
            zIndex: 9999,
          }}
        >
          <div>Game Over!</div>
          <div style={{ marginTop: 10, fontSize: 24 }}>
            Sua pontuação: {score}
          </div>
          <button
            onClick={resetGame}
            style={{
              marginTop: 30,
              padding: "15px 30px",
              fontSize: 18,
              fontWeight: "bold",
              borderRadius: 8,
              border: "none",
              backgroundColor: "#0099cc",
              color: "white",
              cursor: "pointer",
            }}
          >
            Jogar Novamente
          </button>
        </div>
      )}

      {/* Dica para mobile */}
      {!gameOver && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            width: "100%",
            textAlign: "center",
            fontSize: 16,
            color: "#a3d2ff",
            textShadow: "0 0 3px #000",
            userSelect: "none",
            zIndex: 12,
          }}
        >
          Clique na tela (mobile) ou aperte espaço (desktop) para pular
        </div>
      )}

      {/* Animações CSS */}
      <style>{`
        @keyframes sway {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
      `}</style>
    </>
  );
}

// Algas animadas
function Seaweed() {
  return (
    <svg
      style={{
        position: "absolute",
        bottom: 80,
        left: 0,
        width: "100%",
        height: "20vh",
        pointerEvents: "none",
        zIndex: 3,
        userSelect: "none",
        opacity: 0.8,
      }}
      viewBox="0 0 120 40"
      preserveAspectRatio="none"
    >
      <path
        fill="#0b3d0b"
        d="M10 40 Q12 30 10 20 Q12 10 10 0 L11 0 Q13 10 11 20 Q13 30 11 40 Z"
        style={{ animation: "sway 3s ease-in-out infinite" }}
        transform="translate(5,0) scale(0.6)"
      />
      <path
        fill="#0a2e0a"
        d="M20 40 Q22 28 20 18 Q22 8 20 -2 L21 -2 Q23 8 21 18 Q23 28 21 40 Z"
        style={{ animation: "sway 4s ease-in-out infinite", animationDelay: "1s" }}
        transform="translate(25,0) scale(0.5)"
      />
      <path
        fill="#0c3a0c"
        d="M30 40 Q32 30 30 16 Q32 6 30 -4 L31 -4 Q33 6 31 16 Q33 30 31 40 Z"
        style={{ animation: "sway 3.5s ease-in-out infinite", animationDelay: "0.5s" }}
        transform="translate(45,0) scale(0.7)"
      />
      <path
        fill="#0a2e0a"
        d="M40 40 Q42 30 40 20 Q42 10 40 0 L41 0 Q43 10 41 20 Q43 30 41 40 Z"
        style={{ animation: "sway 3.8s ease-in-out infinite", animationDelay: "1.3s" }}
        transform="translate(70,0) scale(0.6)"
      />
      <path
        fill="#0b3d0b"
        d="M50 40 Q52 30 50 20 Q52 10 50 0 L51 0 Q53 10 51 20 Q53 30 51 40 Z"
        style={{ animation: "sway 4.2s ease-in-out infinite", animationDelay: "0.7s" }}
        transform="translate(90,0) scale(0.55)"
      />
    </svg>
  );
}

// Pedras no chão
function Stones() {
  return (
    <svg
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "20vh",
        pointerEvents: "none",
        zIndex: 4,
        userSelect: "none",
        opacity: 0.95,
      }}
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="mountainGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5C4E3A" />
          <stop offset="100%" stopColor="#3B2F1B" />
        </linearGradient>
      </defs>

      <path
        d="
          M 0 35
          Q 10 25, 20 30
          T 40 30
          T 60 32
          T 80 28
          T 100 35
          L 100 40
          L 0 40
          Z
        "
        fill="url(#mountainGradient)"
        stroke="#4a3e2a"
        strokeWidth="0.5"
      />

      <ellipse cx="15" cy="33" rx="3" ry="1.5" fill="#7a6f58" />
      <ellipse cx="35" cy="32" rx="4" ry="2" fill="#6b5e45" />
      <ellipse cx="55" cy="34" rx="2.5" ry="1.2" fill="#665544" />
      <ellipse cx="75" cy="31" rx="3.5" ry="1.5" fill="#5c4e3a" />
      <ellipse cx="90" cy="33" rx="3" ry="1.5" fill="#7a6f58" />
    </svg>
  );
}

// Fundo com animais
function BackgroundAnimals() {
  return (
    <svg
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "60vh",
        pointerEvents: "none",
        zIndex: 1,
        userSelect: "none",
        opacity: 0.3,
      }}
      viewBox="0 0 120 60"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="1"
            floodColor="#000"
            floodOpacity="0.2"
          />
        </filter>
      </defs>

      <path
        d="M60 10
           C63 12, 65 15, 68 15
           C65 16, 62 20, 63 23
           C60 21, 56 23, 56 20
           C54 17, 55 14, 58 12
           C57 10, 59 8, 60 10
           Z"
        fill="#FFEB3B"
        stroke="#E6C200"
        strokeWidth="1.5"
        filter="url(#shadow)"
      />

      <path
        d="M90 25
           C92 27, 95 28, 96 30
           C94 31, 92 34, 91 37
           C89 33, 86 31, 87 27
           C88 24, 90 24, 90 25
           Z"
        fill="#F06292"
        stroke="#C04874"
        strokeWidth="1.5"
        filter="url(#shadow)"
      />

      <path
        d="M30 40
           C33 42, 36 43, 38 44
           C35 44, 32 46, 31 48
           C28 45, 26 42, 29 39
           C30 39, 30 40, 30 40
           Z"
        fill="#64B5F6"
        stroke="#2C7DD9"
        strokeWidth="1.5"
        filter="url(#shadow)"
      />

      <circle cx="15" cy="10" r="3" fill="#FFEB3B" opacity="0.7" />
      <circle cx="50" cy="20" r="2" fill="#F06292" opacity="0.6" />
      <circle cx="80" cy="15" r="2.5" fill="#64B5F6" opacity="0.5" />
      <circle cx="110" cy="30" r="3" fill="#FFEB3B" opacity="0.4" />
    </svg>
  );
}
