import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Pages/home'
import AboutMe from './Pages/aboutMe'
import Parents from './Pages/family/Parents'
import Sibling from './Pages/family/Sibling'
import Wife from './Pages/family/Wife'
import Son from './Pages/family/Son'
import Grandchildren from './Pages/family/Grandchildren'
import Career from './Pages/career'
import Padmabhushan from './Pages/awards/Padmabhushan'
import RajyotsavaAward from './Pages/awards/RajyotsavaAward'
import Interview from './Pages/interview'
import Article from './Pages/article'
import Books from './Pages/books'
import VIPs from './Pages/vips'
import PrivacyPolicy from './Pages/privacyPolicy'
import TermsAndConditions from './Pages/termsAndConditions'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/family/parents" element={<Parents />} />
        <Route path="/family/sibling" element={<Sibling />} />
        <Route path="/family/wife" element={<Wife />} />
        <Route path="/family/son" element={<Son />} />
        <Route path="/family/grandchildren" element={<Grandchildren />} />
        <Route path="/career" element={<Career />} />
        <Route path="/awards/padmabhushan" element={<Padmabhushan />} />
        <Route path="/awards/rajyotsava-award" element={<RajyotsavaAward />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/article" element={<Article />} />
        <Route path="/books" element={<Books />} />
        <Route path="/vips" element={<VIPs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
    </Router>
  )
}

export default App