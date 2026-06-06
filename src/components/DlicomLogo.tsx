/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const DlicomLogo: React.FC<LogoProps> = ({
  className = "",
  size = 48,
  glow = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src="/logo.png"
        alt="DLICOM Logo"
        className="w-full h-full object-contain pointer-events-none"
        style={{ width: size, height: size }}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export default DlicomLogo;
