import React from 'react'
import getUsername from '../api/auth/jwtHandler'
import Link from 'next/link'

const Navbar = async () => {
  const username = await getUsername()
  
  return (
    <div>
      {username}
      <Link href="/signout">
        Sign out
      </Link>
    </div>
  )

}

export default Navbar