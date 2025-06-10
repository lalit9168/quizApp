import React, { useState } from 'react';

function GuestQuizEntry() {
  const [code, setCode] = useState('');

  const handleStart = () => {
    if (code.trim()) {
      // Navigate to guest attempt page
      console.log('Starting quiz with code:', code);
    }
  };

  const handleBack = () => {
    // Navigate back to login
    console.log('Going back to login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 25%, #475569 50%, #64748b 100%)',
    }}>
      {/* Enhanced Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 25% 25%, rgba(79, 70, 229, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(124, 58, 237, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 50% 0%, rgba(5, 150, 105, 0.05) 0%, transparent 50%)
        `,
      }} />

      {/* Geometric Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}>
        {/* Professional hexagonal patterns */}
        {[
          { size: 80, top: '10%', left: '10%', opacity: 0.03 },
          { size: 60, top: '15%', right: '15%', opacity: 0.04 },
          { size: 100, bottom: '20%', left: '8%', opacity: 0.02 },
          { size: 70, bottom: '10%', right: '12%', opacity: 0.05 },
          { size: 90, top: '60%', left: '85%', opacity: 0.03 },
          { size: 50, top: '40%', left: '5%', opacity: 0.04 },
        ].map((hex, i) => (
          <div
            key={`hex-${i}`}
            style={{
              width: hex.size,
              height: hex.size,
              position: 'absolute',
              top: hex.top,
              left: hex.left,
              right: hex.right,
              bottom: hex.bottom,
              background: `linear-gradient(135deg, rgba(79, 70, 229, ${hex.opacity}), rgba(124, 58, 237, ${hex.opacity * 0.7}))`,
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
              animation: `rotate${i} ${12 + i * 2}s linear infinite`,
            }}
          />
        ))}

        {/* Subtle grid pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.02,
          backgroundImage: `
            linear-gradient(rgba(79, 70, 229, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79, 70, 229, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* CSS animations */}
      <style>
        {`
          @keyframes rotate0 {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
            100% { transform: rotate(360deg) scale(1); }
          }
          @keyframes rotate1 {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
            100% { transform: rotate(360deg) scale(1); }
          }
          @keyframes rotate2 {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
            100% { transform: rotate(360deg) scale(1); }
          }
          @keyframes rotate3 {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
            100% { transform: rotate(360deg) scale(1); }
          }
          @keyframes rotate4 {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
            100% { transform: rotate(360deg) scale(1); }
          }
          @keyframes rotate5 {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
            100% { transform: rotate(360deg) scale(1); }
          }
        `}
      </style>

      {/* Main Form */}
      <div style={{
        backdropFilter: 'blur(16px)',
        background: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid rgba(79, 70, 229, 0.1)',
        padding: 40,
        borderRadius: 16,
        maxWidth: 400,
        width: '90%',
        color: '#1e293b',
        position: 'relative',
        zIndex: 1,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        animation: 'fadeIn 0.6s ease-out',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <button style={{
            background: 'linear-gradient(45deg, #4f46e5, #7c3aed)',
            color: '#fff',
            width: 60,
            height: 60,
            borderRadius: '50%',
            border: 'none',
            boxShadow: '0 10px 30px rgba(79, 70, 229, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 15px 40px rgba(79, 70, 229, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 10px 30px rgba(79, 70, 229, 0.3)';
          }}>
            🧩
          </button>
          
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginTop: 16,
            marginBottom: 8,
            background: 'linear-gradient(135deg, #1e293b 0%, #4f46e5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Enter Quiz Code
          </h2>
          
          <p style={{
            fontSize: '0.875rem',
            color: '#64748b',
            fontWeight: 500,
            margin: 0,
          }}>
            Join a quiz as a guest participant
          </p>
        </div>

        {/* Quiz Code Input */}
        <div style={{ marginBottom: 24, position: 'relative' }}>
          <input
            type="text"
            placeholder="Quiz Code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            maxLength={10}
            style={{
              width: '100%',
              padding: '16px 16px 12px 16px',
              fontSize: '1rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              backgroundColor: 'rgba(79, 70, 229, 0.05)',
              border: '1px solid rgba(79, 70, 229, 0.1)',
              borderRadius: 8,
              color: '#1e293b',
              outline: 'none',
              transition: 'all 0.3s ease',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => {
              e.target.style.backgroundColor = 'rgba(79, 70, 229, 0.08)';
              e.target.style.borderColor = '#4f46e5';
            }}
            onBlur={(e) => {
              e.target.style.backgroundColor = 'rgba(79, 70, 229, 0.05)';
              e.target.style.borderColor = 'rgba(79, 70, 229, 0.1)';
            }}
            onMouseEnter={(e) => {
              if (document.activeElement !== e.target) {
                e.target.style.backgroundColor = 'rgba(79, 70, 229, 0.08)';
                e.target.style.borderColor = 'rgba(79, 70, 229, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (document.activeElement !== e.target) {
                e.target.style.backgroundColor = 'rgba(79, 70, 229, 0.05)';
                e.target.style.borderColor = 'rgba(79, 70, 229, 0.1)';
              }
            }}
          />
        </div>

        {/* Start Quiz Button */}
        <button
          onClick={handleStart}
          disabled={!code.trim()}
          style={{
            width: '100%',
            padding: '12px 24px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: '#fff',
            background: code.trim() 
              ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' 
              : 'rgba(148, 163, 184, 0.5)',
            border: 'none',
            borderRadius: 8,
            cursor: code.trim() ? 'pointer' : 'not-allowed',
            boxShadow: code.trim() 
              ? '0 10px 30px rgba(79, 70, 229, 0.3)' 
              : 'none',
            transition: 'all 0.3s ease',
            textTransform: 'none',
            marginBottom: 24,
          }}
          onMouseEnter={(e) => {
            if (code.trim()) {
              e.target.style.background = 'linear-gradient(135deg, #4338ca, #6d28d9)';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 15px 40px rgba(79, 70, 229, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            if (code.trim()) {
              e.target.style.background = 'linear-gradient(135deg, #4f46e5, #7c3aed)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 30px rgba(79, 70, 229, 0.3)';
            }
          }}
        >
          🚀 Start Quiz
        </button>

        {/* Back to Login Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleBack}
            style={{
              border: '2px solid #4f46e5',
              color: '#4f46e5',
              background: 'transparent',
              fontWeight: 600,
              padding: '8px 24px',
              borderRadius: 8,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '1rem',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#4338ca';
              e.target.style.color = '#4338ca';
              e.target.style.backgroundColor = 'rgba(79, 70, 229, 0.05)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#4f46e5';
              e.target.style.color = '#4f46e5';
              e.target.style.backgroundColor = 'transparent';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            ← Back to Login
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default GuestQuizEntry;