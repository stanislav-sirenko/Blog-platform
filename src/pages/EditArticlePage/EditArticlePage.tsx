import { useParams } from 'react-router-dom'

import FormNewArticle from '../../components/FormNewArticle/FormNewArticle'
import { useAppSelector } from '../../assets/hooks/hooksByTS'

import classes from './EditArticlePage.module.scss'

const EditArticlePage: React.FC = () => {
  const { article } = useAppSelector((state) => state.articles)
  const { slug } = useParams()
  console.log(slug)
  const x = 'dasnh'
  return (
    <section className={classes['container']}>
      <FormNewArticle
        title={'Edit article'}
        titleArticle={article.title}
        description={article.description}
        body={article.body}
        tagList={article.tagList.map((tag: string) => ({ name: tag }))}
        slug={slug}
      ></FormNewArticle>
    </section>
  )
}

export default EditArticlePage
