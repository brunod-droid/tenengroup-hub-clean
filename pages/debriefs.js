
import { useState, useEffect } from 'react';

export default function Debriefs() {
  const [active, setActive] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-GB', {
          hour12: false,
        }) + 'Z'
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div style={{
      background:'#050505',
      color:'#f5f1e8',
      minHeight:'100vh',
      padding:'40px',
      fontFamily:'Arial'
    }}>
      <div style={{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottom:'2px solid #ffd400',
        paddingBottom:'20px'
      }}>
        <h1 style={{
          color:'#ffd400',
          letterSpacing:'4px'
        }}>
          CLASSIFIED // TENENGROUP DEBRIEF
        </h1>

        <button
          onClick={() => setActive(!active)}
          style={{
            background: active ? '#ff5c4d' : '#444',
            color:'#fff',
            border:'none',
            padding:'14px 28px',
            cursor:'pointer',
            fontWeight:'bold',
            letterSpacing:'2px'
          }}
        >
          STATUS: {active ? 'ACTIVE' : 'INACTIVE'}
        </button>
      </div>

      <div style={{
        marginTop:'20px',
        color:'#999'
      }}>
        {active ? time : 'SYSTEM OFFLINE'}
      </div>

      <div style={{
        marginTop:'60px'
      }}>
        <h2 style={{
          fontSize:'70px',
          color:'#ffd400',
          marginBottom:'10px'
        }}>
          MOTHER DAY DEBRIEF 2026
        </h2>

        <p style={{
          fontSize:'24px',
          maxWidth:'900px',
          lineHeight:'1.5'
        }}>
          When everything seems lost… they are the last answer before escalation.
        </p>
      </div>
    </div>
  );
}
