import Landing from './landing/landing'
import Home from './home/home'
import { getSession } from '../lib/auth/auth'

const SHOW_LANDING = true;

const RootPage = (props) => {
  return (
    <>
      {(props.isAuthenticated && !SHOW_LANDING)
        ? <Home {...props} />
        : <Landing {...props} />}
    </>)
}

RootPage.getInitialProps = async (ctx) => {
  const session = await getSession(ctx.req, ctx.store)
  const page = (session.isAuthenticated && !SHOW_LANDING) ? Home : Landing
  if (page.getInitialProps) {
    const pageProps = await page.getInitialProps(ctx)
    return pageProps
  }
}

export default RootPage
