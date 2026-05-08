
import React from 'react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

export default function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 text-sm md:text-base">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <a 
              href={link.href}
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm md:text-base"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}