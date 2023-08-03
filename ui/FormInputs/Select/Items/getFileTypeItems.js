import _compact from 'lodash/compact'
import _concat from 'lodash/concat'
import _map from 'lodash/map'

import config from 'config'
import ACCOUNT_TYPES from 'var/accountTypes'
import DATA_KEYS from 'var/dataKeys'
import { OTHER_DOCUMENT } from 'var/files/documentTypes'
import DOC_FILE_TYPES from 'var/files/docFileTypes'
import disabledOption from 'ui/FormInputs/Select/Items/disabledOption'

const getFileTypeItems = ({ accountType, isCompliance }) => {
  const FILES = _compact([
    isCompliance ? DOC_FILE_TYPES.SECURITIES_MEMBERS : '',
    isCompliance ? DOC_FILE_TYPES.SECURITIES_SOLE_OWNER : '',
    DOC_FILE_TYPES.PASSPORT,
    DOC_FILE_TYPES.IDENTITY_FRONT,
    DOC_FILE_TYPES.IDENTITY_BACK,
    DOC_FILE_TYPES.DRIVER_FRONT,
    DOC_FILE_TYPES.DRIVER_BACK,
    DOC_FILE_TYPES.OTHER_FRONT,
    DOC_FILE_TYPES.OTHER_BACK,
    DOC_FILE_TYPES.PROOF_OF_RES,
    accountType === ACCOUNT_TYPES.CORPORATE ? DOC_FILE_TYPES.PROOF_OF_BUSINESS_ADDRESS : '',
    isCompliance ? DOC_FILE_TYPES.VIDEO_CALL : '',
    DOC_FILE_TYPES.BANK_STATEMENT,
    accountType === ACCOUNT_TYPES.INDIVIDUAL ? DOC_FILE_TYPES.EMPLOYMENT : '',
    DOC_FILE_TYPES.SOURCE_OF_FUNDS,
    isCompliance ? DOC_FILE_TYPES.EMAIL_CORRESPONDENCE : '',
    DOC_FILE_TYPES.SELFIE,
    DOC_FILE_TYPES.TAX_FORM,
    DOC_FILE_TYPES.ECP_LETTER,
    DOC_FILE_TYPES.ECP_PROOF_OF_ASSETS,
    config.kycForm ? DOC_FILE_TYPES.KYC : '',
    isCompliance ? DOC_FILE_TYPES.UNFREEZE : '',
  ])

  const files =
    accountType === ACCOUNT_TYPES.INDIVIDUAL ? FILES : [...DATA_KEYS.CORPORATE_FILES, ...FILES]

  return [
    ...(isCompliance
      ? [{ value: '' }]
      : [{ value: '', label: 'select_document_type' }, { ...disabledOption, id: 'divider-start' }]),
    ..._map(_concat(files), (fileType) => ({ value: fileType, label: `default_files.${fileType}` })),
    { ...disabledOption, id: 'divider-end' },
    { value: OTHER_DOCUMENT, label: 'other_document' },
  ]
}

export default getFileTypeItems
