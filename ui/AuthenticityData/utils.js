import _get from 'lodash/get'
import _filter from 'lodash/filter'
import _reduce from 'lodash/reduce'
import _isEmpty from 'lodash/isEmpty'
import { AUTHENTICITY_TYPES } from 'var/authenticityTypes'

const getFormattedProcessedImage = (PageProcessingResult, options = {}) => {
  const { isResume = false } = options
  const ProcessedImage = _get(PageProcessingResult, ['ProcessedImages', '0']) || {}
  if (_isEmpty(ProcessedImage)) {
    return {}
  }

  const {
    EquipmentMaker,
    EquipmentModel,
    FileName,
    ImageCreationDateTime,
    CroppedHeight,
    CroppedWidth,
    QualityBeforeAdjustment,
  } = ProcessedImage

  const FailedQualityBeforeAdjustment = _reduce(
    QualityBeforeAdjustment,
    (acc, isPassed, key) => {
      if (!isPassed) {
        acc.push(key)
      }
      return acc
    },
    [],
  )

  const formattedData = {
    EquipmentMaker,
    EquipmentModel,
    FileName,
    ImageCreationDateTime,
  }

  if (isResume) {
    formattedData.CroppedHeight = CroppedHeight
    formattedData.CroppedWidth = CroppedWidth
  }

  if (FailedQualityBeforeAdjustment.length) {
    formattedData.FailedQualityBeforeAdjustment = FailedQualityBeforeAdjustment
  }

  return formattedData
}

const getFormattedProcessedImages = (PageProcessingResults, options = {}) => {
  const { isResume = false } = options
  const ProcessedImage1 = getFormattedProcessedImage(PageProcessingResults[0], { isResume })
  const ProcessedImage2 = getFormattedProcessedImage(PageProcessingResults[1], { isResume })

  const data = {}

  if (!_isEmpty(ProcessedImage1)) {
    const attributeKey = _isEmpty(ProcessedImage2) ? 'ProcessedImage' : 'ProcessedImage1'
    data[attributeKey] = ProcessedImage1
  }
  if (!_isEmpty(ProcessedImage2)) {
    data.ProcessedImage2 = ProcessedImage2
  }

  return data
}

const getFormattedAuthenticity = (authenticity, selfie) => {
  if (authenticity === AUTHENTICITY_TYPES.PASSED && selfie === AUTHENTICITY_TYPES.PASSED) {
    return 'Document and selfie passed'
  }

  return `Document ${authenticity}, face comparison ${selfie}`
}

const getFormattedForgery = (tests) => {
  const failedForgeryTestTypes = _filter(tests, (test) => {
    const { TestResult } = test
    return !['Authentic', 'NotRelevant'].includes(TestResult)
  }).map((test) => test.ForgerySubtype)

  if (!failedForgeryTestTypes.length) {
    return 'none failed'
  }

  return `[${failedForgeryTestTypes.join(', ')}] failed`
}

const getFormattedOverallQuality = (quality) => {
  switch (quality) {
    case 'Acceptable':
      return 'acceptable'
    case 'NotAcceptable':
      return 'not acceptable'
    default:
      return quality
  }
}

const getProofOfAddressReport = (main) => {
  const proofOfAddressReportData = _get(main, [
    'ProofOfAddressReport',
    'ResidentialAddressSimilarityReport',
    '0',
  ])
  const {
    IsAddressMatch, IsFullNameMatch, IsValidByDate, NameConfidence,
  } =
    proofOfAddressReportData || {}
  return proofOfAddressReportData
    ? {
      IsAddressMatch,
      IsFullNameMatch,
      IsValidByDate,
      NameConfidence,
    }
    : undefined
}

const getFormattedData = (data) => {
  const { authenticity, selfie } = data
  const main = data.main || {}
  const CompletionStatus = _get(main, ['CompletionStatus'])
  const CompletionTime = _get(main, ['CompletionTime'])
  const DocumentTypeDescriptor =
    _get(data, ['main', 'ProcessingResult', 'DocumentTypeDescriptor']) || {}
  const {
    CountryIso3, DocumentType, DocumentVersion, State,
  } = DocumentTypeDescriptor

  const ForgeryTests = _get(main, ['ProcessingResult', 'ForgeryTests']) || []
  const OverallQuality = _get(main, ['ProcessingResult', 'OverallQuality'])
  const PageProcessingResults = _get(main, ['ProcessingResult', 'PageProcessingResults']) || []
  const processedImages = getFormattedProcessedImages(PageProcessingResults)
  const ProofOfAddressReport = getProofOfAddressReport(main)

  const formattedData = {
    authenticity: getFormattedAuthenticity(authenticity, selfie),
    forgery: getFormattedForgery(ForgeryTests),
    'image quality': getFormattedOverallQuality(OverallQuality),
    CompletionStatus,
    CompletionTime,
    CountryIso3,
    DocumentType,
    DocumentVersion,
    State,
    ProofOfAddressReport,
  }
  Object.assign(formattedData, processedImages)

  return formattedData
}

export const getRecentDocuments = (documents) => {
  const recentDocuments = []
  const presentTypes = {}

  for (let i = documents.length - 1; i >= 0; i--) {
    const { type } = documents[i]
    if (!presentTypes[type]) {
      recentDocuments.unshift(documents[i])
      presentTypes[type] = true
    }
  }

  return recentDocuments
}

const getResume = (data) => {
  const main = data.main || {}
  const {
    CompletionStatus, CompletionTime, DocumentAuthenticity, DocumentId,
  } = main
  const PrimaryProcessingResult = _get(main, ['DocumentStatusReport2', 'PrimaryProcessingResult'])
  const FaceComparisonReportCompletionStatus = _get(main, [
    'FaceComparisonReport',
    'CompletionStatus',
  ])
  const DocumentTypeDescriptor = _get(main, ['ProcessingResult', 'DocumentTypeDescriptor']) || {}
  const ForgeryTests = _get(main, ['ProcessingResult', 'ForgeryTests']) || []
  const PageProcessingResults = _get(main, ['ProcessingResult', 'PageProcessingResults']) || []
  const {
    CountryIso3, DocumentType, DocumentVersion, State,
  } = DocumentTypeDescriptor
  const processedImages = getFormattedProcessedImages(PageProcessingResults, { isResume: true })
  const ProofOfAddressReport = getProofOfAddressReport(main)

  return {
    CompletionStatus,
    CompletionTime,
    DocumentAuthenticity,
    DocumentId,
    PrimaryProcessingResult,
    FaceComparisonReport: {
      CompletionStatus: FaceComparisonReportCompletionStatus,
    },
    CountryIso3,
    DocumentType,
    DocumentVersion,
    State,
    ForgeryTests,
    ProofOfAddressReport,
    ...processedImages,
  }
}

export const getFormattedAuthenticityData = (data) => {
  const formattedData = getFormattedData(data)
  const resume = getResume(data)
  // eslint-disable-next-line no-unused-vars
  const { authenticity, ...documentData } = data

  const jsonDisplay = {
    ...formattedData,
    ...documentData,
    resume,
  }

  return {
    formattedData: jsonDisplay,
    formattedDataShort: formattedData,
  }
}

export default {
  getFormattedAuthenticityData,
  getRecentDocuments,
}
