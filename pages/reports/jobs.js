import publicPage from '../../hocs/publicPage'
import { FullPage } from '../../components/VTheme/VTheme'
import { useState, useEffect } from 'react'
import callApi from '../../lib/callApi'
import { Button, List, Statistic, Table } from 'antd'
import cuid from 'cuid'

const Report = () => {
  const initSummary = {
    Person: { total: 0 },
    Activity: { total: 0 },
    Interest: { total: 0, status: {} },
    Member: { total: 0, status: {} },
    Opportunity: { total: 0, type: {} },
    Organisation: { total: 0, role: {} }
  }
  const [summary, setSummary] = useState(initSummary)
  const [resets, setResets] = useState('')

  useEffect(() => {
    const getSummaryCounts = async () => {
      const summary = await callApi('reports/summary')
      setSummary(summary)
    }
    getSummaryCounts()
  }, [resets])

  console.log(summary);

  const stats = [
    { label: 'People', value: summary.Person.total },
    { label: 'Jobs', value: summary.Activity.total },
    { label: 'Listings', value: summary.Opportunity.total },
    { label: 'Members', value: summary.Member.total }
  ]

  return (
    <FullPage>
      <h1>Summary Report</h1>
      <Button
        style={{ position: 'relative', top: -50, left: '15em' }}
        shape='round'
        type='primary'
        onClick={() => setResets(cuid())}
      >
        Reload
      </Button>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={stats}
        style={{ textAlign: 'center' }}
        renderItem={item => (
          <List.Item>
            <Statistic title={item.label} value={item.value} />
          </List.Item>
        )}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', background: '#f0f0f0' }}>
        {[1,2,3,4,5,6].map(i => (<img key={i} style={{ minWidth: 300, width: '30%' }} src={`/static/img/vocationally/charts/${i}.png`}/>))}
      </div>
    </FullPage>
  )
}

export default publicPage(Report)
