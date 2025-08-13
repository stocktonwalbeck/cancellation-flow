export const REASONS = [
  { code: 'NO_TIME', label: 'No time to use it' },
  { code: 'TESTING', label: 'I was just testing the platform' },
  { code: 'TOO_COMPLEX', label: 'Hard To Learn / Too Complicated' },
  { code: 'NO_SALES', label: 'No sales yet / too costly' },
  { code: 'BUGS', label: 'Bugs or performance issues' },
  { code: 'BAD_SUPPORT', label: 'Poor customer service' },
  { code: 'MISSING_FEATURE', label: 'Missing a feature I need' },
  { code: 'OTHER', label: 'Other' },
];

export const REASON_BY_LABEL = Object.fromEntries(REASONS.map(r => [r.label, r.code]));
export const REASON_LABEL_BY_CODE = Object.fromEntries(REASONS.map(r => [r.code, r.label]));


