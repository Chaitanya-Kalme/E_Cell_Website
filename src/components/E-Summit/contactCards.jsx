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
  }
  .card-wrap:hover .card-inner,
  .card-wrap.active .card-inner { transform: rotateY(180deg); }

  .card-face {
    position: absolute;
    inset: 0;
    border-radius: 18px;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    overflow: hidden;
  }

  /* FRONT - member (purple) */
  .card-front {
    background: linear-gradient(160deg, #0f0c1a 0%, #14102a 60%, #1a1035 100%);
    border: 1px solid rgba(200,150,255,0.1);
    box-shadow: 0 2px 0 rgba(255,255,255,0.04) inset, 0 24px 50px rgba(0,0,0,0.55);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: 0 0 24px 0;
  }
  .card-front::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 170px;
    background: radial-gradient(ellipse at 50% 0%, rgba(160,80,255,0.14) 0%, transparent 70%);
    pointer-events: none;
  }

  /* FRONT - OC (blue) */
  .card-wrap.oc .card-front {
    background: linear-gradient(160deg, #0a0f1e 0%, #0f1628 60%, #151f38 100%);
    border-color: rgba(100,180,255,0.15);
  }
  .card-wrap.oc .card-front::before {
    background: radial-gradient(ellipse at 50% 0%, rgba(60,140,255,0.16) 0%, transparent 70%);
  }

  /* Photo */
  .photo-frame {
    position: absolute;
    top: 22px;
    left: 50%;
    transform: translateX(-50%);
    width: 98px;
    height: 98px;
  }
  .card-wrap.oc .photo-frame { width: 112px; height: 112px; top: 30px; }

  .photo-ring {
    position: absolute;
    inset: -5px;
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
  .photo-img img { width: 100%; height: 100%; object-fit: cover; }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  /* Front text */
  .card-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 600;
    color: #f0eeff;
    letter-spacing: 0.02em;
    text-align: center;
    margin-top: 130px;
    margin-bottom: 4px;
    line-height: 1.15;
    padding: 0 14px;
  }
  .card-wrap.oc .card-name { font-size: 22px; margin-top: 158px; }

  .card-position {
    font-size: 9.5px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(200,150,255,0.6);
    text-align: center;
    padding: 0 14px;
    line-height: 1.5;
  }
  .card-wrap.oc .card-position { color: rgba(100,190,255,0.65); }

  .card-divider {
    width: 28px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(200,120,255,0.5), transparent);
    margin: 8px auto 0;
  }
  .card-wrap.oc .card-divider {
    background: linear-gradient(90deg, transparent, rgba(80,160,255,0.55), transparent);
  }

  .oc-badge {
    position: absolute;
    top: 13px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 7.5px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(100,190,255,0.7);
    background: rgba(60,120,255,0.1);
    border: 1px solid rgba(80,160,255,0.2);
    border-radius: 20px;
    padding: 2px 10px;
    white-space: nowrap;
    z-index: 2;
  }

  .flip-hint {
    position: absolute;
    bottom: 9px;
    right: 13px;
    font-size: 8.5px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.17);
    display: flex;
    align-items: center;
    gap: 3px;
    transition: color 0.3s;
  }
  .card-wrap:hover .flip-hint     { color: rgba(200,120,255,0.55); }
  .card-wrap.oc:hover .flip-hint  { color: rgba(80,160,255,0.6); }

  /* BACK */
  .card-back { transform: rotateY(180deg); }

  .back-photo {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    transition: transform 0.72s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .card-wrap:hover .back-photo,
  .card-wrap.active .back-photo { transform: scale(1.07); }

  .back-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(170deg, rgba(8,4,20,0.25) 0%, rgba(8,4,20,0.5) 40%, rgba(8,4,20,0.94) 100%);
    z-index: 1;
  }
  .card-wrap.oc .back-overlay {
    background: linear-gradient(170deg, rgba(4,10,24,0.25) 0%, rgba(4,10,24,0.5) 40%, rgba(4,10,24,0.94) 100%);
  }

  .back-content {
    position: absolute;
    inset: 0;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 20px 22px;
  }

  .back-tag {
    font-size: 8.5px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(200,120,255,0.7);
    margin-bottom: 5px;
  }
  .card-wrap.oc .back-tag { color: rgba(100,190,255,0.75); }

  .back-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px;
    font-weight: 300;
    font-style: italic;
    color: rgba(255,255,255,0.95);
    line-height: 1.1;
    margin-bottom: 14px;
  }
  .card-wrap.oc .back-name { font-size: 27px; }

  .contact-links { display: flex; flex-direction: column; gap: 7px; }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 8px 11px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.09);
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(10px);
    text-decoration: none;
    color: rgba(255,255,255,0.78);
    font-size: 11px;
    letter-spacing: 0.04em;
    transition: all 0.22s ease;
    position: relative;
    overflow: hidden;
  }
  .contact-link::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.22s;
  }
  .contact-link:hover {
    border-color: rgba(200,120,255,0.35);
    color: #fff;
    transform: translateX(2px);
  }
  .contact-link:hover::before {
    opacity: 1;
    background: linear-gradient(135deg, rgba(180,80,255,0.1), rgba(120,60,255,0.07));
  }
  .card-wrap.oc .contact-link:hover { border-color: rgba(80,160,255,0.4); }
  .card-wrap.oc .contact-link:hover::before {
    background: linear-gradient(135deg, rgba(60,140,255,0.12), rgba(40,100,220,0.07));
  }

  .link-icon {
    width: 26px;
    height: 26px;
    border-radius: 7px;
    background: rgba(200,120,255,0.13);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .card-wrap.oc .link-icon { background: rgba(80,160,255,0.14); }

  .link-arrow {
    margin-left: auto;
    opacity: 0;
    transform: translateX(-4px);
    transition: all 0.2s;
  }
  .contact-link:hover .link-arrow { opacity: 0.55; transform: translateX(0); }

  .corner-accent {
    position: absolute;
    top: 15px; right: 15px;
    width: 22px; height: 22px;
    z-index: 4;
  }
  .corner-accent::before, .corner-accent::after {
    content: '';
    position: absolute;
  }
  .corner-accent::before {
    top: 0; right: 0; width: 100%; height: 1px;
    background: rgba(200,120,255,0.4);
  }
  .corner-accent::after {
    top: 0; right: 0; width: 1px; height: 100%;
    background: rgba(200,120,255,0.4);
  }
  .card-wrap.oc .corner-accent::before,
  .card-wrap.oc .corner-accent::after { background: rgba(80,160,255,0.5); }
`;

const ContactCards = ({ member, isOC = false }) => {
  const { name, position, image, linkedin, email } = member;
  const [isActive, setIsActive] = useState(false);
  const accent = isOC ? "rgba(80,170,255,0.9)" : "rgba(200,120,255,0.9)";

  return (
    <>
      <style>{styles}</style>
      <div
        className={`card-root card-wrap${isOC ? " oc" : ""}${isActive ? " active" : ""}`}
        onClick={() => setIsActive(!isActive)}
        style={{ perspective: "1000px" }}
      >
        <div className="card-inner">

          {/* FRONT */}
          <div className="card-face card-front">
            {isOC && <span className="oc-badge">Organizing Committee</span>}
            <div className="photo-frame">
              <div className="photo-ring" />
              <div className="photo-ring-mask" />
              <div className="photo-img">
                <img src={image} alt={name} />
              </div>
            </div>
            <h3 className="card-name">{name}</h3>
            <p className="card-position">{position}</p>
            <div className="card-divider" />
            <span className="flip-hint">connect <ArrowUpRight size={8} /></span>
          </div>

          {/* BACK */}
          <div className="card-face card-back">
            <div className="back-photo" style={{ backgroundImage: `url(${image})` }} />
            <div className="back-overlay" />
            <div className="corner-accent" />
            <div className="back-content">
              <p className="back-tag">{isOC ? "Core Team" : "Team Member"}</p>
              <p className="back-name">{name.split(" ")[0]}</p>
              <div className="contact-links">
                <a href={`mailto:${email}`} className="contact-link" onClick={e => e.stopPropagation()}>
                  <span className="link-icon"><Mail size={12} color={accent} /></span>
                  Email me
                  <span className="link-arrow"><ArrowUpRight size={11} /></span>
                </a>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="contact-link" onClick={e => e.stopPropagation()}>
                  <span className="link-icon"><Linkedin size={12} color={accent} /></span>
                  LinkedIn
                  <span className="link-arrow"><ArrowUpRight size={11} /></span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};


export default ContactCards ;