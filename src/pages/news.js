import { Card } from "@mui/material"
import React from "react"
// import NavBar from "../components/global-components/navbar/index";
import { graphql, Link } from "gatsby"
import "../components/news.css"
import { NavBar } from "../components"
function News({ data }) {
  console.log("data >>", data)
  //for removing <p> and </p> 
  var replaceChars={ "<p>":"" , "</p>":" " };
  return (
    <div className="news">
      <NavBar />
      <div className="news-content">
        <Card className="card-scroll-content ">
          <h1>Aktuella artiklar om hemstäd</h1>
          <h3 style={{ width: "80%", margin: "0 auto", marginBottom: "2rem" }}>
            Här hittar du aktuella artiklar för dig som är intresserad av att
            förstå städbranschen. Läs det senaste som påverkar dig som konsument
            och privatperson och få bra tips som gör det enklare att komma
            igång.
          </h3>
          {data.allWpPost.edges.map(val => {
         
            return (
              <Link to={`/news/${val.node.slug}`}>
                <Card className="news-posts">
                  <div className="news-img-left">
                    <img
                      style={{ width: "100%" }}
                      src={val.node.featuredImage}
                    ></img>
                  </div>
                  <div className="news-right">
                    <h1>{val.node.title}</h1>
                    <p>
                      {val.node.content.replace(/<p>|<\/p>/g,function(match) {return replaceChars[match];})}
                    </p>
                  </div>
                </Card>
                <br />
              </Link>
            )
          })}
        </Card>
      </div>
    </div>
  )
}

export default News
export const query = graphql`
  query {
    allWpPost {
      edges {
        node {
          title
          slug
          featuredImage {
            node {
              sourceUrl
              description
            }
          }
          content
        }
      }
    }
  }
`
