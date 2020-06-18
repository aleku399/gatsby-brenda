const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark(
        sort: {order: ASC, fields: [frontmatter___date] }
        limit: 1000
        ) {
        edges {
          node {
            id
            fileAbsolutePath
            fields {
              slug
            }
            frontmatter {
              title
              path
              tags
              templateKey
              image {
                childImageSharp {
                  fluid(maxWidth: 640) {
                    src
                  }
                }
              }
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges
    const blogPosts = _.filter(posts,  edge => {
      const slug = _.get(edge, `node.fields.slug`)
      if (!slug) return undefined

      if (_.includes(slug, `/blog`) ) {
        // console.log(edge)
        return edge
      }

      return undefined
    })
    const pagePosts = _.filter(posts,  edge => {
      const slug = _.get(edge, `node.fields.slug`)
      if (!slug) return undefined

      if ( (_.includes(slug, `/blog/`) ) === false )  {
        return edge
      }

      return undefined
    })

    pagePosts.forEach( (edge, index) => {
      console.log(edge)
      const id = edge.node.id
      // const next = index === 0 ? null : posts[index - 1].node
      // const prev = index === posts.length - 1 ? null : posts[index + 1].node

      createPage({ 
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          slug: edge.node.fields.slug,
          id,
          absolutePathRegex: `/^${path.dirname(edge.node.fileAbsolutePath)}/`,
          // prev,
          // next,
        },
      })
    })
    // creating pagination
    blogPosts.forEach( ( {node}, index) => {
      console.log(node)
      const id = node.id
      const prev = index === 0 ? null : blogPosts[index - 1].node
      const next = index === blogPosts.length - 1 ? null : blogPosts[index + 1].node

      createPage({ 
        path: node.fields.slug,
        tags: node.frontmatter.tags,
        component: path.resolve(
          `src/templates/blog-post.js`
        ),
        // additional data can be passed via context
        context: {
          slug: node.fields.slug,
          id,
          absolutePathRegex: `/^${path.dirname(node.fileAbsolutePath)}/`,
          prev,
          next,
        },
      })
    })
    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
