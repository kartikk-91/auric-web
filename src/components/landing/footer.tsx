import React from 'react';
import { Mail, Heart } from 'lucide-react';
import { FaXTwitter, FaLinkedin, FaGithub } from 'react-icons/fa6';
import FooterColumn from './footer-column';
import Image from 'next/image';

const footerData = {
  product: {
    title: 'Product',
    links: [
      { label: 'Features', href: '#' },
      { label: 'Testimonials', href: '#' },
      { label: 'Integrations', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Changelog', href: '#' },
    ]
  },
  useCases: {
    title: 'Use Cases',
    links: [
      { label: 'Marketing Teams', href: '#' },
      { label: 'Product Teams', href: '#' },
      { label: 'Agencies', href: '#' },
      { label: 'SaaS Companies', href: '#' },
    ]
  },
  resources: {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'Templates', href: '#' },
      { label: 'Guides', href: '#' },
      { label: "What's New", href: '#' },
    ]
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ]
  }
};

const socialLinks = [
  { icon: FaXTwitter, href: '#', label: 'Twitter' },
  { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
  { icon: FaGithub, href: '#', label: 'GitHub' },
  { icon: Mail, href: '#', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 pt-12 md:pt-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">

          <div className="lg:col-span-2 space-y-6">

            <div className="flex items-center gap-2">
              <Image
                src={'/logo.png'}
                width={100}
                height={100}
                alt={'Auric'}
              />
            </div>


            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xs">
              AI-powered feedback and testimonial platform that helps you collect, analyze, and showcase what your customers say.
            </p>


            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-blue-600 flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 group"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>


          <FooterColumn {...footerData.product} />
          <FooterColumn {...footerData.useCases} />
          <FooterColumn {...footerData.resources} />
          <FooterColumn {...footerData.company} />
        </div>


        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2026 Auric. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>by the <a href="https://github.com/kartikk-91">kartikk-91</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
}