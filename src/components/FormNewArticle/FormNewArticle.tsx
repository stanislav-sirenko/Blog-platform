import { useEffect } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useForm, useFieldArray } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

import { IFormNewArticle, ProfileNewArticle } from '../../interfaces/article'
import { useAppSelector, useAppDispatch } from '../../assets/hooks/hooksByTS'
import { togglePage } from '../../store/slices/articleSlice'
import { fetchCreateArticle, fetchUpdateArticle } from '../../store/slices/services'

import classes from './FormNewArticle.module.scss'

const FormNewArticle: React.FC<IFormNewArticle> = ({ title, titleArticle, description, body, tagList, slug }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status, create, update } = useAppSelector((state) => state.articles)

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
    getValues,
  } = useForm<ProfileNewArticle>({
    mode: 'onBlur',
    defaultValues: {
      title: titleArticle || '',
      description: description || '',
      body: body || '',
      tagList: tagList || [{ name: '' }],
    },
  })

  const onSubmit = (data: ProfileNewArticle) => {
    const validData = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tagList.map((tag) => tag.name),
      },
    }

    const slugData = {
      validData,
      slug,
    }
    if (slug) {
      dispatch(fetchUpdateArticle(slugData))
      dispatch(togglePage(1))
    } else {
      dispatch(fetchCreateArticle(validData))
      dispatch(togglePage(1))
    }
  }

  useEffect(() => {
    create ? navigate('/', { replace: true }) : update && navigate('/', { replace: true })
  }, [create, update])

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  })

  return (
    <form className={classes['form']} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={classes['title']}>{title}</h2>
      <label className={classes['label']}>
        Title
        <input
          type="text"
          placeholder="Title"
          autoFocus
          {...register('title', {
            required: 'The field is required',
          })}
        />
      </label>
      <span className={classes['error']}>{errors?.title?.message} </span>

      <label className={classes['label']}>
        Short description
        <input
          type="text"
          placeholder="Description"
          {...register('description', {
            required: 'The field is required',
          })}
        />
      </label>
      <span className={classes['error']}>{errors?.description?.message} </span>

      <label className={classes['label']}>
        Text
        <textarea
          placeholder="Text"
          className={classes['area']}
          {...register('body', {
            required: 'The field is required',
          })}
        />
      </label>
      <span className={classes['error']}>{errors?.body?.message} </span>

      <label className={classes['label']}>
        Tags
        <div className={classes['container-tag']}>
          {fields.map((field, index) => (
            <div className={classes['wrap']} key={field.id}>
              <div className={classes['tag-label']}>
                <input
                  type="text"
                  placeholder="Tag"
                  className={classes['tag']}
                  {...register(`tagList.${index}.name`, {
                    required: 'The tag must not be empty, fill in or delete',
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
                      message: 'You can only use English letters and numbers without spaces or other characters',
                    },
                    validate: (tagInputValue) =>
                      !getValues()
                        .tagList.map((tagObject: { name: string }) => tagObject.name)
                        .filter((_, currentChangingTagIndex: number) => index !== currentChangingTagIndex)
                        .includes(tagInputValue) || 'Tags must be unique',
                  })}
                />
                {errors?.tagList?.[index] && (
                  <span className={classes['error']}>{errors?.tagList?.[index]?.name?.message?.toString()}</span>
                )}
              </div>
              <Button
                type="primary"
                danger
                ghost
                className={classes['delete']}
                style={{ marginRight: '8px' }}
                onClick={() => remove(index)}
              >
                Delete
              </Button>
            </div>
          ))}
          <Button
            type="primary"
            ghost
            className={classes['add']}
            onClick={() => {
              append({
                name: '',
              })
            }}
          >
            Add tag
          </Button>
        </div>
      </label>

      <button className={classes['btn']} type="submit" disabled={!isValid}>
        {status ? (
          <ThreeDots
            height="20"
            width="40"
            radius="9"
            color="#fff"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ justifyContent: 'center' }}
            visible={true}
          />
        ) : (
          'Send'
        )}
      </button>
    </form>
  )
}

export default FormNewArticle
