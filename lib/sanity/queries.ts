export const jobsQuery = `*[_type == "job" && status == "open"] | order(postedAt desc) {
  _id,
  title,
  location,
  department,
  type,
  summary,
  applyUrl,
  slug,
  postedAt
}`
