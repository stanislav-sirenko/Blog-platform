import { useState } from 'react'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

import { fetchLikeArticle } from '../../store/slices/services'
import { useAppDispatch, useAppSelector } from '../../assets/hooks/hooksByTS'
import { IArticle } from '../../interfaces/article'
import avatar from '../../assets/images/Avatar.svg'

import classes from './Post.module.scss'

interface ArticleProps {
  article: IArticle
}

const Post: React.FC<ArticleProps> = ({ article }) => {
  const { slug, title, favoritesCount, tagList, description, author, updatedAt, favorited } = article
  const { isAuth } = useAppSelector((state) => state.user)
  const [like, setLike] = useState(favorited)
  const [count, setCount] = useState(favoritesCount)
  const dispatch = useAppDispatch()

  return (
    <section className={classes['card-container']}>
      <div className={classes['info-wrap']}>
        <div className={classes['wrap']}>
          <Link to={`articles/${slug}`} className={classes['title']}>
            {title?.length > 35 ? `${title.slice(0, 35)}…` : title}
          </Link>
          <div className={classes['like-container']}>
            <button
              className={classes['like']}
              onClick={() => {
                setLike(!like)
                setCount(like ? count - 1 : count + 1)
                dispatch(fetchLikeArticle([like, slug]))
              }}
            >
              {like && isAuth ? (
                <HeartFilled style={{ cursor: 'pointer', marginRight: '5px', fontSize: '16px', color: 'red' }} />
              ) : (
                <HeartOutlined
                  style={{
                    cursor: 'pointer',
                    marginRight: '5px',
                    fontSize: '16px',
                    color: 'rgba(0, 0, 0, .75)',
                  }}
                />
              )}
            </button>
            <span className={classes['counter']}>{count}</span>
          </div>
        </div>
        <ul className={classes['tag-list']} style={tagList.length ? { display: 'flex' } : { display: 'none' }}>
          {tagList.map((tag: string, index: number) => (
            <li className={classes['tag']} key={index}>
              {tag?.length > 35 ? `${tag.slice(0, 35)}…` : tag}
            </li>
          ))}
        </ul>
        <div className={classes['content']}>
          {description?.length > 100 ? `${description.slice(0, 100)}…` : description}
        </div>
      </div>
      <div className={classes['user-info']}>
        <div className={classes['wrap']}>
          <div className={classes['nicname']}>{author.username}</div>
          <div className={classes['data']}>{format(new Date(updatedAt), 'MMMM d, yyyy')}</div>
        </div>
        <img src={author?.image ?? avatar} alt="avatar" className={classes['avatar']} />
      </div>
    </section>
  )
}

export default Post
