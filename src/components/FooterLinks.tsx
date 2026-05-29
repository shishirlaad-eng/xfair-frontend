import React, { useState } from 'react';
import { BookOpen, ShieldCheck } from 'lucide-react';

export function FooterLinks() {
  const [activePolicy, setActivePolicy] = useState<'none' | 'imprint' | 'privacy'>('none');

  return (
    <div id="portal-footer" className="w-full text-center py-6 mt-auto text-xs text-slate-500 font-medium select-none z-10">
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={() => setActivePolicy('imprint')}
          className="hover:text-[#f39200] transition-colors focus:outline-none cursor-pointer"
        >
          Imprint
        </button>
        <span className="text-slate-300">|</span>
        <button
          onClick={() => setActivePolicy('privacy')}
          className="hover:text-[#f39200] transition-colors focus:outline-none cursor-pointer"
        >
          Data Privacy
        </button>
      </div>

      {activePolicy !== 'none' && (
        <div 
          onClick={() => setActivePolicy('none')}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 text-left border border-slate-100 max-h-[80vh] overflow-y-auto"
          >
            <button
              onClick={() => setActivePolicy('none')}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
            >
              ✕
            </button>

            {activePolicy === 'imprint' ? (
              <div id="imprint-content">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-[#f39200] mb-3">
                  <BookOpen size={20} />
                </div>
                <h4 className="font-display font-semibold text-slate-900 text-base mb-2">Imprint (Legal Disclosure)</h4>
                <div className="text-slate-500 text-xs space-y-2 mt-3 leading-relaxed">
                  <p><strong>xfair.com GmbH</strong></p>
                  <p>Kanalstraße 15<br />85774 Unterföhring, Germany</p>
                  <p><strong>Represented by Managing Directors:</strong><br />Markus Terry, John Doe</p>
                  <p><strong>Contact:</strong><br />Phone: +49 (0) 89 123456-0<br />Email: info@xfair.com</p>
                  <p><strong>Register Entry:</strong><br />Registry Court: Munich District Court<br />Registration Number: HRB 148292<br />VAT Identification Number according to § 27a UStG: DE 813928192</p>
                </div>
              </div>
            ) : (
              <div id="privacy-content">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-[#f39200] mb-3">
                  <ShieldCheck size={20} />
                </div>
                <h4 className="font-display font-semibold text-slate-900 text-base mb-2">Data Privacy Policy</h4>
                <div className="text-slate-500 text-xs space-y-3 mt-3 leading-relaxed">
                  <p>We take security extremeley seriously. Any personal or corporate email addresses logged into our portal (e.g. <code>steven.terry@xfair.com</code>) are used for telemetry and credential caching procedures strictly localized inside secure sessions.</p>
                  <p><strong>Information Collection:</strong><br />Your session coordinates, preferences, and checklist inputs are stored only in your browser's local state storage, and are never dispatched to unauthorized external agencies.</p>
                  <p><strong>Your Rights:</strong><br />At any moment, clicking the <strong>Logout (Power)</strong> action clears all active session cache instantly.</p>
                </div>
              </div>
            )}

            <button
              onClick={() => setActivePolicy('none')}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2 rounded-lg mt-4 transition-all cursor-pointer"
            >
              Close Policy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
