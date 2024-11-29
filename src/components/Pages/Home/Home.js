import React from 'react'
import Button from '../../UI/Button'
import BgCover from '../../UI/BgCover'
import Dashboard from '../Dashboard/Dashboard'

const Home = () => {
  return (
    <div className='PageContent overflow-auto'>
    <div className='flex justify-between py-2 items-center'>
    <div className='PageTitle'>Home</div>
    {/* <Button>+ Home</Button> */}
    </div>
    {/* <BgCover>
    the is what we need
    </BgCover> */}
    <Dashboard />
    </div>
  )
}

export default Home