export const acceptedFilesExtentions = {
  img: [
    ".jpeg",
    ".jpg",
    ".png",
    ".webp",
  ],
  audio: [
    ".mp3"
  ],
  video: [
    ".mp4",
    ".webm",
    ".weba",
    ".avi",
  ],
  doc: [
    ".pdf",
    ".doc",
    ".docx",
    ".ppt",
    ".pptx",
    ".xls",
    ".xlsx",
    ".csv",
    ".txt"
  ],
  others: [
    ".rar",
    ".zip",
  ]
}

export const acceptedFilesExtentionsAll = [
  ...acceptedFilesExtentions.img,
  ...acceptedFilesExtentions.audio,
  ...acceptedFilesExtentions.video,
  ...acceptedFilesExtentions.doc,
  ...acceptedFilesExtentions.others,
]

export const fileUpload = {
  maxSizeInByte: 300000000, // 300mb
  maxSizeInByteImage: 10000000, // 10mb
}