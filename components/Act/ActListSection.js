
import { useState, useEffect } from 'react'
import reduxApi from '../../lib/redux/reduxApi'
import { useDispatch, useSelector } from 'react-redux'
import ActSearchInput from './ActSearchInput'
import ActMenu from './ActMenu'
import ActCard from './ActCard'
import styled from 'styled-components'
import { List } from 'antd'
import { useRouter } from 'next/router'

const escapeRegex = require('../../server/util/regexUtil')

export const SidebarGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 18.5rem 1fr;
  grid-gap: 2rem;
  overflow: visible;

  @media screen and (min-width: 768px) and (max-width: 1280px) {
    grid-template-columns: none;
    justify-content: start;
    justify-items: center;
  }

  @media screen and (max-width: 767px) {
    grid-template-columns: calc(100vw - 2rem);
    grid-gap: 0rem;
  }
` // end grid

/**
 * initial filter passed in from page URL params
 * @param {*} filter format { search: 'keywords', orgs: [offerOrgs]}
 */
export const ActListSection = () => {
  const router = useRouter()
  const [search, setSearch] = useState(router.query.search)
  const [selectedOrg, setSelectedOrg] = useState()

  const activities = useSelector(
    state => state.activities // list of ops I own
  )
  const dispatch = useDispatch()

  useEffect(() => {
    const getActivities = async () => {
      const query = { }
      if (search) {
        query.search = search
      }
      if (selectedOrg) {
        query.q = JSON.stringify({ offerOrg: selectedOrg })
      }
      await dispatch(reduxApi.actions.activities.get(query))
    }
    getActivities()
  }, [search, selectedOrg])

  const handleSearch = e => {
    setSearch(e)
    if (e) {
      const value = escapeRegex(e)
      history.replaceState({ search: value }, `Search results for ${value}`, `?search=${value}`)
      // router.replace(router.pathname, { query: { search: value } }, { shallow: true })
    }
  }

  const handleMenu = e => {
    // toggle the selected org
    setSelectedOrg(selectedOrg === e.key ? null : (e.key))
  }
  const acts = activities.data

  return (
    <>
      <ActSearchInput value={search} onSearch={handleSearch} loading={activities.loading} />
      <SidebarGrid>
        <ActMenu acts={acts} onClick={handleMenu} />
        <List
          // grid={{ gutter: 16, column: 3 }}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 3
          }}
          dataSource={acts}
          loading={activities.loading}
          pagination={{
            defaultCurrent: 1,
            defaultPageSize: 12,
            hideOnSinglePage: true
            // size: 'small'
          }}
          renderItem={(act) => (
            <List.Item>
              <ActCard act={act} />
            </List.Item>
          )}
        />,
      </SidebarGrid>
    </>
  )
}

export default ActListSection
