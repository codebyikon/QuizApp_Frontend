import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface LandingPageProps {
  logoUrl?: string;
}

const DEFAULT_LOGO = '/logo.png';
const HERO_IMAGES = ['/hero-1.png', '/hero-2.png', '/hero-3.png', '/hero-4.png', '/hero-5.png'];

const LandingPage: React.FC<LandingPageProps> = ({ logoUrl = DEFAULT_LOGO }) => {
  const navigate = useNavigate();
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3500); // Change image every 3.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'var(--color-text-primary)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Minimal Header */}
      <header
        style={{
          padding: '1.5rem 5%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'transparent',
          zIndex: 10,
        }}
      >
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: 'var(--color-accent)',
            textDecoration: 'none',
          }}
        >
          {logoUrl && (
            <img
              src={logoUrl}
              alt="Asceta Logo"
              style={{ height: '70px', width: 'auto', borderRadius: '10px', objectFit: 'contain' }}
            />
          )}
          <span>ASCETA-QUIZ</span>
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link
            to="/login"
            style={{
              textDecoration: 'none',
              color: 'var(--color-text-primary)',
              fontWeight: 600,
              fontSize: '1.1rem',
            }}
          >
            Login
          </Link>
          <Link
            to="/register"
            style={{
              padding: '0.8rem 1.8rem',
              borderRadius: '10px',
              background: 'var(--color-accent)',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.1rem',
              boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.39)',
            }}
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Split Screen Hero Area for 100vh layout */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0 5% 5% 5%',
          gap: '4rem',
          zIndex: 5,
        }}
      >
        <div
          style={{
            flex: '1 1 50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '0.6rem 1.2rem',
              background: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '50px',
              color: 'var(--color-accent)',
              fontSize: '1rem',
              fontWeight: 600,
              alignSelf: 'flex-start',
              marginBottom: '1.5rem',
              animation: 'fadeIn 1s ease-out',
            }}
          >
            ✨ Empowering Education through Technology
          </div>
          <h1
            style={{
              fontSize: 'clamp(3rem, 5vw, 5rem)',
              lineHeight: 1.1,
              fontWeight: 800,
              marginBottom: '1.5rem',
              animation: 'fadeIn 1.2s ease-out',
            }}
          >
            Mathematics <br /> Assessment <br /> Platform
          </h1>
          <p
            style={{
              fontSize: '1.25rem',
              color: 'var(--color-text-secondary)',
              maxWidth: '600px',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
              animation: 'fadeIn 1.4s ease-out',
            }}
          >
            A seamless, secure, and intuitive environment for educators to create tests and students
            to excel in their academic journeys.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              animation: 'fadeIn 1.6s ease-out',
            }}
          >
            <button
              onClick={() => navigate('/register')}
              style={{
                padding: '1.2rem 3rem',
                fontSize: '1.2rem',
                background: 'var(--color-accent)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Get Started
            </button>
          </div>
        </div>

        <div
          style={{
            flex: '1 1 50%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Invisible spacer to give the block correct layout dimensions */}
          <img
            src={HERO_IMAGES[0]}
            alt="Spacer"
            style={{
              width: '100%',
              maxHeight: '75vh',
              objectFit: 'contain',
              opacity: 0,
              pointerEvents: 'none',
            }}
          />

          {HERO_IMAGES.map((imgSrc, idx) => (
            <img
              key={imgSrc}
              src={imgSrc}
              alt={`Hero ${idx + 1}`}
              style={{
                position: 'absolute',
                width: '100%',
                maxHeight: '75vh',
                objectFit: 'contain',
                filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.4))',
                opacity: idx === currentHeroIndex ? 1 : 0,
                transition: 'opacity 1.2s ease-in-out',
                pointerEvents: idx === currentHeroIndex ? 'auto' : 'none',
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
