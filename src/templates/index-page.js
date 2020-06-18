import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'
import image from "../img/nab.jpeg";

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => (
  <div>
    <section className="hero hero--image">
      <div
        className="hero__image"
        id="rid"
        style={{
          backgroundImage: `url(${
            !!image.childImageSharp ? image.childImageSharp.fluid.src : image
          })`,
        }}
      > 
          <div className="row row--narrow">
            <div className="hero__content">
              <ul className="hero__meta">
                <li className="hero__meta-item  hero__meta-item--block">Briefing</li>
              </ul>
              <h1
                className="hero__title">
                {title}
              </h1>
              {/* <h3 className="hero_title">
                {subheading}
              </h3> */}
              <div className="hero__excerpt">
                <span>
                  <p>{mainpitch.description}</p>
                </span>
              </div>
              <div>
                <Link className="btn" to="/blog/2017-01-04-a-beginners-guide-to-brewing-with-chemex/">
                  Read more
                </Link>
              </div>
            </div>
          </div>
      </div>
    </section>
    <section className="section">
      <div className="row row--narrow">
        <div className="columns">
          <div className="column">
            <h2 className="section__heading">{mainpitch.title}</h2>
            <div className="is-typeset max-meter">
              <p>
              {mainpitch.description}
              </p>
            </div>
            <Link className="btn" to="/blog">
              Find out more who we are
            </Link>
          </div>
          <div className="column">
            <h2 className="section__heading">{subheading}</h2>
            <div className="is-typeset max-meter">
              <p>
              {description}
              </p>
            </div>
            <Link className="btn" to="/blog">
              Find out more about what we do
            </Link>
          </div>
        </div>
      </div>
    </section>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="column is-12">
                  <h3 className="feature__heading has-text-weight-semibold is-size-2">
                    Featured Work
                  </h3>
                  <BlogRoll />
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/blog">
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  console.log("frontmatter", frontmatter)
  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`
