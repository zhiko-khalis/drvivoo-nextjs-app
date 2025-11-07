"use client";

import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, tString } = useLanguage();
  const [swirlVisible, setSwirlVisible] = useState(false);
  const [swirlOpacity, setSwirlOpacity] = useState(0);
  const [aboutBurst, setAboutBurst] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const launchSweetConfetti = (theme: 'chocolate' | 'candy' | 'sugar' = 'candy') => {
    const emojis =
      theme === 'chocolate'
        ? ['🍫', '🍪', '🥨']
        : theme === 'sugar'
        ? ['🧁', '🍰', '🍩']
        : ['🍬', '🍭', '🍫'];

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '0';
    container.style.top = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);

    const numPieces = 28;
    const durationBase = 1400;

    for (let i = 0; i < numPieces; i++) {
      const piece = document.createElement('span');
      piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      piece.style.position = 'absolute';
      piece.style.willChange = 'transform, opacity';
      const startX = Math.random() * window.innerWidth;
      const startY = -40 - Math.random() * 120;
      const size = 18 + Math.random() * 16;
      piece.style.left = `${startX}px`;
      piece.style.top = `${startY}px`;
      piece.style.fontSize = `${size}px`;
      piece.style.filter = 'drop-shadow(0 2px 2px rgba(0,0,0,0.15))';
      container.appendChild(piece);

      const endY = window.innerHeight + 100;
      const drift = (Math.random() - 0.5) * 200;
      const rotate = (Math.random() - 0.5) * 720;
      const delay = Math.random() * 150;
      const duration = durationBase + Math.random() * 500;

      piece.animate(
        [
          { transform: 'translate(0, 0) rotate(0deg)', opacity: 0 },
          { transform: `translate(${drift * 0.5}px, ${endY * 0.3}px) rotate(${rotate *
            0.5}deg)`, opacity: 1 },
          { transform: `translate(${drift}px, ${endY}px) rotate(${rotate}deg)`, opacity: 0 }
        ],
        { duration, delay, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }
      );
    }

    window.setTimeout(() => {
      if (container.parentNode) container.parentNode.removeChild(container);
    }, 2100);
  };

  // Smooth "dripping chocolate" transition overlay
  const launchChocolateDripTransition = (onMidway?: () => void) => {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.zIndex = '10000';
    overlay.style.pointerEvents = 'none';
    overlay.style.background = 'linear-gradient(180deg, #5a3a22 0%, #7a4b28 40%, #5a3a22 100%)';
    overlay.style.transform = 'translateY(-100%)';
    overlay.style.opacity = '0';
    overlay.style.willChange = 'transform, opacity';

    // Dripping edge using SVG mask
    const drip = document.createElement('div');
    drip.style.position = 'absolute';
    drip.style.left = '0';
    drip.style.right = '0';
    drip.style.bottom = '0';
    drip.style.height = '140px';
    drip.style.background = '#5a3a22';
    drip.style.maskImage = 'url("data:image/svg+xml;utf8,\
<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 200\'>\
  <path fill=\'%23000\' d=\'M0,40 C120,120 220,0 340,60 C420,100 500,60 580,100 C720,170 800,30 920,70 C1080,130 1200,20 1440,90 L1440,200 L0,200 Z\'/>\
</svg>")';
    drip.style.webkitMaskImage = drip.style.maskImage;
    drip.style.maskRepeat = 'no-repeat';
    drip.style.maskSize = 'cover';
    drip.style.opacity = '0.95';

    overlay.appendChild(drip);
    document.body.appendChild(overlay);

    // Enter: slide down + fade in
    const enter = overlay.animate(
      [
        { transform: 'translateY(-100%)', opacity: 0 },
        { transform: 'translateY(0%)', opacity: 1 }
      ],
      { duration: 500, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }
    );

    // Call midway action shortly after start (to begin scrolling while overlay is down)
    const midwayTimer = window.setTimeout(() => {
      if (onMidway) onMidway();
    }, 180);

    enter.onfinish = () => {
      // Exit: fade out while subtly sliding further down
      const exit = overlay.animate(
        [
          { transform: 'translateY(0%)', opacity: 1 },
          { transform: 'translateY(15%)', opacity: 0 }
        ],
        { duration: 700, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards', delay: 150 }
      );
      exit.onfinish = () => {
        window.clearTimeout(midwayTimer);
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      };
    };
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const sweetScrollToSection = (
    sectionId: string,
    theme: 'chocolate' | 'candy' | 'sugar' = 'candy'
  ) => {
    launchSweetConfetti(theme);
    scrollToSection(sectionId);
  };

  // Cotton Candy Swirl: rotating pastel swirl that fades as scroll finishes
  const cottonCandyScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      scrollToSection(sectionId);
      return;
    }

    const targetTop = element.getBoundingClientRect().top + window.scrollY;
    const startDistance = Math.max(1, Math.abs(window.scrollY - targetTop));

    setSwirlVisible(true);
    setSwirlOpacity(1);

    const handleScroll = () => {
      const distance = Math.abs(window.scrollY - targetTop);
      const progress = Math.min(1, Math.max(0, distance / startDistance));
      setSwirlOpacity(progress);
      if (distance < 8) {
        setSwirlOpacity(0);
        window.removeEventListener('scroll', handleScroll);
        window.setTimeout(() => setSwirlVisible(false), 350);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true } as AddEventListenerOptions);
    scrollToSection(sectionId);

    // Fallback to ensure cleanup
    window.setTimeout(() => {
      window.removeEventListener('scroll', handleScroll);
      setSwirlOpacity(0);
      window.setTimeout(() => setSwirlVisible(false), 350);
    }, 2500);
  };

  const triggerAboutBurstAndScroll = () => {
    setAboutBurst(true);
    // End the burst after the animation completes
    window.setTimeout(() => setAboutBurst(false), 750);
    scrollToSection('about');
  };

  // Page Scroll Morph: blob/circle morphing animation that expands as we scroll
  const pageScrollMorphScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      scrollToSection(sectionId);
      return;
    }

    const targetTop = element.getBoundingClientRect().top + window.scrollY;
    const startY = window.scrollY;
    const distance = Math.abs(targetTop - startY);
    const startDistance = Math.max(1, distance);

    // Create the morph overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.zIndex = '9999';
    overlay.style.pointerEvents = 'none';
    overlay.style.overflow = 'hidden';

    // Create SVG blob
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.style.position = 'absolute';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.top = '0';
    svg.style.left = '0';

    // Create morphing blob path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill', '#5948D2');
    path.style.opacity = '0.95';
    svg.appendChild(path);

    overlay.appendChild(svg);
    document.body.appendChild(overlay);

    // Helper to generate blob path
    const generateBlobPath = (progress: number, centerX: number, centerY: number, radius: number) => {
      // Start as a small circle, morph into a larger blob
      const baseRadius = radius * progress;
      const points = 12; // More points for smoother blob
      const pointsArray: Array<{ x: number; y: number }> = [];

      // Generate points with blob variation
      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2;
        // Add sinusoidal variation for organic blob shape, more pronounced as it grows
        const variation = baseRadius * 0.2 * (1 + progress * 0.6) * Math.sin(progress * Math.PI * 3 + angle * 4);
        const r = baseRadius + variation;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        pointsArray.push({ x, y });
      }

      // Build smooth path with cubic bezier curves
      let pathData = `M ${pointsArray[0].x},${pointsArray[0].y}`;
      
      for (let i = 0; i < points; i++) {
        const current = pointsArray[i];
        const next = pointsArray[(i + 1) % points];
        const prev = pointsArray[(i - 1 + points) % points];
        
        // Calculate control points for smooth curves
        const dx = next.x - prev.x;
        const dy = next.y - prev.y;
        const tension = 0.3; // Control point distance
        const cp1x = current.x + dx * tension;
        const cp1y = current.y + dy * tension;
        const cp2x = next.x - (next.x - current.x) * tension;
        const cp2y = next.y - (next.y - current.y) * tension;
        
        pathData += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
      }
      
      pathData += ' Z';
      return pathData;
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const remainingDistance = Math.abs(targetTop - currentY);
      const progress = Math.min(1, Math.max(0, 1 - remainingDistance / startDistance));
      
      // Update blob path based on scroll progress
      const blobPath = generateBlobPath(progress, 50, 50, 50); // Using viewBox coordinates (0-100)
      path.setAttribute('d', blobPath);

      // Fade out as we approach the target
      if (progress > 0.85) {
        const fadeProgress = (progress - 0.85) / 0.15;
        path.style.opacity = String(0.95 * (1 - fadeProgress));
      }

      // Clean up when we reach the target
      if (remainingDistance < 8) {
        window.removeEventListener('scroll', handleScroll);
        const fadeOut = overlay.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 300, easing: 'ease-out', fill: 'forwards' }
        );
        fadeOut.onfinish = () => {
          if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        };
      }
    };

    // Initial small blob
    path.setAttribute('d', generateBlobPath(0.05, 50, 50, 50));
    
    // Animate in
    const fadeIn = overlay.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 200, easing: 'ease-out', fill: 'forwards' }
    );

    fadeIn.onfinish = () => {
      window.addEventListener('scroll', handleScroll, { passive: true } as AddEventListenerOptions);
      scrollToSection(sectionId);
    };

    // Fallback cleanup
    window.setTimeout(() => {
      window.removeEventListener('scroll', handleScroll);
      const fadeOut = overlay.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 300, easing: 'ease-out', fill: 'forwards' }
      );
      fadeOut.onfinish = () => {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      };
    }, 2500);
  };

  // Sweet Sprinkle Trail: particles spawn as scrolling progresses
  const sweetSprinkleTrailScroll = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) {
      scrollToSection(sectionId);
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      scrollToSection(sectionId);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    canvas.style.position = 'fixed';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.zIndex = '9998';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    resize();

    const colors = ['#FF6FB5', '#FFD166', '#8ED1FC', '#C3F584', '#B28DFF'];
    type Particle = {
      x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; rot: number; rotSpeed: number; color: string; shape: 'circle' | 'rod';
    };
    const particles: Particle[] = [];

    const spawn = (count: number) => {
      for (let i = 0; i < count; i++) {
        const shape: Particle['shape'] = Math.random() < 0.5 ? 'circle' : 'rod';
        const angle = (Math.random() * 20 - 10) * (Math.PI / 180); // slight spread
        const speed = 1.4 + Math.random() * 1.4;
        const vx = Math.cos(angle) * 0.8 * (Math.random() < 0.5 ? -1 : 1);
        const vy = Math.sin(angle) * 0.4 + speed;
        particles.push({
          x: (Math.random() * canvas.width),
          y: 0,
          vx,
          vy,
          life: 0,
          maxLife: 40 + Math.random() * 30,
          size: 3 + Math.random() * 4,
          rot: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape,
        });
      }
    };

    let raf = 0;
    let lastScrollY = window.scrollY;
    let stopRequested = false;

    const draw = () => {
      raf = window.requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);
      // Update & render
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * dpr;
        p.y += p.vy * dpr;
        p.vy += 0.02 * dpr; // subtle gravity
        p.rot += p.rotSpeed;
        p.life++;

        const alpha = Math.max(0, 1 - p.life / p.maxLife);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.translate(p.x / dpr, p.y / dpr);
        ctx.rotate(p.rot);
        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size * 1.2, -p.size * 0.3, p.size * 2.4, p.size * 0.6);
        }
        ctx.rotate(-p.rot);
        ctx.translate(-p.x / dpr, -p.y / dpr);
        ctx.globalAlpha = 1;

        if (p.life > p.maxLife || p.y > canvas.height + 20 * dpr) {
          particles.splice(i, 1);
        }
      }
      ctx.restore();

      if (stopRequested && particles.length === 0) {
        cleanup();
      }
    };

    const onScroll = () => {
      const dy = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      const intensity = Math.min(12, 4 + Math.floor(dy / 12));
      spawn(intensity);
    };

    const onResize = () => resize();

    const cleanup = () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };

    window.addEventListener('scroll', onScroll, { passive: true } as AddEventListenerOptions);
    window.addEventListener('resize', onResize);
    draw();

    // Begin smooth scroll and seed particles
    spawn(14);
    scrollToSection(sectionId);

    // Stop after a short duration or when near target
    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    const stopCheck = window.setInterval(() => {
      const distance = Math.abs(window.scrollY - targetTop);
      if (distance < 8) {
        stopRequested = true;
        window.clearInterval(stopCheck);
      }
    }, 80);

    window.setTimeout(() => {
      stopRequested = true;
      window.clearInterval(stopCheck);
    }, 2200);
  };


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      {swirlVisible && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 9998, opacity: swirlOpacity, transition: 'opacity 300ms ease' }}
        >
          <div className="cotton-swirl-wrapper">
            <div className="cotton-swirl-core" />
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <img
              src="/DrVIVO Logo.svg"
              alt="Dr.VIVO Logo"
              className="w-12 h-12 rounded-full object-cover"
            />
            {/* <span className="text-2xl" style={{ color: isScrolled ? '#5948D2' : '#fff' }}>
              Dr.VIVO
            </span> */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className="hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: isScrolled ? '#5948D2' : '#fff' }}
            >
              {tString('nav.home')}
            </button>
           
          
            <button
              onClick={() => sweetScrollToSection('chocolate', 'chocolate')}
              className="hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: isScrolled ? '#5948D2' : '#fff' }}
            >
              {tString('nav.chocolate')}
            </button>
            <button
              onClick={() =>
                launchChocolateDripTransition(() => scrollToSection('hard-candy'))
              }
              className="hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: isScrolled ? '#5948D2' : '#fff' }}
            >
              {tString('nav.lollipops')}
            </button>
            <button
              onClick={() => cottonCandyScroll('soft-candy')}
              className="hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: isScrolled ? '#5948D2' : '#fff' }}
            >
              {tString('nav.softchew')}
            </button>
            <button
              onClick={() => sweetSprinkleTrailScroll('jelly')}
              className="hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: isScrolled ? '#5948D2' : '#fff' }}
            >
              {tString('nav.jelly')}
            </button>
            <button
              onClick={() => pageScrollMorphScroll('ingredients')}
              className="hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: isScrolled ? '#5948D2' : '#fff' }}
            >
              {tString('nav.ingredients')}
            </button>

            <div className="relative inline-block">
              <button
                onClick={triggerAboutBurstAndScroll}
                className="hover:opacity-70 transition-opacity cursor-pointer"
                style={{ color: isScrolled ? '#5948D2' : '#fff' }}
              >
                {tString('nav.about')}
              </button>
              {aboutBurst && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="relative" style={{ width: 0, height: 0 }}>
                    {['🍓','🍒','🍊','🍋','🍇','🍉','🍍','🥝'].map((emoji, idx) => {
                      const angle = (idx / 8) * Math.PI * 2;
                      const distance = 28; // px
                      const dx = Math.cos(angle) * distance;
                      const dy = Math.sin(angle) * distance;
                      const delay = (idx % 4) * 20;
                      const styleWithVars = {
                        ['--dx']: `${dx}px`,
                        ['--dy']: `${dy}px`,
                        ['--delay']: `${delay}ms`,
                      } as React.CSSProperties & { ['--dx']: string; ['--dy']: string; ['--delay']: string };
                      return (
                        <span
                          key={idx}
                          className="fruit-burst"
                          style={styleWithVars}
                        >
                          {emoji}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <img
              src="/Better Choice.png"
              alt="Contact"
              className="w-12 h-14"
            />
            <Button
              className="rounded-full cursor-pointer"
              style={{ backgroundColor: '#10B7AF' }}
              onClick={() => scrollToSection('contact')}
            >
              {tString('nav.contact')}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="hover:opacity-70 transition-opacity cursor-pointer flex items-center gap-1"
                  style={{ color: isScrolled ? '#5948D2' : '#fff' }}
                >
                  <Globe size={18} />
                  <span>{language === 'en' ? 'EN' : language === 'ar' ? 'AR' : 'TR'}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('ar')}>
                  العربية
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('tr')}>
                  Türkçe
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ color: isScrolled ? '#5948D2' : '#fff' }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 py-4 flex flex-col justify-center items-center space-y-3">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-center py-2 hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: '#5948D2' }}
            >
              {tString('nav.home')}
            </button>
           
            <button
              onClick={() => scrollToSection('chocolate')}
              className="block w-full text-center py-2 hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: '#5948D2' }}
            >
              {tString('nav.chocolate')}
            </button>
            <button
              onClick={() => scrollToSection('hard-candy')}
              className="block w-full text-center py-2 hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: '#5948D2' }}
            >
              {tString('nav.lollipops')}
            </button>
            <button
              onClick={() => cottonCandyScroll('soft-candy')}
              className="block w-full text-center py-2 hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: '#5948D2' }}
            >
              {tString('nav.softchew')}
            </button>
            <button
              onClick={() => sweetSprinkleTrailScroll('jelly')}
              className="block w-full text-center py-2 hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: '#5948D2' }}
            >
              {tString('nav.jelly')}
            </button>
            
            <button
              onClick={() => {
                pageScrollMorphScroll('ingredients');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-center py-2 hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: '#5948D2' }}
            >
              {tString('nav.ingredients')}
            </button>

            <div className="relative w-full flex items-center justify-center">
              <button
                onClick={triggerAboutBurstAndScroll}
                className="block w-full text-center py-2 hover:opacity-70 transition-opacity cursor-pointer"
                style={{ color: '#5948D2' }}
              >
                {tString('nav.about')}
              </button>
              {aboutBurst && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="relative" style={{ width: 0, height: 0 }}>
                    {['🍓','🍒','🍊','🍋','🍇','🍉','🍍','🥝'].map((emoji, idx) => {
                      const angle = (idx / 8) * Math.PI * 2;
                      const distance = 26;
                      const dx = Math.cos(angle) * distance;
                      const dy = Math.sin(angle) * distance;
                      const delay = (idx % 4) * 20;
                      const styleWithVars = {
                        ['--dx']: `${dx}px`,
                        ['--dy']: `${dy}px`,
                        ['--delay']: `${delay}ms`,
                      } as React.CSSProperties & { ['--dx']: string; ['--dy']: string; ['--delay']: string };
                      return (
                        <span
                          key={idx}
                          className="fruit-burst"
                          style={styleWithVars}
                        >
                          {emoji}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <img
              src="/Better Choice.png"
              alt="Contact"
              className="w-12 h-14 mx-auto"
            />
            <Button
              className="w-full rounded-full"
              style={{ backgroundColor: '#10B7AF' }}
              onClick={() => scrollToSection('contact')}
            >
              {tString('nav.contact')}
            </Button>

            <div className="w-full flex items-center justify-center gap-2 py-2">
              <Globe size={18} style={{ color: '#5948D2' }} />
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-1 rounded transition-opacity cursor-pointer ${
                  language === 'en' ? 'bg-[#5948D2] text-white' : 'text-[#5948D2]'
                }`}
              >
                English
              </button>
              <span className="text-[#5948D2]">|</span>
              <button
                onClick={() => setLanguage('ar')}
                className={`px-4 py-1 rounded transition-opacity cursor-pointer ${
                  language === 'ar' ? 'bg-[#5948D2] text-white' : 'text-[#5948D2]'
                }`}
              >
                العربية
              </button>
              <span className="text-[#5948D2]">|</span>
              <button
                onClick={() => setLanguage('tr')}
                className={`px-4 py-1 rounded transition-opacity cursor-pointer ${
                  language === 'tr' ? 'bg-[#5948D2] text-white' : 'text-[#5948D2]'
                }`}
              >
                Türkçe
              </button>
              
            </div>

          </div>
        </div>
      )}
      <style jsx>{`
        .cotton-swirl-wrapper {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(closest-side, rgba(255,255,255,0.25), rgba(255,255,255,0) 70%);
        }
        .cotton-swirl-core {
          width: 140vmax;
          height: 140vmax;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            rgba(255, 182, 193, 0.55),
            rgba(173, 216, 230, 0.55),
            rgba(255, 240, 245, 0.6),
            rgba(255, 182, 193, 0.55)
          );
          filter: blur(70px) saturate(1.15);
          animation: cotton-swirl-rotate 6s linear infinite;
          mix-blend-mode: screen;
          will-change: transform, opacity;
        }
        @keyframes cotton-swirl-rotate {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.03); }
          100% { transform: rotate(360deg) scale(1); }
        }
        .fruit-burst {
          position: absolute;
          left: 0;
          top: 0;
          transform: translate(0, 0) scale(0.6);
          opacity: 0;
          filter: drop-shadow(0 1px 1px rgba(0,0,0,0.15));
          animation: fruit-burst-keyframes 520ms ease-out forwards;
          animation-delay: var(--delay, 0ms);
          will-change: transform, opacity;
        }
        @keyframes fruit-burst-keyframes {
          0% { transform: translate(0, 0) scale(0.2); opacity: 0; }
          60% { transform: translate(var(--dx, 0), var(--dy, 0)) scale(1); opacity: 1; }
          100% { transform: translate(calc(var(--dx, 0) * 1.15), calc(var(--dy, 0) * 1.15)) scale(0.9); opacity: 0; }
        }
      `}</style>
    </nav>
  );
}
