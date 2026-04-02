export type VerseCategory =
  | "language_constraint"
  | "device_behavior"
  | "api_gotcha"
  | "pattern_recommended"
  | "pattern_antipattern"
  | "workflow_tip";

export type VerseSeverity = "critical" | "warning" | "info";

export type VerificationStatus = "verified" | "unverified" | "community_reported";

export type VerseRecord = {
  id: string; // verse-001 形式
  title: string;
  category: VerseCategory;
  tags: string[];
  trigger: {
    description: string;
    keywords: string[];
    code_patterns: string[];
  };
  problem: {
    summary: string;
    common_ai_mistake: string;
  };
  solution: {
    summary: string;
    code_example: string | null;
    reference_url: string | null;
  };
  verification: {
    status: VerificationStatus;
    verified_by: string;
    verified_date: string;
    uefn_version?: string;
  };
  severity: VerseSeverity;
  related_ids: string[];
};

export type SearchSeverityFilter = VerseSeverity | "all";
export type CategoryFilter = VerseCategory | "all";

