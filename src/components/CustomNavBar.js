import styled from "styled-components"
import { NavLink, Link } from "react-router-dom";

export const CustomNavBar = ({children}) => {
  return (
      <CustomNavContainer bg="light" expand="lg">
        <div className="nav-menu">
            <Link className="title" to="/">DXL</Link>
              <CustomNavlink to="/">
                Basics
              </CustomNavlink>
              <CustomNavlink to="/headers">
                Headers
              </CustomNavlink>
              <CustomNavlink to="/inrequest">
                In Request
              </CustomNavlink>
              <CustomNavlink to="/outrequest">
                Out Request
              </CustomNavlink>
              <CustomNavlink to="/requestmap">
                Request map
              </CustomNavlink>
              <CustomNavlink to="/statics">
                Statics
              </CustomNavlink>
              <CustomNavlink to="/outresponse">
                Out Response
              </CustomNavlink>
              <CustomNavlink to="/inreponse">
                In Response
              </CustomNavlink>
              <CustomNavlink to="/responsemap">
                Response map
              </CustomNavlink>
              <CustomNavlink to="/success">
                OK Check
              </CustomNavlink>
              <CustomNavlink to="/complete">
                Complete
              </CustomNavlink>
        </div>
        <div className="content">
          {children}
        </div>
      </CustomNavContainer>
  );
};


const CustomNavContainer = styled.div`
  display: flex;
  border: 2px solid #000000;
  margin: 2em;
  .nav-menu {
    width: 20%;
    display: flex;
    flex-direction: column;
    background-color: #000000;
    padding: 1em;
    .title {
      text-decoration: none;
      font-size: 2em;
      color: #0d47a1;
      &:hover{
        color: #0d47a1;
      }
    }
  }
  .content {
    flex-grow: 1;
    display: flex;
  }
`

const CustomNavlink = styled(NavLink)`
  color: #ffffff;
  text-decoration: none;
  background-color: #444444;
  margin: 0.25em 0;
  padding: 0.5em 1em;
  &.active {
    background-color: #ffffff;
    color: #000000;
    margin-right: -1em;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  &:hover{
    background-color: #ffffff;
    color: #000000;
  }
`