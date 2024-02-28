import { Footer } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

function FooterCmp() {
  return (
    <Footer container className="border border-t-8 border-blue-300">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div>
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Vikas's
              </span>
              Blogs
            </Link>
            <div className="grid grid-cols-2 gap-3 sm: mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <Footer.Title title="About" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="https://github.com/vikasRawat"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Git-Hub
                  </Footer.Link>
                  <Footer.Link
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Blog Reccomandation
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Follow Us" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="https://github.com/vikasRawt"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Git-Hub
                  </Footer.Link>
                  <Footer.Link
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterCmp;
