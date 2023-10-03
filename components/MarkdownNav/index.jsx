"use client";
import MarkNav from "markdown-navbar";
import "markdown-navbar/dist/navbar.css";

const MarkdownNav = (props) => {
  const { content } = props;

  return (
    <div>
      <MarkNav source={content} headingTopOffset={60} ordered={false}></MarkNav>
    </div>
  );
};

export default MarkdownNav;
