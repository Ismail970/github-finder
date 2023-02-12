import { useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Spinner from '../shared/Spinner'
import UserItem from './UserItem'
import GithubContext from '../../context/github/GithubContext'

function UserResaults () {
  const { users, loading } = useContext(GithubContext)

  if (!loading) {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        <AnimatePresence>
          {users.map(user => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              layout
            >
              <UserItem key={user.id} user={user} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    )
  } else {
    return <Spinner />
  }

}

export default UserResaults