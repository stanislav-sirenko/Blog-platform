import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { HeartTwoTone } from '@ant-design/icons'
import { Space, Spin } from 'antd'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'

import { useAppDispatch, useAppSelector } from '../../assets/hooks/hooksByTS'
import { fetchArticle } from '../../store/slices/services'

import classes from './SinglePage.module.scss'

const SinglePage: React.FC = () => {
  const { slug } = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchArticle(slug))
  }, [slug])

  const { title, favoritesCount, tagList, body, description, author, updatedAt } = useAppSelector(
    (state) => state.articles.article
  )
  const { status } = useAppSelector((state) => state.articles)

  return (
    <>
      {status ? (
        <Space size="large">
          <Spin size="large" style={{ position: 'absolute', top: '50%', left: '50%' }} />
        </Space>
      ) : (
        <section className={classes['card-container']}>
          <div className={classes['info-wrap']}>
            <div className={classes['wrap']}>
              <span className={classes['title']}>{title}</span>
              <div className={classes['like-container']}>
                <Space>
                  <HeartTwoTone twoToneColor="red" style={{ cursor: 'pointer' }} />
                </Space>
                <span className={classes['counter']}>{favoritesCount}</span>
              </div>
            </div>
            <ul className={classes['tag-list']} style={tagList.length ? { display: 'flex' } : { display: 'none' }}>
              {tagList.map((tag, index) => (
                <li className={classes['tag']} key={index}>
                  {tag}
                </li>
              ))}
            </ul>
            <div className={classes['content']}>{description}</div>
          </div>
          <div className={classes['user-info']}>
            <div className={classes['wrap']}>
              <div className={classes['nicname']}>{author.username}</div>
              <div className={classes['data']}>{updatedAt && format(new Date(updatedAt), 'MMMM d, yyyy')}</div>
            </div>
            <img src={author.image} alt="avatar" className={classes['avatar']} />
          </div>
          <div className={classes['body-content']}>
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
        </section>
      )}
    </>
  )
}

export default SinglePage
