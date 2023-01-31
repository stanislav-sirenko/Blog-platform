import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { HeartTwoTone } from '@ant-design/icons'
import { Space, Spin, Button, Popconfirm } from 'antd'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'

import { togglePage } from '../../store/slices/articleSlice'
import { useAppDispatch, useAppSelector } from '../../assets/hooks/hooksByTS'
import { fetchArticle, fetchDeleteArticle } from '../../store/slices/services'

import classes from './SinglePage.module.scss'

const SinglePage: React.FC = () => {
  const { isAuth } = useAppSelector((state) => state.user)
  const { username } = useAppSelector((state) => state.user.user)
  const { status, deleted } = useAppSelector((state) => state.articles)

  const { slug } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchArticle(slug))
  }, [slug])

  useEffect(() => {
    if (deleted) {
      navigate('/', { replace: true })
    }
  }, [deleted])

  const { title, favoritesCount, tagList, body, description, author, updatedAt } = useAppSelector(
    (state) => state.articles.article
  )

  const confirm = () => {
    dispatch(fetchDeleteArticle(slug))
    dispatch(togglePage(1))
  }

  // const cancel = () => {}

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
            {isAuth && username === author.username && (
              <div className={classes['wrap-btn']}>
                <Popconfirm
                  placement="right"
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={confirm}
                  // onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" danger ghost className={classes['delete']} style={{ marginRight: '8px' }}>
                    Delete
                  </Button>
                </Popconfirm>

                <Link to={`/articles/${slug}/edit`} className={classes['edit']}>
                  Edit
                </Link>
              </div>
            )}
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
