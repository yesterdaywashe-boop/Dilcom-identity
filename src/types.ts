/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum DlicomRole {
  VERIFIED = "Verified",
  USER = "Dlicom User",
  OG = "OG",
  DLIEVER = "Dliever",
  DCODED = "Dcoded",
  DCO = "DCO",
  AMBASSADOR = "Ambassador",
  REGIONAL_HELPER = "Regional Helper",
  REGIONAL_LEAD = "Regional Lead",
  MODERATOR = "Moderator",
  TEAM = "Team"
}

export type RoleConfigType = {
  label: string;
  color: string;
  bgOpacity: string;
  borderColor: string;
};

export const ROLE_CONFIGS: Record<DlicomRole, RoleConfigType> = {
  [DlicomRole.VERIFIED]: {
    label: "Verified",
    color: "#4ADE80",
    bgOpacity: "rgba(74, 222, 128, 0.1)",
    borderColor: "rgba(74, 222, 128, 0.3)"
  },
  [DlicomRole.USER]: {
    label: "Dlicom User",
    color: "#B8BCC7",
    bgOpacity: "rgba(184, 188, 199, 0.1)",
    borderColor: "rgba(184, 188, 199, 0.3)"
  },
  [DlicomRole.OG]: {
    label: "OG",
    color: "#D9A15B",
    bgOpacity: "rgba(217, 161, 91, 0.1)",
    borderColor: "rgba(217, 161, 91, 0.3)"
  },
  [DlicomRole.DLIEVER]: {
    label: "Dliever",
    color: "#FF63C3",
    bgOpacity: "rgba(255, 99, 195, 0.1)",
    borderColor: "rgba(255, 99, 195, 0.3)"
  },
  [DlicomRole.DCODED]: {
    label: "Dcoded",
    color: "#F6D04D",
    bgOpacity: "rgba(246, 208, 77, 0.1)",
    borderColor: "rgba(246, 208, 77, 0.3)"
  },
  [DlicomRole.DCO]: {
    label: "DCO",
    color: "#4A7DFF",
    bgOpacity: "rgba(74, 125, 255, 0.1)",
    borderColor: "rgba(74, 125, 255, 0.3)"
  },
  [DlicomRole.AMBASSADOR]: {
    label: "Ambassador",
    color: "#06B6D4",
    bgOpacity: "rgba(6, 182, 212, 0.1)",
    borderColor: "rgba(6, 182, 212, 0.3)"
  },
  [DlicomRole.REGIONAL_HELPER]: {
    label: "Regional Helper",
    color: "#22C55E",
    bgOpacity: "rgba(34, 197, 94, 0.1)",
    borderColor: "rgba(34, 197, 94, 0.3)"
  },
  [DlicomRole.REGIONAL_LEAD]: {
    label: "Regional Lead",
    color: "#A78BFA",
    bgOpacity: "rgba(167, 139, 250, 0.1)",
    borderColor: "rgba(167, 139, 250, 0.3)"
  },
  [DlicomRole.MODERATOR]: {
    label: "Moderator",
    color: "#A855F7",
    bgOpacity: "rgba(168, 85, 247, 0.1)",
    borderColor: "rgba(168, 85, 247, 0.3)"
  },
  [DlicomRole.TEAM]: {
    label: "Team",
    color: "#C084FC",
    bgOpacity: "rgba(192, 132, 252, 0.1)",
    borderColor: "rgba(192, 132, 252, 0.3)"
  }
};

export interface UserPassport {
  id: string; // Dynamic Serial e.g. "DL-2491-A"
  discordUsername: string;
  xUsername: string;
  role: DlicomRole;
  joinedDate: string; // e.g. "May 2026"
  status: string; // e.g. "Verified Member"
  bio: string;
  profilePicture: string; // base64 or high-quality placeholder URL
  reputation: number; // e.g. 850
}

export interface SystemAssets {
  logoUrl: string | null;
  mascotUrl: string | null;
}
