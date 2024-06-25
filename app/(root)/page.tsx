import BalanceBox from '@/components/ui/BalanceBox'
import HomeBox from '@/components/ui/HomeBox'
import RightSideBar from '@/components/ui/RightSideBar'
import React from 'react'

const Home = () => {
  const loggedIn = {firstName: "Atharva",lastName: "K",email:"ContactMe@gmail.com"}

  return (
    <section className=' home'>
        <div className='home-content'>
            <header className='home-header'>
               <HomeBox type='greeting' title='Welcome' user={loggedIn?.firstName || "guest"} subtext="Manage all your finances in one place." />
               <BalanceBox totalBanks={1} totalCurrentBalance={2332.45} accounts={[]}/>
            </header>
            
            RECENT TRANSACTIONS
        </div>

      <RightSideBar 
      user={loggedIn}
      transactions={[]}
          banks={[{currentBalance:223.34},{currentBalance:23234.32}]}
      />
    </section>
  )
}

export default Home