import store from 'store'

import { saveDataAction } from 'store/actions/data.actions'

const getAccountId = (form) => form.split('_')[1]

// expects account id to be encoded into form name after underscore
const submitFile = ({
  data,
  file,
  form,
  onSuccess,
  updateFileData,
}) => {
  const { dispatch } = store

  const _id = getAccountId(form)

  const onSubmitSuccess = (response) => {
    const documentData = {
      ...file,
      ...response.documents[0],
      filename: file.data.name,
    }
    updateFileData(documentData)
    onSuccess({ response, form })
  }

  dispatch(saveDataAction({
    _id,
    data,
    files: [file],
    onSuccess: onSubmitSuccess,
    successMessageI18n: 'toasts.document_uploaded',
  }))
}

export default submitFile
