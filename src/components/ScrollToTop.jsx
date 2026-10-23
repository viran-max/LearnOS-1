import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// scrolls the window to the top on every route change - React Router
// doesn't do this automatically, unlike traditional multi-page sites
const ScrollToTop = () => {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop