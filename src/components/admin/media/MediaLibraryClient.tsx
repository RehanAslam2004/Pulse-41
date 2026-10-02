'use client'

import React, { useState, useRef } from 'react'
import {
  Image as ImageIcon,
  FileCode,
  Palette,
  UploadCloud,
  Search,
  Grid,
  List,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Eye,
  FileText,
  Video,
  File,
  X,
  AlertCircle,
  Loader2,
  FolderOpen,
} from 'lucide-react'

export interface MediaAsset {
  id: string
  file_name: string
  file_url: string
  file_size: number | null
  mime_type: string | null
  category: string
  uploaded_by: string | null
  created_at: string
}

interface MediaLibraryClientProps {
  initialAssets: MediaAsset[]
  initialCategory?: string
}

const CATEGORIES = [
  { id: 'all', label: 'All Assets', icon: FolderOpen },
  { id: 'images', label: 'Images', icon: ImageIcon },
  { id: 'brand_assets', label: 'Brand Assets', icon: Palette },
  { id: 'documents', label: 'Documents', icon: FileCode },
  { id: 'videos', label: 'Videos', icon: Video },
]

function formatBytes(bytes: number | null, decimals = 1) {
  if (!bytes || bytes === 0) return '0 B'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

function formatDate(iso: string) {
  if (!iso) return '—'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso))
}

