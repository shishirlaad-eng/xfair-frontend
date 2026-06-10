import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface FooterLinksProps {
  language: Language;
}

export function FooterLinks({ language }: FooterLinksProps) {
  const t = TRANSLATIONS[language];

  return (
    <div id="portal-footer" className="w-full text-center py-6 mt-auto text-xs text-slate-500 font-medium select-none z-10">
      <div className="flex items-center justify-center gap-6">
        <span className="font-semibold font-sans text-slate-400">
          {t.footer.imprintLabel}
        </span>
        <span className="text-slate-300">|</span>
        <span className="font-semibold font-sans text-slate-400">
          {t.footer.privacyLabel}
        </span>
      </div>
    </div>
  );
}

