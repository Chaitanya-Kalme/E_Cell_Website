import React, { useState } from "react";
import { Mail, Linkedin, ArrowUpRight } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  .card-root { font-family: 'DM Sans', sans-serif; }

  .card-wrap {
    position: relative;
    width: 190px;
    height: 265px;
    cursor: pointer;
    margin: 10px;
    perspective: 1000px;
  }
  .card-wrap.oc {
    width: 220px;
    height: 300px;
    margin: 16px;
  }

  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.72s cubic-bezier(0.23, 1, 0.32, 1);
    transform-style: preserve-3d;
    transform: rotateY(180deg);
  }
  .card-inner.flipped {
    transform: rotateY(0deg);
  }

  .card-face {
    position: absolute;
    inset: 0;
    border-radius: 18px;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    overflow: hidden;
  }

  /* ───────── FRONT ───────── */
  .card-front {
    background: linear-gradient(160deg, #0f0c1a 0%, #14102a 60%, #1a1035 100%);
    border: 1px solid rgba(200,150,255,0.1);
    box-shadow: 0 2px 0 rgba(255,255,255,0.04) inset, 0 24px 50px rgba(0,0,0,0.55);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px 16px 20px;
    gap: 12px;
  }
  .card-wrap.oc .card-front {
    background: linear-gradient(160deg, #0a0f1e 0%, #0f1628 60%, #151f38 100%);
    border-color: rgba(100,180,255,0.15);
  }
  .card-front::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 140px;
    background: radial-gradient(ellipse at 50% 0%, rgba(160,80,255,0.13) 0%, transparent 70%);
    pointer-events: none;
  }
  .card-wrap.oc .card-front::before {
    background: radial-gradient(ellipse at 50% 0%, rgba(60,140,255,0.15) 0%, transparent 70%);
  }

  .photo-frame {
    width: 72px;
    height: 72px;
    flex-shrink: 0;
    position: relative;
  }
  .card-wrap.oc .photo-frame {
    width: 86px;
    height: 86px;
  }

  .photo-ring {
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: conic-gradient(from 0deg, rgba(200,120,255,0.7), rgba(240,160,255,0.3), rgba(160,80,255,0.7), rgba(200,120,255,0.7));
    animation: spin 9s linear infinite;
  }
  .card-wrap.oc .photo-ring {
    background: conic-gradient(from 0deg, rgba(80,160,255,0.8), rgba(180,230,255,0.4), rgba(60,120,220,0.6), rgba(80,160,255,0.8));
  }

  .photo-ring-mask {
    position: absolute;
    inset: 2px;
    border-radius: 50%;
    background: #14102a;
  }
  .card-wrap.oc .photo-ring-mask { background: #0f1628; }

  .photo-img {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    overflow: hidden;
    z-index: 1;
  }
  .photo-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .front-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    width: 100%;
  }

  .card-position {
    font-size: 8.5px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(200,150,255,0.65);
    text-align: center;
    line-height: 1.5;
    padding: 0 8px;
  }
  .card-wrap.oc .card-position { color: rgba(100,190,255,0.7); }

  .card-divider {
    width: 28px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(200,120,255,0.5), transparent);
    margin: 2px 0;
  }
  .card-wrap.oc .card-divider {
    background: linear-gradient(90deg, transparent, rgba(80,160,255,0.55), transparent);
  }

  .card-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 19px;
    font-weight: 600;
    color: #f0eeff;
    letter-spacing: 0.02em;
    text-align: center;
    line-height: 1.2;
    padding: 0 8px;
  }
  .card-wrap.oc .card-name { font-size: 21px; }

  .front-links {
    display: flex;
    gap: 8px;
    width: 100%;
    justify-content: center;
    margin-top: 2px;
  }

  .front-link-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    flex: 1;
    padding: 7px 8px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.09);
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(10px);
    text-decoration: none;
    color: rgba(255,255,255,0.75);
    font-size: 10px;
    letter-spacing: 0.04em;
    transition: all 0.22s ease;
  }
  .front-link-btn:hover {
    border-color: rgba(200,120,255,0.4);
    color: #fff;
    background: rgba(180,80,255,0.12);
    transform: translateY(-1px);
  }
  .card-wrap.oc .front-link-btn:hover {
    border-color: rgba(80,160,255,0.45);
    background: rgba(60,140,255,0.12);
  }

  .front-link-icon {
    width: 20px;
    height: 20px;
    border-radius: 6px;
    background: rgba(200,120,255,0.13);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .card-wrap.oc .front-link-icon { background: rgba(80,160,255,0.15); }

  .oc-badge {
    position: absolute;
    top: 11px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 7px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(100,190,255,0.75);
    background: rgba(60,120,255,0.1);
    border: 1px solid rgba(80,160,255,0.22);
    border-radius: 20px;
    padding: 2px 10px;
    white-space: nowrap;
    z-index: 2;
  }

  .flip-hint {
    position: absolute;
    bottom: 10px;
    right: 13px;
    font-size: 8px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.18);
    display: flex;
    align-items: center;
    gap: 3px;
    z-index: 3;
  }

  /* ───────── BACK ───────── */
  .card-back {
    transform: rotateY(180deg);
    border: 1px solid rgba(200,150,255,0.12);
    box-shadow: 0 24px 50px rgba(0,0,0,0.55);
    display: flex;
    flex-direction: column;
    background: #0f0c1a;
  }
  .card-wrap.oc .card-back {
    border-color: rgba(100,180,255,0.15);
    background: #0a0f1e;
  }

  /* Name bar at top */
  .back-name-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    padding: 10px 14px 8px;
    background: linear-gradient(to bottom, rgba(8,4,20,0.85) 0%, transparent 100%);
    border-radius: 18px 18px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .back-top-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px;
    font-weight: 600;
    color: #f0eeff;
    letter-spacing: 0.03em;
    text-align: center;
    line-height: 1.2;
    text-shadow: 0 1px 8px rgba(0,0,0,0.8);
  }
  .card-wrap.oc .back-top-name { font-size: 18px; }

  .back-top-position {
    font-size: 7.5px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(200,150,255,0.75);
    text-align: center;
    text-shadow: 0 1px 6px rgba(0,0,0,0.8);
  }
  .card-wrap.oc .back-top-position { color: rgba(100,190,255,0.8); }

  /* Portrait image — takes all space except signature strip */
  .back-image-wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 80px;
  }
  .card-wrap.oc .back-image-wrap {
    bottom: 90px;
  }

  .back-image-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
  }

  /* Gradient fade at bottom of image into signature area */
  .back-image-wrap::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 50px;
    background: linear-gradient(to bottom, transparent, #0f0c1a);
    pointer-events: none;
  }
  .card-wrap.oc .back-image-wrap::after {
    background: linear-gradient(to bottom, transparent, #0a0f1e);
  }

  /* Signature strip — fixed height at bottom */
  .back-signature-strip {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: #0f0c1a;
    border-radius: 0 0 18px 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px 12px;
    z-index: 5;
  }
  .card-wrap.oc .back-signature-strip {
    height: 90px;
    background: #0a0f1e;
    padding: 10px 18px 14px;
  }

  .back-signature-strip::before {
    content: '';
    position: absolute;
    top: 0; left: 15%; right: 15%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(200,120,255,0.35), transparent);
  }
  .card-wrap.oc .back-signature-strip::before {
    background: linear-gradient(90deg, transparent, rgba(80,160,255,0.35), transparent);
  }

  .signature-img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    opacity: 0.9;
    filter: brightness(1.4) contrast(1.1);
    display: block;
  }

  .signature-fallback {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-weight: 300;
    font-style: italic;
    color: rgba(255,255,255,0.85);
    text-align: center;
    letter-spacing: 0.04em;
  }
  .card-wrap.oc .signature-fallback { font-size: 21px; }

  .corner-accent {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 20px;
    height: 20px;
    z-index: 11;
  }
  .corner-accent::before,
  .corner-accent::after {
    content: '';
    position: absolute;
  }
  .corner-accent::before {
    top: 0; right: 0;
    width: 100%; height: 1px;
    background: rgba(255,255,255,0.3);
  }
  .corner-accent::after {
    top: 0; right: 0;
    width: 1px; height: 100%;
    background: rgba(255,255,255,0.3);
  }
