import { REASONS } from './reasons';

const TailoredOffersByCode = {
  NO_TIME: {
    type: 'Done-For-You Build-out',
    headline: "Too busy to build? We'll do it for you—funnels, emails, automations, and more",
    subCopy: 'Submit a project request. Receive a quote within 48 hours (on average).',
    acceptCTA: 'Get My Free Quote',
    rejectCTA: 'Continue To Cancel',
  },
  TOO_COMPLEX: {
    type: '30-Day Free Extension',
    headline: 'Feeling overwhelmed? Get 30 Days Free!',
    subCopy: "We don't like goodbyes, so we're giving you entire month — on us. Get some breathing room to fully use and find success with CC360.",
    acceptCTA: 'Claim My Free 30 Days',
    rejectCTA: 'Continue To Cancel',
  },
  NO_SALES: {
    type: '50% Off Next 2 Months',
    headline: 'Cut your cost by 50% for the next two months.',
    subCopy: 'Reduce your overhead by 50% while you build momentum and see results.',
    acceptCTA: 'Get 2 Months 50% Off',
    rejectCTA: 'Continue To Cancel',
  },
  BUGS: {
    type: '30-Day Free Extension',
    headline: "We'll give you 30 days free on us while we fix the technical issues",
    subCopy: "Submit the exact performance issue and give us 30 days to push a fix (normally takes us less than 7 days). If we can't, you can come back and cancel anytime.",
    acceptCTA: 'Report Issue & Get 30 Days Free',
    rejectCTA: 'Continue To Cancel',
  },
  BAD_SUPPORT: {
    type: 'Complimentary Done-With-You Setup',
    headline: "Let's start over—personal 30-minute setup call with our best agent",
    subCopy: 'A senior specialist will set up funnels, emails, automations (& more) live with you for FREE. (Normally $100)',
    acceptCTA: 'Claim My Free 1-on-1 (Normally $100)',
    rejectCTA: 'Continue To Cancel',
  },
  MISSING_FEATURE: {
    type: '50% Off Next 2 Months',
    headline: "Half price until we ship what you're missing",
    subCopy: 'Pay 50% less while our development team prioritizes your request. Just tell us the missing feature.',
    acceptCTA: 'Claim Discount & Request Feature',
    rejectCTA: 'Continue To Cancel',
  },
  TESTING: {
    type: '30-Day Free Extension',
    headline: "30 days wasn't enough? Here's 30 more days free",
    subCopy: 'Most successful users need 45-60 days to see the full picture.',
    acceptCTA: 'Claim My Free 30 Days',
    rejectCTA: 'Continue To Cancel',
  },
  OTHER: {
    type: 'Park-&-Protect',
    headline: 'Pause your account for $29 and keep everything safe.',
    subCopy: 'Enjoy a complete 1-month subscription suspension on us. By parking your CC360 account, you can take a break from building your business on our platform without canceling your subscription. Rest assured, all your valuable information and progress on your site will be preserved for as long as you require it.',
    acceptCTA: 'Park & Protect for $29',
    rejectCTA: 'Continue To Cancel',
  },
};

