import { Image as ImageIcon, Link as LinkIcon, Upload, X } from 'lucide-react';
import { FC, useState } from 'react';

interface ImageUploaderProps {
	id?: string;
	currentImageUrl?: string | null;
	onFileSelect: (file: File | null) => void;
	imageUrlValue: string;
	onImageUrlChange: (url: string) => void;
	error?: string;
}

export const ImageUploader: FC<ImageUploaderProps> = ({
	id = 'cover_image',
	currentImageUrl,
	onFileSelect,
	imageUrlValue,
	onImageUrlChange,
	error,
}) => {
	const [mode, setMode] = useState<'upload' | 'url'>('upload');
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [fileName, setFileName] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setFileName(file.name);
			const localUrl = URL.createObjectURL(file);
			setPreviewUrl(localUrl);
			onFileSelect(file);
		}
	};

	const handleClearFile = () => {
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
		}
		setPreviewUrl(null);
		setFileName(null);
		onFileSelect(null);
	};

	const displayImage = previewUrl || (mode === 'url' ? imageUrlValue : null) || currentImageUrl;

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<label htmlFor={id} className="block text-sm font-semibold text-slate-700">
					Gambar Sampul (Cover Image)
				</label>
				<div className="flex items-center gap-1 rounded-lg bg-slate-100 p-0.5 text-xs font-medium text-slate-600">
					<button
						type="button"
						onClick={() => setMode('upload')}
						className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-colors ${
							mode === 'upload' ? 'bg-white text-purple-700 shadow-xs font-semibold' : 'hover:text-slate-900'
						}`}
					>
						<Upload className="h-3 w-3" />
						<span>Unggah File</span>
					</button>
					<button
						type="button"
						onClick={() => setMode('url')}
						className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-colors ${
							mode === 'url' ? 'bg-white text-purple-700 shadow-xs font-semibold' : 'hover:text-slate-900'
						}`}
					>
						<LinkIcon className="h-3 w-3" />
						<span>URL Web</span>
					</button>
				</div>
			</div>

			{/* Upload / URL Input Box */}
			{mode === 'upload' ? (
				<div className="space-y-2">
					<div
						className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
							error
								? 'border-rose-300 bg-rose-50/40'
								: 'border-slate-300 bg-slate-50/60 hover:bg-slate-50'
						}`}
					>
						<input
							type="file"
							id={id}
							accept="image/png,image/jpeg,image/webp,image/jpg"
							onChange={handleFileChange}
							className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
						/>
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-700">
							<Upload className="h-5 w-5" />
						</div>
						<p className="mt-2 text-xs font-medium text-slate-700">
							<span className="font-semibold text-purple-700">Klik untuk unggah</span> atau seret file gambar ke sini
						</p>
						<p className="text-[11px] text-slate-400">
							PNG, JPG, WEBP hingga 5MB
						</p>

						{fileName && (
							<div className="mt-3 flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 shadow-xs ring-1 ring-slate-200">
								<span className="max-w-[200px] truncate text-xs font-medium text-slate-700">
									{fileName}
								</span>
								<button
									type="button"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										handleClearFile();
									}}
									className="rounded p-0.5 text-slate-400 hover:bg-slate-100 hover:text-rose-600"
								>
									<X className="h-3.5 w-3.5" />
								</button>
							</div>
						)}
					</div>
				</div>
			) : (
				<div className="space-y-1">
					<input
						type="url"
						id={`${id}_url`}
						value={imageUrlValue}
						onChange={(e) => onImageUrlChange(e.target.value)}
						placeholder="https://images.unsplash.com/photo-... atau Cloudinary URL"
						className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
					/>
					<p className="text-[11px] text-slate-400">
						Masukkan tautan langsung gambar (diawali dengan https://)
					</p>
				</div>
			)}

			{/* Image Preview Container */}
			{displayImage && (
				<div className="relative mt-2 overflow-hidden rounded-xl border border-slate-200 bg-slate-900/5">
					<img
						src={displayImage}
						alt="Pratinjau Sampul"
						className="h-44 w-full object-cover"
						onError={(e) => {
							// If broken image URL, fallback
							(e.target as HTMLElement).style.display = 'none';
						}}
					/>
					<div className="absolute top-2 right-2 flex items-center gap-1.5 rounded-full bg-slate-900/70 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-xs">
						<ImageIcon className="h-3 w-3" />
						<span>Pratinjau Sampul</span>
					</div>
				</div>
			)}

			{error && <p className="text-xs text-rose-600">{error}</p>}
		</div>
	);
};

export default ImageUploader;