`;

const ContactCards = ({ member, isOC = false }) => {
  const { name, position, image, signature, linkedin, email } = member;
  const [isHovered, setIsHovered] = useState(false);
  const accent = isOC ? "rgba(80,170,255,0.9)" : "rgba(200,120,255,0.9)";

  return (
    <>
      <style>{styles}</style>
      <div
        className={`card-root card-wrap${isOC ? " oc" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsHovered(prev => !prev)}
      >
        <div className={`card-inner${isHovered ? " flipped" : ""}`}>

          {/* ── FRONT (shown on hover) ── */}
          <div className="card-face card-front">
            {isOC && <span className="oc-badge">Organizing Committee</span>}

            <div className="photo-frame">
              <div className="photo-ring" />
              <div className="photo-ring-mask" />
              <div className="photo-img">
                <img src={image} alt={name} />
              </div>
            </div>

            <div className="front-text">
              <p className="card-position">{position}</p>
              <div className="card-divider" />
              <h3 className="card-name">{name}</h3>
            </div>

            <div className="front-links">
              <a
                href={`mailto:${email}`}
                className="front-link-btn"
                onClick={e => e.stopPropagation()}
              >
                <span className="front-link-icon">
                  <Mail size={11} color={accent} />
                </span>
                Email
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="front-link-btn"
                onClick={e => e.stopPropagation()}
              >
                <span className="front-link-icon">
                  <Linkedin size={11} color={accent} />
                </span>
                LinkedIn
              </a>
            </div>

            <span className="flip-hint">back <ArrowUpRight size={8} /></span>
          </div>

          {/* ── BACK (default) ── */}
          <div className="card-face card-back">
            <div className="corner-accent" />

            {/* Name + position overlaid on top of image */}

            {/* Portrait fills card minus signature strip */}
            <div className="back-image-wrap">
              <img src={image} alt={name} />
            </div>

            {/* Signature strip pinned to bottom */}
            <div className="back-signature-strip">
              {signature ? (
                <img
                  src={signature}
                  alt={`${name} signature`}
                  className="signature-img"
                />
              ) : (
                <></>
                // <span className="signature-fallback">{name}</span>
              )}
            <div className="back-name-bar">
              <p className="back-top-name">{name}</p>
            </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ContactCards;