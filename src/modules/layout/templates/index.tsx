import React from "react"

import Nav from "@modules/layout/templates/nav"
import Newsletter from "@modules/layout/templates/newsletter"
import Footer from "@modules/layout/templates/footer"

const Layout: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <div>
      <Nav />
      <main className="relative">{children}</main>
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Layout
