import React from "react";
import "./EventFooter.css";

const EventFooter = () => {
  return (
    <footer className="footer-wrap">
      <div className="footer-glow-top"></div>
      <div className="footer-glow-bottom"></div>

      {/* Brand */}
      <div className="footer-brand">
        <p className="footer-logo">@EventManagement</p>
        <p className="footer-tagline">Moments worth celebrating</p>
      </div>

      {/* Divider */}
      <div className="footer-divider"></div>

      {/* Social Links */}
      <div className="footer-links">
        {/* WhatsApp */}
        <a
          href="https://wa.me/918142253035"
          target="_blank"
          rel="noreferrer"
          className="social-btn btn-whatsapp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          </svg>
          WhatsApp
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/tarunsai04/"
          target="_blank"
          rel="noreferrer"
          className="social-btn btn-linkedin"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z" />
          </svg>
          LinkedIn
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/_tarun.sai_/"
          target="_blank"
          rel="noreferrer"
          className="social-btn btn-instagram"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07z" />
          </svg>
          Instagram
        </a>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>
          © 2026 <span className="highlight">@EventManagement</span> · Crafted
          with ♥ by Tarun Sai
        </p>
      </div>
    </footer>
  );
};

export default EventFooter;