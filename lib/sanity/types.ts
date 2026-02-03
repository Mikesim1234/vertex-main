export type Job = {
  _id: string
  title: string
  location?: string
  department?: string
  type?: string
  summary?: string
  applyUrl?: string
  slug?: {
    current: string
  }
  postedAt?: string
}
