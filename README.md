# Vertex Edge Consultants

Recruitment, HR outsourcing, and hospitality training website built with Next.js.

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env.local` file with the following values:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

## Sanity CMS (Jobs)

The jobs section reads from Sanity. After creating a Sanity project, run the Studio locally:

```bash
npx sanity dev
```

Create `Job` documents and publish them to see listings on the site.
