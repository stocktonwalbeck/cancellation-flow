# Course Creator 360 - Cancellation Flow

A beautiful, conversion-optimized subscription cancellation flow built with React, Tailwind CSS, and Framer Motion.

## Features

- 🎯 **6-Step Cancellation Flow** - Loss frame → Reason collection → Tailored offers → Second chance → Goodbye → Confirmation
- 🎨 **Beautiful UI** - Modern design with smooth animations using Framer Motion
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- 🧠 **Psychology-Based** - Uses proven retention strategies and loss framing
- 🔄 **Dynamic Content** - Tailored offers based on cancellation reasons
- 🎲 **Randomized Survey** - Prevents chronology bias in reason selection
- 💫 **Smooth Animations** - Polished user experience with Framer Motion

## Tech Stack

- **React 18** - Modern React with hooks
- **React Router** - Multi-step navigation
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **Vite** - Fast development server

## Quick Start

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

### 3. Build for Production
\`\`\`bash
npm run build
\`\`\`

## Flow Structure

1. **Loss Frame** - Shows value user will lose by canceling
2. **Quick Reason** - Randomized survey to collect cancellation reason
3. **Tailored Offer** - Dynamic retention offer based on reason
4. **Second Chance** - Final retention attempt with different offer
5. **Goodbye Page** - Win-back content and final confirmation
6. **Confirmation** - Success message with redirect

## Integration Points

Ready for integration with:
- **Stripe API** - Subscription management
- **Segment** - Analytics and tracking
- **AWS** - Backend services
- **Snowflake** - Data warehousing

## Deployment

### Deploy to Vercel
1. Push to GitHub
2. Connect repository to Vercel
3. Auto-deploy on every push

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag the `dist` folder to Netlify

## Customization

- Edit user data in `src/context/CancellationContext.jsx`
- Modify offers in component files
- Update styling in Tailwind classes
- Add new retention strategies as needed

## License

Private project for Course Creator 360