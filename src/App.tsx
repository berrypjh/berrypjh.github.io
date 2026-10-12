import { SiteHeader } from './components/SiteHeader'
import { Hero } from './sections/home/Hero'
import { ShowcaseSection } from './sections/project/ShowcaseSection'
import { SHOWCASES } from './sections/project/showcase'
import { Lab } from './sections/lab/Lab'
import { About } from './sections/about/About'
import { Contact } from './sections/contact/Contact'
import { SiteFooter } from './sections/contact/SiteFooter'

export default function App() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        {SHOWCASES.map((showcase, i) => (
          <ShowcaseSection showcase={showcase} number={3 + i} glow={i % 2 ? 'left' : 'right'} key={showcase.id} />
        ))}
        <Lab />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