const SecondChanceOffersByCode = {
  NO_TIME: {
    type: '30-Day Free Extension',
    headline: 'One final offer: Another month on us, no strings attached',
    subCopy: 'No commitment required—just more time to get things built (or let us build things FOR you).',
    acceptCTA: 'Claim My Free 30 Days',
    rejectCTA: 'Cancel my subscription',
  },
  TOO_COMPLEX: {
    type: 'Done-For-You Build-out',
    headline: "Final option: Skip the complexity entirely, we'll build it for you.",
    subCopy: 'Submit a project request on whatever you\'re needing help building most. Receive a quote within 48 hours (on average).',
    acceptCTA: 'Get My Free Quote',
    rejectCTA: 'Cancel my subscription',
  },
  NO_SALES: {
    type: 'Park-&-Protect – $29/mo (1st mo free)',
    headline: 'Before you lose your work—park it safely for almost nothing',
    subCopy: 'Enjoy a complete 1-month subscription suspension on us. By parking your CC360 account, you can take a break from building your business on our platform without canceling your subscription. Rest assured, all your valuable information and progress on your site will be preserved for as long as you require it.',
    acceptCTA: 'Park & Protect for $29',
    rejectCTA: 'Cancel my subscription',
  },
  BUGS: {
    type: 'Park-&-Protect – $29/mo (1st mo free)',
    headline: 'Before you lose all your work—park it safely while we iron out the bugs',
    subCopy: 'Enjoy a complete 1-month subscription suspension on us. By parking your CC360 account, you can take a break from building your business on our platform without canceling your subscription. Rest assured, all your valuable information and progress on your site will be preserved for as long as you require it.',
    acceptCTA: 'Park & Protect for $29',
    rejectCTA: 'Cancel my subscription',
  },
  BAD_SUPPORT: {
    type: '30-Day Free Extension + Priority Support',
    headline: 'Last chance: 30 days free with guaranteed VIP support',
    subCopy: 'Experience our priority support for 30-days free that jumps every queue.',
    acceptCTA: 'Claim My Free 30 Days',
    rejectCTA: 'Cancel my subscription',
  },
  MISSING_FEATURE: {
    type: '30-Day Free Extension',
    headline: 'Stay free for 30 days while we build what you need.',
    subCopy: "Tell us the missing feature; we'll update you as soon as it ships.",
    acceptCTA: 'Claim My Free 30 Days',
    rejectCTA: 'Cancel my subscription',
  },
  TESTING: {
    type: 'Done-For-You Build-out',
    headline: 'Before you leave - Let us prove the value with a real build',
    subCopy: 'Skip the testing phase entirely and let us build whatever you need (website, funnel, automation, emails, and more)',
    acceptCTA: 'Get My Free Quote',
    rejectCTA: 'Cancel my subscription',
  },
  OTHER: {
    type: '30-Day Free Extension',
    headline: 'Final offer: 30 days free while we fix whatever went wrong',
    subCopy: "Tell us what went wrong and we'll prioritize fixing it. 30 days on us to earn back your trust.",
    acceptCTA: 'Claim My Free 30 Days',
    rejectCTA: 'Cancel my subscription',
  },
};

// Lightweight inline SVG placeholders to avoid remote image dependencies
const svgBanner = (bg, fg, label) =>
  `data:image/svg+xml;utf8,` +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400'>` +
      `<defs>` +
        `<linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>` +
          `<stop offset='0%' stop-color='${bg}'/>` +
          `<stop offset='100%' stop-color='${fg}'/>` +
        `</linearGradient>` +
      `</defs>` +
      `<rect width='100%' height='100%' fill='url(#g)' rx='24'/>` +
      `<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Helvetica, Arial, sans-serif' font-size='36' fill='white'>${label}</text>` +
    `</svg>`
  );

const IMAGE_30_DAY = svgBanner('#0475FF', '#0E325E', '30-Day Free');
const IMAGE_50_OFF = svgBanner('#0E325E', '#0475FF', '50% Off');
const IMAGE_PARK   = svgBanner('#FF2F00', '#BC1E00', 'Park & Protect');

const getOfferImage = (offerType) => {
  if (offerType.includes('30-Day') || offerType.includes('Extension')) {
    return IMAGE_30_DAY;
  }
  if (offerType.includes('50%') || offerType.includes('50 %')) {
    return IMAGE_50_OFF;
  }
  if (offerType.includes('Park') || offerType.includes('$29')) {
    return IMAGE_PARK;
  }
  return IMAGE_30_DAY;
};

export function getOfferFor(reasonCode, phase = 'tailored') {
  const map = phase === 'secondChance' ? SecondChanceOffersByCode : TailoredOffersByCode;
  const code = reasonCode && map[reasonCode] ? reasonCode : 'OTHER';
  const offer = map[code] || map.OTHER;
  const imageUrl = getOfferImage(offer.type);
  return { ...offer, imageUrl };
}

export { TailoredOffersByCode, SecondChanceOffersByCode };


