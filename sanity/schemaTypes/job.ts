import { defineField, defineType } from "sanity"

export const job = defineType({
  name: "job",
  title: "Job",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "type",
      title: "Employment Type",
      type: "string",
      options: {
        list: ["Full-time", "Part-time", "Contract", "Temporary", "Internship"],
      },
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "description",
      title: "Job Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "applyUrl",
      title: "Apply URL",
      type: "url",
    }),
    defineField({
      name: "postedAt",
      title: "Posted At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "open",
      options: {
        list: [
          { title: "Open", value: "open" },
          { title: "Closed", value: "closed" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
    },
  },
})
