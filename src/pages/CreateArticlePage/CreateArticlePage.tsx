import FormNewArticle from '../../components/FormNewArticle/FormNewArticle'

import classes from './CreateArticlePage.module.scss'

const CreateArticlePage: React.FC = () => {
  return (
    <section className={classes['container']}>
      <FormNewArticle
        title={'Create new article'}
        titleArticle={undefined}
        description={undefined}
        body={undefined}
        tagList={undefined}
        slug={undefined}
      ></FormNewArticle>
    </section>
  )
}

export default CreateArticlePage
