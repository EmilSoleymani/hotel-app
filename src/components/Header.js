import { useEffect, useState } from 'react'

const productionURL = "https://og2z1zbw80.execute-api.us-east-2.amazonaws.com/Production"

const Header = () => {
  const [menuLinksData, setMenuLinksData] = useState([])

  const loadMenuLinksData = async() => {
    // Query API Gateway
    const response = await fetch(productionURL + "/menuLinks")
    let jsonData = await response.json()

    // Assign response data to our state variable
    setMenuLinksData(jsonData)
  }

  useEffect(() => {
    // Load menu links data from API Gateway
    loadMenuLinksData()
  }, [])

  return (
    <header id="intro">
        <article className="fullheight">
        <div className="hgroup">
            <h1>Landon Hotel</h1>
            <h2>West London</h2>
            <p><a href="#welcome"><img src="https://landonhotel.com/images/misc/arrow.png" alt="down arrow" /></a></p>
        </div>
        </article>

        <nav id="nav">
        <div className="navbar">
            <div className="brand"><a href="#welcome">Landon <span>Hotel</span></a></div>
            <ul>
              {
                menuLinksData.map((link, key) => 
                  <li key={key}><a className={`icon ${link.class}`} href={link.href}><span>{link.text}</span></a></li>
                )
              }
            </ul>
        </div>
        </nav>
    </header>
  )
}

export default Header