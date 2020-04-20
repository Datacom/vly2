import { Menu } from 'antd'
import Link from 'next/link'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useWindowSize } from '../../lib/useWindowSize'
import { useRouter } from 'next/router'

const { SubMenu, Item } = Menu

const VMenu = styled(Menu)`
  border-bottom: none;
  border-right: none;

  .ant-menu-item {
    border: none;
    height: 100%;
  }

  @media screen and (max-width: 767px) {
      // display: none;
  }
`

const LinkText = styled.a`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 4px;
`

export const NavigationH = ({ items }) => {
  const router = useRouter()
  const activeItem = router.pathname.slice(1)
  return (
    <VMenu
      theme='light'
      mode='horizontal'
      style={{ float: 'right', height: 56 }}
      selectedKeys={[activeItem]}
    >
      {items.map(item => {
        let href = item.href;
        if(item.key === 'hsignin') {
          href = `/auth/sign-thru?redirect=${location.pathname}`;
        }

        return (
          <Menu.Item key={item.key}>
            <Link key={item.href} href={href}>
              <LinkText>
                <a>{item.text}</a>
              </LinkText>
            </Link>
          </Menu.Item>
        )
      })}

    </VMenu>
  )
}
export const NavigationV = ({ items }) => {
  const router = useRouter()
  const activeItem = router.pathname.slice(1)
  return (
    <VMenu
      theme='light'
      mode='inline'
      // style={{ float: 'right' }}
      selectedKeys={[activeItem]}
    >
      <SubMenu
        key='sub1'
        title='Menu'
        style={{ textAlign: 'right', fontWeight: '700' }}
      >
        {items.map(item => (
          <Item key={item.key}>
            <Link key={item.href} href={item.href}>
              <a>{item.text}</a>
            </Link>
          </Item>
        ))}
      </SubMenu>

    </VMenu>
  )
}

const COLLAPSE_MENU_WIDTH = 767
const Navigation = (props) => {
  const [width] = useWindowSize()
  return (width < COLLAPSE_MENU_WIDTH)
    ? <NavigationV {...props} />
    : <NavigationH {...props} />
}

Navigation.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      url: PropTypes.string
    })
  ),
  defaultItem: PropTypes.string
}

export default Navigation
