import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
         <section className="hero hero--image"   id="rie">
         <div
            className="hero__image"
            style={{
              backgroundImage: `url('/img/blog-index.jpg')`,
            }}
          > 
              <div className="row row--narrow">
                <div className="hero__content">
                  <h1
                    className="hero__title">
                     Latest Stories
                  </h1>
                </div>
              </div>
          </div>
         </section>
        <section className="section">
          <div className="container">
            <div className="content">
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
