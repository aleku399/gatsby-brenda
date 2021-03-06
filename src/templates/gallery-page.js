import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from 'simple-react-lightbox'
import Layout from '../components/Layout'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'
import CompatibleImage from '../components/CompatibleImage'

export const GalleryPageTemplate = ({
  image,
  title,
  heading,
  description,
  intro,
  main,
  testimonials,
  fullImage,
  pricing,
}) => (
  <div className="content">
    <section className="hero hero--image"   id="rie">
         <div
            className="hero__image"
            style={{
              backgroundImage: `url(${
                !!image.childImageSharp ? image.childImageSharp.fluid.src : image
              })`,
            }}
          > 
              <div className="row row--narrow">
                <div className="hero__content">
                  <h1
                    className="hero__title">
                     {title}
                  </h1>
                </div>
              </div>
          </div>
         </section>
    <section className="section section--gradient up">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-7 is-offset-1">
              <h3 className="has-text-weight-semibold is-size-2">{heading}</h3>
              <p>{description}</p>
            </div>
          </div>
        <SRLWrapper>
        <div className="columns">
          <div className="column">
            <CompatibleImage imageInfo={main.image1} />
          </div>
          <div className="column">
            <CompatibleImage imageInfo={main.image2} />
          </div>
          <div className="column">
            <CompatibleImage imageInfo={main.image3} />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <CompatibleImage imageInfo={main.image4} />
          </div>
          <div className="column">
            <CompatibleImage imageInfo={main.image5} />
          </div>
          <div className="column">
            <CompatibleImage imageInfo={main.image6} />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <CompatibleImage imageInfo={main.image7} />
          </div>
          <div className="column">
            <CompatibleImage imageInfo={main.image8} />
          </div>
          {/* <div className="column">
            <PreviewCompatibleImage imageInfo={main.image2} />
          </div> */}
        </div>
        </SRLWrapper>
        </div>
      </div>
    </section>
  </div>
)

GalleryPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  main: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    image1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    image2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    image3: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
  testimonials: PropTypes.array,
  fullImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  pricing: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    plans: PropTypes.array,
  }),
}

const GalleryPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <SimpleReactLightbox>
      <Layout>
        <GalleryPageTemplate
          image={frontmatter.image}
          title={frontmatter.title}
          heading={frontmatter.heading}
          description={frontmatter.description}
          intro={frontmatter.intro}
          main={frontmatter.main}
          testimonials={frontmatter.testimonials}
          // fullImage={frontmatter.full_image}
          pricing={frontmatter.pricing}
        />
      </Layout>
    </SimpleReactLightbox>
  )
}

GalleryPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default GalleryPage

export const GalleryPageQuery = graphql`
  query GalleryPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
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
        main {
          heading
          description
          image1 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 1075, quality: 92) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image2 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 1075, quality: 92) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image3 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 1075, quality: 72) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image4 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 1075, quality: 72) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image5 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 1075, quality: 72) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image6 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 1075, quality: 72) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image7 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 1075, quality: 72) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image8 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 1075, quality: 72) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        testimonials {
          author
          quote
        }
        # full_image {
        #   childImageSharp {
        #     fluid(maxWidth: 2048, quality: 100) {
        #       ...GatsbyImageSharpFluid
        #     }
        #   }
        # }
        pricing {
          heading
          description
          plans {
            description
            items
            plan
            price
          }
        }
      }
    }
  }
`
