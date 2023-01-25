import { HeartTwoTone } from '@ant-design/icons'
import { Space } from 'antd'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

import { IArticle } from '../../interfaces/article'
import avatar from '../../assets/images/Avatar.svg'

import classes from './Post.module.scss'

interface ArticleProps {
  article: IArticle
}

const Post: React.FC<ArticleProps> = ({ article }) => {
  const { slug, title, favoritesCount, tagList, description, author, updatedAt } = article
  return (
    <section className={classes['card-container']}>
      <div className={classes['info-wrap']}>
        <div className={classes['wrap']}>
          <Link to={`articles/${slug}`} className={classes['title']}>
            {title.length > 35 ? `${title.slice(0, 35)}…` : title}
          </Link>
          <div className={classes['like-container']}>
            <Space>
              <HeartTwoTone twoToneColor="red" style={{ cursor: 'pointer' }} />
            </Space>
            <span className={classes['counter']}>{favoritesCount}</span>
          </div>
        </div>
        <ul className={classes['tag-list']} style={tagList.length ? { display: 'flex' } : { display: 'none' }}>
          {tagList.map((tag: string, index: number) => (
            <li className={classes['tag']} key={index}>
              {tag.length > 35 ? `${tag.slice(0, 35)}…` : tag}
            </li>
          ))}
        </ul>
        <div className={classes['content']}>
          {description.length > 100 ? `${description.slice(0, 100)}…` : description}
        </div>
      </div>
      <div className={classes['user-info']}>
        <div className={classes['wrap']}>
          <div className={classes['nicname']}>{author.username}</div>
          <div className={classes['data']}>{format(new Date(updatedAt), 'MMMM d, yyyy')}</div>
        </div>
        <img src={author.image ?? avatar} alt="avatar" className={classes['avatar']} />
      </div>
    </section>
  )
}

export default Post
