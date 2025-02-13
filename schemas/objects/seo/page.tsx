import React from 'react'
import {defineField} from 'sanity'

export default defineField({
  name: 'seo.page',
  title: 'SEO',
  type: 'object',
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'placeholderString',
      description: (
        <>
          If empty, displays the document title (<code>title</code>)
        </>
      ),
      options: {field: 'title'},
      validation: (Rule) =>
        Rule.max(50).warning('Longer titles may be truncated by search engines'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'seo.description',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'domain',
      title: 'Domain',
      type: 'string',
    }),
    defineField({
      name: 'numResults',
      title: 'Number of Keywords',
      type: 'number',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
    }),
/*     defineField({
      actions: [FetchKeywordsAction()],
    }) */
  ],
})
