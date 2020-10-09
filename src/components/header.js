import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import ToggleMode from './Atoms/ToggleMode';
import MenuContainer from './Atoms/MenuContainer'
const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `transparent`,
      marginBottom: `1.45rem`,
    }}
  >

    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem'
      }}
    >
      <MenuContainer />
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `gray`,
            textDecoration: `none`,
            fontFamily: 'brandon-grotesque, sans-serif'
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <ToggleMode />
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