export function MediaLibraryClient({
  initialAssets,
  initialCategory = 'all',
}: MediaLibraryClientProps) {
  const [assets, setAssets] = useState<MediaAsset[]>(initialAssets)
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Upload state
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadCategory, setUploadCategory] = useState<string>('images')
  const [uploadProgress, setUploadProgress] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)

  // Preview & Copy modal state
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [previewAsset, setPreviewAsset] = useState<MediaAsset | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Filtered Assets
  const filteredAssets = assets.filter((asset) => {
    const matchesCat =
      activeCategory === 'all' || asset.category === activeCategory
    const matchesSearch =
      !searchQuery.trim() ||
      asset.file_name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  // Copy URL to clipboard
  const handleCopyUrl = async (asset: MediaAsset) => {
    try {
      await navigator.clipboard.writeText(asset.file_url)
      setCopiedId(asset.id)
      setTimeout(() => setCopiedId(null), 2500)
    } catch {
      // Fallback
    }
  }

  // Handle File Upload
  const handleUploadFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return
    setUploading(true)
    setUploadError(null)

    const newUploaded: MediaAsset[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      setUploadProgress(`Uploading ${file.name} (${i + 1}/${files.length})...`)

      const formData = new FormData()
      formData.append('file', file)
      formData.append('category', uploadCategory)

      try {
        const res = await fetch('/api/admin/media', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Failed to upload asset')
        }

        if (data.asset) {
          newUploaded.unshift(data.asset)
        }
      } catch (err: any) {
        console.error('File upload error:', err)
        setUploadError(err.message || 'Error uploading file')
      }
    }

    if (newUploaded.length > 0) {
      setAssets((prev) => [...newUploaded, ...prev])
    }

    setUploading(false)
    setUploadProgress(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Handle Delete Asset
  const handleDeleteAsset = async (asset: MediaAsset) => {
    if (!confirm(`Are you sure you want to permanently delete "${asset.file_name}"?`)) {
      return
    }

    setDeletingId(asset.id)
    try {
      const res = await fetch(`/api/admin/media?id=${asset.id}`, {
        method: 'DELETE',
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete asset')
      }

      setAssets((prev) => prev.filter((a) => a.id !== asset.id))
      if (previewAsset?.id === asset.id) {
        setPreviewAsset(null)
      }
    } catch (err: any) {
      alert(`Deletion failed: ${err.message}`)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Media & Asset Library
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Production assets hosted on Supabase Storage{' '}
            <code className="text-xs bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono">
              pulse41-media
            </code>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files && handleUploadFiles(e.target.files)}
            className="hidden"
            multiple
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <UploadCloud className="w-4 h-4" />
            )}
            Upload Asset
          </button>
        </div>
      </div>

      {/* Drag & Drop Upload Panel */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          if (e.dataTransfer.files) {
            handleUploadFiles(e.dataTransfer.files)
          }
        }}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition ${
          isDragging
            ? 'border-blue-500 bg-blue-50/50'
            : 'border-slate-200 bg-white hover:border-slate-300'
        }`}
      >
        <div className="flex flex-col items-center justify-center max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
            <UploadCloud className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-900">
            Drop files here to upload directly to object storage
          </p>
          <p className="mt-1 text-xs text-slate-500">
            PNG, JPG, WebP, SVG, PDF, MP4 up to 20 MB each
          </p>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
              <span>Category:</span>
              <select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="images">Images</option>
                <option value="brand_assets">Brand Assets</option>
                <option value="documents">Documents</option>
                <option value="videos">Videos</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded transition"
            >
              Browse Files
            </button>
          </div>

          {uploadProgress && (
            <div className="mt-3 flex items-center gap-2 text-xs text-blue-600 font-medium">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>{uploadProgress}</span>
            </div>
          )}

          {uploadError && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-rose-600 font-medium">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}
        </div>
      </div>

      {/* Control Bar: Categories, Search, View Switch */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 md:border-b-0">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon
            const active = activeCategory === cat.id
            const count =
              cat.id === 'all'
                ? assets.length
                : assets.filter((a) => a.category === cat.id).length
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  active
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    active ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Search & Layout toggle */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search file name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded text-xs transition ${
                viewMode === 'grid'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded text-xs transition ${
                viewMode === 'list'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Assets Listing */}
      {filteredAssets.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">No media assets found</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery
              ? `No files matching "${searchQuery}". Clear your search query.`
              : 'Upload images, documents, or brand assets to populate your media repository.'}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredAssets.map((asset) => {
            const isImage =
              asset.mime_type?.startsWith('image/') ||
              asset.file_name.match(/\.(png|jpg|jpeg|webp|gif|svg)$/i)
            const isCopied = copiedId === asset.id
            const isDeleting = deletingId === asset.id

            return (
              <div
                key={asset.id}
                className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col"
              >
                {/* Thumbnail Header */}
                <div
                  onClick={() => setPreviewAsset(asset)}
                  className="aspect-square bg-slate-50 relative flex items-center justify-center cursor-pointer overflow-hidden border-b border-slate-100"
                >
                  {isImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={asset.file_url}
                      alt={asset.file_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
                      loading="lazy"
                    />
                  ) : asset.category === 'documents' || asset.file_name.endsWith('.pdf') ? (
                    <FileText className="w-10 h-10 text-slate-400 group-hover:text-blue-600 transition" />
                  ) : asset.category === 'videos' ? (
                    <Video className="w-10 h-10 text-slate-400 group-hover:text-blue-600 transition" />
                  ) : (
                    <File className="w-10 h-10 text-slate-400 group-hover:text-blue-600 transition" />
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setPreviewAsset(asset)
                      }}
                      className="p-1.5 bg-white text-slate-700 hover:text-blue-600 rounded-lg shadow-sm transition"
                      title="Inspect preview"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCopyUrl(asset)
                      }}
                      className="p-1.5 bg-white text-slate-700 hover:text-emerald-600 rounded-lg shadow-sm transition"
                      title="Copy Public URL"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Card Meta */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <p
                    className="text-xs font-semibold text-slate-900 truncate"
                    title={asset.file_name}
                  >
                    {asset.file_name}
                  </p>
                  <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{formatBytes(asset.file_size)}</span>
                    <span className="uppercase text-[10px] font-mono px-1 py-0.2 bg-slate-100 rounded text-slate-600">
                      {asset.category}
                    </span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">{formatDate(asset.created_at)}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopyUrl(asset)}
                        className={`text-slate-400 hover:text-slate-700 p-1 rounded transition ${
                          isCopied ? 'text-emerald-600' : ''
                        }`}
                        title="Copy Public URL"
                      >
                        {isCopied ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteAsset(asset)}
                        disabled={isDeleting}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded transition disabled:opacity-50"
                        title="Delete asset"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Asset</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">MIME Type</th>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Uploaded</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredAssets.map((asset) => {
                  const isImage =
                    asset.mime_type?.startsWith('image/') ||
                    asset.file_name.match(/\.(png|jpg|jpeg|webp|gif|svg)$/i)
                  const isCopied = copiedId === asset.id
                  const isDeleting = deletingId === asset.id

                  return (
                    <tr key={asset.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0 border border-slate-200">
                            {isImage ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={asset.file_url}
                                alt={asset.file_name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <File className="w-4 h-4 text-slate-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 truncate max-w-xs">
                              {asset.file_name}
                            </p>
                            <p className="text-[11px] text-slate-400 font-mono truncate max-w-xs">
                              {asset.file_url}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                          {asset.category}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                        {asset.mime_type || '—'}
                      </td>

                      <td className="py-3 px-4 font-medium text-slate-900">
                        {formatBytes(asset.file_size)}
                      </td>

                      <td className="py-3 px-4 text-slate-500">
                        {formatDate(asset.created_at)}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleCopyUrl(asset)}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium transition"
                            title="Copy link"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-600">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy URL</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => setPreviewAsset(asset)}
                            className="p-1 text-slate-400 hover:text-slate-700 transition"
                            title="Preview asset"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <a
                            href={asset.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-slate-400 hover:text-blue-600 transition"
                            title="Open in new window"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => handleDeleteAsset(asset)}
                            disabled={isDeleting}
                            className="p-1 text-slate-400 hover:text-rose-600 transition disabled:opacity-50"
                            title="Delete file"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Asset Preview Modal */}
      {previewAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/50">
              <div className="min-w-0 pr-4">
                <h3 className="text-base font-bold text-slate-900 truncate">
                  {previewAsset.file_name}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  {previewAsset.mime_type} · {formatBytes(previewAsset.file_size)}
                </p>
              </div>
              <button
                onClick={() => setPreviewAsset(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Media Container */}
              <div className="bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center min-h-[300px] max-h-[500px] border border-slate-200">
                {previewAsset.mime_type?.startsWith('image/') ||
                previewAsset.file_name.match(/\.(png|jpg|jpeg|webp|gif|svg)$/i) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewAsset.file_url}
                    alt={previewAsset.file_name}
                    className="max-h-[480px] max-w-full object-contain mx-auto"
                  />
                ) : (
                  <div className="p-10 text-center">
                    <FileText className="w-16 h-16 text-slate-400 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-700">
                      Non-image asset preview
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Direct browser preview is available via public link
                    </p>
                    <a
                      href={previewAsset.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open Asset in New Tab
                    </a>
                  </div>
                )}
              </div>

              {/* Asset Information Table */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Metadata & Details
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Category</span>
                    <span className="font-semibold text-slate-900 capitalize">
                      {previewAsset.category}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Size</span>
                    <span className="font-semibold text-slate-900">
                      {formatBytes(previewAsset.file_size)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Uploaded By</span>
                    <span className="font-semibold text-slate-900">
                      {previewAsset.uploaded_by || 'admin@pulse41.com'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Date</span>
                    <span className="font-semibold text-slate-900">
                      {formatDate(previewAsset.created_at)}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-slate-400 block text-[11px] mb-1">
                    Public Storage URL
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={previewAsset.file_url}
                      className="flex-1 bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs font-mono text-slate-700 select-all"
                    />
                    <button
                      onClick={() => handleCopyUrl(previewAsset)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded transition inline-flex items-center gap-1.5"
                    >
                      {copiedId === previewAsset.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => handleDeleteAsset(previewAsset)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 inline-flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-rose-50 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Asset
              </button>

              <button
                onClick={() => setPreviewAsset(null)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
