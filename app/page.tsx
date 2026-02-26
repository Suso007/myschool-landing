"use client";

import ErpFeaturesGrid from "@/components/erp-features-grid";
import AttendanceManagement from "@/components/attendance-management";
import WhyChooseSection from "@/components/why-choose-section";
import MobileAppsShowcase from "@/components/mobile-apps-showcase";
import EnterpriseLMSSection from "@/components/enterprise-lms-section";
import { HeroHighlightDemo } from "@/components/hero";
import { LazySection } from "@/components/lazy-section";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavThemeToogler
} from "@/components/ui/resizable-navbar";
import { AnimatedTestimonialsDemo } from "@/components/testimonials";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import FeaturesSectionDemo from "@/components/features-section-demo-3";
import FeaturesSectionDemo2 from "@/components/features-section-demo-2";
import { Footer } from "@/components/layout/footer";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleTheme = () => { setTheme(theme === 'dark' ? 'light' : 'dark'); };

  // Prevent hydration errors by only rendering theme toggler after mount
  useEffect(() => {
    setMounted(true);
  }, []);


  const bookCall = () => {
    window.location.href = "https://my-school-frontend.vercel.app/";
  }

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {mounted && <NavThemeToogler onClick={toggleTheme} theme={theme || 'light'} />}
            <NavbarButton
              onClick={() => window.location.href = "https://my-school-frontend.vercel.app/"}
              variant="primary">Login</NavbarButton>
            <NavbarButton
              hidden
              onClick={() => bookCall()}
              variant="primary">Book a call</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <Content />

      {/* Navbar */}
    </div>
  );
}

const Content = () => {

  return (
    <div>
      <HeroHighlightDemo />
      <LazySection>
        <FeaturesSectionDemo />
      </LazySection>
      <LazySection>
        <ErpFeaturesGrid />
      </LazySection>
      <LazySection>
        <AttendanceManagement />
      </LazySection>
      <LazySection>
        <WhyChooseSection />
      </LazySection>
      <LazySection>
        <MobileAppsShowcase />
      </LazySection>
      <LazySection>
        <EnterpriseLMSSection />
      </LazySection>
      <LazySection>
        <AnimatedTestimonialsDemo />
      </LazySection>
      <LazySection>
        <Footer
          builtBy="Inloom"
          builtByLink="https://myschool.in"
          githubLink="https://github.com/myschool"
          twitterLink="https://twitter.com/myschool"
          linkedinLink="https://linkedin.com/myschool"
        />
      </LazySection>
    </div>
  );
};

