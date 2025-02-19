import React, { useState, useEffect } from 'react';
import loadingImage from './assets/4.png'; // Mengimpor gambar

const Loading: React.FC = () => {
  const [fadeOut, setFadeOut] = useState(false); // State untuk fade-out

  useEffect(() => {
    // Setelah loading selesai, aktifkan fade-out
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 1000); // Durasi loading 1 detik

    return () => {
      clearTimeout(timer); // Membersihkan timer jika komponen di-unmount
    };
  }, []);

  return (
    <div style={styles.container as React.CSSProperties}>
      <img
        src={loadingImage}
        alt="Loading"
        style={{
          ...styles.image as React.CSSProperties,
          opacity: fadeOut ? 0 : 1, // Mengatur opasitas untuk fade-out
          transition: 'opacity 1s ease-out', // Menambahkan transisi pada opasitas
        }}
      />
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed' as const, 
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#0A66A0', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, 
  },
  image: {
    width: '400px', 
    height: '400px', 
    animation: 'rotate 2s linear infinite', 
  },
} as const;


const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`, styleSheet.cssRules.length);

export default Loading;
