"use client";

import React from "react";
import Image from "next/image";

const BRAND_LOGOS: Record<string, string> = {
  c: "/logos/c.svg",
  cpp: "/logos/cpp.svg",
  python: "/logos/python.svg",
  java: "/logos/java.svg",
  typescript: "/logos/typescript.svg",
  javascript: "/logos/javascript.svg",
  sql: "/logos/sql.svg",
  react: "/logos/react.svg",
  nextjs: "/logos/nextjs.svg",
  nodejs: "/logos/nodejs.svg",
  express: "/logos/express.svg",
  flask: "/logos/flask.svg",
  postgresql: "/logos/postgresql.svg",
  mysql: "/logos/mysql.svg",
  mongodb: "/logos/mongodb.svg",
  git: "/logos/git.svg",
  github: "/logos/github.svg",
  docker: "/logos/docker.svg",
  redis: "/logos/redis.svg",
  vscode: "/logos/vscode.svg",
};

export function isBrand(key: string): boolean {
  return key in BRAND_LOGOS;
}

interface TechLogoProps {
  logoKey: string;
  size?: number;
  className?: string;
}

export function TechLogo({ logoKey, size = 48, className = "" }: TechLogoProps) {
  if (isBrand(logoKey)) {
    return (
      <div
        className={`relative flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <Image
          src={BRAND_LOGOS[logoKey]}
          alt={logoKey}
          width={size}
          height={size}
          className="object-contain w-full h-full"
        />
      </div>
    );
  }

  // Thin line SVG icons for Concept skills
  return (
    <div
      className={`flex items-center justify-center text-[#0d0d0d] ${className}`}
      style={{ width: size, height: size }}
    >
      {logoKey === "vectordb" && (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      )}
      {logoKey === "dsa" && (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="2" />
          <circle cx="5" cy="19" r="2" />
          <circle cx="19" cy="19" r="2" />
          <line x1="12" y1="7" x2="5" y2="17" />
          <line x1="12" y1="7" x2="19" y2="17" />
          <line x1="5" y1="19" x2="19" y2="19" />
        </svg>
      )}
      {logoKey === "oop" && (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      )}
      {logoKey === "dbms" && (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      )}
      {logoKey === "auth" && (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )}
      {logoKey === "genai" && (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      )}
      {logoKey === "llm" && (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <line x1="9" y1="9" x2="15" y2="9" />
          <line x1="9" y1="13" x2="13" y2="13" />
        </svg>
      )}
      {logoKey === "rest" && (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      )}
    </div>
  );
}
