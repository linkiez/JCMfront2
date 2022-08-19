export interface Arquivo {
  id?: number
  url?: string
  originalFilename?: string
  newFilename?: string
  mimeType?: string
  bucket?: string
  region?: string
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
}
